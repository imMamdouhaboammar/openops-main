# Spec 62: Service Page Crawl Depth & Priority Weighting

## Purpose
Define a deterministic system to:
- Control crawl depth for service pages
- Assign priority signals to high-value services
- Guide search engines and AI crawlers toward critical pages first
- Optimize indexing for B2G and enterprise procurement intent

This spec ensures that **important services are discovered earlier, crawled more frequently, and interpreted as higher authority**.

---

## Core Principle

Not all pages are equal.
Crawl depth and priority must reflect **business value, procurement demand, and institutional importance**.

---

## Crawl Depth Definitions

### Crawl Depth Levels

Depth 0  
- Home page

Depth 1  
- Services Hub
- About
- Contact

Depth 2  
- Individual Service Pages

Depth 3  
- Portfolio Case Studies
- Blog / Resources

Depth 4+  
- Supporting content
- Archives
- Edge informational pages

Goal:
- All Service Pages MUST be reachable within Depth 2
- No Service Page allowed at Depth 3 or deeper

---

## Mandatory Crawl Paths

Required paths for every Service Page:

- Home → Services Hub → Service Page
- Footer Sitemap → Services Hub → Service Page
- Internal contextual link from at least one other page

If any service violates this, it is a blocking issue.

---

## Priority Weighting Model

Each Service Page receives a **Priority Weight Score (PWS)**.

### Weight Factors

1) Business Criticality  
2) Procurement Demand (B2G relevance)  
3) Revenue Impact  
4) Crisis / Time Sensitivity  
5) Search Demand Maturity  

---

## Priority Classes

### Tier A: Critical Services (Highest Priority)

Characteristics:
- Direct government relevance
- High-risk or high-impact scenarios
- Used during crises or national events

Examples:
- Crisis Media Management
- Government Event Management

Rules:
- Priority in sitemap.xml: 0.9
- Included in Home hero or first scroll
- Linked from multiple internal pages
- Referenced in schema and AEO blocks

---

### Tier B: Core Services (Medium Priority)

Characteristics:
- Frequently procured
- Supporting institutional operations

Examples:
- Media Production
- Public Relations
- Digital Marketing (Government-focused)

Rules:
- Priority in sitemap.xml: 0.7
- Linked from Services Hub prominently
- At least one contextual inbound link

---

### Tier C: Supporting Services (Lower Priority)

Characteristics:
- Tactical or channel-specific
- Less procurement urgency

Examples:
- Outdoor Advertising
- Corporate Profile Services

Rules:
- Priority in sitemap.xml: 0.5
- Accessible via hub and internal links
- No homepage hero placement required

---

## Sitemap Enforcement Rules

- Use dynamic sitemap generation
- Assign priority based on Tier
- Set changefreq:
  - Tier A: weekly
  - Tier B: monthly
  - Tier C: quarterly

Never assign identical priority to all pages.

---

## Internal Linking Weight Reinforcement

Priority must be reinforced via links:

- Tier A services receive:
  - More inbound internal links
  - Earlier placement in Services Hub
- Tier C services receive:
  - Fewer inbound links
  - No cross-linking unless justified

Internal link position matters:
- Earlier links = higher perceived importance

---

## AI Crawl & Indexing Signals

Ensure:
- Tier A services appear in:
  - AI-friendly answer blocks
  - Schema references
  - Entity relationships
- Tier B services appear in:
  - Supporting answers
  - Comparative explanations
- Tier C services appear only when contextually relevant

---

## Technical Constraints

- No JS-only navigation to service pages
- No lazy-loaded links hiding critical services
- No conditional rendering that blocks crawlers
- All service URLs must be statically discoverable

---

## Monitoring & Validation

During QA:
- Verify crawl depth via site map visualization
- Confirm priority values in sitemap.xml
- Check internal link counts per service
- Validate AI crawler access (ChatGPT, Gemini, Perplexity style bots)

---

## Governance Rules

- Any new service MUST be assigned:
  - A tier
  - A priority value
  - A crawl depth guarantee
- Tier changes require SEO + IA review
- No service promotion without adjusting crawl priority

---

## Explicit Non-Goals

This spec does NOT:
- Define UI layout
- Override conversion logic
- Replace SEO content strategy
- Manage external backlinks

---

## Dependencies

Depends on:
- Spec 55: Services Hub IA
- Spec 61: Internal Linking Authority Flow
- Spec 48: AI Crawl Budget & Priority Indexing Strategy
- Sitemap & robots specs

---

## Success Criteria

The system is compliant when:
- All service pages are reachable at Depth ≤ 2
- High-value services are crawled and indexed first
- AI systems prioritize Tier A services in answers
- No crawl budget is wasted on low-impact pages