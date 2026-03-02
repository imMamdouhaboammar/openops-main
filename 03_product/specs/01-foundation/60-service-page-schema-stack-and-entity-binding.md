# Spec 60: Service Page Schema Stack & Entity Binding

## Purpose
Establish a strict, layered schema and entity binding system for every Service Page.
The goal is to:
- Anchor each service page as a first-class entity
- Strengthen AI Knowledge Graph inclusion
- Improve trust, disambiguation, and authority signals
- Support AEO, GEO, and procurement-driven search behavior

This spec governs **what entities exist**, **how they are linked**, and **how schemas are stacked**.

---

## Scope
Applies to:
- All individual Service Pages
- Arabic and English locales
- Static and dynamic service routes

---

## Core Philosophy

1. Every service page is an entity, not just a document
2. One service = one primary entity
3. Entities must be explicitly connected, never implied
4. Schema is layered, not monolithic
5. No duplicated or conflicting entity definitions

---

## Mandatory Schema Stack (Per Service Page)

Each Service Page MUST implement the following schemas in this order:

### 1. WebPage Schema

Role:
- Define the page as a crawlable, indexable object

Requirements:
- @type: WebPage
- @id: canonical URL with fragment
- inLanguage: ar or en
- isPartOf: WebSite entity

---

### 2. Service Schema (Primary Entity)

Role:
- Core entity representing the service itself

Requirements:
- @type: Service
- @id: stable service-specific identifier
- name: official service name
- description: neutral, institutional
- provider: Organization entity
- areaServed: Place (Saudi Arabia)
- audience: GovernmentAudience or OrganizationAudience

Rules:
- Only ONE Service schema per page
- Must align with primary AEO answer block

---

### 3. Organization Binding

Role:
- Bind the service explicitly to "$BrandNameArabic$"

Requirements:
- provider references Organization @id
- Organization entity must exist globally
- No inline Organization duplication

---

### 4. Place & Jurisdiction Binding

Role:
- Clarify geographic and regulatory scope

Requirements:
- areaServed: Country (Saudi Arabia)
- additionalProperty for regulatory context if applicable
- No city-level claims unless verified

---

### 5. FAQPage Schema (If Applicable)

Role:
- Bind AEO FAQ answers into structured format

Requirements:
- @type: FAQPage
- mainEntity contains Question + AcceptedAnswer
- Answers must match visible content exactly

Rules:
- FAQPage schema only allowed if FAQ section exists
- No marketing language inside answers

---

### 6. BreadcrumbList Schema

Role:
- Reinforce IA and service hierarchy

Requirements:
- Home → Services → Specific Service
- Must match actual navigation paths
- Localized per language

---

## Entity ID Strategy

All entities must use:
- Stable
- Human-readable
- Language-agnostic IDs

Example:
- /#service-event-management
- /#organization-"$BrandNameArabic$"

Rules:
- Never regenerate IDs dynamically
- Never localize entity IDs
- Never reuse IDs across different entity types

---

## Entity Relationship Map (Implicit Logic)

Each Service Page must express:

- WebPage → about → Service
- Service → provider → Organization
- Service → areaServed → Place
- FAQPage → mainEntity → Service context
- BreadcrumbList → item → WebPage

These relationships must be machine-readable.

---

## Content Alignment Rules

Schema content MUST:
- Match visible page content
- Match AEO answer wording
- Match service naming conventions
- Avoid synonyms that introduce ambiguity

Any mismatch is considered a blocking issue.

---

## Validation & Tooling

Mandatory validation:
- Google Rich Results Test
- Schema.org validator
- No console warnings or errors

Automated checks must detect:
- Missing Service schema
- Duplicate Service entities
- Orphaned Organization references
- Invalid audience or areaServed values

---

## Governance Rules

- Any service rename requires schema update
- Schema changes require QA sign-off
- Schema files are treated as critical infrastructure
- No ad-hoc schema injection allowed

---

## Explicit Non-Goals

This spec does NOT:
- Define visual layout
- Control internal linking
- Handle blog or article schemas
- Replace SEO metadata logic

---

## Dependencies

Depends on:
- Service Page Rendering Spec
- AEO Answer Blocks Spec (Spec 59)
- SEO & JSON-LD Foundation Spec
- Content Governance Spec

---

## Success Criteria

A Service Page is compliant when:
- AI systems can identify the service as a distinct entity
- No ambiguity exists between services
- Knowledge Graph signals are consistent
- Schema is clean, layered, and validated