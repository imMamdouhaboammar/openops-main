# Contributing to OpenOps Studio

Thank you for your interest in contributing to OpenOps Studio! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Adding New Modules](#adding-new-modules)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

---

## 🤝 Code of Conduct

By participating in this project, you agree to uphold our Code of Conduct:

- Be respectful and inclusive
- Welcome diverse perspectives
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other contributors

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Basic understanding of TypeScript
- Familiarity with multi-agent systems (helpful but not required)

### Fork & Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/openops-studio.git
cd openops-studio

# Add upstream remote
git remote add upstream https://github.com/openops/studio.git

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Edit .env with your configuration
```

### Verify Setup

```bash
# Run tests
npm test

# Try a boot sequence
npm run boot

# Start development server
npm run dev
```

---

## 💻 Development Workflow

### Branch Strategy

We use **Git Flow** with the following branches:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes
- `release/*` - Release preparation

### Creating a Feature Branch

```bash
# Update your local repository
git checkout develop
git pull upstream develop

# Create a feature branch
git checkout -b feature/my-awesome-feature

# Make your changes...

# Commit your changes
git add .
git commit -m "feat: add awesome feature"

# Push to your fork
git push origin feature/my-awesome-feature
```

---

## 📐 Coding Standards

### TypeScript Style Guide

We follow **strict TypeScript** practices:

```typescript
// ✅ Good
interface AgentConfig {
  id: string;
  role: AgentRole;
  personality: PersonalityProfile;
}

function createAgent(config: AgentConfig): Agent {
  return new Agent(config);
}

// ❌ Bad
function createAgent(config: any) {
  return new Agent(config);
}
```

### Naming Conventions

- **Files**: Use `PascalCase` for classes, `camelCase` for utilities
  - `SupervisorAgent.ts`
  - `agentHelpers.ts`

- **Modules**: Follow OpenOps convention
  - `{LayerCode}_{ModuleName}.{ext}`
  - Example: `02A_Agent_Roles_Config.json`

- **Variables**: 
  - `camelCase` for variables and functions
  - `PascalCase` for classes and types
  - `UPPER_SNAKE_CASE` for constants

```typescript
// Constants
const MAX_RETRY_ATTEMPTS = 3;

// Variables
let agentCount = 0;

// Functions
function processTask() {}

// Classes
class TaskProcessor {}

// Interfaces
interface TaskConfig {}
```

### Code Organization

```typescript
// 1. Imports (external first, then internal)
import { Logger } from 'winston';
import { AgentRole } from '@agents/02A_Agent_Roles_Config.json';

// 2. Types and Interfaces
interface TaskContext {
  id: string;
  priority: number;
}

// 3. Constants
const DEFAULT_TIMEOUT = 5000;

// 4. Class/Function Implementation
export class TaskManager {
  // Private properties first
  private logger: Logger;
  
  // Public properties
  public taskCount: number = 0;
  
  // Constructor
  constructor(logger: Logger) {
    this.logger = logger;
  }
  
  // Public methods
  public async executeTask(): Promise<void> {
    // Implementation
  }
  
  // Private methods
  private validateTask(): boolean {
    return true;
  }
}
```

---

## 📝 Commit Guidelines

We follow **Conventional Commits** specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD configuration changes

### Examples

```bash
# Feature
git commit -m "feat(agents): add personality compatibility scoring"

# Bug fix
git commit -m "fix(orchestration): resolve race condition in boot sequence"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Breaking change
git commit -m "feat(security)!: migrate to AWS KMS for key management

BREAKING CHANGE: Old encryption keys no longer supported"
```

---

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch** with latest changes:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout feature/my-feature
   git rebase develop
   ```

2. **Run tests** and ensure they pass:
   ```bash
   npm test
   npm run lint
   npm run format
   ```

3. **Update documentation** if needed

4. **Add tests** for new features

### PR Template

When creating a PR, use this template:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing

## Related Issues
Fixes #123
Related to #456
```

### Review Process

1. At least **2 approvals** required
2. All CI checks must pass
3. No merge conflicts
4. Documentation must be updated
5. Test coverage must not decrease

---

## 🆕 Adding New Modules

### Module Structure

Every module must follow this structure:

```json
{
  "module": {
    "name": "Module_Name",
    "version": "2.0.0",
    "layer": "layer_name",
    "code": "XXY",
    "description": "Module purpose"
  },
  "governance": {
    "owner": "Team/Individual",
    "approvers": ["approver1", "approver2"],
    "review_frequency": "quarterly"
  },
  "objectives": [
    "Primary objective",
    "Secondary objective"
  ],
  "integration_points": {
    "imports_from": ["other_modules"],
    "exports_to": ["dependent_modules"]
  },
  "security_rules": {
    "classification": "internal|confidential|restricted",
    "encryption_required": true,
    "access_control": "rbac"
  }
}
```

### Adding a New Layer

If adding a new layer (rare):

1. Create directory: `XX_layer_name/`
2. Add to boot sequence in `01_orchestration/runtime/index.ts`
3. Update [README.md](README.md) architecture diagram
4. Document integration points
5. Add to tsconfig paths

---

## 🧪 Testing Requirements

### Test Coverage

- **Minimum coverage**: 80%
- **Critical paths**: 95%

### Writing Tests

```typescript
// Example test structure
describe('SupervisorAgent', () => {
  let agent: SupervisorAgent;
  
  beforeEach(() => {
    agent = new SupervisorAgent({
      id: 'test-supervisor',
      role: AgentRole.SUPERVISOR
    });
  });
  
  describe('task assignment', () => {
    it('should assign tasks to available workers', async () => {
      const task = createMockTask();
      const result = await agent.assignTask(task);
      
      expect(result.success).toBe(true);
      expect(result.assignedTo).toBeDefined();
    });
    
    it('should queue tasks when no workers available', async () => {
      // Test implementation
    });
  });
});
```

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Specific file
npm test -- --testPathPattern=SupervisorAgent
```

---

## 📚 Documentation

### Code Comments

```typescript
/**
 * Assigns a task to an available worker agent.
 * 
 * @param task - The task to be assigned
 * @param priority - Task priority (0-10, default: 5)
 * @returns Assignment result with worker ID
 * @throws {NoWorkerAvailableError} When no workers are available
 * 
 * @example
 * ```typescript
 * const result = await supervisor.assignTask(task, 8);
 * console.log(`Assigned to worker: ${result.workerId}`);
 * ```
 */
async assignTask(task: Task, priority: number = 5): Promise<AssignmentResult> {
  // Implementation
}
```

### README Updates

When adding features, update:
- Main [README.md](README.md)
- Layer-specific documentation
- API documentation (if applicable)

---

## 🏆 Recognition

Contributors will be recognized in:
- [CONTRIBUTORS.md](CONTRIBUTORS.md)
- Release notes
- Community showcase

---

## 📞 Questions?

- **General questions**: [Discussions](https://github.com/openops/studio/discussions)
- **Bug reports**: [Issues](https://github.com/openops/studio/issues)
- **Security issues**: security@openops.ai
- **Community**: [Slack](https://openops.slack.com)

---

Thank you for contributing to OpenOps Studio! 🎉
