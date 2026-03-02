# AI Model Selection & Comparison Guide

**How to pick the right model for each coding task.**

---

## 🎯 Quick Decision Tree

```
START: What's your task?

├─ "Review my PRD for issues"
│  └─ → Claude Sonnet 4.5 ✅
│
├─ "Generate React component"
│  └─ → GPT-5 or GPT-5-Preview ✅
│
├─ "Design database schema"
│  └─ → Gemini 2.5 Pro ✅
│
├─ "Write API endpoint"
│  └─ → GPT-5 ✅
│
├─ "Design system architecture"
│  └─ → GPT-5-Preview or Claude Opus ✅
│
├─ "Write tests"
│  └─ → GPT-5-Turbo ✅
│
└─ "Generate documentation"
   └─ → GPT-5-Turbo or Claude ✅
```

---

## 📊 Model Comparison Matrix

### Reasoning (Complex Logic)

| Model | Score | Best For | Cost | Speed |
|-------|-------|----------|------|-------|
| Claude Opus | ⭐⭐⭐⭐⭐ | Architecture, PRD review | $$$$ | 📍 |
| GPT-5-Preview | ⭐⭐⭐⭐⭐ | Complex design decisions | $$$ | 📍 |
| Claude Sonnet 4.5 | ⭐⭐⭐⭐ | Good reasoning, cost-effective | $$ | 📍 |
| Gemini 2.5 Pro | ⭐⭐⭐ | Fast reasoning | $ | ⚡⚡ |

### Code Generation (Accuracy)

| Model | Score | Best For | Cost | Speed |
|-------|-------|----------|------|-------|
| GPT-5 | ⭐⭐⭐⭐⭐ | Production code, all languages | $$$ | 📍 |
| GPT-5-Codex | ⭐⭐⭐⭐⭐ | Deep code understanding | $$$ | 📍 |
| Claude Sonnet 4.5 | ⭐⭐⭐⭐ | Clean, well-documented code | $$ | 📍 |
| Gemini 2.5 Pro | ⭐⭐⭐ | Fast generation, decent quality | $ | ⚡⚡ |

### Math & Data (Accuracy)

| Model | Score | Best For | Cost | Speed |
|-------|-------|----------|------|-------|
| Gemini 2.5 Pro | ⭐⭐⭐⭐⭐ | Database schemas, calculations | $ | ⚡⚡ |
| Claude Opus | ⭐⭐⭐⭐⭐ | Complex formulas, optimization | $$$$ | 📍 |
| GPT-5 | ⭐⭐⭐⭐ | Good at math, slower | $$$ | 📍 |

### Speed (Latency)

| Model | Score | Best For | Cost |
|-------|-------|----------|------|
| Gemini 2.5 | ⭐⭐⭐⭐⭐ | Quick iterations, rapid prototyping | $ |
| Claude Haiku | ⭐⭐⭐⭐ | Simple tasks, fast | $ |
| GPT-5-Turbo | ⭐⭐⭐⭐ | Medium-complexity, balanced | $$ |
| GPT-5 | ⭐⭐⭐ | Complex reasoning (slower) | $$$ |

---

## 💼 By Task Type

### 1. Planning & PRD Review

**Best choice:** Claude Sonnet 4.5  
**Why:** Excellent reasoning, catches edge cases, cost-effective  
**Cost:** ~$0.003 per 1k input tokens

**Prompt example:**
```
I'm building a task management app. Here's my rough PRD:
[Paste PRD]

What am I missing? What's the biggest risk?
```

---

### 2. Architecture & System Design

**Best choice:** GPT-5-Preview (or Claude Opus for best results)  
**Why:** Deep reasoning, considers trade-offs, scalability  
**Cost:** ~$0.015 per 1k input tokens (Preview) | $$$$ for Opus

**Prompt example:**
```
Design the architecture for a real-time collaboration app (100k+ concurrent users).

Must support:
- Real-time sync (WebSocket)
- Offline-first (IndexedDB)
- Multi-region deployment

Show:
1. System diagram
2. Data flow
3. Technology choices (+ justification)
4. Potential bottlenecks
```

---

### 3. Database Schema

**Best choice:** Gemini 2.5 Pro  
**Why:** Math-heavy task, Gemini excels at data relationships, cheapest  
**Cost:** ~$0.0015 per 1k input tokens (cheapest!)

**Prompt example:**
```
Generate a Prisma schema for a task management app with:
- Users (with roles: admin, member, viewer)
- Tasks (with status, assignee, comments)
- Comments (threaded, with mentions)
- Audit log (all actions)

Requirements:
- Efficient queries (add indexes)
- Relationships properly defined
- Timestamps auto-generated
- Use UUIDs for all IDs
```

---

### 4. Frontend Component Generation

**Best choice:** GPT-5 (or Claude Sonnet for good/cheaper)  
**Why:** Best React/TypeScript understanding  
**Cost:** ~$0.15 per 1k input tokens (GPT-5) | ~$0.01 for Sonnet

**When to choose GPT-5 over Claude Sonnet:**
- Complex accessibility requirements (WCAG)
- Advanced TypeScript patterns (generics, conditional types)
- Performance-critical components (memoization, hooks optimization)

**When Claude Sonnet is good enough:**
- Standard components (Button, Card, Form)
- Simple logic
- Budget is tight

**Prompt example:**
```
Generate a React component for a task card using my spec:

[Paste spec]

Must include:
- Drag-and-drop support
- Inline editing
- Dark mode support
- WCAG 2.1 AA accessibility
- TypeScript (strict mode)

Follow this agent constitution:
[Paste agent.md]
```

---

### 5. API Endpoint Generation

**Best choice:** GPT-5 (or GPT-5-Turbo for speed)  
**Why:** Best Express/Node understanding, security-conscious  
**Cost:** ~$0.015 per 1k input tokens (GPT-5-Turbo) | $0.15 (GPT-5)

**Prompt example:**
```
Generate an Express.js REST endpoint for task creation:

[Paste spec]

Must include:
- Input validation (Zod)
- JWT authentication
- Error handling
- Structured logging
- Rate limiting consideration

Follow:
[Paste agent.md]

Output:
- routes/tasks.routes.ts
- controllers/taskController.ts
- services/taskService.ts
```

---

### 6. Test Suite Generation

**Best choice:** GPT-5-Turbo (balanced cost/performance)  
**Why:** Good coverage of edge cases, reasonable speed, mid-tier cost  
**Cost:** ~$0.01 per 1k input tokens

**Prompt example:**
```
Generate Jest tests for my API:

[Paste spec]

Test coverage:
- Happy paths (success cases)
- Error cases (400, 401, 403, 404, 422, 500)
- Permissions (who can do what)
- Edge cases (empty data, large payloads)

Output:
- tests/auth.test.ts
- tests/tasks.test.ts
- tests/fixtures.ts (test helpers)
```

---

### 7. Documentation Generation

**Best choice:** Claude Sonnet 4.5 (or GPT-5-Turbo)  
**Why:** Clear writing, good structure  
**Cost:** ~$0.01 per 1k input tokens (Turbo) | ~$0.003 (Sonnet)

**Prompt example:**
```
Generate API documentation in OpenAPI/Swagger format:

Endpoints:
- POST /api/tasks (create)
- GET /api/tasks (list)
- PATCH /api/tasks/:id (update)
- DELETE /api/tasks/:id (delete)

Include:
- Request/response schemas
- Error codes
- Authentication requirements
- Rate limits
```

---

## 🎓 Cost Optimization Strategy

### Budget-First Approach

```
1. Use Gemini 2.5 Pro for exploratory work
   (cheapest, good enough for ideas)
   
2. Move to Claude Sonnet 4.5 for PRD review
   (better reasoning, still affordable)
   
3. Use GPT-5 ONLY for code generation
   (where quality matters most)
   
4. Use GPT-5-Turbo for documentation
   (balanced cost/quality)
```

**Monthly budget for a typical project:**
```
Gemini (specs, schemas):     1,000 tokens  = $0.01
Claude Sonnet (reviews):     2,000 tokens  = $0.02
GPT-5 (code generation):     8,000 tokens  = $1.20
GPT-5-Turbo (docs, tests):   2,000 tokens  = $0.20
─────────────────────────────────────────────────
TOTAL:                      13,000 tokens  = $1.43
```

**Expensive approach (using GPT-5 for everything):**
```
GPT-5 for everything:       13,000 tokens  = $1.95
```

**Savings: ~$0.50/month × 12 = $6/year (small but adds up!)**

---

## ⚡ Speed vs Quality Trade-Offs

### When Speed Matters (Use Gemini + Turbo)

- Rapid prototyping (< 1 day turnaround)
- Exploratory specs
- Learning new frameworks
- Quick POC testing

**Trade-off:** Slightly lower code quality, manual review needed

### When Quality Matters (Use GPT-5 + Claude Opus)

- Production code (security-critical)
- Complex logic (architecture decisions)
- Rarely-touched modules (set-it-and-forget-it)
- Public libraries

**Trade-off:** Slower, more expensive, but production-ready

---

## 🔄 Hybrid Strategy (Recommended)

**Phase 1: Planning (Claude Sonnet)**
```
Input: Rough idea + PRD draft
Process: Review for missing features, risks
Output: Solid PRD in 10 min
Cost: $0.01
```

**Phase 2: Specs (Gemini + You)**
```
Input: Locked PRD
Process: You write specs, Gemini validates
Output: 5 detailed specs
Cost: $0.05
```

**Phase 3: Code (GPT-5)**
```
Input: Specs + agent.md
Process: Generate components, APIs
Output: Production-ready code
Cost: $1.20
```

**Phase 4: Tests (GPT-5-Turbo)**
```
Input: Code + specs
Process: Generate test suite
Output: 85%+ coverage
Cost: $0.15
```

**Phase 5: Docs (Claude Sonnet)**
```
Input: Code + APIs
Process: Generate documentation
Output: Swagger/README
Cost: $0.02
```

**Total:** $1.43 | **All production-ready** ✅

---

## 🚨 Common Mistakes

❌ **Using GPT-5 for everything**  
💰 Cost: $2–3 per project  
✅ **Use Gemini for specs, GPT-5 for code only**  
💰 Cost: $0.50–1 per project (50% savings)

❌ **Generating full files repeatedly**  
💰 Wastes 3,000+ tokens per regeneration  
✅ **Edit inline, batch requests**  
💰 Save 60–70% of tokens

❌ **Using free tier for production**  
⚠️ Risk: Rate limits, unreliable  
✅ **Use paid API with rate limits set**  
✅ Cost: $10–20/month (affordable)

---

## 📞 When to Use Each Model

### Claude Opus
- **Use when:** Money no object, need best reasoning
- **Cost:** $$$$
- **Speed:** Slowest
- **Tasks:** Complex architecture, novel problems

### GPT-5
- **Use when:** Code quality is critical (production)
- **Cost:** $$$
- **Speed:** Medium
- **Tasks:** Core feature code, security-critical APIs

### GPT-5-Preview
- **Use when:** Need GPT-5 quality cheaper
- **Cost:** $$ (50% less than GPT-5)
- **Speed:** Slightly faster than GPT-5
- **Tasks:** Architecture, complex logic

### GPT-5-Turbo
- **Use when:** Need speed + decent quality
- **Cost:** $$
- **Speed:** Fast ⚡
- **Tasks:** Tests, documentation, simple code

### Claude Sonnet 4.5
- **Use when:** Budget-conscious, good quality needed
- **Cost:** $
- **Speed:** Medium
- **Tasks:** Reviews, planning, documentation

### Gemini 2.5 Pro
- **Use when:** Cost is primary concern
- **Cost:** $
- **Speed:** Fastest ⚡⚡
- **Tasks:** Specs, schemas, exploratory work

---

## 🎯 Bottom Line

**Default model selection for Vibe Coders:**

1. **Planning:** Claude Sonnet 4.5
2. **Schemas:** Gemini 2.5 Pro
3. **Code:** GPT-5
4. **Tests:** GPT-5-Turbo
5. **Docs:** Claude Sonnet 4.5

**Budget:** ~$1.50–2.00 per project  
**Quality:** Production-ready  
**Speed:** <1 day start-to-finish

---

**Adjust based on your priorities: budget vs speed vs quality. There's no one-size-fits-all.**
