# Agent Evaluation Sandbox – Quickstart Guide

**For**: Developers starting implementation  
**Time to read**: 5 minutes

---

## Get Started in 5 Steps

### 1. Clone & Setup

```bash
# Navigate to fleet directory
cd openops-studio-agents-fleet

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Update .env.local with your values:
# - DATABASE_URL=postgresql://...
# - REDIS_URL=redis://...
# - LLM_API_KEY=your_key_here
```

### 2. Start Services

```bash
# Start PostgreSQL + Redis + Backend
docker-compose up -d

# Run migrations
npm run db:migrate

# Start backend dev server
npm run dev:backend
```

### 3. Verify Database

```bash
# Check that tables exist
psql $DATABASE_URL -c "\dt"

# Should see:
# - agent_playground_usage
# - playground_sessions
```

### 4. Start Frontend

```bash
# In a new terminal
npm run dev:frontend

# Navigate to http://localhost:3000
```

### 5. Test the Flow

1. Login as test user
2. Navigate to an agent's product page
3. Click "Evaluate" button
4. See Playground with "10/10 messages remaining"
5. Send a message and verify:
   - Message appears in chat
   - Agent responds (real system prompt)
   - Counter decrements to 8/10

---

## Key Files to Know

| File | Purpose | Task |
|------|---------|------|
| `backend/src/modules/agent-playground/core/UsageCounter.ts` | Core limit enforcement | T013 |
| `backend/src/modules/agent-playground/middleware/PlaygroundGatekeeper.ts` | Request gatekeeper | T019 |
| `frontend/src/modules/playground/store/playgroundStore.ts` | UI state (Zustand) | T028 |
| `backend/src/db/migrations/001-create-playground-usage.sql` | Database schema | T007 |
| `docs/playground/COPY_GUIDELINES.md` | UI messaging rules | T051 |

---

## Common Tasks

### Check Current Count for a User-Agent Pair

```bash
psql $DATABASE_URL -c \
  "SELECT usage_count FROM agent_playground_usage \
   WHERE user_id = '00000000-0000-0000-0000-000000000001' \
   AND agent_id = '00000000-0000-0000-0000-000000000002';"
```

### Clear All Sessions for Testing

```bash
redis-cli FLUSHDB
```

### View Active Sessions

```bash
psql $DATABASE_URL -c \
  "SELECT session_id, user_id, agent_id, created_at, expires_at \
   FROM playground_sessions \
   ORDER BY created_at DESC \
   LIMIT 10;"
```

### Test Multi-Tab Exploit Prevention

1. Open agent page in two tabs
2. Tab 1: Send message → Counter goes 10 → 9 → 8
3. Tab 2: Quickly send message → Should see "Limit approaching" or "Exhausted"
4. Both tabs should see consistent counter

---

## Debugging

### Backend Debug Mode

```bash
DEBUG=playground:* npm run dev:backend
```

### Check Database Locks

```sql
-- While a request is in progress
SELECT * FROM pg_locks;
```

### Inspect Redis Keys

```bash
redis-cli
KEYS playground:*
GET playground:session:xxx:context
TTL playground:session:xxx:context
```

### Watch Network Traffic

```bash
# In browser DevTools → Network tab
# Filter for: /api/playground/
# Check headers: Authorization, Content-Type
# Check response: SSE chunks flowing in real-time
```

---

## Phase Execution Order

**For fastest feedback loop**:

1. **Phase 1-3** (Infrastructure): ~1-2 hours
   - Set up database, Redis, TypeScript
   - All core utilities ready
   - Backend can boot

2. **Phase 4** (Authentication): ~2-3 hours
   - Auth middleware working
   - Session init endpoint working
   - Can test login

3. **Phase 5-6** (Gatekeeper + LLM): ~4-5 hours
   - Gatekeeper middleware working
   - Can send message to LLM
   - Real agent responds

4. **Phase 7-8** (Frontend): ~4-5 hours
   - Component tree built
   - State machine working
   - Chat UI renders

5. **Integration & Testing**: ~3-4 hours
   - E2E tests passing
   - Multi-tab exploit prevented
   - 5-message exchange works

---

## First Test Case

**Scenario**: Evaluate an agent with 2 exchanges (4 messages)

**Steps**:

1. Authenticate as user `test-user-123`
2. Init playground for agent `test-agent-456`
3. Verify response: `{ remaining: 10, state: 'INITIALIZED' }`
4. Send message 1: "Hello"
5. Verify response streams and counter is now 8/10
6. Send message 2: "How are you?"
7. Verify response streams and counter is now 6/10
8. Verify no more than 2 agent invocations occurred
9. Verify counter is atomic (no race conditions)

---

## Key Principles During Implementation

1. **No Simplification**: Always use real agent system prompts, never demo mode
2. **Atomic Counters**: All increments use DB transactions with row-level locks
3. **Ephemeral Only**: No conversation data in PostgreSQL, only in Redis (TTL 30min)
4. **Clinical Copy**: No "Buy now", no "Limited time", just "Evaluation limit approaching"
5. **Visible Failures**: If agent is weak and jailbreaks easily, show it; don't hide weaknesses
6. **Multi-Tab Safe**: Every request checks current count against DB, never trusts client-side counter

---

## Documentation Links

- **Spec**: `specs/003-agent-evaluation-sandbox/spec.md`
- **Architecture**: `specs/003-agent-evaluation-sandbox/plan.md`
- **Data Model**: `specs/003-agent-evaluation-sandbox/data-model.md`
- **Tasks**: `specs/003-agent-evaluation-sandbox/tasks.md`
- **Copy Guidelines**: `docs/playground/COPY_GUIDELINES.md` (created in T051)

---

## Support

- **Questions**: Check spec.md first
- **Architecture clarity**: See plan.md Architecture Overview section
- **Database questions**: See data-model.md
- **Edge cases**: See spec.md Edge Case Handling section

---

## Ready?

```bash
npm run test            # Run all tests
npm run lint            # Check code quality
npm run build           # Build for production
```

Good luck! 🚀
