# Spec 56: Services → Portfolio Cross-Linking Intelligence

Project: "$BrandNameArabic$" Corporate Website  
Market: Saudi Arabia (B2G, Enterprise, Regulated Sectors)  
Primary Objective:  
تحويل الـ Portfolio من معرض أعمال سلبي إلى **نظام إثبات ذكي (Proof Engine)** يخدم كل صفحة خدمة، ويعزز الثقة، ويدعم SEO / AEO بدون تعريض أي التزامات سرية للخطر.

---

## 1) Why This Spec Exists

في السوق الحكومي:
- العميل لا يبحث عن إبداع فقط
- يبحث عن **سابقة تنفيذ**
- يبحث عن **قدرة مثبتة**
- يبحث عن **نمط مشاريع مشابه له**

الخطأ الشائع:
- Portfolio منفصل عن الخدمات
- أو خدمات بدون أي Proof حقيقي

هذا الـ Spec يبني **جسر ذكي** بين:
Service Pages ↔ Portfolio Items

---

## 2) Core Principle

> Every Service Page must be supported by Proof  
> Every Portfolio Item must clearly serve at least one Service

No exceptions.

---

## 3) Portfolio Taxonomy (Mandatory)

كل Case Study يجب أن يحتوي Metadata إلزامي:

### Required Fields
- `service_type` (one or more)
- `industry_sector` (government, semi-gov, enterprise)
- `project_type` (event, media, crisis, campaign, etc.)
- `confidentiality_level`:
  - public
  - anonymized
  - restricted
- `execution_role` (lead, co-execution, support)
- `deliverables` (tags)
- `year`
- `location` (city / region)

هذه البيانات لا تُعرض كلها للمستخدم  
لكن تُستخدم للربط الذكي داخلياً.

---

## 4) Service → Portfolio Mapping Rules

### From Service Page

كل صفحة خدمة يجب أن تحتوي Section:

**"نماذج من مشاريع مشابهة"**

Rules:
- 2–4 Case Studies فقط
- Projects must match:
  - نفس نوع الخدمة
  - نفس مستوى العميل (B2G / Enterprise)
- Prefer anonymized over empty

If no public cases:
- Use anonymized cases
- Or use "Project Archetypes" (see section 7)

---

### From Portfolio Item

كل Case Study يجب أن:
- Link back to:
  - Primary service page
  - Related secondary services
- Explain بوضوح:
  - دور "$BrandNameArabic$" في المشروع
  - ما الذي يثبت الكفاءة

---

## 5) Cross-Linking Logic (Internal Linking)

### Allowed Links
- Service → Portfolio (strong link)
- Portfolio → Service (mandatory)
- Portfolio → Media Center (if applicable)
- Service → Service (related only)

### Forbidden
- Random portfolio links
- Linking unrelated services
- Showing all portfolio items everywhere

---

## 6) Display Rules per Confidentiality Level

### Public Case
- Full title
- Client name (if approved)
- Media gallery
- Results (if allowed)

### Anonymized Case (Very Common)
- Sector-based title  
  مثال:  
  "تنظيم مؤتمر رسمي لجهة حكومية في القطاع الصحي"
- No logos
- No names
- Focus on:
  - scope
  - scale
  - execution complexity

### Restricted
- Not shown publicly
- Used only for:
  - internal linking weight
  - future gated access

---

## 7) Project Archetypes (Fallback Proof System)

في حالة عدم وجود أعمال منشورة:

Create **Project Archetypes**:
- Described scenarios
- Real execution patterns
- بدون أي ادعاء أسماء

Example:
- "إدارة فعالية رسمية متعددة الجهات بحضور قيادات عليا"
- "تغطية إعلامية شاملة لحدث حكومي لمدة 3 أيام"

These:
- Serve AEO
- Serve trust
- Avoid legal risk

---

## 8) SEO & AEO Strategy

### SEO
- Portfolio pages target:
  - long-tail
  - sector-based keywords
- Services pages gain authority via proof links

### AEO
- Case studies answer:
  - "هل نفذتم مشاريع مشابهة؟"
  - "هل لديكم خبرة في القطاع الحكومي؟"

Use:
- Clear headings
- Declarative statements
- No marketing fluff

---

## 9) UX Placement Rules

On Service Pages:
- Portfolio section appears:
  - After methodology
  - Before CTA

On Portfolio Pages:
- Services links appear:
  - Immediately after project summary

Mobile:
- Max 2 items shown
- CTA to "View related services"

---

## 10) Performance & Media

- Lazy load galleries
- Use thumbnails only
- No autoplay videos
- Skeleton loaders required

---

## 11) JSON-LD & Structured Signals

For Portfolio Items:
- Use `Article` or `CreativeWork`
- Link `about` to Service entity
- Use `isPartOf` relationship

This strengthens:
- Entity graph
- AI understanding
- Citation readiness

---

## 12) QA Checklist

- Every service page has proof
- Every portfolio item links to services
- No broken links
- No legal exposure
- No duplicated content
- Lighthouse SEO clean
- AEO questions answered implicitly

---

## 13) Definition of Done

Spec 56 is DONE when:
- Portfolio is no longer isolated
- Services feel credible, not abstract
- Proof is present even with anonymization
- Internal linking is intentional and clean
- SEO and AEO signals are reinforced across pages

Status: Ready for implementation.