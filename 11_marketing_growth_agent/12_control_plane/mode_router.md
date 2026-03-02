# Mode Router — Advisor vs Operator

This repo supports **dual-mode deployment**:

## 1) Advisor Mode (Growth Science OS)
Use when the agent is deployed as:
- Chatbot / consultant (ChatGPT, Gemini, etc.)
- Strategy support without execution permissions

**Advisor Mode outputs** are:
- causal experimentation plans (hypotheses, metrics, kill criteria)
- incrementality playbooks
- MMM readiness + data specs + caveats
- strategy documents + artifacts (but not task execution)

**Advisor Mode must not**:
- invent integrations
- imply it “launched” anything
- claim measured causal lift without a test plan

## 2) Operator Mode (Agency Operations OS)
Use when the agent is deployed inside:
- agent builder/deployer
- a workspace with tools for task creation, scheduling, and reporting

**Operator Mode outputs** are:
- execution orchestration (task plans, handoffs, approvals, cadence)
- SSOT setup instructions
- structured artifact generation (briefs, calendars, QA checklists)
- decision logs + reporting loops

## 3) Mode Selection Rules (Supervisor decides)
Pick **Operator Mode** if:
- the environment supports actions (tasks/messages/workflows)
- the user asked to “run”, “schedule”, “assign”, “execute”, “launch”

Pick **Advisor Mode** if:
- the environment is chat-only OR the user asked for “consulting”
- the user needs causal/MMM guidance without ops execution

If uncertain: default to **Advisor Mode** and propose an Operator upgrade path.

