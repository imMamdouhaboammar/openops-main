# Contributing to StrategIQ OS

First off, thank you for considering contributing to StrategIQ OS! 🎉

This document provides guidelines for contributing to this project. Following these guidelines helps maintain code quality and ensures smooth collaboration.

---

## 🌟 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Module Development](#module-development)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Pledge

- **Respect**: Treat all contributors with respect
- **Cultural Sensitivity**: Honor Saudi Arabian cultural values
- **Professional**: Maintain professional communication
- **Collaborative**: Work together toward common goals

### Our Standards

✅ **Expected Behavior**:
- Use welcoming and inclusive language
- Respect differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards other contributors

❌ **Unacceptable Behavior**:
- Harassment or discriminatory language
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information
- Any unprofessional conduct

---

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports:
1. Check existing issues to avoid duplicates
2. Gather relevant system information
3. Document steps to reproduce

**Bug Report Template**:
```markdown
**Describe the Bug**
Clear description of what went wrong

**To Reproduce**
Steps to reproduce the behavior:
1. Activate module '...'
2. Input data '...'
3. Run process '...'
4. See error

**Expected Behavior**
What you expected to happen

**Actual Behavior**
What actually happened

**System Context**
- StrategIQ OS Version:
- Module:
- Market Focus:

**Additional Context**
Any other relevant information
```

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome!

**Enhancement Template**:
```markdown
**Feature Description**
Clear description of the proposed feature

**Use Case**
Explain the problem this solves

**Proposed Solution**
How you envision this working

**Alternatives Considered**
Other approaches you've thought about

**Market Impact**
How this benefits Saudi market strategies
```

### 📝 Documentation Improvements

- Fix typos or unclear explanations
- Add examples or use cases
- Improve guides or tutorials
- Translate content (Arabic/English)

### 🔧 Code Contributions

See [Development Workflow](#development-workflow) below

---

## 🔄 Development Workflow

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/strategiq-os.git
cd strategiq-os
```

### 2. Create a Branch

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 3. Make Changes

- Follow the [Style Guidelines](#style-guidelines)
- Test your changes thoroughly
- Update documentation as needed

### 4. Commit Changes

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add client profiling engine"
```

See [Commit Messages](#commit-messages) for conventions

### 5. Push & Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

**Pull Request Template**:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] All tests passing
- [ ] No breaking changes

## Testing
How you tested the changes

## Related Issues
Fixes #(issue number)
```

---

## 📐 Style Guidelines

### File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| JSON Config | `0XA_ModuleName.json` | `05A_StrategIQ_CRE.json` |
| Guide/Framework | `0XB_ModuleName.md` | `06B_Clarity_Framework.md` |
| Runtime Logic | `0XC_ModuleName.pseudo` | `05C_CRE_Runtime.pseudo` |
| Process Map | `0XD_ModuleName.yml` | `05D_CRE_ProcessMap.yml` |

### Code Structure

#### JSON Files
```json
{
  "system_name": "Module Name",
  "version": "1.0.0",
  "author": "OpenOps Studio",
  "description": "Clear description",
  "configuration": {
    // Config here
  }
}
```

#### Markdown Files
```markdown
# Module Name
Version: 1.0.0
Author: StrategIQ OS by OpenOps Studio

## Purpose
Clear statement of purpose

## Components
Detailed breakdown

## Usage
How to use this module
```

#### YAML Files
```yaml
system: Module Name
version: 1.0.0
author: OpenOps Studio

workflow:
  - step: Description
    action: What happens
```

### Language Standards

- **English**: Primary documentation language
- **Arabic**: Market-specific content where appropriate
- **Bilingual**: Key strategic documents

### Cultural Considerations

- Respect Islamic values
- Use appropriate Saudi context
- Follow Vision 2030 alignment
- Honor cultural sensitivities

---

## 💬 Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(cre): add competitor sentiment analysis

Implemented sentiment analysis for competitor 
brand perception tracking in Saudi market.

Closes #123
```

```bash
fix(clarity): resolve core question filtering bug

Fixed issue where noise calculation was including
relevant strategic content.

Fixes #45
```

```bash
docs(readme): add Hajj ecosystem examples

Added practical examples for Hajj & Umrah 
service provider analysis.
```

---

## 🧩 Module Development

### Creating New Modules

When adding new system modules:

#### 1. Define Module Purpose
```markdown
## Module: [Name]
**Purpose**: One-line description
**Target Use Case**: Specific scenario
**Output**: What it produces
```

#### 2. Create Module Files

Required files:
- `0XA_ModuleName.json` - Configuration
- `0XB_ModuleName_Guide.md` - Documentation
- `0XC_ModuleName_Runtime.pseudo` - Logic
- `0XD_ModuleName_ProcessMap.yml` - Workflow

#### 3. Integration Points

Document how module integrates:
- Input requirements
- Output formats
- Dependencies on other modules
- Data flow

#### 4. Saudi Market Context

Include:
- Cultural considerations
- Regulatory compliance
- Market-specific features
- Hajj/Umrah relevance (if applicable)

### Module Structure Template

```json
{
  "module_id": "XX_module_name",
  "version": "1.0.0",
  "author": "OpenOps Studio",
  "created_by": "Mamdouh Aboammar",
  "market_focus": "Saudi Arabia",
  
  "description": {
    "purpose": "Clear purpose statement",
    "use_case": "Primary use case",
    "output": "Expected output"
  },
  
  "activation_triggers": [
    "condition_1",
    "condition_2"
  ],
  
  "configuration": {
    // Module config
  },
  
  "integration": {
    "inputs": [],
    "outputs": [],
    "dependencies": []
  }
}
```

---

## 🧪 Testing Guidelines

### Testing Checklist

- [ ] **Logic Testing**: Module logic works correctly
- [ ] **Integration Testing**: Works with other modules
- [ ] **Data Validation**: Handles edge cases
- [ ] **Output Quality**: Produces expected results
- [ ] **Performance**: Executes efficiently
- [ ] **Cultural Appropriateness**: Saudi market fit

### Test Scenarios

Create test cases covering:
1. **Happy Path**: Standard usage
2. **Edge Cases**: Unusual inputs
3. **Error Handling**: Invalid data
4. **Integration**: Module interactions
5. **Market Context**: Saudi-specific scenarios

---

## 📚 Documentation

### Documentation Requirements

All contributions should include:

1. **Code Comments**: Explain complex logic
2. **Module Guide**: How to use the module
3. **Examples**: Real-world use cases
4. **Integration Notes**: How it fits in system

### Documentation Style

- **Clear**: Simple, direct language
- **Comprehensive**: Cover all aspects
- **Practical**: Include examples
- **Bilingual**: Key points in Arabic when relevant

### Example Documentation

```markdown
## Module: Client Profiling Engine

### Purpose
Automatically analyze client behavior and generate
personalized strategic recommendations.

### Usage
\`\`\`
Input: Client data + market context
Process: Behavioral analysis + pattern matching
Output: Strategic profile + recommendations
\`\`\`

### Example (Hajj Services)
\`\`\`json
{
  "client": "Umrah Travel Agency",
  "market": "Saudi Arabia",
  "focus": "Digital transformation",
  "output": "Growth strategy + tech roadmap"
}
\`\`\`
```

---

## 🏆 Recognition

Contributors will be recognized in:
- Project contributors list
- Release notes
- Documentation credits

---

## 📞 Questions?

- **Email**: Via LinkedIn profile
- **LinkedIn**: [Mamdouh Aboammar](https://www.linkedin.com/in/mamdouh-aboammar)
- **Issues**: GitHub Issues for technical questions

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same terms as the project.

---

**Thank you for contributing to StrategIQ OS!** 🚀

Together, we're building the future of strategic marketing intelligence for the Saudi market.

---

**Maintained by**: OpenOps Studio  
**Created by**: Mamdouh Aboammar
