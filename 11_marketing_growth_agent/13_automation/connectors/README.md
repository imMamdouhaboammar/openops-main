# Connectors (Interfaces + Stubs)

This folder defines **connector interfaces** for automation targets such as:
- Notion (pages, databases)
- ClickUp (tasks, lists)
- Slack (messages, approvals pings)
- Google Drive (file upload / folder structure)

Why stubs?
- This repo is designed to be **automation-ready** without requiring secrets.
- You can plug in real credentials later by implementing the same interfaces.

---

## Connector types

### 1) `filesystem` (works today)
Writes tasks, messages, artifacts, and schedules into a local SSOT folder.

### 2) `slack_webhook` (works if you provide a webhook URL)
Posts messages to Slack via Incoming Webhook.

### 3) `notion_stub` / `clickup_stub` / `drive_stub`
No external side-effects. They only:
- validate inputs
- produce traces
- optionally write “would have done” artifacts into filesystem SSOT

---

## Configuration

Use `automation_config.json` (see schema):
- `11_marketing_growth_agent/13_automation/config/automation_config.schema.json`

---

## Design rule

All connectors must be:
- idempotent for side-effect calls (accept idempotency key)
- safe by default (dry-run unless explicitly enabled)

