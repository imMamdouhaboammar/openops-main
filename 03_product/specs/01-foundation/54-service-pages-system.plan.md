# Implementation Plan: Service Pages System (Spec 54)

## Overview

This plan defines the steps to implement the Service Pages System as defined in Spec 54. The goal is to build a high-performance, SEO/AEO-optimized rendering engine for all service offerings, driven by a centralized data registry.

## Phase 1: Data Model & Content Upgrade

**Objective**: Enhance `src/data/services.ts` to support the rich content schemas required by Spec 54 (Deliverables, FAQs, Credibility, etc.).

### 1.1 Update Types

- **File**: `src/data/types.ts`
- **Action**: Extend `ServicePageData` interface.
- **Fields to Add**:
  - `credibilityItems`: Array of { icon, title, description }
  - `deliverables`: Array of { phase, items[] }
  - `faqs`: Array of { question, answer } (Bilingual)
  - `caseStudyIds`: Array of strings (to link to portfolio)
  - `institutionalFit`: { security, reporting, stakeholders } (Bilingual)

### 1.2 Normalize Slugs

- **File**: `src/data/services.ts`
- **Action**: Update slugs to match Spec 54 strictly:
  - `events` -> `events-management`
  - `production` -> `media-production`
  - `crisis` -> `crisis-management`
  - Warning: Update any existing internal links to these routes.

### 1.3 Portfolio Data Architecture (Result of Spec 56)

- **File**: `src/data/types.ts` & `src/data/portfolio.ts` (New File)
- **Status**: Urgent Gap - data source does not exist yet.
- **Action**:
  - Update `PortfolioCase` interface to include Spec 56 taxonomy:
    - `serviceSlugs`: string[] (for cross-linking)
    - `confidentiality`: 'public' | 'anonymized' | 'restricted'
    - `govDomain`: 'ministry' | 'authority' | 'royal-commission' | 'enterprise'
  - Create `src/data/portfolio.ts` acting as the registry.
  - Implement `getPortfolioByService(slug)` helper.

### 1.4 Services Hub Connectivity (Result of Spec 55)

- **File**: `src/data/services.ts`
- **Action**: Add `relatedServiceSlugs` to `ServicePageData` to support the "System Thinking" section (Section D in Spec 55).

### 1.3 Populate New Content

- **File**: `src/data/services.ts`
- **Action**: Fill in the new fields for all 6 services with "Draft" or "Placeholder" content based on the Spec guidelines (e.g., procurement-focused FAQs, deliverables checklists).

## Phase 2: Component Architecture

**Objective**: Build the modular components required for the page layout, including the new Portfolio cross-linking blocks.
**Location**: `src/components/services/*` (Create this folder).
**Note**: All components must support `lang` prop (or use `useLocale`) and `dir` (RTL/LTR).

### 2.1 ServiceHero

- **Features**: Background Media (Video/Image), H1, Subhead, Primary CTA (Proposal), Secondary CTA (WhatsApp).
- **Animation**: Subtle fade-in for text.

### 2.2 CredibilityStrip

- **Features**: Horizontal scrollable list on mobile, grid on desktop.
- **Content**: Proof points (Icons + Short Text).

### 2.3 CapabilityGrid

- **Features**: Grid layout, Card component with Icon, Title, Desc.

### 2.4 MethodSteps

- **Features**: Vertical step list or horizontal process flow.
- **Design**: Numbered steps, B2G professional look.

### 2.5 DeliverablesChecklist

- **Features**: Accordion or Grouped List.
- **AEO**: Semantic HTML (<ul>/<li>) for crawlers.

### 2.6 CaseSnippetGrid (The "Proof Engine" - Spec 56)

- **Logic**: Calls `getPortfolioByService(serviceSlug)` to fetch 2-4 items.
- **Features**:
  - Filter logic: Prioritize 'public' -> 'anonymized'.
  - Rendering: Show 'Sector' instead of 'Client Name' if anonymized.
- **Design**: Cards showing Problem/Solution/Result.

### 2.7 FAQAccordion

- **Features**: Uses `shadcn/accordion`.
- **Schema**: Generates on-page schema markup (handled in Phase 3 or inside component).

### 2.8 FinalCTA

- **Features**: Reassurance copy, Contact Form trigger, WhatsApp button.

## Phase 3: Page Assembly & Routing

**Objective**: integrated `page.tsx` that renders the data.

### 3.1 Route Setup

- **Path**: `src/app/[locale]/services/[slug]/page.tsx`
- **Logic**:
  - `generateStaticParams`: Return all service slugs.
  - `generateMetadata`: Call `getServiceBySlug`, return `title`, `description`, `alternates`.
  - `Page` component: Call `getServiceBySlug`. If not found -> `notFound()`.

### 3.2 View Construction

- Assemble the sections in order A -> H.
- Pass specific data slices to each component.
- Ensure efficient hydration (Server Components).

### 3.3 Structured Data (JSON-LD)

- **Action**: Inject `BreadcrumbList`, `Service`, and `FAQPage` schemas into the `<head>` (via `script type="application/ld+json"` or Next.js `metadata.other` or separate component).

## Phase 4: AEO & GEO Optimization

**Objective**: Ensure the content structure satisfies Answer Engine constraints.

### 4.1 "What is" Blocks

- Ensure the Hero or Intro text serves as a direct answer snippet.

### 4.2 Accessibility & Performance Check

- Validate LCP (Hero Image/Video).
- Validate CLS (Font loading).
- Check contrast ratios.

## Execution Order

1. **Refactor Types & Data**: Fix the foundation first. (Phase 1)
2. **Scaffold Route**: Create the empty page to verify routing. (Phase 3.1)
3. **Build Components**: Implement one by one, adding them to the page. (Phase 2)
4. **Final Polish**: SEO tags and JSON-LD. (Phase 3.3, 4)

## Status

- [ ] Phase 1: Data Upgrade
- [ ] Phase 2: Components
- [ ] Phase 3: Page Assembly
- [ ] Phase 4: Verification
