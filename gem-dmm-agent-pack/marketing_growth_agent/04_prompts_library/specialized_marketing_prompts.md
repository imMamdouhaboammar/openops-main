# 💡 Specialized Prompts Library

**Collection**: Advanced prompts for specific marketing scenarios  
**Version**: 1.1.0  
**Last Updated**: January 22, 2026

---

## Strategic Prompts

### 1. Growth Strategy Development Prompt

```
Context:
- Company: [Company Name]
- Product: [Product Description]
- Current Users/Revenue: [Current Metrics]
- Target: [Growth Target]
- Timeline: [Timeline]
- Budget: [Budget Available]

Analyze and recommend:
1. Market opportunity assessment
2. Target customer segments (detailed personas)
3. Recommended primary growth channels (rank by: impact, cost, speed, feasibility)
4. 90-day growth plan with specific tactics
5. Expected CAC, LTV, and payback period
6. Key risks and mitigation strategies
7. Success metrics and tracking plan

Requirements:
- Ground recommendations in data and research
- Provide confidence levels for estimates
- Acknowledge assumptions and limitations
- Include realistic timelines and resource needs
```

### 2. Competitive Analysis Prompt

```
Context:
- Your target market: [Market Description]
- Key competitors: [List 5-7 competitors]
- Your positioning: [Your positioning statement]

Analyze:
1. Competitive positioning matrix (4-quadrant analysis)
2. Feature comparison table (your product vs competitors)
3. Pricing comparison and strategy analysis
4. Go-to-market strategy comparison
5. Competitive advantages and disadvantages
6. Unmet customer needs (gaps in market)
7. Recommended positioning and differentiation strategy
8. Market threats and opportunities

Format: Provide actionable, data-driven insights with clear strategic recommendations
```

### 3. Market Sizing Prompt

```
Task: Calculate addressable market size for [Product/Service]

Provide:
1. TAM (Total Addressable Market) - top-down and bottom-up estimates
2. SAM (Serviceable Addressable Market) - realistic addressable portion
3. SOM (Serviceable Obtainable Market) - realistic capture in Year 1, Year 3, Year 5
4. Market growth trends and dynamics
5. Competitive saturation assessment
6. Recommendation on market viability

Requirements:
- Source all estimates from identifiable sources
- Show calculation methodology
- Provide confidence range (±10-30%)
- Highlight key assumptions
```

---

## Conversion & Engagement Prompts

### 4. Landing Page Optimization Prompt

```
Current Landing Page Analysis:
- Current conversion rate: [X%]
- Current CAC: $[X]
- Target conversion rate: [X%]
- Target CAC: $[X]
- Traffic sources: [List]

Analyze and recommend:
1. Headline optimization (provide 3-5 alternatives with reasoning)
2. Value proposition clarity assessment
3. Social proof and credibility improvements
4. CTA button optimization (copy, placement, color, friction)
5. Form optimization (remove unnecessary fields)
6. Design and layout recommendations
7. A/B testing roadmap (prioritized hypothesis list)

Methodology:
- Reference conversion psychology principles
- Show expected impact of each recommendation
- Provide statistical requirements for testing
```

### 5. Email Campaign Strategy Prompt

```
Email Campaign Brief:
- Objective: [Campaign Goal]
- Target audience: [Segment Description]
- Current engagement: [Open rates, CTR, unsubscribe rate]
- Goal: [Specific target metrics]

Provide:
1. Email copy framework (subject line, body, CTA)
2. Personalization strategy
3. Segmentation recommendations
4. Send time optimization
5. A/B testing recommendations (subject line, copy, CTA, send time)
6. Expected performance benchmarks
7. Success metrics and KPIs

Constraints:
- Mobile-first design
- GDPR/CCPA compliant
- Ethical persuasion principles only
```

### 6. Customer Journey Mapping Prompt

```
Customer Profile:
- Target persona: [Persona Name and Description]
- Use case: [Primary job-to-be-done]
- Current alternatives: [How they solve today]
- Pain points: [Top 3 pain points]

Map:
1. Awareness stage - How do they discover?
2. Consideration stage - How do they evaluate?
3. Decision stage - How do they choose?
4. Onboarding stage - How do they get started?
5. Adoption stage - How do they become power users?
6. Advocacy stage - How do they refer?

For each stage:
- Relevant touchpoints
- Key messaging
- Conversion metrics
- Risk points (where they might drop off)
- Optimization opportunities
```

---

## Analytics & Measurement Prompts

### 7. KPI Definition & Dashboard Prompt

```
Product/Business Type: [e.g., B2B SaaS, E-commerce, Creator Platform]
Business Stage: [e.g., Early stage, Growth stage, Mature]
Primary Goal: [e.g., Revenue growth, User growth, Retention]

Define:
1. North Star metric (1-2 metrics)
2. Lead metrics (predict North Star 2-4 weeks ahead)
3. Lag metrics (confirm success)
4. Health metrics (to monitor)
5. Actionable metrics (metrics the team can influence directly)

For each metric:
- Definition and calculation
- Current benchmark
- Target benchmark
- Data sources and refresh frequency
- Responsible owner
- Dashboard visualization type

Include:
- 90-day look-back dashboard
- Weekly performance tracking
- Anomaly detection thresholds
- Alert rules for concerning trends
```

### 8. Attribution Modeling Prompt

```
Customer Journey Data:
- Sales cycle length: [X days/weeks]
- Typical touchpoints: [List typical sequence]
- Current platform: [GA4, Segment, Mixpanel, etc.]
- Data availability: [Describe data you have]

Recommend:
1. Appropriate attribution model (first-touch, last-touch, linear, time-decay, custom)
2. Implementation methodology
3. Multi-touch attribution framework
4. Channel contribution analysis
5. Budget allocation recommendation based on attribution

Constraints:
- Privacy-compliant (first-party data focused)
- Practical to implement with current tools
- Interpretable to non-technical stakeholders
```

---

## Market Research Prompts

### 9. Customer Interview Guide Prompt

```
Interview Goal: [e.g., Validate product-market fit, understand job-to-be-done, assess pain points]
Target Interviewee: [Detailed persona]
Interview Duration: [Typically 30-45 minutes]

Create:
1. 10-15 structured interview questions
2. Follow-up probes for each question
3. Questions ordered by: warm-up → core questions → deep-dive → cool-down
4. Scoring rubric for assessment
5. Analysis framework post-interview

Requirements:
- Open-ended questions (avoid yes/no)
- Questions focus on current behavior (not future intentions)
- Include questions about competing solutions
- Assess willingness-to-pay
- Understand job-to-be-done deeply
```

### 10. Persona Development Prompt

```
Market & Product Context:
- Product: [Product Description]
- Business Type: [B2B, B2C, etc.]
- Target market: [Market Description]
- Existing customer data: [If available]

Develop [3-5] detailed personas including:

For each persona:
1. Background & demographics
2. Goals and motivations
3. Pain points and frustrations
4. Current solutions and alternatives
5. Decision criteria
6. Communication preferences
7. Objections and concerns
8. Buying cycle and process
9. Willingness-to-pay range
10. Success metrics for them

Include:
- Prioritization (primary, secondary, tertiary personas)
- Persona naming and archetype
- Motivation matrix
- Customer journey for each persona
```

---

## Content & Creative Prompts

### 11. Content Strategy Framework Prompt

```
Business Context:
- Product/Service: [Description]
- Target audience: [Persona]
- Current content: [Existing content, if any]
- Goals: [Traffic, leads, brand, retention, etc.]
- Timeline: [6-month, 12-month, etc.]

Develop:
1. Content marketing strategy and positioning
2. Content pillars (3-5 main topics)
3. Content map by funnel stage:
   - Top-of-funnel (awareness): Topics, formats
   - Middle-of-funnel (consideration): Topics, formats
   - Bottom-of-funnel (decision): Topics, formats
4. Content calendar (30-60 days detailed, 6-month roadmap)
5. Keywords and SEO strategy for each piece
6. Distribution channels and promotion strategy
7. Content performance metrics and tracking
8. Resource plan (team, tools, timeline)

Includes:
- Specific content ideas (15-20 pieces)
- Blog post titles and headlines
- Keywords and search intent
- Internal linking strategy
```

### 12. Copywriting Framework Prompt

```
Context:
- Product/Service: [Description]
- Target persona: [Persona Name]
- Primary benefit: [Core benefit]
- Use case: [Specific use case]
- Emotional drivers: [What emotionally motivates them?]

Create:
1. Headline (benefit-focused, curiosity, or urgency-based)
2. Subheadline (elaborate and add credibility)
3. Body copy structure:
   - Hook (problem statement)
   - Agitate (make pain point vivid)
   - Solve (your solution)
   - Social proof (case study or stat)
   - CTA (action-focused)
4. CTA copy (3 variations with different angles)
5. Objection handling (address top 3 objections)

Principles:
- Benefit-driven (not feature-driven)
- Clear value proposition
- Emotional resonance with persona
- Urgency or scarcity (if appropriate)
- Trust and credibility signals
```

---

## Growth Hacking Prompts

### 13. Execution-First Growth Loop Prompt

```
Context:
- Product/Service: [Description]
- Target user: [Exact persona]
- Surface: [Exact surface where this appears]
- Constraint: [Budget/time/tool limits]

Output ONLY in this format for each idea (5–10 ideas):
1. Trigger: [include who it ships to + where it appears]
2. Action: [include observable behavior change + MVP (1-day) / MVP++ (1-week) / Not Built]
3. Reward: [what user gets immediately]
4. Friction: [primary friction point]
5. Metric: [one metric only]
6. Failure Mode: [include cheating behavior, misuse/bypass, why users won’t do it, what they try once and abandon, what power users exploit, what lazy users avoid, and what happens if it fails publicly]

Rules:
- If it can’t be validated within 7–14 days, it’s invalid.
- Name the first 20 users (or state they are unknown and request them).
- Use low-prestige channels and manual founder work where possible.
```

### 14. Viral Loop Design Prompt

```
Product Context:
- Product/Service: [Description]
- Current user base: [X users]
- Growth target: [Y% monthly growth]
- Network effects: [Does product get better with more users?]

Design viral loops:
1. Core user action (the behavior we want to spread)
2. Invitation mechanism (how do users invite others?)
3. Value transfer (what value is transferred to invited user?)
4. Network effect (does product improve as network grows?)
5. Viral coefficient calculation (k value)
6. Conversion funnel (% who invite, % who accept, % who activate)
7. Viral doubling time estimate

Analyze:
- Is k > 1 (truly viral) or k < 1 (requires paid)?
- How to increase viral coefficient?
- Psychological triggers used
- Incentive structure (do both parties benefit?)

Provide:
- Detailed implementation plan
- Expected viral speed estimate
- Required supporting tactics (paid, content, PR)
```

### 15. Product-Market Fit Assessment Prompt

```
Current Product State:
- Product: [Description]
- Users: [X monthly active users]
- Revenue/Usage: [Current metrics]
- Stage: [How long in market?]
- Customer feedback: [Describe current sentiment]

Assess PMF across:
1. Customer excitement level (surveys, NPS)
2. Retention rate (week-1, month-1, month-3)
3. Churn rate and churn drivers
4. Referral rate and organic growth
5. Pricing power and willingness-to-pay
6. Competitive position and defensibility
7. Revenue sustainability

Scoring:
- Green (strong PMF signals)
- Yellow (mixed signals)
- Red (concerning signals)

Recommendations:
- If strong: Scaling strategies
- If mixed: Areas to strengthen
- If weak: Pivot or iteration priorities
```

### 16. 30-Day Acquisition Sprint Prompt (Daily Actions)

```
Context:
- Product/Service: [Description]
- Target persona: [Exact persona]
- Surface focus: [Slack/Chrome/Email/LinkedIn/etc.]
- Constraints: [Budget/time/team]

Deliver:
1. 30-day plan with DAILY actions (one action per day).
2. Each daily action must use the Trigger → Action → Reward → Friction → Metric → Failure Mode format.
3. Include kill metric and day-14 failure definition for each week’s top experiment.
4. Ensure each action ties to one user action and one metric only.
```

### 17. Dirty Experiments List Prompt

```
Context:
- Product/Service: [Description]
- Target persona: [Exact persona]
- Constraint: [Budget/time]

Deliver:
1. 5 ugly experiments using low-prestige channels or manual founder work.
2. For each experiment, use the Trigger → Action → Reward → Friction → Metric → Failure Mode format.
3. Provide kill metric and day-14 failure definition for each experiment.
```

---

## Advanced Prompts

### 18. Growth Audit Prompt

```
Company Overview:
- Product: [Description]
- Current stage: [Bootstrapped, Seed, Series A, etc.]
- Current metrics: [Users, ARR, Churn, etc.]
- Team size: [Marketing, Product, Sales team sizes]

Conduct comprehensive audit:

ACQUISITION:
1. Current CAC by channel
2. ROAS by channel
3. Opportunities to reduce CAC
4. Untapped channels

ACTIVATION:
1. Onboarding completion rate
2. Aha! moment clarity
3. First-day experience quality
4. Time-to-value assessment

RETENTION:
1. Cohort retention curves
2. Churn rate by segment
3. Engagement trends
4. Churn drivers

REVENUE:
1. ARPU or pricing strategy
2. Upsell/cross-sell performance
3. Expansion revenue opportunities
4. LTV vs CAC ratio

REFERRAL:
1. Referral program performance (if any)
2. Organic growth rate
3. NPS and advocacy potential
4. Network effects

Provide:
- Prioritized opportunities (20-30 specific ideas)
- Quick wins (implement in <1 week)
- Medium-term improvements (1-3 months)
- Long-term strategic shifts (3+ months)
```

---

**These prompts are templates to be customized with specific company data and context.**

**Always combine with:**
- Current data and metrics
- Team capabilities and constraints
- Budget and resource limitations
- Timeline and priorities
- Competitive and market context
