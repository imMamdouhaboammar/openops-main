# 30 Home Bento Grid Section
Project: "$BrandNameArabic$" Corporate Website
Location: specs/02-pages/10-home-bento-grid.md
Purpose: Define the post Hero "Bento Grid" section on Home, designed to be visually rich, mobile first, bilingual, and brand accurate.

## 1) Goal
After the Hero, we want a premium Bento Grid that:
- يدي انطباع مؤسسي قوي بسرعة
- يعرّف الزائر على قدرات "$BrandNameArabic$" بدون زحمة نص
- يعتمد على صور وفيديو thumbnails بشكل أساسي
- يدفع للـ CTAs المهمة: خدماتنا, أعمالنا, تواصل معنا, واتساب
- يبقى متوافق مع B2G mindset: clarity, proof, seriousness, trust

## 2) Content Strategy
The Bento Grid is NOT a services list. It is a "proof + capability" montage.

### 2.1 Bento Tiles Types
We will use a controlled set of tile types:

A) Featured Case Tile
- Large tile with image or video thumbnail
- Shows a short title + category chip + one proof line
- CTA: "عرض التفاصيل" to portfolio case

B) Capability Tile
- Medium tile
- Icon + title + 1 line
- CTA: "استكشف الخدمة" to a service page

C) Trust Tile
- Medium tile
- Metrics or trust statement
- Example: "جاهزية B2G" or "غرفة عمليات للأزمات" with a subtle pattern
- CTA: "تعرف علينا" to About

D) WhatsApp Quick Tile
- Small tile
- WhatsApp icon + microcopy
- CTA: open WhatsApp

E) Media Tile
- Medium tile
- For Media Production vibe
- CTA: "المركز الإعلامي" to /media-center

### 2.2 Source of Truth
All tile content must be driven by:
- Core content markdown under: `/Core`
- i18n dictionaries: `/messages/ar.json` and `/messages/en.json`
No hardcoded strings.

## 3) Visual System Rules
### 3.1 Brand Colors
Use existing tokens only:
- brand.navy #000033
- brand.blue #0068ff
- brand.purple #9347ff
- brand.gold #f1ba39
- brand.green #00c377
- surface.light #eef6ff
- surface.warm #fcfaeb

### 3.2 Typography
- Arabic: Alexandria
- English: Montserrat
- Tile titles must use Alexandria for AR and Montserrat for EN with the same visual weight.

### 3.3 Pattern Usage
Use the identity SVG assets (pattern) as subtle overlays:
- Opacity 3% to 8% max
- Masked or clipped inside tile corners
- Optional slow parallax on desktop only
- Must not reduce readability or contrast

## 4) Layout Spec
### 4.1 Desktop Grid
- Container: max-w-6xl to max-w-7xl
- Grid: 12 columns
- Gap: 16 to 24px depending on breakpoint
- Bento composition example (recommended):
  - Tile 1 Featured Case: col-span-7 row-span-2
  - Tile 2 Capability: col-span-5 row-span-1
  - Tile 3 Media: col-span-5 row-span-1
  - Tile 4 Trust/Metrics: col-span-4 row-span-1
  - Tile 5 WhatsApp: col-span-3 row-span-1
  - Tile 6 Capability: col-span-5 row-span-1
We keep it asymmetrical but balanced, with consistent radii.

### 4.2 Tablet
- Switch to 6 columns
- Featured Case becomes full width (col-span-6), then the rest in 2 columns pattern.

### 4.3 Mobile First
This is mandatory:
- Single column stack
- Order is curated:
  1 Featured Case
  2 Trust Tile
  3 Top Capability
  4 Media Tile
  5 WhatsApp Tile
  6 Remaining
- Each tile must be tappable with generous padding
- Avoid tiny chips on mobile, simplify the metadata

## 5) Tile Component System
We will implement:
- `BentoGridSection` container
- `BentoTile` base component
- Specialized variants via props, not copy pasted components

### 5.1 Component API
`BentoGridSection`
- props:
  - `items: BentoItem[]`
  - `variant?: "home"`
  - `locale: "ar" | "en"`

`BentoItem`
- `id: string`
- `type: "featuredCase" | "capability" | "trust" | "whatsapp" | "media"`
- `title: string`
- `subtitle?: string`
- `chip?: string`
- `href: string`
- `media?: { kind: "image" | "video"; src: string; poster?: string; alt: string }`
- `accent?: "blue" | "gold" | "purple" | "green"`
- `kpi?: { label: string; value: string }`
- `priority?: boolean` for Next image

### 5.2 Styling Rules
- Radius: consistent with site standard (lg or xl, no random values)
- Border: 1px subtle, visible on light backgrounds
- Hover desktop:
  - slight lift y-1
  - shadow increases
  - border shifts to accent color
- Mobile:
  - no hover assumptions
  - use active state feedback (pressed)

## 6) Media Handling
### 6.1 Images
- Must use `next/image`
- Always provide width/height or fill with constrained parent
- Use WebP/AVIF where possible
- Provide blur placeholder when available

### 6.2 Video Thumbnails
- Default: use image poster, not autoplay video
- If we use video preview:
  - desktop only
  - muted, loop, playsInline
  - must not trigger layout shift
  - must pause when offscreen

### 6.3 Lightbox
Optional in this section:
- Featured Case can open lightbox gallery only if it is a portfolio case
- Must support keyboard: Esc close, tab trap, arrows
- Must have accessible labels

## 7) Accessibility Requirements
- Every tile must be:
  - a semantic link or button, not a div click handler
  - focusable, with visible focus ring
- Alt text policy:
  - Not generic. Must describe what the image shows in context
  - If decorative, alt must be empty string
- Contrast:
  - Text on media must use overlay layer to preserve readability
  - No gold text on white unless contrast passes

## 8) UX Writing Rules
- Title max length:
  - Arabic: 3 to 6 words
  - English: 2 to 5 words
- Subtitle: 1 line only
- Chips: 1 word or 2 words max
- No exclamation marks in headings
- Tone: calm, institutional, proof oriented

## 9) Motion Rules
Framer Motion allowed, but subtle:
- Entrance: fade + small y offset
- Duration 0.35 to 0.55
- Stagger small
- No bounce
- Respect prefers-reduced-motion

## 10) Data Mapping
### 10.1 Where data comes from
- Items must be built from:
  - `Core/CONTENT_HOME.md` and any portfolio summaries in Core
  - plus a small curated config file if needed:
    - `src/data/home/bento.ts` that selects which cases and which services appear

### 10.2 Localization
- All strings must live in messages JSON.
- The bento config references keys, not raw strings:
  - `titleKey`, `subtitleKey`, `chipKey`

## 11) QA Checklist
Before merging:
- Mobile layout: no overflow, no tiny tap targets
- Lighthouse: no CLS from media tiles
- Keyboard nav works through every tile
- All images have meaningful alt text
- Arabic and English look equally intentional
- Brand accents are consistent with tokens
- Pattern overlays do not harm readability

## 12) Acceptance Criteria
- Bento grid renders on /ar and /en
- Looks premium on mobile first
- Contains at least:
  - 1 featured case
  - 2 capability tiles
  - 1 media tile
  - 1 trust tile
  - 1 WhatsApp tile
- No hardcoded copy
- No inline styles
- Uses Next image properly
- Meets accessibility basics for focus and alt text