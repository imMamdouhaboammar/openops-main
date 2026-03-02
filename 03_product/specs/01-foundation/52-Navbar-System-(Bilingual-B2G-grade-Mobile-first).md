# Spec 52: Navbar System (Bilingual, B2G-grade, Mobile-first)
Path: /specs/01-foundation/52-navbar-system.md  
Status: Draft for implementation  
Owner: Mamdouh  
Applies to: "$BrandNameArabic$" Corporate Website (Next.js App Router + next-intl)  
Languages: Arabic (default) + English  
Primary users: B2G procurement, enterprise decision makers, partners, talent  
Non-negotiable: No emojis, icons via registry only (Spec 27)

---

## 0) Purpose
Design and implement a Navbar that:
- feels institutional and premium (B2G ready)
- supports bilingual AR/EN with RTL/LTR
- is fast, accessible, and stable under Next.js 16.1.1 + Turbopack
- converts without being salesy
- works perfectly on mobile and does not break page rendering

---

## 1) Information Architecture (IA)
### 1.1 Primary nav items (top level)
Order must reflect procurement behavior: capability, proof, trust, contact.

1) Home
2) Services (mega panel / drawer section)
3) Portfolio
4) About
5) Media Center
6) Careers
7) Contact (primary CTA)

Arabic labels must be formal Saudi Arabic, no dialect.

### 1.2 Services sub navigation
Services must appear as a structured list with short descriptors:
- Event & Conference Management
- Media Production
- Crisis Media Management
- Digital Marketing & Paid Media
- Public Relations & Media Center Ops
- Outdoor Advertising

Rules:
- Services list must be identical in AR and EN ordering.
- Each service item includes:
  - icon (from registry)
  - title
  - one line descriptor
  - link to service page
- The Services hub page remains a valid destination.

### 1.3 Secondary items (optional, right side)
- Language Switcher (Spec 32)
- WhatsApp quick action (tracked, Spec 12 and Spec 33)
- Partners shortcut (optional, only if it improves scanning and does not bloat)

---

## 2) Visual Design Rules (Brand + Contrast)
### 2.1 Color and surfaces
Default (top of page):
- Transparent overlay on top of hero media when on Home
- On other pages: solid surface

Scrolled state:
- Sticky navbar becomes solid surface with subtle shadow
- Must maintain contrast with brand colors

Allowed backgrounds:
- brand.navy
- white
- surface.light
No random gradients.

### 2.2 Typography
- Arabic: Alexandria
- English: Montserrat
Nav text:
- AR: 15 to 16px, weight 500
- EN: 14 to 15px, weight 600
No uppercase shouting. Only English can be title-case.

### 2.3 Spacing and sizing
- Height desktop: 72px
- Height mobile: 64px
- Max width container: aligns with site layout (same grid as pages)
- Padding: 16px horizontal baseline

### 2.4 Logo behavior
- Left side in LTR, right side in RTL
- Clicking logo always returns to locale home: /ar or /en
- Supports SVG logo from Identity Elements
- If logo missing, use typographic lockup until replaced, but do not block release

---

## 3) Layout Behavior
### 3.1 Desktop layout
Three zones:
1) Brand zone: Logo + optional short tagline
2) Navigation zone: primary items
3) Actions zone: Language switcher + WhatsApp + Contact CTA

Contact CTA:
- style: Primary button (brand.blue background, white text)
- label:
  - AR: "تواصل معنا"
  - EN: "Contact"
No exclamation.

### 3.2 Mobile layout
Mobile navbar must be minimal:
- Logo
- Language switcher (icon or compact)
- Hamburger button

Hamburger opens a full-height drawer:
- direction respects locale (slides from right in AR, left in EN)
- contains:
  - primary nav list
  - collapsible Services section with nested items
  - quick actions at bottom: WhatsApp, Contact
- drawer includes close button and supports Escape key

---

## 4) Interaction Design
### 4.1 Sticky behavior
Navbar is sticky on all pages.
- On scroll:
  - apply solid background
  - reduce vertical padding slightly
  - keep layout stable (no jump)

### 4.2 Active state
Indicate current page:
- underline or subtle pill background
- must work on dark and light surfaces
- do not rely on color only: also use shape or underline

### 4.3 Hover and focus states
Hover:
- mild color shift via opacity, not hue changes
Focus:
- visible outline for keyboard users
- focus must be obvious on dark navy

### 4.4 Accessibility requirements
- Must be fully keyboard navigable
- Hamburger: aria-expanded, aria-controls
- Drawer: focus trap while open
- Close on:
  - overlay click
  - close button
  - Escape key
- All icon-only controls require aria-label
- Skip to content link (required):
  - appears on focus at top
  - links to main content

---

## 5) Conversion and Tracking
Navbar events must be tracked through the event taxonomy:
- nav_click
  - params: locale, item_name, destination
- nav_services_open
- nav_mobile_drawer_open
- nav_mobile_drawer_close
- cta_contact_click (from navbar)
- whatsapp_click (from navbar)

Rules:
- Tracking must not block navigation
- Use data attributes for analytics hooks:
  - data-track="nav_click"
  - data-item="services"
  - data-loc="navbar"

---

## 6) Technical Implementation Spec (Next.js + next-intl)
### 6.1 Component structure
- src/components/layout/Navbar/Navbar.tsx
- src/components/layout/Navbar/NavItem.tsx
- src/components/layout/Navbar/ServicesMenu.tsx
- src/components/layout/Navbar/MobileDrawer.tsx
- src/components/layout/Navbar/SkipToContent.tsx
- src/components/layout/Navbar/navbar.constants.ts
- src/components/layout/Navbar/navbar.test.tsx

No giant single file.

### 6.2 Data driven nav
Navigation labels and URLs must come from:
- Core content source or messages json
- One nav config file that is locale aware

Example config object:
- key
- href
- labelKey
- iconKey
- trackingKey

### 6.3 Link correctness
- Must use next/link
- Must preserve locale prefix: /ar/* or /en/*
- Services nested routes must resolve correctly

### 6.4 Performance constraints
- No heavy animation libraries required for navbar
- If motion is used, it must be minimal and not degrade TTI
- Avoid re-rendering on scroll:
  - use CSS sticky + simple scroll state with requestAnimationFrame or intersection observer
  - debounce scroll state updates

### 6.5 Icon usage
- Icons only from icon registry
- No emojis anywhere
- Icon size tokens must be consistent:
  - nav icons: 18 to 20px
  - drawer icons: 20px

---

## 7) Mobile-first Responsiveness Checks
Must test at:
- 360x800
- 390x844
- 414x896
- iPad width breakpoint
Rules:
- No horizontal scroll
- Tap targets at least 44x44
- Drawer content scrolls if overflow
- Language switcher remains reachable

---

## 8) QA Acceptance Criteria
Release block if any fails:
1) No console errors on /ar and /en
2) All navbar links resolve (no 404)
3) Drawer opens and closes reliably
4) Keyboard navigation works end to end
5) Active state correct for current page
6) Contrast passes on both dark and light nav backgrounds
7) Tracking hooks present as data attributes
8) No emojis in navbar and drawer
9) Lighthouse: no major regressions

---

## 9) Implementation Checklist
- Build navbar skeleton + config
- Add Services menu + mobile drawer
- Add skip link
- Wire tracking attributes
- Add tests (RTL):
  - renders items
  - drawer open/close
  - services section expands
  - correct locale prefix
- Run:
  - typecheck
  - lint
  - unit tests
  - manual browser pass

---

## 10) Notes
- Navbar must be usable even if some pages are still being completed.
- If a route is not ready, show it disabled with "Coming soon" only if approved by Mamdouh. Default is do not include unfinished routes.
- Keep the vibe calm and authoritative, not flashy.