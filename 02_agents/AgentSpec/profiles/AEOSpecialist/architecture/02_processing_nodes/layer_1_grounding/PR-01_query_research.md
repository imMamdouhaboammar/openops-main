# PR-01: Query Research & Intent Analysis

**Processing Node Specification**
**Layer**: 1 (Grounding & Research)
**Duration**: 5 minutes
**Inputs**: IN-01, IN-03

---

## Purpose

Analyze your target search queries for volume, intent, difficulty, and content gaps. This establishes the foundation for all downstream strategy and content work.

---

## Processing Logic

### Step 1: Query Analysis
For each target query:
- Search volume on Perplexity
- Search volume on ChatGPT Search
- Current top answers (research manually or via API)
- Answer format (list, explanation, step-by-step, etc.)
- LLM citation frequency
- Entity mentions

### Step 2: Intent Classification

Categorize by intent type:
- **How-to**: Procedural, step-by-step answers
- **What-is**: Definitional, educational content
- **Comparison**: Versus, alternatives, best-of lists
- **Problem-solving**: Solutions to challenges
- **Product-focused**: Reviews, guides, comparisons

### Step 3: Difficulty Assessment

Rate difficulty (Easy / Medium / Hard):

| Level | Criteria | Content Needed |
|-------|----------|----------------|
| **Easy** | <3 current answers, <1000 words | 1500-2000 words |
| **Medium** | 3-10 answers, 1000-3000 words | 2500-3500 words |
| **Hard** | 10+ answers, 3000+ words | 4000+ words |

### Step 4: Gap Analysis

Identify:
- What's missing from current answers
- Unique angle you can provide
- Data or research you can add
- Format improvements possible

---

## Output Schema

```json
{
  "query_analysis": {
    "query": "How to set up real-time analytics dashboard",
    "search_volume": {
      "perplexity": 450,
      "chatgpt": 320,
      "combined_estimate": 770
    },
    "intent_type": "how-to",
    "difficulty_level": "medium",
    "current_answers": {
      "count": 7,
      "top_sources": [
        "blog.mixpanel.com",
        "segment.com"
      ]
    },
    "answer_format": "step-by-step guide with video",
    "average_answer_length": 2500,
    "recommended_depth": 3000,
    "citation_frequency": {
      "monthly_on_perplexity": 4,
      "monthly_on_chatgpt": 3
    },
    "entity_mentions": [
      "SQL",
      "API",
      "real-time",
      "e-commerce"
    ],
    "content_gaps": [
      "E-commerce specific examples",
      "Cost comparison",
      "Quick start templates"
    ],
    "unique_angle": "Real-time dashboards without SQL",
    "priority_score": 85,
    "difficulty_score": 6
  }
}
```

---

## Example Output

```json
{
  "queries_analyzed": 12,
  "breakdown_by_intent": {
    "how-to": 6,
    "what-is": 3,
    "comparison": 2,
    "problem-solving": 1
  },
  "breakdown_by_difficulty": {
    "easy": 4,
    "medium": 5,
    "hard": 3
  },
  "total_addressable_queries": 12,
  "content_gap_opportunities": 5,
  "recommended_first_targets": [
    "How to set up real-time dashboards",
    "SQL vs no-code analytics",
    "Real-time metrics for e-commerce"
  ],
  "estimated_combined_search_volume": 3200
}
```

---

## Connections

```
PR-01 (Query Research)
  ├── Input: IN-01, IN-03
  ├── Output to: PR-02, PR-05, PR-08
  └── Used by: Content strategy, prioritization
```

---

## Success Criteria

✅ All queries analyzed for intent
✅ Difficulty scores realistic
✅ Gap analysis identifies unique angles
✅ Priority scores guide content work
✅ Entity mentions inform schema design

---

**Prompt**: [PR-01_query_research.md](../../04_prompts/processing_prompts/PR-01_query_research.md)
**Status**: Processing specification ready
