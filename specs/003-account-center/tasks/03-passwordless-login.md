# Task 3: Passwordless Login Option

**Phase**: Phase 1 - Identity & Authentication  
**Priority**: P1 - Critical  
**Estimated Effort**: 5-7 days  
**Owner**: Backend / Auth Lead  
**Depends On**: Task 0, Task 1, Task 2

---

## Executive Summary

Enable secure passwordless login using magic links as the primary authentication method, with device fingerprinting to prevent unauthorized access.

---

## Functional Requirements

- **FR-004**: System MUST implement passwordless login using cryptographically secure magic links with 15-minute expiration and device fingerprinting

---

## Task Description

Passwordless authentication provides security without complexity:
1. User enters email at login
2. System sends magic link (valid 15 minutes)
3. User clicks link from their device
4. Device fingerprint captured and verified
5. User logged in with active session

Magic links are more secure than passwords and have better UX.

---

## Magic Link Flow

```
Email entry → Send link → User clicks link → Device fingerprint captured → Session created → Logged in
```

### Magic Link Requirements

- [ ] Cryptographically secure token (256-bit entropy minimum)
- [ ] Expiration: 15 minutes
- [ ] Single-use (invalidated after click)
- [ ] Device fingerprint included
- [ ] IP address verified (optional re-challenge if different IP)

### Device Fingerprinting Components

```
Device Fingerprint = Hash(
  user_agent,
  ip_address,
  accept_language,
  timezone,
  screen_resolution
)
```

---

## Acceptance Criteria

- [ ] Magic link generation endpoint implemented
- [ ] Email sent with unique, secure link
- [ ] Link expires after 15 minutes
- [ ] Link becomes invalid after first use
- [ ] Device fingerprint captured on click
- [ ] Device fingerprint verified before session creation
- [ ] Session token issued upon successful verification
- [ ] Rate limiting: max 5 magic link requests per email per hour
- [ ] Tests: happy path (successful magic link login)
- [ ] Tests: expired link rejected
- [ ] Tests: second use of same link rejected
- [ ] Tests: device fingerprint mismatch triggers re-verification

---

## Testing Strategy

```gherkin
Scenario: User successfully logs in with magic link
  Given user enters email at login
  When they receive magic link email
  And click the link from same device
  Then session is created and user is logged in

Scenario: Magic link expires
  Given a magic link created 20 minutes ago
  When user attempts to click it
  Then system returns LINK_EXPIRED
  And prompts to request new link

Scenario: Same link cannot be used twice
  Given user clicks magic link successfully
  When another user tries to click same link
  Then system returns LINK_ALREADY_USED
  And logs security event

Scenario: Device fingerprint mismatch triggers challenge
  Given user receives magic link on Desktop
  When they click link from Mobile device
  Then system detects device fingerprint mismatch
  And requires secondary verification (2FA code)

Scenario: Rate limiting prevents abuse
  Given user requests 5 magic links in 1 hour
  When they request 6th link
  Then system returns RATE_LIMIT_EXCEEDED
  And blocks further requests for 1 hour
```

---

## Database Schema

```sql
CREATE TABLE magic_links (
  id UUID PRIMARY KEY,
  email VARCHAR(255),
  token VARCHAR(255) UNIQUE,
  device_fingerprint VARCHAR(255),
  ip_address INET,
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  used_at TIMESTAMP (nullable),
  status ENUM ('active', 'expired', 'used', 'invalid')
);

CREATE TABLE magic_link_attempts (
  id UUID PRIMARY KEY,
  email VARCHAR(255),
  attempt_count INT,
  last_attempt_at TIMESTAMP,
  reset_at TIMESTAMP
);
```

---

## Email Template

**Subject**: Your OpenOps Login Link  
**Body**:
```
Click to log in:
[LOGIN LINK - expires in 15 minutes]

Or use this code: XXXX-XXXX

If you didn't request this, ignore this email.
```

---

## Security Features

- [ ] Tokens are cryptographically random (not sequential)
- [ ] Tokens are unique per request
- [ ] Device fingerprint prevents cross-device login abuse
- [ ] Rate limiting prevents brute force
- [ ] Failed attempts logged and monitored
- [ ] Suspicious patterns trigger alerts

---

## Integration Points

- Task 2: Email First Auth (uses verified email)
- Task 4: Password Auth (alternative method)
- Task 12: Anomaly Detection (flags unusual devices)
- Task 14: Security Activity Log (logs all login attempts)

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Magic link success rate | 99.5% |
| Link delivery time | <1 min |
| Device fingerprint accuracy | >98% |
| Rate limiting effectiveness | 0 successful abuse |

---

**Task ID**: 3  
**Phase**: 1  
**Created**: 2026-01-12
