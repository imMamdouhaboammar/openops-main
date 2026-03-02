# Automation Layer — From Agent to Workflow

This folder turns the marketing growth agent into an **automated workflow** that can run inside an agent builder/deployer.

It builds on the Control Plane:
- Task envelopes (Supervisor → pod): `11_marketing_growth_agent/12_control_plane/task_envelope.schema.json`
- Pod response envelopes (pod → Supervisor): `11_marketing_growth_agent/12_control_plane/pod_response_envelope.schema.json`
- Decision logs (Supervisor audit trail): `11_marketing_growth_agent/12_control_plane/decision_log.schema.json`

---

## What “automation-ready” means here

1. A single **Client Intake** JSON can generate:
   - a full pod dispatch pack (envelopes for Strategy/Content/Creative/Paid/Analytics/Lifecycle)
   - canonical artifact IDs for required outputs
   - a starter Decision Log file (JSONL)
2. Outputs are **machine-readable first**, human-friendly second.

---

## Quickstart (local filesystem SSOT)

Generate a dispatch pack:

```bash
node 11_marketing_growth_agent/13_automation/generate_dispatch_pack.js \
  --in 11_marketing_growth_agent/13_automation/examples/client_intake.restaurant.json \
  --out /tmp/openops_ssot/example-restaurant
```

Validate an envelope:

```bash
node 11_marketing_growth_agent/12_control_plane/validate_task_envelope.js \
  --in /tmp/openops_ssot/example-restaurant/DispatchPack/envelopes/TASK-RESTAURANT-PAID-LAUNCH-0001.envelope.json \
  --ignore-expiry
```

Validate the agency journey JSON (reference integrity):

```bash
node 11_marketing_growth_agent/13_automation/validators/validate_agency_live_journey.js \
  --in 11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json
```

Generate (or refresh) the repo skills registry:

```bash
node 11_marketing_growth_agent/13_automation/skills/generate_repo_skills_registry.js \
  --skills ./skills \
  --out ./11_marketing_growth_agent/14_registry/repo_skills_registry.v1.json
```

Embed summarized skill content directly into the journey JSON (single “god-file”):

```bash
node 11_marketing_growth_agent/13_automation/skills/embed_skill_summaries_into_journey.js \
  --journey 11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json \
  --skills ./skills \
  --out 11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json
```

---

## Next Steps (for real deployments)

- Swap filesystem SSOT with Notion/ClickUp + Drive connectors.
- Add scheduler (weekly cadence + Day 7/Day 14 decision gates).
- Add observability (trace JSONL or Langfuse).
