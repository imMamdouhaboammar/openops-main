# PRD Template

**Copy this template for your project. Fill in each section before coding.**

---

## 1. Executive Summary

[1 paragraph, 50-100 words]

Describe what you're building and why it matters. Answer: "What is this? Who needs it? Why now?"

**Example:**
> TaskFlow is a real-time task management app for remote teams. Instead of context-switching between email, Slack, and Google Docs, teams get one source of truth for task prioritization and status updates. We're solving the problem of lost context and duplicated work in distributed teams.

---

## 2. Problem Statement

### Current State
Describe how things work today (without your solution).

**Example:**
> Remote teams use 5+ tools to track tasks:
> - Email for approval requests
> - Slack for urgent updates
> - Google Docs for roadmaps
> - Notion for documentation
> - Spreadsheets for metrics

### The Friction
What's broken? Be specific and testable.

**Example:**
> - Tasks fall through cracks when people change roles
> - Reassignments take 5+ messages (email + Slack)
> - No single source of truth → duplicate work
> - Context is lost in thread history

### The Opportunity
If we fix this, what becomes possible?

**Example:**
> - Task reassignment in <30 seconds
> - One place for all task context
> - Real-time visibility into team capacity
> - Fewer tools = lower overhead

---

## 3. Target Users

### Primary User
Who's your main persona? (Be specific)

**Example:**
> Engineering managers at 100k+ companies  
> - 5–20 direct reports
> - Distributed across 2+ time zones
> - Using Slack + email as primary tools

### Secondary Users (Optional)
Who else benefits?

**Example:**
> - Freelance teams (2–10 people)
> - Product managers (track feature requests)
> - CTOs (capacity planning)

### Who's NOT a User
Be explicit about scope.

**Example:**
> - Solo solopreneurs (no team to coordinate)
> - Enterprise IT departments (too complex)
> - Real-time collaboration tools (Figma, Google Docs)

---

## 4. Jobs To Be Done

List 3–5 problems your users want solved. Use this format:

```
"When [situation], I want [motivation], so I can [outcome]."
```

**Examples:**
1. When a project deadline is 2 weeks away, I want to quickly reassign tasks, so I can keep momentum
2. When I'm on mobile waiting for a meeting, I want to update task status offline, so I don't need WiFi
3. When onboarding a new team member, I want them to see all tasks instantly, so they're productive on day 1
4. When prioritizing work, I want a single view of all tasks, so I don't lose context switching
5. When a team member is overloaded, I want to redistribute work, so no one burns out

---

## 5. Core Features (MVP - Minimum Viable Product)

List 5–10 features that MUST ship. Be ruthless about scope.

**Example:**
- [ ] Create tasks (title, description, due date, assignee)
- [ ] View task list (mine, team's, all)
- [ ] Update task status (not started → in progress → done)
- [ ] Assign/reassign tasks to team members
- [ ] Comment on tasks (inline discussion)
- [ ] Mobile view (responsive design)
- [ ] Dark mode
- [ ] Email notifications

---

## 6. Nice-to-Have Features (Post-MVP)

Features that are cool but NOT required for launch.

**Example:**
- [ ] Recurring tasks
- [ ] Task templates
- [ ] Analytics dashboard (burndown, velocity)
- [ ] Slack integration (slash commands)
- [ ] Zapier integration
- [ ] Custom fields per workspace
- [ ] File attachments
- [ ] Time tracking per task

**Rule:** Don't build these until MVP is proven.

---

## 7. Success Metrics

How do you know if this works? (Measurable, not vanity metrics)

| Metric | Target | Why |
|--------|--------|-----|
| Time to reassign task | <30 seconds | Measure friction |
| Mobile task updates | >40% of actions | Verify mobile usage |
| 30-day retention | >70% | Users stick around |
| Task completion rate | >50% | Product is useful |
| NPS (Net Promoter Score) | >40 | Users recommend it |

---

## 8. Kill Criteria

When do we stop investing in this?

**Example:**
- User retention drops below 50% after 3 months
- Cost to serve exceeds revenue by 3x
- Competitor launches with 2x our features
- No new releases for 3+ months
- Founder distraction causes other projects to suffer

---

## 9. Constraints

What are we NOT willing to compromise on?

**Example:**
- Budget: Max $5k/month (hosting + AI credits)
- Timeline: MVP in 4 weeks (for this deadline)
- Team: 1 PM + 1 contractor engineer (if needed)
- Tech stack: React, Node.js, PostgreSQL (non-negotiable)
- Quality: >80% test coverage, zero security issues

---

## 10. Risks & Mitigations

What could go wrong? How do we prevent it?

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Real-time sync complexity | 3 weeks delay | Use existing WebSocket library (Socket.io) |
| User onboarding friction | <10% adoption | 1-click Google auth + 30-sec tutorial |
| Data privacy concerns | Legal issues | GDPR compliance from day 1 + encryption at rest |
| Team member burnout | Low quality | Weekly checks + limit scope to MVP |
| Market already solved this | No differentiation | Focus on remote teams (vs Asana/Monday) |

---

## 11. Competitive Analysis

Who's trying to solve this? (Be honest)

| Competitor | Strength | Weakness | Our Edge |
|------------|----------|----------|----------|
| Asana | Polished, enterprise | Overkill, $15/user | Simpler, $0 to start |
| Monday.com | Visual, beautiful | Slow, expensive | Instant, real-time |
| Notion | Flexible, all-in-one | Not real-time, heavy | Focused, lightweight |
| Email/Slack | Already in use | No task management | Purpose-built |

---

## 12. Go-to-Market Strategy

How do we get users?

**Example:**
- **Phase 1 (Weeks 1–4):** Product Hunt + Reddit (r/remotework)
- **Phase 2 (Weeks 5–8):** LinkedIn thought leadership + ProductHunt follow-up
- **Phase 3 (Month 3):** Content marketing (blog posts on team productivity)
- **Phase 4 (Month 6):** Sales outreach to specific targets

---

## 13. Metrics Dashboard

What do we track?

```
Weekly dashboard:
- Total users (cumulative)
- Active users (30-day)
- Task completion rate
- Churn (% left in last week)
- NPS survey responses
- Top bugs reported
- Performance (API response time)
```

---

## 14. Review Cadence

When do we revisit this PRD?

- **Weekly:** Check success metrics
- **Bi-weekly:** Adjust priorities based on user feedback
- **Monthly:** Decide on post-MVP features
- **Quarterly:** Revisit business assumptions

---

**Lock this PRD before starting code. Changes after launch require good justification.**

**Last updated:** [Date]  
**Reviewed by:** [Names]
