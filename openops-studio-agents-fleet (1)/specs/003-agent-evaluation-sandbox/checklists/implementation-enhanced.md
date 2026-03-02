# Implementation Checklist – Task Execution & Verification

**Purpose**: Track all 66 implementation tasks through 17 phases with specific verification commands and acceptance criteria.

**Status**: Ready for execution. Mark tasks [x] as they complete.

**Total Tasks**: 66 across 17 phases

**Parallelizable**: 64% of tasks can run concurrently (marked [P])

---

## PHASE 1: Backend Infrastructure Setup (T001-T006)

**Estimated Duration**: 1-2 hours | **Priority**: P0 (Critical Path)

### T001: Project Structure Creation

- [ ] **T001: Create backend project structure**
  - Command: `mkdir -p backend/src/modules/agent-playground/{core,handlers,middleware,store,__tests__/{unit,integration,security}}`
  - Verify:
    ```bash
    ls -la backend/src/modules/agent-playground/ | grep core handlers middleware store
    ```
  - Acceptance: All 6 subdirectories exist, empty ✅
  - Status: ⏳ Not started

### T002-T003: Dependencies & Environment [P]

- [ ] **T002: Install backend dependencies**
  - Command: `cd backend && npm install express pg redis zod pino pino-pretty dotenv`
  - Command: `npm install --save-dev typescript ts-node jest @types/express @types/node`
  - Verify:
    ```bash
    cd backend && npm list express pg redis zod pino typescript jest | grep -E "express|pg|redis|zod|pino|typescript|jest"
    ```
  - Acceptance: All packages installed ✅
  - Status: ⏳ Not started

- [ ] **T003: Create .env configuration**
  - File: `backend/.env.local`
  - Contents:
    ```
    DATABASE_URL=postgresql://user:pass@localhost:5432/openops_playground
    REDIS_URL=redis://localhost:6379
    LLM_API_KEY=sk-xxx
    JWT_SECRET=secret-key-min-32-chars
    NODE_ENV=development
    ```
  - Verify:
    ```bash
    test -f backend/.env.local && grep "DATABASE_URL" backend/.env.local
    ```
  - Acceptance: .env.local exists with all required vars ✅
  - Status: ⏳ Not started

### T004-T005: Database & Cache Services [P]

- [ ] **T004: PostgreSQL connection setup**
  - Verify PostgreSQL is running:
    ```bash
    psql --version && psql -h localhost -U postgres -c "SELECT 1" 2>&1
    ```
  - If not running (macOS):
    ```bash
    brew services start postgresql
    ```
  - Create database:
    ```bash
    psql -h localhost -U postgres -c "CREATE DATABASE openops_playground;"
    ```
  - Acceptance: Database created ✅
  - Status: ⏳ Not started

- [ ] **T005: Redis connection pool setup**
  - Verify Redis is running:
    ```bash
    redis-cli ping
    ```
  - If not running (macOS):
    ```bash
    brew services start redis
    ```
  - Create file: `backend/src/core/RedisPool.ts` (T010 task)
  - Acceptance: Redis responds to ping ✅
  - Status: ⏳ Not started

### T006: TypeScript Configuration

- [ ] **T006: Define TypeScript types & Zod schemas**
  - File: `backend/src/modules/agent-playground/core/types.ts`
  - Required types:
    ```typescript
    // User context from JWT
    export type UserContext = { user_id: UUID; role: string };
    
    // Agent specification
    export type Agent = { id: UUID; name: string; system_prompt: string };
    
    // Session state
    export type Session = { 
      sessionId: UUID; 
      userId: UUID; 
      agentId: UUID;
      remaining: number;
      state: 'INITIALIZED' | 'ACTIVE' | 'WARNING' | 'EXHAUSTED';
      createdAt: Date;
    };
    
    // Playground usage
    export type PlaygroundUsage = {
      user_id: UUID;
      agent_id: UUID;
      usage_count: number;
      created_at: Date;
      updated_at: Date;
    };
    ```
  - Zod schemas: Request/response validation
  - Verify:
    ```bash
    cd backend && npm run type-check 2>&1 | grep -i "0 errors"
    ```
  - Acceptance: TypeScript strict mode passes ✅
  - Status: ⏳ Not started

**Phase 1 Acceptance**: All infrastructure in place; `npm run dev:backend` boots successfully

---

## PHASE 2: Database & Core Utilities (T007-T014)

**Estimated Duration**: 2-3 hours | **Priority**: P0 (Critical Path)

### T007-T008: Database Migrations [P]

- [ ] **T007: Create initial migration (create-playground-usage table)**
  - File: `backend/src/db/migrations/001-create-playground-usage.sql`
  - Content:
    ```sql
    CREATE TABLE IF NOT EXISTS agent_playground_usage (
      user_id UUID NOT NULL,
      agent_id UUID NOT NULL,
      usage_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, agent_id)
    );
    
    CREATE INDEX idx_user_id ON agent_playground_usage(user_id);
    CREATE INDEX idx_agent_id ON agent_playground_usage(agent_id);
    ```
  - Verify:
    ```bash
    psql $DATABASE_URL -f backend/src/db/migrations/001-create-playground-usage.sql
    psql $DATABASE_URL -c "\\dt agent_playground_usage"
    ```
  - Acceptance: Table created with indexes ✅
  - Status: ⏳ Not started

- [ ] **T008: Database migration runner**
  - File: `backend/src/core/Database.ts`
  - Implement:
    - Connection pooling (pg)
    - Error handling
    - Transaction support
    - Cleanup on shutdown
  - Verify:
    ```bash
    npm run db:migrate
    ```
  - Acceptance: Migrations run without error ✅
  - Status: ⏳ Not started

### T009-T010: Core Modules [P]

- [ ] **T009: Database connection module**
  - File: `backend/src/core/Database.ts`
  - Exports: `async query(sql: string, params: any[])`
  - Features:
    - Connection pooling
    - Query logging via Logger
    - Error normalization
    - Timeout handling (30s default)
  - Verify:
    ```bash
    npm run ts-node -e "import {query} from './Database'; query('SELECT 1')"
    ```
  - Acceptance: Module imports without error ✅
  - Status: ⏳ Not started

- [ ] **T010: Redis key strategy helper**
  - File: `backend/src/modules/agent-playground/core/RedisKeyStrategy.ts`
  - Exports: Helper functions for key generation
    ```typescript
    export const RedisKeys = {
      sessionContext: (sid: string) => `playground:session:${sid}:context`,
      warnings: (sid: string) => `playground:session:${sid}:warnings`,
      promptCache: (aid: string) => `playground:agent:${aid}:prompt`,
    };
    ```
  - Verify: Keys follow naming pattern
  - Acceptance: Key generation functions work ✅
  - Status: ⏳ Not started

### T011-T014: Utility Modules [P]

- [ ] **T011: Input sanitizer**
  - File: `backend/src/modules/agent-playground/core/InputSanitizer.ts`
  - Function: `sanitizeUserInput(input: string): { clean: string; flagged: boolean }`
  - Detection patterns: "ignore", "bypass", "system override", "forget"
  - Max tokens: 2000 (hard cap)
  - Verify:
    ```bash
    npm test -- InputSanitizer.test.ts --coverage
    ```
  - Acceptance: Unit tests pass, >80% coverage ✅
  - Status: ⏳ Not started

- [ ] **T012: Error handler utility**
  - File: `backend/src/modules/agent-playground/core/ErrorHandler.ts`
  - Function: `normalizeError(error: unknown): { type: 'input-only' | 'complete-failure'; message: string }`
  - Handles: LLM timeouts, crashes, network errors
  - Verify:
    ```bash
    npm test -- ErrorHandler.test.ts
    ```
  - Acceptance: All error types normalized ✅
  - Status: ⏳ Not started

- [ ] **T013: Usage counter module**
  - File: `backend/src/modules/agent-playground/core/UsageCounter.ts`
  - Functions:
    - `incrementUsageCount(userId, agentId, phase: 'input' | 'output'): Promise<number>`
    - `fetchUsageCount(userId, agentId): Promise<number>`
    - `isLimitReached(count): boolean`
  - Locking: Row-level `SELECT FOR UPDATE`
  - Verify:
    ```bash
    npm test -- UsageCounter.test.ts
    ```
  - Acceptance: Unit tests pass, atomic operations verified ✅
  - Status: ⏳ Not started

- [ ] **T014: Structured logger**
  - File: `backend/src/core/Logger.ts`
  - Library: Pino with JSON formatting
  - Setup:
    ```typescript
    import pino from 'pino';
    export const logger = pino({
      level: process.env.LOG_LEVEL || 'info',
      transport: { target: 'pino-pretty' }
    });
    ```
  - No sensitive data: Never log user input, prompts, API keys
  - Verify:
    ```bash
    npm test -- Logger.test.ts && grep -v "input\|prompt\|key" backend/logs/*.log
    ```
  - Acceptance: Logger created, no sensitive data ✅
  - Status: ⏳ Not started

**Phase 2 Acceptance**: All utilities implemented; tests pass with >80% coverage

---

## PHASE 3: Authentication & Session Management (T015-T018)

**Estimated Duration**: 2-3 hours | **Priority**: P0 (Critical Path)

### T015: Authentication Middleware

- [ ] **T015: JWT authentication middleware**
  - File: `backend/src/middleware/authMiddleware.ts`
  - Logic:
    ```typescript
    export const authMiddleware = (req, res, next) => {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.context = { user_id: decoded.user_id };
        next();
      } catch (e) {
        res.status(401).json({ error: 'Invalid token' });
      }
    };
    ```
  - Test: Send request without token → 401
  - Verify:
    ```bash
    npm test -- authMiddleware.test.ts
    ```
  - Acceptance: Unauthenticated requests return 401 ✅
  - Status: ⏳ Not started

### T016: Session Initialization

- [ ] **T016: Initialize session handler**
  - File: `backend/src/modules/agent-playground/handlers/initializeSession.ts`
  - Endpoint: `POST /api/playground/:agentId/init`
  - Logic:
    1. Auth middleware validates JWT
    2. Create row in `agent_playground_usage` (if not exists)
    3. Create session in Redis
    4. Return `{ sessionId, remaining: 10, state: 'INITIALIZED' }`
  - Test:
    ```bash
    curl -X POST http://localhost:3000/api/playground/{agentId}/init \
      -H "Authorization: Bearer {token}"
    ```
  - Acceptance: Returns 10/10 on first call ✅
  - Status: ⏳ Not started

### T017: Redis Session Store

- [ ] **T017: Redis session storage**
  - File: `backend/src/modules/agent-playground/store/SessionStore.ts`
  - Functions:
    - `createSession(sessionId, userId, agentId): Promise<void>`
    - `getSession(sessionId): Promise<Session>`
    - `deleteSession(sessionId): Promise<void>`
    - `validateSessionActive(sessionId): Promise<boolean>`
  - TTL: 30 minutes
  - Verify:
    ```bash
    npm test -- SessionStore.test.ts
    ```
  - Acceptance: Sessions expire after 30 min ✅
  - Status: ⏳ Not started

### T018: Playground Page Component

- [ ] **T018: Create Playground page component**
  - File: `frontend/src/pages/agent/[agentId]/Playground.tsx`
  - Layout: ChatWindow (70%) + Sidebar (30%)
  - Initial state: "10/10 messages remaining"
  - Verify:
    ```bash
    npm run dev:frontend && navigate to /agent/{agentId}/playground
    ```
  - Acceptance: Component mounts, displays "10/10" ✅
  - Status: ⏳ Not started

**Phase 3 Acceptance**: Authentication works; sessions created/validated; page renders

---

## PHASE 4: Gatekeeper & LLM Integration (T019-T026)

**Estimated Duration**: 3-4 hours | **Priority**: P0 (Critical Path)

### T019-T020: Gatekeeper & Counter Increment [P]

- [ ] **T019: Gatekeeper middleware**
  - File: `backend/src/modules/agent-playground/middleware/PlaygroundGatekeeper.ts`
  - Logic:
    1. Fetch usage_count with `SELECT ... FOR UPDATE`
    2. If count ≥ 10: Return 403 with `{ state: 'LOCKED', remaining: 0 }`
    3. Else: Continue to next handler
  - Test: Send request at limit → 403
  - Verify:
    ```bash
    npm test -- PlaygroundGatekeeper.test.ts
    ```
  - Acceptance: Request blocked at limit ✅
  - Status: ⏳ Not started

- [ ] **T020: Atomic increment handler**
  - File: `backend/src/modules/agent-playground/handlers/incrementUsageCount.ts`
  - Two-phase:
    - Phase 1: Increment on input received
    - Phase 2: Increment on LLM success
    - Rollback: Phase 2 only on LLM failure
  - Verify:
    ```bash
    npm test -- incrementUsageCount.test.ts
    ```
  - Acceptance: Counter is atomic, no race conditions ✅
  - Status: ⏳ Not started

### T021: Transaction Manager

- [ ] **T021: Database transaction manager**
  - File: `backend/src/modules/agent-playground/core/TransactionManager.ts`
  - Function: `async withTransaction<T>(callback: () => Promise<T>): Promise<T>`
  - Features:
    - Row-level locking with SELECT FOR UPDATE
    - Automatic rollback on error
    - Retry logic (exponential backoff)
  - Test: Concurrent transactions → Only one succeeds
  - Verify:
    ```bash
    npm test -- TransactionManager.test.ts
    ```
  - Acceptance: Transactions are atomic ✅
  - Status: ⏳ Not started

### T023-T024: LLM Integration [P]

- [ ] **T023: LLM client wrapper**
  - File: `backend/src/modules/agent-playground/api/PlaygroundLLMClient.ts`
  - Features:
    - Load real agent system_prompt.md
    - Append SYSTEM OVERRIDE (invisible)
    - Stream via AsyncGenerator<string>
  - Verify:
    ```bash
    npm test -- PlaygroundLLMClient.test.ts
    ```
  - Acceptance: Real agent responds ✅
  - Status: ⏳ Not started

- [ ] **T024: Agent prompt loader**
  - File: `backend/src/modules/agent-playground/core/PromptLoader.ts`
  - Function: `getAgentSystemPrompt(agentId: UUID): Promise<string>`
  - Cache: 1 hour in Redis
  - Source: Agent repository
  - Verify:
    ```bash
    npm test -- PromptLoader.test.ts
    ```
  - Acceptance: Prompt cached after first load ✅
  - Status: ⏳ Not started

### T025-T026: Message Streaming & Error Recovery [P]

- [ ] **T025: Message streaming handler**
  - File: `backend/src/modules/agent-playground/handlers/streamMessage.ts`
  - Endpoint: `POST /api/playground/:agentId/message` (SSE)
  - Pipeline: Auth → Gatekeeper → Sanitize → LLM → Stream → Increment
  - Increments: Input on start, output on end
  - Test:
    ```bash
    curl -X POST http://localhost:3000/api/playground/{agentId}/message \
      -H "Authorization: Bearer {token}" \
      -H "Content-Type: text/event-stream" \
      -d '{"sessionId": "", "message": ""}'
    ```
  - Acceptance: Message sent, stream received, counter decrements ✅
  - Status: ⏳ Not started

- [ ] **T026: Error recovery handler**
  - File: `backend/src/modules/agent-playground/handlers/handleStreamError.ts`
  - Logic: LLM crash mid-stream → Rollback output increment only
  - Response: `{ error: 'Runtime error. Output credit restored.', remaining }`
  - Test: Network error mid-stream → Output credit refunded
  - Verify:
    ```bash
    npm test -- handleStreamError.test.ts
    ```
  - Acceptance: Output credit restored on LLM crash ✅
  - Status: ⏳ Not started

**Phase 4 Acceptance**: Authenticated user sends message, receives agent response, counter decrements correctly

---

## PHASE 5: Frontend State Management (T027-T028)

**Estimated Duration**: 1-2 hours | **Priority**: P1

### T027-T028: State Machine & Store [P]

- [ ] **T027: State machine**
  - File: `frontend/src/modules/playground/core/PlaygroundStateMachine.ts`
  - States:
    - INITIALIZED (0/10 used)
    - ACTIVE (1-7/10 used)
    - WARNING (8-9/10 used)
    - EXHAUSTED (10/10 used)
  - Transitions: Strict, no loops
  - Test: `INITIALIZED` → (send message) → `ACTIVE` → (10 messages) → `EXHAUSTED`
  - Verify:
    ```bash
    npm test -- PlaygroundStateMachine.test.tsx
    ```
  - Acceptance: State transitions validated ✅
  - Status: ⏳ Not started

- [ ] **T028: Zustand store**
  - File: `frontend/src/modules/playground/store/playgroundStore.ts`
  - State:
    ```typescript
    {
      state: 'INITIALIZED' | 'ACTIVE' | 'WARNING' | 'EXHAUSTED',
      remaining: number,
      isLoading: boolean,
      messages: Array<{ role: 'user' | 'agent'; content: string }>,
      locked: boolean,
      warnings: string[]
    }
    ```
  - Middleware: devtools, subscribeWithSelector
  - Test: Store mutations trigger UI updates
  - Verify:
    ```bash
    npm test -- playgroundStore.test.tsx
    ```
  - Acceptance: Store mutations work, UI updates ✅
  - Status: ⏳ Not started

**Phase 5 Acceptance**: State management works; all transitions validated

---

## PHASE 6: Frontend UI Components (T029-T036)

**Estimated Duration**: 3-4 hours | **Priority**: P1

### T029-T031: Status & Locked Components [P]

- [ ] **T029: Status bar component**
  - File: `frontend/src/modules/playground/ui/StatusBar.tsx`
  - Display: "Evaluation Mode: Active | {remaining} messages remaining"
  - Colors: Green (1-7), Amber (8-9), Gray (10)
  - Verify: Visual rendering correct
  - Acceptance: Color changes at thresholds ✅
  - Status: ⏳ Not started

- [ ] **T030: Warning message component**
  - File: `frontend/src/modules/playground/ui/WarningMessage.tsx`
  - Text: "Evaluation limit approaching. {remaining} messages remaining."
  - Shows: At count 8 and 9 only
  - Non-intrusive: Footer/inline positioning
  - Verify: Warning appears at count 8
  - Acceptance: Warning appears when expected ✅
  - Status: ⏳ Not started

- [ ] **T031: Locked state component**
  - File: `frontend/src/modules/playground/ui/EvaluationComplete.tsx`
  - Title: "Evaluation Session Concluded"
  - Body: "The interaction limit for this agent specification has been reached..."
  - Action: Link to Technical Documentation (NOT checkout)
  - Input field: REMOVED (not disabled)
  - Verify: Input field gone at count 10
  - Acceptance: Input field removed when locked ✅
  - Status: ⏳ Not started

### T032-T036: Chat & Message Components [P]

- [ ] **T032: Chat message component**
  - File: `frontend/src/modules/playground/ui/ChatMessage.tsx`
  - Types: 'user' | 'agent' | 'error'
  - Styling:
    - Font: Monospace (Courier New, Monaco)
    - User: Right-aligned, light background
    - Agent: Left-aligned, dark background
    - Error: Red background
  - Test: Render messages with correct styling
  - Acceptance: Messages render correctly ✅
  - Status: ⏳ Not started

- [ ] **T033: Chat window component**
  - File: `frontend/src/modules/playground/ui/ChatWindow.tsx`
  - Features:
    - Display message array
    - Auto-scroll to bottom on new message
    - Typing indicator during stream
  - Test: New message added → Auto-scroll works
  - Acceptance: Messages appear and scroll works ✅
  - Status: ⏳ Not started

- [ ] **T034: Message input component**
  - File: `frontend/src/modules/playground/ui/MessageInput.tsx`
  - Features:
    - Textarea with character count
    - Submit button: Enabled only when (state !== 'EXHAUSTED' && input.length > 0)
    - Token count: Real-time estimate
  - Test: At limit → button disabled
  - Acceptance: Input disabled at limit ✅
  - Status: ⏳ Not started

- [ ] **T035: Streaming renderer**
  - File: `frontend/src/modules/playground/core/StreamingRenderer.ts`
  - Features:
    - Connect to SSE endpoint
    - Parse chunks and update UI
    - Error handling with retry logic
  - Test: Response streams character-by-character
  - Acceptance: Streaming works ✅
  - Status: ⏳ Not started

- [ ] **T036: useSendMessage hook**
  - File: `frontend/src/modules/playground/hooks/useSendMessage.ts`
  - Returns: `{ sendMessage, isLoading, error }`
  - Pipeline: Auth → Gatekeeper → Sanitize → Stream
  - Test: Send message → Counter updates
  - Acceptance: Hook sends message, counter updates ✅
  - Status: ⏳ Not started

**Phase 6 Acceptance**: UI complete; user can send messages; counter updates real-time; locked state works

---

## PHASE 7: Multi-Tab & E2E Tests (T022, T044-T046)

**Estimated Duration**: 2-3 hours | **Priority**: P0 (Critical Path)

### T022: Multi-Tab Exploit Prevention Test

- [ ] **T022: Multi-tab race condition test**
  - File: `backend/src/modules/agent-playground/__tests__/multi-tab.test.ts`
  - Scenario: Simulate 2 concurrent requests from same user/agent
  - Expected: Counter is atomic, second request sees updated count
  - Test:
    ```bash
    npm test -- multi-tab.test.ts
    ```
  - Acceptance: No race condition ✅
  - Status: ⏳ Not started

### T044-T046: E2E & Security Tests [P]

- [ ] **T044: E2E test: 5-message exchange**
  - File: `backend/src/modules/agent-playground/__tests__/e2e.test.ts`
  - Scenario: Auth → Init → 5 messages → Counter reaches 10
  - Expected: 11th message rejected
  - Test:
    ```bash
    npm test -- e2e.test.ts
    ```
  - Acceptance: Full flow works ✅
  - Status: ⏳ Not started

- [ ] **T045: E2E test: Multi-tab prevention**
  - File: `backend/src/modules/agent-playground/__tests__/multi-tab-e2e.test.ts`
  - Scenario: 2 tabs near limit, both try to send
  - Expected: Only one succeeds, other blocked
  - Test:
    ```bash
    npm test -- multi-tab-e2e.test.ts
    ```
  - Acceptance: Exploit prevented ✅
  - Status: ⏳ Not started

- [ ] **T046: Frontend E2E test**
  - File: `frontend/src/modules/playground/__tests__/integration.test.tsx`
  - Scenario: Mount Playground, send 5 messages via UI
  - Expected: State transitions, locked state at limit
  - Test:
    ```bash
    npm run test:ui -- integration.test.tsx
    ```
  - Acceptance: Full UI flow works ✅
  - Status: ⏳ Not started

**Phase 7 Acceptance**: MVP complete; all security measures in place; exploits prevented

---

## PHASE 8: Security Hardening (T037-T040)

**Estimated Duration**: 2-3 hours | **Priority**: P1

### T037-T040: Security Modules [P]

- [ ] **T037: Advanced sanitizer**
  - File: `backend/src/modules/agent-playground/core/AdvancedSanitizer.ts`
  - Detects: Jailbreak patterns (advanced patterns)
  - Logs: Flagged attempts (no message content)
  - Non-blocking: Let weak agents demonstrate vulnerability
  - Test: Jailbreak patterns detected, request proceeds
  - Acceptance: Patterns detected ✅
  - Status: ⏳ Not started

- [ ] **T038: Session isolation enforcer**
  - File: `backend/src/modules/agent-playground/middleware/SessionIsolation.ts`
  - Validates: Session token, expiry, user_id
  - Failure: 403 Forbidden
  - Test: Other user's session rejected → 403
  - Acceptance: Cross-user access blocked ✅
  - Status: ⏳ Not started

- [ ] **T039: Data retention policy enforcer**
  - File: `backend/src/modules/agent-playground/core/DataRetentionPolicy.ts`
  - TTL: 30 min active, immediate on limit
  - Cleanup: Cron every 10 min
  - Test: Sessions expire as expected
  - Acceptance: Redis keys expire correctly ✅
  - Status: ⏳ Not started

- [ ] **T040: Sanitized logger**
  - File: `backend/src/core/SanitizedLogger.ts`
  - Never logs: User input, agent output, prompts, API keys
  - Test: Verify user data never in logs
  - Acceptance: No sensitive data in logs ✅
  - Status: ⏳ Not started

**Phase 8 Acceptance**: All security measures in place; no PII logged

---

## PHASE 9: Additional Features (T041-T043)

**Estimated Duration**: 2-3 hours | **Priority**: P2

### T041-T043: Metrics & Abuse Detection [P]

- [ ] **T041: Usage metrics collection**
  - File: `backend/src/modules/agent-playground/core/UsageMetrics.ts`
  - Metrics: Anonymous counters (no user data)
  - Tracked: requests/min, success rate, avg latency
  - Storage: Redis ephemeral
  - Test: Metrics collected without PII
  - Acceptance: Metrics working ✅
  - Status: ⏳ Not started

- [ ] **T042: Abuse detection**
  - File: `backend/src/modules/agent-playground/core/AbuseDetector.ts`
  - Detects: Patterns like 10+ messages in <1 min
  - Response: Rate limiting (T043)
  - Logs: Flagged attempts
  - Test: Abuse pattern detected
  - Acceptance: Patterns detected ✅
  - Status: ⏳ Not started

- [ ] **T043: Rate limiter**
  - File: `backend/src/modules/agent-playground/middleware/RateLimiter.ts`
  - Per-user: 5 requests/min
  - Per-IP: 20 requests/min
  - Storage: Redis-backed
  - Response: 429 Too Many Requests
  - Test: Exceed limit → 429
  - Acceptance: Rate limiting works ✅
  - Status: ⏳ Not started

**Phase 9 Acceptance**: Metrics and abuse detection in place

---

## PHASE 10-14: Polish, Docs, Testing

### T047-T050: UI Polish [P]

- [ ] **T047: Playground layout**
  - File: `frontend/src/modules/playground/ui/PlaygroundLayout.tsx`
  - Layout: 70% chat, 30% sidebar; responsive
  - Test: Mobile, tablet, desktop
  - Acceptance: Layout correct on all devices ✅

- [ ] **T048: Empty state**
  - File: `frontend/src/modules/playground/ui/EmptyState.tsx`
  - Message: "Start an evaluation session..."
  - Acceptance: Component renders ✅

- [ ] **T049: Chat skeleton**
  - File: `frontend/src/modules/playground/ui/ChatSkeleton.tsx`
  - Animated placeholders during load
  - Acceptance: Skeleton appears while loading ✅

- [ ] **T050: Responsive design**
  - File: `frontend/src/modules/playground/ui/PlaygroundResponsive.tsx`
  - Tested: Mobile, tablet, desktop
  - Acceptance: Responsive on all devices ✅

### T051-T053: Documentation [P]

- [ ] **T051: Copy guidelines**
  - File: `docs/playground/COPY_GUIDELINES.md`
  - Acceptance: Document created ✅

- [ ] **T052: User guide**
  - File: `docs/playground/USER_GUIDE.md`
  - Acceptance: Guide created ✅

- [ ] **T053: Technical specification**
  - File: `docs/playground/TECHNICAL_SPEC.md`
  - Acceptance: Spec created ✅

### T054-T056: Testing & Security [P]

- [ ] **T054: Security tests**
  - File: `backend/src/modules/agent-playground/__tests__/security.test.ts`
  - Tests: Auth, injection, XSS, rate limit
  - Acceptance: All tests pass ✅

- [ ] **T055: Injection tests**
  - File: `backend/src/modules/agent-playground/__tests__/injection.test.ts`
  - Acceptance: Weak agents not protected ✅

- [ ] **T056: OWASP checklist**
  - File: `docs/playground/SECURITY.md`
  - Acceptance: Checklist created ✅

**Phase 10-14 Acceptance**: UI polished; docs complete; security tests pass

---

## PHASE 15-17: Optimization & Deployment

### T057-T059: Performance [P]

- [ ] **T057: Database optimization** — Counter <50ms, <100ms with lock ✓
- [ ] **T058: Redis cache strategy** — Prompt 1h, session 30m ✓
- [ ] **T059: Performance tests** — Streaming <100ms/chunk ✓

### T060-T066: DevOps & Monitoring [P]

- [ ] **T060: Docker config** — Services boot ✓
- [ ] **T061: CI/CD pipeline** — Tests, scan, build, deploy ✓
- [ ] **T062: Monitoring dashboard** — Grafana queries ✓
- [ ] **T063: Runbook** — Scaling, debugging ✓
- [ ] **T064: Monitoring queries** — Usage patterns ✓
- [ ] **T065: Feature flags** — PLAYGROUND_ENABLED ✓
- [ ] **T066: Admin dashboard** — Usage controls ✓

**Phase 15-17 Acceptance**: All systems production-ready

---

## Code Quality Standards

- [ ] TypeScript: Strict mode (`npm run type-check` passes)
- [ ] JSDoc: All functions documented
- [ ] No console.log: Only Logger used
- [ ] Errors caught: All normalized
- [ ] Zod validation: All API responses validated
- [ ] No SQL injection: Parameterized queries
- [ ] Memory leaks: React cleanup on unmount
- [ ] Test coverage: >80% for critical paths

---

## Final Sign-Off

- [ ] All 66 tasks completed ✅
- [ ] All acceptance criteria met ✅
- [ ] Code review approved ✅
- [ ] Security review approved ✅
- [ ] Performance benchmarks met ✅
- [ ] Documentation reviewed ✅
- [ ] **READY FOR PRODUCTION** ✅

---

**Last Updated**: 2025-01-15\n**Total Progress**: 0/66 tasks completed (0%)
