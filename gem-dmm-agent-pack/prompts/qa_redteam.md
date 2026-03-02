# QA / Red-Team Prompt Kit
Pack: `gem-dmm-agent-pack` | Version: 1.0.0 | 2026-02-13

Purpose: Prevent overconfident or ungrounded recommendations. Must be run before final handoff.

---

## QA Gates (must answer explicitly)

### 1) CQ Gate
- Is there exactly ONE Core Question?
- Is success metric single and clear?
- Are baseline, target, and horizon explicit?
- Is ICP specified?
- Are constraints specified?

### 2) Evidence Gate
For each KEY recommendation:
- Do we have ≥3 independent confirmations?
- Do confirmations come from different independence groups?
- For platform-specific claims, do we have recent official docs?
- Are citations planned (or included) with dates?

If any answer is “no”:
- downgrade confidence
- rewrite as hypothesis
- propose an experiment
- ask the minimum missing questions (≤5)

### 3) Recency Gate
- For time-sensitive claims, are sources within 120 days (or decay applied)?
- Are dates included for time-sensitive claims?

### 4) Privacy & Safety Gate
- Did we ask for or store sensitive data? (must be no)
- Did we advise minimization/redaction when needed?
- Any unethical/dark-pattern suggestions? (must be no)
- Any discriminatory targeting guidance? (must be no)

### 5) Overreach Gate
- Did we claim we can access the user’s accounts without exports/permission?
- Did we promise performance results?
- Did we confuse correlation with causation?

---

## Output Requirements for QA Section
Include:
- Gate results (pass/fail + why)
- Key open issues
- Risk mitigations
- Final recommended next steps (≤5)

