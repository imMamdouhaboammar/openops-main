# Task 19: Licensing & Subscription Management

**Phase**: Phase 5 - Ownership & Licensing  
**Priority**: P1 - Critical  
**Estimated Effort**: 7-9 days  
**Owner**: Backend / Licensing Lead  
**Depends On**: Task 0, Task 6

---

## Executive Summary

Implement licensing system supporting trial, free, and paid tiers with seat management, feature controls, and usage tracking.

---

## Functional Requirements

- **FR-020**: System MUST manage licenses with tier-based features, seat allocation, usage tracking, and auto-renewal

---

## Task Description

License system enables SaaS model:
1. Define license tiers (Free, Pro, Enterprise)
2. Assign licenses to organizations
3. Track seat usage
4. Enforce feature access based on tier
5. Handle upgrades/downgrades
6. Trial period management

---

## License Tiers

| Tier | Seats | Monthly | Features | Trial |
|------|-------|---------|----------|-------|
| Free | 3 | $0 | Core | N/A |
| Pro | 10 | $29 | Pro+ | 14 days |
| Enterprise | Unlimited | Custom | All | Contact |

---

## Acceptance Criteria

- [ ] License table with tier, seats, created_at, expires_at
- [ ] Trial license creation (14 days)
- [ ] Free license creation
- [ ] Paid license purchase
- [ ] Seat tracking and enforcement
- [ ] Feature flag checking by license
- [ ] Upgrade/downgrade workflow
- [ ] Auto-renewal for paid licenses
- [ ] License expiration handling
- [ ] Overage tracking
- [ ] Tests: license creation
- [ ] Tests: seat enforcement
- [ ] Tests: upgrade flow
- [ ] Tests: expiration

---

## Testing Strategy

```gherkin
Scenario: Free organization seats enforced
  Given free tier org with 3 seats
  When attempting to invite 4th user
  Then invitation blocked
  And upgrade prompt shown

Scenario: Pro tier upgrade
  Given org on free tier
  When they purchase pro license
  Then license immediately activated
  And seat limit increased to 10

Scenario: Trial expiration
  Given trial license created 15 days ago
  When daily job runs
  Then trial expired
  And org can only use free features

Scenario: Seat management on downgrade
  Given org with 10 seats, 7 users
  When downgrading to free (3 seats)
  Then warning shown about user limit
  And must confirm before downgrade
```

---

## Database Schema

```sql
CREATE TABLE licenses (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  tier ENUM ('free', 'pro', 'enterprise'),
  seats INT,
  created_at TIMESTAMP,
  expires_at TIMESTAMP (nullable),
  auto_renew BOOLEAN DEFAULT true,
  trial_ends_at TIMESTAMP (nullable),
  status ENUM ('active', 'expired', 'cancelled')
);

CREATE TABLE license_usage (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  feature_name VARCHAR(100),
  usage_count INT,
  limit INT,
  month DATE
);

CREATE TABLE seat_allocations (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  allocated_at TIMESTAMP
);
```

---

## Feature Flags by Tier

| Feature | Free | Pro | Enterprise |
|---------|------|-----|-----------|
| Users | 3 | 10 | ∞ |
| Teams | 1 | ∞ | ∞ |
| API Access | No | Yes | Yes |
| SSO | No | No | Yes |
| Custom Domain | No | No | Yes |
| Advanced Reports | No | Yes | Yes |

---

## License Lifecycle

```
Trial (14 days) → Purchase → Active → Renew/Expire
                    ↓
                 Upgrade
                    ↓
                  Active
```

---

## Upgrade/Downgrade

- [ ] Immediate license change
- [ ] Prorated billing
- [ ] Confirmation dialogs
- [ ] Grace periods for overage
- [ ] Notification to users
- [ ] No data loss on downgrade

---

## Integration Points

- Task 6: User management
- Task 10: Team management
- Task 25: Billing integration
- Task 28: Feature gates

---

## Success Metrics

| Metric | Target |
|--------|--------|
| License accuracy | 100% |
| Seat enforcement effectiveness | 100% |
| Trial-to-paid conversion | >15% |

---

**Task ID**: 19  
**Phase**: 5  
**Created**: 2026-01-12
