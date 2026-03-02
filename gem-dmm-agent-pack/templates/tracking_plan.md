# Tracking Plan (GA4 + GTM) — Template
Pack: `gem-dmm-agent-pack` | Version: 1.0.0 | 2026-02-13

## Principles
- Prefer first-party, privacy-safe measurement.
- Track only what you will use to make decisions.
- Define events from the business funnel, not from UI clicks alone.

## Event Naming Convention
Style: `snake_case` (default)
Rule: `object_action` or `domain_object_action`
Examples:
- `page_view`
- `signup_started`
- `signup_completed`
- `lead_submitted`
- `purchase_completed`

## Conversions (define explicitly)
Primary conversion:
- …
Secondary conversions:
- …

## Event Catalog (minimum viable)
| Event | When it fires | Parameters | Owner | Notes |
|------|---------------|------------|-------|------|
| `page_view` | … | … | … | … |
| `signup_completed` | … | … | … | … |

## QA Checklist
- [ ] Events fire once and only once per action
- [ ] Parameters are consistent
- [ ] Consent mode / privacy requirements respected
- [ ] Conversions configured in GA4 and ad platforms

