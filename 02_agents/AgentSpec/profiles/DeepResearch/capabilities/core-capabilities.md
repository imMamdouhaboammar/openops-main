# Core Capabilities - Deep Research Agent

## 1. TTD-DR Pipeline (8 Stages)

### Overview

The **Time-Tested Diffusion Deep Research (TTD-DR)** algorithm is a human-like iterative research process that produces evidence-backed analytical reports through denoising, self-correction, and convergence testing.

---

### Stage 1: Intent Clarifier

**Purpose**: Ensure research starts with crystal-clear objectives

**Process**:

```
User Query
    ↓
[Parse Key Concepts]
    ↓
[Identify Ambiguities]
    ↓
[Generate Clarifying Questions] ←─┐
    ↓                             │
[User Response] ──────────────────┘
    ↓
[Clarified Intent Document]
```

**Validation Rules**:

- `intent_confidence >= 0.9`
- `no_ambiguous_terms == true`
- `success_criteria_defined == true`

**Output Schema**:

```json
{
  "primary_question": "What is the current state of...",
  "sub_questions": [
    "Sub-question 1",
    "Sub-question 2"
  ],
  "scope_boundaries": {
    "in_scope": ["Topic A", "Topic B"],
    "out_of_scope": ["Topic C"]
  },
  "success_criteria": [
    "At least 10 sources from 2024-2025",
    "Cover both technical and market aspects"
  ],
  "expected_output": "Comprehensive report with recommendations"
}
```

---

### Stage 2: Initial Draft Compiler

**Purpose**: Create hypothesis or rough draft for research output

**Process**:

1. Generate initial hypothesis based on clarified intent
2. Create skeleton structure for research
3. Identify key areas to investigate
4. Set preliminary conclusions to test

**Validation**:

- `draft_length > 200 words`
- `topic_relevance_score >= 0.75`

---

### Stage 3: Research Brief Agent

**Purpose**: Convert messy draft into structured, testable research plan

**Output Structure**:

```markdown
# Research Brief: [Topic]

## Research Objectives
1. Primary objective
2. Secondary objectives

## Subtopics to Investigate
1. Subtopic 1 - [Search queries]
2. Subtopic 2 - [Search queries]
3. Subtopic 3 - [Search queries]

## Expected Sources
- Academic (2-3 papers)
- Industry reports (2-3)
- Expert opinions (3-5)
- News/current events (3-5)

## Success Metrics
- Minimum 15 unique sources
- Evidence for each major claim
- Counter-evidence addressed
```

**Validation**:

- `contains_research_objectives == true`
- `subtopics_count >= 3`

---

### Stage 4: ReAct Loop (Multi-Agent)

**Purpose**: Orchestrate reasoning and action cycles for evidence gathering

**Agent Roles**:

| Agent | Responsibility | Tools |
|-------|---------------|-------|
| **Supervisor** | Orchestrate, delegate, merge | Agent coordination |
| **Web Searcher** | General web research | Google, Bing APIs |
| **Academic Finder** | Scholarly sources | Google Scholar, Semantic Scholar |
| **Data Analyst** | Numerical data | Databases, APIs |
| **Industry Expert** | Domain-specific | Industry databases |
| **Fact Checker** | Verify claims | Cross-reference tools |

**ReAct Pattern**:

```python
for iteration in range(1, max_iterations + 1):
    # REASON: Analyze current state
    current_gaps = supervisor.identify_gaps(evidence_bundle)
    next_actions = supervisor.plan_actions(current_gaps)
    
    # ACT: Execute retrieval actions
    for action in next_actions:
        agent = assign_agent(action)
        results = agent.execute(action)
        evidence_bundle.add(results)
    
    # OBSERVE: Process and validate
    evidence_bundle = validate_sources(evidence_bundle)
    evidence_bundle = remove_duplicates(evidence_bundle)
    
    # DECIDE: Continue or converge
    if convergence_check(evidence_bundle):
        break
```

**Validation**:

- `sources_verified == true`
- `no_duplicate_entries == true`
- `minimum_sources >= research_plan.required_sources`

---

### Stage 5: Core Denoising Loop

**Purpose**: Iteratively refine draft using evidence, remove bias and noise

**Process (3 iterations)**:

```
Iteration 1: Major Corrections
├── Compare draft claims vs. evidence
├── Remove unsupported claims
├── Add missing evidence
└── Measure: bias_score, logic_consistency

Iteration 2: Refinement
├── Balance source perspectives
├── Strengthen weak arguments
├── Improve logical flow
└── Measure: improvement_rate

Iteration 3: Polish
├── Final contradiction check
├── Citation completeness
├── Clarity optimization
└── Measure: convergence_index
```

**Validation**:

- `bias_score < 0.2`
- `logic_consistency > 0.85`
- `evidence_grounding > 0.90`

**Denoising Techniques**:

1. **Contradiction Detection**: Flag conflicting claims
2. **Source Balance**: Ensure diverse perspectives
3. **Recency Weighting**: Prioritize recent sources
4. **Expert Prioritization**: Weight by source credibility

---

### Stage 6: Red Teaming Phase

**Purpose**: Challenge assumptions, attack logical gaps

**Red Team Tasks**:

#### 6.1 Assumption Attack

```
For each assumption:
  1. List explicitly
  2. Search for counter-evidence
  3. Rate vulnerability (High/Medium/Low)
  4. Document defense or acknowledge weakness
```

#### 6.2 Counter-Evidence Search

```
For each major claim:
  1. Formulate negation query
  2. Search for contradicting evidence
  3. Evaluate strength of counter-evidence
  4. Update claim confidence or revise
```

#### 6.3 Logical Gap Detection

```
Analyze argument structure:
  - Premise 1 → Premise 2 → Conclusion
  - Check for missing steps
  - Check for unsupported leaps
  - Check for circular reasoning
```

**Output**:

```json
{
  "challenged_claims": [
    {
      "claim": "...",
      "challenge": "...",
      "counter_evidence": "...",
      "resolution": "revised|defended|acknowledged"
    }
  ],
  "logical_gaps": ["..."],
  "bias_warnings": ["..."],
  "missing_areas": ["..."],
  "vulnerability_score": 0.15
}
```

**Validation**:

- `no_unverified_claims == true`
- `argument_cohesion > 0.8`
- `vulnerability_score < 0.3`

---

### Stage 7: Evaluator Agent

**Purpose**: Score research quality objectively

**Evaluation Matrix**:

| Dimension | Weight | Measurement |
|-----------|--------|-------------|
| Factual Accuracy | 30% | `verified_claims / total_claims` |
| Coherence | 20% | Logical flow score, no contradictions |
| Coverage | 25% | `topics_addressed / expected_topics` |
| Source Diversity | 15% | Count of source types |
| Recency | 10% | Average publication date score |

**Scoring Formula**:

```
Quality_Score = Σ (Dimension_Score × Weight)

Where each Dimension_Score ∈ [0, 1]
```

**Thresholds**:

- `overall_quality >= 0.85`: Pass
- `0.75 <= overall_quality < 0.85`: Conditional (minor revisions)
- `overall_quality < 0.75`: Fail (return to denoising)

---

### Stage 8: Final Report Generator

**Purpose**: Compile final research report with citations and validation metrics

**Report Schema**:

```json
{
  "title": "...",
  "executive_summary": "...",
  "methodology": {
    "pipeline": "TTD-DR v2.0",
    "iterations": 4,
    "denoising_cycles": 3,
    "sources_analyzed": 47,
    "red_team_challenges": 12
  },
  "key_findings": [
    {
      "finding": "...",
      "evidence_level": "A",
      "confidence": 0.92,
      "citations": ["source1", "source2"]
    }
  ],
  "implications": ["..."],
  "contradictions_addressed": ["..."],
  "remaining_gaps": ["..."],
  "recommendations": ["..."],
  "full_citations": [...],
  "metadata": {
    "final_confidence": 0.91,
    "quality_score": 0.87,
    "generated_at": "2026-01-10T18:00:00Z",
    "pipeline_duration": "45 minutes"
  }
}
```

---

## 2. Advanced RAG 2.0

### Hybrid Search Architecture

```
Query
  ↓
┌─────────────────────────────────────┐
│         Query Expansion             │
│  [Original] → [Synonyms, Related]   │
└─────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────────────┐
│               Parallel Retrieval                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │ Sparse  │  │  Dense  │  │  Graph  │             │
│  │(BM25/TF)│  │(Embed)  │  │  (KG)   │             │
│  └────┬────┘  └────┬────┘  └────┬────┘             │
│       └───────────┼───────────┘                     │
└───────────────────┼─────────────────────────────────┘
                    ↓
          ┌─────────────────┐
          │    Re-Ranking    │
          │  (Cross-Encoder) │
          └────────┬────────┘
                   ↓
          ┌─────────────────┐
          │  Top-K Results   │
          └─────────────────┘
```

### Query Expansion Strategies

**1. Synonym Expansion**:

```
"AI agents" → ["AI agents", "autonomous agents", "agentic AI", "LLM agents"]
```

**2. Concept Expansion**:

```
"startup funding" → ["startup funding", "venture capital", "seed round", "Series A"]
```

**3. Question Reformulation**:

```
"How does RAG work?" → [
  "RAG architecture explanation",
  "Retrieval Augmented Generation process",
  "RAG vs fine-tuning comparison"
]
```

### Multi-Hop Reasoning

**Use Case**: Complex questions requiring chained evidence

```
Query: "How did OpenAI's approach to AI safety influence their product decisions?"

Hop 1: Retrieve → OpenAI safety principles
        Reason  → Key principles identified

Hop 2: Query   → "OpenAI [principle] product decisions"
        Retrieve → Product decision examples

Hop 3: Query   → "[Product] safety features"
        Retrieve → Specific implementations

Synthesize → Connect principles → decisions → implementations
```

---

## 3. Evidence Classification System

### Level A - Strong Evidence

**Characteristics**:

- Official documentation
- Verified benchmarks
- Multiple independent sources (≥3)
- Real production case studies
- Peer-reviewed research

**Examples**:

- Vendor technical documentation
- Public incident post-mortems
- Longitudinal research data
- IEEE/ACM publications

**Decision Authority**: Can drive major decisions

---

### Level B - Moderate Evidence

**Characteristics**:

- Expert analysis
- Single credible source
- Recent but limited data
- Industry reports

**Examples**:

- Gartner/Forrester reports
- Conference presentations
- Well-documented blog posts
- Expert interviews

**Decision Authority**: Can inform decisions with acknowledgement

---

### Level C - Weak Signals

**Characteristics**:

- Anecdotal evidence
- Early trends
- Unverified claims
- Social media discussions

**Examples**:

- Twitter/Reddit discussions
- Early product announcements
- Personal opinions
- Rumors

**Decision Authority**: Exploration only, requires validation

---

## 4. Source Credibility Scoring

### Scoring Algorithm

```python
def calculate_credibility(source):
    scores = {
        'author_expertise': evaluate_author(source) * 0.25,
        'publication_quality': evaluate_publication(source) * 0.25,
        'recency': evaluate_recency(source) * 0.20,
        'conflict_of_interest': evaluate_coi(source) * 0.15,
        'corroboration': evaluate_corroboration(source) * 0.15
    }
    
    base_score = sum(scores.values())
    
    # Apply penalties
    if source.is_anonymous:
        base_score *= 0.75
    if source.is_promotional:
        base_score *= 0.70
    if source.is_outdated:
        base_score *= 0.80
    
    return min(base_score, 1.0)
```

### Credibility Thresholds

| Score | Classification | Usage |
|-------|---------------|-------|
| 0.8-1.0 | High Credibility | Primary source |
| 0.6-0.79 | Medium Credibility | Supporting source |
| 0.4-0.59 | Low Credibility | Weak signal only |
| < 0.4 | Unreliable | Exclude |

---

## 5. Knowledge Synthesis Patterns

### Pattern 1: Thematic Synthesis

```
Sources (N documents)
        ↓
[Extract Key Themes]
        ↓
[Cluster by Theme]
        ↓
[Identify Patterns within Clusters]
        ↓
[Cross-Cluster Connections]
        ↓
Synthesized Insights
```

### Pattern 2: Argument Mapping

```
Claims from Sources
        ↓
┌───────────────────────────────┐
│    Claim: "X is true"         │
│    ├── Supporting Evidence    │
│    │   ├── Source A (Level A) │
│    │   └── Source B (Level B) │
│    └── Counter Evidence       │
│        └── Source C (Level B) │
│    Weight: 0.75 (net positive)│
└───────────────────────────────┘
        ↓
Final Position with Confidence
```

### Pattern 3: Comparative Matrix

```
Entities: [A, B, C, D]
Dimensions: [D1, D2, D3, D4]

        D1    D2    D3    D4
   A   [3]   [2]   [4]   [3]
   B   [4]   [3]   [2]   [4]
   C   [2]   [4]   [3]   [2]
   D   [3]   [3]   [3]   [3]

Insights:
- A leads in D3
- B is best overall
- C differentiates on D2
```

---

## Supporting Files

For complete architecture and advanced capabilities, see:

- [`agent.md`](../agent.md) - Complete profile
- [`advanced-capabilities.md`](./advanced-capabilities.md) - Extended techniques
- [`resources.json`](../knowledge-base/resources.json) - Research resources
