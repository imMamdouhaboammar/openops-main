# Causal Inference & Experimentation Playbook

**Version**: 1.0.0  
**Last Updated**: January 22, 2026

---

## Purpose
Provide causal-first guidance for marketing decisions using incrementality, experimentation, and rigorous inference.

---

## Causal Framework

### Core Question
"What would have happened if we did nothing?"

### Primary Methods (Preferred Order)
1. **Randomized Controlled Trials (RCTs)**
   - User-level or geo-level randomization
   - Strongest causal evidence
2. **Holdout & Ghost Ads**
   - Measure incremental lift without full exposure
3. **Geo Lift / Geo Experimentation**
   - Regional tests to isolate channel effects
4. **Regression Discontinuity / Difference-in-Differences**
   - Quasi-experimental when randomization is impossible
5. **Propensity Score Matching**
   - Control for confounders in observational data

---

## Experiment Design Standards

### Minimum Experiment Spec
- Hypothesis (clear and falsifiable)
- Primary KPI and guardrail metrics
- Power analysis (MDE + sample size)
- Randomization unit (user, session, geo)
- Duration (min runtime + seasonality checks)
- Decision rules (scale, iterate, or kill)

### Guardrails
- Never break product reliability
- Never degrade trust or brand
- Pause if negative unit economics are detected

---

## Incrementality Decision Tree

1. **Is randomization possible?**
   - Yes → run RCT
   - No → run geo test or holdout
2. **Is data sparse?**
   - Use higher MDE, longer duration
3. **Is channel attribution noisy?**
   - Use MMM + incrementality testing

---

## Reporting Template

- Test name and objective
- Method: RCT / holdout / geo / quasi
- Sample size and duration
- Lift (%) and absolute impact
- Confidence interval
- Recommendation + next test

---

## Anti-Patterns
- Stopping tests early for "positive" results
- Ignoring guardrail metrics
- Confusing correlation with causation
- Shipping without documentation
