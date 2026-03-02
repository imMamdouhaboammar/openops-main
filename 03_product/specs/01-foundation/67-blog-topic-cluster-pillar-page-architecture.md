# Spec 67: Blog Topic Cluster → Pillar Page Architecture
## Topical Authority System for SEO, AEO & AI Engines

---

## Purpose

Build a **Pillar + Cluster architecture** that:

- Establishes "$BrandNameArabic$" as an authoritative source in Event Management in Saudi Arabia
- Enables Google and AI engines to understand topic depth, hierarchy, and expertise
- Prevents content fragmentation and cannibalization
- Converts educational content into commercial authority

This spec defines how blog articles, pillar pages, and service pages work together as a single system.

---

## Core Concept

> One Pillar Page  
> Multiple Supporting Blog Articles (Clusters)  
> One Execution-Oriented Service Page  

Each layer has a **distinct role** and **clear authority boundaries**.

---

## Architecture Overview

### 1. Pillar Page (The Knowledge Hub)

Role:
- The definitive guide on the topic
- Covers the topic end-to-end at a high level
- Serves as the main internal linking hub

Example Pillar:
- "Event Management in Saudi Arabia: Government & Enterprise Guide"

Target:
- Broad, high-volume, mixed-intent keywords
- AI overview answers
- Featured snippets

---

### 2. Blog Cluster Articles (Depth Expanders)

Role:
- Deep dive into subtopics
- Answer specific questions
- Capture long-tail and AEO queries

Examples:
- Licensing & regulations
- Government event protocols
- Risk & crisis scenarios during events
- Technology in event execution
- Vendor & logistics coordination

---

### 3. Service Page (Execution Authority)

Role:
- Demonstrates how "$BrandNameArabic$" executes
- Converts authority into trust
- Targets procurement-ready queries

---

## Pillar Page Requirements

### Content Structure

Mandatory sections:
1. Definition of Event Management in Saudi Arabia
2. Types of events (government, enterprise, public)
3. Regulatory & licensing overview
4. Planning & execution lifecycle
5. Risk & crisis considerations
6. Technology & media integration
7. Choosing the right partner
8. Why institutional experience matters

Rules:
- No tactical depth that belongs to blogs
- No sales language
- Neutral, authoritative tone

---

## Blog Cluster Design

### Cluster Criteria

Each blog must:
- Target one clear subtopic
- Answer a specific set of questions
- Link back to the Pillar page
- Link forward to the Service page (via authority transfer spec)

Examples of Event Management Clusters:
- Government Event Licensing in Saudi Arabia
- Managing VIP & Protocol Events
- Crisis Scenarios in Live Events
- Media Coverage for Official Events
- Event Technology & Digital Platforms

---

## Internal Linking Rules

### Mandatory Links

Every Blog:
- Must link to Pillar page (contextual)
- Must link to Service page (execution bridge)

Pillar Page:
- Must link to all cluster blogs
- Must link to Service page once or twice max

Service Page:
- Links back to Pillar page as “Learn more”
- Never links to individual blogs directly

---

## Anchor Text Governance

Rules:
- Pillar links use broad anchors
  - "Event management in Saudi Arabia"
  - "Government event planning framework"

- Blog links use precise anchors
  - "Saudi government event licensing"
  - "VIP protocol management in events"

No repeated anchors across multiple blogs.

---

## Schema & Structured Data Strategy

### Pillar Page Schema
- Article (long-form guide)
- BreadcrumbList
- FAQPage (high-level)

### Blog Page Schema
- Article
- FAQPage (question-focused)

### Service Page Schema
- Service
- Organization
- FAQPage (execution-focused)

Entities must be consistent across all three layers.

---

## AI & AEO Optimization Rules

Pillar Page:
- Optimized for “Explain” queries
- Clear headings
- Summary blocks
- Neutral definitions

Blogs:
- Optimized for “How / What / Why” questions
- Rich examples
- Clear subheadings

Service Page:
- Optimized for “Who can do this”
- Methodology & process clarity

---

## Crawl Depth & Priority

- Pillar page must be:
  - ≤ 2 clicks from homepage
  - Linked in Services Hub
- Blogs:
  - ≤ 3 clicks from homepage
  - Linked from pillar page

---

## Update & Maintenance Rules

- Updating a blog → review pillar
- Updating pillar → review service page
- Major regulatory changes → update all related cluster articles

---

## Success Signals

This architecture succeeds when:
- Pillar page ranks for broad keywords
- Blogs rank for long-tail and questions
- Service page ranks for commercial queries
- AI answers reference pillar/blog and cite "$BrandNameArabic$"
- Internal links distribute authority cleanly

---

## Failure Patterns to Avoid

- Blogs competing with pillar
- Service page trying to educate instead of execute
- Pillar becoming too salesy
- Orphaned blog articles

---

## Dependencies

- Spec 55: Services Hub IA
- Spec 59: Service Page AEO Blocks
- Spec 66: Blog → Service Authority Transfer
- Spec 62: Crawl Depth & Priority Weighting
- Spec 65: Blog Authority Content

---

## Final Rule

If a topic grows beyond one blog:
- It becomes a cluster
- The cluster must orbit a pillar
- The pillar must reinforce the service

No exceptions.