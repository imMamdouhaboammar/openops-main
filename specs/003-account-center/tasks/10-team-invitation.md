# Task 10: Team Member Invitation & Onboarding

**Phase**: Phase 2 - Signup & Onboarding  
**Priority**: P1 - Critical  
**Estimated Effort**: 5-7 days  
**Owner**: Backend / Teams Lead  
**Depends On**: Task 0, Task 1, Task 6

---

## Executive Summary

Implement team member invitation system with role assignment, email notifications, acceptance tracking, and permission setup automation.

---

## Functional Requirements

- **FR-011**: System MUST support team member invitations with role assignment, email delivery, acceptance tracking, and permission automation

---

## Task Description

Allow organization owners/admins to invite team members:
1. Owner invites user by email
2. Invitation email sent with link
3. User accepts invitation
4. User joins team with assigned role
5. Permissions automatically configured
6. Audit logged

---

## Invitation Flow

```
Create Invitation → Send Email → User Clicks Link → Accept → Create Membership → Log
```

---

## Acceptance Criteria

- [ ] POST /invitations endpoint creates invitation
- [ ] Invitation email sent with unique token
- [ ] Token expires after 7 days
- [ ] Token is single-use
- [ ] GET /invitations lists pending invitations
- [ ] Inviter can resend or revoke
- [ ] User can accept/decline invitation
- [ ] On acceptance, team_membership created
- [ ] Role permissions applied immediately
- [ ] Email sent confirming join
- [ ] Audit log entry created
- [ ] Tests: invitation creation
- [ ] Tests: email delivery
- [ ] Tests: acceptance flow
- [ ] Tests: expired token rejected

---

## Testing Strategy

```gherkin
Scenario: Owner invites team member
  Given owner in team management
  When they invite "alice@example.com" as editor
  Then invitation created
  And email sent to alice@example.com
  And invitation appears in pending list

Scenario: User accepts invitation
  Given user receives invitation email
  When they click link and accept
  Then user joins team
  And role permissions applied
  And confirmation email sent

Scenario: Invitation token expires
  Given invitation created 8 days ago
  When user tries to accept
  Then system returns TOKEN_EXPIRED
  And prompts to request new invitation

Scenario: Inviter revokes invitation
  Given pending invitation
  When owner clicks revoke
  Then invitation marked as revoked
  And user cannot accept
  And notification sent to user
```

---

## Database Schema

```sql
CREATE TABLE team_invitations (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  invited_email VARCHAR(255),
  invited_by_user_id UUID REFERENCES users(id),
  role ENUM ('owner', 'admin', 'editor', 'viewer'),
  token VARCHAR(255) UNIQUE,
  status ENUM ('pending', 'accepted', 'revoked', 'expired'),
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  accepted_at TIMESTAMP (nullable)
);

CREATE TABLE invitation_resend_history (
  id UUID PRIMARY KEY,
  invitation_id UUID REFERENCES team_invitations(id),
  resent_by_user_id UUID REFERENCES users(id),
  resent_at TIMESTAMP
);
```

---

## Invitation Email Template

**Subject**: You're invited to [Org Name] on OpenOps  
**Body**:
```
Hi there,

You've been invited to join [Org Name] as [Role] by [Inviter Name].

Accept Invitation:
[ACCEPT LINK - expires in 7 days]

Questions? Reply to this email.
```

---

## Bulk Invitations

- [ ] CSV import for bulk invites
- [ ] Batch API endpoint
- [ ] Progress tracking
- [ ] Partial failure handling
- [ ] Retry mechanism

---

## Integration Points

- Task 1: Role definitions and permissions
- Task 6: User account management
- Task 14: Activity logging
- Task 24: RBAC enforcement

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Invitation acceptance rate | >80% |
| Email delivery rate | >98% |
| Acceptance average time | <24 hours |

---

**Task ID**: 10  
**Phase**: 2  
**Created**: 2026-01-12
