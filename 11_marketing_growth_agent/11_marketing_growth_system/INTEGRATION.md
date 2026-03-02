# Marketing & Growth System Integration Guide
## OpenOps Studio v2.0

Version: 1.0.0  
Purpose: Integration specifications for Marketing & Growth Agent with OpenOps orchestration

---

## Overview

This document specifies how the Marketing & Growth Agent System integrates with OpenOps Studio's orchestration, agent registry, and governance systems.

---

## 1. Agent Registry Integration

### Registration in Agent Roles Config

Add to `/02_agents/02A_Agent_Roles_Config.json`:

```json
{
  "MarketingGrowthAgent": {
    "description": "Elite marketing strategist and growth engineer with behavioral psychology expertise",
    "tier": "L2",
    "capabilities": [
      "marketing_strategy_development",
      "growth_loop_design",
      "campaign_planning",
      "creative_development",
      "kpi_framework_design",
      "behavioral_psychology_application"
    ],
    "access_level": "write",
    "restricted_actions": [
      "direct_ad_spend",
      "customer_data_export",
      "technical_implementation"
    ],
    "reporting_to": "SeniorPM",
    "security_clearance": "confidential",
    "config_path": "11_marketing_growth_system/11A_Marketing_Growth_Agent_Config.json",
    "system_prompt_path": "11_marketing_growth_system/11B_Marketing_Growth_System_Prompt.md"
  }
}
```

### Memory Registry Integration

Add namespace to `/02_agents/02B_Agent_Memory_Registry.json`:

```json
{
  "marketing_growth_agent": {
    "description": "Marketing campaigns, experiments, audience insights, performance data",
    "structure": {
      "campaigns": {
        "store": "historical_campaign_data",
        "includes": ["objectives", "tactics", "results", "learnings"]
      },
      "experiments": {
        "store": "a_b_tests_and_results",
        "includes": ["hypothesis", "variants", "results", "decisions"]
      },
      "audience_insights": {
        "store": "customer_research_and_personas",
        "includes": ["segments", "pain_points", "behaviors", "preferences"]
      },
      "creative_performance": {
        "store": "ad_and_content_results",
        "includes": ["formats", "messages", "angles", "performance_data"]
      },
      "channel_benchmarks": {
        "store": "channel_specific_baselines",
        "includes": ["platform", "metrics", "benchmarks", "trends"]
      }
    },
    "retention": "indefinite",
    "access": "read_write"
  }
}
```

---

## 2. Orchestration Integration

### Round Activation

The Marketing & Growth Agent participates in standard OpenOps rounds:

#### Research Round
- **Trigger**: Marketing strategy or campaign planning request
- **Activity**: External + internal grounding via 11C_Grounding_and_Research_Engine
- **Output**: Grounding summary with insights and recommendations

#### Blueprint Round
- **Trigger**: Post-grounding, strategic direction needed
- **Activity**: Strategy development via 11D_Strategy_Workflow_Engine (Steps 1-4)
- **Output**: Strategic brief with positioning, messaging, channels

#### Detail Round
- **Trigger**: Post-strategy approval
- **Activity**: Tactical execution planning (Steps 5-7)
- **Output**: Campaign plans, creative briefs, measurement frameworks

#### QA Round
- **Trigger**: Pre-handoff
- **Activity**: Quality gate checks from 11A config
- **Output**: Validated deliverables

### Custom Workflow Activation

For marketing-specific workflows, use:

```json
{
  "workflow": "marketing_campaign_planning",
  "agent": "MarketingGrowthAgent",
  "phases": [
    "grounding",
    "strategy",
    "tactics",
    "execution",
    "measurement"
  ],
  "config_path": "11_marketing_growth_system/workflows/campaign_planning.workflow.json"
}
```

---

## 3. Integration Config Update

Add to `/integration_config.json`:

```json
{
  "system_layers": {
    "marketing_growth": [
      "11_marketing_growth_system/11A_Marketing_Growth_Agent_Config.json",
      "11_marketing_growth_system/11B_Marketing_Growth_System_Prompt.md",
      "11_marketing_growth_system/11C_Grounding_and_Research_Engine.json",
      "11_marketing_growth_system/11D_Strategy_Workflow_Engine.json",
      "11_marketing_growth_system/11E_Execution_Modules.json",
      "11_marketing_growth_system/11F_Measurement_and_KPI_System.json",
      "11_marketing_growth_system/11G_Psychology_and_Behavior_Framework.json"
    ]
  },
  "cross_system_dependencies": {
    "MarketingGrowthAgent_to_CreativeContentSystem": {
      "purpose": "Content generation and copywriting",
      "path": "03_creative_content_system/",
      "data_flow": "Creative briefs → Generated content"
    },
    "MarketingGrowthAgent_to_ResearchEngine": {
      "purpose": "Market and competitive research",
      "path": "04_research/deep_research_engine.module.json",
      "data_flow": "Research queries → Insights and data"
    },
    "MarketingGrowthAgent_to_TrackingAnalytics": {
      "purpose": "Performance measurement",
      "path": "07_tracking/",
      "data_flow": "KPI definitions → Analytics implementation"
    }
  }
}
```

---

## 4. Activation Patterns

### Pattern 1: Explicit User Request

```
User: "I need a marketing strategy for our new B2B SaaS product launch"

Orchestrator:
1. Routes to MarketingGrowthAgent
2. Activates Research Round (grounding)
3. Activates Blueprint Round (strategy)
4. Activates Detail Round (tactics)
5. Activates QA Round (validation)
6. Handoff deliverables
```

### Pattern 2: Orchestrator Routing

```json
{
  "task": {
    "type": "marketing_strategy",
    "domain": "marketing",
    "context": { ... }
  },
  "routing": {
    "primary_agent": "MarketingGrowthAgent",
    "supporting_agents": ["ResearchBriefAgent", "CreativeContentAgent"],
    "workflow": "11_marketing_growth_system/workflows/campaign_planning.workflow.json"
  }
}
```

### Pattern 3: Performance Review Trigger

```json
{
  "trigger_type": "scheduled_review",
  "schedule": "weekly",
  "agent": "MarketingGrowthAgent",
  "activity": "analyze_campaign_performance",
  "inputs": ["analytics_data", "campaign_configs"],
  "outputs": ["performance_report", "optimization_recommendations"]
}
```

---

## 5. Escalation Paths

### To Senior PM
- Major budget reallocation decisions
- Brand positioning changes
- New channel launch approvals
- Strategic pivot decisions

### To Staff Engineer
- Technical implementation feasibility
- Analytics infrastructure requirements
- Integration with product features
- Performance/scalability concerns

### To Security Lead
- Customer data usage questions
- Compliance requirements (GDPR, CCPA)
- Ad platform data privacy
- Third-party tool security

---

## 6. Data Flow Architecture

```
User Request
    ↓
Orchestrator → MarketingGrowthAgent
    ↓
Grounding Engine (11C)
    ├─→ External Research (Google, Reforge, etc.)
    └─→ Internal Analysis (Project docs, analytics)
    ↓
Strategy Workflow (11D)
    ├─→ Psychology Framework (11G)
    ├─→ Measurement System (11F)
    └─→ Channel Playbooks (11H)
    ↓
Execution Modules (11E)
    ├─→ Creative Content System (03_creative_content_system/)
    ├─→ Campaign Templates (11_marketing_growth_system/templates/)
    └─→ Growth Loops Library (11J)
    ↓
Output Validation
    ├─→ Quality Gates (11A config)
    └─→ QA Orchestrator
    ↓
Memory Storage (02B registry)
    ↓
Handoff to User
```

---

## 7. API Endpoints (Future)

For programmatic access:

```
POST /api/agents/marketing-growth/strategy
POST /api/agents/marketing-growth/campaign-plan
POST /api/agents/marketing-growth/experiments
POST /api/agents/marketing-growth/performance-analysis
GET  /api/agents/marketing-growth/memory/{namespace}
```

---

## 8. Testing Integration

### Unit Tests
- Test grounding engine with mock data
- Test workflow progression logic
- Test quality gate validations

### Integration Tests
- Test orchestration round activation
- Test memory read/write operations
- Test cross-system dependencies

### End-to-End Tests
```
Test: Complete campaign planning workflow
Given: User requests "Plan a product launch campaign"
When: MarketingGrowthAgent is activated
Then: 
  - Grounding summary is generated
  - Strategic brief is created
  - Campaign plan is detailed
  - Measurement framework is defined
  - All outputs pass quality gates
```

---

## 9. Monitoring & Logging

Add to `/02_agents/02C_Agent_Logging_and_Audit.json`:

```json
{
  "MarketingGrowthAgent": {
    "log_events": [
      "activation_triggered",
      "grounding_completed",
      "strategy_generated",
      "campaign_planned",
      "quality_gate_passed",
      "quality_gate_failed",
      "escalation_triggered",
      "memory_write",
      "memory_read"
    ],
    "metrics": [
      "time_to_strategy",
      "quality_gate_pass_rate",
      "strategy_approval_rate",
      "campaign_success_rate"
    ],
    "audit_level": "high"
  }
}
```

---

## 10. Deployment Checklist

- [ ] Agent registered in 02A_Agent_Roles_Config.json
- [ ] Memory namespace added to 02B_Agent_Memory_Registry.json
- [ ] Logging configured in 02C_Agent_Logging_and_Audit.json
- [ ] Integration config updated in integration_config.json
- [ ] Orchestration routing rules updated
- [ ] Cross-system dependencies verified
- [ ] Quality gates tested
- [ ] Escalation paths confirmed
- [ ] Documentation complete
- [ ] Team training completed

---

## 11. Usage Examples

### Example 1: Request Strategy
```
User: "Help me plan a growth strategy for our mobile app"

Agent activates:
1. Grounding (analyze app, market, competitors)
2. Strategy (positioning, channels, growth loops)
3. Tactics (ASO, paid user acquisition, referral program)
4. Measurement (retention cohorts, viral coefficient, CAC)
```

### Example 2: Optimize Campaign
```
User: "Our Facebook ads aren't performing. What should we do?"

Agent activates:
1. Analyze current performance data
2. Diagnose issues (targeting, creative, offer, funnel)
3. Generate experiment hypotheses
4. Provide optimization recommendations
```

### Example 3: Design Growth Loop
```
User: "Design a referral program for our SaaS product"

Agent activates:
1. Research successful referral mechanics
2. Analyze user psychology and incentives
3. Design referral loop mechanics
4. Define success metrics and tracking
```

---

**Integration Owner**: Marketing Growth Agent System  
**Maintained by**: Mamdouh Aboammar  
**Last Updated**: 2025-12-19
