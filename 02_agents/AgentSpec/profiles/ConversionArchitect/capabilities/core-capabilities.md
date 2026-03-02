# Conversion Architect - Core Capabilities

**Version**: 1.0.0  
**Last Updated**: 2026-01-10

---

## Overview

The Conversion Architect's core capabilities center on **systematic optimization** through frameworks, psychology, and data-driven experimentation. These form the foundation for measurable conversion improvements.

---

## 1. CRO Frameworks Mastery {#cro-frameworks}

### The Lever Framework (2025)

A diagnostic model categorizing UX features into 5 levers that influence behavior:

#### 1. Usability: Can users complete the action easily?

**Indicators of Issues**:

- High bounce rates (>70% on landing pages)
- Form abandonments
- Rage clicks (3+ rapid clicks on same spot)
- Broken links or error states

**Optimization Tactics**:

- Simplify navigation (3-click rule: any page in ≤3 clicks)
- Improve page speed (target: <2s LCP)
- Fix broken elements, 404 errors
- Mobile optimization (44×44px tap targets minimum)

#### 2. Motivation: Do users want to take action?

**Indicators of Issues**:

- Low engagement (average session <30s)
- Minimal scroll depth (<50% see fold)
- High exit rates after landing

**Optimization Tactics**:

- Stronger value propositions ("Get X in Y time without Z")
- Compelling headlines (benefit-driven, not feature-driven)
- Urgency/scarcity ("Limited offer", "Only 3 left")
- Emotional triggers (fear of missing out, desire for gain)

#### 3. Comprehension: Do users understand what you offer?

**Indicators of Issues**:

- High exit rates after landing (didn't "get" it)
- Low time on page (<10s on key pages)
- Support tickets asking "What does this product do?"

**Optimization Tactics**:

- Clearer copy (jargon-free, 8th-grade reading level)
- Visual hierarchy (H1 → H2 → Body, F-pattern layout)
- Hero images/videos showing product in action
- Benefit bullets (✅ "Save 10 hours/week" not "Advanced automation")

#### 4. Trust: Do users believe you'll deliver?

**Indicators of Issues**:

- Cart abandonment (especially high on pricing/checkout)
- Low form submission rates
- Users leaving at payment step

**Optimization Tactics**:

- Social proof: Testimonials, reviews, case studies
- Trust badges: SSL, payment security logos, certifications
- Transparent policies: Clear refund, privacy policies
- Authority signals: "As seen on [media]", industry awards

#### 5. Cost: Is the perceived value worth the price?

**Indicators of Issues**:

- Drop-off at pricing page
- Users bouncing after seeing price
- Low conversion on paid tiers vs. free

**Optimization Tactics**:

- Anchoring: Show original price ($199) vs. sale ($99)
- Payment plans: "$49/mo" vs. "$588/year" (monthly feels cheaper)
- Money-back guarantee: "30-day risk-free trial"
- Value framing: "$3/day" vs. "$1,095/year"

---

## 2. Prioritization Frameworks {#prioritization}

### RICE Scoring (for Experiment Prioritization)

```
RICE Score = (Reach × Impact × Confidence) / Effort

Where:
- Reach: Number of users affected per quarter
- Impact: Expected improvement (0.25 = minor, 1 = significant, 3 = transformative)
- Confidence: How certain are you? (50%, 80%, 100%)
- Effort: Person-months required
```

**Example**:

```
Hypothesis: Add social proof (testimonials) to pricing page

Reach: 15,000 visitors/quarter
Impact: 1 (expect 15-20% CR lift based on industry benchmarks)
Confidence: 80% (proven tactic, similar products saw gains)
Effort: 0.5 person-months (design + dev)

RICE = (15,000 × 1 × 0.8) / 0.5 = 24,000
```

**Threshold**: RICE > 10,000 = High Priority

### PIE Scoring (for Page Prioritization)

```
PIE = (Potential + Importance + Ease) / 3

Where:
- Potential (1-10): Room for improvement (current CR vs. benchmark)
- Importance (1-10): Traffic volume & business value
- Ease (1-10): How simple to implement
```

**Example: Homepage**

```
Potential: 7 (current CR = 3%, industry avg = 5%)
Importance: 10 (highest traffic, top of funnel)
Ease: 6 (requires design + A/B test setup)

PIE = (7 + 10 + 6) / 3 = 7.7 → High Priority
```

**Prioritization Matrix**:

- PIE ≥ 8: Must Test
- PIE 6-8: Should Test
- PIE 4-6: Nice to Have
- PIE <4: Skip

---

## 3. Psychology of Persuasion {#persuasion-psychology}

### Cialdini's 7 Principles Applied to CRO

#### Principle 1: Reciprocity

**Application**:

- Free trial/freemium (give value, get conversion)
- Lead magnets (eBook, template in exchange for email)
- Free shipping on orders >$X (increases AOV)

**Example**: Dropbox gave 500MB free storage for each referral → 4M users in 15 months

#### Principle 2: Commitment & Consistency

**Application**:

- Multi-step forms (get email first, then more details)
- LinkedIn's profile strength bar (80% → strong urge to finish)
- Micro-conversions before macro (download, share, then buy)

**Example**: SaaS freemium → 60% more likely to upgrade after 7-day active usage

#### Principle 3: Social Proof

**Application**:

- "5,000+ happy customers"
- ⭐⭐⭐⭐⭐ (4.9/5 from 2,341 reviews)
- "Join 10K marketers" (community language)

**Example**: Booking.com "X people booked this hotel in last 24 hours" → 12% CR lift

#### Principle 4: Authority

**Application**:

- Expert endorsements: "Recommended by [industry leader]"
- Certifications: ISO, GDPR, SOC 2
- Media logos: "As seen on Forbes, TechCrunch"

**Example**: "9 out of 10 dentists recommend" (authority figures)

#### Principle 5: Liking

**Application**:

- Relatable brand story (startup → success journey)
- User-centric design (beautiful, intuitive)
- Brand values alignment (sustainability, diversity)

**Example**: TOMS Shoes "buy one, give one" → likeable mission → 95M shoes donated

#### Principle 6: Scarcity & Urgency

**Application**:

- "Only 3 left in stock!" (scarcity)
- "Sale ends in 2 hours" (urgency + countdown timer)
- "Limited spots available" (exclusive access)

**Example**: Amazon lightning deals → 30% higher CTR with timers

**⚠️ Ethical Warning**: Never create false scarcity. Use real inventory/time constraints.

#### Principle 7: Unity

**Application**:

- "For startup founders, by startup founders"
- "Join 50K marketers in our community"
- VIP/membership exclusive language

**Example**: Harley-Davidson HOG (owners group) → tribal loyalty → premium pricing power

---

## 4. A/B Testing & Experimentation {#ab-testing}

### Hypothesis Template

```
Because we observed [DATA/INSIGHT],
We believe that [CHANGE]
Will cause [OUTCOME]
We'll measure this using [METRIC]
```

**Example**:

```
Because we observed (via heatmaps) that only 12% of users scroll past hero section,
We believe that adding a "How It Works" video above the fold
Will cause increased engagement and understanding,
We'll measure this using average scroll depth and conversion rate.
```

### Statistical Rigor

**Minimum Sample Size**:

```
For baseline CR = 5%, detecting 10% relative lift (0.5pp absolute)
Power = 80%, Significance = 95%
Required: ~32,000 visitors per variant
```

**Significance Threshold**:

- **p-value < 0.05** (95% confidence)
- Minimum runtime: 1 full week (captures weekly patterns)
- Avoid peeking (check results only at planned intervals)

### What to Test (Priority Order)

1. **Headlines & Value Props** (highest impact)
2. **CTA Copy & Design** ("Get Started Free" vs. "Start Free Trial")
3. **Social Proof Placement** (above fold vs. below)
4. **Pricing Display** (monthly vs. annual, anchoring)
5. **Form Length** (3 fields vs. 7 fields)
6. **Images/Videos** (hero visuals, product demos)

### Test Velocity Targets

- **Startup (<1M visitors/mo)**: 2-3 tests/month
- **Growth Stage (1-5M visitors/mo)**: 4-6 tests/month
- **Enterprise (>5M visitors/mo)**: 8-12 tests/month

---

## 5. Funnel Analysis & Optimization {#funnel-analysis}

### Standard E-Commerce Funnel

```
Homepage → Product Page → Add to Cart → Checkout → Payment → Complete

Benchmark Conversion Rates:
- Homepage → Product: 30-40%
- Product → Cart: 5-10%
- Cart → Checkout: 30-40%
- Checkout → Payment: 70-80%
- Payment → Complete: 80-90%

Overall: 0.5-2% (new visitor → buyer)
```

### Leak Diagnosis Process

**Step 1: Identify Biggest Drop**

- Use analytics funnel visualization
- Find stage with lowest CR

**Step 2: Quantify Impact**

```
If Homepage → Product CR increases from 35% to 40%:
100,000 visitors × 0.05 (5pp increase) = 5,000 more product page views
5,000 × 5% product→cart × 70% checkout→payment = ~175 extra orders
```

**Step 3: Hypothesize Causes**

- Heatmaps: Are users clicking expected elements?
- Session Replays: Any errors, confusion?
- User Tests: "What prevented you from continuing?"

**Step 4: Test Solutions**

- Design A/B tests targeting identified issues
- Prioritize using RICE/PIE

---

## Capability Maturity Model

| Capability | Level 1 (Basic) | Level 2 (Intermediate) | Level 3 (Advanced) | Level 4 (Expert) |
|------------|-----------------|------------------------|---------------------|------------------|
| **CRO Frameworks** | Aware of RICE/PIE | Uses one framework consistently | Applies multiple frameworks | Custom frameworks for unique scenarios |
| **Persuasion Psychology** | Knows Cialdini principles | Applies 2-3 principles | Applies all 7 systematically | Combines with cognitive biases |
| **A/B Testing** | Runs basic tests | Statistically rigorous | High velocity (4+/mo) | Multivariate, Bayesian stats |
| **Funnel Analysis** | Tracks funnels | Identifies leaks | Diagnoses root causes | Predictive leak prevention |

**Current Target**: Level 3-4 (Advanced to Expert) for competitive advantage.

---

**Document Owner**: Conversion Team  
**Review Frequency**: Quarterly  
**Next Review**: 2026-04-10
