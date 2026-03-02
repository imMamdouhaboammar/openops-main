---
description: "Featured & Trending Algorithm - Admin-curated and algorithmic trending for discovery"
module: "Discovery"
wave: 1
priority: "P1"
complexity: "Medium"
---

# SPEC_01_4: Featured & Trending

## Feature Overview

**Goal**: Display admin-featured agents and algorithmically trending agents prominently on marketplace homepage and browse page. Featured agents are manually curated by admin; trending agents are calculated from engagement metrics.

**User Journey**:
```
1. Visit marketplace homepage
2. See "Featured This Week" section (5 hand-picked agents)
3. See "Trending Now" section (5 algorithmically trending agents)
4. Click on featured/trending agent → Goes to detail page
5. Featured badge shows "Featured by OpenOps Team"
6. Trending badge shows "🔥 Trending" if in top 5
```

---

## Acceptance Criteria

### AC1: Featured Section Display
- **Given** homepage loads
- **When** featured section renders
- **Then** displays exactly 5 featured agents
- **And** each shows: image, title, vendor, price, rating, "Featured" badge
- **And** displays "Featured by OpenOps Team" label
- **And** features rotate weekly (Monday refresh)

### AC2: Trending Section Display
- **Given** homepage loads
- **When** trending section renders
- **Then** displays top 5 trending agents (by trending_score)
- **And** each shows: image, title, vendor, price, rating, trending badge "🔥"
- **And** updates every 12 hours (cached)
- **And** shows trending rank (#1, #2, #3, etc.)

### AC3: Trending Score Algorithm
- **Given** trending score calculated for each active listing
- **When** algorithm runs
- **Then** trending_score = (downloads * 2) + (reviews * 5) + (avgRating * 10) + recencyBoost
- **And** recencyBoost = +20 if uploaded <7 days, +10 if <30 days, 0 otherwise
- **And** only agents with ≥10 downloads are eligible for trending

### AC4: Admin Featured Management
- **Given** admin is logged in
- **When** admin visits "Content Management" → "Featured Agents"
- **Then** sees list of all agents with checkboxes
- **And** can select 5 agents to feature
- **And** sees current featured agents with removal option
- **And** changes take effect immediately after save
- **And** audit log records who featured which agents and when

### AC5: Featured Badge Persistence
- **Given** agent is featured
- **When** featured section refreshes
- **Then** same agents still display (until admin changes)
- **And** badge appears across marketplace (detail page, search results)

### AC6: URL & Sharing
- **Given** user is on featured agent
- **When** user shares link
- **Then** featured agent detail page opens correctly
- **And** "Featured" badge is visible

### AC7: Performance
- **Given** homepage loads with featured + trending
- **When** sections render
- **Then** page loads <1s (featured/trending data cached)
- **And** featured/trending images lazy-load below fold

### AC8: Mobile Responsive
- **Given** viewport is mobile (<768px)
- **When** featured/trending sections render
- **Then** display as horizontal scroll carousel
- **And** swipe left/right to view more agents
- **And** maintain "Featured" badge visibility

---

## Backend Architecture

### REST Endpoints

```
GET /api/v1/featured
- Returns current 5 featured agents with metadata
- Cache: 1 hour (admin can clear cache on update)

GET /api/v1/trending
- Returns top 5 trending agents
- Cache: 12 hours

POST /api/v1/admin/featured (Admin Only)
- Body: { featureIds: ["uuid1", "uuid2", ...] } (exactly 5)
- Returns: { success: true, featured: [...] }
- Clears cache after update

GET /api/v1/admin/featured-stats
- Returns: featured agents, feature dates, view counts
```

### Service Layer

**File**: `backend/src/services/FeaturedService.ts`

```typescript
class FeaturedService {
  async getFeaturedAgents(): Promise<Listing[]> {
    const cached = await redis.get("marketplace:featured");
    if (cached) return JSON.parse(cached);

    const featured = await prisma.listing.findMany({
      where: { isFeatured: true, status: "ACTIVE" },
      orderBy: { featuredAt: "desc" },
      take: 5,
      include: { vendor: true, reviews: true }
    });

    await redis.setex("marketplace:featured", 3600, JSON.stringify(featured));
    return featured;
  }

  async setFeaturedAgents(listingIds: string[]): Promise<void> {
    if (listingIds.length !== 5) {
      throw new Error("Must feature exactly 5 agents");
    }

    // Remove previous featured
    await prisma.listing.updateMany({
      where: { isFeatured: true },
      data: { isFeatured: false, featuredAt: null }
    });

    // Set new featured
    await prisma.listing.updateMany({
      where: { id: { in: listingIds } },
      data: { isFeatured: true, featuredAt: new Date() }
    });

    // Clear cache
    await redis.del("marketplace:featured");

    // Audit log
    await auditService.log({
      action: "FEATURED_AGENTS_UPDATED",
      listingIds,
      timestamp: new Date()
    });
  }
}
```

**File**: `backend/src/services/TrendingService.ts`

```typescript
class TrendingService {
  async calculateTrendingScore(listing: Listing): Promise<number> {
    if (listing.downloadCount < 10) return 0; // Min threshold

    const daysSinceUpload = (Date.now() - listing.uploadedAt.getTime()) / (1000 * 60 * 60 * 24);
    const recencyBoost = daysSinceUpload < 7 ? 20 : (daysSinceUpload < 30 ? 10 : 0);

    return (
      (listing.downloadCount * 2) +
      (listing.reviewCount * 5) +
      (listing.averageRating * 10) +
      recencyBoost
    );
  }

  async getTrendingAgents(): Promise<Listing[]> {
    const cached = await redis.get("marketplace:trending");
    if (cached) return JSON.parse(cached);

    const allListings = await prisma.listing.findMany({
      where: { status: "ACTIVE", downloadCount: { gte: 10 } },
      include: { vendor: true, reviews: true }
    });

    const withScores = await Promise.all(
      allListings.map(async l => ({
        ...l,
        trendingScore: await this.calculateTrendingScore(l)
      }))
    );

    const trending = withScores
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 5);

    await redis.setex("marketplace:trending", 43200, JSON.stringify(trending)); // 12 hours
    return trending;
  }
}
```

### Controller

**File**: `backend/src/controllers/FeaturedController.ts`

```typescript
router.get("/api/v1/featured", async (req, res) => {
  const featured = await featuredService.getFeaturedAgents();
  res.json(featured);
});

router.get("/api/v1/trending", async (req, res) => {
  const trending = await trendingService.getTrendingAgents();
  res.json(trending);
});

router.post("/api/v1/admin/featured", requireAuth, requireAdmin, async (req, res) => {
  const { featureIds } = req.body;
  
  if (!Array.isArray(featureIds) || featureIds.length !== 5) {
    return res.status(400).json({ error: "Must provide exactly 5 feature IDs" });
  }

  try {
    await featuredService.setFeaturedAgents(featureIds);
    res.json({ success: true, featured: await featuredService.getFeaturedAgents() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Database Schema

```prisma
model Listing {
  // ... existing fields
  isFeatured Boolean @default(false)
  featuredAt DateTime?
  trendingScore Float? // Denormalized

  @@index([isFeatured])
  @@index([downloadCount, reviewCount]) // For trending calc
}

model AuditLog {
  id String @id @default(cuid())
  action String // "FEATURED_AGENTS_UPDATED"
  listingIds String[]
  adminId String
  createdAt DateTime @default(now())
}
```

---

## Frontend Architecture

### FeaturedSection Component

**File**: `frontend/src/modules/marketplace/ui/FeaturedSection.tsx`

```typescript
export function FeaturedSection() {
  const { data: featured, isLoading } = useQuery(
    ["featured"],
    () => api.get("/api/v1/featured"),
    { staleTime: 60 * 60 * 1000 } // 1 hour cache
  );

  if (isLoading) return <Skeleton />;

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">✨ Featured This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {featured?.map(agent => (
            <Link key={agent.id} to={`/product/${agent.id}`}>
              <ProductCard 
                {...agent} 
                badge="Featured"
                badgeColor="gold"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### TrendingSection Component

**File**: `frontend/src/modules/marketplace/ui/TrendingSection.tsx`

```typescript
export function TrendingSection() {
  const { data: trending, isLoading } = useQuery(
    ["trending"],
    () => api.get("/api/v1/trending"),
    { staleTime: 12 * 60 * 60 * 1000 } // 12 hours cache
  );

  if (isLoading) return <Skeleton />;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">🔥 Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {trending?.map((agent, idx) => (
            <Link key={agent.id} to={`/product/${agent.id}`}>
              <div className="relative">
                <ProductCard {...agent} />
                <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Admin Featured Management Component

**File**: `frontend/src/modules/admin/ui/FeaturedManagement.tsx`

```typescript
export function FeaturedManagement() {
  const [selected, setSelected] = useState<string[]>([]);
  const { data: allAgents } = useQuery(["all-agents"], () => api.get("/api/v1/listings?limit=100"));
  const { mutate: updateFeatured } = useMutation(
    (ids: string[]) => api.post("/api/v1/admin/featured", { featureIds: ids })
  );

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else if (selected.length < 5) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div>
      <h2>Featured Agents Management</h2>
      <p>Select exactly 5 agents to feature (current: {selected.length}/5)</p>
      
      <div className="grid grid-cols-3 gap-4">
        {allAgents?.map(agent => (
          <label key={agent.id}>
            <input
              type="checkbox"
              checked={selected.includes(agent.id)}
              onChange={() => handleToggle(agent.id)}
            />
            {agent.title}
          </label>
        ))}
      </div>

      <button 
        onClick={() => updateFeatured(selected)}
        disabled={selected.length !== 5}
      >
        Save Featured Agents
      </button>
    </div>
  );
}
```

---

## Testing Strategy

### Unit Tests

**File**: `backend/tests/unit/trendingService.test.ts`

```typescript
describe("TrendingService", () => {
  it("should calculate trending score correctly", async () => {
    const listing = {
      downloadCount: 100,
      reviewCount: 50,
      averageRating: 4.5,
      uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days
    };

    const score = await trendingService.calculateTrendingScore(listing);
    expect(score).toBe((100 * 2) + (50 * 5) + (4.5 * 10) + 20); // 500
  });

  it("should exclude listings with <10 downloads", async () => {
    const listing = { downloadCount: 5, ...otherProps };
    const score = await trendingService.calculateTrendingScore(listing);
    expect(score).toBe(0);
  });

  it("should return top 5 trending agents", async () => {
    const trending = await trendingService.getTrendingAgents();
    expect(trending.length).toBeLessThanOrEqual(5);
  });
});
```

### Integration Tests

**File**: `backend/tests/integration/featuredFlow.test.ts`

```typescript
describe("Featured & Trending Flow", () => {
  it("should get featured agents", async () => {
    const response = await request(app).get("/api/v1/featured");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeLessThanOrEqual(5);
  });

  it("should update featured agents as admin", async () => {
    const agentIds = ["id1", "id2", "id3", "id4", "id5"];
    const response = await request(app)
      .post("/api/v1/admin/featured")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ featureIds: agentIds });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject non-admin featured updates", async () => {
    const response = await request(app)
      .post("/api/v1/admin/featured")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ featureIds: ["id1", "id2", "id3", "id4", "id5"] });

    expect(response.status).toBe(403);
  });
});
```

### E2E Tests

**File**: `frontend/tests/e2e/featured.e2e.ts`

```typescript
test("should display featured section on homepage", async ({ page }) => {
  await page.goto("/");
  
  const featured = page.locator('h2:has-text("Featured This Week")');
  await expect(featured).toBeVisible();
  
  const cards = page.locator("[data-testid='featured-card']");
  expect(await cards.count()).toBe(5);
});

test("should display trending section with rank badges", async ({ page }) => {
  await page.goto("/");
  
  const trending = page.locator('h2:has-text("Trending Now")');
  await expect(trending).toBeVisible();
  
  const rankBadges = page.locator("[data-testid='trending-rank']");
  const ranks = await rankBadges.allTextContents();
  expect(ranks).toEqual(["1", "2", "3", "4", "5"]);
});
```

---

## Files to Create/Modify

### Backend
- `backend/src/services/FeaturedService.ts` (NEW)
- `backend/src/services/TrendingService.ts` (NEW)
- `backend/src/controllers/FeaturedController.ts` (NEW)
- `backend/prisma/schema.prisma` (MODIFY - add isFeatured, featuredAt, AuditLog)
- `backend/prisma/migrations/005_add_featured_trending.sql` (NEW)
- `backend/tests/unit/trendingService.test.ts` (NEW)
- `backend/tests/integration/featuredFlow.test.ts` (NEW)

### Frontend
- `frontend/src/modules/marketplace/ui/FeaturedSection.tsx` (NEW)
- `frontend/src/modules/marketplace/ui/TrendingSection.tsx` (NEW)
- `frontend/src/modules/admin/ui/FeaturedManagement.tsx` (NEW)
- `frontend/tests/e2e/featured.e2e.ts` (NEW)

---

## Definition of Done

- [ ] FeaturedSection displays 5 agents with "Featured" badge
- [ ] TrendingSection displays 5 agents with rank badges (🔥 #1, #2, etc.)
- [ ] Trending score algorithm calculates correctly
- [ ] Admin can set featured agents via dashboard
- [ ] Audit log records featured changes
- [ ] Cache invalidation works (featured: 1h, trending: 12h)
- [ ] Featured badge appears across all views
- [ ] Mobile carousel works (swipe left/right)
- [ ] Lazy-load images below fold
- [ ] Response time <1s for homepage load
- [ ] Unit tests pass (trending calculations)
- [ ] Integration tests pass (API endpoints)
- [ ] E2E tests pass (UI sections visible)
- [ ] Code reviewed + approved

---

## Implementation Notes for AI Agents

1. **Start with**: TrendingService (algorithm, no UI complexity)
2. **Then**: FeaturedService (similar pattern)
3. **Then**: Components (FeaturedSection, TrendingSection)
4. **Finally**: Admin management interface

**Key Pitfalls**:
- Trending score threshold must be ≥10 downloads (prevent spam)
- Recency boost timing is critical (test edge cases like 6.9 days vs 7.1 days)
- Redis cache keys must be consistent across service calls
- Admin audit log must record all featured updates for compliance

**Dependency on Other Specs**:
- Depends on: SPEC_01_1_SmartSearch (API patterns established)
- Blocks: Homepage layout (featured/trending are key sections)
