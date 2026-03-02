# Example: SaaS Analytics Company Full Optimization

**Complete Workflow Walkthrough**
**Company**: DataFlow Analytics
**Duration**: 60 minutes
**Scenario**: B2B SaaS wanting to dominate "analytics" and "real-time" queries

---

## All Inputs Filled

### IN-01: Brand Context

```yaml
Company:
  name: DataFlow Analytics
  industry: B2B SaaS - Data Analytics
  founded_year: 2019
  website: dataflow.com
  size: 75 employees

Products:
  - name: DataFlow Platform
    description: Real-time analytics for e-commerce with pre-built dashboards
    target_market: E-commerce $1M-100M ARR
    differentiators:
      - Real-time updates
      - E-commerce specific
      - No SQL required

ICP:
  role: Head of Analytics / Data Engineer
  company_size: 50-500 employees
  challenges:
    - Data silos
    - Need real-time insights
    - SQL expertise lacking
    - Predictive needs

Goals:
  primary: Become #1 cited for e-commerce analytics
  timeline: 60 days
  targets:
    - 8 LLM citations/month
    - 500 citation visits/month
    - 10% organic growth
```

### IN-03: Target Queries

```yaml
High-Priority Queries:
  - "How to measure real-time analytics"
  - "Real-time dashboards for e-commerce"
  - "SQL vs no-code analytics"
  - "Predictive analytics for retention"
  - "Analytics setup for Shopify"
  - "Customer behavior analytics"
  - "Real-time metrics guide"
  - "E-commerce KPI tracking"
```

---

## Workflow Execution

### Layer 1: Grounding (Research)

#### PR-01 Output: Query Analysis

```json
{
  "high_priority": [
    {
      "query": "How to measure real-time analytics",
      "volume": 450,
      "difficulty": "medium",
      "current_answers": 7,
      "citation_frequency": 4,
      "content_gap": "E-commerce specific examples"
    },
    {
      "query": "Real-time dashboards for e-commerce",
      "volume": 320,
      "difficulty": "medium",
      "current_answers": 5,
      "citation_frequency": 3,
      "content_gap": "Setup guide with screenshots"
    }
  ],
  "total_addressable_volume": 2100,
  "quick_wins": ["Real-time metrics", "Setup guides"]
}
```

#### PR-02 Output: SERP Analysis

```json
{
  "perplexity_landscape": {
    "query": "How to measure real-time analytics",
    "top_sources": ["segment.com", "mixpanel.com"],
    "common_points": [
      "Response time measurement",
      "Error rate tracking",
      "Throughput metrics"
    ],
    "missing": "E-commerce specific examples"
  }
}
```

#### PR-03 Output: Competitor Audit

```json
{
  "competitors": ["Mixpanel", "Segment", "Amplitude"],
  "their_strategy": {
    "schema_usage": "95% (very good)",
    "content_depth": "3000-4000 words",
    "citation_frequency": "8-10/month"
  },
  "opportunities": [
    "E-commerce positioning",
    "No-code simplicity",
    "Real-time first angle"
  ]
}
```

---

### Layer 2: Strategy Formation

#### PR-05 Output: AEO Strategy

```json
{
  "positioning": "The real-time, no-code alternative to Mixpanel",
  "quick_wins": [
    "Real-time dashboards setup",
    "E-commerce KPI guide",
    "SQL vs no-code comparison"
  ],
  "content_roadmap": {
    "week_1_2": "Quick wins (3 articles)",
    "week_3_4": "Authority pieces (2 research)",
    "week_5_6": "Depth content (4 guides)",
    "week_7_8": "Optimization pass"
  },
  "target_citations": 8,
  "estimated_timeline": "8-12 weeks to impact"
}
```

#### PR-06 Output: Authority Blueprint

```json
{
  "current_authority": {
    "domain_authority": 35,
    "monthly_citations": 2
  },
  "target_authority": {
    "domain_authority": 45,
    "monthly_citations": 8
  },
  "initiatives": [
    "Publish in VentureBeat (analytics)",
    "Speak at ShopifyDevs conference",
    "Create e-commerce analytics benchmarks"
  ],
  "timeline": "60-90 days"
}
```

---

### Layer 3: Tactical Design

#### PR-08 Output: Content Structure

```yaml
Article: "How to Measure Real-Time Analytics"

Structure:
  Opening: "3 metrics that matter (1-2 sentences)"
  Context: "Why real-time matters for e-commerce"
  Main:
    1. Response Time Measurement
    2. Throughput Tracking
    3. Error Rate Monitoring
  Examples: "E-commerce specific scenarios"
  Tools: "Implementation with DataFlow"
  CTA: "Try DataFlow free"
  Word Count: 2500
```

#### PR-10 Output: Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Measure Real-Time Analytics",
  "step": [
    {
      "@type": "HowToStep",
      "position": "1",
      "name": "Define metrics",
      "text": "Response time, throughput, error rate..."
    }
  ],
  "video": {
    "@type": "VideoObject",
    "url": "https://dataflow.com/videos/real-time-metrics"
  }
}
```

---

### Layer 4: Measurement

#### PR-12 Output: KPIs

```json
{
  "primary_kpis": {
    "monthly_citations": {
      "target": 8,
      "current": 2,
      "growth_rate": "+1/week target"
    },
    "citation_traffic": {
      "target": 500,
      "tracking": "utm_source=aeo"
    },
    "authority_growth": {
      "target": "+5 DA",
      "tracking": "monthly ahrefs export"
    }
  },
  "tracking_cadence": {
    "daily": "Perplexity check",
    "weekly": "Metrics review",
    "monthly": "Full analysis"
  }
}
```

---

## Complete Outputs Generated

### OUT-01: AEO Playbook

**30-Day Plan**:
- Week 1-2: Content optimization (3 articles)
- Week 3: Schema implementation
- Week 4: Authority outreach

**60-Day Plan**:
- Weeks 5-6: Depth content
- Week 7-8: Optimization pass
- Measurement setup complete

**90-Day Plan**:
- Continuous optimization
- A/B testing
- Authority plays launching

### OUT-02: Schema Templates

All queries have JSON-LD templates ready to deploy

### OUT-03: Content Guidelines

- E-commerce angle on all content
- No-code simplicity emphasis
- Real-time first framing
- 2500-3000 word target
- 3-5 examples minimum

### OUT-04: Authority Roadmap

- Target publications: 3
- Speaking opportunities: 2
- Research topics: 3
- Partnership targets: 5

### OUT-05: Dashboard Setup

- Weekly tracking template
- Monthly analysis checklist
- A/B testing framework
- KPI dashboard

---

## Expected Results

### Week 2
- 3 articles optimized
- Schema deployed
- 1-2 new citations

### Week 4
- Authority outreach started
- Content full depth
- 2-3 new citations

### Week 8
- 5-8 new citations
- 300+ citation visits
- Authority starts showing

### Week 12
- 8+ steady citations
- 500+ citation visits
- +10% organic growth
- Market leadership position

---

## Real Numbers

| Metric | Start | Week 4 | Week 8 | Week 12 |
|--------|-------|--------|--------|---------|
| Citations/mo | 2 | 4 | 6 | 8+ |
| Citation traffic | 50 | 150 | 350 | 500+ |
| Domain authority | 35 | 37 | 40 | 43+ |
| Organic traffic | 1000 | 1100 | 1250 | 1300+ |

---

## Key Success Factors

✅ E-commerce angle consistency
✅ Real-time framing on all content
✅ Weekly tracking
✅ Authority plays executed
✅ Schema deployed everywhere

---

**This example shows a complete 60-minute workflow producing a full 60-day transformation plan with all outputs ready to implement.**

