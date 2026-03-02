## OpenOps Agents Fleet — مواصفات ومكونات الموقع (God-level Prompt)

OpenOps Studio

OpenOps Studio Inc — شركة مسجلة في الإمارات العربية المتحدة.

الهيدر: OpenOps Agents Fleet

ملخص تنفيذي

OpenOps Agents Fleet هو سوق e‑commerce متقدّم لبيع وشراء شيفرات ومواصفات وكلاء ذكاء اصطناعي مفتوحة المصدر (source code + agent specs) جاهزة للتشغيل أو التعديل لتشغيلها على منصات مثل Gemini Gems, ChatGPT Custom GPTs, Claude Skills وغيرها. يتم توزيع الشيفرة في أرشيف مضغوط (.zip) يحتوي على JSON, MD, YML, pseudo, scripts، وملفات تكوين وملاحظات تشغيل.

هذا المستند هو "God-level Prompt" لتوليد الوصف، واجهات المنتج، المواصفات التقنية، وتجربة المستخدم للموقع.

## أهداف المنتج

- سوق موثوق للمؤسسات لشراء وكلاء ذكاء اصطناعي جاهزين
- تنويع نماذج التوزيع: مفتوح المصدر مع تراخيص تجارية/دعم
- تبسيط عمليات الاستيراد إلى Gemini Gems، ChatGPT Custom GPTs، Claude Skills عبر واجهات رفع أو أدوات مساعدة
- تجربة مستخدم احترافية، مع دعم RTL (العربية) وLTR (الإنجليزية)

## الجمهور المستهدف

- فرق AI/ML في الشركات
- مطورو الوكلاء ومستودعات النماذج
- شركات تكامل أنظمة تبحث عن حلول جاهزة

## متطلبات المنتج الأساسية

1) كتالوج منتجات
   - صفحات منتج تفصيلية تحتوي: اسم المنتج، وصف موجز وطويل، ملف ZIP للتحميل، قائمة ملفات داخل الأرشيف، تصنيف (Agent Type)، التوافق (Gemini/ChatGPT/Claude)، متطلبات التشغيل، لقطات شاشة، فيديو توضيحي، demo link, إصدار، changelog
   - معاينة شيفرة مدعومة بعارض كود مع تمييز نحوي لملفات JSON/YML/MD/Pseudo
   - زر "استيراد تلقائي" لتقديم ملف مضغوط إلى أداة استيراد خاصة بالمنصة (خدمة Cloud/CLI) أو تنزيل مباشر

2) صفحة شراء وتجربة السلة
   - خيارات تراخيص: MIT/Apache/BSD (OSS) + تراخيص تجارية أو اشتراك دعم
   - حل دفع متكامل (Stripe, PayPal، بوابات محلية في المنطقة) مع فواتير وضرائب مضافة
   - إدارة تراخيص للمشتري: مفاتيح ترخيص، روابط تنزيل، صلاحيات الوصول

3) لوحة البائع
   - رفع منتج جديد (واجهة رفع ZIP + وصف + فحص تلقائي للشيفرة)
   - إصدارات المنتج وإدارة التخريج (semver)
   - إحصاءات مبيعات، مراجعات، تقارير مشكلات

4) لوحة الإدارة
   - إدارة مستخدمين/بائعين/منتجات
   - عملية مراجعة وقبول المنتجات (vetting)
   - تكاملات أمان: فحص شيفرة آلي (SCA), Trivy, snyk أو أدوات مماثلة

5) تجربة التثبيت والتكامل
   - مستندات "كيفية الاستيراد" لكل منصة: Gemini Gems, ChatGPT Custom GPTs, Claude Skills
   - سكربتات أو CLI مساعدة لفك الأرشيف، تحويل المواصفات، رفعها للمنصة المستهدفة
   - نموذج تدفق: Upload ZIP -> Auto-scan -> Generate Adapter (optional) -> Export to Platform

6) الجودة والسلامة
   - فحص أمان للشيفرة عند الرفع
   - فحوصات للخصوصية (التأكد من عدم وجود أسرار/مفاتيح داخل الأرشيف)
   - رقابة على المحتوى ونظام بلاغات

7) تجربة المستخدم (UX)
   - دعم ثنائي اللغة (AR/EN) وRTL
   - تصميم Responsive, WCAG AA accessibility
   - ثيم: Dark / Light مع مبدل سريع (theme switcher)

## مواصفات النسخة الفاتحة (Light) والـ Theme Switcher

- دعم سمات: CSS variables (custom properties) + prefers-color-scheme media-query
- تصميم مُبسّط للنسخة الفاتحة: ألوان هادئة، تباين عالي للقراءة، ظلال خفيفة
- عنصر المبدّل: زر في الهيدر (icon sun/moon) يحفظ التفضيل في localStorage ويدعم sync عبر الحساب
- تنفيذ تقني مختصر:
  - HTML: إضافة attribute `data-theme="light|dark"` على `<html>`
  - CSS: جميع الألوان من متغيرات: `--bg`, `--fg`, `--muted`, `--accent`
  - JS: عند تبديل: setAttribute('data-theme', 'light')؛ localStorage.setItem('theme','light')
  - الاستجابة لتفضيل النظام: `if (!localStorage.getItem('theme')) use prefers-color-scheme`

Suggested Light palette (example):
- --bg: #ffffff
- --fg: #0f172a
- --muted: #6b7280
- --accent: #0ea5a4 (teal)

## هيكل واجهة المستخدم المقترح

- Header: شعار OpenOps (يسار RTL/يمين LTR) + عنوان "OpenOps Agents Fleet" + theme switcher + search
- Search & filters: نص، فلاتر للمنصة (Gemini/ChatGPT/Claude), فئة الوكيل، لغة الشيفرة، تراخيص
- Product grid: بطاقات بها صورة، ملخص، سعر، badge للتوافق
- Product page: تفاصيل، gallery، file ZIP، preview code viewer، زر استيراد
- Footer: روابط قانونية، contact, docs, privacy

## المواصفات التقنية المقترحة (stack)

- Frontend: Next.js (React) أو Vue/Nuxt مع SSR/ISR للـ SEO
- UI: Tailwind CSS + Headless UI
- Highlighting: PrismJS أو Shiki for server-side highlighting
- Backend: Node.js (NestJS / Fastify) أو Python (FastAPI)
- Database: PostgreSQL + Redis
- Storage: S3-compatible for ZIPs + Cloud CDN
- Payments: Stripe + بوابات محلية
- CI/CD: GitHub Actions
- Security: Container scanning, dependency scanning (trivy/snyk), secret scanning

## تجربة البائع والمشتري

بائع:
- يسجل كبائع، يملأ صفحة المنتج، يرفع ZIP
- يخضع المنتج لفحص آلي ويدخل في قائمة مراجعة بشرية
- بعد الموافقة، يُدرج المنتج ويصبح متاحاً للبيع

مشتري:
- بحث، فلترة، معاينة، شراء
- بعد الدفع يظهر رابط تنزيل، وواجهة إدارة تراخيص
- خيار "استيراد تلقائي" الذي يوجه المستخدم لعملية رفع على المنصة المختارة أو تنزيل ملف adapter

## التشغيل التكامل مع Gemini / ChatGPT / Claude

- مواصفات التوافق: لكل منتج حاجة واضحة (metadata) توضح الحقول المطلوبة لكل منصة
- مثال: `manifest.json` يحتوي على الحقول: platform_compatibility: ["gemini","chatgpt","claude"]
- أدوات مساعدة: scripts/convert-to-gemini.sh, cli import-cli --to chatgpt

## الأمن والالتزام القانوني

- التزام قوانين الإمارات وGDPR عند التعامل مع بيانات المستخدمين
- عقود بائع/مشتري، سياسة إلغاء واسترداد، تراخيص واضحة لكل منتج

## تجربة التشغيل والاعتمادية

- CDN لتوزيع الأرشيفات
- signed URLs لتنزيلات مؤقتة
- rate limiting وWAF

## SEO، Analytics، الأداء

- صفحات منتجات SSR، structured data (schema.org/Product) وOpenGraph
- telemetry: Mixpanel/Amplitude + server-side events
- Lighthouse target: 90+ for performance/accessibility

## نموذج "God-level" Prompt لتوليد صفحة منتج أو إعلان

Prompt (Arabic) — قالب لإنتاج وصف وخصائص المنتج تلقائياً:

"أنت OpenOps Product Writer: اكتب وصفاً احترافياً لمنتج وكيل ذكاء اصطناعي موجه للمؤسسات. اسم المنتج: {{NAME}}. الهدف: {{PURPOSE}}. المنصات المتوافقة: {{COMPATIBILITY}}. مكونات الأرشيف: {{FILES_LIST}}. متطلبات التشغيل: {{RUNTIME}}. مثال بسيط على استدعاء: {{USAGE_SNIPPET}}. اذكر فوائد الاستخدام، حالات الاستخدام المقترحة، والقيود المعروفة. اكتب ملخصًا (one-liner)، ثم قسم ميزات، ثم خطوات التثبيت السريعة (3-5 خطوات)، ثم نصائح الأمان. اجعل النبرة رسمية، موجّهة للمهنيين، وطويلة بما يكفي لتغطي الفني والعملي." 

## قالب صفحة منتج (Markdown snippet)

---
title: {{NAME}}
platforms: {{COMPATIBILITY}}
license: {{LICENSE}}
version: {{VERSION}}
---

# {{NAME}}

{{ONE_LINER}}

## الميزات
- ...

## الملفات داخل الأرشيف
- {{FILES_LIST}}

## خطوات التثبيت السريعة
1. تنزيل ZIP
2. فك الضغط
3. تشغيل `install.sh` أو اتباع التعليمات في `README.md`

## حقوق وملخص الترخيص
- {{LICENSE_DETAIL}}

## ملاحظة قانونية
- هذا المنتج مقدم بواسطة بائع مستقل. OpenOps Studio يوفر المنصة والضمانات الأساسية فقط.

## ملاحظات أخيرة

هذا الملف هو مصدر شامل لتوليد مستندات المنتج، التصميم العام، ومواصفات التطوير. بعد اعتماد المستند يمكن تحويل مقاطع منه إلى user stories، واجهات API spec (OpenAPI)، ومخططات قواعد بيانات.

---

Contact: OpenOps Studio Inc — legal@openops.studio


---
description: "OpenOps Agents Marketplace - Complete Feature & Architecture Plan (Shopify-Inspired)"
date: 2026-01-12
---

# 📊 OpenOps Agents Marketplace - Strategic Plan

**Philosophy**: Shopify for open-source AI agents. Simple, powerful, extensible.

---

## 🎯 Core Design Principles

### 1. **Simplicity Over Complexity**
- Buyers: Browse → View → Buy → Download → Use (3-5 minutes)
- Vendors: Upload → Configure → Publish (< 10 minutes)
- No custom checkout; no payment gateway setup; no technical jargon

### 2. **Trust & Transparency**
- Show exactly what's in the package (artifacts, dependencies, size)
- Checksum verification visible & auditable
- Community ratings & reviews
- Clear terms (license, support level, refund policy)

### 3. **Developer Experience First**
- Semantic versioning enforced
- Deployment guides per platform (Gemini/GPT/Claude)
- API-first: marketplace accessible programmatically
- CLI tool for vendor uploads

### 4. **Vendor Empowerment**
- Real-time sales dashboard
- Payouts to 180+ countries via Wise
- Analytics: downloads, reviews, revenue trends
- A/B testing support for listings

---

## 📑 Page Architecture

### **Public Pages** (No Auth Required)
1. **Homepage** - Hero, featured agents, categories, CTAs
2. **Marketplace Browse** - Search, filter, sort, infinite scroll
3. **Agent Detail Page** - Full product view, reviews, guides, purchase CTA
4. **Deployment Guide** - Platform-specific setup (Gemini/GPT/Claude)
5. **Pricing & Plans** - License tiers explanation
6. **FAQ & Support** - Common questions
7. **Legal** - Terms, Privacy, Return Policy

### **Buyer Pages** (Auth Required)
8. **My Purchases** - Order history, re-download, reviews
9. **Cart** - Review items before checkout
10. **Checkout** - Payment form, billing address, receipt
11. **My Account** - Profile, billing, saved cards
12. **License Manager** - View active licenses, seat limits, expiration

### **Vendor Pages** (Vendor Role Required)
13. **Vendor Dashboard** - KPIs, recent sales, alerts
14. **Products** - List all my agents, bulk edit
15. **Add/Edit Agent** - Upload, configure, publish
16. **Orders** - See who bought what, download manifest
17. **Analytics** - Revenue, downloads, traffic, review sentiment
18. **Payouts** - View earnings, trigger withdrawal
19. **Settings** - Billing, store name, contact info

### **Admin Pages** (Admin Role Only)
20. **Moderation Dashboard** - Pending approvals, flagged content
21. **User Management** - Create vendors, manage disputes
22. **Platform Analytics** - GMV, marketplace health, trends
23. **Content Management** - Featured agents, categories, guides

---

## 🧩 Component Library

### **Product Components**
- `ProductCard` - Agent thumbnail, title, price, rating, vendor
- `ProductGrid` - Responsive grid of products
- `ProductDetail` - Full agent view with tabs (Overview, Reviews, Guides, Files)
- `ProductImage` - Carousel/zoom for agent showcase images
- `RatingStars` - 1-5 star display + count
- `ReviewList` - Paginated reviews with helpful voting

### **Navigation Components**
- `Navbar` - Logo, search, categories, cart icon, account menu
- `Sidebar` - Category filter, price range, rating filter, tags
- `Breadcrumb` - Current location (Home > Category > Agent)
- `MobileTabs` - Bottom nav on mobile (Browse, Cart, Account)

### **Cart & Checkout**
- `CartItem` - Product row in cart (edit qty, remove, save for later)
- `PriceBreakdown` - Subtotal, tax, platform fee, total
- `PaymentForm` - Card input (Stripe Elements), billing address
- `OrderConfirmation` - Receipt, download link, next steps

### **Listing Management (Vendor)**
- `AgentUploadForm` - Drag-drop ZIP, auto-validation, checksum display
- `MetadataEditor` - Title, description, price, category, license tier
- `DeploymentGuideEditor` - Platform-specific setup instructions
- `PublishModal` - Final review before going live
- `ListingStats` - Real-time views, downloads, revenue

### **Analytics Components**
- `RevenueChart` - Line chart of earnings over time
- `DownloadTrend` - Downloads per day/week/month
- `TopProducts` - Best-selling agents
- `GeoMap` - Buyer locations heatmap
- `RatingDistribution` - 1-5 star breakdowns

### **Shared UI**
- `Button` - Primary, secondary, danger; loading states
- `Input` - Text, email, password; validation feedback
- `Select` - Dropdown for categories, license tiers, date ranges
- `Modal` - Dialog overlays (confirm, forms, alerts)
- `Toast` - Notifications (success, error, warning)
- `Spinner` - Loading skeleton, pulse animations
- `Badge` - Label tags (featured, trending, new)
- `Pagination` - Page numbers, prev/next
- `Tabs` - Horizontal navigation (Overview, Reviews, Guides)
- `Accordion` - Expandable sections (FAQ, advanced settings)

---

## ✨ Key Features (15 Major)

### **Discovery & Browse**
1. **Smart Search** - Full-text search on title, description, tags
2. **Advanced Filters** - By category, price range, license tier, rating, platform compatibility
3. **Sorting** - By popularity, newest, price (asc/desc), rating, downloads
4. **Featured & Trending** - Admin-curated, algorithmic trending
5. **Recommendations** - "Buyers also purchased", "Similar agents"

### **Purchase & Fulfillment**
6. **Instant Checkout** - Stripe one-click, save payment method
7. **Digital Delivery** - Download link expires 24h, regenerable
8. **Checksum Verification** - Client-side validation, visual feedback
9. **License Activation** - Hash-based seat limit tracking (MVP)
10. **Refund Management** - 14-day full refund, manual review after

### **Vendor Tools**
11. **Agent Management** - CRUD listings, bulk edit, schedule publish
12. **KYC Verification** - Document upload, auto-verification (Stripe)
13. **Payment Payouts** - Wise integration, scheduled monthly
14. **Sales Analytics** - Dashboard, CSV export, trend analysis

### **Community & Trust**
15. **Reviews & Ratings** - Post-purchase, artifact-level feedback
16. **Vendor Reputation** - Seller badge, response rate, dispute history
17. **Deployment Guides** - Per-platform guides (Gemini/Claude/GPT)
18. **Community Tagging** - Popular tags, trending tags

### **Localization & Accessibility**
19. **Multi-Language** - English + Arabic (RTL), more later
20. **Accessibility** - WCAG 2.1 AA, keyboard nav, screen reader support

---

## 📋 Feature Specifications by Module

### **Module 1: Product Discovery**
- 1.1 Smart Search Engine
- 1.2 Multi-Faceted Filtering
- 1.3 Sorting & Ranking
- 1.4 Featured & Trending Algorithm
- 1.5 Recommendation Engine (Content-Based)

### **Module 2: Product Detail & Purchase**
- 2.1 Product Detail Page
- 2.2 Deployment Guides (3 platforms)
- 2.3 Reviews & Ratings
- 2.4 License Information Display
- 2.5 One-Click Checkout

### **Module 3: Cart & Order Management**
- 3.1 Shopping Cart (Session-based)
- 3.2 Checkout Flow (Stripe)
- 3.3 Order Confirmation & Receipt
- 3.4 Download Manager
- 3.5 Order History & Re-download

### **Module 4: Vendor Storefront**
- 4.1 Vendor Dashboard (KPIs)
- 4.2 Agent Management (CRUD)
- 4.3 Metadata & SEO
- 4.4 Deployment Guide Editor
- 4.5 Bulk Upload & Version Management

### **Module 5: Vendor Analytics & Payouts**
- 5.1 Revenue Dashboard
- 5.2 Download Analytics
- 5.3 Buyer Geography
- 5.4 Rating Analysis
- 5.5 Payout Management (Wise)

### **Module 6: Trust & Safety**
- 6.1 User Ratings & Reviews
- 6.2 KYC Verification
- 6.3 Refund Dispute Resolution
- 6.4 Content Moderation Queue
- 6.5 Chargeback Prevention

### **Module 7: Localization & Accessibility**
- 7.1 Multi-Language Support (i18n)
- 7.2 RTL Layout (Arabic)
- 7.3 Accessibility Audit (WCAG 2.1 AA)
- 7.4 Regional Pricing & Compliance

---

## 🎨 User Flows

### **Buyer Flow (Happy Path)**
```
1. Homepage → Browse or Search
2. Marketplace Grid → Filter by category/price/rating
3. Product Detail → Read reviews, view deployment guide
4. Add to Cart → Proceed to checkout
5. Checkout → Enter payment (Stripe)
6. Order Confirmation → Download link + receipt
7. Download → Extract + Verify checksum
8. Use Agent → Success! (Leave review later)
```

### **Vendor Flow (Happy Path)**
```
1. Signup → Select "Vendor" role
2. KYC Verification → Upload docs, wait for approval (1-2 days)
3. Dashboard → First time onboarding guide
4. Add Agent → Upload ZIP, fill metadata, set price, license tier
5. Deployment Guides → Copy-paste setup steps for 3 platforms
6. Preview & Publish → Review listing, make live
7. Monitoring → Watch sales, reviews, downloads
8. Payout → Trigger withdrawal to Wise (monthly)
```

### **Admin Flow**
```
1. Moderation Queue → Review pending agents
2. Flag Suspicious → Checksum mismatch, copyright, etc.
3. Approve/Reject → Send notifications to vendor
4. Analytics Dashboard → Monitor marketplace health
5. Content Management → Feature top agents, manage categories
```

---

## 📊 Technical Stack Review

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Frontend** | React 19 + Vite 5 | SPA, modular architecture |
| **State** | Zustand + React Query | UI state + server state |
| **Styling** | Tailwind CSS 3.4 | Utility-first, RTL support |
| **Backend** | Express.js + Node 20 | RESTful API |
| **Database** | PostgreSQL 16 | Transactional, ACID |
| **Auth** | Passport.js + JWT | Local + OAuth later |
| **Payments** | Stripe | Buyer checkout |
| **Payouts** | Wise API | Vendor disbursements |
| **Storage** | S3-Compatible | Agent archives |
| **ORM** | Prisma 5.8 | Type-safe queries |
| **Validation** | Zod 4.3 | Runtime + TypeScript |
| **Testing** | Jest + Vitest + Playwright | Unit/Integration/E2E |
| **Monitoring** | Sentry + Prometheus | Error tracking + metrics |

---

## 🚀 Implementation Roadmap

### **Wave 1 (MVP)** - Weeks 1-4
- ✅ Phase 2: Database schema + auth
- User Story 1 (P1): Browse → Purchase → Download
- Basic product detail, checkout flow
- Admin approval queue (manual)

### **Wave 2** - Weeks 5-6
- User Story 2 (P2): Vendor onboarding, KYC, upload, publish
- Vendor dashboard (basic KPIs)
- Payout management (Wise)

### **Wave 3** - Weeks 7-8
- User Story 3 (P3): Deployment guides, platform compatibility
- Community reviews & ratings
- Search optimization

### **Wave 4 (Polish)** - Weeks 9-10
- Analytics & trending
- Recommendations
- Localization (EN/AR)
- Performance tuning
- Security hardening

---

## 📌 Success Metrics

| Metric | Target | Why |
|--------|--------|-----|
| **P1 Completion** | 100% | MVP = revenue enabled |
| **Checkout Conversion** | >2% | Baseline for e-commerce |
| **Download Success Rate** | >99% | Checksum validation working |
| **Vendor Onboarding Time** | <10 min | Frictionless sign-up |
| **Page Load Time (p95)** | <500ms | Fast UX |
| **Chargeback Rate** | <2% | Payment risk acceptable |
| **Customer Satisfaction** | >4/5 stars | Trust & quality |

---

## 📁 Spec Files to Create

Each feature gets its own **spec.md** prompt file for AI implementation:

### Discovery Module
- `SPEC_01_1_SmartSearch.md`
- `SPEC_01_2_AdvancedFilters.md`
- `SPEC_01_3_Sorting.md`
- `SPEC_01_4_Featured.md`
- `SPEC_01_5_Recommendations.md`

### Product & Purchase
- `SPEC_02_1_ProductDetail.md`
- `SPEC_02_2_DeploymentGuides.md`
- `SPEC_02_3_Reviews.md`
- `SPEC_02_4_License.md`
- `SPEC_02_5_OneClickCheckout.md`

### Cart & Orders
- `SPEC_03_1_ShoppingCart.md`
- `SPEC_03_2_CheckoutFlow.md`
- `SPEC_03_3_OrderConfirmation.md`
- `SPEC_03_4_DownloadManager.md`
- `SPEC_03_5_OrderHistory.md`

### Vendor Storefront
- `SPEC_04_1_VendorDashboard.md`
- `SPEC_04_2_AgentManagement.md`
- `SPEC_04_3_Metadata.md`
- `SPEC_04_4_GuideEditor.md`
- `SPEC_04_5_BulkUpload.md`

### Analytics & Payouts
- `SPEC_05_1_RevenueAnalytics.md`
- `SPEC_05_2_DownloadAnalytics.md`
- `SPEC_05_3_BuyerGeo.md`
- `SPEC_05_4_RatingAnalysis.md`
- `SPEC_05_5_PayoutManagement.md`

### Trust & Safety
- `SPEC_06_1_UserRatings.md`
- `SPEC_06_2_KYCVerification.md`
- `SPEC_06_3_RefundDisputes.md`
- `SPEC_06_4_Moderation.md`
- `SPEC_06_5_Chargeback.md`

### Localization
- `SPEC_07_1_i18n.md`
- `SPEC_07_2_RTL.md`
- `SPEC_07_3_Accessibility.md`
- `SPEC_07_4_RegionalPricing.md`

**Total**: 27 Spec Files = 27 AI Coding Agent Prompts

---

## 🎯 Success Definition

**Marketplace is "Done" when:**
1. ✅ All 27 specs are written
2. ✅ Each spec is executable (Prompt-ready)
3. ✅ Each spec has clear acceptance criteria
4. ✅ Each spec references real files/paths
5. ✅ Implementation can begin immediately with any spec
6. ✅ Specs can be parallelized (no blocking dependencies within waves)

---

**Next Action**: Create SPEC_01_1_SmartSearch.md as first example, then generate all 27 specs.

