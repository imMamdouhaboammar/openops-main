# Contributing to Test-Kit

Thank you for your interest in contributing to Test-Kit!

## Development Setup

### Prerequisites
- Node.js v18+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/[your-org]/test-kit.git
cd test-kit

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode
npm run dev
```

## Development Workflow

### 1. Code Style

We use Prettier and ESLint for code quality:

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### 2. Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

### 3. Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the code style

3. Format and lint:
   ```bash
   npm run format
   npm run lint:fix
   ```

4. Test your changes:
   ```bash
   npm run test
   ```

5. Commit with clear messages:
   ```bash
   git commit -m "feat: add your feature"
   ```

6. Push to your fork and create a Pull Request

## Architecture Guidelines

### Adding a New Command

1. Create handler in `src/commands/yourCommand.ts`
2. Create core logic in `src/core/yourFunction.ts`
3. Register in `bin/test-kit.ts`
4. Add documentation in README.md

### Adding a New Utility

1. Create in `src/utils/yourUtil.ts`
2. Export from utilities barrel file
3. Add tests in `__tests__/utils/`

### Adding a New Agent

1. Create in `src/core/agentName.ts` or `src/agents/`
2. Register in `src/agents/registry.ts`
3. Document in `docs/AGENTS_BLUEPRINT.md`

## Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `test:` Test changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `chore:` Build/dependency changes

Example:
```
feat: add support for Jest test runner
fix: resolve memory leak in event logger
docs: update API documentation
test: add integration tests for scaffold command
```

## Pull Request Process

1. Ensure all tests pass: `npm run test`
2. Ensure code is formatted: `npm run format`
3. Ensure linting passes: `npm run lint`
4. Update README if adding features
5. Add your changes to CHANGELOG.md
6. Request review from maintainers

## Reporting Bugs

When reporting bugs, please include:

1. Environment (OS, Node version, npm version)
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Error logs/screenshots

## Feature Requests

For new features:

1. Describe the use case
2. Explain the expected behavior
3. Provide examples if possible
4. Consider impact on existing features

## Questions?

Feel free to open an issue or discussion on GitHub.

---

**Code of Conduct**: Be respectful and inclusive. We are committed to providing a welcoming environment for all contributors.

Thank you for making Test-Kit better! 🚀
