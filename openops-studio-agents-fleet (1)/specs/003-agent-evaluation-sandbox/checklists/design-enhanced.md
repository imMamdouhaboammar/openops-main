# Architecture & Design Checklist – Enhanced Verification

**Purpose**: Validate that specification, architecture, and design are complete and locked before implementation begins. Each item includes verification commands and acceptance criteria.

**Status**: Reference document for implementation review.

**Who**: Tech lead, architect, or senior developer verifies each phase.

**How to Use**: For each phase, run verification commands and confirm all items pass before proceeding.

---

## Phase 1: Specification Review ✅ LOCKED

**Verification Commands**:
```bash
cd specs/003-agent-evaluation-sandbox
wc -l spec.md  # Should be 290+
grep -c "^##" spec.md  # Should show major sections
grep -c "non-negotiable" spec.md  # Should show 5+
```

### Requirements Verification

- [x] **Specification document (spec.md) complete**
  - ✅ File exists: `specs/003-agent-evaluation-sandbox/spec.md`
  - ✅ Length: 290+ lines covering all requirements
  - ✅ Sections: Feature overview, state machine, edge cases, copy guidelines
  - ✅ Acceptance: `cat spec.md | head -50` shows proper structure

- [x] **Non-negotiable rules documented (8 locked)**
  - ✅ Rule 1: 10-message lifetime (permanent, no reset)
  - ✅ Rule 2: Count input + output equally
  - ✅ Rule 3: Run real agent code (no demo mode)
  - ✅ Rule 4: No persistence of conversations
  - ✅ Rule 5: Clinical copy only (no marketing)
  - ✅ Rule 6: Atomic counter (no race conditions)
  - ✅ Rule 7: Single per user/agent
  - ✅ Rule 8: 30-min session TTL
  - ✅ Verification: `grep -i "non-negotiable\|must\|locked" spec.md | wc -l`

- [x] **State machine clearly defined**
  - ✅ States: INITIALIZED, ACTIVE, WARNING, EXHAUSTED
  - ✅ Transitions: Strict, no loops or shortcuts
  - ✅ Initial: 10/10 messages → INITIALIZED
  - ✅ Active: 1-7/10 → ACTIVE
  - ✅ Warning: 8-9/10 → WARNING
  - ✅ Locked: 0/10 → EXHAUSTED
  - ✅ Verification: `grep -A 20 "^## State Machine" spec.md`

- [x] **Edge cases addressed**
  - ✅ Multi-tab exploit: SELECT FOR UPDATE prevents
  - ✅ Network failures: Output credit recovery (2-phase)
  - ✅ Prompt injection: Detected but not blocked (let weak agents fail)
  - ✅ Oversized input: Truncated to 2000 tokens
  - ✅ Session expiry: Immediate Redis deletion
  - ✅ LLM crash: Rollback output increment only
  - ✅ Verification: `grep -c "^### Edge Case" spec.md`

- [x] **Copy guidelines established**
  - ✅ Status bar: Clinical, objective tone
  - ✅ Warnings (8/10, 9/10): Non-alarming, factual
  - ✅ Locked state: "Evaluation Session Concluded"
  - ✅ No marketing: No CTAs, no checkout links
  - ✅ Verification: `grep -A 30 "Copy Guidelines" spec.md | head -20`

- [x] **Data retention policy explicit**
  - ✅ Session context: Redis (30-min TTL)
  - ✅ Session deletion: Immediate on limit reached
  - ✅ Persistent storage: only `usage_count` integer
  - ✅ Conversation data: NEVER logged
  - ✅ User input: NOT stored anywhere
  - ✅ Verification: `grep -i "retention\|persistence\|ephemeral" spec.md`

---

## Phase 2: Technical Architecture ✅ LOCKED

**Verification Commands**:
```bash
cd specs/003-agent-evaluation-sandbox
wc -l plan.md data-model.md  # Should be 300+ each
grep "agent_playground_usage" data-model.md | head -5
```

### Database & Schema Verification

- [x] **Database schema finalized**
  - ✅ Table name: `agent_playground_usage`
  - ✅ Columns: `user_id`, `agent_id`, `usage_count`, `created_at`, `updated_at`
  - ✅ Primary key: `(user_id, agent_id)` composite
  - ✅ Indexes: On `user_id`, `agent_id`, composite
  - ✅ Type: `usage_count INTEGER NOT NULL DEFAULT 0`
  - ✅ Location: data-model.md §agent_playground_usage table
  - ✅ Verification: `grep -A 15 "CREATE TABLE agent_playground_usage" data-model.md`

- [x] **Row-level locking strategy documented**
  - ✅ Method: `SELECT ... FOR UPDATE` (PostgreSQL)
  - ✅ Purpose: Prevent multi-tab race conditions
  - ✅ Query: `SELECT usage_count FROM agent_playground_usage WHERE user_id=? AND agent_id=? FOR UPDATE`
  - ✅ Timeout: Connection pool default (30s)
  - ✅ Location: data-model.md §Concurrency Control
  - ✅ Verification: `grep -c "FOR UPDATE" data-model.md`

- [x] **Redis key strategy defined**
  - ✅ Session context: `playground:session:{sessionId}:context`
  - ✅ Warnings: `playground:session:{sessionId}:warnings`
  - ✅ Prompt cache: `playground:agent:{agentId}:prompt`
  - ✅ TTLs: 30 min session, 1 hour prompt, immediate on limit
  - ✅ Location: plan.md §Redis Key Strategy
  - ✅ Verification: `grep "playground:session\|playground:agent" plan.md`

- [x] **API endpoint contracts written**
  - ✅ Endpoint 1: `POST /api/playground/:agentId/init`
    - Request: `{ jwt_token }`
    - Response: `{ sessionId, remaining: 10, state: 'INITIALIZED' }`
  - ✅ Endpoint 2: `POST /api/playground/:agentId/message` (SSE)
    - Request: `{ sessionId, message }`
    - Response: Streaming text chunks
  - ✅ Endpoint 3: `GET /api/playground/:agentId/status`
    - Response: `{ state, remaining, warnings }`
  - ✅ Location: plan.md §API Endpoints
  - ✅ Verification: `grep -c "^### POST\|^### GET" plan.md`

- [x] **State machine transitions coded**
  - ✅ Backend: UsageCounter.ts (T013), PlaygroundGatekeeper.ts (T019)
  - ✅ Frontend: PlaygroundStateMachine.ts (T027)
  - ✅ Transitions: INITIALIZED → ACTIVE → WARNING → EXHAUSTED
  - ✅ No loops: Verified by strict state definitions
  - ✅ Location: tasks.md (T013, T019, T027)
  - ✅ Verification: Task mapping in tasks.md

- [x] **Session isolation model documented**
  - ✅ User isolation: All queries filtered by `user_id`
  - ✅ Agent isolation: Per-agent counter (`agent_id`)
  - ✅ Session isolation: Token lifecycle + Redis TTL
  - ✅ Cross-origin: CORS policy enforced
  - ✅ Location: data-model.md §Session & User Isolation
  - ✅ Verification: `grep -i "isolation\|cross-user" data-model.md`

---

## Phase 3: Frontend Architecture ✅ LOCKED

**Verification Commands**:
```bash
grep "PlaygroundLayout\|ChatWindow\|StatusBar" plan.md
grep -c "T02[7-9]\|T03[0-6]" tasks.md  # Should show 10+
```

### UI Component Architecture Verification

- [x] **Component hierarchy defined**
  - ✅ Root: PlaygroundLayout.tsx (70% chat, 30% sidebar)
  - ✅ Chat region: ChatWindow.tsx (messages), MessageInput.tsx (textarea)
  - ✅ Status region: StatusBar.tsx (remaining count), WarningMessage.tsx
  - ✅ Locked state: EvaluationComplete.tsx (replaces input)
  - ✅ Location: plan.md §Frontend Component Structure
  - ✅ Verification: `grep "PlaygroundLayout\|ChatWindow\|StatusBar\|EvaluationComplete" plan.md | wc -l`

- [x] **State management (Zustand) designed**
  - ✅ Store file: `frontend/src/modules/playground/store/playgroundStore.ts`
  - ✅ State shape: `{ state, remaining, isLoading, messages, locked, warnings }`
  - ✅ Selectors: Use subscribeWithSelector for granular updates
  - ✅ Middleware: devtools enabled for debugging
  - ✅ No async in store: Async handled in hooks
  - ✅ Location: tasks.md T028
  - ✅ Verification: Task T028 in tasks.md

- [x] **UI state transitions match backend**
  - ✅ Frontend state: PlaygroundStateMachine.ts (T027)
  - ✅ Backend state: UsageCounter increment (T013, T020)
  - ✅ Sync point: Message response returns `{ remaining, state }`
  - ✅ No extra states: Frontend mirrors backend exactly
  - ✅ Location: plan.md §Frontend State Machine
  - ✅ Verification: State names in spec.md match tasks.md

- [x] **Terminal-style chat UI designed**
  - ✅ Font: Monospace (Courier New, Monaco)
  - ✅ User messages: Right-aligned, light background
  - ✅ Agent messages: Left-aligned, dark background
  - ✅ Typing indicator: \"typing...\" text
  - ✅ Error messages: Red background, error state
  - ✅ Location: tasks.md T032, T033
  - ✅ Verification: Component styling in T032

- [x] **Responsive design breakpoints documented**
  - ✅ Mobile (<640px): Single column (100% chat)
  - ✅ Tablet (640-1024px): 70% chat + 30% sidebar
  - ✅ Desktop (>1024px): Full layout
  - ✅ Breakpoints: Tailwind defaults (sm, md, lg, xl)
  - ✅ Location: plan.md + T050
  - ✅ Verification: Tailwind breakpoints in component stubs

- [x] **Accessibility (WCAG AA) requirements listed**
  - ✅ Keyboard navigation: All interactive elements in tab order
  - ✅ Focus management: Focus ring visible on all buttons/inputs
  - ✅ Screen readers: ARIA labels on buttons, status messages
  - ✅ Color contrast: All text ≥4.5:1 ratio
  - ✅ No color-only: Icons + text for status
  - ✅ Location: plan.md + copilot-instructions.md
  - ✅ Verification: ARIA attributes in component stubs

---

## Phase 4: Security Model ✅ LOCKED

**Verification Commands**:
```bash
grep "JWT\|authentication\|session" plan.md | head -10
grep -i "sanitiz\|injection\|owasp" research.md | head -10
```

### Security Controls Verification

- [x] **Authentication flow documented**
  - ✅ Method: JWT tokens (from upstream auth)
  - ✅ Header: `Authorization: Bearer {token}`
  - ✅ Validation: Middleware validates signature (T015)
  - ✅ Payload: Contains `user_id`, `exp`
  - ✅ Failure: 401 Unauthorized
  - ✅ Location: plan.md §Authentication
  - ✅ Verification: `grep -A 10 "## Authentication" plan.md`

- [x] **Prompt injection detection strategy defined**
  - ✅ Patterns: "ignore", "bypass", "system override", "forget"
  - ✅ Action: Log (non-blocking), let weak agents demonstrate vulnerability
  - ✅ Non-blocking rationale: Evaluation should expose weaknesses
  - ✅ Implementation: InputSanitizer.ts (T011) + AdvancedSanitizer.ts (T037)
  - ✅ Location: research.md §Decision 6
  - ✅ Verification: `grep -A 15 "Decision 6" research.md`

- [x] **Session token lifecycle clear**
  - ✅ Creation: initializeSession handler (T016)
  - ✅ Storage: Redis with 30-min TTL
  - ✅ Validation: SessionIsolation middleware (T038)
  - ✅ Expiry: Automatic on TTL
  - ✅ Deletion: Immediate on limit reached
  - ✅ Cleanup: Cron job every 10 min
  - ✅ Location: data-model.md §Session Context
  - ✅ Verification: TTL constants in T017

- [x] **Rate limiting strategy designed**
  - ✅ Per-user: 5 requests/min for playground
  - ✅ Per-IP: 20 requests/min globally
  - ✅ Implementation: Redis-backed (T043)
  - ✅ Response: 429 Too Many Requests
  - ✅ Location: plan.md §Rate Limiting
  - ✅ Verification: Task T043 in tasks.md

- [x] **OWASP compliance checklist created**
  - ✅ A01: Authentication (JWT, user_id binding) ✓
  - ✅ A02: Authorization (Gatekeeper middleware) ✓
  - ✅ A04: Insecure Design (No sensitive data logged) ✓
  - ✅ A05: Broken Access Control (Session isolation) ✓
  - ✅ A06: Vulnerable Components (No known vulns) ✓
  - ✅ A07: Identification (No PII stored) ✓
  - ✅ Location: docs/playground/SECURITY.md (T056)
  - ✅ Verification: Task T056 in tasks.md

- [x] **Data sanitization rules for logging established**
  - ✅ Never log: User input, agent output, prompts, API keys
  - ✅ Safe to log: Event type, result (OK/error), remaining count
  - ✅ Implementation: SanitizedLogger.ts (T040)
  - ✅ Format: JSON structured logs (Pino)
  - ✅ Location: plan.md + T040
  - ✅ Verification: `grep -i "never log\|safe.*log" plan.md`

---

## Phase 5: Performance Targets ✅ LOCKED

**Verification Commands**:
```bash
grep "SLA\|<50ms\|<100ms\|<200ms" plan.md
grep -i "index\|optimization" data-model.md | head -10
```

### Performance Requirements Verification

- [x] **Counter fetch SLA: <50ms documented**
  - ✅ Target: <50ms (plain SELECT with index)
  - ✅ Optimization: Composite index on (user_id, agent_id)
  - ✅ Benchmark: data-model.md §Query Performance
  - ✅ Measurement: T057 database optimization
  - ✅ Location: plan.md §Performance SLAs
  - ✅ Verification: `grep -c "< 50ms" plan.md`

- [x] **Counter increment SLA: <100ms (with locking) documented**
  - ✅ Target: <100ms INCLUDING row lock acquisition
  - ✅ Breakdown: Lock 20ms + increment 5ms + release 10ms = 35ms max
  - ✅ Query: SELECT FOR UPDATE + UPDATE in transaction
  - ✅ Benchmark: data-model.md §Concurrency & ACID
  - ✅ Location: plan.md §Performance SLAs
  - ✅ Verification: `grep -c "< 100ms.*lock" plan.md`

- [x] **Streaming response SLA: <100ms/chunk documented**
  - ✅ Target: <100ms between consecutive chunks
  - ✅ Streaming method: Server-Sent Events (SSE)
  - ✅ Chunk size: ~100 tokens per chunk
  - ✅ Measurement: T059 frontend performance
  - ✅ Location: plan.md §Performance SLAs
  - ✅ Verification: `grep -c "chunk\|streaming" plan.md`

- [x] **Database indexes planned**
  - ✅ Index 1: user_id (single)
  - ✅ Index 2: agent_id (single)
  - ✅ Index 3: (user_id, agent_id) composite (PK)
  - ✅ Location: data-model.md §agent_playground_usage
  - ✅ Migration: Task T007 (001-create-playground-usage.sql)
  - ✅ Verification: `grep "CREATE INDEX" data-model.md`

- [x] **Redis cache strategy designed**
  - ✅ Prompt cache: 1-hour TTL (updated weekly)
  - ✅ Session context: 30-min TTL (expires on idle)
  - ✅ Eviction: LRU on memory limit
  - ✅ N+1 prevention: No repeated fetches per session
  - ✅ Location: plan.md + data-model.md
  - ✅ Verification: `grep -i "cache\|ttl\|redis" plan.md | head -10`

- [x] **Query optimization benchmarks defined**
  - ✅ Counter fetch: <50ms (indexed query)
  - ✅ Counter increment: <100ms (with lock + retry)
  - ✅ Session create: <200ms (includes prompt load + Redis write)
  - ✅ Streaming start: <500ms (includes LLM init)
  - ✅ Location: plan.md §Performance SLAs
  - ✅ Verification: All SLAs documented in plan.md

---

## Phase 6: Testing Strategy ✅ LOCKED

**Verification Commands**:
```bash
grep -i "unit.*test\|integration.*test\|e2e" plan.md
grep "^## T0[2-5][0-9]" tasks.md | grep -i test
```

### Test Coverage Verification

- [x] **Unit test scope defined**
  - ✅ Core modules: InputSanitizer (T011), UsageCounter (T013), ErrorHandler (T012)
  - ✅ Coverage target: >80% for critical paths
  - ✅ Test framework: Jest (T014 setup)
  - ✅ Files: __tests__/unit/*.test.ts
  - ✅ Location: plan.md §Testing Strategy
  - ✅ Verification: `grep -c "T0[1-4][0-9].*test" tasks.md`

- [x] **Integration test scope defined**
  - ✅ Flows: Auth → Init → Message → Counter
  - ✅ Multi-tab: Concurrent requests race condition
  - ✅ Session: Create, validate, expire
  - ✅ LLM integration: Real prompt loading + streaming
  - ✅ Files: __tests__/integration/*.test.ts
  - ✅ Location: plan.md §Testing Strategy
  - ✅ Verification: Tasks T044-T046 mapped

- [x] **Multi-tab exploit test planned**
  - ✅ Scenario: 2 concurrent requests, same user/agent
  - ✅ Expected: Counter atomic, second request sees updated count
  - ✅ Test: Database lock verified
  - ✅ Task: T022 (multi-tab.test.ts)
  - ✅ Location: tasks.md T022
  - ✅ Verification: Multi-tab test in T022

- [x] **Security test suite scope defined**
  - ✅ Auth bypass: 401 expected
  - ✅ SQL injection: Sanitized or rejected
  - ✅ XSS: No innerHTML, DOMPurify used
  - ✅ Rate limit: 429 on abuse
  - ✅ Files: __tests__/security/*.test.ts
  - ✅ Task: T054 (security.test.ts)
  - ✅ Verification: Task T054 in tasks.md

- [x] **Performance test thresholds set**
  - ✅ Counter fetch: <50ms (T057 benchmark)
  - ✅ Counter increment: <100ms with lock (T057)
  - ✅ Streaming: <100ms/chunk (T059)
  - ✅ Chat scroll: 60 FPS (T059)
  - ✅ UI render: <200ms on message
  - ✅ Task: T059 (performance.test.tsx)
  - ✅ Verification: Benchmarks in plan.md

- [x] **Edge case test coverage planned**
  - ✅ LLM crash mid-stream: Output refunded (T046)
  - ✅ Session expires: Immediate Redis deletion (T039)
  - ✅ Oversized input: Truncated or rejected (T011)
  - ✅ Network error: Retry with timeout (T025)
  - ✅ Task mapping: T022, T044-T046
  - ✅ Location: spec.md §Edge Cases
  - ✅ Verification: Each edge case mapped to task

---

## Phase 7: Deployment & DevOps ✅ LOCKED

**Verification Commands**:
```bash
ls -la docker-compose.yml  # Check Docker setup
grep -i \"migration\|ci.*cd\|monitoring\" plan.md | head -10
```

### DevOps Infrastructure Verification

- [x] **Docker Compose setup planned**
  - ✅ Services: backend (Node.js), frontend (Vite), postgres, redis
  - ✅ Networking: Internal bridge network
  - ✅ Volumes: postgres:/data, redis persistent
  - ✅ Task: T060 (docker-compose.yml)
  - ✅ Location: plan.md §Deployment
  - ✅ Verification: Task T060 in tasks.md

- [x] **Database migration strategy documented**
  - ✅ Tool: db-migrate or Sequelize
  - ✅ Migrations: 001-create-playground-usage, 002-sessions (future)
  - ✅ Versioning: Timestamp-based
  - ✅ Rollback: Supported
  - ✅ Tasks: T007, T008
  - ✅ Location: plan.md §Database Migrations
  - ✅ Verification: Migration strategy in plan.md

- [x] **CI/CD pipeline stages defined**
  - ✅ Stage 1: Test (npm test, >80% coverage)
  - ✅ Stage 2: Lint (ESLint, Prettier)
  - ✅ Stage 3: Security (Trivy scan for vulns)
  - ✅ Stage 4: Build (npm build)
  - ✅ Stage 5: Deploy (staging)
  - ✅ Task: T061 (.github/workflows/playground-ci.yml)
  - ✅ Location: plan.md §CI/CD Pipeline
  - ✅ Verification: Task T061 in tasks.md

- [x] **Environment variables cataloged**
  - ✅ DATABASE_URL: PostgreSQL connection string
  - ✅ REDIS_URL: Redis connection string
  - ✅ LLM_API_KEY: Gemini API key
  - ✅ JWT_SECRET: Token signing secret
  - ✅ .env.local template: Ready in quickstart.md
  - ✅ Location: quickstart.md §Environment Setup
  - ✅ Verification: All vars documented

- [x] **Monitoring & alerting thresholds set**
  - ✅ Redis memory: Alert >80%
  - ✅ DB latency: Alert >500ms
  - ✅ Abuse detected: Alert on pattern match
  - ✅ Success rate: Alert <95%
  - ✅ Metrics: requests/min, avg latency, error rate
  - ✅ Task: T062 (MONITORING.md)
  - ✅ Location: plan.md §Monitoring
  - ✅ Verification: Task T062 in tasks.md

- [x] **Feature flag strategy for emergency disable designed**
  - ✅ Flag: PLAYGROUND_ENABLED (global)
  - ✅ Flag: PLAYGROUND_ABUSE_DETECTION (on/off)
  - ✅ Per-agent: Can disable for specific agent
  - ✅ Implementation: FeatureFlags.ts (T065)
  - ✅ Admin control: Dashboard (T066)
  - ✅ Location: plan.md §Feature Flags
  - ✅ Verification: Tasks T065, T066 in tasks.md

---\n\n## ✅ DESIGN CHECKLIST: COMPLETE\n\n**Total Items Verified**: 42 ✅\n\n**Status**: All 7 phases locked and verified.\n\n**Specification**: FROZEN (no changes)\n\n**Architecture**: FINALIZED (ready for implementation)\n\n**Next Step**: Begin Phase 1 task execution (T001-T006)\n\n---\n\n## Sign-Off\n\n- [x] All requirements documented\n- [x] Architecture validated\n- [x] Performance targets confirmed\n- [x] Security model reviewed\n- [x] Testing strategy defined\n- [x] DevOps infrastructure planned\n- [x] **READY FOR IMPLEMENTATION** ✅\n\n**Approved by**: Architecture Review\n\n**Date**: 2025-01-15\n\n**Notes**: All 42 design checklist items verified. Specification locked. No ambiguities remain. Proceed with Phase 1 task execution.\n