# Case Study #2: Node.js REST API (Cursor + GPT-5)

## Project Overview

**Name:** TaskFlow Backend API  
**Type:** RESTful API service  
**Stack:** Node.js 20, Express, TypeScript, PostgreSQL  
**Time to Build:** 8 hours  
**Tokens Used:** ~12,000  
**Cost:** ~$1.80

---

## The Goal

Build a production-grade API that:
1. Handles user authentication (JWT)
2. CRUD operations for tasks
3. Real-time permissions (who can edit what)
4. Rate limiting + error handling
5. Database migrations

**Success Metrics:**
- All endpoints tested
- <200ms response time
- Zero security vulnerabilities
- 85%+ code coverage

---

## Workflow: How We Built This

### Phase 1: Planning & Design (1 hour)

**Wrote PRD:**
- Problem: Teams need a reliable task API
- Solution: Secure, fast REST API with JWT auth
- MVP: Auth, task CRUD, basic permissions

**Created agent.md:**
- Express.js + TypeScript strict mode
- PostgreSQL + Prisma ORM
- Security-first (input validation, SQL injection prevention)
- Error handling: descriptive messages, never leak internals
- Logging: structured JSON logs (Winston)
- Testing: Jest + 85% coverage target

**Created structure.md:**
```
backend/src/
  ├── routes/
  │   ├── auth.routes.ts
  │   ├── tasks.routes.ts
  │   └── index.ts
  ├── controllers/
  │   ├── authController.ts
  │   ├── taskController.ts
  │   └── index.ts
  ├── services/
  │   ├── authService.ts
  │   ├── taskService.ts
  │   └── index.ts
  ├── middleware/
  │   ├── auth.ts
  │   ├── errorHandler.ts
  │   └── validation.ts
  ├── utils/
  │   ├── jwt.ts
  │   ├── logger.ts
  │   └── errors.ts
  └── app.ts
```

---

### Phase 2: Database Design (1 hour)

**Spec 1: Database Schema**

```markdown
# spec-kit/01-database.md

Goal: Define PostgreSQL schema with Prisma

Entities:
1. User (id, email, password_hash, created_at, updated_at)
2. Task (id, title, description, status, assignee_id, created_by_id, due_date, created_at, updated_at)
3. TaskComment (id, task_id, author_id, content, created_at)
4. AuditLog (id, action, user_id, entity, entity_id, timestamp)

Relationships:
- Task.assignee_id → User.id
- Task.created_by_id → User.id
- TaskComment.task_id → Task.id
- TaskComment.author_id → User.id
- AuditLog.user_id → User (nullable)

Constraints:
- email UNIQUE, lowercase
- Task.status: enum ['todo', 'in_progress', 'done']
- Timestamps auto-generated
```

**Prompt to GPT-5:**

```
Generate a Prisma schema for a task management database.

Schema must include:
- User model (email unique, password hashed)
- Task model (with status enum)
- TaskComment model
- AuditLog model

Requirements:
- Relationships properly defined
- Indexes on frequently-queried fields
- Timestamps auto-generated
- Use UUID for all IDs

Output: prisma/schema.prisma
```

**Output:** Prisma schema (clean, well-indexed) ✅

---

### Phase 3: Authentication API (2 hours)

**Spec 2: Login Endpoint**

```markdown
# spec-kit/02-auth-login.md

Goal: Implement secure JWT login

Input:
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "mypassword"
}

Output (200):
{
  "token": "eyJhb...",
  "expires_in": 3600,
  "user": { "id": "uuid", "email": "user@example.com" }
}

Error Cases:
- 400: Invalid email format
- 401: User not found or wrong password
- 429: Rate limited (5 attempts/min)
- 500: Server error

Security:
- Password hashing: bcryptjs (10 rounds)
- JWT secret in env var
- No plaintext passwords ever
- Rate limiting per IP
- Log all attempts
```

**Prompt to GPT-5:**

```
Generate Express.js login endpoint with these requirements:

[Paste spec 2]

Must include:
- Input validation (Zod)
- Password verification (bcryptjs)
- JWT token generation (1hr expiry)
- Rate limiting (express-rate-limit)
- Structured error responses
- Audit logging

Follow this agent constitution:
[Paste agent.md]

Output:
- routes/auth.routes.ts
- controllers/authController.ts
- services/authService.ts
- utils/jwt.ts
- middleware/auth.ts
```

**Output:** 4 files, 350 lines total ✅

**Edited in place:**
- Added refresh token support (1 line in service)
- Changed rate limit from 5 to 10 attempts (1 line)
- Added IP tracking to logs (2 lines)

**Token cost:** Generated once, edited 3 times (avoided 4 regenerations = saved ~2000 tokens)

---

### Phase 4: Task CRUD API (2.5 hours)

**Specs 3–5: Create, Read, Update, Delete Tasks**

```markdown
# spec-kit/03-task-endpoints.md

Goal: Build full task CRUD endpoints

Endpoints:
1. POST /api/tasks (create)
2. GET /api/tasks (list with filters)
3. GET /api/tasks/:id (read single)
4. PATCH /api/tasks/:id (update)
5. DELETE /api/tasks/:id (delete)

Auth: All require JWT token

Permissions:
- Only creator or assignee can modify
- Only admin can delete others' tasks

Filtering:
- status: 'todo' | 'in_progress' | 'done'
- assignee_id: filter by user
- due_date: date range filter
```

**Prompt Strategy:**
Generated all 5 endpoints in ONE prompt (batched):

```
Generate Express.js task endpoints following this spec:

[Paste spec 3–5]

Endpoints:
1. POST /api/tasks (create)
2. GET /api/tasks (list, with filtering + pagination)
3. GET /api/tasks/:id (read)
4. PATCH /api/tasks/:id (update)
5. DELETE /api/tasks/:id (delete)

For each endpoint:
- Validate input (Zod)
- Check permissions (middleware)
- Handle errors gracefully
- Log to AuditLog table
- Return 200 for success, appropriate error codes

Follow:
[Paste agent.md]

Output 3 files:
- routes/tasks.routes.ts
- controllers/taskController.ts (all 5 endpoints)
- services/taskService.ts (business logic)
```

**Output:** 3 files, 450 lines, all endpoints working ✅

**Batching benefit:** Generating 5 endpoints in 1 prompt saved ~3000 tokens vs. 5 separate prompts.

---

### Phase 5: Error Handling & Middleware (1 hour)

**Spec 6: Global Error Handler**

```markdown
# spec-kit/06-error-handling.md

Goal: Standardize error responses

All errors must return:
{
  "error": {
    "code": "ERROR_TYPE",
    "message": "User-friendly message"
  }
}

Never expose:
- Internal stack traces
- Database schema details
- File paths
- System information

Error types:
- VALIDATION_ERROR (400)
- UNAUTHORIZED (401)
- FORBIDDEN (403)
- NOT_FOUND (404)
- RATE_LIMITED (429)
- SERVER_ERROR (500)
```

**Prompt:**

```
Generate Express error handling middleware:

[Paste spec 6]

Create:
- middleware/errorHandler.ts
- utils/errors.ts (error classes)

Requirements:
- Catch all errors globally
- Transform to standard format
- Log errors with context (request ID, user)
- Never expose internals
- Support custom error types
```

**Output:** 2 files, 120 lines ✅

**Validation middleware also generated:**

```
middleware/validation.ts
- Express middleware that validates Zod schemas
- Returns 422 on validation failure
- Custom error messages
```

---

### Phase 6: Testing (1.5 hours)

**Spec 7: Test Suite**

```markdown
# spec-kit/07-tests.md

Test coverage target: 85%

Test groups:
1. Auth endpoints (login, registration)
2. Task CRUD (create, read, update, delete)
3. Permissions (who can do what)
4. Error handling (all error cases)
5. Rate limiting

Each test:
- Setup: Create test DB, seed data
- Execute: Call endpoint
- Assert: Check response + database state
- Teardown: Clean database
```

**Prompt:**

```
Generate Jest tests for task management API:

[Paste spec 7]

Test coverage:
- Happy paths (successful operations)
- Error cases (all 400/401/403/404/422/429/500)
- Permissions (unauthorized access denied)
- Input validation (invalid data rejected)
- Rate limiting (429 after limit)

Create:
- tests/auth.test.ts (auth endpoints)
- tests/tasks.test.ts (task CRUD)
- tests/permissions.test.ts (authorization)
- tests/fixtures.ts (test helpers)

Use:
- Jest + Supertest (HTTP testing)
- jest-extended (custom matchers)
- Factories for test data
```

**Output:** 4 files, 600 lines of tests ✅

**Coverage results:**
- Statements: 87%
- Branches: 84%
- Functions: 92%
- Lines: 86%

✅ Met 85% target!

---

### Phase 7: Migrations & Documentation (0.5 hours)

**Auto-generated by Prisma:**

```bash
npx prisma migrate dev --name init
```

Created:
- `prisma/migrations/[timestamp]_init/migration.sql`

**API Documentation:**

Generated OpenAPI/Swagger spec automatically:

```yaml
openapi: 3.0.0
info:
  title: TaskFlow API
  version: 1.0.0
paths:
  /api/tasks:
    post:
      summary: Create task
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateTaskInput'
    get:
      summary: List tasks
      parameters:
        - name: status
          in: query
          schema:
            type: string
```

---

### Phase 8: Validation Gates

**Security Gate:** ✅
```
✅ No hardcoded secrets
✅ SQL injection prevention (Prisma parameterized)
✅ Input validation on all endpoints
✅ Password hashing (bcryptjs)
✅ JWT tokens have expiry
✅ Rate limiting active
✅ Error messages don't leak info
✅ npm audit: 0 vulnerabilities
```

**Performance Gate:** ✅
```
✅ Login: 145ms
✅ List tasks: 82ms
✅ Create task: 128ms
✅ Update task: 91ms
✅ All <200ms target
✅ Database queries optimized
```

**Code Quality Gate:** ✅
```
✅ ESLint: 0 warnings
✅ TypeScript: 0 errors
✅ Tests: 86% coverage (target 85%)
✅ No console.log() in code
```

---

## Token Budget Breakdown

| Phase | Activity | Tokens | Cost |
|-------|----------|--------|------|
| Planning | PRD + agent.md + structure.md | 1,500 | $0.22 |
| Database | Prisma schema generation | 800 | $0.12 |
| Auth | Login endpoint (spec + code) | 2,000 | $0.30 |
| Task CRUD | 5 endpoints (batched) | 3,500 | $0.52 |
| Errors | Error handling + middleware | 1,200 | $0.18 |
| Tests | Jest test suite | 2,000 | $0.30 |
| Docs | API documentation | 500 | $0.08 |
| Edits | In-place refinements | 500 | $0.08 |
| **TOTAL** | | **12,000** | **$1.80** |

---

## Lessons Learned

✅ **Batching saves tokens** — Generated 5 endpoints in 1 prompt (saved 3k tokens)  
✅ **Prisma rocks** — Auto-generated migrations + types = zero manual SQL  
✅ **Test early** — Generated tests caught edge cases before production  
✅ **Specs = consistency** — Same quality across all 5 endpoints  

⚠️ **Could've done better:**
- Generated entire service layer in one prompt (extra batching)
- Combined middleware + error handling spec
- Used OpenAPI spec as input (instead of manual spec)

---

## Production Readiness Checklist

- [x] All endpoints tested (86% coverage)
- [x] Security audit passed
- [x] Performance <200ms
- [x] Error handling standardized
- [x] Logging structured
- [x] Database migrations ready
- [x] API documentation generated
- [x] Deployment guide written
- [x] Monitoring configured
- [x] Backup strategy documented

---

## Deployment

```bash
# Production environment setup
npm run build
npm run db:migrate:prod
npm run start

# Monitoring
- Datadog APM
- PagerDuty alerts
- Error tracking (Sentry)
```

---

**Bottom line: 8 hours from idea to production API, $1.80 in AI costs, 86% test coverage, all security gates passed. Batching and SSD method saved an estimated 8,000 tokens (40% savings vs. non-structured approach).**
