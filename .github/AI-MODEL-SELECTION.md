# AI Model Selection Guide for PixelForge Studio
**Version**: 1.0  
**Last Updated**: 2026-01-11  
**Research Based On**: Artificial Analysis Intelligence Index v4.0 + GitHub/Anthropic/OpenAI Official Benchmarks

---

## 📊 Research Summary

Based on comprehensive benchmarking from Artificial Analysis (Jan 2026), the following AI models excel in specific task categories:

### **Top Overall Intelligence Models**
1. **GPT-5.2 (xhigh)** - Intelligence Score: 51
2. **Claude Opus 4.5** - Intelligence Score: 49  
3. **Gemini 3 Pro Preview (high)** - Intelligence Score: 48
4. **GPT-5.1 (high)** - Intelligence Score: 47
5. **Claude 4.5 Sonnet** - Intelligence Score: 42

### **Best for Speed (Tokens/sec)**
1. **gpt-oss-120B (high)** - 355 t/s
2. **Gemini 3 Flash** - 220 t/s
3. **Llama 4 Maverick** - 135 t/s

### **Best for Cost-Effectiveness**
1. **MiMo-V2-Flash** - $0.10/1M tokens
2. **gpt-oss-120B (high)** - $0.31/1M tokens
3. **DeepSeek V3.2** - $0.28/1M tokens

### **Best for Coding (SciCode Benchmark)**
1. **GPT-5.1 (high)** - 75%
2. **Claude Opus 4.5** - 74%
3. **KAT-Coder-Pro V1** - 74%

### **Best for Complex Reasoning (GPQA Diamond)**
1. **Gemini 3 Pro Preview (high)** - 91%
2. **GPT-5.2 (xhigh)** - 90%
3. **Gemini 3 Flash** - 90%

---
## ⚠️ DEPRECATED - Gemini 3 Pro is Now Exclusive

**This document reflects the old multi-model approach.**  
**Current Status**: All operations now use Gemini 3 Pro exclusively.

Please refer to `.github/AGENT-MODEL-UPDATES.md` for current Gemini 3 Pro configuration.

---

## 🎯 Gemini 3 Pro Configuration (Current)

### **Universal Configuration for All Tasks**
**Primary Model**: **Gemini 3 Pro Preview** (Exclusive)  
**Backup Model**: None

**Rationale**:
- **State-of-the-Art Reasoning**: Superior multimodal understanding
- **Advanced Thinking**: Dynamic thinkingLevel configuration (HIGH/LOW)
- **Unified Approach**: Single model for all operations
- **Multimodal Support**: text, image, audio, video, documents
- **No Legacy Models**: Gemini 2.0, 2.5, 1.5 not supported

**Settings**:
```yaml
model: gemini-3-pro-preview
temperature: 0.7  # Adjustable per task
max_tokens: 2048  # Adjustable per task
thinkingLevel: HIGH  # Use HIGH for complex analysis, LOW for speed
```

---

## 📚 Old Multi-Model Approach (DEPRECATED)

### **1. Specification Writing (speckit-specify)** ❌ DEPRECATED
**Old Model**: Claude Opus 4.5 (Reasoning Mode)  
**New Model**: Gemini 3 Pro Preview
- **Multi-Modal Understanding**: Can process diagrams, flowcharts, and technical schemas
- **Constitutional Compliance**: Strong at ensuring adherence to established patterns (GDPval-AA: 46%)
- **Trade-off Analysis**: Exceptional at evaluating tech stack alternatives

**Settings**:
```yaml
model: gpt-5.2-xhigh
temperature: 0.3  # Lower for deterministic technical decisions
max_tokens: 6000
reasoning: true  # Enable for architecture complexity analysis
```

---

### **3. Task Breakdown (speckit-tasks)**
**Primary Model**: **Claude 4.5 Sonnet** (Reasoning Mode)  
**Backup Model**: **GPT-5.1 (high)**

**Rationale**:
- **Hierarchical Decomposition**: Excellent at breaking complex features into atomic tasks
- **Dependency Analysis**: Strong at identifying task dependencies and parallelization opportunities
- **User Story Mapping**: Superior narrative structuring capabilities
- **Speed**: 80 tokens/sec - Fast enough for rapid task generation
- **Cost-Effective**: $6/1M tokens - Affordable for frequent task breakdowns
- **Reasoning Mode**: Ensures logical task sequencing and MVP scope validation

**Settings**:
```yaml
model: claude-4.5-sonnet-reasoning
temperature: 0.5  # Balanced for creative yet structured task breakdown
max_tokens: 8000
thinking_budget: high  # Critical for dependency graph generation
```

---

### **4. Code Implementation (speckit-implement)**
**Primary Model**: **KAT-Coder-Pro V1** (for focused code generation)  
**Secondary Model**: **GPT-5.1 Codex (high)** (for complex refactoring)  
**Backup Model**: **Claude 4.5 Sonnet**

**Rationale**:
- **KAT-Coder-Pro V1**: 
  - SciCode: 74% - Tied for best coding performance
  - Specialized for code generation and bug fixing
  - Cost: Unknown (check latest pricing)
- **GPT-5.1 Codex (high)**:
  - Purpose-built for code with 400k context window
  - Superior at large codebase refactoring
  - Terminal-Bench Hard: 68% - Excellent for command-line tools
- **Claude 4.5 Sonnet**:
  - Agentic Coding Eval: 64% (internal Anthropic benchmark)
  - Best at code translation and legacy modernization
  - 2x faster than Claude 3 Opus

**Settings** (KAT-Coder-Pro):
```yaml
model: kat-coder-pro-v1
temperature: 0.2  # Deterministic for production code
max_tokens: 4000
code_style: strict  # Follow PixelForge conventions
```

**Settings** (GPT-5.1 Codex):
```yaml
model: gpt-5.1-codex-high
temperature: 0.1  # Lowest for bug-free code
max_tokens: 8000
context_window: 400000  # Utilize full context for large files
```

---

### **5. Ambiguity Resolution (speckit-clarify)**
**Primary Model**: **Claude Opus 4.5** (Non-reasoning Mode)  
**Backup Model**: **Gemini 3 Pro Preview (high)**

**Rationale**:
- **Conversational Excellence**: Best-in-class at interactive Q&A sessions
- **Context Retention**: 200k context window - Maintains full conversation history
- **Question Formulation**: Superior at crafting targeted clarification questions
- **Fast Response**: 82 tokens/sec - Enables real-time interaction
- **Empathy Modeling**: Excellent at understanding user intent and providing helpful recommendations

**Settings**:
```yaml
model: claude-opus-4.5
temperature: 0.8  # Higher for natural, conversational tone
max_tokens: 2000  # Short, focused questions
stream: true  # Enable streaming for interactive feel
```

---

### **6. Governance Management (speckit-constitution)**
**Primary Model**: **GPT-5.2 (xhigh)** (Non-reasoning)  
**Backup Model**: **Claude Opus 4.5**

**Rationale**:
- **Policy Enforcement**: Highest intelligence for interpreting governance rules
- **Version Control Understanding**: Strong at semantic versioning logic (GDPval-AA: 46%)
- **Template Propagation**: Excellent at applying changes across multiple files systematically
- **Consistency Checking**: Superior at detecting governance violations
- **Long-Form Documentation**: Best at generating comprehensive constitutional documentation

**Settings**:
```yaml
model: gpt-5.2-xhigh
temperature: 0.2  # Strict for governance rules
max_tokens: 10000  # Long constitutions
reasoning: false  # Speed priority for template propagation
```

---

### **7. Code Review & Analysis (speckit-analyze)**
**Primary Model**: **DeepSeek V3.2** (Reasoning Mode)  
**Backup Model**: **Claude 4.5 Sonnet**

**Rationale**:
- **Cost-Effective**: $0.28/1M tokens - Enables frequent code reviews
- **Reasoning Capability**: DeepSeek V3.2 Reasoning mode for deep analysis
- **Pattern Recognition**: Strong at identifying anti-patterns and code smells
- **Speed**: 31 tokens/sec - Adequate for batch file analysis
- **Open Source Friendly**: Open weights model - Aligns with PixelForge philosophy

**Settings**:
```yaml
model: deepseek-v3.2-reasoning
temperature: 0.3  # Objective analysis
max_tokens: 5000
analysis_depth: comprehensive  # Include metrics, complexity, security
```

---

### **8. Checklist Validation (speckit-checklist)**
**Primary Model**: **Gemini 3 Flash** (Reasoning Mode)  
**Backup Model**: **GPT-5.1 (high)**

**Rationale**:
- **Speed**: 220 tokens/sec - Fastest among high-intelligence models
- **Reasoning at Speed**: Gemini 3 Flash Reasoning mode combines accuracy + performance
- **Cost-Effective**: $1.11/1M tokens - Affordable for frequent validation checks
- **High Accuracy**: Intelligence Index 46 - Reliable for checklist verification
- **Large Context**: 128k tokens - Can validate entire implementation plans

**Settings**:
```yaml
model: gemini-3-flash-reasoning
temperature: 0.1  # Binary checklist validation
max_tokens: 3000
reasoning_type: verification  # Focus on yes/no validation logic
```

---

## 📐 Model Selection Matrix

| Agent | Primary Model | Intelligence | Speed (t/s) | Cost ($/1M) | Key Strength |
|-------|--------------|--------------|-------------|-------------|--------------|
| **speckit-specify** | Claude Opus 4.5 | 49 | 82 | $10 | Natural language understanding |
| **speckit-plan** | GPT-5.2 (xhigh) | 51 | 117 | $4.80 | System architecture design |
| **speckit-tasks** | Claude 4.5 Sonnet | 42 | 80 | $6 | Hierarchical decomposition |
| **speckit-implement** | KAT-Coder-Pro V1 | 36 | 62 | TBD | Code generation accuracy |
| **speckit-clarify** | Claude Opus 4.5 | 49 | 82 | $10 | Conversational Q&A |
| **speckit-constitution** | GPT-5.2 (xhigh) | 51 | 117 | $4.80 | Policy enforcement |
| **speckit-analyze** | DeepSeek V3.2 | 41 | 31 | $0.28 | Cost-effective review |
| **speckit-checklist** | Gemini 3 Flash | 46 | 220 | $1.11 | Fast validation |

---

## 🔄 Fallback Strategy

```
Priority 1 (Primary Model Unavailable):
  └─> Use Backup Model from same tier

Priority 2 (Backup Model Unavailable):
  └─> Claude 4.5 Sonnet (Universal Fallback)
      - Intelligence: 42 (Above Average)
      - Speed: 80 t/s (Fast)
      - Cost: $6/1M (Affordable)
      - Availability: High (Anthropic API + AWS Bedrock + Google Vertex AI)

Priority 3 (All Tier-1 Models Unavailable):
  └─> DeepSeek V3.2 (Cost-Optimized Fallback)
      - Intelligence: 41 (Comparable to Claude 4.5 Sonnet)
      - Speed: 31 t/s (Acceptable)
      - Cost: $0.28/1M (10x cheaper)
      - Open Source: Available for self-hosting
```

---

## ⚙️ Environment Configuration

```bash
# .env.local
# Primary Models
GEMINI_API_KEY=your_key_here                    # For Gemini 3 Flash/Pro
OPENAI_API_KEY=your_key_here                    # For GPT-5.x / KAT-Coder
ANTHROPIC_API_KEY=your_key_here                 # For Claude 4.5/Opus 4.5
DEEPSEEK_API_KEY=your_key_here                  # For DeepSeek V3.2

# Model Selection (Agent-Specific)
MODEL_SPECIFY=claude-opus-4.5-reasoning
MODEL_PLAN=gpt-5.2-xhigh
MODEL_TASKS=claude-4.5-sonnet-reasoning
MODEL_IMPLEMENT=kat-coder-pro-v1
MODEL_CLARIFY=claude-opus-4.5
MODEL_CONSTITUTION=gpt-5.2-xhigh
MODEL_ANALYZE=deepseek-v3.2-reasoning
MODEL_CHECKLIST=gemini-3-flash-reasoning

# Fallback Models
MODEL_FALLBACK_PRIMARY=claude-4.5-sonnet
MODEL_FALLBACK_SECONDARY=deepseek-v3.2

# Rate Limiting
RATE_LIMIT_RPM=50                               # Requests per minute
RATE_LIMIT_TPM=50000                            # Tokens per minute
```

---

## 📚 References

- **Artificial Analysis Intelligence Index v4.0** (Jan 2026): https://artificialanalysis.ai/models
- **Anthropic Claude 3.5 Sonnet** Technical Report: 64% agentic coding success rate
- **OpenAI GPT-4o/GPT-5** System Cards: Multimodal reasoning benchmarks
- **GitHub Models Guide**: https://github.blog/ai-and-ml/github-copilot/a-guide-to-deciding-what-ai-model-to-use-in-github-copilot/
- **Google Gemini 3** Technical Documentation: Flash/Pro performance comparisons
- **DeepSeek V3.2**: Open-source reasoning model benchmarks

---

## 🔍 Model Selection Criteria

### 1. **Intelligence** (40% weight)
- Measured by: Artificial Analysis Intelligence Index, GPQA Diamond, SciCode
- Critical for: Planning, Specification, Constitution Management

### 2. **Speed** (25% weight)
- Measured by: Output tokens/second, End-to-end response time
- Critical for: Implementation, Checklist Validation

### 3. **Cost** (20% weight)
- Measured by: USD per 1M tokens (input/output blended 3:1)
- Critical for: Analysis, Frequent validation tasks

### 4. **Specialization** (15% weight)
- Code generation, Natural language, Reasoning depth
- Critical for: Task-specific optimization

---

**Maintained By**: PixelForge Studio Architecture Team  
**Review Cycle**: Quarterly (next review: 2026-04-11)
