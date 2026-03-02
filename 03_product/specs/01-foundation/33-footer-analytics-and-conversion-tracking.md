# SPEC 33: Footer Analytics & Conversion Tracking
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Conversion Intelligence + Trust Signals

---

## 1. WHY THIS SPEC EXISTS

In B2G and enterprise websites:
- Footer interactions are **high intent**
- Procurement users scroll intentionally
- Missed footer tracking = lost insight

This spec ensures:
- Every meaningful footer interaction is tracked
- Event naming is consistent and future proof
- No UI refactor needed later to add analytics
- Privacy respectful, audit ready

---

## 2. FOOTER CONVERSION SURFACES

The footer contains the following conversion-relevant elements:

### 2.1 Mini Contact Form
- Name input
- Email or Phone input
- Message input (if enabled)
- Submit button

### 2.2 Direct Contact Actions
- Phone number click
- Email address click
- WhatsApp click (if enabled)

### 2.3 Navigation & Trust Actions
- Legal pages clicks
- Services links clicks
- Media Center link click
- Careers link click

---

## 3. EVENT NAMING RULES (STRICT)

All footer events must follow:
- snake_case only
- no spaces
- no camelCase
- no dynamic event names

Prefix rule:
All footer events must start with:

`footer_`

Example:
- footer_contact_submit
- footer_whatsapp_click

---

## 4. MANDATORY EVENTS LIST

### 4.1 Mini Contact Form Events

1) footer_contact_submit_attempt  
Triggered when user clicks submit.

2) footer_contact_submit_success  
Triggered when server confirms successful submission.

3) footer_contact_submit_error  
Triggered on validation or server error.

Payload:
- locale
- page_path
- form_type: "footer"
- error_type (only for error event)

---

### 4.2 Direct Contact Clicks

4) footer_phone_click  
5) footer_email_click  
6) footer_whatsapp_click  

Payload:
- locale
- page_path
- destination (masked, no PII)
- position: "footer"

---

### 4.3 Navigation Clicks

7) footer_nav_click  

Payload:
- locale
- page_path
- target_page
- target_category (services | legal | info | media)

---

### 4.4 Legal & Trust

8) footer_legal_click  

Payload:
- locale
- page_path
- document_type (privacy | terms | cookies)

---

## 5. WHAT MUST NOT BE TRACKED

Forbidden:
- Raw email values
- Phone numbers
- Message content
- IP address
- Any PII

Analytics must be **behavioral only**.

---

## 6. IMPLEMENTATION GUIDELINES

- Events dispatched via central analytics utility
- No inline tracking logic inside JSX
- Footer components call semantic tracking helpers only

Example:
- trackFooterContactSubmit()
- trackFooterNavClick()

---

## 7. ERROR AND EDGE CASE HANDLING

- Do not fire success event unless server confirms
- Fire error event only once per attempt
- Do not double fire events on rerender

---

## 8. PRIVACY & COMPLIANCE

- Tracking must respect Cookie Consent (if enabled)
- If tracking disabled:
  - Events must not fire
  - UI behavior must remain unchanged

---

## 9. QA & VALIDATION

Before release:
- Verify each footer action fires exactly one event
- Validate payload shape matches spec
- Confirm no PII is present
- Test in both locales
- Test on mobile and desktop

---

## 10. REPORTING RECOMMENDATIONS (NON-BINDING)

Suggested GA4 reports:
- Footer Contact Conversion Rate
- Footer vs Header Contact Initiation
- Footer WhatsApp CTR
- Legal Page Click Rate

---

## 11. ACCEPTANCE CRITERIA

- All footer actions tracked
- Naming follows taxonomy
- No PII leakage
- Works across locales
- Does not block UI or slow interactions

---

## 12. RIGHTS & ATTRIBUTION

Footer analytics system defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

---

## 13. ENFORCEMENT

Reject any implementation that:
- Tracks PII
- Uses inconsistent event names
- Adds tracking inline in JSX
- Fires duplicate events
- Ignores consent rules

No /speckit.implement approval without full compliance.