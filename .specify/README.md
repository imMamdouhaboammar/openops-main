# Spec-Kit Setup - PixelForge Studio

<div dir="rtl">

## نظرة عامة

تم تثبيت وتكوين **Spec-Kit** بنجاح في مشروع PixelForge Studio. Spec-Kit هو نظام تطوير موجه بالمواصفات (Spec-Driven Development) يحول المواصفات إلى تطبيقات قابلة للتشغيل.

## الملفات المثبتة

### التكوين الأساسي
- ✅ `.specifyrc.json` - ملف التكوين الرئيسي
- ✅ `.specify/memory/constitution.md` - دستور المشروع (القواعد الحاكمة)
- ✅ `.specify/memory/project-context.md` - سياق المشروع للـ AI
- ✅ `.specify/templates/` - قوالب المواصفات والخطط
- ✅ `.claude/commands/` - أوامر Claude المخصصة

### الأدوات المتاحة
```
/speckit.clarify       - توضيح المتطلبات الغامضة
/speckit.specify       - كتابة المواصفات (ماذا نبني)
/speckit.plan          - إنشاء الخطة التقنية (كيف نبني)
/speckit.checklist     - التحقق من جودة المواصفات
/speckit.tasks         - توليد المهام القابلة للتنفيذ
/speckit.analyze       - مراجعة شاملة للمواصفات
/speckit.implement     - تنفيذ جميع المهام
/speckit.constitution  - عرض دستور المشروع
/speckit.taskstoissues - تحويل المهام إلى Issues في GitHub
```

## سير العمل الموصى به

### 1. للميزات الجديدة الواضحة
```
/speckit.specify   → اكتب المواصفات
/speckit.plan      → حدد الخطة التقنية
/speckit.tasks     → ولّد قائمة المهام
/speckit.implement → نفّذ التطبيق
```

### 2. للميزات التي تحتاج توضيح
```
/speckit.clarify   → حل الغموض أولاً
/speckit.specify   → اكتب المواصفات
/speckit.plan      → حدد الخطة التقنية
/speckit.tasks     → ولّد قائمة المهام
/speckit.implement → نفّذ التطبيق
```

### 3. للتحقق من الجودة قبل البناء
```
/speckit.specify    → اكتب المواصفات
/speckit.plan       → حدد الخطة التقنية
/speckit.checklist  → تحقق من الجودة
/speckit.analyze    → راجع الاتساق
```

## المبادئ الأساسية (من الدستور)

### 1. العمارة المعيارية
- لا يزيد أي ملف عن 400 سطر
- كل وحدة لها حدود واضحة
- استخدام Barrel Exports عبر `index.ts`

### 2. التصميم الموجه بالأحداث
- جميع الاتصالات بين الوحدات عبر `EnhancedEventBus`
- الأحداث تحتوي على معرفات ارتباط (correlation IDs)
- الأحداث عديمة الحالة وقابلة للتكرار

### 3. الأمان النوعي أولاً
- TypeScript strict mode إلزامي
- التحقق من صحة جميع البيانات الخارجية بـ Zod
- لا استخدام لـ `any` types

### 4. حفظ الحالة
- Zustand للحالة التفاعلية
- Dexie لـ IndexedDB
- نقل تلقائي للمخططات

### 5. تكامل الذكاء الاصطناعي
- جميع استدعاءات AI عبر `GeminiClient`
- إعادة المحاولة مع p-retry
- دعم multimodal (نص + صور)

### 6. استراتيجية التخزين المؤقت
- مفاتيح Cache بـ SHA-256
- التحقق قبل استدعاء API
- تنظيف تلقائي للنتائج >30 يوم

### 7. واجهة مستخدم قابلة للمراقبة
- جميع الأخطاء مرئية للمستخدم
- مؤشرات التقدم للعمليات الطويلة
- لا فشل صامت

### 8. الاختبارات إلزامية
- اختبارات الوحدة >80% تغطية
- اختبارات التكامل مع AI وهمي
- اختبار يدوي موثق

## التقنيات المستخدمة

### Frontend
- Vite 6.2.0 + React 19.2.3
- TypeScript 5.8.2 (strict mode)
- Tailwind CSS
- Lucide Icons

### إدارة الحالة
- Zustand 5.0.9
- TanStack React Query 5.90.12
- Dexie 4.0.1

### الذكاء الاصطناعي
- @google/genai 1.33.0
- @ai-sdk/google 2.0.49
- p-retry 7.1.1

### التحقق من الصحة
- Zod 4.3.4

## بوابات الجودة

قبل شحن أي ميزة:
- ✅ `npm run build` (بدون أخطاء)
- ✅ `npm run lint` (ESLint strict)
- ✅ `npm run test` (جميع الاختبارات تمر)
- ✅ الاختبار اليدوي مكتمل
- ✅ مراجعة الكود موافق عليها

## أمثلة الاستخدام

### مثال 1: إضافة ميزة جديدة
```
المستخدم: "أريد إضافة نظام batch queue لمعالجة عدة طلبات AI بالتوازي"

الأمر: /speckit.clarify
← يطرح أسئلة: حد أقصى للطلبات؟ إلغاء فردي؟ أولويات؟

الأمر: /speckit.specify
← يكتب مواصفات كاملة في .specify/artifacts/spec.md

الأمر: /speckit.plan  
← يحدد: استخدام Promise.allSettled، Zustand للطابور، Dexie للحفظ

الأمر: /speckit.tasks
← يولد: 8 مهام (types، store، UI، tests، etc)

الأمر: /speckit.implement
← ينفذ كل مهمة واحدة تلو الأخرى
```

### مثال 2: تحسين ميزة موجودة
```
المستخدم: "تحسين واجهة Mockups Spaces بإضافة preset selector"

الأمر: /speckit.specify
← يكتب مواصفات التحسين

الأمر: /speckit.plan
← يخطط: تعديل MockupSpecNode، إضافة preset picker

الأمر: /speckit.tasks
← يولد مهام محددة

الأمر: /speckit.implement
← يطبق التحسينات
```

## الملفات المهمة

### للقراءة أولاً
- `.specify/memory/constitution.md` - **اقرأ قبل أي تطوير**
- `.specify/memory/project-context.md` - سياق المشروع
- `SPEC-KIT-GUIDE.md` - الدليل الشامل
- `SPEC-KIT-QUICK-REF.md` - مرجع سريع

### التوثيق
- `architecture.md` - عمارة المشروع الكاملة
- `package.json` - الاعتماديات
- `.specifyrc.json` - إعدادات Spec-Kit

### المخرجات
- `.specify/artifacts/spec.md` - المواصفات الحالية
- `.specify/artifacts/plan.md` - الخطة التقنية الحالية
- `.specify/artifacts/tasks.md` - قائمة المهام الحالية

## النصائح

1. **دائماً اقرأ الدستور قبل الكتابة**
2. **اتبع سير العمل Spec-Driven للميزات الجديدة**
3. **لا تتجاوز 400 سطر لأي ملف**
4. **استخدم الأحداث للاتصال بين الوحدات**
5. **تحقق من صحة البيانات الخارجية بـ Zod**
6. **الاختبارات غير قابلة للتفاوض**
7. **لا فشل صامت - اجعل الأخطاء مرئية**

## الدعم

إذا واجهت أي مشاكل:
1. راجع `SPEC-KIT-GUIDE.md`
2. تحقق من `.specify/memory/constitution.md`
3. شاهد الأمثلة في `SPEC-KIT-QUICK-REF.md`

</div>

---

## Overview (English)

**Spec-Kit** has been successfully installed and configured in PixelForge Studio. Spec-Kit is a Spec-Driven Development system that transforms specifications into executable applications.

## Installed Files

### Core Configuration
- ✅ `.specifyrc.json` - Main configuration file
- ✅ `.specify/memory/constitution.md` - Project governance rules
- ✅ `.specify/memory/project-context.md` - Project context for AI
- ✅ `.specify/templates/` - Spec and plan templates
- ✅ `.claude/commands/` - Custom Claude commands

### Available Commands
```
/speckit.clarify       - Resolve ambiguous requirements
/speckit.specify       - Write specifications (what to build)
/speckit.plan          - Create technical plan (how to build)
/speckit.checklist     - Validate spec quality
/speckit.tasks         - Generate actionable tasks
/speckit.analyze       - Comprehensive spec review
/speckit.implement     - Execute all tasks
/speckit.constitution  - Display project constitution
/speckit.taskstoissues - Convert tasks to GitHub Issues
```

## Quick Start

### New Feature Workflow
```bash
/speckit.specify   # Write what you want
/speckit.plan      # Define how to build it
/speckit.tasks     # Break it down
/speckit.implement # Build it
```

### With Clarification
```bash
/speckit.clarify   # Ask questions first
/speckit.specify   # Then specify
/speckit.plan      # Then plan
/speckit.tasks     # Then break down
/speckit.implement # Then build
```

## Core Principles

1. **Modular Architecture** - No file >400 lines
2. **Event-Driven** - All communication via EventBus
3. **Type-Safe** - TypeScript strict + Zod validation
4. **Local-First** - Zustand + Dexie/IndexedDB
5. **AI-Native** - Unified GeminiClient wrapper
6. **Observable UX** - No silent failures
7. **Test-First** - >80% coverage required

## Quality Gates

- ✅ Build passes
- ✅ Linting passes (strict)
- ✅ All tests pass
- ✅ Manual QA complete
- ✅ Code review approved

## Support

Check these files:
- `SPEC-KIT-GUIDE.md` - Comprehensive guide
- `.specify/memory/constitution.md` - Governance
- `SPEC-KIT-QUICK-REF.md` - Quick reference
