# Spec 55: Services Hub IA + Internal Linking Map

Project: "$BrandNameArabic$" Corporate Website  
Audience: B2G, Government Procurement, Enterprise Buyers  
Primary Goal:  
تحويل صفحة /services من صفحة عرض إلى **محور توجيه ذكي (Authority Hub)** يخدم SEO, AEO, GEO ويقود الزائر لأفضل صفحة خدمة مناسبة لنيته.

---

## 1) Purpose of the Services Hub

صفحة الخدمات ليست:
- ليست Landing Page بيعية
- ليست مجرد Grid كروت

هي:
- نقطة توزيع ذكية (Routing Layer)
- صفحة تأسيس authority
- مرجع داخلي للعناكب ومحركات الإجابة
- دليل خدمات مؤسسي للـ procurement

---

## 2) Information Architecture (IA)

### Page Route
- `/ar/services`
- `/en/services`

### Page Role
- تعريف شامل بمنظومة خدمات "$BrandNameArabic$"
- توجيه الزائر حسب النية (Intent-Based Navigation)
- تمرير authority لكل صفحة خدمة متخصصة

---

## 3) Page Sections (Ordered)

### Section A: Hero (Context Setter)
- H1: "خدماتنا" / "Our Services"
- Subhead:
  - يشرح إن "$BrandNameArabic$" شريك تنفيذي للجهات الحكومية والمؤسسات
  - يذكر المجالات بدون تفصيل
- بدون CTA مباشر
- الهدف: وضع السياق فقط

---

### Section B: Intent Selector (Critical Section)

قسم ذكي يوجه الزائر حسب "هو عايز ايه"

أمثلة intents:
- تنظيم فعالية رسمية
- إدارة أزمة إعلامية
- إنتاج محتوى رسمي
- تحسين الحضور الرقمي المؤسسي
- علاقات عامة وإعلام
- إعلانات طرق ومواقع

كل intent:
- Button أو Card
- يوصل مباشرة لصفحة الخدمة المناسبة
- مهم جدا للـ AEO

---

### Section C: Services Overview Grid

Grid واضح لكل الخدمات:

لكل Service Card:
- اسم الخدمة
- سطر توصيف واحد فقط
- أيقونة
- Link مباشر لصفحة الخدمة

Rules:
- لا تفاصيل
- لا FAQs
- لا بيع

الهدف: التوجيه فقط

---

### Section D: How Services Connect (System Thinking)

Visual أو Textual section يوضح:
- إزاي الخدمات بتشتغل مع بعض
- مثال:
  - Event Management + Media Production
  - Crisis Management + PR
  - Digital Marketing + Outdoor Advertising

ده مهم لـ:
- فهم القيمة الشاملة
- تقليل bounce
- تعزيز internal linking المنطقي

---

### Section E: Proof Signals (Light)

مش Case Studies كاملة  
لكن:
- أرقام عامة
- أنواع جهات تم خدمتها
- أنواع مشاريع

بدون ذكر أسماء لو غير مصرح

---

### Section F: FAQ (Services Level)

أسئلة عامة عن الخدمات كمنظومة:
- هل يمكن الجمع بين أكثر من خدمة؟
- هل الخدمات مخصصة للجهات الحكومية؟
- كيف يتم طلب عرض سعر؟
- هل يوجد التزام بالسرية؟
- كيف يتم التنسيق مع الجهات الرسمية؟

هذه الأسئلة:
- AEO gold
- تظهر كـ FAQPage JSON-LD

---

### Section G: Routing CTA

CTA هادي:
- "اختر الخدمة المناسبة وابدأ"
- Links:
  - Contact
  - WhatsApp
  - Direct links لأهم خدمتين (Events + Crisis)

---

## 4) Internal Linking Map (Mandatory)

### From Services Hub → To:
- كل Service Page
- Media Center
- Portfolio
- Contact

### From Service Pages → Back to:
- Services Hub
- Related services
- Relevant portfolio cases
- Media center resources

### Rules:
- No orphan pages
- No circular meaningless links
- Every service links to at least:
  - 1 related service
  - 1 portfolio item
  - 1 media asset

---

## 5) SEO Strategy for Services Hub

### Target Keywords
Arabic:
- خدمات إدارة الفعاليات
- خدمات إعلامية للجهات الحكومية
- إدارة الأزمات الإعلامية
- خدمات العلاقات العامة المؤسسية

English:
- government services agency Saudi
- event and media services Saudi
- crisis communication services Saudi

### Metadata
- Title: "خدمات "$BrandNameArabic$" | حلول تنفيذية للجهات الحكومية والمؤسسات"
- Description: تعريف شامل بدون حشو

### Structured Data
- ItemList (Services)
- BreadcrumbList
- FAQPage

---

## 6) AEO Optimization

Must include:
- تعريف واضح لكل خدمة
- ربط intent → خدمة
- أسئلة مباشرة بصيغة procurement
- لغة رسمية ومباشرة

Avoid:
- استعارات
- لغة تسويقية
- وعود غير قابلة للقياس

---

## 7) UX Rules

- Page must be scannable في 30 ثانية
- Mobile first:
  - Intent selector يظهر قبل grid
- No heavy animations
- Focus states واضحة
- RTL flawless

---

## 8) Performance

- No videos autoplay
- No heavy carousels
- Icons as SVG
- Grid lazy loaded if needed

---

## 9) Testing Checklist

- Services hub loads under 2s
- All service links resolve
- No console errors
- FAQ JSON-LD validates
- Lighthouse SEO does not flag thin content
- Mobile usability passes

---

## 10) Definition of Done

Services Hub is Done when:
- Acts as routing layer, not sales page
- Links cleanly to every service
- Strengthens SEO and AEO signals
- Has zero dead ends
- Passes QA, SEO, accessibility checks

Status: Approved for implementation.