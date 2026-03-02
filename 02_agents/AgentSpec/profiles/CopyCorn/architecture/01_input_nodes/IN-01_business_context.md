# Input Node: Business Context

**Node ID**: `IN-01`  
**Type**: User Input (Parallel)  
**Priority**: Required  
**Processing Time**: ~5 minutes (user fills)

---

## 📋 Purpose

Captures comprehensive business and product information that serves as the foundation for all strategic and tactical decisions.

---

## 📥 Input Schema

### 1. Company Information

```yaml
company_name: string (required)
industry: string (required)
  # Examples: "SaaS", "E-commerce", "B2B Services", "Fintech", "Education"
company_stage: enum (required)
  # Options: "Startup", "Growth", "Scale-up", "Enterprise"
company_size: string
  # Examples: "1-10", "11-50", "51-200", "201-500", "500+"
founding_year: integer
website_url: string (required)
```

### 2. Product/Service Details

```yaml
product_name: string (required)
product_category: string (required)
  # Examples: "Project Management Tool", "CRM", "Marketing Automation", "E-learning Platform"
product_description: text (required, 200-500 words)
  # What does it do? What problem does it solve?
unique_value_proposition: text (required, 50-100 words)
  # Why choose you over alternatives?
key_features: array[string] (required)
  # List 5-10 main features
pricing_model: enum (required)
  # Options: "Freemium", "Subscription", "One-time", "Usage-based", "Enterprise"
price_range: string
  # Examples: "$9-99/mo", "$5000-25000/year", "Custom"
product_stage: enum (required)
  # Options: "Pre-launch", "Beta", "Launched", "Mature"
```

### 3. Target Audience (ICP - Ideal Customer Profile)

```yaml
primary_audience:
  segment_name: string (required)
    # Examples: "Growth-stage SaaS founders", "Enterprise IT Managers"
  
  # B2C Demographics
  age_range: string
  gender: enum # "All", "Male", "Female", "Non-binary"
  income_level: string
  location: array[string] # Countries/cities
  education: string
  
  # B2B Firmographics
  company_size: string
  industry: array[string]
  job_titles: array[string] (required for B2B)
  decision_maker_level: enum # "C-Level", "VP", "Director", "Manager", "Individual Contributor"
  
  # Psychographics (Both B2C & B2B)
  pain_points: array[string] (required, 3-5 items)
  goals_aspirations: array[string] (required, 3-5 items)
  current_alternatives: array[string]
    # What are they using now?
  buying_triggers: array[string]
    # What prompts them to look for a solution?

secondary_audiences: array[object]
  # Optional: Additional segments (same schema as primary_audience)
```

### 4. Business Metrics & Current State

```yaml
# Revenue & Growth
annual_revenue: string # "$100K-500K", "$1M-5M", etc.
monthly_revenue: decimal (optional)
revenue_growth_rate: string # "20% YoY", "5% MoM"

# Customer Metrics
total_customers: integer
monthly_active_users: integer (if applicable)
customer_acquisition_cost: decimal (CAC)
customer_lifetime_value: decimal (LTV)
ltv_cac_ratio: decimal (calculated or provided)
churn_rate: string # "5% monthly", "15% annually"

# Traffic & Funnel
monthly_website_traffic: integer
conversion_rate: string # "2% visitor-to-lead", "10% lead-to-customer"
average_deal_size: decimal (B2B)
sales_cycle_length: string # "7 days", "90 days"

# Current Marketing State
active_channels: array[string] (required)
  # Examples: ["Organic Social", "Google Ads", "SEO", "Email"]
top_performing_channel: string
monthly_marketing_budget: decimal (required)
team_size: integer
  # How many people in marketing/growth team?
```

### 5. Goals & Objectives

```yaml
# Primary Business Goal
primary_goal: enum (required)
  # Options: "Increase Revenue", "Acquire Customers", "Improve Retention", 
  #          "Enter New Market", "Launch New Product", "Build Brand Awareness"

# Specific Targets
target_metrics:
  - metric_name: string (required)
    # Examples: "MRR", "New Customers", "Qualified Leads"
    current_value: decimal (required)
    target_value: decimal (required)
    timeframe: string (required)
      # Examples: "Q1 2026", "Next 90 days", "By June 2026"
  
# Secondary Goals
secondary_goals: array[string]

# Constraints
constraints:
  budget_limit: decimal
  timeline_pressure: boolean
  resource_constraints: text
  regulatory_compliance: array[string]
    # Examples: ["GDPR", "HIPAA", "Financial regulations"]
```

### 6. Competitive Landscape

```yaml
main_competitors: array[object] (3-5 recommended)
  - competitor_name: string (required)
    competitor_url: string
    their_strength: string
      # What are they good at?
    their_weakness: string
      # Where do they fall short?
    our_advantage: string
      # How are we better/different?

market_position: enum (required)
  # Options: "Market Leader", "Strong Challenger", "Niche Player", "New Entrant"

competitive_advantage: text (required, 100-200 words)
  # Why do customers choose you?
```

---

## 🔌 Output Connections

This input feeds into:

- **PR-01**: External Research (grounding with industry context)
- **PR-02**: Internal Analysis (deep dive into business state)
- **PR-03**: Diagnosis (identifying problems/opportunities)
- **PR-10**: KPIs Definition (setting measurement framework)

---

## ✅ Validation Rules

### Required Fields Check

```javascript
required_fields = [
  "company_name",
  "industry",
  "company_stage",
  "website_url",
  "product_name",
  "product_category",
  "product_description",
  "unique_value_proposition",
  "key_features",
  "pricing_model",
  "primary_audience.segment_name",
  "primary_audience.pain_points",
  "primary_audience.goals_aspirations",
  "monthly_marketing_budget",
  "primary_goal",
  "target_metrics",
  "main_competitors",
  "competitive_advantage"
]
```

### Quality Checks

- ✅ Product description: 200-500 words
- ✅ Value proposition: 50-100 words
- ✅ Key features: 5-10 items
- ✅ Pain points: 3-5 items minimum
- ✅ Competitors: 3-5 entries recommended

---

## 💡 Example Input (SaaS Product)

```yaml
# Company Information
company_name: "TaskFlow"
industry: "SaaS - Project Management"
company_stage: "Growth"
company_size: "11-50"
founding_year: 2023
website_url: "https://taskflow.io"

# Product Details
product_name: "TaskFlow"
product_category: "Project Management Tool for Remote Teams"
product_description: |
  TaskFlow is a collaborative project management platform designed specifically 
  for distributed teams. Unlike traditional PM tools that focus on rigid hierarchies, 
  TaskFlow emphasizes async communication, flexible workflows, and deep integrations 
  with modern work tools. Our visual timeline view, AI-powered task suggestions, 
  and real-time collaboration features help remote teams stay aligned without 
  endless meetings. Built for teams of 5-50 people who value autonomy and transparency.

unique_value_proposition: |
  The only project management tool designed from the ground up for async-first 
  remote teams, with AI-powered workflows that adapt to your team's unique way of working.

key_features:
  - "Visual timeline & Gantt charts"
  - "AI task suggestions & auto-assignment"
  - "Async communication threads"
  - "Deep Slack & Notion integrations"
  - "Custom workflow templates"
  - "Real-time collaboration"
  - "Time tracking & reporting"
  - "Mobile apps (iOS & Android)"

pricing_model: "Subscription"
price_range: "$10-25 per user/month"
product_stage: "Launched"

# Target Audience
primary_audience:
  segment_name: "Remote-first startup founders & team leads"
  
  # B2B Firmographics
  company_size: "5-50 employees"
  industry: 
    - "Technology"
    - "Design/Creative"
    - "Consulting"
    - "Marketing Agencies"
  job_titles:
    - "Founder/CEO"
    - "CTO"
    - "Head of Product"
    - "Engineering Manager"
    - "Operations Lead"
  decision_maker_level: "C-Level, VP, Director"
  
  # Pain Points
  pain_points:
    - "Team distributed across timezones - hard to coordinate"
    - "Too many meetings killing productivity"
    - "Current tools (Asana, Trello) don't support async workflows"
    - "Losing context in Slack threads"
    - "Hard to see big picture and individual tasks simultaneously"
  
  # Goals
  goals_aspirations:
    - "Scale team without losing alignment"
    - "Reduce meeting time by 50%+"
    - "Improve project visibility for stakeholders"
    - "Ship products faster with less chaos"
    - "Build sustainable remote work culture"
  
  # Current Alternatives
  current_alternatives:
    - "Asana (too rigid)"
    - "Notion (not built for PM)"
    - "Monday.com (overwhelming)"
    - "Spreadsheets (manual hell)"
  
  # Buying Triggers
  buying_triggers:
    - "Hiring more remote team members"
    - "Missed deadlines due to poor coordination"
    - "Frustrated with current tool limitations"
    - "Getting funding (ready to invest in tools)"

# Business Metrics
annual_revenue: "$500K-1M"
monthly_revenue: 75000
revenue_growth_rate: "25% MoM"

total_customers: 180
monthly_active_users: 1200
customer_acquisition_cost: 150
customer_lifetime_value: 1800
ltv_cac_ratio: 12
churn_rate: "3% monthly"

monthly_website_traffic: 12000
conversion_rate: "2.5% visitor-to-trial, 15% trial-to-paid"
average_deal_size: 350
sales_cycle_length: "14 days (trial + 1 sales call)"

active_channels:
  - "Content Marketing (Blog + SEO)"
  - "Product Hunt launches"
  - "LinkedIn Organic"
  - "Google Ads (brand)"
  - "Referral program"
top_performing_channel: "Content Marketing"
monthly_marketing_budget: 15000
team_size: 3

# Goals
primary_goal: "Acquire Customers"

target_metrics:
  - metric_name: "New Paying Customers"
    current_value: 180
    target_value: 500
    timeframe: "End of Q2 2026"
  - metric_name: "MRR"
    current_value: 75000
    target_value: 200000
    timeframe: "End of Q2 2026"
  - metric_name: "Organic Traffic"
    current_value: 8000
    target_value: 25000
    timeframe: "6 months"

secondary_goals:
  - "Establish thought leadership in remote work space"
  - "Build strong referral/viral loops"
  - "Launch enterprise tier"

constraints:
  budget_limit: 15000
  timeline_pressure: true
  resource_constraints: "Small team, need high-leverage tactics"
  regulatory_compliance: ["GDPR", "SOC 2 (in progress)"]

# Competitive Landscape
main_competitors:
  - competitor_name: "Asana"
    competitor_url: "https://asana.com"
    their_strength: "Brand recognition, robust features"
    their_weakness: "Complex UI, not async-friendly, expensive at scale"
    our_advantage: "Built for async, simpler, better integrations, AI-powered"
  
  - competitor_name: "Monday.com"
    competitor_url: "https://monday.com"
    their_strength: "Visual, customizable"
    their_weakness: "Overwhelming for small teams, pricey"
    our_advantage: "Focused on remote teams, cleaner UX, better value"
  
  - competitor_name: "Notion"
    competitor_url: "https://notion.so"
    their_strength: "Flexible, popular with startups"
    their_weakness: "Not purpose-built for PM, lacks project views"
    our_advantage: "Proper PM features, integrates WITH Notion"

market_position: "Strong Challenger"

competitive_advantage: |
  TaskFlow is the only project management tool explicitly designed for async-first 
  remote teams. While incumbents bolt on remote features, we built from scratch 
  around the needs of distributed teams. Our AI-powered workflows learn from your 
  team's patterns, our deep integrations connect your existing stack, and our 
  pricing is transparent and startup-friendly. We're not trying to be everything 
  to everyone—we're the best solution for remote-first teams of 5-50 people who 
  value autonomy, transparency, and shipping fast.
```

---

## 🎨 UI/UX Recommendations

### Form Layout

**Section 1**: Company Basics (2 minutes)  
**Section 2**: Product Details (3 minutes)  
**Section 3**: Target Audience (5 minutes) ← Most important  
**Section 4**: Metrics (2 minutes)  
**Section 5**: Goals (3 minutes)  
**Section 6**: Competition (3 minutes)

**Total**: ~18-20 minutes for thorough completion

### Progressive Disclosure

- Start with required fields only
- "Show advanced options" for optional fields
- Inline help text with examples
- Auto-save as user types

---

## 🔄 Update Frequency

**Recommended**: Update this input whenever:

- ✅ Product positioning changes
- ✅ New major feature launches
- ✅ Target audience shifts
- ✅ Significant metric changes (>20% change)
- ✅ New competitors emerge
- ✅ Business goals change

**Minimum**: Quarterly review

---

© OpenOps Studio - CopyCorn Architecture v2.0
