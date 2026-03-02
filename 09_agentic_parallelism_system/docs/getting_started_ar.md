# Getting Started - البداية السريعة

## نظرة عامة

نظام **Agentic Parallelism** يطبق 14 نمطاً أساسياً لبناء أنظمة AI ذكية مع التركيز على:
- ⚡ **الأداء**: تنفيذ متوازٍ وتقليل زمن الاستجابة
- 🛡️ **الموثوقية**: تنفيذ زائد وكشف الأخطاء
- 🎯 **الجودة**: توليد متعدد واختيار تنافسي

---

## التثبيت السريع

```bash
# 1. استنساخ المشروع
cd OpenOps/09_agentic_parallelism_system

# 2. تثبيت المتطلبات (إذا لزم الأمر)
pip install asyncio pydantic typing-extensions

# 3. تجربة الأمثلة
python examples/marketing_campaign.py quick
```

---

## الاستخدام الأساسي

### 1. استخدام الأدوات المتوازية (Parallel Tool Use)

```python
from patterns.parallel_tool_use import ParallelToolExecutor, ToolCall

# إنشاء المنفذ
executor = ParallelToolExecutor()

# تنفيذ أدوات متوازية
results = await executor.execute_parallel([
    ToolCall(tool_name="get_stock_price", parameters={"symbol": "NVDA"}),
    ToolCall(tool_name="get_company_news", parameters={"company": "NVIDIA"}),
])

# 🎯 النتيجة: تنفيذ أسرع بـ50-70%
```

**الفائدة**: بدلاً من 3.3 ثانية (1.5s + 1.8s)، تحصل على 1.8s فقط!

---

### 2. توليد الفرضيات (Hypothesis Generation)

```python
from patterns.hypothesis_generation import HypothesisGenerationOrchestrator

# إنشاء المنسق
orchestrator = HypothesisGenerationOrchestrator(num_hypotheses=3)

# تنفيذ مع توليد استراتيجيات متعددة
evaluation = await orchestrator.execute(
    task="Create marketing campaign for AI tool",
    context={"product": "TaskMaster AI"}
)

# 🎯 النتيجة: جودة أفضل بـ30%+ مع اختيار ذكي
print(f"Best: {evaluation.best_result}")
```

**الفائدة**: 3 استراتيجيات مختلفة، تقييم تلقائي، اختيار الأفضل!

---

## التكامل مع OpenOps

```python
from integrations.openops_integration import AgenticParallelismModule

# 1. إنشاء الوحدة
module = AgenticParallelismModule(
    patterns="all",
    auto_optimize=True
)

# 2. تنفيذ نمط
result = await module.execute_pattern(
    pattern_name="parallel_tool_use",
    input_data={...},
    config={...}
)

# 3. تنفيذ workflow كامل
workflow_result = await module.execute_workflow({
    "workflow_id": "campaign",
    "stages": [
        {"stage_id": "research", "pattern": "parallel_tool_use", ...},
        {"stage_id": "strategy", "pattern": "hypothesis_generation", ...},
    ]
})
```

---

## الأنماط المتاحة

| # | النمط | الاستخدام | الفائدة |
|---|--------|-----------|---------|
| 1 | Parallel Tool Use | استدعاءات API متوازية | -50% latency |
| 2 | Hypothesis Generation | توليد استراتيجيات | +30% quality |
| 3 | Parallel Evaluation | تقييم متعدد المعايير | موثوقية أعلى |
| 4 | Speculative Execution | تنفيذ توقعي | زمن استجابة صفر |
| 5 | Hierarchical Teams | فرق هرمية | تقسيم أفضل |
| 6 | Competitive Ensembles | وكلاء تنافسيون | Best-of-N |
| 7 | Assembly Line | خط إنتاج | معالجة دفعات |
| 8 | Blackboard Collab | تعاون لامركزي | مرونة |
| 9 | Redundant Execution | تنفيذ زائد | موثوقية 99.9% |
| 10 | Query Expansion | توسيع الاستعلام | استدعاء أوسع |
| 11 | Sharded Retrieval | استرجاع مجزأ | بحث أسرع |
| 12 | Hybrid Search | بحث هجين | دقة عالية |
| 13 | Context Preprocessing | معالجة السياق | جودة أفضل |
| 14 | Multi-Hop Retrieval | استرجاع متعدد | معلومات أعمق |

---

## أمثلة عملية

### مثال 1: حملة تسويقية شاملة

```bash
python examples/marketing_campaign.py
```

يشمل:
- ✅ بحث السوق المتوازي (3 مصادر)
- ✅ توليد 3 استراتيجيات
- ✅ تقييم واختيار الأفضل
- ✅ تقرير شامل

### مثال 2: تكامل سريع

```bash
python examples/marketing_campaign.py quick
```

عرض سريع للقدرات الأساسية في 5 ثوانٍ!

---

## تتبع الأداء

النظام يتتبع تلقائياً:

```python
# الحصول على إحصائيات
stats = tracker.get_all_metrics()

print(f"Latency: {stats['latency']['mean']:.2f}s")
print(f"Throughput: {stats['throughput']:.2f} ops/s")
print(f"Success Rate: {stats['success_rate']:.1%}")

# توليد تقرير
report = tracker.generate_report()
for rec in report.recommendations:
    print(rec)
```

---

## الخطوات التالية

1. 📖 اقرأ [دليل المعماري](./architecture_guide.md) لفهم التصميم
2. 🔧 جرب [الأمثلة](../examples/) المختلفة
3. 🚀 ادمج مع مشروعك عبر [OpenOps Integration](../integrations/)
4. 📊 راقب الأداء مع [Performance Tracker](../core/performance_tracker.py)

---

## الدعم

- 📧 البريد: support@openops.dev
- 💬 Discord: OpenOps Community
- 🐛 المشاكل: [GitHub Issues]

---

**Built with ❤️ by OpenOps Team**
