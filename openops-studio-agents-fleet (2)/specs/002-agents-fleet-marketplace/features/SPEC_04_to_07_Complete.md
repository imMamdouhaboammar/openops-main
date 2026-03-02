---
description: "Vendor Storefront Module - Dashboard, Agent Management, Metadata, Guides, Bulk Upload"
module: "Vendor Storefront"
wave: 2
priority: "P2"
complexity: "High"
---

# SPEC_04_1 to 04_5: Vendor Storefront Suite

## SPEC_04_1: Vendor Dashboard

### Feature Overview
KPI dashboard showing sales, downloads, revenue, reviews, recent activity, alerts.

### Acceptance Criteria
- AC1: Display total sales (this month vs lifetime)
- AC2: Show total revenue & earnings
- AC3: Display download count trends (chart)
- AC4: Show average rating & review count
- AC5: Display recent sales (last 10 orders)
- AC6: Show alerts (low stock, negative reviews, pending approval)
- AC7: Quick links to popular agents
- AC8: Responsive layout (mobile-friendly)

### Backend
```
GET /api/v1/vendor/dashboard
Response:
{
  totalSales: number,
  totalRevenue: Decimal,
  recentOrders: [],
  downloadTrend: { date, count }[],
  alerts: [],
  topProducts: []
}
```

### Frontend
- `VendorDashboard.tsx`: Main container
- `KPICard.tsx`: Sales, revenue, downloads cards
- `RevenueChart.tsx`: Line chart with recharts
- `RecentOrdersTable.tsx`: Last 10 orders
- `AlertsBanner.tsx`: Important notifications

### Definition of Done
- [ ] KPIs display correctly
- [ ] Chart renders with data
- [ ] Recent orders table works
- [ ] Mobile responsive
- [ ] E2E: dashboard loads, data visible

---

## SPEC_04_2: Agent Management

### Feature Overview
List all my agents, view status, edit metadata, delete, bulk operations (archive, publish).

### Acceptance Criteria
- AC1: Display table of my agents (status, downloads, rating, revenue)
- AC2: Bulk checkbox select & actions
- AC3: Edit agent metadata (inline or modal)
- AC4: Archive/Unarchive agent
- AC5: Delete agent (with confirmation)
- AC6: Filter by status (active, draft, archived)
- AC7: Sort by: name, downloads, revenue, rating
- AC8: Pagination (50 per page)

### Frontend
- `AgentManagementPage.tsx`: Main page
- `AgentTable.tsx`: Table with checkboxes & actions
- `AgentRow.tsx`: Individual agent row with edit/delete
- `BulkActionsBar.tsx`: Archive/Publish/Delete selected

### Files to Create
- `frontend/src/modules/vendor/pages/AgentManagementPage.tsx`
- `frontend/src/modules/vendor/ui/AgentTable.tsx`

### Definition of Done
- [ ] Table displays all agents
- [ ] Bulk select works
- [ ] Actions functional (edit, delete, archive)
- [ ] Sorting & filtering work
- [ ] Pagination works
- [ ] E2E: select agents, archive, verify

---

## SPEC_04_3: Metadata Editor

### Feature Overview
Edit agent metadata: title, description, category, price, license tier, platform compatibility, tags.

### Acceptance Criteria
- AC1: Edit form displays with current values
- AC2: Title field (max 100 chars)
- AC3: Description (markdown, max 2000 chars)
- AC4: Category dropdown (single select)
- AC5: Price field (currency, 2 decimals)
- AC6: License tier checkboxes (select 1+)
- AC7: Platform compatibility multi-select
- AC8: Tags input (auto-complete from popular tags)
- AC9: Save changes to database
- AC10: Real-time preview option

### Frontend
- `MetadataEditor.tsx`: Form component
- `MarkdownPreview.tsx`: Live preview of description
- `TagInput.tsx`: Autocomplete tags

### Backend
```
PATCH /api/v1/listings/{id}
Body: { title, description, category, price, licenseTiers, platforms, tags }
```

### Definition of Done
- [ ] Form displays correctly
- [ ] All fields editable
- [ ] Validation works (title, price, etc.)
- [ ] Save persists to DB
- [ ] E2E: edit metadata, save, verify on detail page

---

## SPEC_04_4: Deployment Guide Editor

### Feature Overview
Create platform-specific guides: Gemini, ChatGPT, Claude. Step-by-step with code examples.

### Acceptance Criteria
- AC1: Three tab forms (Gemini, ChatGPT, Claude)
- AC2: Each guide has steps (add/remove/reorder)
- AC3: Step has: title, description (markdown), code example
- AC4: Code syntax highlighting (JSON, Python, JS)
- AC5: Live preview of markdown
- AC6: Save guides to database
- AC7: Reorder steps with drag-drop

### Frontend
- `DeploymentGuideEditor.tsx`: Tab form
- `GuideStep.tsx`: Individual step editor
- `CodeEditor.tsx`: Syntax highlighting with CodeMirror

### Backend
```
PATCH /api/v1/listings/{id}/guides
Body: { platform, steps: [{ title, description, code }] }
```

### Definition of Done
- [ ] Tabs switch between platforms
- [ ] Add/remove steps works
- [ ] Drag-drop reorder works
- [ ] Code highlighting displays
- [ ] Save persists guides
- [ ] E2E: create guide, verify on product detail page

---

## SPEC_04_5: Bulk Upload & Version Management

### Feature Overview
Upload new versions of agent ZIP, manage version history, rollback to previous version.

### Acceptance Criteria
- AC1: Drag-drop upload for new ZIP file
- AC2: Auto-validate ZIP structure (config.json, files)
- AC3: Display checksum (SHA-256)
- AC4: Extract & display manifest (files, size)
- AC5: Show version history (v1.0, v1.1, v1.2, etc.)
- AC6: Rollback to previous version (confirmation)
- AC7: Show upload date & user for each version
- AC8: File size limit 100MB with clear error

### Frontend
- `BulkUploadForm.tsx`: Drag-drop zone
- `FileValidation.tsx`: Real-time validation feedback
- `VersionHistory.tsx`: Version list with rollback
- `ChecksumDisplay.tsx`: SHA-256 hash

### Backend
```
POST /api/v1/listings/{id}/versions (upload new ZIP)
GET /api/v1/listings/{id}/versions (list history)
POST /api/v1/listings/{id}/versions/{versionId}/rollback (restore previous)
```

### Definition of Done
- [ ] Drag-drop upload works
- [ ] ZIP validation works
- [ ] Version history displays
- [ ] Rollback functional
- [ ] Checksum calculated correctly
- [ ] E2E: upload file, verify version created

---

# SPEC_05_1 to 05_5: Vendor Analytics & Payouts Suite

## SPEC_05_1: Revenue Analytics Dashboard

### Feature Overview
Revenue trends, breakdown by agent/license tier, daily/weekly/monthly views, CSV export.

### Acceptance Criteria
- AC1: Line chart: revenue over time (daily/weekly/monthly)
- AC2: Filter by date range (picker)
- AC3: Breakdown pie chart: revenue by agent
- AC4: Breakdown pie chart: revenue by license tier
- AC5: Revenue stats: total, avg, forecast
- AC6: CSV export of revenue data
- AC7: Mobile-responsive charts

### Frontend
- `RevenueAnalytics.tsx`: Main dashboard
- `RevenueChart.tsx`: Line chart with date range
- `RevenueByCategoryChart.tsx`: Pie charts

### Backend
```
GET /api/v1/vendor/analytics/revenue?startDate=2026-01-01&endDate=2026-01-31
Response: { daily: [], byAgent: [], byTier: [], totalRevenue, avgRevenue }
```

### Definition of Done
- [ ] Charts render correctly
- [ ] Date filter works
- [ ] CSV export works
- [ ] Mobile responsive
- [ ] E2E: view analytics, change date range, export

---

## SPEC_05_2: Download Analytics

### Feature Overview
Download trends, geography, popular times, by-agent breakdown.

### Acceptance Criteria
- AC1: Download count line chart (time series)
- AC2: Filter by agent & date range
- AC3: Heatmap: downloads by day of week & hour
- AC4: Geographic map: downloads by country
- AC5: Top performing agents (table)
- AC6: CSV export

### Frontend
- `DownloadAnalytics.tsx`: Main dashboard
- `DownloadChart.tsx`: Line chart
- `HeatmapChart.tsx`: Day/hour heatmap
- `GeoMap.tsx`: World map with colors

### Backend
```
GET /api/v1/vendor/analytics/downloads?listingId=optional&startDate=...
```

### Definition of Done
- [ ] Charts render with data
- [ ] Filters work
- [ ] Geo map displays
- [ ] Mobile responsive
- [ ] E2E: view download analytics

---

## SPEC_05_3: Buyer Geography Analytics

### Feature Overview
Where buyers are located (country/region), timezone distribution, purchase trends by region.

### Acceptance Criteria
- AC1: World map with buyer locations (heatmap)
- AC2: List top 10 countries (table)
- AC3: Timezone distribution chart
- AC4: Filter by date range
- AC5: Show average revenue per region
- AC6: Identify untapped markets

### Frontend
- `BuyerGeoAnalytics.tsx`: Main dashboard
- `GeoMap.tsx`: Interactive world map

### Definition of Done
- [ ] Map displays correctly
- [ ] Top countries table works
- [ ] Mobile responsive
- [ ] E2E: view geo analytics

---

## SPEC_05_4: Rating & Review Analysis

### Feature Overview
Average rating over time, review sentiment analysis, top reviews, problem areas.

### Acceptance Criteria
- AC1: Rating trend chart (over time)
- AC2: Rating distribution pie chart (1-5 stars)
- AC3: Average rating card (prominently displayed)
- AC4: Recent reviews table (sortable)
- AC5: Sentiment analysis: positive/neutral/negative percentages
- AC6: Identify problem patterns from reviews

### Frontend
- `RatingAnalytics.tsx`: Main dashboard
- `RatingChart.tsx`: Line chart
- `RatingDistribution.tsx`: Pie chart
- `ReviewTable.tsx`: Sortable reviews list

### Definition of Done
- [ ] Charts render correctly
- [ ] Review table sortable
- [ ] Sentiment analysis visible
- [ ] Mobile responsive
- [ ] E2E: view rating analytics

---

## SPEC_05_5: Payout Management

### Feature Overview
View earnings, schedule payouts via Wise, track payout history, tax documentation.

### Acceptance Criteria
- AC1: Display available balance (ready to withdraw)
- AC2: Display pending balance (30-day hold)
- AC3: Withdrawal history (table with dates, amounts, status)
- AC4: "Withdraw" button (requires Wise account setup)
- AC5: Integration with Wise API for payouts
- AC6: Tax form generation (1099 for US, etc.)
- AC7: Payout frequency options (weekly, bi-weekly, monthly)

### Frontend
- `PayoutManagement.tsx`: Main page
- `BalanceCards.tsx`: Available & pending balance
- `WithdrawModal.tsx`: Payout form (amount, bank details)
- `PayoutHistory.tsx`: Table of past payouts

### Backend
```
POST /api/v1/vendor/withdraw { amount, currency }
Integrates with Wise API to initiate transfer

GET /api/v1/vendor/payouts (history)
```

### Definition of Done
- [ ] Balance displays correctly
- [ ] Withdrawal form works
- [ ] Wise API integration functional
- [ ] Payout history displays
- [ ] Tax forms can be generated
- [ ] E2E: initiate withdrawal

---

# SPEC_06_1 to 06_5: Trust & Safety Suite

## SPEC_06_1: User Ratings & Vendor Reputation

### Feature Overview
Vendor rating system (separate from product rating). Seller badges, response times, dispute rates.

### Acceptance Criteria
- AC1: Vendor rating (1-5 stars) displayed on profile
- AC2: "Trusted Vendor" badge (rating ≥4.5, ≥50 sales)
- AC3: Response time metric (avg hours to respond to inquiries)
- AC4: Dispute rate percentage
- AC5: Product count and total sales visible
- AC6: Show badges on all vendor listings

### Frontend
- `VendorCard.tsx`: Shows vendor rating & badges
- `VendorProfile.tsx`: Full vendor profile page

### Backend
```
Model: Vendor
- id, name, avgRating, responseTime, disputeRate, isTrusted, totalSales

Calculated fields:
- avgRating = AVG(order.rating) where vendor owns listing
- responseTime = AVG(support_ticket.response_time_hours)
- disputeRate = (disputed_orders / total_orders) * 100
```

### Definition of Done
- [ ] Vendor rating displays correctly
- [ ] Badges appear on listings
- [ ] Profile page shows all metrics
- [ ] E2E: view vendor profile, verify badges

---

## SPEC_06_2: KYC Verification

### Feature Overview
Know Your Customer verification for vendors. Document upload, auto-verification via Stripe, compliance.

### Acceptance Criteria
- AC1: Vendor uploads ID (passport/driver's license)
- AC2: Vendor confirms business details
- AC3: Auto-verification via Stripe Identity API
- AC4: Manual review option for failed verifications
- AC5: Verification status displayed on dashboard
- AC6: Cannot publish without KYC approval
- AC7: Compliance reporting for regulatory requirements

### Frontend
- `KYCForm.tsx`: Document upload & info form
- `KYCStatus.tsx`: Display verification status

### Backend
```
Model: KYCVerification
- vendorId, status (pending, verified, failed)
- documentUrl, verificationId (from Stripe)

Integration: Stripe Identity API
- POST /v1/identity/verification_sessions
- Handle callback for verification status
```

### Definition of Done
- [ ] KYC form works
- [ ] Stripe Identity integration functional
- [ ] Status updates correctly
- [ ] Publishing blocked until verified
- [ ] E2E: upload ID, verify KYC completes

---

## SPEC_06_3: Refund Dispute Resolution

### Feature Overview
Buyer initiates refund, vendor can respond, disputes are escalated to support team.

### Acceptance Criteria
- AC1: Buyer can request refund within 14 days
- AC2: Reason for refund (dropdown: didn't work, no longer needed, etc.)
- AC3: Vendor receives notification & can respond
- AC4: Vendor can offer partial refund or explanation
- AC5: If unresolved, escalate to support team
- AC6: Support team can force refund/keep funds
- AC7: Audit log of all dispute actions

### Frontend
- `RefundRequestForm.tsx`: Buyer initiates refund
- `RefundDispute.tsx`: View dispute status

### Backend
```
Model: RefundDispute
- orderId, status (requested, vendor_response, resolved)
- reason, buyerNotes, vendorResponse, resolution
- timeline of events

Workflow:
1. Buyer requests refund (within 14d)
2. Vendor has 48h to respond
3. If no response → auto-approve refund
4. If vendor responds → buyer decides
5. If buyer denies vendor response → escalate to support
```

### Definition of Done
- [ ] Refund request form works
- [ ] Vendor notifications sent
- [ ] Dispute timeline displays
- [ ] Auto-refund timer works
- [ ] E2E: request refund, verify process

---

## SPEC_06_4: Content Moderation Queue

### Feature Overview
Admin review queue for new listings, flagged content, copyright/abuse reports.

### Acceptance Criteria
- AC1: Queue shows pending approvals (new listings, updated versions)
- AC2: Display listing preview (images, description, vendor)
- AC3: Approve or Reject with reason
- AC4: Flag content (copyright, malware, inappropriate)
- AC5: Show flagged items separately (auto-purge after 30d)
- AC6: Audit log of all moderation actions
- AC7: Vendor notification on approval/rejection

### Frontend (Admin)
- `ModerationQueue.tsx`: Queue of pending items
- `ListingPreview.tsx`: Preview for approval

### Backend
```
Model: ModerationItem
- listingId, status (pending, approved, rejected, flagged)
- reason, moderatorNotes, createdAt

Triggers:
- New listing created → add to queue
- Flagged by user → move to flagged section
```

### Definition of Done
- [ ] Queue displays correctly
- [ ] Approve/Reject works
- [ ] Notifications sent to vendor
- [ ] Audit log records actions
- [ ] E2E: approve listing, verify live

---

## SPEC_06_5: Chargeback Prevention

### Feature Overview
Fraud detection, 3D Secure, payment velocity checks, blacklist management.

### Acceptance Criteria
- AC1: Stripe Radar integration (fraud detection)
- AC2: 3D Secure for high-risk transactions
- AC3: Velocity checks (max 5 orders per card per day)
- AC4: Blacklist management (blocked cards, emails, IPs)
- AC5: Alert on suspicious activity
- AC6: Manual review for high-risk orders
- AC7: Chargeback dispute handling

### Backend
```
Integration: Stripe Radar
- All payments processed through Stripe (handles fraud)
- 3D Secure challenge on risky txns
- Declined/flagged payments auto-rejected

Monitoring:
- Track chargeback rate (<2%)
- Alert if rate exceeds threshold
```

### Definition of Done
- [ ] Stripe Radar integrated
- [ ] 3D Secure challenges appear
- [ ] Velocity checks work
- [ ] High-risk orders flagged
- [ ] Chargeback rate tracked
- [ ] E2E: test payment flow with fraud checks

---

# SPEC_07_1 to 07_4: Localization & Accessibility Suite

## SPEC_07_1: Multi-Language Support (i18n)

### Feature Overview
English & Arabic language support, auto-detect user language, language switcher.

### Acceptance Criteria
- AC1: All UI text translated (EN & AR)
- AC2: Language switcher in navbar/settings
- AC3: Auto-detect user language (browser preference)
- AC4: Persist language selection in localStorage & DB
- AC5: Date/time format based on locale
- AC6: Currency format based on locale
- AC7: Pluralization & ordinals handled correctly

### Frontend
- Integration: i18next library
- Keys: All hardcoded strings → i18n keys
- `useTranslation()` hook in all components
- Locale files: `locales/en.json`, `locales/ar.json`

### Definition of Done
- [ ] All strings translated
- [ ] Language switcher works
- [ ] Auto-detect functional
- [ ] Dates/times format correctly per locale
- [ ] E2E: switch language, verify all text updated

---

## SPEC_07_2: RTL Layout (Arabic)

### Feature Overview
Right-to-left layout support for Arabic. Flexbox/Grid automatically adapt, CSS logical properties.

### Acceptance Criteria
- AC1: All layouts respond to RTL (flex-direction: row-reverse)
- AC2: Padding/margins use logical properties (padding-inline, margin-inline)
- AC3: Text alignment correct (text-align: right for AR)
- AC4: Images/icons don't flip (explicitly set)
- AC5: Forms input direction correct
- AC6: Modals/popovers positioned correctly in RTL

### Frontend
- CSS: Use logical properties (Tailwind supports this)
- Tailwind config: Add dir attribute to html element
- Test: Chrome DevTools → Emulate right-to-left

### Definition of Done
- [ ] Layout flips correctly in RTL
- [ ] No text overlap or misalignment
- [ ] Forms functional in RTL
- [ ] E2E: view in Arabic, verify RTL layout

---

## SPEC_07_3: Accessibility (WCAG 2.1 AA)

### Feature Overview
WCAG 2.1 Level AA compliance: keyboard navigation, screen reader support, color contrast, focus management.

### Acceptance Criteria
- AC1: All interactive elements keyboard accessible (Tab/Enter/Space)
- AC2: Focus indicators visible (outline or ring)
- AC3: Skip link to main content
- AC4: Color contrast ≥4.5:1 for text
- AC5: Semantic HTML (button, form, nav, main)
- AC6: ARIA labels & descriptions where needed
- AC7: Screen reader text for icons
- AC8: No keyboard traps
- AC9: Form error messages associated with fields
- AC10: Modal focus management (trap + restore)

### Lighthouse Accessibility Audit
- Target: Score ≥90

### Definition of Done
- [ ] axe accessibility scan passes
- [ ] Keyboard navigation works
- [ ] Screen reader testing (VoiceOver/NVDA)
- [ ] Lighthouse score ≥90
- [ ] E2E: navigate with keyboard only, verify all functions work

---

## SPEC_07_4: Regional Pricing & Compliance

### Feature Overview
Show prices in user's local currency. Handle regional compliance (GDPR, taxes, etc.).

### Acceptance Criteria
- AC1: Detect user country from IP or profile
- AC2: Display prices in local currency (USD, EUR, SAR, AED, etc.)
- AC3: Apply local taxes/VAT based on country
- AC4: Currency conversion updates daily
- AC5: GDPR compliance: privacy policy, cookie banner, data deletion
- AC6: Payment compliance: PCI-DSS, 3D Secure where required
- AC7: Terms of Service regional variants (if needed)

### Frontend
- Detect country: IP geolocation API or user selection
- Currency: Format per locale (en-US: $10.00, de-DE: 10,00 €)
- Tax calculation: Based on buyer country & vendor country

### Backend
```
GET /api/v1/config/pricing
Response: { basePrice, taxRate, finalPrice, currency }

Integration:
- IP Geolocation API (free tier: 45k/month)
- Daily currency rates from fixer.io or similar
```

### Definition of Done
- [ ] Country detection works
- [ ] Currency conversion correct
- [ ] Taxes calculated properly
- [ ] GDPR compliance verified
- [ ] E2E: browse as different countries, verify pricing

---

