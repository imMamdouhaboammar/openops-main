# Tasks: Service Pages System Implementation (Spec 54+)

Based on `54-service-pages-system.plan.md`, encompassing requirements from Spec 54, 55, and 56.

## Phase 1: Data Architecture & Taxonomy

- [ ] **1.1 Update `src/data/types.ts`**
  - [ ] Add `credibilityItems`, `deliverables`, `faqs`, `institutionalFit` to `ServicePageData`.
  - [ ] Add `relatedServiceSlugs` to `ServicePageData` (Spec 55).
  - [ ] Update `PortfolioCase` interface with Spec 56 taxonomy (`serviceSlugs`, `confidentiality`, `govDomain`).
- [ ] **1.2 Create `src/data/portfolio.ts`** (Spec 56)
  - [ ] Create the registry file.
  - [ ] Populate with initial/placeholder cases (mix of public & anonymized archetypes).
  - [ ] Implement `getPortfolioByService(slug)` helper function.
- [ ] **1.3 Refactor `src/data/services.ts`**
  - [ ] Normalize slugs to: `events-management`, `media-production`, `crisis-management`, `digital-marketing`, `public-relations`, `outdoor-advertising`.
  - [ ] Populate new fields (FAQs, Deliverables, Institutional Fit) for all 6 services.
  - [ ] Map `relatedServiceSlugs` for each service (Spec 55).

## Phase 2: Service Components Library

Location: `src/components/services/`

- [ ] **2.1 Implement `ServiceHero.tsx`**
  - [ ] Support video/image background.
  - [ ] Bilingual text fade-in.
  - [ ] Primary & Secondary CTAs.
- [ ] **2.2 Implement `CredibilityStrip.tsx`**
  - [ ] Responsive horizontal scroll (mobile) / grid (desktop).
- [ ] **2.3 Implement `CapabilityGrid.tsx`**
  - [ ] Card layout with icons.
- [ ] **2.4 Implement `MethodSteps.tsx`**
  - [ ] Numbered process for B2G context.
- [ ] **2.5 Implement `DeliverablesChecklist.tsx`**
  - [ ] Accordion or grouped list with semantic HTML (AEO).
- [ ] **2.6 Implement `CaseSnippetGrid.tsx`**
  - [ ] Integrate `getPortfolioByService(serviceSlug)`.
  - [ ] Handle 'Anonymized' logic (hide client name/logo if strictly anonymous).
- [ ] **2.7 Implement `FAQAccordion.tsx`**
  - [ ] Use `shadcn/ui` accordion.
- [ ] **2.8 Implement `FinalCTA.tsx`**
  - [ ] Contact & WhatsApp actions.

## Phase 3: Page Assembly & Routing

- [ ] **3.1 Set up Route `src/app/[locale]/services/[slug]/page.tsx`**
  - [ ] Implement `generateStaticParams`.
  - [ ] Implement `generateMetadata` (localized title/desc).
  - [ ] Handle 404s via `getServiceBySlug`.
- [ ] **3.2 Construct Page View**
  - [ ] Assemble Sections A through H.
  - [ ] Ensure correct data passing to components.
- [ ] **3.3 Inject Structured Data (JSON-LD)**
  - [ ] `BreadcrumbList`.
  - [ ] `Service` schema.
  - [ ] `FAQPage` schema.

## Phase 4: Verification & Optimization

- [x] **4.1 Validate AEO**
  - [x] Check "What is" block rendering.
  - [x] Verify questions are answered concisely.
- [x] **4.2 Performance Audit**
  - [x] LCP < 2.5s (Hero optimization).
  - [x] CLS < 0.1.
- [x] **4.3 Accessibility Audit**
  - [x] Navigation via keyboard.
  - [x] Contrast checks (Brand colors).

## Dependencies

- `react-icons` (installed)
- `shadcn/ui` (accordion, button)
- `framer-motion` (for hero fade-in)

Status: Phase 4 & Project Implementation Completed.
