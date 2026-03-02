# IN-01: Brand & Domain Context

**Input Node Specification**
**Version**: 2.0

---

## Purpose

Establish foundational knowledge about your brand, products, target audience, and business goals. This input is critical for all downstream processing.

---

## Input Schema

```yaml
Company Information:
  name: string (required)
  industry: string (required)
  founded_year: integer
  headquarters: string
  website: url
  size_employees: integer

Products/Services:
  - name: string
  - description: string (50-200 words)
  - target_market: string
  - primary_use_cases: array
  - key_differentiators: array

Ideal Customer Profile (ICP):
  - role: string
  - company_size: string
  - industry_vertical: string
  - key_challenges: array (3-5)
  - decision_criteria: array

Key Metrics:
  - monthly_revenue: number
  - monthly_recurring_revenue: number
  - customer_churn_rate: number
  - customer_lifetime_value: number
  - market_share_estimate: percentage

Business Goals:
  - primary_objective: string
  - secondary_objectives: array
  - success_timeline: string
  - target_metrics: object
```

---

## Example: SaaS Analytics Company

```yaml
Company Information:
  name: DataFlow Analytics
  industry: B2B SaaS - Data Analytics
  founded_year: 2019
  headquarters: San Francisco, CA
  website: https://dataflow.com
  size_employees: 75

Products/Services:
  - name: DataFlow Platform
    description: Real-time analytics platform for e-commerce businesses, providing pre-built dashboards, predictive analytics, and direct API access to raw event data
    target_market: E-commerce businesses with $1M-100M ARR
    primary_use_cases:
      - Customer behavior analysis
      - Revenue attribution
      - Performance monitoring
    key_differentiators:
      - Real-time updates (not batch)
      - E-commerce specific metrics
      - Simple setup (no SQL required)

Ideal Customer Profile (ICP):
  - role: Head of Analytics / Data Engineer
  - company_size: 50-500 employees
  - industry_vertical: E-commerce, SaaS
  - key_challenges:
    - Data silos across systems
    - Need real-time insights
    - Team lacks SQL expertise
    - Need for predictive analytics
  - decision_criteria:
    - Speed to value (weeks not months)
    - Cost efficiency
    - Ease of use
    - Data accuracy

Key Metrics:
  - monthly_revenue: 500000
  - monthly_recurring_revenue: 500000
  - customer_churn_rate: 0.03
  - customer_lifetime_value: 145000
  - market_share_estimate: 0.05

Business Goals:
  - primary_objective: Become the #1 cited source for e-commerce analytics
  - secondary_objectives:
    - Increase organic traffic by 10% (500 visits/month)
    - Generate 5 LLM citations per month
    - Establish as authority vs Mixpanel
  - success_timeline: 60 days
  - target_metrics:
    - monthly_citations: 8
    - citation_traffic: 500
    - organic_traffic_growth: 10%
```

---

## Validation Rules

✅ **Company name** must be non-empty
✅ **Industry** should be specific (not just "software")
✅ **ICP roles** should be concrete job titles
✅ **Challenges** should be specific pain points
✅ **Goals** should be measurable
✅ **Timeline** should be realistic (2-12 weeks)

---

## UI/UX Recommendations

- **Company Section**: Friendly form with company logo upload
- **Products Section**: Repeatable fields for multiple products
- **ICP Section**: Dropdown for role with custom option
- **Metrics Section**: Numeric inputs with currency formatting
- **Goals Section**: Text area with character count

---

## Output Usage

This input feeds into:
- **PR-01**: Query research (understand target market)
- **PR-05**: Strategy definition (align with business goals)
- **PR-06**: Authority blueprint (establish credibility)
- **PR-10**: Schema markup (structure brand data)

---

## Connections

```
IN-01 (Brand Context)
  ├── → PR-01 (Query Research)
  ├── → PR-05 (AEO Strategy)
  ├── → PR-06 (Authority Blueprint)
  └── → PR-10 (Schema Markup)
```

---

## Tips for Filling

1. **Be specific** - Vague descriptions lead to generic outputs
2. **Include numbers** - Metrics drive better decision-making
3. **Focus on challenges** - This reveals content opportunities
4. **Be honest about size** - Small companies need different tactics
5. **Think LLM-first** - What answers would your ICP search for?

---

**Status**: Ready for input
**Last Updated**: January 12, 2026
