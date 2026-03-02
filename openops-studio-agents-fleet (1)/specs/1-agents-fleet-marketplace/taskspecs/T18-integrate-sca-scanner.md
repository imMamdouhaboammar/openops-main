# T18 — Integrate SCA & Secret Scanner

Purpose
- Integrate security scanners (SCA, Trivy, secret detection) into upload pipeline and record findings in `scan_reports`.

Scope
- Configure scanner container/CLI execution, map severity levels to publish policy, and provide remediation guidance messages.

Deliverables
- Scanner integration module, sample scan reports, and a policy file that blocks publishing on critical findings.

Acceptance Criteria
- Uploads generate scan reports; critical findings prevent publish and surface remediation to sellers.

Estimated time: 2–4 days
Owner: Security Engineer
Dependencies: T17, T01
