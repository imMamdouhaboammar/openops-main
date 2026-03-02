# Quick Start: OpenOps Agents Fleet Marketplace

**Purpose**: End-to-end walkthrough of P1 and P2 user journeys; validates spec, data model, and API contracts
**Date**: 2026-01-12
**Audience**: Developers, QA, product stakeholders

---

## Prerequisites

- Node.js 20+ LTS
- PostgreSQL 16+ running locally or Docker
- Stripe test account (free) + API keys
- Docker (optional, for services)

---

## Phase 1: User Story 1 (Buyer Journey) - P1

### Setup: Seed Data & Database

```bash
# Clone repository
git clone <openops-repo>
cd openops

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Initialize database (create tables from schema)
cd ../backend
npm run db:migrate:dev  # Runs Prisma migrations

# Seed test data (listings, vendors, etc.)
npm run db:seed  # Populates Listings, Users (vendors), AgentPackages
```

**Expected Output**: Database initialized with:
- 1 vendor user (`vendor@example.com`)
- 5 test listings (legal, sales, support, analytics, creative)
- 3 compatible platforms per listing (Gemini, GPT, Claude)

---

### Step 1: Buyer Signup & Login

**Frontend**: `http://localhost:3000`

```
1. Click "Sign Up" (top-right)
2. Fill form:
   - Email: buyer@example.com
   - Password: SecurePass123!
   - First Name: John
   - Last Name: Doe
   - Locale: English
   - Role: Buyer (default)
3. Click "Sign Up"
4. Check email (in dev: fake email logs to console); click verification link
5. You're now logged in ✅
```

**Backend API** (alternative, for testing):
```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "locale": "en",
    "role": ["buyer"]
  }'

# Response:
# {
#   "id": "uuid-...",
#   "email": "buyer@example.com",
#   "emailVerifiedAt": "2026-01-12T10:00:00Z",
#   ...
# }
```

---

### Step 2: Browse Marketplace

**Frontend**: Authenticated; navigate to "Marketplace"

```
1. See listings grid (price, title, compatibility badges)
2. Try filters:
   - Category: "Legal" → shows legal agents
   - Compatibility: Check "Gemini" → filters listings
   - Price: Set max $50 → shows listings ≤ $50
   - Sort: Click "Popular" → re-sorts by download count
3. Search: Type "Legal" in search bar → full-text search
```

**Backend API** (alternative):
```bash
curl http://localhost:3000/api/v1/listings?category=legal&compatibility[]=gemini&sort=popular \
  -H "Authorization: Bearer <TOKEN>"

# Response:
# {
#   "data": [
#     {
#       "id": "uuid-...",
#       "title": "Legal Ops Agent v1.0",
#       "slug": "legal-ops-agent-v1",
#       "price": 4999,  # cents = $49.99
#       "rating": 4.5,
#       "ratingCount": 12,
#       "compatibilityTags": ["gemini", "gpt", "claude"],
#       "status": "active"
#     },
#     ...
#   ],
#   "pagination": { "page": 1, "limit": 20, "total": 5, "pages": 1 }
# }
```

---

### Step 3: View Listing Details & Guides

**Frontend**: Click on a listing (e.g., "Legal Ops Agent")

```
1. See full details:
   - Title, description, version
   - Price ($49.99)
   - Tier: "Personal"
   - Artifacts included: tools.json, system_prompt.md, README.md
   - Reviews (if any)
2. Click "Deployment Guides" tab
3. Select platform: "Gemini" → see step-by-step guide
4. Checklist shows:
   - ✅ tools.json included
   - ✅ system_prompt.md included
   - ⚠️ Claude not compatible (grayed out)
```

**Backend API** (alternative):
```bash
curl http://localhost:3000/api/v1/listings/{id} \
  -H "Authorization: Bearer <TOKEN>"

# Response includes:
# {
#   "title": "Legal Ops Agent v1.0",
#   "artifacts": ["tools.json", "system_prompt.md", "README.md"],
#   "license": { "tier": "personal", "durationDays": -1 },
#   "reviews": [ { "rating": 5, "reviewText": "Excellent!" } ]
# }
```

---

### Step 4: Purchase (Checkout)

**Frontend**: Click "Buy Now" on listing

```
1. See order summary:
   - Product: "Legal Ops Agent v1.0"
   - Price: $49.99
   - License: Personal
   - Total: $49.99
2. Click "Proceed to Checkout"
3. See payment form (Stripe test card inputs)
4. Enter:
   - Card: 4242 4242 4242 4242 (Stripe test success)
   - Expiry: 12/25
   - CVC: 123
5. Click "Pay $49.99"
6. See loading spinner (payment processing)
7. Payment succeeds → redirected to order confirmation ✅
```

**Backend API** (alternative):
```bash
TOKEN="<bearer-token>"

# Create order (pending payment)
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "listingId": "uuid-...",
    "licenseTierId": "uuid-..."
  }'

# Response:
# {
#   "id": "order-uuid-...",
#   "status": "pending",
#   "priceUsd": 4999,
#   "stripePaymentIntentId": "pi_...",
#   "expiresAt": "2026-01-12T10:15:00Z"
# }

# Stripe webhook (backend receives):
# - event: "charge.succeeded"
# - order status updates to "captured"
```

---

### Step 5: Download Package

**Frontend**: Order confirmation page

```
1. See "Download Package" button
2. Click → see loading spinner
3. Download link issued → auto-download starts
4. File: `legal-ops-agent-v1.0.0.zip` (e.g., 8.5 MB)
5. System shows:
   - Checksum: sha256 = abc123...
   - Link expires in 24 hours
   - Download verified ✅
```

**Backend API** (alternative):
```bash
curl -X POST http://localhost:3000/api/v1/orders/{orderId}/download \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "clientVersion": "1.0.0" }'

# Response:
# {
#   "downloadUrl": "https://s3.openops.dev/archive.zip?Signature=...",
#   "checksum": "abc123def456...",
#   "checksumAlgorithm": "sha256",
#   "expiresAt": "2026-01-13T10:00:00Z"
# }
```

---

### Step 6: Verify Checksum & Extract

**Client (local machine)**:
```bash
# Download complete; verify integrity
sha256sum legal-ops-agent-v1.0.0.zip
# Output: abc123def456... legal-ops-agent-v1.0.0.zip ✅ (matches checksum from API)

# Extract
unzip legal-ops-agent-v1.0.0.zip -d legal-ops-agent

# View contents
ls legal-ops-agent/
# Output:
# - tools.json
# - system_prompt.md
# - README.md
# - compatibility.md
# - examples/
```

---

## Phase 2: User Story 2 (Vendor Journey) - P2

### Step 1: Vendor Signup

**Frontend**: Sign up as vendor

```
1. Click "Sign Up" → fill form
2. Email: vendor2@example.com
3. Role: Check "Vendor" (in addition to Buyer, or standalone)
4. Verify email
5. Redirected to "Vendor Dashboard"
```

---

### Step 2: KYC Verification (Simplified for MVP)

**Frontend**: Vendor Dashboard → "Profile" tab

```
1. See KYC status: "Pending"
2. Fill form:
   - Legal name: Jane Smith
   - Country: United States
   - Tax ID: 12-3456789
3. Upload government ID (PDF)
4. Accept Terms
5. Click "Submit KYC"
6. See: "Verification in progress (1-3 days)"
7. (Simulated approval after ~5 min in dev env)
```

---

### Step 3: Upload Agent Package

**Frontend**: Vendor Dashboard → "Upload Package" tab

```
1. Prepare ZIP file:
   - legal-ops-agent-v2.0.0.zip (< 100MB)
   - Contains: tools.json, system_prompt.md, README.md
2. Click "Choose File" → select ZIP
3. Fill form:
   - Name: "Legal Ops Agent"
   - Version: "2.0.0"
   - Compatibility: Check Gemini, GPT, Claude
   - Category: Legal
   - Description: "Powerful legal contract analyzer..."
4. Click "Upload & Validate"
5. See spinner (validation in progress)
6. Validation succeeds:
   - ✅ Archive integrity verified
   - ✅ Artifacts found: tools.json, system_prompt.md, README.md
   - ✅ Checksum: sha256 = def456...
7. Next: Create Listing
```

**Backend API** (alternative):
```bash
TOKEN="<vendor-bearer-token>"

# Upload package (multipart/form-data)
curl -X POST http://localhost:3000/api/v1/vendors/upload-package \
  -H "Authorization: Bearer $TOKEN" \
  -F "archive=@legal-ops-agent-v2.0.0.zip" \
  -F "name=Legal Ops Agent" \
  -F "version=2.0.0" \
  -F "compatibility=gemini" \
  -F "compatibility=gpt" \
  -F "compatibility=claude" \
  -F "category=legal" \
  -F "description=Powerful legal contract analyzer..."

# Response:
# {
#   "packageId": "pkg-uuid-...",
#   "status": "active",
#   "artifacts": ["tools.json", "system_prompt.md", "README.md"],
#   "checksum": "def456abc123..."
# }
```

---

### Step 4: Create Listing

**Frontend**: After successful upload, redirected to "Create Listing"

```
1. Pre-populated from upload:
   - Package: "Legal Ops Agent"
   - Version: "2.0.0"
   - Compatibility: Gemini, GPT, Claude
2. Enter marketing details:
   - Title: "Enterprise Legal Ops Agent"
   - Description: (full marketing copy)
   - Price: $59.99
   - Tier: "Personal"
   - Tags: legal, contract, automation, ai
3. Upload featured image (cover art)
4. Click "Create Listing"
5. See: "Listing created! Status: draft"
6. Dashboard shows new listing in "My Listings"
```

**Backend API** (alternative):
```bash
curl -X POST http://localhost:3000/api/v1/listings \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "pkg-uuid-...",
    "title": "Enterprise Legal Ops Agent",
    "description": "Full marketing copy...",
    "price": 5999,
    "tier": "personal",
    "tags": ["legal", "contract", "automation"]
  }'

# Response:
# {
#   "id": "list-uuid-...",
#   "status": "draft",
#   "title": "Enterprise Legal Ops Agent",
#   "slug": "enterprise-legal-ops-agent",
#   "price": 5999
# }
```

---

### Step 5: Submit for Review & Publish

**Frontend**: Vendor Dashboard → My Listings

```
1. See new listing: "Enterprise Legal Ops Agent" (status: draft)
2. Click "Review & Publish"
3. See checklist:
   - ✅ Title provided
   - ✅ Description provided
   - ✅ Price set ($59.99)
   - ✅ Package validated
   - ✅ Image uploaded
4. Click "Submit for Review"
5. See: "Listing submitted! Review in progress (expected: 1-2 hours)"
6. (Simulated approval after ~10 min in dev env)
7. Listing status changes to "active"
8. Now visible in public Marketplace! ✅
```

---

## Phase 3: End-to-End Test (Buyer Purchases Vendor's Listing)

### Test Scenario: Buyer2 Purchases Vendor2's Listing

```bash
# In browser tab 1:
# - Logged in as buyer2@example.com
# - Navigate to Marketplace
# - Search: "Enterprise Legal Ops Agent"
# - See new listing from vendor2
# - Click "Buy Now"
# - Complete checkout ($59.99)
# - Download package
# - ✅ Order appears in buyer2's "My Orders"

# In browser tab 2:
# - Logged in as vendor2@example.com
# - Navigate to Vendor Dashboard → "Sales"
# - See new sale: $59.99 from buyer2
# - Revenue: $59.99 (gross)
# - Platform fee (20%): $11.99
# - Net earnings: $47.00
# - Status: "Pending" (will process end of month)
```

---

## Validation Checklist (QA)

### User Story 1: Browse, Purchase, Download (P1)

- [ ] Buyer can signup and verify email
- [ ] Listings visible with filters (category, compatibility, price)
- [ ] Search works (full-text on title + description)
- [ ] Listing details show artifacts and platform guides
- [ ] Checkout completes successfully with Stripe test card
- [ ] Download link issued within 10s of payment capture
- [ ] Checksum verification works (SHA-256 match)
- [ ] Refund request works (< 14 days, checksum unverified)
- [ ] Archive extractable with correct contents

### User Story 2: Vendor Upload, Publish (P2)

- [ ] Vendor can signup with dual role (buyer + vendor)
- [ ] KYC form collects required fields
- [ ] Archive upload validates structure (requires tools.json, system_prompt.md, or README.md)
- [ ] Package checksum calculated correctly
- [ ] Listing creation succeeds with all metadata
- [ ] Status transitions: draft → pending_review → active
- [ ] Listing appears in Marketplace after approval
- [ ] Vendor dashboard shows sales and revenue

### User Story 3: Deployment Guides (P3 - Manual for Now)

- [ ] Platform selection shows correct artifacts for each (Gemini/GPT/Claude)
- [ ] Checklist items accurate (required vs. optional artifacts)
- [ ] Guides render correctly in both EN and AR locales

---

## Troubleshooting

### Database Issues
```bash
# Reset database (dev only!)
npm run db:reset

# Check connection
npm run db:status

# View migrations
npm run db:migrate:status
```

### Stripe Webhook Issues
```bash
# Test webhook locally (install Stripe CLI)
stripe listen --forward-to localhost:3000/webhooks/stripe

# Simulate event
stripe trigger charge.succeeded
```

### Download Link Expired
```bash
# Regenerate download link (on order details page)
# Click "Request New Download Link"
# New link valid 24h
```

---

## Next: Planning Phase Completion

✅ Phase 0: Research complete (3 clarifications resolved)
✅ Phase 1: Data model + API contracts + quickstart documented
⏭️ Phase 2: Tasks generation via `/speckit.tasks` command
⏭️ Phase 3: Implementation (backend + frontend scaffold)

**Ready to proceed?** Run:
```bash
./speckit.tasks 002-agents-fleet-marketplace
```

---

## Support

- Architecture docs: [architecture.md](../../architecture.md)
- API Docs: [contracts/api.openapi.yaml](./contracts/api.openapi.yaml)
- Data model: [data-model.md](./data-model.md)
- Research: [research.md](./research.md)
