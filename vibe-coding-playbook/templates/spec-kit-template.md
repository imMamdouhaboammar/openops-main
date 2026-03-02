# Spec-Kit Template

**Copy this template for each module/feature you're building. Feed each spec to your AI agent separately.**

---

## Feature: [Feature Name]

**Status:** [ ] Not started | [x] In progress | [ ] Complete  
**Estimated Tokens:** ~500  
**Created:** [Date]  
**Updated:** [Date]

---

## 1. Goal

**In one sentence:** What is this feature?

**Example:** "Implement JWT authentication so users can log in securely and stay logged in."

---

## 2. Context

### Why This Matters
Why are we building this now? (1–2 sentences)

**Example:** "User authentication is a blocker for everything else. Without it, we can't track user data or permissions."

### Dependencies
What must be done first?

- [ ] Database schema (User table)
- [ ] Environment variables set (.env)
- [ ] JWT library installed (jsonwebtoken)

### Related Specs
What other features connect to this?

- `02-user-database.md` — Defines User table
- `04-password-reset.md` — Uses JWT tokens

---

## 3. Input Specification

### What's the INPUT to this feature?

**Request Example:**

```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "mypassword123"
}
```

### Validation Rules

- email: Required, valid email format, lowercase
- password: Required, 8+ characters, contains uppercase + number
- Rate limiting: Max 5 attempts per minute

---

## 4. Output Specification

### What's the OUTPUT of this feature?

**Success Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Response (401):**

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email or password is incorrect"
  }
}
```

**Error Response (429):**

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many attempts. Try again in 5 minutes."
  }
}
```

---

## 5. Technical Constraints

### Security (Non-Negotiable)

- [ ] Password must be hashed with bcryptjs (min 10 rounds)
- [ ] Never return plaintext password
- [ ] JWT secret stored in environment variable (never hardcoded)
- [ ] Token uses HS256 algorithm
- [ ] Implement rate limiting (5 attempts/minute)
- [ ] Log all failed login attempts

### Performance

- [ ] Password verification must complete in <1 second
- [ ] Database query must be indexed on `email`
- [ ] Response time <200ms

### Data Handling

- [ ] User email is case-insensitive (normalize to lowercase)
- [ ] Passwords never logged
- [ ] Audit log: record all logins (success + failure)

---

## 6. Implementation Details

### Tech Stack

- Backend framework: Express.js
- Password hashing: bcryptjs
- JWT: jsonwebtoken
- Database: PostgreSQL (Prisma ORM)

### Libraries to Use

```bash
npm install bcryptjs jsonwebtoken
npm install -D @types/jsonwebtoken
```

### Database Schema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50),
  ip_address VARCHAR(50),
  success BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Pseudocode (High-Level Flow)

```
1. Receive email + password
2. Validate format (email, password strength)
3. Query database for user by email
4. If user not found → return 401
5. Compare password with stored hash (bcryptjs.compare)
6. If no match → log attempt, return 401
7. If match:
   a. Generate JWT token (expires in 1 hour)
   b. Return token + user info
   c. Log successful login
```

---

## 7. Error Handling

### What Can Go Wrong?

| Error | Status | Message |
|-------|--------|---------|
| Invalid email format | 400 | "Invalid email format" |
| Password too short | 400 | "Password must be 8+ characters" |
| User not found | 401 | "Email or password incorrect" |
| Wrong password | 401 | "Email or password incorrect" |
| Rate limited (5 attempts/min) | 429 | "Too many login attempts. Try again in X minutes." |
| Database error | 500 | "Something went wrong. Please try again." |

### Error Logging

```typescript
// Log all errors (never expose internals to user)
logger.error({
  timestamp: new Date(),
  action: 'login_failed',
  reason: 'user_not_found' | 'wrong_password' | 'rate_limited',
  email: email.toLowerCase(),
  ip_address: req.ip
})
```

---

## 8. Testing Requirements

### Unit Tests (isolated functions)

```typescript
// Test bcryptjs hash comparison
expect(await bcryptjs.compare('password123', hash)).toBe(true);

// Test JWT token generation
const token = jwt.sign({ userId: 'uuid' }, JWT_SECRET, { expiresIn: '1h' });
expect(token).toMatch(/eyJ/);  // Starts like JWT
```

### Integration Tests (API endpoint)

```typescript
// Test successful login
POST /api/auth/login
{ "email": "user@example.com", "password": "Password123" }
→ Returns 200 + token

// Test invalid credentials
POST /api/auth/login
{ "email": "user@example.com", "password": "wrongpassword" }
→ Returns 401

// Test rate limiting
POST /api/auth/login (5 times in 1 minute)
→ 6th request returns 429
```

### Test Coverage Target

- Happy path: ✅
- Invalid email: ✅
- Wrong password: ✅
- Rate limiting: ✅
- Database errors: ✅

---

## 9. Files to Create/Modify

```
backend/src/
├── routes/auth.routes.ts       (NEW)
├── controllers/authController.ts (NEW)
├── services/authService.ts     (NEW)
├── utils/jwt.ts                (NEW)
├── middleware/auth.ts          (NEW)
└── types/auth.ts               (NEW)

tests/
└── auth.test.ts                (NEW)
```

---

## 10. Validation Checklist

Before considering this spec complete:

- [ ] Code passes all tests
- [ ] ESLint: zero warnings
- [ ] TypeScript: strict mode, zero errors
- [ ] Security: no hardcoded secrets
- [ ] Rate limiting works
- [ ] Error messages are user-friendly
- [ ] Database migrations applied
- [ ] Performance: <200ms response time
- [ ] Documentation updated (API docs)

---

## 11. Related Specs

This spec enables:
- `04-password-reset.md` — Uses JWT for reset links
- `05-user-profile.md` — Protected by JWT auth
- `06-session-management.md` — Track active sessions

---

## 12. Example Implementation Notes

### What to Ask the AI

```
"Generate a TypeScript login endpoint for Express.js that:
1. Accepts email + password
2. Uses bcryptjs for password verification
3. Returns JWT token (expires in 1 hour)
4. Implements rate limiting (5 attempts/min per IP)
5. Logs all attempts to audit table
6. Follows these constraints: [include constraints section]

Use this spec as your guide: [copy full spec]"
```

---

## 13. Sign-Off

**Spec Created By:** [Your name]  
**Reviewed By:** [AI agent or teammate]  
**Approved for Dev:** [ ] Yes [ ] No  

**Notes:**
- [Any caveats or important notes]
- [Anything the AI got wrong first time]

---

**Pro tip:** The more detailed your spec, the fewer AI regenerations you need. Clear specs = fewer tokens wasted.**
