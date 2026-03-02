# SPEC 28: Unit Testing Standard
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Audit-Ready Quality Gate

---

## 1. WHY THIS SPEC EXISTS

Unit tests are not optional.

This project requires:
- predictable releases
- safe refactoring
- procurement ready maturity
- no regression in routing, localization, SEO, forms, and content integrity

This spec defines the mandatory unit testing system.

---

## 2. TEST LEVELS IN SCOPE

Mandatory:
1) Pure unit tests
2) Component unit tests (render logic and states)

Optional later:
3) E2E tests (Playwright)

This spec covers (1) and (2).

---

## 3. TOOLING REQUIREMENTS

Use the latest stable compatible tooling.

Mandatory capabilities:
- TypeScript support
- jsdom for component tests
- Coverage reporting (lcov + text summary)
- Mocking and spies
- Snapshot support but discouraged

Requirements:
- One test runner for entire repo
- One assertion style consistent across suites
- No flaky async tests

---

## 4. DIRECTORY STRUCTURE

Tests must live close to code or under a parallel structure.

Approved patterns:

A) Co-located
- src/lib/utils.test.ts
- src/components/X.test.tsx

B) Parallel
- src/lib/utils.ts
- tests/unit/lib/utils.test.ts

Rule:
Pick one pattern and enforce it repo-wide.

Fixtures directory:

/tests/fixtures/
  locales/
  seo/
  forms/
  media/
  partners/

---

## 5. NAMING CONVENTIONS

File naming:
- *.test.ts
- *.test.tsx

Suite naming:
- Use spec aligned names:
  "SEO Metadata Builder"
  "JSON-LD Organization Schema"
  "Contact Form Validation"

Test naming:
- Should describe behavior, not implementation
- Example:
  "returns canonical URL for ar locale"
  "rejects payload when honeypot is filled"

---

## 6. REQUIRED COVERAGE GATES

Unit test coverage is a release gate.

Mandatory thresholds:
- Global statements >= 80%
- Global branches >= 75%
- src/lib and src/data statements >= 90%
- src/components statements >= 70%

Rules:
- Any new file added must include tests or be explicitly exempted
- Exemptions must be documented with reason

---

## 7. STABILITY RULES

Forbidden:
- Real network calls
- Real timers without control
- Reliance on ordering
- Randomized data without seed

Required:
- Use fake timers only when needed
- Deterministic fixtures
- Stable selectors for component tests

---

## 8. MOCKING STRATEGY

Allowed mocks:
- next/navigation
- next-intl
- server actions
- request headers for middleware tests

Rules:
- Prefer mocking boundaries, not internal functions
- Avoid mocking the same module in 20 files, use shared helpers
- Store reusable mocks in:
/tests/helpers/

---

## 9. FIXTURE POLICY

Fixtures must represent real shapes, not toy data.

Rules:
- Must include Arabic and English variants
- Must include negative fixtures:
  - missing translations
  - invalid metadata
  - invalid JSON-LD
  - invalid form payloads

All fixtures must be small, readable, and versioned.

---

## 10. REQUIRED TEST SUITES

These suites are mandatory.

### 10.1 Locale and Routing Contracts
Goal:
Ensure locale handling is correct and does not break rendering assumptions.

Must test:
- locale value validation
- dir selection logic (rtl vs ltr)
- language attribute logic
- fallback behavior when locale missing

---

### 10.2 Translation Dictionary Integrity
Goal:
Prevent shipping missing keys or inconsistent bilingual copy.

Must test:
- required key presence for core pages
- no empty strings for critical CTAs
- English and Arabic parity for navigation keys

---

### 10.3 cn Utility and Class Composition
Goal:
Prevent UI style regressions due to missing cn or wrong merging.

Must test:
- merges conditional classes correctly
- handles falsy values
- supports arrays or variants if used

---

### 10.4 SEO Metadata Builders
Goal:
Guarantee correct metadata per locale and per page type.

Must test:
- title and description exist
- canonical URL correct
- robots behavior correct for staging vs production
- OG tags expected defaults

---

### 10.5 JSON-LD Schema Contracts
Goal:
Ensure structured data is valid and consistent.

Must test generators for:
- Organization
- LocalBusiness
- WebSite
- Service
- Article
- FAQPage
- BreadcrumbList

Assertions:
- @context and @type correct
- required fields present
- url and name correct
- locale safe strings

---

### 10.6 Media Center Data Model
Goal:
Ensure Media Center always contains the three mandatory assets.

Must test:
- exactly 3 core downloads exist:
  profile PDF, brand guide PDF, media kit
- each asset has:
  title, description, href, type, size, thumbnail
- href uses allowed public path
- thumbnail required

---

### 10.7 Partners Trust Network Data Model
Goal:
Ensure partners section never ships broken or placeholder proof.

Must test:
- list not empty in production mode
- each partner has:
  name, category, logo, alt text
- logo is svg or approved format
- no placeholder tokens remain

---

### 10.8 Forms Validation and Security Contract
Goal:
Prevent spam and broken submissions.

Must test:
- schema validation rejects invalid payloads
- honeypot filled triggers rejection
- missing required fields rejected
- email format validation
- message length limits
- rate limit function behavior if present
- server side validation always runs

---

### 10.9 Analytics Event Taxonomy Contract
Goal:
Prevent breaking analytics naming and later dashboards.

Must test:
- allowed event names list
- naming format rules:
  snake_case only
- event payload shape:
  category, label, locale, page
- no forbidden keys

Mandatory events:
- contact_submit
- whatsapp_click
- service_cta_click
- portfolio_open_case

---

### 10.10 Error States and Empty States
Goal:
Ensure UX writing stays stable in failure scenarios.

Must test render output for:
- 404 page content in both locales
- empty portfolio results message
- video load failure message
- weak network fallback message

---

## 11. COMPONENT TEST RULES

Use component tests only for:
- conditional rendering
- state driven UI
- empty states
- aria attributes and labels

Avoid:
- snapshot spam
- pixel perfect tests

Must validate:
- aria labels present where needed
- decorative icons are aria-hidden
- thumbnails have alt text

---

## 12. CI SCRIPTS (REQUIRED)

The project must expose these scripts:

- test
- test:unit
- test:coverage
- typecheck
- lint

Release gate:
No merge if any of these fail.

---

## 13. REPORTING

Every CI run must output:
- test summary
- coverage summary
- failing suite names

Optional:
- coverage html report artifact

---

## 14. GOVERNANCE

- Any changes to specs affecting behavior must trigger test updates
- Any new route must add:
  - metadata test
  - translations test
  - basic render test if componentized

---

## 15. RIGHTS & ATTRIBUTION

Testing standards defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 16. ENFORCEMENT

Reject any release that:
- reduces coverage below thresholds
- removes critical suites
- introduces flaky tests
- bypasses the CI gate