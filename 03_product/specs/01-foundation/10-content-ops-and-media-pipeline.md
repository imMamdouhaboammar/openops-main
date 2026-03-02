
```md
# SPEC 10: Content Ops & Media Pipeline
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Enterprise-grade Digital Presence

---

## 1. WHY THIS SPEC EXISTS

"$BrandNameArabic$" is not a text-first website.
It is a **media-rich, narrative-driven, institutional platform**.

This spec exists to:
- Control how content is created, structured, reviewed, and deployed
- Prevent content chaos and media sprawl
- Ensure every image, video, and word serves authority, trust, and conversion
- Guarantee long-term scalability without quality decay

This spec governs **HOW content lives**, not just what it says.

---

## 2. CONTENT OPERATING MODEL (COM)

Content is treated as a **product**, not a deliverable.

### Content Lifecycle
1. Strategy intent
2. Content drafting
3. Media pairing
4. UX placement
5. SEO & AEO validation
6. Performance validation
7. Publishing
8. Iteration or archival

No content skips stages.

---

## 3. CONTENT TYPES SUPPORTED

### 3.1 Core Content
- Page content (Home, About, Services, Contact)
- Service descriptions
- Institutional messaging
- Executive messaging

### 3.2 Authority Content
- Case studies
- Portfolio narratives
- Government & enterprise references
- Methodology explanations

### 3.3 Support Content
- Microcopy
- UX messages
- Form instructions
- Error and success states

---

## 4. CONTENT SOURCE OF TRUTH

### Mandatory Rule
**All content must originate from Markdown or JSON.**

Allowed sources:
- `/Core/*.md`
- `/messages/ar.json`
- `/messages/en.json`

Forbidden:
- Hardcoded strings inside components
- Inline copy in JSX
- Temporary text that becomes permanent

---

## 5. MEDIA PIPELINE OVERVIEW

Media is governed by a **pipeline**, not ad-hoc usage.

### Media Stages
1. Media intent definition
2. Asset selection or production
3. Optimization & formatting
4. Placement mapping
5. Performance validation
6. Accessibility & SEO checks
7. Deployment

---

## 6. MEDIA DIRECTORY STRUCTURE (STRICT)

```

/public/media/
├── images/
│   ├── global/
│   ├── home/
│   ├── services/
│   │   ├── events/
│   │   ├── media-production/
│   │   ├── crisis-management/
│   │   ├── digital-marketing/
│   │   ├── pr/
│   │   └── outdoor/
│   ├── portfolio/
│   │   └── case-slug/
│   └── og/
│
├── videos/
│   ├── hero/
│   ├── portfolio/
│   └── loops/
│
└── placeholders/

```

No deviation allowed.

---

## 7. NAMING CONVENTION (MANDATORY)

### Images
```

[page]-[section]-[context]-[index].webp

```

Example:
```

home-hero-event-crowd-01.webp
services-crisis-warroom-02.webp

```

### Videos
```

[page]-[purpose]-[descriptor].mp4

```

Example:
```

home-hero-cinematic-loop.mp4
portfolio-confex-recap.mp4

```

---

## 8. CONTENT + MEDIA COUPLING RULES

- No section is allowed without visual support
- No visual is allowed without content intent
- Media must **explain**, not decorate
- Text must not repeat what media already shows

---

## 9. MOBILE-FIRST CONTENT BEHAVIOR

Mandatory:
- No text baked into images
- Safe cropping on small screens
- Media must not obscure copy
- Galleries must be swipe-friendly
- Videos must respect thumb reach and one-hand usage

---

## 10. SEO, AEO & GEO CONTENT RULES

- Each page must answer:
  - Who is this for
  - What problem is solved
  - How it is executed
  - Why "$BrandNameArabic$" specifically

- Media must reinforce semantic clarity
- Alt text is mandatory and descriptive
- OG images must reflect page intent, not branding fluff

---

## 11. PERFORMANCE GUARDRAILS

- Images ≤ 300kb (except hero)
- Hero videos ≤ 8 seconds
- Lazy loading below the fold
- next/image is mandatory
- If Lighthouse drops, media is audited first

---

## 12. PLACEHOLDERS POLICY

Temporary placeholders:
- Must be branded
- Must be neutral
- Must be tracked for replacement

No stock watermarked images allowed at any stage.

---

## 13. GOVERNANCE & APPROVAL

- Content changes require review
- Media replacement must preserve naming and structure
- Old assets are archived, not overwritten

---

## 14. RIGHTS & ATTRIBUTION

All content and media are owned by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution must remain in documentation and specs.

---

## 15. ENFORCEMENT

Any implementation that:
- Hardcodes content
- Uses random media
- Breaks the pipeline

→ Must be stopped immediately.

No /speckit.implement is allowed without compliance.
```
