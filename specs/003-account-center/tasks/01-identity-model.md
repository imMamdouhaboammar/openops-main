# Task 1: Identity Model Definition

**Phase**: Phase 1 - Identity & Authentication  
**Priority**: P1 - Critical  
**Estimated Effort**: 3-5 days  
**Owner**: Backend / Identity Lead  
**Depends On**: Task 0 (Core Initialization)

---

## Executive Summary

Define the canonical user identity model as the foundation for all authorization, ownership, and access control in OpenOps.

---

## Task Description

Create a standardized representation of user identity that includes:
- Identity attributes (email, name, etc.)
- Role hierarchy (owner, admin, editor, viewer)
- Organization context (which org they belong to)
- Ownership scope (what they own/can access)
- Immutable audit trail

---

## Functional Requirements

- **FR-002**: System MUST define canonical user identity model including roles (owner/member/admin/viewer), organization context, and ownership scope without ambiguity

---

## Data Model

```typescript
User {
  id: UUID (primary key)
  email: string (unique, verified)
  first_name: string
  last_name: string
  avatar_url: string (optional)
  roles: Role[] (enum: owner, admin, editor, viewer)
  primary_organization_id: UUID
  organizations: Organization[] (can belong to multiple)
  status: UserStatus (enum: active, deactivated, deleted)
  created_at: timestamp
  updated_at: timestamp
  deleted_at: timestamp (nullable)
}

Role {
  id: UUID
  name: string (owner, admin, editor, viewer)
  permissions: Permission[] (what can they do)
  organization_id: UUID (scoped per org)
  created_at: timestamp
}

Permission {
  id: UUID
  resource: string (agents, licenses, members, settings)
  action: string (read, write, delete, transfer)
  role_id: UUID
}
```

---

## Acceptance Criteria

- [ ] Role hierarchy documented (owner > admin > editor > viewer)
- [ ] Permission matrix created for each role per resource
- [ ] Organization context model defined
- [ ] Ownership scope model defined (what user can own)
- [ ] Identity immutability rules defined (what can/cannot change)
- [ ] Role transition rules defined (how roles change)
- [ ] Tests pass: verify role permissions
- [ ] Tests pass: verify organization scoping
- [ ] Documentation: Role matrix (public-facing)

---

## Role Permissions Matrix

| Role | Agents | Licenses | Members | Settings | Billing |
|------|--------|----------|---------|----------|---------|
| **Owner** | R/W/Delete | R/W/Transfer | R/W/Remove | R/W | R/W |
| **Admin** | R/W | R/W | R/W/Remove | R/W | R (read) |
| **Editor** | R/W | R | R | R | - |
| **Viewer** | R | R | R | R | - |

---

## Testing Strategy

```gherkin
Scenario: User has correct permissions for role
  Given a user with "admin" role
  When accessing agent resource
  Then they can read and write but not transfer ownership

Scenario: Owner role has all permissions
  Given a user with "owner" role in organization
  When accessing any resource
  Then all actions (read, write, delete, transfer) are permitted

Scenario: Viewer role is read-only
  Given a user with "viewer" role
  When attempting to modify an agent
  Then system denies with PERMISSION_DENIED error

Scenario: Role cannot exceed organization scope
  Given user with "admin" role in org-a
  When attempting to access org-b resources
  Then system denies with ORGANIZATION_SCOPE_VIOLATION
```

---

## Ownership Scope Rules

- **Owner**: Can own multiple agents, packs, licenses
- **Admin**: Cannot create ownership (only owner can)
- **Editor**: Cannot manage ownership
- **Viewer**: Cannot manage ownership

---

## Integration Points

- Task 2 (Email First Auth): Uses identity model to assign roles
- Task 3 (Passwordless): Uses identity to verify user
- Task 6 (Team Creation): Uses role model for team permissions
- Task 25 (RBAC): Extends this role model

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Role coverage | 100% (all 4 roles documented) |
| Permission matrix clarity | 0 ambiguities |
| Organization scoping | Verified with tests |
| Ownership scope validation | 100% test coverage |

---

**Task ID**: 1  
**Phase**: 1  
**Created**: 2026-01-12
