class NotionConnector {
  constructor({ apiToken, notionVersion, databaseId, dryRun }) {
    this.name = "notion_api";
    this.apiToken = apiToken || null;
    this.notionVersion = notionVersion || "2022-06-28";
    this.databaseId = databaseId || null;
    this.dryRun = dryRun === true;
  }

  headers() {
    if (!this.apiToken) throw new Error("NotionConnector requires notion.apiToken");
    return {
      Authorization: `Bearer ${this.apiToken}`,
      "Notion-Version": this.notionVersion,
      "content-type": "application/json",
    };
  }

  async writeArtifact({ artifactId, content, format }) {
    if (this.dryRun) return { status: "dry_run", artifactId };
    if (!this.databaseId) throw new Error("NotionConnector requires notion.databaseId");

    const contentText =
      format === "json" ? JSON.stringify(content, null, 2) : format === "jsonl" ? String(content) : String(content);

    // Keep payload small to avoid API failures for large docs.
    const maxChars = 18000;
    const truncated = contentText.length > maxChars ? contentText.slice(0, maxChars) + "\n\n[TRUNCATED]" : contentText;

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        parent: { database_id: this.databaseId },
        properties: {
          Name: { title: [{ text: { content: artifactId } }] },
          ArtifactId: { rich_text: [{ text: { content: artifactId } }] },
          Format: { rich_text: [{ text: { content: format } }] },
        },
        children: [
          {
            object: "block",
            type: "code",
            code: {
              language: "plain text",
              rich_text: [{ type: "text", text: { content: truncated } }],
            },
          },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Notion writeArtifact failed: ${res.status} ${body}`.trim());
    }

    const data = await res.json();
    return { status: "written", artifactId, notionPageId: data?.id ?? null, notionUrl: data?.url ?? null };
  }
}

module.exports = { NotionConnector };

