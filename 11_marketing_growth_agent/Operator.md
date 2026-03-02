# Operator.md — Boot File for the Marketing Growth Agent OS

**Status**: Primary entry point for this repo  
**Audience**: Agency operators, agent engineers, orchestrators  
**Scope**: How to run, extend, and govern the 360° agency OS

---

## 0) One‑Page Boot Sequence (Start Here)

1) **Read the Live Journey (the god‑file)**  
   - `11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json`  
   Contains the full journey, roles, handoffs, embedded skill summaries, and grounding sources.

2) **Understand the control plane contracts**  
   - Task envelope: `11_marketing_growth_agent/12_control_plane/task_envelope.schema.json`  
   - Pod response: `11_marketing_growth_agent/12_control_plane/pod_response_envelope.schema.json`  
   - Decision log: `11_marketing_growth_agent/12_control_plane/decision_log.schema.json`

3) **Generate a Dispatch Pack from client intake**  
   ```bash
   node 11_marketing_growth_agent/13_automation/generate_dispatch_pack.js \
     --in 11_marketing_growth_agent/13_automation/examples/client_intake.restaurant.json \
     --out /tmp/openops_ssot/example-restaurant
   ```

4) **Run the supervisor dispatcher (filesystem SSOT mode)**  
   ```bash
   node 11_marketing_growth_agent/13_automation/run_supervisor_dispatch.js \
     --ssot /tmp/openops_ssot/example-restaurant \
     --config 11_marketing_growth_agent/13_automation/config/connector_config.fs.json
   ```

5) **Validate the journey + run smoke test**  
   ```bash
   node 11_marketing_growth_agent/13_automation/validators/validate_agency_live_journey.js \
     --in 11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json

   node 11_marketing_growth_agent/13_automation/smoke_test/run_e2e_smoke.js
   ```

---

## 1) Operating Modes (How This OS Behaves)

**Advisor Mode (Growth Science OS)**  
- Produces strategy, hypotheses, experiments, and learning narratives.  
- Uses causal discipline and evidence-first reasoning.  
- Writes proposals and plans but does **not** execute without authorization.

**Operator Mode (Agency Operations OS)**  
- Executes tasks via the control plane and SSOT.  
- Supervisor authorizes pods; pods never act autonomously.  
- Every material decision is logged.

**Mode Router Reference**  
`11_marketing_growth_agent/12_control_plane/mode_router.md`

---

## 2) Core Invariants (Non‑Negotiables)

- **Single Source of Truth (SSOT)** — if it isn’t in SSOT, it didn’t happen.  
- **Artifacts‑first** — every stage outputs a concrete artifact.  
- **Supervisor‑first** — pods only act with explicit authorization.  
- **Evidence‑first** — no causal claims without a test plan.  
- **Compliance gates** — clinics and regulated categories require stricter review.

---

## 3) The Live Agency Journey (Canonical)

The **canonical journey** lives here:
`11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json`

It includes:
- Stages, handoffs, gates, and exit criteria
- Brand identity track (triggered when no brand kit exists)
- Skills per specialty (with embedded summaries)
- Grounding sources and operational KPIs

**Stages (high‑level):**
1. Intake / Onboarding  
2. Diagnosis & Audit  
3. Strategy + 6‑Month Operating Plan  
4. Foundation Setup (tracking + brand + SSOT)  
5. Production (content + creative)  
6. Publish & Launch (organic + paid)  
7. Measure → Report → Optimize (continuous loop)

---

## 4) Control Plane (Authorization + Handoffs)

**Why:** Turns the agency into a deterministic, auditable system.

Key files:
- `12_control_plane/pod_registry.json`  
- `12_control_plane/task_envelope.schema.json`  
- `12_control_plane/pod_response_envelope.schema.json`  
- `12_control_plane/decision_log.schema.json`

Rules:
- **Every pod task** must be issued as a Task Envelope.  
- **Every decision** that changes scope, budgets, or claims must be logged.  
- **No bypasses**: if it’s not in SSOT, it doesn’t exist.

---

## 5) Automation Layer (Execution Engine)

Location: `11_marketing_growth_agent/13_automation/`

### Key scripts
- **Dispatch pack generator**  
  `generate_dispatch_pack.js`
- **Supervisor runtime dispatcher**  
  `run_supervisor_dispatch.js`
- **Cadence generator**  
  `scheduler/generate_cadence_pack.js`
- **Journey validator**  
  `validators/validate_agency_live_journey.js`
- **Smoke test**  
  `smoke_test/run_e2e_smoke.js`

---

## 6) Skills & Registry (Single Source for Agent Capabilities)

**Repo skills registry** (auto‑generated):  
`11_marketing_growth_agent/14_registry/repo_skills_registry.v1.json`

**Embed summaries into the journey (god‑file refresh):**
```bash
node 11_marketing_growth_agent/13_automation/skills/embed_skill_summaries_into_journey.js \
  --journey 11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json \
  --skills ./skills \
  --out 11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json
```

---

## 7) Grounding & Research Protocol

Use the internal grounding engine:
- `11_marketing_growth_agent/11_marketing_growth_system/11C_Grounding_and_Research_Engine.json`

The journey JSON already lists **external grounding sources** (platform policies, measurement docs, MMM references, etc.).

---

## 8) Directory Map (Reality‑based)

```
11_marketing_growth_agent/
├── 00_constitution/
├── 01_knowledge_base/
├── 02_agent_profile/
├── 03_tools_registry/
├── 04_prompts_library/
├── 05_memory_systems/
├── 06_workflows/
├── 07_integrations/
├── 08_analytics/
├── 09_templates/
├── 10_proprietary_intelligence/
├── 11_marketing_growth_system/
├── 12_control_plane/
├── 12_evaluation/
├── 13_automation/
├── 14_registry/
├── Operator.md   ← (this file)
└── README.md
```

---

## 9) “If you only read two files”

1) `06_workflows/agency_live_journey.v1.json`  
2) `12_control_plane/task_envelope.schema.json`

These two define **how the agency runs** and **how tasks are authorized**.

---

## 10) Next Upgrade Targets (Operator’s Roadmap)

- Add **artifact schemas** per handoff for strict QA.  
- Add **approval SLA enforcement** inside the dispatcher.  
- Expand **grounding sources** and automate policy checks (Google/Meta).  
- Add **live dashboards** for cadence + SLA performance.

