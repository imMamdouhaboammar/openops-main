# 📘 The Vibe Coding Playbook

> **Practical AI Coding for Non-Coders**  
> A field guide to building confidently with AI — by thinking like a system architect.

![AI-powered](https://img.shields.io/badge/AI%20Coding-Practical-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Version](https://img.shields.io/badge/version-1.0-yellow) ![OpenOps](https://img.shields.io/badge/OpenOps-Compliant-success)

---

## 📖 Table of Contents

1. [What & Why of Vibe Coding](#1-what--why-of-vibe-coding)
2. [Vibe Coding as a Non-Coder](#2-vibe-coding-as-a-non-coder)
3. [No-Code vs Low-Code vs Vibe-Code](#3-no-code-vs-low-code-vs-vibe-code)
4. [The Career Path](#4-the-career-path)
5. [Pre-Coding Rules](#5-pre-coding-rules-ai-agent-feeding)
6. [Designing a PRD Before Coding](#6-designing-a-prd-before-coding)
7. [Using AI Models for Planning](#7-using-ai-models-for-planning)
8. [Saving Tokens — SSD & Spec-Kit](#8-saving-tokens--ssd--spec-kit-method)
9. [Preparing a Project Before Coding](#9-preparing-a-project-before-coding)
10. [Validation & QA Gates](#10-validation--qa-gates)
11. [Publishing & Shipping](#11-publishing--shipping)

---

## 1. What & Why of Vibe Coding

### The Problem You're Solving

You're not a traditional coder, but you **have ideas**, **understand problems**, and want to **ship software without waiting for developers**.

Traditional paths:
- ❌ No-code tools lock you into templates
- ❌ Hiring developers = slow, expensive, dependency
- ❌ Learning to code = 6+ months to competency

**Vibe Coding** is the third way.

### What is Vibe Coding?

**Vibe Coding** = communicating product intent to AI coding agents through structured design, clear constraints, and iterative validation — not typing random prompts hoping for code.

```
Old Way (Prompting):
  "Build me a login page"
  → AI guesses & hallucinates
  → Broken code, security issues

Vibe Coding Way:
  1. Define intent (PRD)
  2. Feed agent rules (agent.md)
  3. Request specific module (spec.md)
  4. Validate & iterate
  → Production-ready code
```

### Why This Works

✅ **You maintain control** — You design; AI implements.  
✅ **Faster iteration** — Design once, generate variations instantly.  
✅ **Lower token waste** — Structured specs = fewer regenerations.  
✅ **Career acceleration** — Learn system thinking, not syntax.  
✅ **Democratizes software** — Ideas → Product without gatekeepers.

### Validation Checklist

- [ ] Can you describe Vibe Coding in your own words?
- [ ] Do you understand the difference between "prompting for code" and "vibe coding"?
- [ ] Can you name one benefit that matters most to your use case?

---

## 2. Vibe Coding as a Non-Coder

### Required Tools

**IDE + AI Integration:**
- **[Cursor](https://cursor.sh)** — Best all-in-one (Recommended)
- **[VS Code](https://code.visualstudio.com) + GitHub Copilot** — Free tier works
- **[Bolt.new](https://bolt.new)** — Browser-based, instant projects
- **[Replit](https://replit.com)** — No setup required

**Supporting Tools:**
- **Git Client** — [GitHub Desktop](https://desktop.github.com) or command-line
- **API Testing** — [Postman](https://postman.com) or [Insomnia](https://insomnia.rest)
- **Database Viewer** — [DBeaver](https://dbeaver.io) or cloud provider UI

### What You Need to Know (NOT Memorize)

| Skill | Why | Where to Learn |
|-------|-----|---|
| Basic Unix commands | Navigate file system | FreeCodeCamp "Linux for Beginners" (1 hr) |
| What JSON is | Read configs | JSON official docs (15 min) |
| REST API concepts | Understand how systems talk | "REST API Explained" YouTube (10 min) |
| Database basics | Know why data matters | Khan Academy SQL intro (30 min) |
| Version control (Git) | Track changes, collaborate | GitHub "Hello World" guide (15 min) |

**Total ramp-up: ~2 hours of learning.**

### The Mental Model

Think like an **architect**, not a **coder**:

```
Coder thinks: "How do I write this function?"
Architect thinks: "What is the system doing? Who uses it? What can break?"

Vibe Coder thinks: "I'll tell the AI architect-thoughts, it does the syntax."
```

### Learning Sources (Curated)

**Free:**
- FreeCodeCamp (YouTube)
- OpenAI documentation
- GitHub Guides & Tutorials
- MDN Web Docs (for web concepts)

**Paid (optional):**
- Scrimba "Learn to Code" courses (interactive)
- Coursera "Structuring Machine Learning Projects" (PM perspective)

### Validation Checklist

- [ ] You have Cursor or equivalent installed
- [ ] You can open a terminal and list files (`ls`)
- [ ] You can read a JSON file and understand its structure
- [ ] You've watched at least one "REST API explained" video

---

## 3. No-Code vs Low-Code vs Vibe-Code

### Quick Comparison

| Dimension | No-Code | Low-Code | Vibe-Code |
|-----------|---------|----------|-----------|
| **Control** | Visual only | Limited scripting | Full logic via AI |
| **Flexibility** | Template-bound | Pre-built blocks | Infinite |
| **Speed (MVP)** | ⚡⚡⚡ Fastest | ⚡⚡ Medium | ⚡⚡ Fast |
| **Speed (Scale)** | ❌ Hits ceiling | ⚠️ Limited growth | ✅ Unlimited |
| **Customization** | ❌ Hard | ⚠️ Scripting | ✅ Full control |
| **Cost to scale** | $ → $$ → Expensive | $ → $$ → Custom dev | $ → $$ → Dev as needed |
| **Best for** | Workflows, dashboards | Internal tools, forms | Products, platforms |
| **Security risk** | Medium (vendor lock-in) | Medium (platform limits) | Low (your code, your control) |

### When to Use Each

**Use No-Code if:**
- You need a workflow automated (Zapier, Make, IFTTT)
- You're building an internal dashboard (Retool, Budibase)
- Speed >> customization
- You don't care about vendor lock-in

**Use Low-Code if:**
- You have a small team and need fast iteration
- The pre-built blocks cover 80% of your needs
- You accept some platform constraints

**Use Vibe-Code if:**
- You're building a product for customers
- You need competitive moat (differentiation)
- You want to own the code, not the platform
- You're learning system architecture

### Real-World Example

**Building a "Tasks App":**

| Approach | Time | Cost | Quality | Control |
|----------|------|------|---------|---------|
| No-code | 1 day | $0–20 | Mediocre | None |
| Low-code | 3 days | $50–200 | Good | Limited |
| Vibe-code | 2 days | $0–100 (AI credits) | Excellent | Full |

**Winner**: Vibe-code wins on time + control (and it's free if using free AI models).

### Validation Checklist

- [ ] You can explain why Vibe-Code is different from No-Code
- [ ] You understand when NOT to use Vibe-Code
- [ ] You know which approach fits your next project

---

## 4. The Career Path

### Why Vibe Coding ≠ Replacing Developers

This is **critical**: Vibe Coding is not about **replacing true engineers**. It's about:

✅ Enabling PMs, designers, and founders to **think like architects**  
✅ Reducing context-switching between idea and implementation  
✅ Building **collaboration skills** with AI + humans  
✅ Learning **systems thinking** (the real skill)

### Unlocked Career Paths

```
Vibe Coder → Career Options:

┌─────────────────────────────────────────┐
│   System Architect                      │
│   - Design complex systems              │
│   - Coordinate AI + human engineers     │
│   - Command 150k–250k+ salary           │
└─────────────────────────────────────────┘
          ↑ (2-3 years)

┌─────────────────────────────────────────┐
│   Staff PM / Tech PM                    │
│   - Product + technical depth           │
│   - Lead cross-functional teams         │
│   - Command 180k–300k+ salary           │
└─────────────────────────────────────────┘
          ↑ (2-3 years)

┌─────────────────────────────────────────┐
│   Product Architect                     │
│   - Design products systemically        │
│   - Translate vision into specs         │
│   - Command 160k–280k+ salary           │
└─────────────────────────────────────────┘
          ↑ (1-2 years)

┌─────────────────────────────────────────┐
│   UX Technologist                       │
│   - Bridge design & engineering         │
│   - Build design systems                │
│   - Command 140k–250k+ salary           │
└─────────────────────────────────────────┘
          ↑ (1-2 years)

START HERE:
┌─────────────────────────────────────────┐
│   Vibe Coder (You, learning phase)      │
│   - Build prototypes                    │
│   - Learn systems thinking              │
│   - Ship ideas fast                     │
└─────────────────────────────────────────┘
```

### The Real Skill: Systems Thinking

What employers actually want from you:

1. **Problem decomposition** — Break big problems into modules
2. **API design** — Think about contracts, not implementation
3. **Data modeling** — Understand what data flows where
4. **Trade-off analysis** — Recognize cost vs. speed vs. quality
5. **Collaboration** — Work with engineers, not against them

**Vibe Coding teaches all of these.**

### Validation Checklist

- [ ] You understand Vibe Coding as a **skill path**, not a replacement
- [ ] You can name two career options that interest you
- [ ] You're clear on the systems thinking skill as the real prize

---

## 5. Pre-Coding Rules (AI Agent Feeding)

### Why This Matters

Before you tell your AI agent "build me X," it needs **rules**. Without them:

❌ Generated code has security holes  
❌ Components don't talk to each other  
❌ You get random decisions (styles, patterns, naming)  
❌ Lots of wasted tokens regenerating

**With rules:**
✅ Consistent, production-ready output  
✅ Fewer regenerations = lower token cost  
✅ Security + privacy built-in  
✅ Code that scales

### Rule 1: Product Rules (`agent.md`)

Before coding, create an `agent.md` file that tells your AI agent what your product IS:

```markdown
# agent.md

## Product Identity
**Name:** TaskFlow  
**Pitch:** Real-time task collaboration for remote teams  
**Core Job:** Help teams stay aligned on priorities  

## Architecture
- Frontend: React 19 + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL
- Hosting: Vercel + Render

## Must-Have Principles
1. **Privacy-by-default** - No data tracking without explicit consent
2. **Real-time-first** - All updates must propagate <500ms
3. **Offline-capable** - App works without internet (sync on reconnect)
4. **Dark mode included** - Every UI must support light/dark
5. **Accessible always** - WCAG 2.1 AA minimum

## Forbidden Patterns
- ❌ No hardcoded API keys in code
- ❌ No console.log() in production
- ❌ No direct window manipulation
- ❌ No external CDN dependencies

## Code Style
- Naming: camelCase for vars/functions, PascalCase for components
- Imports: Use absolute paths (@/)
- Error handling: Never silent failures
- Testing: 80%+ coverage target

## Success Metrics
- Load time: <2s on 3G
- Mobile usability: >90 Lighthouse score
- Security: Zero leaked secrets
```

**Why this works:** The AI agent now has a **constitution** to follow.

### Rule 2: Security Rules

Embed these in every request:

```
🔒 SECURITY CHECKLIST

Before generating ANY code:
- [ ] No hardcoded credentials
- [ ] Environment variables for secrets
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (use parameterized queries)
- [ ] CORS headers explicitly set
- [ ] Rate limiting on public endpoints
- [ ] Error messages don't leak system info
```

### Rule 3: Data Rules

Tell the AI what data you're handling:

```
📊 DATA MODEL RULES

User Data:
- Name, email, password (hash only, never store plaintext)
- Timezone, preferences (encrypted)
- Deletion: Cascade deletes all user tasks

Tasks:
- Title, description, due date, assignee
- Sensitive: Mark if contains PII
- Retention: Delete 30 days after completion unless archived

Audit Log:
- Every action logged: who, what, when
- Never delete for compliance
```

### Rule 4: API Rules

```
🔗 API CONTRACT RULES

Every endpoint must have:
- Authentication (JWT or OAuth)
- Rate limiting (100 req/min per user)
- Error codes (not raw errors)
- Response schema (strict)

Example:
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "title": "string",
  "assignee_id": "uuid",
  "due_date": "ISO 8601"
}

Response (200):
{
  "id": "uuid",
  "created_at": "ISO 8601",
  "status": "created"
}

Response (400, 401, 422, 500): Always include error code + message
```

### Creating Your agent.md

**Minimal template:**

See `/templates/agent.md` for a full boilerplate. Fill in:
1. Your product name & pitch
2. Tech stack
3. 3–5 core principles (privacy, speed, accessibility)
4. Forbidden patterns
5. Code style

### Validation Checklist

- [ ] agent.md exists and is 250+ words
- [ ] Security rules are explicit (no assumptions)
- [ ] Data model is documented
- [ ] API contracts defined (at least 2 endpoints)

---

## 6. Designing a PRD Before Coding

### Why PRD-First Matters

**PRD (Product Requirements Document) = Single source of truth**

When you skip it:
- AI agent makes assumptions → wrong features
- You waste tokens regenerating
- Scope creeps infinitely
- You don't know when you're done

### PRD Structure (Simplified for Vibe Coding)

Use this lightweight template:

```markdown
# TaskFlow PRD

## 1. Problem Statement
**Current state:** Teams use 5+ tools to track tasks (email, Slack, Google Docs, Notion, Spreadsheets)
**Friction:** Lost context, duplicated work, no single source of truth
**Opportunity:** One place for task alignment + real-time collaboration

## 2. Target User
**Primary:** Remote engineering managers (100k+ companies)
**Secondary:** Freelance teams (2–10 people)
**Not for:** Solo solopreneurs (no team)

## 3. Success Metrics
- Time to assign task: <30 seconds
- Mobile completion rate: >40%
- User retention: >70% (30-day)
- NPS: >40

## 4. Jobs To Be Done
1. "When a deadline is looming, I want quick task reassignment, so I can keep momentum"
2. "When I'm on mobile, I want to update task status offline, so I don't need WiFi"
3. "When onboarding a new team member, I want instant access to all tasks, so they're immediately productive"

## 5. Must-Have Scope (MVP)
- [x] Create, read, update, delete tasks
- [x] Assign tasks to team members
- [x] Real-time status updates
- [x] Comment on tasks
- [x] Mobile view (responsive)
- [x] Dark mode

## 6. Nice-to-Have (Post-MVP)
- [ ] Recurring tasks
- [ ] Task templates
- [ ] Analytics dashboard
- [ ] Slack integration
- [ ] Zapier integration

## 7. Kill Criteria (When We Stop)
- User retention drops below 50%
- Cost to serve exceeds revenue
- Competitors have 2x our features
- No releases in 3 months

## 8. Constraints
- Budget: $5k/month for hosting + AI credits
- Team: 1 PM (you) + 1 contractor engineer (if needed)
- Timeline: MVP in 4 weeks
- Tech stack: React, Node.js, PostgreSQL (non-negotiable)

## 9. Risks
- Real-time sync complexity (mitigation: use Socket.io library, not custom)
- User onboarding friction (mitigation: 1-click Google auth)
- Data privacy (mitigation: encryption at rest, GDPR compliance)
```

### PRD → Spec-Kit Breakdown

Once PRD is locked, you create **specs** for each module:

```
PRD (Big picture)
  ↓
Spec-Kit (Technical specifications)
  ├── Database schema
  ├── API endpoints (3–5)
  ├── UI components
  ├── Auth flow
  └── Error handling
  
Each spec gets fed to AI separately.
```

### Using ChatGPT/Gemini/Claude for PRD Planning

**Workflow:**

```
Step 1: Write rough problem statement in Cursor
Step 2: Paste into Claude with prompt:
  "I'm building [product]. Here's my rough PRD. 
   What am I missing? What's the biggest risk?"
   
Step 3: Claude suggests improvements

Step 4: Refine PRD based on feedback

Step 5: Use ChatGPT for competitive analysis:
  "List 3 competitors to my product. 
   What features do all of them have?"
   
Step 6: Update PRD with must-haves

Step 7: Lock PRD and move to specs
```

### Validation Checklist

- [ ] PRD is 300+ words (comprehensive but concise)
- [ ] Success metrics are measurable (not vague)
- [ ] You can define what "done" means
- [ ] At least one person (AI or human) reviewed it
- [ ] You're clear on what NOT to build

---

## 7. Using AI Models for Planning

### Model Selection Matrix

| Task | Recommended | Why | Cost |
|------|-------------|-----|------|
| **PRD review** | Claude Sonnet 4.5 | Best reasoning, catches edge cases | $0.003/1k input |
| **API design** | GPT-5-Preview | Deep understanding of REST/GraphQL | $0.15/1k input |
| **Database schema** | Gemini 2.5 Pro | Math-heavy, relational thinking | $0.0015/1k input |
| **Code generation** | GPT-5 | Best TypeScript/React | $0.15/1k input |
| **Security audit** | Claude Opus (if available) | Most thorough | $0.03/1k input |
| **Documentation** | GPT-5-Turbo | Fast, clear explanations | $0.01/1k input |

### Model Governance Protocol

**Before picking a model, ask:**

1. **Complexity**: Does this task need reasoning? → Use GPT-5
2. **Cost sensitivity**: Is budget tight? → Use Gemini (cheaper)
3. **Speed**: Do you need instant? → Use Turbo versions
4. **Accuracy**: Is failure costly? → Use premium (GPT-5, Claude Opus)

### Practical Workflow

**Phase 1: Planning (Low cost)**
```
Gemini 2.5 Pro:
  "Generate a database schema for a task management app.
   Include users, tasks, comments, teams.
   Use PostgreSQL conventions."
```

**Phase 2: Design (Medium cost)**
```
Claude Sonnet 4.5:
  "Review this database schema for:
   - Performance issues
   - Security gaps
   - Migration complexity"
```

**Phase 3: Implementation (Higher cost, justified)**
```
GPT-5:
  "Generate TypeScript React component for task card.
   Must include: drag-and-drop, inline editing, 
   dark mode support, accessibility (WCAG AA)."
```

### Token Efficiency Tips

```
❌ BAD (token waste):
"Build me an app" → Regenerate 10 times

✅ GOOD (token efficiency):
1. Cheap model for outline (Gemini)
2. Expensive model once for final (GPT-5)
3. Edit in place, don't regenerate full file
```

### Validation Checklist

- [ ] You know which model to use for your next task
- [ ] You understand cost-benefit trade-offs
- [ ] You're not using premium models for routine tasks
- [ ] You have API keys set up for 2+ models

---

## 8. Saving Tokens — SSD & Spec-Kit Method

### The Problem: Token Waste

Most people do this:

```
User: "Build me an API"
AI: (generates 2000 tokens)
User: "Actually, add authentication"
AI: (regenerates entire 2500 tokens)
User: "Make it faster"
AI: (regenerates full file 2800 tokens)

Total: 7,300 tokens for one API
Cost: ~$0.50
Time: 15 minutes of back-and-forth
```

### The Solution: SSD (Structured Spec-Driven)

```
User creates spec (200 tokens, you write it):
  {
    "endpoint": "POST /tasks",
    "auth": "JWT",
    "body": { "title": "string", "assignee_id": "uuid" },
    "response": { "id": "uuid", "created_at": "ISO 8601" },
    "validation": "title max 100 chars, no XSS"
  }

AI generates from spec (800 tokens, one shot):
  → Full, production-ready code

Total: 1,000 tokens
Cost: ~$0.06
Time: 3 minutes
```

**Savings: 86% tokens, 80% time.**

### Spec-Kit Template

Create a `/specs` folder in your project:

```markdown
# spec-kit/auth.md

## Goal
Implement JWT authentication for API

## Context
- Framework: Express.js
- Token library: jsonwebtoken
- Secret stored in: .env

## Input Spec
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "plaintext"
}
```

## Output Spec
```json
{
  "token": "eyJhb...",
  "expires_in": 3600,
  "user_id": "uuid"
}
```

## Constraints
- Use bcryptjs for password hashing
- Token expires in 1 hour
- Failed login returns 401 (never reveal if email exists)
- Log all auth attempts to audit table

## Validation
- Test 5 login scenarios (valid, wrong password, user not found, malformed email, token expiry)
```

### Spec-Kit Workflow

```
1. Write spec (~100 words) — YOU
2. Copy spec to Cursor message — YOU
3. AI generates code from spec — AI
4. You validate output — YOU
5. Move to next spec — Loop
```

### Token Budgeting

For a typical app build:

```
PRD & specs: 5,000 tokens (you write)
Code generation: 20,000 tokens (AI)
Reviews & fixes: 5,000 tokens (AI)
Documentation: 3,000 tokens (AI)

Total: ~33,000 tokens
Cost (using GPT-5): ~$5
```

### Validation Checklist

- [ ] You have a `/specs` folder structure
- [ ] At least one spec is written (200+ words)
- [ ] You understand how to batch requests (API endpoint per spec)
- [ ] You're tracking token usage per spec

---

## 9. Preparing a Project Before Coding

### The Pre-Coding Checklist

Before you write your first spec, your project folder must include:

```
my-project/
├── agent.md ..................... (AI rules & principles)
├── structure.md .................. (Tech stack & folder layout)
├── README.md ..................... (Human-readable overview)
├── .env.example .................. (What secrets are needed)
├── spec-kit/
│   ├── 01-database.md ........... (Schema)
│   ├── 02-auth.md ............... (Authentication)
│   ├── 03-api-endpoints.md ...... (Main API routes)
│   ├── 04-ui-components.md ...... (React components)
│   └── 05-error-handling.md .... (Error patterns)
├── src/ ......................... (Your code will go here)
└── docs/
    └── architecture.md ......... (System design)
```

### Step 1: Create agent.md

**Use the template from `/templates/agent.md`**

This is your AI agent's constitution. Without it, you'll have inconsistent code.

### Step 2: Create structure.md

**Example:**

```markdown
# structure.md

## Tech Stack
- Frontend: React 19, TypeScript, Tailwind CSS
- Backend: Node.js 20+, Express.js
- Database: PostgreSQL 15+
- Cache: Redis
- Auth: JWT + Google OAuth
- Hosting: Vercel (frontend), Render (backend)

## Folder Structure
```
src/
  ├── components/ ............ React UI components
  ├── hooks/ ................. React custom hooks
  ├── pages/ ................. Page-level components
  ├── services/ .............. API calls, utilities
  ├── styles/ ................ Global + component styles
  ├── types/ ................. TypeScript interfaces
  └── utils/ ................. Helpers (date, format, etc)

backend/
  ├── routes/ ................ API endpoints
  ├── middleware/ ............ Auth, logging, error handling
  ├── models/ ................ Database models
  ├── services/ .............. Business logic
  ├── controllers/ ........... Route handlers
  └── utils/ ................. Helpers
```

## Key Decisions
- State management: Zustand (not Redux, too complex)
- HTTP client: axios
- Testing: Vitest + React Testing Library
- Linting: ESLint + Prettier
```

### Step 3: Create README.md (Human Version)

```markdown
# TaskFlow

Real-time task collaboration for remote teams.

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis

### Setup
```bash
git clone <repo>
cd my-project
npm install
cp .env.example .env  # Fill in your secrets
npm run dev
```

## Architecture Overview
[Embed a 1-page architecture diagram]

## API Documentation
[Link to Swagger or generate from specs]

## Contributing
See CONTRIBUTING.md
```

### Step 4: Create spec-kit

**For each major feature, create a spec:**

```
spec-kit/
├── 01-database-schema.md
├── 02-user-authentication.md
├── 03-task-crud-api.md
├── 04-task-list-component.md
├── 05-real-time-sync.md
└── 06-error-handling.md
```

**Each spec is fed to AI one at a time.**

### Step 5: Create .env.example

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/taskflow

# Auth
JWT_SECRET=your_secret_here_change_in_prod
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# AI Services (optional for vibe coding)
OPENAI_API_KEY=xxx
GEMINI_API_KEY=xxx

# Hosting
NODE_ENV=development
PORT=3000
```

### Ready-to-Use Templates

All templates are in `/templates/`:
- `agent.md` — AI agent rules
- `structure.md` — Tech stack layout
- `prd-template.md` — PRD skeleton
- `spec-kit-template.md` — Spec boilerplate

### Validation Checklist

- [ ] agent.md is created and reviewed
- [ ] structure.md defines your tech stack
- [ ] At least 3 specs exist in `/spec-kit`
- [ ] .env.example documents all secrets
- [ ] README.md is complete

---

## 10. Validation & QA Gates

### Before Shipping Any Code

Run these gates **in order**. Fail any gate = stop and fix.

### Gate 1: Security Audit

```
🔒 SECURITY GATE

Checklist:
- [ ] No hardcoded secrets (grep for API_KEY, password, token)
- [ ] Environment variables used for all sensitive data
- [ ] Input validation on every API endpoint
- [ ] SQL injection prevention (use parameterized queries)
- [ ] CORS properly configured (not wildcard *)
- [ ] Rate limiting on public endpoints
- [ ] Error messages don't leak system info
- [ ] JWT tokens have expiry
- [ ] Password hashing uses bcrypt/argon2, not MD5
- [ ] HTTPS enforced in production

Run:
  npm audit
  npm run security-check  (if custom script)
```

### Gate 2: UX Validation

```
✨ UX GATE

Check every user-facing feature:
- [ ] Mobile responsive (test on 320px screen)
- [ ] Dark mode works without issues
- [ ] Focus rings visible (keyboard navigation)
- [ ] Color contrast ≥4.5:1 (use aXe DevTools)
- [ ] Loading states show (no silent hangs)
- [ ] Errors displayed in plain language
- [ ] Success states confirmed
- [ ] Accessibility: WCAG 2.1 AA minimum

Run:
  npm run lighthouse  (or use online tool)
```

### Gate 3: Code Quality

```
📊 CODE QUALITY GATE

- [ ] No console.log() in production code
- [ ] ESLint passes (zero warnings)
- [ ] TypeScript strict mode: zero errors
- [ ] >80% test coverage
- [ ] No unused imports/variables
- [ ] Functions <50 lines (breaking up large functions)
- [ ] Comments explain WHY, not WHAT

Run:
  npm run lint
  npm run type-check
  npm run test
  npm run coverage
```

### Gate 4: Performance

```
⚡ PERFORMANCE GATE

- [ ] Lighthouse score >90 (desktop & mobile)
- [ ] Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- [ ] Bundle size <200kb (gzipped)
- [ ] API response time <500ms
- [ ] Database queries <100ms

Run:
  npm run build
  npm run analyze-bundle
  npm run load-test
```

### Gate 5: Data/Privacy

```
🔐 DATA GATE

- [ ] User data encrypted at rest
- [ ] GDPR compliance checked (can user export/delete data?)
- [ ] No PII in logs
- [ ] Database backups automated
- [ ] Sensitive fields use encryption (not plaintext)

Manual check:
  - Inspect database directly
  - Audit logs for data leaks
```

### Running All Gates Automatically

Create a `pre-ship.sh` script:

```bash
#!/bin/bash
echo "🚀 Running pre-ship gates..."

echo "🔒 Security..."
npm audit

echo "✨ UX..."
npm run lighthouse

echo "📊 Code Quality..."
npm run lint && npm run type-check && npm run test

echo "⚡ Performance..."
npm run analyze-bundle

echo "✅ All gates passed! Ready to ship."
```

Run before every deploy:
```bash
chmod +x pre-ship.sh
./pre-ship.sh
```

### Validation Checklist

- [ ] All 5 gates have green checkmarks
- [ ] No critical security issues found
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met

---

## 11. Publishing & Shipping

### Publishing to GitHub

**Step 1: Initialize Git**

```bash
cd my-project
git init
git add .
git commit -m "init: initial commit (vibe coded with AI)"
```

**Step 2: Create README (GitHub)**

Your README should include:
- What the project does (1 sentence)
- Quick start (5 commands)
- Architecture overview
- Contributing guide
- License

**Example:**

```markdown
# TaskFlow

Real-time task collaboration for remote teams. Built with React + Node.js.

## Quick Start

```bash
git clone https://github.com/yourname/taskflow
cd taskflow
npm install
cp .env.example .env
npm run dev
```

Your app runs at http://localhost:3000

## Architecture

[1-page diagram or description]

## Contributing

We welcome contributions! See CONTRIBUTING.md

## License

MIT
```

**Step 3: Add Badges**

```markdown
![AI-Powered](https://img.shields.io/badge/AI%20Coded-Vibe%20Coding-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)
![OpenOps](https://img.shields.io/badge/OpenOps-Compliant-success)
```

**Step 4: Create GitHub Repo**

1. Go to [github.com/new](https://github.com/new)
2. Repo name: `taskflow` (or your project)
3. Description: "Real-time task collaboration for remote teams"
4. Public
5. Add LICENSE (MIT)

**Step 5: Push Code**

```bash
git remote add origin https://github.com/yourname/taskflow.git
git branch -M main
git push -u origin main
```

### Publishing to GitHub as a Package

If you're sharing reusable code (component library, utility, etc.):

**Step 1: Create package.json**

```json
{
  "name": "@yourname/taskflow-components",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "publish-npm": "npm publish --access public"
  }
}
```

**Step 2: Configure npm**

```bash
npm login
npm publish
```

### Shipping to Production

**Pre-deployment checklist:**

```
☑️ All gates passed
☑️ Database migrations reviewed
☑️ Secrets in environment variables (not code)
☑️ Monitoring/logging set up
☑️ Backup plan documented
☑️ Rollback plan documented
```

**Deployment platforms (Vibe-Coder friendly):**

| Platform | Frontend | Backend | Database | Cost |
|----------|----------|---------|----------|------|
| Vercel + Render + Neon | ✅ | ✅ | ✅ | ~$50/mo |
| Netlify + Railway | ✅ | ✅ | ✅ | ~$50/mo |
| Replit | ✅ | ✅ | ✅ | ~$50/mo |
| AWS (complex) | ✅ | ✅ | ✅ | $100+/mo |

**Recommendation:** Start with Vercel + Render + Neon (easiest).

### Tracking Success

Minimal metrics (not vanity):

- **GitHub stars** = people finding it valuable
- **Issues opened** = real problems to fix
- **Forks** = people building on it
- **Mentions** = organic reach (dev.to, Twitter, etc.)

### Validation Checklist

- [ ] Code pushed to GitHub
- [ ] README is complete and clear
- [ ] License file exists (MIT recommended)
- [ ] Deployment platform chosen
- [ ] Monitoring/alerts set up
- [ ] You have a rollback plan

---

## 📚 Additional Resources

### Templates
- [agent.md template](./templates/agent.md)
- [structure.md template](./templates/structure.md)
- [PRD template](./templates/prd-template.md)
- [Spec-Kit template](./templates/spec-kit-template.md)

### Guides
- [What is Vibe Coding](./guides/01-what-is-vibe-coding.md)
- [Tools & Setup](./guides/02-tools-and-setup.md)
- [No-Code vs Low-Code](./guides/03-no-code-vs-low-code.md)
- [Career Paths](./guides/04-career-paths.md)
- [Pre-Coding Rules](./guides/05-pre-coding-rules.md)
- [PRD Design](./guides/06-prd-design.md)
- [Model Selection](./guides/07-model-selection.md)
- [Token Savings](./guides/08-token-savings.md)
- [Project Setup](./guides/09-project-setup.md)

### Examples
- [React App (Case Study)](./examples/case-study-1-react-app.md)
- [API Service (Case Study)](./examples/case-study-2-api-service.md)

---

## ⚖️ Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| AI hallucination | Pre-code with specs, validate output |
| Token waste | Use SSD method, batch specs |
| Security gaps | Run security gate before shipping |
| Scope creep | Lock PRD early, kill criteria explicit |
| Code debt | QA gates catch 80% of issues |

---

## 🤝 Contributing

This playbook is open-source. Contributions welcome:

1. Fork the repo
2. Create a branch (`git checkout -b improve/section-name`)
3. Commit changes (`git commit -m "improve: added model comparison"`)
4. Push branch (`git push origin improve/section-name`)
5. Open Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📄 License

This work is licensed under the MIT License. See [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Created by:** Mamdouh Aboammar  
**LinkedIn:** [linkedin.com/in/mamdouh-aboammar](https://www.linkedin.com/in/mamdouh-aboammar)  
**Built on:** OpenOps Studio Framework

---

## 🚀 Get Started

1. **Read:** Start with [Section 1](#1-what--why-of-vibe-coding)
2. **Prepare:** Follow [Section 5–9](#5-pre-coding-rules-ai-agent-feeding) to set up your first project
3. **Ship:** Use [Section 10–11](#10-validation--qa-gates) to validate and deploy
4. **Share:** Drop a ⭐ if this helped, and share with your team

---

**The best way to learn Vibe Coding is to ship something. Go build.** 🚀
