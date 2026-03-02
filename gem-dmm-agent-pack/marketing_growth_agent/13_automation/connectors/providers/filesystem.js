const fs = require("fs");
const path = require("path");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeJson(p, obj) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function writeText(p, text) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, text, "utf8");
}

class FilesystemConnector {
  constructor({ ssotRoot, dryRun }) {
    this.name = "filesystem";
    this.ssotRoot = ssotRoot ? path.resolve(process.cwd(), ssotRoot) : null;
    this.dryRun = dryRun === true;
    if (!this.ssotRoot) throw new Error("FilesystemConnector requires filesystem.ssotRoot");
  }

  async createTask({ taskId, title, bodyMd, payload, idempotencyKey }) {
    if (this.dryRun) return { status: "dry_run", taskId, idempotencyKey };
    const tasksDir = path.join(this.ssotRoot, "Tasks");
    writeJson(path.join(tasksDir, `${taskId}.json`), { taskId, title, payload, idempotencyKey });
    writeText(path.join(tasksDir, `${taskId}.md`), bodyMd);
    return { status: "created", taskId };
  }

  async postMessage({ messageId, text, payload, idempotencyKey }) {
    if (this.dryRun) return { status: "dry_run", messageId, idempotencyKey };
    const messagesDir = path.join(this.ssotRoot, "Messages");
    writeJson(path.join(messagesDir, `${messageId}.json`), { messageId, text, payload, idempotencyKey });
    writeText(path.join(messagesDir, `${messageId}.txt`), text);
    return { status: "recorded", messageId };
  }

  async writeArtifact({ artifactId, content, format }) {
    if (this.dryRun) return { status: "dry_run", artifactId };
    const artifactsDir = path.join(this.ssotRoot, "Artifacts");
    const ext = format === "json" ? "json" : format === "jsonl" ? "jsonl" : "md";
    if (format === "json") writeJson(path.join(artifactsDir, `${artifactId}.${ext}`), content);
    else writeText(path.join(artifactsDir, `${artifactId}.${ext}`), String(content));
    return { status: "written", artifactId };
  }
}

module.exports = { FilesystemConnector };

