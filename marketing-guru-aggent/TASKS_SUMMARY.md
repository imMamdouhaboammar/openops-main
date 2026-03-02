# Marketing Guru Agent v2.0 – Task Breakdown Summary

**Status**: Ready for Execution  
**Total Duration**: 17 days  
**Branch**: `feature/marketing-guru-agent-v2`  
**Created**: January 17, 2026

---

## Quick Navigation

### Phase 1: Design Artifacts (3 days)
- **T1.1**: Data Model → `data-model.md`
- **T1.2**: OpenAPI Contracts → `contracts/api.openapi.yaml`
- **T1.3**: Tool Registry → `tools.registry.json`
- **T1.4**: Quickstart Guide → `quickstart.md`

### Phase 2: Configuration v2.0 (5 days)
- **T2.1**: Agent Config v2.0 → `01_Marketing_Guru_Agent_Config_v2.0.json` ⭐ Critical
- **T2.2**: Memory Schema → `02_Marketing_Guru_Agent_Memory.json` ⭐ Critical
- **T2.3**: Tool Orchestration → `03_Marketing_Guru_Agent_Tools.json`
- **T2.4**: Workflows & State Machines → `04_Marketing_Guru_Agent_Workflows.json`
- **T2.5**: Dynamic Prompts → `05_Marketing_Guru_Agent_Prompts.json`
- **T2.6**: Deprecate v1.0 → Archive & Migration Guide

### Phase 3: Testing & Validation (4 days)
- **T3.1**: Enhance Workflows → `omnichannel-blueprint.workflow.json`
- **T3.2**: Memory Integration Tests ⭐ Critical
- **T3.3**: Tool Orchestration Tests
- **T3.4**: E2E Strategy Generation Tests ⭐ Critical
- **T3.5**: Constitution Compliance Audit

### Phase 4: Documentation (2 days)
- **T4.1**: Update Copilot Agent Context
- **T4.2**: Update README (v2.0)
- **T4.3**: Create CHANGELOG.md

### Phase 5: Deployment & Sign-Off (3 days)
- **T5.1**: Register in 02A_Agent_Roles_Config.json
- **T5.2**: Register in 02B_Agent_Memory_Registry.json
- **T5.3**: Full Integration Test Suite ⭐ Critical
- **T5.4**: Codacy Security Scan ⭐ Critical
- **T5.5**: Final Approval & Sign-Off ⭐ Critical

---

## Task Dependencies (Critical Path)

```
T1.1 → T1.2 → T1.3 → T2.1
                       ↓
                    T2.4 → T3.1 → T3.4 → T5.3 → T5.5
                       
(Parallel: T2.2, T2.3, T2.5; T3.2, T3.3; T4.1, T4.2, T4.3; T5.1, T5.2)
```

---

## Key Deliverables

### Files to Create (9)
1. `marketing_guru_agent/data-model.md` – Entity definitions
2. `marketing_guru_agent/contracts/api.openapi.yaml` – REST API spec
3. `marketing_guru_agent/tools.registry.json` – Tool catalog
4. `marketing_guru_agent/quickstart.md` – Getting started guide
5. `marketing_guru_agent/01_Marketing_Guru_Agent_Config_v2.0.json` – Core config
6. `marketing_guru_agent/02_Marketing_Guru_Agent_Memory.json` – Memory schema
7. `marketing_guru_agent/03_Marketing_Guru_Agent_Tools.json` – Tool orchestration
8. `marketing_guru_agent/04_Marketing_Guru_Agent_Workflows.json` – Workflows & gates
9. `marketing_guru_agent/05_Marketing_Guru_Agent_Prompts.json` – Dynamic prompts

### Files to Update (3)
- `.github/copilot/context.md` – Add agent context
- `marketing_guru_aggent/README.md` – Upgrade to v2.0 doc
- `02_agents/02A_Agent_Roles_Config.json` – Register agent
- `02_agents/02B_Agent_Memory_Registry.json` – Register memory namespace

### Test Files to Create (3)
- `marketing_guru_agent/tests/memory-integration.spec.ts`
- `marketing_guru_agent/tests/tool-orchestration.spec.ts`
- `marketing_guru_agent/tests/strategy-generation-e2e.spec.ts`

### Documentation Files (4)
- `marketing_guru_agent/CHANGELOG.md`
- `marketing_guru_agent/COMPLIANCE_REPORT.md`
- `marketing_guru_agent/APPROVAL_MEMO.md`
- `marketing_guru_agent/_deprecated/v1.0/MIGRATION.md`

---

## Success Criteria

### Functional
✅ All 5 new config files created and validated  
✅ 6+ tools orchestrated in correct phase order  
✅ Strategy generation workflow: Discover → Shape → Structure → Validate → Handoff  
✅ Campaign optimization workflow with KPI variance feedback loop  
✅ Memory integration: working → long-term retrieval  
✅ Quality gates with approval enforcement  

### Quality
✅ Test coverage >80% across all modules  
✅ Strategy generation execution <5 minutes  
✅ Constitutional compliance: 100% (no violations)  
✅ All files <400 lines (modular design)  
✅ Type safety: JSON schemas validated  

### Security
✅ Codacy security scan: 0 critical, <3 high issues  
✅ Trivy dependency scan: pass  
✅ No hardcoded secrets  
✅ Audit trail integration  

### Integration
✅ Agent registered in 02A_Agent_Roles_Config.json  
✅ Memory namespace registered in 02B_Agent_Memory_Registry.json  
✅ Copilot agent context updated  
✅ Documentation complete  

---

## Task Scheduling Guide

### Day 1-3: Phase 1 Design (Parallel)
- T1.1 (4h) – Data Model
- T1.2 (5h) – API Contracts
- T1.3 (4h) – Tool Registry
- T1.4 (3h) – Quickstart

### Day 4-8: Phase 2 Configuration (Mostly Parallel)
- T2.1 (8h) – Agent Config v2.0 ← Blocks T2.2, T3.1
- T2.2 (6h) → Memory (parallel)
- T2.3 (5h) → Tool Orchestration (parallel)
- T2.4 (6h) → Workflows (parallel, needed by T3.1)
- T2.5 (5h) → Prompts (parallel)
- T2.6 (2h) → Deprecation (parallel)

### Day 9-12: Phase 3 Testing (After T2.1, T2.4)
- T3.1 (4h) – Enhanced Workflows
- T3.2 (5h) → Memory Tests (parallel)
- T3.3 (5h) → Tool Tests (parallel)
- T3.4 (6h) – E2E Strategy Generation ← Blocks T5.3
- T3.5 (3h) – Compliance Audit ← Blocks T5.4

### Day 13-14: Phase 4 Documentation
- T4.1 (2h) – Copilot Context
- T4.2 (3h) – README
- T4.3 (2h) – CHANGELOG

### Day 15-17: Phase 5 Deployment
- T5.1 (2h) – Register Agent (parallel)
- T5.2 (2h) – Register Memory (parallel)
- T5.3 (4h) – Full Test Suite ← Blocks T5.5
- T5.4 (3h) – Security Scan ← Blocks T5.5
- T5.5 (2h) – Final Approval

---

## Approval Gates

| Gate | Phase | Required Tasks | Approver |
|------|-------|-----------------|----------|
| **Phase 1 Complete** | Design | T1.1-T1.4 | PlannerAgent |
| **Phase 2 Complete** | Config | T2.1-T2.6 | ConfigEngineer |
| **Phase 3 Complete** | Testing | T3.1-T3.5 | QAOrchestrator |
| **Ready for Production** | All | T4.1-T4.3 + T5.1-T5.4 | SupervisorAgent |

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Memory system fails | Medium | High | T3.2 catches early; fallback to cache |
| Tool order incorrect | Low | High | T3.3 verifies; phase gates enforce |
| Config >400 lines | Medium | Medium | Already modular (T2.1-T2.5 split) |
| E2E >5min | Low | Medium | T3.4 benchmark; optimize if needed |
| Security vulnerabilities | Low | Critical | T5.4 Codacy trivy scan mandatory |

---

## Running the Tasks

Use JSON structure in `IMPLEMENTATION_TASKS.json` for:
- **Orchestrator**: Parse task_groups[phase].tasks to schedule
- **Agents**: Reference task[id].inputs/outputs/success_criteria
- **QA**: Verify success_criteria against completed outputs
- **Progress Tracking**: Update status in each task object

---

## Questions?

Refer to complete plan in the parent directory or consult:
- **Architecture**: `/02_agents/02_Agents_System_and_Activation_Matrix.md`
- **Constitution**: `/.specify/memory/constitution.md`
- **Memory System**: `/02_agents/02B_Agent_Memory_Registry.json`
- **Agent Roles**: `/02_agents/02A_Agent_Roles_Config.json`

