# SPEC 32: Language Switcher UX
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Bilingual Clarity + Zero Confusion

---

## 1. WHY THIS SPEC EXISTS

Language switching is not a cosmetic feature.

In B2G and enterprise contexts:
- Confusing language switches reduce trust
- Broken URLs after switching are unacceptable
- Direction changes (RTL/LTR) must feel intentional, not hacked

This spec ensures:
- Predictable language switching
- URL stability
- Proper direction, font, and metadata updates
- Excellent mobile usability

---

## 2. SUPPORTED LANGUAGES

- Arabic (ar) → Default
- English (en) → Secondary

Arabic is the primary experience.
English must feel equally first-class, not translated leftovers.

---

## 3. CORE UX PRINCIPLES

1) Language switch must:
- Preserve the current page context
- Not redirect users to Home unless page does not exist

2) Switching language must:
- Update URL
- Update text direction
- Update fonts
- Update metadata

3) No page reload confusion.
No partial language mix.

---

## 4. URL AND ROUTING BEHAVIOR

Routing structure:
- /ar/...
- /en/...

Switching rules:
- If user is on `/ar/services/media-production`
  → switch to `/en/services/media-production`
- If equivalent page does not exist:
  → fallback to `/[target-locale]`

Forbidden:
- Dropping locale
- Query-based language switching
- Cookie-only language state without URL change

---

## 5. LOCATION IN UI

### 5.1 Desktop
- Visible in Navbar
- Placed near CTA but visually secondary
- No dropdown clutter

### 5.2 Mobile
- Inside hamburger menu
- Large tap target
- Not hidden at the bottom

### 5.3 Footer
Optional:
- Secondary language link in footer for SEO and usability

---

## 6. VISUAL DESIGN

### 6.1 Style
- Text based, not flag icons
- Examples:
  - عربي | EN
  - AR | English

Flags are forbidden.

### 6.2 Typography
- Uses same font rules:
  - Alexandria for Arabic
  - Montserrat for English

### 6.3 Active State
- Current language is visually emphasized
- Non-active language is clearly clickable

---

## 7. INTERACTION DESIGN

### 7.1 Desktop
- Click switches immediately
- No confirmation dialog
- No animation delays

### 7.2 Mobile
- Tap switches and closes menu automatically
- No additional confirmation step

---

## 8. ACCESSIBILITY REQUIREMENTS

- Must be keyboard accessible
- Focusable elements
- aria-label:
  - "Switch language to English"
  - "Switch language to Arabic"
- Screen readers must announce the action clearly

---

## 9. TECHNICAL IMPLEMENTATION RULES

- Must integrate with `next-intl`
- Must use `usePathname` or equivalent to preserve route
- Must respect App Router conventions
- No client-side hacks that break SSR

---

## 10. STATE MANAGEMENT

- Language state comes from URL only
- No localStorage or cookie as primary source
- Optional cookie allowed only for preference memory, not routing

---

## 11. SEO & AEO RULES

- `<html lang>` attribute must update
- `dir` attribute must update correctly
- hreflang tags must reflect both languages
- Canonical URL must update per locale

Language switch must never break SEO signals.

---

## 12. EDGE CASES

Must handle:
- Switching from 404 page
- Switching from legal pages
- Switching from portfolio case that exists in one language only

Fallback behavior must be graceful and predictable.

---

## 13. ANALYTICS

Track event:
- language_switch

Payload:
- from_locale
- to_locale
- page_path

Event naming must follow analytics taxonomy spec.

---

## 14. QA CHECKLIST

Before release:
- Switching preserves current page
- URL updates correctly
- Direction switches correctly
- Fonts switch correctly
- Metadata updates correctly
- Works on desktop and mobile
- No mixed language content appears

---

## 15. ACCEPTANCE CRITERIA

- Language switch visible and usable
- No flags used
- No page context loss
- No SEO breakage
- Accessible and keyboard friendly
- Mobile UX clean and obvious

---

## 16. RIGHTS & ATTRIBUTION

Language Switcher UX defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

---

## 17. ENFORCEMENT

Reject any implementation that:
- Uses flags
- Breaks URLs
- Resets user to Home unnecessarily
- Causes RTL/LTR bugs
- Uses cookies as primary language source

No /speckit.implement approval without full compliance.