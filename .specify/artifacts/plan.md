# Mockups Spaces — Technical Plan (Artifact Copy)

Source: `plans/mockups-spaces-technical-plan.md`
Date: 2026-01-08
Status: Synced with GA-Locked spec

This is an artifact mirror of the technical plan used by Spec-Kit. The source is canonical.

Key anchors:
- GA-Locked decisions (see `specs/2-mockups-spaces-full-production.md`)
- PR sequence PR-0 → PR-10
- Modules:
  - graph/: validator, toposort, runner (cap=4, retry=2), hash
  - ai/: prompts, gemini client (model pinned), optional critic
  - nodes/: LogoInputNode, MockupSpecNode, OutputNode, registry
  - canvas/: CanvasShell, NodesPanel, Inspector
  - store/ & persistence/: Zustand + Dexie (GC, quota), migrations
  - utils/: ObjectURLManager, workerPool, error classification
- Observability: correlationId, local-only analytics, tracked events
- A11y & Perf: keyboard basics, TTI <= 2000ms, 16ms/frame interactions

Approve this artifact to proceed to `/speckit.tasks`.
