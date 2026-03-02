---
description: "Recommendation Engine - Personalized agent suggestions based on browsing & purchase history"
module: "Discovery"
wave: 1
priority: "P1"
complexity: "High"
---

# SPEC_01_5: Recommendation Engine

## Feature Overview
Content-based and collaborative filtering to recommend similar agents. Shows "Recommended for You", "Buyers Also Purchased", "Similar to [Agent]".

## Acceptance Criteria
- AC1: "Recommended for You" section shows 5 personalized agents
- AC2: "Buyers Also Purchased" shows agents bought with viewed agent
- AC3: "Similar Agents" shows agents in same category/platform
- AC4: Recommendations update based on browsing history
- AC5: <200ms response time for recommendations
- AC6: Mobile-responsive carousel layout

## Backend Architecture
```
GET /api/v1/recommendations?listingId=uuid&limit=5

Service: RecommendationService
- getRecommendedForUser(userId): uses collaborative filtering
- getBuyersAlsoPurchased(listingId): uses co-purchase analysis
- getSimilarAgents(listingId): content-based (category, platform, vendor)
```

**Algorithm**:
- Similar Agents: Same category + same platform + similar price range
- Buyers Also Purchased: Users who viewed this also purchased X
- Recommended For You: Trending in your browsed categories

**Caching**: 24h TTL per user/listing combo

## Frontend Architecture
- `RecommendedSection.tsx`: Shows personalized recommendations
- `BuyersAlsoPurchasedSection.tsx`: Shows co-purchase data
- `useRecommendations.ts`: React Query hook with caching

## Database Schema
```prisma
model UserBrowsingHistory {
  id String @id
  userId String
  listingId String
  viewedAt DateTime @default(now())
  
  @@index([userId, viewedAt])
}

// Materialized view for co-purchase analysis
CREATE VIEW co_purchase_analysis AS
SELECT a.id, b.id, COUNT(*) as co_purchase_count
FROM orders o1
JOIN order_items oi1 ON o1.id = oi1.order_id
JOIN listings a ON oi1.listing_id = a.id
JOIN order_items oi2 ON o1.id = oi2.order_id
JOIN listings b ON oi2.listing_id = b.id
WHERE a.id != b.id
GROUP BY a.id, b.id;
```

## Testing
- Unit: Recommendation algorithm accuracy
- Integration: API response format & performance
- E2E: Recommendations render & are clickable

## Definition of Done
- [ ] Recommendation algorithms work (similar, co-purchase, personalized)
- [ ] Sections render with 5 items each
- [ ] Cache invalidates correctly (24h TTL)
- [ ] Response <200ms
- [ ] Mobile carousel responsive
- [ ] E2E tests pass

---

# SPEC_02_1: Product Detail Page

## Feature Overview
Full product page showing agent info, reviews, deployment guides, platform compatibility, version history, vendor info, purchase options.

## Acceptance Criteria
- AC1: Detail page displays title, description, vendor, price, rating
- AC2: Shows images in carousel (min 1, max 5)
- AC3: Displays platform compatibility (Gemini/ChatGPT/Claude)
- AC4: Shows license tier options with descriptions
- AC5: "Add to Cart" button is prominent CTA
- AC6: Deployment guide tab shows platform-specific setup
- AC7: Reviews tab shows paginated reviews (10 per page)
- AC8: Vendor info shows name, rating, response time

## Backend Architecture
```
GET /api/v1/listings/{id}

Response:
{
  id, title, description, price, licenseTier, supportedPlatforms,
  images: [{ url, alt }],
  vendor: { name, avgRating, responseTime, listing_count },
  reviews: [...],
  deploymentGuides: { gemini: {...}, chatgpt: {...}, claude: {...} },
  versionHistory: [...],
  files: { name, size, sha256 }
}
```

## Frontend Architecture
- `ProductDetailPage.tsx`: Main container
- `ProductImageCarousel.tsx`: Image gallery
- `DeploymentGuideTab.tsx`: Platform-specific setup
- `ReviewsTab.tsx`: Paginated reviews
- `VendorCard.tsx`: Vendor info sidebar

## Files to Create
- `backend/src/controllers/ProductController.ts`
- `frontend/src/modules/product/pages/ProductDetailPage.tsx`
- `frontend/src/modules/product/ui/ProductImageCarousel.tsx`
- `frontend/src/modules/product/ui/DeploymentGuideTab.tsx`

## Definition of Done
- [ ] All product data displays correctly
- [ ] Images carousel works (prev/next/dots)
- [ ] Tabs switch content (overview, reviews, guides)
- [ ] "Add to Cart" button functional
- [ ] Mobile responsive layout
- [ ] SEO meta tags populated
- [ ] E2E test covers full page

---

# SPEC_02_2: Deployment Guides

## Feature Overview
Platform-specific setup instructions for Gemini, ChatGPT, Claude. Shows step-by-step guides with code examples.

## Acceptance Criteria
- AC1: Three guide tabs: Gemini | ChatGPT | Claude
- AC2: Each guide shows step-by-step instructions
- AC3: Code snippets are copy-able (with highlight.js)
- AC4: Shows common errors & troubleshooting
- AC5: Guides are created by vendor during upload
- AC6: Guides render markdown with syntax highlighting

## Backend
```
Model: DeploymentGuide
- listingId, platform, stepNumber, title, content (markdown), codeExample
```

## Frontend
- `DeploymentGuideTab.tsx`: Tab switcher
- `GuideStep.tsx`: Individual step with copy button
- `CodeBlock.tsx`: Syntax-highlighted code

## Definition of Done
- [ ] Three guide tabs render correctly
- [ ] Code blocks are copy-able
- [ ] Markdown renders with proper formatting
- [ ] Mobile-friendly layout
- [ ] E2E test tabs

---

# SPEC_02_3: Reviews & Ratings

## Feature Overview
Post-purchase reviews with star ratings, vendor responses, helpful voting, recent-first sorting.

## Acceptance Criteria
- AC1: Buyers can leave 1-5 star review + text
- AC2: Reviews show author name, rating, date
- AC3: Vendors can respond to reviews
- AC4: Helpful/Unhelpful voting (no duplicate voting)
- AC5: Sort by: Recent | Helpful | Rating (High→Low)
- AC6: Paginate 10 reviews per page
- AC7: Average rating shown prominently (4.8★ 342 reviews)

## Backend
```
Model: Review
- listingId, userId, rating, text, helpful_count, created_at
Model: VendorResponse
- reviewId, vendorId, response_text, created_at
```

## Frontend
- `ReviewList.tsx`: Paginated review list
- `ReviewItem.tsx`: Individual review + vendor response
- `ReviewForm.tsx`: Post review form (stars + text)
- `RatingDistribution.tsx`: 1-5 star breakdown chart

## Definition of Done
- [ ] Can post review with rating & text
- [ ] Reviews paginate (10/page)
- [ ] Sort options work
- [ ] Vendor responses display
- [ ] Helpful voting works
- [ ] E2E: post review, verify appears

---

# SPEC_02_4: License Information

## Feature Overview
Display license tiers (Free Trial, Monthly, Annual, One-Time), seat limits, refund policy, terms.

## Acceptance Criteria
- AC1: Show all available license tiers with pricing
- AC2: Display seat limits (single-user, team, unlimited)
- AC3: Show license duration (trial 7 days, monthly, yearly, perpetual)
- AC4: Display refund policy (14-day full refund)
- AC5: Show license terms & restrictions
- AC6: Comparison table for tiers
- AC7: "Learn More" links to help docs

## Frontend
- `LicenseComparison.tsx`: Tier comparison table
- `LicenseCard.tsx`: Individual tier details
- `RefundPolicyBanner.tsx`: Clear refund terms

## Definition of Done
- [ ] All tiers display with pricing
- [ ] Seat limits clear
- [ ] Refund policy visible
- [ ] Mobile responsive table
- [ ] E2E: click tier → checkout with correct tier

---

# SPEC_02_5: One-Click Checkout

## Feature Overview
Streamlined checkout: guest or login, payment with Stripe, confirm and go to order.

## Acceptance Criteria
- AC1: Guest checkout option (no account required)
- AC2: Login for existing customers
- AC3: Save card for future purchases (optional)
- AC4: Billing address capture (optional for digital goods)
- AC5: Apply coupon code (if applicable)
- AC6: Display order summary: item, price, tax, total
- AC7: Stripe Elements payment form
- AC8: Order confirmation page with download link

## Backend
```
POST /api/v1/checkout { listing_id, license_tier, stripe_token }
POST /api/v1/orders (creates order, triggers download link generation)
```

## Frontend
- `CheckoutPage.tsx`: Main checkout container
- `PaymentForm.tsx`: Stripe Elements integration
- `OrderSummary.tsx`: Item, price, tax breakdown
- `OrderConfirmation.tsx`: Success page with download link

## Definition of Done
- [ ] Stripe integration works (test mode)
- [ ] Order created on successful payment
- [ ] Confirmation page with download link
- [ ] Email receipt sent
- [ ] E2E: add to cart → checkout → payment → confirmation

---

# SPEC_03_1: Shopping Cart

## Feature Overview
Session-based cart (no account required). View items, update quantities, remove, proceed to checkout.

## Acceptance Criteria
- AC1: Add item to cart from detail page
- AC2: Display cart summary (item count, total price)
- AC3: View cart page shows all items
- AC4: Change license tier before checkout
- AC5: Remove items from cart
- AC6: Save cart to localStorage (persist across sessions)
- AC7: Show tax estimate (if applicable)
- AC8: "Continue Shopping" & "Proceed to Checkout" buttons

## Frontend
- `Cart.tsx`: Zustand store with cart state
- `CartPage.tsx`: Full cart view
- `CartItem.tsx`: Individual item (edit tier, remove)
- `CartSummary.tsx`: Sidebar with total

## Definition of Done
- [ ] Add to cart works
- [ ] Cart persists in localStorage
- [ ] Remove item works
- [ ] Cart summary updates correctly
- [ ] E2E: add multiple items → view cart → remove item

---

# SPEC_03_2: Checkout Flow

## Feature Overview
Multi-step checkout: Review Cart → Payment Info → Confirm Order.

## Acceptance Criteria
- AC1: Step 1: Review items (change tier, remove)
- AC2: Step 2: Payment info (guest or login)
- AC3: Step 3: Confirm & submit
- AC4: Progress indicator (Step 1/2/3)
- AC5: Can go back to previous step
- AC6: Form validation on each step
- AC7: Submit triggers order creation
- AC8: <5s total checkout time

## Frontend
- `CheckoutFlow.tsx`: Multi-step container with validation
- `CartReviewStep.tsx`: Step 1
- `PaymentStep.tsx`: Step 2 with Stripe
- `ConfirmStep.tsx`: Step 3 summary

## Definition of Done
- [ ] All steps render correctly
- [ ] Validation works on each step
- [ ] Can navigate back/forward
- [ ] Progress indicator accurate
- [ ] E2E: complete full flow

---

# SPEC_03_3: Order Confirmation

## Feature Overview
Success page after purchase. Shows order details, download link, license key, receipt, next steps.

## Acceptance Criteria
- AC1: Display "Order Confirmed" with order number
- AC2: Show items purchased with license tier
- AC3: Display download link (valid 24 hours)
- AC4: Show license key / activation code
- AC5: Email receipt sent to buyer
- AC6: Display estimated delivery time
- AC7: "View Order" link to order history
- AC8: Print receipt option

## Backend
```
POST /api/v1/orders/{orderId}/send-confirmation-email
GET /api/v1/orders/{orderId} (includes download_url, license_key)
```

## Frontend
- `OrderConfirmationPage.tsx`: Success page
- `DownloadCard.tsx`: Download link + expiry
- `LicenseKeyCard.tsx`: License key display

## Definition of Done
- [ ] Order details display correctly
- [ ] Download link generates
- [ ] License key displayed
- [ ] Email receipt sent
- [ ] Print works
- [ ] E2E: verify confirmation page

---

# SPEC_03_4: Download Manager

## Feature Overview
Download purchased agents. Show progress, checksum verification, retry on failure, keep history.

## Acceptance Criteria
- AC1: Download button triggers ZIP download
- AC2: Show file size & estimated time
- AC3: Display checksum (SHA-256) for verification
- AC4: Show download progress bar
- AC5: Retry if download fails
- AC6: Verify checksum after download
- AC7: Show verification status (✓ Verified | ⚠ Failed)
- AC8: Keep download history in "My Downloads"

## Frontend
- `DownloadButton.tsx`: Initiates download
- `DownloadProgress.tsx`: Progress bar with stats
- `ChecksumVerification.tsx`: Client-side SHA-256 check

## Backend
```
GET /api/v1/orders/{orderId}/download (returns ZIP stream)
GET /api/v1/listings/{id}/checksum (returns sha256)
```

## Definition of Done
- [ ] Download initiates on button click
- [ ] Progress bar shows
- [ ] Checksum verification works
- [ ] Retry logic functional
- [ ] E2E: download, verify checksum passes

---

# SPEC_03_5: Order History & Re-Download

## Feature Overview
"My Purchases" page showing past orders, re-download capability, license info, expiry dates.

## Acceptance Criteria
- AC1: Display paginated order list (most recent first)
- AC2: Show: order date, item, price, license tier, status
- AC3: Re-download link for each order (if license active)
- AC4: Show license expiry date (if applicable)
- AC5: View full order details / receipt
- AC6: Search/filter by agent name or date
- AC7: License renewal option (if expired)
- AC8: Mobile-responsive table layout

## Frontend
- `MyPurchasesPage.tsx`: Order history page
- `OrderList.tsx`: Paginated table
- `OrderRow.tsx`: Individual order with actions

## Backend
```
GET /api/v1/users/orders?limit=20&offset=0
GET /api/v1/users/orders/{orderId}
```

## Definition of Done
- [ ] Orders display with all info
- [ ] Re-download works
- [ ] Pagination functional
- [ ] Search/filter works
- [ ] Mobile responsive
- [ ] E2E: view order history, re-download

---

