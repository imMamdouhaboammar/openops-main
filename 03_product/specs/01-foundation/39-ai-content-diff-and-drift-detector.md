
# Spec 39: AI Content Diff & Drift Detector

## Purpose
هذا الـ Spec يعرّف نظام مراقبة ذكي (AI-assisted) لاكتشاف:

- Content Drift (انحراف المحتوى عن الهدف الأصلي)
- Intent Drift (تغيّر نية الصفحة بدون قصد)
- Keyword Drift (خروج الصفحة عن الـ Cluster المعتمد)
- Tone Drift (تغيّر النبرة المؤسسية)
- Competitive Drift (المنافسين سبقوا الصفحة)

الهدف:
- حماية SEO / AEO على المدى الطويل
- منع تآكل قيمة الصفحات بدون ما حد يلاحظ
- تمكين تحديثات ذكية بدل إعادة كتابة عشوائية

---

## What Is Content Drift (Operational Definition)

يُعتبر المحتوى قد دخل في Drift عندما يحدث واحد أو أكثر من التالي:

- تغير >20% من النص بدون تحديث الـ Content Brief
- إدخال Keywords غير معتمدة
- فقدان وضوح الـ Intent
- تغير نبرة الكتابة (Salesy / Bloggy / Casual)
- انخفاض الظهور أو التفاعل بدون سبب تقني واضح

---

## Scope

ينطبق على:
- Service Pages
- Solution Pages
- Media Center Content
- Articles & Resources
- FAQ Blocks
- Multilingual Content (AR / EN)

---

## Drift Detection Dimensions

### 1. Textual Diff Analysis

**Goal:** معرفة ماذا تغيّر فعلًا.

Checks:
- مقارنة النسخة الحالية مع:
  - Last approved version
  - Original Content Brief (Spec 37)
- تحديد:
  - فقرات مضافة
  - فقرات محذوفة
  - إعادة صياغة جوهرية

Output:
- Diff summary (semantic, not character-level)

---

### 2. Keyword Drift Detection

**Goal:** التأكد أن الصفحة مازالت تخدم نفس الـ Cluster.

Checks:
- هل Primary Keyword مازال:
  - في H1
  - في intro
- هل ظهرت Keywords جديدة غير مسجلة؟
- هل اختفت Secondary Keywords مهمة؟

Drift Conditions:
- Primary keyword missing or demoted
- New competing keyword introduced
- Keyword density skewed

---

### 3. Intent Drift Detection

**Goal:** منع خلط النوايا.

Checks:
- هل الصفحة مازالت:
  - Informational؟
  - Commercial؟
  - Procurement-ready؟
- هل CTA مازال مناسب للنية؟
- هل FAQ يخدم نفس النية؟

Drift Conditions:
- Educational page أصبحت بيعية
- Service page أصبحت مقال توعوي
- CTA لا يتماشى مع intent

---

### 4. Brand Voice Drift

**Goal:** حماية صوت "$BrandNameArabic$".

Checks:
- مقارنة tone الحالي مع:
  - Approved Brand Voice
- رصد:
  - Superlatives
  - Emotional language
  - Casual expressions

Drift Conditions:
- ظهور لغة تسويقية
- مبالغة غير مدعومة
- فقدان الرسمية

---

### 5. AEO Degradation Detection

**Goal:** التأكد أن الصفحة مازالت AI-readable.

Checks:
- FAQ answers:
  - الطول
  - المباشرة
  - الوضوح
- هل مازالت الأسئلة واضحة؟
- هل الإجابات قابلة للاقتطاع؟

Drift Conditions:
- إجابات طويلة
- مقدّمات إنشائية
- غموض لغوي

---

### 6. Multilingual Drift

**Goal:** منع انفصال العربي عن الإنجليزي.

Checks:
- تطابق المعنى
- تطابق النبرة
- تطابق intent

Drift Conditions:
- تحديث لغة بدون الأخرى
- اختلاف tone
- اختلاف الرسالة

---

### 7. Competitive Drift (Optional but Strategic)

**Goal:** معرفة إن الصفحة أصبحت أضعف من المنافسين.

Checks:
- تغيّر SERP competitors
- صفحات جديدة تغطي نفس intent
- منافسين يضيفون:
  - FAQs
  - Case studies
  - Structured data

Drift Signal:
- الصفحة لم تعد topically complete

---

## Drift Severity Levels

| Level | Description |
|------|------------|
| LOW | تغييرات طفيفة لا تؤثر على intent |
| MEDIUM | بداية انحراف قابل للتصحيح |
| HIGH | انحراف واضح يؤثر على SEO/AEO |
| CRITICAL | الصفحة فقدت هويتها ووظيفتها |

---

## Drift Report Output (Mandatory)

```md
### Content Drift Report

Page:
Last Approved Version:
Current Version:
Cluster ID:
Language:

Detected Drift:
- Textual Diff: LOW / MEDIUM / HIGH
- Keyword Drift: YES / NO
- Intent Drift: YES / NO
- Brand Voice Drift: YES / NO
- AEO Impact: LOW / HIGH
- Multilingual Drift: YES / NO
- Competitive Drift: YES / NO

Severity Level:
LOW / MEDIUM / HIGH / CRITICAL

Recommended Action:
- No action
- Minor revision
- Re-align with Content Brief
- Full rewrite with new brief


⸻

Governance Rules
	•	MEDIUM Drift:
	•	يتطلب مراجعة بشرية
	•	HIGH Drift:
	•	إعادة ربط بـ Spec 37
	•	CRITICAL Drift:
	•	إيقاف الصفحة مؤقتًا
	•	إعادة بناء المحتوى

❌ لا يوجد نشر بدون معالجة Drift.

⸻

Frequency
	•	Pages عالية الأهمية:
	•	كل 30 يوم
	•	Pages متوسطة:
	•	كل 60–90 يوم
	•	Resources:
	•	كل 6 شهور

⸻

Integration
	•	مرتبط بـ:
	•	Spec 36 (Clusters)
	•	Spec 37 (Content Briefs)
	•	Spec 38 (Validation Gate)

Spec 39 يعمل كـ مراقب زمني يحمي القرارات القديمة.

⸻

Long-Term Value
	•	SEO مستقر
	•	AEO قوي
	•	موقع لا يشيخ
	•	قرارات محتوى مبنية على إشارات حقيقية

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

---
