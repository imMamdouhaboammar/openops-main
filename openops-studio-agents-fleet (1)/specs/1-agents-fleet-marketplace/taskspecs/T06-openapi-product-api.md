# T06 — OpenAPI: Product API

Purpose
- Define the REST contract for product listing, retrieval, and metadata preview used by the frontend and external integrators.

Scope
- Endpoints: GET /products, GET /products/{slug}, POST /products (seller), GET /products/{slug}/artifact-list.
- Models: Product, Artifact, ManifestSummary, Pagination, Filters.

Deliverables
- `contracts/product.api.yaml` (OpenAPI 3.0) with request/response schemas and examples.

Acceptance Criteria
- OpenAPI file validates with Swagger/OpenAPI tools and covers required fields from `spec.md`.
- Includes security schemes (JWT for sellers/admins) and rate-limit headers.

Estimated time: 1 day
Owner: Backend/API Engineer
Dependencies: T03, T05
