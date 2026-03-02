# Agent Evaluation Sandbox – Data Model

**Version**: 1.0.0  
**Created**: 2026-01-12

---

## Overview

The data model is intentionally minimal to enforce the "no persistence" principle. Only three entities are stored persistently: usage counts, session metadata (for admin/monitoring), and metrics.

---

## Core Entities

### 1. User

**Source**: External (Auth system)  
**Attributes**:
- `user_id` (UUID) — Primary identifier
- `email` (string) — User email
- `authenticated_at` (timestamp) — Last authentication time

**Notes**: Users are NOT created by playground; they come from the main auth system.

---

### 2. Agent

**Source**: Product catalog  
**Attributes**:
- `agent_id` (UUID) — Primary identifier
- `name` (string) — Agent display name
- `version` (string) — Semantic version (e.g., "1.2.3")
- `system_prompt` (text) — Real agent instructions
- `tools_definition` (json) — Available tools/actions

**Notes**: Agents are referenced but not stored by playground; they live in product catalog.

---

### 3. PlaygroundUsage (PERSISTENT)

**Table**: `agent_playground_usage`  
**Purpose**: Track the lifetime interaction budget per user per agent

**Schema**:

```sql
CREATE TABLE agent_playground_usage (
  id BIGSERIAL PRIMARY KEY,
  
  -- Foreign Keys
  user_id UUID NOT NULL,
  agent_id UUID NOT NULL,
  
  -- Counters
  usage_count INTEGER DEFAULT 0,      -- 0-10 messages lifetime
  
  -- Metadata
  last_interaction_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(user_id, agent_id),
  
  -- Indexes (for queries and row locking)
  INDEX idx_user_id (user_id),
  INDEX idx_agent_id (agent_id),
  INDEX idx_composite (user_id, agent_id)
);
```

**Lifecycle**:
- **Creation**: Row created on first playground init for (user_id, agent_id)
- **Increment**: Atomic increment on each message pair (input + output)
- **Lock**: Row-level lock during counter check to prevent race conditions
- **Deletion**: Never — maintains permanent record for business compliance

**Query Patterns**:
- `SELECT usage_count FROM agent_playground_usage WHERE user_id = ? AND agent_id = ? FOR UPDATE;` — Atomic fetch + lock
- `UPDATE agent_playground_usage SET usage_count = usage_count + 1 WHERE user_id = ? AND agent_id = ?;` — Atomic increment

---

### 4. PlaygroundSession (EPHEMERAL)

**Table**: `playground_sessions`  
**Purpose**: Track active sessions for monitoring and admin purposes (NOT for data retrieval)

**Schema**:

```sql
CREATE TABLE playground_sessions (
  id BIGSERIAL PRIMARY KEY,
  
  -- Primary Key
  session_id UUID NOT NULL UNIQUE,
  
  -- Foreign Keys
  user_id UUID NOT NULL,
  agent_id UUID NOT NULL,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX idx_session_id (session_id),
  INDEX idx_user_id (user_id),
  INDEX idx_agent_id (agent_id)
);
```

**Lifecycle**:
- **Creation**: Row inserted when session is created
- **Expiry**: Row deleted or marked expired after 30 minutes
- **Cleanup**: Cron job deletes all expired rows every 10 minutes

**Data Retention**: Session-level metadata only (no messages, no content)

---

### 5. PlaygroundMetrics (PERSISTENT, ANONYMOUS)

**Table**: `playground_metrics` (optional, for analytics only)  
**Purpose**: Anonymous usage statistics for monitoring and abuse detection

**Schema**:

```sql
CREATE TABLE playground_metrics (
  id BIGSERIAL PRIMARY KEY,
  
  -- Metric Type
  metric_name VARCHAR(255),
  metric_type ENUM('counter', 'gauge', 'histogram'),
  
  -- Dimensions (NO user_id for privacy)
  agent_id UUID,
  hour TIMESTAMP,
  
  -- Values
  value NUMERIC,
  count INTEGER,
  
  -- Indexes
  INDEX idx_agent_id_hour (agent_id, hour),
  INDEX idx_metric_name (metric_name)
);
```

**Metric Examples**:
- `"total_interactions_per_agent"` — Sum of messages per agent per hour
- `"success_rate_per_agent"` — % of successful interactions
- `"abuse_detection_flags"` — # of flagged attempts per hour
- `"session_duration_distribution"` — Session time histogram

**Data Retention**: Metrics kept for 90 days; older data aggregated into summaries

---

## Ephemeral State (Redis)

Ephemeral data is stored in Redis and expires automatically. **No persistence to PostgreSQL**.

### Session Context

**Key**: `playground:session:{sessionId}:context`  
**TTL**: 30 minutes (or immediate on limit reached)  
**Schema**:

```json
{
  "sessionId": "uuid",
  "userId": "uuid",
  "agentId": "uuid",
  "messages": [
    {
      "role": "user",
      "content": "Question...",
      "timestamp": "ISO8601"
    },
    {
      "role": "agent",
      "content": "Response...",
      "timestamp": "ISO8601"
    }
  ],
  "currentState": "ACTIVE|WARNING|EXHAUSTED",
  "remaining": 8
}
```

**Lifecycle**:
- Created on session init
- Updated on each message exchange
- Deleted immediately when:
  - Session expires (30 min timeout)
  - User closes browser
  - Limit reached (count = 10)

**Notes**: This data is NOT stored to PostgreSQL; it lives only in RAM.

### Warning State

**Key**: `playground:session:{sessionId}:warnings`  
**TTL**: Same as session context  
**Schema**:

```json
{
  "warningLevel": 0 | 1 | 2,  // 0=none, 1=8 messages, 2=9 messages
  "shownAt": "ISO8601",
  "dismissed": false
}
```

---

### Prompt Cache

**Key**: `playground:agent:{agentId}:prompt`  
**TTL**: 1 hour  
**Schema**:

```json
{
  "systemPrompt": "Full system instructions...",
  "toolsJson": {...},
  "version": "1.2.3",
  "cachedAt": "ISO8601"
}
```

**Lifecycle**:
- Loaded on first agent init
- Cached for 1 hour
- Invalidated on agent version update

---

## State Transitions

```
┌─────────────────┐
│  INITIALIZED    │  (usage_count = 0)
│  10/10 messages │
└────────┬────────┘
         │ User sends message
         ▼
┌─────────────────┐
│     ACTIVE      │  (usage_count = 1-7)
│  9/10 remaining │
└────────┬────────┘
         │
    ┌────┴─────────────────┐
    │ count = 8 or 9       │ count < 8
    ▼                      ▼
┌─────────────────┐  (stay in ACTIVE)
│    WARNING      │
│  2/10 remaining │
└────────┬────────┘
         │ count reaches 10
         ▼
┌─────────────────┐
│   EXHAUSTED     │  (usage_count = 10)
│  0/10 messages  │
│ Input removed   │
└─────────────────┘
```

---

## Isolation & Multi-Tenancy

### User Isolation

- Every query is filtered by authenticated `user_id`
- Sessions are tied to `user_id` + `session_token`
- Redis keys include `user_id` to prevent cross-user access

### Agent Isolation

- Each agent has its own counter row in `agent_playground_usage`
- Agent system prompts are kept separate
- Metrics are tracked per `agent_id`

### Session Isolation

- Sessions expire after 30 minutes
- Session tokens are single-use (one per user per agent)
- Concurrent tabs access the same counter row (enforced by DB locking)

---

## Concurrency & ACID Guarantees

### Transaction Model

All usage counter operations use **READ COMMITTED** isolation level:

```sql
BEGIN TRANSACTION;
SELECT usage_count FROM agent_playground_usage 
  WHERE user_id = ? AND agent_id = ? 
  FOR UPDATE;  -- Row-level lock
  
-- Check limit
IF usage_count >= 10:
  ROLLBACK;
  RETURN "Limit reached";
  
-- Increment
UPDATE agent_playground_usage 
  SET usage_count = usage_count + 1 
  WHERE user_id = ? AND agent_id = ?;
  
COMMIT;
```

### Multi-Tab Scenario

| Tab 1 | Tab 2 | Result |
|-------|-------|--------|
| `SELECT ... FOR UPDATE` (lock acquired) | Blocked on lock | Tab 1 proceeds |
| `UPDATE ... SET usage_count = 9` | — | — |
| `COMMIT` (lock released) | Blocked, then proceeds | Tab 2 reads count = 9 |
| — | `SELECT ... FOR UPDATE` (lock acquired) | Tab 2 sees updated count |
| — | `UPDATE ... SET usage_count = 10` | Tab 2 can proceed or block |

**Result**: No race condition; counter is atomic.

---

## Retention Policy Summary

| Entity | Retention | Medium | Purpose |
|--------|-----------|--------|---------|
| PlaygroundUsage | Permanent | PostgreSQL | Business compliance |
| PlaygroundSession | 30 minutes | PostgreSQL | Session tracking (optional) |
| PlaygroundMetrics | 90 days | PostgreSQL | Analytics & monitoring |
| Session Context (Redis) | 30 min / immediate on limit | Redis | Active session state |
| Warning State (Redis) | 30 min / immediate on limit | Redis | UI state sync |
| Prompt Cache (Redis) | 1 hour | Redis | Performance |
| **User Messages** | **Never stored** | **Never** | Privacy guarantee |

---

## Relationships

```
User (1) ──────────────── (∞) PlaygroundUsage
              ↓
         (authenticated)
         
Agent (1) ──────────────── (∞) PlaygroundUsage
              ↓
         (agent_id FK)
         
User (1) ──────────────── (∞) PlaygroundSession
Agent (1) ──────────────── (∞) PlaygroundSession
         
Agent (1) ──────────────── (∞) PlaygroundMetrics
```

---

## Query Performance

### Critical Queries

1. **Fetch usage count (with lock)**: < 50ms
   ```sql
   SELECT usage_count FROM agent_playground_usage 
     WHERE user_id = ? AND agent_id = ? FOR UPDATE;
   ```
   **Index**: Composite (user_id, agent_id)

2. **Increment counter**: < 100ms
   ```sql
   UPDATE agent_playground_usage 
     SET usage_count = usage_count + 1 
     WHERE user_id = ? AND agent_id = ?;
   ```
   **Index**: Composite (user_id, agent_id)

3. **Get session**: < 10ms (Redis)
   ```
   GET playground:session:{sessionId}:context
   ```

### Monitoring Queries

4. **Top agents by usage**: < 500ms
   ```sql
   SELECT agent_id, COUNT(*) as total_usage 
     FROM agent_playground_usage 
     GROUP BY agent_id 
     ORDER BY total_usage DESC 
     LIMIT 10;
   ```

5. **Users with unusual patterns**: < 1s
   ```sql
   SELECT user_id, COUNT(*) 
     FROM agent_playground_usage 
     GROUP BY user_id 
     HAVING COUNT(*) > 100 
     ORDER BY COUNT(*) DESC;
   ```

---

## Ready For

✅ Schema migrations  
✅ Service implementation  
✅ Query optimization  
✅ Performance testing
