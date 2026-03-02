# Support Configuration Files

This directory contains industry-specific and regional configuration files that enhance the Gem agent's ability to provide tailored marketing strategies.

## Directory Structure

```
support_config/
├── README.md (this file)
├── touchpoint_catalog.yaml (touchpoint types, sequencing rules, psychological functions)
├── industry_specific/
│   ├── saas.yaml (SaaS business models)
│   ├── ecommerce.yaml (E-commerce & retail)
│   └── [more industries to be added: b2b_services, b2c_services, healthcare, fintech, education]
└── regional/
    ├── egypt.yaml (Egypt market specifics)
    ├── gcc.yaml (Gulf Cooperation Council overview)
    └── [more regions to be added: saudi.yaml, uae.yaml]
```

## How These Files Are Used

### Automatic Loading (Lazy Loading)

The agent uses a **lazy loading** mechanism defined in `gem_config.json`:

1. **Touchpoint Catalog**: Always loaded (step 6 in resource loading protocol)
2. **Industry Configs**: Loaded when industry mentioned in briefing (e.g., user says "SaaS" → loads saas.yaml)
3 **Regional Configs**: Loaded when region mentioned (e.g., user says "Egypt" → loads egypt.yaml)

This ensures the agent has relevant context without overwhelming memory with unnecessary data.

### Integration with Entry Point

From `gem_config.json`:

```json
"resource_loading_protocol": {
  "step_7_industry_configs": {
    "lazy_load_on_mention": true,
    "triggers": ["saas", "e-commerce", "B2B", "healthcare", ...],
    "path": "support_config/industry_specific/{industry}.yaml"
  },
  "step_8_regional_configs": {
    "lazy_load_on_mention": true,
    "triggers": ["egypt", "saudi", "uae", "gcc", "dubai", "riyadh", ...],
    "path": "support_config/regional/{region}.yaml"
  }
}
```

## File Contents Overview

### touchpoint_catalog.yaml

**Purpose**: Defines the 5 touchpoint categories and sequencing rules

**Contains**:

- **Presence Touchpoints**: Create awareness (SEO, ads, social)
- **Education Touchpoints**: Build understanding (content, webinars, videos)
- **Validation Touchpoints**: Reduce risk (case studies, reviews, trials)
- **Human Touchpoints**: Provide reassurance (sales calls, chat, events)
- **Conversion Touchpoints**: Remove friction (landing pages, checkout, offers)

**Sequencing Rules**:

1. Presence before Education
2. Education before Validation
3. Validation before Human
4. Human before High-Ticket Conversion
5. Conversion Last

### Industry-Specific Configs

Each industry config contains:

- **Business Model** (revenue type, sales cycle, typical economics)
- **Buyer Psychology** (concerns, decision criteria, motivations)
- **Channel Strategy** (tier 1/2/3 recommendations, avoid list)
- **Touchpoint Architecture** (journey stage mapping)
- **Budget Allocation** (typical spend splits by segment)
- **Regional Adjustments** (Egypt/GCC nuances for this industry)
- **Success Metrics** (benchmarks, KPIs, kill criteria)
- **Anti-Patterns** (common mistakes to avoid)

**Example**: saas.yaml includes:

- SMB SaaS: 30% content, 40% paid search, 15% social, 15% product marketing
- Mid-market SaaS: ABM focus, webinars, LinkedIn heavy
- Enterprise SaaS: Relationship-driven, events, field marketing

### Regional Configs

Each regional config contains:

- **Market Overview** (demographics, internet penetration, economic context)
- **Platform Preferences** (channel-by-channel usage data and marketing fit)
- **Payment Behaviors** (COD, cards, e-wallets, buyer psychology)
- **Buyer Psychology** (trust barriers, price sensitivity, relationship focus)
- **Channel Prioritization** (tier 1/2/3 for this region)
- **Seasonal Calendar** (Ramadan, Eid, national days, key sales periods)
- **Messaging Best Practices** (language, creative, cultural sensitivities)
- **Logistics** (shipping, fulfillment, delivery expectations)
- **Success Benchmarks** (region-specific CPCs, CACs, ROAs targets)
- **Regional Challenges** (unique obstacles and solutions)

**Example**: egypt.yaml highlights:

- COD = 70-80% of e-commerce (MANDATORY)
- WhatsApp = primary customer communication
- Ramadan = 40% of annual sales
- Facebook still dominant (49M users)
- Free shipping threshold: EGP 500+

**Example**: gcc.yaml highlights:

- Snapchat dominates Saudi Arabia (75% daily use)
- Premium positioning (high purchasing power)
- National vs Expat segmentation critical (especially UAE)
- Next-day delivery is standard
- Influencer marketing very effective

## When to Add New Files

### Add a New Industry Config When

- A new industry vertical becomes a common use case (e.g., fintech, healthcare)
- Existing configs don't cover the business model well
- Industry has unique buyer psychology or channel mix

### Add a New Regional Config When

- Expanding to new markets (e.g., Saudi-specific vs general GCC)
- Regional nuances justify separate config (e.g., Kuwait has different payment landscape than UAE)
- Enough data/insights exist to warrant dedicated file

## File Format Standards

All YAML files follow this structure:

```yaml
# Header
industry: [industry_name]  # or region: [region_name]
last_updated: "YYYY-MM-DD"
source_verification: "Brief note on data sources"

## Section structure with ## headers
key_data:
  nested_structure:
    - list_items
    - with_hyphen_bullets

rationale_fields:
  channel: "Channel name"
  rationale: "WHY this channel"
  expected_timeline: "When results appear"
  typical_cost: "Benchmarks"
```

### Best Practices

- **Cite benchmarks**: Include typical costs, timelines, conversion rates
- **Explain WHY**: Not just WHAT—include rationale for strategies
- **Regional adjustments**: Always note Egypt/GCC nuances
- **Recency**: Mark last_updated and source_verification dates
- **Anti-patterns**: Include common mistakes section (learning mode)

## How Agents Use These Files

### During Briefing (S2)

- When user mentions industry → Load industry config → Ask industry-specific questions
- When user mentions region → Load regional config → Ask region-specific questions (Q8 in gem_instructions.json)

### During Strategy Design (S4)

- **Industry config**: Informs channel selection, budget allocation, success metrics
- **Regional config**: Adjusts platforms, creative, payment methods, seasonal planning
- **Touchpoint catalog**: Structures buyer journey mapping

### During Verification (S5)

- **Benchmarks**: Compare recommended CAC/ROAS to industry/regional benchmarks
- **Anti-patterns**: Check strategy doesn't violate known anti-patterns
- **Guardrails**: Ensure regional context applied (GR4 in gem_config.json)

### During Rationale Generation (S6)

- Cite specific config as evidence for recommendations
- Example: "Based on egypt.yaml, COD is critical (70-80% of transactions)"

## Updating Files

When updating configs:

1. **Update `last_updated` field** at top of file
2. **Add source verification** if citing new data
3. **Preserve structure** (don't break YAML formatting)
4. **Update gem_config.json** if adding new trigger keywords
5. **Test lazy loading** by mentioning industry/region in conversation

## Future Expansion

Planned additions:

### Industry-Specific

- `b2b_services.yaml` (consulting, agencies, professional services)
- `b2c_services.yaml` (fitness, education, home services)
- `healthcare.yaml` (clinics, telemedicine, wellness)
- `fintech.yaml` (banking, payments, crypto)
- `education.yaml` (e-learning, schools, training)

### Regional

- `saudi.yaml` (Saudi-specific nuances beyond general GCC)
- `uae.yaml` (UAE-specific, especially Dubai vs other emirates)
- `kuwait.yaml` (if needed for differentiation)
- `qatar.yaml` (if needed for differentiation)

---

## Quick Reference

**Need Egypt e-commerce data?** → regional/egypt.yaml (COD, Ramadan, WhatsApp)  
**Need SaaS benchmarks?** → industry_specific/saas.yaml (CAC, trial conversion, LTV:CAC)  
**Need touchpoint sequencing?** → touchpoint_catalog.yaml (5 categories + rules)  
**Need GCC influencer insights?** → regional/gcc.yaml (Snapchat in Saudi, premium positioning)  

All configs are designed to work together with the entry point system (gem_config.json + gem_instructions.json) to deliver evidence-based, region-aware, industry-tailored marketing strategies.
