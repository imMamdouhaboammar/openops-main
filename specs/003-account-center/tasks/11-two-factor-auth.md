# Task 11: Two-Factor Authentication (2FA)

**Phase**: Phase 3 - Security & 2FA  
**Priority**: P1 - Critical  
**Estimated Effort**: 6-8 days  
**Owner**: Backend / Security Lead  
**Depends On**: Task 0, Task 1, Task 4

---

## Executive Summary

Implement comprehensive 2FA system with TOTP, SMS, and email backup codes for securing accounts.

---

## Functional Requirements

- **FR-012**: System MUST provide 2FA with TOTP (RFC 6238), SMS, email codes, backup codes, and recovery options

---

## Task Description

2FA protects accounts from unauthorized access:
1. User enables 2FA
2. Choose method: TOTP app, SMS, or email
3. Verify with initial code
4. Generate 10 backup codes
5. Prompt 2FA on login
6. Recovery via backup codes

---

## 2FA Methods

| Method | Setup | Security | Recovery |
|--------|-------|----------|----------|
| TOTP (Authenticator App) | Scan QR code | High | Backup codes |
| SMS | Phone number | Medium | Email code |
| Email | Email address | Medium | Backup codes |

---

## Acceptance Criteria

- [ ] User can enable 2FA via settings
- [ ] TOTP QR code generated (RFC 6238)
- [ ] SMS delivery via Twilio
- [ ] Email 2FA code sent
- [ ] 6-digit code validation
- [ ] Code expiration: 30 seconds for TOTP, 10 minutes for SMS/email
- [ ] 10 backup codes generated
- [ ] Backup codes can be used once
- [ ] Backup codes encrypted in storage
- [ ] Method switching allowed
- [ ] Trusted device option (optional)
- [ ] Tests: 2FA setup
- [ ] Tests: code validation
- [ ] Tests: backup code usage
- [ ] Tests: method switching

---

## Testing Strategy

```gherkin
Scenario: User enables TOTP 2FA
  Given user in security settings
  When they choose TOTP method
  Then QR code displayed
  And time-based codes work with authenticator app

Scenario: SMS 2FA during login
  Given user with SMS 2FA
  When they login with password
  Then SMS code sent to registered phone
  And they must enter code to complete login

Scenario: Backup code usage
  Given user has TOTP enabled
  When TOTP device is lost
  And they use backup code
  Then login succeeds
  And backup code marked as used

Scenario: 2FA code expiration
  Given TOTP code generated at 14:00:00
  When user tries code at 14:00:31
  Then code rejected as EXPIRED
```

---

## Database Schema

```sql
CREATE TABLE two_factor_auth (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  method ENUM ('totp', 'sms', 'email'),
  secret_key VARCHAR(255),
  phone_number VARCHAR(20) (encrypted),
  backup_codes_hash VARCHAR(255),
  is_enabled BOOLEAN DEFAULT false,
  enabled_at TIMESTAMP (nullable),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE backup_codes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  code_hash VARCHAR(255),
  used_at TIMESTAMP (nullable),
  created_at TIMESTAMP
);

CREATE TABLE two_factor_sessions (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  challenge_token VARCHAR(255),
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

---

## TOTP Implementation (RFC 6238)

```typescript
import speakeasy from 'speakeasy';

// Generate TOTP secret
function generateTOTPSecret(email: string) {
  return speakeasy.generateSecret({
    name: `OpenOps (${email})`,
    issuer: 'OpenOps',
    length: 32
  });
}

// Verify TOTP code
function verifyTOTPCode(secret: string, code: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: code,
    window: 2 // Allow 1 code before/after
  });
}
```

---

## Backup Codes Generation

- [ ] Generate 10 unique codes
- [ ] 8-character format: XXXX-XXXX
- [ ] Hash before storage (bcrypt)
- [ ] Never display in plain text after initial generation
- [ ] Show once for download/print
- [ ] One-time use enforcement
- [ ] Regeneration allowed anytime

---

## Integration Points

- Task 2: Email delivery
- Task 5: Session management
- Task 12: Anomaly detection
- Task 14: Security logging

---

## Success Metrics

| Metric | Target |
|--------|--------|
| 2FA adoption rate | >50% |
| Code validation success | >99.5% |
| False rejections | <0.5% |

---

**Task ID**: 11  
**Phase**: 3  
**Created**: 2026-01-12
