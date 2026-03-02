# T20 — Configure Storage & CDN

Purpose
- Provision and configure S3-compatible storage and CDN distribution for artifact hosting and downloads.

Scope
- Bucket layout, lifecycle rules, signed URL integration, cache headers, and invalidation strategy for artifact updates.

Deliverables
- Deployment guide for S3 + CDN, Terraform snippets (optional), and config examples for signed URL generation.

Acceptance Criteria
- Artifacts are accessible via CDN with correct cache-control and invalidation works after new versions.

Estimated time: 1–2 days
Owner: Platform Engineer
Dependencies: T19
