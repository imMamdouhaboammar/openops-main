# Task 0: Account Center Core Initialization

**Phase**: Phase 0 - Structural Foundation  
**Priority**: P1 - Critical  
**Estimated Effort**: 5-8 days  
**Owner**: Backend Lead / Database Architect

---

## Executive Summary

Design and implement the unified schema that serves as the **single source of truth** for the entire Account Center. This is the foundational architecture that everything else depends on.

---

## Task Description

The Account Center must be architected as a **single authoritative source** for identity, ownership, permissions, and audit logs. This task involves:

1. **Data Model Design**: Define the canonical data model with no redundancy across systems
2. **Event-Driven Architecture**: Set up event sourcing for all state changes
3. **Database Schema**: Create normalized schema for all 10 core entities
4. **API Contracts**: Define internal service contracts
5. **Integration Boundaries**: Establish clear boundaries between Account Center and other systems

---

## Functional Requirements Covered

- **FR-001**: System MUST maintain Account Center as single source of truth for identity, ownership, permissions, and audit logs with zero data redundancy
- **FR-002**: System MUST define canonical user identity model including roles (owner/member/admin/viewer), organization context, and ownership scope without ambiguity

---

## Key Entities to Define

```typescript
User {
  id: UUID
  email: string (unique)
  roles: Role[] (owner, member, admin, viewer)
  organization_id: UUID
  created_at: timestamp
  updated_at: timestamp
}

Organization {
  id: UUID
  name: string
  owner_id: UUID
  members: User[]
  created_at: timestamp
}

Ownership {
  id: UUID
  user_id: UUID
  agent_id: UUID
  license_id: UUID
  owned_at: timestamp
  immutable: true
}

Audit {
  id: UUID
  timestamp: timestamp
  actor: UUID
  action: string
  resource: string
  outcome: string
  ip_address: string
  device_fingerprint: string
}
```

---

## Acceptance Criteria

- [ ] Database schema created with all 10 core entities
- [ ] Zero data redundancy validation (no duplicate ownership/identity data)
- [ ] Event sourcing infrastructure set up
- [ ] Internal API contracts documented
- [ ] Migration scripts prepared (for future data transitions)
- [ ] Audit trail database tested with 1M+ records
- [ ] Read replicas configured for audit queries
- [ ] Weekly reconciliation job implemented (validates single source of truth)

---

## Dependencies

**None** - This is Phase 0, no prior phases required

**Downstream**: All other phases depend on this

---

## Testing Strategy

### Unit Tests
```gherkin
Scenario: Schema enforces unique email per user
  Given a new user with email alice@company.com
  When another user tries to register with same email
  Then system rejects with UNIQUE_CONSTRAINT_VIOLATION

Scenario: Audit log records immutable
  Given an audit entry for user login
  When attempting to update the entry
  Then system rejects with IMMUTABLE_RECORD error

Scenario: Ownership ledger is write-once
  Given an ownership record created
  When attempting to modify it
  Then system allows only append-only updates (new entries, never modifications)
```

### Integration Tests
```gherkin
Scenario: Single source of truth validation
  Given Account Center data and external system cache
  When running weekly reconciliation
  Then no discrepancies are found (100% match)

Scenario: Audit trail captures all changes
  Given a user profile update
  When reading audit trail for that user
  Then exactly one audit entry exists with correct timestamp, actor, action
```

### Performance Tests
```gherkin
Scenario: Query optimization for 1M accounts
  Given Account Center with 1M users
  When querying user by email
  Then response time is <10ms (with index)

Scenario: Audit log export performance
  Given 100M audit entries
  When exporting 1 month of logs
  Then export completes in <5 seconds
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────┐
│  Account Center Schema Layer                │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────┐  ┌──────────────┐         │
│  │   Users     │  │ Organization │         │
│  ├─────────────┤  ├──────────────┤         │
│  │ id          │  │ id           │         │
│  │ email (PK)  │  │ name         │         │
│  │ roles       │  │ owner_id (FK)│         │
│  │ created_at  │  │ created_at   │         │
│  └─────────────┘  └──────────────┘         │
│        │                                   │
│        └──────────┬──────────────┐         │
│                   │              │         │
│       ┌───────────▼──┐  ┌────────▼────┐   │
│       │   Ownership  │  │   Session   │   │
│       ├──────────────┤  ├─────────────┤   │
│       │ id           │  │ id          │   │
│       │ user_id (FK) │  │ user_id(FK) │   │
│       │ agent_id     │  │ device_fp   │   │
│       │ license_id   │  │ ip_address  │   │
│       │ owned_at     │  │ created_at  │   │
│       │ (immutable)  │  └─────────────┘   │
│       └──────────────┘                    │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │     Audit Log (Immutable)            │  │
│  ├──────────────────────────────────────┤  │
│  │ id | timestamp | actor | action ...  │  │
│  └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
          Event Stream Feed
        (for cross-system updates)
```

---

## Implementation Checklist

- [ ] **Week 1-2**: Database schema design & review
  - [ ] ERD diagram created and reviewed by architect
  - [ ] Normalization verified (3NF)
  - [ ] Indexes planned for all FK relationships

- [ ] **Week 2-3**: Database setup & migration framework
  - [ ] PostgreSQL schema created
  - [ ] Primary keys and foreign keys enforced
  - [ ] Unique constraints on email and ownership records
  - [ ] Migration versioning system implemented

- [ ] **Week 3-4**: Event sourcing infrastructure
  - [ ] Event store table created (immutable events)
  - [ ] Event schema versioning designed
  - [ ] Replay mechanism tested

- [ ] **Week 4-5**: Testing & validation
  - [ ] Unit tests passing (schema constraints)
  - [ ] Integration tests passing (single source of truth)
  - [ ] Performance tests passing (query optimization)
  - [ ] Load test with 1M+ records

- [ ] **Week 5**: Documentation & handoff
  - [ ] Database schema documented
  - [ ] Migration procedures documented
  - [ ] Event sourcing guide written
  - [ ] Code review completed

---

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|---|
| Schema constraints | 100% enforced | Database test suite |
| Data redundancy | 0 | Weekly reconciliation script |
| Query performance | <10ms | Index + load tests |
| Audit trail integrity | 100% complete | Event comparison test |
| Write-once compliance | 100% on ownership | Constraint tests |

---

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Schema misalignment with services | Design review with all team leads |
| Data migration issues later | Versioning + rollback capability designed now |
| Performance problems at scale | Load testing with 10M+ records |
| Audit trail gaps | Event sourcing with replay verification |

---

## Handoff Criteria

✅ This task is complete when:
- [ ] All 10 entities have normalized schema
- [ ] Zero redundancy verified
- [ ] Event sourcing proven working
- [ ] Weekly reconciliation job running successfully
- [ ] Load tests pass (1M+ records, <10ms queries)
- [ ] All tests passing (unit + integration + performance)
- [ ] Architecture documentation complete
- [ ] Team trained on schema and migration procedures

---

## Blockers / Dependencies

**None at start** - but subsequent tasks (1-50) cannot begin until this is approved.

**Approval Required From**:
- Database Architect
- Backend Lead
- Security Lead (for audit trail immutability requirements)

---

**Task ID**: 0  
**Phase**: 0  
**Created**: 2026-01-12  
**Status**: Ready for Planning
