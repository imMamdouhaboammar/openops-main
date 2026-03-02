# Task 4: Password Auth Fallback

**Phase**: Phase 1 - Identity & Authentication  
**Priority**: P2 - Important  
**Estimated Effort**: 4-5 days  
**Owner**: Backend / Auth Lead  
**Depends On**: Task 0, Task 1, Task 2

---

## Executive Summary

Implement optional password-based authentication as a fallback for users who prefer traditional login.

---

## Functional Requirements

- **FR-005**: System MUST support optional password authentication with PBKDF2-SHA256 hashing, 12+ character requirement, 2FA enforcement

---

## Task Description

Password fallback provides alternative for users who cannot use passwordless or prefer passwords:
1. User sets optional password during signup
2. User can login with email + password
3. System enforces strong password requirements
4. Passwords hashed with PBKDF2-SHA256
5. 2FA required for password login

---

## Password Requirements

| Requirement | Details |
|-------------|---------|
| Minimum length | 12 characters |
| Character types | Uppercase, lowercase, numbers, special |
| Strength scoring | Zxcvbn library |
| Expiration | Optional (recommended 90 days) |
| History | Last 5 passwords not allowed |

---

## Acceptance Criteria

- [ ] Password validation enforces 12+ character minimum
- [ ] At least 1 uppercase, 1 lowercase, 1 number, 1 special character
- [ ] Passwords hashed with PBKDF2-SHA256 (100,000 iterations)
- [ ] Failed login attempts rate-limited (5 attempts per hour)
- [ ] Account locked after 10 failed attempts (15 min cooldown)
- [ ] Password reset works via email verification
- [ ] 2FA enforced for password-based login
- [ ] Passwords never logged or transmitted in plain text
- [ ] Tests: password validation rules
- [ ] Tests: rate limiting on failed attempts
- [ ] Tests: account lock after threshold

---

## Testing Strategy

```gherkin
Scenario: User logs in with valid password
  Given user has password set
  When they enter email + correct password
  Then 2FA prompt is shown

Scenario: Weak password rejected
  Given user attempts to set password "Pass123"
  When they submit
  Then system returns PASSWORD_TOO_WEAK
  And shows requirement feedback

Scenario: Failed password attempt locked
  Given user has 10 failed password attempts
  When they try 11th attempt
  Then account is locked for 15 minutes
  And email notification sent

Scenario: Password reset via email
  Given user forgets password
  When they request password reset
  And click email link
  And set new password
  Then they can login with new password
```

---

## Database Schema

```sql
CREATE TABLE password_auth (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  password_hash VARCHAR(255),
  password_salt VARCHAR(255),
  iterations INT DEFAULT 100000,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  expires_at TIMESTAMP (nullable)
);

CREATE TABLE password_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  password_hash VARCHAR(255),
  created_at TIMESTAMP
);

CREATE TABLE failed_login_attempts (
  id UUID PRIMARY KEY,
  email VARCHAR(255),
  attempt_count INT,
  locked_until TIMESTAMP (nullable),
  last_attempt TIMESTAMP
);
```

---

## Password Hashing (PBKDF2)

```typescript
async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  return { hash, salt };
}

async function verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
  const computed = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  return computed === hash;
}
```

---

## Security Features

- [ ] Passwords never stored in plain text
- [ ] Password strength validated before storage
- [ ] Failed login attempts tracked and rate-limited
- [ ] Account lockout after threshold
- [ ] Password reset requires email verification
- [ ] 2FA enforced for password-based login
- [ ] Password history prevents reuse

---

## Integration Points

- Task 2: Email verification (password reset)
- Task 3: Passwordless login (alternative)
- Task 5: 2FA requirement enforcement
- Task 14: Security Activity Log

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Password strength compliance | 95% |
| Brute force prevention effectiveness | 0 successful attacks |
| Account lockout false positives | <1% |

---

**Task ID**: 4  
**Phase**: 1  
**Created**: 2026-01-12
