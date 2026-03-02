# Task 8: Email Preferences & Notification Settings

**Phase**: Phase 2 - Signup & Onboarding  
**Priority**: P2 - Important  
**Estimated Effort**: 4-5 days  
**Owner**: Backend / Notifications Lead  
**Depends On**: Task 0, Task 6

---

## Executive Summary

Allow users granular control over email notifications with preference categories, frequency control, and one-click unsubscribe options.

---

## Functional Requirements

- **FR-009**: System MUST provide granular email preferences with category control, frequency options, unsubscribe management, and audit trails

---

## Task Description

Email preference system allows users to:
1. Choose notification categories to receive
2. Set frequency (immediate, daily digest, weekly)
3. Manage unsubscribe preferences
4. View email history
5. Whitelist/blacklist senders

---

## Acceptance Criteria

- [ ] User preferences table tracks all notification settings
- [ ] Preferences organized by category (security, updates, marketing, billing)
- [ ] Frequency options: immediate, 1/day, 1/week, never
- [ ] One-click unsubscribe from email
- [ ] Unsubscribe token valid for 30 days
- [ ] Email history endpoint shows last 50 emails
- [ ] Bulk preference updates
- [ ] Email suppression list maintained
- [ ] Audit log for preference changes
- [ ] Tests: preference read/write
- [ ] Tests: unsubscribe flow
- [ ] Tests: frequency batching

---

## Testing Strategy

```gherkin
Scenario: User disables marketing emails
  Given user in email preferences
  When they toggle "Marketing" to off
  Then no marketing emails sent
  And preference saved

Scenario: One-click unsubscribe works
  Given user receives email
  When they click unsubscribe link
  Then immediate unsubscribe confirmation
  And no more emails from that category

Scenario: Digest aggregation
  Given user set to "1/day" digest
  When 10 events occur within 24 hours
  Then single digest email sent with all 10
  And sent at user's preferred time
```

---

## Database Schema

```sql
CREATE TABLE email_preferences (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  category VARCHAR(50),
  frequency ENUM ('immediate', 'daily', 'weekly', 'never') DEFAULT 'immediate',
  is_enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMP
);

CREATE TABLE email_suppression (
  id UUID PRIMARY KEY,
  email VARCHAR(255),
  category VARCHAR(50),
  reason VARCHAR(100),
  suppressed_until TIMESTAMP,
  created_at TIMESTAMP
);

CREATE TABLE email_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  recipient_email VARCHAR(255),
  subject VARCHAR(255),
  category VARCHAR(50),
  sent_at TIMESTAMP,
  opened_at TIMESTAMP (nullable),
  clicked_at TIMESTAMP (nullable)
);
```

---

## Notification Categories

| Category | Examples | Default |
|----------|----------|---------|
| Security | Login alerts, password changes | On |
| Updates | New features, service status | On |
| Marketing | Promotions, newsletters | Off |
| Billing | Invoices, payment issues | On |
| Team | Invitations, mentions | On |

---

## Integration Points

- Task 2: Email verification
- Task 6: Initial preferences during signup
- Task 14: Activity logging
- Task 26: Push notifications

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Email delivery rate | >98% |
| Unsubscribe rate | <5% |
| Preference compliance | 100% |

---

**Task ID**: 8  
**Phase**: 2  
**Created**: 2026-01-12
