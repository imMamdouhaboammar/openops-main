
```md
# SPEC 15: Content Governance
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Institutional Content Control Layer

---

## 1. WHY THIS SPEC EXISTS

After launch, the real risk is not bugs.
The real risk is **content drift**.

Without governance:
- Tone becomes inconsistent
- Arabic and English diverge
- AEO structure breaks silently
- SEO intent erodes
- Authority perception degrades

This spec exists to ensure:
**Every word published remains intentional, consistent, and reviewable.**

---

## 2. CONTENT OWNERSHIP MODEL

### Single Source of Authority

- Final content authority: **Digital Director (Mamdouh Aboammar)**
- No direct edits in production without approval
- No “quick fixes” on live files

Content is governed, not improvised.

---

## 3. CONTENT STORAGE STRATEGY

Current phase:
- Content stored in:
  - `/Core/*.md`
  - `/messages/ar.json`
  - `/messages/en.json`

Rules:
- Markdown = long-form & page structure
- JSON = UI copy, microcopy, system messages

No content lives inside JSX.

---

## 4. ROLES & RESPONSIBILITIES

### Content Editor
- Proposes text changes
- Does not publish directly
- Works in draft files only

### Language Reviewer
- Reviews Arabic clarity, tone, grammar
- Reviews English equivalence (not literal translation)
- Ensures institutional voice consistency

### Approver
- Validates:
  - Brand tone
  - AEO impact
  - Consistency with positioning
- Final decision authority

---

## 5. CONTENT UPDATE WORKFLOW (MANDATORY)

### Step 1: Draft
- Changes proposed in:
  - Draft MD or JSON file
- No direct edits on main branch

### Step 2: Language Review
- Arabic reviewed first
- English reviewed second
- Language parity confirmed

### Step 3: AEO / SEO Validation
- Intent preserved
- Headings unchanged unless approved
- No keyword dilution
- No semantic drift

### Step 4: Approval
- Final review by Digital Director
- Approval required before merge

### Step 5: Publish
- Merge to main
- Build & deploy

No step may be skipped.

---

## 6. BILINGUAL CONTENT RULES

- Arabic is the source language
- English adapts meaning, not structure blindly
- No content exists in one language only
- Structural parity required (headings, sections)

---

## 7. AEO & SEMANTIC SAFETY RULES

Forbidden actions:
- Rewriting headlines casually
- Removing FAQ blocks
- Changing intent-bearing phrases
- Adding marketing fluff

Every change must answer:
- Does this preserve answerability?
- Does it reduce ambiguity?
- Does it keep authority tone?

---

## 8. VERSIONING & CHANGE LOG

Every content change must:
- Be documented
- Include date
- Include editor name
- Include reason for change

Rollback must be possible.

---

## 9. EMERGENCY CONTENT CHANGES

Emergency edits:
- Allowed only for:
  - Legal issues
  - Factual errors
  - Public sensitivity issues

Emergency changes still require:
- Post-edit review
- Documentation

---

## 10. FUTURE CMS READINESS

This governance model is CMS-agnostic.

If migrated to Headless CMS later:
- Same roles apply
- Same workflow enforced
- Same approval gates required

No free editing allowed.

---

## 11. TRAINING & ONBOARDING

Any new editor must:
- Read this spec
- Review Brand Voice rules
- Understand AEO implications

No exceptions.

---

## 12. PROCUREMENT & ENTERPRISE VALUE

Strong content governance:
- Prevents brand dilution
- Signals institutional maturity
- Supports audit & compliance
- Protects executive messaging

Invisible to users.
Critical to trust.

---

## 13. RIGHTS & ATTRIBUTION

Content governance system defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 14. ENFORCEMENT

Any content change that:
- Skips review
- Breaks bilingual parity
- Alters intent without approval
- Bypasses governance

→ Must be reverted immediately.

No /speckit.implement or /speckit.deploy without compliance.
```

---
