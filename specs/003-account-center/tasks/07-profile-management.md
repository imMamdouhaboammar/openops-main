# Task 7: User Profile Management

**Phase**: Phase 2 - Signup & Onboarding  
**Priority**: P2 - Important  
**Estimated Effort**: 4-5 days  
**Owner**: Backend / Profile Lead  
**Depends On**: Task 0, Task 6

---

## Executive Summary

Implement user profile management allowing users to update personal information, preferences, privacy settings, and view profile history.

---

## Functional Requirements

- **FR-008**: System MUST allow users to manage profile data, preferences, privacy settings, and view modification history

---

## Task Description

Users manage their profile through unified interface:
1. View and edit personal information
2. Change profile photo
3. Update communication preferences
4. Configure privacy settings
5. View profile modification history

---

## Acceptance Criteria

- [ ] GET /profile endpoint returns user's profile
- [ ] PUT /profile endpoint updates editable fields
- [ ] Profile photo upload with image validation
- [ ] Language and timezone preferences saved
- [ ] Email notification preferences managed
- [ ] Privacy settings (profile visibility, data sharing)
- [ ] Profile modification history tracked
- [ ] Audit log entry for each update
- [ ] Bulk update endpoint for preferences
- [ ] Tests: profile read and update
- [ ] Tests: photo upload validation
- [ ] Tests: preference persistence

---

## Testing Strategy

```gherkin
Scenario: User updates profile
  Given user in account settings
  When they update name to "New Name"
  And click save
  Then profile updated
  And audit log entry created

Scenario: Photo upload validation
  Given user selects large video file
  When they try upload
  Then system returns FILE_TOO_LARGE
  And shows 5MB limit message

Scenario: Timezone change persists
  Given user sets timezone to "Asia/Riyadh"
  When they logout and login
  Then all timestamps shown in Asia/Riyadh
```

---

## Database Schema

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  bio VARCHAR(500),
  profile_photo_url VARCHAR(2048),
  cover_photo_url VARCHAR(2048),
  location VARCHAR(255),
  website_url VARCHAR(2048),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE profile_audit_log (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  field_name VARCHAR(100),
  old_value VARCHAR(1000),
  new_value VARCHAR(1000),
  changed_at TIMESTAMP
);
```

---

## Profile Fields

| Field | Type | Max Length | Required |
|-------|------|-----------|----------|
| Display Name | Text | 100 | Yes |
| Bio | Text | 500 | No |
| Location | Text | 100 | No |
| Website | URL | 2048 | No |
| Timezone | Enum | - | Yes |
| Language | Enum | - | Yes |

---

## Integration Points

- Task 6: Signup (initial profile)
- Task 14: Activity logging
- Task 26: Profile visibility settings

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Profile completion rate | 70% |
| Update operation latency | <500ms |

---

**Task ID**: 7  
**Phase**: 2  
**Created**: 2026-01-12
