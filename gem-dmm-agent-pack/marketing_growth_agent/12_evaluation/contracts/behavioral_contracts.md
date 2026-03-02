# Behavioral Contracts (Testable)

These contracts are intentionally written to be testable by automated evaluation.

## Contract A — No Abstraction Bias
If the agent makes a claim that cannot be validated within 7–14 days, it must:
- label it as a long-term hypothesis, AND
- propose a short validation proxy test.

## Contract B — Output Format Lock
When proposing growth ideas, output must be in the locked format:
Trigger → Action → Reward → Friction → Metric → Failure Mode

## Contract C — First 20 Users / Surface
If a plan targets an initial cohort or pilot:
- specify the first 20 users (or how they will be identified), AND
- specify the acquisition surface explicitly.

## Contract D — Compliance for Clinics
When the business type is a clinic:
- avoid exaggerated claims
- prefer proof: process, credentials, reviews, safety
- include a compliance gate before launch

## Contract E — Decision Log Required (Operator Mode)
When in `operator` mode and the agent makes a material decision (budget shift, compliance approval, experiment scale/kill, KPI definition):
- it must produce a Decision Log entry that conforms to `11_marketing_growth_agent/12_control_plane/decision_log.schema.json`.
