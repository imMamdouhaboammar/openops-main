# OpenOps AI Agent Guidance

This document provides guidance for AI coding agents working on the OpenOps project, integrating spec-driven development principles from the [awesome-spec-kits](https://github.com/ACNet-AI/awesome-spec-kits) framework.

**Core Philosophy**: `Specs → AI → Content`

Where specifications serve as the single source of truth that drive AI to generate code, documentation, protocols, configs, tests, and more.

---

## Project Overview

**OpenOps** is a spec-driven platform orchestrating multiple AI agents to generate content across creative, research, and strategic domains. The project uses Spec-Kit as the formal specification framework, enabling AI agents to generate implementations from declarative specifications.

### What Makes OpenOps "Spec-Driven"?

A system is truly spec-driven if it satisfies ALL four criteria:

1. **Has Formal Specifications** – Clear, structured spec format (not just config)
2. **Specs DRIVE** – Specs generate/validate, not just describe
3. **Spec → Output Relationship** – Changing spec changes output
4. **Spec is Authority** – Everything derives from specification

---

## Core Concepts

### Spec-Driven Development (SD-X)

The "X" in SD-X can be anything. OpenOps currently implements:

- **SD-Development** – Specs → AI → Code, tests, implementations
- **SD-Design** – Specs → AI → UI designs, architectures (PixelForge Studio)
- **SD-Documentation** – Specs → AI → Docs, guides, tutorials
- **SD-Protocol** – Specs → AI → Protocol definitions, agent orchestration
- **SD-Content** – Specs → AI → Creative content, copy, strategies
- **SD-Research** – Specs → AI → Research summaries, insights, analysis

Note: This is not a fixed taxonomy. New SD-X categories can emerge as the project evolves.

### Project Structure

```
OpenOps/
├── .github/
│   ├── copilot/                    # Agent guidance files
│   │   ├── agents-guidance.md      # This file
│   │   ├── speckit-*.md            # Spec-Kit workflow guidance
│   │   └── ...
│   ├── instructions/               # Critical rules for code generation
│   │   ├── codacy.instructions.md  # Code quality & security gates
│   │   └── ...
│   └── workflows/                  # CI/CD automation
├── .specify/                       # Spec-Kit infrastructure
│   ├── memory/
│   │   └── constitution.md         # Project constitution (non-negotiable principles)
│   └── scripts/
│       └── bash/                   # Spec-Kit validation & utilities
├── specs/                          # Feature specifications (organized by ID)
│   ├── 001-feature-name/
│   │   ├── spec.md                 # Functional requirements
│   │   ├── plan.md                 # Technical blueprint
│   │   └── tasks.md                # Implementation tasks
│   └── 010-test-kit/
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
├── modules/                        # Feature modules (Vite + React + TS)
│   ├── {feature}/
│   │   ├── ai/                     # AI integration layer
│   │   ├── core/                   # Business logic
│   │   ├── hooks/                  # React hooks
│   │   ├── store/                  # Zustand state
│   │   ├── ui/                     # Components
│   │   ├── vault/                  # Dexie IndexedDB
│   │   └── index.ts                # Barrel export
│   └── ...
├── src/                            # Shared infrastructure
│   ├── core/
│   │   ├── EventBus.ts             # Event-driven architecture
│   │   ├── EventTypes.ts           # Typed events
│   │   ├── SessionManager.ts       # Session state
│   │   ├── EngineMetrics.ts        # Performance tracking
│   │   └── GeminiObserver.ts       # AI model integration
│   ├── ui/
│   │   ├── components/             # Shared UI primitives
│   │   └── theme/
│   │       └── tokens.ts           # Design tokens
│   └── ...
├── docs/                           # Generated documentation
├── content/                        # Curated content & assets
└── package.json                    # Project dependencies
```

---

## Key Design Decisions

### 1. Spec-Kit as Authority

- Specifications in `/specs/{feature-id}/` are the single source of truth
- All implementations derive from approved specifications
- Constitution in `.specify/memory/constitution.md` is non-negotiable
- Use `/speckit.*` commands to orchestrate spec-driven workflows

### 2. Architecture Principles

- **Modular Design** – Each feature lives in `modules/{feature}/` with isolated concerns
- **Event-Driven** – Cross-module communication via `core/EventBus.ts` (never direct imports)
- **AI-First** – All AI calls go through `ai/client/GeminiClient.ts` + `ModelRouter.ts`
- **Type-Safe** – Strict TypeScript + Zod schema validation for all AI responses
- **Accessible** – RTL support, ARIA labels, ≥4.5:1 contrast, focus rings

### 3. Code Quality Gates

- **Codacy CLI** runs after every edit (see [codacy.instructions.md](../instructions/codacy.instructions.md))
- **Security-First** – Trivy scans all dependencies immediately after install
- **No Silent Failures** – ErrorBoundary + `normalizeError` for all async operations
- **Type Safety** – No unchecked `any`; strict mode enforced

### 4. Data & State Management

- **UI State** – Zustand stores with `devtools` + `subscribeWithSelector`
- **Persistent Data** – IndexedDB via Dexie (see `modules/{feature}/vault/`)
- **Server State** – React Query for async operations
- **Events** – Typed, with `correlationId` for tracing

---

## Spec-Driven Workflow Commands

When working on a feature, use these Spec-Kit commands in sequence:

### `/speckit.specify` – Define Requirements

- **Input**: User request, business context
- **Output**: `spec.md` with functional & non-functional requirements
- **When**: Starting a new feature or clarifying ambiguous requirements
- **Agent**: [speckit-specify.md](./speckit-specify.md)

### `/speckit.plan` – Design Architecture

- **Input**: Approved specification
- **Output**: `plan.md` with tech stack, architecture, phases
- **When**: After spec is approved; before coding starts
- **Agent**: [speckit-plan.md](./speckit-plan.md)

### `/speckit.tasks` – Break Down Work

- **Input**: Approved plan
- **Output**: `tasks.md` with granular, parallelizable tasks
- **When**: Before `/speckit.implement`
- **Agent**: [speckit-tasks.md](./speckit-tasks.md)

### `/speckit.analyze` – Quality Gate

- **Input**: All three artifacts (spec, plan, tasks)
- **Output**: Inconsistency report + remediation recommendations
- **When**: Before starting implementation (after `/speckit.tasks`)
- **Agent**: [speckit-analyze.md](./speckit-analyze.md)

### `/speckit.implement` – Execute Tasks

- **Input**: Approved tasks from `/speckit.tasks`
- **Output**: Working code + tests + docs
- **When**: After `/speckit.analyze` clears CRITICAL issues
- **Agent**: [speckit-implement.md](./speckit-implement.md)

---

## AI Integration Guidelines

### Calling Gemini / AI Models

All AI calls must go through the centralized AI layer:

```typescript
import { geminiClient } from '@/ai/client/GeminiClient'
import { MODEL_ROUTER } from '@/ai/client/ModelRouter'
import { responseSchema } from '@/ai/schemas/my-response.schema'
import { MY_PROMPT } from '@/ai/prompts/my-feature.prompts'

// Recommended pattern
const response = await geminiClient.generateText({
  task: 'Generate test cases',
  prompt: MY_PROMPT({ input: userInput }),
  schema: responseSchema,
  // Optional: image for vision tasks
  image: base64EncodedImage
})
```

**Key Rules:**
- Always validate response with Zod schema from `ai/schemas/`
- Always use prompts from `ai/prompts/*.prompts.ts` (not inline strings)
- Wrap in p-retry + error handling (normalizeError from `ai/errors`)
- Use `correlationId` in event payloads for tracing
- Never call Gemini API directly; always go through `GeminiClient`

### Prompt Structure

Store all prompts in `modules/{feature}/ai/prompts/*.prompts.ts`:

```typescript
// my-feature.prompts.ts
export const MY_PROMPT = (vars: { input: string }) => `
You are an expert at ${vars.input}.

Task: Generate comprehensive output.

Guidelines:
- Be specific and actionable
- Use structured format (JSON, markdown, etc.)
- Validate all constraints from schema

Respond in valid JSON matching the provided schema.
`
```

### Schema Validation

Create Zod schemas in `modules/{feature}/ai/schemas/`:

```typescript
// my-response.schema.ts
import { z } from 'zod'

export const responseSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string()).min(1),
  confidence: z.number().min(0).max(1)
})

export type MyResponse = z.infer<typeof responseSchema>
```

---

## Development Workflow

### Before Committing Any Code

1. **Run Quality Analysis** (mandatory):
   ```bash
   codacy_cli_analyze --rootPath . --file <changed-file>
   ```
   If issues found, fix them before proceeding.

2. **Check Dependencies** (after npm/pip install):
   ```bash
   codacy_cli_analyze --rootPath . --tool trivy
   ```
   Resolve security issues immediately.

3. **Verify Spec Alignment**:
   - Does implementation match approved spec/plan?
   - Are all tasks in `tasks.md` accounted for?
   - Do changes require spec/plan updates?

4. **Run Tests**:
   ```bash
   npm run test
   npm run test:ui
   ```

### File Organization Rules

**Module Structure** (follow this exactly):

```
modules/{feature}/
├── ai/
│   ├── client/           # AI client integration (if needed)
│   ├── prompts/          # Prompt templates
│   ├── schemas/          # Zod schemas for AI responses
│   └── errors/           # Error normalization
├── core/
│   ├── index.ts          # Exports orchestrator, handlers, etc.
│   ├── orchestrator.ts   # Event handler registration
│   ├── handlers/         # Event handlers
│   └── effects/          # Side effects
├── hooks/
│   └── *.ts              # React hooks
├── store/
│   └── {feature}.store.ts  # Zustand store
├── ui/
│   └── components/       # React components
├── vault/
│   ├── db.ts             # Dexie schema
│   └── migrations.ts     # DB migrations
└── index.ts              # Barrel export (export only public API)
```

**Import Rules:**

- Within module: relative imports (`../../core`, `./hooks`)
- To root: `@/` prefix (allowed only to `src/`)
- Cross-module: NO direct imports – use `EventBus`
- Never import from `ui/components` across modules; duplicate if needed

### Event-Driven Communication

**Emit Events** (from handlers, hooks, components):

```typescript
import { eventBus } from '@/core/EventBus'
import { EVENTS } from '@/core/EventTypes'

eventBus.emit({
  type: EVENTS.MY_FEATURE_COMPLETED,
  source: 'my-module',
  payload: { data: 'value' },
  meta: { correlationId: generateCorrelationId() }
})
```

**Listen to Events** (from orchestrator only):

```typescript
import { createFeatureRegistrar } from '@/core/orchestrator'
import { EVENTS } from '@/core/EventTypes'

export const registerMyFeature = createFeatureRegistrar({
  guards: [],
  handlers: [
    {
      event: EVENTS.MY_TRIGGER,
      handler: async (e) => {
        // Handle event
      }
    }
  ],
  effects: []
})
```

---

## Testing & Validation

### Before Running `/speckit.implement`

1. **Run Analysis**:
   ```bash
   /speckit.analyze
   ```
   Ensure no CRITICAL issues remain.

2. **Verify Spec Completeness**:
   - All functional requirements have tasks?
   - All non-functional requirements addressed?
   - Edge cases covered?
   - Constitution principles embedded?

3. **Check Plan Feasibility**:
   - Architecture aligns with spec?
   - Tech choices justified?
   - Phases realistic?
   - No conflicting requirements?

### Validation Rules

When evaluating if implementation matches spec-driven principles:

- ✅ Code matches specification requirements
- ✅ All tasks from `tasks.md` completed
- ✅ Tests cover acceptance criteria
- ✅ No silent failures; errors surface clearly
- ✅ Types are strict; no `any`
- ✅ Prompts in dedicated files; schemas validated
- ✅ Cross-module communication via events
- ✅ Data persisted with Dexie migrations

- ❌ Implementation differs from spec without spec update
- ❌ Tasks skipped or merged without rationale
- ❌ Direct module imports across features
- ❌ Base64 images stored in Zustand
- ❌ Unmapped Gemini calls (not through GeminiClient)
- ❌ Unvalidated AI responses
- ❌ Silent async failures

---

## Git Workflow

### Commit Messages

Follow conventional commits:

- `feat:` – New feature (maps to `/speckit.specify`)
- `fix:` – Bug fix (maps to spec/plan update + new task)
- `docs:` – Documentation changes
- `refactor:` – Code restructuring without behavior change
- `test:` – Test updates
- `chore:` – Dependencies, build config

**Examples:**

```
feat: implement test-kit orchestrator (task T1.1, T1.2)
docs: update AGENTS.md with event-driven patterns
fix: resolve race condition in EventBus (task B2.3)
refactor: extract AI validation into schemas module
test: add coverage for GeminiClient error handling
chore: upgrade dependencies with Trivy clearance
```

### PR Guidelines

1. ✅ Spec → Plan → Tasks → Analyze → Implement chain followed
2. ✅ Codacy analysis run; no issues remain
3. ✅ No security vulnerabilities (Trivy passed)
4. ✅ All tests passing
5. ✅ Commit messages clear and conventional
6. ✅ Changes atomic and focused
7. ✅ Constitution principles upheld

---

## Important Constraints

### Never Do

1. ❌ Modify `constitution.md` without explicit user approval
2. ❌ Skip Spec-Kit workflow (spec → plan → tasks → analyze → implement)
3. ❌ Call Gemini API directly (use `GeminiClient`)
4. ❌ Store base64 images in Zustand state
5. ❌ Import across modules outside of orchestrator/EventBus
6. ❌ Commit without Codacy/Trivy clearance
7. ❌ Use unchecked `any` type in strict mode
8. ❌ Silent async failures; always surface errors

### Always Do

1. ✅ Maintain "Specs → AI → Content" messaging
2. ✅ Run `codacy_cli_analyze` after every edit
3. ✅ Validate all AI responses with Zod schemas
4. ✅ Use events for cross-module communication
5. ✅ Keep modules <400 lines; split if larger
6. ✅ Test implementations against spec acceptance criteria
7. ✅ Update spec/plan if implementation reveals issues
8. ✅ Document non-obvious decisions in comments

---

## Reference Projects & Standards

When discussing or evaluating implementations, reference:

- **GitHub Spec-Kit** – Official Spec-Driven Development toolkit
- **MetaSpec** – Meta-specification framework (optional integration)
- **PixelForge Studio** – Vite + React 19 + TS strict modular architecture
- **OpenOps Constitution** – Non-negotiable project principles
- **awesome-spec-kits** – Spec-driven development best practices registry

---

## Critical Decision Tree

When uncertain, follow this decision tree:

```
┌─ Is this a new feature?
│  ├─ YES → Run /speckit.specify first
│  └─ NO → Is it a bug fix?
│         ├─ YES → Update spec/plan if needed, then implement fix
│         └─ NO → Is it a refactor?
│                ├─ YES → Ensure no behavior change, update if needed
│                └─ NO → Is it a question about implementation?
│                       └─ Check AGENTS.md, copilot/*.md, constitution.md
└─ Still uncertain?
   └─ Default to being inclusive & seeking clarification from user
```

---

## Questions or Uncertainty?

If unsure about:

- **"Should I run `/speckit.specify`?"** – Yes, if requirements are unclear or missing
- **"Can I skip `/speckit.analyze`?"** – No, this is mandatory before `/speckit.implement`
- **"Is this spec-driven?"** – Apply the 4-question test in § Core Concepts
- **"Which module should this go in?"** – Check architecture.md or ask user
- **"Can I call Gemini directly?"** – No, always use `GeminiClient` from `@/ai/client/`
- **"Do I need a Zod schema?"** – Yes, for every AI response
- **"Can modules import each other?"** – No, use `EventBus` instead

**Default to being inclusive and welcoming. When in doubt, err on the side of clarity and specification.**

---

## Feedback & Continuous Improvement

This document reflects current best practices as of **January 18, 2026**. As the project evolves:

- New SD-X categories may emerge
- Architecture patterns may be refined
- Constitution principles may be updated (by user only)
- Agent guidance will be synchronized

Refer to `.specify/memory/constitution.md` for the absolute authority on project principles.

---

**Last Updated**: January 18, 2026  
**Integrated From**: [awesome-spec-kits/AGENTS.md](https://github.com/ACNet-AI/awesome-spec-kits/blob/main/AGENTS.md)  
**Project**: OpenOps AI Agent Orchestration Platform  
**Status**: Active
