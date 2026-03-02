# Feature Specification: Mockups Spaces — Full Production Build

**Feature Branch**: `2-mockups-spaces-full-production`  
**Created**: 2026-01-08  
**Status**: GA-Locked  
**Scope**: FULL TOOL (Grade A complexity)  
**Input**: Staff Engineer + Product Engineer review mandate with deep grounding research requirement

---

## GA-Locked Clarification Answers — 2026-01-08

This section records final, signed-off decisions for Mockups Spaces GA. Where content below conflicts with earlier draft requirements, these locked decisions take precedence.

- Product success metrics: time-to-first-usable ≤ 60s (median), ≥ 90% successful runs, ≥ 3 mockups per session.
- SLOs for typical 5-node workflow: target ≤ 45s, P95 ≤ 75s, P99 ≤ 120s. UI must remain responsive.
- Platforms: Desktop only (Chrome/Edge/Safari, latest 2). Tablets out of scope for GA.
- Stage/Stage2 removal: in scope and must be fully deleted before GA (single PR).
- Node types at GA: Logo Input, Mockup Spec, AI Generator (Gemini image), Critic/Validator (text), Output/Export. No layout/enhancement nodes unless already stable.
- Parallelism: max 4 mockup nodes in parallel per workflow. Global cap. Not user-configurable at GA.
- Retry policy: default 2 retries with exponential backoff + jitter; only transient network/AI errors. Give up on validation failures, quota exceeded, malformed input.
- Idempotency & caching: do not re-run if inputs unchanged. Cache key includes logo hash, prompt, reference image hash, model version, prompt template version, generation settings. TTL: persistent until user deletes or GC.
- AI model: Hard-pinned Gemini 3 Pro Image Preview. No fallback models at GA.
- Limits: Max output 2048px longest side. Per-run hard budget enforced (fail gracefully).
- Safety filters: default medium; user override not at GA.
- Assets & formats: inputs (PNG, JPG, WEBP optional). Outputs: PNG required; SVG best-effort vectorization optional; PSD not supported. Enforce sRGB and strip EXIF.
- Max input size: 4096px or 10MB with auto-downscale and quality floor.
- Downloads: Lossless PNG by default; persist highest-quality version.
- Canvas features (GA): zoom/pan, grid, snap-to-grid, multi-select. No grouping/lasso/advanced alignment.
- Keyboard shortcuts: select, move, delete, undo/redo, run node/run all. Inspector fields: name, notes, tags, run status, seed (if exposed).
- Template library: minimal presets (mug, t-shirt, app icon, storefront, business card).
- Persistence: expect up to ~500MB. Warn at 80%, block at 95%. Incremental schema migration; auto-prune unpinned drafts after 7 days; LRU GC under pressure.
- Export/import: images-only export at GA; full workspace export deferred.
- Security & privacy: CSP allows workers + blob/data URLs; no third-party scripts except pinned libs. Object URLs revoked immediately via centralized manager. No user content in logs or crash reports; telemetry optional/minimal.
- Observability: track node add/remove, run started/finished, run failed (class only), export. 100% local sampling; 0% external analytics at GA. Error reporting uses aggregate counts only.
- Accessibility (GA): keyboard navigation for nodes/buttons; basic screen-reader labels; respect prefers-reduced-motion.
- Internationalization: English only; architecture prepared for future i18n.
- Performance: TTI ≤ 2000ms cold; max graph size 20 nodes / 30 edges; canvas interactions ≤ 16ms/frame. Worker pool default 2, max 4 for image ops.
- Offline: view/edit allowed; runs blocked with clear messaging. Reload mid-run marks failed; manual retry; no auto-resume.
- Legal: surface AI model usage terms via link; asset license metadata capture not GA.
- Rollout: feature flag `mockups_spaces_enabled`, default OFF until GA. Single PR migration for Stage removal; best-effort migration of local data, no guarantees for broken Stage data.
- Testing & QA: unit + integration required; E2E one full flow (upload → generate → export PNG). Visual regression manual; CI smoke tests (boot, add node, run mockup, export PNG).
- Acceptance & demo: Product (Mamdouh), Design (Creative Lead), QA (Tech Lead). GA demo: upload logo, add 3 specs, run all in parallel, show per-node progress, export PNG, refresh with history intact.

These decisions are authoritative for GA scope and performance/security bars.

## Executive Summary

**Mission**: Transform PixelForge Studio by (1) completely removing PixelForge Stage (no partial cleanup), (2) building Mockups Spaces as a production-grade, node-based creative workflow tool inspired by Freepik Spaces, where users upload logos once and generate photorealistic mockups via a visual graph editor with intelligent Gemini AI integration.

**Promise to Users**: "Upload your logo once, then generate multiple photorealistic mockups via a node canvas. Fast, controllable, repeatable."

**Architecture Principle**: Modular, observable, fault-tolerant, with UI that always feels "functional" and never silently fails.

---

## User Scenarios & Testing

### User Story 1 — Designer's Daily Driver: Upload Logo, Generate Mockups (Priority: P1)

A graphic designer has a new brand logo (PNG, transparent background). They open Mockups Spaces, upload the logo once, then drag a "Mockup Spec" node onto the canvas and configure it to generate mockups on a coffee mug with studio lighting. They click "Generate All", watch live progress (stage names like "Analyzing logo", "Rendering scene", "Verifying fidelity"), see results appear inside the node, and download their mockups. When they refresh the browser, the workflow is still there, previous results are cached, and clicking "Generate All" again yields instant cached results with a "From Cache" badge.

**Why this priority**: Core product promise. Unblocks all downstream features. Single most important user journey. Designer must feel the tool is "worth keeping around."

**Independent Test**: Can be tested by uploading a logo, adding one spec node, running generation, and checking results appear. Delivers value: "I made mockups."

**Acceptance Scenarios**:

1. **Given** user opens Mockups Spaces for first time, **When** empty canvas loads, **Then** user sees "Add Node" button, a help tooltip, and canvas is pan/zoomable
2. **Given** user clicks "Add Node", **When** menu appears, **Then** user selects "Logo Upload" node type
3. **Given** LogoInputNode is placed on canvas, **When** user clicks upload area, **Then** file picker opens, user selects PNG with transparency
4. **Given** logo uploaded successfully, **When** validation passes, **Then** LogoInputNode shows logo thumbnail, "Ready" state badge, and no errors
5. **Given** logo is loaded, **When** user adds MockupSpecNode and configures {t-shirt, studio lighting, glossy material}, **Then** node displays configuration summary
6. **Given** spec node is fully configured, **When** user clicks "Run All" button, **Then** event GENERATE_MOCKUP_REQUESTED emitted with {logoAssetId, specs}
7. **Given** generation is in progress, **When** Gemini processes the request, **Then** MockupSpecNode shows live progress stages ("Analyzing logo... 25%", "Rendering... 50%", etc.)
8. **Given** generation succeeds, **When** Gemini returns image URL, **Then** node displays image tile with metadata (preset, lighting, material, generation time)
9. **Given** user sees result, **When** user hovers over image, **Then** "Download PNG" button appears and click opens browser download
10. **Given** user has successful results, **When** user refreshes browser, **Then** workflow graph is restored, results are still visible, and if user regenerates with same spec, "(From Cache)" badge appears

---

### User Story 2 — Power User: Batch Generation with Advanced Controls (Priority: P1)

Advanced designer adds 5 MockupSpec nodes to the canvas, each targeting different products (mug, t-shirt, business card, packaging, billboard) with different lighting and materials. They click "Run All" and all 5 generate in parallel. Each node shows independent progress. The designer can cancel one without affecting others. Results appear incrementally as they complete. Designer opens "Results Panel" on the right, sees a gallery view of all results grouped by preset, and exports the entire batch as a ZIP file with metadata.json.

**Why this priority**: P1 because advanced workflows are what professionals pay for. Enables batch operations and time savings (30s to generate 20 mockups, not 20 × 5s = 100s).

**Independent Test**: Can be tested by adding 3+ spec nodes, running all in parallel, and verifying independent progress + cancellation per node. Delivers value: "I can generate batches faster."

**Acceptance Scenarios**:

1. **Given** user has added 5 MockupSpec nodes to canvas, **When** each is independently configured, **Then** they display as separate nodes on graph
2. **Given** user clicks "Run All", **When** graph runner validates workflow, **Then** system executes LogoNode (first), then all 5 specs in parallel via Promise.allSettled
3. **Given** 5 specs are generating in parallel, **When** progress events fire, **Then** each node updates independently with its own progress bar and stage label
4. **Given** user wants to stop one mockup, **When** user clicks "Cancel" on one MockupSpecNode, **Then** only that node's request is aborted; other 4 continue unaffected
5. **Given** generation completes for all 5 specs, **When** results are stored in Dexie, **Then** each result is tagged with {specId, cacheKey, timestamp} for fast lookup on reload
6. **Given** results are in gallery, **When** user clicks "Export All as ZIP", **Then** browser downloads `mockups-${workflowId}-${timestamp}.zip` containing `images/` folder (PNG files) + `manifest.json` with metadata

---

### User Story 3 — Fidelity Guardian: Logo Does Not Distort (Priority: P1)

Designer uploads a complex logo (lots of thin lines, small text). After generating mockups, they inspect the results and confirm the logo is readable, proportions are correct, and no text is garbled. If a mockup fails fidelity check (optional critic step), the system automatically regenerates up to 3 times. Designer sees "Fidelity Check: PASS" or "Regenerating... (Attempt 2/3)" in progress UI. If all attempts fail, clear error message appears: "Fidelity check failed. [View Log] [Retry] [Try Different Settings]".

**Why this priority**: P1 because logo distortion is a feature killer. If mockups mangle the logo, tool is useless. Non-negotiable quality gate.

**Independent Test**: Can be tested by uploading complex logo, generating multiple variations, and checking that fidelity verification passes. Delivers value: "My logo looks good in mockups."

**Acceptance Scenarios**:

1. **Given** complex logo is uploaded, **When** logo metadata is extracted (size, aspect ratio, color count), **Then** metadata is stored in LogoInputNode data
2. **Given** spec node is configured with logo, **When** Gemini prompt includes "Intent Lock: Logo must not distort", **Then** prompt strategy emphasizes fidelity
3. **Given** Gemini returns image, **When** optional critic step is enabled, **Then** system sends image to Gemini text model for fidelity evaluation
4. **Given** critic rates logo distortion score < 0.8, **When** retry threshold is met, **Then** system re-attempts generation (up to 3 total attempts)
5. **Given** all retries exhausted, **When** critic still fails, **Then** error is shown with "Fidelity check failed. Logo may have distorted. Try different settings or upload reference image."
6. **Given** user sees failure, **When** user clicks "View Log", **Then** detailed log appears showing all 3 attempts, critic scores, and differences
7. **Given** fidelity verification passes, **When** result is marked PASS, **Then** image is displayed with confidence badge and cached with high priority

---

### User Story 4 — Creator: Quick Presets, Advanced Controls Collapsible (Priority: P2)

Designer opens a MockupSpec node and sees a "Quick Presets" row with 8 buttons (coffee mug, t-shirt, business card, tote bag, laptop sticker, phone case, notebook, hoodie). They click "Coffee Mug" and the node auto-fills prompt, aspect ratio, lighting, and material with sensible defaults (studio, glossy). Advanced controls (aspect ratio, realism level, background type) are hidden by default in a collapsible "Advanced" section. Designer clicks to expand and tweaks settings. This feels like "easy for simple tasks, powerful when you need it."

**Why this priority**: P2 because presets enable speed and onboarding. Advanced controls ensure power users are not blocked. Good UX = discoverability + depth.

**Independent Test**: Can be tested by clicking presets and verifying node state updates with correct defaults. Can be tested by expanding/collapsing advanced controls and verifying state is maintained. Delivers value: "Mockups Spaces is easy to use and powerful."

**Acceptance Scenarios**:

1. **Given** new MockupSpecNode is placed on canvas, **When** user views node body, **Then** "Quick Presets" row shows 8 buttons with icons and labels
2. **Given** user clicks "Coffee Mug" preset, **When** preset is selected, **Then** node auto-fills: prompt="coffee mug mockup", lighting="studio", material="glossy", aspectRatio=default
3. **Given** user wants to customize, **When** user clicks "Advanced" section header, **Then** collapsible expands showing: {aspect ratio dropdown, realism slider, background type dropdown, variations count input}
4. **Given** user adjusts realism from "high" to "medium", **When** user changes setting, **Then** state is immediately updated in Zustand (no save button needed)
5. **Given** user collapses "Advanced" section, **When** user saves/refreshes, **Then** collapsed state is restored and advanced settings are preserved in Zustand

---

### User Story 5 — Reliability Guardian: Never Silently Fail (Priority: P1)

Generation starts. Network fails. User sees immediate error banner with actionable message: "Connection lost. [Retry] [View Log] [Dismiss]". User clicks "Retry", connection restores, generation completes. If Gemini API throws error, user sees "Gemini service error: rate_limit_exceeded. Please wait 30 seconds and retry. [Retry in 30s]" with countdown. If a node crashes, error boundary catches it, user sees "Node error: [component name]. [Report] [Dismiss]" and is not blocked from using other nodes. No red console errors in production.

**Why this priority**: P1 because silent failures destroy trust. UX principle: Observable = working. When user sees clear errors, they trust the tool and know what to do.

**Independent Test**: Can be tested by simulating network errors, API errors, component crashes, and verifying error messages appear with clarity and actionability. Delivers value: "I understand what went wrong and can fix it."

**Acceptance Scenarios**:

1. **Given** network request is in flight, **When** network fails (simulated via DevTools or actual outage), **Then** fetch error is caught and NETWORK_ERROR event emitted with {message, retryable: true}
2. **Given** NETWORK_ERROR event is emitted, **When** UI updates, **Then** error banner appears with "Connection lost. [Retry] [View Log]"
3. **Given** user clicks "Retry", **When** retry logic fires, **Then** Promise-retry mechanism retries with 2s-10s backoff (p-retry configured)
4. **Given** Gemini API returns 429 (rate limited), **When** error is caught, **Then** error message is "Rate limited. Retrying in 30s..." with countdown timer
5. **Given** MockupSpecNode crashes during render, **When** error is caught by ErrorBoundary, **Then** user sees "Node error: MockupSpecNode. The node encountered an issue. [Report] [Dismiss]" and other nodes remain functional
6. **Given** any error occurs, **When** error is logged, **Then** console is clean in production (no console.error), but error is logged with correlationId via logger service
7. **Given** error occurs, **When** user hovers over error message, **Then** tooltip shows copyable error details (for bug reports)

---

### User Story 6 — Historian: Workflows and Results Persist Across Sessions (Priority: P1)

Designer creates a workflow with 3 mockup specs, generates results, closes the browser, opens it hours later. The workflow graph is fully restored (nodes, layout, connections), previous results are still visible and cached. Designer can refresh and generate again, and previous results show "(Cached)" badge. If designer manually edits a spec (changes lighting), the cache is invalidated and new generation is required. Storage quota is monitored—if approaching 80%, old results older than 30 days are auto-deleted, and user sees notification "Storage cleaned: 2 old results removed to free space."

**Why this priority**: P1 because lost work is a product killer. Trust = persistence. Designer must never feel "my work disappeared."

**Independent Test**: Can be tested by creating workflow, refreshing browser, and verifying graph + results are restored. Can be tested by modifying spec, regenerating, and verifying cache miss + new generation. Delivers value: "My work is safe."

**Acceptance Scenarios**:

1. **Given** user creates workflow with nodes and generates results, **When** data is persisted, **Then** Zustand state is written to Dexie tables: workflows, nodes, assets, results
2. **Given** user closes browser, **When** user reopens Mockups Spaces, **Then** workflow graph is restored from Dexie with exact same node positions and connections
3. **Given** results were previously generated, **When** user views MockupSpecNode, **Then** previous results are displayed with "(Cached)" badge and generation timestamp
4. **Given** user modifies a spec (e.g., lighting), **When** modification is saved, **Then** cache key is invalidated and "(Cached)" badge is removed
5. **Given** storage quota is monitored, **When** usage exceeds 80% threshold, **Then** GC is triggered: results older than 30 days are auto-deleted
6. **Given** GC is triggered, **When** deletion succeeds, **Then** notification appears "Storage optimized: Freed XXX MB by removing old results"
7. **Given** user attempts to save new results but quota is full, **When** save fails, **Then** user sees clear error "Storage full. Please export and delete old results to continue. [Export All] [Clear Old Results]"

---

### User Story 7 — Observer: Live Progress Never Stops, Always Know What's Happening (Priority: P1)

User clicks "Generate All". Immediately, the canvas shows stage names appearing in real-time for each node: "Preparing assets... → Building prompt... → Calling Gemini... → Rendering... → Verifying fidelity... → Saving to history..." Each stage takes 1-3 seconds. User can see network requests in DevTools labeled with trace IDs. If generation takes > 5 seconds, a "Still working..." message appears with elapsed time. If generation takes > 15 seconds, user sees estimated time remaining or an option to "Cancel All". Progress is never blocked; if 1 spec fails, other specs continue, and failed spec shows "Failed. [Retry] [View Log]".

**Why this priority**: P1 because perceived speed = actual performance. If user does not see progress, they assume tool is broken. Observable UI = trust.

**Independent Test**: Can be tested by monitoring UI for progress stages, checking DevTools for network requests with trace IDs, and verifying no UI freezes. Delivers value: "Tool feels responsive and alive."

**Acceptance Scenarios**:

1. **Given** generation starts, **When** event GENERATE_MOCKUP_REQUESTED is emitted, **Then** MockupSpecNode immediately shows "Stage 1: Preparing assets..."
2. **Given** progress stages occur, **When** GENERATE_MOCKUP_PROGRESS events fire, **Then** UI updates with stage name + percentage + elapsed time (e.g., "Rendering (50%, 2.3s elapsed)")
3. **Given** each Gemini API call is made, **When** fetch is initiated, **Then** request includes X-Trace-Id header with unique correlationId
4. **Given** generation exceeds 5 seconds, **When** timer reaches threshold, **Then** "Still working..." message appears below progress bar with elapsed time counter
5. **Given** one spec fails mid-workflow, **When** error is caught, **Then** failed spec shows "Failed: [error message]. [Retry] [View Log]" and other specs continue uninterrupted
6. **Given** user wants to stop all generation, **When** user clicks "Cancel All" button, **Then** all in-flight requests are aborted and UI returns to idle state

---

### User Story 8 — Exporter: Download Individual or Batch Results (Priority: P2)

Designer has generated 4 mockups. They click on one result and see "Download PNG" and "View Full-Size" buttons. They click "Download PNG" and browser downloads `mockup-coffee-mug-2026-01-08-143052.png`. Designer opens "Export All" menu and selects "Download as ZIP", which downloads `mockups-workflow-abc123-2026-01-08-143052.zip` containing `images/` folder with 4 PNG files and `manifest.json` listing {preset, lighting, material, generationTime} for each. Designer can also select specific results (multi-select checkboxes) and export only those.

**Why this priority**: P2 because export is useful but doesn't block core workflow. MVP could have individual PNG only; ZIP + manifest is enhancement.

**Independent Test**: Can be tested by downloading individual PNG and ZIP, verifying file structure and naming conventions. Delivers value: "I can use my mockups wherever."

**Acceptance Scenarios**:

1. **Given** user has generated results, **When** user hovers over result image, **Then** action buttons appear: "Download PNG", "View Full", "Copy URL"
2. **Given** user clicks "Download PNG", **When** browser downloads file, **Then** filename follows pattern `mockup-${preset}-${timestamp}.png` (e.g., `mockup-coffee-mug-2026-01-08-143052.png`)
3. **Given** user has 4 results, **When** user clicks "Export All as ZIP", **Then** browser downloads ZIP file `mockups-${workflowId}-${timestamp}.zip`
4. **Given** ZIP is extracted, **When** user inspects contents, **Then** structure is: `images/` (4 PNG files) + `manifest.json` (array of {filename, preset, lighting, material, generationTime})
5. **Given** user wants selective export, **When** user opens Results Panel, **Then** each result has checkbox for selection
6. **Given** user selects 2 of 4 results and clicks "Export Selected as ZIP", **Then** ZIP contains only the 2 selected images + updated manifest

---

### User Story 9 — Customizer: Reference Images & Custom Prompts (Priority: P2)

Designer has a reference image showing how they want the logo placed on a mug (angle, lighting style). They open a MockupSpecNode, upload the reference image, and the node shows both the logo and reference side-by-side. Gemini uses the reference to guide placement. Alternatively, designer types a custom prompt: "Place logo on mug at 45-degree angle, overhead lighting, white ceramic material, minimalist style." The spec node shows character count and saves the prompt. Custom prompts override presets but can still use presets as a starting point.

**Why this priority**: P2 because reference images + custom prompts unlock creative control. Professional designers need this flexibility.

**Independent Test**: Can be tested by uploading reference image and verifying it appears in node + is passed to Gemini. Can be tested by typing custom prompt and verifying it overrides preset prompt. Delivers value: "I have full creative control."

**Acceptance Scenarios**:

1. **Given** MockupSpecNode is configured, **When** user clicks "Upload Reference Image", **Then** file picker opens (image formats only)
2. **Given** reference image is uploaded, **When** image is validated and stored, **Then** node displays reference thumbnail next to logo thumbnail
3. **Given** reference image is available, **When** Gemini prompt is built, **Then** prompt includes "Reference image provided: [URL]. Use it as guide for placement and lighting."
4. **Given** user clicks "Custom Prompt" tab, **When** textarea appears, **Then** user can type free-form prompt (e.g., "Place logo on mug at 45 degrees...")
5. **Given** custom prompt is entered, **When** character count is shown, **Then** max length is 1024 characters and UI shows "X / 1024 characters"
6. **Given** custom prompt is saved, **When** spec node updates, **Then** "(Custom Prompt)" label appears instead of preset name, and preset selection is cleared

---

### Edge Cases

- What if user uploads 50MB PNG logo? → File size validation on upload: "Max 10MB. Your file is 50MB. Compress or crop."
- What if Gemini returns corrupted image URL? → Image URL validation before display; if broken, error "Image failed to load. [Retry] [View Log]"
- What if IndexedDB quota is full (50MB used, 60MB limit)? → Before storing result, check quota. If insufficient, trigger GC. If still insufficient, error "Storage full. Export and clear old results."
- What if user navigates away mid-generation? → Ongoing requests are aborted cleanly via AbortController. No orphaned promises or memory leaks.
- What if user opens Mockups Spaces in two browser tabs simultaneously? → Both tabs manage independent Zustand state + Dexie persistence. Writes to Dexie may conflict; use Dexie's built-in optimistic concurrency or sync via storage events.
- What if user rapidly clicks "Generate All" multiple times? → Debounce or mutex prevents overlapping requests. UI shows "Generation in progress..." until first batch completes.
- What if node editor canvas has 100+ nodes? → Performance testing required; use virtualization or lazy rendering if lag occurs. Navigation by node name/search if layout becomes cluttered.
- What if user has unstable network (constant reconnects)? → p-retry handles transient failures. If persistent failure > 60s, show "Connection unstable. Check your internet and [Retry]."

---

## Requirements

### Functional Requirements

#### Phase 1: Delete PixelForge Stage Completely

- **FR-001**: All PixelForge Stage code (routes, components, stores, events, workers, Dexie tables) MUST be removed entirely. Zero references remain except in historical reports.
- **FR-002**: Tool registry MUST be updated to remove Stage entry. Navigation grid MUST not render Stage card.
- **FR-003**: Zustand store MUST remove all Stage slices. Dexie schema MUST NOT have Stage-related tables (or must be marked as deprecated/migratable).
- **FR-004**: Application MUST build and boot without errors after Stage removal.

#### Phase 2: Node Canvas (xyflow/react Integration)

- **FR-005**: Node canvas MUST be interactive: pan (middle-click + drag), zoom (scroll wheel), drag nodes without lag.
- **FR-006**: Node editor MUST support adding/deleting nodes via UI buttons or right-click context menu.
- **FR-007**: Edges MUST be drawn between nodes via drag from output handle to input handle. Visual feedback during connection (ghost edge, valid/invalid styling).
- **FR-008**: Selected nodes MUST show highlight styling. Multi-select MUST be supported (Ctrl+click).
- **FR-009**: Keyboard shortcuts: Delete key to remove selected node, Ctrl+D to duplicate, Ctrl+A to select all.
- **FR-010**: Minimap or overview panel MUST be optional (collapsible) showing zoomed-out view of entire graph.

#### Phase 3: Node Definitions

- **FR-011**: LogoInputNode MUST accept file upload (PNG preferred, transparent background). Validation: file size <= 10MB, dimensions >= 100px.
- **FR-012**: LogoInputNode MUST extract metadata: image size, aspect ratio, approximate color count. Metadata MUST be stored and available for reference in MockupSpecNode.
- **FR-013**: MockupSpecNode MUST support preset selection (8 presets: coffee-mug, t-shirt, business-card, tote-bag, laptop-sticker, phone-case, notebook, hoodie) with quick-select buttons.
- **FR-014**: MockupSpecNode MUST support lighting selection (4 options: studio, daylight, soft, dramatic) and material selection (4 options: matte, glossy, fabric, metallic).
- **FR-015**: MockupSpecNode MUST support aspect ratio selection (auto, square, portrait, landscape, custom input).
- **FR-016**: MockupSpecNode MUST support variations count input (1-4). Default MUST be 1.
- **FR-017**: MockupSpecNode MUST support optional reference image upload (same validation as logo: <= 10MB, image format).
- **FR-018**: MockupSpecNode MUST support custom prompt input (textarea, max 1024 characters). Custom prompt MUST override preset prompt.
- **FR-019**: MockupSpecNode MUST display "Advanced" collapsible section with: realism slider (low/medium/high), background type dropdown (transparent, white, colored, gradient), effect intensity slider (subtle/medium/strong).

#### Phase 4: Graph Execution

- **FR-020**: Graph runner MUST validate graph before execution: required nodes exist (LogoInputNode), edges are consistent (no floating connections), no cycles detected.
- **FR-021**: Graph runner MUST execute LogoInputNode first to produce logoAssetId. If LogoInputNode fails, all downstream nodes MUST be blocked with error "Logo not ready".
- **FR-022**: Graph runner MUST execute all MockupSpecNode instances in parallel via Promise.allSettled. Failures in one node MUST NOT block others.
- **FR-023**: Graph runner MUST emit progress events per node: {nodeId, stage, percentage, message, timestamp}.
- **FR-024**: Graph runner MUST support cancellation: "Cancel All" aborts all in-flight requests. Per-node cancel aborts only that node.
- **FR-025**: Graph runner MUST support retry: failed nodes MUST have "Retry" button. Clicking retry re-executes only that node with fresh Gemini call.
- **FR-026**: Graph runner MUST handle partial failures: if 3 of 5 nodes succeed and 2 fail, successful results MUST be stored and displayed; failed nodes MUST show error with retry option.

#### Phase 5: AI Pipeline (Gemini 3 Pro Image)

- **FR-027**: AI pipeline MUST call Gemini 3 Pro image model (models/gemini-3-pro-image-preview) with logo image + spec prompt.
- **FR-028**: AI pipeline MUST include "Intent Lock" in system prompt: "The uploaded logo must remain unchanged in shape and proportions. Distortion is not acceptable."
- **FR-029**: AI pipeline MUST support multi-variation generation: if variations count = 3, Gemini MUST be called 3 times (in parallel) to generate 3 different mockup images.
- **FR-030**: AI pipeline MUST include optional critic step (if available in codebase): after generation, text model evaluates logo fidelity (distortion, readability, placement).
- **FR-031**: AI pipeline MUST implement auto-retry: if Gemini call fails with transient error (5xx, timeout), retry up to 3 times with 2s-10s backoff (p-retry).
- **FR-032**: AI pipeline MUST include X-Trace-Id header in all Gemini requests for debugging and tracing.
- **FR-033**: AI pipeline MUST handle API rate limiting gracefully: if 429 (rate limited), show user message "Rate limited. Retrying in 30 seconds..." with countdown.

#### Phase 6: Caching & Persistence

- **FR-034**: Cache key MUST be generated deterministically using SHA-256 hash of: {logoAssetId, specPrompt, referenceImageId, lighting, material, aspectRatio, variationsCount}. Same config MUST always yield same cache key.
- **FR-035**: Results MUST be cached in Dexie table "mockupsResults" with indices on {cacheKey, createdAt}. Cache-first lookup: if result exists, return immediately with "(Cached)" badge.
- **FR-036**: Workflow graph MUST be persisted in Dexie table "mockupsWorkflows": {id, nodes, edges, updatedAt}. Auto-save on every graph modification.
- **FR-037**: Assets MUST be persisted in Dexie table "mockupsAssets": {id, assetType ('logo' | 'reference'), data (Blob), metadata, createdAt}. Blob storage via IndexedDB.
- **FR-038**: Garbage collection MUST run automatically: results older than 30 days MUST be deleted. If storage quota exceeds 80%, GC is triggered immediately.
- **FR-039**: Before persisting large results, system MUST check available quota. If insufficient, user MUST see clear error: "Storage full. Export and delete old results to continue."
- **FR-040**: On app load, Mockups Spaces MUST restore: workflow graph from Dexie, previous results (with cache badges), node positions, and UI state.

#### Phase 7: UX & Progress

- **FR-041**: Progress UI MUST display stages per node in real-time: "Stage 1: Preparing assets... → Stage 2: Building prompt... → Stage 3: Calling Gemini... → Stage 4: Rendering... → Stage 5: Verifying fidelity... → Stage 6: Saving to history..."
- **FR-042**: Progress UI MUST show: stage name, percentage (0-100%), elapsed time, and "Cancel" button (while in progress).
- **FR-043**: If generation exceeds 5 seconds, UI MUST show "Still working..." message with elapsed time counter.
- **FR-044**: If generation exceeds 15 seconds, UI MUST show estimated time remaining or option to "Cancel All".
- **FR-045**: Errors MUST be displayed in error panel with: error message, actionable hint (e.g., "[Retry] [View Log] [Dismiss]"), and copyable details for bug reports.
- **FR-046**: Tooltips MUST be positioned correctly via Floating UI or similar library. Tooltips MUST never render off-screen or overflow.
- **FR-047**: Primary CTA ("Run All", "Generate", etc.) MUST have WCAG-compliant contrast ratio (>= 4.5:1). Button MUST be visually prominent (size, color, focus state).
- **FR-048**: Keyboard navigation MUST work: Tab to focus controls, Enter to activate, Escape to dismiss modals, arrow keys to navigate results gallery.

#### Phase 8: Observability & Debugging

- **FR-049**: All errors MUST be logged with correlationId via logger service. Console MUST be clean in production (no console.error or console.warn).
- **FR-050**: Gemini API calls MUST appear in browser DevTools Network tab with trace IDs (X-Trace-Id header). Trace ID MUST link error logs to network requests.
- **FR-051**: Failed nodes MUST have "View Log" button showing: {nodeId, timestamp, error message, full stack trace, attempt count}.
- **FR-052**: Cache hits MUST be labeled with "(Cached)" badge + original generation timestamp.
- **FR-053**: Storage usage MUST be visible in settings or info panel: "Using XXX MB of YYY MB available (ZZ%)"

#### Phase 9: Testing

- **FR-054**: Unit tests MUST cover: graph validator (cycle detection, required nodes), graph runner (execution order, parallel execution, cancellation), hash determinism, persistence CRUD.
- **FR-055**: Integration test MUST cover one complete flow: mock Gemini call → graph execution → result storage → persistence → reload → cache hit verification.
- **FR-056**: Tests MUST use mocked AI client (not real Gemini API calls in CI).
- **FR-057**: Manual QA MUST verify: upload logo → add 3 spec nodes → run all → progress UI works → results appear → history persists across refresh → console is clean → network tab shows AI calls.

### Key Entities

- **Workflow**: {id, name, nodes, edges, logoAssetId, createdAt, updatedAt, lastRanAt}
- **Node**: {id, type ('logo' | 'mockup'), position, data (node-specific config), status ('idle' | 'running' | 'success' | 'error')}
- **MockupSpec**: {preset, lighting, material, aspectRatio, variationsCount, referenceImageId?, customPrompt?}
- **LogoAsset**: {id, size, aspectRatio, colors[], createdAt}
- **MockupResult**: {id, specId, cacheKey, imageUrl, metadata (preset, lighting, material), generationTime, createdAt}
- **Progress**: {nodeId, stage, percentage, message, timestamp, correlationId}

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can upload logo + add + configure 3 mockup specs + run all in under 90 seconds (frictionless onboarding)
- **SC-002**: 4-variation generation completes in under 10 seconds total (parallel execution, not sequential)
- **SC-003**: Cache hits return results within 100ms (instant user feedback)
- **SC-004**: Logo fidelity verification passes 95%+ of generation attempts without distortion
- **SC-005**: 100% of workflows persist correctly across browser refresh (zero lost work)
- **SC-006**: 80%+ of repeated configs hit cache on second attempt (deterministic hashing works)
- **SC-007**: UI never freezes during generation (animations smooth, no jank)
- **SC-008**: 0% silent failures: 100% of errors are visible to user with actionable message
- **SC-009**: Network requests visible in DevTools with trace IDs for all Gemini calls
- **SC-010**: Storage quota handling prevents data loss: GC triggers, warnings appear, user never loses unsaved work
- **SC-011**: All unit tests pass (>80% coverage for critical paths)
- **SC-012**: Manual QA flow completes without errors: upload → generate → refresh → results restored
- **SC-013**: Keyboard accessibility: all interactive elements reachable via Tab, Enter/Space activates, Escape closes modals
- **SC-014**: WCAG color contrast > 4.5:1 for all text + primary CTAs
- **SC-015**: Zero Stage references remaining in codebase (cleanup complete)

---

## Assumptions

### Technical Assumptions

1. **Gemini API**: Assumes Gemini 3 Pro Image model is available and capable of "place object on target" style generation. Assumes multimodal input (logo image + reference image) is supported.
2. **xyflow/react**: Assumes xyflow/react is mature, performant, and suitable for Mockups Spaces use case. Assumes no major limitations for node shapes, edge types, or customization.
3. **Dexie**: Assumes Dexie v4+ is configured in project with existing schema. Assumes IndexedDB quota (usually 50MB on mobile, 250MB+ on desktop) is sufficient for typical workflows.
4. **p-retry**: Assumes p-retry is configured for transient retries. Assumes 3 attempts with 2s-10s backoff is acceptable UX.
5. **Zustand**: Assumes Zustand store is centralized and observable via devtools. Assumes middleware (devtools, subscribeWithSelector) is available.
6. **Browser APIs**: Assumes Web Crypto API (SHA-256), Blob, File API are available (modern browsers only, no IE11 support needed).

### Product Assumptions

1. **Logo Complexity**: Assumes most logos are <= 10MB PNG files and can be processed by Gemini without timeout.
2. **Generation Speed**: Assumes Gemini 3 Pro Image can generate each mockup in 2-5 seconds on average (network + processing).
3. **Storage Quota**: Assumes typical user generates 10-50 mockups per session. Assumes 30-day retention is acceptable for auto-cleanup.
4. **Batch Size**: Assumes 4 variations per spec is the practical limit (beyond 4, UX becomes cluttered). Assumes parallel execution of 5+ specs is acceptable performance-wise.
5. **User Base**: Assumes designers/creatives are primary users; assumes technical support for troubleshooting is limited; hence all error messages must be self-explanatory.

---

## Grounding Research (Phase 0 Findings)

### Freepik Spaces & Similar Tools

**Key Findings**:
- Freepik Spaces (private product, UX insights from ProductHunt + competitor analysis) emphasizes speed, simplicity, and batch operations.
- Users love "presets" + "advanced controls" pattern (Figma also uses this: quick mode vs design system).
- Parallel generation is valued: designers want to generate 20 mockups in 20 seconds, not 20 × 5s.
- Logo distortion is the #1 complaint: if logo is mangled, tool is worthless.
- Storage persistence is critical: users expect work to survive browser refresh.

**Pattern**: Small, fast operations with clear progress. Never block. Always show status.

### React Node Editors: xyflow vs Rete.js

**xyflow/react**:
- ✅ Pros: Most popular (React Flow → xyflow), excellent React integration, active community, good docs, handles 100+ nodes smoothly
- ✅ Works well for "quick prototypes" and "professional tools" alike
- ⚠️ Cons: Opinionated (nodes are rectangles; can customize but not trivial); performance degrades >500 nodes

**Rete.js**:
- ✅ Pros: Framework-agnostic, highly customizable node shapes, pure JavaScript
- ⚠️ Cons: Steeper learning curve, fewer React examples, smaller community

**Decision**: xyflow/react chosen. Solid library, proven in production tools, excellent React/TS support.

### Graph Execution Engines

**Pattern**: DAG (Directed Acyclic Graph) validation + topological sort + Promise-based execution.

**Best Practices**:
- ✅ Validate graph before execution (check required nodes, cycles, edge consistency)
- ✅ Use topological sort to determine execution order
- ✅ Use Promise.allSettled for parallel execution (not Promise.all, which fails on first error)
- ✅ Per-node error handling: store error, allow retry, continue with other nodes
- ✅ Emit progress events for observability

**Implementation**: Custom graph runner (lightweight, specialized for Mockups Spaces)

### AI Workflow Orchestration

**Best Practices**:
- ✅ Cache generated results (hash-based)
- ✅ Parallel execution for independent tasks
- ✅ AbortController for cancellation
- ✅ Retry transient errors (p-retry)
- ✅ Optimistic UI: show "in progress" immediately, not after first API response
- ✅ Progress callbacks for long operations (>1s)

**Pattern**: Request → Validate → Call API → Parse Response → Cache → Update UI → Cleanup

### Caching & IndexedDB

**Best Practices**:
- ✅ Deterministic hash (SHA-256) of input parameters
- ✅ Store results in Dexie with indices for fast lookup
- ✅ Implement GC (delete old results) to manage quota
- ✅ Check quota before persist; gracefully handle full storage
- ✅ Use Blob for images; ref-count for deduplication

**Library**: Dexie v4 (proven, mature, Phantom type support)

### Error Handling & Observability

**Best Practices**:
- ✅ All errors visible to user (no silent failures)
- ✅ Error messages must be actionable (not "Something went wrong")
- ✅ Log errors with correlationId for tracing
- ✅ Network requests include trace ID headers
- ✅ User can view detailed error logs (for bug reports)

**Pattern**: Try-catch → classify error → emit event → UI updates with message

**References**:
- Google: "best practices error handling react" → Error Boundaries, try-catch, error event emitters
- GitHub: React error-boundary npm package (popular, well-maintained)
- GitHub: Sentry integration (optional, for production error tracking)

---

## Architecture Decisions

### Node-Based UI (Why Not Linear Workflow?)

Node-based UI enables:
- Reusable specs: drag multiple "Mockup Spec" nodes, each with independent config
- Parallel execution: all specs can run simultaneously
- Extensibility: easy to add new node types in future (e.g., "Prompt Expander", "Batch Renamer")
- Visual clarity: users can see entire workflow graph at once

### Frontend-Only Graph Runner (Why Not Backend?)

Frontend-only enables:
- No server dependency for core feature
- Works offline (local caching)
- Lower latency (no network round-trip for orchestration)
- Easier debugging (DevTools access)

Future: Can add optional backend graph runner for advanced features (webhooks, scheduling).

### Deterministic Hashing for Cache Keys

Ensures:
- Same config = same cache key = fast results across sessions
- No false cache misses (hashing bugs = user confusion)
- Reproducibility: users can verify same spec = same result

### Zustand + Dexie (Why Not Single Store?)

Zustand for:
- Fast UI state updates (immediate feedback)
- Observable via devtools (debugging)

Dexie for:
- Persistence (survives app close)
- Large data (images, blobs)
- Indexing (fast queries)

Together: Zustand writes to Dexie; on app load, Zustand rehydrates from Dexie. Allows full observability + persistence.

---

## Implementation Roadmap (Conceptual PRs)

### PR 1: Stage Deletion Cleanup
- Delete `/modules/stage` entirely
- Delete `/modules/stage2` entirely
- Remove Stage routes, registry entries, store slices, event handlers
- Update nav grid
- Verify build passes

### PR 2: xyflow/react Setup + Canvas Shell
- Install xyflow/react
- Create `CanvasShell.tsx` (zoom, pan, grid)
- Create `NodesPanel.tsx` (add/delete node UI)
- Wire into MockupsSpacesView

### PR 3: Node Definitions (Logo + MockupSpec)
- `LogoInputNode.tsx` with upload + validation
- `MockupSpecNode.tsx` with preset selector + advanced controls
- `nodes.registry.ts`

### PR 4: Graph Runner
- `graph.validator.ts` (cycles, required nodes)
- `graph.toposort.ts` (Kahn's algorithm)
- `graph.runner.ts` (execution orchestration)
- `graph.hash.ts` (SHA-256 cache keys)

### PR 5: Gemini AI Integration
- `mockup.prompts.ts` (system + user prompt templates)
- `gemini.mockup.ts` (Gemini call + retry + critic + multi-variation)
- Error classification

### PR 6: Persistence Layer
- Dexie schema migration (v7 or v8)
- `mockupsSpaces.persistence.ts` (CRUD, GC)
- Zustand rehydration on app load

### PR 7: Progress UI & Observability
- `ProgressIndicator.tsx` (stages, percentage, cancel button)
- `ErrorPanel.tsx` (error display, retry, view log)
- Event logging + correlationIds

### PR 8: Tests + Manual QA
- Unit tests for graph algorithms
- Integration test for one generation flow
- Manual QA checklist verification

### PR 9: Final Report + Cleanup
- `/reports/mockups-spaces-implementation.md` (comprehensive)
- Code cleanup, final linting, docs

---

## Next Steps (Post Specification Approval)

1. ✅ Move to `/speckit.plan` to create detailed technical architecture plan
2. ✅ Create `/speckit.tasks` to break into PR-sized actionable items
3. ✅ Execute `/speckit.implement` to build each module following constitution principles
4. ✅ Verify build passes, no TypeScript errors, no console errors
5. ✅ Run manual QA: upload logo → add specs → run all → verify results → refresh → verify persistence
6. ✅ Write final implementation report with grounding references, architecture decisions, test evidence

---

## Quality Commitments (Constitution Adherence)

✅ **No God Files**: Each module <400 lines. Separate files for types, logic, persistence, UI, orchestration.  
✅ **Event-Driven**: All inter-module communication via EnhancedEventBus with correlation IDs.  
✅ **Type-Safe**: Zod validation for external data. Discriminated unions for state. No `any` types.  
✅ **Persistent State**: Zustand + Dexie with auto-save + rehydration on load.  
✅ **AI Integration Patterns**: Unified GeminiClient wrapper, p-retry, multimodal support, progress callbacks, AbortController.  
✅ **Caching Strategy**: SHA-256 deterministic keys, Dexie storage, GC at 80% quota, 30-day retention.  
✅ **Observable UX**: No silent failures. All errors visible, actionable, logged with correlationId.  
✅ **Test-First**: Unit + integration tests, manual QA flows documented, no feature ships without passing.

