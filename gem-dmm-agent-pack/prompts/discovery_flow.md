# Discovery Interview Flow (≤5 questions per round)
Pack: `gem-dmm-agent-pack` | Version: 1.0.0 | 2026-02-13

This file defines a branching discovery interview. The agent must ask **no more than 5 questions per round**. After each round, the agent must:
1) summarize *current understanding*,
2) list *knowns/unknowns*,
3) attempt a draft **Core Question (CQ)**,
4) run the **CQ validator** and ask the minimum follow-up questions (≤5).

---

## Stage 0 — Safety & Scope (always first)
Say: “Please don’t share passwords/API keys/customer lists. Ranges and aggregates are enough.”

Ask (pick up to 3):
1) What outcome do you want in the next **90 days** (revenue, leads, trials, retention, awareness)?
2) What is your business model? (B2B SaaS / B2C ecommerce / marketplace / local services / other)
3) Which geographies and languages matter most? (Egypt/KSA/UAE/GCC; Arabic/English)

Then proceed to Stage 1.

---

## Stage 1 — Discovery Rounds

### Round 1 — Business + Goal + Constraints + Current Channels
Ask up to 5 (prioritize unanswered):
1) What is the product/service and the *one-sentence value proposition*?
2) What does “success” mean? Pick one primary metric: revenue / qualified leads / trials / activated users / repeat purchases / something else.
3) What is your budget range per month for marketing? (ranges ok)
4) What channels are currently active? (Google Ads, Meta, TikTok, LinkedIn, SEO, email, affiliates, etc.)
5) What is the biggest blocker right now? (traffic, conversion, retention, unit economics, attribution, creative, positioning)

Regional add-on (ask only if not already known, count within 5 total):
- Primary country and city focus? (e.g., Cairo, Riyadh, Dubai)
- Preferred language for customer-facing content? (Arabic dialect or English)

Branching notes:
- If budget is unknown → ask for constraints: “What could you spend safely without risk?”
- If multiple goals → force prioritization: “If we could improve only one in 90 days, which would it be?”

CQ attempt + validator after Round 1.

---

### Round 2 — Funnel Diagnostics (Awareness → Referral) + Baselines
Ask up to 5:
1) What is your current funnel baseline (rough ranges ok)?
   - Traffic/visits per week
   - Conversion rate to lead/trial/purchase
   - Close rate or trial→paid
   - Retention (D7/D30) or repeat purchase rate
2) What are your top 1–3 acquisition sources today?
3) What is your average order value (or ACV) and gross margin range?
4) What is your typical sales cycle length (if B2B)?
5) What is your current tracking stack? (GA4/GTM, pixels/CAPI, CRM, product analytics)

Branching notes:
- If tracking is weak → plan measurement-first foundations.
- If baseline unknown → ask only for the 1–2 most important missing baselines tied to the primary metric.

CQ attempt + validator after Round 2.

---

### Round 3 — ICP + Offer + Positioning + Creative Inventory
Ask up to 5:
1) Who is your ICP? Be specific: industry, job role, company size (B2B) or demographics/behaviors (B2C) — no PII.
2) What problem do they *urgently* want solved and what alternatives do they use?
3) What is your offer structure? (pricing, trial, guarantees, bundles)
4) What messaging angles have worked best so far?
5) What creative assets do you have? (landing pages, video, UGC, testimonials, case studies)

CQ attempt + validator after Round 3.

---

### Round 4 — Team + Timeline + Risk Tolerance + Operational Reality
Ask up to 5:
1) Who will execute? (in-house marketer, agency, founder-led) and how many hours/week?
2) Timeline constraints? (launch date, seasonality, cash runway)
3) Risk tolerance: conservative / balanced / aggressive?
4) Any compliance constraints? (regulated industry, claims restrictions, brand constraints)
5) What is the “non-negotiable” constraint? (budget cap, brand tone, channel restrictions)

CQ attempt + validator after Round 4.

---

## Core Question (CQ) Validator (run after every round)
A CQ is valid only if ALL are present:
- ONE core question (single sentence question)
- One primary success metric
- Baseline (number or bounded range)
- Target (number or bounded range)
- Time horizon in days
- ICP defined
- Constraints (budget/time/team/tooling) defined (or explicitly unknown)

If invalid:
- List missing fields only.
- Ask up to 5 targeted questions to fill gaps.
- Repeat.

When valid:
- Lock CQ and move to research + grounding before strategy.
