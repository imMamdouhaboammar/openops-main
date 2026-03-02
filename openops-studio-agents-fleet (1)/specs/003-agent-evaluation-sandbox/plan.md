# Agent Evaluation Sandbox – Implementation Plan

**Status**: Ready for Execution  
**Created**: 2026-01-12  
**Phase**: Implementation (speckit.implement)

---

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **Cache**: Redis 7+
- **Validation**: Zod
- **Logging**: Pino (JSON format)
- **Testing**: Jest + Supertest
- **Type Safety**: TypeScript (strict mode)

### Frontend
- **Framework**: React 19
- **Build**: Vite
- **State Management**: Zustand (with devtools + subscribeWithSelector)
- **Styling**: Tailwind CSS
- **Components**: Headless UI primitives
- **Testing**: Vitest + React Testing Library

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Security Scanning**: Trivy
- **Monitoring**: Grafana + Prometheus (future)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Playground Component (React)                         │  │
│  │  - State Machine (INITIALIZED → ACTIVE → WARNING...) │  │
│  │  - Chat UI (Terminal-style)                          │  │
│  │  - Status Bar + Warning Messages                     │  │
│  │  - Input Field (disabled at limit)                   │  │
│  └──────────────────────────────────────────────────────┘  │
│         │                                 │                  │
│         ▼                                 ▼                  │
│  [API Client]                    [WebSocket/SSE]            │
└─────────────────────────────────────────────────────────────┘
        │                                │
        │ HTTP/2                         │ SSE Stream
        │                                │
┌───────▼────────────────────────────────▼──────────────────┐
│            Backend API Layer (Express)                      │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Authentication Middleware                           │  │
│  │  - JWT validation                                   │  │
│  │  - User ID extraction                              │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Gatekeeper Middleware                               │  │
│  │  - Usage counter check (DB row-level lock)          │  │
│  │  - Limit enforcement                               │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Message Handler Endpoints                           │  │
│  │  - POST /api/playground/:agentId/init               │  │
│  │  - POST /api/playground/:agentId/message (SSE)      │  │
│  │  - GET /api/playground/:agentId/status              │  │
│  └─────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Core Services                                        │  │
│  │  - UsageCounter (atomic increments)                 │  │
│  │  - InputSanitizer (jailbreak detection)             │  │
│  │  - PlaygroundLLMClient (real prompts)               │  │
│  │  - TransactionManager (DB locking)                  │  │
│  │  - SessionStore (Redis ephemeral data)              │  │
│  └─────────────────────────────────────────────────────┘  │
└───────┬────────────────────────────────────────────────────┘
        │
        ├─────────────────────┬──────────────────────┐
        ▼                     ▼                      ▼
   ┌────────────┐    ┌──────────────┐    ┌────────────────┐
   │ PostgreSQL │    │    Redis     │    │   LLM API      │
   │            │    │              │    │  (Gemini/GPT)  │
   │ Tables:    │    │ Ephemeral:   │    │                │
   │ - usage    │    │ - sessions   │    └────────────────┘
   │ - sessions │    │ - context    │
   │ - metrics  │    │ - warnings   │
   └────────────┘    └──────────────┘
```

---

## File Structure

```
backend/
├── src/
│   ├── middleware/
│   │   ├── authMiddleware.ts              [T015]
│   │   ├── SessionIsolation.ts            [T038]
│   │   └── RateLimiter.ts                 [T043]
│   ├── modules/
│   │   └── agent-playground/
│   │       ├── core/
│   │       │   ├── types.ts               [T006]
│   │       │   ├── InputSanitizer.ts      [T011]
│   │       │   ├── ErrorHandler.ts        [T012]
│   │       │   ├── UsageCounter.ts        [T013, T057]
│   │       │   ├── RedisKeyStrategy.ts    [T010]
│   │       │   ├── TransactionManager.ts  [T021]
│   │       │   ├── PromptLoader.ts        [T024]
│   │       │   ├── AdvancedSanitizer.ts   [T037]
│   │       │   ├── DataRetentionPolicy.ts [T039]
│   │       │   ├── PlaygroundMetrics.ts   [T041, T064]
│   │       │   └── AbuseDetector.ts       [T042]
│   │       ├── api/
│   │       │   └── PlaygroundLLMClient.ts [T023]
│   │       ├── handlers/
│   │       │   ├── initializeSession.ts   [T016]
│   │       │   ├── streamMessage.ts       [T025]
│   │       │   ├── incrementUsageCount.ts [T020]
│   │       │   └── handleStreamError.ts   [T026]
│   │       ├── middleware/
│   │       │   └── PlaygroundGatekeeper.ts [T019]
│   │       ├── store/
│   │       │   └── SessionStore.ts        [T017, T058]
│   │       └── __tests__/
│   │           ├── multi-tab.test.ts      [T022]
│   │           ├── e2e.test.ts            [T044]
│   │           ├── multi-tab-e2e.test.ts  [T045]
│   │           ├── security.test.ts       [T054]
│   │           ├── injection.test.ts      [T055]
│   │           └── performance.test.ts    [T059]
│   ├── core/
│   │   ├── Database.ts                    [T009]
│   │   ├── RedisClient.ts                 [T005]
│   │   ├── Logger.ts                      [T014]
│   │   ├── SanitizedLogger.ts             [T040]
│   │   └── FeatureFlags.ts                [T065]
│   ├── db/
│   │   └── migrations/
│   │       ├── 001-create-playground-usage.sql   [T007]
│   │       └── 002-create-playground-sessions.sql [T008]
│   └── index.ts
├── package.json
├── tsconfig.json
└── docker-compose.yml                     [T060]

frontend/
├── src/
│   ├── modules/
│   │   └── playground/
│   │       ├── core/
│   │       │   ├── PlaygroundStateMachine.ts [T027]
│   │       │   └── StreamingRenderer.ts      [T035]
│   │       ├── hooks/
│   │       │   └── useSendMessage.ts         [T036]
│   │       ├── store/
│   │       │   └── playgroundStore.ts        [T028]
│   │       ├── ui/
│   │       │   ├── PlaygroundLayout.tsx      [T047]
│   │       │   ├── ChatMessage.tsx           [T032]
│   │       │   ├── ChatWindow.tsx            [T033]
│   │       │   ├── MessageInput.tsx          [T034]
│   │       │   ├── StatusBar.tsx             [T029]
│   │       │   ├── WarningMessage.tsx        [T030]
│   │       │   ├── EvaluationComplete.tsx    [T031]
│   │       │   ├── EmptyState.tsx            [T048]
│   │       │   ├── ChatSkeleton.tsx          [T049]
│   │       │   ├── PlaygroundResponsive.tsx  [T050]
│   │       │   └── PlaygroundLayout.tsx      [T047]
│   │       └── __tests__/
│   │           ├── integration.test.tsx      [T046]
│   │           └── performance.test.tsx      [T059]
│   ├── pages/
│   │   ├── agent/
│   │   │   └── [agentId]/
│   │   │       └── Playground.tsx            [T018]
│   │   └── admin/
│   │       └── PlaygroundAdmin.tsx           [T066]
│   └── index.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts

docs/
├── playground/
│   ├── COPY_GUIDELINES.md           [T051]
│   ├── USER_GUIDE.md                [T052]
│   ├── TECHNICAL_SPEC.md            [T053]
│   ├── SECURITY.md                  [T056]
│   ├── MONITORING.md                [T062]
│   └── RUNBOOK.md                   [T063]

.github/
└── workflows/
    └── playground-ci.yml            [T061]
```

---

## Database Schema

### Table: agent_playground_usage

```sql
CREATE TABLE agent_playground_usage (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  agent_id UUID NOT NULL,
  usage_count INTEGER DEFAULT 0,
  last_interaction_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, agent_id),
  INDEX idx_user_id (user_id),
  INDEX idx_agent_id (agent_id),
  INDEX idx_composite (user_id, agent_id)
);
```

### Table: playground_sessions

```sql
CREATE TABLE playground_sessions (
  id BIGSERIAL PRIMARY KEY,
  session_id UUID NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  agent_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  INDEX idx_session_id (session_id),
  INDEX idx_user_id (user_id),
  INDEX idx_agent_id (agent_id)
);
```

---

## Redis Key Strategy

```
playground:session:{sessionId}:context     → Conversation history (ephemeral)
playground:session:{sessionId}:warnings    → Warning state (ephemeral)
playground:agent:{agentId}:prompt          → System prompt cache (1h TTL)
playground:user:{userId}:metrics           → User metrics (persistent)
```

---

## API Endpoints

### Initialize Playground Session

```
POST /api/playground/:agentId/init
Authorization: Bearer {jwt}

Response:
{
  "sessionId": "uuid",
  "remaining": 10,
  "state": "INITIALIZED",
  "agent": {
    "name": "Agent Name",
    "version": "1.0.0"
  }
}
```

### Send Message

```
POST /api/playground/:agentId/message (SSE)
Authorization: Bearer {jwt}
Content-Type: application/json

Body:
{
  "sessionId": "uuid",
  "userMessage": "Your question here"
}

Response Stream (SSE):
data: {"type": "token", "content": "Agent response chunk..."}
data: {"type": "complete", "remaining": 9}
data: {"type": "error", "message": "Error message"}
```

### Get Status

```
GET /api/playground/:agentId/status
Authorization: Bearer {jwt}

Response:
{
  "remaining": 8,
  "state": "ACTIVE",
  "locked": false
}
```

---

## Implementation Phases

### MVP (Phases 1-9) – 2 Weeks

**Deliverables**:
- ✅ Complete working Playground
- ✅ All core user stories (US1-US7)
- ✅ E2E integration tests
- ✅ Security baseline

### Post-MVP (Phases 10-17) – Week 3-4

**Deliverables**:
- ✅ Advanced security & hardening
- ✅ Performance optimization
- ✅ Deployment & monitoring
- ✅ Admin dashboard

---

## Dependencies & Constraints

### External Dependencies
- PostgreSQL 14+
- Redis 7+
- Node.js 18+
- LLM API (Gemini/GPT/Claude)

### Performance SLAs
- Counter fetch: < 50ms
- Counter increment: < 100ms (with locking)
- Message stream: < 100ms per chunk
- Chat scroll: 60 FPS

### Security Constraints
- All requests must authenticate
- Row-level DB locking for multi-tab prevention
- No conversation persistence
- Jailbreak patterns logged but not blocked

---

## Git Strategy

- **Branch**: `feature/agent-evaluation-sandbox`
- **PR Strategy**: Feature branch per phase
- **Commit Convention**: `[TASK_ID] Description (e.g., [T015] Implement auth middleware)`

---

## Ready For

✅ Task execution begins  
✅ All phases mapped to task IDs  
✅ File structure defined  
✅ Dependencies clear  
✅ Performance targets established
