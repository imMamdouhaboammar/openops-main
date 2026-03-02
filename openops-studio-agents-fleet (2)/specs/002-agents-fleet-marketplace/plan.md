# Implementation Plan: OpenOps Agents Fleet Marketplace

**Branch**: `002-agents-fleet-marketplace` | **Date**: 2026-01-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-agents-fleet-marketplace/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a premium e-commerce marketplace for enterprise-grade, open-source AI Agent specifications. Buyers browse, purchase, and download source-code archives (JSON/MD/YML/Pseudo files, etc.) compatible with Gemini, ChatGPT, and Claude. Vendors submit packages, the system validates structure and compatibility, and publishes listings. Core value: stop vibe-prompting; treat agents as software artifacts with versioning, determinism, and data sovereignty.

**Key features**: Browse/search catalog → Purchase with payment → Download signed archive with checksum validation → Platform-specific deployment guides (Gemini/Claude/GPT) → Vendor onboarding + package versioning.

**MVP scope**: User Story 1 (P1: Browse, purchase, download) + User Story 2 (P2: Vendor upload and publish) → Stories 3+ in later phases.

## Technical Context

**Language/Version**: TypeScript 5.x (frontend), Node.js 20+ LTS (backend)
**Frontend Stack**: Vite 5.x + React 19 + TypeScript strict + Tailwind CSS + Zustand (state) + React Query (data fetching)
**Backend Stack**: Express.js + TypeScript + Zod (validation) + Passport.js (auth) + Winston (logging)
**Storage**: PostgreSQL 16+ (primary data + order/vendor records); S3-compatible storage for archives (optional: local filesystem for MVP)
**Database ORM**: Prisma with schema migrations
**Testing**: Vitest (unit/integration frontend), Jest (backend); E2E with Playwright (critical paths)
**Target Platform**: Web (responsive desktop/mobile); REST API; optional: future mobile apps
**Project Type**: Full-stack web application (separate frontend + backend)
**Performance Goals**: 
  - Buy flow (P1): browse → purchase → download in <3min (SC-003)
  - Download delivery: <10s after payment capture (SC-001)
  - Platform guide switch (P3): <500ms p95 (SC-005)
  - Archive download checksum: 99% pass on first attempt (SC-002)
**Constraints**: 
  - <100MB archive size limit (edge case: larger archives rejected)
  - Download link valid for 24h by default (configurable)
  - Checksum verification required client-side (MD5 or SHA-256 post-download)
**Scale/Scope**: 
  - MVP: 50–200 agent listings, <1k concurrent buyers
  - Vendor onboarding: <10min per vendor from signup to first listing
  - Localization: English + Arabic (RTL support required)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Compliance vs. v1.1.0 Constitution

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Code Quality & Maintainability** | ✅ Pass | Feature modules <400 lines; PRs include rationale; linting + type checks enforced in CI |
| **II. Testing & Verification Standards** | ✅ Pass | Unit tests for payment flow, archive validation; integration tests for vendor onboarding; E2E for P1 user story; coverage baseline 70% |
| **III. User Experience Consistency** | ✅ Pass | Shared UI components; WCAG AA accessibility; error messages localized (EN/AR); long operations show progress |
| **IV. Performance & Scalability Requirements** | ✅ Pass | Service-level targets in Technical Context (p95 <500ms, download <10s); profiling required for archive serving |

**No violations.** Feature aligns with architecture rules (relative imports, barrel exports, error boundaries, Zod validation, Zustand state management).

## Project Structure

### Documentation (this feature)

```text
specs/002-agents-fleet-marketplace/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── api.openapi.yaml # REST API schema
│   ├── listings.schema.json # Listing entity schema
│   └── orders.schema.json    # Order entity schema
├── spec.md              # Feature specification
├── checklists/
│   └── requirements.md   # Specification quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

**Selected: Option 2 (Web Application)** — separate frontend and backend repositories or monorepo with workspaces.

```text
backend/
├── src/
│   ├── models/          # Prisma schema + generated types
│   ├── services/        # Business logic (OrderService, VendorService, ArchiveService, etc.)
│   ├── controllers/      # Express route handlers
│   ├── middleware/       # Auth, error handling, logging
│   ├── routes/           # API endpoint definitions (e.g., /api/v1/listings, /api/v1/orders)
│   ├── validators/       # Zod schemas for request validation
│   ├── utils/            # Helpers (checksum, file ops, payment retry)
│   └── index.ts         # Entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Migration files
├── tests/
│   ├── unit/            # Service/validator tests
│   ├── integration/      # API + database tests (mocked payment)
│   └── e2e/             # Full workflow tests (seed → checkout → download)
├── .env.example         # Config template
├── package.json
└── README.md

frontend/
├── src/
│   ├── modules/
│   │   ├── marketplace/
│   │   │   ├── ui/          # Listing cards, filters, search
│   │   │   ├── hooks/       # useListings, usePurchase, etc.
│   │   │   ├── store/       # Zustand catalog state
│   │   │   └── services/    # API calls via React Query
│   │   ├── checkout/
│   │   │   ├── ui/          # Cart, payment form
│   │   │   ├── store/       # Order state
│   │   │   └── services/    # Payment integrations
│   │   ├── vendor/
│   │   │   ├── ui/          # Onboarding form, upload
│   │   │   ├── hooks/       # useVendorUpload, usePublish
│   │   │   └── services/    # Archive validation, submission
│   │   ├── deployment/
│   │   │   ├── ui/          # Platform guide selector
│   │   │   ├── hooks/       # usePlatformGuide
│   │   │   └── guides/      # Step-by-step instructions (Gemini/ChatGPT/Claude)
│   │   └── auth/
│   │       ├── ui/          # Login, signup
│   │       ├── hooks/       # useAuth
│   │       └── store/       # User session
│   ├── core/
│   │   ├── EventBus.ts
│   │   ├── api.ts           # Axios/fetch client configured
│   │   └── logger.ts
│   ├── ui/
│   │   ├── components/      # Shared primitives (Button, Input, Modal, etc.)
│   │   ├── theme/           # Design tokens, tailwind config
│   │   └── layouts/         # Page layouts
│   ├── App.tsx
│   ├── index.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── unit/            # Component, hook, store tests
│   ├── integration/      # User flows with mocked API
│   └── e2e/             # Playwright (critical paths)
├── public/              # Static assets
├── .env.example
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

**Structure Decision**: Full-stack web app. Backend provides secure payment handling, archive validation, and vendor management. Frontend handles UI with shared components and module-based architecture per PixelForge Studio conventions. Shared types via TypeScript interfaces (API contracts in `backend/src/types/`). Tests cover critical P1/P2 journeys.

## Complexity Tracking

**Status**: ✅ No violations. Constitution Check passes all gates; no justification needed.
