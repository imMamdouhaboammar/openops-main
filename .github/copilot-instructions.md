# PixelForge Studio – Copilot brief

Concise rules to make AI agents productive here (Vite + React 19 + TS strict + Tailwind). Keep files <400 lines and favor modular, event-driven patterns.

## Architecture map
- Modules live in `modules/{feature}` with `ai/ core/ hooks/ store/ ui/ vault/ index.ts`; no cross-module imports—communicate via `core/EventBus.ts` events with correlationId.
- Orchestrator (`core/orchestrator/`) runs guards → handlers → effects; register via `createFeatureRegistrar()` instead of subscribing in components.
- Core infra: `core/EventBus.ts`, `core/EventTypes.ts`, `core/EventStore.ts`, `core/SessionManager.ts`, `core/EngineMetrics.ts`, `core/GeminiObserver.ts`.
- AI layer: all calls go through `ai/client/GeminiClient.ts` + `ModelRouter.ts`; prompts in `ai/prompts/*.prompts.ts`; validate every response with Zod schemas in `ai/schemas` and normalize errors via `ai/errors`.

## Data + state
- UI state: Zustand stores with `devtools` + `subscribeWithSelector` middleware; keep binary blobs out of state (store in Dexie vaults under `modules/*/vault`).
- Server/async state: React Query where applicable; persist durable data in IndexedDB via Dexie with migrations.
- Events are the source of truth for cross-feature updates; emit typed events declared in `core/EventTypes.ts`.

## UI/UX
- Use shared primitives from `ui/components/` and design tokens from `ui/theme/tokens.ts`; no raw HTML buttons/inputs. Maintain RTL and ARIA labels; ensure focus rings and ≥4.5:1 contrast.
- Long operations should surface progress and errors (ErrorBoundary + `normalizeError`); no silent failures.

## Spec-driven workflow
- Follow Spec-Kit flow: `/speckit.specify → /speckit.plan → /speckit.tasks → /speckit.implement`; constitution in `.specify/memory/constitution.md`. Copilot agents live in `.github/copilot/*.md` and mirror Claude commands.

## Commands to remember
- Dev: `npm run dev` (Vite @3000)
- Build/QA: `npm run build`, `npm run quality:all`
- Tests: `npm run test`, `npm run test:ui`, `npm run test:coverage`

## Patterns to copy
- Barrel exports via `index.ts` per feature; prefer relative imports (`@/` allowed to root, otherwise `../../`).
- AI usage example: `geminiClient.generateText({ task, prompt, image?, schema })` with p-retry + rate limiting baked in.
- Event example: `eventBus.emit({ type: EVENTS.AI_COMPLETED, source: 'upscaler', payload, meta: { correlationId } })`.

## Anti-patterns to avoid
- Direct module imports for cross-feature work—use events + orchestrator.
- Skipping Zod validation or calling Gemini APIs directly.
- Keeping base64 images in Zustand or bypassing Dexie migrations.
- Adding console logs in production paths; keep type safety (no unchecked `any`).

## Fast orientation
- Big-picture docs: `architecture.md`, `ai/README.md`, `core/README.md`, `agent.md` (agent rules), `modules/mockups-spaces/README.md` (complex workflow example).
- Entry points: `index.tsx`, `App.tsx`, `core/initializeCores.ts`.

Last updated: 2026-01-11
