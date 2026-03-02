# CRO Audit Workflow - Complete Process

**Workflow ID**: `cro-audit`  
**Category**: Standard  
**Frequency**: Quarterly  
**Duration**: 3-5 days  
**Owner**: Conversion Team

---

## Overview

A comprehensive audit of conversion optimization opportunities across the entire website/product, delivering a prioritized roadmap of experiments.

### Objectives

1. Audit all major conversion points (homepage, landing pages, pricing, checkout)
2. Identify bottlenecks using Lever Framework
3. Generate 10-15 high-impact experiment ideas
4. Prioritize using RICE/PIE scoring
5. Deliver quick wins (1-week implementation)

---

## Phase 1: Data Collection (Day 1)

### Analytics Extraction

- **Funnel data**: Last 90 days via Google Analytics 4 or Mixpanel
- **Traffic sources**: Organic, Paid, Referral, Direct breakdown
- **Device split**: Mobile vs. Desktop conversion rates
- **Conversion rates**: Homepage → Product → Cart → Checkout → Purchase

### Heatmap Analysis

- **Hotjar/Crazy Egg**: Review last 30 days of heatmaps
- **Focus pages**: Homepage, top 3 landing pages, pricing, checkout
- **Look for**: Rage clicks, scroll depth, dead zones

### Session Replays (Sample 50-100 recordings)

- Filter for: Users who reached checkout but didn't complete
- Note: Errors, hesitations, form abandonments

### Customer Feedback

- **NPS surveys**: Last quarter's responses
- **Exit surveys**: "What prevented you from converting today?"
- **Support tickets**: Common pain points

---

## Phase 2: Analysis & Diagnosis (Day 2-3)

### Funnel Leak Identification

Use Funnel Analyzer tool to find stages with CR < 50%

**Example Output**:

```
Homepage → Product Page: 35% (leak!)
Product Page → Add to Cart: 28% (severe leak!)
Checkout → Purchase: 82% (healthy)
```

### Lever Framework Diagnostics

For each leak, diagnose root cause:

| Leak | Usability | Motivation | Comprehension | Trust | Cost |
|------|-----------|------------|---------------|-------|------|
| Homepage → Product | ✅ | ⚠️ Weak value prop | ⚠️ Unclear navigation | ✅ | N/A |
| Product → Cart | ✅ | ✅ | ✅ | ⚠️ No reviews | ⚠️ Pricing unclear |

### Heatmap Insights

- Homepage: 70% don't scroll past hero (CTA needs to move up)
- Product Page: Users clicking on non-clickable images (add product gallery)
- Checkout: Rage clicks on "Apply Coupon" field (broken feature)

---

## Phase 3: Hypothesis Generation (Day 3-4)

### Experiment Ideas (10-15 minimum)

**Format**:

```
Because we observed [DATA],
We believe [CHANGE] will cause [OUTCOME],
We'll measure using [METRIC]
```

**Example Hypotheses**:

1. **Homepage CTA**: Because only 30% scroll past hero, moving primary CTA above fold will increase click-through by 15% (measure: CTA click rate)
2. **Product Reviews**: Because Product → Cart has 28% CR and lacks social proof, adding 15+ reviews above "Add to Cart" will increase cart adds by 20% (measure: Add to Cart rate)
3. **Checkout Trust**: Because cart → checkout drops 30%, adding trust badges (SSL, money-back guarantee) will reduce abandonment by 10% (measure: checkout completion rate)

---

## Phase 4: Prioritization (Day 4)

### ICE Scoring

| # | Hypothesis | Reach (users/qtr) | Impact (0-3) | Confidence (%) | Effort (weeks) | RICE Score | Priority |
|---|------------|-------------------|--------------|----------------|----------------|------------|----------|
| 1 | Homepage CTA above fold | 50,000 | 1 | 80% | 1 | 40,000 | 🔴High |
| 2 | Product reviews | 15,000 | 1.5 | 70% | 2 | 7,875 | 🟡Medium |
| 3 | Checkout trust badges | 7,000 | 1 | 90% | 0.5 | 12,600 | 🔴High |

**Prioritized Experiment Queue**:

1. Homepage CTA (Quick Win: 1 week)
2. Checkout trust badges (Quick Win: 3 days)
3. Product reviews

---

## Phase 5: Reporting & Roadmap (Day 5)

### Deliverables

**1. Executive Summary (1-page)**

- **Current State**: Overall CR = 4.2%, Revenue Per Visitor = $8.50
- **Key Findings**: 3 major leaks identified (Homepage → Product, Product → Cart, Checkout)
- **Recommended Actions**: 5 high-priority experiments (RICE > 10,000)
- **Projected Impact**: 25-35% CR lift if all tests succeed

**2. Detailed CRO Audit Report (15-20 pages)**

- **Methodology**: Lever Framework, RICE prioritization
- **Funnel Breakdown**: Stage-by-stage analysis with charts
- **Heatmap Insights**: Screenshots with annotations
- **Session Replay Findings**: Top 10 UX issues
- **Prioritized Experiment Backlog**: 15 hypotheses sorted by RICE

**3. Quick Wins List (3-5 items)**

- Items implementable in ≤ 1 week
- Example: Fix broken coupon field (2 hours), add trust badges (1 day)

---

## Success Metrics

### Audit Quality

- ✅ All major conversion points audited
- ✅ 10+ experiment hypotheses generated
- ✅ Hypotheses based on data, not opinions
- ✅ RICE scoring completed

### Business Impact (Measured 90 days post-audit)

- ✅ ≥ 3 experiments launched from audit recommendations
- ✅ ≥ 1 winning test with significant lift
- ✅ Overall CR improved by ≥ 10%

---

**Workflow Owner**: Conversion Team Lead  
**Last Updated**: 2026-01-10
