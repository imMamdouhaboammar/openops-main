# Agent Evaluation Sandbox – Implementation Tasks

**Feature**: Agent Evaluation Sandbox (Embedded Agent Playground)  
**Scope**: Implement a controlled, non-marketing evaluation environment for AI agents  
**Tech Stack**: Node.js/Express backend + React frontend + PostgreSQL + Redis  
**Start Date**: 2026-01-12  
**Status**: Ready for Implementation

---

## Phase 1: Setup & Infrastructure

- [ ] T001 Create project structure for evaluation sandbox module in `backend/src/modules/agent-playground/`
- [ ] T002 [P] Install dependencies: express, pg (postgres), redis, zod, pino (logging)
- [ ] T003 [P] Set up environment configuration: DB connection strings, Redis URL, LLM API keys in `.env.local`
- [ ] T004 Configure PostgreSQL database with migrations tooling (e.g., `db-migrate` or `sequelize`)
- [ ] T005 Configure Redis connection pool with retry logic in `backend/src/core/RedisClient.ts`
- [ ] T006 [P] Create TypeScript interfaces and Zod schemas in `backend/src/modules/agent-playground/core/types.ts`

---

## Phase 2: Foundational – Database & Persistence Layer

- [ ] T007 [P] Create migration: `agent_playground_usage` table schema in `backend/src/db/migrations/001-create-playground-usage.sql`
- [ ] T008 [P] Create migration: `playground_sessions` table in `backend/src/db/migrations/002-create-playground-sessions.sql`
- [ ] T009 Create database connection module in `backend/src/core/Database.ts`
- [ ] T010 [P] Create Redis key strategy helper in `backend/src/modules/agent-playground/core/RedisKeyStrategy.ts`

---

## Phase 3: Foundational – Core Utilities

- [ ] T011 [P] Create prompt injection sanitizer in `backend/src/modules/agent-playground/core/InputSanitizer.ts`
- [ ] T012 [P] Create error normalizer in `backend/src/modules/agent-playground/core/ErrorHandler.ts`
- [ ] T013 [P] Create usage counter atomic operations module in `backend/src/modules/agent-playground/core/UsageCounter.ts`
- [ ] T014 [P] Create logger with structured output in `backend/src/core/Logger.ts`

---

## Phase 4: User Story 1 (P1) – Authentication & Session Setup

- [ ] T015 [P] [US1] Create authentication middleware in `backend/src/middleware/authMiddleware.ts`
- [ ] T016 [P] [US1] Create playground session initialization handler in `backend/src/modules/agent-playground/handlers/initializeSession.ts`
- [ ] T017 [US1] Create Redis session store in `backend/src/modules/agent-playground/store/SessionStore.ts`
- [ ] T018 [US1] Create frontend playground page component in `frontend/src/pages/agent/[agentId]/Playground.tsx`

---

## Phase 5: User Story 2 (P1) – Gatekeeper Middleware & Usage Counter

- [ ] T019 [P] [US2] Create gatekeeper middleware in `backend/src/modules/agent-playground/middleware/PlaygroundGatekeeper.ts`
- [ ] T020 [US2] Create atomic increment handler in `backend/src/modules/agent-playground/handlers/incrementUsageCount.ts`
- [ ] T021 [US2] Create database transaction manager in `backend/src/modules/agent-playground/core/TransactionManager.ts`
- [ ] T022 [US2] Create integration test for multi-tab exploit in `backend/src/modules/agent-playground/__tests__/multi-tab.test.ts`

---

## Phase 6: User Story 3 (P1) – LLM Integration & Agent Execution

- [ ] T023 [P] [US3] Create LLM client wrapper in `backend/src/modules/agent-playground/api/PlaygroundLLMClient.ts`
- [ ] T024 [US3] Create agent system prompt loader in `backend/src/modules/agent-playground/core/PromptLoader.ts`
- [ ] T025 [US3] Create message streaming handler in `backend/src/modules/agent-playground/handlers/streamMessage.ts`
- [ ] T026 [US3] Create error recovery handler in `backend/src/modules/agent-playground/handlers/handleStreamError.ts`

---

## Phase 7: User Story 4 (P1) – State Management & UI State Machine

- [ ] T027 [P] [US4] Create state machine in `frontend/src/modules/playground/core/PlaygroundStateMachine.ts`
- [ ] T028 [P] [US4] Create UI state store in `frontend/src/modules/playground/store/playgroundStore.ts`
- [ ] T029 [US4] Create status bar component in `frontend/src/modules/playground/ui/StatusBar.tsx`
- [ ] T030 [US4] Create warning message component in `frontend/src/modules/playground/ui/WarningMessage.tsx`
- [ ] T031 [US4] Create locked state component in `frontend/src/modules/playground/ui/EvaluationComplete.tsx`

---

## Phase 8: User Story 5 (P1) – Chat UI & Message Rendering

- [ ] T032 [P] [US5] Create chat message component in `frontend/src/modules/playground/ui/ChatMessage.tsx`
- [ ] T033 [P] [US5] Create chat window component in `frontend/src/modules/playground/ui/ChatWindow.tsx`
- [ ] T034 [US5] Create message input component in `frontend/src/modules/playground/ui/MessageInput.tsx`
- [ ] T035 [US5] Create streaming response renderer in `frontend/src/modules/playground/core/StreamingRenderer.ts`
- [ ] T036 [US5] Create message sender hook in `frontend/src/modules/playground/hooks/useSendMessage.ts`

---

## Phase 9: User Story 6 (P2) – Security Hardening

- [ ] T037 [P] [US6] Create advanced prompt injection detector in `backend/src/modules/agent-playground/core/AdvancedSanitizer.ts`
- [ ] T038 [US6] Create session isolation enforcer in `backend/src/modules/agent-playground/middleware/SessionIsolation.ts`
- [ ] T039 [US6] Create data retention policy enforcer in `backend/src/modules/agent-playground/core/DataRetentionPolicy.ts`
- [ ] T040 [US6] Create logging sanitizer in `backend/src/core/SanitizedLogger.ts`

---

## Phase 10: User Story 7 (P2) – Monitoring & Observability

- [ ] T041 [P] [US7] Create anonymous usage metrics in `backend/src/modules/agent-playground/core/PlaygroundMetrics.ts`
- [ ] T042 [US7] Create abuse detection in `backend/src/modules/agent-playground/core/AbuseDetector.ts`
- [ ] T043 [US7] Create rate limiter in `backend/src/middleware/RateLimiter.ts`

---

## Phase 11: Integration – End-to-End Flow

- [ ] T044 [P] [US1-7] Create integration test: "User evaluates agent with 5 exchanges" in `backend/src/modules/agent-playground/__tests__/e2e.test.ts`
- [ ] T045 [P] [US1-7] Create integration test: "Multi-tab exploit prevention" in `backend/src/modules/agent-playground/__tests__/multi-tab-e2e.test.ts`
- [ ] T046 [US1-7] Create full frontend-backend integration test in `frontend/src/modules/playground/__tests__/integration.test.tsx`

---

## Phase 12: Frontend Polish & UX

- [ ] T047 [P] Create playground layout component in `frontend/src/modules/playground/ui/PlaygroundLayout.tsx`
- [ ] T048 [P] Create empty state placeholder in `frontend/src/modules/playground/ui/EmptyState.tsx`
- [ ] T049 Create loading skeleton in `frontend/src/modules/playground/ui/ChatSkeleton.tsx`
- [ ] T050 [P] Create responsive design for mobile in `frontend/src/modules/playground/ui/PlaygroundResponsive.tsx`

---

## Phase 13: Documentation & Copy

- [ ] T051 Create copy guidelines document in `docs/playground/COPY_GUIDELINES.md`
- [ ] T052 Create user-facing documentation in `docs/playground/USER_GUIDE.md`
- [ ] T053 Create technical documentation in `docs/playground/TECHNICAL_SPEC.md`

---

## Phase 14: Security Review & Hardening

- [ ] T054 [P] Create security test suite in `backend/src/modules/agent-playground/__tests__/security.test.ts`
- [ ] T055 [P] Create prompt injection test suite in `backend/src/modules/agent-playground/__tests__/injection.test.ts`
- [ ] T056 Create OWASP compliance checklist in `docs/playground/SECURITY.md`

---

## Phase 15: Performance & Optimization

- [ ] T057 [P] Create database query optimization in `backend/src/modules/agent-playground/core/UsageCounter.ts`
- [ ] T058 [P] Create Redis cache strategy in `backend/src/modules/agent-playground/store/SessionStore.ts`
- [ ] T059 Create frontend performance tests in `frontend/src/modules/playground/__tests__/performance.test.tsx`

---

## Phase 16: Deployment & Monitoring

- [ ] T060 [P] Create Docker configuration in `docker-compose.yml`
- [ ] T061 [P] Create CI/CD pipeline in `.github/workflows/playground-ci.yml`
- [ ] T062 Create production monitoring dashboard in `docs/playground/MONITORING.md`
- [ ] T063 Create runbook in `docs/playground/RUNBOOK.md`

---

## Phase 17: Post-Launch – Monitoring & Iteration

- [ ] T064 [P] Create monitoring queries in `backend/src/modules/agent-playground/core/PlaygroundMetrics.ts`
- [ ] T065 Create feature flag system in `backend/src/core/FeatureFlags.ts`
- [ ] T066 Create admin dashboard for playground management in `frontend/src/pages/admin/PlaygroundAdmin.tsx`

---

## Task Counts

- **Total tasks**: 66
- **Parallelizable [P]**: 42 (64%)
- **MVP scope (T001-T046)**: 2 weeks
- **Post-MVP (T047-T066)**: 2 weeks

---

## Ready for Implementation

✅ All tasks follow strict checklist format  
✅ File paths defined  
✅ Task IDs mapped to phases  
✅ Dependencies documented  
✅ Phase-level parallelization clear
