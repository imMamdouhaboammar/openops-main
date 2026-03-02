
```md
# SPEC 12: Analytics & Event Taxonomy
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Enterprise-Grade Measurement Readiness

---

## 1. WHY THIS SPEC EXISTS

Analytics tools may not be implemented yet.
But **event thinking must exist from day one**.

This spec ensures:
- UI is built with measurement in mind
- No retrofitting or UI breakage later
- Clean, consistent, future-proof analytics
- Easy onboarding of GA4, GTM, or any future system

This is a **measurement contract**, not an implementation.

---

## 2. SCOPE OF THIS SPEC

This spec defines:
- Event naming conventions
- Event categories and taxonomy
- Event payload standards
- UI responsibilities for emitting events

This spec does NOT:
- Install GA4
- Configure GTM
- Send data to any external system yet

---

## 3. EVENT DESIGN PRINCIPLES (STRICT)

All events must be:
- Intent-based (user intention, not UI mechanics)
- Verb-based (clear action)
- Consistent across the platform
- Human-readable
- Flat (no nested madness)

Never track:
- Cosmetic interactions
- Hover noise
- Scroll spam (unless explicitly defined later)

---

## 4. EVENT NAMING CONVENTION

### Canonical Format

```

[object]_[action]

```

Optional qualifier:
```

[object]*[action]*[context]

```

Rules:
- lowercase only
- snake_case only
- no abbreviations unless universal
- no camelCase
- no UI terms like "button" or "section"

---

## 5. CORE EVENT TAXONOMY (FOUNDATION)

### 5.1 Contact & Lead Events

```

contact_submit
contact_validation_error
contact_success

```
```

whatsapp_click
phone_click
email_click

```

---

### 5.2 Service Discovery Events

```

service_open
service_cta_click

````

Payload example:
```json
{
  "service_slug": "crisis-management",
  "locale": "ar"
}
````

---

### 5.3 Portfolio & Authority Events

```
portfolio_open
portfolio_open_case
portfolio_filter_apply
```

Payload example:

```json
{
  "case_slug": "hajj-conference-2024",
  "industry": "government"
}
```

---

### 5.4 Navigation & Trust Signals

```
nav_primary_click
footer_link_click
legal_page_open
```

---

### 5.5 Media Interaction Events

```
hero_video_play
hero_video_pause
gallery_swipe
```

Media events must be intentional and limited.

---

## 6. EVENT PAYLOAD RULES

Payloads must:

* Be JSON serializable
* Contain only primitives (string, number, boolean)
* Avoid PII completely
* Include locale when relevant

Forbidden:

* User names
* Phone numbers
* Emails
* Free text input values

---

## 7. UI RESPONSIBILITY CONTRACT

UI components must:

* Expose an event hook
* Emit semantic events
* Never hardcode analytics vendor logic

Example (conceptual):

```ts
emitEvent("service_cta_click", {
  service_slug: "events-management",
  locale: "ar"
})
```

Analytics providers plug in later.

---

## 8. FUTURE-PROOFING RULES

* Event names must not change after release
* Deprecated events are documented, not deleted
* New events require spec update
* No silent additions

---

## 9. DEBUG & VALIDATION MODE

During development:

* Events may log to console
* Or push to an internal event bus
* But must follow exact naming

No production leakage.

---

## 10. DOCUMENTATION REQUIREMENTS

* All events must be documented
* Event purpose must be clear
* Event payload schema must be explicit

---

## 11. PROCUREMENT & ENTERPRISE VALUE

Clean analytics taxonomy:

* Accelerates enterprise reporting
* Simplifies KPI definition
* Reduces audit friction
* Enables future dashboards without rework

---

## 12. RIGHTS & ATTRIBUTION

Analytics architecture and taxonomy governed by:

© Mamdouh Aboammar
Digital Director – "$BrandNameArabic$"
LinkedIn: [https://www.linkedin.com/in/mamdouh-aboammar/](https://www.linkedin.com/in/mamdouh-aboammar/)

This attribution remains in documentation and specs.

---

## 13. ENFORCEMENT

Any implementation that:

* Hardcodes GA4 calls
* Uses inconsistent event names
* Emits UI-noise events

→ Must be stopped immediately.

No analytics tooling may be added without compliance with this spec.

```
