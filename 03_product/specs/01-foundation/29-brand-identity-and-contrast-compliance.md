# SPEC 29: Brand Identity Precision + Contrast Compliance
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Institutional Visual Quality + Accessibility Readiness

---

## 1. WHY THIS SPEC EXISTS

"$BrandNameArabic$" is an institutional brand serving B2G and enterprise.

In this context:
- color mistakes reduce trust instantly
- low contrast is perceived as sloppy and causes real accessibility issues
- visual inconsistency kills authority

This spec enforces:
1) precise brand identity application
2) contrast compliance as a release gate

---

## 2. SOURCE OF TRUTH

Brand Identity source of truth:
- Brand colors and surfaces defined in the Brand Identity Guidelines
- Design tokens defined in the project tokens spec and globals.css

Rule:
No new colors may be introduced.
No random shades.
No guessed tints.

All colors must come from tokens only.

---

## 3. APPROVED COLOR TOKENS

Primary:
- brand.navy  #000033
- brand.blue  #0068ff
- brand.purple #9347ff
- brand.gold  #f1ba39
- brand.green #00c377
- brand.white #ffffff

Surfaces:
- surface.blueTint  #eef6ff
- surface.purpleTint #f5eeff
- surface.goldTint  #fcfaeb
- surface.greenTint #e7f7f0

Rule:
If a shade is needed, use opacity only.
Do not create new hex values.

---

## 4. WHERE EACH COLOR IS ALLOWED

### brand.navy
- hero backgrounds
- footer backgrounds
- deep sections that communicate authority

### brand.blue
- primary CTA background
- primary links
- active states

### brand.gold
- premium accents
- borders, highlights, subtle separators
- never used as small text color

### brand.purple
- creative production themed sections
- motion and media areas

### brand.green
- success states
- confirmation indicators
- never used as main brand CTA color

### surface tints
- section backgrounds
- card backgrounds
- subtle separation

---

## 5. CONTRAST REQUIREMENTS

Contrast compliance is mandatory.

Targets:
- Normal text must meet WCAG AA
- Large text must meet WCAG AA
- Interactive elements must meet contrast requirements in:
  default, hover, focus, disabled

Rules:
- No light text on light tints
- No gold text on white
- No thin blue text on blueTint backgrounds unless contrast passes

If uncertain, choose navy text.

---

## 6. MANDATORY CONTRAST PAIRS (SAFE PRESETS)

Approved safe presets:

1) Navy text on White
2) Navy text on BlueTint
3) White text on Navy background
4) White text on Blue background
5) Navy text on GoldTint

Restricted pairs:
- Gold text on white
- Blue text on purpleTint without testing
- White text on gold background for body text

---

## 7. CTA AND BUTTON RULES

Primary Button:
- Background: brand.blue
- Text: brand.white
- Focus ring must be visible
- Disabled state must still be readable

Secondary Button:
- Outline: brand.navy or brand.blue
- Text: brand.navy
- Background: transparent or white

Danger or error:
- Must use a defined semantic token, not random red

---

## 8. FORM FIELD RULES

Inputs must have:
- clear border visible on all surfaces
- error state color must pass contrast
- helper text must not be low contrast gray

Focus states:
- must be obvious
- must pass contrast
- must not rely on subtle shadow only

---

## 9. ICON AND MEDIA OVERLAY RULES

Icons:
- must inherit currentColor
- must remain readable on dark backgrounds

Overlays over video or image:
- must include a darkening overlay when text is on top
- text must never sit on raw video without contrast layer

---

## 10. TOKEN ENFORCEMENT

All styling must be token driven.

Rules:
- no inline hex in components
- no ad-hoc tailwind arbitrary hex classes
- use semantic classes mapped to tokens

If a new design need appears:
- update tokens first
- then implement

---

## 11. QA AND RELEASE GATES

Every release must include a Contrast Gate.

Minimum checks:
- run automated contrast scan in CI or pre-release script
- manually verify top pages:
  Home, About, Services hub, Contact, Careers, Media Center

Any failed contrast issue is a blocker.

---

## 12. GOVERNANCE

Any change that touches:
- colors
- backgrounds
- buttons
- form states
- overlays

Must:
- be reviewed
- be tested for contrast
- be documented

No silent UI changes.

---

## 13. RIGHTS & ATTRIBUTION

Brand and contrast governance defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 14. ENFORCEMENT

Reject any implementation that:
- introduces new colors
- uses gold as body text
- places text on media without overlay
- ships low contrast buttons or links
- uses inline hex values

No /speckit.implement approval if contrast gate fails.