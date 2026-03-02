
# Spec 37: Content Brief Generator from Keyword Clusters

## Purpose
هذا الـ Spec يعرّف نظامًا ثابتًا لتحويل أي **Keyword Cluster معتمد** إلى:
- Content Brief واضح
- Page Structure جاهز
- AEO-ready answers
- Schema-aware sections
- CTA مناسب لسوق Saudi B2G

الهدف:
- منع اختلاف الأسلوب بين الصفحات
- منع المحتوى الإنشائي أو التسويقي المبالغ فيه
- ضمان أن كل صفحة تخدم Intent واحد واضح

---

## Inputs (Mandatory)

لا يمكن إنشاء Content Brief إلا بوجود:

1. Keyword Cluster معتمد من Spec 36
2. Target Page محددة
3. Primary Language (AR / EN)
4. Target Intent (Informational / Commercial / Procurement-ready)

❌ أي Content بدون Cluster = مرفوض.

---

## Content Brief Output (Canonical Structure)

كل Content Brief يجب أن يُنتج بالترتيب التالي:

---

### 1. Page Identity

```md
Page Name:
Target URL:
Primary Keyword:
Secondary Keywords:
Search Intent:
Target Audience:
Language:


⸻

2. Page Goal (One Sentence Rule)

جملة واحدة فقط توضح:
	•	لماذا هذه الصفحة موجودة
	•	ما القرار الذي تساعد الزائر على اتخاذه

مثال:

تمكين الجهات الحكومية من تقييم والتعاقد مع شركة متخصصة في إدارة الفعاليات الرسمية وفق المعايير المعتمدة في المملكة.

⸻

3. Page Structure (Non-Negotiable)

3.1 Hero Section
	•	Headline:
	•	يحتوي Primary Keyword بشكل طبيعي
	•	رسمي، مؤسسي، بدون مبالغة
	•	Subheadline:
	•	يوضح القيمة التنفيذية
	•	CTA:
	•	غير بيعي
	•	رسمي (تواصل، استفسار، طلب معلومات)

⸻

3.2 Institutional Overview
	•	تعريف الخدمة بلغة رسمية
	•	توضيح النطاق والمسؤوليات
	•	ربط الخدمة بسياق الجهات الحكومية أو المؤسسات الكبرى

⸻

3.3 Capabilities & Methodology
	•	كيف نعمل
	•	مراحل التنفيذ
	•	الأدوار
	•	أدوات أو أنظمة (بدون مبالغة تقنية)

⸻

3.4 Compliance & Trust Signals
	•	تراخيص
	•	لوائح
	•	التزام
	•	بروتوكولات
	•	ربط بمصادر رسمية إن أمكن

⸻

3.5 Proof & Experience
	•	أمثلة
	•	حالات استخدام
	•	أرقام (إن وجدت)
	•	قطاعات خدمناها

❌ ممنوع ادعاءات غير مثبتة.

⸻

3.6 AEO / FAQ Block
	•	3 إلى 6 أسئلة من Question Keywords
	•	إجابات مباشرة
	•	كل إجابة:
	•	2–4 أسطر
	•	بدون لغة تسويقية
	•	صالحة للاقتطاع بواسطة AI

⸻

3.7 CTA Section (Procurement-Safe)
	•	صيغة هادئة
	•	لا يوجد ضغط
	•	موجه لطلب معلومات أو تنسيق تواصل

⸻

Writing Rules (Strict)
	•	اللغة:
	•	عربية فصحى رسمية للسعودية
	•	إنجليزية مؤسسية واضحة
	•	ممنوع:
	•	superlatives (الأفضل، الأول، الرائد)
	•	علامات تعجب في العناوين
	•	لغة مبيعات مباشرة
	•	التركيز:
	•	التنفيذ
	•	المنهجية
	•	القيمة المؤسسية

⸻

SEO & AEO Injection Rules
	•	Primary Keyword:
	•	مرة واحدة في H1
	•	مرة واحدة في intro
	•	Secondary Keywords:
	•	موزعة طبيعيًا
	•	Question Keywords:
	•	تستخدم فقط في FAQ أو H2/H3

⸻

Schema Mapping (From Brief)

كل Content Brief يجب أن يحدد:

Required Schema:
- Service / Article / FAQPage / Organization
FAQ Mapping:
- Question 1 → Answer
- Question 2 → Answer


⸻

Multilingual Workflow
	•	Arabic هو المصدر
	•	English يتم:
	•	ترجمته احترافيًا
	•	مراجعته لغويًا
	•	ضبطه ثقافيًا (Enterprise tone)

❌ لا توجد ترجمة حرفية.

⸻

Review & Approval Gates
	1.	Keyword Alignment Check
	2.	Intent Match Check
	3.	AEO Readability Check
	4.	Brand Voice Compliance
	5.	Final Approval

⸻

Reusability

كل Content Brief:
	•	يُحفظ
	•	يُرقم
	•	يُربط بالـ Cluster ID
	•	يمكن إعادة استخدامه لتحديث الصفحة دون كسر SEO

⸻

Success Criteria
	•	كل صفحة:
	•	لها هدف واحد
	•	تخدم Intent واحد
	•	مفهومة لمحركات البحث و AI
	•	الموقع:
	•	متماسك لغويًا
	•	واضح مؤسسيًا
	•	جاهز للتوسع

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

---
