class SlackWebhookConnector {
  constructor({ webhookUrl, defaultChannelLabel, dryRun }) {
    this.name = "slack_webhook";
    this.webhookUrl = webhookUrl || null;
    this.defaultChannelLabel = defaultChannelLabel || "default";
    this.dryRun = dryRun === true;
  }

  async postMessage({ text, idempotencyKey }) {
    if (this.dryRun) return { status: "dry_run", idempotencyKey };
    if (!this.webhookUrl) throw new Error("SlackWebhookConnector requires slackWebhook.webhookUrl");

    const res = await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Slack webhook failed: ${res.status} ${body}`.trim());
    }

    return { status: "sent" };
  }
}

module.exports = { SlackWebhookConnector };

