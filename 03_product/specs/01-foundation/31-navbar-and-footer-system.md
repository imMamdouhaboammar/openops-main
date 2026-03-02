# SPEC 31: Navbar & Footer System
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Mobile-First + Institutional UX

---

## 1. WHY THIS SPEC EXISTS

Navbar and Footer are not decoration.
In B2G websites they signal:
- seriousness
- clarity
- readiness for procurement
- ease of access on mobile

This spec defines:
- a disciplined Navbar system
- a conversion-aware Footer with Mini Contact Form
- full mobile support with hamburger menu
- strict brand and accessibility compliance

---

## 2. NAVBAR SYSTEM

### 2.1 Primary Goals
- Clear navigation without noise
- Strong brand presence
- Excellent mobile usability
- Fast access to contact actions

---

## 3. NAVBAR STRUCTURE

### 3.1 Desktop Navbar Layout
- Position: sticky top
- Height: consistent (no jumping on scroll)
- Background:
  - Transparent on Hero
  - Solid surface on scroll (glassmorphism allowed, subtle)

#### Left / Right (RTL aware)
- Brand logo (SVG only)
- Main navigation links
- Primary CTA

#### Navigation Items (max 6)
Recommended:
- الرئيسية
- من نحن
- خدماتنا
- أعمالنا
- المركز الإعلامي
- تواصل معنا

Rules:
- No dropdowns unless strictly necessary
- No overcrowding
- Active state clearly visible

---

## 4. NAVBAR VISUAL RULES

- Colors: brand tokens only
- Typography:
  - Arabic: Alexandria
  - English: Montserrat
- Link size: readable on desktop and tablet
- Hover:
  - subtle underline or color shift
  - no aggressive animation
- Active:
  - underline or accent bar

---

## 5. PRIMARY CTA IN NAVBAR

- Label: "تواصل معنا"
- Style: Primary Button
- Color: brand.blue background + white text
- Visible at all times on desktop
- On mobile: visible inside menu and optionally as floating CTA

---

## 6. MOBILE NAVBAR (HAMBURGER MENU)

### 6.1 Trigger
- Hamburger icon (from icon registry)
- Touch-friendly size
- Visible at all times on mobile

### 6.2 Menu Behavior
- Full screen or large drawer
- Slides from side respecting RTL
- Focus trapped inside menu
- Esc closes menu

### 6.3 Menu Content Order
1) Logo
2) Navigation links (large, tappable)
3) Divider
4) CTA buttons:
   - تواصل معنا
   - واتساب (if enabled)
5) Language switcher

---

## 7. ACCESSIBILITY (NAVBAR)

- Semantic `<nav>`
- Keyboard navigation supported
- Focus visible
- aria-expanded on hamburger
- aria-labels for menu controls

---

## 8. FOOTER SYSTEM

### 8.1 Footer Goals
- Close the journey calmly
- Provide trust signals
- Enable quick contact without friction
- Serve procurement visitors

---

## 9. FOOTER STRUCTURE

Footer is divided into 3 logical zones:

### Zone A: Brand & Trust
- Logo (SVG)
- Short brand statement (1–2 lines)
- Optional certifications or trust note

---

### Zone B: Navigation & Info
- Column 1: Pages
- Column 2: Services
- Column 3: Legal
  - Privacy Policy
  - Terms
  - Cookie Notice (if applicable)

Rules:
- No duplicated nav confusion
- Links are text, not icons only

---

### Zone C: Mini Contact Form (MANDATORY)

---

## 10. MINI CONTACT FORM SPEC

### 10.1 Purpose
- Low friction lead capture
- Not a full form replacement
- Especially important for mobile users

### 10.2 Fields (Maximum 3)
Required:
- Name
- Email or Phone
Optional:
- Message (1 line or textarea short)

### 10.3 Submit CTA
- Label: "إرسال"
- Calm reassurance after submit
- No confetti, no exaggeration

---

## 11. MINI FORM TECH RULES

- Server side validation
- Honeypot field (hidden)
- Rate limiting
- Success state:
  - inline message
- Error state:
  - clear and calm
- Analytics:
  - contact_submit_footer event

---

## 12. FOOTER VISUAL RULES

- Background: brand.navy
- Text: white with safe contrast
- Links: subtle hover underline
- Form fields:
  - clear borders
  - readable on dark background
- No clutter
- Spacing generous

---

## 13. MOBILE FOOTER

- Stack vertically
- Form first or second
- Large tap targets
- No multi-column squeeze

---

## 14. ACCESSIBILITY (FOOTER)

- `<footer>` semantic element
- Labels for inputs
- Error messages announced
- Contrast compliance mandatory
- Buttons keyboard accessible

---

## 15. DATA & CONTENT SOURCE

- Text from Core content
- Labels from i18n dictionaries
- No hardcoded strings
- Contact destination configurable

---

## 16. QA CHECKLIST

Before release:
- Navbar sticky works without CLS
- Mobile menu opens and closes cleanly
- Focus trap works
- Footer form submits successfully
- Validation works
- Contrast passes
- Arabic and English both look intentional

---

## 17. ACCEPTANCE CRITERIA

- Navbar works on all breakpoints
- Hamburger menu fully accessible
- Footer contains Mini Contact Form
- No layout shift
- No inline styles
- No placeholder content
- Fully token driven

---

## 18. RIGHTS & ATTRIBUTION

Navbar and Footer system defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

---

## 19. ENFORCEMENT

Reject any implementation that:
- Hides contact CTA on mobile
- Uses random colors
- Breaks accessibility
- Uses div click handlers instead of semantic elements
- Omits Mini Contact Form

No /speckit.implement approval without full compliance.