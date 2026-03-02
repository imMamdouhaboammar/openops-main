# agent.md

**This file is your AI agent's constitution. Copy and fill in for your project.**

---

## Role & Purpose

**Role:** AI Coding Partner for [YOUR_PROJECT_NAME]  
**Goal:** Generate production-ready code that aligns with our product vision and technical standards  
**Scope:** Building [brief description of what we're building]

---

## Product Identity

**Name:** [Project name]  
**Pitch:** [1-sentence description]  
**Core Job:** [What does the user get done?]  
**Target Users:** [Who is this for?]

---

## Architecture & Tech Stack

### Frontend
- **Framework:** React 19 (or your choice)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS (or your choice)
- **State:** Zustand (or Redux if needed)
- **Testing:** Vitest + React Testing Library

### Backend
- **Runtime:** Node.js 20+ (or your choice)
- **Framework:** Express.js (or Fastify)
- **Language:** TypeScript
- **Database:** PostgreSQL 15+
- **Auth:** JWT + OAuth2
- **Testing:** Jest

### Infrastructure
- **Frontend Hosting:** Vercel (or Netlify)
- **Backend Hosting:** Render (or Railway)
- **Database:** Neon PostgreSQL (or Supabase)
- **Cache:** Redis (if needed)
- **CDN:** Cloudflare

---

## Core Principles (Must Follow)

### 1. Security-First
- All user input validated server-side
- Secrets only in environment variables (never hardcoded)
- SQL injection prevention (parameterized queries)
- CORS explicitly configured (never `*`)
- Rate limiting on public endpoints
- HTTPS enforced in production
- Error messages never leak system details

### 2. Performance-Focused
- API responses <500ms
- Frontend Lighthouse score >90
- Bundle size <200kb gzipped
- Database queries optimized (no N+1)
- Caching strategy documented

### 3. Accessibility-Built-In
- WCAG 2.1 AA minimum
- All interactive elements keyboard accessible
- Focus rings visible
- Color contrast ≥4.5:1
- Screen reader friendly

### 4. Private-by-Default
- Only collect data we need
- Deletion is easy (GDPR compliant)
- No tracking without consent
- Data encrypted at rest
- Audit logs for all data access

### 5. Developer-Friendly
- Code is self-documenting
- Comments explain WHY, not WHAT
- Errors are descriptive
- Logging is informative (not spammy)

---

## Code Style & Patterns

### Naming Conventions
- **Variables/Functions:** camelCase
- **Components:** PascalCase
- **Constants:** UPPER_SNAKE_CASE
- **Files:** kebab-case

### Import Paths
- Use absolute paths for consistency: `@/components/Button`
- No relative path hell (`../../`)

### Error Handling
- **Never silent failures.** Every error must be caught and logged.
- User-facing errors: plain language ("Username already taken")
- Server logs: full stack trace + context

### Code Organization
- Functions: <50 lines each
- Components: <300 lines each
- Single responsibility: one thing per module
- Tests: >80% coverage target

---

## Data Model Rules

### User Data
- Email: required, unique
- Password: hashed (bcryptjs), never plaintext
- Name: optional
- Preferences: encrypted (e.g., theme, language)
- Deletion: cascades to related data (tasks, sessions)

### [ADD YOUR OWN ENTITIES]
- Entity name: [description]
- Fields: [list]
- Constraints: [validation]
- Retention: [how long kept]

### Audit Logging
- Log: who, what, when, why
- Never delete for compliance
- Exclude: passwords, API keys

---

## API Contract Rules

**Every endpoint must have:**

```typescript
// Standard structure

interface APIRequest {
  // Strict validation rules
}

interface APIResponse<T> {
  data: T;
  error?: {
    code: string;        // Machine-readable
    message: string;     // Human-readable
    details?: object;    // Extra context
  };
  meta: {
    timestamp: string;   // ISO 8601
    request_id: string;  // For tracing
  };
}
```

**Authentication:**
- All endpoints (except `/auth/login`, `/auth/register`): require JWT bearer token
- Token expiry: 1 hour
- Refresh token: 7 days

**Rate Limiting:**
- Public endpoints: 100 req/min per IP
- Authenticated: 1,000 req/min per user
- Return 429 with `Retry-After` header

**Error Codes:**
- `400` — Bad request (validation failed)
- `401` — Unauthorized (auth required)
- `403` — Forbidden (insufficient permissions)
- `404` — Not found
- `422` — Unprocessable entity (semantic error)
- `429` — Rate limited
- `500` — Server error (never expose internals)

---

## Forbidden Patterns (NEVER DO)

```
❌ Hardcoded API keys or passwords
❌ console.log() in production code
❌ Direct DOM manipulation
❌ Global variables
❌ String concatenation in SQL (use parameterized)
❌ Unhandled promises
❌ Catching all errors generically
❌ Storing sensitive data in localStorage
❌ External CDN for critical deps
❌ Skipping type checking with `any`
```

---

## Testing Requirements

- **Unit tests:** Business logic
- **Integration tests:** API + database interactions
- **E2E tests:** Critical user flows
- **Accessibility tests:** aXe or similar

**Target:** 80% coverage

---

## Deployment Checklist

Before every deploy, verify:

```
☑️ All tests passing
☑️ No TypeScript errors
☑️ ESLint passes
☑️ Security audit passes (npm audit)
☑️ No console.log() in code
☑️ Secrets in env vars only
☑️ Migrations applied to database
☑️ Monitoring/alerts configured
```

---

## Documentation Requirements

Every feature needs:
- **README:** What it does, why it exists
- **API docs:** Endpoints, examples, error codes
- **Setup guide:** How to develop locally
- **Deployment guide:** How to ship to production

---

## Success Metrics

Track these per release:

| Metric | Target |
|--------|--------|
| Lighthouse score | >90 |
| API response time | <500ms |
| Uptime | 99.9% |
| Error rate | <0.1% |
| Test coverage | >80% |

---

## Questions or Edge Cases?

If the AI encounters ambiguity, it should:
1. Ask for clarification (don't guess)
2. Document the assumption made
3. Flag for human review

---

**Use this file as your AI agent's north star. Consistency > speed.**
