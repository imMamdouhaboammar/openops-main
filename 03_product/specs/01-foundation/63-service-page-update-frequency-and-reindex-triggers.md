# Spec 63: Service Page Update Frequency & Re-Index Triggers

## Purpose
Define a controlled, signal-based system that determines:
- When service pages should be updated
- What types of changes justify re-indexing
- How to trigger re-crawling without harming trust, rankings, or AI confidence

This spec prevents random edits and ensures **every update has intent, justification, and measurable impact**.

---

## Core Philosophy

Search engines and AI systems value:
- Stability
- Intentional updates
- Clear signals of relevance

Frequent unnecessary edits reduce trust.
Rare but meaningful updates increase authority.

---

## Update Frequency Model

### Baseline Update Cadence

Each service page must follow a **minimum and maximum update window**.

Tier A Services  
- Minimum: once every 60–90 days
- Maximum: once every 14 days (unless triggered by critical event)

Tier B Services  
- Minimum: once every 120–180 days
- Maximum: once every 30 days

Tier C Services  
- Minimum: once every 6–12 months
- Maximum: once every 90 days

No service page should remain untouched for more than 12 months.

---

## Update Types Classification

### Minor Update
Examples:
- Copy refinement
- Microcopy clarity
- Small internal links adjustment
- Metadata wording improvement

Rules:
- Does NOT trigger sitemap priority change
- Does NOT require re-index request
- Safe to batch with other minor updates

---

### Moderate Update
Examples:
- New FAQ added
- Section restructuring
- New internal links
- Portfolio reference added

Rules:
- Updates lastmod in sitemap
- Allows natural re-crawl
- No forced index submission

---

### Major Update
Examples:
- New case study
- Service scope expansion
- Regulatory or compliance change
- Crisis-related framework update

Rules:
- Must update:
  - Content
  - Schema
  - AEO blocks
- Triggers re-index signal
- Requires QA and approval

---

## Re-Index Trigger Conditions

A service page MUST trigger re-indexing when:

- New portfolio proof is added
- Regulatory requirements change
- Service positioning or tier changes
- Entity relationships are updated
- AEO answer blocks materially change

A service page MUST NOT trigger re-indexing when:
- Only styling changes occur
- Icons or visuals are swapped
- Whitespace or layout is adjusted

---

## Re-Index Trigger Mechanisms

Allowed mechanisms:
- sitemap.xml lastmod update
- internal linking reinforcement
- structured data update

Disallowed:
- Artificial pinging
- Repeated manual submission
- Automated daily resubmission

---

## AI-Specific Re-Evaluation Signals

To encourage AI systems to refresh understanding:

- Update structured FAQs with clearer answers
- Adjust entity relationships carefully
- Add explicit “Last reviewed” content notes
- Strengthen citations and internal references

Never rewrite entire page just to force AI refresh.

---

## Governance & Approval Rules

Any update must have:
- Update type (minor / moderate / major)
- Reason for update
- Expected outcome (SEO, AEO, clarity, compliance)

Major updates require:
- Content review
- SEO review
- Final approval

---

## Logging & Traceability

Each service page must maintain:
- Update log (date, type, reason)
- Last meaningful change date
- Last re-index trigger date

Logs can live in:
- Markdown frontmatter
- Internal changelog file

---

## Anti-Patterns (Strictly Forbidden)

- Updating content “just because”
- Weekly rewrites without justification
- Cosmetic edits labeled as major updates
- Copy changes that break procurement language consistency

---

## Dependencies

Depends on:
- Spec 62: Crawl Depth & Priority Weighting
- Spec 59: Service Page AEO & FAQ Engineering
- Spec 60: Schema & Entity Binding
- Spec 15: Content Governance

---

## Success Criteria

This spec is successful when:
- Service pages show stable rankings
- AI answers remain consistent and accurate
- Updates correlate with improved visibility or trust
- No crawl budget is wasted on noise

---

## Explicit Non-Goals

This spec does NOT:
- Define content creation strategy
- Replace editorial calendar
- Automate publishing
- Handle blog update cadence