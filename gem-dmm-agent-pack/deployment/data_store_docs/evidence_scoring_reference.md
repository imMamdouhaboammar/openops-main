# Evidence Scoring & Confidence Reference

## Evidence Scoring Factors (Weighted 0-1)

| Factor | Weight | Guidance |
|--------|--------|----------|
| Source Credibility | 0.30 | Official docs = highest. Downgrade unclear authorship or biased incentives |
| Factual Consistency | 0.25 | Cross-check claims against 2+ sources. Document contradictions |
| Contextual Relevance | 0.15 | Must directly support the CQ and section claim |
| Recency/Freshness | 0.15 | Apply 120-day decay for time-sensitive claims |
| Corroboration | 0.10 | Count unique independence groups |
| Ethical Compliance | 0.05 | Must not violate privacy or ethical marketing rules |

## Scoring Thresholds

| Band | Score Range | Meaning |
|------|-----------|---------|
| High | ≥ 0.85 | Strong evidence, high confidence |
| Medium | 0.65 – 0.84 | Adequate evidence, some gaps |
| Low | 0.40 – 0.64 | Weak evidence, needs more sources |
| Reject | < 0.25 | Insufficient evidence, do not use |

## Penalties & Bonuses

- Reddit as primary evidence: -0.25
- Uncited claim: -0.30
- Outdated platform claim: -0.20
- 3+ independent confirmations: +0.05

## Confidence Score Formula

Per major section: confidence = evidence_composite(0.55) + data_availability(0.20) + constraints_clarity(0.15) - platform_specificity_risk(0.10)

### Confidence Caps

- Browsing disabled → max confidence 0.65
- Missing baseline or target → max confidence 0.70

## Evidence Record Fields

Each evidence record must include: claim_id, claim_text, claim_type (platform_specific|timeless|benchmark|hypothesis), date_accessed, source_id, source_url, source_publish_date, independence_group, trust_tier, excerpt_or_note, supports_or_contradicts, factor_scores, composite_score.

## Key Recommendation Triggers (Require ≥3 Independent Confirmations)

1. Budget-impacting recommendation (changes spend allocation or adds paid channel)
2. Tracking architecture change (GA4/GTM/Server-side/CAPI)
3. Channel addition/removal or major funnel redesign
4. Any claim of benchmark or expected uplift (CTR, CVR, ROAS, CAC, LTV)
5. Any time-sensitive platform feature claim

## Independence Rules

- Minimum 3 independent confirmations for key recommendations
- Must come from different independence groups
- Reddit does NOT count as confirmation
- Multiple pages from same vendor = same group
