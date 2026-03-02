# Task 9: Terms & Privacy Policy Management

**Phase**: Phase 2 - Signup & Onboarding  
**Priority**: P2 - Important  
**Estimated Effort**: 3-4 days  
**Owner**: Legal / Backend Lead  
**Depends On**: Task 0

---

## Executive Summary

Implement terms, privacy policy, and consent management system with version tracking and consent audit trails.

---

## Functional Requirements

- **FR-010**: System MUST manage terms, privacy policies, and user consent with version history and audit trails

---

## Task Description

Legal compliance requires:
1. Current terms & privacy policy
2. Version history (GDPR requirement)
3. User consent tracking
4. Consent audit trails
5. Withdrawal tracking

---

## Acceptance Criteria

- [ ] GET /legal/terms returns current terms
- [ ] GET /legal/privacy returns current privacy policy
- [ ] GET /legal/versions returns all versions
- [ ] POST /legal/consent logs user acceptance
- [ ] Consent timestamp recorded
- [ ] IP address recorded with consent
- [ ] User agent recorded with consent
- [ ] Previous consent preserved in history
- [ ] Withdrawal of consent logged
- [ ] Admin endpoint to update terms/privacy
- [ ] Tests: consent recording
- [ ] Tests: version history
- [ ] Tests: withdrawal tracking

---

## Testing Strategy

```gherkin
Scenario: User accepts new terms
  Given updated terms published
  When user opens account
  Then new terms acceptance required
  And acceptance recorded with timestamp

Scenario: Consent history preserved
  Given user accepted v1.0 terms
  When new v2.0 terms published
  And user accepts v2.0
  Then both acceptances in history

Scenario: Withdrawal of consent
  Given user accepted marketing consent
  When they withdraw consent
  Then consent_withdrawn_at recorded
  And no marketing emails sent
```

---

## Database Schema

```sql
CREATE TABLE legal_documents (
  id UUID PRIMARY KEY,
  document_type ENUM ('terms', 'privacy', 'cookies'),
  version VARCHAR(10),
  content TEXT,
  effective_date DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE user_consents (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  document_id UUID REFERENCES legal_documents(id),
  action ENUM ('accept', 'decline', 'withdraw'),
  ip_address INET,
  user_agent TEXT,
  acted_at TIMESTAMP
);

CREATE TABLE document_versions (
  id UUID PRIMARY KEY,
  document_id UUID REFERENCES legal_documents(id),
  version_number INT,
  changelog TEXT,
  created_at TIMESTAMP
);
```

---

## Document Management

| Document | Type | Required | Versioned |
|----------|------|----------|-----------|
| Terms | Legal | Yes | Yes |
| Privacy Policy | Legal | Yes | Yes |
| Cookie Policy | Legal | No | Yes |

---

## GDPR Compliance

- [ ] Consent timestamp recorded
- [ ] Consent IP recorded
- [ ] Consent user-agent recorded
- [ ] Version history preserved
- [ ] Withdrawal capability
- [ ] Right to access consent records
- [ ] Consent expiry management

---

## Integration Points

- Task 6: Terms acceptance during signup
- Task 8: Privacy preferences
- Task 14: Audit logging
- Task 50: Compliance reporting

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Consent capture rate | 100% |
| Version accuracy | 100% |
| Audit trail completeness | 100% |

---

**Task ID**: 9  
**Phase**: 2  
**Created**: 2026-01-12
