# 09 Mobile First Responsiveness Spec
## "$BrandNameArabic$" Website
Status: Draft
Owner: Mamdouh Aboammar, Digital Director at "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar

## Goal
Ensure the entire website is mobile first, highly responsive, fast, and easy to navigate on phones.
Mobile is not a reduced version. It is a primary experience.

## Non Goals
- Building a separate mobile site
- Shipping mobile interactions that harm performance or accessibility
- Relying on hover-only interactions

## Primary Users on Mobile
- Government and enterprise decision makers browsing quickly
- Procurement and partnerships teams scanning proof and portfolio
- Talent browsing careers
- Clients checking contact and WhatsApp

## Mobile Experience Principles
1) Thumb friendly navigation
- Primary CTA always reachable without hunting
- Tap targets minimum 44px
- No tiny links or cramped menus

2) Scannable sections
- Short blocks, clear headings, visual first
- Avoid long paragraphs
- Use accordions and tabs where content is long

3) Media rich but disciplined
- Images are mandatory across sections
- Galleries must support swipe
- Lightbox must work well on mobile
- Videos must have poster frames and not autoplay with sound
- Lazy load non-critical media

4) Direction and language correctness
- Arabic pages RTL fully correct
- English pages LTR fully correct
- Locale switch must not break layout or spacing

## Responsive Breakpoints Standard
Use a consistent breakpoint policy aligned with Tailwind defaults.
Design must be validated at minimum:
- 360 x 800 (small phones)
- 390 x 844 (modern iPhone baseline)
- 412 x 915 (common Android)
- 768 x 1024 (tablet portrait)
- 1024 x 768 (tablet landscape)
- 1280+ desktop

## Navigation Requirements
- Sticky header on mobile
- Mobile menu as full screen drawer or sheet
- Menu must include:
  - Services
  - Portfolio
  - About
  - Careers
  - Contact
- Include a persistent WhatsApp action:
  - Floating button allowed but must not block content
  - Must respect safe areas and not overlap CTAs

## Interaction Rules
- No hover as the only affordance
- All interactive elements must have active, focus, and disabled states
- Reduced motion respected

## Forms on Mobile
- Inputs sized for easy typing
- Correct input types:
  - tel, email
- Inline validation
- Clear success and error states
- Minimal steps, minimal fields

## Performance Requirements on Mobile
- Prioritize mobile performance first
- Keep LCP under 2s on mobile on core pages
- Use next image sizes properly, no huge images for small screens
- Avoid heavy sliders if simple swipe gallery works

## Accessibility Requirements
- Color contrast meets WCAG AA where applicable
- Keyboard navigation must work
- Focus states visible
- Proper labels for inputs

## Acceptance Criteria
A) Every page passes mobile usability checks
- No horizontal scrolling
- No text overflow
- No clipped content behind fixed elements
- Tap targets are usable

B) Core pages tested on the baseline devices above
- Home
- Services hub
- Service detail
- Portfolio
- Contact

C) All media experiences work on mobile
- Gallery swipe
- Lightbox open and close
- Video playback and controls

D) Lighthouse mobile checks meet targets
- Performance 90+ on mobile for core pages
- SEO 95+
- Accessibility 95+

## QA Checklist
- Test RTL and LTR on mobile
- Test menu open, close, scroll lock
- Test WhatsApp button does not cover key content
- Test portfolio filter usability on mobile
- Test forms with real phone keyboards
- Test image sizing and loading
- Verify no layout shifts from media

Prepared under the direction of Mamdouh Aboammar, Digital Director at "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar
