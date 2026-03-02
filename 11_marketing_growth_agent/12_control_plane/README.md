# Control Plane — Supervisor Orchestrator (Single-Agent + Permissioned Pods)

This folder upgrades `11_marketing_growth_agent` from “a strong strategist” into a **production-grade operating system**:
- A **single Supervisor Orchestrator** runs the engagement end-to-end.
- A set of **specialized pods** exist (Strategy, Content, Creative, Paid, Analytics, CRM).
- Pods **do not act unless the Supervisor explicitly authorizes them**.

The result is dual-mode behavior:
- **Advisor Mode (Growth Science OS):** deep causal/MMM/experimentation guidance as a consultant.
- **Operator Mode (Agency Operations OS):** operational execution orchestration (tasks, approvals, reporting cadence, handoffs).

The Supervisor decides the mode and routes work accordingly.

---

## 1) Design Principles

### 1.1 Single Brain, Multiple Hands
- The Supervisor is the **only agent** allowed to:
  - change strategy direction
  - approve scope changes
  - unlock pods to act
  - modify system-level policies/contracts
- Pods are “hands”: they execute a **bounded task** and return artifacts + results.

### 1.2 Contracts > Prompts
Prompts are guidance. Contracts are rules.

The Supervisor enforces:
- **Output contracts** (format + required fields)
- **Evidence rules** (7–14 day validation path)
- **Safety rules** (no unethical/dark patterns)
- **Approval gates** (brand risk, compliance, budget changes)

### 1.3 Deterministic Operations (as much as possible)
To reduce randomness:
- Use standardized artifacts (templates)
- Use naming conventions
- Use decision logs
- Use evaluation harnesses (regression tests) for behavior

---

## 2) Control Plane Components

- `pod_registry.json`: canonical list of pods + permissions + required authorization.
- `mode_router.md`: rules to select Advisor vs Operator.
- `supervisor_protocol.md`: how authorization, handoffs, and escalation work.
- `contracts.md`: behavioral invariants the Supervisor must enforce.
- `task_envelope.schema.json`: canonical JSON schema for pod task requests.
- `render_task_brief.js`: dependency-free renderer from JSON envelope → Markdown brief.
- `examples/`: sample envelopes for each pod.
- `decision_log.schema.json`: canonical schema for Decision Log entries (JSONL).
- `decision_log.md`: what to log and how to interpret it.
- `artifact_naming_taxonomy.md`: canonical artifact naming rules.
- `pod_response_envelope.schema.json`: canonical schema for pod outputs (artifacts + decisions + next actions).

---

## 3) Recommended Next Build Steps

1. Add an evaluation harness (Promptfoo/DeepEval style) to test “Impossible Level” compliance.
2. Add a decision-log schema and an artifact naming taxonomy.
3. Add vertical packs (restaurant/clinic/café) as pre-built operating kits.

---

## Quickstart

Render a task envelope into a human-readable brief:

```bash
node 11_marketing_growth_agent/12_control_plane/render_task_brief.js \
  --in 11_marketing_growth_agent/12_control_plane/examples/clinic_brand_identity_task.envelope.json \
  --out /tmp/task_brief.md
```
