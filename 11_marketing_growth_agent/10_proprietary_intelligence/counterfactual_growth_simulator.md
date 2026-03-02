# Counterfactual Growth Simulator

**Version**: 1.0.0  
**Last Updated**: January 22, 2026

---

## Purpose
Model "what would have happened anyway" to isolate true incremental impact.

---

## Inputs
- Baseline trend (last 12-24 weeks)
- Seasonality factors
- Known external events (product changes, PR, pricing)
- Channel spend and exposure

---

## Outputs
- Counterfactual baseline curve
- Incremental lift by channel
- Confidence band and decision rule

---

## Decision Rules
- If incremental lift < minimum threshold, do not scale.
- If confidence is below L3, run holdout or geo test.

---

## Notes
Use with MMM and incrementality tests; never rely on correlation alone.
