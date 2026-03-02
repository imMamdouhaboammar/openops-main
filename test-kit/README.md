# Test-Kit v0.1-alpha

**AI-Assisted Testing Framework for Vibe Coders**

Companion to Spec-Kit. If Spec-Kit tells you what to build, Test-Kit tells you how to test it.

## 🎯 Mission

Help Vibe Coders auto-generate, validate, and heal tests without deep testing expertise.

## 🚀 Quick Start

### Installation

```bash
npm install @openops/test-kit
# or
pnpm add @openops/test-kit
```

### Usage

```bash
# Detect your project's tech stack
test-kit detect

# Initialize Test-Kit configuration
test-kit scaffold

# Generate example tests
test-kit generate

# Audit test coverage
test-kit audit

# Auto-heal failing tests
test-kit heal

# Run complete agentic testing cycle
test-kit loop
```

## 📋 Commands

### `test-kit detect`
Analyzes your project and detects:
- Framework (React, Vue, Next.js, etc.)
- Test runner (Vitest, Jest, Mocha, etc.)
- Language (TypeScript, JavaScript)
- Package manager

```bash
test-kit detect --dir ./my-project
```

### `test-kit scaffold`
Creates `.test-kit/` folder with:
- Configuration templates
- Agent registry
- Event logging
- Task schema

```bash
test-kit scaffold --dir ./my-project --force
```

### `test-kit generate`
Generates example test files:

```bash
# All test types
test-kit generate --dir ./my-project

# Specific types
test-kit generate --dir ./my-project --type unit
test-kit generate --dir ./my-project --type integration
test-kit generate --dir ./my-project --type e2e
```

### `test-kit audit`
Analyzes test coverage and provides metrics:

```bash
test-kit audit --dir ./my-project
test-kit audit --dir ./my-project --json
```

### `test-kit heal`
Auto-fixes failing tests using AI:

```bash
test-kit heal --dir ./my-project
test-kit heal --dir ./my-project --ai-model gpt-4
```

### `test-kit loop`
Runs complete agentic cycle (detect → scaffold → generate → audit → heal):

```bash
test-kit loop --dir ./my-project
test-kit loop --dir ./my-project --iterations 3
```

## 🧠 How It Works

```
┌─────────────────────────────────────────┐
│ 1. Detect Stack (Stack Detection Agent) │
└──────────────────┬──────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│ 2. Scaffold Config (.test-kit folder)   │
└──────────────────┬──────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│ 3. Generate Tests (Test Generator Agent)│
└──────────────────┬──────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│ 4. Audit Coverage (Coverage Agent)      │
└──────────────────┬──────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│ 5. Heal Failures (Self-Healing Agent)   │
└─────────────────────────────────────────┘
```

## 🤖 Agents

Test-Kit orchestrates 5 specialized agents:

1. **DetectAgent** - Analyzes project structure
2. **TestGenAgent** - Generates test code
3. **ReviewerAgent** - Reviews test quality
4. **AuditAgent** - Analyzes coverage
5. **HealerAgent** - Fixes failing tests

## 📁 Project Structure

```
test-kit/
├── bin/
│   └── test-kit.ts           # CLI entry point
├── src/
│   ├── commands/             # CLI commands
│   ├── core/                 # Core orchestration
│   ├── agents/               # Agent registry
│   ├── prompts/              # AI prompts
│   ├── templates/            # Config templates
│   └── utils/                # Utilities
├── package.json
├── tsconfig.json
└── README.md
```

## 🎓 Integration with Test-Kit Spec

This repository implements the **Test-Kit Specification** (v1.1).

For full specification details, see:
- [`spec.md`](/specs/010-test-kit/spec.md) - Requirements
- [`plan.md`](/specs/010-test-kit/plan.md) - Architecture
- [`LEVERAGE_METASPEC_GUIDE.md`](/specs/010-test-kit/LEVERAGE_METASPEC_GUIDE.md) - MetaSpec Integration

## 🔮 Future Roadmap

### Phase 1 (Weeks 1-4)
- ✅ Stack detection
- ✅ Configuration scaffolding
- ✅ Basic test generation
- 🚀 AI model integration (Gemini/Claude/OpenAI)

### Phase 2 (Weeks 5-8)
- AI-powered test generation
- Smart test triage
- Coverage optimization
- Self-healing tests

### Phase 3 (Weeks 9-12)
- Multi-modal testing (unit/integration/e2e/AI evals)
- Advanced healing strategies
- Community templates
- Spec-Kit integration

## 💡 Usage Examples

### Example 1: Scaffold and Generate

```bash
# Initialize your project
test-kit scaffold --dir ./my-app

# Generate example tests
test-kit generate --dir ./my-app --type all

# Run your tests
cd my-app
npm run test
```

### Example 2: Full Testing Loop

```bash
# Run complete agentic cycle
test-kit loop --dir ./my-app --iterations 2

# View coverage report
test-kit audit --dir ./my-app --json > coverage.json
```

### Example 3: Heal Failing Tests

```bash
# Auto-fix failing tests
test-kit heal --dir ./my-app

# With specific AI model
test-kit heal --dir ./my-app --ai-model claude-3
```

## ⚙️ Configuration

Create `.test-kit/config.json`:

```json
{
  "testFramework": "vitest",
  "language": "typescript",
  "strictMode": true,
  "aiModel": "claude-3",
  "coverageThreshold": 80
}
```

## 📊 Output

All operations log events to `.test-kit/logs/events.json`:

```json
{
  "command": "generate",
  "status": "success",
  "timestamp": "2026-01-18T12:00:00Z",
  "files": ["example.unit.test.ts", "example.integration.test.ts"]
}
```

## 🔗 Links

- **Specification**: [Test-Kit Spec](/specs/010-test-kit/)
- **MetaSpec Integration**: [LEVERAGE_METASPEC_GUIDE.md](/specs/010-test-kit/LEVERAGE_METASPEC_GUIDE.md)
- **awesome-spec-kits**: [Awesome Spec Kits Registry](https://github.com/ACNet-AI/awesome-spec-kits)
- **MetaSpec**: [MetaSpec Framework](https://github.com/ACNet-AI/MetaSpec)

## 📝 License

MIT © OpenOps Studio

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

**Status**: v0.1-alpha  
**Last Updated**: January 18, 2026  
**Next**: Phase 1 AI Integration
