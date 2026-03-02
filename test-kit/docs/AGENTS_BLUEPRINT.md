# AGENTS_BLUEPRINT.md

## Test-Kit Agent Architecture

### Overview

Test-Kit is built on a multi-agent orchestration system that automates the testing workflow.

### Agent Roles

#### 1. DetectAgent (Stack Detector)
**Responsibility**: Analyze project structure and detect technology stack

**Inputs**:
- `package.json`
- File structure
- Configuration files

**Outputs**:
- Framework (React, Vue, Next.js, etc.)
- Test runner (Vitest, Jest, Playwright, etc.)
- Language (TypeScript, JavaScript)
- Package manager

**Implementation**: `src/core/detect.ts`

---

#### 2. TestGenAgent (Test Generator)
**Responsibility**: Generate test code based on analysis

**Inputs**:
- Detected stack
- Source code context
- AI prompts

**Outputs**:
- Unit tests
- Integration tests
- E2E tests

**Implementation**: `src/core/generate.ts`

---

#### 3. ReviewerAgent (Code Reviewer)
**Responsibility**: Review generated tests for quality

**Inputs**:
- Generated test code
- Quality standards
- Project context

**Outputs**:
- Quality score
- Suggestions
- Approved tests

**Implementation**: `src/agents/reviewer.ts` (TODO)

---

#### 4. AuditAgent (Coverage Analyst)
**Responsibility**: Analyze and report test coverage

**Inputs**:
- Test files
- Source code
- Coverage metrics

**Outputs**:
- Coverage percentage
- Gap analysis
- Improvement suggestions

**Implementation**: `src/core/audit.ts`

---

#### 5. HealerAgent (Self-Healing)
**Responsibility**: Auto-fix failing tests

**Inputs**:
- Failing tests
- Error logs
- AI assistance

**Outputs**:
- Fixed tests
- Patch files
- Healing report

**Implementation**: `src/core/heal.ts`

---

### Orchestration Flow

```
User Command
    ↓
CLI Parser
    ↓
Select Agent(s)
    ↓
Run Agent
    ↓
Log Events
    ↓
Return Results
```

### Agent Registration

Agents are registered in `src/agents/registry.ts`:

```typescript
export const AGENT_REGISTRY = {
  DetectAgent: { ... },
  TestGenAgent: { ... },
  ReviewerAgent: { ... },
  AuditAgent: { ... },
  HealerAgent: { ... },
};
```

### Agent Communication

Agents communicate via:
1. **Event Log** (`.test-kit/logs/events.json`)
2. **Registry** (`.test-kit/registry.json`)
3. **Shared Context** (project directory)

### Future: AI-Powered Agents

Phase 2+ will integrate real AI models:

```typescript
// Phase 2 placeholder
const aiClient = new AIClient('claude-3');
const generatedTests = await aiClient.generateTestCode(prompt, sourceCode);
```

## Integration Points

### With MetaSpec

Test-Kit will eventually integrate with MetaSpec:

```
MetaSpec
  ↓
Test-Kit Specification (SDS)
  ↓
Test-Kit Toolkit (SDD)
  ↓
MetaSpec Commands
  ↓
Agent Orchestration
```

### With Spec-Kit

Complementary workflow:

```
Spec-Kit: "What to build" → Source Code
Test-Kit: "How to test it" → Test Code
```

## Extension Points

Future enhancements:

1. **Custom Agents**: Create domain-specific agents
2. **AI Provider Plugins**: Add new AI models
3. **Test Templates**: Custom test patterns
4. **Coverage Strategies**: Advanced coverage analysis
5. **Healing Strategies**: Advanced test fixing

---

**Status**: v0.1-alpha  
**Last Updated**: January 18, 2026
