# AEO Specialist - Complete Documentation

**Version**: 2.0 (Architecture Mode)
**Total Pages**: 8,000+ words
**Status**: Production Ready

---

## Table of Contents

1. [Overview](#overview)
2. [Node Catalog](#node-catalog)
3. [Implementation Guide](#implementation-guide)
4. [Extension Framework](#extension-framework)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Overview

### What is AEO?

**Answer Engine Optimization (AEO)** is the practice of optimizing content to be the chosen answer in AI-powered search engines.

Unlike SEO (search engine optimization) which focuses on keyword rankings in Google, AEO focuses on:

- **Fact-based accuracy** for LLM training
- **Structural clarity** for AI parsing
- **Authority signals** for citation selection
- **Semantic richness** for knowledge graphs
- **Conversational readiness** for voice queries

### Why AEO Matters Now

1. **AI Search Growth**: Perplexity, ChatGPT Search, Google SGE are changing search
2. **Citation Economy**: Being cited by AI is the new backlink
3. **Direct Answers**: Appearing in AI responses drives traffic & trust
4. **Authority Building**: LLM citations are stronger signals than traditional links
5. **Competitive Advantage**: Early movers in AEO will dominate

### AEO vs SEO vs SEM

| Aspect | SEO | AEO | SEM |
|--------|-----|-----|-----|
| **Focus** | Keyword ranking | LLM citation | Ad placement |
| **Engine** | Google, Bing | Perplexity, ChatGPT | Google Ads |
| **Signal** | Backlinks, CTR | Accuracy, authority | Budget, CPC |
| **Timeline** | 6-12 months | 2-4 months | Immediate |
| **Cost** | Organic | Organic | Paid |

---

## Node Catalog

### Input Nodes (4)

#### IN-01: Brand & Domain Context

**Purpose**: Establish baseline knowledge about your brand

**Input Schema**:
```yaml
Company:
  - name: string
  - industry: string
  - founded: year
  - headquarters: location
  - website: url

Products:
  - name: string
  - description: string
  - target_market: string
  - key_features: array

ICP (Ideal Customer Profile):
  - role: string
  - company_size: string
  - industry: string
  - challenges: array

Key Metrics:
  - monthly_revenue: number
  - mrr: number
  - churn_rate: number
  - ltv: number

Goals:
  - primary_goal: string
  - secondary_goals: array
  - timeline: string
```

**Example Filled**:
```yaml
Company:
  - name: "DataFlow Analytics"
  - industry: "B2B SaaS - Data Analytics"
  - founded: 2019
  - headquarters: "San Francisco, CA"
  - website: "dataflow.com"

Products:
  - name: "DataFlow Platform"
  - description: "Real-time analytics for e-commerce"
  - target_market: "E-commerce businesses $1M-100M ARR"
  - key_features: ["Real-time dashboards", "Predictive analytics", "API access"]

ICP:
  - role: "Head of Analytics / Data Engineer"
  - company_size: "50-500 employees"
  - industry: "E-commerce, SaaS"
  - challenges: ["Data silos", "Real-time insights", "Team enablement"]

Key Metrics:
  - monthly_revenue: "$500K"
  - mrr: "$500K"
  - churn_rate: "3%"
  - ltv: "$145K"

Goals:
  - primary_goal: "Become the #1 cited source for e-commerce analytics"
  - secondary_goals: ["10% increase in organic traffic", "5 LLM citations/month"]
  - timeline: "60 days"
```

**Connections**: → PR-01, PR-05, PR-06, PR-10

---

#### IN-02: Existing Content Library

**Purpose**: Inventory all existing assets for optimization

**Input Schema**:
```yaml
Blog Posts:
  - title: string
  - url: string
  - word_count: number
  - topics: array
  - seo_rank: number

Case Studies:
  - title: string
  - url: string
  - customer: string
  - results: string

Documentation:
  - section: string
  - url: string
  - type: string

Product Pages:
  - name: string
  - url: string
  - focus: string

FAQs:
  - question: string
  - answer_length: number
  - indexed: boolean
```

**Example**:
- 45 blog posts on analytics, SQL, dashboards
- 8 case studies with measurable results
- 150 FAQ entries
- 5 product documentation sections

**Connections**: → PR-02, PR-08, PR-11

---

#### IN-03: Target Search Queries

**Purpose**: Define queries you want to win

**Input Schema**:
```yaml
High-Intent Queries:
  - query: string
  - search_volume: number
  - intent: enum ["how-to", "what-is", "comparison", "problem-solving"]
  - difficulty: enum ["easy", "medium", "hard"]
  - relevance_score: 1-10

Comparison Queries:
  - query: string
  - competitors: array

How-To Queries:
  - query: string
  - num_steps: number

Definition Queries:
  - query: string
  - complexity: "basic" | "advanced"
```

**Example** (DataFlow):
- "How to measure ecommerce analytics in real-time"
- "What is predictive analytics for e-commerce"
- "Klaviyo vs DataFlow analytics comparison"
- "SQL for e-commerce metrics"
- "Real-time dashboard setup guide"

**Connections**: → PR-01, PR-05, PR-08

---

#### IN-04: Competitor Intelligence

**Purpose**: Understand competitive landscape

**Input Schema**:
```yaml
Competitors:
  - name: string
  - website: url
  - content_count: number
  - ranking_keywords: array
  - authority_score: number
  
Their AEO Tactics:
  - schema_usage: boolean
  - structured_data: array
  - citation_frequency: number
  - content_depth: "shallow" | "medium" | "deep"

Opportunities:
  - gap_area: string
  - content_idea: string
  - potential_citations: number
```

**Example** (DataFlow Competitors):
- Segment, Amplitude, Mixpanel
- All have 100+ blog posts
- Use JSON-LD schema extensively
- Cited 5-10x/month in AI responses

**Connections**: → PR-03, PR-06, PR-07

---

### Processing Nodes (13)

#### LAYER 1: Grounding & Research (4 nodes)

##### PR-01: Query Research & Intent Analysis

**Input**: IN-01, IN-03
**Output**: Query research report

**Processing Logic**:
1. Analyze each target query for:
   - Search volume on Perplexity, ChatGPT
   - Current top answers
   - Answer format (list, explanation, comparison)
   - LLM citation frequency
   - Entity mentions

2. Categorize by intent:
   - **How-to**: Procedural answers, step-by-step
   - **What-is**: Definitional, educational
   - **Comparison**: Versus, alternatives
   - **Problem-solving**: Solutions to challenges

3. Assess difficulty:
   - **Easy**: < 3 current answers, under 1000 words
   - **Medium**: 3-10 current answers, 1000-3000 words
   - **Hard**: 10+ answers, 3000+ words

4. Identify content gaps

**Output Schema**:
```json
{
  "query_analysis": {
    "query": "How to set up real-time analytics dashboard",
    "search_volume_perplexity": 450,
    "search_volume_chatgpt": 320,
    "intent_type": "how-to",
    "difficulty": "medium",
    "current_answers": 7,
    "top_answer_sources": ["blog.mixpanel.com", "segment.com"],
    "answer_format": "step-by-step guide",
    "average_word_count": 2500,
    "required_depth": 3000,
    "citation_frequency": 4,
    "entity_mentions": ["SQL", "API", "real-time"]
  }
}
```

**Prompt**: [PR-01_query_research.md](04_prompts/processing_prompts/PR-01_query_research.md)

---

##### PR-02: Answer Engine Search Analysis

**Input**: IN-03
**Output**: Current SERP landscape report

**Processing Logic**:
1. For each target query, research on:
   - Perplexity.ai top answers
   - ChatGPT search results
   - Google SGE (if available)
   - SearchGPT if available

2. Extract from each answer:
   - Source domain
   - Content type (blog, docs, FAQ)
   - Answer structure
   - Key points included
   - Citation authority score

3. Identify patterns:
   - Most cited sources
   - Common answer frameworks
   - Missing information
   - Authority signals used

**Output**:
```json
{
  "query": "How to measure API performance",
  "perplexity_top_source": "dataflow.com/blog/api-metrics",
  "chatgpt_cited_sources": ["site1.com", "site2.com"],
  "common_answer_points": [
    "Response time measurement",
    "Error rate tracking",
    "Throughput metrics"
  ],
  "missing_information": [
    "Real-world thresholds",
    "Tool comparisons"
  ],
  "authority_signals": ["HTTPS", "Backlinks", "Author credentials"]
}
```

---

##### PR-03: Competitor AEO Audit

**Input**: IN-04
**Output**: Competitive analysis report

**Processing Logic**:
1. Audit competitor content for:
   - Schema markup usage (JSON-LD, microdata)
   - Internal linking strategy
   - Citation authority signals
   - Content depth & structure
   - FAQ/Q&A optimization

2. Analyze their strategy:
   - Topic clusters
   - Content gaps they're filling
   - How they're building authority
   - Their winning queries

3. Identify opportunities:
   - Queries they DON'T rank for
   - Content gaps you can fill
   - Authority plays they've missed

**Output**:
```json
{
  "competitor": "Mixpanel",
  "schema_usage": 95,
  "top_queries": [
    "Product analytics platform",
    "User behavior tracking"
  ],
  "missing_queries": [
    "Real-time analytics for e-commerce",
    "SQL-based analytics"
  ],
  "authority_score": 87,
  "citation_frequency": 8,
  "opportunity_gap": "Real-time metrics for e-commerce"
}
```

---

##### PR-04: Knowledge Graph & Entity Mapping

**Input**: IN-01, IN-03
**Output**: Knowledge structure document

**Processing Logic**:
1. Map entities related to your business:
   - Core concepts (products, features)
   - Related entities (competitors, alternatives)
   - Industry entities (frameworks, standards)
   - People entities (founder, experts)

2. Map relationships:
   - Product uses Feature
   - Feature solves Problem
   - Problem faced by ICP
   - Company builds Product

3. Structure for LLM understanding:
   - Clear hierarchy
   - Relationship types
   - Authority indicators

**Output**:
```json
{
  "entities": {
    "dataflow_platform": {
      "type": "Product",
      "alternative_to": ["Mixpanel", "Amplitude"],
      "solves": ["Real-time insights", "Data silos"],
      "uses_tech": ["SQL", "API", "WebSocket"],
      "target_ica": "DataFlow ICP object"
    },
    "real-time_analytics": {
      "type": "Feature",
      "part_of": ["dataflow_platform"],
      "related_to": ["Dashboard", "SQL", "API"]
    }
  }
}
```

---

#### LAYER 2: Strategy Formation (3 nodes)

##### PR-05: AEO Strategy Definition

**Input**: PR-01, PR-02, PR-03, IN-01
**Output**: AEO strategy document

**Processing Logic**:
1. Prioritize queries by:
   - Relevance to business goals
   - Likelihood of LLM citation
   - Competitor strength
   - Content volume needed

2. Define positioning:
   - Core differentiator
   - Unique angle vs competitors
   - Authority building focus
   - Content themes

3. Plan content roadmap:
   - Quick wins (weeks 1-2)
   - Medium plays (weeks 3-6)
   - Long-term content (months 2-3)

4. Set success metrics

**Output**:
```json
{
  "strategy": {
    "primary_focus": "Real-time analytics for e-commerce",
    "positioning": "The real-time alternative to Mixpanel",
    "quick_wins": [
      "Real-time dashboards setup",
      "SQL optimization for e-commerce"
    ],
    "authority_play": "Publish 3 authoritative guides",
    "target_citations": 5,
    "timeline": "60 days"
  }
}
```

---

##### PR-06: Authority Blueprint

**Input**: IN-01, IN-04, PR-02
**Output**: Authority building plan

**Processing Logic**:
1. Analyze current authority:
   - Domain authority metrics
   - Backlink profile
   - Citation frequency
   - Trust signals

2. Identify authority gaps:
   - Where competitors beat you
   - Missing credentials/awards
   - Weak on certain topics

3. Plan authority building:
   - Industry publication pitches
   - Expert credibility plays
   - Academic/research partnerships
   - Media mentions

**Output**:
```json
{
  "current_authority": {
    "domain_authority": 35,
    "monthly_citations": 2,
    "trusted_backlinks": 150
  },
  "target_authority": {
    "domain_authority": 45,
    "monthly_citations": 8,
    "trusted_backlinks": 300
  },
  "initiatives": [
    "Publish in TechCrunch/VentureBeat",
    "Speak at industry conferences",
    "Create original research"
  ]
}
```

---

##### PR-07: Citation Mapping

**Input**: PR-02, PR-03, PR-06
**Output**: Citation opportunities list

**Processing Logic**:
1. Identify where competitors get cited
2. Find opportunities for your citations
3. Map authority sources
4. Plan citation strategy

**Output**:
```json
{
  "citation_opportunities": [
    {
      "source": "Perplexity.ai",
      "query": "Best analytics platforms 2024",
      "current_cited": ["Segment", "Mixpanel"],
      "opportunity": "Unique e-commerce positioning"
    }
  ],
  "target_citations": [
    "Perplexity",
    "ChatGPT",
    "Google SGE"
  ]
}
```

---

#### LAYER 3: Tactical Design (4 nodes)

##### PR-08: Content Structuring

**Input**: PR-01, IN-02, PR-05
**Output**: Content structure templates

**Processing Logic**:
1. For each query, design answer structure:
   - Opening statement (1 sentence)
   - Context/background
   - Main explanation
   - Examples
   - Steps (if how-to)
   - Summary
   - CTA

2. Optimize for LLM parsing:
   - Clear headings
   - Bullet points where appropriate
   - Structured data markers
   - Link anchors

3. Define content depth:
   - Minimum word count
   - Required sections
   - Key information points

**Output**:
```yaml
Content Structure - "How to Set Up Real-Time Analytics":
  Opening: "Define the problem in 1-2 sentences"
  Context: "Why real-time matters for e-commerce"
  Main: "Step-by-step setup process"
  Tools: "Tools you'll need"
  Examples: "Real e-commerce examples"
  Summary: "Key takeaways"
  CTA: "Try DataFlow for free"
```

---

##### PR-09: Fact Verification & Sources

**Input**: PR-01, PR-05
**Output**: Fact verification checklist

**Processing Logic**:
1. Identify all factual claims
2. Cross-verify with authoritative sources
3. Get primary sources for claims
4. Check competitor claims
5. Find controversies/debates

**Output**:
```json
{
  "fact_check": [
    {
      "claim": "Real-time analytics reduces decision time by 60%",
      "source": "Internal DataFlow case study",
      "verification": "Cross-checked with 3 case studies",
      "confidence": "High"
    }
  ]
}
```

---

##### PR-10: Schema Markup Design

**Input**: PR-01, IN-02, PR-08
**Output**: JSON-LD schema templates

**Processing Logic**:
1. Design schema for each content type:
   - BlogPosting schema for blog posts
   - FAQPage for Q&A content
   - HowTo for procedural content
   - Product schema for product pages
   - Organization schema for brand

2. Include all relevant fields:
   - Structured data attributes
   - Entity relationships
   - Rich snippet data

3. Generate valid JSON-LD

**Output**:
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Set Up Real-Time Analytics Dashboard",
  "description": "Complete guide...",
  "step": [
    {
      "@type": "HowToStep",
      "position": "1",
      "name": "Connect your data source",
      "text": "..."
    }
  ]
}
```

---

##### PR-11: Direct Answer Optimization

**Input**: PR-01, PR-08, PR-09
**Output**: Optimized answer copy

**Processing Logic**:
1. Rewrite content for direct answer format:
   - Lead with the answer (not context)
   - Make it scannable
   - Use clear language
   - Avoid jargon when possible
   - Make it LLM-friendly

2. Optimize for citations:
   - Clear source attribution
   - Authority signals
   - Fact accuracy
   - Comprehensiveness

3. Test for readability:
   - AI comprehension score
   - Clarity index
   - Citation-worthiness score

**Output**:
```markdown
# How to Measure Real-Time Analytics Performance

**Quick Answer**: Track four key metrics: response time, throughput, error rate, and latency percentiles.

**Detailed Guide**:
1. Response time: Measure end-to-end response latency
2. Throughput: Track events processed per second
3. Error rate: Monitor percentage of failed requests
...
```

---

#### LAYER 4: Measurement Design (2 nodes)

##### PR-12: AEO KPIs Definition

**Input**: IN-01, PR-05
**Output**: KPI definitions document

**Processing Logic**:
1. Define primary KPIs:
   - LLM citation rate
   - Citation sources
   - Traffic from citations
   - Conversion rate

2. Define secondary KPIs:
   - Visibility score
   - Authority growth
   - Content coverage

3. Set targets and timelines

**Output**:
```json
{
  "kpis": {
    "monthly_citations": {
      "definition": "Number of times cited in LLM responses",
      "target": 8,
      "current": 2,
      "timeline": "60 days"
    },
    "citation_traffic": {
      "definition": "Traffic from LLM citations",
      "target": "500 visits/month",
      "tracking": "UTM parameters"
    }
  }
}
```

---

##### PR-13: Tracking & Testing Framework

**Input**: PR-12
**Output**: Measurement setup guide

**Processing Logic**:
1. Set up tracking:
   - UTM parameters
   - Event logging
   - Citation monitoring tools
   - Authority tracking

2. Define A/B tests:
   - Content structure variants
   - Answer format tests
   - Schema markup tests
   - CTA variations

3. Create dashboard template

**Output**:
```yaml
Tracking Setup:
  Citation Monitor: "Monitor Perplexity, ChatGPT weekly"
  Traffic Attribution: "Use UTM: utm_source=aeo&utm_medium=citation"
  Authority Tracking: "Ahrefs/SEMrush weekly checks"
  
A/B Tests:
  - Content format (list vs narrative)
  - Answer length (1000 vs 2500 words)
  - Schema types (FAQPage vs HowTo)
```

---

### Output Nodes (5+)

#### OUT-01: AEO Playbook

**Contents**:
- Executive summary
- 30-60-90 day plan
- Query prioritization
- Content calendar
- Team roles & responsibilities
- Success metrics

**Audience**: Marketing team, executives

---

#### OUT-02: Schema Markup Templates

**Contents**:
- JSON-LD templates for all content types
- Implementation guide
- Validation checklist
- Common mistakes to avoid

**Audience**: Dev team, webmasters

---

#### OUT-03: Content Specs & Guidelines

**Contents**:
- Content structure templates
- Minimum word count requirements
- Required sections for each query
- Writing guidelines for LLM optimization
- Example optimized content

**Audience**: Content creators, copywriters

---

#### OUT-04: Authority Building Roadmap

**Contents**:
- 60-day authority plan
- Backlink opportunities
- Media mention targets
- Partnership opportunities
- Research/original content ideas

**Audience**: Marketing, partnerships, PR

---

#### OUT-05: AEO Dashboard Setup

**Contents**:
- KPI dashboards
- Monitoring tools setup
- A/B testing framework
- Weekly review template
- Monthly analysis template

**Audience**: Analytics team, management

---

## Implementation Guide

### Phase 1: Setup (Week 1)

1. **Fill Inputs** (2 hours)
   - Complete IN-01 through IN-04
   - Gather content inventory
   - List target queries
   - Research competitors

2. **Run Layer 1** (3 hours)
   - Execute PR-01 through PR-04
   - Review research findings
   - Validate query prioritization

### Phase 2: Strategy (Week 1-2)

1. **Run Layer 2** (2 hours)
   - Execute PR-05 through PR-07
   - Align team on strategy
   - Identify authority plays

### Phase 3: Execution (Week 2-4)

1. **Run Layer 3** (4 hours)
   - Execute PR-08 through PR-11
   - Generate content specs
   - Create schema templates
   - Optimize existing content

### Phase 4: Measurement (Week 4+)

1. **Run Layer 4** (2 hours)
   - Execute PR-12 and PR-13
   - Set up dashboards
   - Begin tracking
   - Run A/B tests

### Phase 5: Continuous Improvement

1. Weekly review of KPIs
2. Monthly strategy adjustment
3. Quarterly major updates

---

## Extension Framework

### Adding New Nodes

**Step 1**: Define node spec
```yaml
Node: PR-14_emerging_queries
Input: PR-12 (KPI data)
Output: New query opportunities
Processing: Monitor trending questions
```

**Step 2**: Create processing logic

**Step 3**: Write LLM prompt

**Step 4**: Define output schema

**Step 5**: Test with sample data

**Step 6**: Integrate into workflow

### Custom Workflows

Create custom workflows by:
1. Selecting subset of nodes
2. Defining input/output mappings
3. Running in sequence
4. Collecting outputs into custom package

---

## Best Practices

### ✅ Content Quality

- Prioritize accuracy over length
- Use authoritative sources
- Cross-verify all claims
- Include original data when possible

### ✅ Authority Building

- Publish original research
- Get industry publication coverage
- Build author authority
- Create linkable assets

### ✅ Schema Implementation

- Use valid JSON-LD
- Include all relevant fields
- Update schema as content changes
- Test with Google Rich Results

### ✅ Measurement

- Track consistently
- Review metrics weekly
- Adjust strategy monthly
- Document learnings

---

## Troubleshooting

### Low Citation Rate

**Causes**:
- Unclear/inaccurate content
- Missing authority signals
- Poor content visibility
- Competing sources stronger

**Solutions**:
- Improve content clarity
- Add more authority signals
- Increase backlinks
- Publish more frequently

### Low Traffic from Citations

**Causes**:
- No CTA in content
- Weak value proposition
- Technical issues with tracking
- Citation sources not relevant

**Solutions**:
- Add clear, relevant CTAs
- Improve value prop
- Fix tracking UTM parameters
- Focus on high-intent citations

### Schema Not Showing Rich Results

**Causes**:
- Invalid JSON-LD
- Missing required fields
- Schema not indexed by Google
- Not rich results eligible

**Solutions**:
- Validate with Google Rich Results tool
- Add missing fields
- Check Search Console
- Follow eligibility guidelines

---

## Glossary

| Term | Definition |
|------|-----------|
| **AEO** | Answer Engine Optimization - optimizing for AI search |
| **Citation** | When an AI mentions your content as a source |
| **Schema** | Structured data markup (JSON-LD, microdata) |
| **Entity** | Key concept or topic (company, product, person) |
| **Authority** | Trust and credibility signals |
| **Intent** | What user wants (how-to, what-is, comparison) |
| **SERP** | Search engine results page |

---

**AEO Specialist v2.0** - Make Your Brand the Chosen Answer
