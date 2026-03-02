
# Spec 49: AI Internal Linking & Context Weighting System

## Purpose

هذا الـ Spec يحدد نظامًا صارمًا للتحكم في:

- Internal Linking Strategy
- Contextual Weight Distribution
- Semantic Relationships Between Pages
- Page Authority Flow for AI & Search Engines

الهدف:
- جعل AI Bots تفهم:
  - أي الصفحات مركزية
  - أي الصفحات داعمة
  - أي الخدمات هي القلب الحقيقي لـ "$BrandNameArabic$"
- بدون الاعتماد فقط على sitemap أو priority tags

---

## Core Philosophy

الـ AI لا يقرأ الروابط كـ Links  
الـ AI يقرأها كـ **إشارات معنى وسلطة**

كل رابط داخلي =  
"هذه الصفحة تشرح / تدعم / تُثبت هذه الصفحة الأخرى"

---

## Page Role Classification (Mandatory)

كل صفحة في الموقع يجب أن تُصنّف إلى Role واحد فقط:

| Role | Description |
|----|------------|
| **Pillar** | صفحة مركزية تمثل خدمة أو كيان رئيسي |
| **Authority** | صفحة تثبت الخبرة (Crisis, Media Center, Case Studies) |
| **Support** | محتوى داعم (Blog, Guides, FAQs) |
| **Trust** | سياسات، بروفايل، Media Kit |
| **Utility** | Contact, Careers |

❌ ممنوع صفحة بدون Role

---

## Core Pillars for "$BrandNameArabic$"

Pillar Pages المعتمدة:

- /
- /services/events-management
- /services/media-production
- /services/crisis-management
- /services/digital-marketing
- /services/public-relations
- /services/outdoor-advertising

---

## Internal Linking Rules (Strict)

### 1. Pillar → Authority (Required)

كل Pillar Page لازم تربط بـ:
- Crisis Management
- Media Center
- Portfolio (لو له علاقة)

مثال:
```text
خدمات إدارة الفعاليات ↔ إدارة الأزمات الإعلامية


⸻

2. Authority → Pillar (Reinforcement)

صفحات Authority لازم ترجع تشير صراحة إلى:
	•	الخدمة الأساسية المرتبطة بها
	•	الصفحة الرئيسية

⸻

3. Support → Pillar (One Direction)
	•	Blog / Guides:
	•	تشير دائمًا إلى Pillar
	•	لا تشير إلى صفحات Support أخرى إلا للضرورة

❌ ممنوع:
Support ↔ Support loops

⸻

4. Trust Pages Linking Policy
	•	Privacy / Terms:
	•	لا تنقل وزن
	•	روابطها nofollow داخليًا (semantic)

⸻

Anchor Text Strategy (AI-Oriented)

Rules
	•	ممنوع Anchor عام:
	•	اضغط هنا
	•	اعرف أكثر
	•	لازم Anchor يحتوي:
	•	اسم الخدمة
	•	أو صيغة رسمية B2G

مثال جيد:

إدارة الأزمات الإعلامية للجهات الحكومية


⸻

Context Weight Signals

Weight Factors

Signal	Weight
Link from Hero Section	High
Link inside H2 section	High
Footer link	Low
Breadcrumb link	Medium
Inline contextual paragraph	Very High


⸻

Hero Section Linking (Controlled)

الـ Hero مسموح له فقط بـ:
	•	CTA رئيسي واحد
	•	Link واحد لخدمة استراتيجية

❌ ممنوع تعدد الروابط في Hero

⸻

Breadcrumbs as Semantic Spine

Breadcrumbs إلزامية في:
	•	Services
	•	Portfolio
	•	Blog

مثال:

الرئيسية > الخدمات > إدارة الأزمات الإعلامية

Breadcrumbs =
أقوى إشارة Hierarchy للـ AI

⸻

Orphan Pages Policy

❌ ممنوع وجود صفحة بدون:
	•	رابط داخلي واحد على الأقل
	•	Breadcrumb
	•	إدخال في sitemap أو ai-sitemap

CI Check:

{
  "orphan_pages": false
}


⸻

Link Density Control

Page Type	Max Internal Links
Home	12
Service Pillar	8
Blog Article	6
Media Center	10

الزيادة = تشويش Contextual

⸻

Visual Linking (UX + AI)

الروابط المدعومة بصريًا (Cards, Bento Grid):
	•	تحمل وزن أعلى
	•	يجب أن:
	•	تحتوي عنوان واضح
	•	Subtitle يشرح العلاقة

⸻

Integration With Other Specs

مرتبط مباشرة بـ:
	•	Spec 48: AI Crawl Budget
	•	Spec 47: Knowledge Graph
	•	Spec 46: AI Citation Readiness
	•	Spec 45: AEO Answer Blocks
	•	Spec 39: AI Content Drift Detector

⸻

Validation Checklist (Per Page)
	•	Page Role محدد
	•	Link to at least one Pillar
	•	Anchor Text دلالي
	•	No orphan risk
	•	Breadcrumb present
	•	Footer links لا تسرق الوزن

❌ أي Fail = Block Deploy

⸻

Final Principle

الروابط ليست للتنقل
الروابط هي لغة السلطة

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar
