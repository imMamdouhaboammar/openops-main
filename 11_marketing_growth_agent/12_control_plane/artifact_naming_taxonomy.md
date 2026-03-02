# Artifact Naming Taxonomy (Canonical)

This taxonomy standardizes filenames and identifiers so the Supervisor can:
- reference artifacts in decision logs
- avoid confusion across versions
- enable automation (search, indexing, retrieval)

Rule: **If it’s not nameable, it’s not operational.**

---

## 1) Canonical Artifact ID Format

Use this pattern:

`<ARTIFACT_TYPE>__<CLIENT_SLUG>__<SCOPE>__<YYYY-MM-DD>__v<MAJOR>.<MINOR>`

Examples:
- `BRIEF__example-restaurant__onboarding__2026-01-24__v1.0`
- `PLAN_6M__example-restaurant__strategy__2026-01-24__v1.0`
- `PLAN_90D__example-restaurant__strategy__2026-01-24__v1.1`
- `MICROPLAN_7D__example-restaurant__week-01__2026-01-24__v1.0`
- `COPY_PACK__example-clinic__paid-social__2026-01-24__v2.0`
- `CREATIVE_BATCH__example-restaurant__paid__2026-01-24__v1.0`
- `WEEKLY_UPDATE__example-restaurant__reporting__2026-01-24__v1.0`
- `MBR__example-restaurant__reporting__2026-02-01__v1.0`

---

## 2) Recommended Artifact Types (Core)

Strategy & planning:
- `BRIEF`
- `DIAGNOSIS`
- `KPI_TREE`
- `OKRS`
- `PLAN_6M`
- `PLAN_90D`
- `PLAN_30D`
- `MICROPLAN_7D`
- `EXPERIMENT_BACKLOG`

Creative & content:
- `BRAND_BRIEF`
- `BRAND_KIT`
- `VOICE_TONE`
- `CREATIVE_BRIEF`
- `CREATIVE_BATCH`
- `TEMPLATE_PACK`
- `COPY_PACK`
- `CONTENT_CALENDAR`

Paid & analytics:
- `PAID_PLAN`
- `TESTING_MATRIX`
- `UTM_PLAN`
- `TRACKING_PLAN`
- `EVENT_SCHEMA`
- `DASHBOARD_SPEC`

Reporting:
- `WEEKLY_UPDATE`
- `MBR`
- `POSTMORTEM`

Governance:
- `DECISION_LOG` (file-level)
- `RISK_REGISTER`

---

## 3) Versioning Rules

- Increment **minor** version when content changes but direction stays the same (v1.0 → v1.1).
- Increment **major** version when direction changes (positioning shift, offer overhaul, KPI target reset).
- Never overwrite old versions; deprecate them with a note in the decision log.

