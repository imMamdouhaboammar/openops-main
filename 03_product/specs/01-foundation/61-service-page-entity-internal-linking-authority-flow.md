# Spec 61: Service Page Entity → Internal Linking Authority Flow

## Purpose
Design a strict, entity-aware internal linking system that:
- Distributes authority intentionally across Service Pages
- Reinforces entity relationships for AI and search engines
- Prevents keyword cannibalization
- Supports procurement-style research behavior (B2G / Enterprise)

This spec governs **where**, **why**, and **how** links are placed between service pages and related entities.

---

## Core Principle

Internal linking is not navigation.
Internal linking is **authority routing**.

Every link must have:
- A reason
- A direction
- A semantic role

---

## Authority Flow Model

### 1. Hub-and-Spoke Structure

- **Services Hub** = Authority Aggregator
- **Individual Service Pages** = Specialized Authority Nodes

Rules:
- Hub links OUT to all services
- Services link BACK to Hub
- Services MAY link laterally under strict conditions

---

## Allowed Link Types

### A) Structural Links (Mandatory)

These links MUST exist:

- Home → Services Hub
- Services Hub → Each Service Page
- Each Service Page → Services Hub

Purpose:
- Crawl depth control
- Clear IA signaling
- Canonical authority consolidation

---

### B) Contextual Authority Links (Controlled)

Used inside body content.

Rules:
- Maximum 2 contextual service-to-service links per page
- Only when services are operationally related
- Never reciprocal in the same content block

Examples:
- Event Management → Media Production
- Crisis Management → Public Relations

Forbidden:
- Random cross-linking
- SEO-driven keyword stuffing
- Circular linking loops

---

### C) Portfolio Proof Links

Service Pages MAY link to:
- Relevant portfolio case studies
- Only if the case directly proves that service

Rules:
- One directional: Service → Portfolio
- Portfolio MAY link back to Service (once)
- Anchor text must describe role, not marketing claim

---

### D) AEO / FAQ Support Links

Inside FAQ answers:
- Link ONLY to:
  - Authoritative internal explainer pages
  - Services Hub (if contextually relevant)

Rules:
- No links inside short answers
- Links only in expanded answers
- One link per answer maximum

---

## Anchor Text Rules (Critical)

Anchor text MUST:
- Be descriptive, not promotional
- Reflect the linked entity name exactly
- Avoid modifiers like:
  - “أفضل”
  - “أقوى”
  - “Leading”

Good:
- "إدارة الأزمات الإعلامية"
- "Media Production Services"

Bad:
- "أفضل خدمات الإنتاج"
- "Expert crisis solutions"

---

## Entity Alignment Rules

Every internal link must align with entity intent:

- Service Page → links to Service entities
- Portfolio → links to Service entities
- Blog / Resource → links to Service or Hub

Never link:
- Blog → Blog excessively
- Service → unrelated Service
- Footer → deep service pages (except Hub)

---

## Language & Locale Rules

- Arabic pages link to Arabic pages only
- English pages link to English pages only
- No cross-locale linking inside content
- Language switcher handles locale changes exclusively

---

## Placement Rules

### High-Value Link Zones
- Intro paragraphs (after first 2 sentences)
- Section conclusions
- Proof or methodology sections

### Low-Value / Forbidden Zones
- Headings
- Lists of features
- CTA buttons
- Schema-generated content

---

## Link Density Limits

Per Service Page:
- Max 5 internal links total
- Max 2 links to other services
- At least 1 link back to Services Hub

Exceeding limits is a blocking issue.

---

## Technical Implementation Rules

- Use Next.js `<Link />`
- Preserve semantic HTML
- Avoid JS-only click handlers
- Ensure links are crawlable without JS execution

---

## Validation Checklist

Before approval, verify:
- No orphaned service pages
- No circular link chains
- All services receive inbound links
- Anchor text consistency
- No broken links across locales

---

## AI & Search Engine Outcomes

Correct implementation enables:
- Clear entity hierarchy
- Strong service disambiguation
- Improved AI answer confidence
- Reduced cannibalization risk
- Faster crawl prioritization

---

## Governance

- Any new service requires:
  - Hub link update
  - At least one inbound contextual link
- Any content update must re-evaluate link flow
- Internal linking is reviewed during every QA gate

---

## Explicit Non-Goals

This spec does NOT:
- Define menu navigation
- Replace breadcrumbs
- Control footer links
- Override conversion CTA logic

---

## Dependencies

Depends on:
- Spec 55: Services Hub IA
- Spec 56: Services → Portfolio Cross-Linking
- Spec 60: Service Page Schema Stack & Entity Binding
- Content Governance Spec

---

## Success Criteria

The system is compliant when:
- Every service page has clear inbound and outbound authority paths
- AI systems can infer service relationships without ambiguity
- No page competes with another for the same primary intent