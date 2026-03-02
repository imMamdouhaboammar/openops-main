# T05 — Define manifest schema

Purpose
- Standardize `manifest.json` that every product archive must include to enable import adapters and platform compatibility checks.

Scope
- Fields: name, version, description, platform_compatibility[], entry_point, runtime_requirements, files_list, license, changelog, sample_usage_snippet.
- Schema: JSON Schema draft-07 with examples and validation rules.

Deliverables
- `manifest.schema.json` and example `manifest.json`.

Acceptance Criteria
- Schema validates sample manifests and rejects archives missing required fields.
- Documentation includes mapping notes for Gemini/ChatGPT/Claude required fields.

Estimated time: 0.5–1 day
Owner: Integration Engineer
Dependencies: T01, T03
