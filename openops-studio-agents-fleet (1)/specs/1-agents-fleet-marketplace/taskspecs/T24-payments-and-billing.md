# T24 — Payments & Billing

Purpose
- Integrate payment gateways, generate invoices, and support tax configuration and refunds.

Scope
- Stripe integration (primary), PayPal sandbox, placeholder connectors for local gateways, invoice generation, and webhooks for payment events.

Deliverables
- Payment module, webhook handlers, invoice templates, and tests for reconciliation edge cases.

Acceptance Criteria
- Sandbox payments create purchase records, invoices, and license issuance; webhooks are idempotent and secure.

Estimated time: 3–5 days
Owner: Payments Engineer
Dependencies: T13, T15
