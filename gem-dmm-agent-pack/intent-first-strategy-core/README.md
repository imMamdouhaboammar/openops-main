# intent-first-strategy-core — Intent-First Strategic Thinking sub-Pack
Version: 1.0.0  
Date: 2026-02-13  
Owner: OpenOps Studio (Mamdouh Aboammar)

## What this is
`intent-first-strategy-core` is a small, strict configuration pack for a Gemini Gem marketing agent.
It forces an **intent-first diagnosis** before any strategy is generated.

This is designed to prevent “template marketing”:
- no channel dumps
- no generic tactics
- no strategy until the agent proves the real issue

## Non-negotiables enforced
1) No strategy until diagnosis is complete and validated.
2) Separate:
   - Client Request
   - Client Intent
   - True Issue
   - Constraints
3) Output:
   - One Primary Problem Statement (PPS)
   - One Core Question (CQ)
   - Evidence: “Why we believe this is the true issue”
4) Interview:
   - max 5 questions per round
   - each round updates a Live Diagnosis Map
5) Confirm:
   - user must confirm or refine diagnosis
6) Strategy binding:
   - every strategy section references which PPS clause it solves, which metric it moves, plus assumptions and risks

## Files and how to use in Gemini Gems
Recommended:
1) Paste `prompts/system_prompt.txt` into the Gem “Instructions”.
2) Upload the folder `intent-first-strategy-core/` into the Gem’s knowledge (if supported).

Key references:
- Policy and gates: `config/intent_policy.yaml`
- State machine: `config/diagnosis_state_machine.yaml`
- Output contract: `config/output_contract.yaml`
- Refusal rules: `config/refusal_rules.yaml`
- Interview flow: `prompts/diagnosis_interview.md`
- CQ rules: `prompts/cq_builder.md`
- Strategy binding rules: `prompts/strategy_binding_rules.md`
- QA checklist: `prompts/qa_diagnosis.md`

## How the state machine works (high level)
Stages:
1) Intake
2) Intent probe
3) True issue hypothesis
4) Validation (user confirms or refines)
5) CQ lock (CQ Gate)
6) Strategy allowed

Hard gate:
Strategy is allowed only when:
- `validation.confirmed = true`
- `cq.valid = true`

## Example flow
User: “Run ads for us.”

Agent behavior:
1) Captures Client Request: “Run ads.”
2) Probes intent: “Why now? What metric must move?”
3) Hypothesizes true issue: “The block might be offer clarity or weak validation touchpoints.”
4) Proposes PPS + CQ and asks user to confirm.
5) Only after confirmation + valid CQ does it produce strategy.

## Inspiration sources
This pack is compatible with and inspired by:
- `gem-dmm-agent-pack/intent_touchpoints_system` (touchpoints-driven thinking)
- `11_marketing_growth_agent/Final Chubb Arabia Digital Assets Strategy for B2B Decision Enablement.txt` (touchpoints and decision-moment framing)

