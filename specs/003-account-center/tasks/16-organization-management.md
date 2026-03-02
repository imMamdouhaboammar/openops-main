# Task 16: Organization Management UI & Settings

**Phase**: Phase 4 - Account Management  
**Priority**: P1 - Critical  
**Estimated Effort**: 6-8 days  
**Owner**: Frontend / Organizations Lead  
**Depends On**: Task 1, Task 10

---

## Executive Summary

Build comprehensive Organization Management interface with team member management, role administration, organization settings, and billing overview.

---

## Functional Requirements

- **FR-017**: System MUST provide Organization Management UI with team members, roles, settings, and billing controls

---

## Task Description

Org management interface for admins:
1. View organization details
2. Manage team members
3. Assign roles and permissions
4. Configure org settings
5. View billing information
6. Organization security settings

---

## Organization Management Layout

```
Organization Settings
├── Overview
│   ├── Organization Info
│   └── Member Count & Stats
├── Team Members
│   ├── Members List
│   ├── Invite Member
│   ├── Edit Member Role
│   └── Remove Member
├── Roles & Permissions
│   ├── Role Definitions
│   ├── Permission Matrix
│   └── Custom Roles (premium)
├── Settings
│   ├── Organization Name & Logo
│   ├── Security Settings
│   └── Integration Settings
├── Billing
│   ├── Current Plan
│   ├── Payment Methods
│   └── Invoices
└── API
    ├── API Keys
    └── Webhooks
```

---

## Acceptance Criteria

- [ ] Admin can view organization details
- [ ] Team member list with roles
- [ ] Invite button creates invitation
- [ ] Bulk invite functionality
- [ ] Edit member role (drag-drop or modal)
- [ ] Remove member with confirmation
- [ ] Permission matrix viewable
- [ ] Role creation/editing (premium)
- [ ] Organization settings editable
- [ ] Logo upload with preview
- [ ] Security settings configuration
- [ ] Billing overview
- [ ] Invoice download
- [ ] Tests: member management
- [ ] Tests: role assignment
- [ ] Tests: organization update

---

## Testing Strategy

```gherkin
Scenario: Admin invites team member
  Given admin in Organization > Team Members
  When they click "Invite Member"
  And enter email and select role
  Then invitation created
  And email sent
  And appears in pending list

Scenario: Role change takes effect
  Given member with editor role
  When admin changes to viewer
  Then permissions revoked
  And user notified
  And access updated

Scenario: Member removal with confirmation
  Given member in team
  When admin clicks remove
  Then confirmation dialog shown
  And after confirm, member removed
  And user notified
```

---

## Component Structure

```typescript
// OrganizationSettings
├── OrgHeader (org name, logo, stats)
├── TeamMembersList
│   ├── MemberRow (with role badge)
│   ├── InviteButton
│   ├── BulkActions
│   └── SearchFilter
├── RolePermissionMatrix
│   ├── RoleColumns (Owner, Admin, Editor, Viewer)
│   └── PermissionRows
├── OrgSettingsForm
│   ├── NameInput
│   ├── LogoUpload
│   └── SettingsGrid
└── BillingOverview
    ├── CurrentPlan
    ├── PaymentMethods
    └── InvoicesList
```

---

## Team Member Actions

| Action | By | Requires |
|--------|-----|----------|
| Invite | Owner/Admin | Email address |
| Edit Role | Owner/Admin | Permission to grant |
| Remove | Owner/Admin | Confirmation |
| View | All | Organization access |

---

## Permission Matrix Display

```
                Owner  Admin  Editor  Viewer
Invite users     ✓      ✓      ✗       ✗
Manage roles     ✓      ✗      ✗       ✗
Edit settings    ✓      ✓      ✗       ✗
View activity    ✓      ✓      ✓       ✓
```

---

## Billing Integration

- [ ] Show current plan
- [ ] Upgrade/downgrade options
- [ ] Payment method management
- [ ] Invoice history
- [ ] Usage statistics
- [ ] Billing contacts
- [ ] Auto-renewal status

---

## Integration Points

- Task 1: RBAC system
- Task 10: Invitation management
- Task 25: Billing system
- Task 26: Notifications

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Page load time | <2 sec |
| Member add time | <30 sec |
| UI responsiveness | 60 FPS |

---

**Task ID**: 16  
**Phase**: 4  
**Created**: 2026-01-12
