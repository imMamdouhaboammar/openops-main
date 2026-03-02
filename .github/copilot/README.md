# PixelForge Studio - GitHub Copilot Spec-Kit Agents

**Created**: January 11, 2026  
**Status**: Active  
**Integration**: GitHub Copilot Chat

---

## 🎯 Overview

GitHub Copilot Spec-Kit agents provide modal-based workflows for spec-driven development in PixelForge Studio. These agents mirror the Claude slash commands (`.claude/commands/speckit.*`) but are optimized for GitHub Copilot's agent system.

---

## 📋 Available Agents

### Core Workflow Agents

| Agent | File | Description | Handoffs |
|-------|------|-------------|----------|
| **SpecKit Specify** | `speckit-specify.md` | Create feature specification from natural language | → Plan, Clarify |
| **SpecKit Clarify** | `speckit-clarify.md` | Resolve specification ambiguities through targeted questions | → Plan, Specify |
| **SpecKit Plan** | `speckit-plan.md` | Create technical implementation plan | → Tasks, Checklist |
| **SpecKit Tasks** | `speckit-tasks.md` | Generate actionable task breakdown | → Implement, Analyze |
| **SpecKit Implement** | `speckit-implement.md` | Execute implementation by processing tasks | → Test, Review |
| **SpecKit Constitution** | `speckit-constitution.md` | Manage project governance principles | → Specify |

---

## 🚀 Usage

### In GitHub Copilot Chat

Invoke agents using the `@` mention syntax:

```
@speckit-specify Build a user authentication system with OAuth2
@speckit-plan Using Node.js and PostgreSQL
@speckit-tasks Focus on MVP scope
@speckit-implement Start with Phase 1
@speckit-clarify Focus on security requirements
@speckit-constitution Update file size limit principle
```

### Agent Discovery

GitHub Copilot auto-discovers agents from `.github/copilot/*.md` files. Agents appear in:
- Copilot Chat suggestions
- Agent picker (`@` menu)
- Handoff buttons (when context allows)

---

## 🔄 Workflow Progression

### Standard Flow

```
┌─────────────────────────────────────────────┐
│ 1. @speckit-constitution (optional)         │
│    └─ Establish project governance          │
├─────────────────────────────────────────────┤
│ 2. @speckit-specify                         │
│    └─ Describe WHAT to build               │
├─────────────────────────────────────────────┤
│ 3. @speckit-clarify (optional)              │
│    └─ Resolve ambiguities                  │
├─────────────────────────────────────────────┤
│ 4. @speckit-plan                            │
│    └─ Define HOW to build                  │
├─────────────────────────────────────────────┤
│ 5. @speckit-tasks                           │
│    └─ Break into actionable tasks          │
├─────────────────────────────────────────────┤
│ 6. @speckit-implement                       │
│    └─ Execute implementation                │
└─────────────────────────────────────────────┘
```

### Handoff Buttons

Each agent provides contextual handoffs:

**SpecKit Specify** →
- "Build Technical Plan" → `@speckit-plan`
- "Clarify Requirements" → `@speckit-clarify`
- "Open in Editor" → Agent (create untitled file)

**SpecKit Plan** →
- "Create Tasks" → `@speckit-tasks`
- "Create Checklist" → `@speckit-checklist`
- "Open in Editor" → Agent (create untitled file)

**SpecKit Tasks** →
- "Analyze Consistency" → `@speckit-analyze`
- "Implement Project" → `@speckit-implement`
- "Open in Editor" → Agent (create untitled file)

**SpecKit Implement** →
- "Run Tests" → Agent (run test suite)
- "Review Code" → Agent (quality review)

**SpecKit Clarify** →
- "Build Technical Plan" → `@speckit-plan`
- "Update Specification" → `@speckit-specify`

**SpecKit Constitution** →
- "Build Specification" → `@speckit-specify`
- "Open in Editor" → Agent (create untitled file)

---

## 🛠️ Agent Architecture

### Modal Structure

Each agent follows this structure:

```markdown
---
name: [Agent Name]
description: [Brief description]
argument-hint: [Input guidance]
tools: [List of MCP tools]
handoffs:
  - label: [Button text]
    agent: [Target agent]
    prompt: [Handoff prompt]
    send: true/false
---

[Agent instructions and workflow]
```

### Key Components

1. **Frontmatter**:
   - Name: Display name in Copilot
   - Description: Tooltip/help text
   - Argument-hint: Input placeholder
   - Tools: MCP tools agent can use
   - Handoffs: Navigation to other agents

2. **Workflow Sections**:
   - `<stopping_rules>`: When to halt
   - `<workflow>`: Step-by-step process
   - `<style_guide>`: Formatting rules
   - `<anti_patterns>`: What to avoid

3. **Special Cases**:
   - Error handling
   - Edge cases
   - Validation failures

---

## 📂 File Organization

```
.github/copilot/
├── speckit-specify.md          # Specification creation
├── speckit-clarify.md          # Ambiguity resolution
├── speckit-plan.md             # Technical planning
├── speckit-tasks.md            # Task generation
├── speckit-implement.md        # Implementation execution
├── speckit-constitution.md     # Governance management
└── README.md                   # This file
```

---

## 🔄 Synchronization with Claude Commands

These agents mirror `.claude/commands/speckit.*` commands:

| Claude Command | Copilot Agent | Status |
|----------------|---------------|--------|
| `/speckit.specify` | `@speckit-specify` | ✅ Synced |
| `/speckit.clarify` | `@speckit-clarify` | ✅ Synced |
| `/speckit.plan` | `@speckit-plan` | ✅ Synced |
| `/speckit.tasks` | `@speckit-tasks` | ✅ Synced |
| `/speckit.implement` | `@speckit-implement` | ✅ Synced |
| `/speckit.constitution` | `@speckit-constitution` | ✅ Synced |

**Sync Process**:
1. Update source in `.claude/commands/`
2. Port to `.github/copilot/` with Copilot-specific syntax
3. Test handoffs and tool usage
4. Document any divergences

---

## 🎯 Best Practices

### For Users

1. **Start with Constitution** (first time):
   ```
   @speckit-constitution Review project governance
   ```

2. **Specify Before Planning**:
   ```
   @speckit-specify Build user dashboard with analytics
   ```

3. **Clarify Ambiguities**:
   ```
   @speckit-clarify Focus on authentication strategy
   ```

4. **Plan with Context**:
   ```
   @speckit-plan Using React 19 and Supabase
   ```

5. **Generate Tasks**:
   ```
   @speckit-tasks MVP scope only
   ```

6. **Implement Incrementally**:
   ```
   @speckit-implement Start with Phase 1 (Setup)
   ```

### For Agent Developers

1. **Keep Agents Focused**:
   - Single responsibility
   - Clear stopping rules
   - Well-defined handoffs

2. **Provide Context**:
   - Argument hints
   - Usage examples
   - Expected outcomes

3. **Enable Discovery**:
   - Descriptive names
   - Clear descriptions
   - Relevant tools listed

4. **Test Handoffs**:
   - Verify agent transitions
   - Check context passing
   - Validate tool access

---

## 🔍 Troubleshooting

### Agent Not Appearing

**Symptoms**: Can't find agent in `@` menu

**Solutions**:
1. Check file in `.github/copilot/`
2. Verify frontmatter syntax
3. Reload VS Code window
4. Check Copilot extension version

### Handoff Not Working

**Symptoms**: Button doesn't navigate

**Solutions**:
1. Verify target agent name correct
2. Check `agent:` field spelling
3. Ensure target agent exists
4. Test with `send: true`

### Tools Not Available

**Symptoms**: Agent can't access tools

**Solutions**:
1. Check `tools:` list in frontmatter
2. Verify MCP server running
3. Check tool permissions
4. Review Copilot logs

### Script Execution Fails

**Symptoms**: Bash scripts return errors

**Solutions**:
1. Use absolute paths
2. Check file permissions (`chmod +x`)
3. Verify JSON parsing
4. Test script independently

---

## 📊 Metrics & Analytics

### Agent Usage Tracking

Track which agents are most used:
- Specify: Entry point (highest usage)
- Plan: Technical design
- Tasks: Breakdown
- Implement: Execution
- Clarify: Refinement (lower usage)
- Constitution: Setup (rare)

### Success Metrics

- **Spec → Plan**: % that proceed from specify to plan
- **Plan → Tasks**: % that complete planning
- **Tasks → Implement**: % that execute tasks
- **Implementation Complete**: % that finish all phases

---

## 🚧 Future Enhancements

### Planned Additions

1. **SpecKit Analyze**:
   - Cross-artifact consistency check
   - Detects conflicting requirements

2. **SpecKit Checklist**:
   - Quality validation checklists
   - Domain-specific checks

3. **SpecKit TasksToIssues**:
   - Convert tasks.md to GitHub Issues
   - Link to feature branch

4. **SpecKit Review**:
   - Code review against spec
   - Constitution compliance check

### Integration Ideas

1. **GitHub Actions**:
   - Auto-run agents on PR creation
   - Validate spec compliance

2. **Branch Protection**:
   - Require spec before PR
   - Enforce constitution checks

3. **VS Code Extension**:
   - Dedicated Spec-Kit panel
   - Visual workflow progress

---

## 📝 Maintenance

### Regular Updates

**Monthly**:
- Sync with Claude commands
- Update documentation
- Test handoffs

**Quarterly**:
- Review agent effectiveness
- Gather user feedback
- Optimize workflows

**Yearly**:
- Architecture review
- Tool compatibility check
- Performance audit

### Version Control

Track agent versions:
```markdown
<!-- Agent Version: 1.2.0 -->
<!-- Last Updated: 2026-01-11 -->
<!-- Synced with: .claude/commands/speckit.specify.md v1.2.0 -->
```

---

## 📞 Resources

- **GitHub Copilot Docs**: https://docs.github.com/copilot
- **PixelForge Constitution**: `.specify/memory/constitution.md`
- **Spec-Kit Guide**: `SPEC-KIT-GUIDE.md`
- **Claude Commands**: `.claude/commands/speckit.*.md`

---

**Happy spec-driven developing with GitHub Copilot! 🚀**
