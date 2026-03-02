# T21 — Create Import Adapters (Gemini / ChatGPT / Claude)

Purpose
- Provide adapter scripts/CLIs that transform product archives into the required format for target platforms and optionally push via platform APIs.

Scope
- Implement adapter prototypes: `convert-to-gemini`, `convert-to-chatgpt`, `convert-to-claude` that accept a path to an extracted archive and emit platform-specific manifest/package.

Deliverables
- Adapter scripts in `tools/adapters/`, sample adapter outputs, and CI tests that validate conversion for sample products.

Acceptance Criteria
- Adapters produce valid artifacts for mocked platform endpoints; documentation for any manual steps included in `quickstart.md`.

Estimated time: 3–5 days
Owner: Integration Engineer
Dependencies: T05, T08
