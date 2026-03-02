
```md
# SPEC 14: Error Handling & Empty States
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Enterprise UX Quality Layer

---

## 1. WHY THIS SPEC EXISTS

Errors will happen.
Empty states will happen.
Network issues will happen.

What defines quality is **how the system behaves when things go wrong**.

In B2G and enterprise environments:
- Poor error handling reduces trust
- Generic messages feel careless
- Silent failures feel unprofessional

This spec ensures calm, respectful, and intentional UX under failure.

---

## 2. UX PHILOSOPHY FOR ERRORS

- Calm, not dramatic
- Informative, not technical
- Respectful, not blaming
- Actionable, not dead-end

No jokes.
No sarcasm.
No emojis.

---

## 3. ERROR TYPES IN SCOPE

This spec governs:

- 404 Not Found
- 500 Server Error
- Media loading failures
- Network degradation
- Empty states (filters, lists, galleries)
- Soft failures (timeouts, partial loads)

---

## 4. 404 PAGE SPEC

### Purpose
User reached a non-existing page.

### UX Rules
- Clear explanation
- No technical wording
- Offer recovery paths

### Mandatory Elements
- Calm headline
- Short explanation
- Primary CTA back to Home
- Secondary CTA to Contact

### Tone Example (Arabic)
- العنوان: الصفحة غير موجودة
- الوصف: يبدو أن الرابط غير متاح أو تم نقله.
- الإجراء: العودة للرئيسية | تواصل معنا

No humor.
No blame.

---

## 5. 500 PAGE SPEC

### Purpose
Server-side or unexpected error.

### UX Rules
- Take responsibility
- Do not expose internals
- Preserve trust

### Mandatory Elements
- Calm headline
- Reassurance
- Retry or Contact option

### Tone Example
- العنوان: حدث خطأ غير متوقع
- الوصف: نعمل على حل المشكلة. يمكنك المحاولة لاحقا أو التواصل معنا.

---

## 6. EMPTY STATES – GENERAL RULES

Empty states are **guidance moments**, not failures.

Rules:
- Explain why the state is empty
- Suggest next steps
- Never imply user error

---

## 7. PORTFOLIO EMPTY STATE

### Scenario
Filter applied, no matching cases.

### UX Requirements
- Clear explanation
- Reset filter option
- Suggest alternative categories

### Copy Direction
- لا توجد أعمال مطابقة لهذا الاختيار
- جرّب تغيير الفلاتر أو استعراض جميع الأعمال

---

## 8. MEDIA FAILURE STATES

### Video Failed to Load
- Show static fallback image
- Calm message
- Retry option

Example:
- تعذر تحميل الفيديو حاليا
- يمكنك إعادة المحاولة أو متابعة التصفح

No broken players.
No empty black boxes.

---

## 9. NETWORK & PERFORMANCE STATES

### Weak Network Detected
- Do not panic user
- Reduce media intensity
- Offer retry

Message tone:
- يبدو أن الاتصال ضعيف حاليا
- قد تستغرق بعض العناصر وقتا أطول

---

## 10. TECHNICAL ERROR BOUNDARIES

- All critical UI areas must be wrapped in error boundaries
- Errors must fail gracefully
- Partial rendering is preferred over full crash

---

## 11. CONSISTENCY RULES

- Same tone across all error states
- Same typography
- Same spacing
- Same button hierarchy

Errors are part of the system, not exceptions.

---

## 12. SEO & INDEXING RULES

- 404 pages must return correct HTTP status
- 500 pages must not be indexed
- Empty states must not block crawling

---

## 13. ACCESSIBILITY RULES

- Error messages must be readable by screen readers
- No color-only signaling
- Clear focus order for recovery actions

---

## 14. CONTENT SOURCE OF TRUTH

All error and empty state copy must live in:

```

/Core/ux-states/*.md
or
/messages/ar.json
/messages/en.json

```

No inline JSX strings allowed.

---

## 15. RIGHTS & ATTRIBUTION

UX writing system and error handling standards defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 16. ENFORCEMENT

Any implementation that:
- Shows raw errors
- Exposes stack traces
- Uses generic browser messages
- Leaves users stranded

→ Must be rejected.

No /speckit.implement without compliant error handling.
```

---
