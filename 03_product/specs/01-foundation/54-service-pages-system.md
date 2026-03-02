# Spec 54: Service Pages System (Per Service Page + SEO/AEO/GEO)

Project: "$BrandNameArabic$" Corporate Website
Scope: Build a dedicated, self rendering, SEO strong page for every service, in AR/EN, under App Router.
Primary Goal: Each service page can rank on its own, answer procurement style queries, and convert.

## 0) Non Negotiables
- Every service has its own route and renders independently with zero reliance on the services hub page.
- No hardcoded strings in components. All copy comes from Core content and locale messages.
- Performance first: media is lazy loaded, images optimized, no layout shift.
- Accessibility is mandatory: keyboard, focus, reduced motion, captions where needed.
- AEO and GEO ready: structured content blocks + JSON-LD + FAQ + entity signals.

## 1) Service Pages List (Routes)
Under: /app/[locale]/services/[service-slug]/

Required slugs:
- events-management
- media-production
- crisis-management
- digital-marketing
- public-relations
- outdoor-advertising

Each page must exist in:
- Arabic: /ar/services/<slug>
- English: /en/services/<slug>

## 2) Page Architecture (Sections)
All service pages follow one shared layout template with configurable sections.

Section A: Hero
- Supports: image, carousel, or looping video background.
- H1 is the service name, not the company slogan.
- Subhead explains what "$BrandNameArabic$" does for this service in one clear sentence.
- Primary CTA: "اطلب عرض سعر" / "Request a proposal"
- Secondary CTA: "واتساب" / "WhatsApp"

Section B: Credibility Strip (Procurement First)
- 3 to 5 proof items in a horizontal row (cards on mobile):
  - compliance minded execution
  - field operations readiness
  - institutional reporting
  - bilingual delivery
  - media documentation standards
- This strip must be unique per service, not generic duplicates.

Section C: What This Service Includes
- A grid of capability cards.
- Each card has:
  - icon
  - title
  - 2 lines max description
- Max 8 cards. No endless lists.

Section D: Our Method (How We Execute)
- A numbered process, 4 to 6 steps, designed for B2G readers.
- Each step has:
  - step name
  - outcome
  - what deliverables are produced

Section E: Deliverables (Downloadable Mental Model)
- Present as a checklist grouped by phase:
  - pre event or pre engagement
  - execution
  - post delivery
- This section is a prime AEO block, keep it skimmable.

Section F: Proof (Portfolio Snippets)
- Show 2 to 4 case snippets relevant to the service.
- Each snippet includes:
  - problem
  - what "$BrandNameArabic$" did
  - deliverables
  - metrics if allowed
  - media gallery link
- If no cases yet: show "نماذج تنفيذ" as anonymized patterns, not empty space.

Section G: FAQ (AEO and Procurement Questions)
- 6 to 10 questions per service.
- Mix:
  - procurement questions (timeline, requirements, compliance, reporting)
  - delivery questions (what is included, what is excluded)
  - process questions (how coordination works with government stakeholders)

Section H: Final CTA (Deal Closer)
- A compact conversion block:
  - short reassurance copy
  - form entry point or jump to Contact page
  - WhatsApp and phone quick actions
- Must not be salesy. Institutional calm.

## 3) Content Source of Truth
Inputs:
- Core markdown content must be the source of truth for service copy.
- Locale JSON is the rendering layer.
Rules:
- If Core changes, the page content must update with minimal dev edits.
- No "we are the best" language.
- Use formal Saudi Arabic. English is procurement tone, not marketing fluff.

## 4) SEO Requirements (Per Page)
Each service page MUST implement:
- generateMetadata with localized:
  - title
  - description (150 to 160 chars target, but prioritize clarity)
  - alternates (hreflang ar and en)
  - canonical
- Indexable by default.
- Robots rules only block staging.
- BreadcrumbList JSON-LD:
  Home > Services > Service Name
- Service JSON-LD:
  - provider: Organization
  - areaServed: Saudi Arabia (and optionally GCC if accurate)
  - availableLanguage: Arabic, English
- FAQPage JSON-LD derived from the FAQ section.

## 5) AEO Blocks (Answer Engine)
Each service page must include at least:
- "What this service is" short definition block
- "When you need it" block
- "What you get" deliverables checklist
- "How procurement works" mini block: steps to request proposal
These blocks should be marked with clear headings and concise paragraphs.

## 6) GEO (Government Enterprise Oriented) Additions
Each page must include an "Institutional Fit" block:
- security and confidentiality posture (high level)
- reporting and documentation approach
- stakeholder coordination approach
No claims of affiliations. No implying government endorsements.

## 7) UI and Component Requirements
Required shared components:
- ServiceHero
- CredibilityStrip
- CapabilityGrid
- MethodSteps
- DeliverablesChecklist
- CaseSnippetGrid
- FAQAccordion
- FinalCTA

Rules:
- Components must be responsive and mobile first.
- Each component supports:
  - RTL and LTR
  - reduced motion
  - skeleton loading for media blocks
- Icons: use the approved icon system spec (react-icons spec) only.

## 8) Performance Requirements
- Every media element must be:
  - next/image for images
  - optimized video (muted, playsinline) for loops
  - lazy loaded below the fold
- No autoplay video with sound.
- Use blur placeholders for hero images.
- Avoid heavy carousels. If carousel is used, it must be minimal and accessible.

## 9) Testing Requirements
Minimum tests per service page:
- Unit:
  - renders correct H1 per locale
  - renders required sections
  - metadata generation returns localized title and canonical
- Integration:
  - route resolves /ar/services/<slug> without 404
  - route resolves /en/services/<slug> without 404
  - JSON-LD present in HTML
- Accessibility checks:
  - keyboard navigation for FAQ and any carousel
  - focus visible
  - no contrast failures for text on brand colors

## 10) Definition of Done (Per Page)
A service page is Done only when:
- It renders correctly in ar and en.
- It passes build with zero TypeScript errors.
- Lighthouse is healthy in performance and SEO for that page.
- No console errors in dev or production build.
- Core content mapping is verified against the latest Core directory.
- The page includes localized metadata + JSON-LD.

## 11) Implementation Notes
- Prefer a data driven service registry:
  - services.ts exports slugs, titles, icons, and content references.
- Avoid duplicating layouts across pages. Use one template and pass config.
- Add deep links from:
  - Home bento grid
  - Services hub
  - Footer quick links

Status: Ready for implementation.