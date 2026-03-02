# Task 5: Multi-Device Session Management

**Phase**: Phase 1 - Identity & Authentication  
**Priority**: P1 - Critical  
**Estimated Effort**: 6-8 days  
**Owner**: Backend / Session Lead  
**Depends On**: Task 0, Task 1, Task 3

---

## Executive Summary

Allow users to manage multiple simultaneous sessions across devices with granular control, real-time notifications, and forced logout capabilities.

---

## Functional Requirements

- **FR-006**: System MUST support multi-device sessions with real-time session list, device management, remote logout, and suspicious activity detection

---

## Task Description

Users need to manage their accounts across multiple devices:
1. Track all active sessions with device info
2. Show device name, location, last activity
3. Allow user to rename devices
4. Force logout from specific or all devices
5. Real-time notifications of new sessions
6. Automatic logout of suspicious sessions

---

## Session Management Flow

```
Login → Create Session → Track Device → Show Session List → User Controls
```

---

## Acceptance Criteria

- [ ] Session table tracks user_id, device_id, IP, location, created_at, last_activity_at
- [ ] Device fingerprint stored with session
- [ ] Session list endpoint returns all active sessions
- [ ] User can view device details (name, location, last activity, type)
- [ ] User can rename device
- [ ] User can logout single session
- [ ] User can logout all other sessions
- [ ] New session triggers email notification
- [ ] Suspicious session (location jump, new device) requires verification
- [ ] Session auto-logout after 90 days inactivity
- [ ] Tests: session creation and tracking
- [ ] Tests: multi-device scenario
- [ ] Tests: forced logout
- [ ] Tests: suspicious activity detection

---

## Testing Strategy

```gherkin
Scenario: User views active sessions
  Given user is logged in on 3 devices
  When they open Settings > Sessions
  Then all 3 sessions are displayed with device info

Scenario: User logs out from specific device
  Given user has 3 active sessions
  When they click "Logout" on Device 2
  Then Device 2 session terminates
  And user receives confirmation email

Scenario: Suspicious session requires verification
  Given user in New York logged out
  When they login from London 30 minutes later
  Then system flags as suspicious location jump
  And requires 2FA verification

Scenario: Session auto-logout after inactivity
  Given session last_activity_at is 91 days ago
  When maintenance job runs
  Then session is deleted
  And next API call gets 401 UNAUTHORIZED

Scenario: Logout all other sessions
  Given user logged in on 3 devices
  When they click "Logout all other devices"
  Then only current session remains active
  And 2 other sessions terminated
```

---

## Database Schema

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  device_id UUID UNIQUE,
  device_name VARCHAR(255),
  device_type ENUM ('web', 'mobile_ios', 'mobile_android', 'desktop'),
  device_fingerprint VARCHAR(255),
  ip_address INET,
  country VARCHAR(2),
  city VARCHAR(100),
  user_agent TEXT,
  access_token VARCHAR(255) UNIQUE,
  refresh_token VARCHAR(255) UNIQUE,
  created_at TIMESTAMP,
  last_activity_at TIMESTAMP,
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE session_events (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  event_type ENUM ('login', 'logout', 'activity', 'suspicious', 'verified'),
  details JSON,
  created_at TIMESTAMP
);

CREATE TABLE device_locations (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  country VARCHAR(2),
  city VARCHAR(100),
  detected_at TIMESTAMP
);
```

---

## Session Lifecycle

| State | Duration | Action |
|-------|----------|--------|
| Created | - | Session starts |
| Active | 90 days | User can use |
| Inactive | 91+ days | Auto-logout |
| Logout | - | User initiates |

---

## Suspicious Activity Detection

Triggers re-verification when:
- [ ] Location change > 500km in < 1 hour
- [ ] New device/browser from same user
- [ ] Impossible travel scenario
- [ ] Multiple failed login attempts before success
- [ ] Login at unusual time for user

---

## Integration Points

- Task 2: Email verification
- Task 12: Anomaly detection
- Task 14: Security activity log
- Task 26: Push notifications for new sessions

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Session tracking accuracy | 100% |
| Suspicious detection false positives | <2% |
| Logout effectiveness | 100% |

---

**Task ID**: 5  
**Phase**: 1  
**Created**: 2026-01-12
