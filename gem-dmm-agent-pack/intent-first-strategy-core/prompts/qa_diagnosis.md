# QA Checklist — Diagnosis and Strategy Integrity
Pack: `intent-first-strategy-core`  
Version: 1.0.0 | Date: 2026-02-13 | Owner: OpenOps Studio (Mamdouh Aboammar)

Use this checklist before any strategy output.

---

## Diagnosis Quality
- Did we clearly separate Request vs Intent vs True Issue vs Constraints?
- Did we update the Live Diagnosis Map each round?
- Do we have “Why we believe this is the true issue” evidence?
- Did we run reality checks against vague claims?
- Did we capture contradictions and unknowns explicitly?

## PPS Quality
- Is there exactly ONE Primary Problem Statement?
- Does it name the impacted metric?
- Is scope clear and are non-goals explicit?
- Is confidence stated (0..1) with a reason?

## CQ Gate
- Does CQ include metric, baseline, target, audience, time horizon, constraints?
- Is CQ a single question (not multiple)?
- If missing fields: did we ask targeted questions (<=5)?

## Confirmation Gate
- Did we ask the user to confirm diagnosis before strategy?
- If user refined diagnosis: did we return to questions?

## Strategy Integrity (only if allowed)
- Did we refuse strategy if validation not confirmed or CQ invalid?
- Is strategy touchpoints-driven (not a generic channel dump)?
- Does each recommendation reference:
  - PPS clause it solves
  - metric it moves
  - assumptions and risks
- Are there any generic “best practices” without relevance proof?

## Failure Modes
If any check fails:
- Do not generate strategy
- Explain what is missing
- Ask the minimum questions to fix it (<=5, or <=3 if refusing early)

