# T19 — Implement Signed URL Downloads

Purpose
- Serve artifact downloads via signed, time-limited URLs backed by S3-compatible storage and CDN.

Scope
- Generate signed URLs with configurable TTL, support short/long TTL for different license types, and log downloads for auditing.

Deliverables
- Signed URL service, download audit entries, and CDN configuration guidance.

Acceptance Criteria
- Signed URLs expire correctly and downloads are served via CDN; audit log contains download events with user and license id.

Estimated time: 1–2 days
Owner: Backend/Platform Engineer
Dependencies: T20, T15
