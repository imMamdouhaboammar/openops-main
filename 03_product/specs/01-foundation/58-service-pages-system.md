# Spec 58: Service Pages System (SEO / AEO / GEO Optimized)

## 1. Objective

Create **fully independent, high-performing service pages** for each core service of "$BrandNameArabic$".
Each service page must:
- Render correctly on its own route
- Be indexable and crawlable
- Serve SEO, AEO, and GEO intents
- Support B2G and enterprise procurement behavior
- Avoid content cannibalization with other services

This spec is mandatory for:
- /services/[service-slug] pages
- Arabic and English versions
- All current and future services

---

## 2. Services Covered

Each service MUST have its own page and route.

Required services:
- Event Management
- Media Production
- Crisis Management
- Digital Marketing
- Public Relations
- Outdoor Advertising

Example routes:
- /ar/services/event-management
- /en/services/media-production

No service content is allowed to live only inside a shared page.

---

## 3. Page Rendering Rules (Non-Negotiable)

1. Each service page must:
   - Be a standalone route
   - Have its own generateMetadata function
   - Not depend on the Services Hub to render

2. Each page must render even if:
   - Other services fail
   - Data for other services is missing

3. No conditional rendering that hides the page entirely.
   Empty states must be shown instead.

---

## 4. Mandatory Page Sections (Order Matters)

### 4.1 Hero Section (Service-Specific)

Purpose:
- Declare the service clearly for humans and AI
- Anchor SEO primary keyword
- Establish institutional tone

Must include:
- Service title (H1)
- One-sentence institutional description
- Non-salesy CTA (Request information, View methodology)

Rules:
- No marketing hype
- No emojis
- No vague language

---

### 4.2 Service Overview (What We Do)

Purpose:
- Explain scope clearly for procurement officers and AI parsers

Must include:
- Short paragraphs
- Bullet list of capabilities
- Clear boundaries of what is included and excluded

---

### 4.3 Use Cases or Scenarios

Purpose:
- Answer “When should an entity need this service?”

Examples:
- Government events
- Crisis response scenarios
- National campaigns
- Institutional announcements

This section supports AEO and FAQ extraction.

---

### 4.4 Methodology or Execution Framework

Purpose:
- Differentiate "$BrandNameArabic$" as a process-driven partner

Must include:
- Step-by-step framework
- Neutral, institutional wording
- No proprietary exaggeration

Example:
- Planning
- Coordination
- Execution
- Reporting

---

### 4.5 Proof Signals

Purpose:
- Build trust without selling

May include:
- Selected portfolio references
- Quantified outcomes (if available)
- Partner logos (linked, not decorative)

Rules:
- No fake numbers
- No unnamed clients unless required

---

### 4.6 Compliance & Governance (B2G Critical)

Purpose:
- Reduce procurement friction

May include:
- Licensing awareness
- Regulatory alignment
- Data handling and security notes

This section is critical for Saudi government entities.

---

### 4.7 Related Services (Internal Linking)

Purpose:
- Strengthen internal authority
- Guide crawlers

Rules:
- Max 3 related services
- Must not repeat content
- Contextual linking only

---

### 4.8 Non-Salesy Conversion Block

Purpose:
- Allow next step without pressure

Allowed CTAs:
- Request official profile
- Speak with project coordinator
- View relevant case studies

Not allowed:
- Buy now
- Get a quote now
- Aggressive lead capture

---

## 5. SEO Requirements

Each service page must define:

- Unique title per language
- Unique meta description per language
- Canonical URL
- Alternate language links
- Indexable by default

Keyword rules:
- One primary keyword per service
- Secondary keywords only inside body
- No keyword stuffing

---

## 6. AEO Requirements

Each service page must include:
- Clear definitions
- Scenario-based explanations
- Structured headings (H2, H3)
- Optional FAQ block (if content supports it)

Language must be:
- Formal Arabic (Saudi context)
- Neutral English (procurement-ready)

---

## 7. GEO Requirements (Saudi Context)

Each service page must:
- Reference Saudi context implicitly
- Avoid global generic phrasing
- Support regional search relevance

Examples:
- Government entities
- National programs
- Local regulations (without legal claims)

---

## 8. JSON-LD Requirements

Each service page must include:
- Service schema
- Organization as provider
- AreaServed: Saudi Arabia

Schema must be generated dynamically per service.

---

## 9. Performance Rules

- No blocking scripts
- Media must be lazy-loaded
- Hero media must have fallback image
- Lighthouse score must not drop due to service pages

---

## 10. Content Source of Truth

Primary content source:
- /Core/CONTENT_SERVICE_*.md

Rules:
- Content must not be rewritten silently
- Any optimization must preserve meaning
- Arabic and English reviewed separately

---

## 11. Validation Checklist

A service page is NOT complete unless:
- It renders independently
- It has metadata
- It has JSON-LD
- It passes accessibility checks
- It is internally linked
- It does not cannibalize another service

Failure in any item blocks release.