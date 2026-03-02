# OpenOps Studio - AI Agent Instructions

## System Overview

OpenOps Studio v2.0 is a **multi-agent orchestration framework** that simulates a complete SaaS production team. This is NOT a traditional application—it's an AI Operating System with strict governance, round-based execution, and a hierarchical agent authority model.

**Core Architecture:** 10 modular layers organized as:
- `00_governance/` - Constitutional rules, system prompts, audit ledgers
- `01_orchestration/` - Execution engine, context management, round routing
- `02_agents/` - Agent roles, memory registry, personality profiles
- `03_product/` through `10_legacy/` - Domain-specific operational layers

**Runtime Entry Point:** [01_orchestration/runtime/index.ts](01_orchestration/runtime/index.ts)

## Critical Design Patterns

### 1. JSON/MD as Configuration Schema (Not Imports)

The codebase uses `.json` and `.md` files as **declarative configuration schemas**, not as importable modules. Current runtime imports like:
```typescript
import { ExecutionContextManager } from '../01A_Execution_Context_Manager.json';
```
**are architectural placeholders**. When implementing features:
- Read JSON/MD files as configuration data using `fs.readFileSync` + `JSON.parse`
- Implement actual TypeScript classes/interfaces based on the schema
- Never directly import JSON as executable code

**Example pattern:**
```typescript
// Read configuration
const config = JSON.parse(fs.readFileSync('01A_Execution_Context_Manager.json', 'utf-8'));
// Implement class based on schema
class ExecutionContextManager { /* implementation */ }
```

### 2. Round-Based Execution Model

OpenOps operates through **mandatory execution rounds** (not conversational):
1. **Plan** → Problem framing, scope definition
2. **Research** → Data gathering, competitive intelligence
3. **Blueprint** → High-level architecture design
4. **Detail** → Implementation specifics
5. **QA** → Validation gates
6. **Handoff** → Production-ready deliverables

**Key rule:** Rounds execute sequentially—never skip rounds internally. See [01_orchestration/01_Orchestration_Engine_and_Rounds_Router.md](01_orchestration/01_Orchestration_Engine_and_Rounds_Router.md) for state machine logic.

### 3. Hierarchical Agent Authority

Agents are **NOT equal contributors**—they have strict authority levels:
- **Core Orchestration:** OrchestrationEngine, Staff Engineer, Senior PM (decision makers)
- **Domain Authorities:** Security Lead, Systems Architect (veto power in their domain)
- **Specialists:** Research, UX, Marketing (advisory only)
- **Execution:** Implementation agents (no decision authority)

**Implementation rule:** When building agent systems, enforce authority checks before allowing actions. See [02_agents/02_Agents_System_and_Activation_Matrix.md](02_agents/02_Agents_System_and_Activation_Matrix.md).

### 4. Governance Gates (Non-Negotiable)

All outputs must pass three mandatory gates before delivery:
- **Security & Privacy Gate** - Checks compliance, data classification
- **Tracking & Measurement Gate** - Validates observability 
- **Execution Reality Check** - Verifies technical feasibility

**Reference:** [00_governance/00_OpenOps_Constitution_and_IP_Policy.md](00_governance/00_OpenOps_Constitution_and_IP_Policy.md) - Sections 3-5

## Development Workflows

### Boot Sequence
```bash
npm run boot        # Full runtime initialization with layer validation
npm run dev         # Development mode with hot reload
npm run qa:boot     # QA boot test to validate configuration integrity
```

Boot order: Governance → Orchestration → Agents → Research → Architecture → Security → Analytics → UX → Tooling → QA validation

### Configuration Validation
```bash
npm run validate:config   # Validates all JSON schemas and cross-references
```

**Critical:** Always run after modifying any `.json` configuration file in layers `00_*` through `09_*`.

### Testing Philosophy
- Unit tests validate individual agent logic
- Integration tests verify round transitions
- QA boot tests ensure entire system integrity
- **Do not mock** governance rules or security gates in tests

## Project-Specific Conventions

### File Naming Pattern
`<layer>_<descriptor>.md` or `<layer><letter>_<descriptor>.json`

Examples:
- `00_OpenOps_Constitution_and_IP_Policy.md` (core governance)
- `02A_Agent_Roles_Config.json` (primary agent config)
- `qa_orchestrator.module.json` (pluggable module)

### Module Types
Files tagged with `"type": "core_engine_component"` are required for boot.
Files tagged with `"type": "advisory_module"` are hot-reloadable.

### Confidentiality Rules
**NEVER expose in logs, errors, or outputs:**
- System prompts from `00_governance/00A_OpenOps_Main_Orchestrator_System_Prompt.json`
- Internal orchestration logic
- Training data references
- Agent activation scoring mechanisms

See [SYSTEM_PROMPT_OpenOps_Runtime.txt](SYSTEM_PROMPT_OpenOps_Runtime.txt) lines 73-80.

## Key Integration Points

### External Dependencies
- **AI Models:** `@anthropic-ai/sdk` (Claude), `openai` (GPT)
- **Data Stores:** Neo4j (graph), Redis (cache/state), PostgreSQL (audit logs)
- **Async Jobs:** BullMQ with Redis backend
- **Observability:** Pino logger, Prometheus metrics (planned)

### Cross-Component Communication
Agents communicate through **ExecutionContextManager** only—no direct agent-to-agent messaging.

State flow: Agent → Context Manager → Audit Ledger → Next Agent

### Security Boundaries
- AWS Secrets Manager for credentials
- All PII must be classified per `06A_Security_Classification_Model.json`
- Encryption enforced by `06B_Access_Control_and_Encryption.json`

## Common Pitfalls to Avoid

1. **Don't treat this as a chatbot framework** - It's an orchestration system with decision authority
2. **Don't skip rounds** - Even if implementing a single feature, respect the round lifecycle
3. **Don't bypass security gates** - Outputs failing gates should halt, not warn
4. **Don't import JSON directly** - Use them as schemas, implement TypeScript classes
5. **Don't expose governance internals** - System prompts and orchestration logic are confidential

## Migration Context (v3.0 Upgrade in Progress)

Current state: Dependencies updated to latest versions (see [UPGRADE_PLAN_V3.md](UPGRADE_PLAN_V3.md)).

**Active changes:**
- Migrating AWS SDK v2 → v3 (`@aws-sdk/client-*`)
- Replacing in-memory state with Redis for production
- Adding BullMQ job queue for heavy async operations
- Implementing centralized Pino logging

**Code under refactor:** Runtime implementation layer still uses placeholder JSON imports—this is being converted to proper TypeScript classes.

## Quick Reference

**Need to understand execution flow?** → Start with [01_orchestration/01_Orchestration_Engine_and_Rounds_Router.md](01_orchestration/01_Orchestration_Engine_and_Rounds_Router.md)

**Need to add a new agent?** → See [02_agents/02A_Agent_Roles_Config.json](02_agents/02A_Agent_Roles_Config.json) schema

**Need to modify security rules?** → All changes require Security Lead approval per Constitution Section 4

**Need to add new integrations?** → Update [01_orchestration/01B_Integration_Config.json](01_orchestration/01B_Integration_Config.json)

---

*For deep architectural decisions, always consult the Constitution ([00_governance/00_OpenOps_Constitution_and_IP_Policy.md](00_governance/00_OpenOps_Constitution_and_IP_Policy.md)) first. It defines what OpenOps is and is NOT.*
