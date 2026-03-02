# T07 — OpenAPI: Upload & Scan API

Purpose
- Define the API contract for seller uploads, upload status, and scan report retrieval.

Scope
- Endpoints: POST /uploads (multipart or resumable), GET /uploads/{id}/status, GET /uploads/{id}/scan-report.
- Models: UploadJob, ScanReport, ScanFinding.

Deliverables
- `contracts/upload.api.yaml` (OpenAPI 3.0) with multipart/resumable upload examples and webhook callback schema for scan results.

Acceptance Criteria
- OpenAPI validates; upload flow supports resumable and chunked uploads for large archives.
- Security: authenticated seller only, signed webhook secret verification for scan callbacks.

Estimated time: 1 day
Owner: Backend/API Engineer
Dependencies: T05, T01
