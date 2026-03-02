
```md
# SPEC 16: Social Sharing Previews & OG Images Factory
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Authority-First Social Presence

---

## 1. WHY THIS SPEC EXISTS

For decision-makers and procurement teams:
The website is often discovered via:
- WhatsApp
- LinkedIn
- Email forwarding
- Internal presentations

The **OG image is the first brand impression**, not the homepage.

This spec ensures:
- Visual consistency
- Institutional authority
- Strong preview impact
- No broken or generic previews

---

## 2. OG IMAGES PHILOSOPHY

OG images are:
- Brand statements
- Context-aware
- Calm, confident, institutional

They are NOT:
- Marketing posters
- Text-heavy flyers
- Random screenshots

---

## 3. OG IMAGE TYPES (MANDATORY SET)

### 3.1 Default OG (Global Fallback)

Used when no page-specific OG exists.

Purpose:
- Preserve brand authority
- Avoid broken previews

---

### 3.2 Page-Level OG

Used for:
- Home
- About
- Services hub
- Individual service pages
- Portfolio cases
- Legal pages (minimal)

---

## 4. OG TEMPLATE SYSTEM

### Fixed Canvas
- Size: 1200 × 630
- Ratio: 1.91:1
- Safe margins applied

---

### Mandatory Elements
- "$BrandNameArabic$" logo
- Page title (short)
- Optional subtitle (very short)
- Brand background or image
- Subtle accent line or frame

---

### Forbidden
- Paragraph text
- CTAs
- Icons overload
- Emojis
- Stock imagery without treatment

---

## 5. VISUAL STYLE RULES

- Dark navy base preferred
- Gold or blue accents only
- High contrast typography
- Arabic-first composition
- English secondary when applicable

No gradients unless subtle and controlled.

---

## 6. OG IMAGE DIRECTORY STRUCTURE

```

/public/media/og/
├── default/
│   └── og-default.webp
├── pages/
│   ├── home.webp
│   ├── about.webp
│   ├── services.webp
│   └── contact.webp
├── services/
│   ├── events-management.webp
│   ├── media-production.webp
│   ├── crisis-management.webp
│   ├── digital-marketing.webp
│   ├── pr.webp
│   └── outdoor.webp
└── portfolio/
└── case-slug.webp

```

No mixed placement.

---

## 7. NAMING CONVENTION

```

og-[context].webp

```

Examples:
- og-home.webp
- og-crisis-management.webp
- og-hajj-conference-2024.webp

---

## 8. DYNAMIC OG GENERATION (OPTIONAL LATER)

If dynamic OG generation is introduced:
- Must follow same visual rules
- Must use same typography
- Must preserve branding
- Must fallback to static OG if generation fails

No experimental visuals allowed.

---

## 9. METADATA INTEGRATION RULES

- Every page must declare its OG explicitly
- No inheritance guessing
- No missing OG tags

Fallback chain:
Page OG → Section OG → Default OG

---

## 10. PLATFORM BEHAVIOR AWARENESS

### WhatsApp
- Aggressive cropping
- Title visibility critical

### LinkedIn
- Full OG image visible
- Typography and contrast matter

### Twitter/X
- Summary large image preferred
- Minimal text best

OG must work across all.

---

## 11. CONTENT GOVERNANCE FOR OG

- OG text must mirror page intent
- No marketing exaggeration
- No mismatch with page content

OG is a promise.
Page must fulfill it.

---

## 12. PERFORMANCE & FORMAT RULES

- Format: WebP preferred
- Max size: 300kb
- No lazy loading
- Served instantly

---

## 13. RIGHTS & ATTRIBUTION

OG system and visual governance defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 14. ENFORCEMENT

Any page that:
- Lacks OG image
- Uses generic screenshots
- Breaks visual system
- Shows broken previews

→ Must not be published.

No /speckit.implement without OG coverage.
```

---
