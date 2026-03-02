# SPEC 21: Email Service & Hostinger Integration
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Email Trust & Deliverability Readiness

---

## 1. WHY THIS SPEC EXISTS

Email is part of system credibility.

In B2G and enterprise environments:
- Emails must arrive
- Emails must not hit spam
- Emails must look institutional
- Sending must be authenticated and traceable

This spec prepares the website to integrate cleanly with
**Hostinger Email System** without hacks or weak defaults.

---

## 2. EMAIL USE CASES IN SCOPE

- Contact form notifications
- Careers form notifications
- Internal alerts (admin)
- Optional user confirmation (future)

No marketing emails included in this phase.

---

## 3. SENDING IDENTITY RULES

Mandatory sender identity:
- From domain: `@"$BrandNameArabic$"ksa.com`
- No free email providers
- No generic noreply unless approved

Example:
from: no-reply@"$BrandNameArabic$"ksa.com
reply-to: info@"$BrandNameArabic$"ksa.com

yaml
Copy code

---

## 4. HOSTINGER EMAIL INTEGRATION PREP

### Required DNS Records
Must be configured before activation:
- SPF
- DKIM
- DMARC (monitoring mode first)

No sending allowed before DNS validation.

---

## 5. SMTP / API ABSTRACTION RULE

Email logic must be abstracted.

Rules:
- No direct SMTP calls inside UI
- No credentials in client-side code
- Email sending only from server actions or API routes

Email provider must be swappable later without refactoring UI.

---

## 6. EMAIL CONTENT RULES

Tone:
- Calm
- Professional
- Informational only

Rules:
- Plain text or light HTML
- No images required
- No links unless necessary
- No tracking pixels

Subject line example:
New Contact Submission – "$BrandNameArabic$" Website

yaml
Copy code

---

## 7. ERROR HANDLING & FAIL SAFETY

If email sending fails:
- Form submission must still succeed
- Error logged internally
- No user-facing technical error

Email failure must never block UX.

---

## 8. RATE LIMITING & ABUSE PROTECTION

Email sending must respect:
- Same rate limits as forms
- No email burst behavior
- No retries loop abuse

---

## 9. TESTING REQUIREMENTS

Before production:
- Test sending to internal mailbox
- Test spam score
- Test malformed input handling
- Verify sender identity display

---

## 10. GOVERNANCE

- Credentials stored securely
- No secrets in repo
- Rotation possible without downtime

---

## 11. RIGHTS & ATTRIBUTION

Email integration architecture defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/