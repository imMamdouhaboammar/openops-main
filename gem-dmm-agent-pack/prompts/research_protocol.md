# Research & Grounding Protocol (2026)
Pack: `gem-dmm-agent-pack` | Version: 1.0.0 | 2026-02-13

This protocol defines how to perform **true external grounding** and avoid unverified recommendations.

---

## Source Priority Order (must follow)
1) **Official platform documentation** (Google Ads/GA4/GTM/Search Console, Meta, TikTok, LinkedIn, Microsoft Ads)
2) **Reputable analytics vendor docs** (Mixpanel, Amplitude, PostHog)
3) **Reputable research** (standards bodies, high-quality research outlets)
4) **Practitioner sources** (credible practitioners, agencies, case studies) — validate independently
5) **GitHub** (implementation patterns) — validate conceptual claims with docs
6) **Reddit** (qualitative signals only) — never primary evidence, never counts toward 3 confirmations

## Regional Sources (Egypt + GCC)
Use regional official sources for market sizing and macro context (always dated):
- Egypt CAPMAS: https://www.capmas.gov.eg/
- UAE Open Data (FCSC): https://opendata.fcsc.gov.ae/
- Saudi Vision 2030: https://www.vision2030.gov.sa/
- Saudi CST: https://www.cst.gov.sa/

Use regional business intelligence outlets only as supporting evidence, and validate with official sources when possible.

---

## Key Recommendation Evidence Rule (hard gate)
For any **key recommendation** (budget-impacting, tracking changes, benchmark/uplift claims, channel addition/removal, time-sensitive feature claims):
- Require **≥3 independent confirmations** from different independence groups.
- For platform-specific claims: at least **2 confirmations from trust tier A** when possible.

---

## Recency Policy (hard gate)
- Apply **recency decay after 120 days** for time-sensitive claims.
- Timeless concepts can bypass recency decay, but **platform-specific features never bypass**.
- For time-sensitive claims: always include dates:
  - publish date (if available)
  - accessed date (always)

---

## Practical Search Query Patterns
Use precise, date-aware searches:
- “[platform] [feature] documentation” + current year
- “site:developers.google.com [topic] GA4” (for Google)
- “site:learn.microsoft.com linkedin marketing api [topic]” (for LinkedIn)
- “[platform] conversion tracking best practices 2026”
- “[industry] benchmarks [metric] 2025 2026” (verify across outlets)

---

## Evidence Logging (required)
Maintain an evidence log per section using this template:

EVIDENCE RECORD
- claim_id:
- claim_text:
- claim_type: platform_specific | timeless | benchmark | hypothesis
- date_accessed: YYYY-MM-DD
- source_id:
- source_url:
- source_publish_date: (if available)
- independence_group:
- trust_tier: A | B | C | D
- excerpt_or_note: (short; do not quote long passages)
- supports_or_contradicts: supports | contradicts | context
- factor_scores:
  - source_credibility:
  - factual_consistency:
  - contextual_relevance:
  - recency_and_freshness:
  - corroboration:
  - ethical_compliance:
- composite_score:

If any key recommendation has fewer than 3 independent confirmations:
- downgrade confidence
- rewrite as hypothesis + experiment
- ask for minimum missing info or browsing permission

---

## Reddit Handling (qualitative-only)
Allowed uses:
- identify common failure modes
- collect vocabulary customers use
- spot recurring complaints about tooling UX

Not allowed:
- use as primary evidence for platform capabilities, policy, or benchmarks
- count toward the 3 confirmations requirement
