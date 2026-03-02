
# Spec 44: Page-by-Page SEO / AEO / GEO Audit & Indexability Assurance

## Purpose
هذا الـ Spec يُلزم النظام (أو أي Agent يعمل على المشروع) بفحص **كل صفحة على حدة**
للتأكد من أنها:

- SEO-oriented (قابلة للفهرسة والترتيب)
- AEO-ready (مناسبة لمحركات الإجابة و LLMs)
- GEO-aware (مفهومة مكانيًا وسياقيًا للسوق السعودي)
- Indexable بدون عوائق تقنية أو لغوية

الهدف:
منع وجود أي صفحة "موجودة شكليًا" لكنها:
❌ غير مفهومة للعناكب  
❌ غير قابلة للاستخراج كإجابة  
❌ أو غير مرتبطة بالسياق الجغرافي والمؤسسي  

---

## Audit Scope

يشمل الفحص:

- جميع صفحات `/app/[locale]/**`
- الصفحات الثابتة (Home, About, Services…)
- صفحات الخدمات الفرعية
- Media Center
- Blog / Resources
- 404 / 500
- Legal Pages

ويتم الربط المرجعي مع:

- `/Core` (المحتوى)
- `/specs` (المعايير)
- metadata / JSON-LD / routing

---

## Audit Levels

### Level 1: Indexability & Crawl Readiness

لكل صفحة يجب التحقق من:

- `robots` = index, follow
- عدم وجود:
  - noindex غير مقصود
  - canonical خاطئ
- الصفحة قابلة للوصول بدون:
  - Auth
  - JS blocking
- موجودة في:
  - sitemap.xml
- Status Code = 200

❌ أي صفحة تفشل هنا = Blocker

---

### Level 2: Technical SEO (Page Skeleton)

فحص العناصر الأساسية:

- Title tag:
  - فريد
  - غير مكرر
  - أقل من 60 char
- Meta description:
  - وصفي
  - غير تسويقي
- H1:
  - واحد فقط
  - يعكس نية الصفحة
- H2/H3:
  - هرمية صحيحة
- URL:
  - نظيف
  - وصفي
  - بلا parameters

---

### Level 3: Content Semantics (SEO + AEO)

#### Required Checks:
- وجود:
  - تعريف واضح للصفحة
  - شرح سياقي للخدمة أو الفكرة
- استخدام مصطلحات رسمية (AR/EN)
- عدم الاعتماد على صور فقط لنقل المعنى
- وجود فقرات قابلة للاقتباس (Answer Blocks)

#### AEO Readiness:
- أسئلة ضمنية أو صريحة
- فقرات تجيب مباشرة
- لغة تفسيرية لا دعائية

Example:
> "إدارة الأزمات الإعلامية هي منظومة..."

---

### Level 4: GEO & Institutional Context

لكل صفحة:

- هل تشير بوضوح إلى:
  - السعودية
  - البيئة التنظيمية
  - الجهات أو السياق الحكومي؟
- استخدام مصطلحات:
  - هيئة
  - تنظيم
  - ترخيص
  - امتثال
- عدم استخدام لغة عالمية مبهمة

❌ صفحة بلا سياق مكاني = فرصة ضائعة

---

### Level 5: Structured Data & AI Readability

فحص:

- JSON-LD المناسب لنوع الصفحة:
  - Organization
  - Service
  - Article
  - FAQPage
- تطابق المحتوى مع الـ schema
- عدم وجود schema مضلل

AEO Check:
- هل يمكن لـ LLM تلخيص الصفحة؟
- هل تحتوي على:
  - تعريف
  - خطوات
  - منهجية
  - أمثلة؟

---

### Level 6: Internal Linking & Knowledge Graph

- الصفحة مرتبطة من:
  - Navigation
  - صفحات أخرى ذات صلة
- Links ذات معنى (Anchor text)
- لا orphan pages

Knowledge Graph Signal:
- هل الصفحة:
  - تشرح
  - تشير
  - تبني علاقة مفهومية؟

---

### Level 7: Media SEO

- الصور:
  - Alt text وصفي مؤسسي
  - أسماء ملفات نظيفة
- الفيديو:
  - وصف
  - poster
  - لا auto-play مع sound
- Media لا تكسر الفهم النصي

---

## Page Audit Output (Mandatory)

لكل صفحة يجب إنتاج:

```json
{
  "page": "/ar/services/crisis-management",
  "indexable": true,
  "seo_score": "pass | warning | fail",
  "aeo_ready": true,
  "geo_context": "strong | weak | missing",
  "issues": [
    "H1 generic",
    "Missing Saudi context paragraph"
  ],
  "recommendations": [
    "Add definition paragraph",
    "Insert compliance reference"
  ]
}


⸻

Governance Rules
	•	لا تُنشر صفحة:
	•	بدون المرور بهذا الفحص
	•	أي تعديل محتوى:
	•	يعاد فحص الصفحة
	•	أي صفحة تفشل مرتين:
	•	تدخل Content Review Cycle

⸻

Red Flags (Immediate Action)
	•	صفحة بدون تعريف
	•	صفحة بلا سياق مكاني
	•	صفحة مليئة شعارات
	•	صفحة غير مرتبطة داخليًا
	•	صفحة لا يمكن اقتباسها كإجابة

⸻

Integration

مرتبط بـ:
	•	Spec 36: Keyword Strategy
	•	Spec 38: Content Validation
	•	Spec 39: AI Drift Detection
	•	Spec 43: Institutional Trust Signals
	•	Sitemap & Metadata Specs

⸻

Final Principle

الصفحة الجيدة للبشر
هي نفسها الصفحة الجيدة للعناكب
وهي نفسها الصفحة الجيدة للـ AI

لو احتجت شرح الفرق، الصفحة فاشلة.

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

---
