# PR-09 Prompt: Body Copy & Persuasive Framework

**LLM Prompt - Processing Node PR-09**
**Model**: Claude 3.5 Sonnet
**Purpose**: Generate high-converting body copy
**Duration**: 5 minutes
**Token Budget**: 3000-4000

---

## System Prompt

You are an elite conversion copywriter specializing in B2B SaaS and e-commerce. You understand:

- How to move prospects through the AIDA framework
- How to use emotional language + logical proof
- How to address objections before they arise
- How to structure copy for maximum conversion
- Cialdini's principles of influence

Your job is to write body copy that moves the prospect from problem recognition → desire → action.

---

## User Prompt Template

```
I need persuasive body copy for my landing page.

HEADLINE (winning):
{winning_headline}

BUSINESS CONTEXT:
- Product: {product_name}
- Industry: {industry}
- Price: {price}
- Audience: {audience_role}
- Goal: {conversion_goal}

MESSAGING STRATEGY:
- Primary message: {primary_message}
- Supporting messages: {supporting_messages}
- Emotional journey: {emotional_journey}

AUDIENCE PSYCHOLOGY:
- Primary motivators: {motivators}
- Primary pain: {pain}
- Key objections: {objections}
- Decision triggers: {triggers}

PRODUCT PROOF:
- Key differentiators: {differentiators}
- Case study data: {case_study}
- Customer testimonials: {testimonials}
- Social proof: {social_proof}

TASK:
Write body copy that:

1. OPENS WITH RECOGNITION
   - Acknowledge their specific pain point
   - Use their language
   - Create "that's me" moment
   - 1-2 sentences max

2. DEEPENS THE PROBLEM
   - Paint the consequence of inaction
   - Show what they're losing
   - Make it emotional + logical
   - 2-3 sentences

3. INTRODUCES THE SOLUTION
   - Show how you solve it differently
   - Lead with benefit (not feature)
   - Address top objection immediately
   - 2-3 sentences

4. BUILDS PROOF
   - Use specific data/results
   - Include customer names (if public)
   - Show transformation
   - 3-4 sentences

5. REMOVES BARRIERS
   - Address remaining objections
   - Show how easy it is
   - Remove risk
   - 2-3 sentences

6. CREATES URGENCY
   - Limited spots / time
   - Window closing
   - Not pushy - just real
   - 1-2 sentences

7. CALLS TO ACTION
   - Clear next step
   - Low friction (free trial)
   - Guarantee/assurance
   - 1-2 sentences

Structure: Problem → Solution → Proof → Action

Keep sentences SHORT. Paragraphs 2-3 sentences max.
Use short words. Avoid jargon.
Focus on transformation not features.

Return as valid JSON with sections clearly labeled.
```

---

## Example Input

```
Headline: "Turn E-commerce Data Into Real Decisions"

Business: DataFlow Analytics
Audience: VP Marketing
Pain: Scattered data, slow insights, manual work
Proof: 500+ customers, 35% revenue increase
Objection: "Another tool to manage"
```

---

## Expected Output

```json
{
  "body_copy_version": "1.0",
  "sections": {
    "opening_recognition": {
      "text": "You're making decisions on yesterday's data.\nBy the time reports run, the sales are already gone.",
      "framework": "Problem identification",
      "psychology": "Mirror their reality - creates immediate resonance"
    },
    "deepen_problem": {
      "text": "That's because traditional analytics tools are built for data scientists, not marketing teams.\nSo you're either waiting days for insights, learning SQL to get answers, or just guessing.\nNone of those feel good when your bonus is tied to revenue.",
      "framework": "Consequence painting + emotional hook",
      "psychology": "Shows stakes (bonus) and false choices (waiting/learning/guessing)"
    },
    "introduce_solution": {
      "text": "DataFlow is different.\nIt's real-time analytics built specifically for e-commerce. No SQL. No complexity. Just answers.\nConnect your data sources and get answers in 15 minutes.",
      "framework": "Benefit-first positioning + objection handling (no setup friction)",
      "psychology": "Removes barrier immediately (15 min) + emphasizes ease"
    },
    "build_proof": {
      "text": "Over 500 e-commerce teams (including Warby Parker, Bonobos, Cratejoy) have already switched.\nOn average, they're increasing revenue 25-35% by making faster, better-informed decisions.\nWhy? Because real-time data means real-time decisions.",
      "framework": "Social proof + case study data + benefit quantification",
      "psychology": "Names they know + specific percentage + causation"
    },
    "remove_barriers": {
      "text": "Worried about integration? Works seamlessly with Shopify, Stripe, BigCommerce, WooCommerce, and 200+ data sources.\nConcerned about learning curve? Most teams are productive in their first hour.\nNot convinced it's worth the investment? Keep it running for 30 days risk-free. If not satisfied, we refund completely.",
      "framework": "Objection handling + assurance/guarantee",
      "psychology": "Addresses 3 main objections with proof + removes all risk"
    },
    "create_urgency": {
      "text": "We limit beta spots to ensure every team gets dedicated support.\nOnly 3 spots remaining for this month.",
      "framework": "Scarcity + urgency",
      "psychology": "Creates time pressure without being aggressive"
    },
    "call_to_action": {
      "text": "Claim Your Spot → Start Your Free Trial\n(14-day access, no credit card required)",
      "framework": "Clear action + low friction + reassurance",
      "psychology": "Reduces commitment friction (no CC) + makes action easy"
    }
  },
  "copy_metrics": {
    "word_count": 187,
    "readability_level": "7th grade",
    "emotional_appeals": 4,
    "logical_proofs": 3,
    "objections_addressed": 3,
    "estimated_conversion_impact": "Should increase CR 50-100% over generic copy"
  },
  "design_notes": {
    "formatting": "Short sentences, 1-2 per paragraph",
    "emphasis": "Bold key numbers and benefits",
    "flow": "Problem → Solution → Proof → Action",
    "voice": "Conversational, peer-to-peer (not corporate)",
    "cta_placement": "Multiple CTAs (after proof section and bottom)"
  }
}
```

---

## Copy Formulas by Context

### Email Copy
```
Subject (CURIOSITY): [Number/Question] + [Benefit/Problem]
Opening (RECOGNITION): One sentence acknowledging their situation
Body (PROOF): 2-3 results/benefits with social proof
CTA (ACTION): One clear next step

Example:
Subject: The one metric predicting your revenue (it's not what you think)
Body: VP marketers are struggling with [problem]. We found that [insight]. 
This is why [proof]. Try it free →
```

### Ad Copy  
```
Headline: [Benefit] + [Specificity] (5 words max)
Body: [Problem solved] + [How] + [Proof] (15 words max)
CTA: One action (Sign up / Learn more / Get free trial)

Example:
Headline: Real-time analytics, 15-min setup
Body: Stop guessing on revenue metrics. 500+ teams using DataFlow.
CTA: Try free →
```

### Landing Page
```
Hero section: Problem headline + subheading + CTA
Body section: Pain deeper + solution introduced
Proof section: Case studies + testimonials + data
Objection section: FAQ or proof carousel
CTA section: Clear action + guarantee
```

---

## Quality Checklist

✅ Specific to this audience (not generic B2B copy)
✅ Addresses 3+ objections proactively
✅ Uses prospect's language patterns
✅ Balances emotion + logic
✅ Leads with benefit, supports with features
✅ Includes specific proof points (numbers, names)
✅ Easy to read (short sentences)
✅ Clear value proposition in first sentence
✅ Strong, low-friction CTA

---

**Next Use**: Body copy + headlines feed to PR-10 (CTA Optimization)
