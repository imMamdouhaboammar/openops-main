# CopyCorn AI App Architecture

> **Inspired by**: Google Opal Platform  
> **Pattern**: Node-based Workflow System  
> **Version**: 2.0.0 - Infinite Capabilities Edition

---

## 🎯 Overview

CopyCorn has evolved from a monolithic agent prompt into a **sophisticated AI Application Architecture** modeled after Google's Opal platform. This architecture treats marketing & growth expertise as a **composable system of interconnected nodes**, each with specific inputs, processing logic, and outputs.

### Key Innovation

Instead of a single mega-prompt, CopyCorn now operates as:

- ✅ **Modular Node System**: 20+ specialized processing nodes
- ✅ **Parallel Processing**: Multiple inputs processed simultaneously
- ✅ **Sequential Intelligence**: Outputs feed into subsequent nodes
- ✅ **Composable Outputs**: Mix and match deliverables
- ✅ **Infinite Extensibility**: Add new nodes without breaking existing flow

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        INPUT LAYER (Parallel)                    │
├─────────────────────────────────────────────────────────────────┤
│  [Business Context]  [Market Context]  [Campaign Brief]  [Assets]│
└────────┬────────────────┬─────────────────┬──────────────────┬───┘
         │                │                 │                  │
         └────────────────┴─────────────────┴──────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PROCESSING LAYER 1: Grounding                │
├─────────────────────────────────────────────────────────────────┤
│         [External Research]  →  [Internal Analysis]             │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PROCESSING LAYER 2: Strategy                   │
├─────────────────────────────────────────────────────────────────┤
│      [Diagnosis]  →  [Direction]  →  [Levers & Channels]        │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PROCESSING LAYER 3: Tactics                   │
├─────────────────────────────────────────────────────────────────┤
│  [Messaging] → [Creative] → [Channel Content] → [Psychology]    │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                 PROCESSING LAYER 4: Measurement                 │
├─────────────────────────────────────────────────────────────────┤
│       [KPIs]  →  [Experiments]  →  [Growth Loops]               │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OUTPUT LAYER (Composable)                  │
├─────────────────────────────────────────────────────────────────┤
│  [Strategy Docs]  [Tactical Deliverables]  [Creative Assets]    │
│               [Implementation Tools]                             │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  FINAL UNIFIED OUTPUT    │
                    │ Marketing System Package │
                    └──────────────────────────┘
```

---

## 🏗️ System Components

### 1. Input Layer (4 Parallel Nodes)

All inputs can be filled **simultaneously** (parallel processing):

| Node ID | Name | Purpose | Required Fields |
|---------|------|---------|----------------|
| `IN-01` | Business Context | Company & product info | ICP, Product, Budget, Metrics |
| `IN-02` | Market Context | Industry & competition | Industry, Competitors, Geography, Language |
| `IN-03` | Campaign Brief | Specific campaign goals | Goal, Funnel stage, Key message, CTA |
| `IN-04` | Assets & Constraints | Existing resources | Brand guidelines, Content, Tech constraints |

📄 **Details**: See [01_input_nodes/](./01_input_nodes/)

---

### 2. Processing Layers (14 Specialized Nodes)

#### Layer 1: Grounding & Research (2 Nodes)

| Node ID | Name | Inputs | Outputs | Processing Type |
|---------|------|--------|---------|----------------|
| `PR-01` | External Research | All inputs | Industry insights, Best practices | Web search + Analysis |
| `PR-02` | Internal Analysis | All inputs + PR-01 | Context analysis, Gaps, Opportunities | Deep analysis |

#### Layer 2: Strategy Formation (3 Nodes)

| Node ID | Name | Inputs | Outputs | Processing Type |
|---------|------|--------|---------|----------------|
| `PR-03` | Diagnosis | PR-01, PR-02 | Problem identification, Root causes | Strategic analysis |
| `PR-04` | Direction | PR-03 | Strategic direction, Positioning | Strategic planning |
| `PR-05` | Levers & Channels | PR-04 | Channel selection, Growth levers | Tactical planning |

#### Layer 3: Tactical Design (4 Nodes)

| Node ID | Name | Inputs | Outputs | Processing Type |
|---------|------|--------|---------|----------------|
| `PR-06` | Message Architecture | PR-04, PR-05 | Value prop, Key messages | Copywriting |
| `PR-07` | Creative Angles | PR-06 | Headlines, Hooks, Angles | Creative generation |
| `PR-08` | Channel Content | PR-05, PR-06, PR-07 | Platform-specific content | Content adaptation |
| `PR-09` | Psychology Application | PR-06, PR-07 | Persuasion techniques | Behavioral design |

#### Layer 4: Measurement Design (3 Nodes)

| Node ID | Name | Inputs | Outputs | Processing Type |
|---------|------|--------|---------|----------------|
| `PR-10` | KPIs Definition | PR-03, PR-04 | Metrics framework, Dashboards | Analytics design |
| `PR-11` | Experiment Design | PR-05, PR-07 | A/B tests, Hypotheses | Experimentation |
| `PR-12` | Growth Loop Mapping | All layers | Loop diagrams, Compounding strategies | Systems thinking |

📄 **Details**: See [02_processing_nodes/](./02_processing_nodes/)

---

### 3. Output Layer (12+ Deliverables)

#### Category A: Strategy Documents (3 Outputs)

| Output ID | Name | Source Nodes | Format |
|-----------|------|--------------|--------|
| `OUT-A1` | Executive Summary | PR-03, PR-04 | 2-page PDF/MD |
| `OUT-A2` | Full Strategy Document | PR-03, PR-04, PR-05 | 10-15 page MD |
| `OUT-A3` | Positioning & Messaging Guide | PR-04, PR-06 | Reference document |

#### Category B: Tactical Deliverables (5 Outputs)

| Output ID | Name | Source Nodes | Format |
|-----------|------|--------------|--------|
| `OUT-B1` | Campaign Briefs | PR-05, PR-06, PR-08 | Per-channel briefs |
| `OUT-B2` | Content Calendar | PR-08 | Spreadsheet/Notion |
| `OUT-B3` | Ad Copy Library | PR-07, PR-08 | Copy database |
| `OUT-B4` | Email Sequences | PR-08 | Email flow diagrams |
| `OUT-B5` | Landing Page Structures | PR-06, PR-08, PR-09 | Wireframes + Copy |

#### Category C: Creative Assets (4 Outputs)

| Output ID | Name | Source Nodes | Format |
|-----------|------|--------------|--------|
| `OUT-C1` | Headlines Bank | PR-07 | 50+ variations |
| `OUT-C2` | Hooks & Angles Library | PR-07, PR-09 | Categorized library |
| `OUT-C3` | Social Media Templates | PR-08 | Platform-specific |
| `OUT-C4` | Arabic Content Variations | PR-07, PR-08 | Bilingual assets |

#### Category D: Implementation Tools (3 Outputs)

| Output ID | Name | Source Nodes | Format |
|-----------|------|--------------|--------|
| `OUT-D1` | Experiment Tracker | PR-11 | Spreadsheet template |
| `OUT-D2` | KPI Dashboard Spec | PR-10 | Dashboard mockup |
| `OUT-D3` | Growth Loop Diagrams | PR-12 | Visual diagrams |

📄 **Details**: See [03_output_nodes/](./03_output_nodes/)

---

### 4. Final Unified Output

**Output ID**: `FINAL-01`  
**Name**: Complete Marketing System Package

**Structure**:
```
📦 CopyCorn_Marketing_System_[ProjectName]_[Date]/
│
├── 📋 00_Executive_Summary.md
│
├── 📊 01_Strategy/
│   ├── full_strategy.md
│   ├── positioning_messaging.md
│   ├── target_segments.md
│   └── growth_levers.md
│
├── ⚡ 02_Tactical_Execution/
│   ├── campaigns/
│   │   ├── google_ads_brief.md
│   │   ├── meta_ads_brief.md
│   │   ├── linkedin_ads_brief.md
│   │   └── organic_social_brief.md
│   ├── content/
│   │   ├── content_calendar.csv
│   │   └── editorial_guidelines.md
│   ├── ads/
│   │   ├── ad_copy_library.md
│   │   └── creative_testing_plan.md
│   └── emails/
│       ├── welcome_sequence.md
│       ├── nurture_flow.md
│       └── winback_campaign.md
│
├── 🎨 03_Creative_Library/
│   ├── headlines_en.md (50+ variations)
│   ├── headlines_ar.md (50+ variations)
│   ├── hooks_and_angles.md
│   ├── value_props.md
│   └── social_templates/
│       ├── instagram.md
│       ├── linkedin.md
│       ├── tiktok.md
│       └── twitter.md
│
├── 📈 04_Measurement/
│   ├── kpi_framework.md
│   ├── dashboard_spec.md
│   ├── experiments/
│   │   ├── experiment_tracker.csv
│   │   ├── hypothesis_01.md
│   │   ├── hypothesis_02.md
│   │   └── hypothesis_03.md
│   └── attribution_model.md
│
├── 🔄 05_Growth_Loops/
│   ├── loop_diagrams.md
│   ├── content_loop.md
│   ├── referral_loop.md
│   └── paid_reinvestment_loop.md
│
└── 📖 06_Implementation_Guide/
    ├── week_1_checklist.md
    ├── week_2_4_roadmap.md
    └── team_roles.md
```

---

## 🔌 Node Connection Protocol

### Data Flow Rules

1. **Parallel Inputs**: All input nodes (IN-01 to IN-04) can be filled simultaneously
2. **Sequential Processing**: Each processing layer waits for the previous layer to complete
3. **Conditional Outputs**: Some outputs only generate if specific inputs are provided (e.g., Arabic content only if language=AR)
4. **Composable Assembly**: Final output assembles only the requested deliverables

### Connection Types

| Type | Symbol | Description | Example |
|------|--------|-------------|---------|
| **Direct** | → | Output directly feeds into next node | PR-01 → PR-02 |
| **Broadcast** | ⇒ | Output feeds into multiple nodes | PR-04 ⇒ PR-06, PR-10 |
| **Conditional** | ↝ | Connection activates based on condition | IN-02[lang=AR] ↝ OUT-C4 |
| **Merge** | ⊕ | Multiple inputs merge into one node | PR-06 ⊕ PR-07 → PR-08 |

---

## 🚀 Usage Patterns

### Pattern 1: Full System Run (Comprehensive)

```
All Inputs → All Processing Layers → All Outputs → Final Package
```

**Use Case**: New product launch, full GTM strategy  
**Duration**: ~30-45 minutes (depending on LLM speed)

---

### Pattern 2: Express Strategy (Speed Mode)

```
IN-01, IN-02, IN-03 → PR-01, PR-02, PR-03, PR-04 → OUT-A1, OUT-A2
```

**Use Case**: Quick strategic direction for presentation  
**Duration**: ~10 minutes

---

### Pattern 3: Creative Sprint (Execution Focus)

```
IN-03, IN-04 → PR-06, PR-07, PR-08 → OUT-B3, OUT-C1, OUT-C2
```

**Use Case**: Need ad copy and creative angles fast  
**Duration**: ~15 minutes

---

### Pattern 4: Arabic-First Campaign

```
IN-02[lang=AR] + IN-03 → PR-07, PR-08 → OUT-C3, OUT-C4
```

**Use Case**: MENA market social media campaign  
**Duration**: ~20 minutes

---

## 🧬 Extensibility Framework

### Adding New Nodes

To extend CopyCorn with new capabilities:

1. **Identify Layer**: Which processing layer does it belong to?
2. **Define Inputs**: What does it need from previous nodes?
3. **Write Prompt**: Create specialized prompt for this node
4. **Define Output Schema**: What structured data does it produce?
5. **Map Connections**: Which nodes receive its output?

**Example**: Adding a "Competitor Analysis" node

```yaml
node_id: PR-13
name: Competitor Analysis
layer: 2 (Strategy)
inputs:
  - IN-02 (Market Context)
  - PR-01 (External Research)
prompt: "prompts/pr-13-competitor-analysis.md"
output_schema:
  - competitor_positioning: []
  - competitive_advantages: []
  - gaps_to_exploit: []
connections_to:
  - PR-04 (Direction)
  - PR-06 (Message Architecture)
```

---

## 📚 Documentation Structure

```
architecture/
├── README.md (this file)
├── 01_input_nodes/
│   ├── IN-01_business_context.md
│   ├── IN-02_market_context.md
│   ├── IN-03_campaign_brief.md
│   └── IN-04_assets_constraints.md
├── 02_processing_nodes/
│   ├── layer_1_grounding/
│   │   ├── PR-01_external_research.md
│   │   └── PR-02_internal_analysis.md
│   ├── layer_2_strategy/
│   │   ├── PR-03_diagnosis.md
│   │   ├── PR-04_direction.md
│   │   └── PR-05_levers_channels.md
│   ├── layer_3_tactics/
│   │   ├── PR-06_message_architecture.md
│   │   ├── PR-07_creative_angles.md
│   │   ├── PR-08_channel_content.md
│   │   └── PR-09_psychology_application.md
│   └── layer_4_measurement/
│       ├── PR-10_kpis_definition.md
│       ├── PR-11_experiment_design.md
│       └── PR-12_growth_loop_mapping.md
├── 03_output_nodes/
│   ├── category_a_strategy/
│   ├── category_b_tactical/
│   ├── category_c_creative/
│   └── category_d_implementation/
├── 04_prompts/
│   ├── input_prompts/
│   ├── processing_prompts/
│   └── output_prompts/
├── 05_schemas/
│   ├── input_schemas/
│   ├── processing_schemas/
│   └── output_schemas/
└── 06_examples/
    ├── example_01_saas_launch.md
    ├── example_02_ecommerce_q4.md
    └── example_03_arabic_campaign.md
```

---

## 🎯 Success Metrics

### System Performance KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to Strategy** | < 15 min | IN-01 to OUT-A2 completion |
| **Creative Output Volume** | 50+ variations | OUT-C1 count |
| **Bilingual Quality** | 95%+ accuracy | Arabic content review |
| **Implementation Readiness** | 100% actionable | Deliverable completeness |
| **User Satisfaction** | 4.5+/5 | Post-generation survey |

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-01-12 | Complete architecture overhaul - Node-based system |
| 1.0.0 | 2025-12-01 | Initial CopyCorn agent profile |

---

## 📞 Support & Extension Requests

For questions, bug reports, or feature requests:
- **GitHub Issues**: [Link to repo]
- **Email**: mamdouh@openops.studio
- **Documentation**: This directory

---

**Built with** 🧠 **by the OpenOps Studio Team**  
**Powered by** the CopyCorn Elite Squad (20+ Specialists)
