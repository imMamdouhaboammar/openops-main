# Task 17: Permission System & RBAC Implementation

**Phase**: Phase 4 - Account Management  
**Priority**: P1 - Critical  
**Estimated Effort**: 6-8 days  
**Owner**: Backend / Auth Lead  
**Depends On**: Task 0, Task 1

---

## Executive Summary

Implement complete permission-based RBAC system with resource-level permissions, permission inheritance, and dynamic policy evaluation.

---

## Functional Requirements

- **FR-018**: System MUST enforce RBAC with resource-level permissions, role inheritance, and policy-based authorization checks

---

## Task Description

Permission system enforces access control:
1. Define permissions per resource type
2. Assign permissions to roles
3. Check permissions on every action
4. Support role inheritance
5. Support resource-level overrides
6. Dynamic policy evaluation

---

## Permission Model

```
Role (Owner, Admin, Editor, Viewer)
  ├── Permissions (create, read, update, delete, share)
  ├── Resource Types (user, team, project, document)
  └── Resource-level exceptions
```

---

## Acceptance Criteria

- [ ] Role-permission mapping table
- [ ] Resource type definitions
- [ ] Permission check middleware
- [ ] Resource-level permission override
- [ ] Role inheritance chain
- [ ] Permission caching (5 min TTL)
- [ ] Audit trail for permission changes
- [ ] Bulk permission assignment
- [ ] Permission query optimization
- [ ] Tests: permission checks
- [ ] Tests: role inheritance
- [ ] Tests: permission caching
- [ ] Tests: override behavior

---

## Testing Strategy

```gherkin
Scenario: User creates document
  Given user with editor role
  When they attempt to create document
  Then permission check passes
  And document created

Scenario: Viewer cannot delete
  Given user with viewer role
  When they attempt to delete
  Then permission denied
  And 403 error returned

Scenario: Role hierarchy enforced
  Given admin with inherited permissions
  When editor role permissions change
  Then admin permissions not affected

Scenario: Resource-level override
  Given document shared with specific viewer
  When permissions checked for document
  Then document-specific permissions apply
```

---

## Database Schema

```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(50),
  description TEXT,
  is_system_role BOOLEAN DEFAULT false,
  created_at TIMESTAMP
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY,
  resource_type VARCHAR(50),
  action VARCHAR(50),
  description TEXT
);

CREATE TABLE role_permissions (
  id UUID PRIMARY KEY,
  role_id UUID REFERENCES roles(id),
  permission_id UUID REFERENCES permissions(id),
  UNIQUE(role_id, permission_id)
);

CREATE TABLE resource_permissions (
  id UUID PRIMARY KEY,
  resource_id UUID,
  resource_type VARCHAR(50),
  user_id UUID REFERENCES users(id),
  permission_id UUID REFERENCES permissions(id),
  granted_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP,
  UNIQUE(resource_id, user_id, permission_id)
);
```

---

## Permission Types

| Resource | Create | Read | Update | Delete | Share |
|----------|--------|------|--------|--------|-------|
| User | System | Own | Own | System | System |
| Team | Owner | Member | Owner | Owner | Owner |
| Project | Admin | Member | Owner | Owner | Owner |
| Document | Editor | Viewer | Editor | Editor | Owner |

---

## Permission Check Middleware

```typescript
async function checkPermission(
  userId: string,
  resourceType: string,
  action: string,
  resourceId?: string
): Promise<boolean> {
  // 1. Get user's role(s)
  const roles = await getUserRoles(userId);
  
  // 2. Check role-level permission
  const hasRolePermission = await hasPermission(
    roles, 
    resourceType, 
    action
  );
  
  if (!hasRolePermission) return false;
  
  // 3. Check resource-level override if applicable
  if (resourceId) {
    const hasResourcePermission = await hasResourcePermission(
      userId,
      resourceId,
      action
    );
    return hasResourcePermission;
  }
  
  return true;
}
```

---

## Role Definitions (System)

| Role | Permissions | Can Grant |
|------|-------------|-----------|
| Owner | All | All |
| Admin | All except delete org | Own level |
| Editor | Create, Read, Update | None |
| Viewer | Read | None |

---

## Integration Points

- Task 1: Role definitions
- Task 6: User creation (assign role)
- Task 10: Invitation (with role)
- Task 14: Permission audit trail
- Task 16: Permission UI

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Permission check latency | <10ms |
| Permission cache hit rate | >95% |
| Authorization accuracy | 100% |

---

**Task ID**: 17  
**Phase**: 4  
**Created**: 2026-01-12
