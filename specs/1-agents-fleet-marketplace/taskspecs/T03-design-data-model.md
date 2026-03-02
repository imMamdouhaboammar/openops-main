# T03 — Design Data Model

Purpose
- Define entities, relationships, and key attributes for the marketplace (Product, Artifact, User, Seller, License, ScanReport, Purchase).

Scope
- Logical data model, sample JSON documents, and primary indexes for PostgreSQL.

Deliverables
- `data-model.md` describing entities, ER diagram (ASCII or PlantUML), and sample records.
- List of required indexes and retention policies for scan reports and artifacts.

Acceptance Criteria
- Data model captures all fields referenced in `spec.md` (metadata, compatibility, versions, manifest fields).
- Includes notes for multi-tenancy, localization, and audit trails.

Estimated time: 1 day
Owner: Backend Lead / Data Architect
Dependencies: T01, T02
