# Prompt Engineer - Core Capabilities

## 1. Prompt Design & Optimization

### The Anatomy of a Perfect Prompt

```markdown
[ROLE] You are a [expert type] with [credentials]
[CONTEXT] Given [situation]
[TASK] Your goal is to [specific objective]
[CONSTRAINTS] You must [requirements], avoid [limitations]
[FORMAT] Output as [structure]
[EXAMPLES] Here are 2-3 examples:
  Input: X → Output: Y
```

### Optimization Principles

1. **Clarity > Cleverness**: "List 5 points" beats "elaborate comprehensively"
2. **Specificity Wins**: "500 words, 3 sections" > "detailed article"
3. **Constraints Reduce Hallucinations**: "Use only data from 2024-2025" (50% fewer errors)
4. **Format Engineering**: JSON/XML = 90% parsing accuracy vs. free text

---

## 2. Advanced Techniques (15+)

### Chain-of-Thought (CoT)

**Best For**: Math, logic, multi-step reasoning  
**Impact**: +25-40% accuracy

```markdown
Let's solve step-by-step:
1. Identify the problem
2. List constraints
3. Evaluate 3 solutions
4. Recommend with justification

Think carefully before each step.
```

### Few-Shot Learning

**Best For**: Format replication, style consistency  
**Impact**: +60-80% consistency

```markdown
Example 1: [input] → [output]
Example 2: [input] → [output]
Example 3: [input] → [output]

Now apply to: [new input]
```

### ReAct (Reason + Act)

**Best For**: Tool use, research  
**Impact**: +35% on multi-tool tasks

```markdown
Thought: What should I do?
Action: [tool_name(params)]
Observation: [result]
Thought: What does this mean?
Action: [next_tool]
...
Final Answer: [conclusion]
```

### Self-Consistency

**Best For**: Critical decisions  
**Impact**: +20-30% accuracy (5x cost)

```markdown
Generate 5 independent solutions.
Identify the most common answer.
If no consensus, synthesize best elements.
```

### Tree-of-Thoughts (ToT)

**Best For**: Creative exploration  
**Impact**: +40% on strategy tasks

```markdown
1. Generate 3 approaches
2. Score each (1-10 feasibility)
3. Explore 2 variations of top 2
4. Select + refine best
```

---

## 3. Model-Specific Optimization

### GPT-4 Turbo (OpenAI)

**Strengths**: Reasoning, code, instruction-following  
**Cost**: $0.01/1K in, $0.03/1K out

**Tactics**:

- System messages for role/context
- `temperature=0.0-0.3` for factual, `0.7-1.0` for creative
- JSON mode for structured outputs
- "Explain reasoning internally, output only JSON"

**Example**:

```json
{
  "model": "gpt-4-turbo",
  "temperature": 0.2,
  "response_format": {"type": "json_object"},
  "messages": [
    {"role": "system", "content": "Data analyst. Output valid JSON only."},
    {"role": "user", "content": "Analyze Q4 sales: {insights:[], recommendations:[]}"}
  ]
}
```

---

### Claude 3.5 Sonnet (Anthropic)

**Strengths**: 200K context, nuance, creative writing  
**Cost**: $0.003/1K in, $0.015/1K out

**Tactics**:

- XML tags: `<instructions>`, `<context>`, `<examples>`
- `<thinking>` for internal reasoning (cleaner output)
- Long context: entire codebases, 100-page docs
- Constitutional AI (ethical boundaries)

**Example**:

```xml
<instructions>
Legal analyst reviewing vendor contract.

<context>
Client: Series A SaaS ($5M ARR)
Contract: 50-page MSA
</context>

<task>
Identify:
1. Unfavorable terms (liability)
2. Missing clauses (IP, data privacy)
3. Top 3 negotiation priorities
</task>

<output>JSON: {red_flags, missing, priorities}</output>
</instructions>
```

---

### Gemini 1.5 Pro (Google)

**Strengths**: Multimodal, 1M context, speed  
**Cost**: $0.00125/1K in, $0.005/1K out

**Tactics**:

- Multimodal: images, video, audio
- Google Search grounding (factual accuracy)
- 1M tokens: entire repos, long videos
- `temperature=1.0` (Gemini's sweet spot)

**Example**:

```python
response = model.generate_content([
    "Analyze this UI mockup, suggest 5 UX improvements:",
    Image.open("mockup.png"),
    "Focus: WCAG 2.2 accessibility, mobile UX"
])
```

---

## 4. Evaluation & Testing

### Quality Metrics (4 Es)

1. **Exactness**: Requirements match (0-100%)
2. **Efficiency**: Tokens used vs. quality
3. **Consistency**: Same input → same output (10 runs, variance)
4. **Error Rate**: Hallucinations, format breaks

### A/B Testing

| Metric | Variant A | Variant B | Winner |
|--------|-----------|-----------|--------|
| Success | 85% | 92% | B ✅ |
| Tokens | 450 | 380 | B ✅ |
| Speed | 3.2s | 3.8s | A |

**Decision**: Deploy B (quality > speed)

### Human Rubric

| Criterion | Weight |
|-----------|--------|
| Accuracy | 40% |
| Relevance | 30% |
| Clarity | 15% |
| Completeness | 15% |

**Target**: ≥4.0/5.0

---

## 5. Template Libraries

### Template Structure

```json
{
  "id": "b2b-cold-email",
  "category": "sales",
  "models": ["gpt-4", "claude-3.5"],
  "variables": ["company", "pain_point", "value_prop"],
  "prompt": "...",
  "success_rate": 0.78,
  "avg_tokens": 320
}
```

### Categories (50+ templates)

- **Content**: Blogs, social, emails, ads
- **Code**: Functions, APIs, debugging
- **Analysis**: Sentiment, summarization, competitive intel
- **Creative**: Brainstorming, naming, scripts
- **Enterprise**: RFPs, legal docs, technical specs
