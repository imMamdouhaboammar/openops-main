# Task 12: Anomaly Detection & Risk Assessment

**Phase**: Phase 3 - Security & 2FA  
**Priority**: P2 - Important  
**Estimated Effort**: 7-9 days  
**Owner**: Backend / Security Lead  
**Depends On**: Task 0, Task 5, Task 14

---

## Executive Summary

Implement ML-based anomaly detection monitoring login patterns, access behavior, and flagging suspicious activities for risk-based authentication.

---

## Functional Requirements

- **FR-013**: System MUST detect anomalies in login patterns, access behavior, and trigger adaptive authentication based on risk scores

---

## Task Description

Detect suspicious activities to prevent account takeover:
1. Track user baseline behavior
2. Monitor login patterns
3. Calculate risk score
4. Trigger 2FA for high-risk logins
5. Block very-high-risk attempts
6. Alert user of suspicious activity

---

## Risk Scoring Algorithm

```
Risk Score = (Location Risk × 0.4) + (Time Risk × 0.3) + (Device Risk × 0.3)

Location Risk = Distance from last login location / time since last login
Time Risk = Deviation from user's normal login hours
Device Risk = New device / browser not seen before
```

---

## Acceptance Criteria

- [ ] Track user's typical login times
- [ ] Track user's geographic locations
- [ ] Store known devices per user
- [ ] Calculate risk score for each login
- [ ] Risk score < 0.3: Allow
- [ ] Risk score 0.3-0.7: Require 2FA
- [ ] Risk score > 0.7: Block + alert
- [ ] Learn from user feedback
- [ ] Whitelist trusted devices/locations
- [ ] Allow user to challenge blocks
- [ ] Tests: risk score calculation
- [ ] Tests: 2FA triggering
- [ ] Tests: learning from feedback

---

## Testing Strategy

```gherkin
Scenario: Normal login from familiar location
  Given user in New York normally logs in at 9am
  When they login from New York at 9:15am
  Then risk_score < 0.3
  And login allowed

Scenario: Suspicious geographic anomaly
  Given last login from New York 30 minutes ago
  When user attempts login from London
  Then risk_score > 0.7 (impossible travel)
  And login blocked
  And verification email sent

Scenario: New device triggers 2FA
  Given user with 10 known devices
  When they login from new device
  Then risk_score = 0.5
  And 2FA required

Scenario: User whitelists location
  Given login blocked from remote office
  When user verifies via email
  And adds to whitelist
  Then future logins from office allowed
```

---

## Database Schema

```sql
CREATE TABLE login_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  ip_address INET,
  country VARCHAR(2),
  city VARCHAR(100),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  device_fingerprint VARCHAR(255),
  timestamp TIMESTAMP
);

CREATE TABLE known_devices (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  device_fingerprint VARCHAR(255),
  device_name VARCHAR(255),
  first_seen TIMESTAMP,
  last_seen TIMESTAMP,
  is_trusted BOOLEAN DEFAULT false
);

CREATE TABLE risk_events (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  event_type VARCHAR(50),
  risk_score DECIMAL(3,2),
  action_taken ENUM ('allowed', '2fa_required', 'blocked'),
  details JSON,
  created_at TIMESTAMP
);

CREATE TABLE whitelisted_locations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  ip_address INET (nullable),
  country VARCHAR(2) (nullable),
  city VARCHAR(100) (nullable),
  added_by_user BOOLEAN DEFAULT true,
  added_at TIMESTAMP
);
```

---

## Anomaly Triggers

| Trigger | Risk Increase |
|---------|--------------|
| New country | +0.4 |
| Impossible travel | +0.5 |
| Outside normal hours | +0.2 |
| New device | +0.3 |
| Failed previous login | +0.2 |

---

## Machine Learning Model

Train model on:
- [ ] Login timestamps distribution
- [ ] Geographic patterns
- [ ] Device/browser combinations
- [ ] IP reputation scores
- [ ] Velocity checks (impossible travel)

---

## Integration Points

- Task 5: Session management
- Task 11: 2FA enforcement
- Task 14: Security logging
- Task 26: Notifications

---

## Success Metrics

| Metric | Target |
|--------|--------|
| False positive rate | <2% |
| Fraud detection rate | >95% |
| False negatives | <1 |

---

**Task ID**: 12  
**Phase**: 3  
**Created**: 2026-01-12
