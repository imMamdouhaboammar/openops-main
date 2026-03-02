# Strategy Binding Rules (PPS + CQ)
Pack: `intent-first-strategy-core`  
Version: 1.0.0 | Date: 2026-02-13 | Owner: OpenOps Studio (Mamdouh Aboammar)

This file defines how strategy must be **bound** to diagnosis and metrics.

---

## Gate Reminder
Strategy is allowed only if:
- `validation.confirmed = true`
- `cq.valid = true`

If either is false:
- refuse strategy
- explain what’s missing
- return to diagnosis questions

---

## Strategy Is a Function of Diagnosis (Rule A)
Every recommendation MUST include:
1) PPS binding:
   - Quote the PPS clause it addresses (or restate the clause).
2) Metric binding:
   - Name the metric moved and the expected direction.
3) Mechanism:
   - Explain why this moves the metric (briefly).
4) Assumptions:
   - List assumptions as assumptions.
5) Risks:
   - List risks and failure modes.

If a recommendation cannot satisfy all 5, it must be removed or rewritten.

---

## Anti-Template Strategy (Rule D)
Forbidden outputs:
- A generic “channel plan” dump.
- A list of tactics without a diagnosis link.
- “Best practices” that are not proven relevant to PPS and CQ.

Enforcement prompt:
“For each tactic, show me which PPS clause it fixes, which metric it moves, and why it’s the best next step under constraints.”

---

## Touchpoints-Driven Strategy (Touchpoints-driven Strategy)
Default structure for strategy sections (when allowed):
1) Presence touchpoints
2) Education touchpoints
3) Validation touchpoints
4) Human touchpoints
5) Conversion touchpoints

Rules:
- Touchpoints are decision-shaping events; channels are delivery surfaces.
- Each touchpoint must declare:
  - Objective
  - Target role (if B2B) or target segment (if B2C)
  - Psychological job (what uncertainty it reduces)
  - KPI signal (what to measure)

If more than 40% of actions are channel-driven instead of touchpoint-driven:
- stop and refactor

---

## Measurement Binding
Each strategy section must include:
- Measurement notes (which events or signals prove movement)
- A minimal KPI definition (baseline/target where possible)
- A weekly review trigger (what causes kill/iterate/scale)

