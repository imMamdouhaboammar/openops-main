# T17 — Implement Upload Pipeline

Purpose
- Handle ZIP uploads: extract metadata, validate `manifest.json`, run initial static checks, enqueue scan jobs, and store artifacts.

Scope
- Multipart/resumable upload handler, virus/secret pre-scan, extraction worker, manifest validation, and enqueue SCA scanning.

Deliverables
- Upload service, worker blueprint, and integration tests for happy and failure paths.

Acceptance Criteria
- Uploads accept archives up to configured limit, validate manifests, and produce an UploadJob with status transitions.

Estimated time: 3–5 days
Owner: Backend & Integration Engineer
Dependencies: T04, T05, T07, T18
