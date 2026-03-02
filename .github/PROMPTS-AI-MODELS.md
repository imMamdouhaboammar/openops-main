# PromptKit AI Models Configuration

تحديثات معلومات نماذج الذكاء الاصطناعي لملفات Prompts في مجلد `.github/prompts/`.

## ملفات Prompts والنماذج المناسبة

### 1. speckit.specify.prompt.md
```yaml
ai_model:
  primary: claude-opus-4.5-reasoning
  name: Claude Opus 4.5 (Reasoning)
  intelligence: 49
  speed: 82 tokens/second
  cost: $10 per 1M tokens
  use_case: Feature specification with ambiguity detection
  strengths:
    - Natural language understanding (GPQA: 87%)
    - Structured document creation
    - Reasoning mode for quality validation
```

### 2. speckit.plan.prompt.md
```yaml
ai_model:
  primary: gpt-5.2-xhigh
  name: GPT-5.2 (xhigh)
  intelligence: 51
  speed: 117 tokens/second
  cost: $4.80 per 1M tokens
  use_case: Technical implementation planning
  strengths:
    - Highest intelligence score
    - Complex system architecture
    - Multi-layer planning
```

### 3. speckit.tasks.prompt.md
```yaml
ai_model:
  primary: claude-4.5-sonnet-reasoning
  name: Claude 4.5 Sonnet (Reasoning)
  intelligence: 42
  speed: 80 tokens/second
  cost: $6 per 1M tokens
  use_case: Actionable task generation with dependency analysis
  strengths:
    - Hierarchical task decomposition
    - Dependency ordering
    - Completeness validation
```

### 4. speckit.implement.prompt.md
```yaml
ai_model:
  primary: kat-coder-pro-v1
  backup: gpt-5.1-codex-high
  name: KAT-Coder-Pro V1
  intelligence: 36
  speed: 62 tokens/second
  cost: TBD (premium coding model)
  benchmarks:
    scicode: 74%
    context_window: 400k
  use_case: Code generation and implementation
  strengths:
    - Exceptional code understanding
    - Large context window
    - Multi-file support
```

### 5. speckit.clarify.prompt.md
```yaml
ai_model:
  primary: claude-opus-4.5-reasoning
  name: Claude Opus 4.5 (Reasoning)
  intelligence: 49
  speed: 82 tokens/second
  cost: $10 per 1M tokens
  temperature: 0.8 (for diverse questions)
  use_case: Ambiguity resolution through Q&A
  strengths:
    - Conversational Q&A
    - Ambiguity detection
    - Higher temperature for diversity
```

### 6. speckit.constitution.prompt.md
```yaml
ai_model:
  primary: gpt-5.2-xhigh
  name: GPT-5.2 (xhigh)
  intelligence: 51
  speed: 117 tokens/second
  cost: $4.80 per 1M tokens
  use_case: Governance and policy enforcement
  strengths:
    - Semantic versioning precision
    - Policy consistency
    - Extensive thinking for principles
```

### 7. speckit.analyze.prompt.md
```yaml
ai_model:
  primary: deepseek-v3.2-reasoning
  backup: claude-4.5-sonnet-reasoning
  name: DeepSeek V3.2 (Reasoning)
  intelligence: 41
  speed: 31 tokens/second
  cost: $0.28 per 1M tokens
  use_case: Cost-effective consistency analysis
  strengths:
    - Deep reasoning for analysis
    - Non-blocking operations
    - Iterative review cycles
    - Excellent cost/performance
```

### 8. speckit.checklist.prompt.md
```yaml
ai_model:
  primary: gemini-3-flash-reasoning
  backup: gpt-5.1-high
  name: Gemini 3 Flash (Reasoning)
  intelligence: 46
  speed: 220 tokens/second
  cost: $1.11 per 1M tokens
  use_case: Fast requirement validation checklists
  strengths:
    - Fastest reasoning model
    - Iterative checklist generation
    - Real-time validation
```

### 9. speckit.taskstoissues.prompt.md
```yaml
ai_model:
  primary: claude-4.5-sonnet-reasoning
  name: Claude 4.5 Sonnet (Reasoning)
  intelligence: 42
  speed: 80 tokens/second
  cost: $6 per 1M tokens
  use_case: Task to GitHub issue conversion
  strengths:
    - Structured format conversion
    - Metadata extraction
    - Issue template generation
```

---

## معلومات الخادم الاحتياطي (Fallback Strategy)

```yaml
fallback_hierarchy:
  priority_1: primary_model  # النموذج المحدد لكل مهمة
  priority_2: claude-4.5-sonnet-reasoning  # الاحتياطي العام
  priority_3: deepseek-v3.2-reasoning  # الاحتياطي المحسّن للتكلفة
```

---

## متغيرات البيئة (.env.local)

```bash
# Primary Model API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
DEEPSEEK_API_KEY=...

# Model Selection
MODEL_SPECIFY=claude-opus-4.5-reasoning
MODEL_PLAN=gpt-5.2-xhigh
MODEL_TASKS=claude-4.5-sonnet-reasoning
MODEL_IMPLEMENT=kat-coder-pro-v1
MODEL_CLARIFY=claude-opus-4.5-reasoning
MODEL_CONSTITUTION=gpt-5.2-xhigh
MODEL_ANALYZE=deepseek-v3.2-reasoning
MODEL_CHECKLIST=gemini-3-flash-reasoning

# Fallback Models
MODEL_FALLBACK_PRIMARY=claude-4.5-sonnet-reasoning
MODEL_FALLBACK_SECONDARY=deepseek-v3.2-reasoning

# Rate Limiting
RATE_LIMIT_RPM=50
RATE_LIMIT_TPM=50000

# Gemini 3 Pro Thinking Configuration (Exclusive Model)
# Replace old THINKING_BUDGET_* settings
GEMINI_3_PRO_MODEL=gemini-3-pro-preview
GEMINI_3_THINKING_LEVEL_HIGH=HIGH  # For complex analysis
GEMINI_3_THINKING_LEVEL_LOW=LOW    # For speed-critical tasks
```

---

## تعليمات التحديث اليدوي للملفات

كل ملف prompt يجب أن يحتوي على قسم معلومات النموذج في الـ YAML frontmatter:

```markdown
# قالب محسّن لملفات Prompts:

```prompt
---
agent: speckit.{name}
ai_model:
  primary: {model-id}
  backup: {backup-model-id}
  name: {model-name}
  intelligence: {score}
  speed: {tokens/second}
  cost: ${price} per 1M tokens
  use_case: {description}
---

**Model**: {model-name}
**Intelligence**: {score} | **Speed**: {tokens/sec} t/s | **Cost**: ${price}/1M

```
```

---

## جدول مرجع سريع

| الملف | النموذج الأساسي | الذكاء | السرعة | التكلفة |
|------|-----------------|--------|---------|---------|
| specify | Claude Opus 4.5 | 49 | 82 | $10 |
| plan | GPT-5.2 | 51 | 117 | $4.80 |
| tasks | Claude 4.5 Sonnet | 42 | 80 | $6 |
| implement | KAT-Coder-Pro V1 | 36 | 62 | TBD |
| clarify | Claude Opus 4.5 | 49 | 82 | $10 |
| constitution | GPT-5.2 | 51 | 117 | $4.80 |
| analyze | DeepSeek V3.2 | 41 | 31 | $0.28 |
| checklist | Gemini 3 Flash | 46 | 220 | $1.11 |
| taskstoissues | Claude 4.5 Sonnet | 42 | 80 | $6 |

---

**آخر تحديث**: 2026-01-11  
**مصدر البيانات**: Artificial Analysis Intelligence Index v4.0
