# Task 18: Organization Ownership Transfer

**Phase**: Phase 5 - Ownership & Licensing  
**Priority**: P2 - Important  
**Estimated Effort**: 4-5 days  
**Owner**: Backend / Ownership Lead  
**Depends On**: Task 0, Task 1, Task 10

---

## Executive Summary

Implement secure organization ownership transfer mechanism with verification, approval workflow, and complete permission transfer.

---

## Functional Requirements

- **FR-019**: System MUST support ownership transfer with recipient verification, approval workflow, and complete permission handoff

---

## Task Description

Allow current owner to transfer organization:
1. Current owner initiates transfer
2. Recipient receives email verification
3. Recipient accepts transfer
4. Recipient becomes new owner
5. Previous owner becomes admin (optional)
6. Audit trail logged

---

## Transfer Flow

```
Initiate → Select recipient → Email invite → Recipient accepts → Owner changed → Complete
```

---

## Acceptance Criteria

- [ ] Only owner can initiate transfer
- [ ] Recipient must accept transfer
- [ ] 7-day acceptance window
- [ ] Transfer can be cancelled before acceptance
- [ ] Verification email sent to recipient
- [ ] Recipient sees confirmation dialog
- [ ] Transfer completion logged
- [ ] Previous owner role adjustable
- [ ] All permissions transferred
- [ ] Billing contact updated
- [ ] Tests: transfer initiation
- [ ] Tests: acceptance flow
- [ ] Tests: expiration handling
- [ ] Tests: permission transfer

---

## Testing Strategy

```gherkin
Scenario: Owner transfers organization
  Given current owner
  When they initiate transfer to "alice@example.com"
  Then invitation email sent
  And transfer pending
  And current owner still has control

Scenario: Transfer acceptance
  Given pending transfer
  When recipient accepts via email link
  Then ownership transferred
  And previous owner becomes admin
  And notifications sent

Scenario: Transfer cancellation
  Given pending transfer
  When current owner cancels
  Then transfer revoked
  And recipient notified
  And can be reinitiated

Scenario: Transfer expiration
  Given transfer created 8 days ago
  When recipient tries to accept
  Then transfer expired
  And owner notified
```

---

## Database Schema

```sql
CREATE TABLE ownership_transfers (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  from_user_id UUID REFERENCES users(id),
  to_email VARCHAR(255),
  to_user_id UUID REFERENCES users(id) (nullable),
  token VARCHAR(255) UNIQUE,
  status ENUM ('pending', 'accepted', 'expired', 'cancelled'),
  previous_owner_role ENUM ('admin', 'editor', 'viewer', 'none') DEFAULT 'admin',
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  accepted_at TIMESTAMP (nullable)
);
```

---

## Transfer Email

**Subject**: Organization Ownership Transfer for [Org Name]  
**Body**:
```
Hi [Recipient],

[Current Owner] wants to transfer ownership of [Org Name] to you.

Accept transfer:
[ACCEPT LINK - expires in 7 days]

Decline transfer:
[DECLINE LINK]

If you didn't expect this, contact the sender.
```

---

## Permission Transfer

On transfer completion:
- [ ] All org permissions transfer to new owner
- [ ] Previous owner role updated
- [ ] Billing contact updated (if applicable)
- [ ] Admin notifications sent
- [ ] Audit trail created
- [ ] Session continuity maintained

---

## Safety Features

- [ ] Must be owner to initiate
- [ ] Must verify recipient email
- [ ] 7-day acceptance window (time for reconsideration)
- [ ] Cancellation always possible before acceptance
- [ ] Notification to all org admins
- [ ] Clear confirmation dialog for recipient

---

## Integration Points

- Task 1: Permission updates
- Task 10: Invitation system
- Task 14: Audit logging
- Task 25: Billing contact update

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Transfer completion rate | >95% |
| Acceptance average time | <24 hours |
| Permission transfer accuracy | 100% |

---

**Task ID**: 18  
**Phase**: 5  
**Created**: 2026-01-12
