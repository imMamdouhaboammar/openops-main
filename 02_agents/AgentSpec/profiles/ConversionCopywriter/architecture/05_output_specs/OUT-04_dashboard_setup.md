# OUT-04: Performance Dashboard Setup

**Output Specification**
**Version**: 2.0

---

## Purpose

Provide complete dashboard setup and measurement framework for tracking copy performance.

---

## Dashboard Components

### 1. Email Copy Dashboard

**Metrics**:
- Send volume
- Unique opens
- Open rate (target: 25-35%)
- Unique clicks
- Click-through rate (target: 3-5%)
- Conversion rate (target: 1-3%)
- Unsubscribe rate (should be <0.5%)

### 2. Landing Page Dashboard

**Metrics**:
- Unique visitors
- Bounce rate (target: <40%)
- Time on page (target: 2-3 min)
- Conversion rate (target: 5-15%)
- Scroll depth
- Form completion rate (if applicable)

### 3. Ad Copy Dashboard

**Metrics**:
- Impressions
- Click-through rate (target: 1-3%)
- Cost per click
- Cost per conversion
- Return on ad spend (target: 3:1+)
- Quality score (Google Ads)

### 4. A/B Test Dashboard

**Metrics**:
- Variant names (A, B, C, etc.)
- Sample size per variant
- Primary metric by variant
- Confidence level
- Winner (if determined)
- Winner performance lift

---

## Weekly Review Template

```markdown
# Weekly Copy Performance Review - Week of [Date]

## Email Performance
- Emails sent: X
- Open rate: Y%
- Click rate: Z%
- Conversion rate: W%
- Trend: ↑/↓/→

## Landing Page Performance
- Visitors: X
- Bounce rate: Y%
- Conversion rate: Z%
- Visitors to conversion: W
- Trend: ↑/↓/→

## Active A/B Tests
- Test 1: [Variant A vs B, status, confidence]
- Test 2: [Details]
- Test 3: [Details]

## Key Insights
- What worked: [observation]
- What didn't work: [observation]
- Action items: [next steps]

## Next Week Focus
- Priority 1: [copy element to test]
- Priority 2: [optimization needed]
- Priority 3: [learning opportunity]
```

---

## Monthly Analysis Template

```markdown
# Monthly Copy Analysis - [Month]

## Performance vs Goals

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Email Open Rate | 25% | X% | ✅/❌ |
| Landing Page CR | 10% | Y% | ✅/❌ |
| CPA | $5 | Z% | ✅/❌ |
| Overall ROI | 3:1 | W:1 | ✅/❌ |

## Test Results
- Won tests: [list with lift %]
- Lost tests: [list with impact]
- Inconclusive tests: [list]

## Key Learnings
- Best performing angle: [description]
- Best CTA wording: [copy]
- Best proof type: [type]
- Audience preference: [insight]

## ROI Analysis
- Revenue attributed to copy: $X
- Total spend on copy/ads: $Y
- ROI: X:1
- CPL: $Z

## Optimizations Applied
- Change 1: [what changed, why]
- Change 2: [what changed, why]
- Change 3: [what changed, why]

## Next Month Priorities
1. Test: [copy element]
2. Optimize: [element]
3. Explore: [new direction]

## Notes
- Breakthrough discovery: [if any]
- Bottleneck identified: [if any]
- Action plan: [next steps]
```

---

## A/B Testing Tracker

```
Test Name: Headline Format Comparison
Goal: Increase landing page conversion rate
Duration: Jan 15-28 (2 weeks)

Variant A (Control):
  Headline: "Real-time analytics for e-commerce"
  Visitors: 2,500
  Conversions: 250
  Rate: 10.0%

Variant B (Benefit-Driven):
  Headline: "Increase e-commerce revenue 35% with real-time data"
  Visitors: 2,480
  Conversions: 296
  Rate: 11.9%

Statistical Result:
  Lift: +19% (from 10.0% to 11.9%)
  Confidence: 94%
  Status: Winning (not yet 95%+)
  Recommendation: Continue test

Winner Decision:
  Variant B wins (95%+ confidence achieved)
  Implement: Make Variant B the new control
  Next Test: Test different CTA wording
```

---

## KPI Dashboard Template (Google Sheets)

```
Sheet 1: Overview
- Week ending: [date]
- Primary KPI: [metric + value + vs target]
- Secondary KPIs: [list with values]
- Key wins: [top 3]
- Areas for improvement: [top 3]

Sheet 2: Email Metrics
- Send date | Subject | Send #  | Opens | Click | Conversion | Rate

Sheet 3: Landing Pages
- Page name | Traffic | Bounce % | Conversion | CPA | Trend

Sheet 4: A/B Tests
- Test name | Variant | Sample | Metric | Result | Winner

Sheet 5: Copywriting Improvements
- Week | Change made | Expected impact | Actual impact | Status
```

---

## Implementation Timeline

**Week 1**: Set up all dashboards
- Create Google Sheets templates
- Connect GA4 or equivalent
- Set up tracking UTM parameters

**Week 2**: Launch first tests
- Begin weekly tracking
- Run first A/B test
- Document baseline metrics

**Week 3-4**: Analyze and optimize
- Complete weekly reviews
- Analyze test results
- Make optimizations

**Week 5+**: Continuous improvement
- Weekly optimization cycle
- Monthly deep-dive analysis
- Test new hypotheses

---

**Status**: Ready to implement
