# 📌 Quick Reference Card – Marketing Guru Agent v2.0 Tasks

## At a Glance

| Item | Details |
|------|---------|
| **Project** | Marketing Guru Agent v2.0 Upgrade |
| **Duration** | 17 days total (5 phases) |
| **Branch** | `feature/marketing-guru-agent-v2` |
| **Total Tasks** | 23 (15 create, 4 update, 4 archive) |
| **Status** | ✅ Ready for Execution |
| **Created** | January 17, 2026 |

---

## Phase Summary

| Phase | Days | Tasks | Key Deliverables | Blocker? |
|-------|------|-------|-----------------|----------|
| 1. Design | 3 | T1.1-T1.4 | Data model, API spec, tool registry | No |
| 2. Config | 5 | T2.1-T2.6 | 5 JSON configs + deprecation | **T2.1** |
| 3. Testing | 4 | T3.1-T3.5 | 3 test suites + compliance audit | **T3.4** |
| 4. Docs | 2 | T4.1-T4.3 | Context, README, CHANGELOG | No |
| 5. Deploy | 3 | T5.1-T5.5 | Registration + approval | **T5.5** |

---

## Files to Create (Primary Deliverables)

### New Configuration Files
```
marketing_guru_agent/
├── 01_Marketing_Guru_Agent_Config_v2.0.json    ⭐ Critical (T2.1)
├── 02_Marketing_Guru_Agent_Memory.json         (T2.2)
├── 03_Marketing_Guru_Agent_Tools.json          (T2.3)
├── 04_Marketing_Guru_Agent_Workflows.json      (T2.4)
└── 05_Marketing_Guru_Agent_Prompts.json        (T2.5)
```

### Design Documents
```
marketing_guru_agent/
├── data-model.md                               (T1.1)
├── contracts/
│   └── api.openapi.yaml                        (T1.2)
├── tools.registry.json                         (T1.3)
└── quickstart.md                               (T1.4)
```

### Test Files
```
marketing_guru_agent/tests/
├── memory-integration.spec.ts                  (T3.2)
├── tool-orchestration.spec.ts                  (T3.3)
└── strategy-generation-e2e.spec.ts            ⭐ Critical (T3.4)
```

### Documentation
```
marketing_guru_agent/
├── README.md (updated)                         (T4.2)
├── CHANGELOG.md                                (T4.3)
├── COMPLIANCE_REPORT.md                        (T3.5)
└── APPROVAL_MEMO.md                            (T5.5)
```

---

## Critical Path (Must Complete In Order)

```
Day 1-3:  T1.1, T1.2, T1.3, T1.4 (parallel)
Day 4-5:  T2.1 ← GATES next tasks
Day 5-8:  T2.2, T2.3, T2.4, T2.5, T2.6 (mostly parallel)
Day 9:    T3.1 (needs T2.4)
Day 10-12: T3.2, T3.3, T3.4 ← CRITICAL (gates T5.3), T3.5 (gates T5.4)
Day 13-14: T4.1, T4.2, T4.3 (parallel)
Day 15-16: T5.1, T5.2, T5.3, T5.4 (T5.3/T5.4 gate T5.5)
Day 17:   T5.5 ← APPROVAL
```

---

## Success Criteria Checklist

### Phase 1 ✓
- [ ] 5 entities defined with schemas
- [ ] 3+ API endpoints specified
- [ ] 6+ tools cataloged
- [ ] Getting started guide runnable

### Phase 2 ✓
- [ ] Config v2.0 created
- [ ] Memory schema integrated
- [ ] Tool orchestration rules clear
- [ ] Workflows with gates defined
- [ ] 5 dynamic prompts ready
- [ ] v1.0 archived

### Phase 3 ✓
- [ ] Tests cover all 4 memory layers
- [ ] Tool ordering verified
- [ ] E2E strategy generation <5min
- [ ] Coverage >80%
- [ ] Constitution compliance 100%

### Phase 4 ✓
- [ ] Agent context updated
- [ ] README explains v2.0 features
- [ ] CHANGELOG documents changes

### Phase 5 ✓
- [ ] Agent registered (tier, capabilities, permissions)
- [ ] Memory namespace registered
- [ ] All tests pass (>90%)
- [ ] Security scan clean (0 critical, <3 high)
- [ ] SupervisorAgent approved

---

## Key Metrics to Track

| Metric | Target | How to Measure |
|--------|--------|-----------------|
| Test Coverage | >80% | T3.3 output |
| Strategy Gen Time | <5 min | T3.4 benchmark |
| Config File Sizes | <400 lines each | Each T2.x file |
| Security Issues | 0 critical, <3 high | T5.4 Codacy scan |
| Constitution Pass | 100% (no violations) | T3.5 audit |
| Deployment Ready | All gates pass | T5.5 approval |

---

## Role Assignments (Sample)

| Role | Responsibilities | Tasks |
|------|------------------|-------|
| **PlannerAgent** | Design leadership | T1.1-T1.4, Phase 1 approval |
| **ConfigEngineer** | Config development | T2.1-T2.6, Phase 2 approval |
| **ArchitectAgent** | API & system design | T1.2, T2.4 support |
| **QAEngineer** | Test development | T3.2-T3.4 |
| **ComplianceAgent** | Quality audit | T3.5 |
| **DocsAgent** | Documentation | T1.4, T4.1-T4.3 |
| **SupervisorAgent** | Approvals & oversight | Phase gates, T5.5 |

---

## Parallel Opportunities

```
Wave 1 (Days 1-3):     T1.1 | T1.2 | T1.3 | T1.4
                        (all parallel, ~16 hours total)

Wave 2A (Days 4-5):     T2.1 (MUST FIRST)
                        (8 hours, blocks Wave 2B)

Wave 2B (Days 5-8):     T2.2 | T2.3 | T2.4 | T2.5 | T2.6
                        (after T2.1 done, mostly parallel, ~23 hours)

Wave 3A (Day 9):        T3.1 (needs T2.4)
                        (4 hours)

Wave 3B (Days 10-12):   T3.2 | T3.3 | T3.4 | T3.5
                        (mostly parallel, ~19 hours)

Wave 4 (Days 13-14):    T4.1 | T4.2 | T4.3
                        (all parallel, ~7 hours)

Wave 5A (Days 15-16):   T5.1 | T5.2 || T5.3 | T5.4
                        (4 parallel + 7 parallel, ~11 hours)

Wave 5B (Day 17):       T5.5 (after T5.3 + T5.4)
                        (2 hours, final approval)
```

**Total Task Hours: ~89 hours** (across multiple workers = 17 days parallelized)

---

## Blocking Dependencies (⭐ Critical)

```
T1.3 ──→ T2.3 (Tool Registry needed for orchestration)
T2.1 ──→ T2.2, T3.1 (Config v2.0 gates memory + workflows)
T2.4 ──→ T3.1 (Workflows needed for enhancement)
T3.4 ──→ T5.3 (E2E tests gates full test suite)
T3.5 ──→ T5.4 (Compliance gates security scan)
T5.3, T5.4 ──→ T5.5 (Both gate final approval)
```

---

## Resource Estimates

| Resource | Requirement |
|----------|-------------|
| **Team Size** | 6-8 agents (minimal blocking) |
| **Compute** | Standard (no special requirements) |
| **Storage** | ~50 MB (new files + tests) |
| **Time** | 17 calendar days (sequential), 3-5 days parallelized |
| **Budget** | Minimal (internal resources only) |

---

## Launch Checklist

### Before Starting
- [ ] Branch `feature/marketing-guru-agent-v2` created
- [ ] Team assigned to roles
- [ ] IMPLEMENTATION_TASKS.json reviewed
- [ ] All team members have repo access

### Daily Standup
- [ ] Which tasks are in-progress?
- [ ] Any blockers?
- [ ] Are dependencies on track?
- [ ] Coverage & test status?

### Before Each Phase Gate
- [ ] All tasks in phase complete?
- [ ] Success criteria verified?
- [ ] Approver contacted for sign-off?
- [ ] Ready for next phase?

### Launch Day (Day 17)
- [ ] All tests passing
- [ ] Security scan clean
- [ ] Documentation reviewed
- [ ] SupervisorAgent approval obtained
- [ ] Deploy to production

---

## Quick Links

| Document | Purpose |
|----------|---------|
| `IMPLEMENTATION_TASKS.json` | Machine-readable task data |
| `TASKS_SUMMARY.md` | Human-readable task list |
| `EXECUTION_ROADMAP.md` | Visual timeline & parallelization |
| `QUICK_REFERENCE.md` | ← You are here |

---

## Questions?

**For task details:** See `IMPLEMENTATION_TASKS.json` (machine format)  
**For summary view:** See `TASKS_SUMMARY.md` (human format)  
**For timeline:** See `EXECUTION_ROADMAP.md` (visual format)  
**For system architecture:** See `/02_agents/02_Agents_System_and_Activation_Matrix.md`  
**For constitution rules:** See `/.specify/memory/constitution.md`

---

## 🎯 Final Goal

**Deliver a fully-integrated, memory-aware, tool-enabled Marketing Guru Strategist agent that is:**
- ✅ Compliant with OpenOps architecture
- ✅ Tested (>80% coverage)
- ✅ Secure (zero critical vulnerabilities)
- ✅ Documented (quickstart + deep dive)
- ✅ Production-ready (registered & approved)
- ✅ Measurable (all deliverables tracked)

**Status**: Ready to execute → `/speckit.implement`

