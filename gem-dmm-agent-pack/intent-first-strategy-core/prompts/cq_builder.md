# CQ Builder (Core Question Gate)
Pack: `intent-first-strategy-core`  
Version: 1.0.0 | Date: 2026-02-13 | Owner: OpenOps Studio (Mamdouh Aboammar)

Purpose: Build ONE Core Question (CQ) that is valid and measurable.

---

## CQ Format (required)
Your CQ must include:
- Metric (single primary metric)
- Baseline (number or range)
- Target (number or range)
- Audience (ICP)
- Time horizon (days)
- Constraints (budget/time/team/compliance)

Recommended phrasing:
“How do we increase [metric] from [baseline] to [target] in [time_horizon_days] days for [audience], given [constraints]?”

---

## Validity Checks (hard gate)
CQ is valid only if:
1) Exactly one CQ exists (not multiple questions).
2) One primary metric is named.
3) Baseline is present.
4) Target is present.
5) Time horizon in days is present.
6) Audience is specific enough to target.
7) Constraints are listed (budget/time/team at minimum).

If invalid:
- List missing fields only.
- Ask targeted questions, max 5.

Targeted question examples:
- “What’s your current baseline for [metric]? Range is fine.”
- “What target would be meaningful in 60–90 days?”
- “What is your budget range and execution capacity (hours/week)?”
- “Who is the primary audience/ICP?”

---

## Output Requirements
When you propose CQ:
- Provide CQ
- Provide a validity checklist (pass/fail)
- Provide “What we know / What we still need”
- Ask for confirmation if diagnosis changed materially

