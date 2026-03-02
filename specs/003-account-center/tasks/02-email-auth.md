# Task 2: Email First Authentication

**Phase**: Phase 1 - Identity & Authentication  
**Priority**: P1 - Critical  
**Estimated Effort**: 4-6 days  
**Owner**: Backend / Auth Lead  
**Depends On**: Task 0, Task 1

---

## Executive Summary

Implement email-based authentication as the primary identity anchor, establishing email as the verified credential for account access.

---

## Functional Requirements

- **FR-003**: System MUST support email-based authentication as primary identity anchor with extensibility for future methods (OAuth, SAML, etc.)
- **FR-012**: System MUST validate email ownership before account activation with maximum 5 verification attempts per email per day

---

## Task Description

Email authentication is the foundation. Users:
1. Provide email during signup
2. Receive verification email with confirmation link
3. Click link to verify ownership
4. Account becomes active

This establishes email as the verified, unique identifier for the account.

---

## Implementation Requirements

### Email Verification Flow

```
User enters email → Send verification code/link → User clicks link → Email verified → Account active
```

### Verification Email

Must include:
- [ ] Unique verification token (6+ random chars)
- [ ] Expiration (15 minutes)
- [ ] One-click confirmation link
- [ ] Manual verification code (for email clients that don't support links)
- [ ] Clear action: "Verify your email"

### Constraints

- [ ] Max 5 verification attempts per email per day
- [ ] Rate limiting: max 3 emails per 10 minutes to same address
- [ ] Token expiration: 15 minutes
- [ ] Only 1 active verification per email at a time

---

## Acceptance Criteria

- [ ] Email verification endpoint created and tested
- [ ] Verification tokens generated (cryptographically secure)
- [ ] Email sent via configured SMTP/SendGrid/Mailgun
- [ ] Rate limiting enforced (5 attempts/day per email)
- [ ] Verification link expires after 15 minutes
- [ ] Verified email stored immutably in database
- [ ] Email verification audit logged
- [ ] Tests: happy path (successful verification)
- [ ] Tests: edge cases (expired link, wrong code, rate limit)
- [ ] Tests: security (cannot verify with forged token)

---

## Testing Strategy

```gherkin
Scenario: User successfully verifies email
  Given user provides valid email during signup
  When they receive verification email
  And click the verification link
  Then account is activated and email marked as verified

Scenario: Verification link expires
  Given a verification link sent 20 minutes ago
  When user attempts to use the link
  Then system returns VERIFICATION_LINK_EXPIRED
  And prompts to request new link

Scenario: Rate limiting enforced
  Given user attempts 5 email verifications in 1 day
  When they attempt 6th verification
  Then system returns RATE_LIMIT_EXCEEDED
  And requires waiting until next day

Scenario: Duplicate email rejected
  Given alice@company.com already verified
  When another user tries to register with same email
  Then system returns EMAIL_ALREADY_EXISTS
  And prompts to login or use different email

Scenario: Malicious token rejected
  Given a verification link
  When attacker modifies the token
  Then system returns INVALID_VERIFICATION_TOKEN
  And logs security event
```

---

## Email Content

**Subject**: Verify your OpenOps account  
**Body**:
```
Hi [First Name],

Welcome to OpenOps! Verify your email to complete setup.

[VERIFY EMAIL BUTTON]

Or use this code: XXXX-XXXX

This link expires in 15 minutes.
```

---

## Database Changes

```sql
ALTER TABLE users ADD COLUMN email_verified_at TIMESTAMP;
ALTER TABLE users ADD COLUMN verification_token VARCHAR(255);
ALTER TABLE users ADD COLUMN verification_token_expires_at TIMESTAMP;

CREATE TABLE email_verification_attempts (
  id UUID PRIMARY KEY,
  email VARCHAR(255),
  attempt_count INT,
  last_attempt_at TIMESTAMP,
  reset_at TIMESTAMP
);
```

---

## Integration Points

- SendGrid / Mailgun API for email delivery
- Task 3: Passwordless login (uses verified email)
- Task 4: Password auth (uses verified email)
- Task 14: Security audit log (logs verification events)

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Email delivery rate | 99.9% |
| Verification time | <1 min (95% of users) |
| Rate limiting effectiveness | 0 duplicate emails verified |
| Link expiration enforcement | 100% rejected after 15 min |

---

## Security Considerations

- [ ] Verification tokens are cryptographically random
- [ ] Tokens cannot be guessed (entropy > 128 bits)
- [ ] Tokens expire server-side (cannot be extended)
- [ ] Rate limiting prevents brute force
- [ ] Email delivery logged for audit trail

---

**Task ID**: 2  
**Phase**: 1  
**Created**: 2026-01-12
