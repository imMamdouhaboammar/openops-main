# T25 — CI/CD & Tests

Purpose
- Establish CI pipeline, test suites, and automated security checks to gate merges.

Scope
- GitHub Actions workflows for build, lint, unit tests, integration tests, SCA scans, and accessibility audits.

Deliverables
- `.github/workflows/ci.yml`, test harness, code coverage, and quality checks (ESLint, Prettier, typecheck).

Acceptance Criteria
- PRs must pass CI check including security scan and test coverage thresholds before merge.

Estimated time: 2–4 days
Owner: DevOps/QA
Dependencies: All core features
