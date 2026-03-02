# PR-01 Prompt: Audience Deep Dive Analysis

**LLM Prompt - Processing Node PR-01**
**Model**: Claude 3.5 Sonnet
**Purpose**: Create comprehensive audience psychology profile
**Duration**: 5 minutes
**Token Budget**: 2000-3000

---

## System Prompt

You are an expert behavioral psychologist and conversion copywriter specializing in decision engineering. Your role is to analyze audience psychology and identify the psychological triggers that drive purchase decisions.

Your analysis should be grounded in:
- Cialdini's 7 principles of influence
- Behavioral economics research
- Cognitive psychology
- Real-world customer language patterns

---

## User Prompt Template

```
I need a deep psychological profile of my target audience for 
conversion optimization.

BUSINESS CONTEXT:
- Product: {product_name}
- Industry: {industry}
- Price point: {price}
- Target audience role: {role}
- Company size: {company_size}
- Revenue model: {model}

AUDIENCE INFORMATION PROVIDED:
- Demographics: {demographics}
- Job responsibilities: {responsibilities}
- Common pain points: {pain_points}
- Desired outcomes: {desired_outcomes}
- Current solution: {current_solution}
- Decision timeline: {timeline}

TASK:
Analyze this audience and provide:

1. PRIMARY MOTIVATORS (list 5-7)
   For each motivator, identify:
   - The core need
   - Why it matters to this person
   - Emotional driver
   - How common (frequency)
   - How intense (1-10 scale)

2. PSYCHOLOGICAL TRIGGERS
   For each, explain why it works with this audience:
   - Social Proof (what type?)
   - Authority (which authority?)
   - Scarcity (what creates it?)
   - Urgency (what's time pressure?)
   - Reciprocity (what to give first?)
   - Commitment (what's easy start?)
   - Liking (personal connection?)

3. OBJECTIONS & BLOCKS
   For each common objection:
   - Why it matters to this person
   - Frequency (how often heard?)
   - Psychological root
   - Counterargument
   - Proof needed

4. LANGUAGE PATTERNS
   How does this audience talk about:
   - Their problems (exact words)
   - Desired solutions (exact words)
   - Success metrics (exact words)
   - Your competitors (exact language)
   - Implementation concerns (exact phrasing)

5. DECISION JOURNEY
   Map the decision stages:
   - Awareness: What triggers awareness?
   - Consideration: What builds trust?
   - Decision: What reduces risk?
   - Advocacy: What creates champions?

Format your response as valid JSON with clear structure.
```

---

## Example Input

```
Business Context:
- Product: DataFlow Analytics Platform
- Industry: B2B SaaS - E-commerce
- Price: $299/month
- Target Audience: VP Marketing
- Company Size: $10-100M ARR
- Model: Subscription

Audience:
- Demographics: Age 35-50, 10+ years experience
- Responsibilities: Lead marketing team, prove ROI, drive growth
- Pain Points: Scattered data, slow insights, manual work
- Outcomes: Faster decisions, prove revenue impact, look innovative
- Current: Multiple tools, manual reporting
- Decision Timeline: 2-4 weeks
```

---

## Expected Output

```json
{
  "audience_id": "vp_marketing_ecommerce",
  "primary_motivators": [
    {
      "rank": 1,
      "motivator": "Prove marketing ROI to executives",
      "why_matters": "VPs are judged on revenue contribution, not effort",
      "emotional_driver": "Career advancement, job security",
      "frequency": "Daily",
      "intensity": 9
    },
    {
      "rank": 2,
      "motivator": "Make faster decisions than competitors",
      "why_matters": "In e-commerce, speed = market share",
      "emotional_driver": "Control, competitiveness",
      "frequency": "Ongoing",
      "intensity": 8
    }
  ],
  "triggers": {
    "social_proof": {
      "type": "Customer case studies",
      "why_works": "VPs want to know peers are using it successfully",
      "specificity": "Revenue impact (e.g., '25% increase'), company names if possible"
    },
    "authority": {
      "type": "Industry recognition",
      "why_works": "Featured in marketing publications they read",
      "specificity": "Forbes, TechCrunch, CMO Council mentions"
    }
  },
  "objections": [
    {
      "objection": "Another tool to manage",
      "frequency": "High",
      "psychological_root": "Decision fatigue, tool overload",
      "counter": "Consolidates 3-5 existing tools into one",
      "proof": "Feature comparison showing what gets replaced"
    }
  ],
  "language_patterns": {
    "pain_language": ["scattered data", "slow reports", "manual work", "siloed metrics"],
    "desire_language": ["real-time insights", "single source of truth", "faster decisions"],
    "success_language": ["prove ROI", "revenue increase", "speed to insight", "team enablement"],
    "competitor_language": ["complex", "expensive", "overkill", "requires data team"]
  },
  "decision_journey": {
    "awareness": "Need for better e-commerce insights emerges",
    "consideration": "Research solutions, talk to peers, request demo",
    "decision": "Try free trial, see results in practice",
    "advocacy": "Show team results, recommend to peers"
  }
}
```

---

## Quality Checklist

✅ Motivators grounded in psychological theory (not generic)
✅ Each motivator connected to emotional driver
✅ Triggers mapped to Cialdini's principles
✅ Objections with psychological roots identified
✅ Language patterns from actual user research (if available)
✅ Decision journey realistic for this buyer
✅ Output focuses on what drives THIS audience (not general advice)

---

**Next Use**: Feed this output to PR-05 (Messaging Strategy)
