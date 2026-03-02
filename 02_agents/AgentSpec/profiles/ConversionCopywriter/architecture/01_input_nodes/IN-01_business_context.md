# IN-01: Business Context

**Input Node Specification**
**Version**: 2.0

---

## Purpose

Establish the business context, goals, constraints, and revenue model to inform copy strategy.

---

## Input Schema

```yaml
Company Information:
  industry: string (required)
  business_model: "B2B" | "B2C" | "SaaS" | "Service" (required)
  revenue_model: "subscription" | "one-time" | "hybrid"
  current_annual_revenue: number
  years_in_business: integer

Product/Service:
  name: string
  category: string
  price_point: number
  payment_frequency: string (one-time, monthly, annual)
  target_market_size: string
  market_position: "premium" | "mid-market" | "budget"

Business Goals:
  primary_goal: string (e.g., "Increase e-book sign-ups by 50%")
  secondary_goals: array
  timeline: days
  success_metric: string (e.g., "1000 sign-ups per month")
  acceptable_cpa: number (cost per acquisition)
  roi_target: number (e.g., 3:1)

Constraints:
  budget: number
  regulatory_restrictions: array
  brand_tone: "professional" | "casual" | "friendly" | "technical"
  competitor_positioning: string (how positioned vs competitors)

Current Performance:
  current_conversion_rate: number (percentage)
  current_cost_per_acquisition: number
  current_customer_ltv: number
```

---

## Example: SaaS Analytics Tool

```yaml
Company Information:
  industry: "B2B SaaS - Data Analytics"
  business_model: "SaaS"
  revenue_model: "subscription"
  current_annual_revenue: 2500000
  years_in_business: 5

Product/Service:
  name: "DataFlow Platform"
  category: "E-commerce Analytics"
  price_point: 299
  payment_frequency: "monthly"
  target_market_size: "250,000 e-commerce companies globally"
  market_position: "mid-market"

Business Goals:
  primary_goal: "Increase free trial sign-ups from 50/month to 75/month"
  secondary_goals:
    - "Reduce cost per trial sign-up from $8 to $5"
    - "Improve trial to paid conversion from 10% to 15%"
  timeline: 60
  success_metric: "75 free trial sign-ups/month at $5 CPA"
  acceptable_cpa: 5
  roi_target: 5

Constraints:
  budget: 5000
  regulatory_restrictions: []
  brand_tone: "professional"
  competitor_positioning: "Easy, real-time alternative to Mixpanel"

Current Performance:
  current_conversion_rate: 2.5
  current_cost_per_acquisition: 8
  current_customer_ltv: 3000
```

---

## Output Usage

This input feeds into:
- **PR-01**: Audience analysis (understand business context)
- **PR-05**: Messaging strategy (align with business goals)
- **PR-12**: KPI definition (set success metrics)

---

**Status**: Ready for input
