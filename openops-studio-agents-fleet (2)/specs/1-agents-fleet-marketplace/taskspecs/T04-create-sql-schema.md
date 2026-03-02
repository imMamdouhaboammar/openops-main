# T04 — Create SQL Schema

Purpose
- Translate the logical data model into a practical PostgreSQL schema with migrations.

Scope
- Tables: products, artifacts, users, sellers, licenses, purchases, scan_reports, reviews, import_jobs.
- Migrations (Flyway/Prisma/Knex examples), indexes, FK constraints, and sample seed data.

Deliverables
- `schema.sql` / migration files and an example `prisma/schema.prisma` or equivalent.

Acceptance Criteria
- All core entities exist with appropriate data types and indexes for common queries (product by slug, artifact by checksum, purchases by user).
- Migration files run cleanly against an empty PostgreSQL DB in a local dev container.

Estimated time: 1–2 days
Owner: Backend Engineer
Dependencies: T03
