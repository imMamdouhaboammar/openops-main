---
description: "Coding Rules & Standards for OpenOps Agents Fleet Marketplace"
date: 2026-01-12
version: 1.0.0
---

# 🔧 OpenOps Agents Fleet Marketplace - Coding Rules

**Essential guidelines for all developers on the OpenOps Agents Fleet Marketplace project.**

Last Updated: 2026-01-12 | Version: 1.0.0

---

## 📋 Table of Contents

1. [Core Principles](#core-principles)
2. [Language & Type Safety](#language--type-safety)
3. [Code Style & Formatting](#code-style--formatting)
4. [Architecture & Patterns](#architecture--patterns)
5. [Frontend Rules](#frontend-rules)
6. [Backend Rules](#backend-rules)
7. [Error Handling](#error-handling)
8. [Testing Requirements](#testing-requirements)
9. [Performance Standards](#performance-standards)
10. [Security Standards](#security-standards)
11. [Documentation Standards](#documentation-standards)
12. [Git & Code Review](#git--code-review)
13. [Common Pitfalls](#common-pitfalls)

---

## Core Principles

### The 5 Pillars (from Constitution v1.1.0)

1. **Code Quality First**: Every line of code must pass linting, typing, and testing
2. **User-Centric Testing**: Test real user workflows, not just edge cases
3. **Consistency Over Cleverness**: Readable code wins over concise code
4. **Performance by Default**: Lazy load, cache, debounce, and optimize from day 1
5. **Fail Safely**: All errors are caught, logged, and communicated to users

### Zero Tolerance Policies

- ❌ **No `any` types** - TypeScript strict mode enforced
- ❌ **No silent failures** - All errors must be logged and handled
- ❌ **No unvalidated input** - Zod validation on all external data
- ❌ **No hardcoded values** - All constants in `constants/` or `.env`
- ❌ **No console.log in production** - Use Winston logger instead
- ❌ **No skipped tests** - `.skip()` in tests = automatic CI failure
- ❌ **No security shortcuts** - All auth/payment goes through approved services

---

## Language & Type Safety

### TypeScript Configuration

**All TypeScript files must have:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### Type Naming

```typescript
// ✅ GOOD: Explicit, descriptive types
type SearchQuery = string;
type AgentId = Brand<string, 'AgentId'>;
interface Agent {
  id: AgentId;
  title: string;
  price: number;
}

// ❌ BAD: Vague, too generic
type Data = any;
interface Thing {
  value: unknown;
}
```

### Nullable vs Optional

```typescript
// ✅ GOOD: Clear intent
interface Order {
  id: OrderId;
  discount?: number;          // Optional (may not exist)
  canceledAt: Date | null;    // Nullable (can be null after cancellation)
}

// ❌ BAD: Ambiguous
interface Order {
  discount?: number | null;   // Too many ways to represent "no value"
  canceledAt?: Date;          // Unclear if it can be null
}
```

### Zod Validation

**All external input must be validated with Zod:**

```typescript
// ✅ GOOD: Zod schema validates all input
import { z } from 'zod';

const SearchQuerySchema = z.object({
  q: z.string().min(1).max(100),
  category: z.enum(['Agent', 'Template', 'Dataset']).optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
});

type SearchQuery = z.infer<typeof SearchQuerySchema>;

// Backend
app.get('/search', (req, res) => {
  const validated = SearchQuerySchema.safeParse(req.query);
  if (!validated.success) {
    return res.status(400).json({ error: validated.error });
  }
  // validated.data is now typed
});

// Frontend
const handleSearch = (rawInput: unknown) => {
  const validated = SearchQuerySchema.safeParse(rawInput);
  if (!validated.success) {
    toast.error('Invalid search');
    return;
  }
  search(validated.data);
};

// ❌ BAD: No validation
const handleSearch = (query: any) => {
  search(query); // Crashes at runtime
};
```

---

## Code Style & Formatting

### Formatting (Prettier)

**Prettier config** (`.prettierrc.json`):
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always"
}
```

**All commits must pass**:
```bash
npx prettier --check .
npx prettier --write .  # Auto-fix
```

### Linting (ESLint)

**All commits must pass**:
```bash
npx eslint .
npx eslint --fix .  # Auto-fix
```

### File Organization

```
src/
├── types/               # Shared types across modules
│   ├── api-contracts.ts # Request/response types
│   └── domain.ts        # Domain models (User, Agent, Order)
├── constants/           # Constants (enums, magic numbers)
├── utils/               # Utility functions
├── modules/
│   ├── search/
│   │   ├── api/         # API routes
│   │   ├── services/    # Business logic
│   │   ├── hooks/       # React hooks (frontend only)
│   │   ├── components/  # React components (frontend only)
│   │   ├── store/       # Zustand stores (frontend only)
│   │   ├── schemas/     # Zod schemas (validation)
│   │   └── index.ts     # Barrel export
│   └── ...
└── core/
    ├── EventBus.ts      # Event system
    ├── SessionManager.ts
    └── ...
```

### Naming Conventions

```typescript
// ✅ GOOD: Clear, semantic names

// Variables: camelCase
const isLoading = false;
const agentCount = 10;
const handleClick = () => {};
const fetchAgents = async () => {};

// Types/Interfaces: PascalCase
interface Agent { }
type SearchQuery = string;

// Enums: PascalCase with UPPER_CASE values
enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

// Constants: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const API_TIMEOUT = 30000; // 30s

// Private methods: _camelCase
class Service {
  private _initialize() { }
}

// React components: PascalCase
function SearchInput() { }
function FeaturedAgentCard() { }

// Custom hooks: useXxx
function useSearch() { }
function useFeatured() { }

// Zod schemas: XxxSchema
const AgentSchema = z.object({});
const SearchQuerySchema = z.object({});

// ❌ BAD: Vague, inconsistent
const data = {};
const x = 10;
const MYVAR = 'test';
function getStuff() { }
const MyComponent = () => {};
```

### Line Length & Complexity

```typescript
// ✅ GOOD: Short, readable lines (<100 chars)
const agents = await db.agent.findMany({
  where: { status: 'PUBLISHED' },
  orderBy: { downloads: 'desc' },
  take: 20,
});

// ✅ GOOD: Extract complex logic to variables
const publishedAgents = agents.filter(
  (agent) => agent.status === 'PUBLISHED'
);
const topDownloaded = publishedAgents.sort(
  (a, b) => b.downloads - a.downloads
);

// ❌ BAD: Long line hard to read
const topAgents = agents.filter(a => a.status === 'PUBLISHED').sort((a, b) => b.downloads - a.downloads).slice(0, 20);

// ❌ BAD: Nested ternaries
const status = agent.isNew ? 'NEW' : agent.isFeatured ? 'FEATURED' : agent.isTrending ? 'TRENDING' : 'NORMAL';

// ✅ GOOD: Use guard clauses
if (agent.isNew) return 'NEW';
if (agent.isFeatured) return 'FEATURED';
if (agent.isTrending) return 'TRENDING';
return 'NORMAL';
```

---

## Architecture & Patterns

### Modular Structure

**Each feature lives in its own module:**

```
modules/search/
├── ai/                      # AI/ML logic (prompts, models)
│   ├── prompts/
│   │   └── search.prompts.ts
│   └── schemas/
│       └── search-response.schema.ts
├── core/                    # Business logic
│   ├── SearchService.ts
│   └── IndexService.ts
├── hooks/                   # React hooks (frontend only)
│   └── useSearch.ts
├── store/                   # Zustand stores (frontend only)
│   └── searchStore.ts
├── ui/                      # React components (frontend only)
│   ├── SearchInput.tsx
│   ├── SearchResults.tsx
│   └── FilterSidebar.tsx
├── vault/                   # IndexedDB/Dexie (frontend only)
│   └── searchCache.ts
└── index.ts                 # Barrel export
```

### Cross-Module Communication

**Rule: Use EventBus for cross-module events, NEVER direct imports**

```typescript
// ✅ GOOD: Event-driven communication
// In search/index.ts
eventBus.emit({
  type: EVENTS.SEARCH_COMPLETED,
  source: 'search',
  payload: { results, query },
  meta: { correlationId },
});

// In recommendations/core/RecommendationService.ts
eventBus.subscribe(
  EVENTS.SEARCH_COMPLETED,
  (event) => {
    this.updateRecommendations(event.payload.query);
  }
);

// ❌ BAD: Direct imports (creates circular dependencies)
import { SearchService } from '../search/core/SearchService';
const results = new SearchService().search(query); // Tightly coupled

// ❌ BAD: Importing component from another module
import { SearchInput } from '../../search/ui/SearchInput'; // Wrong: modules should be independent
```

### Service Layer

```typescript
// ✅ GOOD: Separation of concerns
// services/SearchService.ts
export class SearchService {
  async search(query: SearchQuery): Promise<SearchResult[]> {
    // 1. Validate
    const validated = SearchQuerySchema.parse(query);
    
    // 2. Query database
    const results = await db.agent.findMany({
      where: {
        title: { contains: validated.q },
        status: 'PUBLISHED',
      },
    });
    
    // 3. Enrich
    const enriched = results.map((r) => this.enrichResult(r));
    
    // 4. Sort/paginate
    return enriched.slice(0, 20);
  }

  private enrichResult(agent: Agent): EnrichedAgent {
    return {
      ...agent,
      score: this.calculateRelevance(agent),
    };
  }
}

// In controller/route
app.get('/search', async (req, res) => {
  const service = new SearchService();
  const results = await service.search(req.query);
  res.json(results);
});

// In React component
function SearchResults() {
  const [results] = useState<SearchResult[]>([]);
  useEffect(() => {
    new SearchService().search(query).then(setResults);
  }, [query]);
  return <div>{results.map(r => <div key={r.id}>{r.title}</div>)}</div>;
}
```

### Dependency Injection

```typescript
// ✅ GOOD: Constructor injection for testability
export class SearchService {
  constructor(private db: Database, private logger: Logger) { }

  async search(query: string): Promise<SearchResult[]> {
    this.logger.info('Searching', { query });
    return this.db.agent.findMany({ where: { q: query } });
  }
}

// In tests
const mockDb = { agent: { findMany: jest.fn() } };
const service = new SearchService(mockDb, mockLogger);

// ❌ BAD: Global dependencies
const db = new Database();
export class SearchService {
  async search(query: string) {
    return db.agent.findMany({ where: { q: query } });
  }
}
// Can't test without real database
```

---

## Frontend Rules

### React Components

**All components < 300 LOC:**

```typescript
// ✅ GOOD: Focused, testable component
import { useState, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import { SearchInput } from './SearchInput';
import { ResultsList } from './ResultsList';

interface SearchContainerProps {
  onSelect: (agentId: string) => void;
}

export function SearchContainer({ onSelect }: SearchContainerProps) {
  const { query, setQuery, results, isLoading } = useSearch();

  return (
    <div className="search-container">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Find AI agents..."
      />
      {isLoading && <LoadingSpinner />}
      <ResultsList results={results} onSelect={onSelect} />
    </div>
  );
}

// ❌ BAD: Too much logic, hard to test
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({ category: '', priceMin: 0, priceMax: 100 });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('recent');
  
  useEffect(() => {
    // 200 lines of fetching logic here...
  }, [query, filters, currentPage, sortBy]);

  return (
    <div>
      {/* 400 lines of JSX here... */}
    </div>
  );
}
```

### Hooks

**All hooks isolated and testable:**

```typescript
// ✅ GOOD: Custom hook with single responsibility
export function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${query}`);
        setResults(res.json());
      } catch (err) {
        toast.error('Search failed');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query]);

  return { query, setQuery, results, isLoading };
}

// Usage
function SearchComponent() {
  const { query, setQuery, results } = useSearch('');
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

// ❌ BAD: Hook with side effects
export function useSearchBad(query: string) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // No cleanup = memory leak
    fetch(`/api/search?q=${query}`).then(r => {
      console.log('Results:', r); // ← console.log in production
      setResults(r);
    });
  }, [query]);

  return results; // Missing isLoading state
}
```

### Zustand Store

```typescript
// ✅ GOOD: Focused store with type safety
import { create } from 'zustand';
import { subscribeWithSelector, devtools } from 'zustand/middleware';

interface SearchStore {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  setQuery: (q: string) => void;
  setResults: (r: SearchResult[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useSearchStore = create<SearchStore>()(
  devtools(
    subscribeWithSelector((set) => ({
      query: '',
      results: [],
      isLoading: false,
      setQuery: (q) => set({ query: q }),
      setResults: (r) => set({ results: r }),
      setIsLoading: (loading) => set({ isLoading: loading }),
    }))
  )
);

// Usage
function SearchComponent() {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

// ❌ BAD: Global mutable state
const searchState = { query: '', results: [] };
```

### Component Props

```typescript
// ✅ GOOD: Explicit, typed props
interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onSelect: (id: AgentId) => void;
  onLoadMore?: () => void;
}

export function SearchResults({ results, isLoading, onSelect, onLoadMore }: SearchResultsProps) {
  return <div>{/* ... */}</div>;
}

// ❌ BAD: Any props
export function SearchResults(props: any) {
  return <div>{props.items.map(item => <div onClick={() => props.onClick(item.id)}>{item.name}</div>)}</div>;
}
```

### Event Handling

```typescript
// ✅ GOOD: Debounced input, proper event types
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedSearch = useDebounce(query, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  useEffect(() => {
    if (debouncedSearch) {
      search(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input onChange={handleChange} />;
}

// ❌ BAD: No debounce, causes network spam
function SearchInput() {
  const handleChange = (e: any) => {
    fetch(`/api/search?q=${e.target.value}`); // On every keystroke = 1000s of requests
  };
  return <input onChange={handleChange} />;
}
```

---

## Backend Rules

### Express Routes

```typescript
// ✅ GOOD: Type-safe, validated, error-handled
import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/asyncHandler';

const SearchQuerySchema = z.object({
  q: z.string().min(1).max(100),
  category: z.enum(['Agent', 'Template']).optional(),
});

export const searchRouter = Router();

searchRouter.get(
  '/search',
  asyncHandler(async (req, res) => {
    // Validate
    const validated = SearchQuerySchema.safeParse(req.query);
    if (!validated.success) {
      return res.status(400).json({
        error: 'Invalid query',
        details: validated.error.flatten(),
      });
    }

    // Execute
    const results = await searchService.search(validated.data);

    // Respond
    res.json({ success: true, data: results });
  })
);

// ❌ BAD: No validation, no error handling
app.get('/search', (req, res) => {
  const results = searchService.search(req.query.q);
  res.json(results); // Crashes if searchService throws
});
```

### Error Handling Middleware

```typescript
// ✅ GOOD: Centralized error handling
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Request error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: 'Validation failed', details: err.details });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(500).json({ error: 'Internal server error' });
}

// ❌ BAD: Silent failures
app.get('/search', (req, res) => {
  try {
    const results = searchService.search(req.query.q);
    res.json(results);
  } catch (err) {
    // No logging
    res.json({ error: 'Unknown error' });
  }
});
```

### Database Queries

```typescript
// ✅ GOOD: Type-safe Prisma queries with error handling
const agents = await db.agent.findMany({
  where: {
    title: { contains: query },
    status: 'PUBLISHED',
  },
  orderBy: { downloads: 'desc' },
  take: 20,
  select: {
    id: true,
    title: true,
    price: true,
    downloads: true,
  },
});

// ✅ GOOD: Explicit pagination
const page = Math.max(1, parseInt(req.query.page as string) || 1);
const pageSize = 20;
const skip = (page - 1) * pageSize;

const [agents, total] = await Promise.all([
  db.agent.findMany({
    where: { status: 'PUBLISHED' },
    skip,
    take: pageSize,
  }),
  db.agent.count({ where: { status: 'PUBLISHED' } }),
]);

res.json({
  data: agents,
  pagination: { page, pageSize, total, pages: Math.ceil(total / pageSize) },
});

// ❌ BAD: No limit, potential DoS
const agents = await db.agent.findMany({
  where: { title: { contains: req.query.q } },
});

// ❌ BAD: N+1 queries
const agents = await db.agent.findMany();
for (const agent of agents) {
  const reviews = await db.review.findMany({ where: { agentId: agent.id } });
  agent.reviews = reviews;
}
```

### Logging

```typescript
// ✅ GOOD: Structured logging with Winston
import { logger } from '../core/logger';

logger.info('Agent created', {
  agentId: agent.id,
  vendorId: agent.vendorId,
  timestamp: new Date(),
});

logger.error('Payment failed', {
  orderId: order.id,
  error: err.message,
  provider: 'stripe',
  timestamp: new Date(),
});

// ❌ BAD: console.log in production
console.log('Agent created:', agent);
console.error('Error:', err);
```

---

## Error Handling

### Response Format

**All errors must follow this format:**

```typescript
// ✅ GOOD: Consistent error format
interface ApiError {
  error: string;           // User-facing message
  code: string;            // Machine-readable code
  details?: Record<string, any>; // Additional context
  timestamp: string;       // When it happened
}

// Example
res.status(400).json({
  error: 'Invalid email format',
  code: 'INVALID_EMAIL',
  details: { email: 'test@' },
  timestamp: new Date().toISOString(),
});

// ❌ BAD: Inconsistent error format
res.status(400).json({ message: 'bad request' });
res.status(400).json({ err: 'validation failed' });
res.status(400).json({ errors: ['email required'] });
```

### Frontend Error Handling

```typescript
// ✅ GOOD: Error boundaries and fallbacks
function SearchComponent() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setError(null);
      const res = await fetch(`/api/search?q=${query}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Search failed');
      }
      setResults(res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error(error);
    }
  };

  return (
    <div>
      {error && <ErrorAlert message={error} />}
      <SearchInput onChange={handleSearch} />
    </div>
  );
}

// ❌ BAD: Unhandled promise rejection
fetch(`/api/search?q=${query}`).then(r => r.json()).then(setResults);
// If fetch fails, no error is shown
```

---

## Testing Requirements

### Coverage Minimums

- **Backend**: ≥80% coverage (Jest)
- **Frontend**: ≥70% coverage (Vitest)
- **Critical paths**: 100% coverage (payment, auth, uploads)

### Test Structure

```typescript
// ✅ GOOD: Clear test organization
describe('SearchService', () => {
  let service: SearchService;
  let mockDb: jest.Mocked<Database>;

  beforeEach(() => {
    mockDb = createMockDatabase();
    service = new SearchService(mockDb);
  });

  describe('search()', () => {
    it('should return matching agents', async () => {
      mockDb.agent.findMany.mockResolvedValue([
        { id: '1', title: 'Agent 1' },
      ]);

      const results = await service.search({ q: 'Agent' });

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Agent 1');
    });

    it('should handle empty query', async () => {
      const results = await service.search({ q: '' });
      expect(results).toEqual([]);
    });

    it('should throw on database error', async () => {
      mockDb.agent.findMany.mockRejectedValue(new Error('DB error'));

      await expect(service.search({ q: 'test' })).rejects.toThrow('DB error');
    });
  });
});

// ❌ BAD: Unclear tests
describe('SearchService', () => {
  it('works', async () => {
    const result = await search('test');
    expect(result).toBeDefined();
  });
});
```

### E2E Testing

```typescript
// ✅ GOOD: Realistic user flows with Playwright
test('User can search and view agent details', async ({ page }) => {
  // 1. Navigate to marketplace
  await page.goto('/marketplace');

  // 2. Search for agent
  await page.fill('input[placeholder="Search..."]', 'GPT Assistant');
  await page.waitForSelector('[data-testid="search-results"]');

  // 3. Click first result
  await page.click('[data-testid="agent-card"]:first-child');

  // 4. Verify detail page
  await expect(page).toHaveURL(/\/agents\/\d+/);
  await expect(page.locator('h1')).toContainText('GPT Assistant');
});

// ❌ BAD: Over-mocked tests
test('search returns data', async () => {
  const mockFetch = jest.fn().mockResolvedValue({ json: () => ({ data: [] }) });
  const results = await search('test');
  expect(mockFetch).toHaveBeenCalled();
});
```

---

## Performance Standards

### Target Metrics

| Metric | Target | Tool |
|--------|--------|------|
| Page Load | <1s | Lighthouse |
| API Response (p95) | <500ms | New Relic / Datadog |
| Component Render | <16ms (60fps) | React DevTools |
| Bundle Size | <500KB | Webpack Bundle Analyzer |
| Core Web Vitals | LCP <2.5s, FID <100ms, CLS <0.1 | Lighthouse |

### Code Optimization

```typescript
// ✅ GOOD: Lazy loading and code splitting
import { lazy, Suspense } from 'react';

const SearchResults = lazy(() => import('./SearchResults'));
const AnalyticsPanel = lazy(() => import('./AnalyticsPanel'));

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsPanel />
      </Suspense>
    </div>
  );
}

// ✅ GOOD: Memoization for expensive components
import { memo } from 'react';

interface AgentCardProps {
  agent: Agent;
  onSelect: (id: AgentId) => void;
}

export const AgentCard = memo(({ agent, onSelect }: AgentCardProps) => {
  return (
    <div onClick={() => onSelect(agent.id)}>
      <h3>{agent.title}</h3>
      <p>{agent.description}</p>
    </div>
  );
});

// ✅ GOOD: Database indexing for large queries
// In Prisma schema
model Agent {
  id        String  @id @default(cuid())
  title     String
  status    String
  downloads Int
  rating    Float

  @@index([status, downloads])    // For filtering
  @@index([rating, downloads])    // For sorting
  @@fulltext([title])             // For full-text search
}

// ❌ BAD: N+1 queries
for (const agent of agents) {
  const reviews = await db.review.findMany({ agentId: agent.id });
  agent.reviews = reviews; // 1000 queries for 1000 agents
}

// ✅ GOOD: Batch queries
const agentIds = agents.map(a => a.id);
const reviews = await db.review.findMany({
  where: { agentId: { in: agentIds } },
});
const reviewsByAgentId = new Map(reviews.map(r => [r.agentId, r]));

for (const agent of agents) {
  agent.reviews = reviewsByAgentId.get(agent.id) || [];
}
```

---

## Security Standards

### Authentication & Authorization

```typescript
// ✅ GOOD: JWT-based authentication
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('No token');
        return token;
      },
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload, done) => {
      done(null, { id: payload.sub, role: payload.role });
    }
  )
);

// Protected route
app.get(
  '/my-agents',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userId = req.user.id;
    // Now we know the user
  }
);

// ❌ BAD: Storing secrets in code
const SECRET = 'my-secret-key'; // Exposed in git!
const token = jwt.sign({ id: 1 }, SECRET);
```

### Input Validation & Sanitization

```typescript
// ✅ GOOD: Zod validation with sanitization
const UserInputSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8),
  fullName: z.string().max(255).trim(),
});

// ❌ BAD: No validation
app.post('/register', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
  };
  // Attacker can inject SQL, XSS, etc.
});
```

### Payment Security

```typescript
// ✅ GOOD: All payments through Stripe API
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

app.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: agent.title },
          unit_amount: agent.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ sessionId: session.id });
});

// ❌ BAD: Storing credit card locally
app.post('/pay', (req, res) => {
  const card = {
    number: req.body.cardNumber, // NEVER store card data!
    expiry: req.body.expiry,
    cvv: req.body.cvv,
  };
  // This is illegal (PCI-DSS violation)
});
```

### CORS & Headers

```typescript
// ✅ GOOD: Strict CORS policy
import cors from 'cors';

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// ❌ BAD: Allow all origins
app.use(cors()); // Allows any website to call your API
```

---

## Documentation Standards

### Code Comments

```typescript
// ✅ GOOD: Comments explain WHY, not WHAT
// We cache trending agents for 12h because:
// 1. Trending is recalculated every 12h
// 2. Frequent changes confuse users
// 3. Caching reduces database load by 80%
const TRENDING_CACHE_TTL = 12 * 60 * 60 * 1000;

// Stripe charges a 2.9% + $0.30 per transaction
// We pass this to users as-is (no markup)
const STRIPE_FEE_PERCENTAGE = 0.029;
const STRIPE_FEE_FIXED = 0.30;

// ❌ BAD: Comments state the obvious
// Set name to John
name = 'John';

// Loop through agents
for (const agent of agents) {
  // ...
}
```

### Function Documentation

```typescript
// ✅ GOOD: JSDoc for public functions
/**
 * Search for agents in the marketplace.
 * 
 * @param query - Search query (min 1, max 100 chars)
 * @param filters - Optional filters (category, priceMin, priceMax)
 * @returns Array of matching agents, max 20 results
 * @throws {ValidationError} If query is invalid
 * 
 * @example
 * const results = await searchAgents('GPT', { category: 'AI' });
 * // Returns: [{ id: '1', title: 'GPT Assistant', ... }]
 */
export async function searchAgents(
  query: string,
  filters?: SearchFilters
): Promise<SearchResult[]> {
  // ...
}

// ❌ BAD: No documentation
export async function search(q: any): any {
  // ...
}
```

### README Files

**Every module needs a README:**

```markdown
# Search Module

Search for AI agents by title, category, price, rating, etc.

## Features
- Full-text search on title & description
- Filter by category, price range, rating
- Sort by relevance, newest, price, rating
- Pagination with cursor support

## Architecture

```
search/
├── core/SearchService.ts     # Search logic
├── schemas/search.schema.ts  # Zod validation
├── hooks/useSearch.ts        # React hook
└── components/SearchInput.tsx # UI component
```

## Usage

### Backend (Search Service)
\`\`\`typescript
const service = new SearchService(db);
const results = await service.search({ q: 'GPT', category: 'AI' });
\`\`\`

### Frontend (React Hook)
\`\`\`typescript
function SearchPage() {
  const { results, isLoading } = useSearch('GPT');
  return <div>{results.map(r => <div key={r.id}>{r.title}</div>)}</div>;
}
\`\`\`

## Testing

```bash
npm test -- search/
```

Coverage: 85% (21/25 statements)

## Performance

- DB query: <50ms (cached)
- API response: <200ms (p95)
- Component render: <10ms
```

---

## Git & Code Review

### Commit Messages

**Format: `[MODULE] description`**

```
[search] Add full-text search with filters
[order] Fix payment webhook signature validation
[auth] Implement JWT token refresh
[ui] Improve accessibility on FilterSidebar
[perf] Add database indexes for agent listing
[test] Increase SearchService coverage to 90%
```

**Template:**
```
[search] Add full-text search

- Implemented FTS using PostgreSQL tsvector
- Added FilterService for multi-faceted filtering
- Created useSearch hook for React components
- 85% test coverage with Jest

Closes #123
Reviewed by @teammate
```

### Pull Request Checklist

Before submitting a PR, verify:

- [ ] All tests pass (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation updated (README, comments)
- [ ] Performance targets met (<500ms API, <1s page)
- [ ] No security issues (no secrets, validated input)
- [ ] Coverage maintained (≥80% backend, ≥70% frontend)
- [ ] Accessibility verified (WCAG 2.1 AA)

### Code Review

**All code must be reviewed before merge.**

Reviewer checklist:
- [ ] Code follows architecture patterns
- [ ] All types are explicit (no `any`)
- [ ] Error handling is comprehensive
- [ ] Tests cover happy path + error cases
- [ ] Performance acceptable (<500ms)
- [ ] Security concerns addressed
- [ ] Documentation is clear

---

## Common Pitfalls

### Pitfall 1: Race Conditions in React

```typescript
// ❌ BAD: Race condition
function SearchComponent() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query: string) => {
    const res = await fetch(`/api/search?q=${query}`);
    setResults(res.json()); // What if user searched again?
  };

  return <input onChange={(e) => handleSearch(e.target.value)} />;
}

// ✅ GOOD: Cancel previous request
function SearchComponent() {
  const [results, setResults] = useState([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = async (query: string) => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch(`/api/search?q=${query}`, {
        signal: abortControllerRef.current.signal,
      });
      setResults(res.json());
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return; // Request was cancelled
      }
      throw err;
    }
  };

  return <input onChange={(e) => handleSearch(e.target.value)} />;
}
```

### Pitfall 2: Memory Leaks

```typescript
// ❌ BAD: Memory leak (event listener not removed)
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  // Missing cleanup
}, []);

// ✅ GOOD: Cleanup registered
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// ❌ BAD: Unsubscribed observable
useEffect(() => {
  const subscription = eventBus.subscribe('search', handleSearch);
  // Missing unsubscribe
}, []);

// ✅ GOOD: Unsubscribe on unmount
useEffect(() => {
  const unsubscribe = eventBus.subscribe('search', handleSearch);
  return () => unsubscribe();
}, []);
```

### Pitfall 3: Stale Closures

```typescript
// ❌ BAD: Stale closure
function SearchComponent() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(query); // Always logs initial empty string
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Missing query dependency

  return (
    <input value={query} onChange={(e) => setQuery(e.target.value)} />
  );
}

// ✅ GOOD: Include in dependency array
useEffect(() => {
  const interval = setInterval(() => {
    console.log(query); // Logs current query
  }, 1000);
  return () => clearInterval(interval);
}, [query]); // Include query
```

### Pitfall 4: Unhandled Promise Rejections

```typescript
// ❌ BAD: Unhandled rejection
app.get('/agents', async (req, res) => {
  const agents = await db.agent.findMany(); // What if this throws?
  res.json(agents);
});

// ✅ GOOD: Error handler
app.get(
  '/agents',
  asyncHandler(async (req, res) => {
    const agents = await db.agent.findMany();
    res.json(agents);
  })
);

// Where asyncHandler is:
function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
```

### Pitfall 5: Mutating State

```typescript
// ❌ BAD: Direct mutation
const handleAddFilter = (newFilter: Filter) => {
  filters.push(newFilter); // Mutation!
  setFilters(filters);     // React won't detect change
};

// ✅ GOOD: Create new array
const handleAddFilter = (newFilter: Filter) => {
  setFilters([...filters, newFilter]);
};

// ❌ BAD: Deep mutation
const handleUpdateAgent = (agentId: string, updates: Partial<Agent>) => {
  const agent = agents.find(a => a.id === agentId);
  Object.assign(agent, updates); // Mutation!
  setAgents(agents);
};

// ✅ GOOD: Immutable update
const handleUpdateAgent = (agentId: string, updates: Partial<Agent>) => {
  setAgents(
    agents.map(a =>
      a.id === agentId ? { ...a, ...updates } : a
    )
  );
};
```

---

## Quick Reference

### Command Checklist

```bash
# Before committing
npm run type-check    # TypeScript check
npm run lint          # ESLint check
npm run format        # Prettier format
npm test              # Run all tests
npm run build         # Build check

# Before pushing
git diff --check      # No trailing whitespace
git log origin..HEAD  # Review commits

# CI/CD (automated)
npm run test:coverage # Must be ≥80% backend, ≥70% frontend
npm run test:e2e      # Playwright E2E tests
npm run security      # Security audit
```

### Environment Variables

**Required .env entries:**

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/marketplace

# JWT
JWT_SECRET=super-secret-key-change-in-prod

# Stripe (https://dashboard.stripe.com/apikeys)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Wise (https://wise.com/api)
WISE_API_KEY=...

# Frontend
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...

# Logging
LOG_LEVEL=info
NODE_ENV=development
```

---

## Additional Resources

- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [React Best Practices](https://react.dev/reference/react)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Zod Documentation](https://zod.dev/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [WCAG 2.1 Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Security Cheat Sheet](https://cheatsheetseries.owasp.org/)

---

**Last Updated**: 2026-01-12
**Maintainer**: OpenOps Development Team
**Questions?** See [DEVELOPER_QUICKSTART.md](./DEVELOPER_QUICKSTART.md) or ask in #dev-help

