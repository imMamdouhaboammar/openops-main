# Spec 53: Hero Section System (Media-First, Bilingual, Procurement-Grade)
File: /specs/01-foundation/53-hero-section-system.md  
Status: Draft  
Owner: Mamdouh  
Applies to: Home + key landing pages (Services hub, Top services, About)  
Locale: ar (default RTL) + en (secondary LTR)  
Non-negotiable: Fast, accessible, stable, no console errors

---

## 0) Purpose
Build a Hero Section that can switch between:
1) Static Image
2) Image Carousel
3) Video loop (silent)
while preserving:
- performance (LCP discipline)
- accessibility (reduced motion, captions logic where needed)
- brand identity (tokens, pattern usage, contrast)
- conversion clarity for B2G and enterprise users

Hero must feel cinematic yet institutional: authority first, flair second.

---

## 1) Supported Hero Modes
### 1.1 Image Hero (Default safe mode)
- One primary image set per locale
- Uses next/image with sizes and priority set for LCP
- Must support art direction: different crops for mobile vs desktop

### 1.2 Carousel Hero (Images)
- Slides are images only (no heavy animations)
- Autoplay allowed but must:
  - pause on hover (desktop)
  - include controls
  - respect prefers-reduced-motion
- Each slide can have unique:
  - headline
  - subheadline
  - CTA label and link
  - optional badge

### 1.3 Video Loop Hero (Silent)
- Muted, autoplay, loop, playsInline
- No audio, no user surprise
- Uses a poster image fallback
- Must fail gracefully to image if video fails or device is constrained

Allowed video formats:
- mp4 (h264 baseline) as baseline support
- optional webm as progressive enhancement

---

## 2) Content Model and Copy Rules
### 2.1 Hero content structure
Hero content is JSON-driven via messages files and a hero config object.

Fields:
- title
- subtitle
- primaryCTA: { label, href }
- secondaryCTA: { label, href } optional
- badges: array optional
- mediaMode: "image" | "carousel" | "video"
- mediaItems:
  - for image: single item
  - for carousel: array of items
  - for video: { sources[], poster }

### 2.2 Tone rules
- Institutional and calm
- No exclamation marks in headings
- Avoid empty claims
- Use outcome focused language and execution cues

Arabic must be formal Saudi Arabic.

---

## 3) Layout and Visual Design
### 3.1 Layout types
Hero must support two layouts:
A) Centered (Home)
- title centered
- CTA row centered
- suitable for video background

B) Split (Services, About)
- media on one side, copy on the other
- flips based on RTL/LTR
- maintains consistent vertical rhythm

### 3.2 Background, overlays, and pattern
- If media is busy, overlay is mandatory:
  - overlay color: brand.navy
  - overlay opacity range: 0.65 to 0.85 based on media contrast
- Pattern usage:
  - optional subtle SVG pattern layer
  - motion allowed but minimal and GPU friendly
  - pattern must not compete with text

### 3.3 Contrast and readability
- Text must meet contrast ratio thresholds
- Buttons must be readable on both bright and dark media
- Use solid button surfaces, avoid transparent text overlays without backdrop

---

## 4) Interaction and Controls
### 4.1 CTA requirements
Hero must have at least one primary CTA above the fold.

Primary CTA default:
- AR: "تواصل معنا"
- EN: "Contact"

Secondary CTA optional:
- AR: "استعرض أعمالنا"
- EN: "View Portfolio"

CTA events tracked:
- hero_primary_cta_click
- hero_secondary_cta_click
- hero_slide_change (carousel only)
- hero_video_play (only when video starts successfully)
- hero_video_fallback (when video fails and fallback triggers)

Tracking must not block rendering or navigation.

### 4.2 Carousel controls
Minimum controls:
- Previous
- Next
- Pagination dots
- Pause/Play (required for accessibility)

Keyboard:
- Arrow keys navigate when carousel focused
- Tab reaches all controls

---

## 5) Accessibility Requirements
### 5.1 Reduced motion
If prefers-reduced-motion is enabled:
- no autoplay carousel
- no animated transitions beyond fade
- video mode defaults to poster image unless user clicks play

### 5.2 Media semantics
- Images require alt text
- Video requires:
  - aria-label describing it as decorative or contextual
  - if video conveys meaningful info, captions policy applies
- Decorative media must be marked as decorative to avoid noise for screen readers

### 5.3 Focus order
- Skip link leads to main
- Hero controls appear after headline and CTAs in tab order

---

## 6) Performance Requirements
### 6.1 LCP discipline
- Exactly one LCP candidate on first paint:
  - either the primary hero image OR poster
- Only one asset may be priority true
- Carousel must lazy load non-first slides

### 6.2 Video constraints
- Limit bitrate and resolution by breakpoint:
  - mobile: 720p or less
  - desktop: 1080p max if justified
- Use poster images sized and compressed
- Do not load video until after first paint unless explicitly allowed
Default:
- eager load poster, defer video by 600 to 1200ms or interaction

### 6.3 Asset naming and caching
- Use deterministic naming
- Use cache headers for static assets
- Avoid massive PNGs

---

## 7) Asset Directory Structure (Required)
Create a dedicated hero asset directory.

Path:
- /public/assets/hero/
  - /home/
    - /images/
    - /posters/
    - /videos/
  - /services/
    - /images/
    - /posters/
    - /videos/
  - /about/
    - /images/
    - /posters/
    - /videos/

Rules:
- Each file name must include:
  - page
  - locale if needed
  - type
  - breakpoint if crop differs

Examples:
- home-ar-hero-desktop.webp
- home-ar-hero-mobile.webp
- home-hero-poster.webp
- home-hero-loop.mp4
- services-media-production-hero-desktop.webp

Include a README in /public/assets/hero/ documenting:
- source
- license
- intended usage
- recommended dimensions

---

## 8) Technical Implementation (Next.js)
### 8.1 Component structure
- src/components/sections/Hero/Hero.tsx
- src/components/sections/Hero/HeroMedia.tsx
- src/components/sections/Hero/HeroCarousel.tsx
- src/components/sections/Hero/HeroVideo.tsx
- src/components/sections/Hero/hero.types.ts
- src/components/sections/Hero/hero.config.ts
- src/components/sections/Hero/Hero.test.tsx

No single file over 350 lines.

### 8.2 Dependencies
Prefer minimal dependencies.
Allowed:
- Embla Carousel (if needed) or lightweight carousel library
- Framer Motion only if already in stack, but keep motion minimal
Avoid:
- heavy slider bundles

### 8.3 Safe rendering rules
- No synchronous access to params that can break routing
- All locale and content loaded through stable next-intl patterns
- No console errors tolerated

---

## 9) QA Acceptance Criteria
Block release if any fails:
1) Hero renders on /ar and /en without console errors
2) LCP is stable and under target threshold
3) Carousel loads only first slide eagerly
4) Video loops silently, does not block page render
5) Reduced motion works as specified
6) Keyboard navigation works
7) All CTAs track correctly via data attributes
8) Hero is readable on mobile and does not overflow

---

## 10) Testing Scope
Unit tests:
- renders correct mode based on config
- renders CTA labels for locale
- carousel controls exist when carousel mode
- video fallback triggers when source fails (mock)
- respects reduced motion preference (mock matchMedia)

Manual tests:
- iPhone sizes, Android sizes
- slow 3G simulation for poster and fallback
- dark hero media vs bright hero media contrast check