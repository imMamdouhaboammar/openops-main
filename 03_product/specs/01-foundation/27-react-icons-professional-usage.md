# SPEC 27: React Icons Professional Usage & Brand Alignment
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Institutional UI Consistency

---

## 1. WHY THIS SPEC EXISTS

Icons are a language.
If icon styles clash, the UI looks amateur even if everything else is perfect.

This spec ensures:
- Consistent icon style across the site
- Clean imports and performance
- Brand aligned stroke and sizing
- Accessibility correctness

---

## 2. PRIMARY ICON PACK STRATEGY

Rule:
We must use one primary icon style for 90% of the product.

### Preferred Primary Pack
- Use Feather style or Lucide-like line icons via React Icons
- Candidate packs in React Icons that match:
  - `react-icons/lu` (Lucide)
  - `react-icons/fi` (Feather)

Primary default:
- `lu` first choice
- `fi` second choice

Reason:
Line icons feel institutional, modern, clean, and match B2G tone.

---

## 3. SECONDARY ICON PACKS (LIMITED)

Allowed only for rare cases where the primary pack lacks a needed glyph.

Maximum:
- One secondary pack in the entire codebase

Approved secondary options:
- `react-icons/hi2` (Heroicons v2 outline) only if needed
- `react-icons/pi` (Phosphor regular) only if needed

Rules:
- Secondary pack must be outline/line style
- No filled icons if the primary is outline, unless explicitly required

---

## 4. FORBIDDEN PACKS AND MIXING RULES

Forbidden usage:
- Mixing 3+ icon families
- Mixing filled and outline in the same UI layer
- Using brand-unrelated icon styles like heavy solid glyphs

If we must use a filled icon:
- It must be a deliberate exception
- Must be documented in code comment and spec note

---

## 5. ICON DESIGN RULES FOR "$BrandNameArabic$" BRAND

Brand attributes:
Integrity, Professional, Meticulous, Expert, Quality Driven, Innovative

Icon rules:
- Outline icons only by default
- Consistent visual weight
- No playful cartoon icons
- No overly thin icons that disappear on dark navy

---

## 6. STANDARD SIZES

Define a strict size system:

- XS: 14px (rare)
- SM: 16px (inline text icons)
- MD: 20px (default UI icons)
- LG: 24px (section headers, cards)
- XL: 32px (hero accents only)

Rules:
- No random sizes
- Use tokens or utility classes to enforce

---

## 7. COLOR RULES

Icons must use brand tokens only.

Default:
- On light surfaces: brand navy or brand blue
- On dark surfaces: white or brand gold accents

Rules:
- Icons inherit `currentColor` by default
- No hardcoded hex inside icon usage
- If icon needs accent, use a class that maps to tokens

---

## 8. STROKE WEIGHT AND VISUAL CONSISTENCY

React Icons packs have different visual weights.
We must normalize visually via:

- Consistent size
- Consistent color
- Controlled usage per pack

If stroke mismatch is obvious:
- Prefer switching to a closer glyph within primary pack
- Avoid mixing packs to solve a single icon gap

---

## 9. ICON COMPONENTIZATION (MANDATORY)

Do not import icons directly everywhere.

Create a central module:

- `src/components/icons/icon-registry.ts`

This registry will:
- Export approved icons only
- Prevent random imports across the codebase
- Document any secondary pack exceptions

Rules:
- UI must import icons from the registry
- No direct `react-icons/*` imports inside random components

---

## 10. PERFORMANCE RULES

- Import icons by named imports from a specific pack path
- Avoid importing entire packs
- Ensure tree-shaking works

No dynamic icon imports unless needed.

---

## 11. ACCESSIBILITY RULES

Icons fall into two categories:

### Decorative icons
- Must have `aria-hidden="true"`
- Must not receive focus

### Informational icons
- Must include an accessible label via:
  - aria-label on the button or wrapper
  - or visually hidden text

Rules:
- Never rely on icon alone as the only label for an action
- Buttons must have text or a hidden label

---

## 12. USAGE GUIDELINES BY UI AREA

### Navigation
- Minimal icons
- Use icons only where it improves scanning

### Services Cards
- One icon per card maximum
- Icon should represent the service in a literal, non-abstract way

### Forms
- Use icons sparingly (input adornments optional)
- Prioritize clarity over decoration

### Media Center
- Use file-type icons only if helpful
- Thumbnail is the primary visual

---

## 13. QA CHECKLIST

Before release:
- Only one primary pack used
- Registry pattern enforced
- No random icon sizes
- Icons readable on navy background
- All icon-only actions have labels
- No contrast failures

---

## 14. RIGHTS & ATTRIBUTION

Icon system and governance defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 15. ENFORCEMENT

Reject any implementation that:
- Imports icons directly without registry
- Mixes multiple packs without approval
- Uses inconsistent icon styles
- Uses icon-only buttons without accessible labels

No /speckit.implement for UI polish unless icon governance is respected.