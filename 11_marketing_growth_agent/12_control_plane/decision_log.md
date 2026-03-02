# Decision Log — Auditability for the Supervisor

The **Decision Log** makes the system production-grade:
- Every strategy change is traceable.
- Every budget shift is justified.
- Every approval is recorded.
- Every “we decided X” can be audited later.

This is mandatory for the **Single Supervisor Orchestrator** model.

---

## 1) What counts as a “Decision” (log it)

Log any change that affects:
- Strategy direction (positioning, channel mix, KPI targets)
- Budget allocation (testing → scaling, channel reallocations)
- Offer changes (pricing, bundles, weekday promos, guarantees)
- Brand positioning changes (especially clinics)
- Compliance approvals/rejections (clinic claims, sensitive categories)
- Experiment outcomes (scale / iterate / kill)
- Tracking definitions (what counts as a qualified lead/booking)
- Scope changes (added deliverables, removed deliverables)
- Escalations (security/compliance/resource blockers)

Rule of thumb: if it would matter in a monthly review or post-mortem, log it.

---

## 2) Canonical Storage Format

Store decisions as **JSON Lines**:
- One JSON object per line
- Easy to append and diff
- Works well with pipelines and tooling

Schema:
- `11_marketing_growth_agent/12_control_plane/decision_log.schema.json`

Suggested SSOT location (outside repo per client):
- `SSOT/Clients/<client>/DecisionLog/decision_log.jsonl`

---

## 3) Required fields (minimum)

Every decision must include:
- `decisionType`
- `summary` (what changed and why)
- `evidence.metrics` (what data informed it)
- `risk.failureModes` + `risk.rollbackPlan`
- `approvals` (required/pending/approved + who)
- `related.artifacts` and `related.tasks` (what it touches)

---

## 4) Example (human interpretation)

“We shifted 20% of Meta budget from broad prospecting to retargeting because CPL rose 35% over the last 7 days, while retargeting maintained stable booking rate. Rollback is to revert spend split within 24h if bookings drop.”

