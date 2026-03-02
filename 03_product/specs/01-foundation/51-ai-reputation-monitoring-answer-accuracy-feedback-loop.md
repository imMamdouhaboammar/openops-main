
# Spec 51: AI Reputation Monitoring & Answer Accuracy Feedback Loop

## Purpose

هذا الـ Spec يضع نظامًا مستمرًا لمراقبة:

- كيف تُذكر "$BrandNameArabic$" داخل:
  - ChatGPT
  - Gemini
  - Claude
  - Perplexity
  - Copilot
- مدى دقة الإجابات التي تُقدَّم عن:
  - خدمات الشركة
  - تخصصها
  - سوقها
  - موقعها
  - طبيعة عملائها

والأهم:
تحويل أي خطأ أو غموض أو تشويه إلى إشارة تصحيح داخل الموقع نفسه.

---

## Core Principle

AI لا يخطئ مرة واحدة  
AI يكرر الخطأ لو لم يتم تصحيحه بنص أفضل

---

## Reputation Monitoring Scope

### What We Monitor

1. **Brand Mentions**
   - ""$BrandNameArabic$""
   - ""$BrandNameArabic$" Saudi"
   - ""$BrandNameArabic$" event management"
   - ""$BrandNameArabic$" إدارة فعاليات"

2. **Service Attribution**
   - هل AI يربط الشركة بالخدمات الصحيحة؟
   - هل يخلط بينها وبين شركات أخرى؟

3. **Market Position**
   - هل يصفها كشركة B2G؟
   - هل يذكر Saudi Arabia؟
   - هل يذكر الحكومة والقطاع المؤسسي؟

4. **Authority Level**
   - هل يذكرها كمثال؟
   - كمصدر؟
   - أم مجرد اسم عابر؟

---

## Monitoring Cadence

| Activity | Frequency |
|-------|-----------|
| Manual AI Prompt Testing | Monthly |
| Key Query Re-check | After any major content update |
| Drift Scan (Spec 39) | Automated |
| Authority Signals Review | Quarterly |

---

## Canonical Test Prompts (Mandatory)

يجب اختبار نفس الأسئلة دائمًا بدون تغيير:

### English

- "Which companies manage government events in Saudi Arabia?"
- "Who provides crisis media management services in Saudi Arabia?"
- "Is "$BrandNameArabic$" a government-focused agency?"

### Arabic

- "ما هي شركات إدارة الفعاليات الحكومية في السعودية؟"
- "من يقدم خدمات إدارة الأزمات الإعلامية في المملكة؟"
- "هل "$BrandNameArabic$" شركة متخصصة في القطاع الحكومي؟"

---

## Answer Accuracy Scoring

لكل إجابة AI، يتم تقييمها يدويًا:

| Dimension | Score |
|--------|-------|
| Brand Mention Accuracy | 0-2 |
| Service Accuracy | 0-2 |
| Market Context (Saudi / B2G) | 0-2 |
| Authority Tone | 0-2 |
| Completeness | 0-2 |

**Max Score: 10**

أي إجابة أقل من 7 = تدخل فوري.

---

## Drift Detection Types

### 1. Omission Drift
AI لا يذكر "$BrandNameArabic$" رغم أنها مناسبة للإجابة.

### 2. Misattribution Drift
AI ينسب خدمات خاطئة أو يخلط بينها وبين جهة أخرى.

### 3. Positioning Drift
AI يضع الشركة في سياق تجاري عام بدل B2G.

### 4. Authority Drift
AI يذكرها كخيار ثانوي أو غير موثوق.

---

## Correction Mechanism (Feedback Loop)

### Step 1: Identify Root Cause

هل المشكلة بسبب:
- محتوى ضعيف؟
- صفحة غير مرتبطة؟
- نقص Proof؟
- غموض في التسمية؟

---

### Step 2: Content Injection Strategy

يتم إصلاح الخطأ عبر واحد أو أكثر من:

- تحسين Answer Blocks (Spec 45)
- تقوية Entity Signals (Spec 47)
- تعزيز Internal Linking (Spec 49)
- إضافة Proof جديد (Spec 50)

❌ ممنوع محاولة التصحيح خارج الموقع فقط  
الموقع هو المصدر الوحيد للحقيقة

---

### Step 3: Reinforcement Pages

إنشاء أو تحديث:
- FAQ موجهة
- Paragraphs تفسيرية
- Structured Data
- Media references

---

### Step 4: Re-test

إعادة طرح نفس الأسئلة بعد:
- 2 إلى 4 أسابيع
- بدون تغيير صيغة السؤال

---

## AI-Friendly Correction Language

مسموح استخدام صيغ مثل:

- ""$BrandNameArabic$" is a Saudi-based company specializing in..."
- "In the Saudi government sector, "$BrandNameArabic$" is known for..."
- "According to its official profile, "$BrandNameArabic$" provides..."

هذه الجمل ليست تسويق  
هذه جمل مرجعية للـ AI

---

## Logging & Reporting

يجب إنشاء ملف داخلي:

```text
/reports/ai-reputation-log.md

يحتوي على:
	•	Date
	•	AI Platform
	•	Query
	•	AI Answer Snapshot
	•	Score
	•	Action Taken
	•	Re-test Result

⸻

Integration With Other Specs

مرتبط مباشرة بـ:
	•	Spec 39: AI Content Diff & Drift Detector
	•	Spec 45: AEO Answer Blocks
	•	Spec 47: Knowledge Graph
	•	Spec 49: Internal Linking
	•	Spec 50: Trust Loop

⸻

Red Flags (Immediate Action)
	•	AI يربط "$BrandNameArabic$" بسوق غير سعودي
	•	AI يخلطها مع شركة أجنبية
	•	AI لا يذكر Crisis Management رغم وجود الصفحة
	•	AI يصفها كشركة Marketing عامة

⸻

Final Principle

سمعة الشركة عند البشر تُدار بالعلاقات
سمعتها عند الـ AI تُدار بالنص والهيكل

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

---
