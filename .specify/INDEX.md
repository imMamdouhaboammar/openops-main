# Spec-Kit Documentation Index
# فهرس وثائق Spec-Kit

<div dir="rtl">

## 📚 دليل الوثائق

مرحباً في وثائق Spec-Kit لمشروع PixelForge Studio. هذا الدليل سيساعدك على إيجاد ما تحتاجه بسرعة.

---

## 🚀 البداية السريعة (ابدأ هنا!)

### للمبتدئين في Spec-Kit
1. **[README.md](./README.md)** - نظرة عامة وتثبيت
2. **[CHEAT-SHEET.md](./CHEAT-SHEET.md)** - ورقة الغش السريعة
3. **[DAILY-USAGE.md](./DAILY-USAGE.md)** - دليل الاستخدام اليومي

### للمطورين المتمرسين
1. **[memory/constitution.md](./memory/constitution.md)** - **اقرأ أولاً!** (القواعد الحاكمة)
2. **[memory/project-context.md](./memory/project-context.md)** - سياق المشروع
3. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - حل المشاكل

---

## 📖 الوثائق حسب الغرض

### أريد البدء بميزة جديدة
→ **[DAILY-USAGE.md - سيناريو 1](./DAILY-USAGE.md#سيناريو-1-بناء-ميزة-جديدة-تماماً)**

**سير العمل**:
```
1. قراءة constitution.md (مرة واحدة)
2. /speckit.clarify (إذا كان هناك غموض)
3. /speckit.specify
4. /speckit.plan
5. /speckit.tasks
6. /speckit.implement
```

---

### أريد تحسين ميزة موجودة
→ **[DAILY-USAGE.md - سيناريو 2](./DAILY-USAGE.md#سيناريو-2-تحسين-ميزة-موجودة)**

**سير العمل**:
```
1. /speckit.specify (وصف التحسين)
2. /speckit.plan
3. /speckit.tasks
4. /speckit.implement
```

---

### أريد إصلاح خلل (Bug)
→ **[DAILY-USAGE.md - سيناريو 3](./DAILY-USAGE.md#سيناريو-3-إصلاح-خلل-bug)**

**سير العمل**:
```
1. /speckit.specify (وصف المشكلة + الحل)
2. /speckit.plan
3. /speckit.tasks
4. /speckit.implement
```

---

### أريد إضافة اختبارات
→ **[DAILY-USAGE.md - سيناريو 4](./DAILY-USAGE.md#سيناريو-4-إضافة-اختبارات-لكود-موجود)**

**سير العمل**:
```
1. /speckit.specify (ما الذي نختبره)
2. /speckit.plan (كيف نختبر)
3. /speckit.tasks
4. /speckit.implement
```

---

### أريد فهم القواعد الحاكمة للمشروع
→ **[memory/constitution.md](./memory/constitution.md)**

**يحتوي على**:
- المبادئ الثمانية الأساسية
- التقنيات المعتمدة (Tech Stack)
- قواعد العمارة
- بوابات الجودة (Quality Gates)
- سير العمل (Development Workflow)

---

### أريد فهم سياق المشروع
→ **[memory/project-context.md](./memory/project-context.md)**

**يحتوي على**:
- هوية المشروع
- التقنيات المستخدمة
- العمارة والمبادئ
- هيكل الوحدات (Modules)
- الأنماط الشائعة (Common Patterns)
- القيود والحدود

---

### واجهتني مشكلة أو خطأ
→ **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

**المشاكل الشائعة**:
- الأمر `/speckit.*` لا يعمل
- `specify` command not found
- `spec.md` يحتوي تفاصيل تقنية
- Tasks غير واضحة
- Constitution rules لا تُتبع
- Build/Test/Lint فشل
- ... وأكثر

---

### أحتاج مرجع سريع للأوامر
→ **[CHEAT-SHEET.md](./CHEAT-SHEET.md)**

**يحتوي على**:
- جميع أوامر `/speckit.*`
- سير العمل السريع
- المبادئ الأساسية
- أمثلة سريعة
- نصائح

---

## 🗂️ هيكل الملفات

```
.specify/
├── README.md                  # نظرة عامة وتثبيت
├── DAILY-USAGE.md             # دليل الاستخدام اليومي
├── CHEAT-SHEET.md             # ورقة الغش السريعة
├── TROUBLESHOOTING.md         # حل المشاكل
├── INDEX.md                   # هذا الملف
│
├── memory/                    # الذاكرة الدائمة
│   ├── constitution.md        # القواعد الحاكمة (الأهم!)
│   └── project-context.md     # سياق المشروع
│
├── artifacts/                 # المخرجات
│   ├── spec.md                # المواصفات الحالية
│   ├── plan.md                # الخطة التقنية
│   └── tasks.md               # قائمة المهام
│
├── templates/                 # القوالب
│   ├── spec-template.md
│   ├── plan-template.md
│   ├── tasks-template.md
│   ├── checklist-template.md
│   └── agent-file-template.md
│
└── scripts/                   # النصوص المساعدة
    └── bash/
        └── create-new-feature.sh
```

---

## 🎯 الملفات حسب الأولوية

### أولوية قصوى (اقرأ أولاً)
1. **[memory/constitution.md](./memory/constitution.md)** ⭐⭐⭐
2. **[CHEAT-SHEET.md](./CHEAT-SHEET.md)** ⭐⭐
3. **[README.md](./README.md)** ⭐⭐

### للاستخدام اليومي
1. **[DAILY-USAGE.md](./DAILY-USAGE.md)** ⭐⭐
2. **[artifacts/](./artifacts/)** (المخرجات) ⭐

### للمرجع والتعمق
1. **[memory/project-context.md](./memory/project-context.md)** ⭐
2. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** ⭐

### للحالات الخاصة
1. **[templates/](./templates/)** (نادر الاستخدام)

---

## 📝 الملفات في المشروع الرئيسي

### وثائق Spec-Kit الخارجية
```
pixelforge-studio/
├── SPEC-KIT-GUIDE.md          # الدليل الشامل (خارجي)
├── SPEC-KIT-QUICK-REF.md      # المرجع السريع (خارجي)
└── SPEC-KIT-STATUS.md         # حالة التثبيت (خارجي)
```

**متى تقرأها؟**
- **SPEC-KIT-GUIDE.md**: للفهم العميق للنظام
- **SPEC-KIT-QUICK-REF.md**: للمرجع السريع جداً
- **SPEC-KIT-STATUS.md**: لمعرفة حالة التثبيت

---

## 🔍 البحث السريع

### أبحث عن معلومة عن...

| الموضوع | الملف |
|---------|-------|
| **الأوامر الأساسية** | [CHEAT-SHEET.md](./CHEAT-SHEET.md) |
| **سير العمل** | [DAILY-USAGE.md](./DAILY-USAGE.md) |
| **القواعد الحاكمة** | [memory/constitution.md](./memory/constitution.md) |
| **التقنيات المستخدمة** | [memory/project-context.md](./memory/project-context.md) |
| **المشاكل الشائعة** | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| **المواصفات الحالية** | [artifacts/spec.md](./artifacts/spec.md) |
| **الخطة التقنية** | [artifacts/plan.md](./artifacts/plan.md) |
| **قائمة المهام** | [artifacts/tasks.md](./artifacts/tasks.md) |

---

## 🎓 مسار التعلم الموصى به

### المبتدئ (يوم 1)
```
1. README.md (5 دقائق)
2. CHEAT-SHEET.md (10 دقائق)
3. memory/constitution.md (15 دقيقة)
4. تجربة أول ميزة بسيطة (30 دقيقة)
```

### المتوسط (يوم 2-3)
```
1. DAILY-USAGE.md كامل (30 دقيقة)
2. memory/project-context.md (20 دقيقة)
3. تجربة ميزة معقدة (60 دقيقة)
4. قراءة TROUBLESHOOTING.md (20 دقيقة)
```

### المتقدم (أسبوع 1)
```
1. SPEC-KIT-GUIDE.md (خارجي) (45 دقيقة)
2. تجربة جميع الأوامر المتقدمة
3. المساهمة في تحسين الوثائق
```

---

## ⚡ الوصول السريع (Quick Links)

### أكثر الملفات استخداماً
- 📘 [القواعد الحاكمة](./memory/constitution.md)
- 📋 [ورقة الغش](./CHEAT-SHEET.md)
- 📖 [الاستخدام اليومي](./DAILY-USAGE.md)
- 🔧 [حل المشاكل](./TROUBLESHOOTING.md)

### ملفات المخرجات (Artifacts)
- 📄 [المواصفات](./artifacts/spec.md)
- 🗺️ [الخطة](./artifacts/plan.md)
- ✅ [المهام](./artifacts/tasks.md)

### وثائق خارجية
- 📚 [../SPEC-KIT-GUIDE.md](../SPEC-KIT-GUIDE.md)
- 📌 [../SPEC-KIT-QUICK-REF.md](../SPEC-KIT-QUICK-REF.md)
- ℹ️ [../SPEC-KIT-STATUS.md](../SPEC-KIT-STATUS.md)

---

## 💡 نصائح للتصفح

### للقراءة الأولى
1. ابدأ بـ **README.md** للفهم العام
2. انتقل لـ **CHEAT-SHEET.md** للتعلم السريع
3. اقرأ **constitution.md** قبل أي تطوير
4. ارجع لـ **DAILY-USAGE.md** عند الحاجة

### للمراجعة السريعة
1. **CHEAT-SHEET.md** للأوامر
2. **constitution.md** للقواعد
3. **TROUBLESHOOTING.md** للمشاكل

### للتعمق
1. **SPEC-KIT-GUIDE.md** (خارجي)
2. **project-context.md** للتفاصيل
3. **architecture.md** (في المشروع الرئيسي)

---

## 🆘 المساعدة

### إذا لم تجد ما تبحث عنه

1. **ابحث في هذا الفهرس** للموضوع المناسب
2. **راجع TROUBLESHOOTING.md** للمشاكل الشائعة
3. **اقرأ SPEC-KIT-GUIDE.md** للشرح المفصل
4. **راجع constitution.md** للقواعد

### إذا واجهت مشكلة

```bash
# 1. راجع حل المشاكل
cat .specify/TROUBLESHOOTING.md

# 2. تحقق من حالة النظام
specify check

# 3. راجع الدستور
cat .specify/memory/constitution.md

# 4. راجع أمثلة سابقة
ls specs/
```

---

## 📌 تذكير مهم

> **القاعدة الذهبية**: 
> "الدستور > الكود | Constitution > Code"

**قبل أي تطوير**:
1. ✅ اقرأ `memory/constitution.md`
2. ✅ اتبع سير العمل في `DAILY-USAGE.md`
3. ✅ استخدم الأوامر من `CHEAT-SHEET.md`
4. ✅ راجع `TROUBLESHOOTING.md` إذا واجهت مشكلة

---

**آخر تحديث**: يناير 11، 2026  
**الإصدار**: 1.0.0  
**الحالة**: جاهز للاستخدام ✅

</div>

---

## English Quick Reference

### Most Important Files
1. **[memory/constitution.md](./memory/constitution.md)** - Project governance
2. **[CHEAT-SHEET.md](./CHEAT-SHEET.md)** - Quick reference
3. **[DAILY-USAGE.md](./DAILY-USAGE.md)** - Daily guide
4. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Problem solving

### Quick Links
- [README](./README.md) - Overview
- [Constitution](./memory/constitution.md) - Rules
- [Context](./memory/project-context.md) - Project info
- [Cheat Sheet](./CHEAT-SHEET.md) - Commands

### Artifacts
- [Spec](./artifacts/spec.md) - Current specification
- [Plan](./artifacts/plan.md) - Technical plan
- [Tasks](./artifacts/tasks.md) - Task list
