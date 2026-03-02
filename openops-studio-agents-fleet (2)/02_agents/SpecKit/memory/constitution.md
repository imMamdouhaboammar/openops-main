# "$BrandNameArabic$" Project Constitution

This document defines the immutable principles and non-negotiable standards for the "$BrandNameArabic$".sa project. All architectural decisions, specifications, plans, and implementations must align with these directives.

## 1. Governance & Protocol

- **North Star Goal**: Ship the "$BrandNameArabic$" website with the highest quality in visual design, performance, SEO, and AI readiness.
- **Grounding Protocol**: No feature or architecture decision is implemented before grounding. Grounding notes and research are mandatory for every task.
- **Credit Policy**: Every major documentation and report must include the ownership footer for **Mamdouh Aboammar, Digital Director at "$BrandNameArabic$"**.

## 2. Architecture & Tech Stack

- **Framework**: Next.js (latest) with **App Router**.
- **Language**: TypeScript (strict mode).
- **Core Strategy**: Modular, feature-based architecture. Every feature resides in its own directory with isolated components, hooks, types, and logic.
- **Rendering**: Prefer SSG/ISR for performance; SSR only where dynamic data is required.
- **Deployment**: Optimized for Hostinger/Vercel environments.

## 3. Design & Quality Bar

- **Aesthetic**: Premium, institutional, modern, and interactive.
- **Design System**: Enforced via **Design Tokens** (CSS Variables). No hardcoded colors, spacing, or shadows.
- **Interactivity**: Micro-interactions, smooth transitions, and media-rich elements (videos, galleries) are required but must not hinder performance.
- **Accessibility**: Support WCAG 2.1 AA. Keyboard navigation and visible focus states are mandatory.

## 4. Performance Standards

- **LCP (Largest Contentful Paint)**: < 2.0s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **INP (Interaction to Next Paint)**: < 200ms
- **Optimization**: WebP/AVIF formats, lazy loading, and optimized bundling are non-negotiable.

## 5. SEO, AEO & GEO

- **Triple-Threat Strategy**:
  - **SEO**: Dynamic metadata, canonicals, and clean URL structure.
  - **AEO (Answer Engine Optimization)**: Structured JSON-LD (FAQ, Service, LocalBusiness) and direct answer blocks.
  - **GEO**: Location signals for Jeddah/Riyadh, Saudi Arabia.
- **Multi-language**: Native support for Arabic (RTL) and English (LTR).

## 6. Definition of Done

- TypeScript build passes without errors.
- Lighthouse performance >= 90.
- All pages have meta + JSON-LD.
- Visual verification for both RTL and LTR.
- Documentation and Milestone Reports shipped with every delivery.
