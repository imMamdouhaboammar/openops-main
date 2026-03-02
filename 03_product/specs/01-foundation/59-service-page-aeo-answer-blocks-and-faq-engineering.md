# Spec 59: Service Page AEO Answer Blocks & FAQ Engineering

## Purpose
Design and enforce a structured Answer Engine Optimization (AEO) system for every Service Page.
The goal is to make each service page:
- Readable and extractable by AI answer engines
- Eligible for rich snippets and AI summaries
- Clear, authoritative, and procurement-safe for B2G audiences

This spec complements SEO, GEO, and Service Conversion specs without overlapping responsibilities.

---

## Scope
Applies to:
- All individual Service Pages
- Arabic and English versions
- Static and dynamic service routes

---

## Core Principles

1. Answers first, storytelling second
2. Explicit question → explicit answer
3. One authoritative source per page
4. No marketing fluff
5. Government-safe phrasing
6. Structured data is mandatory

---

## Page-Level Answer Architecture

Each Service Page MUST include the following sections in order:

### 1. Primary AEO Answer Block

Placement:
- Immediately after Hero section
- Before long-form content

Structure:
- Heading (H2) phrased as a question
- Answer paragraph between 40 and 70 words
- Neutral, institutional tone

Example:
- H2: What is Government Event Management in Saudi Arabia?
- Answer: Direct definition without claims or sales language

Rules:
- One primary question only
- Must match top intent keyword
- Must be readable standalone

---

### 2. Secondary Answer Blocks

Purpose:
- Address mid-funnel and procurement questions

Requirements:
- 3 to 5 blocks maximum
- Each block contains:
  - H3 question
  - Answer between 30 and 60 words

Allowed question types:
- Scope and responsibility
- Compliance and regulation
- Delivery methodology
- Security and governance
- Coordination with authorities

---

### 3. FAQ Engineering Section

Placement:
- Near bottom of the page
- Before final CTA

Structure:
- Section heading: Frequently Asked Questions
- 5 to 8 questions maximum
- Ordered from general to specific

FAQ Rules:
- Each answer under 50 words
- No duplication with earlier answers
- No subjective language
- No guarantees or exaggerated claims

---

## JSON-LD Requirements

Each Service Page MUST implement:

- FAQPage schema
- DefinedQuestion and AcceptedAnswer for each FAQ
- MainEntityOfPage referencing the service URL
- Language-specific JSON-LD blocks per locale

Validation:
- Must pass Google Rich Results Test
- Must not produce console warnings

---

## Content Governance Rules

- Questions must be reviewed by content governance system
- No two service pages may share the same primary question
- FAQs must be unique per service
- Changes to questions trigger content versioning

---

## AEO Quality Checklist

Before approval, each Service Page must pass:

- Primary question clearly answers the service definition
- Answers contain no brand comparisons
- No internal links inside answers
- Language matches target procurement audience
- JSON-LD present and valid
- Content extractable without layout context

---

## Technical Enforcement

- Answer blocks implemented as reusable components
- FAQ section powered by structured data config
- Automated linting to detect:
  - Missing questions
  - Overlength answers
  - Duplicate questions across services

---

## Explicit Non-Goals

This spec does NOT:
- Optimize for sales CTAs
- Replace long-form service content
- Handle internal linking logic
- Control hero messaging

---

## Dependencies

Depends on:
- Service Page Rendering Spec
- SEO and JSON-LD Spec
- Content Governance Spec
- Services Hub IA Spec

---

## Success Criteria

A Service Page is compliant when:
- AI tools can extract a clear service definition
- Search engines generate rich FAQ snippets
- No ambiguity exists about service scope
- Page feels institutional, not promotional