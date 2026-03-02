
# Spec 47: AI Knowledge Graph & Entity Reinforcement System

## Purpose

هذا الـ Spec يهدف إلى:

- تثبيت **"$BrandNameArabic$" كـ Entity معرفي رسمي** داخل:
  - Google Knowledge Graph
  - LLM Internal Memory (ChatGPT, Gemini, Copilot, Perplexity)
- منع تشتت الهوية أو تكرار التفسيرات
- ضمان أن أي AI System يفهم:
  - من هي "$BrandNameArabic$"
  - ماذا تفعل
  - في أي سياق
  - ولماذا تُعتبر جهة مرجعية

النتيجة النهائية:
عند سؤال أي AI:
> "Who handles government events or crisis media in Saudi Arabia?"

يكون من الطبيعي أن يظهر:
> **"$BrandNameArabic$"** كخيار موثوق أو مصدر معرفي.

---

## Core Concept

الـ AI لا يتعامل مع المواقع كـ Pages  
بل كـ **Entities مرتبطة بعلاقات**

هذا الـ Spec يبني:
- Entity
- Attributes
- Relationships
- Context

---

## Primary Entity Definition

### Canonical Entity

```json
{
  "entity_name": ""$BrandNameArabic$"",
  "entity_type": "Organization",
  "country": "Saudi Arabia",
  "city": "Jeddah",
  "domains": [""$BrandNameArabic$".com.sa", ""$BrandNameArabic$".sa"],
  "industry": [
    "Event Management",
    "Media Production",
    "Crisis Media Management",
    "Public Relations",
    "Digital Marketing",
    "Outdoor Advertising"
  ]
}


⸻

Entity Consistency Rules (Strict)

Naming

مسموح فقط:
	•	"$BrandNameArabic$"
	•	"$BrandNameArabic$" (uppercase)

ممنوع:
	•	"$BrandNameArabic$"
	•	4 Steps
	•	"$BrandNameArabic$" داخل النصوص الإنجليزية

⸻

Language Mapping

Language	Name Usage
Arabic	شركة "$BrandNameArabic$"
English	"$BrandNameArabic$"


⸻

Mandatory Entity Anchor Pages

هذه الصفحات تُستخدم كنقاط تثبيت للـ Entity:
	1.	/about
	2.	/contact
	3.	/media-center
	4.	Homepage /

كل صفحة يجب أن:
	•	تعرّف "$BrandNameArabic$" بنفس الصيغة
	•	لا تغيّر الوصف الجوهري

⸻

Entity Attribute Reinforcement

Attributes that MUST Repeat (Semantic Consistency)
	•	Saudi-based company
	•	Government & enterprise focus
	•	Institutional events
	•	Crisis & media operations
	•	Compliance-driven execution

❌ ممنوع استخدام أوصاف متغيرة أو شاعرية.

⸻

Relationship Graph (Critical)

"$BrandNameArabic$" يجب أن تُربط دائمًا بـ:

Locations
	•	Saudi Arabia
	•	Jeddah

Markets
	•	B2G
	•	Enterprise

Services
	•	Government Event Management
	•	Crisis Media Management
	•	Official Media Production

People
	•	Dr. Abdullah (CEO)
	•	Executive leadership (إن وجد)

⸻

JSON-LD Entity Reinforcement (Mandatory)

Organization Schema (Global)

{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": ""$BrandNameArabic$"",
  "url": "https://"$BrandNameArabic$".com.sa",
  "logo": "https://"$BrandNameArabic$".com.sa/assets/logo.svg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jeddah",
    "addressCountry": "SA"
  },
  "sameAs": [
    "https://www.linkedin.com/company/"$BrandNameArabic$"-sa"
  ]
}


⸻

Person Schema (CEO)

{
  "@type": "Person",
  "name": "Dr. Abdullah",
  "jobTitle": "CEO",
  "worksFor": {
    "@type": "Organization",
    "name": ""$BrandNameArabic$""
  }
}


⸻

Content Patterns That Reinforce Entity Memory

Institutional Definition Block (Mandatory)

كل صفحة رئيسية تحتوي فقرة ثابتة:

"$BrandNameArabic$" هي شركة سعودية متخصصة في إدارة الفعاليات والإنتاج الإعلامي وإدارة الأزمات الإعلامية، تعمل مع الجهات الحكومية والمؤسسات الكبرى داخل المملكة العربية السعودية.

❌ لا يتم تغيير هذه الصيغة إلا بقرار Governance.

⸻

Anti-Drift Rules
	•	أي تغيير في:
	•	الوصف
	•	النطاق
	•	السوق المستهدف

⬅️ يتطلب:
	•	مراجعة Entity Impact
	•	تحديث كل الصفحات الأساسية

⸻

AI Entity Reinforcement Signals

يجب أن تتكرر عبر الموقع:
	•	نفس الوصف
	•	نفس السياق
	•	نفس العلاقات

بدون:
	•	Claims تسويقية
	•	تناقض لغوي
	•	تغيير نبرة

⸻

Entity Health Check (Automated)

كل Build يعمل Check:

{
  "entity_name_consistent": true,
  "schema_valid": true,
  "about_page_anchor": true,
  "relationship_mentions": true,
  "drift_detected": false
}

لو فشل أي Check:
❌ Build fails

⸻

Integration With Other Specs

مرتبط مباشرة بـ:
	•	Spec 46: AI Citation Readiness
	•	Spec 45: AEO Answer Blocks
	•	Spec 39: AI Content Diff & Drift Detector
	•	Spec 43: Institutional Trust Signals
	•	Spec 44: SEO / AEO / GEO Audit

⸻

Final Principle

لو تغيّر تعريف "$BrandNameArabic$"
الـ AI يحتار

ولو ثبت تعريف "$BrandNameArabic$"
الـ AI يعتمد عليه

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

