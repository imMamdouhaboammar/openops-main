
# Spec 35: Grounding & Evidence-Based Implementation

## Purpose
هذا الـ Spec يفرض **Grounding إجباري** قبل أي تنفيذ أو قرار يخص:
UI / UX  
SEO / AEO / GEO  
Frontend / Backend  
Performance / Accessibility  
Architecture / Tooling  

الهدف هو منع:
- التخمين (Guessing)
- النقل الأعمى
- الحلول غير المدعومة بمصادر
- القرارات المبنية على الذوق فقط

وإجبار كل Task أنه يكون **مدعوم بأدلة حديثة وموثوقة**.

---

## Mandatory Grounding Sources (Non-Negotiable)

أي Task لازم يعمل Grounding من **3 مصادر على الأقل** من التالي:

### 1. Official Documentation (Highest Priority)
- Next.js Official Docs
- React Docs
- Web.dev
- Google Search Central
- W3C / MDN

> أي تعارض → الـ Official Docs هي المرجع النهائي.

---

### 2. Google (Evidence & Consensus)
- Search queries بصيغة:
  - `best practice + context + year`
  - `nextjs app router seo site:developers.google.com`
- لازم:
  - نتائج من آخر 12–24 شهر
  - أكثر من مصدر مستقل يؤكد نفس الاتجاه

---

### 3. GitHub (Real-World Implementation)
- فحص:
  - Repos نشطة (آخر commit خلال 6 شهور)
  - Issues / Discussions
  - Examples مستخدمة في production
- ممنوع الاعتماد على:
  - Repos مهجورة
  - Star-heavy بدون maintenance

---

### 4. Reddit (Experience Validation)
- Subreddits المسموح بها:
  - r/nextjs
  - r/webdev
  - r/frontend
  - r/SEO
- الغرض:
  - معرفة المشاكل الواقعية
  - Edge cases
  - Tradeoffs غير مذكورة في الدوكيومنتيشن

> Reddit ليس مصدر قرار نهائي، لكنه **كاشف للمخاطر**.

---

## Grounding Scope (What Must Be Grounded)

### UI / UX
- Navigation patterns
- Bento grids
- Motion & animation usage
- Mobile-first decisions
- Language switchers
- Forms UX & microcopy

### SEO / AEO / GEO
- Metadata handling
- JSON-LD usage
- Content structure
- Answer Engine readiness
- AI crawler compatibility

### Frontend
- Next.js App Router patterns
- Async params & layouts
- Data fetching strategy
- Image/video handling
- Animation libraries

### Backend / Infra
- Form handling
- Email delivery
- Rate limiting
- Security headers
- Hosting constraints (Hostinger)

---

## Grounding Workflow (Mandatory for Every Task)

قبل تنفيذ أي Task:

### STEP 1: Research
- اقرأ:
  - Official Docs (mandatory)
  - 2 Google articles على الأقل
  - 1 GitHub repo أو issue
  - 1 Reddit thread (لو متاح)

---

### STEP 2: Synthesize
لخص النتائج في 3 نقاط:
- What is recommended
- Why it works
- Known risks or tradeoffs

---

### STEP 3: Decide
- اختار approach واحد فقط
- اربطه بـ:
  - Spec ID
  - Reasoning
  - Source references

---

### STEP 4: Implement
- التنفيذ فقط لما:
  - القرار واضح
  - المخاطر معروفة
  - spec يسمح

---

## Required Output Format (Per Task)

أي Task لازم يسبقها أو يتبعها Log بالشكل ده:

```md
### Grounding Log – Task: [Task Name]

**Context:**  
[لماذا نحتاج هذا القرار]

**Sources Consulted:**  
- Next.js Docs: [link]  
- Google Article: [link]  
- GitHub Repo/Issue: [link]  
- Reddit Thread: [link]

**Decision:**  
[ما الذي سيتم تنفيذه]

**Reasoning:**  
[لماذا هذا الحل هو الأنسب لـ "$BrandNameArabic$"]

**Risks & Mitigation:**  
- Risk 1 → Mitigation
- Risk 2 → Mitigation


⸻

Conflict Resolution Rules

لو المصادر تعارضت:
	1.	Official Docs
	2.	Google Search Central / Web.dev
	3.	Production GitHub Repos
	4.	Reddit

ولو مازال التعارض قائم:
→ افتح Clarify Ticket ووقف التنفيذ.

⸻

Enforcement
	•	أي تنفيذ بدون Grounding Log = INVALID
	•	أي حل مبني على “أفضل إحساس” = INVALID
	•	أي Decision غير مرتبط بمصدر = INVALID

⸻

Long-Term Benefit

هذا الـ Spec يضمن أن:
	•	الموقع يظل مواكب للتغيرات
	•	لا نكسر SEO أو UX بدون قصد
	•	القرارات قابلة للدفاع أمام:
	•	Procurement
	•	CTO
	•	Audit
	•	AI evaluators

⸻

Prepared by
Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
https://www.linkedin.com/in/mamdouh-aboammar

---