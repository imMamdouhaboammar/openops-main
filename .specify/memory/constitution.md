# PixelForge Studio Constitution

<!--
Sync Impact Report

Version change: 1.0.0 -> 1.1.0
Modified principles: "Code Quality Gates" -> "I. Code Quality & Maintainability" (expanded),
	"VIII. Testing - Test-First" -> "II. Testing & Verification Standards" (expanded),
	"VII. Observable UX - No Silent Failures" -> "III. User Experience Consistency" (expanded),
	Added section: "IV. Performance & Scalability Requirements"
Added sections: none removed
Templates requiring updates:
	- .specify/templates/plan-template.md: ✅ reviewed
	- .specify/templates/spec-template.md: ✅ reviewed
	- .specify/templates/tasks-template.md: ✅ reviewed
Follow-up TODOs:
	- None critical; ensure CI quality gates include new coverage/perf metrics (recommended)
-->

## Core Principles

### I. Code Quality & Maintainability
Code MUST be readable, reviewable, and maintainable. Enforce linting, formatting, and small PR sizes (max 400 lines per feature file where practical).

- PRs MUST include a concise rationale and risk assessment for any deviation from norms.
- Automated linters (ESLint/Prettier) and type checks MUST run in CI and block merges on failure.
- All new libraries require a dependency-review note in the plan.md and a security scan post-install.
- Maintainability metrics (cyclomatic complexity, duplication) SHOULD be tracked; values above thresholds MUST be justified.

Rationale: High-quality code reduces onboarding time, decreases defects, and enables safe refactoring.

### II. Testing & Verification Standards
Testing is mandatory and follows Test-First principles where feasible.

- Unit tests MUST cover critical logic paths; integration tests MUST validate cross-component behavior.
- Tests MUST be deterministic, fast (unit <200ms typical), and isolated from external networks using mocks or fakes.
- For AI integrations, create contract tests with mocked API behaviors and golden-file regression tests for outputs.
- CI gates: unit test suite, integration smoke tests, and E2E scenarios for P1 user journeys. Tests failing the CI MUST block merges.
- Coverage targets: project-wide baseline SHOULD be 70% with critical modules at 90%+. Coverage reporting MUST be visible in PRs.

Rationale: Reliable automated tests prevent regressions and enable rapid, safe delivery.

### III. User Experience Consistency
UX MUST be coherent, accessible, and predictable across the product surface.

- Use shared design tokens and UI primitives. Visual and interaction patterns MUST be centralized in the UI library.
- Accessibility: WCAG AA baseline; keyboard navigation and ARIA labels required. Color contrast >= 4.5:1.
- Error states MUST be actionable and localized. Long-running actions MUST surface progress and cancellation affordances.
- New UI components MUST include usage docs, design rationale, and visual regression tests.

Rationale: Consistent UX improves usability, reduces support overhead, and increases product trust.

### IV. Performance & Scalability Requirements
Performance targets are explicit and measurable; performance regressions are treated as bugs.

- Establish service-level performance goals per-plan (e.g., p95 latency targets, memory budgets). These MUST be captured in plan.md.
- Client targets: interactive response (p95) < 500ms for key UI interactions; initial route render < 1s on 3G for primary flows where applicable.
- Backend/API targets: p95 < 300ms for core APIs under typical load; offline-capable features MUST gracefully degrade.
- Profiling and benchmarks MUST be part of the delivery checklist for any performance-sensitive change. Regression tests SHOULD be included.

Rationale: Explicit performance requirements protect user experience and support scale planning.

## Technology Stack (Locked)

**Frontend:** Vite + React + TypeScript + Tailwind CSS + Lucide Icons
**State:** Zustand v5.0.9 with devtools + subscribeWithSelector
**Database:** Dexie v4.0.1 (IndexedDB), schema versioning
**AI:** @google/genai v1.33.0 via GeminiClient wrapper
**Graph Execution:** Custom Kahn's algorithm (toposort) + DFS (cycles) + Promise.allSettled
**Validation:** Zod v4.3.4, no runtime type assertions
**Utilities:** p-retry v7.1.1, immer v11.1.0, Web Crypto API (SHA-256)
**UI Components:** React Flow (@xyflow/react) for node editors

## Architecture Rules

1. **Relative Imports Only** - Use `../../modules/...` never absolute paths or path aliases
2. **Barrel Exports** - Each module has `index.ts` exporting public API
3. **No Async Top-Level** - Initialize cores via `setup()/cleanup()` pattern in initializeCores.ts
4. **Error Boundaries** - UI errors caught, logged, displayed. API errors with retry logic.
5. **Memory Management** - AbortControllers for long operations, event unsubscribe in cleanup, blob ref-counting
6. **Accessibility** - ARIA attributes on interactive elements, keyboard navigation, color contrast > 4.5:1

## Code Quality Gates

- **Linting:** ESLint strict mode, no console.log in prod code
- **Types:** TypeScript strict = true, no `any` types unless explicitly exempted with documented rationale
- **Coverage:** Project baseline coverage SHOULD be 70%; critical modules MUST meet 90%+ where specified
- **Performance:** Client interactive targets and API p95 targets captured in plan.md and validated by regression tests
- **Security:** No credentials in code, secrets via env vars, dependency security scans on new dependencies

## Development Workflow

1. **Specification** - Write spec with `/speckit.specify` (what + why, not tech)
2. **Planning** - Create plan with `/speckit.plan` (tech stack + architecture choices); include performance/coverage targets
3. **Tasks** - Generate tasks with `/speckit.tasks` (actionable, sized, sequenced)
4. **Implementation** - Execute with `/speckit.implement` (build per task, test as you go)
5. **QA** - Manual testing + integration tests + performance checks
6. **Documentation** - Update reports, JSDoc comments, troubleshooting guides

## Governance

This constitution supersedes all other practices. All code must comply or justify deviation in PR comments. Complexity must be addressed from the root (refactoring architecture, not patching). Feature branches must pass:
- `npm run build` (no errors)
- `npm run lint` (strict mode)
- `npm run test` (all tests pass)
- Manual QA flows (documented outcomes)

**Version**: 1.1.0 | **Ratified**: 2026-01-08 | **Last Amended**: 2026-01-12 | **Framework**: PixelForge Studio
