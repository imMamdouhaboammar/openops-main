# SPEC 24: Media Center
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Press, Media & Institutional Access Layer

---

## 1. WHY THIS SPEC EXISTS

For media, journalists, partners, and government entities:
The Media Center is the **official reference point**.

Its purpose:
- Eliminate back-and-forth requests
- Provide verified, up-to-date assets
- Control brand representation externally
- Signal institutional readiness

If this page is missing or weak:
Credibility drops silently.

---

## 2. PURPOSE OF THE MEDIA CENTER PAGE

This page exists to answer:
- Who is "$BrandNameArabic$" officially?
- What is the approved brand representation?
- Where can I download verified materials?

It is not a marketing page.
It is a **reference page**.

---

## 3. ROUTING & VISIBILITY

### Route
/[locale]/media-center

yaml
Copy code

### Visibility Rules
- Linked in footer
- Accessible without authentication
- Indexable by search engines

---

## 4. CONTENT BLOCKS (MANDATORY)

The Media Center page must include **exactly three primary assets** in the first version:

1. Company Profile (PDF)
2. Brand Identity Guidelines (PDF)
3. Media Kit (ZIP or PDF)

No extra clutter in Phase 1.

---

## 5. ASSET PRESENTATION MODEL

Each asset must be presented as a **Media Card**.

### Media Card Structure
- Thumbnail preview
- Asset title
- Short description
- File type and size
- Download action

Cards must be equal weight.
No hierarchy bias.

---

## 6. THUMBNAIL RULES

- Thumbnails are mandatory
- Custom-designed, not auto-generated
- Reflect the asset content visually
- Consistent aspect ratio across cards

Rules:
- No screenshots of random pages
- No unreadable text
- No stock imagery

---

## 7. REQUIRED ASSETS DETAILS

### 7.1 Company Profile
Purpose:
- Official overview of "$BrandNameArabic$"
- Used by partners and institutions

Must be:
- PDF
- Updated
- Clearly dated

---

### 7.2 Brand Identity Guidelines
Purpose:
- Protect brand misuse
- Provide correct visual references

Must include:
- Logo usage
- Colors
- Typography
- Do’s and don’ts

---

### 7.3 Media Kit
Purpose:
- Fast access for journalists and media teams

May include:
- Logos (SVG, PNG)
- Executive photos
- Approved descriptions
- Contact info for media inquiries

---

## 8. DOWNLOAD BEHAVIOR RULES

- Direct download
- No email gates
- No tracking friction
- Clear file size before download

Downloads must feel respectful, not restrictive.

---

## 9. ACCESSIBILITY RULES

- Thumbnails must have alt text
- Download links must be keyboard accessible
- Clear focus states
- No icon-only actions

---

## 10. SEO & AEO CONSIDERATIONS

- Page title must be clear: "المركز الإعلامي | "$BrandNameArabic$""
- Content must mention:
  - Official resources
  - Verified materials
- Structured data optional but recommended

This page supports **entity trust signals**.

---

## 11. CONTENT SOURCE OF TRUTH

All assets metadata must live in:

/Core/media-center/media-assets.json

yaml
Copy code

Files stored in:
/public/media/downloads/

yaml
Copy code

No inline hardcoded links allowed.

---

## 12. GOVERNANCE & UPDATES

- Assets must be reviewed periodically
- Old files archived, not overwritten
- File naming must include version or date

No silent replacements.

---

## 13. FUTURE EXTENSIBILITY

This page must support future additions:
- Press releases
- Official announcements
- Event media packs

Without redesign.

---

## 14. PROCUREMENT & INSTITUTIONAL VALUE

A proper Media Center:
- Reduces misinformation
- Accelerates media workflows
- Supports government communications
- Signals operational maturity

---

## 15. RIGHTS & ATTRIBUTION

Media Center system defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 16. ENFORCEMENT

Any implementation that:
- Hides downloads
- Uses unverified assets
- Breaks thumbnail consistency
- Adds tracking friction

→ Must be rejected.

No /speckit.implement without this Media Center in place.
