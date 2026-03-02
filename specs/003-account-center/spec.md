# Feature Specification: Enterprise Account Center

**Feature Branch**: `003-account-center`  
**Created**: 2026-01-12  
**Status**: Draft  
**Input**: Build a unified Account Center managing identity, ownership, permissions, billing, and audit trails as an Enterprise-grade platform

---

## User Scenarios & Testing

### User Story 1 - User Onboarding & Identity Establishment (Priority: P1)

A new user joins the platform, establishes their identity, and chooses between individual or organization-based ownership.

**Why this priority**: Identity is the foundation. Without a reliable identity layer, nothing else works. This is the entry point for every user.

**Independent Test**: Can be fully tested by: new user signing up, choosing authentication method, establishing initial ownership context. Delivers: a verified user account with clear identity and initial permissions.

**Acceptance Scenarios**:

1. **Given** a new user visits the platform, **When** they initiate signup with email, **Then** they receive a verification email and can proceed passwordlessly
2. **Given** a user completes passwordless verification, **When** they confirm signup intent (founder/consultant/team-lead), **Then** the system suggests an appropriate initial role
3. **Given** a user with corporate email domain completes signup, **When** existing org with that domain exists, **Then** system suggests joining or creating separate org
4. **Given** a user completes signup, **When** they choose organization context, **Then** either an org is created or user joins existing org
5. **Given** a user opts to create organization during signup, **When** org is created, **Then** user becomes org owner with full administrative capabilities

---

### User Story 2 - Secure Access & Session Management (Priority: P1)

A user logs in, manages their active sessions across devices, and can revoke suspicious activity.

**Why this priority**: Security is non-negotiable for Enterprise. Users must trust their access is protected and auditable.

**Independent Test**: Can be fully tested by: logging in from multiple devices, viewing active sessions, revoking a session, detecting anomalies. Delivers: transparent session visibility and revocation capability.

**Acceptance Scenarios**:

1. **Given** a registered user, **When** they attempt login with email and optional password, **Then** they authenticate successfully and receive a session token
2. **Given** a user with passwordless setup, **When** they attempt login, **Then** they receive a magic link valid for 15 minutes
3. **Given** a user with 2FA enabled, **When** they log in, **Then** system requires secondary verification before granting session
4. **Given** a user with active sessions from multiple devices, **When** they view account settings, **Then** they see all active sessions with device name, location, and last activity
5. **Given** a user viewing their sessions, **When** they click "revoke" on a session, **Then** that session is immediately invalidated and user on that device is logged out
6. **Given** a login from unusual location/time/device, **When** anomaly detection triggers, **Then** system challenges user with secondary verification

---

### User Story 3 - Account Ownership & Fleet Management (Priority: P1)

A user manages the agents, packs, versions, and licenses they own or have access to.

**Why this priority**: Ownership tracking is core to OpenOps business model. Without clear ownership/entitlement, billing and access control fail.

**Independent Test**: Can be fully tested by: downloading an agent, checking download history, viewing owned licenses, understanding version entitlements. Delivers: transparent ownership and entitlement visibility.

**Acceptance Scenarios**:

1. **Given** a user owns agents/packs, **When** they view their account overview, **Then** they see count of owned agents, total downloads, current licenses, and security status
2. **Given** a user, **When** they view their ownership ledger, **Then** they see all owned agents with version, license status, download count, and creation date
3. **Given** a user with purchased agents, **When** they check version entitlement, **Then** they see which versions they're licensed for and update eligibility
4. **Given** a user viewing an agent they own, **When** they manage licenses, **Then** they can extend, transfer, or revoke licenses
5. **Given** a user's account, **When** they download an agent, **Then** the system records this in their download history with timestamp, version, and platform context

---

### User Story 4 - Team Collaboration & Access Control (Priority: P2)

An organization owner creates teams, assigns members with specific roles, and controls what each member can access.

**Why this priority**: Multi-user organizations need granular access. P2 because single-user orgs work without this, but enterprise clients require it.

**Independent Test**: Can be fully tested by: creating team, inviting members, assigning roles, restricting access, verifying member can only see permitted resources. Delivers: working multi-member teams with role-based access.

**Acceptance Scenarios**:

1. **Given** an org owner, **When** they create a new team, **Then** team is created with scoped access to specified agents/resources
2. **Given** a team exists, **When** org owner invites member with email, **Then** member receives invitation with expiration, and can accept to join team
3. **Given** an invited member, **When** they accept invitation, **Then** they're added to team with assigned role (viewer/editor/admin)
4. **Given** a member with restricted role, **When** they browse resources, **Then** they only see agents/data their role permits
5. **Given** a member in team, **When** org owner revokes access, **Then** all sessions for that member are terminated and they lose access immediately

---

### User Story 5 - Account Health & Intelligence (Priority: P2)

A user views actionable insights about their account maturity, security health, and usage patterns.

**Why this priority**: Intelligence drives engagement and trust. P2 because account functions without it, but high-value users benefit significantly.

**Independent Test**: Can be fully tested by: viewing account overview with health indicators, seeing personalized recommendations, receiving context-aware notifications. Delivers: transparent account assessment and next-step guidance.

**Acceptance Scenarios**:

1. **Given** a user account, **When** they view their account dashboard, **Then** they see: maturity score, security risk score, account health indicators, and recommended actions
2. **Given** a user with incomplete setup, **When** maturity scoring runs, **Then** system generates score based on: identity completeness, ownership setup, team configuration, security settings
3. **Given** an account with security gaps, **When** risk scoring runs, **Then** system flags: unused sessions, weak auth, missing 2FA, and suggests mitigations
4. **Given** a user based on their usage patterns, **When** recommendation engine runs, **Then** it suggests: next agents to try, access controls to establish, team roles to optimize
5. **Given** a user, **When** events occur, **Then** they receive notifications only for actions relevant to their current goals and context

---

### User Story 6 - Account Recovery & Support (Priority: P2)

A user regains access if they lose credentials, contacts support, and accesses billing history.

**Why this priority**: Recovery prevents churn. Support access gates by account tier. P2 because most users don't need it, but essential when they do.

**Independent Test**: Can be fully tested by: initiating account recovery, contacting support (if permitted), viewing billing history. Delivers: working recovery path and transparent support/billing access.

**Acceptance Scenarios**:

1. **Given** a user unable to access account, **When** they use "recover account" flow, **Then** system verifies identity and sends recovery email
2. **Given** a user following recovery email, **When** they create new password, **Then** they regain access and all other sessions are terminated for security
3. **Given** a user with support-eligible tier, **When** they file support request, **Then** request is created and linked to their account context
4. **Given** a user, **When** they view billing section, **Then** they see: invoice history, download links, tax info, and payment methods
5. **Given** a user requesting account data export, **When** they initiate export, **Then** they receive downloadable snapshot of account state for records

---

### User Story 7 - Compliance & Transparency (Priority: P3)

A user understands what data is collected, consents are tracked, and can audit all account activity.

**Why this priority**: Compliance protects both users and platform. Enterprise customers demand this. P3 because core features work without it, but required for regulated customers.

**Independent Test**: Can be fully tested by: viewing legal summaries, checking consent status, reviewing full audit log export. Delivers: transparent data practices and audit trail.

**Acceptance Scenarios**:

1. **Given** a user account, **When** they view consent management panel, **Then** they see all tracked consents with dates and ability to modify
2. **Given** a user, **When** they access legal/transparency panel, **Then** they see plain-language summaries of data handling for their actions
3. **Given** a user, **When** they request audit export, **Then** they receive downloadable JSON with all account activity, logins, changes, and access events
4. **Given** an account, **When** security activity occurs, **Then** event is logged with: action, timestamp, actor, IP, device, and outcome
5. **Given** a user viewing activity feed, **Then** they see unified timeline of meaningful account events (login, access changes, ownership transfers)

---

### Edge Cases

- What happens when user attempts signup with already-registered email?
- How does system handle session hijacking or device spoofing?
- What if organization domain changes and current users' emails no longer match?
- How is ownership handled if both user and agent are marked for deletion simultaneously?
- What happens to licenses if account is deactivated but ownership exists?
- How does system handle concurrent login attempts from multiple geographical locations?
- What if user requests data export while account deletion is in cooldown period?
- How are team permissions reconciled if team is deleted while members are still active?

---

## Requirements

### Functional Requirements

#### Phase 0: Core Foundation

- **FR-001**: System MUST maintain Account Center as single source of truth for identity, ownership, permissions, and audit logs with zero data redundancy
- **FR-002**: System MUST define canonical user identity model including roles (owner/member/admin/viewer), organization context, and ownership scope without ambiguity

#### Phase 1: Authentication & Identity

- **FR-003**: System MUST support email-based authentication as primary identity anchor with extensibility for future methods (OAuth, SAML, etc.)
- **FR-004**: System MUST implement passwordless login using cryptographically secure magic links with 15-minute expiration and device fingerprinting
- **FR-005**: System MUST provide optional password-based authentication with PBKDF2/bcrypt hashing, breach detection, and password history
- **FR-006**: System MUST track all active sessions per user across devices and allow revocation with immediate access termination
- **FR-007**: System MUST support two-factor authentication via time-based OTP (TOTP) with recovery codes

#### Phase 2: Signup & Onboarding

- **FR-008**: System MUST implement progressive signup collecting only email initially, deferring role/org decisions to later steps
- **FR-009**: System MUST infer user intent from signup context (founder/consultant/team-lead/enterprise) and offer initial role suggestion
- **FR-010**: System MUST allow users to create private organization or continue as individual during signup
- **FR-011**: System MUST detect when user email domain matches existing organization and suggest joining or creating separate org
- **FR-012**: System MUST validate email ownership before account activation with maximum 5 verification attempts per email per day

#### Phase 3: Security & Anomaly Detection

- **FR-013**: System MUST detect anomalous login patterns (unusual IP/time/device) and trigger secondary verification challenge
- **FR-014**: System MUST implement account lock after 5 failed login attempts within 15 minutes with 30-minute cooldown and recovery email
- **FR-015**: System MUST maintain comprehensive security activity log accessible to account owner with: timestamp, action, actor, IP, device fingerprint, outcome
- **FR-016**: System MUST comply with OWASP authentication guidelines and maintain CVSS 3.0+ security standards

#### Phase 4: Account Management

- **FR-017**: System MUST provide account overview dashboard summarizing: identity, fleet size, ownership count, security status, team size in <500ms
- **FR-018**: System MUST allow controlled editing of profile metadata (name, avatar, bio) with validation rules and change history
- **FR-019**: System MUST implement secure email change flow requiring both old and new email verification
- **FR-020**: System MUST support account deactivation (temporary) without deleting ownership data or cascading deletions
- **FR-021**: System MUST implement account deletion with 30-day cooldown period and irreversible ownership warnings

#### Phase 5: Ownership & Licensing

- **FR-022**: System MUST maintain complete ledger of owned agents, packs, versions, and licenses per account with immutable history
- **FR-023**: System MUST track version entitlements based on purchase rules (perpetual/subscription/trial/free)
- **FR-024**: System MUST record download history including: version, timestamp, platform, user agent, IP address
- **FR-025**: System MUST allow license extension, transfer between accounts, and revocation with proper audit trail
- **FR-026**: System MUST calculate ownership metrics: total agents owned, active licenses, deprecation status of versions owned

#### Phase 6: Team & Organization Management

- **FR-027**: System MUST enable creation of teams within organization with scoped access to agents/resources
- **FR-028**: System MUST implement role-based access control (RBAC) with predefined roles: owner/admin/editor/viewer with granular permissions per role
- **FR-029**: System MUST support member invitation system with expiring tokens and resend capability
- **FR-030**: System MUST track member actions affecting fleet and account integrity with full audit trail
- **FR-031**: System MUST support member removal with immediate session termination and access revocation
- **FR-032**: System MUST allow members to leave organization/team without losing personal data

#### Phase 7: Intelligence & Personalization

- **FR-033**: System MUST calculate account maturity score based on: identity completeness, ownership setup, team configuration, security adoption (0-100 scale)
- **FR-034**: System MUST generate personalized recommendations based on: account behavior, missing configurations, industry patterns (P1/P2/P3 priority)
- **FR-035**: System MUST send context-aware notifications only when relevant to user's current goals, not as spam (max 2/day per user)
- **FR-036**: System MUST provide activity feed unified across account actions: logins, access changes, ownership transfers, team changes

#### Phase 8: Billing & Payment

- **FR-037**: System MUST maintain separate billing profiles from identity with encrypted sensitive data
- **FR-038**: System MUST track and provide downloadable invoice history with: date, amount, items, payment status, tax breakdown
- **FR-039**: System MUST handle tax data per region (VAT/GST/Sales Tax) without exposing unnecessary PII
- **FR-040**: System MUST calculate billing metrics: monthly/annual spend, license utilization, cost per agent

#### Phase 9: Support & Health

- **FR-041**: System MUST gate support access based on account tier and ownership level
- **FR-042**: System MUST maintain timeline of reported issues and resolutions per account
- **FR-043**: System MUST expose account health indicators: security score, usage score, compliance score, risk score
- **FR-044**: System MUST provide proactive alerts for: expiring licenses, failed security checks, deprecated versions in use

#### Phase 10: API & Extensibility

- **FR-045**: System MUST allow generating scoped API keys tied to account permissions with rate limiting and expiration
- **FR-046**: System MUST enable exporting audit logs and ownership records in JSON/CSV format for compliance
- **FR-047**: System MUST prepare identity layer for future integration with external platforms (Okta, Azure AD, etc.) without data migration
- **FR-048**: System MUST support feature flags at account level enabling gradual rollouts and A/B testing per segment

#### Phase 11-13: Recovery, Legal, Intelligence, & Orchestration

- **FR-049**: System MUST provide account recovery center handling lost access, locked accounts, and identity disputes
- **FR-050**: System MUST track user consents for data usage, communications, and analytics with expiration and revocation
- **FR-051**: System MUST expose legal summaries in plain language tied to account actions with version control
- **FR-052**: System MUST score account risk based on: behavior anomalies, security lapses, outdated configurations, compliance gaps
- **FR-053**: System MUST suggest access adjustments based on usage patterns: unused roles, overpermissioned members, suggested access restrictions
- **FR-054**: System MUST re-trigger adaptive onboarding based on missed/incomplete actions and emerging gaps
- **FR-055**: System MUST act as orchestrator coordinating identity, ownership, billing, and intelligence into coherent Account Center

### Key Entities

- **User**: Core identity entity with email, roles, permissions, authentication methods, session history, security settings
- **Organization**: Entity representing team or company with multiple users, teams, billing profile, compliance settings
- **Team**: Sub-group within organization with scoped access to agents/resources and member RBAC
- **Ownership Record**: Immutable ledger entry tracking agent/pack/version ownership, license status, purchase date, expiration
- **Session**: Active login session with device fingerprint, IP, creation/last-activity time, revocation status
- **License**: Entitlement entity defining version access, expiration date, transfer eligibility, usage limits
- **Audit Log Entry**: Immutable record of security/account events with: timestamp, action, actor, IP, device, outcome
- **Recommendation**: Personalized action item generated by intelligence engine with: priority, reason, action URL
- **Consent Record**: Tracking of user consents (data usage, communications, analytics) with effective date and revocation capability
- **Billing Profile**: Separate entity from identity containing: payment methods, tax info, invoice history, spending metrics

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users complete account setup and secure authentication in under 3 minutes (100% of new users)
- **SC-002**: Account overview dashboard loads in <500ms with all core metrics (identity, ownership, security, team)
- **SC-003**: Session management interface shows all active sessions with accurate device/location detection (100% accuracy)
- **SC-004**: Passwordless magic link authentication succeeds 99.5% of the time (delivery + completion rates)
- **SC-005**: Anomaly detection triggers on >95% of actual unauthorized login attempts with <5% false positive rate
- **SC-006**: Email verification completes in <1 minute for 95% of users
- **SC-007**: User can view complete ownership ledger with all agents/licenses in <1 second load time
- **SC-008**: Team invitation accepted within 24 hours by 80% of invited members
- **SC-009**: Account recovery flow restores access within 15 minutes for 98% of legitimate cases
- **SC-010**: Account maturity score accurately reflects setup completeness (validated against 50+ accounts)
- **SC-011**: Personalized recommendations are acted upon by 40% of users within 7 days (baseline metric)
- **SC-012**: Security activity log exports complete in <5 seconds for 99.9th percentile dataset size
- **SC-013**: Zero data redundancy between Account Center and other systems (weekly verification)
- **SC-014**: 100% of sensitive operations (email change, password reset, account deletion) require secondary verification
- **SC-015**: Account deletion flow successfully prevents ownership recovery after cooldown (irreversible)
- **SC-016**: Audit trail contains >99.9% of all material account events without gaps
- **SC-017**: Multi-tenant isolation prevents cross-organization data visibility (daily penetration testing)
- **SC-018**: System scales to 1M+ accounts with <5% latency increase in core operations
- **SC-019**: User trust score (satisfaction survey) reaches 8.5/10 after Account Center launch
- **SC-020**: Support tickets related to account access/ownership decrease by 60% after full launch
