# Spec 00 Special: UI Foundation Install (shadcn/ui + Next.js UI Toolkit)
File: /specs/00-special/00-ui-foundation-shadcn-and-ui-toolkit.md  
Status: Draft  
Priority: Must-do before expanding UI components  
Owner: Mamdouh  
Applies to: Whole app (AR/EN, RTL/LTR)

---

## 0) Goal
Establish a consistent UI foundation that:
- speeds up building pages and components
- keeps design consistent with "$BrandNameArabic$" tokens
- stays lightweight and production safe on Next.js App Router
- supports Arabic RTL well
- avoids UI drift and random component styles

This spec defines:
1) shadcn/ui setup
2) the baseline UI libraries we install once
3) what we do NOT install
4) integration rules with tokens, fonts, and i18n

No version pinning. Always use latest stable compatible releases.

---

## 1) Required Baseline UI Stack
### 1.1 Core UI Components
- shadcn/ui (Radix UI based)
- Radix UI primitives used by shadcn

### 1.2 Styling and Theming
- Tailwind CSS (already in stack)
- class-variance-authority (CVA) for variant patterns
- tailwind-merge for class merging
- clsx for conditional classes

### 1.3 Motion
- Framer Motion (already planned)
- Use only where it supports UX, not decoration
- If Framer Motion causes bundle bloat in specific pages, fall back to CSS transitions

### 1.4 Icons
- react-icons (per Spec 27)
- lucide-react (only if already used in current system)
Rule: pick ONE default icon pack for most UI, and keep others limited to specific needs.

### 1.5 Forms
- react-hook-form
- zod
- @hookform/resolvers

### 1.6 Tables and Data Views
- @tanstack/react-table
Only for portfolio tables, admin-like lists, or heavy filters.

### 1.7 Media and Lightbox
- yet-another-react-lightbox
Plugins allowed:
- captions
- thumbnails
- zoom
Use only for portfolio and media center galleries.

### 1.8 Toasts, Tooltips, Dialogs
Prefer shadcn versions:
- toast (sonner)
- tooltip
- dialog
- dropdown-menu
- popover

### 1.9 Error Boundaries
- react-error-boundary
Mandatory wrapper strategy in layout shells and risky sections.

---

## 2) Packages to Install (One-time)
Install baseline dependencies.

Command set:
- shadcn init
- install core utilities
- install form, motion, error boundary, lightbox

Packages list:
- shadcn/ui initializer
- class-variance-authority
- tailwind-merge
- clsx
- lucide-react (optional, if needed)
- react-icons
- framer-motion
- react-hook-form
- zod
- @hookform/resolvers
- react-error-boundary
- yet-another-react-lightbox (+ captions, thumbnails, zoom plugins as needed)
- @tanstack/react-table (only if we actually build a table)
- next-themes (optional, only if dark mode toggle is required)

Hard rule:
No installing big UI suites that duplicate shadcn.

---

## 3) shadcn/ui Installation and Configuration
### 3.1 Setup steps
1) Run shadcn init
2) Confirm:
- Tailwind enabled
- CSS variables enabled
- Use the project’s alias config
3) Output folder policy:
- components go to: /src/components/ui
- utilities go to: /src/lib

### 3.2 Required files
- /src/lib/utils.ts must export cn
- /src/components/ui/ must be the single source of truth for shared UI blocks

### 3.3 RTL considerations
- Ensure components that use direction or placement:
  - dropdown
  - popover
  - tooltip
  - sheets
respect dir="rtl" automatically.
If not, pass dir explicitly from layout.

### 3.4 Token binding
All UI colors must map to existing brand tokens:
- brand.navy
- brand.blue
- brand.gold
- brand.purple
- brand.green
- surfaces

No random hex use inside components.

---

## 4) Component Packs to Add from shadcn
These are the default components we will add early because they will be used everywhere.

Minimum set:
- button
- badge
- card
- input
- textarea
- label
- select
- checkbox
- switch
- radio-group
- tabs
- accordion
- dialog
- sheet
- dropdown-menu
- navigation-menu
- popover
- tooltip
- toast (sonner)
- separator
- skeleton
- breadcrumb
- pagination

Conditional set:
- carousel (only if we decide to use a shadcn-compatible carousel)
- table (if we implement table UI)
- command (only if we build internal command palette later)

---

## 5) UI Architecture Rules
### 5.1 Where to use shadcn vs custom
Use shadcn when:
- it is a standard UI pattern
- accessibility matters
- we want consistent interactions

Use custom components when:
- it is brand-specific and not standard UI
- it is a hero, bento, or cinematic section

### 5.2 No emoji rule
All emojis must be replaced with icons.
Default icon pack for UI should be consistent.

### 5.3 No inline styling
No style attribute except for rare CSS variables.
No raw hex colors in JSX.
Use tokens and Tailwind config.

### 5.4 File size and modularity
- no file above 350 lines
- every big section gets a folder:
  - index.ts export
  - component files
  - tests
  - readme

---

## 6) Accessibility Rules for UI Components
- Never remove focus rings without replacing them
- Keyboard navigation must work for:
  - dialog
  - sheet
  - dropdown
  - carousel
- Tooltips must not be the only way to deliver critical info
- Form errors must be announced and visible

---

## 7) Performance and Bundle Rules
- Do not import full icon packs globally
- Use named imports per icon
- Avoid heavy animation libraries beyond Framer Motion
- Lazy load media-heavy components (lightbox, carousel) where possible

---

## 8) Testing Requirements
Unit tests must cover:
- cn helper exists and works
- key UI primitives render:
  - Button
  - Dialog
  - Sheet
- RTL smoke tests:
  - open dropdown in RTL
  - open sheet from right side in RTL
- Error boundary wraps app shell components

Add a baseline test file:
- /src/components/ui/ui.smoke.test.tsx

---

## 9) QA Gate
This spec is DONE only if:
- cn is present and imported where needed
- no console errors related to UI libs
- shadcn components render correctly in /ar and /en
- RTL placement issues are fixed for dropdowns, sheets, and tooltips
- bundle remains acceptable and does not degrade app speed

---

## 10) Deliverables
- shadcn initialized
- baseline packages installed
- required shadcn components added
- ui smoke tests added
- documentation:
  - /reports/ui-foundation-setup.md describing what was installed and why
  - references to this spec and how to add new components