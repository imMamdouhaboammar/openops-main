# Diagnosis Interview (Interactive, Intent-First)
Pack: `intent-first-strategy-core`  
Version: 1.0.0 | Date: 2026-02-13 | Owner: OpenOps Studio (Mamdouh Aboammar)

Rules:
- Ask **max 5 questions per round**.
- After each round you MUST output a **Live Diagnosis Map** and explicitly show:
  - What we know
  - What we still need
- You must separate Request vs Intent vs True Issue vs Constraints.

---

## Live Diagnosis Map (Template)
Output this every round, updated:

Diagnosis Map:
- Client Request:
- Suspected Intent:
- Suspected True Issue:
- Constraints:
  - Budget:
  - Time:
  - Team:
  - Compliance:
- Evidence (why we believe this):
- Contradictions:
- Unknowns:

What we know:
- ...

What we still need:
- ...

---

## Round 1 — Business + Goal + Current Situation
Ask up to 5:
1) What are you asking for? (e.g., “run ads”, “fix SEO”, “increase sales”)
2) What is your business model and offer (1–2 sentences)?
3) What is the ONE primary success metric for the next 60–90 days?
4) What is your current baseline for that metric (number or range)?
5) What is your target and time horizon (days)?

End-of-round action:
- Update Diagnosis Map.
- Identify any missing CQ Gate fields.

---

## Round 2 — Intent (“Why now?”) and Decision Context
Ask up to 5:
1) Why is this urgent now? What changed?
2) What happens if you do nothing for 90 days?
3) What have you tried already, and what happened?
4) Who is the buyer/decision maker (audience/ICP)? (no PII)
5) What is the buying journey length (days/weeks) and what typically blocks decisions?

Reality check prompts (use if contradictions appear):
- “That sounds high-level. What’s the smallest number/range you can share?”
- “If that’s true, which metric should have moved already?”

End-of-round action:
- Update Diagnosis Map.
- Draft a hypothesis for true issue (not final).

---

## Round 3 — Constraints and Data Reality
Ask up to 5:
1) Budget range per month (range ok)?
2) Execution capacity: who will do the work and how many hours/week?
3) Any compliance or brand constraints (regulated claims, approvals)?
4) What tracking/data do you trust today? (GA4/GTM/CRM/etc.)
5) What is the biggest funnel leak: traffic, conversion, retention, sales capacity, or measurement quality?

End-of-round action:
- Update Diagnosis Map.
- Draft the Primary Problem Statement (PPS) candidate.

---

## Round 4 — Contradictions + Hypothesis Selection
Goal: lock a plausible diagnosis hypothesis and ask for confirmation.

Ask up to 5 (only what’s missing):
1) I see contradiction X vs Y — which one is true (or what’s the range)?
2) If we solved only one constraint this month, which would unblock growth most?
3) Is the main limiter demand generation, conversion, or fulfilment capacity?
4) Which segment is most valuable (highest LTV) today?
5) What would you consider “proof” that the diagnosis is correct?

End-of-round action:
- Update Diagnosis Map.
- Propose ONE PPS and ONE CQ (or explain what blocks CQ validity).
- Ask user to confirm or refine the diagnosis.

