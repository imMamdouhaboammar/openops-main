# PR-08 Prompt: Headline Generation & Testing

**LLM Prompt - Processing Node PR-08**
**Model**: Claude 3.5 Sonnet
**Purpose**: Generate 5+ winning headline variants
**Duration**: 5 minutes
**Token Budget**: 2000-3000

---

## System Prompt

You are an elite copywriter specializing in high-converting headlines. You understand:

- Headline psychology (curiosity, urgency, benefit, proof)
- A/B testing principles (creating differentiable variants)
- Conversion optimization (moving prospect through AIDA)
- The specific triggers that convert in this audience

Your job is to create 5 distinct headline variants, each testing a different psychological angle.

---

## User Prompt Template

```
I need 5 distinct headline variants to A/B test on my landing page.

MESSAGING STRATEGY:
- Primary message: {primary_message}
- Supporting messages: {supporting_messages}
- Emotional journey: {emotional_journey}
- Framework: {framework}
- Positioning: {positioning}

AUDIENCE PSYCHOLOGY:
- Primary motivators: {motivators}
- Key triggers: {triggers}
- Objections: {objections}
- Language patterns: {language_patterns}

BUSINESS CONTEXT:
- Product: {product}
- Industry: {industry}
- Price: {price}
- Target: {target_role}
- Goal: {conversion_goal}

PRODUCT STRENGTHS:
- Key differentiator: {differentiator}
- Main benefit: {benefit}
- Proof points: {proof}
- Company data: {data}

TASK:
Create 5 headlines, each testing a different psychological angle:

1. BENEFIT-FOCUSED HEADLINE
   - Leads with primary benefit
   - Uses audience language
   - Creates curiosity
   - Format: [Benefit] + [Outcome]
   - Psychological angle: Desire for positive outcome

2. PROBLEM-FOCUSED HEADLINE
   - Acknowledges their pain point
   - Creates recognition/relief
   - Uses their language
   - Format: [Problem statement] → [Implication]
   - Psychological angle: Identity + shared struggle

3. PROOF/SOCIAL HEADLINE
   - Leads with social proof
   - Builds credibility
   - Creates FOMO
   - Format: [Number/Type] + [Who] + [Benefit]
   - Psychological angle: Social proof + proof

4. CURIOSITY/INTRIGUE HEADLINE
   - Creates curiosity gap
   - Promises insight
   - Makes them want to read body
   - Format: [Pattern interrupt] + [Promise]
   - Psychological angle: Curiosity + perceived value

5. EASE/TRANSFORMATION HEADLINE
   - Emphasizes simplicity
   - Removes barriers
   - Implies achievable success
   - Format: [Outcome] + [Ease signal]
   - Psychological angle: Hope + low risk

For each headline, provide:
- Psychological angle being tested
- Why this angle appeals to your audience
- Expected response (vs control)
- What to watch for in metrics

Format as JSON.
```

---

## Example Input

```
Business: DataFlow Analytics
Primary Message: "Real-time e-commerce analytics without complexity"
Supporting Messages:
  - "15-minute setup"
  - "500+ companies using it"
  - "35% average revenue increase"

Audience Motivators:
  1. Prove ROI to executives
  2. Make faster decisions
  3. Look innovative

Differentiator: Easy, real-time, e-commerce focused
Current Conversion: 2.5%
Target: 5%+
```

---

## Expected Output

```json
{
  "test_name": "DataFlow - Landing Page Headline Test #1",
  "control_headline": "Real-time E-commerce Analytics",
  "variants": [
    {
      "variant": "A",
      "type": "BENEFIT-FOCUSED",
      "headline": "Turn E-commerce Data Into Real Decisions",
      "psychological_angle": "Outcome focus - transforms data (commodity) to decisions (valuable)",
      "why_works": "VPs care about decisions, not data",
      "expected_lift": "+15-25%",
      "metric_to_watch": "Click-through rate, form completion"
    },
    {
      "variant": "B", 
      "type": "PROBLEM-FOCUSED",
      "headline": "Stop Guessing on E-commerce Metrics",
      "psychological_angle": "Problem recognition + shared struggle",
      "why_works": "Creates immediate recognition ('That's me!')",
      "expected_lift": "+10-20%",
      "metric_to_watch": "Bounce rate (should decrease), time on page"
    },
    {
      "variant": "C",
      "type": "PROOF/SOCIAL",
      "headline": "How 500+ E-commerce Companies Increased Revenue 25-35%",
      "psychological_angle": "Social proof + tangible ROI proof",
      "why_works": "VPs want to know peers succeeded + want proof",
      "expected_lift": "+5-15%",
      "metric_to_watch": "Conversion rate (high-value indicator)"
    },
    {
      "variant": "D",
      "type": "CURIOSITY/INTRIGUE",
      "headline": "The Real Reason 63% of E-commerce Teams Miss Revenue Opportunities",
      "psychological_angle": "Pattern interrupt + curiosity gap + implied solution",
      "why_works": "Stops scroll, creates desire to learn, implies their problem",
      "expected_lift": "+10-20%",
      "metric_to_watch": "Click rate, scroll depth"
    },
    {
      "variant": "E",
      "type": "EASE/TRANSFORMATION",
      "headline": "Real-time Analytics (15-Minute Setup, No Data Team Required)",
      "psychological_angle": "Removes barrier to adoption + suggests transformation",
      "why_works": "Objection handling in headline + easy = lower risk",
      "expected_lift": "+8-18%",
      "metric_to_watch": "Trial signups (should increase)"
    }
  ],
  "testing_recommendations": {
    "sample_size": "2,500 visitors per variant (12,500 total)",
    "duration": "14 days",
    "primary_metric": "Conversion rate",
    "secondary_metrics": ["CTR", "Bounce rate", "Time on page"],
    "confidence_threshold": "95%",
    "decision_rule": "First variant reaching 95% confidence wins"
  }
}
```

---

## Quality Checklist

✅ 5 distinct angles (no variants are too similar)
✅ Each uses different psychological trigger
✅ All grounded in audience motivators
✅ All use audience language patterns
✅ Each is specific to industry/product
✅ Clear why each angle should work
✅ Testable and differentiable

---

## Pro Tips for High-Converting Headlines

1. **Benefit vs Feature**: Always lead with benefit ("Decisions" not "Data")
2. **Audience Language**: Use exact words they use to describe problems
3. **Specificity**: Numbers outperform general claims (35% vs "significant")
4. **Clarity First**: Clever doesn't work; clear wins. Always.
5. **Objection Removal**: Great headlines address top objection in headline
6. **AIDA Alignment**: Where in AIDA funnel? (Attention, Interest, Desire, Action)

---

**Next Use**: Winning headlines feed to PR-09 (Body Copy)
