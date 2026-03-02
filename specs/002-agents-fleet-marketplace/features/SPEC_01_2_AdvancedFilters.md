---
description: "Advanced Filtering System - Multi-faceted search filters for marketplace discovery"
module: "Discovery"
wave: 1
priority: "P1"
complexity: "Medium"
---

# SPEC_01_2: Advanced Filters

## Feature Overview

**Goal**: Enable buyers to narrow agent search using multiple filter dimensions (category, price range, license tier, rating, platform compatibility, vendor reputation, update date).

**User Journey**:
```
1. Browse marketplace with filters visible in sidebar
2. Select category (e.g., "Image Generation")
3. Adjust price range slider ($10-$100)
4. Select license tier (Free Trial, Monthly, Annual)
5. Filter by minimum rating (≥4 stars)
6. Select platform (Gemini, ChatGPT, Claude)
7. Results update in real-time with debounce
8. Click "Clear All Filters" to reset
9. Apply filters are persisted in URL (?category=image&minPrice=10...)
```

---

## Acceptance Criteria

### AC1: Filter Sidebar Rendering
- **Given** user is on marketplace browse page
- **When** page loads
- **Then** sidebar displays 6 filter sections: Category, Price, License, Rating, Platform, Vendor Type
- **And** each section shows current filter value or "All" if none selected
- **And** filter sections are collapsible on mobile (drawer)

### AC2: Category Filter
- **Given** user sees category filter
- **When** user selects "Image Generation"
- **Then** results update to show only agents in that category
- **And** category count shows "12 results" (real-time)
- **And** can multi-select categories ("Image Generation" + "Text Processing")

### AC3: Price Range Filter
- **Given** user sees price slider (min $0, max $500)
- **When** user drags slider to $25-$100
- **Then** only agents priced $25-$100 display
- **And** input fields show "Min: $25" and "Max: $100"
- **And** can type directly into input fields

### AC4: License Tier Filter
- **Given** license tier options available (Free Trial, Monthly, Annual, One-Time)
- **When** user selects "Monthly"
- **Then** only agents with monthly license tier display
- **And** can multi-select tiers

### AC5: Rating Filter
- **Given** rating filter with radio buttons (All, ≥3★, ≥4★, ≥5★)
- **When** user selects "≥4★"
- **Then** only agents with ≥4 star average display
- **And** shows "2,341 results match"

### AC6: Platform Compatibility Filter
- **Given** platform options (Gemini, ChatGPT, Claude, all)
- **When** user selects "Claude"
- **Then** only Claude-compatible agents display
- **And** can multi-select platforms

### AC7: URL Persistence & Sharing
- **Given** filters are applied
- **When** URL updates to `/?category=image&minPrice=25&maxPrice=100&rating=4&platform=claude`
- **Then** user can share this link with others
- **And** filters restore when link is opened
- **And** browser back/forward buttons work correctly

### AC8: Performance & Debouncing
- **Given** user adjusts filters rapidly
- **When** dragging price slider or selecting multiple options
- **Then** API calls debounce with 500ms delay
- **And** "Loading..." spinner shows during request
- **And** results update within 800ms total (p95)

---

## Backend Architecture

### REST Endpoint
```
GET /api/v1/marketplace?
  category=string[]&
  minPrice=number&
  maxPrice=number&
  licenseTier=string[]&
  minRating=number&
  platform=string[]&
  vendorType=string&
  limit=number&
  offset=number
```

**Request Schema (Zod)**:
```typescript
const FilterQuerySchema = z.object({
  category: z.array(z.string()).optional(), // ["image", "text", "voice"]
  minPrice: z.number().min(0).max(10000).optional(),
  maxPrice: z.number().min(0).max(10000).optional(),
  licenseTier: z.array(z.enum(["free_trial", "monthly", "annual", "one_time"])).optional(),
  minRating: z.number().min(0).max(5).optional(),
  platform: z.array(z.enum(["gemini", "chatgpt", "claude"])).optional(),
  vendorType: z.enum(["individual", "organization", "all"]).optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
});
```

**Response Schema**:
```typescript
{
  results: [
    {
      id: "uuid",
      title: "Image Upscaler Pro",
      vendor: "VendorName",
      price: 49.99,
      licenseTier: "monthly",
      rating: 4.8,
      reviewCount: 342,
      platform: ["gemini", "chatgpt"],
      vendorType: "organization",
      category: "image",
      downloadCount: 12500,
      image: "https://cdn.example.com/agent.jpg"
    }
  ],
  total: 2341,
  filters: {
    availableCategories: ["image", "text", "voice", "data"],
    priceRange: { min: 0, max: 500 },
    licenseTiers: ["free_trial", "monthly", "annual", "one_time"],
    platforms: ["gemini", "chatgpt", "claude"],
    ratingOptions: [3, 4, 5]
  }
}
```

### Service Layer (TypeScript)

**File**: `backend/src/services/MarketplaceFilterService.ts`

```typescript
class MarketplaceFilterService {
  async getFilteredListings(
    filters: FilterQueryParams,
    limit: number,
    offset: number
  ): Promise<{ listings: Listing[], total: number, availableFilters: object }> {
    // Build dynamic WHERE clause from filters
    // Apply price range, category, rating, platform filters
    // Sort by relevance
    // Return paginated results
  }

  async getAvailableFilters(): Promise<AvailableFiltersResponse> {
    // Cache popular filter options (24h TTL)
    // Return distinct categories, price ranges, license tiers
  }

  async validateFilters(filters: FilterQueryParams): Promise<boolean> {
    // Validate price ranges, enums, etc.
    // Return true if valid
  }

  applyPriceRangeFilter(query: QueryBuilder, min: number, max: number): QueryBuilder {
    return query.where('price', '>=', min).where('price', '<=', max);
  }

  applyCategoryFilter(query: QueryBuilder, categories: string[]): QueryBuilder {
    return query.whereIn('category', categories);
  }

  applyRatingFilter(query: QueryBuilder, minRating: number): QueryBuilder {
    return query.where('averageRating', '>=', minRating);
  }

  applyPlatformFilter(query: QueryBuilder, platforms: string[]): QueryBuilder {
    return query.whereIn('supportedPlatforms', platforms);
  }
}
```

### Controller (Express)

**File**: `backend/src/controllers/MarketplaceController.ts`

```typescript
router.get("/marketplace", async (req, res) => {
  try {
    const validated = FilterQuerySchema.parse(req.query);
    
    const { listings, total, availableFilters } = 
      await marketplaceFilterService.getFilteredListings(
        validated,
        validated.limit,
        validated.offset
      );

    // Log filter analytics
    await analyticsService.logFilterApplied({
      filters: validated,
      resultCount: listings.length,
      userId: req.user?.id
    });

    res.json({
      results: listings,
      total,
      filters: availableFilters,
      executionTimeMs: Date.now() - startTime
    });
  } catch (error) {
    res.status(400).json({ error: errorHandler.normalize(error) });
  }
});
```

### Database Query Strategy

**PostgreSQL Indexes** (for filter performance):
```sql
-- Composite indexes for filter combinations
CREATE INDEX idx_listings_category_price ON listings(category, price);
CREATE INDEX idx_listings_rating_downloads ON listings(average_rating, download_count);
CREATE INDEX idx_listings_platform ON listings USING GIN (supported_platforms);
CREATE INDEX idx_listings_active ON listings(status) WHERE status = 'active';

-- For filtering by vendor type
CREATE INDEX idx_listings_vendor_type ON listings(vendor_type);
```

**Prisma Query**:
```prisma
const listings = await prisma.listing.findMany({
  where: {
    status: "ACTIVE",
    category: { in: filters.category },
    price: {
      gte: filters.minPrice,
      lte: filters.maxPrice
    },
    averageRating: { gte: filters.minRating },
    supportedPlatforms: {
      hasSome: filters.platform
    }
  },
  orderBy: { downloadCount: "desc" },
  skip: offset,
  take: limit,
  select: { /* fields for response */ }
});
```

---

## Frontend Architecture

### FilterSidebar Component (React)

**File**: `frontend/src/modules/marketplace/ui/FilterSidebar.tsx`

```typescript
export function FilterSidebar() {
  const [filters, setFilters] = useQueryParams(); // URL-synced state
  const { data: availableFilters } = useAvailableFilters();
  
  const handleCategoryChange = (category: string) => {
    const updated = filters.category?.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...(filters.category || []), category];
    setFilters({ ...filters, category: updated });
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters({ ...filters, minPrice: min, maxPrice: max });
  };

  return (
    <aside className="w-64 bg-white border-r">
      <button onClick={() => setFilters({})}>Clear All Filters</button>
      
      <section>
        <h3>Category</h3>
        {availableFilters?.categories.map(cat => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={filters.category?.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
            />
            {cat}
          </label>
        ))}
      </section>

      <section>
        <h3>Price Range</h3>
        <PriceRangeSlider
          min={0}
          max={500}
          value={[filters.minPrice || 0, filters.maxPrice || 500]}
          onChange={handlePriceChange}
        />
      </section>

      <section>
        <h3>License Tier</h3>
        {["free_trial", "monthly", "annual"].map(tier => (
          <label key={tier}>
            <input
              type="checkbox"
              checked={filters.licenseTier?.includes(tier)}
              onChange={() => {
                const updated = filters.licenseTier?.includes(tier)
                  ? filters.licenseTier.filter(t => t !== tier)
                  : [...(filters.licenseTier || []), tier];
                setFilters({ ...filters, licenseTier: updated });
              }}
            />
            {tier}
          </label>
        ))}
      </section>

      <section>
        <h3>Minimum Rating</h3>
        {[3, 4, 5].map(rating => (
          <label key={rating}>
            <input
              type="radio"
              name="rating"
              value={rating}
              checked={filters.minRating === rating}
              onChange={() => setFilters({ ...filters, minRating: rating })}
            />
            ≥{rating}★
          </label>
        ))}
      </section>

      <section>
        <h3>Platform</h3>
        {["gemini", "chatgpt", "claude"].map(platform => (
          <label key={platform}>
            <input
              type="checkbox"
              checked={filters.platform?.includes(platform)}
              onChange={() => {
                const updated = filters.platform?.includes(platform)
                  ? filters.platform.filter(p => p !== platform)
                  : [...(filters.platform || []), platform];
                setFilters({ ...filters, platform: updated });
              }}
            />
            {platform}
          </label>
        ))}
      </section>
    </aside>
  );
}
```

### useFilters Hook

**File**: `frontend/src/modules/marketplace/hooks/useFilters.ts`

```typescript
export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const filters = useMemo(() => ({
    category: searchParams.getAll("category"),
    minPrice: searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined,
    maxPrice: searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined,
    licenseTier: searchParams.getAll("licenseTier"),
    minRating: searchParams.get("minRating") ? parseInt(searchParams.get("minRating")!) : undefined,
    platform: searchParams.getAll("platform"),
  }), [searchParams]);

  const setFilters = (newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else if (value !== undefined) {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
  };

  const { data, isLoading } = useQuery(
    ["marketplace", filters],
    () => api.get("/api/v1/marketplace", { params: filters }),
    { debounceMs: 500 }
  );

  return { filters, setFilters, results: data, isLoading };
}
```

### State Flow
```
User clicks filter → setFilters() → URL updates → React Query fires request → 
API returns filtered results → Component re-renders with new results → 
No page refresh (SPA experience)
```

---

## Database Schema

### Prisma Schema (New Fields)

```prisma
model Listing {
  id String @id @default(cuid())
  title String
  price Decimal @db.Decimal(10, 2)
  category String
  licenseTier String @db.VarChar(20) // "free_trial", "monthly", "annual", "one_time"
  supportedPlatforms String[] @db.VarChar(50)[] // ["gemini", "chatgpt", "claude"]
  averageRating Float @default(0)
  reviewCount Int @default(0)
  downloadCount Int @default(0)
  vendorType String @db.VarChar(20) // "individual", "organization"
  status String @db.VarChar(20) // "active", "archived", "pending_approval"
  
  @@index([category, price])
  @@index([averageRating, downloadCount])
  @@index([status])
}
```

### Migration SQL

```sql
-- M003_add_filter_indexes.sql
CREATE INDEX idx_listings_category_price ON listings(category, price);
CREATE INDEX idx_listings_rating_downloads ON listings(average_rating DESC, download_count DESC);
CREATE INDEX idx_listings_platform ON listings USING GIN(supported_platforms);
CREATE INDEX idx_listings_vendor_type ON listings(vendor_type);
CREATE INDEX idx_listings_active_status ON listings(status) WHERE status = 'ACTIVE';
```

---

## Testing Strategy

### Unit Tests: Filter Service

**File**: `backend/tests/unit/marketplaceFilterService.test.ts`

```typescript
describe("MarketplaceFilterService", () => {
  it("should filter listings by category", async () => {
    const results = await filterService.getFilteredListings(
      { category: ["image"] },
      20, 0
    );
    expect(results.listings.every(l => l.category === "image")).toBe(true);
  });

  it("should filter listings by price range", async () => {
    const results = await filterService.getFilteredListings(
      { minPrice: 10, maxPrice: 50 },
      20, 0
    );
    expect(results.listings.every(l => l.price >= 10 && l.price <= 50)).toBe(true);
  });

  it("should handle multi-select filters", async () => {
    const results = await filterService.getFilteredListings(
      { licenseTier: ["monthly", "annual"] },
      20, 0
    );
    expect(results.listings.every(l => 
      ["monthly", "annual"].includes(l.licenseTier)
    )).toBe(true);
  });

  it("should return accurate total count", async () => {
    const results = await filterService.getFilteredListings(
      { minRating: 4 },
      10, 0
    );
    expect(results.total).toBeGreaterThan(results.listings.length);
  });
});
```

### Integration Tests: Full Filter Flow

**File**: `backend/tests/integration/filterFlow.test.ts`

```typescript
describe("Marketplace Filter Flow", () => {
  it("should apply multiple filters correctly", async () => {
    const response = await request(app)
      .get("/api/v1/marketplace")
      .query({
        category: "image",
        minPrice: 20,
        maxPrice: 100,
        minRating: 4,
        platform: "claude"
      });

    expect(response.status).toBe(200);
    expect(response.body.results).toBeDefined();
    expect(response.body.total).toBeGreaterThan(0);
  });

  it("should handle empty filter results gracefully", async () => {
    const response = await request(app)
      .get("/api/v1/marketplace")
      .query({ minPrice: 50000 });

    expect(response.status).toBe(200);
    expect(response.body.results).toEqual([]);
  });
});
```

### E2E Tests: UI Filter Experience

**File**: `frontend/tests/e2e/filters.e2e.ts`

```typescript
test("should filter marketplace by category and price", async ({ page }) => {
  await page.goto("/marketplace");
  
  // Select category filter
  await page.click('input[value="image"]');
  
  // Set price range
  await page.fill('input[placeholder="Min Price"]', "20");
  await page.fill('input[placeholder="Max Price"]', "100");
  
  // Wait for results update
  await page.waitForLoadState("networkidle");
  
  // Verify results
  const results = await page.locator(".product-card");
  expect(results).toHaveCount(6); // Should have filtered results
  
  // Verify URL has query params
  expect(page.url()).toContain("category=image");
  expect(page.url()).toContain("minPrice=20");
});

test("should persist filters in URL", async ({ page }) => {
  await page.goto("/marketplace?category=image&minPrice=25");
  
  const categoryCheckbox = page.locator('input[value="image"]');
  expect(categoryCheckbox).toBeChecked();
});
```

---

## Performance Optimization

### Caching Strategy
- Cache available filters (categories, price ranges, platforms) with **24-hour TTL**
- Use Redis: `CACHE_KEY = "marketplace:available_filters"`
- Invalidate on new listing publish

### Query Optimization
```sql
-- Use composite indexes strategically
EXPLAIN ANALYZE SELECT * FROM listings 
WHERE category = 'image' AND price BETWEEN 20 AND 100 
AND average_rating >= 4 ORDER BY download_count DESC;
```

### Debouncing
- Client-side debounce: **500ms** on filter change
- Prevents excessive API calls while user adjusts sliders/checkboxes

### Pagination
- Default limit: **20 results per page**
- Max limit: **100 results per page** (prevent abuse)
- Cursor-based pagination for large datasets

---

## Files to Create/Modify

### Backend
- `backend/src/services/MarketplaceFilterService.ts` (NEW)
- `backend/src/controllers/MarketplaceController.ts` (MODIFY - add `/marketplace` GET endpoint)
- `backend/prisma/schema.prisma` (MODIFY - add indexes)
- `backend/prisma/migrations/003_add_filter_indexes.sql` (NEW)
- `backend/tests/unit/marketplaceFilterService.test.ts` (NEW)
- `backend/tests/integration/filterFlow.test.ts` (NEW)

### Frontend
- `frontend/src/modules/marketplace/ui/FilterSidebar.tsx` (NEW)
- `frontend/src/modules/marketplace/ui/PriceRangeSlider.tsx` (NEW - reusable component)
- `frontend/src/modules/marketplace/hooks/useFilters.ts` (NEW)
- `frontend/src/modules/marketplace/hooks/useQueryParams.ts` (NEW)
- `frontend/tests/e2e/filters.e2e.ts` (NEW)

---

## Definition of Done

- [ ] Zod schemas validate all filter combinations
- [ ] FilterService methods tested (unit tests ≥90% coverage)
- [ ] API responds with correct filtered results in <500ms (p95)
- [ ] URL persists filters (back/forward buttons work)
- [ ] Sidebar renders all 6 filter sections
- [ ] Price slider works on desktop/mobile
- [ ] Multi-select filters work (category, license, platform)
- [ ] "Clear All Filters" button resets everything
- [ ] Integration tests pass (full flow)
- [ ] E2E tests pass (3+ scenarios: single filter, multi-filter, URL restore)
- [ ] Debounce prevents excessive API calls
- [ ] Performance benchmarks met (<500ms p95)
- [ ] Accessibility: filter labels + keyboard navigation
- [ ] Code reviewed + approved
- [ ] Staging deployment passes QA

---

## Implementation Notes for AI Agents

1. **Start with**: FilterSidebar component first (UI feedback loop)
2. **Then**: useFilters hook (state management)
3. **Then**: MarketplaceFilterService backend (data layer)
4. **Finally**: Tests (unit → integration → E2E)

**Key Pitfalls**:
- Don't forget URL synchronization (SearchParams API)
- Debounce MUST be on client-side (avoid API spam)
- Composite indexes are critical for <500ms queries
- Multi-select filters require array handling in both query string and backend WHERE clause

**Dependency on Other Specs**:
- Depends on: SPEC_01_1_SmartSearch (search endpoint exists)
- Blocks: SPEC_01_3_Sorting (will add "sortBy" param to same endpoint)
