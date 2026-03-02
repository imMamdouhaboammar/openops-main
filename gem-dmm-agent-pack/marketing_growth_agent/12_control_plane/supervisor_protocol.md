# Supervisor Protocol — Permissioned Multi-Pod Execution

This protocol defines how a **single super-agent orchestrator** controls subordinate pods.

---

## 1) Authorization Model

### 1.1 Supervisor Token
The Supervisor grants a pod an **authorization token** for a bounded action.

Token must include:
- `podId`
- `taskId`
- `allowedOutputs`
- `constraints` (budget limits, compliance rules, deadlines)
- `idempotencyKey`
- `expiry`

### 1.1.1 Canonical Task Format (Recommended)
Use a **JSON task envelope** as the canonical “source of truth” for any pod work request.

Why:
- Machine-readable (agent builder/deployer friendly)
- Supports idempotency and retries
- Easy to validate against a schema
- Easy to render into a human-friendly Markdown brief

References:
- Schema: `11_marketing_growth_agent/12_control_plane/task_envelope.schema.json`
- Example: `11_marketing_growth_agent/12_control_plane/examples/clinic_brand_identity_task.envelope.json`

### 1.2 Idempotency & Safety
Any action with side-effects must be idempotent:
- If the same task is issued twice, results must not double-launch.
- Pods must return an explicit “already done” state when applicable.

### 1.3 Escalation
Pods must escalate when they detect:
- compliance risk (clinic claims, sensitive targeting)
- brand risk (positioning shift, visual identity shift)
- data privacy risk (customer data export)

Escalations go to the Supervisor, who routes to:
- `ComplianceMonitor`
- `SecurityLead`
- `SeniorPM`
- `StaffEngineer`

---

## 2) Handoff Protocol (Artifact-First)

Pods must return:
1. **Artifact** (doc/spec/template)
2. **Decision points** (what needs approval)
3. **Kill metrics** (if an experiment)
4. **Next actions** (what to do next week)

No pod response is considered “complete” without at least one artifact.

### 2.2 Pod Response Envelope (Canonical)
To keep handoffs machine-readable, pods must return a JSON response envelope:
- Schema: `11_marketing_growth_agent/12_control_plane/pod_response_envelope.schema.json`
- Example: `11_marketing_growth_agent/12_control_plane/examples/pod_response.restaurant_paid_launch.example.json`

### 2.1 Decision Logging (Supervisor-owned)
The Supervisor must log any material decision as a structured entry:
- budget shifts
- experiment decisions (scale/iterate/kill)
- compliance approvals
- strategy/offer/positioning changes
- tracking definition changes (lead vs qualified lead)

References:
- `11_marketing_growth_agent/12_control_plane/decision_log.md`
- `11_marketing_growth_agent/12_control_plane/decision_log.schema.json`
- `11_marketing_growth_agent/12_control_plane/artifact_naming_taxonomy.md`

---

## 3) Weekly Cadence (Supervisor-owned)
The Supervisor owns the operating rhythm:
- Weekly planning call agenda
- Weekly performance update
- Experiment decision dates (Day 7 / Day 14)
- Creative pipeline throughput
- Approval SLA enforcement

---

## 4) Integration with “Impossible Level” Rules
Supervisor must enforce:
- 7–14 day validation path for claims
- Trigger → Action → Reward → Friction → Metric → Failure Mode format for growth ideas
- MVP / MVP++ / Not Built scope
- Friction Gate (reject ideas that add onboarding friction by default)

Reference:
- `11_marketing_growth_agent/00_constitution/IMPOSSIBLE_LEVEL_CONSTITUTION.md`
- `11_marketing_growth_agent/11_marketing_growth_system/11B_Marketing_Growth_System_Prompt.md`
