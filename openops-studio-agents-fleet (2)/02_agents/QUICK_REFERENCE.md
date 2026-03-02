# OpenOps Agents - Quick Reference Card

## 🎯 Agent Permission Levels

| Level | Agents | Key Capabilities |
|-------|--------|------------------|
| **L0** | Orchestrator, StaffEngineer | Full system control, emergency override |
| **L1** | SupervisorAgent, PM, SecurityLead | Coordination, approval, escalation |
| **L2** | Domain experts, Specialists | Domain tasks, recommendations |
| **L3** | Workers, Evaluators | Task execution, evaluations |
| **L4** | Executors, Collectors | Pure execution, no autonomy |

---

## 📡 Communication Channels

```
┌─────────────────────────────────────────┐
│ BROADCAST (L0/L1 → All)                 │
│ • System announcements                  │
│ • Emergency alerts                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ SUPERVISOR (L0 ↔ L1)                    │
│ • Strategic coordination                │
│ • Governance decisions                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ DOMAIN CHANNELS                         │
│ • Research • QA • Security • Execution  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ PEER-TO-PEER                            │
│ • Direct collaboration                  │
│ • Cross-domain (requires approval)      │
└─────────────────────────────────────────┘
```

---

## 🔄 Collaboration Patterns

### 1️⃣ Request-Response
```
A ──[request]──→ B
B ──[ack]──────→ A
B ──[process]──→ 
B ──[response]─→ A
```
**Use:** Synchronous task delegation

### 2️⃣ Publish-Subscribe
```
Publisher ──[event]──→ Channel
               ↓
        ┌──────┼──────┐
        ↓      ↓      ↓
     Sub1   Sub2   Sub3
```
**Use:** Event-driven updates

### 3️⃣ Pipeline
```
A ──→ B ──→ C ──→ D
```
**Use:** Sequential processing

### 4️⃣ Consensus
```
    ┌───→ Agent1
    │
Coord├───→ Agent2
    │
    └───→ Agent3
        ↓
    [vote/decide]
```
**Use:** Multi-agent decisions

### 5️⃣ Fork-Join
```
      ┌──→ A ──┐
      │        │
Coord ├──→ B ──┤ Coord
      │        │
      └──→ C ──┘
```
**Use:** Parallel execution

---

## 📊 Performance Targets

### Execution
- **Response Time:** L0: <500ms, L1: <2s, L2: <10s, L3: <20s, L4: <60s
- **Error Rate:** <1% acceptable, <5% critical threshold
- **Throughput:** High-volume >100/hr, Standard >10/hr

### Quality
- **Accuracy:** Critical >99%, Standard >95%, Experimental >90%
- **Completeness:** >98% all agents
- **Compliance:** 100% mandatory

### Collaboration
- **Handoff Success:** >95%
- **Escalation Appropriateness:** >90%
- **Conflict Resolution:** <30 minutes

---

## 🎓 Training Programs

| Program | Duration | Target | Criteria |
|---------|----------|--------|----------|
| **Onboarding** | 1 week | New agents | 90% comprehension |
| **Continuous** | Quarterly | All active | Completion tracking |
| **Specialization** | 2-4 weeks | Selected | Practical demo |
| **Remedial** | Variable | Underperforming | 30-day improvement |

---

## 🚀 Task Priority Levels

| Priority | SLA | Preemption | Use Case |
|----------|-----|------------|----------|
| **P0** Critical | Immediate | Can interrupt all | System emergencies |
| **P1** High | <15 min | Can interrupt P2+ | Business critical |
| **P2** Medium | <1 hour | Can interrupt P3+ | Standard ops |
| **P3** Low | <4 hours | None | Non-urgent |
| **P4** Background | Best effort | Always preemptible | Maintenance |

---

## 🛡️ Security Data Classification

| Level | Encryption | Access | Examples |
|-------|------------|--------|----------|
| **PUBLIC** | None | L0-L4 | Public docs |
| **INTERNAL** | At rest | L0-L3 | Internal research |
| **CONFIDENTIAL** | End-to-end | L0-L2 | User data |
| **SECRET** | Hardware-backed | L0-L1 | API keys |
| **TOP_SECRET** | Quantum-resistant | L0 only | System credentials |

---

## 🔧 Common Commands

### Check Agent Status
```json
GET /agents/{agent_id}/status
→ {active, load, performance_score}
```

### Route Task
```json
POST /orchestrator/route
{
  "task": {...},
  "priority": "P1",
  "requirements": ["capability_x"]
}
```

### Escalate Issue
```json
POST /agents/{agent_id}/escalate
{
  "issue": "...",
  "severity": "high",
  "attempted_resolutions": [...]
}
```

### View Performance
```json
GET /agents/{agent_id}/metrics
→ {execution, quality, collaboration}
```

---

## 🚨 Emergency Protocols

### Circuit Breaker Activation
**Triggers:**
- 5 failures in 1 minute
- Repeated auth failures
- Resource exhaustion

**Actions:**
- Suspend L3/L4 immediately
- Elevate L2 monitoring
- Alert L0/L1
- Activate incident response

### Emergency Shutdown
**Authorized By:** L0 only  
**Scope:** All agents  
**Preserve:** Audit logs, critical state  
**Recovery:** Manual L0 approval

---

## 📚 File Quick Reference

| File | Purpose | When to Use |
|------|---------|-------------|
| **02_Agents...Matrix.md** | Core concepts | Understanding fundamentals |
| **02A_Roles_Config** | Agent definitions | Configuring agents |
| **02B_Memory_Registry** | Memory systems | State management |
| **02C_Logging_Audit** | Audit trails | Investigations |
| **02D_Personality** | Behavior patterns | UX improvements |
| **02E_Authorization** | Permissions | Security, access control |
| **02F_Communication** | Protocols | Inter-agent workflows |
| **02G_Performance** | Monitoring | Optimization |
| **02H_Learning** | Training | Capability development |
| **02I_Orchestration** | Task routing | System optimization |
| **02J_Specialized** | Agent catalog | Understanding capabilities |

---

## 🎯 Decision Tree: Which File Do I Need?

```
Need to...
├─ Understand agent basics? → 02_Agents_System_Matrix.md
├─ Add/modify agent? → 02A_Roles_Config.json
├─ Set permissions? → 02E_Authorization_Matrix.json
├─ Design workflow? → 02F_Communication_Protocol.json
├─ Debug performance? → 02G_Performance_Monitoring.json
├─ Improve capabilities? → 02H_Learning_Development.json
├─ Optimize routing? → 02I_Dynamic_Orchestration.json
└─ Find specialized agent? → 02J_Specialized_Agents.json
```

---

## 🆘 Troubleshooting Quick Guide

### Agent Not Responding
1. Check health status (02G)
2. Verify permissions (02E)
3. Review audit logs (02C)
4. Check orchestration routing (02I)

### Poor Performance
1. Check performance metrics (02G)
2. Review resource utilization (02I)
3. Examine collaboration patterns (02F)
4. Consider training needs (02H)

### Authorization Failure
1. Verify permission level (02E)
2. Check resource access rules (02E)
3. Review delegation status (02E)
4. Examine audit logs (02C)

### Communication Issues
1. Verify channel access (02F)
2. Check message format (02F)
3. Review rate limits (02F)
4. Examine conflict resolution (02F)

---

## 💡 Best Practices Checklist

- [ ] Grant minimum necessary permissions (Least Privilege)
- [ ] Use appropriate communication channel
- [ ] Follow escalation chain (don't skip levels)
- [ ] Monitor performance proactively
- [ ] Maintain comprehensive audit logs
- [ ] Conduct regular training
- [ ] Optimize based on metrics
- [ ] Test in sandbox before production
- [ ] Document all changes
- [ ] Review permissions quarterly

---

## 📞 Escalation Path

```
L4 Agent Issue
    ↓
L3 Supervisor
    ↓
L2 Domain Authority
    ↓
L1 Supervisor/PM
    ↓
L0 Staff Engineer

Critical Issues → Direct to L0
```

---

**Quick Reference v2.0 | Updated: 2025-12-19**  
**Full Documentation:** See README.md
