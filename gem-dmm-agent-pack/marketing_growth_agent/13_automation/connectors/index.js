const { FilesystemConnector } = require("./providers/filesystem");
const { SlackWebhookConnector } = require("./providers/slack_webhook");
const { ClickUpConnector } = require("./providers/clickup");
const { NotionConnector } = require("./providers/notion");
const { GoogleDriveConnector } = require("./providers/google_drive");
const { StubConnector } = require("./providers/stub");

function createConnector(config) {
  if (!config || typeof config !== "object") throw new Error("Connector config must be an object");
  if (!config.enabled) return new StubConnector({ name: "disabled_connector", dryRun: true });

  const dryRun = config.dryRun === true;
  const type = config.type;

  if (type === "filesystem") {
    return new FilesystemConnector({
      ssotRoot: config.filesystem?.ssotRoot,
      dryRun,
    });
  }

  if (type === "slack_webhook") {
    return new SlackWebhookConnector({
      webhookUrl: config.slackWebhook?.webhookUrl,
      defaultChannelLabel: config.slackWebhook?.defaultChannelLabel ?? "default",
      dryRun,
    });
  }

  if (type === "clickup_api") {
    return new ClickUpConnector({
      apiToken: config.clickup?.apiToken,
      listId: config.clickup?.listId,
      assigneeIds: config.clickup?.assigneeIds ?? [],
      tags: config.clickup?.tags ?? [],
      dryRun,
    });
  }

  if (type === "notion_api") {
    return new NotionConnector({
      apiToken: config.notion?.apiToken,
      notionVersion: config.notion?.notionVersion ?? "2022-06-28",
      databaseId: config.notion?.databaseId,
      dryRun,
    });
  }

  if (type === "google_drive_api") {
    return new GoogleDriveConnector({
      accessToken: config.googleDrive?.accessToken,
      rootFolderId: config.googleDrive?.rootFolderId,
      dryRun,
    });
  }

  if (type === "notion_stub" || type === "clickup_stub" || type === "drive_stub") {
    return new StubConnector({ name: type, dryRun: true });
  }

  throw new Error(`Unknown connector type: ${type}`);
}

module.exports = { createConnector };
