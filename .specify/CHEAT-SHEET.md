# Spec-Kit Cheat Sheet
# ورقة الغش السريعة لـ Spec-Kit

## الأوامر الأساسية | Basic Commands

```
/speckit.clarify       - توضيح المتطلبات | Clarify requirements
/speckit.specify       - كتابة المواصفات | Write specifications
/speckit.plan          - الخطة التقنية | Technical plan
/speckit.tasks         - توليد المهام | Generate tasks
/speckit.implement     - التنفيذ | Implementation
```

## الأوامر المتقدمة | Advanced Commands

```
/speckit.checklist     - فحص الجودة | Quality check
/speckit.analyze       - مراجعة الاتساق | Consistency review
/speckit.constitution  - عرض الدستور | Show constitution
/speckit.taskstoissues - تحويل لـ Issues | Convert to GitHub Issues
```

## سير العمل السريع | Quick Workflows

### ميزة بسيطة | Simple Feature
```
specify → plan → tasks → implement
```

### ميزة معقدة | Complex Feature
```
clarify → specify → checklist → plan → tasks → analyze → implement
```

### إصلاح خلل | Bug Fix
```
specify → plan → tasks → implement
```

## المبادئ الأساسية | Core Principles

### ✅ افعل | Do
- Files <400 lines
- Events via EventBus
- Zod validation
- TypeScript strict
- >80% test coverage
- Observable errors

### ❌ لا تفعل | Don't
- Direct module calls
- `any` types
- Silent failures
- Skip tests
- Implementation in spec
- God files

## بوابات الجودة | Quality Gates

```bash
npm run build  # Must pass
npm run lint   # Must pass
npm run test   # Must pass
# Manual QA     # Must complete
# Code Review   # Must approve
```

## الملفات المهمة | Important Files

```
📖 Read First:
   .specify/memory/constitution.md
   .specify/memory/project-context.md

📝 Outputs:
   .specify/artifacts/spec.md
   .specify/artifacts/plan.md
   .specify/artifacts/tasks.md

⚙️ Config:
   .specifyrc.json
   package.json
```

## نصائح سريعة | Quick Tips

1. **قبل أي كود**: اقرأ الدستور | Read constitution before coding
2. **Spec = ماذا**: لا تفاصيل تقنية | Spec = What, no tech details
3. **Plan = كيف**: التقنيات والعمارة | Plan = How, tech & architecture
4. **Tasks قابلة للقياس**: محددة وقابلة للاختبار | Tasks measurable & testable
5. **Implement تدريجي**: مهمة تلو الأخرى | Implement incrementally, task by task

## أمثلة سريعة | Quick Examples

### إضافة ميزة | Add Feature
```
/speckit.specify
"أريد نظام notifications للمستخدم"

/speckit.plan
"استخدم Notification API + Zustand store"

/speckit.tasks
[Auto-generates 5-8 tasks]

/speckit.implement
[Builds everything]
```

### إصلاح خلل | Fix Bug
```
/speckit.specify
"المشكلة: memory leak عند إلغاء العملية"

/speckit.plan
"إضافة cleanup() في hook"

/speckit.tasks
/speckit.implement
```

## المساعدة | Help

```bash
cat .specify/README.md           # نظرة عامة | Overview
cat .specify/DAILY-USAGE.md      # دليل يومي | Daily guide
cat SPEC-KIT-GUIDE.md            # دليل كامل | Full guide
cat SPEC-KIT-QUICK-REF.md        # مرجع سريع | Quick ref
```

---

**تذكّر | Remember**: 
> الدستور > الكود | Constitution > Code  
> المواصفات > التطبيق | Specifications > Implementation  
> الاختبارات إلزامية | Tests are mandatory
