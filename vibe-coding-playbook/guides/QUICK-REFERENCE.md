# Quick Reference: Vibe Coding Checklist

**Use this checklist for every project you build with AI coding agents.**

---

## ✅ Pre-Project (1 hour)

- [ ] **Problem statement** — Write 1 paragraph (why does this exist?)
- [ ] **Success metrics** — Define 3–5 measurable metrics (not vanity)
- [ ] **Target users** — Who is this for? (be specific)
- [ ] **MVP scope** — List 5–10 must-haves (be ruthless about scope)
- [ ] **Kill criteria** — When do we stop investing? (be honest)

**Deliverable:** Locked PRD (300+ words)

---

## ✅ Pre-Coding (2 hours)

### Agent Setup

- [ ] **agent.md** — Write AI constitution (security, style, principles)
- [ ] **structure.md** — Define folder layout + tech stack
- [ ] **API contracts** — Document at least 2 main endpoints (input/output)

### Specs

- [ ] **Create `/spec-kit/` folder** — One file per feature/module
- [ ] **Batch related specs** — Group features that should be built together
- [ ] **Each spec includes:**
  - Goal (1 sentence)
  - Input/output examples (with JSON)
  - Constraints (security, performance, accessibility)
  - Error cases (all expected failures)
  - Testing requirements

**Deliverable:** 3–5 detailed specs (100–300 words each)

---

## ✅ During Coding (Per Feature)

### Generation

- [ ] **Copy spec to AI tool** — Paste full spec into Cursor/ChatGPT
- [ ] **Include agent.md** — Remind AI of your principles
- [ ] **Request specific output** — "Generate `components/TaskCard.tsx`"
- [ ] **One feature per prompt** — Avoid mega-prompts

### Validation

- [ ] **Code runs** — No syntax errors
- [ ] **Follows agent.md** — Consistent style, no hardcoded secrets
- [ ] **Matches spec** — Output matches input/output examples
- [ ] **No console.log()** — Production-clean
- [ ] **TypeScript strict** — Zero any types

### Refinement (Edit, Don't Regenerate)

- [ ] **Small changes** — Edit inline (3–5 lines max)
- [ ] **Avoid full regenerations** — Costs 3x tokens
- [ ] **Document changes** — Note what you changed and why

---

## ✅ Post-Feature (Before Shipping)

### Security

- [ ] **No hardcoded secrets** — Check for API_KEY, password, token
- [ ] **Environment variables** — All secrets in .env
- [ ] **Input validation** — Every user input checked server-side
- [ ] **SQL injection** — Using parameterized queries (Prisma, not string concat)
- [ ] **npm audit** — Zero critical vulnerabilities

### Performance

- [ ] **Load time** — <2 seconds on 3G
- [ ] **API response** — <500ms per endpoint
- [ ] **Bundle size** — <200kb gzipped (frontend)
- [ ] **Lighthouse** — >90 score (desktop + mobile)

### Quality

- [ ] **ESLint** — Zero warnings
- [ ] **TypeScript** — Zero errors (strict mode)
- [ ] **Tests** — >80% coverage
- [ ] **No unused code** — Delete dead code

### Accessibility

- [ ] **WCAG 2.1 AA** — Minimum standard
- [ ] **Keyboard nav** — Tab through entire UI
- [ ] **Screen reader** — Test with VoiceOver/NVDA
- [ ] **Color contrast** — 4.5:1 minimum

---

## ✅ Pre-Ship (Final Check)

Run this checklist 30 minutes before deploying:

```bash
# Build & test
npm run build
npm run test
npm run type-check
npm run lint

# Security
npm audit
# (Manual check) grep -r "API_KEY\|password\|SECRET" src/

# Performance
npm run analyze-bundle
# (Check Lighthouse) npm run lighthouse

# Documentation
# [ ] README.md updated
# [ ] API docs current
# [ ] Setup guide works
```

---

## 🧠 Model Selection Quick Pick

| Task | Model | Cost | Speed |
|------|-------|------|-------|
| **PRD review** | Claude Sonnet | $ | 📍 |
| **Architecture** | GPT-5-Preview | $$$ | 📍 |
| **Code gen** | GPT-5 | $$$ | ⚡ |
| **DB schema** | Gemini 2.5 | $ | ⚡⚡ |
| **Testing** | GPT-5-Turbo | $$ | ⚡⚡ |

**Rule:** Start cheap (Gemini), upgrade to expensive (GPT-5) if you need more reasoning.

---

## 💰 Token Budget Template

For a typical project (React app + API):

| Phase | Est. Tokens | Target Cost |
|-------|------------|-------------|
| Planning | 2,000 | $0.30 |
| Specs | 0 (you write) | $0 |
| Generation | 8,000 | $1.20 |
| Tests | 2,000 | $0.30 |
| Edits | 1,000 | $0.15 |
| **TOTAL** | **13,000** | **$2.00** |

**Pro tip:** Detailed specs reduce token waste by 60–70%.

---

## 🚫 Common Mistakes

❌ **"Build me an app"** → Too vague, AI guesses wrong  
✅ **Use spec:** `spec-kit/01-auth.md` with input/output examples

❌ **Generating entire files repeatedly** → Wastes 3k tokens each time  
✅ **Edit in place:** Change 2 lines, don't regenerate

❌ **Mixing features in one prompt** → Confusing, messy output  
✅ **One spec = one feature** → Clean, focused code

❌ **Skipping agent.md** → Inconsistent code, redo work  
✅ **Feed agent.md first** → Consistent quality

❌ **Testing after launch** → Bugs in production  
✅ **Gen tests with specs** → Catch issues early

---

## 📋 Project Template (Copy This)

```
my-project/
├── agent.md ...................... AI rules
├── structure.md .................. Tech stack
├── README.md ..................... Human guide
├── .env.example .................. Secrets template
├── spec-kit/
│   ├── 01-database.md
│   ├── 02-auth.md
│   ├── 03-api-tasks.md
│   ├── 04-ui-components.md
│   └── 05-tests.md
├── src/
│   ├── (frontend or backend code)
└── tests/
    └── (test files)
```

**Initialize new project:**
```bash
mkdir my-project
cd my-project
cp /path/to/templates/agent.md .
cp /path/to/templates/structure.md .
mkdir spec-kit tests src
git init
```

---

## 🎯 Success = 3 Things

1. **Spec before code** — Clear specs = less waste
2. **Edit, don't regenerate** — Inline edits save tokens
3. **Validate constantly** — Test gates catch 80% of issues

**Follow these 3 + you'll ship faster, cheaper, with fewer bugs.**

---

## 📚 Learn More

See main README.md for full chapters:
- [What & Why of Vibe Coding](../README.md#1-what--why-of-vibe-coding)
- [Pre-Coding Rules](../README.md#5-pre-coding-rules-ai-agent-feeding)
- [Saving Tokens — SSD & Spec-Kit](../README.md#8-saving-tokens--ssd--spec-kit-method)
- [Case Studies](../examples/)

---

**Print this page. Use it for every project. Refine over time. Ship faster.** 🚀
