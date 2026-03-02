
```md
# SPEC 18: Media Accessibility
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Inclusive & Audit-Ready Media Experience

---

## 1. WHY THIS SPEC EXISTS

Media is the strongest asset on the "$BrandNameArabic$" website.
It is also the highest accessibility risk.

Without explicit rules:
- Images become invisible to assistive tech
- Videos exclude users silently
- Galleries break keyboard navigation
- Lightboxes trap focus

This spec ensures **media is inclusive by design**, not patched later.

---

## 2. ACCESSIBILITY PHILOSOPHY FOR MEDIA

- Accessibility is structural, not decorative
- Media must communicate meaning, not just aesthetics
- No user should be blocked from understanding content because of media

Accessibility is part of quality, not compliance theater.

---

## 3. ALT TEXT POLICY FOR IMAGES (MANDATORY)

### 3.1 General Rules

- Every meaningful image MUST have alt text
- Decorative images MUST have empty alt attribute
- Alt text must describe meaning, not appearance only

Never:
- Start with “صورة لـ” or “Image of”
- Repeat surrounding text
- Stuff keywords

---

### 3.2 Context-Aware Alt Text

Alt text must change based on purpose:

#### Example
Image in portfolio case:
- Good: "تنفيذ المسرح الرئيسي في مؤتمر الحج 2024"
- Bad: "منصة مؤتمر"  

Image in services page:
- Good: "فريق "$BrandNameArabic$" يدير غرفة العمليات الإعلامية أثناء الحدث"

---

### 3.3 Language Rules

- Arabic pages use Arabic alt text
- English pages use English alt text
- No mixed languages in alt attributes

---

## 4. VIDEO ACCESSIBILITY RULES

### 4.1 Captioning Policy

If a video contains:
- Spoken dialogue
- Voice-over
- Interviews
- Narration

Then captions are **mandatory**.

Rules:
- Captions must be synchronized
- Language must match page locale
- Captions must include speaker changes if relevant
- Auto-generated captions are not acceptable without review

---

### 4.2 Videos Without Speech

For cinematic or silent videos:
- No captions required
- But must include:
  - Accessible title
  - Short descriptive text nearby explaining purpose

---

## 5. MEDIA CONTROLS & KEYBOARD ACCESS

### 5.1 Video Players

- Must be keyboard operable
- Play, pause, mute accessible via keyboard
- Focus states must be visible

---

### 5.2 Image Galleries & Lightboxes

Mandatory behaviors:
- Open via keyboard
- Navigate via arrow keys
- Close via Esc
- Focus trapped inside lightbox
- Focus returns to triggering element on close

No mouse-only galleries allowed.

---

## 6. FOCUS MANAGEMENT RULES

- Media overlays must manage focus explicitly
- No background scroll when lightbox is open
- Screen readers must not read background content

---

## 7. MEDIA FALLBACKS

If media fails to load:
- Show accessible fallback text
- Provide alternative description
- Do not leave empty containers

Fallback text must explain what was intended.

---

## 8. COLOR & CONTRAST IN MEDIA

- Text inside media must meet contrast standards
- Avoid light text over bright footage
- If text overlays video:
  - Use solid or semi-opaque background
  - Do not rely on video contrast alone

---

## 9. MOTION & SENSITIVITY

- Respect prefers-reduced-motion
- Disable autoplay where possible
- Provide pause controls
- No flashing or rapid cuts

---

## 10. TESTING REQUIREMENTS

Media accessibility must be tested with:
- Keyboard only navigation
- Screen reader pass (basic)
- Reduced motion enabled
- Low bandwidth simulation

Failures must be fixed before release.

---

## 11. CONTENT SOURCE & GOVERNANCE

Alt text and captions must live in:
- Markdown content
- JSON content files

Never hardcoded in JSX.

Changes follow Content Governance spec.

---

## 12. PROCUREMENT & ENTERPRISE VALUE

Media accessibility:
- Prevents audit rejection
- Signals institutional maturity
- Supports inclusivity policies
- Reduces risk in public sector reviews

---

## 13. RIGHTS & ATTRIBUTION

Media accessibility standards defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 14. ENFORCEMENT

Any media that:
- Lacks alt text
- Lacks captions where required
- Breaks keyboard navigation
- Traps focus incorrectly

→ Must not be published.

No /speckit.implement without media accessibility compliance.
```

---
