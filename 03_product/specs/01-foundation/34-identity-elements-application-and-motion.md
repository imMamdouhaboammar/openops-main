# SPEC 34: Identity Elements Application and Motion
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec Driven Development
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# SCOPE: Enforce full usage of Identity Elements (logos + patterns) across all pages with smooth motion

---

## 1) Goal

Guarantee that the identity assets located at:

/Users/mamdouhaboammar/Documents/المشـــاريـــــع الممدوحـــية/مواقع/"$BrandNameArabic$".com.sa/specs/03-components/Identity Elements

are applied consistently across the entire website, including:
- Logos (all variants)
- Patterns (set 1 and set 2, all color variants)
- Motion behavior (animations) that feels smooth, professional, and consistent

This spec is a hard requirement. Any page missing identity usage fails acceptance.

---

## 2) Source of Truth Assets

### 2.1 Logos
Path:
Identity Elements/Logo/
- Black.svg
- Main Color.svg
- Secondary Color.svg
- White.svg

### 2.2 Patterns
Path:
Identity Elements/Patterns/1/
- Blue.svg
- Green.svg
- Magenta.svg
- White.svg
- Yellow.svg

Identity Elements/Patterns/2/
- Blue.svg
- Green.svg
- Magenta.svg
- White.svg
- Yellow.svg

---

## 3) Mandatory Global Rules

### 3.1 Identity Coverage Rule
Every page must include at least:
- A logo presence through the shell (Navbar)
- At least one pattern usage (background texture, section overlay, divider, or decorative layer)

Allowed locations:
- Hero background overlay
- Section headers background
- CTA sections
- Footer background layer
- Cards micro background
- Media Center thumbnails container
- Portfolio gallery overlay

Forbidden:
- Identity assets used only on Home and missing elsewhere

### 3.2 Logo Variant Selection Rules
Use the logo variant based on surface contrast:

- Dark navy backgrounds: White.svg
- Light surfaces (white, light tints): Main Color.svg preferred, Black.svg fallback
- Busy backgrounds: Black.svg or White.svg only, no colored logo on top of patterns
- On gradients or videos: enforce a solid overlay behind logo if contrast is questionable

Logo must never be recolored via CSS filters. Use the correct SVG file.

### 3.3 Pattern Usage Rules
Patterns are decorative identity elements, not content.
- Must not reduce readability
- Must not clash with foreground text
- Must keep subtle opacity
- Must scale responsively with screen size

Default opacity guidance:
- Dark backgrounds: 6 to 12 percent
- Light backgrounds: 4 to 8 percent

---

## 4) Animation and Motion System

### 4.1 Motion Libraries
Required:
- framer-motion

Optional if needed:
- motion one is not allowed unless justified in a spec update
- no random animation libraries

### 4.2 Motion Principles
- Institutional, calm, no bouncy motion
- No flashy loops
- Motion supports hierarchy and polish, not decoration

Motion must respect:
- prefers-reduced-motion
If enabled, reduce motion to near zero while keeping layout intact.

### 4.3 Pattern Animation Types
Allowed motion patterns:
1) Slow parallax drift on scroll (very subtle)
2) Soft fade and slide on section enter
3) Gentle background shift (small translate)
4) Light reveal mask on hero load

Forbidden:
- Continuous spinning
- Glitch effects
- Fast pulsing
- Large movement that distracts

### 4.4 Motion Tokens
Define shared motion tokens in one place and reuse everywhere.

Recommended baseline:
- Enter duration: 0.45s to 0.7s
- Easing: easeOut or custom cubic bezier close to easeOut
- Distance: 8px to 18px max
- Delay staggering between siblings: 0.06s to 0.12s

All pattern movement must stay under:
- 24px translate max on desktop
- 14px translate max on mobile

---

## 5) Implementation Architecture

### 5.1 Asset Loading Strategy for SVG
We support two safe options:

Option A: Inline SVG components (preferred for animation)
- Use SVGR pipeline or a dedicated wrapper
- Allows controlled motion and styling

Option B: CSS background-image
- Use for static pattern overlays only
- No complex per element animation

Do not import SVG as plain img tag for critical identity layers unless there is a documented reason.

### 5.2 Components to Create

1) BrandLogo
- Props: variant (auto | white | black | main | secondary), size, priority
- Auto mode chooses correct variant based on background context provided by parent

2) BrandPatternLayer
- Props: set (1 | 2), color (blue | green | magenta | white | yellow), opacity, motionPreset, align, scale
- Must support RTL and LTR safely

3) BrandBackdrop
- A higher level wrapper for hero and key sections that combines:
  - overlay color
  - pattern layer
  - optional video background mask

4) MotionProvider
- Central place for prefers-reduced-motion
- Exposes motion tokens and helpers

---

## 6) Page by Page Identity Coverage Requirements

Minimum per page:

### 6.1 Home
- Hero uses BrandBackdrop with pattern layer
- At least one additional pattern usage in a mid page section
- Footer includes subtle pattern background

### 6.2 About
- Section header includes pattern overlay
- Leadership area includes micro pattern accent
- Footer pattern always on

### 6.3 Services hub and service detail pages
- Top header uses BrandBackdrop
- At least one pattern usage inside the page body, behind a CTA or highlight block
- Footer pattern always on

### 6.4 Portfolio
- Grid uses subtle pattern in background
- Case study page includes pattern in problem solution blocks
- Footer pattern always on

### 6.5 Careers
- Header includes pattern overlay
- Form container includes a subtle identity accent
- Footer pattern always on

### 6.6 Contact
- Header includes pattern overlay
- Contact form area uses a pattern accent with very low opacity
- Footer pattern always on

### 6.7 Media Center
- Each downloadable card includes:
  - thumbnail
  - a micro pattern layer behind thumbnail container
- Page header includes pattern overlay
- Footer pattern always on

### 6.8 Legal pages
- Header includes pattern overlay, very subtle
- Footer pattern always on

---

## 7) Smoothness and Performance Constraints

- Patterns must not cause layout shift
- SVG layers must be non blocking
- Avoid heavy DOM by limiting pattern instances:
  - Max 1 large pattern layer per viewport section
  - Max 3 micro pattern accents per page

Use GPU friendly transforms:
- translate3d
- opacity
Avoid animating:
- width, height, top, left, filter

---

## 8) Required Dependencies

Mandatory:
- framer-motion
- clsx
- tailwind-merge

Recommended:
- sharp (already used by Next for image tooling, keep stable)
- a SVGR setup compatible with Next App Router

No dependency versions are pinned. Use latest stable compatible versions.

---

## 9) QA Acceptance Checklist

### 9.1 Identity Coverage Audit
For every route:
- Navbar logo visible and correct variant
- At least one pattern usage visible
- Footer has subtle identity background

### 9.2 Motion Audit
- Pattern motion is subtle and consistent
- Motion disabled or reduced under prefers-reduced-motion
- No jank on scroll
- No animation causing CLS

### 9.3 Contrast Audit
- Logo always passes readability
- Pattern never reduces text contrast
- Key CTA areas remain clean

---

## 10) Automated Testing Requirements

### 10.1 Visual Regression
- Snapshot test per page for both locales
- Snapshot for dark and light sections
- At least one test validating logo variant switching

### 10.2 Unit Tests
- BrandLogo auto variant logic
- BrandPatternLayer renders correct asset by props
- MotionProvider respects prefers-reduced-motion

### 10.3 E2E
- Navigate key pages and assert pattern layer exists
- Validate no console errors during animation

---

## 11) Enforcement

Reject any implementation if:
- Any page lacks pattern usage
- Logos are recolored via CSS instead of correct SVG
- Animations are flashy or inconsistent
- prefers-reduced-motion is ignored
- Too many pattern layers create performance issues

---

## 12) Rights and Attribution

Identity implementation system defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/