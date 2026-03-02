# Task 21: Teams Management System

**Phase**: Phase 6 - Teams & Collaboration  
**Priority**: P1 - Critical  
**Estimated Effort**: 6-8 days  
**Owner**: Backend / Teams Lead  
**Depends On**: Task 0, Task 1, Task 10

---

## Executive Summary

Implement teams feature allowing organizations to create sub-teams with independent memberships, permissions, and team-level settings.

---

## Functional Requirements

- **FR-022**: System MUST support team creation, membership, role assignment, and team-level permission management

---

## Task Description

Teams enable organizational structure:
1. Create teams within organization
2. Assign members to teams
3. Define team roles (lead, member)
4. Team-level permissions
5. Nested team support (premium)
6. Team resources isolation

---

## Acceptance Criteria

- [ ] Team creation by admin/owner
- [ ] Team name and description
- [ ] Team member assignment
- [ ] Team roles (lead, member)
- [ ] Team-level RBAC
- [ ] Nested teams support (premium)
- [ ] Team resource isolation
- [ ] Team member list
- [ ] Team member removal
- [ ] Team deletion (with data handling)
- [ ] Tests: team creation
- [ ] Tests: membership
- [ ] Tests: permissions

---

## Database Schema

```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(255),
  description TEXT,
  parent_team_id UUID REFERENCES teams(id) (nullable),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE team_members (
  id UUID PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  user_id UUID REFERENCES users(id),
  role ENUM ('lead', 'member'),
  joined_at TIMESTAMP,
  UNIQUE(team_id, user_id)
);
```

---

## Integration Points

- Task 1: RBAC system
- Task 10: Invitations
- Task 16: Org management
- Task 24: Resource management

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Team creation latency | <500ms |
| Member assignment accuracy | 100% |

---

**Task ID**: 21  
**Phase**: 6  
**Created**: 2026-01-12
