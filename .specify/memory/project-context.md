# PixelForge Studio - Project Context

**Last Updated**: January 11, 2026  
**Version**: 1.0.0  
**Purpose**: Persistent memory for AI assistants working on this project

---

## Project Identity

### What is PixelForge Studio?
A **local-first, AI-powered creative operating system** for professional image generation, enhancement, and mockup creation. It runs entirely in the browser with optional cloud AI services.

### Core Value Proposition
- **Local-First**: All data stored in browser IndexedDB, works offline
- **AI-Native**: Gemini 3 Pro integrated at every layer
- **Event-Driven**: Decoupled components communicate via event bus
- **Type-Safe**: Strict TypeScript throughout with Zod validation
- **Modular**: Features isolated in self-contained modules (<400 lines)
- **Observable**: No silent failures, all operations tracked

---

## Technical Stack

### Frontend
- **Framework**: Vite 6.2.0 + React 19.2.3
- **Language**: TypeScript 5.8.2 (strict mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React 0.561.0

### State Management
- **UI State**: Zustand 5.0.9 (devtools + subscribeWithSelector)
- **Server State**: TanStack React Query 5.90.12
- **Database**: Dexie 4.0.1 (IndexedDB wrapper)

### AI Integration
- **Primary**: @google/genai 1.33.0 (Gemini 3 Pro)
- **SDK**: @ai-sdk/google 2.0.49
- **Utilities**: p-retry 7.1.1 for resilience

### Validation & Type Safety
- **Schema**: Zod 4.3.4
- **Runtime**: Strict TypeScript, no `any` types

### Graph & Flow
- **Node Editor**: @xyflow/react 12.0.0
- **State Machine**: XState 5.25.0

### Utilities
- **Immutability**: Immer 11.1.0
- **Hashing**: Web Crypto API (SHA-256)
- **Compression**: JSZip 3.10.1

---

## Architecture Principles

### 1. Modular Architecture
- No file exceeds 400 lines
- Each module has clear boundaries
- Barrel exports via `index.ts`
- Relative imports only (no aliases)

### 2. Event-Driven Communication
- All inter-module communication via `EnhancedEventBus`
- Events include correlation IDs for tracing
- Middleware pipeline for logging, validation, rate limiting
- Events are stateless and idempotent

### 3. Type Safety First
- TypeScript strict mode mandatory
- Zod validation for all external data
- Discriminated unions for complex state
- No `any` types (except legacy with `@ts-ignore`)

### 4. State Persistence
- Zustand for reactive UI state
- Dexie for persistent storage
- IndexedDB for blob storage with deduplication
- Automatic schema migrations

### 5. AI Integration Pattern
```typescript
// Unified client wrapper
GeminiClient.generate({
  prompt: string,
  schema?: ZodSchema,
  signal?: AbortSignal,
  onProgress?: (update) => void
})

// Resilience with p-retry
pRetry(
  () => GeminiClient.generate(...),
  { retries: 3, minTimeout: 2000, maxTimeout: 10000 }
)
```

### 6. Caching Strategy
- SHA-256 hash-based cache keys
- Cache-first approach: check before API call
- Results stored in Dexie with TTL (30 days)
- Storage quota monitoring at 80% threshold

### 7. Observable UX
- All errors visible to users with actionable messages
- Progress indicators for long operations
- Loading stages clearly labeled
- Network trace IDs for debugging

### 8. Testing Requirements
- Unit tests for graph algorithms (>80% coverage)
- Integration tests with mocked AI
- Manual QA flows documented
- No feature ships without passing tests

---

## Module Structure

### Tool Modules
- `modules/generator/` - Prompt to Image
- `modules/enhancer/` - Image Enhancement
- `modules/upscaler/` - AI Upscaling
- `modules/creative-director/` - Moodboards & Storyboards
- `modules/reference/` - Style-based Variations
- `modules/mockups-spaces/` - Node-based Mockup Workflow
- `modules/iconsmith/` - Icon Generation & Editing
- `modules/slidesmith/` - Presentation Creation

### Core Systems
- `core/event-bus/` - Enhanced event system
- `core/orchestrator/` - Event orchestration
- `core/storage/` - Dexie database layer
- `core/hooks/` - Shared React hooks
- `core/shortcuts/` - Keyboard navigation

### Infrastructure
- `ai/` - AI client wrappers and schemas
- `store/` - Zustand stores
- `utils/` - Shared utilities
- `accessibility/` - ARIA & keyboard support
- `branding/` - Brand assets & messaging

---

## Development Workflow

### Spec-Driven Process
1. **Clarify** (`/speckit.clarify`) - Resolve ambiguities
2. **Specify** (`/speckit.specify`) - Write what & why
3. **Plan** (`/speckit.plan`) - Define how & architecture
4. **Tasks** (`/speckit.tasks`) - Break down work
5. **Implement** (`/speckit.implement`) - Build & test

### Quality Gates
Before any feature ships:
- ✅ `npm run build` (no errors)
- ✅ `npm run lint` (ESLint strict)
- ✅ `npm run test` (all tests pass)
- ✅ Manual QA flows completed
- ✅ Code review approved

### Code Quality Standards
- **Linting**: ESLint strict mode
- **Types**: TypeScript strict = true
- **Coverage**: Unit tests > 80%
- **Performance**: Component <5min render, API <2s
- **Accessibility**: WCAG 2.2 compliance

---

## Common Patterns

### Event Emission
```typescript
eventBus.emit('TOOL_STARTED', {
  toolId: 'enhance',
  correlationId: crypto.randomUUID()
});
```

### State Management
```typescript
// Zustand store
const useStore = create<State>((set) => ({
  value: initial,
  update: (newValue) => set({ value: newValue })
}));
```

### AI Generation
```typescript
const result = await pRetry(
  () => GeminiClient.generate({
    prompt,
    schema: MySchema,
    signal: abortController.signal,
    onProgress: (p) => console.log(p.percentage)
  }),
  { retries: 3 }
);
```

### Database Queries
```typescript
// Dexie transaction
await db.transaction('rw', db.results, async () => {
  await db.results.add({ id, data, createdAt: Date.now() });
});
```

---

## Known Constraints

### Browser Limitations
- IndexedDB quota varies by browser (typically 50% available storage)
- Web Crypto API required for SHA-256 hashing
- Service Workers not used (avoiding PWA complexity)

### AI API Limitations
- Gemini rate limits: ~60 RPM
- Max prompt length: ~30,000 characters
- Response timeout: 60 seconds

### Performance Targets
- Initial load: <3s on 4G
- Tool switch: <500ms
- AI generation: <30s per request
- Database queries: <100ms

---

## Active Features

### Production Ready
- ✅ Generator (text-to-image)
- ✅ Enhancer (image improvements)
- ✅ Upscaler (AI upscaling)
- ✅ Reference (style variations)

### In Development
- 🚧 Mockups Spaces (node-based workflow)
- 🚧 Creative Director (moodboards)
- 🚧 Iconsmith (icon generation)

### Planned
- 📋 Slidesmith (presentations)
- 📋 Batch Queue (multi-request processing)
- 📋 Session History (cross-tab sync)

---

## Important Files

### Configuration
- `package.json` - Dependencies & scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Build configuration
- `.specifyrc.json` - Spec-Kit settings

### Documentation
- `architecture.md` - Full architecture docs
- `SPEC-KIT-GUIDE.md` - Spec-driven workflow
- `.specify/memory/constitution.md` - Governance rules
- `.specify/memory/project-context.md` - This file

### Entry Points
- `index.html` - App entry
- `index.tsx` - React root
- `App.tsx` - Main component

---

## Remember

1. **Always consult constitution before coding**
2. **Follow Spec-Driven workflow for new features**
3. **No file >400 lines**
4. **Events for all inter-module communication**
5. **Zod validation for external data**
6. **Tests are non-negotiable**
7. **No silent failures - make errors observable**
8. **Check artifacts in `.specify/artifacts/` before planning**
