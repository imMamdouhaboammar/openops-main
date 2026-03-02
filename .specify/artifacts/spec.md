# Feature Specification: MockupSpecNode UI Enhancement

**Feature Branch**: `1-mockup-ui-enhancement`  
**Created**: 2026-01-08  
**Status**: Draft  
**Input**: User description: "MockupSpecNode enhanced with: 8 product presets (coffee-mug, t-shirt, business-card, tote-bag, laptop-sticker, phone-case, notebook, hoodie) with grid selector. For each preset, user adjusts lighting (studio, daylight, soft, dramatic) and material (matte, glossy, fabric, metallic). User generates 1-4 variations in parallel. Results display in gallery with individual/batch export to PNG/ZIP. User can cancel mid-generation with visible feedback. All state persisted via Zustand with defaults for onboarding. Uses new GENERATE_MOCKUP_* event system with progress indicators per node showing generation stages."

---

## User Scenarios & Testing

### User Story 1 - Discover & Select Product Preset (Priority: P1)

New users arrive at MockupSpecNode and need to understand what product mockups they can generate. They scan a 2x4 grid of product presets with clear icons and labels, click a preset (e.g., "Coffee Mug"), and the node displays preset-specific controls.

**Why this priority**: Core UX entry point. Without intuitive preset discovery, users cannot proceed. High-impact feature that unblocks all downstream workflows.

**Independent Test**: Can be fully tested by clicking presets and verifying UI updates (no API calls needed). Delivers immediate value: "I can see what mockups I can make."

**Acceptance Scenarios**:

1. **Given** MockupSpecNode is rendered, **When** user views preset selector, **Then** 8 preset buttons are visible in 2x4 grid with icons and labels
2. **Given** no preset is selected, **When** user clicks preset button, **Then** button highlights, lighting/material controls appear, and Zustand state updates
3. **Given** preset is selected, **When** user clicks different preset, **Then** previously selected button un-highlights, new button highlights, state resets to defaults
4. **Given** user refreshes page, **When** page reloads, **Then** last selected preset is restored from Zustand (or defaults to first preset on first visit)

---

### User Story 2 - Configure Lighting & Material (Priority: P1)

User selects a preset (e.g., "T-Shirt") and needs to customize how the mockup will look. They see 4 lighting options (studio, daylight, soft, dramatic) and 4 material options (matte, glossy, fabric, metallic) in dropdowns or button groups. Selections update UI state immediately.

**Why this priority**: P1 because lighting + material are core customization parameters. Users cannot generate meaningful mockups without these controls. Blocks /speckit.plan phase.

**Independent Test**: Can be tested by selecting lighting/material combinations and verifying Zustand state updates. Delivers value: "I can customize how my mockup looks."

**Acceptance Scenarios**:

1. **Given** preset is selected, **When** user views lighting dropdown, **Then** 4 options are visible (studio, daylight, soft, dramatic)
2. **Given** user selects lighting option, **When** user clicks material option, **Then** both state values update independently in Zustand
3. **Given** user changes preset, **When** new preset loads, **Then** lighting/material reset to defaults for that preset
4. **Given** user customizes lighting/material, **When** user refreshes page, **Then** selections are restored from Zustand

---

### User Story 3 - Generate Variations (Priority: P1)

User has configured preset + lighting + material and wants to generate mockups. They select how many variations (1-4) they want, click "Generate Mockups" button, and see a loading progress indicator showing generation stages (e.g., "Analyzing logo... Rendering mockup... Saving results..."). Variations generate in parallel when count > 1.

**Why this priority**: P1 because this is the core workflow activation. User generates mockups in this step. Without this, the entire feature is incomplete.

**Independent Test**: Can be tested by clicking "Generate" and observing progress UI updates + event emissions. Delivers value: "I can generate mockups from my logo."

**Acceptance Scenarios**:

1. **Given** user has configured preset + lighting + material, **When** user selects variation count (1-4), **Then** count selector displays 4 radio buttons/buttons with visual feedback
2. **Given** variation count = 3, **When** user clicks "Generate Mockups", **Then** event GENERATE_MOCKUP_REQUESTED emitted with {preset, lighting, material, variationCount, nodeName}
3. **Given** generation is in progress, **When** progress events (GENERATE_MOCKUP_PROGRESS) are emitted, **Then** loading indicator updates with stage label (max 2-3 second total)
4. **Given** user has 4 variations requested, **When** Gemini processes them, **Then** all 4 process in parallel (Promise.allSettled), not sequentially

---

### User Story 4 - View Results in Gallery (Priority: P2)

Generation completes and user sees results displayed in a gallery. Each result shows the generated image with metadata (preset, lighting, material, generation time). User can hover to see download button (PNG) or click to preview full-size.

**Why this priority**: P2 because it shows the output but doesn't block core workflow. MVP could show raw images; gallery enhancement improves UX.

**Independent Test**: Can be tested by mocking generation completion, storing results in Zustand, and verifying gallery renders. Delivers value: "I can see my generated mockups."

**Acceptance Scenarios**:

1. **Given** generation completes successfully, **When** results are stored in Zustand, **Then** gallery component renders with image tiles for each result
2. **Given** user hovers over result tile, **When** hover state activates, **Then** download button appears with icon (Lucide download-2 or similar)
3. **Given** gallery displays 4 results, **When** each result is clicked, **Then** preview modal opens showing full-size image + metadata
4. **Given** user navigates away from node, **When** node unmounts, **Then** results persist in Zustand + Dexie (not lost on refresh)

---

### User Story 5 - Export Results (Priority: P2)

User has generated mockups and wants to save them. They can click "Download PNG" on individual results, or click "Export All as ZIP" to download all results + metadata as a ZIP file containing images and a JSON manifest.

**Why this priority**: P2 because export is valuable but not blocking core generation. MVP could have individual PNG only; ZIP export is enhancement.

**Independent Test**: Can be tested by mocking result generation and triggering export. Browser download occurs. Delivers value: "I can save my mockups locally."

**Acceptance Scenarios**:

1. **Given** user has results in gallery, **When** user clicks PNG download on individual result, **Then** browser downloads image with filename pattern `mockup-${preset}-${timestamp}.png`
2. **Given** user has 3+ results, **When** user clicks "Export All as ZIP", **Then** browser downloads ZIP file `mockup-results-${workflowId}-${timestamp}.zip`
3. **Given** ZIP contains results + metadata, **When** user extracts ZIP, **Then** folder structure is `images/` (contains PNGs) and `manifest.json` (lists presets, lighting, material, generation times)

---

### User Story 6 - Cancel Generation (Priority: P1)

Generation is in progress. User clicks "Cancel" button (visible during loading state) and generation aborts. Existing results (if any) are kept; new variations are discarded. UI returns to configuration state.

**Why this priority**: P1 because cancellation is critical UX feature. Users must be able to stop long operations. Missing this would frustrate users significantly.

**Independent Test**: Can be tested by starting generation, immediately clicking Cancel, and verifying abort signal propagates. Delivers value: "I'm not stuck if generation is slow."

**Acceptance Scenarios**:

1. **Given** generation is in progress, **When** "Cancel" button is visible and clickable, **Then** button is not disabled
2. **Given** user clicks "Cancel", **When** event CANCEL_MOCKUP_REQUESTED is emitted, **Then** runner aborts AbortController signal
3. **Given** abort signal is sent, **When** Gemini request is in flight, **Then** fetch aborts (pending request cancelled, promise rejects)
4. **Given** abort completes, **When** UI updates, **Then** loading indicator disappears, "Generate Mockups" button re-enabled

---

### User Story 7 - Preset Defaults & Onboarding (Priority: P2)

First-time user opens MockupSpecNode. They see sensible defaults: first preset selected (coffee-mug), lighting set to "studio", material set to "glossy". A brief tooltip (optional) explains "Customize and click Generate to see your logo on products."

**Why this priority**: P2 because it improves onboarding but isn't blocking. Core workflow works without this; this makes UX smoother.

**Independent Test**: Can be tested on fresh session (clear Zustand) and verify defaults are applied. Delivers value: "I know what to do next."

**Acceptance Scenarios**:

1. **Given** MockupSpecNode first renders on fresh session, **When** Zustand state initializes, **Then** defaults apply: preset="coffee-mug", lighting="studio", material="glossy"
2. **Given** user has not interacted with node, **When** user views UI, **Then** preset button for coffee-mug is highlighted, lighting/material dropdowns show default values
3. **Given** "Generate Mockups" button is ready, **When** user hovers over or sees button, **Then** variation count defaults to 1 (MVP scope: single generation first)

---

### Edge Cases

- What happens when Gemini API returns error during generation? → Event emitted, error message shown, Cancel button removed, "Retry" option provided
- How does system handle user selecting 4 variations but quota exhausted? → Before generation, check quota; if insufficient, show toast "Generation limit reached. Please export results and clear cache." Prevent generation start.
- What if user has network interruption mid-generation? → Fetch aborts, event emitted with error, UI shows "Connection lost. Click Retry." Cache stores partial results (if any completed).
- What if user opens 3 MockupSpecNode instances and generates in parallel? → Each node has independent state in Zustand. Event correlation IDs prevent cross-node confusion. Results tagged with nodeName to distinguish.
- What if results are still generating when user closes the browser? → Results in progress are lost (expected UX). On reload, Zustand restores node config (not in-flight requests).

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display 8 product presets in a 2x4 grid with icons and labels (coffee-mug, t-shirt, business-card, tote-bag, laptop-sticker, phone-case, notebook, hoodie)
- **FR-002**: User MUST be able to select a preset and see lighting/material controls appear dynamically
- **FR-003**: System MUST provide 4 lighting options (studio, daylight, soft, dramatic) and 4 material options (matte, glossy, fabric, metallic) as independent selectors
- **FR-004**: User MUST be able to select variation count (1-4) before generation
- **FR-005**: System MUST emit GENERATE_MOCKUP_REQUESTED event with full config (preset, lighting, material, variationCount, nodeName) when user clicks "Generate Mockups"
- **FR-006**: System MUST display progress indicator during generation showing stage label (e.g., "Analyzing logo...", "Rendering mockup...", "Saving results...")
- **FR-007**: System MUST support parallel generation of 2-4 variations using Promise.allSettled (not sequential)
- **FR-008**: User MUST be able to click "Cancel" button to abort in-progress generation and emit CANCEL_MOCKUP_REQUESTED event
- **FR-009**: System MUST display generated images in a gallery with preset/lighting/material metadata visible
- **FR-010**: User MUST be able to download individual results as PNG files with pattern `mockup-${preset}-${timestamp}.png`
- **FR-011**: User MUST be able to export all results as ZIP file containing images/ and manifest.json
- **FR-012**: System MUST persist node configuration (preset, lighting, material) in Zustand and restore on page refresh
- **FR-013**: System MUST set sensible defaults on first visit (preset=coffee-mug, lighting=studio, material=glossy)
- **FR-014**: System MUST generate deterministic cache keys using SHA-256 to reuse previous results with identical config

### Key Entities

- **MockupConfig**: Represents user selections {preset, lighting, material, variationCount, nodeName}
- **MockupResult**: Generated image {imageUrl, cacheKey, generationTime, metadata: {preset, lighting, material}}
- **GenerationProgress**: Stage indicator {stage, percentage, message, nodeName, correlationId}

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can discover and select a product preset in under 5 seconds (preset grid is intuitive and discoverable)
- **SC-002**: Configuring lighting + material takes under 10 seconds after preset selection (controls are accessible and clear)
- **SC-003**: First-time users understand "what to do next" without external documentation (defaults + UI layout provide sufficient guidance)
- **SC-004**: Generation of 4 variations completes in under 8 seconds total (parallel processing, not sequential)
- **SC-005**: Users can cancel mid-generation and see confirmation within 1 second (abort signal propagates promptly)
- **SC-006**: Results persist correctly across browser refresh (100% persistence via Zustand + Dexie)
- **SC-007**: Gallery displays all results without layout breaking (responsive grid handles 1-4 images gracefully)
- **SC-008**: Cache hit rate > 80% for repeated configs within a session (deterministic hashing works correctly)
- **SC-009**: No console errors or unhandled promise rejections during typical workflows (error handling is complete)
- **SC-010**: Accessibility: all controls keyboard-navigable, images have alt text, loading states announced (ARIA live regions)

---

## Assumptions

1. **Gemini API Integration**: Assumes `/modules/mockups-spaces/ai/gemini.mockup.ts` correctly generates mockup images given {logo, preset, lighting, material} config
2. **Event System**: Assumes EnhancedEventBus with GENERATE_MOCKUP_* events is already defined in `/modules/mockups-spaces/events/events.ts`
3. **Zustand Store**: Assumes mockupsSpaces store in `/modules/mockups-spaces/store/mockupsSpaces.store.ts` can store node configs and results
4. **Dexie Persistence**: Assumes results auto-persist to `mockupsResults` table (as per schema v7)
5. **Cancellation**: Assumes AbortController passed through generation flow for proper cleanup
6. **UI Library**: Assumes Tailwind CSS for styling, Lucide icons for buttons, React for components
7. **Browser Environment**: Assumes browser File API for exports (Blob → Download)
8. **No Mock Images**: Assumes real Gemini API calls during testing (or mocked for unit tests)

---

## Architecture Notes

**Component Breakdown** (will be detailed in /speckit.plan):
1. **PresetSelector.tsx** - 2x4 grid of preset buttons, emits `onPresetChange`
2. **AdvancedControls.tsx** - Lighting/material dropdowns + aspect ratio, collapsed by default
3. **VariationCounter.tsx** - Radio buttons or stepper for 1-4 selection
4. **ProgressIndicator.tsx** - Loading bar with stage label + Cancel button
5. **ResultsGallery.tsx** - Image tiles with hover export buttons
6. **MockupSpecNode.tsx** - Main container orchestrating above components + event binding

**Event Flow**:
- User selects preset → Zustand state updates → UI re-renders
- User clicks Generate → event GENERATE_MOCKUP_REQUESTED → MockupsSpacesCore listens → calls gemini.mockup.ts
- Progress updates → event GENERATE_MOCKUP_PROGRESS → ProgressIndicator updates UI
- Generation completes → event GENERATE_MOCKUP_COMPLETED → results stored in Zustand + Dexie → Gallery renders

**State Management**:
- Zustand store holds: { presets: {[nodeName]: {preset, lighting, material, variationCount}}, results: {[nodeName]: MockupResult[]}}
- Dexie: mockupsResults table indexed by cacheKey for fast lookups
- No local component state except UI transients (hover states, modals)

---

## Next Steps (After Approval)

1. ✅ Move to `/speckit.plan` to define technical architecture and component layout
2. ✅ Create `/speckit.tasks` to break into actionable development tasks
3. ✅ Execute `/speckit.implement` to build components following constitution principles
4. ✅ Manual QA on all acceptance scenarios + edge cases
5. ✅ Integration test: mock Gemini → full workflow → persist → reload
6. ✅ Performance check: generation time < 8s, UI rendering smooth (60 FPS)
7. ✅ Accessibility audit: keyboard nav + screen reader + color contrast

