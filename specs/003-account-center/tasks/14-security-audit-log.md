# Task 14: Security Activity Log & Audit Trail

**Phase**: Phase 3 - Security & 2FA  
**Priority**: P1 - Critical  
**Estimated Effort**: 5-7 days  
**Owner**: Backend / Audit Lead  
**Depends On**: Task 0

---

## Executive Summary

Implement comprehensive security audit logging for all account changes, logins, 2FA modifications, and permission updates with immutable trail.

---

## Functional Requirements

- **FR-015**: System MUST maintain immutable security audit logs with timestamps, actors, actions, and results for all account changes

---

## Task Description

Audit trail provides accountability:
1. Log all security events
2. Track who did what and when
3. Immutable append-only log
4. User can view their own activities
5. Admins can view organization activities
6. Searchable activity history
7. Export capabilities for compliance

---

## Events Logged

| Event | Details |
|-------|---------|
| Login | User, device, location, success/failure |
| 2FA setup | Method, timestamp |
| Password change | Initiator, timestamp |
| Session creation | Device, location, session ID |
| Permission change | Changed by, previous/new role |
| Invitation sent | Recipient, role, sender |
| Team member removal | Removed by, removed member |
| Deactivation | Reason, timestamp |
| Recovery attempt | Type, success/failure |
| Billing update | Changed by, previous/new method |

---

## Acceptance Criteria

- [ ] Immutable audit log table
- [ ] All events logged with timestamp
- [ ] Actor (user_id/system) recorded
- [ ] Action type categorized
- [ ] Original and new values stored
- [ ] IP address and user agent logged
- [ ] GET /audit-log returns user's activities
- [ ] GET /audit-log?org_id= returns org activities (admin only)
- [ ] Searchable by date range
- [ ] Searchable by event type
- [ ] Searchable by actor
- [ ] Export to CSV endpoint
- [ ] Retention policy (7 years per GDPR)
- [ ] Tests: event logging
- [ ] Tests: search and filter
- [ ] Tests: export functionality

---

## Testing Strategy

```gherkin
Scenario: Login event logged
  Given user logs in
  When authentication succeeds
  Then audit entry created with:
    - event_type = 'login'
    - user_id
    - ip_address
    - device_fingerprint
    - timestamp

Scenario: User views own activity
  Given user with activity history
  When they visit Settings > Activity
  Then all their events displayed
  And cannot see other users' events

Scenario: Admin audits organization
  Given organization admin
  When they visit Audit Log
  Then all org member activities visible
  And searchable by user/event/date

Scenario: Immutable log enforcement
  Given audit entry created
  When system attempts to update entry
  Then operation fails
  And error returned
```

---

## Database Schema

```sql
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) (nullable),
  organization_id UUID REFERENCES organizations(id),
  event_type VARCHAR(50),
  action VARCHAR(50),
  status ENUM ('success', 'failure'),
  ip_address INET,
  user_agent TEXT,
  resource_type VARCHAR(50),
  resource_id UUID,
  old_value JSONB (nullable),
  new_value JSONB (nullable),
  created_at TIMESTAMP NOT NULL,
  INDEX idx_user_id_created_at (user_id, created_at),
  INDEX idx_org_id_created_at (organization_id, created_at),
  INDEX idx_event_type_created_at (event_type, created_at)
);
```

**Constraints**:
- No UPDATE allowed on audit_log (append-only)
- No DELETE allowed on audit_log
- Automatic created_at timestamp

---

## Event Categories

- [ ] Authentication Events (login, logout, 2FA)
- [ ] Account Events (profile update, deactivation)
- [ ] Security Events (password change, 2FA setup)
- [ ] Permission Events (role change, invitation)
- [ ] Billing Events (payment method, plan change)
- [ ] Organization Events (member add/remove, settings)
- [ ] System Events (API calls, data access)

---

## Compliance Features

- [ ] GDPR audit trail (7-year retention)
- [ ] SOC 2 compliance logging
- [ ] ISO 27001 tracking
- [ ] Access log immutability
- [ ] Retention policies enforced
- [ ] Export for audits
- [ ] Tamper detection

---

## Integration Points

- All tasks: Every security action logged
- Task 2: Login events
- Task 11: 2FA setup events
- Task 13: Recovery events
- Task 25: Billing changes

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Event logging completeness | 100% |
| Audit search latency | <1 sec |
| Data retention compliance | 100% |

---

**Task ID**: 14  
**Phase**: 3  
**Created**: 2026-01-12
