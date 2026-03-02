# Project Specification: Digital Marketing Agent Landing Page

## 1. Project Overview

**Product:** `gem-dmm-agent-pack` (Gemini Gem - Super Acting Digital Marketing Expert)
**Goal:** Create a high-conversion, premium landing page to sell/distribute the Agent Configuration Pack.
**Target Audience:**

- Marketing Directors/CMOs in Egypt, GCC, and MENA.
- Business Owners (SMEs) looking for high-level strategy without agency costs.
- Digital Marketing Agencies wanting to augment their capabilities.
- Tech-savvy growth hackers.
**Key Value Prop:** "The first Intent-First, Evidence-Grounded Digital Marketing AI Agent for MENA."

## 2. Product Selling Points (The "Why")

- **Not Just a Prompt:** A complete Operating System (Config, Schemas, Templates, Logic).
- **Goal-Constrained Reasoning:** Prevents hallucinations and bad advice (e.g., prevents suggesting unavailable channels).
- **Localization:** Native understanding of Egyptian/Gulf dialects, Ramadan/Eid seasonality, and regional platforms (Snapchat/TikTok focus in GCC).
- **Rigorous Process:**
    1. Discovery Interview (Diagnosis First)
    2. One Core Question (CQ) Lock
    3. Evidence-Grounded Strategy (Source Tiering)
    4. Execution & Measurement
- **Safety First:** Privacy-aware, never asks for PII/Secrets.

## 3. Brand Identity & Design Language

- **Vibe:** Premium, Futuristic yet Grounded, "Dark Mode" aesthetic (Cyberpunk/High-Tech Corporate).
- **Colors:** Deep Blacks/Navies, Neon Accents (Cyan/Purple or Gold for premium feel), High Contrast.
- **Typography:** Modern Sans-Serif (Inter, Outfit, or similar). Arabic font must be modern and legible (e.g., Cairo, Almarai).
- **Motion:** Subtle entrance animations, glassmorphism cards, glowing effects.

## 4. Site Structure (Single Page Landing)

The page should follow a logical conversion narrative:

### Section 1: Hero

- **Headline:** "Stop Guessing. Start Strategizing."
- **Subheadline:** "The world's first Goal-Constrained, Evidence-Grounded Digital Marketing AI Agent for MENA."
- **Visual:** Abstract 3D visualization of the "Agent Brain" (nodes connecting, analyzing data) or a sleek UI mockup of the Gem in action.
- **CTA:** "Get the Pack" / "View Demo"

### Section 2: The Problem (Agitation)

- "Most AI Marketing Agents fail because they answer your *question*, not your *goal*."
- Highlight common failures: Hallucinated metrics, generic advice, ignoring budget constraints.

### Section 3: The Solution (The Architecture)

- Visual breakdown of the "Goal-Constrained Reasoning" engine.
- "**The 7-Stage Pipeline:**"
  - Stage 0: Safety & Scope
  - Stage 1: Discovery Interview
  - Stage 2: Core Question Lock
  - Stage 3: Research & Grounding
  - Stage 4: Strategy Generation
  - Stage 5: Execution Planning
  - Stage 6: Measurement Spec
  - Stage 7: QA & Red-Team

### Section 4: Regional Mastery (Egypt + GCC)

- Interactive map or cards highlighting regional capabilities.
- "We speak your customer's language—literally."
- Dialect handling (Egyptian/Gulf), Seasonality (Ramadan, White Friday).

### Section 5: What You Get (The Pack Contents)

- **Config & Governance:** `agent.yaml`, `guardrails.yaml`
- **Strategic Schemas:** `cq_schema.json`, `strategy_schema.json`
- **Prompt Library:** Discovery, Strategy, Execution, QA
- **Knowledge Base:** Intent-First Strategy Core, Touchpoints System

### Section 6: Social Proof / Use Cases

- "B2B SaaS: Qualified Demos"
- "E-commerce: Profitable ROAS"
- "Local Services: High-Intent Leads"

### Section 7: Pricing / CTA

- Clear pricing tier (if applicable) or "Download Now".
- **CTA:** "Deploy Your Expert Agent Today".

## 5. Technical Requirements

- **Framework:** Next.js (React) or Vite.
- **Styling:** Tailwind CSS (v4 if stable, otherwise v3).
- **Language:** TypeScript.
- **Localization:** Support for RTL (Right-to-Left) layout is CRITICAL. The page might need to be bilingual (EN/AR) or primarily EN with strong AR elements.
- **Performance:** Core Web Vitals optimization (LCP < 2.5s).
- **SEO:** Metadata for "AI Marketing Agent", "Digital Marketing Strategy AI", etc.

## 6. Implementation Plan

1. **Setup:** Initialize project with Next.js + Tailwind.
2. **Components:** Build reusable UI components (Cards, Buttons, Section containers).
3. **Content:** Populate with copy derived from `README.md` and `Instruction.md`.
4. **Polish:** Add animations (Framer Motion?) and responsive design.
5. **Review:** Verify against User Rules (Vibe Coding Rules).
