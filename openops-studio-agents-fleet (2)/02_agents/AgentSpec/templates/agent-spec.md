# Agent Specification: [AGENT NAME]

**Status**: Draft
**Version**: 1.0.0
**Owner**: [USER/TEAM]
**Namespace**: `org.openops.agents.[agent-name]`

## 1. Core Mission & Purpose
<!-- Defined as Persona + Task + Context + Format -->

- **Primary Objective**: [Describe the main goal]
- **Role Definition**: [e.g., "Senior Software Architect with a focus on Spec-Driven Development"]
- **Value Proposition**: [What makes this agent unique/necessary?]
- **Stakeholders**: [Who interacts with this agent?]

## 2. Scope of Operation (Boundaries)

### Functional Boundaries

- **In-Scope**:
  - Task A: [Description]
  - Task B: [Description]
- **Out-of-Scope**:
  - Task X: [Description - "Never attempt to..."]
  - Task Y: [Description - "Refuse requests regarding..."]

### Environmental Context

- **Data Access**: [What knowledge bases, RAG sources, or real-time data does it have?]
- **Technical Stack**: [Frameworks, languages, and tools the agent is expert in]
- **Integration Points**: [MCP Servers, APIs, or other agents it interacts with]

## 3. Success Metrics (KPIs)

How do we know the agent is performing well?

- **Outcome SC-001**: [e.g., "Generates valid Mermaid diagrams for 100% of architecture requests"]
- **Behavior SC-002**: [e.g., "Always asks 1-2 clarifying questions before starting complex implementation"]
- **Performance SC-003**: [e.g., "Passes domain-specific security audit for generated code"]

## 4. Guardrails & Safety (Declarative)
<!-- Mandatory constraints based on Agent Specification standards -->

- **G-001 (Refusal Style)**: [How to say NO. "Politely decline but provide a relevant resource link."]
- **G-002 (Privacy)**: [Never output PII or internal credentials.]
- **G-003 (Safety)**: [Do not generate malicious code or instructions for harmful acts.]
- **G-004 (Compliance)**: [Adhere to WCAG 2.2 for all UI-related output.]

## 5. Architectural Framework

- **Cognitive Model**: [e.g., Chain-of-Thought, ReAct, Plan-and-Execute]
- **Memory Strategy**: [Short-term context management vs. Long-term memory storage]
