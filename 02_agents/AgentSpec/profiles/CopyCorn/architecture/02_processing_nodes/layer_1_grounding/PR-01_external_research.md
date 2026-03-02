# Processing Node: External Research & Grounding

**Node ID**: `PR-01`  
**Layer**: 1 (Grounding & Research)  
**Type**: Processing (LLM-powered)  
**Execution**: Sequential (after all inputs received)  
**Estimated Processing Time**: 3-5 minutes

---

## 📋 Purpose

Performs comprehensive external research to ground all subsequent strategic and tactical decisions in current industry best practices, avoiding outdated or ineffective approaches.

---

## 📥 Input Requirements

### Direct Inputs from User Input Nodes

- **IN-01**: Business Context (all fields)
- **IN-02**: Market Context (all fields)
- **IN-03**: Campaign Brief (all fields)
- **IN-04**: Assets & Constraints (optional)

### Derived Context

```yaml
industry_vertical: string
  # Extracted from IN-01.industry
target_geography: array[string]
  # Extracted from IN-02
campaign_goal: enum
  # Extracted from IN-03.goal
language_preference: enum
  # Extracted from IN-02.language
```

---

## ⚙️ Processing Logic

### Step 1: Research Planning

**Determine research priorities based on:**

```python
if campaign_goal in ["Awareness", "Acquisition"]:
    priority_topics = [
        "lead generation best practices",
        "conversion optimization",
        "channel-specific tactics"
    ]
elif campaign_goal in ["Retention", "Revenue"]:
    priority_topics = [
        "customer retention strategies",
        "lifecycle marketing",
        "upsell/cross-sell tactics"
    ]

if language_preference == "AR":
    priority_topics.append("MENA market digital marketing")
    priority_topics.append("Arabic content best practices")
```

### Step 2: Source Selection

**Priority Sources (in order)**:

1. **Growth Frameworks**: Reforge, GrowthHackers
2. **Conversion Optimization**: CXL Institute, Unbounce, VWO
3. **Inbound Marketing**: HubSpot Academy, Content Marketing Institute
4. **Platform-specific**: Meta Blueprint, Google Skillshop, LinkedIn Marketing Labs
5. **Industry Publications**: TechCrunch (tech), Shopify Blog (e-commerce), etc.
6. **Academic**: Harvard Business Review (psychology/behavioral economics)

### Step 3: Research Execution

**For each priority topic:**

```yaml
research_query:
  topic: string
  sources: array[string]
  time_range: "last 12 months" (prefer recent)
  focus_areas:
    - Current best practices
    - Proven frameworks
    - Case studies with metrics
    - Common mistakes to avoid
```

**Search Queries Template**:
```
"{industry} {campaign_goal} best practices 2025-2026"
"{channel} optimization strategies recent case studies"
"behavioral psychology {target_audience} decision-making"
"growth loops {business_model} examples"
```

### Step 4: Insight Extraction

**For each source found:**

```yaml
extract:
  - framework_name: string
  - key_principles: array[string]
  - tactical_recommendations: array[string]
  - supporting_data: object
      metric: string
      improvement: string
      source: string
  - applicability_to_our_context: enum
      # "High", "Medium", "Low"
  - implementation_complexity: enum
      # "Low", "Medium", "High"
```

### Step 5: Synthesis

**Aggregate insights into:**

1. **Proven Frameworks**: Which strategic approaches are working now?
2. **Tactical Playbooks**: Specific tactics with evidence
3. **Avoid List**: Outdated or debunked practices
4. **Gaps**: Areas where research is inconclusive or lacking

---

## 📤 Output Schema

```yaml
external_research_output:
  
  # Meta Information
  research_timestamp: datetime
  sources_consulted: integer
  confidence_score: float (0-1)
  
  # Strategic Frameworks
  recommended_frameworks:
    - framework_id: string
      framework_name: string
      source: string
      description: text
      when_to_use: text
      key_principles: array[string]
      applicability_score: float (0-1)
      evidence_strength: enum ("Strong", "Moderate", "Weak")
  
  # Tactical Insights
  channel_best_practices:
    - channel_name: string (SEO, Paid Social, Email, etc.)
      current_trends: array[string]
      proven_tactics: array[object]
          tactic_name: string
          description: text
          expected_impact: string
          implementation_effort: enum ("Low", "Medium", "High")
          case_study_reference: string (URL or citation)
      things_to_avoid: array[string]
  
  # Industry-Specific Intelligence
  industry_insights:
    - insight_category: string
      key_finding: text
      source: string
      relevance_to_our_context: text
  
  # Behavioral Psychology
  psychology_principles:
    - principle_name: string (Scarcity, Social Proof, etc.)
      description: text
      application_examples: array[string]
      target_audience_fit: text
  
  # Growth Patterns
  growth_loop_examples:
    - loop_type: string (Content, Referral, Paid Reinvestment, etc.)
      how_it_works: text
      example_companies: array[string]
      applicability_to_us: text
  
  # Creative Intelligence
  creative_trends:
    - trend_name: string
      platforms: array[string]
      example_content: text or URL
      why_it_works: text
  
  # Language/Market Specific (if applicable)
  mena_market_insights: object (if language=AR)
    cultural_considerations: array[string]
    platform_preferences: array[string]
    content_formats: array[string]
    trust_building_tactics: array[string]
  
  # What to Avoid
  debunked_practices:
    - practice_name: string
      why_avoid: text
      better_alternative: string
  
  # Knowledge Gaps
  research_gaps:
    - gap_description: text
      why_it_matters: text
      recommended_action: text
```

---

## 🔌 Output Connections

This node's output feeds into:

- **PR-02**: Internal Analysis (combines external research with internal context)
- **PR-03**: Diagnosis (uses frameworks to diagnose problems)
- **PR-04**: Direction (applies frameworks to set strategic direction)
- **PR-05**: Levers & Channels (tactical recommendations)
- **PR-07**: Creative Angles (creative trends and psychology principles)

---

## 🎯 Quality Criteria

### Minimum Quality Thresholds

- ✅ **Sources**: Minimum 8 reputable sources
- ✅ **Frameworks**: At least 3 relevant frameworks identified
- ✅ **Recency**: 80%+ of sources from last 12 months
- ✅ **Evidence**: Each recommendation backed by data or case study
- ✅ **Applicability**: Clear explanation of why it applies to our context

### Output Quality Checks

```python
def validate_research_output(output):
    checks = {
        "enough_sources": len(output.sources_consulted) >= 8,
        "has_frameworks": len(output.recommended_frameworks) >= 3,
        "has_tactics": len(output.channel_best_practices) >= 5,
        "has_psychology": len(output.psychology_principles) >= 5,
        "recent_sources": check_source_recency(output),
        "confidence": output.confidence_score >= 0.7
    }
    return all(checks.values())
```

---

## 💡 Example Output (Partial)

```yaml
external_research_output:
  research_timestamp: "2026-01-12T14:30:00Z"
  sources_consulted: 12
  confidence_score: 0.85
  
  recommended_frameworks:
    - framework_id: "growth-loops-v2"
      framework_name: "Sustainable Growth Loops (Reforge)"
      source: "https://www.reforge.com/blog/growth-loops"
      description: |
        Modern alternative to traditional funnels. Growth loops create 
        compounding effects where outputs become new inputs. Four types:
        Content Loops, Viral Loops, Paid Loops, Sales Loops.
      when_to_use: |
        Best for products with organic growth potential, content creation,
        or network effects. Essential for sustainable CAC reduction.
      key_principles:
        - "Outputs reinvest as inputs"
        - "Measure loop velocity and conversion rates"
        - "Stack multiple loops for compounding"
        - "Optimize for compound growth, not linear"
      applicability_score: 0.95
      evidence_strength: "Strong"
    
    - framework_id: "jobs-to-be-done"
      framework_name: "Jobs To Be Done (JTBD) Framework"
      source: "https://hbr.org/2016/09/know-your-customers-jobs-to-be-done"
      description: |
        Understand why customers 'hire' your product. Focus on functional,
        emotional, and social jobs rather than demographics.
      when_to_use: |
        Messaging, positioning, and understanding true customer motivations.
        Critical for resonant value propositions.
      key_principles:
        - "Focus on the job, not the customer segment"
        - "Identify triggers and desired outcomes"
        - "Understand anxieties and habits"
        - "Map the full hiring journey"
      applicability_score: 0.90
      evidence_strength: "Strong"
  
  channel_best_practices:
    - channel_name: "SEO"
      current_trends:
        - "Topical authority over individual keyword rankings"
        - "AI-generated content detection - prioritize E-E-A-T"
        - "Programmatic SEO for scalable content"
        - "Core Web Vitals increasingly important"
      proven_tactics:
        - tactic_name: "Pillar-Cluster Content Model"
          description: |
            Create comprehensive pillar pages (3000+ words) on core topics,
            supported by 8-15 cluster articles linking back. Demonstrates
            topical authority to Google.
          expected_impact: "40-60% increase in organic traffic over 6 months"
          implementation_effort: "High"
          case_study_reference: "HubSpot pillar page strategy (2024)"
        
        - tactic_name: "Bottom-of-Funnel SEO First"
          description: |
            Target high-intent, low-volume keywords first (comparison pages,
            alternative pages, solution-specific). Faster ROI than top-of-funnel.
          expected_impact: "10-15% conversion rate on BOFU pages vs 2-3% on TOFU"
          implementation_effort: "Medium"
          case_study_reference: "Ahrefs case study library 2025"
      
      things_to_avoid:
        - "Keyword stuffing (Google Helpful Content Update penalizes)"
        - "Pure AI content without human expertise/editing"
        - "Ignoring user intent in favor of search volume"
        - "Building links without earning them (risky)"
  
  psychology_principles:
    - principle_name: "Loss Aversion"
      description: |
        People are 2-2.5x more motivated to avoid losses than to achieve
        equivalent gains (Kahneman & Tversky). Frame messaging around
        what they'll lose by not acting.
      application_examples:
        - "Don't miss out on 50% off (vs Save 50%)"
        - "Protect your data from breaches (vs Secure your data)"
        - "Stop wasting $X/month on inefficiency (vs Save $X)"
      target_audience_fit: |
        Especially effective for B2B and high-consideration purchases
        where risk aversion is high.
    
    - principle_name: "Social Proof (Conformity Bias)"
      description: |
        People look to others' behavior to determine correct action,
        especially under uncertainty. 70%+ influenced by reviews/testimonials.
      application_examples:
        - "10,000+ teams use TaskFlow"
        - "Trusted by companies like [Logos]"
        - "4.8/5 stars from 2,500+ reviews"
        - "See what [Job Title] are saying..."
      target_audience_fit: |
        Universal, but especially powerful for new/unknown brands.
        B2B buyers heavily influenced by peer adoption.
  
  growth_loop_examples:
    - loop_type: "Content Loop (SEO)"
      how_it_works: |
        1. Create high-quality content
        2. Rank in Google
        3. Attract organic traffic
        4. Visitors sign up/convert
        5. User data informs new content topics
        6. Create more targeted content → Loop restarts
      example_companies:
        - "HubSpot (marketing content)"
        - "Zapier (integration guides)"
        - "Ahrefs (SEO guides)"
      applicability_to_us: |
        HIGH. Can create project management guides, remote work content,
        async collaboration best practices. Each article attracts ideal users.
  
  creative_trends:
    - trend_name: "User-Generated Content (UGC) Style Ads"
      platforms: ["Meta", "TikTok", "LinkedIn"]
      example_content: "https://example.com/ugc-ad-examples"
      why_it_works: |
        40% higher engagement than polished ads (Meta 2025 data).
        Feels authentic, less like advertising. Pattern interruption.
        Lower production cost.
  
  debunked_practices:
    - practice_name: "Generic 'Download Our Whitepaper' Lead Magnets"
      why_avoid: |
        Conversion rates down 60% from 2019. Audiences tired of gated,
        low-value content. Damages trust.
      better_alternative: |
        Interactive tools (calculators, assessments), ungated comprehensive
        guides, or productized content (free tiers, templates).
```

---

## 🎯 Node Prompt

See: [04_prompts/processing_prompts/PR-01_external_research.md](../04_prompts/processing_prompts/PR-01_external_research.md)

---

## 🔍 Monitoring & Logs

### Key Metrics to Track

- **Research Coverage**: % of required topics researched
- **Source Quality Score**: Average authority score of sources
- **Recency Score**: % of sources from last 12 months
- **Processing Time**: Time taken to complete research
- **Confidence Score**: Self-assessed quality (0-1)

### Logging Requirements

```yaml
log_entry:
  node_id: "PR-01"
  execution_id: uuid
  start_time: datetime
  end_time: datetime
  duration_seconds: integer
  sources_accessed: array[string]
  topics_researched: array[string]
  confidence_score: float
  output_size_kb: integer
  errors: array[object]
  warnings: array[object]
```

---

## 🚨 Error Handling

### Potential Issues

| Issue | Handling Strategy |
|-------|------------------|
| **Source Unavailable** | Use alternative sources, flag in output |
| **Insufficient Recent Research** | Expand time range to 18 months, note in confidence score |
| **Conflicting Information** | Present both views, note controversy |
| **No Industry-Specific Data** | Use adjacent industries, note limitation |
| **Rate Limits (APIs)** | Implement exponential backoff, cache results |

---

## 🔄 Continuous Improvement

### Feedback Loop

After campaign execution, compare:
- Recommended frameworks vs actual performance
- Predicted tactics vs what actually worked
- Research quality vs strategic outcome

**Update research priorities based on:**
- Which sources consistently provide actionable insights
- Which frameworks prove most effective
- Emerging patterns in successful campaigns

---

© OpenOps Studio - CopyCorn Architecture v2.0
