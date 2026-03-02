# AARRR Funnel Audit - Standard Workflow

**Workflow ID**: `aarrr-funnel-audit`  
**Category**: Standard  
**Frequency**: Monthly / Quarterly  
**Duration**: 2-3 hours  
**Owner**: Growth Marketing Team

---

## Overview

Comprehensive audit of the entire customer journey using the AARRR (Pirate Metrics) framework to identify bottlenecks, opportunities, and growth levers.

### Objectives

1. Measure performance across all 5 stages (Acquisition, Activation, Retention, Revenue, Referral)
2. Identify conversion drop-offs and friction points
3. Benchmark against previous periods and industry standards
4. Generate prioritized list of optimization opportunities

---

## Prerequisites

### Required Data Access

- ✅ Analytics platform (Mixpanel, Amplitude, or GA4)
- ✅ CRM/Revenue data (Stripe, Chargebee, Salesforce)
- ✅ Marketing attribution data (UTM tracking, ad platforms)
- ✅ Customer feedback (NPS surveys, support tickets)

### Time Period

- **Recommended**: Last 30 days (monthly audit) or 90 days (quarterly)
- **Comparison**: Previous period (MoM or QoQ) and/or year-over-year

### Stakeholders

- **Primary**: Growth Marketing Lead
- **Collaborators**: Product Manager, Data Analyst, Customer Success
- **Recipients**: Executive team, Product team, Marketing team

---

## Workflow Phases

### Phase 1: Data Collection (30 min)

#### Step 1.1: Extract Acquisition Metrics

**Tool**: Mixpanel / GA4

```sql
-- Example: BigQuery query for acquisition data
SELECT
  DATE(timestamp) as date,
  acquisition_channel,
  COUNT(DISTINCT user_id) as new_users,
  SUM(marketing_spend) / COUNT(DISTINCT user_id) as cpa
FROM events
WHERE event_name = 'user_signed_up'
  AND timestamp BETWEEN '2026-01-01' AND '2026-01-31'
GROUP BY date, acquisition_channel
```

**Metrics to Collect**:

- Total visitors (unique, sessions)
- New user sign-ups
- Traffic by channel (Organic, Paid, Referral, Direct, Social)
- Cost Per Acquisition (CPA) by channel
- Visitor-to-Signup conversion rate

#### Step 1.2: Extract Activation Metrics

**Tool**: Mixpanel / Amplitude

**Key Events**:

- Sign-up completed
- Email verified
- First key action completed (e.g., project created, document uploaded)
- Onboarding finished

**Metrics to Collect**:

- Activation rate (% who completed key action within 7 days)
- Time-to-Value (TTV) - median time to first key action
- Onboarding completion rate
- Drop-off by onboarding step

#### Step 1.3: Extract Retention Metrics

**Tool**: Mixpanel / Amplitude (Retention Analysis)

**Cohort Definition**: Users who signed up in the period

**Metrics to Collect**:

- Day 1 Retention (% who returned next day)
- Day 7 Retention
- Day 30 Retention
- Day 90 Retention
- Monthly Active Users (MAU)
- Daily Active Users (DAU)
- Stickiness (DAU/MAU ratio)
- Churn Rate (% who didn't return in 30 days)

#### Step 1.4: Extract Revenue Metrics

**Tool**: Stripe / Chargebee + CRM

**Metrics to Collect**:

- Total Revenue (MRR for subscription, GMV for marketplace)
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (CLV)
- Free-to-Paid Conversion Rate
- LTV:CAC Ratio
- Net Revenue Retention (NRR) - for existing cohorts
- Expansion Revenue (upsells, cross-sells)

#### Step 1.5: Extract Referral Metrics

**Tool**: Custom referral tracking / Viral Loops / ReferralCandy

**Metrics to Collect**:

- Total referrals sent
- Referral conversion rate
- Viral Coefficient (K-factor)
- Referrals per user
- Net Promoter Score (NPS)

---

### Phase 2: Funnel Analysis (45 min)

#### Step 2.1: Calculate Conversion Rates

Create a funnel visualization:

```
100,000 Visitors (Acquisition)
    ↓ 3.5% conversion
3,500 Sign-Ups (Activation)
    ↓ 68% activated
2,380 Activated Users (Retention)
    ↓ 42% Day 30 retention
1,000 Retained Users (Revenue)
    ↓ 8% paid conversion
80 Paying Customers (Referral)
    ↓ 62% made referral
50 Referrers
    ↓ K = 1.2
60 New Users from Referrals
```

**Overall Funnel Efficiency**: 0.08% (80 paying customers / 100,000 visitors)

#### Step 2.2: Identify Bottlenecks

For each stage, flag if below benchmark:

| Stage | Your Performance | Benchmark | Status |
|-------|------------------|-----------|--------|
| Acquisition → Activation | 3.5% | 2-5% | ✅ On Target |
| Activation Rate | 68% | 60-75% | ✅ Good |
| **Day 30 Retention** | **42%** | **50-60%** | ⚠️ **Below Target** |
| Free-to-Paid | 8% | 5-10% | ✅ Good |
| Viral Coefficient | 1.2 | > 1 | ✅ Viral! |

**Critical Bottleneck**: Day 30 Retention (8% below target)

#### Step 2.3: Cohort Breakdown

Segment by acquisition channel to find best sources:

| Channel | Sign-Ups | Activation | Day 30 Retention | Paying | CAC | LTV:CAC |
|---------|----------|------------|------------------|--------|-----|---------|
| Organic SEO | 1,200 | 72% | 58% | 12% | $5 | 8.4:1 ✅ |
| Paid Ads | 1,800 | 65% | 35% | 6% | $45 | 1.1:1 ⚠️ |
| Referral | 350 | 78% | 64% | 15% | $2 | 15:1 🚀 |
| Direct | 150 | 60% | 40% | 5% | $0 | ∞ |

**Insight**: Referral channel has highest retention and LTV:CAC. Paid ads underperforming.

---

### Phase 3: Root Cause Analysis (30 min)

#### Step 3.1: Deep Dive into Bottleneck

**Focus**: Why is Day 30 retention only 42%?

**Investigative Questions**:

1. What % of users return Day 1, Day 7, Day 14? (weekly cohorts)
2. Which cohorts churn fastest? (by channel, geography, persona)
3. What features do retained users engage with vs. churned?
4. Any correlation with onboarding completion?

**Example Analysis**:

```
Retained Users (Day 30):
- 95% completed onboarding
- Used feature X 8+ times
- Invited ≥1 team member

Churned Users (Day 30):
- 40% incomplete onboarding ← Opportunity!
- Used feature X < 3 times
- Solo users (no team invites)
```

**Hypothesis**: Improving onboarding completion and encouraging team invites will boost retention.

#### Step 3.2: User Feedback Review

**Sources**:

- NPS survey responses (especially scores 0-6)
- Support ticket themes
- Exit survey results
- User interviews

**Common Themes** (example):

- "Onboarding was confusing"
- "Didn't understand how to use feature X"
- "Product felt too complex for our needs"

---

### Phase 4: Opportunity Prioritization (30 min)

#### Step 4.1: Generate Optimization Ideas

Brainstorm improvements for each bottleneck:

**Retention Improvement Ideas**:

1. Redesign onboarding flow (reduce steps, add contextual help)
2. Email drip campaign to nurture Days 1-14
3. In-app nudges to encourage feature X usage
4. Team invite incentives (gamification)
5. Weekly digest email with usage stats

#### Step 4.2: Prioritize Using ICE Framework

**ICE Score** = (Impact + Confidence + Ease) / 3

| Idea | Impact (1-10) | Confidence (1-10) | Ease (1-10) | ICE Score | Priority |
|------|---------------|-------------------|-------------|-----------|----------|
| Redesign onboarding | 9 | 7 | 4 | 6.7 | 🔴 High |
| Email nurture Days 1-14 | 7 | 8 | 9 | 8.0 | 🔴 High |
| In-app nudges for feature X | 6 | 7 | 8 | 7.0 | 🔴 High |
| Team invite gamification | 8 | 5 | 6 | 6.3 | 🟡 Medium |
| Weekly digest email | 5 | 6 | 9 | 6.7 | 🟡 Medium |

**Top 3 Priorities**:

1. Email nurture campaign (Quick win, high confidence)
2. In-app nudges (Fast implementation, proven tactic)
3. Redesign onboarding (Biggest impact, longer timeline)

---

### Phase 5: Reporting & Action Planning (30 min)

#### Step 5.1: Create Executive Summary

**Growth Funnel Report - January 2026**

**Overview**:

- Total Visitors: 100,000 (+12% MoM)
- Paying Customers: 80 (+8% MoM)
- Overall Conversion: 0.08%

**Key Wins**:

- ✅ Viral Coefficient reached 1.2 (exponential growth!)
- ✅ Organic acquisition LTV:CAC = 8.4:1 (excellent)
- ✅ Activation rate improved to 68% (+3pp)

**Critical Issues**:

- ⚠️ Day 30 retention = 42% (target 50-60%)
- ⚠️ Paid ads LTV:CAC = 1.1:1 (unprofitable)

**Action Plan**:

1. **Week 1-2**: Launch email nurture campaign (Days 1-14)
2. **Week 3-4**: Implement in-app feature nudges
3. **Month 2**: Redesign onboarding flow (A/B test)
4. **Immediate**: Pause paid ads, reallocate budget to organic content

#### Step 5.2: Set Quarterly Goals

Based on analysis, set measurable targets:

| Metric | Current | Q2 Goal | Initiative |
|--------|---------|---------|------------|
| Day 30 Retention | 42% | 52% (+10pp) | Email nurture + onboarding redesign |
| Free-to-Paid | 8% | 10% (+2pp) | In-app upgrade prompts |
| Organic Traffic | 35K/mo | 50K/mo (+43%) | SEO content clusters |
| LTV:CAC (Overall) | 3.2:1 | 4.5:1 | Shift budget from paid to organic |

---

## Deliverables

### Primary Outputs

1. **AARRR Funnel Dashboard** (Looker/Tableau)
   - Visual funnel with conversion rates
   - Cohort breakdowns
   - Trend charts (MoM, QoQ)

2. **Executive Report** (PDF/Slides)
   - 1-page summary
   - Key wins, critical issues
   - Prioritized action plan

3. **Detailed Analysis Doc** (Google Docs/Notion)
   - Full methodology
   - Raw data tables
   - User feedback excerpts
   - Hypotheses for testing

### Distribution

- **Executive Team**: 1-page summary + dashboard link
- **Product Team**: Full analysis doc + prioritized backlog
- **Growth Team**: Dashboard + experiment queue

---

## Success Metrics

### Audit Quality

- ✅ All 5 AARRR stages analyzed
- ✅ Comparison to previous period included
- ✅ At least 3 actionable insights identified
- ✅ Hypotheses are testable (A/B test ready)

### Business Impact (Measured 60-90 days post-audit)

- ✅ 1+ bottleneck improved by ≥ 10%
- ✅ 2+ experiments launched from recommendations
- ✅ Overall funnel efficiency improved

---

## Tools & Templates

### Analytics Tools

- **Mixpanel**: Event tracking, funnels, retention cohorts
- **Amplitude**: Behavioral analysis, user journeys
- **Google Analytics 4**: Traffic sources, acquisition
- **Looker/Tableau**: Dashboard visualization

### Templates

- [AARRR Data Collection Template](../templates/aarrr-data-collection.csv)
- [Funnel Analysis Spreadsheet](../templates/funnel-analysis.xlsx)
- [Executive Report Template](../templates/executive-report.pptx)

---

**Workflow Owner**: Growth Marketing Lead  
**Last Updated**: 2026-01-10  
**Next Review**: 2026-04-10
