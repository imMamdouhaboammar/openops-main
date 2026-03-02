
```md
# SPEC 11: Legal & Policy Pages
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Enterprise & Procurement Trust Layer

---

## 1. WHY THIS SPEC EXISTS

In the Saudi market, especially B2G and enterprise procurement:
Legal & policy pages are **not optional**.

They act as:
- Trust signals for government entities
- Risk-reduction layers for procurement teams
- Compliance indicators for enterprise IT & legal departments

Absence of these pages creates friction.
Presence of them increases institutional confidence silently.

---

## 2. REQUIRED LEGAL PAGES (MINIMUM SET)

The website must include at least the following pages:

1. Privacy Policy
2. Terms & Conditions
3. Cookie Notice (conditional based on tracking)

These pages must be:
- Accessible
- Clear
- Calm in tone
- Non-aggressive legally
- Bilingual (Arabic primary)

---

## 3. ROUTING & STRUCTURE

All legal pages must live under:

```

/[locale]/legal/

```

### Mandatory Routes

```

/ar/legal/privacy-policy
/ar/legal/terms
/ar/legal/cookies

/en/legal/privacy-policy
/en/legal/terms
/en/legal/cookies

```

Footer must include visible links to all legal pages.

---

## 4. CONTENT PRINCIPLES (STRICT)

Tone:
- Institutional
- Clear
- Non-threatening
- No excessive legal jargon

Rules:
- No scare language
- No over-collection claims
- No selling of data language
- No unnecessary third-party disclaimers

This is **trust copy**, not defensive copy.

---

## 5. PRIVACY POLICY – CONTENT SCOPE

Must clearly state:

- What data is collected (forms, analytics)
- Purpose of collection
- Data usage boundaries
- Data storage & security posture
- Third-party services (analytics, hosting)
- User rights (access, correction, deletion)
- Contact method for privacy concerns

Saudi context note:
No GDPR overclaiming unless required.
Language must align with Saudi regulatory expectations.

---

## 6. TERMS & CONDITIONS – CONTENT SCOPE

Must include:

- Website usage terms
- Intellectual property ownership
- Content usage restrictions
- Liability limitations
- Jurisdiction (Kingdom of Saudi Arabia)
- Governing law reference
- Modification rights

Tone must remain professional, not hostile.

---

## 7. COOKIE NOTICE – CONDITIONAL RULE

Cookie page is required **only if tracking exists**.

Trigger conditions:
- GA4 enabled
- GTM enabled
- Any third-party scripts

Cookie notice must:
- Explain what cookies are used for
- Avoid dark patterns
- Offer simple acknowledgment (no complex CMP required)

---

## 8. UX & VISIBILITY RULES

- Footer links must be visible on all pages
- Legal pages must be indexable (not blocked by robots)
- No modal-only legal content
- No hidden consent tricks

---

## 9. SEO & PROCUREMENT SIGNALING

Legal pages act as:
- Trust validators for procurement audits
- Signals for enterprise compliance review
- Soft SEO reinforcement for institutional domains

Meta rules:
- Indexable
- Clear titles
- No marketing keywords

---

## 10. CONTENT SOURCE OF TRUTH

All legal content must originate from:

```

/Core/legal/*.md

```

No inline JSX content.
No hardcoded strings.

---

## 11. MAINTENANCE & VERSIONING

- Last updated date must be visible
- Content changes must be tracked
- Old versions archived, not overwritten

---

## 12. RIGHTS & ATTRIBUTION

Legal structure and implementation governed by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 13. ENFORCEMENT

Any build that:
- Omits legal pages
- Hides them
- Hardcodes them
- Uses copied boilerplate without review

→ Must be stopped immediately.

No progression to /speckit.implement without this layer present.
```

---
