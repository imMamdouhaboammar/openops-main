# SPEC 26: Brand Identity SVG Assets & Smart Motion System
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Visual Authority + Cinematic Craft

---

## 1. WHY THIS SPEC EXISTS

"$BrandNameArabic$" is a media and event execution company.
The website must feel visually rich, but also institutional and disciplined.

Brand assets like patterns and identity elements must:
- Strengthen recognition
- Add depth without noise
- Remain fast, accessible, and consistent
- Support motion in a controlled way

This spec defines how SVG brand assets are stored, used, and animated.

---

## 2. SOURCE FILES AND INTAKE RULE

Brand identity assets source archive:

/Users/mamdouhaboammar/Documents/المشـــاريـــــع الممدوحـــية/مواقع/"$BrandNameArabic$".com.sa/specs/03-components/Identity Elements


Mandatory first step before implementation:
1. Extract the zip
2. Inventory all SVG files
3. Classify them by type:
   - Pattern
   - Shape elements
   - Frames
   - Icons
   - Background ornaments
4. Produce a short Asset Inventory report listing:
   - Filename
   - Intended use guess
   - Complexity notes (paths count, masks, filters)

If the zip cannot be accessed, stop and ask Mamdouh for an updated path.

---

## 3. SVG ASSET POLICY (STRICT)

All identity elements must be used as SVG.

Rules:
- No raster export unless explicitly approved
- No heavy SVG filters that hurt performance
- Prefer simple paths, strokes, and masks
- Avoid embedded base64 images inside SVG

All SVGs must be safe to inline or serve as static assets.

---

## 4. RUNTIME ASSET LOCATION

After extraction and selection, approved SVG assets must be stored in:

/public/brand/svg/

Structure:

/public/brand/svg/
  patterns/
  shapes/
  frames/
  icons/
  misc/

The specs folder and /mnt/data are not runtime locations.

---

## 5. NAMING CONVENTION

Use clear names:

pattern-grid-01.svg
pattern-wave-02.svg
shape-orbit-01.svg
frame-corner-01.svg

No spaces.
No Arabic filenames in runtime assets.

---

## 6. USAGE RULES BY PAGE TYPE

### 6.1 Home Page
- Pattern usage allowed as subtle background layer
- Motion allowed but calm
- Must not compete with hero text or CTA

### 6.2 About Page
- Pattern usage allowed in section dividers
- Motion lighter than home
- Prefer narrative feel, not flashy

### 6.3 Services Pages
- Patterns used as section headers or side accents
- Motion minimal
- Services content clarity is priority

### 6.4 Media Center and Legal Pages
- Patterns allowed but extremely minimal
- No motion required

---

## 7. LAYERING AND VISUAL DISCIPLINE

Patterns and SVG elements must follow layering rules:

- Background layer only
- Opacity controlled
- Never reduce text contrast
- Never overlap key content areas
- Never create visual clutter behind forms

Patterns must feel like brand texture, not decoration.

---

## 8. SMART MOTION SYSTEM

Motion goals:
- Guide attention
- Add depth
- Communicate premium craft
- Avoid distraction

Allowed motion patterns:
- Slow parallax drift (very subtle)
- Gentle looped translation (small distance)
- Low frequency opacity breathing
- Micro reveal on scroll

Forbidden:
- Bounce
- Aggressive rotations
- Flashing
- Fast looping
- Full screen motion that dominates

---

## 9. MOTION IMPLEMENTATION RULES

- Use Framer Motion for controlled animation
- Motion must be componentized and reusable
- Provide motion presets:
  - motionQuiet
  - motionCalm
  - motionNone

No one-off animation scattered across pages.

---

## 10. REDUCED MOTION COMPLIANCE

Must respect prefers-reduced-motion.

Rules:
- If reduced motion enabled:
  - Disable loop animations
  - Disable parallax
  - Keep static composition

This is mandatory for accessibility and B2G quality.

---

## 11. PERFORMANCE CONSTRAINTS

- No SVG asset may exceed reasonable complexity
- Avoid huge path counts in backgrounds
- Prefer repeating patterns via CSS or SVG patterns when possible
- Avoid layout shifts caused by animated elements

Target:
Rich feel with minimal performance cost.

---

## 12. COLOR GOVERNANCE

SVG assets must use brand tokens only:

Primary palette includes:
#000033, #0068ff, #9347ff, #f1ba39, #00c377
Plus light surfaces:
#eef6ff, #f5eeff, #fcfaeb, #e7f7f0

No random shades.
Opacity is allowed.

---

## 13. ACCESSIBILITY RULES FOR DECORATIVE SVG

Decorative SVGs must be:
- aria-hidden=true
- focusable=false

Informational SVGs must have:
- accessible name if interactive
- keyboard support if clickable

Patterns are decorative by default.

---

## 14. COMPONENT CONTRACT

Create a reusable component system:

- BrandPattern
  Props:
  - variant (pattern name)
  - intensity (low, medium)
  - motion (quiet, calm, none)
  - placement (top, bottom, side, full)
  - mask (soft gradient edges optional)

- BrandShape
  Props:
  - variant
  - size
  - motion preset

No direct SVG usage inside random page sections.
All through components.

---

## 15. QA CHECKLIST

Before release validate:
- Patterns do not reduce readability
- Mobile view remains clean
- Reduced motion works
- No console errors
- No heavy network cost
- No CLS introduced by decorative elements

---

## 16. RIGHTS & ATTRIBUTION

Brand assets integration and motion system defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 17. ENFORCEMENT

Reject any implementation that:
- Uses patterns randomly
- Adds noisy motion
- Breaks contrast and readability
- Uses rasterized assets without approval
- Ignores reduced-motion

No /speckit.implement for brand visuals without compliance.