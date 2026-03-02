
# Spec 45: AEO Answer Blocks & Snippet Engineering

## Purpose
هذا الـ Spec يهدف إلى تحويل صفحات موقع "$BrandNameArabic$" من مجرد محتوى قابل للفهرسة  
إلى **مصدر إجابات مباشر** لمحركات:

- Google AI Overviews
- ChatGPT (Browse / Memory)
- Gemini
- Perplexity
- Copilot

الهدف النهائي:
أن يتم **سحب فقرات كاملة من الموقع كإجابات جاهزة**
وليس مجرد ذكر الرابط ضمن النتائج.

---

## Core Principle

إذا لم تستطع صفحة ما أن تجيب على سؤال واضح  
فهي صفحة غير صالحة لعصر Answer Engines.

---

## What is an Answer Block

Answer Block هو:

- فقرة أو مجموعة فقرات
- تُعرّف مفهومًا أو تجيب عن سؤال
- مكتوبة بلغة تقريرية محايدة
- يمكن اقتطاعها بدون فقدان المعنى

❌ ليس إعلان  
❌ ليس شعارات  
❌ ليس مقدمة إنشائية  

---

## Answer Block Placement Rules

لكل صفحة:

1. Answer Block أساسي واحد على الأقل
2. يوضع:
   - بعد الـ Hero مباشرة
   - أو في بداية الـ Main Content
3. لا يكون داخل:
   - Accordion مخفي
   - Tabs
   - Components تعتمد على JS فقط

---

## Mandatory Answer Block Types

### 1. Definition Block (إجباري لكل Service)

صيغة ثابتة:

```text
[اسم الخدمة] هي [تعريف مؤسسي واضح]، وتشمل [نطاق العمل]، وتهدف إلى [الأثر].

مثال:

إدارة الأزمات الإعلامية هي منظومة متكاملة تهدف إلى حماية صورة المؤسسة أثناء الأزمات، من خلال التخطيط المسبق، التواصل الاستراتيجي، وإدارة الرسائل الإعلامية في البيئات الحساسة.

⸻

2. Process / Methodology Block

صيغة خطوات واضحة:
	•	مرحلة الاستعداد
	•	مرحلة التنفيذ
	•	مرحلة التقييم

بدون أرقام تسويقية أو وعود.

⸻

3. Use Case / When to Use Block

صيغة:

تُستخدم هذه الخدمة عندما…

مهم جدًا للـ AI لفهم السياق.

⸻

4. Compliance / Institutional Context Block

خاص بسوق السعودية و B2G:
	•	إشارات إلى:
	•	الجهات
	•	اللوائح
	•	السياق الرسمي
	•	بدون ادعاء شراكات غير مثبتة

⸻

5. FAQ-style Answer Blocks (Optional but Recommended)

بدون صفحة FAQ منفصلة بالضرورة.

صيغة السؤال:
	•	كاملة
	•	رسمية
	•	بدون لهجة عامية

⸻

Writing Rules (Non-Negotiable)
	•	لغة تقريرية
	•	جُمل قصيرة نسبيًا
	•	بدون تعجب
	•	بدون “نحن الأفضل”
	•	بدون استعارات
	•	بدون وعود تسويقية

⸻

AEO Linguistic Signals Checklist

Answer Block جيد يجب أن:
	•	يبدأ بتعريف أو إجابة مباشرة
	•	لا يعتمد على السياق السابق
	•	يمكن نسخه ولصقه بمفرده
	•	يحتوي مصطلحات رسمية

⸻

HTML & Semantic Structure
	•	يوضع داخل:
	•	<section>
	•	العنوان:
	•	<h2> أو <h3>
	•	الفقرة:
	•	<p> واحدة أو اثنتين كحد أقصى
	•	لا تُجزّأ الفقرة بكثرة

⸻

JSON-LD Alignment

إذا كانت الصفحة تحتوي Answer Blocks:
	•	يجب أن يتوافق ذلك مع:
	•	FAQPage
	•	Article
	•	Service

لا يُنشأ Schema بلا محتوى فعلي مطابق.

⸻

Anti-Patterns (ممنوع)
	•	مقدمة طويلة قبل الإجابة
	•	تعريف غامض
	•	لغة شعرية
	•	استخدام “نحن” داخل التعريف
	•	دمج أكثر من فكرة في فقرة واحدة

⸻

Page-Level AEO Audit Output

لكل صفحة:

{
  "page": "/ar/services/crisis-management",
  "answer_blocks": {
    "definition": true,
    "process": true,
    "use_case": true,
    "compliance": true
  },
  "extractable": true,
  "issues": [],
  "improvements": []
}


⸻

Governance
	•	أي صفحة جديدة:
	•	لا تُعتمد بدون Answer Block
	•	أي تعديل محتوى:
	•	يُراجع تأثيره على Answer Blocks
	•	أي صفحة تفشل في extraction:
	•	تدخل Content Refactor

⸻

Integration

مرتبط بـ:
	•	Spec 36: Keyword Strategy
	•	Spec 39: AI Content Diff & Drift
	•	Spec 44: Page SEO/AEO/GEO Audit
	•	Spec 43: Institutional Trust Signals

⸻

Final Rule

المحتوى الذي لا يمكن أن يُستخدم كإجابة
سيتم تجاهله مهما كان تصميمه جميل.

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

