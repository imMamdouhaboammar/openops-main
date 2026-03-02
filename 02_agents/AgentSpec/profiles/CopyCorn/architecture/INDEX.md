# CopyCorn v2.0 - Architecture Index

> **Complete Navigation Guide to the CopyCorn Node-Based System**

---

## 📑 Quick Navigation

| Section | File | Description |
|---------|------|-------------|
| **🏠 Overview** | [README.md](./README.md) | System architecture, components, workflow |
| **📚 Documentation** | [DOCUMENTATION.md](./DOCUMENTATION.md) | Complete guide, best practices, troubleshooting |
| **📥 Input Nodes** | [01_input_nodes/](./01_input_nodes/) | User input specifications (4 nodes) |
| **⚙️ Processing Nodes** | [02_processing_nodes/](./02_processing_nodes/) | Processing logic (12 nodes, 4 layers) |
| **📤 Output Nodes** | [03_output_nodes/](./03_output_nodes/) | Deliverable specifications (15+ outputs) |
| **📝 Prompts** | [04_prompts/](./04_prompts/) | LLM prompts for all nodes |
| **🔧 Schemas** | [05_schemas/](./05_schemas/) | Data schemas (inputs, processing, outputs) |
| **💡 Examples** | [06_examples/](./06_examples/) | Real-world execution examples |

---

## 🎯 Getting Started Paths

### Path 1: "I want to understand the system"
1. Read [README.md](./README.md) - Architecture overview
2. Review [DOCUMENTATION.md](./DOCUMENTATION.md) - Complete guide
3. Explore [example_01_taskflow_full_run.md](./06_examples/example_01_taskflow_full_run.md) - See it in action

### Path 2: "I want to use it now"
1. Skim [README.md](./README.md#usage-patterns) - Choose workflow pattern
2. Fill inputs: [01_input_nodes/](./01_input_nodes/)
3. Execute workflow (see [DOCUMENTATION.md - Implementation Guide](./DOCUMENTATION.md#implementation-guide))

### Path 3: "I want to customize/extend"
1. Understand [Node Catalog](./DOCUMENTATION.md#node-catalog)
2. Review [Extension Framework](./DOCUMENTATION.md#extension-framework)
3. Check [04_prompts/](./04_prompts/) - Customize prompts

### Path 4: "I want to integrate with my tools"
1. Review [05_schemas/](./05_schemas/) - Data formats
2. Check API documentation (coming soon)
3. Build connectors to your stack

---

## 📊 System Components Map

### Layer 0: Inputs (Parallel Entry)

| Node | File | Purpose | Est. Time |
|------|------|---------|-----------|
| **IN-01** | [IN-01_business_context.md](./01_input_nodes/IN-01_business_context.md) | Company, product, ICP, metrics | 12-15 min |
| **IN-02** | [IN-02_market_context.md](./01_input_nodes/IN-02_market_context.md) | Market, competitors, geography | 8-10 min |
| **IN-03** | [IN-03_campaign_brief.md](./01_input_nodes/IN-03_campaign_brief.md) | Goals, channels, timeline | 5-7 min |
| **IN-04** | [IN-04_assets_constraints.md](./01_input_nodes/IN-04_assets_constraints.md) | Brand, content, constraints | 3-5 min |

**Total Input Phase**: ~30 minutes

---

### Layer 1: Grounding & Research

| Node | Spec File | Prompt File | Purpose | Est. Time |
|------|-----------|-------------|---------|-----------|
| **PR-01** | [PR-01_external_research.md](./02_processing_nodes/layer_1_grounding/PR-01_external_research.md) | [PR-01_external_research.md](./04_prompts/processing_prompts/PR-01_external_research.md) | Industry best practices research | 4 min |
| **PR-02** | [PR-02_internal_analysis.md](./02_processing_nodes/layer_1_grounding/PR-02_internal_analysis.md) | [PR-02_internal_analysis.md](./04_prompts/processing_prompts/PR-02_internal_analysis.md) | Business context deep-dive | 3 min |

**Layer 1 Total**: ~7 minutes

---

### Layer 2: Strategy Formation

| Node | Spec File | Prompt File | Purpose | Est. Time |
|------|-----------|-------------|---------|-----------|
| **PR-03** | [PR-03_diagnosis.md](./02_processing_nodes/layer_2_strategy/PR-03_diagnosis.md) | [PR-03_diagnosis.md](./04_prompts/processing_prompts/PR-03_diagnosis.md) | Problem identification | 2 min |
| **PR-04** | [PR-04_direction.md](./02_processing_nodes/layer_2_strategy/PR-04_direction.md) | [PR-04_direction.md](./04_prompts/processing_prompts/PR-04_direction.md) | Strategic positioning | 3 min |
| **PR-05** | [PR-05_levers_channels.md](./02_processing_nodes/layer_2_strategy/PR-05_levers_channels.md) | [PR-05_levers_channels.md](./04_prompts/processing_prompts/PR-05_levers_channels.md) | Tactical priorities | 2 min |

**Layer 2 Total**: ~7 minutes

---

### Layer 3: Tactical Design

| Node | Spec File | Prompt File | Purpose | Est. Time |
|------|-----------|-------------|---------|-----------|
| **PR-06** | [PR-06_message_architecture.md](./02_processing_nodes/layer_3_tactics/PR-06_message_architecture.md) | [PR-06_message_architecture.md](./04_prompts/processing_prompts/PR-06_message_architecture.md) | Value prop, key messages | 3 min |
| **PR-07** | [PR-07_creative_angles.md](./02_processing_nodes/layer_3_tactics/PR-07_creative_angles.md) | [PR-07_creative_angles.md](./04_prompts/processing_prompts/PR-07_creative_angles.md) | Headlines, hooks, angles | 4 min |
| **PR-08** | [PR-08_channel_content.md](./02_processing_nodes/layer_3_tactics/PR-08_channel_content.md) | [PR-08_channel_content.md](./04_prompts/processing_prompts/PR-08_channel_content.md) | Platform-specific execution | 5 min |
| **PR-09** | [PR-09_psychology_application.md](./02_processing_nodes/layer_3_tactics/PR-09_psychology_application.md) | [PR-09_psychology_application.md](./04_prompts/processing_prompts/PR-09_psychology_application.md) | Behavioral design | 2 min |

**Layer 3 Total**: ~14 minutes

---

### Layer 4: Measurement Design

| Node | Spec File | Prompt File | Purpose | Est. Time |
|------|-----------|-------------|---------|-----------|
| **PR-10** | [PR-10_kpis_definition.md](./02_processing_nodes/layer_4_measurement/PR-10_kpis_definition.md) | [PR-10_kpis_definition.md](./04_prompts/processing_prompts/PR-10_kpis_definition.md) | Metrics framework | 3 min |
| **PR-11** | [PR-11_experiment_design.md](./02_processing_nodes/layer_4_measurement/PR-11_experiment_design.md) | [PR-11_experiment_design.md](./04_prompts/processing_prompts/PR-11_experiment_design.md) | Hypotheses & A/B tests | 3 min |
| **PR-12** | [PR-12_growth_loop_mapping.md](./02_processing_nodes/layer_4_measurement/PR-12_growth_loop_mapping.md) | [PR-12_growth_loop_mapping.md](./04_prompts/processing_prompts/PR-12_growth_loop_mapping.md) | Compounding systems | 3 min |

**Layer 4 Total**: ~9 minutes

**Total Processing Time**: ~37 minutes

---

### Layer 5: Outputs

#### Category A: Strategy Documents

| Output | Spec File | Source Nodes | Format |
|--------|-----------|--------------|--------|
| **OUT-A1** | [OUT-A1_executive_summary.md](./03_output_nodes/category_a_strategy/OUT-A1_executive_summary.md) | PR-03, PR-04 | 2-page MD |
| **OUT-A2** | [OUT-A2_full_strategy.md](./03_output_nodes/category_a_strategy/OUT-A2_full_strategy.md) | PR-03, PR-04, PR-05 | 10-15 page MD |
| **OUT-A3** | [OUT-A3_positioning_messaging.md](./03_output_nodes/category_a_strategy/OUT-A3_positioning_messaging.md) | PR-04, PR-06 | Reference MD |

#### Category B: Tactical Deliverables

| Output | Spec File | Source Nodes | Format |
|--------|-----------|--------------|--------|
| **OUT-B1** | [OUT-B1_campaign_briefs.md](./03_output_nodes/category_b_tactical/OUT-B1_campaign_briefs.md) | PR-05, PR-06, PR-08 | Per-channel MD |
| **OUT-B2** | [OUT-B2_content_calendar.md](./03_output_nodes/category_b_tactical/OUT-B2_content_calendar.md) | PR-08 | CSV/Notion |
| **OUT-B3** | [OUT-B3_ad_copy_library.md](./03_output_nodes/category_b_tactical/OUT-B3_ad_copy_library.md) | PR-07, PR-08 | MD database |
| **OUT-B4** | [OUT-B4_email_sequences.md](./03_output_nodes/category_b_tactical/OUT-B4_email_sequences.md) | PR-08 | Flow diagrams |
| **OUT-B5** | [OUT-B5_landing_pages.md](./03_output_nodes/category_b_tactical/OUT-B5_landing_pages.md) | PR-06, PR-08, PR-09 | Wireframes + Copy |

#### Category C: Creative Assets

| Output | Spec File | Source Nodes | Format |
|--------|-----------|--------------|--------|
| **OUT-C1** | [OUT-C1_headlines_en.md](./03_output_nodes/category_c_creative/OUT-C1_headlines_en.md) | PR-07 | 50+ variations |
| **OUT-C2** | [OUT-C2_hooks_angles.md](./03_output_nodes/category_c_creative/OUT-C2_hooks_angles.md) | PR-07, PR-09 | Categorized MD |
| **OUT-C3** | [OUT-C3_social_templates.md](./03_output_nodes/category_c_creative/OUT-C3_social_templates.md) | PR-08 | Platform-specific |
| **OUT-C4** | [OUT-C4_arabic_content.md](./03_output_nodes/category_c_creative/OUT-C4_arabic_content.md) | PR-07, PR-08 | Bilingual assets |

#### Category D: Implementation Tools

| Output | Spec File | Source Nodes | Format |
|--------|-----------|--------------|--------|
| **OUT-D1** | [OUT-D1_experiment_tracker.md](./03_output_nodes/category_d_implementation/OUT-D1_experiment_tracker.md) | PR-11 | CSV template |
| **OUT-D2** | [OUT-D2_kpi_dashboard.md](./03_output_nodes/category_d_implementation/OUT-D2_kpi_dashboard.md) | PR-10 | Dashboard mockup |
| **OUT-D3** | [OUT-D3_growth_loops.md](./03_output_nodes/category_d_implementation/OUT-D3_growth_loops.md) | PR-12 | Visual diagrams |

---

## 🔄 Workflow Patterns Reference

### Pattern 1: Full System Run
- **Nodes**: All 20+
- **Time**: ~85 min
- **Use Case**: Complete GTM strategy
- **Example**: [example_01_taskflow_full_run.md](./06_examples/example_01_taskflow_full_run.md)

### Pattern 2: Express Strategy
- **Nodes**: IN-01/02/03 → PR-01/02/03/04 → OUT-A1/A2
- **Time**: ~25 min
- **Use Case**: Quick strategic direction
- **Example**: [example_02_express_strategy.md](./06_examples/example_02_express_strategy.md)

### Pattern 3: Creative Sprint
- **Nodes**: IN-03/04 → PR-06/07/08 → OUT-B3/C1/C2
- **Time**: ~30 min
- **Use Case**: Fast creative generation
- **Example**: [example_03_creative_sprint.md](./06_examples/example_03_creative_sprint.md)

### Pattern 4: Arabic Campaign
- **Nodes**: IN-02[AR]/03 → PR-01/07/08 → OUT-C3/C4
- **Time**: ~35 min
- **Use Case**: MENA market content
- **Example**: [example_04_arabic_campaign.md](./06_examples/example_04_arabic_campaign.md)

### Pattern 5: Measurement Setup
- **Nodes**: IN-01/03 → PR-10/11/12 → OUT-D1/D2/D3
- **Time**: ~20 min
- **Use Case**: Analytics & experiments
- **Example**: [example_05_measurement_setup.md](./06_examples/example_05_measurement_setup.md)

---

## 📚 Learning Resources

### For Beginners
1. Start: [README.md](./README.md)
2. Deep Dive: [DOCUMENTATION.md](./DOCUMENTATION.md)
3. See Example: [example_01_taskflow_full_run.md](./06_examples/example_01_taskflow_full_run.md)
4. Try Pattern: Express Strategy (easiest)

### For Practitioners
1. Input Templates: [01_input_nodes/](./01_input_nodes/)
2. Choose Pattern: [Workflow Patterns](#workflow-patterns-reference)
3. Customize Prompts: [04_prompts/](./04_prompts/)
4. Review Schemas: [05_schemas/](./05_schemas/)

### For Developers
1. Architecture: [README.md](./README.md)
2. Extension Guide: [DOCUMENTATION.md - Extension Framework](./DOCUMENTATION.md#extension-framework)
3. Schemas: [05_schemas/](./05_schemas/)
4. API Docs: Coming soon

---

## 🛠️ Tools & Scripts

### Validation
- `scripts/validate_inputs.py` - Validate input completeness
- `scripts/validate_outputs.py` - Check output quality

### Execution
- `copycorn.py run` - Execute workflow
- `copycorn.py rerun` - Re-execute specific nodes
- `copycorn.py export` - Export to different formats

### Development
- `scripts/load_prompts.py` - Load prompts into vector DB
- `scripts/test_node.py` - Test individual node
- `scripts/benchmark.py` - Performance benchmarking

---

## 📦 Directory Structure

```
architecture/
├── README.md                          # System architecture overview
├── DOCUMENTATION.md                   # Complete documentation
├── INDEX.md                           # This file - navigation guide
│
├── 01_input_nodes/                    # User input specifications
│   ├── IN-01_business_context.md
│   ├── IN-02_market_context.md
│   ├── IN-03_campaign_brief.md
│   └── IN-04_assets_constraints.md
│
├── 02_processing_nodes/               # Processing node specs
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
│
├── 03_output_nodes/                   # Output specifications
│   ├── category_a_strategy/
│   │   ├── OUT-A1_executive_summary.md
│   │   ├── OUT-A2_full_strategy.md
│   │   └── OUT-A3_positioning_messaging.md
│   ├── category_b_tactical/
│   │   ├── OUT-B1_campaign_briefs.md
│   │   ├── OUT-B2_content_calendar.md
│   │   ├── OUT-B3_ad_copy_library.md
│   │   ├── OUT-B4_email_sequences.md
│   │   └── OUT-B5_landing_pages.md
│   ├── category_c_creative/
│   │   ├── OUT-C1_headlines_en.md
│   │   ├── OUT-C2_hooks_angles.md
│   │   ├── OUT-C3_social_templates.md
│   │   └── OUT-C4_arabic_content.md
│   └── category_d_implementation/
│       ├── OUT-D1_experiment_tracker.md
│       ├── OUT-D2_kpi_dashboard.md
│       └── OUT-D3_growth_loops.md
│
├── 04_prompts/                        # LLM prompts
│   ├── input_prompts/
│   ├── processing_prompts/
│   │   ├── PR-01_external_research.md
│   │   ├── PR-02_internal_analysis.md
│   │   └── ...
│   └── output_prompts/
│
├── 05_schemas/                        # Data schemas (JSON/YAML)
│   ├── input_schemas/
│   ├── processing_schemas/
│   └── output_schemas/
│
└── 06_examples/                       # Real-world examples
    ├── example_01_taskflow_full_run.md
    ├── example_02_express_strategy.md
    ├── example_03_creative_sprint.md
    ├── example_04_arabic_campaign.md
    └── example_05_measurement_setup.md
```

---

## 🔗 External Resources

### Platform Inspiration
- **Google Opal**: https://opal.google - Visual workflow builder for AI apps
- Inspired CopyCorn's node-based architecture

### Research Sources (Used by PR-01)
- **Reforge**: https://reforge.com - Growth frameworks
- **CXL Institute**: https://cxl.com - Conversion optimization
- **HubSpot Academy**: https://academy.hubspot.com - Inbound marketing
- **GrowthHackers**: https://growthhackers.com - Growth tactics

### Technical Stack
- **LLM**: OpenAI GPT-4, Anthropic Claude, Google Gemini
- **Schemas**: JSON Schema for validation
- **Execution**: Python-based orchestration
- **Storage**: File-based (portable, version-controllable)

---

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| **Total Nodes** | 20+ (4 input, 12 processing, 15+ output) |
| **Processing Layers** | 4 (Grounding, Strategy, Tactics, Measurement) |
| **Workflow Patterns** | 5+ pre-configured |
| **Estimated Full Run Time** | ~85 minutes |
| **Output Files (Full Run)** | 28+ files, 150+ pages |
| **Customization Points** | Infinite (extensible architecture) |
| **Languages Supported** | English, Arabic (عربي) |
| **Industries Covered** | Universal (customizable per vertical) |

---

## 🎯 Success Criteria

### Quality Metrics (Target)
- ✅ Output Completeness: 95%+
- ✅ Strategic Alignment: 90%+
- ✅ Tactical Actionability: 95%+
- ✅ User Satisfaction: 4.5+/5
- ✅ Time Saved vs Manual: 10x+

### Adoption Metrics
- 🎯 Agencies using CopyCorn: 50+ (Q2 2026 goal)
- 🎯 Strategies generated: 500+ (Q2 2026 goal)
- 🎯 Community contributors: 20+ (ongoing)

---

## 💡 Pro Tips

1. **Start Small**: Use "Express Strategy" pattern first to get familiar
2. **Iterate**: First run is a draft—refine based on your domain expertise
3. **Customize Prompts**: Tailor node prompts to your industry for better results
4. **Cache Research**: PR-01 outputs can be reused across similar projects
5. **Batch Process**: Run multiple clients with same pattern for efficiency
6. **Track Quality**: Monitor confidence scores and adjust as needed

---

## 🚀 Roadmap

### v2.1 (Q1 2026) - Planned
- [ ] Web UI for input collection
- [ ] API for programmatic access
- [ ] More workflow patterns
- [ ] Industry-specific node packs

### v2.2 (Q2 2026) - Planned
- [ ] Visual workflow editor (Opal-like)
- [ ] Node marketplace
- [ ] Team collaboration features
- [ ] Integration with marketing tools

### v3.0 (Q3 2026) - Vision
- [ ] Self-improving nodes (learn from feedback)
- [ ] Multi-agent orchestration
- [ ] Real-time execution monitoring
- [ ] Enterprise features

---

## 📞 Get Help

**Documentation Issues**:
- File an issue: [GitHub Issues]
- Email: mamdouh@openops.studio

**Usage Questions**:
- Check [DOCUMENTATION.md](./DOCUMENTATION.md#troubleshooting)
- Review [examples](./06_examples/)
- Join community: [Link to Discord/Slack]

**Feature Requests**:
- Submit via GitHub Issues
- Vote on roadmap items
- Contribute extensions

---

## 🙏 Acknowledgments

**Inspired By**:
- Google Opal Platform
- Reforge Growth Frameworks
- Harvard Behavioral Economics Research

**Built With** 🧠:
- CopyCorn Elite Squad (20+ Specialist Personas)
- OpenOps Studio Team
- Community Contributors

---

**Last Updated**: January 12, 2026  
**Version**: 2.0.0  
**Maintained By**: OpenOps Studio

---

© 2026 OpenOps Studio - CopyCorn Architecture  
**Transforming Marketing from Art to Science, One Node at a Time** 🚀
