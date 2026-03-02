
```md
# SPEC 13: Security & Forms Anti-Spam
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Enterprise Trust & Abuse Prevention Layer

---

## 1. WHY THIS SPEC EXISTS

In B2G and enterprise environments:
Forms are not UI elements.
They are **attack surfaces**.

Contact and Careers forms without protection result in:
- Spam floods
- Fake leads
- Reputation damage
- Wasted ops time
- Blocklisting email domains

This spec defines a **calm, invisible, professional security posture**
without hurting UX.

---

## 2. FORMS IN SCOPE

This spec applies to:

- Contact Form
- Careers / Talent Pool Form
- Any future lead or submission form

No form is exempt.

---

## 3. SECURITY PHILOSOPHY

- Invisible first
- Friction last
- Server-side always
- UX never punished unless necessary

No aggressive captchas by default.

---

## 4. RATE LIMITING (MANDATORY)

### Purpose
Prevent abuse, bots, and brute submissions.

### Rules
- Implement server-side rate limiting
- Limit based on:
  - IP
  - Time window
  - Endpoint

### Baseline Recommendation
```

Max 5 submissions / 10 minutes / IP

```

Exceeding the limit:
- Return calm error message
- No technical wording
- No lockout dramatization

---

## 5. HONEYPOT FIELD (MANDATORY)

### Rules
- Hidden input field
- Not visible to humans
- Not focusable
- Named generically (not obvious trap names)

### Behavior
- If field is filled → submission rejected silently
- No error shown to the user
- No server processing beyond logging

This is the first line of defense.

---

## 6. SERVER-SIDE VALIDATION (NON-NEGOTIABLE)

Client-side validation is **not trusted**.

Server must validate:
- Required fields
- Field length
- Email format
- Message size
- Allowed characters

Rejected submissions:
- Return calm validation feedback
- Do not expose validation logic
- Do not echo user input back unsafely

---

## 7. OPTIONAL CAPTCHA (ESCALATION ONLY)

Captcha is **not default**.

Captcha is activated only if:
- Spam threshold exceeded
- Specific IP ranges abused
- Ops explicitly enable escalation mode

Rules:
- Use quiet, low-friction captcha
- No puzzles
- No accessibility harm
- Only on submit, not page load

Captcha must be **feature-flagged**, not hardcoded.

---

## 8. EMAIL DELIVERABILITY (NOTIFICATIONS)

If form submissions trigger emails:

### Mandatory Practices
- Use authenticated sending domain
- SPF, DKIM, DMARC configured
- No free email SMTPs
- No sending from root domain without setup

### Email Content Rules
- Plain, professional
- No marketing language
- No links unless necessary
- Clear subject lines

Example:
```

New Contact Submission – "$BrandNameArabic$" Website

```

---

## 9. FAILURE & ERROR HANDLING

- Do not expose server errors
- Do not show stack traces
- Do not confirm internal behavior

User-facing errors must be:
- Calm
- Generic
- Trust-preserving

---

## 10. LOGGING & OBSERVABILITY

Server must log:
- Submission timestamp
- Endpoint
- Outcome (accepted / rejected)
- Rejection reason (internal only)

Logs must:
- Avoid storing PII unnecessarily
- Be reviewable for abuse patterns

---

## 11. UX COPY RULES (FORMS)

Success states:
- Calm reassurance
- No celebration
- No confetti
- No emojis

Error states:
- Respectful
- Neutral
- Non-accusatory

---

## 12. FUTURE EXTENSIBILITY

This spec allows future addition of:
- WAF rules
- IP reputation services
- Advanced bot detection
- CRM validation hooks

Without refactoring UI.

---

## 13. PROCUREMENT & ENTERPRISE VALUE

Proper form security:
- Protects brand credibility
- Reduces ops noise
- Signals enterprise maturity
- Prevents domain reputation damage

Invisible to users.
Visible to auditors.

---

## 14. RIGHTS & ATTRIBUTION

Security architecture and form governance defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.

---

## 15. ENFORCEMENT

Any form that:
- Lacks server-side validation
- Has no honeypot
- Has no rate limiting
- Sends unauthenticated emails

→ Must not be deployed.

No /speckit.implement without this layer in place.
```
