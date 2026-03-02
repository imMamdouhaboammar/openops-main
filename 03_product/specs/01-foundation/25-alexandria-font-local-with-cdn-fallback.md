# SPEC 25: Alexandria Font (Local Load + Google CDN Fallback)
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Typography Reliability & Performance

---

## 1. WHY THIS SPEC EXISTS

Alexandria is the primary Arabic font for "$BrandNameArabic$".

We need:
- Fast loading
- Predictable rendering
- Offline friendly behavior during staging
- A safe fallback path if local assets fail

This spec enforces:
Local first, CDN fallback second.

---

## 2. SOURCE OF TRUTH PATH

Local font source files must be managed under this workspace path:

/Users/mamdouhaboammar/Documents/المشـــاريـــــع الممدوحـــية/مواقع/"$BrandNameArabic$".com.sa/specs/03-components/Alexandria

Rules:
- The agent must scan this directory for font files
- No guessing file names
- If files are missing, stop and request them

---

## 3. REQUIRED WEIGHTS

We must support these weights for Alexandria:

- 400 (Regular)
- 500 (Medium)
- 700 (Bold)

No extra weights unless approved.

---

## 4. LOCAL LOADING STRATEGY (PRIMARY)

### Requirement
Use Next.js font system for local fonts.

Rules:
- Load Alexandria via `next/font/local`
- Generate CSS variables for consistent usage
- Apply to Arabic pages as primary font

### Output Contract
Expose a CSS variable, example:
--font-ar

Arabic pages must use `var(--font-ar)`.

No inline @import in CSS.

---

## 5. CDN FALLBACK STRATEGY (SECONDARY)

### Purpose
If local font files fail to load, the page must still render with Alexandria via Google Fonts.

### Rule
A fallback `<link>` to Google Fonts must be included in the document head as a safety net.

The fallback should:
- Use `display=swap`
- Include only weights 400, 500, 700
- Include Arabic subset when available

The CDN fallback must not replace the local first strategy.
It is a backup.

---

## 6. FALLBACK ORDER (FINAL RENDER STACK)

Arabic font stack must resolve in this order:

1. Alexandria (local)
2. Alexandria (Google CDN)
3. System Arabic fallbacks

Example fallback list:
Alexandria, system-ui, -apple-system, "Segoe UI", Arial, sans-serif

---

## 7. PERFORMANCE RULES

- Use WOFF2 when available
- Preload local font files if needed
- Avoid loading unused weights
- Ensure no layout shift from font swap

Target:
Minimal CLS and fast first render.

---

## 8. RTL AND LOCALE RULES

- Alexandria is applied only when locale is Arabic
- English locale uses Montserrat
- Never mix fonts in the same paragraph unless required

---

## 9. VALIDATION CHECKLIST

Before release, verify:

- Arabic pages render with Alexandria
- Fonts load locally in Network tab
- If local fonts are blocked, CDN fallback loads Alexandria
- No console warnings about fonts
- Lighthouse performance and CLS remain acceptable

---

## 10. FILE PLACEMENT IN APP

Final font files must end up in:

/public/fonts/alexandria/

No fonts should be served from specs directory in production.
The specs directory is a reference and source control location, not a runtime asset directory.

---

## 11. GOVERNANCE

- Do not modify the font files unless explicitly approved
- Do not add extra weights without approval
- Any changes to typography must be reflected in Design Tokens spec

---

## 12. RIGHTS & ATTRIBUTION

Typography system enforced by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 13. ENFORCEMENT

Any implementation that:
- Loads Alexandria only from CDN
- Uses @import Google Fonts in CSS
- Loads unnecessary weights
- Applies Alexandria incorrectly to English pages

Must be rejected.