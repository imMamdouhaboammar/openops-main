# Task 6: Signup Flow & User Creation

**Phase**: Phase 2 - Signup & Onboarding  
**Priority**: P1 - Critical  
**Estimated Effort**: 5-6 days  
**Owner**: Backend / Onboarding Lead  
**Depends On**: Task 0, Task 1, Task 2

---

## Executive Summary

Implement complete signup flow with email verification, organization creation, and profile data collection in a user-friendly multi-step process.

---

## Functional Requirements

- **FR-007**: System MUST implement signup flow with email verification, organization creation, user profile data, terms acceptance, and audit logging

---

## Task Description

Signup creates three entities simultaneously:
1. User account (email + preferences)
2. Organization (single owner org)
3. Audit log entry

Flow ensures proper data isolation and permission setup.

---

## Signup Flow

```
Email → Verify → Name + Organization → Profile → Terms → Complete
```

---

## Acceptance Criteria

- [ ] Step 1: Email collection and validation
- [ ] Step 2: Email verification (link from Task 2)
- [ ] Step 3: Name and organization name input
- [ ] Step 4: Profile photo upload (optional)
- [ ] Step 5: Terms & privacy acceptance (checkbox)
- [ ] User created with role = owner
- [ ] Organization created with user as owner
- [ ] Session automatically created after signup
- [ ] Welcome email sent
- [ ] Audit log entry created
- [ ] Duplicate email prevention
- [ ] Required fields validation
- [ ] Tests: complete signup flow
- [ ] Tests: duplicate email rejected
- [ ] Tests: organization auto-creation

---

## Testing Strategy

```gherkin
Scenario: User completes full signup
  Given new user at signup page
  When they enter email
  And verify email
  And enter name and organization
  And accept terms
  Then user account created as owner
  And organization created
  And session created
  And welcome email sent

Scenario: Duplicate email rejected
  Given existing user with email "alice@example.com"
  When new signup attempts same email
  Then system returns EMAIL_ALREADY_EXISTS
  And suggests password reset or login

Scenario: Incomplete signup abandoned
  Given user completes steps 1-3
  When they close browser without accepting terms
  Then signup marked as abandoned
  And cleanup scheduled after 24 hours

Scenario: Terms acceptance required
  Given user at final signup step
  When they try submit without checking terms
  Then form shows validation error
  And prevents submission
```

---

## Database Schema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  profile_photo_url VARCHAR(2048),
  status ENUM ('active', 'deactivated', 'deleted') DEFAULT 'active',
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP (nullable)
);

CREATE TABLE user_preferences (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  language ENUM ('en', 'ar') DEFAULT 'en',
  timezone VARCHAR(50),
  notifications_email BOOLEAN DEFAULT true,
  notifications_push BOOLEAN DEFAULT true,
  two_factor_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE signup_history (
  id UUID PRIMARY KEY,
  email VARCHAR(255),
  status ENUM ('started', 'verified', 'completed', 'abandoned'),
  step_completed INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## Signup Steps Breakdown

| Step | Input | Validation | Duration |
|------|-------|-----------|----------|
| 1 | Email | RFC 5322 + DNS | <1 min |
| 2 | Verification | Email click | 15 min |
| 3 | Name + Org | Max 100 chars | <5 min |
| 4 | Photo | JPG/PNG <5MB | Optional |
| 5 | Terms | Checkbox | <1 min |

---

## Welcome Email Template

**Subject**: Welcome to OpenOps, [Name]!  
**Body**:
```
Hi [Name],

Welcome to OpenOps! Your account is set up and ready.

Organization: [Org Name]
Email: [Email]

Next steps:
1. Complete your profile
2. Invite team members
3. Explore features

Questions? Visit our help center.
```

---

## Audit Logging

All signup events logged:
- [ ] SIGNUP_STARTED
- [ ] EMAIL_VERIFIED
- [ ] PROFILE_COMPLETED
- [ ] TERMS_ACCEPTED
- [ ] ORGANIZATION_CREATED
- [ ] INITIAL_SESSION_CREATED

---

## Integration Points

- Task 2: Email verification
- Task 10: Team member invitation
- Task 12: Activity logging
- Task 14: Security audit

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Signup completion rate | >85% |
| Signup abandonment rate | <15% |
| Average signup time | <5 min |

---

**Task ID**: 6  
**Phase**: 2  
**Created**: 2026-01-12
