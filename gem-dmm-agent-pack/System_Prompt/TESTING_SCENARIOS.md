# Testing Scenarios for Goal-Constrained Reasoning Architecture

**Version:** 1.0.0  
**Created:** 2026-02-15

---

## Purpose

This document provides test cases for validating the goal-constrained reasoning architecture in marketing scenarios. Each test includes:

- Input scenario
- Expected module outputs
- Pass/fail criteria
- Common failure modes

---

## Test Suite 1: Goal Extraction

### Test 1.1: Ambiguous Goal Detection

**Input:**

```
"We want more traffic to our website"
```

**Expected Output:**

```json
{
  "module": "goal_extractor",
  "primary_goal": "UNCLEAR - needs clarification",
  "goal_confidence_score": 0.3,
  "ambiguity_flags": ["method_stated_as_goal", "outcome_unclear"],
  "clarification_questions": [
    "What is the business outcome you want from more traffic?",
    "Is the goal qualified leads, sales, brand awareness, or something else?"
  ]
}
```

**Pass Criteria:**

- ✅ Detects that "traffic" is a method, not an outcome
- ✅ Requests clarification before proceeding
- ✅ Does NOT recommend tactics

**Fail Criteria:**

- ❌ Treats "traffic" as a valid goal
- ❌ Recommends SEO/content tactics without clarification

---

### Test 1.2: Clear Goal Extraction

**Input:**

```
"We want to generate 50 qualified demo requests per month from enterprise CTOs"
```

**Expected Output:**

```json
{
  "module": "goal_extractor",
  "primary_goal": "Generate 50 qualified demo requests per month from enterprise CTOs",
  "secondary_goals": [],
  "goal_confidence_score": 0.85,
  "goal_type": "conversion",
  "success_metric": "qualified_demo_requests_per_month"
}
```

**Pass Criteria:**

- ✅ Extracts clear, measurable goal
- ✅ Identifies goal type (conversion)
- ✅ High confidence score (>0.7)

---

### Test 1.3: Vanity Metric Detection

**Input:**

```
"We want to get 10,000 social media followers"
```

**Expected Output:**

```json
{
  "module": "goal_extractor",
  "primary_goal": "UNCLEAR - vanity metric detected",
  "goal_confidence_score": 0.4,
  "warnings": ["followers_are_vanity_metric"],
  "clarification_questions": [
    "What business outcome do you want from 10K followers?",
    "Is the goal brand awareness, engagement, lead generation, or community building?"
  ]
}
```

**Pass Criteria:**

- ✅ Detects vanity metric
- ✅ Requests business outcome clarification
- ✅ Does NOT proceed with follower growth tactics

---

## Test Suite 2: Constraint Parsing

### Test 2.1: Budget Constraint Extraction

**Input:**

```
Goal: "Generate 100 qualified leads per month"
Context: "We have $5,000 per month for marketing"
```

**Expected Output:**

```json
{
  "module": "constraint_parser",
  "constraints": [
    {
      "type": "budget",
      "value": "$5,000/month",
      "mandatory": true,
      "linked_goal_id": "primary_goal"
    }
  ],
  "required_entities": ["landing page", "lead capture form", "CRM"]
}
```

**Pass Criteria:**

- ✅ Extracts budget as mandatory constraint
- ✅ Links constraint to goal
- ✅ Identifies required entities

---

### Test 2.2: Timeline Constraint Extraction

**Input:**

```
Goal: "Increase brand awareness"
Context: "We're launching in 60 days and need visibility before launch"
```

**Expected Output:**

```json
{
  "module": "constraint_parser",
  "constraints": [
    {
      "type": "timeline",
      "value": "60 days to launch",
      "mandatory": true,
      "urgency": "high"
    }
  ]
}
```

**Pass Criteria:**

- ✅ Extracts timeline constraint
- ✅ Marks as mandatory
- ✅ Identifies urgency level

---

### Test 2.3: Multiple Constraints

**Input:**

```
Goal: "Generate 50 demos/month"
Context: "Budget $10K/month, need results in 60 days, 1 marketing manager, no agency"
```

**Expected Output:**

```json
{
  "module": "constraint_parser",
  "constraints": [
    {
      "type": "budget",
      "value": "$10,000/month",
      "mandatory": true
    },
    {
      "type": "timeline",
      "value": "60 days to initial results",
      "mandatory": true
    },
    {
      "type": "team",
      "value": "1 marketing manager, no agency",
      "mandatory": true
    }
  ]
}
```

**Pass Criteria:**

- ✅ Extracts all constraints
- ✅ Correctly identifies constraint types
- ✅ All marked as mandatory

---

## Test Suite 3: Feasibility Validation

### Test 3.1: Budget Constraint Violation

**Input:**

```
Goal: "Generate 100 qualified leads per month"
Constraints: {budget: "$2,000/month"}
Option: "LinkedIn Ads" (typical cost: $5,000-8,000/month for 100 leads)
```

**Expected Output:**

```json
{
  "module": "feasibility_validator",
  "option": "LinkedIn Ads",
  "validation_status": "INVALID",
  "violated_constraint": "budget",
  "reason": "LinkedIn Ads requires $5-8K/month for 100 leads, exceeds $2K budget",
  "recommendation": "Reduce target to 30-40 leads/month OR increase budget to $5K+"
}
```

**Pass Criteria:**

- ✅ Detects budget violation
- ✅ Marks option as INVALID
- ✅ Provides clear reason
- ✅ Suggests alternatives

**Fail Criteria:**

- ❌ Recommends LinkedIn Ads anyway
- ❌ Doesn't explain why it's infeasible

---

### Test 3.2: Timeline Constraint Violation

**Input:**

```
Goal: "Increase organic traffic by 200%"
Constraints: {timeline: "30 days"}
Option: "SEO + Content Marketing"
```

**Expected Output:**

```json
{
  "module": "feasibility_validator",
  "option": "SEO + Content Marketing",
  "validation_status": "INVALID",
  "violated_constraint": "timeline",
  "reason": "SEO + Content Marketing requires 6-12 months to show significant results, violates 30-day timeline",
  "recommendation": "Use paid channels (Google Ads, LinkedIn Ads) for 30-day timeline OR extend timeline to 6+ months for SEO"
}
```

**Pass Criteria:**

- ✅ Detects timeline violation
- ✅ Explains realistic timeline for SEO
- ✅ Suggests alternatives

---

### Test 3.3: Team Constraint Violation

**Input:**

```
Goal: "Generate 50 demos/month"
Constraints: {team: "1 marketing manager, no agency"}
Option: "Cold Outbound (SDR-led)"
```

**Expected Output:**

```json
{
  "module": "feasibility_validator",
  "option": "Cold Outbound (SDR-led)",
  "validation_status": "INVALID",
  "violated_constraint": "team",
  "reason": "Cold outbound requires full-time SDR, violates team constraint (1 marketing manager only)",
  "recommendation": "Hire SDR OR use automated outbound tools OR choose different channel"
}
```

**Pass Criteria:**

- ✅ Detects team capacity violation
- ✅ Explains resource requirements
- ✅ Suggests alternatives

---

### Test 3.4: Valid Option

**Input:**

```
Goal: "Generate 50 demos/month"
Constraints: {budget: "$10K/month", timeline: "60 days", team: "1 marketing manager"}
Option: "LinkedIn Ads"
```

**Expected Output:**

```json
{
  "module": "feasibility_validator",
  "option": "LinkedIn Ads",
  "validation_status": "VALID",
  "constraint_checks": {
    "budget": "PASS - $7K/month fits $10K budget",
    "timeline": "PASS - 2-4 weeks to results",
    "team": "PASS - 10 hours/week manageable for 1 person"
  },
  "expected_outcome": "35-50 qualified demos/month"
}
```

**Pass Criteria:**

- ✅ Validates all constraints
- ✅ Marks as VALID
- ✅ Provides expected outcome

---

## Test Suite 4: Frame Correction

### Test 4.1: False Dichotomy Detection

**Input:**

```
Question: "Should we invest in SEO or paid ads?"
Goal: "Successful product launch"
```

**Expected Output:**

```json
{
  "module": "frame_corrector",
  "frame_issue_detected": true,
  "issue_type": "false_dichotomy",
  "reframed_question": "Given your goal of successful product launch, which combination of channels (SEO, paid ads, PR, email) will maximize launch impact?",
  "frame_warnings": [
    "SEO and paid ads serve different purposes and are not mutually exclusive",
    "Product launches often require multi-channel strategies"
  ],
  "clarification_required": true
}
```

**Pass Criteria:**

- ✅ Detects false dichotomy
- ✅ Reframes as combination question
- ✅ Explains why it's not either/or

**Fail Criteria:**

- ❌ Chooses one channel over the other
- ❌ Doesn't explain they serve different purposes

---

### Test 4.2: Invalid Framing (No Valid Options)

**Input:**

```
Goal: "Generate 100 leads/month"
Constraints: {budget: "$500/month"}
Options: ["LinkedIn Ads", "Google Ads", "Facebook Ads"]
Validation: All options INVALID (budget too low)
```

**Expected Output:**

```json
{
  "module": "frame_corrector",
  "frame_issue_detected": true,
  "issue_type": "no_valid_options",
  "reframed_question": "With $500/month budget, what is a realistic lead volume target? OR what budget would be needed for 100 leads/month?",
  "clarification_required": true,
  "alternatives": [
    "Reduce target to 15-20 leads/month (achievable with $500)",
    "Increase budget to $3-5K/month for 100 leads",
    "Use organic channels (SEO, content) with longer timeline"
  ]
}
```

**Pass Criteria:**

- ✅ Detects no valid options
- ✅ Reframes to adjust goal or constraints
- ✅ Provides alternatives

---

## Test Suite 5: End-to-End Scenarios

### Test 5.1: B2B SaaS Lead Generation (Complete Flow)

**Input:**

```
"We want more leads for our B2B SaaS product"
```

**Expected Flow:**

```
1. Goal Extractor:
   - Detects ambiguity
   - Requests clarification: "What type of leads? Demo requests, trials, downloads?"

2. User Clarifies:
   - "50 qualified demo requests/month from enterprise CTOs"
   - "Budget $10K/month, need results in 60 days, 1 marketing manager"

3. Constraint Parser:
   - Extracts: budget ($10K), timeline (60 days), team (1 person), ICP (enterprise CTOs)

4. Option Mapper:
   - Maps: LinkedIn Ads, Google Search Ads, Content Marketing, Cold Outbound

5. Feasibility Validator:
   - VALID: LinkedIn Ads, Google Search Ads
   - INVALID: Content Marketing (timeline), Cold Outbound (team)

6. Reasoning Engine:
   - Ranks: LinkedIn Ads (8.5/10), Google Search Ads (6.0/10)
   - Recommends: LinkedIn Ads primary, Google Search secondary

7. Answer Generator:
   - Structured recommendation with phasing, kill/scale criteria

8. Output Checker:
   - Validates goal alignment, constraint satisfaction
   - PASS
```

**Pass Criteria:**

- ✅ Complete flow from ambiguous request to structured recommendation
- ✅ All constraints validated
- ✅ Invalid options rejected with reasons
- ✅ Clear next steps provided

---

### Test 5.2: Ecommerce Conversion Optimization (Complete Flow)

**Input:**

```
"Our conversion rate is 1.2%. How do we increase it to 3%?"
```

**Expected Flow:**

```
1. Goal Extractor:
   - Accepts goal (clear, measurable)
   - Identifies as conversion optimization

2. Constraint Parser:
   - Requests: budget, timeline, current checkout flow, traffic sources
   
3. User Clarifies:
   - Fashion ecommerce, AOV $85
   - 60% paid traffic, 30% organic, 10% direct
   - 3-step checkout, requires account creation
   - Budget $15K, timeline 30 days

4. Diagnostic Analysis:
   - Identifies: forced account creation (HIGH impact), limited payment options (MEDIUM)

5. Option Mapper:
   - Maps: Add guest checkout, Add PayPal/Apple Pay, Optimize paid ads, Redesign checkout

6. Feasibility Validator:
   - VALID: Guest checkout, PayPal/Apple Pay, Paid ad optimization
   - INVALID: Complete redesign (budget)

7. Reasoning Engine:
   - Ranks by impact: Guest checkout (highest), PayPal/Apple Pay (medium), Paid ads (medium)

8. Answer Generator:
   - Phased approach: Week 1-2 (guest checkout + payments), Week 3-4 (paid ads)
   - Expected outcome: 2.5-3.3% conversion rate

9. Output Checker:
   - Validates: goal achievable, budget satisfied, timeline met
   - PASS
```

**Pass Criteria:**

- ✅ Diagnostic analysis before tactics
- ✅ Prioritization by impact
- ✅ Phased implementation
- ✅ Realistic outcome expectations

---

## Test Suite 6: Error Handling

### Test 6.1: Contradictory Constraints

**Input:**

```
Goal: "Generate 100 leads/month"
Constraints: {budget: "$500/month", timeline: "immediate results"}
```

**Expected Output:**

```json
{
  "module": "feasibility_validator",
  "validation_status": "NO_VALID_OPTIONS",
  "reason": "No channel can deliver 100 leads/month with $500 budget and immediate timeline",
  "frame_corrector": {
    "clarification_required": true,
    "options": [
      "Reduce target to 15-20 leads/month (achievable with $500)",
      "Increase budget to $3-5K/month for 100 leads",
      "Extend timeline to 6+ months for organic channels"
    ]
  }
}
```

**Pass Criteria:**

- ✅ Detects contradictory constraints
- ✅ Requests user to adjust goal or constraints
- ✅ Provides realistic alternatives

---

### Test 6.2: Missing Critical Information

**Input:**

```
Goal: "Increase revenue"
Constraints: {}
```

**Expected Output:**

```json
{
  "module": "constraint_parser",
  "status": "INCOMPLETE",
  "missing_critical_info": [
    "Current revenue baseline",
    "Target revenue",
    "Timeline",
    "Budget",
    "Business model (B2B, B2C, etc.)",
    "ICP"
  ],
  "clarification_required": true
}
```

**Pass Criteria:**

- ✅ Identifies missing information
- ✅ Requests all critical fields
- ✅ Does NOT proceed without information

---

## Common Failure Modes

### Failure Mode 1: Premature Tactic Recommendation

**Symptom:** Agent recommends tactics before understanding goal and constraints

**Example:**

```
User: "We want more leads"
Agent: "Here are 10 lead generation tactics..." ❌
```

**Correct Behavior:**

```
User: "We want more leads"
Agent: "Before recommending tactics, I need to understand:
1. What type of leads?
2. What is your budget?
3. What is your timeline?" ✅
```

---

### Failure Mode 2: Ignoring Constraint Violations

**Symptom:** Agent recommends channels that violate constraints

**Example:**

```
Budget: $2K/month
Agent: "I recommend LinkedIn Ads ($7K/month)" ❌
```

**Correct Behavior:**

```
Budget: $2K/month
Agent: "LinkedIn Ads requires $7K/month, which exceeds your $2K budget. 
Alternative: Google Search Ads ($2K/month) or reduce lead target" ✅
```

---

### Failure Mode 3: False Dichotomy Acceptance

**Symptom:** Agent treats non-exclusive options as mutually exclusive

**Example:**

```
User: "Should we do SEO or paid ads?"
Agent: "I recommend paid ads because SEO is slow" ❌
```

**Correct Behavior:**

```
User: "Should we do SEO or paid ads?"
Agent: "This is a false dichotomy. SEO and paid ads serve different purposes.
What is your goal, budget, and timeline? This will determine if you need one, both, or neither" ✅
```

---

## Conclusion

These test scenarios validate that the goal-constrained reasoning architecture:

1. ✅ Extracts true goals before recommending tactics
2. ✅ Parses and validates all constraints
3. ✅ Rejects infeasible options with clear reasons
4. ✅ Detects and corrects invalid framing
5. ✅ Provides structured, constraint-grounded recommendations

Use these tests to verify the architecture is working correctly in your marketing agent implementation.
