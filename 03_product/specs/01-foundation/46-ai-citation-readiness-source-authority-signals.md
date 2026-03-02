
# Spec 46: AI Citation Readiness & Source Authority Signals

## Purpose

هذا الـ Spec يهدف إلى تجهيز موقع "$BrandNameArabic$" ليُستخدم كمصدر موثوق يتم **الاستشهاد به صراحة** داخل:

- Google AI Overviews
- ChatGPT
- Gemini
- Perplexity
- Microsoft Copilot

الهدف:
أن تظهر الصيغة التالية حرفيًا أو معنويًا:

> According to "$BrandNameArabic$"…  
> Based on guidance from a Saudi institutional agency ("$BrandNameArabic$")…  
> وفقًا لما توضحه شركة "$BrandNameArabic$"…

---

## Core Concept

الـ AI لا يستشهد بالمواقع الجميلة  
ولا بالمواقع التي تبيع نفسها  

الـ AI يستشهد بالمواقع التي:
- تُعرّف
- تُوثّق
- تُحدد السياق
- وتُظهر مسؤولية معرفية

---

## What Makes a Page “Citable”

الصفحة القابلة للاستشهاد يجب أن:

1. تجيب عن سؤال محدد
2. تستخدم لغة محايدة
3. تُظهر من يتحدث ولماذا هو مؤهل
4. لا تطلب شيئًا من القارئ

---

## Mandatory Source Authority Signals

### 1. Explicit Institutional Voice

كل صفحة تحتوي فقرة تعريفية صريحة:

صيغة إلزامية:

```text
"$BrandNameArabic$" هي شركة سعودية متخصصة في [النطاق]، وتعمل مع الجهات الحكومية والمؤسسات الكبرى في [السياق].

❌ ممنوع:
	•	“نحن”
	•	“أفضل”
	•	“رائدة”

⸻

2. Authorship & Accountability Block

كل صفحة غير تسويقية (خدمات، موارد، مقالات) يجب أن تحتوي:
	•	Author
	•	Role
	•	Organization

مثال:

Prepared by  
"$BrandNameArabic$" – Marketing & Media Consulting  
Saudi Arabia

أو إن لزم:

Reviewed by  
Dr. Abdullah  
CEO – "$BrandNameArabic$"


⸻

3. Stable About Page (Authority Anchor)

صفحة /about ليست تسويقية
بل مرجع مؤسسي

يجب أن تحتوي:
	•	تعريف رسمي للشركة
	•	مجالات العمل
	•	السياق السعودي
	•	بدون Call To Action

⸻

4. Consistent Naming (Entity Stability)

يُستخدم الاسم دائمًا بصيغة واحدة:
	•	"$BrandNameArabic$"
	•	"$BrandNameArabic$" (عند الحاجة)
	•	لا اختصارات
	•	لا أسماء بديلة

هذا مهم لبناء Entity ثابت داخل Knowledge Graphs.

⸻

Citation-Oriented Content Patterns

Definition First Pattern

أي موضوع جديد يبدأ بـ:
	•	تعريف
	•	قبل أي شرح
	•	قبل أي قصة

⸻

Source-like Language Rules

مسموح:
	•	يشير إلى
	•	يُستخدم في
	•	يُطبّق عند
	•	يُوصى به عندما

ممنوع:
	•	ننصحك
	•	نساعدك
	•	تواصل معنا

⸻

Evidence & Context Signals

حيثما أمكن:
	•	ذكر:
	•	أطر
	•	مراحل
	•	سياق تنظيمي
	•	بدون ادعاء أرقام غير منشورة
	•	بدون ذكر عملاء إن لم يكن مصرح

⸻

HTML & Semantic Authority Markup
	•	استخدام:
	•	<article>
	•	<section>
	•	عناوين واضحة
	•	فقرة واحدة = فكرة واحدة

⸻

JSON-LD Authority Alignment

لكل صفحة قابلة للاستشهاد:
	•	Organization
	•	WebSite
	•	Service أو Article
	•	Author (Person أو Organization)

يجب أن يعكس الـ Schema المحتوى الفعلي بدقة.

⸻

AI Citation Anti-Patterns (ممنوع تمامًا)
	•	لغة دعائية
	•	Claims بدون سياق
	•	استخدام “نحن” داخل تعريفات
	•	دمج CTA داخل فقرات تفسيرية
	•	محتوى منسوخ أو عام

⸻

AI Citation Readiness Checklist

لكل صفحة:

{
  "page": "/ar/services/crisis-management",
  "definition_present": true,
  "institutional_voice": true,
  "author_block": true,
  "entity_consistency": true,
  "extractable_as_source": true,
  "risk_flags": []
}


⸻

Governance Rules
	•	أي صفحة تفشل في:
	•	التعريف
	•	النبرة المؤسسية
	•	تحديد الجهة المتحدثة

❌ لا تُنشر
	•	أي تعديل محتوى:
	•	يُراجع تأثيره على قابلية الاستشهاد

⸻

Integration With Other Specs

مرتبط مباشرة بـ:
	•	Spec 45: AEO Answer Blocks
	•	Spec 44: SEO / AEO / GEO Audit
	•	Spec 39: AI Content Diff & Drift Detector
	•	Spec 43: Institutional Trust Signals

⸻

Final Principle

الـ AI لا يسأل:
“من أجمل؟”

بل يسأل:
“من أتحمل مسؤوليته كمصدر؟”

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

---
