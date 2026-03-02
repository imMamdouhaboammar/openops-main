# Agent Evaluation Sandbox – IMPLEMENTATION READY

**Status**: ✅ Ready for `/speckit.implement` Phase  
**Created**: 2026-01-12  
**Phase**: Implementation (Task Execution)

---

## 📋 Pre-Implementation Checklist Status

### Required SpecKit Files: ✅ ALL COMPLETE

| File | Status | Purpose |
|------|--------|---------|
| `spec.md` | ✅ Complete | Feature specification & requirements |
| `plan.md` | ✅ Complete | Tech stack, architecture, file structure |
| `data-model.md` | ✅ Complete | Database schema, entities, relationships |
| `tasks.md` | ✅ Complete | 66 implementation tasks organized by phase |
| `quickstart.md` | ✅ Complete | Developer onboarding & first steps |
| `research.md` | ✅ Complete | Design decisions & rationale |
| `checklists/design.md` | ✅ Complete | Architecture review checklist |
| `checklists/implementation.md` | ✅ Complete | Implementation milestone checklist |

---

## 🎯 Feature Summary

**Name**: Agent Evaluation Sandbox (Embedded Agent Playground)

**Purpose**: Allow authenticated users to evaluate AI agents with a permanent 10-message lifetime limit per agent, running real system prompts with zero marketing language.

**Core Constraint**: 10 total messages (5 exchanges) per user per agent, forever. Non-resetable.

**Value Proposition**:
- ✅ Users see how agents actually think (no demo mode)
- ✅ Fair evaluation (limited to prevent subsidy)
- ✅ Privacy respected (no conversation logging)
- ✅ Honest (weak agents are exposed)

---

## 📊 Implementation Scope

### MVP Scope (66 Tasks, 2 Weeks)

**Phases 1-9** (Tasks T001-T046):
- ✅ Project setup & infrastructure
- ✅ Database & persistence layer
- ✅ Core utilities (sanitizer, error handler, counter)
- ✅ Authentication & session management
- ✅ Gatekeeper middleware & usage limits
- ✅ LLM integration with real agent prompts
- ✅ State machine (INITIALIZED → ACTIVE → WARNING → EXHAUSTED)
- ✅ Chat UI with terminal styling
- ✅ Security hardening & multi-tab protection
- ✅ End-to-end integration tests

### Post-MVP Scope (Tasks T047-T066)

**Phases 10-17** (2 additional weeks):
- Advanced monitoring & abuse detection
- Performance optimization
- Production deployment & CI/CD
- Admin dashboard
- Comprehensive documentation

---

## 🏗️ Architecture Snapshot

### Backend Stack
- Express.js + TypeScript (strict mode)
- PostgreSQL for persistent usage counters (agent_playground_usage table)
- Redis for ephemeral session context (30-minute TTL)
- Zod for validation
- Pino for sanitized logging

### Frontend Stack
- React 19 + TypeScript
- Zustand for state management
- Vite for build tooling
- Terminal-style chat UI (Tailwind CSS)
- SSE (Server-Sent Events) for response streaming

### Database Schema
```sql
agent_playground_usage:
  - user_id (UUID)
  - agent_id (UUID)
  - usage_count (INT, 0-10)
  - UNIQUE(user_id, agent_id)
  - Composite index for transactional locking
```

---

## 🔑 Key Design Decisions (Locked)

These decisions are **NOT UP FOR DEBATE** during implementation:

| Decision | Rule | Rationale |
|----------|------|-----------|
| Message limit | 10 per user per agent, lifetime | Permanent, no reset, no exception |
| Both I/O count | User input (1) + Agent output (1) | Exposes agent verbosity |
| Real agent code | No demo mode; actual system_prompt.md | Honesty: "What you see is what you get" |
| No persistence | Redis only, TTL 30 min; never in DB | Privacy: no conversation logs |
| State machine | INITIALIZED → ACTIVE → WARNING → EXHAUSTED | Strict; no loops; no shortcuts |
| Copy tone | Clinical, objective, zero marketing | "Evaluation Mode" not "Limited Trial" |
| Multi-tab safe | DB row-level locking (SELECT FOR UPDATE) | Atomic counter increment |
| Input field | REMOVED (not disabled) at limit | Clear visual enforcement |
| Jailbreaks | Detected but not blocked; let weak agents fail | Trust through transparency |

---

## 📂 File Structure (Ready to Implement)

```
backend/src/modules/agent-playground/
├── core/
│   ├── types.ts                    [T006]
│   ├── InputSanitizer.ts          [T011]
│   ├── ErrorHandler.ts            [T012]
│   ├── UsageCounter.ts            [T013, T057]
│   ├── RedisKeyStrategy.ts        [T010]
│   ├── TransactionManager.ts      [T021]
│   ├── PromptLoader.ts            [T024]
│   ├── AdvancedSanitizer.ts       [T037]
│   ├── DataRetentionPolicy.ts     [T039]
│   ├── PlaygroundMetrics.ts       [T041, T064]
│   └── AbuseDetector.ts           [T042]
├── handlers/
│   ├── initializeSession.ts       [T016]
│   ├── streamMessage.ts           [T025]
│   ├── incrementUsageCount.ts     [T020]
│   └── handleStreamError.ts       [T026]
├── middleware/
│   ├── PlaygroundGatekeeper.ts    [T019]
│   └── SessionIsolation.ts        [T038]
├── store/
│   └── SessionStore.ts            [T017, T058]
└── __tests__/
    ├── multi-tab.test.ts          [T022]
    ├── e2e.test.ts                [T044]
    ├── multi-tab-e2e.test.ts      [T045]
    ├── security.test.ts           [T054]
    ├── injection.test.ts          [T055]
    └── performance.test.ts        [T059]

frontend/src/modules/playground/
├── core/
│   ├── PlaygroundStateMachine.ts  [T027]
│   └── StreamingRenderer.ts       [T035]
├── hooks/
│   └── useSendMessage.ts          [T036]
├── store/
│   └── playgroundStore.ts         [T028]
├── ui/
│   ├── PlaygroundLayout.tsx       [T047]
│   ├── ChatMessage.tsx            [T032]
│   ├── ChatWindow.tsx             [T033]
│   ├── MessageInput.tsx           [T034]
│   ├── StatusBar.tsx              [T029]
│   ├── WarningMessage.tsx         [T030]
│   ├── EvaluationComplete.tsx     [T031]
│   ├── EmptyState.tsx             [T048]
│   ├── ChatSkeleton.tsx           [T049]
│   └── PlaygroundResponsive.tsx   [T050]
└── __tests__/
    ├── integration.test.tsx       [T046]
    └── performance.test.tsx       [T059]
```

---

## 🚀 First Steps (Next 1 Hour)

1. **Read documentation** (in priority order):
   - `spec.md` — Understand the what & why
   - `plan.md` — Understand the architecture
   - `data-model.md` — Understand the database
   - `research.md` — Understand design decisions

2. **Set up dev environment**:
   ```bash
   cd openops-studio-agents-fleet
   npm install
   cp .env.example .env.local
   # Update .env.local with DB/Redis/API keys
   docker-compose up -d
   npm run db:migrate
   ```

3. **Start with Phase 1-3** (Infrastructure):
   - Create backend project structure
   - Install dependencies
   - Create database migrations
   - Set up Redis client
   - Define TypeScript types

4. **Verify**: Backend should boot successfully with `npm run dev:backend`

---

## 📈 Implementation Timeline (Estimated)

| Phase | Tasks | Time | Output |
|-------|-------|------|--------|
| 1-3 (Setup) | T001-T014 | 4 hours | Backend infrastructure ready |
| 4 (Auth) | T015-T018 | 3 hours | Login works; session init works |
| 5-6 (Core) | T019-T026 | 5 hours | Message submission & LLM response works |
| 7-8 (Frontend) | T027-T036 | 5 hours | Chat UI renders; counter updates |
| 9-11 (Security & Tests) | T037-T046 | 4 hours | All E2E tests pass; exploits prevented |
| **MVP Total** | **T001-T046** | **~21 hours** | **Fully working Playground** |
| 12-17 (Polish & Ops) | T047-T066 | ~16 hours | Production-ready; monitored; documented |
| **Full Total** | **66 tasks** | **~37 hours** | **Complete feature** |

**With a 2-week timeline**: Easy pace; ~2 tasks per hour average.

---

## ✅ Success Criteria (MVP)

The MVP is considered successful when:

- ✅ Unauthenticated user is rejected with 401
- ✅ Authenticated user sees "10/10 messages remaining"
- ✅ User can send a message and receive agent response (real system prompt, not demo)
- ✅ Counter decrements correctly (user input: -1, agent output: -1)
- ✅ At count 8, warning message appears (non-alarming)
- ✅ At count 10, input field is REMOVED (not disabled)
- ✅ Multi-tab access shows consistent counter (no race condition)
- ✅ Network error mid-stream refunds output credit
- ✅ Session expires from Redis after 30 minutes
- ✅ No conversation data in PostgreSQL (only usage_count)
- ✅ All E2E integration tests pass

---

## 🔒 Non-Negotiables (Enforcement Points)

The following MUST be reviewed during code review:

1. **No Demo Mode**: Verify real system_prompt.md is loaded
2. **No Persistence**: Verify conversation data never written to PostgreSQL
3. **Atomic Counter**: Verify row-level locking in counter increment
4. **No Reset**: Verify no admin function exists to reset usage_count
5. **Clinical Copy**: Verify no marketing language in UI
6. **Input Removal**: Verify input field is removed (not disabled) at limit
7. **Jailbreak Detection**: Verify weak agents are NOT artificially protected

---

## 📞 Questions During Implementation?

**Refer to**:
- **"Why this architecture?"** → research.md (Design Decisions)
- **"How does X work?"** → plan.md (Architecture Overview)
- **"What should database Y contain?"** → data-model.md (Schema & Lifecycle)
- **"What is task T025?"** → tasks.md (Detailed task description)
- **"How do I set up?"** → quickstart.md (Developer Guide)

---

## 🎯 Ready to Start?

```bash
# Verify spec-kit is complete
ls -la specs/003-agent-evaluation-sandbox/
# Should show: spec.md, plan.md, data-model.md, tasks.md, quickstart.md, research.md, checklists/

# Read spec
cat specs/003-agent-evaluation-sandbox/spec.md

# Start implementing
npm run dev:backend  # Terminal 1
npm run dev:frontend # Terminal 2

# Begin with Phase 1: T001-T006 (Setup & Infrastructure)
```

---

## 📋 Checklist Status

| Checklist | Status | Items | Incomplete |
|-----------|--------|-------|-----------|
| **design.md** | ⚠️ NOT STARTED | 7 phases | 7/7 |
| **implementation.md** | ⚠️ NOT STARTED | 17 phases | 17/17 |

**Action**: Checklists are ready but **INCOMPLETE**. This is expected. They will be checked off as implementation progresses through the phases.

---

## 🚦 Go/No-Go Decision

| Requirement | Status | Notes |
|-------------|--------|-------|
| Specification complete? | ✅ YES | spec.md is locked |
| Architecture defined? | ✅ YES | plan.md is locked |
| Database schema ready? | ✅ YES | data-model.md is locked |
| Task list complete? | ✅ YES | 66 tasks, all prioritized |
| Design decisions documented? | ✅ YES | research.md rationale captured |
| Developer guide ready? | ✅ YES | quickstart.md onboarding |
| Checklists created? | ✅ YES | Ready to check off |

**GO DECISION**: ✅ **APPROVED FOR IMPLEMENTATION**

Ready to proceed with Phase 1.

---

**Next Command**: Begin executing Phase 1 tasks (T001-T006) per the task execution workflow.
