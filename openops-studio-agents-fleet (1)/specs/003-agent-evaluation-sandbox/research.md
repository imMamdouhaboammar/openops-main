# Agent Evaluation Sandbox – Research & Design Decisions

**Created**: 2026-01-12  
**Status**: Finalized

---

## Problem Statement

**Context**: OpenOps sells AI agents as source code packages. Buyers need to evaluate whether an agent will meet their needs before purchase.

**Challenge**: Most demo environments either:
- Hide agent weaknesses (marketing spin)
- Give unlimited access (unfair to sellers)
- Store conversation data (privacy issues)
- Use simplified versions (not representative)

**Solution**: Engineer-first evaluation harness with strict limits and radical transparency.

---

## Design Decisions & Rationale

### Decision 1: 10-Message Lifetime Limit (Non-Resetable)

**Choice**: Each user gets exactly 10 total messages per agent, forever. No refresh, no reset, no admin override.

**Rationale**:
- **Economics**: Ensures sellers aren't subsidizing infinite free evals
- **Fairness**: All users get same budget; no gaming the system
- **Honesty**: Forces agent to demonstrate value quickly; if it rambles, user sees it
- **Simplicity**: No debate about "fair" trial lengths; constraint is binary

**Alternative Considered**: Rolling window (e.g., 10 messages per month)
- **Rejected**: Encourages manipulation ("wait for reset") and creates support burden ("Can I get a refresh?")

**Lock-In**: This rule is intentionally irreversible to prevent:
- Support requests to reset
- Admin loopholes
- Marketplace manipulation

---

### Decision 2: Both Input & Output Count as Messages

**Choice**: User message (1 credit) + Agent response (1 credit) = 2 credits per exchange

**Rationale**:
- **Transparency**: User sees explicit cost of verbose agent
- **Quality Signal**: Concise agents use fewer tokens; this becomes visible
- **Fairness**: Prevents agent from padding responses to waste credits
- **Learning**: User learns that agent efficiency matters

**Alternative Considered**: Only user input counts
- **Rejected**: Allows agent to respond with megabytes of output, wasting budget invisibly

**Example**:
- User sends: "What is AI?" (1 message)
- Agent responds with 200 words (1 message)
- Total: 2 messages used → 8 remaining
- User realizes: agent is concise, can do 4 more exchanges

---

### Decision 3: Run Real Agent Code (No Demo Mode)

**Choice**: Load actual system_prompt.md and tools.json from source repository

**Rationale**:
- **Buyer Confidence**: "If it hallucinated in eval, it will hallucinate in production"
- **No False Positives**: Don't hide bugs that will appear post-purchase
- **Trust Through Honesty**: Transparency builds credibility

**What We Don't Hide**:
- Agent's actual refusals or out-of-scope behavior
- Agent's actual hallucinations
- Agent's actual performance limitations
- Agent's actual memory limits

**Trust Factor**: Buyer knows they're seeing the real product, not a sanitized demo.

---

### Decision 4: No Conversation Persistence

**Choice**: Conversation data lives only in Redis (30-minute TTL). Never written to PostgreSQL.

**Rationale**:
- **Privacy**: Users trust their test conversations aren't logged
- **Legal**: Avoids data retention liability
- **Scale**: No database bloat from millions of ephemeral chats
- **Security**: No honeypot of past conversations to attack

**What We Do Store**:
- Only: `usage_count` integer
- Never: message content, user queries, agent outputs

**Analytics Compromise**:
- Anonymous metrics (success rate per agent) OK
- User-specific conversation history: forbidden

---

### Decision 5: Multi-Tab Exploit Prevention via DB Locking

**Choice**: Row-level `SELECT ... FOR UPDATE` on counter checks

**Rationale**:
- **Simplicity**: Don't trust client-side state; DB is source of truth
- **Atomicity**: Prevents race condition where Tab 1 & Tab 2 both read count=9, both increment to 10
- **Transparency**: No hidden state; locking is explicit in code

**How It Works**:
```sql
BEGIN TRANSACTION;
SELECT usage_count FROM agent_playground_usage 
  WHERE user_id = ? AND agent_id = ? 
  FOR UPDATE;  -- LOCKS THE ROW
-- Check limit
IF count >= 10:
  ROLLBACK;
  RETURN "Limit reached";
-- Increment
UPDATE agent_playground_usage SET usage_count = usage_count + 1 ...;
COMMIT;  -- RELEASES LOCK
```

**Trade-Off**: Small latency hit (~50ms) to guarantee correctness. Worth it.

---

### Decision 6: Input Sanitization (Non-Blocking)

**Choice**: Detect prompt injection but don't block it; let agent fail if weak

**Rationale**:
- **Buyer Learning**: If agent fails on basic jailbreak, buyer should see it
- **Honesty**: Don't artificially prop up weak agents
- **Testing Value**: User learns agent's true robustness level
- **No False Confidence**: "Blocking" attacks would hide vulnerabilities

**What We Do**:
- Log flagged attempts (for monitoring)
- Count failure as normal message use
- Expose pattern to user: "Agent refused this type of request"

**What We Don't Do**:
- Block request to LLM
- Hide the attempt
- Artificially force agent to comply

---

### Decision 7: Strict State Machine (No Shortcuts)

**Choice**: INITIALIZED → ACTIVE → WARNING → EXHAUSTED (only forward transitions, no loops)

**Rationale**:
- **Predictability**: User always knows where they are
- **No Ambiguity**: No invalid state combinations
- **Compliance**: Guarantee: once EXHAUSTED, always EXHAUSTED (no sneaking in extra messages)

**State Definitions**:
- INITIALIZED: Fresh session, 10/10 messages
- ACTIVE: 1-7 messages remaining, normal mode
- WARNING: 8-9 messages remaining, warning color/message
- EXHAUSTED: 0 messages remaining, input removed entirely

**Why No Soft Reset**:
- Soft reset (hiding input but allowing new message) would violate permanence principle
- Must be hard brake to ensure compliance

---

### Decision 8: Clinical, Non-Marketing Copy

**Choice**: All UI text is objective, engineering-focused, zero marketing

**Examples**:

**Correct** (Engineering tone):
- "Evaluation Mode: Active | 10 messages remaining"
- "Evaluation limit approaching. 2 messages remaining."
- "Evaluation Session Concluded"

**Incorrect** (Marketing tone):
- "Limited time trial! Only 10 messages left!"
- "Last chance to see this agent!"
- "Unlock unlimited access—upgrade now!"

**Rationale**:
- Respect buyer's intelligence
- Signal that this is an evaluation environment, not a sales pitch
- Build trust through authenticity

---

## Performance & Scaling Assumptions

### Assumed Load

- **Peak**: 1,000 concurrent users
- **QPS**: 10-100 requests/second during peak
- **Each Message**: 1 counter fetch + 1 counter increment + 1 LLM API call

### Performance Targets

| Operation | SLA | Reasoning |
|-----------|-----|-----------|
| Counter fetch (with lock) | < 50ms | Acceptable latency for "is limit reached?" check |
| Counter increment | < 100ms | Includes DB write + lock release |
| Message stream | < 100ms per chunk | Acceptable for streaming UX |
| Session create | < 200ms | Cached prompt loading |
| Error recovery | < 50ms | Rollback only, no retries |

### Scaling Strategy

- **Horizontal**: Multiple backend instances (stateless)
- **Database**: PostgreSQL replication for HA; read replicas for analytics queries
- **Cache**: Redis replication; Sentinel for failover
- **LLM API**: Rate limiting per API provider; circuit breaker for unavailability

---

## Security Considerations

### Threat Model

| Threat | Mitigation |
|--------|-----------|
| Prompt injection to extract system instructions | Don't block; let agent demonstrate vulnerability |
| Multi-tab to exceed limit | DB row-level locking |
| Session hijacking | JWT token validation; HTTPS only |
| SQL injection | Parameterized queries only |
| XSS in user input | Sanitize before rendering; never use innerHTML |
| Rate limit bypass | Redis-backed per-user limit |
| Admin override | No reset function exists in code |

### Data Exposure

- Session context (Redis): Encrypted in transit (Redis TLS)
- Usage count (PostgreSQL): Standard DB access controls
- Logs: Sanitized (no user input, no prompts)
- Monitoring: Anonymous metrics only (no user_id)

---

## Testing Strategy

### Unit Tests (Core Logic)

- Counter atomic operations (increment, rollback)
- State machine transitions
- Input sanitization (pattern detection)
- Session store operations (create, expire, delete)

### Integration Tests

- Full 5-message exchange (happy path)
- Multi-tab concurrent access
- Error recovery (LLM crash mid-stream)
- Session expiration

### Security Tests

- Auth bypass attempts → 401 Unauthorized
- SQL injection in inputs → Sanitized/rejected
- Prompt injection detection → Logged but processed
- Rate limit enforcement → 429 Too Many Requests

### Performance Tests

- Counter operation < 100ms (benchmarked)
- 1,000 concurrent sessions (load test)
- Streaming latency < 100ms/chunk (measured)

---

## Known Limitations & Future Work

### Limitations (Intentional)

1. **No Conversation History**: User can't review past evaluations (by design for privacy)
2. **No Agent Customization**: Agent runs as-is; user can't adjust parameters
3. **No Tool Execution**: Tools defined but not executed (sandboxed evaluation only)
4. **No File Upload**: Playground input text-only
5. **No Multi-Language**: Copy in English only (can add i18n later)

### Future Enhancements (Post-MVP)

1. **Evaluation Reports**: Generate PDF summary of session (what agent did, how it performed)
2. **Comparative Eval**: Side-by-side playground for 2 agents
3. **Team Evals**: Share evaluation link with team members
4. **Agent Metrics Dashboard**: Admin view of per-agent evaluation stats
5. **Community Reviews**: Buyer feedback on agents (separate from playground)
6. **Variable Limits**: Per-agent custom limits (e.g., 5 messages for complex agents, 20 for simple ones)

---

## Compliance & Legal Considerations

### Data Retention

- **Conversation data**: Deleted immediately on session end (TTL 30 min)
- **Usage count**: Kept indefinitely (business compliance)
- **Metrics**: Anonymized; kept 90 days

### User Privacy

- No email collection during eval
- No tracking cookies
- No third-party analytics scripts
- User data never shared with agent vendors

### Agent Vendor Perspective

- Vendors see only aggregate metrics (not user-specific data)
- Evaluation data never used for competitive analysis
- Weak agents are exposed (by design); vendors expected to improve

### GDPR Compliance

- No personal data stored in conversation logs
- Right to forget: deletion of usage_count on user request (subject to business rules)
- No data transfers to third parties
- Privacy policy explicitly states "No conversation logging"

---

## Success Metrics

### For Users

- ✅ Evaluation is representative of production behavior
- ✅ Message limit is clear and never violated
- ✅ UI doesn't pressure them to buy
- ✅ Privacy is respected (no logs)

### For Sellers (Agent Vendors)

- ✅ Honest representation of their agent
- ✅ Weak agents are exposed (feedback for improvement)
- ✅ Aggregate metrics help them optimize
- ✅ Fair evaluation environment (no artificial handicaps)

### For Platform (OpenOps)

- ✅ Trust in the marketplace increases
- ✅ Fewer post-purchase support issues (buyer knew what they were getting)
- ✅ Vendor satisfaction (evaluation is fair)
- ✅ Reduced infrastructure costs (ephemeral architecture)

---

## Conclusion

The Agent Evaluation Sandbox prioritizes **engineering honesty** over marketing optimization. By running real agent code, enforcing strict limits, refusing to hide weaknesses, and storing no conversation data, the Playground builds trust with both buyers and sellers.

The design is intentionally inflexible on core rules (10-message limit, non-resetable counter, real system prompts) to prevent future scope creep and maintain the integrity of the evaluation environment.
