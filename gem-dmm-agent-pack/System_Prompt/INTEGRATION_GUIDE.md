# Integration Guide: Goal-Constrained Reasoning + Marketing Agent

**Version:** 1.0.0  
**Created:** 2026-02-15

---

## Overview

This guide explains how the goal-constrained reasoning architecture (in `System_Prompt/`) integrates with the digital marketing agent's 7-stage state machine.

**Key Insight:** The architecture is NOT a replacement for the marketing agent—it's the **reasoning engine** that powers it.

---

## Architecture Integration Map

### State Machine Mapping

| Marketing Stage | Architecture Module | Purpose | Integration Point |
|----------------|-------------------|---------|------------------|
| **Stage 0: Safety & Scope** | `input_preprocessor` | Normalize request, detect entities | Extracts business model, geography, initial constraints |
| **Stage 1: Discovery** | `goal_extractor` | Identify true business objective | Maps discovery answers to primary_goal |
| **Stage 2: CQ Lock** | `constraint_parser` | Extract budget, timeline, ICP constraints | Validates CQ completeness against constraint requirements |
| **Stage 3: Research** | `feasibility_validator` | Validate channel options against constraints | Tests evidence-backed recommendations for feasibility |
| **Stage 4: Strategy** | `frame_corrector` + `reasoning_engine` | Reframe invalid questions, rank valid options | Generates structured strategy with constraint-grounded reasoning |
| **Stage 5: Execution** | `answer_generator` | Compose phased execution plan | Structures recommendations with clear next steps |
| **Stage 6: Measurement** | `output_checker` | Verify metrics align with goal | Ensures measurement spec satisfies primary_goal |
| **Stage 7: QA** | `output_checker` | Final consistency check | Validates no invalid recommendations, goal alignment |

---

## Integration Points in Detail

### Stage 0-1: Discovery → Goal Extraction

**Marketing Agent Behavior:**

```
Stage 0: "What outcome do you want in the next 90 days?"
Stage 1: Discovery interview (≤5 questions per round)
```

**Architecture Integration:**

```json
{
  "module": "input_preprocessor",
  "inputs": {
    "raw_user_input": "We want more leads for our B2B SaaS"
  },
  "outputs": {
    "normalized_text": "Generate leads for B2B SaaS product",
    "detected_entities": ["B2B", "SaaS", "leads"],
    "detected_options": [],
    "ambiguity_flags": ["goal_type_unclear", "lead_definition_missing"]
  }
}

{
  "module": "goal_extractor",
  "inputs": {
    "normalized_text": "Generate leads for B2B SaaS product",
    "detected_entities": ["B2B", "SaaS", "leads"]
  },
  "outputs": {
    "primary_goal": "UNCLEAR - needs clarification",
    "secondary_goals": [],
    "goal_confidence_score": 0.3
  },
  "validation_result": "FAILED - R1_primary_goal_required",
  "action": "request_clarification"
}
```

**Marketing Agent Response:**

```
Before I recommend tactics, I need to understand your goal more precisely:

1. What type of leads do you want?
   - Demo requests from qualified prospects?
   - Free trial signups?
   - Content downloads (top-of-funnel)?

2. What defines a "qualified" lead for you?
   - Company size?
   - Industry?
   - Job title?

3. What are your constraints?
   - Monthly marketing budget?
   - Timeline to see results?
   - Team size and capabilities?
```

---

### Stage 2: CQ Lock → Constraint Parsing

**Marketing Agent Behavior:**

```
Stage 2: Formulate and confirm one Core Question (CQ)
CQ must include: core_question, success_metric, baseline, target, time_horizon_days, icp, constraints
```

**Architecture Integration:**

```json
{
  "module": "constraint_parser",
  "inputs": {
    "primary_goal": "Generate 50 qualified demo requests per month",
    "normalized_text": "Budget $10K/month, need results in 60 days, 1 marketing manager",
    "detected_entities": ["$10K", "60 days", "1 marketing manager", "50 demos/month"]
  },
  "outputs": {
    "constraints": [
      {
        "type": "budget",
        "value": "$10,000/month",
        "mandatory": true,
        "linked_goal_id": "primary_goal"
      },
      {
        "type": "timeline",
        "value": "60 days to initial results",
        "mandatory": true,
        "linked_goal_id": "primary_goal"
      },
      {
        "type": "team",
        "value": "1 marketing manager, no agency",
        "mandatory": true,
        "linked_goal_id": "primary_goal"
      }
    ],
    "required_entities": ["landing page", "demo booking system", "CRM"],
    "dependency_graph": {
      "demo_requests": ["landing_page", "booking_system"],
      "qualified_demos": ["ICP_targeting", "lead_scoring"]
    }
  }
}
```

**Marketing Agent CQ:**

```json
{
  "core_question": "How do we generate 50 qualified demo requests per month from enterprise CTOs?",
  "success_metric": "qualified_demo_requests_per_month",
  "baseline": 10,
  "target": 50,
  "time_horizon_days": 60,
  "icp": "Enterprise CTOs at companies with 500+ employees",
  "constraints": {
    "budget": "$10,000/month",
    "timeline": "60 days to initial results",
    "team": "1 marketing manager",
    "geography": "North America"
  }
}
```

**Validation:**

```json
{
  "cq_valid": true,
  "constraints_complete": true,
  "goal_confidence_score": 0.85,
  "proceed_to_research": true
}
```

---

### Stage 3-4: Research → Feasibility Validation → Strategy

**Marketing Agent Behavior:**

```
Stage 3: Gather evidence from reliable sources (Tier A/B/C)
Stage 4: Create complete strategy with assumptions + evidence plan + confidence score
```

**Architecture Integration:**

```json
{
  "module": "option_mapper",
  "inputs": {
    "detected_options": ["LinkedIn Ads", "Google Search Ads", "Content Marketing", "Cold Outbound"],
    "detected_entities": ["B2B", "SaaS", "enterprise", "CTOs"]
  },
  "outputs": {
    "structured_options": [
      {
        "option": "LinkedIn Ads",
        "action": "Run paid campaigns targeting CTOs at 500+ employee companies",
        "affected_entities": ["budget", "landing_page", "CRM"],
        "assumptions": ["CTOs are active on LinkedIn", "Can target by company size and job title"]
      },
      {
        "option": "Content Marketing + SEO",
        "action": "Create blog content and optimize for search",
        "affected_entities": ["budget", "website", "content_team"],
        "assumptions": ["Target audience searches for solutions", "Can produce high-quality content"]
      }
    ]
  }
}

{
  "module": "feasibility_validator",
  "inputs": {
    "structured_options": [...],
    "constraints": [...],
    "required_entities": [...]
  },
  "outputs": {
    "valid_options": [
      {
        "option": "LinkedIn Ads",
        "validation_status": "VALID",
        "constraint_checks": {
          "budget": "PASS - $7K/month fits $10K budget",
          "timeline": "PASS - 2-4 weeks to results",
          "team": "PASS - 10 hours/week manageable",
          "icp": "PASS - Direct targeting available"
        }
      }
    ],
    "invalid_options": [
      {
        "option": "Content Marketing + SEO",
        "validation_status": "INVALID",
        "violated_constraint": "timeline",
        "reason": "Requires 6-12 months to show results, violates 60-day timeline constraint"
      }
    ],
    "validation_report": {
      "coverage": "complete",
      "total_options": 4,
      "valid_count": 2,
      "invalid_count": 2
    }
  }
}
```

**Marketing Agent Strategy Output:**

```markdown
## Recommended Strategy

Based on your goal of 50 qualified demos/month with $10K budget and 60-day timeline:

### Primary Channel: LinkedIn Ads
- **Why:** Direct ICP targeting (CTOs, company size filter)
- **Budget:** $7,000/month
- **Expected Outcome:** 35-50 qualified demos/month
- **Timeline:** 2-4 weeks to optimization
- **Evidence:** 
  - LinkedIn's B2B targeting capabilities (Tier A: LinkedIn Marketing Solutions docs)
  - Industry benchmark: $150-250 cost per demo (Tier B: Gartner B2B Marketing Report 2025)
- **Confidence:** 0.85

### Why Other Options Were Rejected:
- **Content Marketing/SEO:** Violates timeline constraint (needs 6-12 months)
- **Cold Outbound:** Violates team constraint (requires full-time SDR)
```

---

### Stage 5-6: Execution → Measurement

**Marketing Agent Behavior:**

```
Stage 5: Turn strategy into phases (0-2w, 2-6w, 6-12w) with Kill/Scale rules
Stage 6: Define events, conversions, attribution
```

**Architecture Integration:**

```json
{
  "module": "answer_generator",
  "inputs": {
    "primary_goal": "Generate 50 qualified demo requests per month",
    "invalid_options": ["Content Marketing", "Cold Outbound"],
    "ranked_options": [
      {"option": "LinkedIn Ads", "rank": 1, "score": 8.5},
      {"option": "Google Search Ads", "rank": 2, "score": 6.0}
    ],
    "recommended_option": "LinkedIn Ads as primary, Google Search as secondary"
  },
  "outputs": {
    "final_answer": {
      "goal_restatement": "Your goal is to generate 50 qualified demo requests per month from enterprise CTOs.",
      "invalid_options_explanation": "Content Marketing and Cold Outbound were rejected due to timeline and team constraints respectively.",
      "valid_options_comparison": "LinkedIn Ads (primary) offers direct ICP targeting with 2-4 week timeline. Google Search (secondary) captures active demand.",
      "recommendation": "Allocate $7K to LinkedIn Ads, $3K to Google Search. Expected outcome: 45-65 demos/month.",
      "next_steps": [
        "Week 1-2: Set up campaigns, create ad variations",
        "Week 3-4: Test and optimize",
        "Week 5-8: Scale winning campaigns"
      ],
      "kill_criteria": [
        "Cost per demo exceeds $200 after 4 weeks",
        "Demo-to-customer conversion rate below 10%"
      ],
      "scale_criteria": [
        "Cost per demo below $150",
        "Demo-to-customer conversion rate above 15%"
      ]
    }
  }
}
```

---

### Stage 7: QA → Output Checker

**Marketing Agent Behavior:**

```
Stage 7: Verify evidence, recency, privacy
```

**Architecture Integration:**

```json
{
  "module": "output_checker",
  "inputs": {
    "final_answer": {...},
    "primary_goal": "Generate 50 qualified demo requests per month",
    "constraints": [...]
  },
  "outputs": {
    "checked_answer": {...},
    "consistency_report": {
      "goal_satisfied": true,
      "contradictions": [],
      "constraint_violations": [],
      "evidence_quality": "HIGH - all recommendations backed by Tier A/B sources",
      "recency_check": "PASS - all sources from 2024-2025",
      "privacy_check": "PASS - no sensitive data requested"
    }
  },
  "validation_result": "PASS"
}
```

---

## Prompt Engineering Guidelines

### How to Write Module Prompts for Marketing

#### 1. Goal Extractor Prompt (Marketing-Specific)

```
Extract the user's primary business goal as a clear outcome statement.

MARKETING CONTEXT:
- Distinguish between methods (e.g., "get more traffic") and outcomes (e.g., "generate qualified leads")
- Identify if the goal is awareness, consideration, conversion, or retention
- Separate vanity metrics from business outcomes

EXAMPLES:
- Input: "We want more social media followers"
  Output: primary_goal = "Increase brand awareness and engagement with target ICP"
  
- Input: "We need to improve our conversion rate"
  Output: primary_goal = "UNCLEAR - needs clarification on what conversion means and why"

Output JSON with: primary_goal, secondary_goals, goal_confidence_score (0 to 1)
```

#### 2. Constraint Parser Prompt (Marketing-Specific)

```
Extract all governing constraints required to achieve the marketing goal.

MARKETING CONSTRAINTS TO IDENTIFY:
- Budget (total, monthly, per-channel)
- Timeline (when results are needed)
- Team/Resources (who will execute, in-house vs agency)
- ICP (target audience, geography, language)
- Compliance (industry regulations, data privacy)
- Technical (website capabilities, tracking setup)

EXAMPLES:
- Input: "We have $50K for Q1 marketing"
  Output: constraints = [
    {type: "budget", value: "$50,000 for Q1", mandatory: true},
    {type: "timeline", value: "90 days (Q1)", mandatory: true}
  ]

Output JSON with: constraints[], required_entities[], dependency_graph
```

#### 3. Feasibility Validator Prompt (Marketing-Specific)

```
Test each marketing channel/tactic against all extracted constraints.

VALIDATION CHECKS:
1. Budget: Does the channel fit within budget?
2. Timeline: Can the channel deliver results in the required timeframe?
3. Team: Can the team execute this channel?
4. ICP: Does the channel reach the target audience?
5. Technical: Are required tools/platforms available?

EXAMPLES:
- Option: "Content Marketing + SEO"
  Constraints: {budget: $10K/month, timeline: 60 days}
  Result: INVALID - timeline constraint violated (SEO needs 6-12 months)

- Option: "LinkedIn Ads"
  Constraints: {budget: $10K/month, timeline: 60 days, icp: "Enterprise CTOs"}
  Result: VALID - all constraints satisfied

Output JSON with: valid_options[], invalid_options[], validation_report
```

---

## Testing Scenarios

### Scenario 1: Budget Constraint Violation

**Input:**

```
Goal: Generate 100 qualified leads per month
Budget: $2,000/month
Recommended Channel: LinkedIn Ads (typical cost: $5,000-8,000/month for 100 leads)
```

**Expected Behavior:**

```json
{
  "feasibility_validator": {
    "validation_status": "INVALID",
    "violated_constraint": "budget",
    "reason": "LinkedIn Ads requires $5-8K/month for 100 leads, exceeds $2K budget"
  },
  "frame_corrector": {
    "reframed_question": "With $2K/month budget, what is a realistic lead volume target, or what alternative channels can achieve 100 leads?",
    "clarification_required": true
  }
}
```

---

### Scenario 2: Timeline Constraint Violation

**Input:**

```
Goal: Increase organic traffic by 200%
Timeline: 30 days
Recommended Channel: SEO + Content Marketing
```

**Expected Behavior:**

```json
{
  "feasibility_validator": {
    "validation_status": "INVALID",
    "violated_constraint": "timeline",
    "reason": "SEO + Content Marketing requires 6-12 months to show significant results, violates 30-day timeline"
  },
  "frame_corrector": {
    "reframed_question": "For a 30-day timeline, paid channels (Google Ads, LinkedIn Ads) are more appropriate. Should we adjust the timeline or switch to paid acquisition?",
    "clarification_required": true
  }
}
```

---

### Scenario 3: False Dichotomy Detection

**Input:**

```
Question: "Should we invest in SEO or paid ads?"
Goal: Successful product launch
```

**Expected Behavior:**

```json
{
  "frame_corrector": {
    "frame_issue_detected": true,
    "issue_type": "false_dichotomy",
    "reframed_question": "Given your goal of successful product launch, which combination of channels (SEO, paid ads, PR, email) will maximize launch impact?",
    "frame_warnings": [
      "SEO and paid ads serve different purposes and are not mutually exclusive",
      "Product launches often require multi-channel strategies"
    ]
  }
}
```

---

## Best Practices

### 1. Always Extract Goal Before Recommending Tactics

```
❌ BAD: "Here are 10 tactics to increase traffic..."
✅ GOOD: "Before recommending tactics, what is your goal? Is it qualified leads, brand awareness, or something else?"
```

### 2. Always Parse Constraints Before Validating Options

```
❌ BAD: "I recommend LinkedIn Ads, Google Ads, and Content Marketing"
✅ GOOD: "What is your budget and timeline? This will determine which channels are feasible."
```

### 3. Always Explain Why Invalid Options Were Rejected

```
❌ BAD: "Use LinkedIn Ads"
✅ GOOD: "LinkedIn Ads is recommended. Content Marketing was rejected because it violates your 60-day timeline constraint."
```

### 4. Always Provide Structured Recommendations

```
❌ BAD: "Try these tactics and see what works"
✅ GOOD: "Phase 1 (Week 1-2): LinkedIn Ads. Kill criteria: if cost per demo exceeds $200. Scale criteria: if below $150."
```

---

## Conclusion

The goal-constrained reasoning architecture is the **reasoning engine** that powers the marketing agent's decision-making. By integrating at each stage of the state machine, it ensures:

1. **Goal clarity** before tactics
2. **Constraint validation** before recommendations
3. **Feasibility checks** before execution
4. **Strategic coherence** across all stages
5. **Measurement alignment** with business outcomes

This transforms the agent from a "tactic generator" into a "strategic advisor."
