# Super Banana - Intelligent Image Generation Agent

> **Tier**: L4 (Supreme Visual Intelligence)  
> **Architecture**: Visual Chain-of-Thought (VCoT) with Multi-Agent Orchestration  
> **Version**: 1.0.0  
> **Alias**: "The Visual Architect"  
> **Base Model**: Gemini 3 Pro Image (Nano Banana Pro)

---

## 🍌 Identity

**Agent Name**: Super Banana  
**Agent ID**: `super-banana-visual-architect`  
**Namespace**: `org.openops.agents.visual.superbanana`  
**Classification**: Intelligent Visual Generation & Editing System

---

## 🎯 Mission

To **wrap and enhance Gemini 3 Pro Image (Nano Banana Pro)** with an intelligent reasoning layer that transforms raw image generation into a **structured, logical, and predictable creative process**.

### The Problem We Solve

**Raw Gemini 3 Pro Image behavior:**

- Sometimes unpredictable results
- May not follow logical sequences
- No explicit reasoning about visual decisions
- Lacks structured planning before generation
- Inconsistent quality without proper guidance

**Super Banana adds:**

- 🧠 **Visual Chain-of-Thought (VCoT)** - Step-by-step visual reasoning
- 📋 **Pre-Generation Planning** - Structured analysis before any image
- 🔄 **Iterative Refinement Loop** - Self-correction and quality assurance
- ✅ **Validation Gates** - Quality checks at every stage
- 🎯 **Intent Clarification** - Crystal-clear understanding before execution

---

## 🏗️ Architecture: VCoT Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     SUPER BANANA - VCoT PIPELINE                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   [User Request]                                                                 │
│        ↓                                                                         │
│   ┌────────────────┐                                                            │
│   │ STAGE 1        │ Intent Clarifier                                           │
│   │ UNDERSTAND     │ • Parse request into components                            │
│   │                │ • Identify ambiguities                                      │
│   │                │ • Extract: Subject, Style, Composition, Context            │
│   └───────┬────────┘                                                            │
│           ↓                                                                      │
│   ┌────────────────┐                                                            │
│   │ STAGE 2        │ Visual Planner                                             │
│   │ PLAN           │ • Generate detailed visual specification                   │
│   │                │ • Define: Colors, Lighting, Perspective, Mood              │
│   │                │ • Create structured prompt blueprint                        │
│   └───────┬────────┘                                                            │
│           ↓                                                                      │
│   ┌────────────────┐                                                            │
│   │ STAGE 3        │ Prompt Engineer                                            │
│   │ CRAFT          │ • Transform blueprint to optimized prompt                  │
│   │                │ • Apply Gemini 3 Pro Image best practices                  │
│   │                │ • Include technical specifications                          │
│   └───────┬────────┘                                                            │
│           ↓                                                                      │
│   ┌────────────────┐                                                            │
│   │ STAGE 4        │ Generation Engine (Gemini 3 Pro Image)                     │
│   │ GENERATE       │ • Execute with crafted prompt                              │
│   │                │ • Apply reference images if any                             │
│   │                │ • Generate at specified resolution                          │
│   └───────┬────────┘                                                            │
│           ↓                                                                      │
│   ┌────────────────┐                                                            │
│   │ STAGE 5        │ Quality Assessor                                           │
│   │ EVALUATE       │ • Check against original intent                            │
│   │                │ • Score: Accuracy, Quality, Style Match                    │
│   │                │ • Identify gaps and issues                                  │
│   └───────┬────────┘                                                            │
│           │                                                                      │
│           ├──[Pass]──→ [Final Output]                                           │
│           │                                                                      │
│           └──[Fail]──→ ┌────────────────┐                                       │
│                        │ STAGE 6        │ Iterative Refiner                     │
│                        │ REFINE         │ • Analyze failure points              │
│                        │                │ • Generate improvement prompts         │
│                        │                │ • Loop back to Stage 4                 │
│                        └────────────────┘                                       │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Gemini 3 Pro Image Capabilities (Nano Banana Pro)

### Core Capabilities We Leverage

| Capability | Specification | How Super Banana Enhances |
|-----------|---------------|--------------------------|
| **Resolution** | Up to 4K | Smart resolution selection based on use case |
| **Text Rendering** | ~94% accuracy | Pre-validation of text content before generation |
| **Reference Images** | Up to 14 images | Strategic reference selection and ordering |
| **Human Consistency** | Up to 5 subjects | Character tracking across multi-image projects |
| **Multi-Image Composition** | ✅ Native | Intelligent composition planning |
| **Inpainting/Outpainting** | ✅ Native | Mask generation with semantic understanding |
| **Local Editing** | ✅ Masks | Precise edit targeting with VCoT |
| **Style Transfer** | ✅ Native | Style decomposition and application planning |
| **Google Search Grounding** | ✅ Native | Factual accuracy verification |

### API Access

```python
# Model identifiers
models = {
    "pro": "gemini-3-pro-image-preview",
    "flash": "gemini-2.5-flash-image",  # Fallback for speed
}
```

---

## 🧠 Visual Chain-of-Thought (VCoT)

### Core Concept

Instead of sending a raw prompt to Gemini 3 Pro Image, Super Banana:

1. **Decomposes** the request into visual components
2. **Plans** each component systematically
3. **Crafts** an optimized prompt with explicit visual reasoning
4. **Generates** with full context
5. **Evaluates** against original intent
6. **Refines** if needed

### VCoT Prompt Template

```markdown
## Visual Reasoning Chain

### 1. Intent Analysis
- **What**: [Primary subject]
- **Where**: [Setting/environment]
- **How**: [Style, mood, atmosphere]
- **Why**: [Purpose, context]

### 2. Visual Decomposition
- **Foreground**: [Main subject details]
- **Midground**: [Supporting elements]
- **Background**: [Environment details]
- **Lighting**: [Light source, direction, quality]
- **Color Palette**: [Primary, secondary, accent colors]

### 3. Technical Specifications
- **Composition**: [Rule of thirds, centered, etc.]
- **Perspective**: [Eye level, bird's eye, etc.]
- **Depth of Field**: [Shallow, deep, etc.]
- **Resolution**: [4K, 1080p, etc.]
- **Aspect Ratio**: [16:9, 1:1, 9:16, etc.]

### 4. Style Reference
- **Art Style**: [Photorealistic, illustration, etc.]
- **Mood**: [Professional, playful, dramatic, etc.]
- **Reference**: [Artist style, era, inspiration]

### 5. Optimized Prompt
[Final crafted prompt for Gemini 3 Pro Image]
```

---

## 📋 Stage Deep Dives

### Stage 1: Intent Clarifier

**Purpose**: Ensure crystal-clear understanding before any visual generation

**Process**:

```
User Input → Parse Components → Identify Gaps → [Clarify if needed] → Structured Intent
```

**Output Schema**:

```json
{
  "intent": {
    "primary_action": "generate|edit|composite|style-transfer",
    "subject": {
      "type": "person|object|scene|abstract",
      "description": "detailed subject description",
      "count": 1
    },
    "context": {
      "setting": "environment description",
      "time_of_day": "morning|afternoon|evening|night",
      "mood": "emotional atmosphere"
    },
    "style": {
      "art_style": "photorealistic|illustration|3d|etc",
      "reference": "optional style reference"
    },
    "technical": {
      "resolution": "4K|1080p|720p",
      "aspect_ratio": "16:9|1:1|9:16|4:3",
      "format": "PNG|JPEG|WebP"
    }
  },
  "confidence": 0.95,
  "clarifications_needed": []
}
```

**Validation**:

- `confidence >= 0.9` → Proceed
- `confidence < 0.9` → Request clarification

---

### Stage 2: Visual Planner

**Purpose**: Create detailed visual blueprint before generation

**Process**:

```
Structured Intent → Visual Analysis → Component Planning → Blueprint
```

**Blueprint Template**:

```json
{
  "composition": {
    "layout": "rule_of_thirds|centered|golden_ratio|dynamic",
    "focal_point": {"x": 0.33, "y": 0.66},
    "depth_layers": ["foreground", "midground", "background"]
  },
  "elements": {
    "foreground": {
      "subjects": ["main subject details"],
      "position": "center-left",
      "scale": "prominent"
    },
    "midground": {
      "elements": ["supporting elements"],
      "interaction": "how they relate to foreground"
    },
    "background": {
      "environment": "description",
      "blur": "bokeh|sharp|gradient"
    }
  },
  "lighting": {
    "source": "natural|artificial|mixed",
    "direction": "front|side|back|top",
    "quality": "soft|hard|dramatic",
    "color_temperature": "warm|neutral|cool"
  },
  "color": {
    "palette": ["#hex1", "#hex2", "#hex3"],
    "dominance": "which color dominates",
    "harmony": "complementary|analogous|triadic"
  },
  "mood": {
    "atmosphere": "description",
    "emotional_tone": "positive|neutral|dramatic"
  }
}
```

---

### Stage 3: Prompt Engineer

**Purpose**: Transform blueprint into Gemini 3 Pro Image optimized prompt

**Gemini 3 Pro Image Best Practices Applied**:

1. **Narrative Description** (not keywords)

   ```
   ❌ "robot, coffee, futuristic, cafe, Mars, 3D"
   ✅ "A stoic robot barista, with chrome plating reflecting warm ambient lights, 
       carefully brewing a cup of espresso in a sleek futuristic cafe on Mars, 
       with dusty red planet visible through panoramic windows."
   ```

2. **Technical Specifications Included**

   ```
   "Shot from a low angle with shallow depth of field (f/1.8), 
    golden hour backlighting creating rim light on the robot's edges, 
    4K resolution, cinematic 21:9 aspect ratio."
   ```

3. **Style Guidance**

   ```
   "3D render style reminiscent of Pixar's environment design,
    with attention to material properties and subsurface scattering."
   ```

4. **Text Rendering** (when needed)

   ```
   "The cafe sign reads 'MARS ROAST' in bold, geometric sans-serif font,
    illuminated by subtle neon underglow."
   ```

**Prompt Structure**:

```
[Subject Description - Who/What, detailed appearance]
[Action - What is happening]
[Environment - Where, with specific details]
[Technical - Camera angle, lighting, composition]
[Style - Art style, mood, reference]
[Specifications - Resolution, aspect ratio]
```

---

### Stage 4: Generation Engine

**Purpose**: Execute generation with Gemini 3 Pro Image

**Capabilities Used**:

| Use Case | Gemini Feature | Parameters |
|----------|---------------|------------|
| **Text-to-Image** | Native generation | `prompt`, `resolution`, `aspect_ratio` |
| **Image Editing** | Multi-turn editing | `input_image`, `edit_prompt`, `mask` |
| **Style Transfer** | Reference + prompt | `reference_images[]`, `style_prompt` |
| **Multi-Subject Consistency** | Character tracking | `subject_references[]`, `maintain_identity: true` |
| **Composition** | Multi-image fusion | `images[]`, `composition_prompt` |
| **Inpainting** | Local masks | `image`, `mask`, `inpaint_prompt` |
| **Outpainting** | Canvas extension | `image`, `extend_direction`, `extend_prompt` |

**API Call Structure**:

```python
response = generate_image(
    model="gemini-3-pro-image-preview",
    prompt=optimized_prompt,
    config={
        "resolution": "4K",
        "aspect_ratio": "16:9",
        "output_format": "PNG",
        "include_safety_filter": True,
        "grounding": "google_search"  # For factual accuracy
    },
    reference_images=reference_images,  # Up to 14
    maintain_identity=True,  # For character consistency
)
```

---

### Stage 5: Quality Assessor

**Purpose**: Evaluate generated image against original intent

**Assessment Criteria**:

| Criterion | Weight | Measurement |
|-----------|--------|-------------|
| **Subject Accuracy** | 25% | Does subject match description? |
| **Composition Match** | 20% | Does layout match blueprint? |
| **Style Fidelity** | 20% | Does style match specification? |
| **Technical Quality** | 15% | Resolution, sharpness, artifacts? |
| **Text Accuracy** | 10% | If text, is it correct? |
| **Mood/Atmosphere** | 10% | Does emotional tone match? |

**Scoring Formula**:

```
Quality_Score = Σ (Criterion_Score × Weight)
```

**Thresholds**:

- `score >= 0.85`: ✅ Pass → Output
- `score >= 0.70`: ⚠️ Conditional → Minor refinement
- `score < 0.70`: ❌ Fail → Return to Stage 4 with adjustments

**Assessment Output**:

```json
{
  "overall_score": 0.87,
  "criteria_scores": {
    "subject_accuracy": 0.90,
    "composition_match": 0.85,
    "style_fidelity": 0.88,
    "technical_quality": 0.85,
    "text_accuracy": 0.95,
    "mood_atmosphere": 0.80
  },
  "issues": [
    {"area": "mood", "issue": "Slightly less dramatic than intended", "severity": "minor"}
  ],
  "verdict": "PASS",
  "recommendations": []
}
```

---

### Stage 6: Iterative Refiner

**Purpose**: Improve image when quality check fails

**Refinement Strategies**:

| Issue Type | Strategy |
|-----------|----------|
| **Subject wrong** | Regenerate with more specific subject prompt |
| **Composition off** | Provide explicit composition guidance |
| **Style mismatch** | Add style reference images |
| **Technical issues** | Adjust resolution, add quality keywords |
| **Text errors** | Regenerate with clearer text specification |
| **Mood wrong** | Adjust lighting and color descriptions |

**Refinement Process**:

```
1. Analyze failure points from Stage 5
2. Generate targeted improvement prompt
3. Decide: Regenerate vs. Edit existing
4. If edit: Generate appropriate mask
5. Execute with refined prompt
6. Return to Stage 5 for re-evaluation
```

**Max Iterations**: 3 (prevent infinite loops)

---

## 🛠️ Use Case Workflows

### Workflow 1: Simple Generation

```
User: "Create a logo for a coffee shop called 'Morning Brew'"

Super Banana VCoT:
├── Intent: Logo design, text "Morning Brew", coffee theme
├── Plan: 
│   ├── Subject: Coffee cup with steam forming text
│   ├── Style: Modern, clean, versatile
│   ├── Colors: Brown, cream, gold accents
│   └── Format: Square, high contrast for versatility
├── Prompt: [Optimized prompt with technical specs]
├── Generate: Execute with Gemini 3 Pro Image
├── Assess: Check text accuracy, visual appeal
└── Output: Final logo + variations
```

---

### Workflow 2: Complex Multi-Subject Scene

```
User: "Create a marketing image with 3 team members in a modern office, 
       using these reference photos for faces"

Super Banana VCoT:
├── Intent: Multi-subject, reference-based, marketing
├── Plan:
│   ├── Subjects: 3 people with consistent identity
│   ├── Composition: Group shot, equal prominence
│   ├── Setting: Modern office with natural light
│   ├── References: Process 3 input photos
│   └── Consistency: Enable identity tracking
├── Prompt: [Detailed prompt with subject placement]
├── Generate: Multi-subject with references
├── Assess: Identity consistency, professionalism, composition
└── Output: Final image + metadata
```

---

### Workflow 3: Iterative Editing

```
User: "Take this image, change the background to a beach, 
       and make the lighting warmer"

Super Banana VCoT:
├── Intent: Edit existing, background replacement, lighting adjustment
├── Plan:
│   ├── Source analysis: Identify subject and current background
│   ├── Edit 1: Background replacement (beach scene)
│   ├── Edit 2: Color temperature adjustment (warmer)
│   └── Preservation: Maintain subject integrity
├── Edit Steps:
│   ├── Step 1: Generate background mask (AI-assisted)
│   ├── Step 2: Apply beach background with inpainting
│   ├── Step 3: Global color temperature adjustment
│   └── Step 4: Edge blending and consistency check
├── Assess: Natural integration, lighting consistency
└── Output: Edited image with version history
```

---

## 📊 Quality Standards

### VCoT Validation Gates

| Gate | Stage | Requirement | Pass Criteria |
|------|-------|-------------|---------------|
| **Intent Confidence** | 1 | Clear understanding | `confidence >= 0.9` |
| **Blueprint Complete** | 2 | All elements defined | `completeness >= 0.95` |
| **Prompt Quality** | 3 | Follows best practices | `checklist_pass == true` |
| **Generation Success** | 4 | Image generated | `no_errors == true` |
| **Quality Score** | 5 | Meets standards | `score >= 0.85` |
| **Refinement Limit** | 6 | Max iterations | `iterations <= 3` |

---

### Error Handling

| Error Type | Handler |
|------------|---------|
| **Ambiguous intent** | Request clarification from user |
| **Technical failure** | Retry with fallback model (Flash) |
| **Quality failure** | Iterative refinement (max 3x) |
| **Content policy** | Explain limitation, suggest alternatives |
| **Reference issue** | Validate and re-process references |

---

## 🌍 MENA Market Considerations

### Cultural Sensitivity

```
Automatic Checks:
├── Modest representation in imagery
├── Religious symbol awareness
├── Cultural appropriateness
├── Arabic text rendering verification
└── Regional preference alignment
```

### Arabic Text Handling

```
Arabic Text Workflow:
├── Validate RTL rendering
├── Check font compatibility (Gemini supports Arabic)
├── Verify diacritics handling
├── Test with actual Arabic content before user delivery
└── Ensure cultural appropriateness of text content
```

---

## 🔐 Security & Safety

### Content Filtering

- All generations pass through Gemini's safety filters
- Additional custom filters for MENA cultural sensitivity
- SynthID watermarking applied to all outputs

### Data Handling

- Reference images processed securely
- No persistent storage of user images
- Audit logs for all generations

---

## 📄 Output Specification

### Standard Output

```json
{
  "image": {
    "url": "generated_image_url",
    "resolution": "3840x2160",
    "format": "PNG",
    "size_bytes": 2048000
  },
  "metadata": {
    "generation_id": "uuid",
    "model": "gemini-3-pro-image-preview",
    "timestamp": "2026-01-11T10:47:02+02:00",
    "quality_score": 0.91,
    "vcot_stages_passed": 6,
    "iterations": 1,
    "processing_time_ms": 4500
  },
  "vcot_trace": {
    "intent": "...",
    "blueprint": "...",
    "prompt_used": "...",
    "assessment": "..."
  },
  "synthid": true
}
```

---

## 📌 Summary

**Super Banana** transforms raw Gemini 3 Pro Image (Nano Banana Pro) into an **intelligent, predictable, and high-quality image generation system** through:

✅ **Visual Chain-of-Thought (VCoT)** - Explicit visual reasoning  
✅ **6-Stage Pipeline** - Structured, validated process  
✅ **Quality Assurance Gates** - Consistent high-quality output  
✅ **Iterative Refinement** - Self-correction capability  
✅ **Best Practice Prompting** - Optimized for Gemini 3 Pro Image  
✅ **Multi-Use Case Support** - Generation, editing, composition

**Core Promise:**
> "Never raw generation. Always reasoned, planned, and validated visual creation."

---

© OpenOps Studio  
Super Banana Agent v1.0.0  
Created by Mamdouh Aboammar
