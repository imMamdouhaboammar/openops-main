
# Spec 38: AI Content Validation & Quality Gate

## Purpose
هذا الـ Spec يعرّف نظام تحقق ذكي (AI-assisted) لمراجعة أي محتوى قبل النشر، بهدف:

- منع كسر SEO أو AEO
- منع انحراف الـ Intent
- الحفاظ على نبرة وهوية "$BrandNameArabic$" المؤسسية
- ضمان الاتساق بين العربي والإنجليزي
- تقليل الاعتماد على المراجعة البشرية العشوائية

هذا الـ Spec يعمل كـ **Quality Gate إلزامي** قبل:
- Merge
- Deploy
- Content update

---

## Scope of Validation

يُطبق على:
- صفحات الخدمات
- صفحات الحلول
- المقالات
- FAQ blocks
- المحتوى التعريفي
- النصوص المترجمة (AR ⇄ EN)

---

## Validation Dimensions (Non-Negotiable)

كل محتوى يجب أن يمر على الأبعاد التالية:

---

### 1. Keyword Alignment Check

**Goal:** التأكد أن الصفحة تخدم الـ Cluster المعتمد فقط.

Checks:
- Primary Keyword:
  - موجود في H1
  - مستخدم مرة واحدة بشكل طبيعي
- Secondary Keywords:
  - مستخدمة بدون حشو
- ❌ ممنوع:
  - إدخال Keywords غير معتمدة
  - تكرار مبالغ فيه

Fail Conditions:
- Keyword stuffing
- Missing primary keyword
- Competing keyword detected

---

### 2. Search Intent Consistency

**Goal:** منع خلط النوايا داخل الصفحة.

Checks:
- هل المحتوى يخدم Intent واحد فقط؟
- هل الـ CTA متسق مع intent؟
- هل FAQ يدعم نفس النية؟

Fail Conditions:
- Informational content مع CTA بيعي مباشر
- خلط procurement مع educational tone

---

### 3. AEO Readability & Answer Quality

**Goal:** قابلية الاقتطاع من AI Answer Engines.

Checks:
- FAQ answers:
  - 2–4 أسطر
  - إجابة مباشرة
  - بدون مقدمات تسويقية
- وجود جمل تعريفية واضحة
- عدم استخدام استعارات أو لغة مبهمة

Fail Conditions:
- إجابات طويلة
- إجابات إنشائية
- إجابة لا تبدأ بالمعلومة مباشرة

---

### 4. Brand Voice & Institutional Tone

**Goal:** الحفاظ على صوت "$BrandNameArabic$".

Tone Rules:
- رسمي
- هادئ
- مؤسسي
- تنفيذي

❌ ممنوع:
- “الأفضل”، “الأول”، “الرائد”
- علامات تعجب في العناوين
- لغة مبيعات مباشرة

Fail Conditions:
- Superlatives
- Sales copy tone
- Emotional exaggeration

---

### 5. Language & Translation Integrity

**Goal:** اتساق العربي والإنجليزي.

Checks:
- English:
  - Enterprise-grade
  - Clear & formal
- Arabic:
  - فصحى رسمية سعودية
- المعنى:
  - متطابق
  - غير مترجم حرفيًا

Fail Conditions:
- Literal translation
- Tone mismatch
- Meaning drift

---

### 6. Structural Completeness

**Goal:** الالتزام بـ Spec 37.

Checks:
- Hero
- Institutional overview
- Capabilities
- Compliance
- Proof
- FAQ
- CTA

Fail Conditions:
- Missing section
- Sections out of order
- CTA غير مناسب

---

### 7. Schema Consistency Check

**Goal:** ضمان جاهزية Structured Data.

Checks:
- Schema type مطابق لنوع الصفحة
- FAQ ↔ FAQPage
- Service ↔ Service schema
- Organization data consistent

Fail Conditions:
- Missing schema
- Schema type mismatch
- Incomplete JSON-LD fields

---

## Validation Output (Mandatory)

أي محتوى يتم مراجعته ينتج:

```md
### AI Content Validation Report

Page:
Cluster ID:
Language:

Scores:
- Keyword Alignment: PASS / FAIL
- Intent Consistency: PASS / FAIL
- AEO Readiness: PASS / FAIL
- Brand Voice: PASS / FAIL
- Language Integrity: PASS / FAIL
- Structure: PASS / FAIL
- Schema: PASS / FAIL

Final Status:
- APPROVED
- REJECTED
- APPROVED WITH NOTES

Notes:
- …


⸻

Automation Rules
	•	المحتوى لا يُنشر إذا:
	•	أي بند = FAIL
	•	“Approved with Notes”:
	•	ملاحظات تجميلية فقط
	•	لا تؤثر على SEO أو intent

⸻

Governance Integration
	•	مرتبط مباشرة بـ:
	•	Spec 36 (Keyword Mapping)
	•	Spec 37 (Content Brief)
	•	أي تعديل محتوى:
	•	يعاد تمريره عبر Spec 38

⸻

Long-Term Benefits
	•	محتوى ثابت الجودة
	•	موقع مفهوم لمحركات البحث والـ AI
	•	تقليل rework
	•	سهولة التوسع بدون فوضى

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

---
