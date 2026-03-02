
# Spec 36: Keyword → Content → Page → Schema Mapping System

## Purpose
هذا الـ Spec يعرّف النظام الرسمي لتحويل:
Keyword Research  
→ Keyword Clusters  
→ Pages  
→ Content Blocks  
→ Structured Data (Schema / JSON-LD)  
→ AEO / GEO / AI Search Visibility  
Check this REPORT: /Users/mamdouhaboammar/Documents/المشـــاريـــــع الممدوحـــية/مواقع/"$BrandNameArabic$".com.sa/Core/SEO-REPORT.md

بما يخدم سوق:
- Saudi Arabia
- B2G
- Large Enterprises
- Procurement-driven search behavior

ويمنع:
- العشوائية في كتابة المحتوى
- تكرار الكلمات بين الصفحات
- كسر SEO أو AEO عند أي تعديل لاحق

---

## Strategic Context (Saudi B2G Reality)

- البحث في السوق السعودي **رسمي، مؤسسي، دقيق**.
- العربية هي اللغة الأساسية للقطاع الحكومي.
- الإنجليزية تُستخدم في:
  - الشركات الكبرى
  - الفرق متعددة الجنسيات
  - RFPs و Vendor Evaluation

لذلك:
- كل Page يجب أن تُبنى على **Intent واضح**
- وكل Keyword Cluster يجب أن يخدم **قرار شراء أو تقييم**

---

## Keyword Intent Framework (Mandatory)

كل Keyword Cluster يجب تصنيفه ضمن أحد الأنواع التالية:

1. Informational  
   (تعريف، تنظيم، لوائح، تراخيص)

2. Commercial / Comparative  
   (أفضل، شركات، وكالات، متخصصين)

3. Procurement-Ready  
   (مناقصة، تعاقد، RFP، طلب عرض)

4. Navigational  
   (اسم جهة، منصة، شركة)

❌ ممنوع إنشاء محتوى بدون Intent واضح.

---

## Cluster Structure (Canonical Model)

كل Cluster يجب أن يُوثق بالصيغة التالية:

```md
### Cluster Name

Primary Keyword:
Secondary Keywords:
Question Keywords (AEO):
Search Intent:
Target Language:
Funnel Stage:
Target Page:
Recommended Content Type:
Schema Types Required:


⸻

Page Mapping Rules (Non-Negotiable)

1. One Primary Keyword per Page
	•	لا يوجد صفحتان تستهدفان نفس الـ Primary Keyword.
	•	Secondary keywords يجب أن تكون semantic، لا تنافسية.

2. One Dominant Intent per Page
	•	الصفحة لا تخدم أكثر من intent رئيسي.
	•	أي intent آخر يتم دعمه عبر:
	•	FAQ
	•	Internal links
	•	Supporting articles

⸻

Content Architecture per Page

كل صفحة خدمة أو حل يجب أن تحتوي على:
	1.	Institutional Intro
	•	يعرّف الخدمة بلغة رسمية
	•	يخاطب جهة حكومية أو مؤسسة
	2.	Capability Section
	•	ماذا نقدم
	•	كيف ننفذ
	•	لماذا نحن مؤهلون
	3.	Compliance & Trust
	•	لوائح
	•	تراخيص
	•	معايير
	•	بروتوكولات
	4.	Proof
	•	Case studies
	•	أمثلة
	•	أرقام (لو متاحة)
	5.	Procurement CTA
	•	تواصل
	•	طلب معلومات
	•	استفسار رسمي

⸻

Schema & Structured Data Mapping

لكل Page يتم ربط Cluster بـ Schema Types إلزامية:

Page Type	Required Schema Types
Service Page	Service, Organization, BreadcrumbList
Crisis Management	Service, FAQPage
Event Management	Service, Article, FAQPage
Media Center	Organization, Article, MediaObject
Corporate Profile	Organization, AboutPage
Resource / Guide	Article, FAQPage

❌ لا توجد صفحة بدون JSON-LD.

⸻

AEO (Answer Engine Optimization) Rules
	•	كل Cluster يجب أن يحتوي على:
	•	3–6 Question Keywords
	•	يتم تحويلها إلى:
	•	FAQ blocks
	•	H2/H3 سؤال + إجابة مباشرة
	•	الإجابة:
	•	مباشرة
	•	بدون تسويق
	•	قابلة للاقتطاع من AI engines

⸻

Cannibalization Prevention Rules
	•	مراجعة شهرية للـ clusters
	•	أي overlap يتم حله عبر:
	•	Merge
	•	Canonical
	•	Page specialization

⸻

Content Creation Workflow (Aligned with Spec 15)
	1.	Keyword Cluster Approved
	2.	Page Assignment Approved
	3.	Content Draft (AR → EN)
	4.	AEO Check
	5.	Schema Injection
	6.	Final Approval

⸻

Governance & Change Safety

أي تعديل محتوى:
	•	لا يتم إلا بعد مراجعة:
	•	Primary keyword
	•	Intent
	•	Schema impact
	•	أي تعديل غير مطابق = REJECTED

⸻

Output Deliverables
	•	Keyword Cluster Registry (MD/CSV)
	•	Page ↔ Cluster Mapping Table
	•	Content Brief per Page
	•	Schema Checklist

⸻

Success Criteria
	•	كل صفحة:
	•	تخدم Intent واحد
	•	لها Cluster واضح
	•	لها Schema صحيح
	•	الموقع:
	•	مفهوم لمحركات البحث
	•	مفهوم لأنظمة AI
	•	مفهوم للـ Procurement Officers

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

---
