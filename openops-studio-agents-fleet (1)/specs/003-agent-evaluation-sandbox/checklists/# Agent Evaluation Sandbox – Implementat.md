# Agent Evaluation Sandbox – Implementation Tasks

**Feature**: Agent Evaluation Sandbox (Embedded Agent Playground)  
**Scope**: Implement a controlled, non-marketing evaluation environment for AI agents  
**Tech Stack**: Node.js/Express backend + React frontend + PostgreSQL + Redis  
**Start Date**: 2026-01-12  
**Status**: Tasks Ready for Implementation

---

## Feature Overview

The Agent Evaluation Sandbox is an embedded Playground on each agent's product page that allows authenticated users to interact with the **real agent source code** under strict interaction limits (10 messages lifetime per user per agent). This is an engineering evaluation harness, not a marketing trial.

**Core Constraints**:
- 10 total messages per (user_id, agent_id) pair
- Both user input and agent output count as messages
- Permanent, non-resetable counter
- No upselling, no marketing copy
- Runs real agent system prompts (no demo mode)
- No conversation persistence
- Multi-tab exploit prevention via DB transactional locking

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
  - Columns: `user_id` (UUID), `agent_id` (UUID), `usage_count` (INT, default 0), `last_interaction_at` (TIMESTAMP), `created_at` (TIMESTAMP)
  - Unique constraint: `(user_id, agent_id)`
  - Indexes: `user_id`, `agent_id`, composite `(user_id, agent_id)`

- [ ] T008 [P] Create migration: `playground_sessions` table (ephemeral metadata tracking) in `backend/src/db/migrations/002-create-playground-sessions.sql`
  - Columns: `session_id` (UUID), `user_id` (UUID), `agent_id` (UUID), `created_at` (TIMESTAMP), `expires_at` (TIMESTAMP)
  - Index: `session_id`

- [ ] T009 Create database connection module in `backend/src/core/Database.ts`
  - Implement connection pool with error handling
  - Export query function with logging

- [ ] T010 [P] Create Redis key strategy helper in `backend/src/modules/agent-playground/core/RedisKeyStrategy.ts`
  - Key format: `playground:session:{sessionId}:context`
  - Key format: `playground:session:{sessionId}:warnings`
  - TTL strategy: 30 minutes default, immediate expiry on limit reached
  - Helper functions: `getSessionContextKey()`, `getWarningKey()`, `buildRedisKey()`

---

## Phase 3: Foundational – Core Utilities

- [ ] T011 [P] Create prompt injection sanitizer in `backend/src/modules/agent-playground/core/InputSanitizer.ts`
  - Detect patterns: "ignore instructions", "system override", "forget", "bypass"
  - Implement token-counting before submission (hard cap: 2000 tokens)
  - Export function: `sanitizeUserInput(input: string): { clean: string, flagged: boolean }`

- [ ] T012 [P] Create error normalizer in `backend/src/modules/agent-playground/core/ErrorHandler.ts`
  - Normalize API errors (LLM timeouts, crashes, etc.)
  - Distinguish: "input processed but output failed" vs "complete failure"
  - Export: `normalizeError(err: Error): { type: 'input-only' | 'complete-failure', message: string }`

- [ ] T013 [P] Create usage counter atomic operations module in `backend/src/modules/agent-playground/core/UsageCounter.ts`
  - Function: `incrementUsageCount(userId: UUID, agentId: UUID, count: 1 | 2): Promise<{ newCount: number, remaining: number }>`
  - Function: `fetchUsageCount(userId: UUID, agentId: UUID): Promise<number>`
  - Function: `isLimitReached(count: number): boolean` (returns true if count >= 10)
  - Implement row-level locking to prevent multi-tab race conditions

- [ ] T014 [P] Create logger with structured output in `backend/src/core/Logger.ts`
  - Use `pino` with JSON formatting
  - Include correlation IDs for request tracking
  - No sensitive data (no user input, no raw prompts in logs)

---

## Phase 4: User Story 1 (P1) – Authentication & Session Setup

**Story Goal**: Validate that authenticated users can initiate an evaluation session with proper identity binding and message budget allocation.

**Test Criteria**:
1. Unauthenticated request is rejected
2. Authenticated user fetches playground page and sees "10/10 messages"
3. Session is created with proper user_id/agent_id binding
4. Usage counter is fetched and displayed in UI

- [ ] T015 [P] [US1] Create authentication middleware in `backend/src/middleware/authMiddleware.ts`
  - Validate JWT token from `Authorization: Bearer {token}`
  - Extract `user_id` and attach to request context
  - Return 401 if token missing or invalid

- [ ] T016 [P] [US1] Create playground session initialization handler in `backend/src/modules/agent-playground/handlers/initializeSession.ts`
  - Endpoint: `POST /api/playground/:agentId/init`
  - Fetch `usage_count` for (user_id, agent_id)
  - If not found, create row with usage_count = 0
  - Return: `{ sessionId, remaining: 10 - usage_count, state: 'INITIALIZED' }`
  - Store session in Redis with 30-min TTL

- [ ] T017 [US1] Create Redis session store in `backend/src/modules/agent-playground/store/SessionStore.ts`
  - Function: `createSession(userId: UUID, agentId: UUID, sessionId: UUID): Promise<void>`
  - Function: `getSession(sessionId: UUID): Promise<Session | null>`
  - Function: `deleteSession(sessionId: UUID): Promise<void>`
  - Function: `validateSessionActive(sessionId: UUID): Promise<boolean>`

- [ ] T018 [US1] Create frontend playground page component in `frontend/src/pages/agent/[agentId]/Playground.tsx`
  - Display loading state while fetching initial session
  - Show status bar: "Evaluation Mode: Active | 10 messages remaining"
  - Display terminal-style chat window (empty on init)
  - Show message input field (enabled)
  - Include footer with agent version info

---

## Phase 5: User Story 2 (P1) – Gatekeeper Middleware & Usage Counter

**Story Goal**: Implement strict message-by-message gatekeeping to ensure no user exceeds the 10-message lifetime limit, with database-level enforcement against multi-tab exploits.

**Test Criteria**:
1. Request is rejected if usage_count >= 10
2. Multi-tab access to same playground triggers DB lock; second tab sees updated count
3. Usage counter increments atomically for input (1) and output (1)
4. Failed output rolls back output increment but keeps input increment

- [ ] T019 [P] [US2] Create gatekeeper middleware in `backend/src/modules/agent-playground/middleware/PlaygroundGatekeeper.ts`
  - Check: `GET usage_count for (user_id, agent_id)`
  - If count >= 10: return `{ state: 'LOCKED', remaining: 0, message: 'Evaluation limit reached' }`
  - Else: allow request to proceed
  - Lock row during check: `SELECT ... FOR UPDATE` to prevent race conditions
  - Export: `gatekeeperMiddleware(req, res, next)`

- [ ] T020 [US2] Create atomic increment handler in `backend/src/modules/agent-playground/handlers/incrementUsageCount.ts`
  - Implement two-phase atomic operation:
    - **Phase 1 (Input)**: Increment by 1, verify < 10
    - **Phase 2 (Output)**: Increment by 1 after LLM call completes
  - On output failure: rollback Phase 2 increment only
  - Export: `incrementForInput()`, `incrementForOutput()`, `rollbackOutputIncrement()`

- [ ] T021 [US2] Create database transaction manager in `backend/src/modules/agent-playground/core/TransactionManager.ts`
  - Implement explicit transaction handling for atomic operations
  - Function: `withTransaction<T>(callback: () => Promise<T>): Promise<T>`
  - Implement row-level locking: `SELECT FOR UPDATE` before incrementing

- [ ] T022 [US2] Create integration test for multi-tab exploit in `backend/src/modules/agent-playground/__tests__/multi-tab.test.ts`
  - Simulate two concurrent requests with same (user_id, agent_id)
  - Verify second request sees updated count
  - Verify count increments only once per message, not per tab

---

## Phase 6: User Story 3 (P1) – LLM Integration & Agent Execution

**Story Goal**: Execute real agent system prompts with evaluation harness wrapper, streaming responses, and proper error handling.

**Test Criteria**:
1. Agent receives real system prompt (not demo version)
2. System OVERRIDE wrapper is applied invisibly
3. Response is streamed to client in real-time
4. If stream fails mid-generation, output credit is refunded

- [ ] T023 [P] [US3] Create LLM client wrapper in `backend/src/modules/agent-playground/api/PlaygroundLLMClient.ts`
  - Load agent system_prompt.md from agent source repository
  - Create system message with SYSTEM OVERRIDE appended:
    ```
    "You are running in a constrained evaluation environment.
     You have no memory of previous sessions.
     If tasks require external APIs (GitHub, Jira), state you cannot execute."
    ```
  - Export: `executeAgent(systemPrompt: string, userMessage: string): AsyncGenerator<string>`

- [ ] T024 [US3] Create agent system prompt loader in `backend/src/modules/agent-playground/core/PromptLoader.ts`
  - Fetch from agent source repository (S3, GitHub, or local)
  - Cache for 1 hour in Redis
  - Function: `getAgentSystemPrompt(agentId: UUID): Promise<string>`

- [ ] T025 [US3] Create message streaming handler in `backend/src/modules/agent-playground/handlers/streamMessage.ts`
  - Endpoint: `POST /api/playground/:agentId/message`
  - Validate session active
  - Run gatekeeper check
  - Sanitize input
  - Call `PlaygroundLLMClient.executeAgent()`
  - Stream response via Server-Sent Events (SSE)
  - On stream start: increment usage count (input)
  - On stream end: increment usage count (output)
  - On stream error: decrement output increment
  - Export context state to Redis after successful exchange

- [ ] T026 [US3] Create error recovery handler in `backend/src/modules/agent-playground/handlers/handleStreamError.ts`
  - Detect: "output credit should be refunded"
  - Rollback output increment via `UsageCounter.rollbackOutputIncrement()`
  - Return: `{ error: 'Runtime error. Output credit restored.', remaining }`

---

## Phase 7: User Story 4 (P1) – State Management & UI State Machine

**Story Goal**: Implement strict state transitions (INITIALIZED → ACTIVE → WARNING → EXHAUSTED) with proper UI rendering for each state.

**Test Criteria**:
1. State transitions only in allowed sequence
2. Status bar updates with correct remaining count
3. Warning messages appear at count 8 and 9
4. Input field is removed (not disabled) at count 10
5. User cannot submit after limit reached

- [ ] T027 [P] [US4] Create state machine in `frontend/src/modules/playground/core/PlaygroundStateMachine.ts`
  - State enum: `'INITIALIZED' | 'ACTIVE' | 'WARNING' | 'EXHAUSTED'`
  - Transitions:
    - INITIALIZED → ACTIVE (on first message)
    - ACTIVE ↔ ACTIVE (while 1–7 remaining)
    - ACTIVE → WARNING (when remaining = 8 or 9)
    - WARNING → EXHAUSTED (when remaining = 0)
  - Function: `canTransition(from: State, to: State): boolean`
  - Export: `StateMachine` class with `getState()`, `setState()`

- [ ] T028 [P] [US4] Create UI state store in `frontend/src/modules/playground/store/playgroundStore.ts` (Zustand)
  - State: `{ state, remaining, isLoading, currentMessage, warningVisible, locked }`
  - Actions: `setState()`, `setRemaining()`, `toggleWarning()`, `lock()`
  - Middleware: subscribeWithSelector for fine-grained subscriptions
  - Dev middleware: devtools for debugging

- [ ] T029 [US4] Create status bar component in `frontend/src/modules/playground/ui/StatusBar.tsx`
  - Render: "Evaluation Mode: Active | {remaining} messages remaining"
  - Change color to amber when remaining ≤ 2
  - Change to gray when remaining = 0
  - No marketing copy, clinical tone

- [ ] T030 [US4] Create warning message component in `frontend/src/modules/playground/ui/WarningMessage.tsx`
  - Display: "Evaluation limit approaching. {remaining} messages remaining."
  - Appear at count 8, 9
  - Non-intrusive positioning (footer or inline)
  - No alarmist language

- [ ] T031 [US4] Create locked state component in `frontend/src/modules/playground/ui/EvaluationComplete.tsx`
  - Replace input field with static block
  - Title: "Evaluation Session Concluded"
  - Body: "The interaction limit for this agent specification has been reached..."
  - Primary action: Link to Technical Documentation (not checkout)
  - Render only when state = 'EXHAUSTED'

---

## Phase 8: User Story 5 (P1) – Chat UI & Message Rendering

**Story Goal**: Build terminal-style chat interface with real-time message streaming and error display.

**Test Criteria**:
1. User messages appear immediately
2. Agent responses stream character-by-character
3. Error messages display with recovery info
4. Chat persists during session (but not after)
5. Counter updates after each exchange

- [ ] T032 [P] [US5] Create chat message component in `frontend/src/modules/playground/ui/ChatMessage.tsx`
  - Props: `{ type: 'user' | 'agent' | 'error', content: string }`
  - Terminal styling with monospace font
  - User messages: right-aligned, light background
  - Agent responses: left-aligned, dark background
  - Errors: red accent with icon

- [ ] T033 [P] [US5] Create chat window component in `frontend/src/modules/playground/ui/ChatWindow.tsx`
  - Display array of messages
  - Auto-scroll to bottom on new message
  - Show "typing..." indicator during stream
  - Handle long responses with scrollable overflow

- [ ] T034 [US5] Create message input component in `frontend/src/modules/playground/ui/MessageInput.tsx`
  - Textarea input with character count
  - Submit button enabled only when: (state !== 'EXHAUSTED' && input.length > 0)
  - Show token count in real-time (client-side estimate)
  - Clear on submit
  - Disable during stream

- [ ] T035 [US5] Create streaming response renderer in `frontend/src/modules/playground/core/StreamingRenderer.ts`
  - Connect to SSE endpoint
  - Parse chunks and update UI
  - Handle connection errors with retry logic
  - Export: `connectToStream(sessionId, onChunk, onComplete, onError)`

- [ ] T036 [US5] Create message sender hook in `frontend/src/modules/playground/hooks/useSendMessage.ts`
  - Hook: `useSendMessage(agentId: UUID, sessionId: UUID)`
  - Returns: `{ sendMessage, isLoading, error }`
  - Calls gatekeeper, sanitizer, streaming renderer
  - Updates store on success/failure
  - Handles remaining counter update

---

## Phase 9: User Story 6 (P2) – Security Hardening

**Story Goal**: Implement prompt injection detection, multi-tab exploit prevention, and data privacy controls.

**Test Criteria**:
1. Prompt injection pattern detected but request still processed (let agent fail)
2. Multi-tab rapid-fire requests see consistent counter
3. Session data expires from Redis
4. No conversation logs in PostgreSQL
5. No request logs contain user messages

- [ ] T037 [P] [US6] Create advanced prompt injection detector in `backend/src/modules/agent-playground/core/AdvancedSanitizer.ts`
  - Pattern detection: regex for "ignore", "bypass", "system override", "forget"
  - Pattern detection: "instructions above", "role-play", "pretend"
  - Log flagged attempts for monitoring (without storing message content)
  - Function: `detectJailbreak(input: string): { flagged: boolean, risk: 'low' | 'medium' | 'high' }`
  - DO NOT block weak agents; let them demonstrate vulnerability

- [ ] T038 [US6] Create session isolation enforcer in `backend/src/modules/agent-playground/middleware/SessionIsolation.ts`
  - Middleware: validate session token on every request
  - Middleware: check session not expired
  - Middleware: verify user_id matches request identity
  - Return 403 if any check fails

- [ ] T039 [US6] Create data retention policy enforcer in `backend/src/modules/agent-playground/core/DataRetentionPolicy.ts`
  - Redis key TTL: 30 minutes for active sessions
  - On session end: immediate Redis deletion
  - On limit reached: delete all context from Redis
  - Function: `expireSessionData(sessionId: UUID): Promise<void>`
  - Cron job: delete expired sessions every 10 minutes

- [ ] T040 [US6] Create logging sanitizer in `backend/src/core/SanitizedLogger.ts`
  - Never log: user input, agent output, system prompts, API keys
  - Log only: event type, result (success/failure), remaining count
  - Export: `logSafeEvent(eventType: string, metadata: object): void`

---

## Phase 10: User Story 7 (P2) – Monitoring & Observability

**Story Goal**: Track playground usage patterns without storing conversation data, enabling security monitoring and analytics.

**Test Criteria**:
1. Anonymous usage counter increments correctly
2. Failed interactions recorded with failure type
3. Session duration tracked (no conversation content)
4. Alerts trigger on abuse patterns (e.g., 10 rapid requests)

- [ ] T041 [P] [US7] Create anonymous usage metrics in `backend/src/modules/agent-playground/core/PlaygroundMetrics.ts`
  - Metric: total playground interactions per (user_id, agent_id)
  - Metric: success rate per agent
  - Metric: average messages per session
  - Metric: session duration distribution
  - Export: `recordMetric(metricName: string, value: number): Promise<void>`

- [ ] T042 [US7] Create abuse detection in `backend/src/modules/agent-playground/core/AbuseDetector.ts`
  - Pattern 1: > 5 requests in < 1 minute (rapid fire)
  - Pattern 2: consistently oversized inputs (token limit exploit)
  - Pattern 3: repeated jailbreak patterns
  - Action: rate limit or temporary block
  - Function: `detectAbuse(userId: UUID, agentId: UUID): Promise<boolean>`

- [ ] T043 [US7] Create rate limiter in `backend/src/middleware/RateLimiter.ts`
  - Per-user limit: 5 requests / 1 minute for playground
  - Per-IP limit: 20 requests / 1 minute
  - Use Redis for distributed rate limiting
  - Export: `rateLimitMiddleware(keyFn: (req) => string, limit: number, window: number)`

---

## Phase 11: Integration – End-to-End Flow

- [ ] T044 [P] [US1-7] Create integration test: "User evaluates agent with 5 exchanges" in `backend/src/modules/agent-playground/__tests__/e2e.test.ts`
  - Authenticate user
  - Initialize session
  - Send 5 user messages (10 total count)
  - Verify counter reaches 10
  - Verify limit reached response
  - Verify no further requests accepted

- [ ] T045 [P] [US1-7] Create integration test: "Multi-tab exploit prevention" in `backend/src/modules/agent-playground/__tests__/multi-tab-e2e.test.ts`
  - Simulate 2 tabs sending requests concurrently
  - Verify only one succeeds if near limit
  - Verify second tab sees updated count

- [ ] T046 [US1-7] Create full frontend-backend integration test in `frontend/src/modules/playground/__tests__/integration.test.tsx`
  - Mount Playground component
  - Verify initial render with "10/10"
  - Simulate API responses
  - Send 5 messages via UI
  - Verify state transitions
  - Verify locked state at limit

---

## Phase 12: Frontend Polish & UX

- [ ] T047 [P] Create playground layout component in `frontend/src/modules/playground/ui/PlaygroundLayout.tsx`
  - Grid: chat window (70%), sidebar (30%)
  - Sidebar: agent metadata, version, import button
  - Header: title, status bar
  - Footer: docs link, version info
  - Responsive: stack on mobile

- [ ] T048 [P] Create empty state placeholder in `frontend/src/modules/playground/ui/EmptyState.tsx`
  - Message: "Start an evaluation session by typing a question below"
  - Show agent icon, agent name
  - Show example prompts (non-marketing)

- [ ] T049 Create loading skeleton in `frontend/src/modules/playground/ui/ChatSkeleton.tsx`
  - Animate placeholder messages during initial load
  - Smooth transition to real content

- [ ] T050 [P] Create responsive design for mobile in `frontend/src/modules/playground/ui/PlaygroundResponsive.tsx`
  - Chat: full width on small screens
  - Input: sticky at bottom
  - Status: collapsible sidebar
  - Test: tablet and phone viewports

---

## Phase 13: Documentation & Copy

- [ ] T051 Create copy guidelines document in `docs/playground/COPY_GUIDELINES.md`
  - Status bar copy (normal, warning, locked)
  - Error messages (clinical, no marketing)
  - Help text (objective, engineering-focused)
  - Tone: clinical, precise, objective

- [ ] T052 Create user-facing documentation in `docs/playground/USER_GUIDE.md`
  - What is the Evaluation Sandbox?
  - How does the 10-message limit work?
  - What happens after limit?
  - No trial language, no "upgrade" messaging

- [ ] T053 Create technical documentation in `docs/playground/TECHNICAL_SPEC.md`
  - API endpoints
  - State machine diagram
  - Error codes and recovery
  - Security model

---

## Phase 14: Security Review & Hardening

- [ ] T054 [P] Create security test suite in `backend/src/modules/agent-playground/__tests__/security.test.ts`
  - Test: auth bypass attempts rejected
  - Test: SQL injection in inputs rejected
  - Test: XSS payloads in user input cleaned
  - Test: rate limit enforcement

- [ ] T055 [P] Create prompt injection test suite in `backend/src/modules/agent-playground/__tests__/injection.test.ts`
  - Test: "ignore instructions" patterns detected
  - Test: "system override" patterns detected
  - Test: weak agents allowed to fail on injection
  - Verify: failure counts as message

- [ ] T056 Create OWASP compliance checklist in `docs/playground/SECURITY.md`
  - Authentication (✓ JWT)
  - Authorization (✓ user_id binding)
  - Session management (✓ Redis TTL)
  - Input validation (✓ sanitizer)
  - Logging (✓ sanitized)
  - Data retention (✓ ephemeral)

---

## Phase 15: Performance & Optimization

- [ ] T057 [P] Create database query optimization in `backend/src/modules/agent-playground/core/UsageCounter.ts`
  - Verify index usage on (user_id, agent_id)
  - Benchmark: counter fetch < 50ms
  - Benchmark: counter increment < 100ms with locking

- [ ] T058 [P] Create Redis cache strategy in `backend/src/modules/agent-playground/store/SessionStore.ts`
  - Cache agent system prompts for 1 hour
  - Cache session metadata for 30 minutes
  - Verify: no N+1 queries

- [ ] T059 Create frontend performance tests in `frontend/src/modules/playground/__tests__/performance.test.tsx`
  - Verify: streaming responses render <100ms per chunk
  - Verify: chat window scroll smooth at 60fps
  - Verify: no memory leaks on unmount

---

## Phase 16: Deployment & Monitoring

- [ ] T060 [P] Create Docker configuration in `docker-compose.yml`
  - Service: backend (Node.js)
  - Service: frontend (Vite)
  - Service: PostgreSQL with migrations
  - Service: Redis
  - Networking: internal only (no external exposure)

- [ ] T061 [P] Create CI/CD pipeline in `.github/workflows/playground-ci.yml`
  - Run tests on PR
  - Security scan with Trivy
  - Build Docker images
  - Deploy to staging on merge to main

- [ ] T062 Create production monitoring dashboard in `docs/playground/MONITORING.md`
  - Grafana queries for: requests/min, success rate, avg latency
  - Alert: abuse detection triggers
  - Alert: Redis memory > 80%
  - Alert: PostgreSQL query latency > 500ms

- [ ] T063 Create runbook in `docs/playground/RUNBOOK.md`
  - How to scale PostgreSQL connections
  - How to clear Redis cache
  - How to emergency-disable playground (feature flag)
  - Troubleshooting: "limit not working" diagnosis

---

## Phase 17: Post-Launch – Monitoring & Iteration

- [ ] T064 [P] Create monitoring queries in `backend/src/modules/agent-playground/core/PlaygroundMetrics.ts`
  - Query: agents with highest playground usage
  - Query: agents with highest failure rate
  - Query: users with unusual patterns
  - Export to analytics dashboard

- [ ] T065 Create feature flag system in `backend/src/core/FeatureFlags.ts`
  - Flag: `PLAYGROUND_ENABLED` (per agent)
  - Flag: `PLAYGROUND_ABUSE_DETECTION` (global)
  - Flag: `PLAYGROUND_MESSAGE_LIMIT` (configurable per environment)
  - Allow runtime toggling via admin panel

- [ ] T066 Create admin dashboard for playground management in `frontend/src/pages/admin/PlaygroundAdmin.tsx`
  - View: agents by playground usage
  - View: users with most playground activity
  - Control: emergency disable per agent
  - Control: reset usage count (admin-only, logged)

---

## Dependencies & Parallelization

### Phase-Level Dependencies

- **Phase 1-3**: No dependencies (parallel)
- **Phase 4-9**: Depends on Phase 1-3 complete
- **Phase 10+**: Depends on Phase 4-9 complete

### Parallel Execution Within Phases

**Phase 4 (Authentication & Session)**:
- T015, T016, T017, T018 can run in parallel (independent concerns)

**Phase 5 (Gatekeeper)**:
- T019, T020, T021 can run in parallel
- T022 depends on T019, T020, T021

**Phase 6 (LLM Integration)**:
- T023, T024 can run in parallel
- T025, T026 depend on T023, T024

**Phase 7-9 (UI States)**:
- T027, T028, T029, T030, T031 can run partially parallel
- T032-T036 depend on T027, T028

---

## Implementation Strategy

### MVP Scope (Phase 1-9)

**Tasks**: T001–T046  
**Duration**: 2 weeks (10 dev-days)  
**Goal**: Complete working Playground with all core features

**Deliverables**:
- ✅ User Story 1: Authentication & session init
- ✅ User Story 2: Gatekeeper + usage counter
- ✅ User Story 3: LLM execution with real prompts
- ✅ User Story 4: State machine & UI states
- ✅ User Story 5: Chat UI with streaming
- ✅ User Story 6: Core security (session isolation)
- ✅ User Story 7: Basic metrics
- ✅ User Story 8: E2E integration tests

### Post-MVP Increments

**Increment 2** (Week 3):
- Advanced security (Phases 10, 14)
- Performance optimization (Phase 15)
- Deployment (Phase 16)

**Increment 3** (Week 4):
- Admin dashboard (Phase 17)
- Advanced monitoring (Phase 17)
- Documentation & runbooks (Phase 16)

---

## Task Metrics

- **Total tasks**: 66
- **Setup**: 6 tasks
- **Foundational**: 9 tasks
- **User Stories 1-7**: 31 tasks
- **Integration**: 3 tasks
- **Polish & UX**: 4 tasks
- **Documentation**: 3 tasks
- **Security**: 5 tasks
- **Performance**: 3 tasks
- **Deployment**: 4 tasks
- **Monitoring & Iteration**: 3 tasks

**Parallelizable tasks**: 42 (64%)

---

## Acceptance Criteria – Overall

✅ All tasks follow checklist format: `- [ ] [TaskID] [P?] [Story?] Description with file path`

✅ Each user story includes:
   - Story goal statement
   - Independent test criteria
   - All required tasks (backend → frontend → integration)

✅ Database schema enforced:
   - `agent_playground_usage(user_id, agent_id, usage_count, ...)`
   - Unique constraint on (user_id, agent_id)
   - Row-level locking for transactional atomicity

✅ State machine implemented:
   - INITIALIZED → ACTIVE → WARNING → EXHAUSTED (strict)
   - UI renders correct status and input availability per state

✅ No message persistence:
   - Redis expires immediately on session end
   - PostgreSQL stores only usage_count integer
   - No conversation logs

✅ Security hardening:
   - Auth validation on every request
   - Prompt injection detection (non-blocking)
   - Multi-tab exploit prevented via DB transactions

✅ Copy compliance:
   - No marketing language
   - Clinical, objective tone
   - Links to docs, not checkout

---

## Ready For

✅ Next phase: `/speckit.implement`  
✅ All tasks executable by an LLM or developer  
✅ No ambiguity in requirements  
✅ Dependencies clearly mapped  
✅ Parallelization opportunities documented

---
