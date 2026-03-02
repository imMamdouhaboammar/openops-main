# gem-dmm-agent-pack — Agent Configuration Pack (Gemini Gem)

Version: 1.0.0  
Created: 2026-02-13  
Agent: **Super Acting Digital Marketing Expert**

## What this pack is

This is a production-grade, platform-agnostic configuration pack designed to be imported into a **Gemini Gem** and used as a **discovery-first, evidence-grounded (2026)** digital marketing strategist.

Core behavior:

1) Runs a structured discovery interview (≤5 questions per round)
2) Forces **ONE Core Question (CQ)** and refuses to proceed until CQ is valid
3) Performs external grounding (official docs first) and enforces evidence rules
4) Produces a full digital marketing strategy + execution plan + measurement spec
5) Runs QA/red-team checks before final handoff
6) Localizes strategies for **Egypt + GCC** markets with language/culture/seasonality awareness

## Architecture: Goal-Constrained Reasoning

This agent pack is powered by a **goal-constrained reasoning architecture** that prevents the most damaging class of AI failures: **goal-miss errors** — where the agent answers the surface form of a question while missing the actual objective.

**Example:** If you ask "Should I walk or drive to the car wash?", a typical agent might say "walk" (it's only 500m away). But the goal-constrained architecture recognizes that **the car must reach the wash location**, making walking infeasible.

For marketing, this prevents failures like:

- Recommending channels that exceed budget constraints
- Suggesting tactics that can't deliver results in the required timeline
- Optimizing for vanity metrics instead of business outcomes
- Treating non-exclusive options as mutually exclusive (e.g., "SEO vs Paid Ads")

### Architecture Documentation

- **[Architecture Rationale](System_Prompt/ARCHITECTURE_RATIONALE.md)** - Why this architecture is critical for marketing agents
- **[Marketing Examples](System_Prompt/MARKETING_EXAMPLES.md)** - Real scenarios showing the architecture in action
- **[Integration Guide](System_Prompt/INTEGRATION_GUIDE.md)** - How the architecture integrates with the marketing agent
- **[Testing Scenarios](System_Prompt/TESTING_SCENARIOS.md)** - Test cases for validating the architecture

### How It Works

The architecture implements a 9-step pipeline:

1. **Input Preprocessor** - Normalize request, detect entities
2. **Goal Extractor** - Identify true business objective (not surface request)
3. **Constraint Parser** - Extract budget, timeline, team, ICP constraints
4. **Option Mapper** - Structure recommended channels/tactics
5. **Feasibility Validator** - Test each option against ALL constraints
6. **Frame Corrector** - Detect false dichotomies, reframe invalid questions
7. **Reasoning Engine** - Compare only valid options with constraint-grounded logic
8. **Answer Generator** - Compose structured recommendations
9. **Output Checker** - Verify goal alignment and constraint satisfaction

See `System_Prompt/` directory for the complete implementation (pipeline.json, modules.json, rules.json, prompts.json, relations.json).

- `config/` — rules, guardrails, sources, scoring, and output contract
- `prompts/` — system prompt + flows + research/strategy/execution/QA prompt kits
- `schemas/` — JSON schemas for intake, brief, CQ, strategy, measurement, experiments, memory entries
- `templates/` — copy/paste templates for discovery, strategy, channels, experiments, tracking, weekly review
- `examples/` — sample brief and sample output format

## How to use in Gemini Gems (recommended workflow)

1) Create a new Gemini Gem.
2) Paste the contents of `prompts/system_prompt.txt` into the Gem’s “Instructions” field.
3) Upload this entire folder (or at minimum `config/`, `prompts/`, `templates/`, `examples/`) into the Gem’s knowledge area if supported.
4) Start a session by describing your business goal in plain language.

## Repo Brain Mode (full OpenOps linkage)

To make the Gem repo-aware (not prompt-only), upload these OpenOps foundations into Gem knowledge in addition to this pack:

- `00_governance/00_OpenOps_Constitution_and_IP_Policy.md`
- `00_governance/00D_Gemini_Gems_Operating_Profile.md`
- `00_governance/00E_System_File_Index.json`
- `00_governance/00G_Gem_Entry_Point_Index.json`
- `01_orchestration/01D_Gemini_Gems_Router.json`
- `01_orchestration/01F_Output_Contracts.json`

The `v2.0.0` system prompt already contains a repo navigation precedence and routing logic that uses these files as the Gem Brain backbone.

The agent will automatically start at:

- Stage 0 (safety/scope) → Stage 1 (discovery) → Stage 2 (CQ lock)

It will refuse to generate a strategy until:

- discovery is complete, AND
- CQ is valid, AND
- grounding plan is created (and executed if browsing is enabled).

## How the discovery flow works

Use `prompts/discovery_flow.md` as the interview script.
Rules:

- The agent asks **≤5 questions** per round.
- After each round the agent summarizes knowns/unknowns and drafts a CQ.
- If the CQ is invalid, the agent asks only the missing questions.

## Evidence & grounding rules (2026)

Configured in:

- `config/grounding_sources.yaml`
- `config/scoring_models.yaml`

Hard rules:

- Key recommendations require **≥3 independent confirmations**.
- Apply **recency decay after 120 days** for time-sensitive claims.
- Include **dates** for time-sensitive claims.
- Reddit is qualitative context only and never counts as a confirmation.

## Egypt + GCC localization notes

The pack is tuned for Egypt, Saudi Arabia, UAE, and GCC markets:

- Dialect-aware content guidance (Egyptian/Gulf Arabic when requested)
- Seasonal demand planning (Ramadan/Eid, Hajj/Umrah, local holidays)
- Regional channel preferences (validate with current data)

## Safety & privacy guidance

Do not paste:

- passwords, API keys, OAuth tokens
- full customer lists (emails, phones)
- payment details

Prefer:

- ranges and aggregates (e.g., “CVR 1.2–2.1%”)
- anonymized examples with sensitive details removed

## Quickstart prompts (copy/paste)

### 1) B2B SaaS

“We’re a B2B SaaS. Our main goal is qualified demos. Please start the discovery interview. Don’t give strategy until you lock the Core Question.”

### 2) Ecommerce

“We’re ecommerce. Goal is profitable repeat purchases. Start discovery and lock a CQ before recommending channels.”

### 3) Local services

“We’re a local services business. Goal is qualified leads. Start discovery and create a measurement spec (GA4/GTM) once CQ is valid.”

## Notes on citations

This pack allows placeholders in the “Evidence Citations Plan” while browsing is pending. If browsing is enabled, the agent should replace placeholders with direct URLs and accessed/publish dates.
