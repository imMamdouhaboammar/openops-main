# Data Model: OpenOps Agents Fleet Marketplace

**Purpose**: Define entities, relationships, validation rules, and state transitions for the platform
**Date**: 2026-01-12
**Architecture**: Entity-Relationship Model with state machines

---

## Core Entities

### 1. User / Account

**Purpose**: Represents buyers and vendors; supports dual roles

**Fields**:
- `id`: UUID, primary key
- `email`: string, unique, normalized (lowercase), immutable post-verify
- `phone`: string, optional, E.164 format (for vendors)
- `passwordHash`: string, bcrypt v2b, min 60 chars
- `firstName`, `lastName`: string, trimmed, min 1–50 chars
- `locale`: enum ('en', 'ar'), default 'en'; used for email/UI localization
- `role`: enum ('buyer', 'vendor', 'admin'), supports multiple (e.g., buyer + vendor)
- `kycStatus`: enum ('pending', 'verified', 'rejected'), vendor-only; linked to payout
- `createdAt`, `updatedAt`: ISO timestamps
- `emailVerifiedAt`: ISO timestamp, nullable (email ownership confirmed)
- `lastLoginAt`: ISO timestamp, nullable (audit trail)

**Validation Rules**:
- Email: RFC 5322 compliant; verified before account activation
- Phone: validated via Twilio Verify (vendors only)
- KYC: vendor payout blocked until verified (Stripe Connect; 1–3 day SLA)

**State Transitions**:
```
created → emailVerified → (if vendor: kycPending) → kycVerified / rejected
```

---

### 2. AgentPackage

**Purpose**: Represents the source code archive and metadata (version-immutable)

**Fields**:
- `id`: UUID, primary key
- `vendorId`: UUID, foreign key to User (vendor role)
- `name`: string, max 100 chars, normalized (lowercase for search)
- `description`: string, max 1000 chars, supports markdown
- `version`: semver string (e.g., '1.0.0', '1.2.3-beta'), unique per package
- `fileSize`: integer, bytes; enforced <100MB at upload
- `archiveChecksum`: string, SHA-256 hex, immutable; generated at upload
- `artifacts`: JSON array of strings, e.g., ["tools.json", "system_prompt.md", "README.md"], validated against actual archive
- `compatibilityTags`: array of enums: ['gemini', 'gpt', 'claude'], at least one required
- `category`: enum ('legal', 'sales', 'support', 'analytics', 'creative', 'other')
- `tier`: enum ('free', 'personal', 'team', 'enterprise'), see FR-017 (licensing)
- `licenseId`: UUID, foreign key to License
- `status`: enum ('draft', 'validating', 'active', 'archived', 'rejected')
- `validationErrors`: JSON array, populated if status = 'rejected'
- `createdAt`, `updatedAt`: ISO timestamps
- `archivedAt`: ISO timestamp, nullable (soft delete for historical references)

**Validation Rules**:
- File checksum immutable after creation (prevents tampering)
- Artifacts array must be non-empty and match manifest inside archive
- At least one compatibility tag required
- Version must be valid semver and unique within vendor's catalog

**State Transitions**:
```
draft → validating → active / rejected
active → archived (vendor can deprecate)
```

---

### 3. Listing

**Purpose**: Public presentation of an AgentPackage; allows pricing, marketing content, and version history tracking

**Fields**:
- `id`: UUID, primary key
- `packageId`: UUID, foreign key to AgentPackage
- `vendorId`: UUID, duplicate for faster queries
- `title`: string, max 100 chars, may differ from package name (marketing copy)
- `slug`: string, unique, lowercase kebab-case, used in URLs
- `description`: string, max 5000 chars, supports markdown (full listing copy)
- `price`: integer, cents (USD base); e.g., 4999 = $49.99
- `currency`: enum ('usd', 'eur', 'sar', 'aed'), base = usd; Stripe handles conversion
- `priceUsdEquiv`: integer, cents, auto-calculated for analytics (if not usd)
- `discount`: object { `percent`: 0–100, `validUntil`: ISO timestamp }, nullable
- `rating`: float, 0–5, calculated from orders with reviews
- `ratingCount`: integer, number of reviews
- `downloadCount`: integer, aggregate across versions
- `featuredImage`: string, URL to S3-hosted image (400x300px, max 2MB)
- `tags`: array of strings, max 10, lowercase, for filtering/search
- `status`: enum ('draft', 'pending_review', 'active', 'paused', 'archived')
- `publishedAt`: ISO timestamp, nullable (go-live date for analytics)
- `createdAt`, `updatedAt`: ISO timestamps
- `locales`: object { 'ar': { title, description }, ... }, for RTL localization

**Validation Rules**:
- Slug must be globally unique (prevents URL collisions)
- Price >= $0; free tier has price = 0
- Discount end date must be future-dated
- Image must be valid S3 URI and accessible

**State Transitions**:
```
draft → pending_review → active / archived
active → paused (vendor action: temporarily unavailable)
any → archived (soft delete; retains purchase history)
```

---

### 4. Order

**Purpose**: Represents a purchase transaction; links buyer to listing and payment capture

**Fields**:
- `id`: UUID, primary key
- `buyerId`: UUID, foreign key to User (buyer role)
- `listingId`: UUID, foreign key to Listing
- `packageId`: UUID, duplicate for faster queries (listing snapshot)
- `vendorId`: UUID, duplicate for faster queries
- `packageVersion`: string, semver snapshot at purchase time (for history)
- `priceUsd`: integer, cents, snapshot at purchase (immutable for refund calc)
- `priceActual`: integer, cents, in buyer's currency (Stripe conversion)
- `currency`: enum, buyer's currency at checkout
- `licenseTierId`: UUID, foreign key to LicenseTier (snapshot: personal/team/etc.)
- `licenseSeats`: integer, if team/enterprise tier; max allowed seats
- `licenseExpiresAt`: ISO timestamp, license valid until date
- `stripePaymentIntentId`: string, linked to Stripe PaymentIntent (idempotency)
- `stripeChargeId`: string, linked to Stripe Charge (post-capture)
- `status`: enum ('pending', 'captured', 'failed', 'refunded', 'chargedback'), see state machine below
- `downloadTokens`: array of objects { `token`: UUID, `expiresAt`: ISO timestamp, `downloadedAt`: ISO timestamp nullable }
- `downloadCount`: integer, incremented per verified download
- `checkedChecksum`: boolean, buyer's client confirmed SHA-256 match
- `clientVersion`: string, semantic version of buyer's client (for compatibility)
- `refundReason`: string, nullable (populated on refund)
- `refundApprovedBy`: UUID, nullable, foreign key to admin User who approved
- `refundApprovedAt`: ISO timestamp, nullable
- `createdAt`: ISO timestamp (checkout initiated)
- `capturedAt`: ISO timestamp, nullable (payment confirmed)
- `expiresAt`: ISO timestamp, session TTL (e.g., 15 min for pending; download TTL if captured)

**Validation Rules**:
- Price immutable after creation (for dispute resolution)
- Download tokens auto-generated on capture; valid 24h by default (configurable)
- Refund reason required for manual refunds
- `checkedChecksum` flag persists for audit (proves client verified artifact integrity)

**State Transitions**:
```
pending → (timeout) → failed [after 15 min if no capture]
pending → captured → fulfilled (after first verified download)
captured → refund_requested → refunded (via process in FR-018)
captured/refunded → chargedback (Stripe webhook on chargeback)
```

---

### 5. License / LicenseTier

**Purpose**: Defines usage rights and restrictions per tier (see FR-017)

**Fields**:
- `id`: UUID, primary key
- `tier`: enum ('free', 'personal', 'team', 'enterprise', 'commercial')
- `maxSeats`: integer, -1 = unlimited
- `allowModification`: boolean, always true for all tiers
- `allowRedistribution`: enum ('none', 'internal_only', 'commercial')
- `supportLevel`: enum ('community', 'email', 'priority')
- `durationDays`: integer, -1 = perpetual; used to set `order.licenseExpiresAt`
- `description`: string (for legal docs)
- `createdAt`, `updatedAt`: ISO timestamps

**Validation Rules**:
- Tier + maxSeats + allowRedistribution define the rights table (immutable after creation)
- `durationDays` must be reasonable (30–3650 days or -1)

---

### 6. Download / DownloadEvent

**Purpose**: Audit trail for downloads; supports checksum verification and chargeback defense

**Fields**:
- `id`: UUID, primary key
- `orderId`: UUID, foreign key to Order
- `downloadTokenId`: UUID, foreign key (reference in order.downloadTokens[].token)
- `downloadedAt`: ISO timestamp
- `ipAddress`: string, IP (v4 or v6), anonymized after 30 days
- `userAgent`: string, client identifier (browser, CLI tool, etc.)
- `checksumVerified`: boolean, client confirmed SHA-256 post-download
- `clientChecksum`: string, SHA-256 hex provided by client (null if unverified)
- `mismatchReason`: string, nullable; if checksumVerified = false, reason captured
- `bytesDownloaded`: integer, actual bytes received (for bandwidth tracking)
- `durationSeconds`: float, time to complete download
- `createdAt`: ISO timestamp

**Validation Rules**:
- `checksumVerified` flag supports refund policy (FR-018: refunds rejected if checksum verified)
- IP anonymized after 30 days (GDPR compliance)
- Checksum mismatch tracked for SLA monitoring (target: 1% mismatch rate)

---

### 7. Review / Rating

**Purpose**: Buyer feedback on agent quality; cascades to Listing rating

**Fields**:
- `id`: UUID, primary key
- `orderId`: UUID, foreign key to Order, unique (one review per purchase)
- `buyerId`: UUID, duplicate for faster queries
- `packageId`: UUID, foreign key to AgentPackage
- `listingId`: UUID, foreign key to Listing
- `rating`: integer, 1–5 stars
- `reviewText`: string, max 500 chars, optional
- `artifacts`: array of objects { `name`: string, `rating`: 1–5 } (e.g., tools.json rated 5/5, system_prompt.md rated 3/5)
- `createdAt`, `updatedAt`: ISO timestamps

**Validation Rules**:
- One review per order (enforced by orderId uniqueness)
- Rating immutable after publication (can delete, not edit)
- Artifact names must match actual artifact list in package

---

## Supporting Entities

### 8. VendorPayout

**Purpose**: Tracks vendor earnings and disbursement via Wise

**Fields**:
- `id`: UUID, primary key
- `vendorId`: UUID, foreign key to User (vendor)
- `period`: string, YYYY-MM (e.g., "2026-01")
- `grossEarnings`: integer, cents, total from orders
- `platformFee`: integer, cents, percent of gross (platform takes %)
- `paymentProcessingFee`: integer, cents, Stripe/Wise fees (vendor sees net)
- `netEarnings`: integer, cents, = gross - platform - processing
- `status`: enum ('pending', 'processed', 'failed', 'manual_review')
- `wiseTransferIds`: array of strings (one Wise transfer per payout, may split if threshold exceeded)
- `processedAt`: ISO timestamp, nullable
- `failureReason`: string, nullable (if status = 'failed')
- `createdAt`: ISO timestamp (generated at period end, e.g., first of month)

**Validation Rules**:
- Net earnings >= 0; if negative, payout skipped (rare edge case)
- `processedAt` set only when status = 'processed'
- Wise transfer IDs immutable (for audit trail)

---

## Relationships (ERD Summary)

```
User (1) ──> (N) AgentPackage        [vendorId]
User (1) ──> (N) Order               [buyerId]
User (1) ──> (N) Review              [buyerId]
User (1) ──> (N) VendorPayout        [vendorId]

AgentPackage (1) ──> (N) Listing     [packageId]
Listing (1) ──> (N) Order            [listingId]
Listing (1) ──> (N) Review           [listingId]

Order (1) ──> (N) Download           [orderId]
Order (1) ──> (1) License            [licenseTierId]

Review (1) ──→ Order                 [orderId, unique]
```

---

## State Machines

### Order State Machine (Critical for P1)

```
┌──────────────────────────────────────────────────────────────────┐
│ [pending]                                                        │
│ ├─ Awaiting payment capture (Stripe webhook: charge.succeeded)   │
│ ├─ Timeout: 15 min → [failed]                                   │
│ ├─ Payment capture: → [captured]                                │
│ └─ User cancel: → [failed]                                      │
└──────────────────────────────────────────────────────────────────┘
         ↓ (stripeChargeId received)
┌──────────────────────────────────────────────────────────────────┐
│ [captured]                                                       │
│ ├─ Download token issued; valid 24h                             │
│ ├─ First verified download: → [fulfilled] (mark as refund-eligible)
│ ├─ No download within 24h: token expires (can regenerate, no refund) │
│ ├─ Refund request (< 14 days, checksum unverified): → [refund_requested] → [refunded]
│ └─ Chargeback dispute (Stripe): → [chargedback] (money returned) │
└──────────────────────────────────────────────────────────────────┘
         ↓ (after first verified download)
┌──────────────────────────────────────────────────────────────────┐
│ [fulfilled]                                                      │
│ ├─ Order complete; license valid                                │
│ ├─ License expiry: [expired] (display notice to buyer)          │
│ ├─ Refund request (> 14 days): auto-rejected                    │
│ └─ Refund request (< 14 days + checksum unverified): [refund_requested] │
└──────────────────────────────────────────────────────────────────┘
```

### Listing State Machine

```
[draft] → [pending_review] → [active] ↔ [paused] → [archived]
           ↓
        [rejected]

- draft: vendor editing before submission
- pending_review: awaiting platform QA (24h SLA)
- active: public; can receive orders
- paused: vendor hid temporarily; orders blocked
- archived: no new orders; historical access retained
- rejected: vendor can edit and resubmit (rejection reason provided)
```

---

## Validation & Business Rules

### Archive Upload (AgentPackage creation)

1. **File Format**: Must be ZIP archive
2. **Size**: < 100MB (enforced by API gateway + backend)
3. **Contents**: Must include at least one of {`tools.json`, `system_prompt.md`, `README.md`}
4. **Manifest**: System auto-generates manifest (file list + SHA-256 per file)
5. **Checksum**: Compute SHA-256 of entire archive; store immutable in DB
6. **Compatibility**: At least one of ['gemini', 'gpt', 'claude'] required

### Order Checkout (Order creation)

1. **Buyer**: Must be verified user (emailVerifiedAt not null)
2. **Listing**: Must be active (status = 'active')
3. **Price**: Must match current listing price (prevent race conditions)
4. **License**: Must respect maxSeats if team/enterprise tier
5. **Idempotency**: Stripe PaymentIntent ID used to prevent duplicate charges

### Download (DownloadEvent creation)

1. **Order Status**: Must be 'captured' or 'fulfilled'
2. **Download Token**: Must be valid (expiresAt > now)
3. **Checksum**: Client sends SHA-256; system compares to archiveChecksum
4. **Audit**: IP + user agent logged; anonymized after 30 days

---

## Indexes (Performance)

```sql
-- Listing search
CREATE INDEX idx_listings_vendor_status ON listings(vendorId, status);
CREATE INDEX idx_listings_compatibility ON listings(compatibilityTags);
CREATE INDEX idx_listings_category ON listings(category);

-- Order lookups
CREATE INDEX idx_orders_buyer ON orders(buyerId, createdAt DESC);
CREATE INDEX idx_orders_stripe_intent ON orders(stripePaymentIntentId);
CREATE INDEX idx_orders_status ON orders(status, createdAt);

-- Download audit
CREATE INDEX idx_downloads_order ON downloads(orderId);
CREATE INDEX idx_downloads_checksum_verified ON downloads(orderId, checksumVerified);

-- Reviews
CREATE INDEX idx_reviews_listing ON reviews(listingId);
CREATE INDEX idx_reviews_order_unique ON reviews(orderId); -- enforce uniqueness

-- Payout tracking
CREATE INDEX idx_payouts_vendor_period ON vendorPayouts(vendorId, period);
```

---

## Migration Path (Prisma)

1. **Phase 1**: User, AgentPackage, Listing, Order, License, DownloadEvent (MVP)
2. **Phase 2**: Review, VendorPayout (analytics + vendor dashboard)
3. **Phase 3**: Advanced: UserSession, ActivityLog, AdminAudit (compliance + ops tooling)

---

## Data Retention Policy

| Entity | Retention | Rationale |
|--------|-----------|-----------|
| User | Indefinite (soft delete on request) | Account recovery; vendor history |
| Order | 7 years | Tax compliance; chargeback defense window |
| Download | 90 days (IP anonymized after 30) | Chargeback audit; GDPR compliance |
| Review | Indefinite (can be hidden/deleted by vendor) | Platform reputation; dispute resolution |
| VendorPayout | Indefinite | Accounting + tax records |
| Listing (archived) | Indefinite (read-only) | Order history traceability |

