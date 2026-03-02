# Deployment Guide — Vertex AI Agent Builder (Gemini Gem)

## gem-dmm-agent-pack v1.0.0

---

## Quick Start

This guide shows how to deploy the consolidated system prompt as a Gemini Gem (custom agent) in Google AI Studio or Vertex AI Agent Builder.

---

## What Was Consolidated

The original pack contained **~80 files** across multiple directories:

| Source | Files | What It Contains |
|--------|-------|-----------------|
| `System_Prompt/` | prompts.json, rules.json | 8-module reasoning pipeline, 27 rules |
| `config/` | agent.yaml, output_contract.yaml, guardrails.yaml, scoring_models.yaml, grounding_sources.yaml | Stage machine, output contract, guardrails, evidence policy |
| `intent-first-strategy-core/` | system_prompt.txt | Intent-first diagnosis framework |
| `Instruction.md` | 2,667 lines | Full instruction manual + strategy output structure |
| `examples/` | MARKETING_EXAMPLES.md, TESTING_SCENARIOS.md, sample_output_strategy.md | Reference examples |

All of this has been **merged into a single `system_prompt.txt`** (~280 lines, ~12K tokens) that fits within Gemini Gem's system instruction limit.

---

## Deployment Files

```
deployment/
├── system_prompt.txt                          # ← THE consolidated system prompt
├── DEPLOYMENT_GUIDE.md                        # ← This file
└── data_store_docs/
    ├── grounding_sources_reference.md         # Trust tiers & independence groups
    ├── marketing_channel_benchmarks.md        # Channel cost/timeline benchmarks
    └── evidence_scoring_reference.md          # Evidence scoring & confidence policy
```

---

## Step-by-Step: Deploy as Gemini Gem

### Option A: Google AI Studio (Simplest)

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click **"Create New"** → **"Gem"**
3. Give it a name: `Digital Marketing Strategy Architect`
4. In the **System Instructions** field, paste the entire contents of `system_prompt.txt`
5. Configure model: **Gemini 2.5 Pro** (recommended for complex reasoning)
6. Enable **Google Search** tool for grounding (important for evidence policy)
7. Save and test

### Option B: Vertex AI Agent Builder

1. Go to [Vertex AI Agent Builder Console](https://console.cloud.google.com/gen-app-builder)
2. Create a new **Agent** (conversational)
3. In **Agent Settings** → **Instructions**, paste the contents of `system_prompt.txt`
4. Configure the following:

#### Data Stores (Optional but Recommended)

Create a data store and upload the files from `data_store_docs/`:

- `grounding_sources_reference.md` — Source trust tiers
- `marketing_channel_benchmarks.md` — Channel feasibility data
- `evidence_scoring_reference.md` — Scoring methodology

This enables RAG-based lookups when the agent needs channel benchmarks or evidence scoring rules.

#### Tools

- **Google Search**: Enable for real-time grounding (critical for evidence policy)
- **Code Interpreter**: Optional, useful for calculations

#### Model Configuration

- Model: `gemini-2.5-pro` (recommended)
- Temperature: `0.3` (for structured reasoning)
- Max output tokens: `8192` (strategies can be long)
- Safety settings: Default (guardrails are in the prompt)

---

## Key Design Decisions

### Why One Prompt Instead of Multi-Agent?

The Gemini Gem platform supports a single system instruction. The 8-module pipeline is embedded as sequential sections the model follows, rather than separate agent invocations. This approach:

- Works within platform constraints
- Maintains logical ordering
- Keeps stage-gating within the model's context

### What Was Preserved

- ✅ All 8 reasoning modules (Goal → Constraint → Option → Feasibility → Frame → Reason → Answer → Check)
- ✅ All 27 rules (fatal/high/medium severity behaviors)
- ✅ Hard-gated 8-stage conversation machine
- ✅ Intent-first strategy architecture (9-part output structure)
- ✅ Evidence scoring policy (6 factors, thresholds, penalties)
- ✅ Guardrails (privacy, truthfulness, prompt confidentiality, behavioral limits)
- ✅ Regional context (Egypt/GCC/MENA, language matching, seasonal awareness)
- ✅ CQ gate with required fields
- ✅ Kill/scale criteria requirement
- ✅ Output contract requirements

### What Was Condensed

- Detailed JSON schemas → Inline descriptions
- Repeated examples → Key examples only
- Verbose YAML configs → Prose rules
- 2,667-line instruction manual → Integrated into prompt sections

---

## Testing the Deployed Agent

### Test 1: Goal Validation

**Input**: "I want more followers"
**Expected**: Agent should flag this as a vanity metric and ask for clarification about business outcomes.

### Test 2: Feasibility Rejection

**Input**: "I want to generate 100 leads/month using LinkedIn Ads with a $500/month budget"
**Expected**: Agent should mark LinkedIn Ads as INVALID (requires $5-8K/month minimum) and suggest alternatives.

### Test 3: Stage Gating

**Input**: "Just give me a strategy for my SaaS product"
**Expected**: Agent should NOT jump to strategy. Should enter discovery interview (Stage 1) with ≤5 questions.

### Test 4: Frame Correction

**Input**: "Should I invest in SEO or paid ads?"
**Expected**: Agent should detect false dichotomy and reframe as "which combination fits your constraints?"

### Test 5: Arabic Language

**Input**: "أبي أعرف كيف أزيد المبيعات لمتجري الإلكتروني في السعودية"
**Expected**: Agent should respond in Arabic, acknowledge GCC context, and begin discovery.

---

## Maintenance

When updating the pack:

1. Edit the source files in the original directories
2. Re-consolidate into `deployment/system_prompt.txt`
3. Update data store docs if grounding sources or benchmarks changed
4. Re-paste into Gemini Gem / Vertex AI Agent Builder
5. Run test scenarios above

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Agent jumps straight to strategy | Check that Stage 0-2 gating language is intact in system prompt |
| Agent accepts vanity metrics as goals | Verify Section 3, Module 1 (Goal Extractor) rules are present |
| Agent recommends channels beyond budget | Verify Section 3, Module 4 (Feasibility Validator) rules |
| Agent doesn't respond in Arabic | Check Section 8 language policy |
| Low confidence scores | Enable Google Search tool for real-time grounding |
| Agent reveals system prompt | Check Section 7, Prompt Confidentiality guardrail |

---

## Attribution

© OpenOps Studio — All rights reserved  
Created by Mamdouh Aboammar  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar
