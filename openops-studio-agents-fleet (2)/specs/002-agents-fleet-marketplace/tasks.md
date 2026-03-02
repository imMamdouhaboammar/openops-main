---
description: "Task list for OpenOps Agents Fleet Marketplace implementation"
---

# Tasks: OpenOps Agents Fleet Marketplace

**Input**: Design documents from `/specs/002-agents-fleet-marketplace/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Organization**: Tasks grouped by user story (P1 → P3) to enable independent implementation and testing of each story.

**Format**: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure) ✅ COMPLETE

**Purpose**: Project initialization, shared tooling, and environment setup

- [X] T001 Create project folder structure per plan.md (backend/, frontend/, docs/)
- [X] T002 [P] Initialize backend: Node.js 20 LTS, Express, TypeScript, Prisma setup
- [X] T003 [P] Initialize frontend: Vite 5 config, React 19 scaffold, TypeScript strict mode
- [X] T004 [P] Configure ESLint + Prettier for both frontend and backend
- [X] T005 [P] Setup Docker and docker-compose for PostgreSQL 16 + S3-compatible storage (MinIO)
- [X] T006 [P] Create .env.example files for both backend and frontend with required keys
- [ ] T007 Create shared TypeScript types file: backend/src/types/api-contracts.ts (schemas from OpenAPI)
- [ ] T008 Setup testing infrastructure: Vitest (frontend), Jest (backend), Playwright (E2E)
- [ ] T009 Configure CI/CD pipeline (npm run build, lint, test gates)
- [ ] T010 Setup Stripe and Wise sandbox accounts; document credentials in .env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T011 Setup PostgreSQL schema: Create Prisma schema file backend/prisma/schema.prisma with all 8 entities
- [ ] T012 Create initial Prisma migration: backend/prisma/migrations/001_init_schema
- [ ] T013 [P] Implement User entity + authentication middleware (Passport.js local + JWT)
- [ ] T014 [P] Implement License entity + LicenseTier reference table (free/personal/team/enterprise)
- [ ] T015 [P] Implement base API error handling middleware + logging (Winston) in backend/src/middleware/errorHandler.ts
- [ ] T016 Implement Stripe webhook handler in backend/src/controllers/webhooks/stripe.ts (charge.succeeded, charge.refunded events)
- [ ] T017 [P] Setup React Query (client data fetching) + Zustand (state management) configuration
- [ ] T018 [P] Create shared UI components: Button, Input, Modal, Alert, Card in frontend/src/ui/components/
- [ ] T019 Create API client wrapper: backend/src/services/BaseService.ts + frontend/src/core/api.ts (Axios configured)
- [ ] T020 Implement JWT token generation/validation: backend/src/utils/jwt.ts
- [ ] T021 Implement checksum utility (SHA-256): backend/src/utils/checksum.ts
- [ ] T022 Implement file upload handler (multipart/form-data): backend/src/middleware/upload.ts (< 100MB limit)
- [ ] T023 [P] Create database seeders: backend/prisma/seed.ts (test vendors, listings, users)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse, Purchase, Download (Priority: P1) 🎯 MVP

**Goal**: Buyers discover, purchase, and download agent packages with verified checksums.

**Independent Test**: Can be fully tested by simulating: signup → browse → purchase → download → verify checksum. Delivers core marketplace revenue.

**Key Entities**: Listing, AgentPackage, Order, DownloadEvent  
**Key API Endpoints**: GET /listings, GET /listings/{id}, POST /orders, POST /orders/{id}/download

### Tests for User Story 1 (OPTIONAL - TDD Approach)

- [ ] T024 [P] Unit test: archive checksum validation (SHA-256) in backend/tests/unit/checksum.test.ts
- [ ] T025 [P] Unit test: Listing price conversion (USD to buyer's currency) in backend/tests/unit/pricing.test.ts
- [ ] T026 [P] Unit test: Order state machine transitions in backend/tests/unit/orderStateMachine.test.ts
- [ ] T027 [P] Integration test: Full buy flow (signup → checkout → stripe webhook → download) in backend/tests/integration/buyFlow.test.ts
- [ ] T028 [P] E2E test: Buyer journey via Playwright in frontend/tests/e2e/buyerFlow.e2e.ts

### Implementation for User Story 1

#### Backend (API + Services)

- [ ] T029 [P] [US1] Create AgentPackage model + service in backend/src/models/AgentPackage.prisma + backend/src/services/ArchiveService.ts
- [ ] T030 [P] [US1] Create Listing model + service in backend/src/models/Listing.prisma + backend/src/services/ListingService.ts
- [ ] T031 [P] [US1] Create Order model + service in backend/src/models/Order.prisma + backend/src/services/OrderService.ts (state machine logic)
- [ ] T032 [P] [US1] Create DownloadEvent model + audit logger in backend/src/models/DownloadEvent.prisma
- [ ] T033 [P] [US1] Implement StripeService for payment capture + refund in backend/src/services/StripeService.ts
- [ ] T034 [US1] Implement GET /api/v1/listings controller with search/filter in backend/src/controllers/ListingController.ts (depends on T030, T031)
- [ ] T035 [US1] Implement GET /api/v1/listings/{id} with full details in backend/src/controllers/ListingController.ts
- [ ] T036 [US1] Implement POST /api/v1/orders (checkout) controller in backend/src/controllers/OrderController.ts (depends on T031, T033)
- [ ] T037 [US1] Implement POST /api/v1/orders/{id}/download controller + signed URL generation in backend/src/controllers/OrderController.ts (depends on T033)
- [ ] T038 [US1] Add validation: order capture + token expiry check in backend/src/validators/order.ts (Zod schemas)

#### Frontend (UI + Hooks)

- [ ] T039 [P] [US1] Create Listing search/filter UI in frontend/src/modules/marketplace/ui/ListingGrid.tsx
- [ ] T040 [P] [US1] Create Listing detail page in frontend/src/modules/marketplace/ui/ListingDetail.tsx
- [ ] T041 [P] [US1] Create useListings hook + React Query integration in frontend/src/modules/marketplace/hooks/useListings.ts
- [ ] T042 [US1] Create Checkout cart + payment form in frontend/src/modules/checkout/ui/CheckoutForm.tsx (Stripe Elements)
- [ ] T043 [US1] Create useCheckout hook (POST /orders) in frontend/src/modules/checkout/hooks/useCheckout.ts
- [ ] T044 [US1] Implement download flow + checksum verification in frontend/src/modules/marketplace/services/downloadService.ts (crypto.subtle.digest)
- [ ] T045 [US1] Add error handling + localization (EN/AR) for buy flow in frontend/src/modules/checkout/ui/ErrorMessage.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Buyers can search → purchase → download verified packages.

---

## Phase 4: User Story 2 - Vendor Onboarding & Listing Publishing (Priority: P2)

**Goal**: Vendors submit agent packages; system validates structure & compatibility; listings published to marketplace.

**Independent Test**: Can be fully tested by: vendor signup → KYC submission → package upload → validation → publish. Enables supply-side scaling.

**Key Entities**: User (vendor), AgentPackage, Listing, VendorPayout  
**Key API Endpoints**: POST /vendors/upload-package, POST /listings, PATCH /listings/{id}, GET /vendors/kyc-status

### Tests for User Story 2 (OPTIONAL - TDD Approach)

- [ ] T046 [P] [US2] Unit test: archive structure validation (required artifacts) in backend/tests/unit/archiveValidation.test.ts
- [ ] T047 [P] [US2] Unit test: semantic versioning in backend/tests/unit/semver.test.ts
- [ ] T048 [P] [US2] Integration test: vendor upload → validation → listing in backend/tests/integration/vendorUpload.test.ts
- [ ] T049 [P] [US2] E2E test: Vendor onboarding flow in frontend/tests/e2e/vendorFlow.e2e.ts

### Implementation for User Story 2

#### Backend (API + Services)

- [ ] T050 [P] [US2] Implement vendor role + KYC fields in User model (backend/src/models/User.prisma)
- [ ] T051 [US2] Create ArchiveValidationService in backend/src/services/ArchiveValidationService.ts (checks: ZIP format, artifacts, size < 100MB)
- [ ] T052 [US2] Create VendorService in backend/src/services/VendorService.ts (KYC, payout tracking)
- [ ] T053 [US2] Implement POST /api/v1/vendors/upload-package controller in backend/src/controllers/VendorController.ts (multipart, validation, checksum)
- [ ] T054 [US2] Implement POST /api/v1/listings controller (create listing from package) in backend/src/controllers/ListingController.ts
- [ ] T055 [US2] Implement PATCH /api/v1/listings/{id} for draft → pending_review → active transitions in backend/src/controllers/ListingController.ts
- [ ] T056 [US2] Implement GET /api/v1/vendors/kyc-status in backend/src/controllers/VendorController.ts
- [ ] T057 [US2] Add Prisma validation schema: artifacts must match manifest in archive in backend/src/validators/archive.ts
- [ ] T058 [US2] Create admin approval queue handler in backend/src/services/AdminService.ts (mark listings as reviewed)

#### Frontend (UI + Hooks)

- [ ] T059 [P] [US2] Create vendor signup/role selection in frontend/src/modules/auth/ui/SignupForm.tsx
- [ ] T060 [P] [US2] Create KYC form UI in frontend/src/modules/vendor/ui/KYCForm.tsx (personal info, document upload)
- [ ] T061 [US2] Create KYC status indicator in frontend/src/modules/vendor/ui/KYCStatus.tsx
- [ ] T062 [P] [US2] Create archive upload form in frontend/src/modules/vendor/ui/UploadForm.tsx (drag-drop, progress, validation feedback)
- [ ] T063 [US2] Create useVendorUpload hook in frontend/src/modules/vendor/hooks/useVendorUpload.ts (POST /vendors/upload-package)
- [ ] T064 [US2] Create listing creation form in frontend/src/modules/vendor/ui/CreateListingForm.tsx (title, description, price, tier)
- [ ] T065 [US2] Create Vendor Dashboard in frontend/src/modules/vendor/ui/VendorDashboard.tsx (my listings, upload, sales)
- [ ] T066 [US2] Add validation feedback for archive issues in frontend/src/modules/vendor/ui/ValidationStatus.tsx (missing artifacts, size warning)

**Checkpoint**: All user stories 1 AND 2 should now work independently. Marketplace has buyers + vendors; revenue flows.

---

## Phase 5: User Story 3 - Deployment Guides & Compatibility Checking (Priority: P3)

**Goal**: Buyers view platform-specific deployment guides (Gemini/ChatGPT/Claude); system flags missing artifacts.

**Independent Test**: Can be fully tested by: select platform → verify guide content + artifact checklist → no implementation of other stories required.

**Key Entities**: Listing, CompatibilityProfile (implicit in data model), DownloadEvent  
**Key API Endpoints**: GET /listings/{id} (includes guides), GET /orders/{id} (shows guide selection UI)

### Tests for User Story 3 (OPTIONAL)

- [ ] T067 [P] [US3] Unit test: artifact compatibility check per platform in backend/tests/unit/platformCompatibility.test.ts
- [ ] T068 [P] [US3] E2E test: Guide selection + checklist in frontend/tests/e2e/deploymentGuide.e2e.ts

### Implementation for User Story 3

#### Backend (API + Services)

- [ ] T069 [US3] Create guide content data structure in backend/src/data/deploymentGuides.ts (Gemini/GPT/Claude steps + artifact mappings)
- [ ] T070 [US3] Implement GET /api/v1/listings/{id}/guides endpoint in backend/src/controllers/ListingController.ts (returns platform guides + checklist)
- [ ] T071 [US3] Add artifact compatibility validation in OrderService (flag unsupported artifacts per platform)

#### Frontend (UI + Hooks)

- [ ] T072 [P] [US3] Create platform selector UI in frontend/src/modules/deployment/ui/PlatformSelector.tsx (tabs: Gemini/GPT/Claude)
- [ ] T073 [US3] Create deployment guide renderer in frontend/src/modules/deployment/ui/DeploymentGuide.tsx (markdown steps, code samples, images)
- [ ] T074 [US3] Create artifact compatibility checklist in frontend/src/modules/deployment/ui/ArtifactChecklist.tsx (✅ included, ⚠️ optional, ❌ missing)
- [ ] T075 [US3] Create usePlatformGuide hook in frontend/src/modules/deployment/hooks/usePlatformGuide.ts (fetch + state management)
- [ ] T076 [US3] Add Arabic (RTL) localization for guides in frontend/src/modules/deployment/guides/guides.ar.ts

**Checkpoint**: User Story 3 complete. Buyers have guidance on how to deploy agents in their preferred platform.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple user stories, performance, compliance

### Data & Compliance

- [ ] T077 [P] Implement audit logging middleware in backend/src/middleware/auditLog.ts (log all API calls, purchases, refunds with correlationId)
- [ ] T078 [P] Create data retention job in backend/src/jobs/dataRetention.ts (anonymize IPs after 30 days, soft-delete aged data per policy)
- [ ] T079 Create order/download export for vendors (CSV) in backend/src/services/ReportService.ts
- [ ] T080 Implement GDPR data export endpoint in backend/src/controllers/UserController.ts (POST /api/v1/users/export)

### Testing & QA

- [ ] T081 [P] Create contract tests for all API endpoints in backend/tests/contract/
- [ ] T082 [P] Add integration tests for payment flow (Stripe mock) in backend/tests/integration/
- [ ] T083 [P] Add E2E tests for P1 + P2 critical paths (Playwright) in frontend/tests/e2e/
- [ ] T084 Add performance benchmarks for download delivery (<10s target) in backend/tests/performance/
- [ ] T085 Run Codacy analysis; fix code quality issues (complexity, duplication)
- [ ] T086 Achieve 70% code coverage baseline; 90% for critical modules (OrderService, ArchiveValidationService)

### Documentation & Deployment

- [ ] T087 [P] Write backend README with setup + API docs link in backend/README.md
- [ ] T088 [P] Write frontend README with Vite/React setup in frontend/README.md
- [ ] T089 Create deployment guide (Docker, env vars, Stripe keys) in docs/DEPLOYMENT.md
- [ ] T090 Create vendor onboarding guide (with screenshots) in docs/VENDOR_GUIDE.md
- [ ] T091 Create buyer FAQ (download issues, refunds, platforms) in docs/BUYER_FAQ.md
- [ ] T092 Update main README with quickstart links to docs/

### Performance & Monitoring

- [ ] T093 Add Sentry error tracking to both frontend + backend
- [ ] T094 Implement Prometheus metrics for API latency, download success rate in backend/src/monitoring/
- [ ] T095 Setup Grafana dashboards for P1 metrics (order count, revenue, download time)
- [ ] T096 Add client-side performance tracking (Core Web Vitals) in frontend/src/monitoring/

### Security Hardening

- [ ] T097 [P] Implement rate limiting on auth endpoints in backend/src/middleware/rateLimit.ts
- [ ] T098 [P] Add CORS policy configuration in backend/src/middleware/cors.ts
- [ ] T099 Implement API key scoping for vendor + admin roles in backend/src/middleware/apiKeyAuth.ts
- [ ] T100 Setup signed download URLs with expiry (Stripe-style) in backend/src/services/DownloadService.ts

### Localization (EN + AR)

- [ ] T101 [P] Extract i18n strings for UI components in frontend/src/locales/en.json + ar.json
- [ ] T102 [P] Setup React i18next configuration in frontend/src/core/i18n.ts
- [ ] T103 Apply RTL support to all components (flex, text-align, margin adjustments) in frontend/src/ui/theme/tailwind.config.js
- [ ] T104 Add Arabic locale support to backend error messages in backend/src/locales/

### Final QA & Checkpoint

- [ ] T105 Run full test suite: npm run test (all unit + integration + E2E)
- [ ] T106 [P] Manual QA: Test P1 journey (buy flow end-to-end)
- [ ] T107 [P] Manual QA: Test P2 journey (vendor upload + publish)
- [ ] T108 Manual QA: Verify guides in all 3 platforms (Gemini/GPT/Claude)
- [ ] T109 Verify compliance with Constitution v1.1.0 (code quality, testing, UX, performance)
- [ ] T110 Run quickstart.md validation (all steps pass)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion - **BLOCKS** all user stories
- **Phase 3 (US1)**: Depends on Phase 2 completion - **No dependencies** on other stories
- **Phase 4 (US2)**: Depends on Phase 2 completion - **No dependencies** on other stories; can start in parallel with US1
- **Phase 5 (US3)**: Depends on Phase 2 completion - **May integrate** with US1/US2 but independently testable
- **Phase 6 (Polish)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (US1 - P1)**: Can start after Phase 2 - No dependencies on other stories ✅ Independent
- **User Story 2 (US2 - P2)**: Can start after Phase 2 - No dependencies on other stories ✅ Independent
- **User Story 3 (US3 - P3)**: Can start after Phase 2 - No dependencies on other stories ✅ Independent

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before controllers/endpoints
- Core API implementation before frontend UI
- Story complete before moving to next priority

### Parallel Opportunities

#### Phase 1 (Setup)
- T002, T003, T004, T005, T006, T007 can all run in parallel (independent setup files)

#### Phase 2 (Foundational)
- T013, T014, T015, T017, T018 marked [P]: can run in parallel
- T016 depends on Stripe SDK (after T002)
- T019 depends on both T002 + T003 (both APIs ready)

#### User Stories (P1, P2, P3)
Once Phase 2 complete:
- **Parallel Opportunity 1**: Developer A starts US1 (T024–T045)
- **Parallel Opportunity 2**: Developer B starts US2 (T046–T066)
- **Parallel Opportunity 3**: Developer C starts US3 (T067–T076)
- All three stories complete independently, then Phase 6 polish

#### Within US1 Backend (T029–T038)
- T029, T030, T031, T032, T033 marked [P]: models can be created in parallel
- T034, T035 depend on T030, T031 (listing service must exist)
- T036, T037 depend on T031, T033 (order + stripe service required)

#### Within US1 Frontend (T039–T045)
- T039, T040, T041 marked [P]: UI components + hooks can be built in parallel
- T042, T043 depend on T039 (checkout needs listing data)
- T044 depends on T043 (download flow after checkout)

---

## Parallel Example: User Story 1 Accelerated (2 Developers)

```
Developer A (Backend):
├─ T024–T028: Write tests (TDD - fail first)
├─ T029–T031: Create models (parallel: T029, T030, T031)
├─ T032–T033: Services (parallel: T032, T033)
├─ T034–T038: Implement endpoints

Developer B (Frontend):
├─ T039–T041: UI + hooks (parallel: T039, T040, T041)
├─ T042–T045: Checkout + download (sequential after T039)
└─ Runs tests in CI: npm run test

Result: US1 complete in ~1 week (vs. 2 weeks sequentially)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (quickstart.md P1 section)
5. Deploy/demo if ready
6. Add US2 in Phase 4 (vendor supply-side)
7. Add US3 in Phase 5 (deployment guides)

### Incremental Delivery

1. Phase 1–2 + US1 → Deploy MVP (buyers can search, purchase, download) ✅ Revenue enabled
2. Add US2 → Deploy update (vendors can upload, publish) ✅ Supply-side scaling
3. Add US3 → Deploy update (deployment guides) ✅ Support cost reduction

### Parallel Team Strategy

With 3 developers:
1. All complete Phase 1–2 together
2. Developer A: US1 (backend T024–T038) + frontend T039–T045
3. Developer B: US2 (backend T046–T058) + frontend T059–T066
4. Developer C: US3 + Polish (T067–T110)
5. Sync weekly for integration + deployment

---

## Notes

- [P] tasks = different files, no dependencies (can assign to multiple developers)
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests FAIL before implementing
- Commit after each logical group (e.g., all models created, all services created)
- Stop at any checkpoint to validate story independently
- Use quickstart.md (T110) as final validation: all steps must pass

---

## Task Count Summary

| Phase | Count | Status |
|-------|-------|--------|
| **Phase 1 (Setup)** | 10 | Shared infrastructure |
| **Phase 2 (Foundational)** | 13 | **BLOCKING** - all stories depend |
| **Phase 3 (US1 - P1)** | 22 | MVP: browse, buy, download |
| **Phase 4 (US2 - P2)** | 17 | Vendor onboarding + publish |
| **Phase 5 (US3 - P3)** | 8 | Deployment guides |
| **Phase 6 (Polish)** | 30 | QA, docs, monitoring, compliance |
| **TOTAL** | **110** | |

**Estimated Timeline**:
- **MVP (US1 only)**: 3–4 weeks (1 developer or 2 parallel on backend/frontend)
- **Full (US1 + US2 + US3)**: 6–8 weeks (3 developers)
- **Polish + Hardening**: 2–3 weeks (continuous throughout)
