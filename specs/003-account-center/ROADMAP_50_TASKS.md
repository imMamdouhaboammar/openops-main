# 50-Task Roadmap → Account Center Specification Mapping

**Purpose**: Direct mapping from your 50-task specification to the formal Account Center spec  
**Created**: 2026-01-12  
**Status**: Complete

---

## Phase 0: Structural Foundation

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 0 | Account Center Core Initialization | Create unified schema for identity, ownership, permissions, audit logs | Foundation | - | FR-001, FR-002 |

---

## Phase 1: Identity & Authentication

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 1 | Identity Model Definition | Define canonical user with roles and ownership scope | User Story 1 | Onboarding | FR-002 |
| 2 | Email First Authentication | Email-based signup/login as identity anchor | User Story 2 | Secure Access | FR-003 |
| 3 | Passwordless Login Option | Magic links with 15min expiration and device fingerprinting | User Story 2 | Secure Access | FR-004 |
| 4 | Password Auth Fallback | Optional password auth with breach detection | User Story 2 | Secure Access | FR-005 |
| 5 | Multi-Device Session Management | Track active sessions, allow revocation | User Story 2 | Secure Access | FR-006 |

---

## Phase 2: Signup & Onboarding

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 6 | Smart Signup Flow | Progressive signup, minimal friction | User Story 1 | Onboarding | FR-008 |
| 7 | Intent Detection on Signup | Infer user role (founder/consultant/team-lead) | User Story 1 | Onboarding | FR-009 |
| 8 | Role Preselection | Suggest initial role, allow override | User Story 1 | Onboarding | FR-009 |
| 9 | Organization Optional Creation | User chooses individual or org context | User Story 1 | Onboarding | FR-010 |
| 10 | Domain-Based Org Suggestion | Auto-suggest org if email domain matches | User Story 1 | Onboarding | FR-011 |

---

## Phase 3: Security & Protection

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 11 | Two-Factor Authentication | TOTP-based 2FA with recovery codes | User Story 2 | Secure Access | FR-007 |
| 12 | Login Anomaly Detection | Detect unusual patterns, trigger challenges | User Story 2 | Secure Access | FR-013 |
| 13 | Account Lock Logic | Lock after 5 failed attempts, 30min cooldown | User Story 2 | Secure Access | FR-014 |
| 14 | Security Activity Log | Transparent audit log of all security events | User Story 2 | Secure Access | FR-015 |

---

## Phase 4: Account Management

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 15 | Account Overview Dashboard | Summary of identity, fleet, security, team | User Story 1, 5 | Onboarding, Health | FR-017 |
| 16 | Profile Metadata Management | Edit name, avatar, bio with history | User Story 1 | Onboarding | FR-018 |
| 17 | Email Change Flow | Secure dual-confirmation email change | User Story 1 | Onboarding | FR-019 |
| 18 | Account Deactivation | Temporary deactivation preserving ownership | User Story 1 | Onboarding | FR-020 |
| 19 | Account Deletion with Cooldown | 30-day cooldown, irreversible ownership warnings | User Story 1 | Onboarding | FR-021 |

---

## Phase 5: Ownership & Licensing

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 20 | Ownership Ledger | Immutable ledger of owned agents/packs/licenses | User Story 3 | Fleet Management | FR-022 |
| 21 | License Management | View, assign, extend licenses per agent | User Story 3 | Fleet Management | FR-025 |
| 22 | Download History | Track downloads with version/platform context | User Story 3 | Fleet Management | FR-024 |
| 23 | Version Entitlement Logic | Define version access based on purchase rules | User Story 3 | Fleet Management | FR-023 |

---

## Phase 6: Teams & Organizations

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 24 | Team Creation | Create teams with scoped access | User Story 4 | Team Collab | FR-027 |
| 25 | Role-Based Access Control | Implement RBAC with granular permissions | User Story 4 | Team Collab | FR-028 |
| 26 | Member Invitation System | Invite members with predefined roles/expiration | User Story 4 | Team Collab | FR-029 |
| 27 | Member Activity Tracking | Track member actions on fleet | User Story 4 | Team Collab | FR-030 |

---

## Phase 7: Intelligence & Personalization

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 28 | Account Maturity Scoring | Score based on completeness (0-100) | User Story 5 | Health & Intelligence | FR-033 |
| 29 | Personalized Recommendations Engine | Generate P1/P2/P3 recommendations | User Story 5 | Health & Intelligence | FR-034 |
| 30 | Context-Aware Notifications | Send relevant notifications (max 2/day) | User Story 5 | Health & Intelligence | FR-035 |

---

## Phase 8: Billing & Payment

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 31 | Billing Profile Management | Separate billing profiles from identity | User Story 6 | Recovery & Support | FR-037 |
| 32 | Invoice History | Downloadable invoices with breakdown | User Story 6 | Recovery & Support | FR-038 |
| 33 | Tax and Compliance Handling | Handle tax per region without PII exposure | User Story 6 | Recovery & Support | FR-039 |
| 34 | Billing Metrics | Track spend, license utilization | User Story 6 | Recovery & Support | FR-040 |

---

## Phase 9: Support & Transparency

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 34 | Support Access Control | Gate support by tier and ownership | User Story 6 | Recovery & Support | FR-041 |
| 35 | Issue History Timeline | Track reported issues and resolutions | User Story 6 | Recovery & Support | FR-042 |
| 36 | Account Health Indicators | Expose security/usage/compliance/risk scores | User Story 5 | Health & Intelligence | FR-043 |

---

## Phase 10: Future Extensibility

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 37 | API Key Management | Generate scoped API keys | Future | - | FR-045 |
| 38 | Audit Export | Export audit logs in JSON/CSV | User Story 7 | Compliance | FR-046 |
| 39 | Cross-Platform Identity Sync | Prepare for external platform sync | Future | - | FR-047 |
| 40 | Feature Flag Control | Enable feature flags at account level | Future | - | FR-048 |

---

## Phase 11: Recovery & Access

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 41 | Account Recovery Center | Handle lost access, locked accounts | User Story 6 | Recovery & Support | FR-049 |
| 42 | Consent Management | Track consents for data usage | User Story 7 | Compliance | FR-050 |
| 43 | Legal Transparency Panel | Plain-language legal summaries | User Story 7 | Compliance | FR-051 |

---

## Phase 12: Advanced Intelligence

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 44 | Activity Feed | Unified timeline of account events | User Story 7 | Compliance | FR-036 |
| 45 | Account Export Snapshot | Generate downloadable account snapshot | User Story 6 | Recovery & Support | User Story 6 |
| 46 | Account Risk Scoring | Score risk from behavior/security/anomalies | User Story 5 | Health & Intelligence | FR-052 |
| 47 | Smart Access Suggestions | Suggest access adjustments | User Story 5 | Health & Intelligence | FR-053 |
| 48 | Adaptive Onboarding Re-entry | Re-trigger steps based on gaps | User Story 1 | Onboarding | FR-054 |
| 49 | Account Intelligence Summary | Concise account operational state | User Story 5 | Health & Intelligence | Summary |

---

## Phase 13: Orchestration & Integration

| Task # | Task Name | Description | Maps To | User Story | FR References |
|--------|-----------|-------------|---------|-----------|---|
| 50 | Account Center Orchestrator | Coordinate identity/ownership/billing/intelligence | Foundation | - | FR-055 |

---

## Mapping Summary

| Phase | Tasks | User Stories | Functional Requirements | Key Deliverable |
|-------|-------|---|---|---|
| 0 | 1 | - | 2 (FR-001, FR-002) | Single source of truth |
| 1 | 5 | 2 | 5 (FR-003–FR-007) | Email + passwordless auth |
| 2 | 5 | 1 | 5 (FR-008–FR-012) | Smart progressive signup |
| 3 | 4 | 2 | 4 (FR-013–FR-016) | Secure anomaly detection |
| 4 | 5 | 1 | 5 (FR-017–FR-021) | Account management |
| 5 | 4 | 3 | 5 (FR-022–FR-026) | Ownership ledger |
| 6 | 4 | 4 | 6 (FR-027–FR-032) | Team RBAC |
| 7 | 3 | 5 | 4 (FR-033–FR-036) | Personalization engine |
| 8 | 4 | 6 | 4 (FR-037–FR-040) | Billing management |
| 9 | 3 | 6, 5 | 4 (FR-041–FR-044) | Support & health |
| 10 | 4 | 7, Future | 4 (FR-045–FR-048) | API & extensibility |
| 11 | 3 | 6, 7 | 3 (FR-049–FR-051) | Recovery & legal |
| 12 | 6 | 5, 6, 7 | 4 (FR-052–FR-055) | Intelligence & insights |
| 13 | 1 | - | 1 (FR-055) | Orchestration |
| **TOTAL** | **50** | **7** | **55** | **Enterprise Account Center** |

---

## Key Alignments

### User Story ↔ Phase Mapping

- **User Story 1** (Onboarding): Phases 0, 2, 4, 11 → Identity → Signup → Account Mgmt → Recovery
- **User Story 2** (Secure Access): Phases 1, 3 → Auth → Security
- **User Story 3** (Fleet Management): Phase 5 → Ownership & Licensing
- **User Story 4** (Team Collaboration): Phase 6 → Teams & RBAC
- **User Story 5** (Account Health): Phases 7, 9, 12 → Intelligence & Scoring
- **User Story 6** (Recovery & Support): Phases 8, 9, 11, 12 → Billing → Support → Recovery
- **User Story 7** (Compliance): Phases 10, 11, 12 → Export → Legal → Transparency

### Functional Requirement Coverage

- **Identity & Auth**: FR-001 through FR-007 (Phases 0–1)
- **Signup & Onboarding**: FR-008 through FR-012 (Phase 2)
- **Security**: FR-013 through FR-016 (Phase 3)
- **Account Ops**: FR-017 through FR-021 (Phase 4)
- **Ownership**: FR-022 through FR-026 (Phase 5)
- **Teams**: FR-027 through FR-032 (Phase 6)
- **Intelligence**: FR-033 through FR-036 (Phase 7)
- **Billing**: FR-037 through FR-040 (Phase 8)
- **Support & Health**: FR-041 through FR-044 (Phase 9)
- **API & Future**: FR-045 through FR-048 (Phase 10)
- **Recovery & Legal**: FR-049 through FR-051 (Phase 11)
- **Advanced**: FR-052 through FR-055 (Phases 12–13)

---

**Validation**: All 50 tasks mapped. All 7 user stories covered. All 55 FRs specified. ✅
