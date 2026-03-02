# Task Envelope Examples

These are **example task envelopes** showing how the Supervisor Orchestrator authorizes pods.

Canonical schema:
- `11_marketing_growth_agent/12_control_plane/task_envelope.schema.json`

Render to a Markdown brief:

```bash
node 11_marketing_growth_agent/12_control_plane/render_task_brief.js \
  --in 11_marketing_growth_agent/12_control_plane/examples/restaurant_paid_launch.envelope.json
```

## Example files

- Clinic (Creative Pod — brand kit): `clinic_brand_identity_task.envelope.json`
- Clinic (Analytics Pod — tracking plan): `clinic_tracking_plan.envelope.json`
- Restaurant (Strategy Pod — 6-month plan): `restaurant_strategy_6month_plan.envelope.json`
- Restaurant (Content Pod — 4-week calendar): `restaurant_content_calendar.envelope.json`
- Restaurant (Paid Pod — launch plan): `restaurant_paid_launch.envelope.json`
- Restaurant (Lifecycle Pod — reviews + win-back): `restaurant_lifecycle_review_engine.envelope.json`

