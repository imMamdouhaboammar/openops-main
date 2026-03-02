```markdown
# Feature Specification: OpenOps Agents Fleet — Marketplace

**Feature Branch**: `1-agents-fleet-marketplace`  
**Created**: 2026-01-12  
**Status**: Draft  
**Input**: User description: "OpenOps Agents Fleet — مواصفات ومكونات الموقع (God-level Prompt)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Buy & Import Agent (Priority: P1)

An enterprise buyer discovers an agent, previews its contents, purchases a license, and either downloads the ZIP or uses "Import Automatic" to push the agent to a target platform (Gemini / ChatGPT / Claude) via a helper adapter/CLI.

**Why this priority**: This is the core revenue path and primary value proposition.

**Independent Test**: Search → open product page → preview archive list → complete checkout → receive download link and license key; optionally trigger import adapter and verify a successful import stub (mocked platform endpoint).

**Acceptance Scenarios**:
1. Given a public product page, When the buyer clicks Buy and completes payment, Then a signed temporary download URL + license is available in buyer account.
2. Given a compatible product and credentials for a target platform, When buyer selects "Import Automatic", Then the system enqueues an import job and reports success/failure.

---

### User Story 2 - Seller Upload & Vetting (Priority: P1)

A seller uploads a ZIP with code/specs, fills metadata, and submits. The system runs automated scans (SCA, secret detection, privacy checks). If scans pass, product enters human review; after approval it becomes listed.

**Why this priority**: Supply side must be reliable and safe before listing.

**Independent Test**: Seller creates product record, uploads ZIP, system returns scan report with pass/fail and flagged findings; reviewer can approve/reject and set visibility.

**Acceptance Scenarios**:
1. Given an uploaded ZIP containing secrets, When scan runs, Then it flags secrets and blocks publish until resolved.

---

### User Story 3 - Admin Review & Governance (Priority: P2)

Admin can see pending products, review scan reports, request changes, and publish or reject. Admin can manage sellers, payments disputes, and platform integrations.

**Why this priority**: Governance reduces risk and protects buyers.

**Independent Test**: Admin views queue, opens product, reads scan report, updates status and adds reviewer notes.

**Acceptance Scenarios**:
1. Given a product in review, When admin marks "Needs changes", Then seller receives notification and product remains unpublished.

---

### Edge Cases

- Upload contains very large archives (>500MB) — system should enforce size limits and provide resumable upload guidance.
- Archive contains platform-specific keys/credentials — auto-detect and block publishing, show remediation guidance.
- Import to platform fails due to API changes — surface clear error and allow manual download/adapter generation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Product catalog pages MUST display name, short & long descriptions, platform compatibility, preview of archive contents, screenshots, demo link, version, changelog, license options, and price.
- **FR-002**: System MUST provide a code preview viewer with syntax highlighting for JSON/YML/MD/pseudo files and show file tree from uploaded ZIP.
- **FR-003**: Buyers MUST be able to purchase products with multiple license options (OSS license + commercial/support options) and receive license keys and download links.
- **FR-004**: Sellers MUST be able to create product records, upload ZIPs, manage versions (semver), and edit metadata.
- **FR-005**: System MUST run automated security and privacy scans on uploads (SCA, secret detection, Trivy-style container scan, license checks) and record findings.
- **FR-006**: Admins MUST have a review workflow to approve/reject products; review actions and notes MUST be auditable.
- **FR-007**: System MUST provide an "Import Automatic" flow that uses adapter scripts/CLI to convert and push artifacts to target platforms; fallback is direct ZIP download and manual instructions.
- **FR-008**: System MUST support RTL/AR and LTR/EN locales across UI and be WCAG AA accessible.
- **FR-009**: Theme switcher MUST persist preference per-user and optionally sync via account settings.
- **FR-010**: Downloads MUST use signed temporary URLs and be served via CDN; rate-limiting & signed URL expiry policies MUST be enforceable.
- **FR-011**: Marketplace MUST record purchases, generate invoices, and support payments via Stripe + PayPal + local gateways.
- **FR-012**: System MUST provide a seller dashboard with sales analytics, reviews, and issue reports.
- **FR-013**: System MUST expose platform-specific import adapters and per-product manifest metadata (e.g., manifest.json with platform_compatibility array).
- **FR-014**: System MUST detect embedded secrets and block publishing until seller removes them.

### Key Entities

- **Product**: name, slug, short/long description, compatibility[], licenses[], versions[], price, metadata, gallery, demo link, changelog.
- **Artifact (Archive)**: file list, sizes, checksums, extracted manifest, scan reports.
- **Seller**: profile, legal info, payment account, product list, support plans.
- **Buyer**: account, licenses, purchase history, download links.
- **License**: id, type (OSS/commercial/support), terms, expiry (if subscription).
- **ScanReport**: scanType, findings[], severity, remediation guidance, timestamp.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Buyers can complete discovery → purchase → download flow in under 5 minutes (measured median time).
- **SC-002**: 95% of uploads complete automated scanning within 2 minutes for archives <= 100MB.
- **SC-003**: 0 critical-severity secrets/critical vulnerabilities reach published products (automated blocking + admin veto).
- **SC-004**: Product pages achieve Lighthouse accessibility score >= 90 (WCAG AA target) for primary pages.
- **SC-005**: Import adapter succeeds for supported sample products in 90% of automated CI import tests (mocked platform endpoints).

---

Contact: OpenOps Studio Inc — legal@openops.studio

```
