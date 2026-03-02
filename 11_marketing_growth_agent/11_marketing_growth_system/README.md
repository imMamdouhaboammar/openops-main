# Marketing & Growth Agent System
## OpenOps Studio v2.0

Version: 1.1.0  
Status: Active  
Scope: Complete marketing strategy, execution, and growth orchestration system

---

## Overview

The Marketing & Growth Agent System is a specialized domain authority agent within OpenOps Studio that combines strategic marketing thinking, behavioral psychology, data-driven growth tactics, and creative execution.

This system operates as a unified intelligence across:
- Strategic Marketing Planning
- Digital Marketing Execution
- Growth Hacking & Loops
- Creative Content & Copywriting
- Performance Marketing & Analytics
- Behavioral Psychology & Persuasion
- KPI Tracking & Optimization

---

## System Architecture

```
11_marketing_growth_system/
├── README.md (this file)
├── 11A_Marketing_Growth_Agent_Config.json
├── 11B_Marketing_Growth_System_Prompt.md
├── 11C_Grounding_and_Research_Engine.json
├── 11D_Strategy_Workflow_Engine.json
├── 11F_Measurement_and_KPI_System.json
├── 11G_Psychology_and_Behavior_Framework.json
├── 11H_Grounding_Protocols_and_Truth_Anchors.json
├── workflows/
├── templates/
└── examples/
```

## Advanced Upgrade (Control Plane + Evaluation)

This agent supports a “supervisor orchestrator” pattern:
- Single Supervisor Orchestrator owns strategy direction and unlocks execution pods.
- Specialized pods execute bounded tasks and return artifacts.

See:
- `11_marketing_growth_agent/12_control_plane/README.md`
- `11_marketing_growth_agent/12_evaluation/README.md`

---


## Core Capabilities

### 1. Strategic Grounding
- External research via web search (best practices, frameworks, benchmarks)
- Internal project analysis (positioning, audience, current performance)
- Competitive intelligence gathering
- Market trend analysis

### 2. Marketing Strategy
- ICP definition and segmentation
- Value proposition development
- Messaging hierarchy creation
- Channel strategy and mix optimization
- Budget allocation frameworks

### 3. Growth Engineering
- Growth loop design (viral, content, paid)
- Funnel optimization (AARRR framework)
- Experimentation frameworks
- Retention and engagement strategies
- Referral program design

### 4. Channel Execution
- SEO (technical, content, topical authority)
- Paid Media (Google, Meta, TikTok, LinkedIn)
- Social Media (organic + platform-specific strategies)
- Email Marketing (lifecycle, automation)
- Content Marketing (pillars, distribution)
- Community Building
- Partnership & Affiliate Marketing

### 5. Creative & Content
- Copywriting (ads, landing pages, emails, social)
- Messaging frameworks (hooks, angles, emotional triggers)
- Content systems (calendars, pillar pages, series)
- Creative brief development
- Brand voice and tone guidelines

### 6. Behavioral Psychology
- Persuasion principles (Cialdini's 6 principles)
- Jobs To Be Done (JTBD) framework
- Emotional triggers and motivations
- Cognitive biases application
- Social proof strategies
- Scarcity and urgency (ethical)

### 7. Analytics & Measurement
- KPI framework development
- Analytics implementation (GA4, Mixpanel, etc.)
- Attribution modeling
- Incrementality testing
- MMM-aligned budget optimization
- Dashboard design
- Experimentation and A/B testing
- CRO (Conversion Rate Optimization)

---

## Integration with OpenOps

### Agent Layer
- **Type**: Domain Authority Agent (Layer 2)
- **Authority Level**: High (can propose strategies, require approval for execution)
- **Escalation Path**: Senior PM → Staff Engineer (for resource/technical constraints)
- **Activation**: On-demand or round-based via Orchestration Engine

### Orchestration Integration
- Follows standard OpenOps rounds (Plan → Research → Blueprint → Detail → QA → Handoff)
- Custom marketing workflow phases:
  1. **Grounding Phase**: External + internal research
  2. **Strategy Phase**: Core positioning, audience, channels
  3. **Tactical Phase**: Campaign design, content planning
  4. **Execution Phase**: Asset creation, implementation plans
  5. **Measurement Phase**: KPIs, tracking, experimentation

### Data Flow
- **Input**: Marketing briefs, performance data, audience insights
- **Output**: Strategies, campaign plans, creative assets, measurement frameworks
- **Memory**: Stores campaign results, experiments, audience insights in Agent Memory Registry

---

## Activation Rules

The Marketing & Growth Agent is activated when:
1. User explicitly requests marketing/growth strategy
2. Orchestrator routes a marketing-related task
3. A growth experiment needs design
4. Campaign planning or optimization is required
5. Creative content strategy is needed
6. Performance analysis or KPI review is triggered

The agent remains silent when:
- Technical implementation details are being discussed (Staff Engineer domain)
- Product vision is being defined (Senior PM domain)
- Security/compliance issues arise (Security Lead domain)

---

## Behavioral Rules

### Always
✓ Ground in external best practices before answering
✓ Analyze internal project context
✓ Think strategically before tactical
✓ Provide measurable outcomes and KPIs
✓ Consider psychological drivers
✓ Show trade-offs and risks
✓ Structure answers clearly with examples
✓ Tie everything to business outcomes (revenue, retention, acquisition)

### Never
✗ Guess without research
✗ Focus on vanity metrics
✗ Ignore budget/resource constraints
✗ Provide generic advice without context
✗ Skip measurement frameworks
✗ Recommend tactics without strategy
✗ Ignore user psychology and behavior

---

## Dependencies

### Internal Systems
- `01_orchestration/` - For round management
- `02_agents/` - For agent registry and memory
- `03_creative_content_system/` - For content generation
- `04_research/` - For market research integration
- `07_tracking/` - For analytics implementation

### External Tools (Optional)
- Google Search API (for grounding)
- Analytics platforms APIs
- Social media APIs
- SEO tools APIs
- Ad platform APIs

---

## Quick Start

### For Users
```
Ask: "I need to plan a product launch campaign for [product]"
Agent will:
1. Ground in best practices
2. Analyze your product/audience
3. Design full strategy
4. Provide execution plan
5. Set up measurement framework
```

### For Developers
```json
{
  "agent": "MarketingGrowthAgent",
  "task": "campaign_strategy",
  "context": {
    "product": "...",
    "audience": "...",
    "goals": "...",
    "constraints": "..."
  }
}
```

---

## Versioning and Updates

This system follows OpenOps governance:
- All changes approved by Senior PM
- Technical reviews by Staff Engineer
- Security reviews by Security Lead
- Version history in Audit Ledger

---

## Support and Contribution

See: `CONTRIBUTING.md` at project root

---

**Created by**: OpenOps Studio  
**Maintained by**: Mamdouh Aboammar  
**Last Updated**: 2025-12-19
