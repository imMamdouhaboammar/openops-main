# Marketing-Specific Examples for Goal-Constrained Reasoning

**Version:** 1.0.0  
**Created:** 2026-02-15

---

## Example 1: B2B SaaS Lead Generation

### User Input

```
"We're a B2B SaaS company selling project management software. We want to get more leads."
```

### Without Goal-Constrained Architecture (WRONG)

**Agent Response:**

```
Here's a comprehensive lead generation strategy:

1. Content Marketing
   - Start a blog with weekly posts
   - Create downloadable whitepapers
   - Launch a podcast interviewing industry leaders

2. Paid Advertising
   - Google Search Ads
   - LinkedIn Ads
   - Facebook Ads
   - Display Network

3. Social Media
   - Post daily on LinkedIn, Twitter, Facebook
   - Create video content for YouTube
   - Engage with industry hashtags

4. Email Marketing
   - Build email list
   - Send weekly newsletters
   - Automated drip campaigns

5. SEO
   - Optimize website for keywords
   - Build backlinks
   - Create pillar pages
```

**What's Wrong:**

- No goal clarification (what type of leads? qualified demos? trials? downloads?)
- No constraint validation (budget, team, timeline)
- No feasibility check (can a small team execute all this?)
- No prioritization or sequencing
- No success metrics defined

---

### With Goal-Constrained Architecture (CORRECT)

**Step 1: Goal Extraction**

```json
{
  "primary_goal": "UNCLEAR - needs clarification",
  "goal_confidence_score": 0.3,
  "clarification_needed": true
}
```

**Agent Response:**

```
Before I recommend tactics, I need to understand your goal more precisely:

1. What type of leads do you want?
   - Demo requests from qualified prospects?
   - Free trial signups?
   - Content downloads (top-of-funnel)?
   - Direct sales conversations?

2. What defines a "qualified" lead for you?
   - Company size?
   - Industry?
   - Job title?
   - Budget authority?

3. What are your constraints?
   - Monthly marketing budget?
   - Timeline to see results?
   - Team size and capabilities?
   - Current marketing assets (website, content, etc.)?

4. What is your current baseline?
   - How many leads do you get now per month?
   - What is your current conversion rate?
   - What channels are you using today?
```

**User Clarification:**

```
- We want 50 qualified demo requests per month
- Qualified = companies with 50-500 employees, decision-makers (VP+)
- Budget: $10K/month
- Timeline: Need results in 60 days
- Team: 1 marketing manager, no agency
- Current: 10 demos/month from referrals only
```

**Step 2: Constraint Parsing**

```json
{
  "primary_goal": "Generate 50 qualified demo requests per month",
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
    },
    {
      "type": "icp",
      "value": "50-500 employee companies, VP+ decision-makers",
      "mandatory": true
    }
  ],
  "required_entities": ["landing page", "demo booking system", "CRM"],
  "baseline": "10 demos/month from referrals"
}
```

**Step 3: Option Mapping & Feasibility Validation**

```json
{
  "structured_options": [
    {
      "option": "LinkedIn Ads",
      "estimated_cost": "$6,000-8,000/month",
      "team_effort": "10 hours/week",
      "time_to_results": "2-4 weeks",
      "expected_outcome": "30-50 qualified demos/month"
    },
    {
      "option": "Content Marketing + SEO",
      "estimated_cost": "$2,000/month (tools + freelance writers)",
      "team_effort": "20 hours/week",
      "time_to_results": "6-12 months",
      "expected_outcome": "20-40 demos/month (long-term)"
    },
    {
      "option": "Google Search Ads",
      "estimated_cost": "$5,000-7,000/month",
      "team_effort": "8 hours/week",
      "time_to_results": "2-3 weeks",
      "expected_outcome": "15-25 demos/month"
    },
    {
      "option": "Cold Outbound (SDR)",
      "estimated_cost": "$8,000/month (SDR salary)",
      "team_effort": "Full-time hire",
      "time_to_results": "4-6 weeks (including hiring)",
      "expected_outcome": "25-40 demos/month"
    },
    {
      "option": "Podcast Sponsorships",
      "estimated_cost": "$3,000-5,000/month",
      "team_effort": "5 hours/week",
      "time_to_results": "4-8 weeks",
      "expected_outcome": "10-20 demos/month"
    }
  ],
  "validation_report": {
    "valid_options": [
      {
        "option": "LinkedIn Ads",
        "reason": "Fits budget, timeline, team capacity, and ICP targeting"
      },
      {
        "option": "Google Search Ads",
        "reason": "Fits budget and timeline, but requires existing brand awareness"
      }
    ],
    "invalid_options": [
      {
        "option": "Content Marketing + SEO",
        "reason": "Timeline constraint violated: needs 6-12 months, user needs results in 60 days"
      },
      {
        "option": "Cold Outbound (SDR)",
        "reason": "Team constraint violated: requires full-time hire, user has 1 marketing manager"
      },
      {
        "option": "Podcast Sponsorships",
        "reason": "Unlikely to hit 50 demos/month target with this channel alone"
      }
    ]
  }
}
```

**Step 4: Reasoning & Recommendation**

```
Based on your goal of 50 qualified demos/month with $10K budget and 60-day timeline:

RECOMMENDED STRATEGY:

Primary Channel: LinkedIn Ads ($7,000/month)
- Why: Direct ICP targeting (company size, job title filters)
- Expected: 35-50 qualified demos/month
- Timeline: 2-4 weeks to optimization
- Team Effort: 10 hours/week (manageable for 1 person)

Secondary Channel: Google Search Ads ($3,000/month)
- Why: Capture active demand from people searching for solutions
- Expected: 10-15 additional demos/month
- Timeline: 2-3 weeks to initial results
- Team Effort: 5 hours/week

TOTAL: $10,000/month, 15 hours/week effort
EXPECTED OUTCOME: 45-65 demos/month (exceeds 50 target)

WHY OTHER OPTIONS WERE REJECTED:
- Content Marketing/SEO: Takes 6-12 months, violates your 60-day timeline
- Cold Outbound: Requires full-time SDR hire, violates team constraint
- Podcast Sponsorships: Insufficient volume to hit target

NEXT STEPS:
1. Set up LinkedIn Campaign Manager account
2. Create 3-5 ad variations targeting VPs at 50-500 employee companies
3. Set up Google Search campaign for high-intent keywords
4. Ensure landing page and demo booking system are optimized
5. Week 1-2: Test and optimize
6. Week 3-4: Scale winning campaigns
7. Week 5-8: Maintain and refine

KILL CRITERIA (when to stop):
- If cost per demo exceeds $200 after 4 weeks
- If demo-to-customer conversion rate is below 10%
- If lead quality is poor (wrong company size, wrong titles)
```

---

## Example 2: Ecommerce Conversion Rate Optimization

### User Input

```
"Our ecommerce store has a 1.2% conversion rate. How do we increase it to 3%?"
```

### Without Goal-Constrained Architecture (WRONG)

**Agent Response:**

```
Here are 15 proven tactics to increase your conversion rate:

1. Add social proof (reviews, testimonials)
2. Improve product photography
3. Add urgency triggers (limited stock, countdown timers)
4. Simplify checkout process
5. Offer free shipping
6. Add live chat
7. Implement exit-intent popups
8. Add product videos
9. Improve page load speed
10. Add trust badges
11. Offer multiple payment options
12. Create better product descriptions
13. Add size guides
14. Implement abandoned cart emails
15. Add upsells and cross-sells

Start implementing these and you should see your conversion rate improve!
```

**What's Wrong:**

- No understanding of WHY conversion rate is low
- No constraint validation (budget, technical capability)
- No prioritization (which tactics have highest impact?)
- No consideration of business model (high-ticket vs low-ticket)
- No testing methodology
- Assumes all tactics are feasible

---

### With Goal-Constrained Architecture (CORRECT)

**Step 1: Goal Extraction & Constraint Parsing**

```
Before recommending tactics, I need to understand the context:

1. What is your business model?
   - Average order value (AOV)?
   - Product category (fashion, electronics, etc.)?
   - Target customer (B2C, B2B, D2C)?

2. What is your current traffic source breakdown?
   - Paid ads? SEO? Social? Direct?
   - Traffic quality might be the issue, not conversion tactics

3. What is your current checkout flow?
   - How many steps?
   - What payment methods do you offer?
   - Do you require account creation?

4. What constraints do you have?
   - Budget for improvements?
   - Technical capabilities (can you modify checkout flow)?
   - Timeline for results?

5. What have you already tried?
   - What worked? What didn't?
```

**User Clarification:**

```
- Fashion ecommerce, AOV $85
- Traffic: 60% paid ads (Facebook/Instagram), 30% organic, 10% direct
- Checkout: 3 steps, requires account creation, only credit cards accepted
- Budget: $15K for improvements
- Technical: Can modify checkout, have developer access
- Timeline: Need improvement in 30 days
- Tried: A/B tested product photos (no impact), added reviews (small impact)
```

**Step 2: Diagnostic Analysis**

```json
{
  "primary_goal": "Increase conversion rate from 1.2% to 3%",
  "constraints": [
    {
      "type": "budget",
      "value": "$15,000",
      "mandatory": true
    },
    {
      "type": "timeline",
      "value": "30 days",
      "mandatory": true
    },
    {
      "type": "technical",
      "value": "Can modify checkout flow",
      "mandatory": false
    }
  ],
  "diagnostic_insights": [
    {
      "issue": "Forced account creation",
      "impact": "HIGH - industry benchmark shows 25-35% drop-off",
      "evidence": "Baymard Institute 2025 study"
    },
    {
      "issue": "Limited payment options",
      "impact": "MEDIUM - 15-20% of users prefer alternative payment methods",
      "evidence": "Shopify 2025 checkout report"
    },
    {
      "issue": "Traffic quality (60% paid ads)",
      "impact": "MEDIUM - paid traffic typically converts 30-40% lower than organic",
      "evidence": "User's own data + industry benchmarks"
    }
  ]
}
```

**Step 3: Feasibility Validation**

```json
{
  "valid_options": [
    {
      "option": "Add guest checkout",
      "estimated_cost": "$3,000 (developer time)",
      "expected_impact": "+0.8-1.2% conversion rate",
      "timeline": "2 weeks",
      "confidence": 0.85,
      "reason": "Highest impact, proven by industry data, fits budget and timeline"
    },
    {
      "option": "Add PayPal + Apple Pay",
      "estimated_cost": "$2,000 (integration)",
      "expected_impact": "+0.3-0.5% conversion rate",
      "timeline": "1 week",
      "confidence": 0.75,
      "reason": "Medium impact, quick implementation, fits budget"
    },
    {
      "option": "Optimize paid ad targeting",
      "estimated_cost": "$5,000 (agency or specialist)",
      "expected_impact": "+0.4-0.7% conversion rate",
      "timeline": "3-4 weeks",
      "confidence": 0.65,
      "reason": "Improves traffic quality, medium impact"
    }
  ],
  "invalid_options": [
    {
      "option": "Complete checkout redesign",
      "estimated_cost": "$25,000",
      "reason": "Budget constraint violated: exceeds $15K budget"
    },
    {
      "option": "Implement AI-powered personalization",
      "estimated_cost": "$10,000 + $500/month",
      "timeline": "6-8 weeks",
      "reason": "Timeline constraint violated: exceeds 30-day requirement"
    }
  ]
}
```

**Step 4: Recommended Strategy**

```
Based on your goal of increasing conversion rate from 1.2% to 3%:

PHASED APPROACH:

Phase 1 (Week 1-2): Quick Wins
1. Add guest checkout option
   - Cost: $3,000
   - Expected Impact: +0.8-1.2% (brings you to 2.0-2.4%)
   - Why: Removing forced account creation is the #1 conversion killer

2. Add PayPal + Apple Pay
   - Cost: $2,000
   - Expected Impact: +0.3-0.5% (brings you to 2.3-2.9%)
   - Why: Expands payment options for 15-20% of users

Phase 2 (Week 3-4): Traffic Quality
3. Optimize paid ad targeting
   - Cost: $5,000 (specialist consultant)
   - Expected Impact: +0.2-0.4% (brings you to 2.5-3.3%)
   - Why: Your 60% paid traffic likely has quality issues

TOTAL COST: $10,000 (within $15K budget)
EXPECTED OUTCOME: 2.5-3.3% conversion rate (exceeds 3% target)
TIMELINE: 30 days (meets requirement)

WHY OTHER TACTICS WERE DEPRIORITIZED:
- Social proof: You already have reviews, marginal additional impact
- Product photos: Already tested, no impact
- Urgency triggers: Can add later, but not primary blocker
- Live chat: Expensive ongoing cost, lower ROI for fashion ecommerce

MEASUREMENT PLAN:
- Week 1-2: Measure guest checkout adoption rate and conversion lift
- Week 3-4: Measure alternative payment method usage
- Week 4-5: Measure paid ad conversion rate improvement
- Track segment-level conversion (paid vs organic vs direct)

KILL CRITERIA:
- If guest checkout doesn't lift conversion by at least 0.5% after 2 weeks
- If alternative payments have <5% adoption after 1 week
- If paid ad optimization doesn't improve quality score after 3 weeks
```

---

## Example 3: Local Services Lead Generation

### User Input

```
"I run a dental clinic. I need more patients."
```

### Without Goal-Constrained Architecture (WRONG)

**Agent Response:**

```
Here's a complete digital marketing strategy for your dental clinic:

1. SEO
   - Optimize Google My Business
   - Create location pages
   - Build local citations
   - Get patient reviews

2. Paid Ads
   - Google Local Service Ads
   - Google Search Ads
   - Facebook Ads
   - Instagram Ads

3. Social Media
   - Post before/after photos
   - Share dental tips
   - Run contests
   - Engage with community

4. Email Marketing
   - Send appointment reminders
   - Seasonal promotions
   - Educational newsletters

5. Website
   - Redesign for mobile
   - Add online booking
   - Create blog content
   - Add live chat

Implement all of these and you'll see more patients!
```

**What's Wrong:**

- No understanding of current patient volume or capacity
- No constraint validation (budget, staff, location)
- No understanding of patient acquisition cost vs lifetime value
- No prioritization based on local market dynamics
- Assumes clinic has capacity for more patients

---

### With Goal-Constrained Architecture (CORRECT)

**Step 1: Goal Extraction & Constraint Discovery**

```
Before recommending tactics, I need to understand your situation:

1. What is your current patient volume?
   - New patients per month?
   - Total active patients?

2. What is your capacity?
   - How many new patients can you handle per month?
   - Do you have availability in your schedule?

3. What type of patients do you want?
   - General dentistry? Cosmetic? Orthodontics?
   - Insurance patients or private pay?
   - Any specific demographics?

4. What is your local market?
   - City/neighborhood?
   - Competition level?
   - Population demographics?

5. What are your constraints?
   - Marketing budget?
   - Staff to handle inquiries?
   - Current marketing efforts?
```

**User Clarification:**

```
- Current: 15 new patients/month
- Capacity: Can handle 40 new patients/month
- Services: General dentistry + cosmetic (Invisalign, whitening)
- Target: Insurance patients (80%) + private pay (20%)
- Location: Suburban area, 5 competing clinics within 3 miles
- Budget: $2,000/month
- Staff: 1 receptionist (can handle phone calls)
- Current: Basic website, Google My Business (not optimized)
```

**Step 2: Constraint Parsing & Market Analysis**

```json
{
  "primary_goal": "Increase new patients from 15/month to 40/month (capacity limit)",
  "constraints": [
    {
      "type": "capacity",
      "value": "40 new patients/month maximum",
      "mandatory": true,
      "note": "Cannot exceed this without hiring more staff"
    },
    {
      "type": "budget",
      "value": "$2,000/month",
      "mandatory": true
    },
    {
      "type": "staff",
      "value": "1 receptionist",
      "mandatory": true,
      "note": "Limited capacity to handle inquiry volume"
    },
    {
      "type": "service_mix",
      "value": "80% insurance, 20% private pay",
      "mandatory": false
    }
  ],
  "market_analysis": {
    "competition": "HIGH - 5 clinics within 3 miles",
    "opportunity": "Google My Business not optimized (quick win)",
    "patient_acquisition_cost_benchmark": "$150-300 per new patient (local services)",
    "lifetime_value_estimate": "$2,000-3,000 per patient (5-year retention)"
  }
}
```

**Step 3: Feasibility Validation**

```json
{
  "valid_options": [
    {
      "option": "Google My Business Optimization + Local SEO",
      "estimated_cost": "$500 (one-time) + $200/month",
      "expected_outcome": "+10-15 new patients/month",
      "timeline": "2-4 weeks",
      "confidence": 0.85,
      "reason": "Low-hanging fruit, currently not optimized, high local intent"
    },
    {
      "option": "Google Local Service Ads",
      "estimated_cost": "$800-1,200/month (pay-per-lead)",
      "expected_outcome": "+8-12 new patients/month",
      "timeline": "1-2 weeks",
      "confidence": 0.80,
      "reason": "High intent leads, appears above regular search ads"
    },
    {
      "option": "Patient Referral Program",
      "estimated_cost": "$300/month (referral incentives)",
      "expected_outcome": "+5-8 new patients/month",
      "timeline": "Immediate",
      "confidence": 0.70,
      "reason": "Leverages existing patient base, low cost, high trust"
    }
  ],
  "invalid_options": [
    {
      "option": "Facebook/Instagram Ads",
      "reason": "Lower intent for dental services, higher cost per acquisition, better for cosmetic-only practices"
    },
    {
      "option": "Website Redesign",
      "estimated_cost": "$5,000-10,000",
      "reason": "Budget constraint violated, not the primary blocker"
    },
    {
      "option": "Content Marketing + Blog",
      "timeline": "6-12 months to results",
      "reason": "Too slow, user needs immediate patient volume increase"
    }
  ]
}
```

**Step 4: Recommended Strategy**

```
Based on your goal of increasing from 15 to 40 new patients/month:

RECOMMENDED STRATEGY:

Month 1: Foundation (Quick Wins)
1. Google My Business Optimization
   - Cost: $500 (one-time setup)
   - Expected: +10-15 patients/month
   - Actions:
     * Complete profile (photos, hours, services, insurance accepted)
     * Get 20+ patient reviews (send email to existing patients)
     * Post weekly updates
     * Add booking link

2. Patient Referral Program
   - Cost: $300/month (referral incentives)
   - Expected: +5-8 patients/month
   - Actions:
     * Offer $50 credit for each referred new patient
     * Create simple referral cards
     * Train staff to ask for referrals

Month 2-3: Paid Acquisition
3. Google Local Service Ads
   - Cost: $1,200/month (pay-per-lead model)
   - Expected: +10-12 patients/month
   - Actions:
     * Set up Google Guaranteed badge
     * Target 3-mile radius
     * Focus on general dentistry keywords
     * Track phone call conversions

TOTAL COST: $2,000/month (within budget)
EXPECTED OUTCOME: 40-45 new patients/month (meets capacity)

TIMELINE:
- Week 1-2: GMB optimization + referral program launch
- Week 3-4: Monitor results, adjust
- Month 2: Add Google Local Service Ads
- Month 3: Optimize and scale

WHY OTHER OPTIONS WERE REJECTED:
- Facebook/Instagram Ads: Lower intent, higher CAC for general dentistry
- Website Redesign: Expensive, not the primary blocker
- SEO/Content: Too slow, need immediate results
- Email Marketing: Limited existing patient base to market to

MEASUREMENT:
- Track new patient source (GMB, referral, Local Service Ads)
- Monitor cost per new patient (target: <$200)
- Track conversion rate from inquiry to booked appointment
- Monitor patient lifetime value by source

KILL CRITERIA:
- If cost per new patient exceeds $250 after 2 months
- If GMB doesn't generate at least 5 new patients/month after optimization
- If referral program has <10% participation after 1 month
- If Local Service Ads cost per lead exceeds $100

SCALE CRITERIA:
- If hitting capacity (40 patients/month), consider:
  * Hiring additional dentist/hygienist
  * Extending hours
  * Opening second location
```

---

## Key Patterns Across All Examples

### 1. Always Start with Goal Clarification

- Don't assume you understand the goal from the surface request
- Extract the true business objective
- Validate with the user

### 2. Always Parse Constraints

- Budget (total, monthly, per-channel)
- Timeline (when results are needed)
- Team/Resources (who will execute)
- Technical capabilities (what's possible)
- Market constraints (ICP, geography, competition)

### 3. Always Validate Feasibility

- Test each option against ALL constraints
- Mark invalid options explicitly
- Explain WHY options are invalid

### 4. Always Provide Structured Recommendations

- Prioritize by impact and feasibility
- Sequence tactics logically
- Provide clear next steps
- Define success and failure criteria

### 5. Always Include Measurement

- Define what to track
- Set benchmarks and targets
- Establish kill/scale criteria
- Create feedback loops

---

## Anti-Patterns to Avoid

### ❌ The "Comprehensive Strategy" Trap

**Problem:** Listing every possible tactic without prioritization or feasibility checks

**Example:**

```
"Here are 20 tactics you should implement..."
```

**Why It Fails:**

- Overwhelms the user
- Ignores constraints
- No clear starting point
- Assumes unlimited resources

---

### ❌ The "Best Practice" Trap

**Problem:** Recommending tactics because they're "best practices" without validating fit

**Example:**

```
"You should start a podcast because it's a great way to build authority."
```

**Why It Fails:**

- Doesn't validate against goal
- Ignores resource constraints
- Assumes one-size-fits-all

---

### ❌ The "Vanity Metric" Trap

**Problem:** Optimizing for metrics that don't align with business goals

**Example:**

```
"Let's increase your social media followers to 10K!"
```

**Why It Fails:**

- Followers ≠ business outcomes
- Wastes resources on wrong metrics
- Doesn't validate goal alignment

---

### ❌ The "False Dichotomy" Trap

**Problem:** Treating non-exclusive options as mutually exclusive

**Example:**

```
"Should we do SEO or paid ads?"
```

**Why It Fails:**

- They serve different purposes
- Often need both
- Creates artificial constraints

---

## Conclusion

The goal-constrained reasoning architecture prevents these common marketing strategy failures by:

1. **Extracting the true goal** before recommending tactics
2. **Parsing all constraints** to determine feasibility
3. **Validating options** against constraints
4. **Detecting false dichotomies** and reframing questions
5. **Providing structured, prioritized recommendations** with clear success criteria

This transforms the agent from a "tactic generator" into a "strategic advisor."
