
# Spec 48: AI Crawl Budget & Priority Indexing Strategy

## Purpose

هذا الـ Spec يحدد سياسة واضحة للتحكم في:

- Crawl Budget
- Indexing Priority
- AI Bot Accessibility
- ترتيب أولوية الصفحات للزحف والفهرسة

الهدف:
- ضمان أن الصفحات **الحرجة لبزنس "$BrandNameArabic$" (B2G / Enterprise)** يتم:
  - اكتشافها مبكرًا
  - فهرستها أولًا
  - استيعابها بشكل صحيح من:
    - Google
    - Bing
    - ChatGPT
    - Gemini
    - Claude
    - Perplexity
    - Copilot

---

## Core Philosophy

الـ Crawlers موارد محدودة  
والـ AI Bots بتقرأ بذكاء وليس بكثافة

إذًا:
- مش كل صفحة تستحق نفس الأهمية
- ومش كل ملف لازم يكون مفتوح بنفس الشكل

---

## Mandatory Files (Non-Negotiable)

### 1. robots.txt

📍 المسار:

/robots.txt

المحتوى الأساسي:

```txt
User-agent: *
Allow: /

Sitemap: https://"$BrandNameArabic$".com.sa/sitemap.xml
Sitemap: https://"$BrandNameArabic$".com.sa/ai-sitemap.xml


⸻

2. sitemap.xml (Search Engines)

📍 المسار:

/sitemap.xml

يحتوي فقط على:
	•	صفحات Core
	•	صفحات خدمات
	•	صفحات Portfolio
	•	Blog Articles (بعد الإطلاق)

❌ ممنوع:
	•	صفحات تجريبية
	•	drafts
	•	staging
	•	pagination parameters

⸻

3. ai-sitemap.xml (AI-Optimized)

📍 المسار:

/ai-sitemap.xml

هدفه:
	•	توجيه الـ AI Bots للصفحات ذات القيمة المعرفية العالية

يحتوي على:
	•	Homepage
	•	About
	•	Services (كل خدمة منفصلة)
	•	Crisis Management
	•	Media Center
	•	Blog Pillar Articles
	•	Trust Pages (Policies, Media Kit)

مثال Entry:

<url>
  <loc>https://"$BrandNameArabic$".com.sa/services/crisis-management</loc>
  <priority>1.0</priority>
  <changefreq>monthly</changefreq>
</url>


⸻

4. ai.txt (AI Access Manifest)

📍 المسار:

/ai.txt

الغرض:
	•	تعريف صريح للـ AI Systems
	•	تسهيل الاستيعاب السياقي
	•	تقليل التخمين

مثال محتوى:

Company: "$BrandNameArabic$"
Country: Saudi Arabia
Focus: Government & Enterprise Services
Primary Services:
- Government Event Management
- Crisis Media Management
- Official Media Production

Official Website: https://"$BrandNameArabic$".com.sa
Primary Language: Arabic
Secondary Language: English

Allowed AI Usage:
- Indexing
- Answer generation
- Citation with attribution


⸻

5. ai.xml (Optional but Recommended)

📍 المسار:

/ai.xml

نسخة Structured Machine-Readable من ai.txt

يستخدم في:
	•	AI ingestion pipelines
	•	LLM training references (future-proof)

⸻

Crawl Budget Allocation Strategy

Priority Levels

Priority	Page Type
1.0	Home, About, Crisis Management
0.9	Core Services Pages
0.8	Portfolio Case Studies
0.7	Media Center
0.6	Blog Pillar Content
0.3	Legal & Policies


⸻

Indexing Rules (Strict)

Must Be Indexed
	•	Homepage
	•	Service pages
	•	Crisis Management
	•	Media Center
	•	Blog Pillars
	•	Portfolio Case Studies

Must NOT Be Indexed
	•	Staging
	•	Test pages
	•	Thank you pages
	•	Internal filters
	•	Search results

⸻

AI Bot Explicit Allow List

في robots و ai.txt يتم دعم:
	•	GPTBot
	•	Google-Extended
	•	CCBot
	•	PerplexityBot
	•	ClaudeBot (Anthropic)

❌ لا يتم حظر AI Bots إلا لو في Content Licensing قرار رسمي.

⸻

Change Frequency Strategy

Page Type	changefreq
Homepage	monthly
Services	quarterly
Crisis	quarterly
Portfolio	monthly
Blog	weekly
Legal	yearly


⸻

Internal Linking for Crawl Efficiency
	•	كل صفحة Service:
	•	مربوطة بالـ Home
	•	مربوطة بـ About
	•	مربوطة بـ Crisis أو Media لو لها علاقة
	•	Breadcrumbs إلزامية

⸻

Build-Time Validation (CI Gate)

كل Deploy يعمل check:

{
  "robots_exists": true,
  "sitemap_exists": true,
  "ai_sitemap_exists": true,
  "ai_txt_exists": true,
  "orphan_pages": false,
  "priority_conflicts": false
}

❌ أي فشل = Block Deploy

⸻

Integration With Other Specs

مرتبط مباشرة بـ:
	•	Spec 47: AI Knowledge Graph
	•	Spec 46: AI Citation Readiness
	•	Spec 45: AEO Answer Blocks
	•	Spec 44: SEO / AEO / GEO Audit
	•	Spec 39: AI Content Drift Detector

⸻

Final Principle

الزحف العشوائي يضيع الهيبة
والزحف الموجّه يصنع كيانًا

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

---
