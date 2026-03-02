# OpenOps Studio - Complete Repository Knowledge Base

**Version:** 2.0.0  
**Created:** January 20, 2026  
**Repository Owner:** Mamdouh Aboammar  
**License:** MIT

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Repository Overview](#repository-overview)
3. [Core Architecture](#core-architecture)
4. [Directory Structure & Components](#directory-structure--components)
5. [Technical Stack](#technical-stack)
6. [Key Features](#key-features)
7. [Subsystems & Modules](#subsystems--modules)
8. [Development Setup](#development-setup)
9. [Deployment & Infrastructure](#deployment--infrastructure)
10. [Security & Compliance](#security--compliance)
11. [Contributing Guidelines](#contributing-guidelines)
12. [Related Projects](#related-projects)

---

## Executive Summary

**OpenOps Studio v2.0** is a comprehensive **multi-agent orchestration framework** designed to function as a complete AI-powered SaaS production team. It provides structured, governance-driven coordination of multiple AI agents to handle product planning, technical architecture, research, security, tracking, UX design, and tooling—across a 10-layered operational model.

### Primary Purpose

- **Autonomous Operations**: Execute complex product and technical workflows with minimal human intervention
- **Constitutional Governance**: Enforce consistent behavior via a constitutional framework and policy registry
- **Round-Based Execution**: Structured workflow through Plan → Blueprint → Detail → QA → Handoff cycles
- **Multi-Agent Coordination**: Coordinate specialized agents with distinct roles, memory, and personalities
- **Security-First Design**: Embedded compliance gates, threat detection, and privacy controls
- **Real-Time Analytics**: Integrated tracking, experimentation, and KPI monitoring

### Target Users

- AI/ML engineering teams building SaaS products
- Product managers automating workflow orchestration
- Startups seeking rapid, AI-driven product development
- Enterprises requiring autonomous operational systems with governance

---

## Repository Overview

### High-Level Identity

| Property | Value |
|----------|-------|
| **Official Name** | OpenOps Studio |
| **Package Name** | `@openops/studio` |
| **Version** | 2.0.0 |
| **Repository Type** | Monorepo (Node.js/TypeScript Primary) |
| **Main Entry Point** | `/src/index.ts` (TypeScript Runtime) |
| **Language** | TypeScript (primary), JSON, Markdown |
| **Node Version** | ≥ 18.0.0 |
| **Package Manager** | npm 9+ / pnpm |
| **Architecture Pattern** | Multi-Agent Orchestration |
| **Deployment Model** | Docker, Cloud-native (GCP, AWS support) |
| **Database Stack** | PostgreSQL, Redis, Neo4j (Graph DB) |

### Directory Layout (Top Level)

```
/OpenOps/
├── 00_governance/              # Constitutional & policy framework (Layer 0)
├── 01_orchestration/           # Execution engine & round routing (Layer 1)
├── 02_agents/                  # Agent roles, memory, personalities (Layer 2)
├── 03_product/                 # Product management & PRD framework (Layer 3)
├── 04_research/                # Competitive intelligence & data (Layer 4)
├── 05_architecture/            # Data systems & infrastructure (Layer 5)
├── 06_security/                # Security, compliance, privacy gates (Layer 6)
├── 07_tracking/                # Analytics, metrics, experimentation (Layer 7)
├── 08_ux/                      # Design system & copy library (Layer 8)
├── 09_tooling/                 # Prompts, tools, runtime pipelines (Layer 9)
├── 10_legacy/                  # Deprecated modules & migration (Archive)
├── adk-js/                     # Google Agents Development Kit (ADK) integration
├── backend/                    # Express.js + Prisma backend (Marketplace API)
├── frontend/                   # Next.js React frontend application
├── AutoGPT/                    # AutoGPT integration (research/reference)
├── src/                        # Core TypeScript runtime source
├── scripts/                    # Build & deployment automation
├── docs/                       # Generated documentation & guides
├── tests/                      # Test suites
├── .github/                    # GitHub workflows, copilot configs
├── docker-compose.yml          # Docker Compose orchestration
├── Dockerfile                  # Multi-stage production build
├── package.json                # Root monorepo configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Primary documentation
```

---

## Core Architecture

### 10-Layer Operational Model

OpenOps executes operations through **10 distinct layers**, each with defined responsibilities:

```
┌──────────────────────────────────────────────────────────────┐
│                    EXECUTION ORCHESTRATOR                    │
│                                                              │
│  [Governor] ← Constitutional Authority & Policy Registry   │
└────────┬─────────────────────────────────────────────────────┘
         │
    ┌────┴────────┬──────────────┬─────────────┬───────────┐
    │             │              │             │           │
┌───▼──┐    ┌────▼───┐    ┌─────▼────┐  ┌───▼─────┐  ┌──▼───┐
│Layer │    │Layer 1 │    │ Layer 2   │  │ Layer 3 │  │Layer4 │
│  0   │    │ORCH.   │    │ AGENTS    │  │PRODUCT  │  │RESEARCH
│GOVERN└────┤        │    │           │  │         │  │       │
└─────┘     └────┬───┘    └─────┬────┘  └───┬─────┘  └──┬────┘
                 │              │            │           │
            ┌────▼────┐    ┌────▼────┐ ┌────▼────┐ ┌────▼────┐
            │Layer 5  │    │ Layer 6 │ │ Layer 7 │ │ Layer 8 │
            │ARCH.    │    │SECURITY │ │TRACKING │ │   UX    │
            │         │    │         │ │         │ │         │
            └─────────┘    └────┬────┘ └─────────┘ └────┬────┘
                                │                      │
                           ┌────▼────────────────┬─────▼────┐
                           │ Layer 9: TOOLING    │Layer 10   │
                           │ (Prompts, tools)    │ LEGACY    │
                           └─────────────────────┴────┬─────┘
                                                      │
                           ┌──────────────────────────┘
                           ▼
                    [OUTPUT: Handoff artifacts]
```

#### Layer Descriptions

| Layer | Name | Purpose |
|-------|------|---------|
| **00** | **Governance** | Constitutional framework, IP policy, audit ledgers, risk playbooks |
| **01** | **Orchestration** | Execution engine, round router, context manager, failure recovery |
| **02** | **Agents** | Agent roles, memory registry, personality profiles, authorization |
| **03** | **Product** | PRD framework, product tracker, feedback pipeline, release management |
| **04** | **Research** | Competitive intelligence, research templates, evidence scoring |
| **05** | **Architecture** | Data systems, graph DB config, embedding/vector store, caching |
| **06** | **Security** | Compliance gates, access control, encryption, threat detection |
| **07** | **Tracking** | Analytics events, KPI dashboard, experimentation, reporting |
| **08** | **UX** | Design system, copy library, design blueprints, accessibility |
| **09** | **Tooling** | Prompt registry, tool/API mapping, agent-prompt mapping |
| **10** | **Legacy** | Deprecated modules, migration policies, compatibility adapters |

### Boot Sequence (10-Step Initialization)

The system follows a strict boot sequence before operations begin:

```
1️⃣  Governance Core
    └─ Load constitution, policy registry, audit ledger
    
2️⃣  Orchestration Engine
    └─ Initialize context manager, integration config, failure recovery
    
3️⃣  Agent Registration
    └─ Load agent roles, memory maps, logging, personalities
    
4️⃣  Research Layer
    └─ Mount research templates, data scoring, external sources
    
5️⃣  Architecture & Storage
    └─ Activate graph DB, data pipelines, embeddings, cache
    
6️⃣  Security Gates
    └─ Enable security classification, access control, threat detection
    
7️⃣  Analytics Tracker
    └─ Initialize event schema, KPIs, experimentation system
    
8️⃣  UX & Tooling
    └─ Activate design tokens, prompt mappings, tool registries
    
9️⃣  QA Boot Pass
    └─ Run simulated round (Plan → Handoff)
    
🔟 Checkpoint Logging
    └─ Finalize audit ledger and system health status
```

### Execution Rounds Model

Operations execute through **5 mandatory sequential rounds**:

| Round | Goal | Key Outputs |
|-------|------|-------------|
| **Plan** | Lock objectives, constraints, risk appetite | Goal statement, assumptions, constraints, platform lock, risk profile |
| **Blueprint** | Produce PRD, architecture sketch, tracking outline | PRD skeleton, core flows, data entities, architecture options, tracking events |
| **Detail** | Generate implementation-ready artifacts | Engineered prompts, acceptance criteria, UX copy, tracking params, security notes |
| **QA** | Validate deliverables, remove contradictions | Contradiction matrix, coverage report, gate results, recommendation |
| **Handoff** | Package for production & team handoff | Final PRD, deployment guide, compliance sign-off, team runbook |

---

## Directory Structure & Components

### 00_governance/ — Constitutional Framework

**Purpose**: Defines the constitutional rules, policies, and governance model.

```
00_governance/
├── 00_OpenOps_Constitution_and_IP_Policy.md      # Core rules & IP protection
├── 00A_OpenOps_Main_Orchestrator_System_Prompt.json  # Master system prompt
├── 00B_OpenOps_Audit_and_Decision_Ledger.json    # Audit trail & decisions
├── 00C_OpenOps_Risk_and_Failure_Playbook.md      # Risk mitigation strategies
├── 00D_Gemini_Gems_Operating_Profile.md          # Platform-specific config
├── 00E_System_File_Index.json                    # File reference index
├── 00F_Anti_Hallucination_Sentinel.md            # Anti-hallucination rules
├── 00G_Gem_Entry_Point_Index.json                # Entry point mapping
└── 00M_Rolling_Summary_Protocol.md               # Summary & state tracking
```

**Key Concepts:**
- **Non-Disclosure Policy**: Protects internal system prompts and proprietary logic
- **Knowledge Base Binding**: Maps user requests to governance files
- **Operating Model**: Single unified consciousness with simulated internal roles
- **Anti-Hallucination Rules**: Blocks assumptions, requires evidence tagging

---

### 01_orchestration/ — Execution Engine

**Purpose**: Manages execution rounds, context, and failure recovery.

```
01_orchestration/
├── 01_Orchestration_Engine_and_Rounds_Router.md  # Core routing logic
├── 01A_Execution_Context_Manager.json            # Context state management
├── 01B_Integration_Config.json                   # External service configs
├── 01C_Failure_Recovery_Manager.json             # Failure handling strategies
├── 01D_Gemini_Gems_Router.json                   # Platform routing
├── 01E_Cognitive_Runtime_Rules.md                # Execution rules
├── 01F_Output_Contracts.json                     # Output schema definitions
├── 01H_Strict_Round_Completion_Gates.json        # Round completion criteria
├── 01I_Intent_Classification_Matrix.json         # Intent routing logic
├── qa_orchestrator.module.json                   # QA round orchestrator
├── deep_research_engine.module.json              # Research execution engine
├── agent_parallelism_patterns.module.json        # Parallel execution patterns
└── runtime/
    └── index.ts                                  # Main runtime entry point
```

**Key Concepts:**
- **Round Router**: Ensures mandatory sequence (Plan → Handoff)
- **Context Manager**: Maintains execution context across rounds
- **Intent Classification**: Routes user intents to appropriate handlers
- **Output Contracts**: Validates all outputs against schemas

---

### 02_agents/ — Agent Ecosystem

**Purpose**: Defines agent roles, memory, personalities, and communication protocols.

```
02_agents/
├── 02_Agents_System_and_Activation_Matrix.md     # Agent system overview
├── 02A_Agent_Roles_Config.json                   # Role definitions
├── 02B_Agent_Memory_Registry.json                # Memory management
├── 02C_Agent_Logging_and_Audit.json              # Audit & logging
├── 02D_Agent_Personality_Profile.json            # Personality traits
├── 02E_Agent_Authorization_Matrix.json           # Access control
├── 02F_Agent_Communication_Protocol.json         # Communication rules
├── 02G_Agent_Performance_Monitoring.json         # Performance metrics
├── 02H_Agent_Learning_Development.json           # Learning & adaptation
├── 02I_Dynamic_Orchestration_System.json         # Dynamic agent routing
├── 02J_Specialized_Agents_Catalog.json           # Specialized agents list
├── 02V_Agent_Voice_DNA.json                      # Tone & voice guidelines
├── AgentSpec/                                    # Agent specifications
├── ConversionCopywriterAgent_*                   # Specific agent configs
├── Smart Agents/                                 # Advanced agent configs
└── SpecKit/                                      # Agent specification kit
```

**Core Agents:**
- **Orchestrator**: Routes work, enforces rules
- **Product Manager**: PRD generation, roadmap management
- **Architect**: Technical design, data system planning
- **Research Lead**: Competitive intelligence gathering
- **Security Officer**: Compliance, threat analysis
- **Designer**: UX/copy generation
- **QA Lead**: Validation, gate checking

---

### 03_product/ — Product Management Framework

**Purpose**: Product planning, PRD generation, tracking, and release management.

```
03_product/
├── 03_Product_and_PRD_Master_Framework.md        # PRD framework
├── 03A_PRD_Template_Generator.json               # PRD template engine
├── 03B_ProductTracker_and_Roadmap.json           # Product tracking
├── 03C_Feedback_and_Iteration_Pipeline.json      # Feedback loop
├── 03D_Release_Management_Tracker.json           # Release tracking
└── specs/                                        # Product specifications
```

---

### 04_research/ — Research & Intelligence

**Purpose**: Competitive intelligence, data gathering, evidence scoring.

```
04_research/
├── 04_Research_and_Competitive_Intelligence.md   # Research framework
├── 04A_Research_Templates_and_Taxonomy.json      # Research templates
├── 04B_Data_Evidence_Scoring_Model.json          # Evidence scoring
├── 04C_External_Sources_Index.json               # Source index
├── 04D_Source_Access_Proxy.json                  # Source proxying
└── 04E_Intelligence_Signal_Aggregator.json       # Signal aggregation
```

---

### 05_architecture/ — Data Systems & Infrastructure

**Purpose**: Graph databases, data pipelines, embeddings, caching strategies.

```
05_architecture/
├── 05_Architecture_and_Data_Systems_Playbook.md  # Architecture playbook
├── 05A_Graph_Database_Config.json                # Neo4j configuration
├── 05B_Data_Pipeline_Manager.json                # ETL/ELT pipelines
├── 05C_Embedding_and_VectorStore_Config.json     # Vector DB config
└── 05D_Cache_and_Indexing_Strategy.json          # Caching strategies
```

---

### 06_security/ — Security & Compliance

**Purpose**: Security gates, access control, encryption, privacy, threat detection.

```
06_security/
├── 06_Security_Compliance_and_Privacy_Gates.md   # Security framework
├── 06A_Security_Classification_Model.json        # Classification scheme
├── 06B_Access_Control_and_Encryption.json        # RBAC & encryption
├── 06C_Threat_and_Incident_Response.json         # Threat handling
└── 06D_Privacy_Anonymization_Policies.json       # Privacy policies
```

---

### 07_tracking/ — Analytics & Experimentation

**Purpose**: Event tracking, KPI dashboards, experimentation, reporting.

```
07_tracking/
├── 07_Tracking_Analytics_and_Experimentation.md  # Tracking framework
├── 07A_Analytics_Event_Schema.json               # Event schema
├── 07B_KPI_and_Metrics_Dashboard.json            # KPI definitions
├── 07C_Experimentation_Manager.json              # A/B testing config
└── 07D_Reporting_and_Insights.json               # Reporting system
```

---

### 08_ux/ — Design System & Copy Library

**Purpose**: Design tokens, copy library, design blueprints, accessibility.

```
08_ux/
├── 08_UX_Design_System_and_Copy_Library.md       # UX framework
├── 08A_UX_Tokens_and_Style_Config.json           # Design tokens
├── 08B_Copy_Library_and_Tone.json                # Copy library
├── 08C_Design_Blueprints_and_Flows.json          # Design flows
└── 08D_Accessibility_and_Localization.json       # A11y & i18n
```

---

### 09_tooling/ — Prompts & Tool Registry

**Purpose**: Prompt templates, tool mappings, agent-prompt associations, runtime pipelines.

```
09_tooling/
├── 09_PromptKit_and_Tooling_Handoff.md           # Tooling guide
├── 09A_Prompt_Template_Registry.json             # Prompt templates
├── 09B_Tool_and_API_Mapping.json                 # Tool registry
├── 09C_Agent_Prompt_Mapping.json                 # Agent-prompt mapping
└── 09D_Runtime_Prompt_Pipeline.json              # Runtime pipeline
```

---

### 10_legacy/ — Legacy & Deprecated

**Purpose**: Archives deprecated modules, migration policies, compatibility.

```
10_legacy/
├── 10_Legacy_Old_Scope.md                        # Legacy documentation
├── 10A_Deprecated_Modules_Index.json             # Deprecated modules
├── 10B_Migration_and_Interop_Policy.json         # Migration guide
└── 10C_Compatibility_Adapters.json               # Compatibility layer
```

---

### adk-js/ — Google ADK Integration

**Purpose**: Integration with Google's Agents Development Kit for building agents.

```
adk-js/
├── package.json                                  # ADK configuration
├── core/                                         # Core ADK libraries
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── tsconfig.json
├── dev/                                          # Development utilities
│   ├── package.json
│   └── scripts/
├── agents/                                       # Agent implementations
└── test/                                         # Test suites
```

**Key Dependencies:**
- `@opentelemetry/*`: Tracing & observability
- `typescript`, `esbuild`, `vitest`: Build & test tools

---

### backend/ — Express.js + Prisma API Server

**Purpose**: RESTful backend for marketplace, authentication, payments, product management.

```
backend/
├── package.json                                  # Backend dependencies
├── src/
│   ├── index.ts                                  # Express entry point
│   ├── routes/                                   # API routes
│   ├── middleware/                               # Express middleware
│   ├── services/                                 # Business logic
│   └── types/                                    # TypeScript types
├── prisma/
│   ├── schema.prisma                             # Database schema
│   └── migrations/                               # Database migrations
├── tests/                                        # Test suites
└── tsconfig.json
```

**Stack:**
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: Passport.js (JWT, OAuth)
- **Payments**: Stripe
- **Logger**: Winston

---

### frontend/ — Next.js React Application

**Purpose**: User interface for the marketplace, agent builder, and platform.

```
frontend/
├── package.json                                  # Frontend dependencies
├── src/
│   ├── app/                                      # Next.js app directory
│   ├── components/                               # React components
│   │   ├── core/                                 # Core infrastructure
│   │   ├── ui/                                   # UI components
│   │   └── modules/                              # Feature modules
│   ├── hooks/                                    # Custom React hooks
│   ├── store/                                    # Zustand state
│   ├── locales/                                  # i18n translations
│   ├── monitoring/                               # Analytics & tracing
│   └── styles/                                   # Global styles
├── tests/                                        # Test suites
├── tsconfig.json
└── README.md
```

**Stack:**
- **Framework**: Next.js 15+ (App Router)
- **UI**: React 19+, Tailwind CSS
- **Components**: shadcn/ui (Radix UI)
- **State Management**: Zustand + React Query
- **Testing**: Vitest, Playwright
- **i18n**: next-intl or similar

---

### src/ — Core TypeScript Runtime

**Purpose**: Main orchestration runtime and core logic.

```
src/
├── index.ts                                      # Entry point
├── core/
│   ├── orchestrator/                             # Orchestration logic
│   ├── EventBus.ts                               # Event emission system
│   ├── SessionManager.ts                         # Session state
│   ├── EngineMetrics.ts                          # Performance metrics
│   └── GeminiObserver.ts                         # LLM integration
├── infrastructure/
│   ├── database/                                 # Database adapters
│   ├── cache/                                    # Cache layer
│   └── storage/                                  # File storage
└── security/
    ├── encryption/                               # Encryption utilities
    ├── access-control/                           # RBAC implementation
    └── audit/                                    # Audit logging
```

---

### .github/ — GitHub & CI/CD Configuration

**Purpose**: GitHub Actions, Copilot configurations, documentation, workflow templates.

```
.github/
├── workflows/                                    # GitHub Actions
├── copilot/                                      # Copilot agent configs
├── instructions/                                 # Coding guidelines
├── prompts/                                      # Copilot prompts
└── docs/                                         # Extended documentation
```

---

### .spec-kit/ & .specify/ — Spec Kit Integration

**Purpose**: Product specification and planning templates using Spec-Kit framework.

---

---

## Technical Stack

### Runtime & Build

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | ≥ 18.0.0 |
| **Language** | TypeScript | ^5.3.0 |
| **Package Manager** | npm / pnpm | ≥ 9.0.0 |
| **Build Tool** | esbuild, tsc | Latest |
| **Task Runner** | tsx | Latest |

### Backend

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Web Framework** | Express.js 4.18+ | REST API server |
| **ORM** | Prisma 5.8+ | Database abstraction |
| **Database** | PostgreSQL 16+ | Primary data store |
| **Cache** | Redis 7+ | Session & cache layer |
| **Graph DB** | Neo4j 5+ | Relationship storage |
| **Authentication** | Passport.js | JWT & OAuth2 |
| **Payments** | Stripe API | Payment processing |
| **Logger** | Winston 3.11+ | Application logging |
| **Validation** | Zod 4.3+ | Schema validation |

### Frontend

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Next.js 15+ | Server-side rendering |
| **Library** | React 19+ | UI rendering |
| **Styling** | Tailwind CSS 3+ | Utility-first CSS |
| **Components** | shadcn/ui | Headless UI components |
| **Icons** | Phosphor Icons | Icon library |
| **State Management** | Zustand | Client state |
| **Server State** | React Query | API state management |
| **Workflow Canvas** | @xyflow/react | Graph visualization |
| **Testing** | Vitest, Playwright | Unit & E2E tests |
| **Code Highlighting** | Prism.js / Shiki | Syntax highlighting |
| **i18n** | next-intl | Internationalization |

### DevOps & Deployment

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Containerization** | Docker 24+ | Container images |
| **Orchestration** | Docker Compose | Local orchestration |
| **Cloud** | GCP / AWS | Hosting & services |
| **CI/CD** | GitHub Actions | Automated workflows |
| **Observability** | OpenTelemetry | Tracing & metrics |
| **Secrets** | AWS Secrets Manager | Credential management |
| **Code Analysis** | ESLint, Prettier | Code quality |
| **Testing** | Vitest, Jest | Test execution |

### AI/ML Integrations

| Service | Purpose | Integration |
|---------|---------|-------------|
| **Google Gemini** | LLM backbone | API integration via GeminiClient |
| **Claude (Anthropic)** | Alternative LLM | SDK integration (`@anthropic-ai/sdk`) |
| **Pinecone** | Vector embeddings | Semantic search |
| **OpenTelemetry** | Distributed tracing | Performance monitoring |

---

## Key Features

### 1. **Multi-Agent Orchestration**
- Specialized agents for product, architecture, research, security, UX
- Dynamic agent activation based on round and context
- Agent memory and personality persistence
- Inter-agent communication via EventBus

### 2. **Constitutional Governance**
- Executable constitution defining system behavior
- Policy registry for rule enforcement
- Anti-hallucination sentinel preventing false claims
- Audit ledger tracking all decisions

### 3. **Round-Based Execution**
- Mandatory 5-round workflow (Plan → Blueprint → Detail → QA → Handoff)
- Completion gates preventing premature progression
- Round-specific outputs and deliverables
- Cross-round consistency validation

### 4. **Security-First Design**
- Encryption at rest and in transit (AES-256)
- Role-based access control (RBAC)
- Threat detection and incident response automation
- Privacy anonymization and GDPR compliance

### 5. **Analytics & Experimentation**
- Event-driven architecture with structured logging
- KPI dashboards and real-time metrics
- A/B testing framework
- Experimentation pipeline

### 6. **Extensible Tooling**
- Prompt template registry
- Tool and API mapping system
- Agent-prompt associations
- Runtime prompt pipeline with hot-reload

### 7. **Product Management**
- PRD generation framework
- Product roadmap tracking
- Feedback and iteration pipeline
- Release management automation

### 8. **Architecture & Data Systems**
- Graph database (Neo4j) for relationship storage
- Vector embeddings for semantic search
- Data pipeline orchestration
- Cache and indexing strategies

### 9. **Design System**
- Centralized design tokens
- Copy library with tone guidelines
- Design blueprints and user flows
- Accessibility (WCAG AA) and localization support

### 10. **Real-Time Collaboration**
- WebSocket support for live updates
- Collaborative document editing
- Comment and review workflows
- Version control integration

---

## Subsystems & Modules

### OpenOps Agents Fleet Marketplace

A specialized subsystem for distributing AI agent specifications as packages.

**Features:**
- Product catalog with agent specifications
- ZIP archive distribution with code, configs, and documentation
- Automatic platform adapter generation (Gemini Gems, ChatGPT Custom GPTs, Claude Skills)
- Multi-language support (AR/EN) with RTL layout
- Code preview with syntax highlighting
- License management (MIT, Apache, BSD, commercial)
- Marketplace with reviews and ratings
- Admin dashboard for vetting and moderation

**Components:**
- Frontend marketplace interface
- Backend product & license management
- Payment & billing system (Stripe integration)
- Security scanning for uploaded code
- Seller dashboard

### AutoGPT Integration

Reference implementation of autonomous agent patterns.

**Location**: `/AutoGPT/`

**Status**: Reference/Research (Classic unsupported, Platform active)

**Key Systems:**
- Visual workflow builder (FlowEditor)
- Block-based agent graph system
- REST API with WebSocket support
- Agent execution engine
- Marketplace for pre-built agents

---

## Development Setup

### Prerequisites

```bash
# Required versions
Node.js 18.0.0+
npm 9.0.0+ or pnpm 8.0+
Docker 24.0+
PostgreSQL 16+
Redis 7+
Neo4j 5+
```

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/openops/studio.git
cd studio

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your credentials

# 4. Initialize database
npm run db:migrate

# 5. Boot development server
npm run dev

# 6. Start backend (separate terminal)
cd backend
npm run dev

# 7. Start frontend (separate terminal)
cd frontend
npm run dev
```

### Development Scripts

| Script | Purpose |
|--------|---------|
| `npm run boot` | Single boot pass (production) |
| `npm run dev` | Watch mode development |
| `npm run build` | Production build |
| `npm run test` | Run test suite |
| `npm run test:watch` | Watch mode testing |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run docs` | Generate TypeDoc documentation |
| `npm run validate:config` | Validate configuration files |
| `npm run generate:module` | Create new module scaffold |

### Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# UI testing
npm run test:ui

# Coverage report
npm run test:coverage
```

### Docker Composition

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# View individual service logs
docker-compose logs -f openops
docker-compose logs -f postgres
docker-compose logs -f redis
docker-compose logs -f neo4j
```

---

## Deployment & Infrastructure

### Architecture Overview

```
┌─────────────────────────────────────────────┐
│         Load Balancer / CDN                 │
│        (CloudFlare / CloudFront)            │
└────────────────┬────────────────────────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
┌────▼────┐ ┌───▼────┐ ┌────▼────┐
│Frontend  │ │ Backend │ │ Workers │
│(Next.js) │ │(Express)│ │(Workers)│
└────┬─────┘ └───┬────┘ └────┬────┘
     │           │           │
     └───────────┼───────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
┌────▼────┐ ┌───▼────┐ ┌────▼────┐
│PostgreSQL│ │ Redis  │ │  Neo4j  │
│          │ │        │ │         │
└──────────┘ └────────┘ └─────────┘
```

### Container Build

```dockerfile
# Multi-stage production build
FROM node:22-alpine AS builder
# ... build stage ...

FROM node:22-alpine
# ... runtime stage ...
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3
```

### Environment Variables

Key environment variables:

```env
# Core
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
LOG_LEVEL=info

# Database
DATABASE_URL=postgresql://user:password@host:5432/openops
REDIS_URL=redis://host:6379
NEO4J_URI=bolt://neo4j:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password

# AI/LLM
GEMINI_API_KEY=xxx
ANTHROPIC_API_KEY=xxx
OPENAI_API_KEY=xxx

# Services
STRIPE_API_KEY=xxx
STRIPE_WEBHOOK_SECRET=xxx
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx

# Security
JWT_SECRET=xxx
ENCRYPTION_KEY=xxx
```

### Deployment Steps

```bash
# 1. Build Docker image
docker build -t openops:latest .

# 2. Push to registry
docker tag openops:latest gcr.io/project-id/openops:latest
docker push gcr.io/project-id/openops:latest

# 3. Deploy to Cloud Run / Kubernetes
gcloud run deploy openops \
  --image gcr.io/project-id/openops:latest \
  --platform managed \
  --region us-central1

# 4. Verify health
curl https://openops.example.com/health
```

---

## Security & Compliance

### Security Layers

1. **Constitutional Security**: Governance rules prevent unauthorized operations
2. **Encryption**: AES-256 for sensitive data, TLS 1.3 for transit
3. **Authentication**: JWT tokens, OAuth2 integration, MFA support
4. **Authorization**: RBAC with fine-grained permissions
5. **Audit**: Comprehensive audit logging of all operations
6. **Threat Detection**: Anomaly detection and incident response automation
7. **Privacy**: GDPR compliance, data anonymization, retention policies

### Compliance Standards

- **GDPR**: Data privacy and user rights
- **CCPA**: California consumer privacy
- **SOC 2 Type II**: Security and availability controls
- **ISO 27001**: Information security management
- **OWASP Top 10**: Web application security

### Secret Management

Secrets are stored in AWS Secrets Manager or environment variables:

```bash
# Fetch secrets
aws secretsmanager get-secret-value --secret-id openops-secrets

# Rotate secrets regularly (recommended: 90 days)
```

### Code Security

- **Dependency Scanning**: Trivy for vulnerability detection
- **Secret Scanning**: Prevent credential leaks
- **Code Analysis**: ESLint + security plugins
- **SCA (Supply Chain)**: Snyk integration

---

## Contributing Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome diverse perspectives
- Accept constructive criticism
- Focus on community benefit

### Git Workflow

**Branching Strategy**: Git Flow

```
main branch:        Production-ready code
develop branch:     Integration branch
feature/xxx:        New features (off develop)
bugfix/xxx:         Bug fixes (off develop)
hotfix/xxx:         Production hotfixes (off main)
```

### Commit Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example:**
```
feat(orchestration): add round completion gates

- Implement strict round progression validation
- Add completion checklist per round
- Update orchestrator to enforce gates

Closes #123
```

### Pull Request Process

1. Fork repository
2. Create feature branch
3. Make changes with tests
4. Ensure CI passes
5. Submit PR with description
6. Code review by maintainers
7. Merge after approval

### Testing Requirements

- Unit tests for all business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Minimum 80% code coverage

---

## Related Projects

### Primary Ecosystem

1. **OpenOps Agents Fleet** (Marketplace)
   - Description: E-commerce marketplace for AI agent specifications
   - Stack: Next.js frontend + Express backend + Prisma ORM
   - Purpose: Distribute and monetize agent packages

2. **AutoGPT Platform** (Reference)
   - Description: Autonomous agent workflow builder
   - Stack: Python FastAPI + Next.js React
   - Status: Active development
   - Features: Visual workflow builder, agent execution, marketplace

3. **Google ADK (Agents Development Kit)**
   - Integration: OpenTelemetry tracing, block-based agents
   - Location: `/adk-js/`
   - Purpose: Build agents for Google's ecosystem

### Knowledge Assets

1. **Egyptian Dialect Writer Module** (`/03_egyptian_dialect_writer/`)
   - Specialized NLP system for Egyptian Arabic dialect
   - Used in marketing and content generation

2. **Saudi Strategic System** (`/12_saudi_strategic_system/`)
   - Localized system prompt for Saudi market
   - B2B decision enablement content

3. **Creative Content System** (`/03_creative_content_system/`)
   - Copy generation and creative writing templates

4. **Research & Deep Learning** (`/04_research/`)
   - Competitive intelligence gathering
   - Evidence-based scoring model

---

## System Files Reference

### Knowledge Base Files (Ordered)

The system loads knowledge files in strict order:

1. `00_OpenOps_Constitution_and_IP_Policy.md` — Constitutional rules
2. `01_Orchestration_Engine_and_Rounds_Router.md` — Execution logic
3. `02_Agents_System_and_Activation_Matrix.md` — Agent definitions
4. `03_Product_and_PRD_Master_Framework.md` — Product framework
5. `04_Research_and_Competitive_Intelligence.md` — Research procedures
6. `05_Architecture_and_Data_Systems_Playbook.md` — Architecture guide
7. `06_Security_Compliance_and_Privacy_Gates.md` — Security rules
8. `07_Tracking_Analytics_and_Experimentation.md` — Tracking rules
9. `08_UX_Design_System_and_Copy_Library.md` — Design system
10. `09_PromptKit_and_Tooling_Handoff.md` — Tooling guide

### Configuration Files

| File | Purpose |
|------|---------|
| `OpenOPS-Definition.json` | Master orchestrator definition |
| `integration_config.json` | External service integrations |
| `package.json` | Project dependencies & scripts |
| `tsconfig.json` | TypeScript configuration |
| `docker-compose.yml` | Container orchestration |
| `.env.example` | Environment template |
| `.github/workflows/*.yml` | CI/CD pipelines |

---

## Performance Metrics & Monitoring

### Key Performance Indicators (KPIs)

- **Round Completion Time**: Target < 5 minutes per round
- **Agent Response Latency**: Target < 2 seconds per response
- **System Availability**: Target 99.9% uptime
- **Error Rate**: Target < 0.5% of operations
- **Cache Hit Rate**: Target > 85%

### Observability

**Tracing**: OpenTelemetry with Google Cloud Trace

**Metrics**: Prometheus-compatible format

**Logging**: Structured JSON logs via Winston

**Health Checks**: `/health` endpoint reports:
- Database connectivity
- Redis connectivity
- Neo4j connectivity
- External service status

---

## FAQ & Troubleshooting

### Common Issues

**Issue**: Boot sequence fails
- **Solution**: Check database migrations: `npm run db:migrate`

**Issue**: Agent memory not persisting
- **Solution**: Verify Redis connection in `.env`

**Issue**: Round gate prevents progression
- **Solution**: Review output validation schemas in orchestration layer

**Issue**: External service integration fails
- **Solution**: Verify API keys in AWS Secrets Manager or `.env`

---

## License & Attribution

**License**: MIT  
**Copyright**: OpenOps Foundation  
**Creator**: Mamdouh Aboammar  
**Repository**: https://github.com/openops/studio  

**Citation**:
```bibtex
@software{openops2024,
  title={OpenOps Studio: Multi-Agent Orchestration Framework},
  author={Aboammar, Mamdouh},
  year={2024},
  url={https://github.com/openops/studio}
}
```

---

## Appendix: Glossary

| Term | Definition |
|------|-----------|
| **Round** | Sequential execution phase (Plan, Blueprint, Detail, QA, Handoff) |
| **Gate** | Validation checkpoint preventing progression without meeting criteria |
| **Constitution** | Set of executable rules governing system behavior |
| **Ledger** | Immutable audit trail of decisions and events |
| **Orchestration** | Coordination of multiple agents toward unified goals |
| **Vector Store** | Database optimized for semantic search via embeddings |
| **EventBus** | Central event publishing/subscription system for inter-agent communication |
| **Gemini Gems** | Google's customizable AI assistant deployment platform |
| **FlowEditor** | Visual workflow builder for creating agent graphs |
| **Handoff** | Final round artifact packaging for external stakeholder use |

---

**Document Version**: 1.0  
**Last Updated**: January 20, 2026  
**Status**: Complete Knowledge Base

---
