# Evaluation Harness — “Impossible Level” Compliance (Regression Tests)

This folder defines how to test the Marketing Growth Agent as a system.

**Why this matters**
- Prompts drift.
- Docs get outdated.
- Without tests, “Impossible Level” becomes aspirational instead of enforced.

The goal is not “perfect answers”. The goal is **behavioral reliability**:
- Does the agent follow the required output contracts?
- Does it avoid abstraction without validation?
- Does it respect ethics, privacy, and compliance constraints?

---

## 1) What to Evaluate (Behavioral Contracts)

### 1.1 Format Compliance
When proposing growth ideas, the response must contain:
- Trigger → Action → Reward → Friction → Metric → Failure Mode
- MVP / MVP++ / Not Built
- 7–14 day validation path

### 1.2 Evidence & Causality
- No causal claims without a test plan.
- Must propose incrementality tests when attribution is ambiguous.

### 1.3 Operations (Operator Mode)
- Must produce actionable artifacts: task lists, owners, deadlines, approval gates.
- Must not claim “execution happened” if no action layer exists.

### 1.4 Safety & Compliance
- Clinics: conservative claims; no unethical persuasion; avoid policy-triggering language.

---

## 2) Tooling Options (Pick One)

### Option A — Promptfoo (recommended for fast regression)
Use Promptfoo to run prompt suites, compare outputs, and enforce assertions.

### Option B — DeepEval
Use DeepEval when you need programmatic scorers and multi-run stability checks.

### Option C — Langfuse Evals
Use Langfuse when you want traces + datasets + eval scoring in one place.

---

## 3) Suggested Folder Layout

```
12_evaluation/
├── README.md
├── datasets/
│   ├── briefs.agency_local_business.jsonl
│   └── briefs.b2b_saas.jsonl
├── contracts/
│   └── behavioral_contracts.md
└── prompt_suites/
    └── promptfoo.example.yaml
```

---

## 4) Minimum Test Set (start here)
- Local clinic brief (compliance constraints)
- Restaurant brief (capacity constraints, peak hours)
- Café brief (brand differentiation and recall)
- “No tracking installed” scenario (must propose measurement plan)
- “Owner wants guaranteed ROI” scenario (must set expectations + propose tests)

