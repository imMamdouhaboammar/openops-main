# Architecture

## System Overview

```
┌────────────────────────────────────────────────────────────┐
│                  Test-Kit v0.1-alpha                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────┐    │
│  │           CLI Entry (bin/test-kit.ts)            │    │
│  └────────────────┬─────────────────────────────────┘    │
│                   ↓                                        │
│  ┌──────────────────────────────────────────────────┐    │
│  │     Commander.js Routing & Argument Parsing      │    │
│  └────────────────┬─────────────────────────────────┘    │
│                   ↓                                        │
│  ┌──────────────────────────────────────────────────┐    │
│  │         Command Handlers (src/commands/)         │    │
│  │  ├─ detect.ts    (Stack Detection)               │    │
│  │  ├─ scaffold.ts  (Config Scaffolding)            │    │
│  │  ├─ generate.ts  (Test Generation)               │    │
│  │  ├─ audit.ts     (Coverage Analysis)             │    │
│  │  ├─ heal.ts      (Test Healing)                  │    │
│  │  └─ loop.ts      (Orchestrated Cycle)            │    │
│  └────────────────┬─────────────────────────────────┘    │
│                   ↓                                        │
│  ┌──────────────────────────────────────────────────┐    │
│  │      Core Agent Layer (src/core/)                │    │
│  │  ├─ detect.ts      (Stack Detector Agent)        │    │
│  │  ├─ scaffold.ts    (Config Generator Agent)      │    │
│  │  ├─ generate.ts    (Test Generator Agent)        │    │
│  │  ├─ audit.ts       (Audit Agent)                 │    │
│  │  ├─ heal.ts        (Healing Agent)               │    │
│  │  └─ orchestrator.ts (Multi-Agent Orchestrator)   │    │
│  └────────────────┬─────────────────────────────────┘    │
│                   ↓                                        │
│  ┌──────────────────────────────────────────────────┐    │
│  │        Utilities & Services (src/utils/)         │    │
│  │  ├─ logger.ts      (Event Logging)               │    │
│  │  ├─ config.ts      (Configuration Management)    │    │
│  │  ├─ fileSystem.ts  (File I/O)                    │    │
│  │  └─ ai.ts          (AI Provider Integration)     │    │
│  └────────────────┬─────────────────────────────────┘    │
│                   ↓                                        │
│  ┌──────────────────────────────────────────────────┐    │
│  │      Data Layer (Project & .test-kit/)           │    │
│  │  ├─ .test-kit/registry.json      (Agent Config)  │    │
│  │  ├─ .test-kit/logs/events.json   (Event Log)     │    │
│  │  ├─ .test-kit/meta/task-schema   (Task Schema)   │    │
│  │  └─ package.json, source files   (Project Data)  │    │
│  └──────────────────────────────────────────────────┘    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Module Breakdown

### 1. CLI Entry Point (`bin/test-kit.ts`)
- Displays figlet banner
- Registers all commands with Commander.js
- Handles argument parsing
- Routes to appropriate command handlers

### 2. Command Handlers (`src/commands/`)
Each command follows a standard pattern:

```typescript
export const commandName = new Command()
  .name('command-name')
  .description('What this does')
  .option('-d, --dir <path>', 'Project directory', process.cwd())
  .action(async (options) => {
    // 1. Show spinner
    // 2. Call core function
    // 3. Handle results
    // 4. Log events
    // 5. Show next steps
  });
```

### 3. Core Agent Layer (`src/core/`)
Pure business logic for each agent:

- **detect.ts**: Reads `package.json`, identifies framework/test runner
- **scaffold.ts**: Creates `.test-kit/` folder structure
- **generate.ts**: Creates example test files
- **audit.ts**: Analyzes coverage (mocked for now)
- **heal.ts**: Auto-fixes failing tests (mocked for now)
- **orchestrator.ts**: Runs multi-step workflows

### 4. Utilities (`src/utils/`)

- **logger.ts**: Logs events to `.test-kit/logs/events.json`
- **config.ts**: Configuration schema & validation (Zod)
- **fileSystem.ts**: Abstraction for file operations
- **ai.ts**: Placeholder for AI provider integration

### 5. Supporting Modules

- **src/agents/registry.ts**: Agent registry & metadata
- **src/prompts/templates.ts**: AI prompt templates
- **src/templates/configs.ts**: Config & example templates

## Data Flow Example: `test-kit scaffold`

```
User Input: test-kit scaffold --dir ./my-app
    ↓
scaffoldCommand.action()
    ↓
scaffold(projectDir, options)
    ↓
1. ensureDirSync(.test-kit/meta, logs, configs, templates)
2. writeFileSync(.test-kit/registry.json)
3. writeFileSync(.test-kit/meta/task-schema.json)
4. writeFileSync(.test-kit/logs/events.json)
    ↓
Return: { created: ['paths...'] }
    ↓
Display results & log event
```

## Event Logging

All operations log to `.test-kit/logs/events.json`:

```json
[
  {
    "command": "scaffold",
    "status": "success",
    "timestamp": "2026-01-18T12:00:00Z",
    "created": ["..."]
  },
  {
    "command": "generate",
    "status": "success",
    "timestamp": "2026-01-18T12:01:00Z",
    "files": ["..."]
  }
]
```

## Configuration Management

Zod schema ensures type-safe config:

```typescript
const config = {
  testFramework: 'vitest',
  language: 'typescript',
  strictMode: true,
  aiModel: 'claude-3',
  coverageThreshold: 80,
};

validateConfig(config); // ✅ Type-safe
```

## Extension Points

### Adding a New Agent

1. Create `src/core/newAgent.ts`:
   ```typescript
   export async function newAgentFunction(projectDir, options) {
     // Implementation
   }
   ```

2. Create `src/commands/newAgent.ts`:
   ```typescript
   export const newCommand = new Command()
     .name('new-command')
     .action(async (options) => {
       const result = await newAgentFunction(options.dir);
       // Handle result
     });
   ```

3. Register in `bin/test-kit.ts`:
   ```typescript
   program.addCommand(newCommand);
   ```

### Adding AI Integration

Update `src/utils/ai.ts`:

```typescript
export class AIClient {
  async generateText(prompt: string, context?: any): Promise<AIResponse> {
    // Call Gemini/Claude/OpenAI API
  }
}
```

Then use in agents:

```typescript
const aiClient = new AIClient('claude-3');
const generated = await aiClient.generateTestCode(prompt, sourceCode);
```

## Dependencies

**Core**:
- `commander`: CLI framework
- `chalk`: Colored console output
- `ora`: Loading spinners
- `figlet`: ASCII art
- `fs-extra`: File system utilities
- `zod`: Schema validation

**Dev**:
- `typescript`: Type safety
- `tsx`: TypeScript execution
- `vitest`: Testing framework
- `eslint`: Linting
- `prettier`: Code formatting

## Build & Run

```bash
# Development
npm run dev

# Build
npm run build

# Run
npm start
# or
npx test-kit --help
```

---

**Version**: v0.1-alpha  
**Last Updated**: January 18, 2026
