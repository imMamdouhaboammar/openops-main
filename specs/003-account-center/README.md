# Account Center (003) — Specification Complete ✅

**Status**: Ready for `/speckit.plan`  
**Created**: 2026-01-12  
**Branch**: `003-account-center`  
**Estimated Delivery**: 12 weeks (Phases 0–13)

---

## What Is The Account Center?

An **Enterprise-grade unified platform** managing:
- **Identity**: Email-based auth with passwordless, 2FA, session management
- **Ownership**: Immutable ledger of agents, packs, licenses, versions per user
- **Teams**: Organizations, roles, granular access control (RBAC)
- **Intelligence**: Account maturity, risk scoring, personalized recommendations
- **Billing**: Separate profiles, invoices, tax handling, metrics
- **Audit**: Comprehensive security log, compliance exports, legal transparency
- **Recovery**: Account restoration, support gating, consent tracking

**Not**: A simple profile page. **This is the nervous system of OpenOps**.

---

## Specification Overview

### 📋 Files Included

| File | Purpose | Contents |
|------|---------|----------|
| **spec.md** | Main specification | 7 user stories, 55 functional requirements, 20 success criteria |
| **ROADMAP_50_TASKS.md** | Task mapping | All 50 tasks → phases → requirements alignment |
| **checklists/requirements.md** | Quality validation | Confirmation spec meets all enterprise standards |

### 👥 User Stories (7 Total)

All are **independently deployable** and **independently testable**:

1. **P1 - Onboarding & Identity** (User Story 1)
   - Signup → role selection → org choice
   - Delivers: verified account with clear identity

2. **P1 - Secure Access & Sessions** (User Story 2)
   - Login → session management → anomaly detection
   - Delivers: transparent access control and revocation

3. **P1 - Account Ownership & Fleet** (User Story 3)
   - View owned agents → check licenses → manage versions
   - Delivers: transparent ownership and entitlement visibility

4. **P2 - Team Collaboration & RBAC** (User Story 4)
   - Create teams → invite members → assign roles
   - Delivers: working multi-member teams with access control

5. **P2 - Account Health & Intelligence** (User Story 5)
   - View maturity score → get recommendations → see risk alerts
   - Delivers: actionable insights and guidance

6. **P2 - Recovery & Support** (User Story 6)
   - Recover account → contact support → view billing
   - Delivers: working recovery path and support access

7. **P3 - Compliance & Transparency** (User Story 7)
   - Manage consents → view legal summaries → export audit logs
   - Delivers: transparent data practices and audit trail

### 🎯 Functional Requirements (55 Total)

Organized by **13 phases** (0–13):

- **Phase 0**: Core architecture (2 FR)
- **Phase 1**: Authentication (5 FR)
- **Phase 2**: Signup (5 FR)
- **Phase 3**: Security (4 FR)
- **Phase 4**: Account management (5 FR)
- **Phase 5**: Ownership/licensing (5 FR)
- **Phase 6**: Teams/RBAC (6 FR)
- **Phase 7**: Intelligence (4 FR)
- **Phase 8**: Billing (4 FR)
- **Phase 9**: Support/health (4 FR)
- **Phase 10**: API/extensibility (4 FR)
- **Phase 11**: Recovery/legal (3 FR)
- **Phase 12**: Advanced intelligence (4 FR)
- **Phase 13**: Orchestration (1 FR)

### ✅ Success Criteria (20 Total)

**Measurable, technology-agnostic outcomes**:

- Users complete setup in <3 minutes
- Dashboard loads in <500ms
- Passwordless auth succeeds 99.5% of the time
- Anomaly detection: >95% true positives, <5% false positives
- Team invitation accepted by 80% within 24 hours
- Account recovery within 15 minutes for 98% of cases
- Zero data redundancy (weekly verification)
- 1M+ account scalability with <5% latency increase
- User trust reaches 8.5/10
- Support tickets drop 60% post-launch

---

## 50-Task → 13-Phase Mapping

Your 50 tasks are **already mapped** to phases and functional requirements:

```
Phase 0  (1 task)  → Core initialization
Phase 1  (5 tasks) → Email + passwordless auth
Phase 2  (5 tasks) → Smart progressive signup
Phase 3  (4 tasks) → Security + anomaly detection
Phase 4  (5 tasks) → Account management
Phase 5  (4 tasks) → Ownership ledger
Phase 6  (4 tasks) → Team collaboration + RBAC
Phase 7  (3 tasks) → Personalization engine
Phase 8  (4 tasks) → Billing management
Phase 9  (3 tasks) → Support + health indicators
Phase 10 (4 tasks) → API + extensibility
Phase 11 (3 tasks) → Recovery + legal
Phase 12 (6 tasks) → Advanced intelligence
Phase 13 (1 task)  → Orchestrator
---
TOTAL: 50 tasks → 13 phases → 55 functional requirements → 7 user stories
```

**See [ROADMAP_50_TASKS.md](./ROADMAP_50_TASKS.md) for full task-to-requirement mapping**.

---

## Key Architectural Principles

### 🏗️ Single Source of Truth

Account Center is **the single authoritative source** for:
- User identity (email, roles, permissions)
- Ownership (agents, packs, versions owned)
- Sessions (who's logged in, when, where)
- Audit trail (what happened, when, who did it)

**No redundancy**. Weekly verification ensures consistency.

### 🔐 Security First

- **Passwordless default** (magic links) with optional password fallback
- **2FA opt-in** with recovery codes
- **Anomaly detection** (unusual IP/time/device) with challenges
- **Account lock** after 5 failed attempts, 30-min cooldown
- **Audit logging** of all security events with device fingerprinting
- **OWASP-compliant** authentication, CVSS 3.0+ standards

### 🎯 Enterprise-Ready

- **RBAC** with owner/admin/editor/viewer roles
- **Multi-tenancy** with organization isolation
- **Compliance** (GDPR, CCPA, SOC 2) via immutable audit trail
- **Scalability** to 1M+ accounts with <5% latency increase
- **Audit exports** in JSON/CSV for compliance
- **Consent tracking** with legal transparency
- **Tax handling** per region without PII exposure

### 🧠 Intelligence Built-In

- **Account maturity scoring** (0-100) based on setup completeness
- **Risk scoring** based on security gaps and anomalies
- **Personalized recommendations** (P1/P2/P3 priority)
- **Context-aware notifications** (max 2/day, never spam)
- **Smart suggestions** for access adjustments based on usage patterns

---

## Development Timeline

### Suggested Phasing for `/speckit.plan`

| Phase | Focus | Duration | Tasks | Dependencies |
|-------|-------|----------|-------|---|
| **0** | Core schema, event model, data layer | 1 week | 1 | None |
| **1–2** | Authentication, signup, email validation | 2 weeks | 10 | Phase 0 |
| **3** | Security infrastructure, anomaly detection | 1 week | 4 | Phase 1 |
| **4–5** | Account management, ownership ledger | 2 weeks | 9 | Phases 1–3 |
| **6** | Team collaboration, RBAC | 1.5 weeks | 4 | Phase 5 |
| **7–9** | Intelligence, billing, support | 2 weeks | 10 | Phases 4–6 |
| **10** | API layer, extensibility | 1 week | 4 | All previous |
| **11–13** | Recovery, legal, orchestration | 1.5 weeks | 7 | All previous |
| **Testing & Polish** | E2E, edge cases, performance | 1.5 weeks | - | All phases |
| **TOTAL** | **Full Account Center** | **~12 weeks** | **50 tasks** | **Sequential but parallelizable** |

### Parallel Opportunities

Within each phase tier:
- Phase 1 auth work can parallelize with Phase 0 schema design
- Phase 4 account management can run parallel with Phase 3 security
- Phase 7 intelligence work can start once Phase 5 ownership exists
- Phase 8 billing can be stubbed early once Phase 4 defines data structures

---

## What's NOT Included (By Design)

These are **explicitly out of scope** for MVP:

- ❌ Third-party identity federation (OAuth, SAML, LDAP) → Phase 10+
- ❌ Advanced analytics dashboards → Separate "Analytics" feature
- ❌ Custom user workflows → Future enhancement
- ❌ Real-time collaboration → Separate feature
- ❌ ML-based fraud detection → Can integrate post-launch
- ❌ Advanced SSO across products → Requires architecture discussion

**These are intentionally deferred** to keep MVP focused on core Account Center value.

---

## Key Entities (Database Schema)

10 core entities with relationships:

```
User (email, roles, permissions)
  ↓ owns many
Organization (multiple users, billing)
  ↓ contains many
Team (scoped access)
  ↓ has many
Member (user in team with role)

User → owns many
Ownership Record (agent/pack/version/license)
  ↓ has many
License (expiration, transfer rights)

User → manages many
Session (device, IP, TTL, fingerprint)

System → tracks all
Audit Log Entry (timestamp, action, actor, IP, device, outcome)

User → consents to many
Consent Record (data usage, communications)

Org → uses many
Recommendation (personalized action items)

Org → pays via
Billing Profile (separate from identity, encrypted)
```

**Detailed entity definitions**: See spec.md "Key Entities" section.

---

## Critical Success Factors

### ✅ Build Right the First Time

These aspects **must be correct from Day 1** (breaking them late is catastrophic):

1. **Single source of truth architecture** — if identity data becomes redundant, inconsistency follows
2. **Immutable audit trail** — audit logs must never be mutable or deletable
3. **Multi-tenant isolation** — cross-org data leakage is a security breach
4. **Session revocation** — revoked sessions must terminate immediately, everywhere
5. **Ownership ledger integrity** — corrupted ownership destroys business trust

### ✅ Phase Dependency Sequencing

**Strict order required**:

```
Phase 0 (Schema)
  ↓
Phases 1–2 (Auth + Signup) must complete before...
  ↓
Phases 3–5 (Security + Account Mgmt + Ownership)
  ↓
Phase 6 (Teams) — needs role model from Phase 4
  ↓
Phases 7–9 (Intelligence + Billing + Support)
  ↓
Phase 10 (API) — final integration layer
  ↓
Phases 11–13 (Recovery + Legal + Orchestration)
```

**Can parallelize**: Within each phase level, unrelated work (e.g., Phase 4 account mgmt + Phase 5 ownership ledger) can run in parallel.

---

## How to Proceed

### Next: `/speckit.plan`

When ready to move to planning phase:

```
/speckit.plan
```

This will:
1. Break 50 tasks into **granular development steps** (stories, commits, PRs)
2. Assign **task dependencies** and **parallelization opportunities**
3. Create **acceptance criteria per task**
4. Define **test scenarios** for each phase
5. Prepare **architecture diagrams** (schema, data flow, API contracts)

---

## Questions to Answer Before Planning

These are clarified **in the spec**, but confirm your team agrees:

1. ✅ **Email is identity anchor** — do we accept this or require SSO day 1? 
   - **Spec assumes**: Email + passwordless; password optional; SSO post-launch

2. ✅ **Passwordless is default** — is magic link acceptable for initial MVP?
   - **Spec assumes**: Yes, with password fallback available

3. ✅ **Ownership is immutable** — should agents be transferable only via explicit transfer?
   - **Spec assumes**: Yes, ownership never auto-changes; explicit transfer only

4. ✅ **Audit retention is 7 years** — acceptable per GDPR/enterprise standards?
   - **Spec assumes**: Yes; can adjust if regulatory need differs

5. ✅ **Session TTL is 30 days** — acceptable or should we go shorter?
   - **Spec assumes**: 30 days inactive TTL; shorter per tier is possible

---

## Document Checklist

- ✅ **spec.md** — Complete 7-story, 55-requirement specification
- ✅ **ROADMAP_50_TASKS.md** — All 50 tasks mapped to phases and FRs
- ✅ **checklists/requirements.md** — Quality validation, all checks passed
- ✅ **README.md** — This file, guide to planning phase

---

## Support & Questions

**Specification Status**: ✅ **APPROVED FOR PLANNING**

**Next Steps**:
1. Team review of spec and roadmap
2. Confirm clarification questions above (or accept defaults)
3. Run `/speckit.plan` to break into development tasks
4. Assign phases to teams
5. Begin Phase 0 schema design

**Questions?** Review:
- [spec.md](./spec.md) for detailed requirements
- [ROADMAP_50_TASKS.md](./ROADMAP_50_TASKS.md) for task mapping
- [checklists/requirements.md](./checklists/requirements.md) for quality validation

---

**Feature**: Enterprise Account Center (003-account-center)  
**Created**: 2026-01-12  
**Status**: Ready for `/speckit.plan`  
**All 50 tasks mapped** ✅
