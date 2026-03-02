class GoogleDriveConnector {
  constructor({ accessToken, rootFolderId, dryRun }) {
    this.name = "google_drive_api";
    this.accessToken = accessToken || null;
    this.rootFolderId = rootFolderId || null;
    this.dryRun = dryRun === true;
  }

  headers(extra = {}) {
    if (!this.accessToken) throw new Error("GoogleDriveConnector requires googleDrive.accessToken");
    return {
      Authorization: `Bearer ${this.accessToken}`,
      ...extra,
    };
  }

  async ensureClientFolder({ clientSlug }) {
    if (!this.rootFolderId) throw new Error("GoogleDriveConnector requires googleDrive.rootFolderId");
    if (this.dryRun) return { status: "dry_run", folderId: "DRY_RUN_FOLDER" };

    // Create a folder under the root folder. (Does not de-duplicate; caller should keep idempotency in SSOT)
    const res = await fetch("https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      headers: this.headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        name: clientSlug,
        mimeType: "application/vnd.google-apps.folder",
        parents: [this.rootFolderId],
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Drive ensureClientFolder failed: ${res.status} ${body}`.trim());
    }

    const data = await res.json();
    return { status: "created", folderId: data?.id ?? null };
  }

  async writeArtifact({ artifactId, content, format, clientSlug }) {
    if (this.dryRun) return { status: "dry_run", artifactId };
    const folder = await this.ensureClientFolder({ clientSlug: clientSlug ?? "client" });

    const filename = `${artifactId}.${format === "json" ? "json" : format === "jsonl" ? "jsonl" : "md"}`;
    const fileContent =
      format === "json" ? JSON.stringify(content, null, 2) : format === "jsonl" ? String(content) : String(content);

    // Multipart upload.
    const boundary = "openops-boundary-" + Math.random().toString(16).slice(2);
    const metadata = {
      name: filename,
      parents: [folder.folderId],
    };

    const body =
      `--${boundary}\r\n` +
      `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
      `${JSON.stringify(metadata)}\r\n` +
      `--${boundary}\r\n` +
      `Content-Type: text/plain; charset=UTF-8\r\n\r\n` +
      `${fileContent}\r\n` +
      `--${boundary}--\r\n`;

    const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: this.headers({ "content-type": `multipart/related; boundary=${boundary}` }),
      body,
    });

    if (!res.ok) {
      const resBody = await res.text().catch(() => "");
      throw new Error(`Drive writeArtifact failed: ${res.status} ${resBody}`.trim());
    }

    const data = await res.json();
    return { status: "written", artifactId, driveFileId: data?.id ?? null };
  }
}

module.exports = { GoogleDriveConnector };

