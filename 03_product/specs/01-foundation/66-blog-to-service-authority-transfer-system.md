# Spec 66: Blog → Service Page Authority Transfer System
## Semantic, SEO, AEO & Entity-Level Authority Flow

---

## Purpose

Design a **controlled authority transfer system** that ensures:

- Blog content strengthens Service Pages
- Service Pages inherit topical depth, not duplicate content
- Search engines and AI systems understand:
  - That the blog explains the topic
  - That the service page delivers it professionally

This spec prevents:
- Cannibalization
- Thin service pages
- Orphaned authority
- AI confusion about “who is the expert”

---

## Core Principle

> Blogs build **knowledge authority**  
> Service pages build **execution authority**  
> Both must reinforce each other without competing

---

## Authority Transfer Layers

### Layer 1: Internal Linking Architecture (Mandatory)

Every Blog Article must link to its related Service Page using:

- Contextual anchor text
- Natural language
- Semantic relevance

Example (Arabic):
- "خدمات إدارة الفعاليات الاحترافية في السعودية"
- "شركات متخصصة في تنظيم المؤتمرات الحكومية"

Example (English):
- "Professional event management services in Saudi Arabia"
- "Government-focused event management partners"

Rules:
- No generic anchors like “click here”
- No repeated identical anchors across articles
- Anchors must reflect target keyword clusters

---

### Layer 2: Semantic Role Separation

#### Blog Page Role
- Explains
- Educates
- Defines
- Contextualizes
- Answers questions

#### Service Page Role
- Demonstrates capability
- Shows methodology
- Shows experience
- Shows deliverables
- Shows institutional readiness

Never:
- Repeat full blog explanations on service pages
- Copy-paste blog sections into service pages

---

## Layer 3: Structured Cross-References

Each blog article must contain a dedicated section:

### Example Section Title
- "From Strategy to Execution"
- "How These Practices Are Applied in Real Projects"

Inside this section:
- Link to service page
- Explain transition from theory → practice
- Reinforce that execution requires institutional capability

This tells AI:
> “The blog explains the domain. The service page executes it.”

---

## Layer 4: Entity Reinforcement

Ensure consistent entity signals across both pages:

Shared entities:
- "$BrandNameArabic$"
- Event Management
- Saudi Arabia
- Government Events
- Conferences
- Official Ceremonies

Implementation:
- Same organization name
- Same service terminology
- Same geographic references
- Same schema entity IDs

---

## Layer 5: Schema-Based Authority Transfer

### Blog Page Schema
- Article
- FAQPage
- BreadcrumbList

### Service Page Schema
- Service
- Organization
- BreadcrumbList
- FAQPage (execution-focused)

Critical rule:
- Blog FAQs answer “what / why / how”
- Service FAQs answer “how we do it / what we deliver / how to engage”

---

## Layer 6: AI Readability & Citation Flow

To make AI engines prefer this structure:

- Blog contains:
  - Definitions
  - Context
  - Neutral explanations
- Service page contains:
  - Methodology
  - Process
  - Execution framework

AI behavior expected:
- AI answers informational queries from the blog
- AI references service page when asked “who can do this?”

---

## Layer 7: Anchor Diversity & Decay Prevention

Rules:
- One blog = 2–4 contextual links to service page
- Vary anchors
- Avoid exact-match spam
- Rotate phrasing across articles

Monitoring:
- If service page rankings drop → check anchor repetition
- If blog outranks service page → strengthen execution signals

---

## Layer 8: Navigation & Discovery Support

Ensure service page is reachable via:
- Blog body links
- Sidebar “Related Services”
- Footer contextual links
- Breadcrumbs

Never rely on only one link path.

---

## Layer 9: Content Update Synchronization

When:
- Blog is updated
- Service page must be reviewed

Checklist:
- Terminology alignment
- No contradictions
- No outdated references
- Consistent Saudi context

---

## Quality Control Checklist

Before publish:
- Blog does not oversell
- Service page does not educate too much
- Clear difference in intent
- Clear authority hierarchy

---

## Failure Scenarios This Spec Prevents

- Blog ranks but service page doesn’t
- AI cites blog but ignores company
- Cannibalization between pages
- Thin service pages with no depth
- Generic agency perception

---

## Success Criteria

This system is successful when:
- Blog ranks for informational queries
- Service page ranks for commercial/procurement queries
- AI answers reference blog explanations
- AI suggests "$BrandNameArabic$" as execution partner
- Internal linking feels natural and human

---

## Dependencies

- Spec 45: AEO Answer Blocks
- Spec 47: AI Knowledge Graph
- Spec 55: Services Hub IA
- Spec 59: Service Page FAQ Engineering
- Spec 64: Trust Decay Detection

---

## Explicit Rule

Authority must always flow:
Blog → Service Page  
Never the opposite.