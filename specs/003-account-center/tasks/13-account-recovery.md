# Task 13: Account Recovery & Deactivation

**Phase**: Phase 3 - Security & 2FA  
**Priority**: P2 - Important  
**Estimated Effort**: 5-6 days  
**Owner**: Backend / Account Lead  
**Depends On**: Task 0, Task 2, Task 6

---

## Executive Summary

Implement secure account recovery (password reset, account unlock) and deactivation (temporary pause, permanent deletion) features.

---

## Functional Requirements

- **FR-014**: System MUST support account recovery (password reset, unlock), deactivation (temporary), and permanent deletion with verification

---

## Task Description

Account lifecycle management:
1. Password reset via email verification
2. Account unlock after failed attempts
3. Temporary deactivation (pause)
4. Permanent deletion with data retention options
5. Reactivation of deactivated accounts

---

## Recovery Flows

### Password Reset
```
Request → Email verification → Set new password → Confirmation
```

### Account Unlock
```
Account locked → Request unlock → Email verification → Unlocked
```

### Deactivation
```
Initiate → Confirmation email → 7-day grace period → Disabled
```

### Deletion
```
Request → Email verification → Confirm → 30-day recovery → Delete
```

---

## Acceptance Criteria

- [ ] POST /account/password-reset initiates reset
- [ ] Email sent with reset link (1-hour expiration)
- [ ] New password validation enforced
- [ ] Old password cannot be reused
- [ ] Locked account can request unlock
- [ ] Unlock email sent with verification
- [ ] POST /account/deactivate disables account
- [ ] 7-day confirmation grace period
- [ ] User can reactivate within 7 days
- [ ] POST /account/delete initiates deletion
- [ ] 30-day recovery period
- [ ] After 30 days, permanent deletion
- [ ] Data export before deletion (optional)
- [ ] Tests: password reset flow
- [ ] Tests: account unlock
- [ ] Tests: deactivation and reactivation
- [ ] Tests: deletion confirmation

---

## Testing Strategy

```gherkin
Scenario: User resets forgotten password
  Given user forgot password
  When they request password reset
  And verify email
  And set new password
  Then password updated
  And login works with new password

Scenario: Account reactivated within grace period
  Given user initiated deactivation
  When they access account within 7 days
  And click reactivate
  Then account reactivated immediately

Scenario: Account deleted after grace period
  Given user requested deletion 31 days ago
  When daily cleanup job runs
  Then account deleted permanently
  And no recovery possible

Scenario: Locked account unlock
  Given user has 10 failed login attempts
  When account locked
  And they request unlock
  Then email sent with verification link
  And they can login again
```

---

## Database Schema

```sql
CREATE TABLE account_recovery (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  recovery_type ENUM ('password_reset', 'unlock'),
  token VARCHAR(255) UNIQUE,
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  used_at TIMESTAMP (nullable),
  status ENUM ('pending', 'used', 'expired')
);

CREATE TABLE account_deactivation (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  reason TEXT (nullable),
  deactivated_at TIMESTAMP,
  reactivate_until TIMESTAMP,
  deleted_at TIMESTAMP (nullable)
);

CREATE TABLE data_export_requests (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  export_type ENUM ('full', 'personal', 'activity'),
  status ENUM ('pending', 'ready', 'downloaded', 'expired'),
  file_url VARCHAR(2048) (nullable),
  requested_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

---

## Recovery Email Templates

**Password Reset**:
```
Subject: Reset Your Password

Click to reset password:
[RESET LINK - expires in 1 hour]

If you didn't request this, ignore this email.
```

**Account Unlock**:
```
Subject: Unlock Your Account

Your account was locked after failed login attempts.

Unlock account:
[UNLOCK LINK - expires in 24 hours]
```

**Deactivation Confirmation**:
```
Subject: Your Account Will Be Deactivated

Your account will be deactivated in 7 days.

Reactivate now:
[REACTIVATE LINK]

Or request immediate deletion:
[DELETE LINK]
```

---

## GDPR Data Deletion Compliance

- [ ] Right to be forgotten implemented
- [ ] Data retention policy transparent
- [ ] 30-day grace period for recovery
- [ ] After grace period, complete deletion
- [ ] Irreversible process documented
- [ ] Audit trail preserved (encrypted)

---

## Integration Points

- Task 2: Email delivery
- Task 4: Password validation
- Task 14: Activity logging
- Task 50: Compliance reporting

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Password reset success | 99% |
| Account reactivation rate | >80% |
| Data deletion accuracy | 100% |

---

**Task ID**: 13  
**Phase**: 3  
**Created**: 2026-01-12
