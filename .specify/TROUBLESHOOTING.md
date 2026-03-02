# Spec-Kit Troubleshooting Guide
# دليل استكشاف الأخطاء وحلها

<div dir="rtl">

## المشاكل الشائعة والحلول

### 1. الأمر `/speckit.*` لا يعمل

**الأعراض**:
- عند كتابة `/speckit.specify` لا يحدث شيء
- رسالة خطأ "Command not found"

**الأسباب المحتملة**:
1. أوامر Claude غير محملة
2. المجلد `.claude/` غير موجود
3. الأوامر لم تُعرّف بشكل صحيح

**الحلول**:

```bash
# 1. تحقق من وجود المجلد
ls -la .claude/commands/

# يجب أن ترى:
# speckit.analyze.md
# speckit.checklist.md
# speckit.clarify.md
# ... إلخ

# 2. إذا كان المجلد غير موجود، أعد التثبيت
specify init . --ai claude

# 3. أعد تحميل VS Code / Claude
# CMD+Shift+P → "Reload Window"

# 4. تحقق من أن Claude يرى الأوامر
# في Claude، اكتب "/" وشاهد القائمة
```

---

### 2. `specify` command not found

**الأعراض**:
```bash
$ specify --help
-bash: specify: command not found
```

**الأسباب**:
- Specify CLI غير مثبت
- PATH غير مكون بشكل صحيح

**الحلول**:

```bash
# 1. تحقق من التثبيت
which specify

# 2. إذا لم يكن مثبتاً، ثبّته
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 3. أعد تحميل shell
source ~/.zshrc  # أو ~/.bashrc

# 4. تحقق مرة أخرى
specify version
```

---

### 3. `spec.md` يحتوي على تفاصيل تقنية

**الأعراض**:
```markdown
❌ في spec.md:
"استخدم Zustand store مع middleware X"
"أنشئ React component NotificationPanel"
"استدعِ Gemini API endpoint"
```

**المشكلة**: spec يجب أن يكون **ماذا** و**لماذا**، ليس **كيف**

**الحل**:

```bash
# 1. استخدم /speckit.checklist للكشف عن المشكلة
/speckit.checklist

# 2. أعد كتابة spec بدون تفاصيل تقنية
/speckit.specify

# ✅ الصحيح:
"يجب على النظام حفظ تفضيلات المستخدم للإشعارات"
"يجب عرض الإشعارات بطريقة غير تطفلية"
"يجب السماح للمستخدم بإيقاف/تفعيل الإشعارات"

# ❌ الخاطئ:
"استخدم localStorage لحفظ التفضيلات"
"أنشئ Toast component للإشعارات"
"استخدم Zustand store"
```

**القاعدة الذهبية**:
- **Spec** = ماذا نريد؟ لماذا؟ (What & Why)
- **Plan** = كيف نبني؟ بأي تقنية؟ (How & Tech)

---

### 4. Tasks غير واضحة أو عامة جداً

**الأعراض**:
```markdown
❌ في tasks.md:
- Task 1: تحسين الأداء
- Task 2: إصلاح bugs
- Task 3: إضافة features
```

**المشكلة**: المهام يجب أن تكون محددة وقابلة للقياس

**الحل**:

```bash
# 1. أعد كتابة spec بمتطلبات أوضح
/speckit.specify

# كن محدداً:
"يجب أن يظهر الإشعار خلال 500ms من اكتمال العملية"
"يجب حفظ التفضيلات فوراً عند التغيير"
"يجب دعم 3 أنواع من الإشعارات: success, error, info"

# 2. أعد إنشاء plan بتفاصيل أكثر
/speckit.plan

# حدد المكونات:
"إنشاء NotificationService للإدارة"
"إنشاء NotificationStore في Zustand"
"إنشاء 3 UI components: Toast, Banner, Modal"

# 3. أعد توليد tasks
/speckit.tasks

# ✅ الآن المهام ستكون:
- Task 1: Create NotificationService with showNotification() method
- Task 2: Build NotificationStore with Zustand (add, remove, clear)
- Task 3: Implement Toast component with auto-dismiss after 3s
- ... إلخ
```

---

### 5. Constitution rules لا تُتبع

**الأعراض**:
- ملفات >400 سطر
- استخدام `any` types
- استدعاءات مباشرة بدلاً من events
- لا اختبارات

**المشكلة**: عدم قراءة/اتباع الدستور

**الحل**:

```bash
# 1. اقرأ الدستور قبل أي كود
cat .specify/memory/constitution.md

# 2. راجع المبادئ الثمانية:
# I.   Modular Architecture (no file >400 lines)
# II.  Event-Driven Design (via EventBus)
# III. Type-Safe (Zod validation, no any)
# IV.  Persistent State (Zustand + Dexie)
# V.   AI Integration (GeminiClient wrapper)
# VI.  Caching Strategy (SHA-256)
# VII. Observable UX (no silent failures)
# VIII.Testing (>80% coverage, non-negotiable)

# 3. في /speckit.plan، اذكر صراحة:
/speckit.plan

"اتباعاً للدستور:
- تقسيم الكود لملفات <400 سطر
- استخدام EventBus للاتصالات
- Zod schemas للتحقق
- Tests مع >80% coverage"

# 4. في /speckit.implement، سيلتزم الكود بالدستور تلقائياً
```

---

### 6. `checklist` يُظهر أخطاء كثيرة

**الأعراض**:
```
/speckit.checklist

❌ No implementation details (languages, frameworks, APIs)
❌ No [NEEDS CLARIFICATION] markers remain
❌ Success criteria are technology-agnostic
...
```

**المشكلة**: spec يحتاج تحسين قبل المتابعة

**الحل**:

```bash
# 1. راجع كل خطأ في checklist
cat specs/[feature]/checklists/requirements.md

# 2. لكل ❌، افتح spec.md وصحح
# مثال: إذا كان الخطأ "contains implementation details"

# ابحث في spec.md عن:
# - أسماء تقنيات (React, Zustand, etc)
# - أسماء APIs
# - أسماء components
# احذفها أو عممها

# 3. أعد تشغيل checklist
/speckit.checklist

# كرر حتى تحصل على ✅ لجميع البنود
```

---

### 7. `implement` يفشل أو يتوقف

**الأعراض**:
```
/speckit.implement

[Started Task 1]
[Completed Task 1]
[Started Task 2]
ERROR: Cannot create file...
```

**الأسباب المحتملة**:
1. مسارات ملفات خاطئة
2. dependencies مفقودة
3. syntax errors في plan
4. tasks تعتمد على بعضها بشكل خاطئ

**الحلول**:

```bash
# 1. راجع tasks.md للتأكد من ترتيب المهام
cat .specify/artifacts/tasks.md

# تأكد أن:
# - Task 1 (types) قبل Task 2 (logic)
# - Task 2 (logic) قبل Task 3 (UI)
# - Task 3 (UI) قبل Task 4 (tests)

# 2. راجع plan.md للمسارات
cat .specify/artifacts/plan.md

# تأكد من مسارات صحيحة:
# ✅ modules/notifications/types.ts
# ❌ src/modules/notifications/types.ts (if src/ doesn't exist)

# 3. إذا فشلت task محددة، نفّذها يدوياً
# ثم تابع من المهمة التالية

# 4. تحقق من dependencies
npm install  # إذا كانت package جديدة مطلوبة
```

---

### 8. `analyze` يُظهر inconsistencies

**الأعراض**:
```
/speckit.analyze

⚠️  Inconsistencies found:
- Requirement FR-005 has no corresponding task
- Task 7 doesn't map to any requirement
- Success criteria SC-3 has no test scenario
```

**المشكلة**: عدم توافق بين spec ↔ plan ↔ tasks

**الحل**:

```bash
# 1. لكل inconsistency، حدد الأصل:

# إذا كان: "Requirement has no task"
→ أضف task في tasks.md أو احذف requirement من spec.md

# إذا كان: "Task doesn't map to requirement"
→ أضف requirement في spec.md أو احذف task

# إذا كان: "Success criteria has no test"
→ أضف test scenario في spec.md

# 2. أعد تشغيل analyze
/speckit.analyze

# كرر حتى لا توجد inconsistencies
```

---

### 9. Build/Test/Lint فشل بعد implement

**الأعراض**:
```bash
npm run build
# ERROR: Type error in NotificationService.ts

npm run test
# FAIL: NotificationService.test.ts

npm run lint
# ERROR: 'any' type used
```

**المشكلة**: الكود المُنشأ لا يتبع quality gates

**الحل**:

```bash
# 1. لكل خطأ، افتح الملف وصحح

# Type errors:
# - أضف أنواع صحيحة
# - استخدم Zod schemas
# - لا `any` types

# Test failures:
# - راجع test scenarios في spec.md
# - تأكد من تطابق implementation مع acceptance criteria

# Lint errors:
# - استخدم ESLint --fix
npm run lint --fix

# 2. أعد الاختبار
npm run build && npm run test && npm run lint

# 3. إذا استمرت المشاكل، راجع constitution
cat .specify/memory/constitution.md
```

---

### 10. VS Code لا يعرف أوامر `/speckit.*`

**الأعراض**:
- عند كتابة `/` في Claude بـ VS Code، لا تظهر أوامر speckit

**الأسباب**:
1. `.claude/` folder غير موجود
2. Claude extension لم يُحمّل الأوامر
3. Workspace غير مكون بشكل صحيح

**الحلول**:

```bash
# 1. تحقق من وجود .claude/commands/
ls .claude/commands/

# 2. إذا لم تكن موجودة، أعد init
specify init . --ai claude

# 3. أعد تحميل VS Code
CMD+Shift+P → "Developer: Reload Window"

# 4. أعد فتح Claude chat
# اكتب "/" → يجب أن ترى قائمة بـ /speckit.*

# 5. إذا لم ينجح، تحقق من إعدادات Claude
# VS Code Settings → Search "Claude" → تأكد من تفعيل Custom Commands
```

---

## نصائح لتجنب المشاكل

### 1. قبل البدء بأي ميزة

```bash
# ✅ اقرأ هذه الملفات:
cat .specify/memory/constitution.md
cat .specify/memory/project-context.md

# ✅ تحقق من الـ artifacts الحالية:
ls .specify/artifacts/

# ✅ راجع أمثلة سابقة:
ls specs/
```

---

### 2. أثناء كتابة spec

```bash
# ✅ افعل:
- وصف واضح لماذا نحتاج الميزة
- user scenarios محددة
- acceptance criteria قابلة للقياس
- لا تفاصيل تقنية

# ❌ لا تفعل:
- ذكر أسماء تقنيات (React, Zustand)
- ذكر أسماء APIs
- ذكر أسماء files/components
```

---

### 3. أثناء كتابة plan

```bash
# ✅ افعل:
- اختر تقنيات من constitution
- حدد architecture واضحة
- اذكر المسارات الصحيحة (modules/*/...)
- راجع patterns موجودة

# ❌ لا تفعل:
- استخدام تقنيات جديدة غير معتمدة
- مخالفة constitution rules
- مسارات خاطئة
```

---

### 4. قبل implement

```bash
# ✅ تحقق من:
/speckit.checklist  # Spec quality
/speckit.analyze    # Consistency

# ✅ راجع:
cat .specify/artifacts/spec.md
cat .specify/artifacts/plan.md
cat .specify/artifacts/tasks.md

# ✅ تأكد:
# - ترتيب tasks منطقي
# - dependencies واضحة
# - acceptance criteria محددة
```

---

### 5. بعد implement

```bash
# ✅ اختبر:
npm run build   # No errors
npm run lint    # No warnings
npm run test    # All pass

# ✅ راجع:
# - الكود يتبع constitution
# - الملفات <400 سطر
# - Events via EventBus
# - Zod validation موجودة
# - Tests coverage >80%

# ✅ Manual QA:
# - جرّب user scenarios من spec.md
# - تحقق من acceptance criteria
# - اختبر edge cases
```

---

## للمساعدة الإضافية

### الملفات المرجعية

```bash
# دليل شامل
cat SPEC-KIT-GUIDE.md

# مرجع سريع
cat SPEC-KIT-QUICK-REF.md

# دليل يومي
cat .specify/DAILY-USAGE.md

# ورقة الغش
cat .specify/CHEAT-SHEET.md

# الدستور (الأهم!)
cat .specify/memory/constitution.md
```

---

### فحص النظام

```bash
# تحقق من تثبيت Specify
specify version

# تحقق من الأدوات المتاحة
specify check

# تحقق من structure الحالي
tree -L 2 .specify/
tree -L 2 .claude/

# تحقق من artifacts
ls -lh .specify/artifacts/
```

---

## الخلاصة

> **القاعدة الذهبية**: 
> "اقرأ الدستور → اتبع Spec-Driven → اختبر قبل merge"

معظم المشاكل تُحل بـ:
1. ✅ قراءة `.specify/memory/constitution.md`
2. ✅ اتباع سير العمل الصحيح
3. ✅ استخدام `/speckit.checklist` و `/speckit.analyze`
4. ✅ الاختبار قبل commit

---

</div>
