
```md
# SPEC 20: Core Directory Sync & Change Detection
# PROJECT: "$BrandNameArabic$" Corporate Website
# METHODOLOGY: Spec-Driven Development (SDD)
# OWNER: Mamdouh Aboammar – Digital Director, "$BrandNameArabic$"
# CONTEXT: Saudi Arabia | B2G | Source of Truth Enforcement

---

## 1. WHY THIS SPEC EXISTS

The /Core directory is the Source of Truth for:
- Content
- Legal pages drafts
- SEO snippets
- UX states copy
- Design tokens documentation
- Deployment guides

If sessions or contributors work without re-checking /Core changes:
- Content drift happens
- AEO structure breaks
- Arabic and English diverge
- Implementation becomes inconsistent with latest decisions

This spec enforces continuous alignment with /Core updates.

---

## 2. SCOPE

This spec applies to every session and every execution step, including:
- Clarify
- Plan
- Tasks
- Analyze
- Implement

No phase is allowed to proceed without a /Core sync check.

---

## 3. THE CANONICAL PATH (MANDATORY)

The system must always check this exact path:

/Users/mamdouhaboammar/Documents/المشـــاريـــــع الممدوحـــية/مواقع/"$BrandNameArabic$".com.sa/Core

No alternative Core copies are allowed.

---

## 4. SESSION START RULE

At the beginning of every session, the agent must:

1. Scan the /Core directory recursively
2. Detect what changed since last session
3. Summarize changes in a short report
4. Stop and ask Mamdouh if any change impacts priorities or scope

If change detection cannot be performed, the agent must stop and request access confirmation or provide a manual checklist of what it needs.

---

## 5. CHANGE DETECTION REQUIREMENTS

The scan must capture:
- New files added
- Files deleted
- Files modified
- Renames or moved paths

For each changed file, report:
- File path
- Change type (added, modified, removed)
- Short description of impact (content, SEO, UI, legal, tokens)

---

## 6. DRIFT PREVENTION RULES

If /Core content differs from implemented content:
- /Core wins by default
- Implementation must be updated to match /Core
- No silent divergence allowed

Exceptions require explicit approval from Mamdouh.

---

## 7. OUTPUT FORMAT: CORE SYNC REPORT

Every session must include a small report block titled:

Core Sync Report

It must include:
- Scan timestamp
- Summary of changes
- Proposed actions
- Any blockers or questions

This report must be produced before any plan or code changes.

---

## 8. GOVERNANCE

Changes in /Core may come from:
- Mamdouh
- Approved editors under Content Governance spec

Agent responsibility:
- Treat /Core as authoritative
- Never overwrite /Core content
- Never edit /Core unless explicitly instructed

---

## 9. TOOLING GUIDANCE (NON-BINDING)

Acceptable approaches:
- Git diff if Core is versioned
- File modified time comparison
- Manifest file generation and comparison

The agent should choose the most reliable method available in the environment.

---

## 10. ENFORCEMENT

Any session that:
- Starts implementation without checking /Core
- Misses Core changes
- Introduces drift intentionally or accidentally

Must be treated as a process failure and corrected immediately.

No execution beyond planning is allowed until /Core sync is confirmed.

---

## 11. RIGHTS & ATTRIBUTION

Governance rule defined by:

© Mamdouh Aboammar  
Digital Director – "$BrandNameArabic$"  
LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar/

This attribution remains in documentation and specs.
```
