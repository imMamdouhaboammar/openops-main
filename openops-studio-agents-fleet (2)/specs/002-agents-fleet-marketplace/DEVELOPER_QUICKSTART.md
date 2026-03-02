---
description: "Developer Quick Start Guide - How to Implement Each Spec"
date: 2026-01-12
---

# 🚀 Developer Quick Start - Implementing Each Spec

**This guide helps developers execute any spec from the 27-spec library.**

---

## How to Read & Implement a Spec

### Step 1: Pick a Spec
Choose from [INDEX_v2.md](./INDEX_v2.md) based on your assignment:
- **Wave 1**: SPEC_01_1 to 03_5 (Discovery, Product, Cart)
- **Wave 2**: SPEC_04_1 to 05_5 (Vendor, Analytics)
- **Wave 3**: SPEC_06_1 to 06_5 (Trust & Safety)
- **Wave 4**: SPEC_07_1 to 07_4 (Localization)

### Step 2: Read the Spec (9 Sections)

Each spec follows this structure:

1. **Feature Overview** (1 page)
   - What does this feature do?
   - Why does it matter?
   - User journey (happy path)

2. **Acceptance Criteria** (1-2 pages, 7-10 items)
   - Testable requirements (Given/When/Then format)
   - These are your test cases
   - Implementation is done when all AC pass

3. **Backend Architecture** (2-3 pages)
   - REST endpoint(s)
   - Request/response schemas (Zod)
   - Service layer (TypeScript class)
   - Controller (Express router)
   - Database queries

4. **Frontend Architecture** (2-3 pages)
   - React components (with JSX)
   - Custom hooks (React Query, Zustand)
   - State management
   - Data flow diagram

5. **Database Schema** (1-2 pages)
   - Prisma model changes
   - SQL migrations
   - Indexes for performance

6. **Testing Strategy** (2-3 pages)
   - Unit tests (Jest/Vitest)
   - Integration tests (full flow)
   - E2E tests (Playwright, browser)
   - Code examples for each

7. **Performance Optimization** (1 page)
   - Caching (Redis, HTTP cache)
   - Database indexing
   - Query optimization
   - Response time targets

8. **Files to Create/Modify** (1-2 pages)
   - Exact file paths
   - Backend: Service, Controller, tests
   - Frontend: Components, hooks, tests
   - Database: Prisma schema, migration SQL

9. **Definition of Done** (½ page)
   - Pre-deployment checklist
   - Code review requirements
   - Performance verification
   - Staging deployment confirmation

---

## Implementation Template (Per Spec)

### Phase 1: Setup & Planning (30 mins)

```bash
# 1. Read the entire spec (all 9 sections)
# 2. Extract acceptance criteria (AC1, AC2, ...)
# 3. Map AC to test cases
# 4. Identify 3 main components/services
# 5. Check dependencies: Does this spec depend on other specs?
```

**Example: SPEC_01_1_SmartSearch**
- AC1: Search input behavior → test search box renders
- AC2: Results display → test results list renders
- AC3: Ranking algorithm → test correct sorting
- ...
- Components: SearchInput, SearchResults
- Services: SearchService
- Depends on: None (can start immediately)

### Phase 2: Create Backend (2-4 hours)

```bash
# 1. Create Service class
#    ├─ backend/src/services/{FeatureName}Service.ts
#    └─ Implement all methods from spec

# 2. Create Controller (Express router)
#    ├─ backend/src/controllers/{FeatureName}Controller.ts
#    └─ Implement endpoints, validation, error handling

# 3. Update Database (Prisma)
#    ├─ backend/prisma/schema.prisma (add/modify models)
#    └─ backend/prisma/migrations/NNN_add_{feature}.sql

# 4. Create Tests
#    ├─ backend/tests/unit/{Feature}.test.ts (service logic)
#    └─ backend/tests/integration/{Feature}.test.ts (API endpoint)

# 5. Run & Verify
npm run db:migrate       # Apply migration
npm run test:unit        # Unit tests
npm run test:integration # Integration tests
```

**Code Example**: Backend Search Implementation
```typescript
// backend/src/services/SearchService.ts
export class SearchService {
  async search(query: string, limit: number, offset: number) {
    // 1. Validate input (Zod)
    // 2. Query database (PostgreSQL FTS)
    // 3. Log analytics
    // 4. Return results
  }
}

// backend/src/controllers/SearchController.ts
router.get("/api/v1/search", async (req, res) => {
  // 1. Validate query params
  // 2. Call SearchService
  // 3. Return results or error
});
```

### Phase 3: Create Frontend (2-4 hours)

```bash
# 1. Create Components
#    ├─ frontend/src/modules/{feature}/ui/Component.tsx
#    └─ All components from spec

# 2. Create Hooks
#    ├─ frontend/src/modules/{feature}/hooks/useFeature.ts
#    └─ Zustand store + React Query integration

# 3. Create Tests
#    ├─ frontend/tests/unit/{Feature}.test.tsx (component logic)
#    └─ frontend/tests/e2e/{Feature}.e2e.ts (Playwright, browser)

# 4. Run & Verify
npm run test:unit        # Component unit tests
npm run test:e2e         # E2E tests (requires dev server)
npm run build            # TypeScript type check
```

**Code Example**: Frontend Search Implementation
```typescript
// frontend/src/modules/marketplace/ui/SearchInput.tsx
export function SearchInput() {
  const { results, search, isLoading } = useSearch();
  
  return (
    <input
      type="search"
      placeholder="Search agents..."
      onChange={(e) => search(e.target.value)}
    />
  );
}

// frontend/src/modules/marketplace/hooks/useSearch.ts
export function useSearch() {
  const [query, setQuery] = useState("");
  const { data: results, isLoading } = useQuery(
    ["search", query],
    () => api.get("/api/v1/search", { params: { q: query } }),
    { debounceMs: 300 }
  );
  
  return { results, search: setQuery, isLoading };
}
```

### Phase 4: Testing & Verification (1-2 hours)

```bash
# 1. Unit Tests
npm run test:unit        # Jest/Vitest
# Target: ≥80% coverage

# 2. Integration Tests
npm run test:integration # Full API flows
# All endpoints tested

# 3. E2E Tests
npm run dev              # Start dev server
npm run test:e2e         # Playwright
# All user flows tested

# 4. Manual Testing
# Open app in browser, test manually

# 5. Verify All AC Pass
# Go through each acceptance criterion
# Confirm implementation satisfies each one
```

### Phase 5: Performance & Deployment (1 hour)

```bash
# 1. Check Performance
npm run build            # Optimized build
npm run analyze          # Bundle analysis

# 2. Database Performance
npm run db:analyze       # Check query plans

# 3. Deploy to Staging
npm run deploy:staging

# 4. QA Testing
# Test in staging environment

# 5. Code Review
# Create PR, request review
# Merge after approval
```

---

## Example: Implementing SPEC_01_1_SmartSearch

### Read the Spec
- **Feature**: Full-text search on agent title, description, tags
- **AC1-AC8**: Search input, results display, ranking, typo tolerance, analytics, performance, accessibility
- **Backend**: GET /api/v1/search with Zod schema, SearchService, PostgreSQL FTS
- **Frontend**: SearchInput component, useSearch hook, result display

### Create Backend (3 hours)

```bash
# 1. Service
cat > backend/src/services/SearchService.ts << 'EOF'
export class SearchService {
  async search(query: string, limit: number, offset: number) {
    const validated = SearchSchema.parse({ query, limit, offset });
    const results = await prisma.$queryRaw`
      SELECT id, title, vendor, price, rating
      FROM listings
      WHERE search_vector @@ query_tsquery('english', ${query})
      ORDER BY ts_rank(search_vector, query_tsquery('english', ${query})) DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    return results;
  }
}
EOF

# 2. Controller
cat > backend/src/controllers/SearchController.ts << 'EOF'
router.get("/api/v1/search", async (req, res) => {
  const validated = SearchQuerySchema.parse(req.query);
  const results = await searchService.search(validated.q, 20, 0);
  res.json({ results, total: results.length });
});
EOF

# 3. Database Migration
cat > backend/prisma/migrations/001_add_fts.sql << 'EOF'
ALTER TABLE listings ADD COLUMN search_vector tsvector;
CREATE INDEX idx_search_vector ON listings USING GIN(search_vector);
EOF

# 4. Run
npm run db:migrate
npm run test:integration
```

### Create Frontend (3 hours)

```typescript
// SearchInput.tsx
export function SearchInput() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useQuery(
    ["search", query],
    () => api.get("/api/v1/search", { params: { q: query } }),
    { debounceMs: 500 }
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {isLoading && <Spinner />}
      {data?.results.map(r => <ResultItem key={r.id} {...r} />)}
    </div>
  );
}
```

### Test (1-2 hours)

```typescript
// Unit: SearchService calculates correctly
describe("SearchService", () => {
  it("should search by title", async () => {
    const results = await searchService.search("image", 20, 0);
    expect(results.some(r => r.title.includes("image"))).toBe(true);
  });
});

// Integration: API returns correct format
describe("GET /api/v1/search", () => {
  it("should return search results", async () => {
    const response = await request(app).get("/api/v1/search?q=image");
    expect(response.status).toBe(200);
    expect(response.body.results).toBeDefined();
  });
});

// E2E: User can search in browser
test("should search and display results", async ({ page }) => {
  await page.goto("/marketplace");
  await page.fill("input[type=search]", "image");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".result-item")).toContainText("image");
});
```

---

## Dependencies & Prerequisites

### Environment Setup
- Node.js 20 LTS
- PostgreSQL 16 (local docker-compose)
- Stripe API keys (sandbox)
- Wise API keys (sandbox)

### Tools
- VSCode with TypeScript extension
- Postman or Insomnia (API testing)
- Chrome DevTools (frontend debugging)
- Playwright Inspector (E2E debugging)

### Running Locally

```bash
# 1. Start services
docker-compose -f docker-compose.marketplace.yml up -d

# 2. Install dependencies
npm install --workspace=backend
npm install --workspace=frontend

# 3. Setup database
npm run --workspace=backend db:migrate

# 4. Start dev servers
npm run --workspace=backend dev    # Express on :3001
npm run --workspace=frontend dev   # Vite on :3000

# 5. Run tests
npm run --workspace=backend test:unit
npm run --workspace=frontend test:unit
npm run --workspace=frontend test:e2e  # Requires dev server running
```

---

## Common Pitfalls & Solutions

| Problem | Solution |
|---------|----------|
| **Database migration fails** | Check `schema.prisma` syntax, run `npm run db:reset` |
| **API tests fail** | Ensure dev server is running on correct port |
| **E2E tests fail** | Check Playwright dependencies: `npm install` |
| **React Query not caching** | Add `staleTime` parameter to useQuery options |
| **TypeScript errors** | Run `npm run build` to check all types |
| **Slow tests** | Use `vi.mock()` to mock API calls in unit tests |

---

## Performance Targets (By Spec Type)

| Metric | Target | How to Verify |
|--------|--------|--------------|
| **API Response** | <500ms (p95) | Postman timeline, server logs |
| **Page Load** | <1s | Chrome DevTools Network tab |
| **Component Render** | <16ms | React Profiler |
| **Test Coverage** | ≥80% | `npm run test:coverage` |
| **Bundle Size** | <500KB | `npm run analyze` |
| **Database Query** | <100ms | EXPLAIN ANALYZE in psql |

---

## Definition of Done Checklist

Before marking a spec complete:

- [ ] All 9 sections of spec read & understood
- [ ] All acceptance criteria (AC1-AC8+) identified
- [ ] Backend code written (Service + Controller)
- [ ] Frontend code written (Components + Hooks)
- [ ] Database schema updated (Prisma + migration)
- [ ] Unit tests passing (≥80% coverage)
- [ ] Integration tests passing (full flow)
- [ ] E2E tests passing (browser interaction)
- [ ] Code linted & formatted (`npm run lint`, `npm run format`)
- [ ] Code reviewed by peer (GitHub PR)
- [ ] Staging deployment successful
- [ ] QA sign-off (all AC verified)
- [ ] Metrics dashboard live (if applicable)
- [ ] Documentation updated (README, CHANGELOG)

---

## Resources

### Documentation
- [INDEX_v2.md](./INDEX_v2.md) - All 27 specs listed
- [ARCHITECTURE_PLAN.md](./ARCHITECTURE_PLAN.md) - System design
- [plan.md](../plan.md) - Tech stack details
- [data-model.md](../data-model.md) - Database entities

### Code References
- `backend/src/` - Example services & controllers
- `frontend/src/modules/` - Example components & hooks
- `backend/tests/` - Example test patterns
- `frontend/tests/` - Example test patterns

### External Tools
- [Zod Documentation](https://zod.dev/) - Schema validation
- [React Query Docs](https://tanstack.com/query/) - Server state management
- [Prisma Docs](https://www.prisma.io/docs/) - ORM & migrations
- [Playwright Docs](https://playwright.dev/) - E2E testing
- [PostgreSQL FTS](https://www.postgresql.org/docs/current/textsearch.html) - Full-text search

---

## Support & Questions

### If You Get Stuck
1. **Read the spec again** - Usually answers your question
2. **Check dependencies** - Make sure prerequisites are complete
3. **Look at similar specs** - SPEC_01_1 is detailed template
4. **Run tests** - Tests often show what's wrong
5. **Ask on Slack** - Team support channel

### Asking for Help
Provide:
- Which spec you're implementing
- What error you see
- What you've tried
- Expected vs. actual behavior

---

## Example: Full Spec Execution (Step by Step)

### Task: Implement SPEC_01_1_SmartSearch

**Time Estimate**: 6-8 hours total

**1. Planning (30 min)**
- Read all 9 sections of SPEC_01_1_SmartSearch.md
- Extract AC1-AC8
- Plan 3 components: SearchInput, SearchResults, SearchService
- Identify dependencies: None (start immediately)

**2. Backend (3 hours)**
```bash
# 2.1 Create Service (1 hour)
touch backend/src/services/SearchService.ts
# Implement: search(), fuzzyMatch(), rankResults()

# 2.2 Create Controller (30 min)
touch backend/src/controllers/SearchController.ts
# Implement: GET /api/v1/search endpoint

# 2.3 Database (30 min)
# Update schema.prisma, create migration
npm run db:migrate

# 2.4 Tests (1 hour)
npm run test:unit                    # SearchService unit tests
npm run test:integration             # API endpoint tests
```

**3. Frontend (3 hours)**
```bash
# 3.1 Components (1 hour)
touch frontend/src/modules/marketplace/ui/SearchInput.tsx
touch frontend/src/modules/marketplace/ui/SearchResults.tsx
# Implement both components

# 3.2 Hook (1 hour)
touch frontend/src/modules/marketplace/hooks/useSearch.ts
# Implement React Query + Zustand integration

# 3.3 Tests (1 hour)
npm run test:unit            # Component tests
npm run test:e2e             # Browser tests (Playwright)
```

**4. Verification (1-2 hours)**
- [ ] AC1: Search input renders ✓
- [ ] AC2: Results display ✓
- [ ] AC3: Ranking works ✓
- [ ] AC4: Typo tolerance ✓
- [ ] AC5: Analytics logged ✓
- [ ] AC6: <200ms response ✓
- [ ] AC7: Keyboard nav works ✓
- [ ] AC8: Mobile responsive ✓
- [ ] All tests pass ✓
- [ ] Code reviewed ✓
- [ ] Deployed to staging ✓

**Total: 6-8 hours** ✓ Done!

---

**Ready to implement?** Pick a spec from [INDEX_v2.md](./INDEX_v2.md) and follow this guide!

