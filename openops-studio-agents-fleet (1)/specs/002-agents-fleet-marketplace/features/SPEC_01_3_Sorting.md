---
description: "Sorting & Ranking - Multiple sort options for marketplace browsing"
module: "Discovery"
wave: 1
priority: "P1"
complexity: "Medium"
---

# SPEC_01_3: Sorting & Ranking

## Feature Overview

**Goal**: Enable buyers to sort marketplace results by relevance, popularity, recency, price, and rating. Default sort is "Most Popular" (trending algorithm).

**User Journey**:
```
1. Browse marketplace (results show by default)
2. Click "Sort By" dropdown
3. Select: Most Popular | Newest | Price (Low→High) | Price (High→Low) | Highest Rated
4. Results re-sort instantly (debounce 300ms)
5. URL updates with sort parameter (?sort=popularity)
6. User returns to list - sort preference persists
```

---

## Acceptance Criteria

### AC1: Sort Dropdown Display
- **Given** user is on marketplace browse page
- **When** page loads
- **Then** "Sort By" dropdown is visible (default: "Most Popular")
- **And** shows 5 sort options in dropdown menu
- **And** current selection is highlighted

### AC2: Most Popular Sort
- **Given** user selects "Most Popular"
- **When** results update
- **Then** agents sort by trending score (calculated from downloads + reviews + recency)
- **And** trending agents (uploaded <7 days) get +20% boost
- **And** high-review agents (≥100 reviews) get +10% boost
- **And** results update within 300ms

### AC3: Newest Sort
- **Given** user selects "Newest"
- **When** results update
- **Then** agents sort by upload date (most recent first)
- **And** shows "Published on Jan 10, 2026" for each agent

### AC4: Price Sorting
- **Given** user selects "Price: Low to High" or "High to Low"
- **When** results update
- **Then** agents sort by price in selected order
- **And** free agents appear first when sorting low→high
- **And** price is prominently displayed on each result

### AC5: Rating Sort
- **Given** user selects "Highest Rated"
- **When** results update
- **Then** agents sort by average rating (highest first)
- **And** only agents with ≥5 reviews are included (to prevent new agents dominating)
- **And** shows "4.8★ (342 reviews)" on each result

### AC6: URL Parameter Persistence
- **Given** user selects a sort option
- **When** sort is applied
- **Then** URL updates to `/?sort=newest` (or rating, price_asc, price_desc, popularity)
- **And** can share this URL and sort preference persists
- **And** browser back/forward buttons work

### AC7: Sort with Filters
- **Given** filters are applied (e.g., category=image, minPrice=20)
- **When** user changes sort
- **Then** sort applies to filtered results (not all results)
- **And** URL includes both filter params and sort param
- **Example**: `/?category=image&minPrice=20&sort=rating`

### AC8: Performance Baseline
- **Given** sorting is applied
- **When** results update
- **Then** response time <400ms (p95)
- **And** no layout shift (sorted results appear in same viewport)

---

## Backend Architecture

### REST Endpoint
```
GET /api/v1/marketplace?
  sort=string&
  category=string[]&
  limit=number&
  offset=number
```

**Sort Options** (enum):
- `popularity` (default): trending algorithm
- `newest`: `uploadedAt DESC`
- `price_asc`: `price ASC`
- `price_desc`: `price DESC`
- `rating`: `averageRating DESC` (filtered to ≥5 reviews)

**Request Schema (Zod)**:
```typescript
const SortQuerySchema = z.object({
  sort: z.enum(["popularity", "newest", "price_asc", "price_desc", "rating"])
    .default("popularity"),
  // ... other filter params
});
```

### Service Layer

**File**: `backend/src/services/SortingService.ts`

```typescript
class SortingService {
  async calculateTrendingScore(listing: Listing): Promise<number> {
    const recencyBoost = this.getRecencyBoost(listing.uploadedAt);
    const reviewBoost = listing.reviewCount >= 100 ? 1.1 : 1.0;
    const downloadWeight = Math.log(listing.downloadCount + 1) * 10;
    const reviewWeight = listing.averageRating * 5;
    
    return (downloadWeight + reviewWeight) * recencyBoost * reviewBoost;
  }

  private getRecencyBoost(uploadedAt: Date): number {
    const daysSinceUpload = (Date.now() - uploadedAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpload < 7) return 1.2; // New = +20%
    if (daysSinceUpload < 30) return 1.05; // Recent = +5%
    return 1.0;
  }

  async sortListings(
    listings: Listing[],
    sortBy: "popularity" | "newest" | "price_asc" | "price_desc" | "rating"
  ): Promise<Listing[]> {
    switch (sortBy) {
      case "popularity":
        return listings.sort((a, b) => 
          this.calculateTrendingScore(b) - this.calculateTrendingScore(a)
        );
      case "newest":
        return listings.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
      case "price_asc":
        return listings.sort((a, b) => a.price - b.price);
      case "price_desc":
        return listings.sort((a, b) => b.price - a.price);
      case "rating":
        return listings
          .filter(l => l.reviewCount >= 5)
          .sort((a, b) => b.averageRating - a.averageRating);
      default:
        return listings;
    }
  }
}
```

### Controller Integration

```typescript
router.get("/marketplace", async (req, res) => {
  const { sort = "popularity", ...filters } = req.query;
  
  let query = prisma.listing.findMany({ where: buildFilters(filters) });
  
  switch (sort) {
    case "newest":
      query = query.orderBy({ uploadedAt: "desc" });
      break;
    case "price_asc":
      query = query.orderBy({ price: "asc" });
      break;
    case "price_desc":
      query = query.orderBy({ price: "desc" });
      break;
    case "rating":
      query = query
        .where({ reviewCount: { gte: 5 } })
        .orderBy({ averageRating: "desc" });
      break;
    case "popularity":
    default:
      // Trending score requires custom calculation or view
      break;
  }
  
  const results = await query.skip(offset).take(limit);
  res.json({ results });
});
```

### Database View for Trending

```sql
-- M004_create_trending_view.sql
CREATE VIEW listing_trending_scores AS
SELECT 
  id,
  title,
  (
    (LOG(download_count + 1) * 10) +
    (average_rating * 5) +
    CASE 
      WHEN EXTRACT(DAY FROM NOW() - uploaded_at) < 7 THEN 20
      WHEN EXTRACT(DAY FROM NOW() - uploaded_at) < 30 THEN 5
      ELSE 0
    END +
    (CASE WHEN review_count >= 100 THEN 10 ELSE 0 END)
  ) AS trending_score
FROM listings
WHERE status = 'ACTIVE';

-- Use in queries
SELECT * FROM listing_trending_scores ORDER BY trending_score DESC;
```

---

## Frontend Architecture

### SortDropdown Component

**File**: `frontend/src/modules/marketplace/ui/SortDropdown.tsx`

```typescript
const SORT_OPTIONS = [
  { value: "popularity", label: "Most Popular", icon: "⭐" },
  { value: "newest", label: "Newest", icon: "✨" },
  { value: "price_asc", label: "Price: Low to High", icon: "💰" },
  { value: "price_desc", label: "Price: High to Low", icon: "💸" },
  { value: "rating", label: "Highest Rated", icon: "⭐⭐⭐" },
];

export function SortDropdown() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "popularity";
  
  const handleSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    setSearchParams(params);
  };

  return (
    <select 
      value={sort} 
      onChange={(e) => handleSort(e.target.value)}
      className="px-4 py-2 border rounded-lg"
    >
      {SORT_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.icon} {opt.label}
        </option>
      ))}
    </select>
  );
}
```

### useSort Hook

**File**: `frontend/src/modules/marketplace/hooks/useSort.ts`

```typescript
export function useSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const sort = searchParams.get("sort") || "popularity";
  
  const setSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    params.set("offset", "0"); // Reset to first page
    setSearchParams(params);
  };

  return { sort, setSort };
}
```

### State Flow
```
User selects sort → setSort() → URL updated → React Query refetches → 
API returns sorted results → Results re-render in new order
```

---

## Database Schema

### Prisma Changes

```prisma
model Listing {
  // ... existing fields
  uploadedAt DateTime @default(now())
  trendingScore Float? // Denormalized for performance
  
  @@index([downloadCount, averageRating]) // For trending calc
  @@index([uploadedAt])
}

// Materialized view or trigger to update trendingScore
```

### SQL Indexes

```sql
CREATE INDEX idx_listings_uploaded_at ON listings(uploaded_at DESC);
CREATE INDEX idx_listings_trending_composite ON listings(
  download_count DESC, 
  average_rating DESC, 
  review_count DESC
);
```

---

## Testing Strategy

### Unit Tests: Sorting Service

**File**: `backend/tests/unit/sortingService.test.ts`

```typescript
describe("SortingService", () => {
  it("should calculate trending score correctly", async () => {
    const listing = {
      uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      downloadCount: 1000,
      reviewCount: 150,
      averageRating: 4.8
    };
    
    const score = await sortingService.calculateTrendingScore(listing);
    expect(score).toBeGreaterThan(0);
  });

  it("should sort by price ascending", async () => {
    const listings = [
      { price: 100 },
      { price: 10 },
      { price: 50 }
    ];
    
    const sorted = await sortingService.sortListings(listings, "price_asc");
    expect(sorted[0].price).toBe(10);
    expect(sorted[2].price).toBe(100);
  });

  it("should filter low-review listings when sorting by rating", async () => {
    const listings = [
      { averageRating: 5, reviewCount: 2 }, // Should be filtered
      { averageRating: 4.5, reviewCount: 100 }
    ];
    
    const sorted = await sortingService.sortListings(listings, "rating");
    expect(sorted.length).toBe(1);
  });

  it("should apply recency boost to new listings", () => {
    const newListing = { uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) };
    const boost = sortingService["getRecencyBoost"](newListing.uploadedAt);
    expect(boost).toBe(1.2); // +20%
  });
});
```

### Integration Tests

**File**: `backend/tests/integration/sortingFlow.test.ts`

```typescript
describe("Sorting Flow", () => {
  it("should apply sort param to API response", async () => {
    const response = await request(app)
      .get("/api/v1/marketplace")
      .query({ sort: "price_asc", limit: 10 });

    expect(response.status).toBe(200);
    const prices = response.body.results.map(r => r.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("should handle sort with filters", async () => {
    const response = await request(app)
      .get("/api/v1/marketplace")
      .query({ category: "image", sort: "rating" });

    expect(response.status).toBe(200);
    expect(response.body.results.every(r => r.category === "image")).toBe(true);
  });

  it("should return <400ms for sorted results", async () => {
    const startTime = Date.now();
    await request(app).get("/api/v1/marketplace").query({ sort: "popularity" });
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(400);
  });
});
```

### E2E Tests

**File**: `frontend/tests/e2e/sorting.e2e.ts`

```typescript
test("should sort results by price ascending", async ({ page }) => {
  await page.goto("/marketplace");
  
  // Select sort option
  await page.selectOption('select[name="sort"]', "price_asc");
  await page.waitForLoadState("networkidle");
  
  // Verify prices are sorted
  const prices = await page.locator(".product-price").allTextContents();
  const priceNumbers = prices.map(p => parseFloat(p.replace("$", "")));
  expect(priceNumbers).toEqual([...priceNumbers].sort((a, b) => a - b));
});

test("should persist sort in URL", async ({ page }) => {
  await page.goto("/marketplace?sort=rating");
  expect(page.locator('select[name="sort"]')).toHaveValue("rating");
});
```

---

## Performance Optimization

### Caching Trending Scores
- Cache trending scores in Redis with **12-hour TTL**
- Recalculate once per day
- Key: `listing:trending:all`

### Database Views
- Use PostgreSQL materialized view for trending calculations
- Refresh nightly via cron job

### Client-Side Debounce
- Debounce sort change: **300ms**
- Prevents multiple API calls on rapid clicks

---

## Files to Create/Modify

### Backend
- `backend/src/services/SortingService.ts` (NEW)
- `backend/src/controllers/MarketplaceController.ts` (MODIFY - add sort logic)
- `backend/prisma/migrations/004_create_trending_view.sql` (NEW)
- `backend/tests/unit/sortingService.test.ts` (NEW)
- `backend/tests/integration/sortingFlow.test.ts` (NEW)

### Frontend
- `frontend/src/modules/marketplace/ui/SortDropdown.tsx` (NEW)
- `frontend/src/modules/marketplace/hooks/useSort.ts` (NEW)
- `frontend/tests/e2e/sorting.e2e.ts` (NEW)

---

## Definition of Done

- [ ] SortingService calculates trending score correctly
- [ ] All 5 sort options work (popularity, newest, price asc/desc, rating)
- [ ] Rating sort filters to ≥5 reviews
- [ ] Sort dropdown renders with current selection
- [ ] URL updates with sort param
- [ ] Sort works with filters applied
- [ ] Response time <400ms (p95)
- [ ] No layout shift when re-sorting
- [ ] Browser back/forward buttons work
- [ ] Unit tests pass (≥90% coverage)
- [ ] Integration tests pass
- [ ] E2E tests pass (3+ sort scenarios)
- [ ] Code reviewed + approved

---

## Implementation Notes for AI Agents

1. **Start with**: SortDropdown component (simple UI)
2. **Then**: useSort hook (URL integration)
3. **Then**: SortingService (backend logic)
4. **Finally**: Tests

**Key Pitfalls**:
- Trending score formula is critical (test extensively)
- Don't forget to filter low-review listings for rating sort
- Ensure URL params stay in searchParams when sort changes
- Recency boost must be applied correctly in trending view

**Dependency on Other Specs**:
- Depends on: SPEC_01_1_SmartSearch (endpoint exists)
- Depends on: SPEC_01_2_AdvancedFilters (filters + sort together)
