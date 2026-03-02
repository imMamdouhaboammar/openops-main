class ClickUpConnector {
  constructor({ apiToken, listId, assigneeIds, tags, dryRun }) {
    this.name = "clickup_api";
    this.apiToken = apiToken || null;
    this.listId = listId || null;
    this.assigneeIds = Array.isArray(assigneeIds) ? assigneeIds : [];
    this.tags = Array.isArray(tags) ? tags : [];
    this.dryRun = dryRun === true;
  }

  headers() {
    if (!this.apiToken) throw new Error("ClickUpConnector requires clickup.apiToken");
    return {
      Authorization: this.apiToken,
      "content-type": "application/json",
    };
  }

  async createTask({ taskId, title, bodyMd, payload, idempotencyKey }) {
    if (this.dryRun) return { status: "dry_run", taskId, idempotencyKey };
    if (!this.listId) throw new Error("ClickUpConnector requires clickup.listId");

    // ClickUp API v2 create task endpoint:
    // POST https://api.clickup.com/api/v2/list/{list_id}/task
    const res = await fetch(`https://api.clickup.com/api/v2/list/${this.listId}/task`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        name: title,
        description: bodyMd,
        tags: this.tags,
        assignees: this.assigneeIds,
        custom_fields: [
          {
            // We do not assume a specific custom field mapping; store payload in task description.
            // Teams can later map taskId/podId/etc. to real ClickUp custom fields.
          },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`ClickUp createTask failed: ${res.status} ${body}`.trim());
    }

    const data = await res.json();
    return { status: "created", taskId, clickupTaskId: data?.id ?? null, clickupUrl: data?.url ?? null };
  }
}

module.exports = { ClickUpConnector };

