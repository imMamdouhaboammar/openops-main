# Spec-Kit Daily Usage Guide
# دليل الاستخدام اليومي لـ Spec-Kit

<div dir="rtl">

## البداية السريعة

### قبل أي تطوير جديد

```bash
# 1. اقرأ الدستور (مرة واحدة فقط)
cat .specify/memory/constitution.md

# 2. اقرأ سياق المشروع (للمراجعة)
cat .specify/memory/project-context.md

# 3. تحقق من المواصفات الحالية
ls .specify/artifacts/
```

---

## سيناريوهات الاستخدام الشائعة

### سيناريو 1: بناء ميزة جديدة تماماً

**الحالة**: لديك فكرة واضحة لميزة جديدة

**الخطوات**:

```
# الخطوة 1: وضّح المتطلبات (اختياري إذا كان هناك غموض)
/speckit.clarify

# أدخل وصف الميزة:
"أريد إضافة نظام للإشعارات الفورية يُعلم المستخدم عند اكتمال 
عملية AI طويلة، مع خيار لإيقاف الإشعارات أو تخصيصها"

# ← سيطرح أسئلة مثل:
# - أين تُعرض الإشعارات؟ (داخل التطبيق / متصفح / كلاهما)
# - ما مدة بقاء الإشعار؟
# - هل نحتاج تاريخ للإشعارات؟

# الخطوة 2: اكتب المواصفات الكاملة
/speckit.specify

# أدخل نفس الوصف + الإجابات من clarify

# ← ينشئ: .specify/artifacts/spec.md
# يحتوي على:
# - User Scenarios & Testing
# - Functional Requirements  
# - Success Criteria
# - Key Entities

# الخطوة 3: أنشئ الخطة التقنية
/speckit.plan

# أدخل التفاصيل التقنية:
"استخدم Notification API للمتصفح، Zustand store للحالة، 
Dexie لحفظ التفضيلات. EventBus لاستماع TOOL_COMPLETED events"

# ← ينشئ: .specify/artifacts/plan.md
# يحتوي على:
# - Architecture decisions
# - Tech stack choices
# - Implementation approach

# الخطوة 4: ولّد المهام القابلة للتنفيذ
/speckit.tasks

# ← ينشئ: .specify/artifacts/tasks.md
# قائمة مهام مثل:
# - Task 1: Create notification types
# - Task 2: Build NotificationStore  
# - Task 3: Implement NotificationService
# - Task 4: Add UI components
# - Task 5: Write tests

# الخطوة 5: نفّذ جميع المهام
/speckit.implement

# ← ينفذ كل مهمة واحدة تلو الأخرى
# يكتب الكود الفعلي
# يُنشئ الملفات
# يُجري الاختبارات
```

**النتيجة**: ميزة كاملة مع كود، اختبارات، ووثائق

---

### سيناريو 2: تحسين ميزة موجودة

**الحالة**: تريد إضافة تحسينات لميزة قائمة

**الخطوات**:

```
# مباشرة إلى specify (تخطي clarify إذا كان واضحاً)
/speckit.specify

"تحسين Mockups Spaces UI بإضافة:
1. Preset selector مع معاينات
2. Material dropdown مع أيقونات
3. Lighting picker مع أمثلة بصرية
4. Variation count slider (1-4)"

# ثم plan
/speckit.plan

"تعديل MockupSpecNode component. إضافة:
- PresetSelector subcomponent
- MaterialPicker subcomponent  
- LightingPicker subcomponent
- VariationSlider subcomponent
استخدام نفس النمط من ReferenceControls"

# ثم tasks → implement
/speckit.tasks
/speckit.implement
```

---

### سيناريو 3: إصلاح خلل (Bug)

**الحالة**: وجدت مشكلة تحتاج إصلاح

**الخطوات**:

```
/speckit.specify

"المشكلة: عند إلغاء عملية توليد في منتصفها، تبقى 
العملية في الذاكرة ولا تُنظف. يسبب هذا تسرب ذاكرة.

الحل المطلوب: التأكد من تنظيف جميع الموارد عند الإلغاء:
- إلغاء AbortController
- حذف listeners من EventBus
- تحديث حالة الـ store
- تنظيف أي نتائج جزئية"

/speckit.plan

"الخطوات:
1. إضافة cleanup() في useToolProcessor hook
2. استدعاء cleanup عند unmount
3. تتبع جميع subscriptions في useRef
4. إضافة test لتسرب الذاكرة"

/speckit.tasks
/speckit.implement
```

---

### سيناريو 4: إضافة اختبارات لكود موجود

**الحالة**: كود موجود بدون اختبارات كافية

**الخطوات**:

```
/speckit.specify

"إضافة اختبارات شاملة لـ GraphValidator في mockups-spaces:
- اختبار اكتشاف الدورات (cycles)
- اختبار الترتيب الطوبولوجي (toposort)
- اختبار التحقق من dependencies
- اختبار edge cases (رسم بياني فارغ، عقدة واحدة، إلخ)"

/speckit.plan

"استخدام vitest مع jsdom. 
إنشاء test fixtures لرسوم بيانية مختلفة.
Mock dependencies الخارجية.
تغطية >90% للملف."

/speckit.tasks
/speckit.implement
```

---

## الأوامر المتقدمة

### `/speckit.checklist` - التحقق من جودة المواصفات

**متى تستخدمه**: بعد كتابة spec وقبل plan

```
/speckit.specify
[... اكتب المواصفات ...]

/speckit.checklist
# ← يُنشئ checklist في specs/[feature]/checklists/requirements.md
# يتحقق من:
# - اكتمال المحتوى
# - عدم وجود تفاصيل تقنية في spec
# - وضوح المتطلبات
# - قابلية القياس للمعايير
```

---

### `/speckit.analyze` - مراجعة الاتساق

**متى تستخدمه**: قبل implement للتأكد من توافق spec + plan + tasks

```
/speckit.specify
/speckit.plan
/speckit.tasks

/speckit.analyze
# ← يراجع الاتساق بين:
# - Requirements في spec ↔ Tasks في tasks.md
# - Success criteria ↔ Test scenarios
# - Plan decisions ↔ Task breakdown

# يحذر إذا:
# - مهمة لا تغطي requirement
# - requirement بدون مهمة مقابلة
# - test بدون acceptance criteria
```

---

### `/speckit.constitution` - عرض الدستور

**متى تستخدمه**: عند الحاجة لمراجعة القواعد الحاكمة

```
/speckit.constitution

# ← يعرض:
# - المبادئ الأساسية الثمانية
# - التقنيات المعتمدة
# - قواعد العمارة
# - بوابات الجودة
```

---

### `/speckit.taskstoissues` - تحويل المهام إلى Issues

**متى تستخدمه**: عند العمل مع فريق على GitHub

```
/speckit.tasks
# [... ولّد المهام ...]

/speckit.taskstoissues
# ← ينشئ GitHub Issues من tasks.md
# كل Issue يحتوي:
# - عنوان المهمة
# - الوصف الكامل
# - Acceptance criteria
# - Labels تلقائية (feature/bug/test/docs)
```

---

## نصائح الاستخدام

### 1. متى تستخدم `/clarify`؟

**استخدم** عندما:
- ✅ الوصف غامض أو ناقص
- ✅ عدة تفسيرات ممكنة
- ✅ القرارات تؤثر على scope كبير
- ✅ تفاصيل الأمان/الخصوصية غير واضحة

**تخطّاه** عندما:
- ⛔ الفكرة واضحة تماماً
- ⛔ تفاصيل صغيرة يمكن افتراضها
- ⛔ التحسينات البسيطة

---

### 2. متى تستخدم `/checklist`؟

**استخدم** عندما:
- ✅ spec معقد وطويل
- ✅ تريد التأكد من الجودة قبل البناء
- ✅ العمل مع فريق (peer review)

**تخطّاه** عندما:
- ⛔ spec قصير وبسيط (<5 requirements)
- ⛔ ميزة تجريبية سريعة

---

### 3. متى تستخدم `/analyze`؟

**استخدم** عندما:
- ✅ spec + plan + tasks جميعهم جاهزين
- ✅ تريد التأكد من الاتساق قبل implement
- ✅ مراجعة قبل code review

**تخطّاه** عندما:
- ⛔ لم تكمل tasks بعد
- ⛔ تريد البدء مباشرة في implement

---

## الأخطاء الشائعة وحلولها

### خطأ 1: spec يحتوي تفاصيل تقنية

**المشكلة**:
```
❌ "استخدم Zustand store مع middleware X"
❌ "استدعِ API endpoint /api/notifications"
❌ "أنشئ React component NotificationPanel"
```

**الحل**:
```
✅ "يجب على النظام حفظ تفضيلات المستخدم"
✅ "يجب إرسال إشعار عند اكتمال العملية"
✅ "يجب عرض الإشعارات للمستخدم بطريقة واضحة"
```

**spec = ماذا ولماذا (what & why)**  
**plan = كيف (how)**

---

### خطأ 2: tasks غير قابلة للاختبار

**المشكلة**:
```
❌ Task: "تحسين الأداء"
❌ Task: "إصلاح الـ bugs"
❌ Task: "إضافة features جديدة"
```

**الحل**:
```
✅ Task: "تقليل وقت render لـ CanvasWorkspace إلى <500ms"
✅ Task: "إصلاح memory leak في useToolProcessor عند unmount"
✅ Task: "إضافة preset selector مع 8 presets محددة"
```

كل task يجب أن يكون:
- محدد (Specific)
- قابل للقياس (Measurable)
- قابل للاختبار (Testable)

---

### خطأ 3: عدم اتباع الدستور

**المشكلة**:
- ملفات >400 سطر
- استخدام `any` types
- تخطي الاختبارات
- استدعاءات مباشرة بدلاً من events

**الحل**:
```bash
# قبل أي تطوير
cat .specify/memory/constitution.md

# تحقق من القواعد:
# 1. ✅ Modular (no file >400 lines)
# 2. ✅ Event-driven (via EventBus)
# 3. ✅ Type-safe (Zod validation)
# 4. ✅ Tests required (>80% coverage)
```

---

## سير العمل المثالي

```
┌─────────────────────────────────────────┐
│  فكرة جديدة / طلب ميزة                  │
└─────────────────┬───────────────────────┘
                  │
                  ▼
         هل الفكرة واضحة؟
                  │
        ┌─────────┴─────────┐
        │ نعم              │ لا
        │                  │
        ▼                  ▼
   /speckit.specify    /speckit.clarify
        │                  │
        │                  ▼
        │           /speckit.specify
        │                  │
        └─────────┬────────┘
                  │
                  ▼
          /speckit.checklist
          (اختياري للميزات الكبيرة)
                  │
                  ▼
           /speckit.plan
                  │
                  ▼
           /speckit.tasks
                  │
                  ▼
          /speckit.analyze
          (اختياري للتحقق)
                  │
                  ▼
        /speckit.implement
                  │
                  ▼
        ┌─────────────────┐
        │  npm run test    │
        │  npm run build   │
        │  npm run lint    │
        └─────────────────┘
                  │
                  ▼
           Manual QA
                  │
                  ▼
          Code Review
                  │
                  ▼
             Merge! 🎉
```

---

## مرجع الملفات

### ملفات الإدخال (تقرأها أنت)
- `.specify/memory/constitution.md` - **القواعد الحاكمة**
- `.specify/memory/project-context.md` - سياق المشروع
- `architecture.md` - العمارة التفصيلية
- `SPEC-KIT-GUIDE.md` - الدليل الكامل

### ملفات المخرجات (ينشئها Spec-Kit)
- `.specify/artifacts/spec.md` - المواصفات
- `.specify/artifacts/plan.md` - الخطة التقنية
- `.specify/artifacts/tasks.md` - قائمة المهام
- `specs/[feature]/checklists/requirements.md` - checklist الجودة

### ملفات التكوين
- `.specifyrc.json` - إعدادات Spec-Kit
- `package.json` - اعتماديات المشروع
- `tsconfig.json` - إعدادات TypeScript

---

## للمساعدة

إذا واجهت صعوبة:

1. **راجع الدليل الشامل**:
   ```bash
   cat SPEC-KIT-GUIDE.md
   ```

2. **اقرأ المرجع السريع**:
   ```bash
   cat SPEC-KIT-QUICK-REF.md
   ```

3. **راجع الدستور**:
   ```bash
   cat .specify/memory/constitution.md
   ```

4. **شاهد الأمثلة في `specs/` directory**

---

## النصيحة الذهبية

> **"اقرأ الدستور قبل أي كود. اتبع Spec-Driven قبل أي ميزة. اختبر قبل أي merge."**

---

</div>
