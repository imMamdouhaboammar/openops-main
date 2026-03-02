# Spec 64: Service Page Trust Decay Detection & Refresh Signals

## Purpose
Define a system to detect **trust decay** in service pages and apply
**precision refresh actions** that restore authority, relevance, and AI confidence
without full rewrites or ranking volatility.

This spec protects "$BrandNameArabic$" from:
- Silent ranking erosion
- AI answer drift
- Institutional credibility decay
- Over-editing instability

---

## What Is Trust Decay?

Trust decay occurs when a service page:
- Still ranks or gets crawled
- Still renders correctly
- But is no longer perceived as:
  - Current
  - Authoritative
  - Primary source
  - Institutionally reliable

This decay is often invisible until:
- Rankings flatten
- AI answers become generic or inaccurate
- Competitors start outranking without better content

---

## Trust Decay Signals

### Search & Index Signals

A service page is considered at-risk when:

- Impressions remain stable but CTR declines
- Rankings stagnate despite competitor movement
- Crawl frequency decreases gradually
- Rich results stop appearing
- FAQ snippets disappear

---

### AI Answer Quality Signals

Trust decay is strongly indicated when:

- AI answers paraphrase competitors instead of "$BrandNameArabic$"
- Answers lose specificity
- Page is cited less or not at all
- Entity associations weaken
- Answers drift toward generic industry explanations

---

### Content & Semantics Signals

Internal signals include:

- Service descriptions feel dated
- Terminology no longer matches procurement language
- Examples feel historical instead of operational
- No visible review or update markers
- Internal links point away more than toward

---

## Trust Decay Severity Levels

### Level 1: Soft Decay
Symptoms:
- Reduced engagement
- Slight ranking flattening
- AI still references page indirectly

Action:
- Micro-refresh only

---

### Level 2: Medium Decay
Symptoms:
- Lost snippets
- AI answers generic
- Competitors overtaking

Action:
- Structured refresh required

---

### Level 3: Hard Decay
Symptoms:
- Rankings drop
- AI ignores page
- Entity relevance weakened

Action:
- Authority rebuild refresh

---

## Refresh Strategies by Level

### Micro Refresh (Level 1)

Allowed actions:
- Update headings for clarity
- Improve internal link anchors
- Add or refine FAQ answers
- Add “Last reviewed” note
- Strengthen entity mentions

Forbidden:
- Rewriting main narrative
- Changing service positioning

---

### Structured Refresh (Level 2)

Required actions:
- Expand AEO answer blocks
- Update service methodology section
- Add new internal authority links
- Refresh schema relationships
- Add one proof or institutional reference

---

### Authority Rebuild Refresh (Level 3)

Required actions:
- Reassert service positioning
- Add or update portfolio proof
- Strengthen compliance language
- Update entity bindings
- Add citations and cross-page authority loops

Must be approved before execution.

---

## Refresh Signal Emission Rules

After any refresh:

Allowed signals:
- sitemap.xml lastmod update
- Internal link reinforcement
- Schema update
- Content-level review markers

Disallowed:
- Forced reindex spam
- Excessive sitemap pings
- Rewrites without signal change

---

## AI Re-Trust Signals

To restore AI confidence:

- Explicitly state scope and expertise
- Use consistent institutional language
- Reinforce entity relationships
- Add high-clarity Q&A blocks
- Maintain structural stability

Never change page intent during refresh.

---

## Detection Workflow

Trust decay detection should be triggered by:
- Monthly SEO review
- Quarterly AI answer audit
- Post-procurement cycle analysis
- Competitive displacement events

Detection is analytical, not reactive.

---

## Logging & Traceability

Each refresh must log:
- Detected decay level
- Trigger signals
- Refresh type applied
- Expected outcome
- Post-refresh monitoring window

Logs are mandatory for Level 2 and Level 3 actions.

---

## Anti-Patterns (Strictly Forbidden)

- Full rewrites for soft decay
- Cosmetic updates labeled as refresh
- Chasing competitors blindly
- Refreshing without diagnosis
- Changing tone or audience mid-page

---

## Dependencies

Depends on:
- Spec 63: Update Frequency & Re-Index Triggers
- Spec 59: AEO Answer Blocks
- Spec 60: Schema Stack & Entity Binding
- Spec 50: AI Trust Loop & Authority Reinforcement

---

## Success Criteria

This spec is successful when:
- Rankings stabilize or recover
- AI answers regain specificity
- Page citations increase
- Authority signals strengthen
- No volatility is introduced

---

## Explicit Non-Goals

This spec does NOT:
- Replace content strategy
- Mandate constant updates
- Encourage aggressive SEO tactics
- Automate refresh actions