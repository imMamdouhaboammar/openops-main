# T12 — Implement Code Preview

Purpose
- Provide syntax-highlighted previews for files inside archives (JSON/YML/MD/pseudo) with file tree navigation and copy-to-clipboard.

Scope
- Use Shiki server-side or PrismJS client-side; support large files with truncation and "view full" download option.

Deliverables
- Code viewer component, highlighting pipeline (SSR or pre-render), and tests for supported file types.

Acceptance Criteria
- Preview displays with correct highlighting for sample files and shows file tree from extracted archive metadata.

Estimated time: 1–2 days
Owner: Frontend Engineer
Dependencies: T05, T11
