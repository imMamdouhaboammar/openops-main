---
title: "Smart Search Engine for Agent Discovery"
module: "Discovery & Browse (Module 1)"
feature_id: "1.1"
spec_file: "SPEC_01_1_SmartSearch.md"
created: 2026-01-12
status: "Ready for Implementation"
---

# Feature Spec 1.1: Smart Search Engine for Agent Discovery

**Module**: Product Discovery & Browse  
**Priority**: P0 (MVP Critical)  
**Complexity**: Medium  
**Story Points**: 13  
**Sprint**: Wave 1 (Week 1-2)

---

## 🎯 Feature Overview

Enable buyers to find AI agents quickly via full-text search with intelligent ranking. Search should be instant, typo-forgiving, and context-aware.

**User Journey**:
```
1. User lands on marketplace
2. Clicks search bar or enters query
3. Types keywords (e.g., "image upscaler", "chatbot", "code review")
4. Instant results appear (< 200ms) with best matches first
5. Can refine results with filters (optional)
6. Clicks on top result
```

---

## 📋 Acceptance Criteria

### **AC1: Search Input Behavior**
- [ ] Search bar appears in navbar (sticky on scroll)
- [ ] Placeholder text: "Search agents... (e.g., image upscaler, chatbot)"
- [ ] Cleared when user navigates away
- [ ] On mobile: Full-width overlay when focused
- [ ] Keyboard shortcut: Cmd/Ctrl+K to focus

### **AC2: Search Results Display**
- [ ] Results appear after 300ms debounce (no every-keystroke API call)
- [ ] Displays up to 5 result previews in dropdown (below search bar)
- [ ] Each result shows: agent image, title, vendor, price, rating (star), downloads
- [ ] "View all X results" link at bottom of dropdown
- [ ] Loading spinner while fetching
- [ ] Empty state: "No agents found. Try different keywords"

### **AC3: Search Ranking**
- [ ] Exact title match ranks highest
- [ ] Partial matches in title rank before description matches
- [ ] Tag matches rank high (e.g., searching "GPT" matches agents tagged "GPT")
- [ ] Vendor reputation affects ranking (higher-rated vendors first)
- [ ] Recent agents get slight boost
- [ ] Popularity (downloads) is tiebreaker

### **AC4: Typo Tolerance**
- [ ] Suggest: "Did you mean 'image upscaler'?" for obvious typos
- [ ] Still return results for typos (fuzzy matching)
- [ ] Example: "upscaller" → finds "upscaler"

### **AC5: Search Analytics**
- [ ] Track: search query, results count, click-through rate
- [ ] Log failed searches (no results) for product improvement
- [ ] Dashboard shows trending searches (admin only)

### **AC6: Performance**
- [ ] Search response: < 200ms (p95)
- [ ] Dropdown render: < 100ms
- [ ] No layout shift during results rendering
- [ ] Works offline-ish (cached suggestions for common searches)

### **AC7: Accessibility**
- [ ] Search bar has `aria-label="Search agents"`
- [ ] Results list is `role="listbox"`
- [ ] Keyboard arrow keys navigate results
- [ ] Enter to select highlighted result
- [ ] Escape to close dropdown
- [ ] Screen reader reads: "5 results found for 'image upscaler'"

---

## 🏗️ Technical Architecture

### **Backend Components**

#### **1. Search API Endpoint**
```
GET /api/v1/search?q=image%20upscaler&limit=5&offset=0
```

**Request**:
```json
{
  "q": "string (required, min 2 chars)",
  "limit": "number (default: 5, max: 50)",
  "offset": "number (default: 0, for pagination)",
  "filters": {
    "category": "string (optional)",
    "minPrice": "number",
    "maxPrice": "number",
    "minRating": "number (1-5)"
  }
}
```

**Response (200 OK)**:
```json
{
  "results": [
    {
      "id": "uuid",
      "title": "Image Upscaler Pro",
      "description": "High-quality image enlargement using AI",
      "vendor": {
        "id": "uuid",
        "name": "TechVendor Inc",
        "badge": "verified",
        "rating": 4.8
      },
      "image": "https://cdn.../image-upscaler-thumb.jpg",
      "price": 49.99,
      "currency": "USD",
      "rating": 4.8,
      "ratingCount": 127,
      "downloads": 4250,
      "tags": ["image-processing", "ml", "python"],
      "isNew": false,
      "isTrending": true
    },
    // ... more results
  ],
  "total": 127,
  "query": "image upscaler",
  "executionTimeMs": 145
}
```

**Error (400 Bad Request)**:
```json
{
  "error": "Query too short (minimum 2 characters)",
  "code": "QUERY_TOO_SHORT"
}
```

#### **2. Search Service** (`backend/src/services/SearchService.ts`)
```typescript
class SearchService {
  async search(
    query: string,
    limit: number = 5,
    offset: number = 0,
    filters?: SearchFilters
  ): Promise<SearchResult[]>
  
  async getSearchSuggestions(partial: string): Promise<string[]>
  
  async logSearchQuery(query: string, resultCount: number): Promise<void>
  
  private rankResults(matches: Listing[], query: string): Listing[]
  
  private fuzzyMatch(query: string, text: string): number
}
```

#### **3. Database Query Strategy**
- **Primary**: PostgreSQL full-text search (`tsvector`, `tsquery`)
- **Fallback**: Fuzzy match via `pg_trgm` extension (trigram similarity)
- **Index**: `GIN` on `Listing.searchVector` for performance

```sql
-- Schema addition
ALTER TABLE "Listing" ADD COLUMN "searchVector" tsvector;

-- Index
CREATE INDEX "idx_listing_search" ON "Listing" USING GIN ("searchVector");

-- Trigger to auto-update searchVector on insert/update
CREATE OR REPLACE FUNCTION update_listing_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW."searchVector" :=
    to_tsvector('english', COALESCE(NEW.title, '')) ||
    to_tsvector('english', COALESCE(NEW.description, '')) ||
    to_tsvector('english', COALESCE(array_to_string(NEW.tags, ' '), ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_listing_search_vector
BEFORE INSERT OR UPDATE ON "Listing"
FOR EACH ROW
EXECUTE FUNCTION update_listing_search_vector();
```

#### **4. Controller** (`backend/src/controllers/SearchController.ts`)
```typescript
class SearchController {
  async search(req: Request, res: Response): Promise<void> {
    const { q, limit, offset, filters } = req.query;
    
    // Validate input
    if (!q || q.length < 2) {
      throw new BadRequestError("Query must be at least 2 characters");
    }
    
    // Call service
    const results = await searchService.search(q, limit, offset, filters);
    
    // Log analytics
    await searchService.logSearchQuery(q, results.length);
    
    // Return
    res.json(results);
  }
  
  async suggestions(req: Request, res: Response): Promise<void> {
    const { q } = req.query;
    const suggestions = await searchService.getSearchSuggestions(q);
    res.json(suggestions);
  }
}
```

---

### **Frontend Components**

#### **1. SearchInput Component** (`frontend/src/modules/marketplace/ui/SearchInput.tsx`)
```typescript
interface SearchInputProps {
  onSearch: (query: string) => void;
  onResultClick: (result: SearchResult) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onResultClick,
  placeholder = "Search agents...",
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(
    debounce((q: string) => {
      if (q.length >= 2) {
        setIsLoading(true);
        api.get("/search", { params: { q, limit: 5 } })
          .then(res => setResults(res.data.results))
          .finally(() => setIsLoading(false));
      }
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    debouncedSearch(value);
  };

  // Keyboard: Cmd/Ctrl+K to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search agents"
      />
      
      {isOpen && (
        <div className="absolute top-12 left-0 right-0 bg-white border rounded-lg shadow-lg z-50">
          {isLoading && <div className="p-4"><Spinner /></div>}
          
          {results.length > 0 && (
            <ul role="listbox" className="divide-y">
              {results.map((result, idx) => (
                <li
                  key={result.id}
                  onClick={() => onResultClick(result)}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  <SearchResultItem result={result} />
                </li>
              ))}
            </ul>
          )}
          
          {query.length >= 2 && results.length === 0 && !isLoading && (
            <div className="p-4 text-gray-500">No agents found</div>
          )}
          
          {results.length > 0 && (
            <div className="p-3 border-t text-center">
              <Link href={`/search?q=${encodeURIComponent(query)}`}>
                View all results
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

#### **2. SearchResultItem Component** (`frontend/src/modules/marketplace/ui/SearchResultItem.tsx`)
```typescript
interface SearchResultItemProps {
  result: SearchResult;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => (
  <div className="flex items-start gap-3">
    <img
      src={result.image}
      alt={result.title}
      className="w-12 h-12 rounded object-cover"
    />
    <div className="flex-1">
      <div className="font-semibold text-sm">{result.title}</div>
      <div className="text-xs text-gray-600 flex items-center gap-1">
        <span>{result.vendor.name}</span>
        {result.vendor.badge && (
          <Badge variant="verified" text={result.vendor.badge} />
        )}
      </div>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1">
          <Stars rating={result.rating} size="sm" />
          <span className="text-xs text-gray-500">({result.ratingCount})</span>
        </div>
        <div className="text-sm font-bold">${result.price}</div>
      </div>
    </div>
    {result.isTrending && <Badge variant="trending" text="Trending" />}
  </div>
);
```

#### **3. useSearch Hook** (`frontend/src/modules/marketplace/hooks/useSearch.ts`)
```typescript
export const useSearch = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/search", {
        params: { q: query, limit: 50 },
      });
      setResults(response.data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { results, isLoading, error, search };
};
```

---

## 🔄 Data Flow Diagram

```
User types "image upscaler"
         ↓
[SearchInput Component]
         ↓
    (debounce 300ms)
         ↓
GET /api/v1/search?q=image%20upscaler&limit=5
         ↓
[SearchController]
         ↓
[SearchService.search()]
         ↓
PostgreSQL FTS Query (tsvector)
         ↓
Rank results (title match > description > tags)
         ↓
Return top 5 with metadata
         ↓
[SearchResultItem] rendered
         ↓
User clicks result → Navigate to /agents/{id}
```

---

## 📊 Database Schema Changes

```prisma
model Listing {
  id                String      @id @default(cuid())
  vendorId          String
  title             String
  description       String      @db.Text
  tags              String[]    @default([])
  
  // NEW: Full-text search support
  searchVector      String?     @db.Unsupported("tsvector")? // PostgreSQL FTS vector
  
  // Ranking factors
  downloads         Int         @default(0)
  rating            Float       @default(0)
  ratingCount       Int         @default(0)
  createdAt         DateTime    @default(now())
  
  // Index for FTS
  @@index([searchVector])
}
```

---

## 🧪 Testing Strategy

### **Unit Tests** (`backend/tests/unit/searchService.test.ts`)
```typescript
describe("SearchService", () => {
  describe("search()", () => {
    it("should return results matching the query", async () => {
      const results = await searchService.search("image upscaler");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].title).toContain("image");
    });

    it("should rank exact title matches first", async () => {
      // Create listings: "Image Upscaler" and "Photo Editor with Upscaler"
      const results = await searchService.search("Image Upscaler");
      expect(results[0].title).toBe("Image Upscaler");
    });

    it("should return empty array for no matches", async () => {
      const results = await searchService.search("nonexistent-query-xyz");
      expect(results).toEqual([]);
    });

    it("should handle typos with fuzzy matching", async () => {
      // "upscaller" should find "upscaler"
      const results = await searchService.search("upscaller");
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("getSearchSuggestions()", () => {
    it("should return popular searches for partial query", async () => {
      const suggestions = await searchService.getSearchSuggestions("image");
      expect(suggestions).toContain("image upscaler");
    });
  });
});
```

### **Integration Tests** (`backend/tests/integration/searchFlow.test.ts`)
```typescript
describe("Search Flow", () => {
  it("should search from UI through database and return results", async () => {
    const response = await request(app)
      .get("/api/v1/search")
      .query({ q: "image upscaler" })
      .expect(200);

    expect(response.body.results).toBeDefined();
    expect(response.body.executionTimeMs).toBeLessThan(200);
  });
});
```

### **E2E Tests** (`frontend/tests/e2e/search.e2e.ts`)
```typescript
import { test, expect } from "@playwright/test";

test("User can search and find agents", async ({ page }) => {
  await page.goto("/");
  
  // Click search bar
  await page.fill("input[aria-label='Search agents']", "image upscaler");
  
  // Wait for results
  await page.waitForSelector('[role="listbox"]');
  
  // Verify results displayed
  const results = await page.locator('[role="listbox"] li').count();
  expect(results).toBeGreaterThan(0);
  
  // Click first result
  await page.click('[role="listbox"] li:first-child');
  
  // Should navigate to agent detail page
  await expect(page).toHaveURL(/\/agents\/\w+/);
});

test("Keyboard shortcut Cmd+K focuses search", async ({ page }) => {
  await page.goto("/");
  
  // Press Cmd+K (or Ctrl+K on Windows)
  await page.keyboard.press("Meta+K");
  
  // Search input should be focused
  const focused = await page.locator("input[aria-label='Search agents']").evaluate(
    el => document.activeElement === el
  );
  expect(focused).toBe(true);
});
```

---

## ⚡ Performance Optimization

### **Caching Strategy**
```typescript
// Cache popular searches for 24 hours
const cache = new NodeCache({ stdTTL: 86400 });

async function search(query: string) {
  const cached = cache.get(query);
  if (cached) return cached;
  
  const results = await dbSearch(query);
  cache.set(query, results);
  return results;
}
```

### **Index Optimization**
- GIN index on `searchVector` (PostgreSQL native FTS)
- B-tree index on `downloads` (for popularity ranking)
- Partial index on `Listing("status") WHERE status = 'active'` (only search active listings)

### **Query Optimization**
```sql
-- Optimized query
SELECT id, title, price, rating, downloads
FROM "Listing"
WHERE "status" = 'active'
  AND "searchVector" @@ plainto_tsquery('image upscaler')
ORDER BY
  ts_rank("searchVector", plainto_tsquery('image upscaler')) DESC,
  downloads DESC,
  rating DESC
LIMIT 5;
```

---

## 🚀 Deployment Checklist

- [ ] PostgreSQL `pg_trgm` extension installed
- [ ] FTS indexes created and warm
- [ ] Search API rate limited (10 req/sec per user)
- [ ] Sentry error tracking configured for search failures
- [ ] CDN cache headers set (ETag-based)
- [ ] Search analytics dashboard wired up
- [ ] A/B test: ranking algorithm variant

---

## 📝 Acceptance Signature

**Feature Accepted When**:
1. ✅ All AC1-AC7 criteria met
2. ✅ All unit/integration/E2E tests pass
3. ✅ Performance: search response < 200ms (p95)
4. ✅ Accessibility: WCAG 2.1 AA compliant
5. ✅ Code review approved
6. ✅ Deployed to staging, manual QA passed

---

## 🎓 Implementation Notes for AI Agent

### **Start Here**
1. Create `SearchService` in `backend/src/services/SearchService.ts`
2. Add database migration for FTS support
3. Implement `SearchController` with route handler
4. Build `SearchInput` + `SearchResultItem` components
5. Connect frontend hooks to API
6. Write tests in parallel

### **Common Pitfalls to Avoid**
- ❌ Calling search API on every keystroke (SLOW)
- ✅ Use 300ms debounce
- ❌ Returning too many results (confusing UX)
- ✅ Limit to 5 in dropdown, 50 for full results page
- ❌ Not handling empty queries
- ✅ Require minimum 2 characters
- ❌ Forgetting keyboard navigation
- ✅ Support arrow keys + Enter on results

### **Files to Create/Modify**
```
backend/
├── src/services/SearchService.ts           [NEW]
├── src/controllers/SearchController.ts     [NEW]
├── src/routes/search.routes.ts             [NEW]
└── prisma/migrations/NNN_add_fts.sql      [NEW]

frontend/
├── src/modules/marketplace/ui/SearchInput.tsx [NEW]
├── src/modules/marketplace/ui/SearchResultItem.tsx [NEW]
└── src/modules/marketplace/hooks/useSearch.ts [NEW]
```

---

## ✅ Definition of Done

- [ ] Code passes linting (ESLint)
- [ ] Unit test coverage: 80%+
- [ ] Integration tests: 2+ scenarios
- [ ] E2E tests: 3+ happy paths
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met
- [ ] Code reviewed + approved
- [ ] Staging deployment + QA passed
- [ ] Metrics dashboard shows search analytics
- [ ] Documentation updated (README, architecture)

