#!/usr/bin/env node
/**
 * Supervisor runtime: read a DispatchPack (envelopes) and dispatch tasks + notifications.
 * This uses connectors configured in automation_config.json.
 *
 * Current behavior:
 * - Validates envelopes (minimal invariants)
 * - Renders Markdown briefs
 * - Creates tasks via tasks connector (filesystem or clickup)
 * - Posts optional Slack messages via messaging connector
 * - Writes artifacts via files connector (filesystem, notion, drive)
 * - Appends trace events (JSONL)
 */

const fs = require("fs");
const path = require("path");
const { createConnector } = require("./connectors");

function parseArgs(argv) {
  const args = { config: null, ssot: null, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") args.help = true;
    else if (token === "--config") {
      args.config = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--ssot") {
      args.ssot = argv[i + 1] ?? null;
      i += 1;
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printHelp() {
  const name = path.basename(process.argv[1]);
  process.stdout.write(
    [
      `Usage: ${name} --config <automation_config.json> --ssot <client_ssot_root>`,
      "",
      "Example:",
      `  ${name} --config 11_marketing_growth_agent/13_automation/config/automation_config.example.json --ssot /tmp/openops_ssot/example-restaurant`,
      "",
    ].join("\n"),
  );
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function isoNow() {
  return new Date().toISOString();
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function appendTrace(tracePath, eventType, context) {
  if (!tracePath) return;
  ensureDir(path.dirname(tracePath));
  const evt = { schemaVersion: "1.0.0", timestamp: isoNow(), eventType, context: context ?? {} };
  fs.appendFileSync(tracePath, JSON.stringify(evt) + "\n", "utf8");
}

function minimalValidateEnvelope(env) {
  const required = [
    "envelopeVersion",
    "taskId",
    "mode",
    "podId",
    "authorization",
    "objective",
    "constraints",
    "expectedOutputs",
    "qualityGates",
  ];
  for (const k of required) {
    if (!(k in env)) throw new Error(`Invalid envelope: missing ${k}`);
  }
  if (!Array.isArray(env.expectedOutputs) || env.expectedOutputs.length === 0) {
    throw new Error("Invalid envelope: expectedOutputs must be non-empty array");
  }
}

function renderTaskBriefMarkdown(envelope) {
  // Inline renderer (keeps runtime self-contained).
  const lines = [];
  lines.push(`# Task Brief — ${envelope.taskId}`);
  lines.push("");
  lines.push(`Mode: \`${envelope.mode}\``);
  lines.push(`Pod: \`${envelope.podId}\``);
  lines.push(`Deadline: \`${envelope.constraints?.deadline ?? ""}\``);
  lines.push("");
  lines.push("## Objective");
  lines.push("");
  lines.push(String(envelope.objective ?? ""));
  lines.push("");
  lines.push("## Expected Outputs");
  lines.push("");
  for (const o of envelope.expectedOutputs ?? []) lines.push(`- ${o}`);
  lines.push("");
  lines.push("## Quality Gates");
  lines.push("");
  for (const q of envelope.qualityGates ?? []) lines.push(`- ${q}`);
  lines.push("");
  lines.push("## Inputs");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(envelope.inputs ?? {}, null, 2));
  lines.push("```");
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.config || !args.ssot) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const configPath = path.resolve(process.cwd(), args.config);
  const ssotRoot = path.resolve(process.cwd(), args.ssot);
  const cfg = readJson(configPath);

  const dispatchEnvelopesDir = path.join(ssotRoot, "DispatchPack", "envelopes");
  const tracePath = cfg.observability?.enabled ? path.resolve(process.cwd(), cfg.observability.tracePath) : null;

  const tasksConnector = createConnector(cfg.connectors.tasks);
  const messagingConnector = createConnector(cfg.connectors.messaging);
  const filesConnector = createConnector(cfg.connectors.files);

  const envelopeFiles = fs.readdirSync(dispatchEnvelopesDir).filter((f) => f.endsWith(".envelope.json"));
  if (envelopeFiles.length === 0) throw new Error(`No envelopes found in ${dispatchEnvelopesDir}`);

  for (const f of envelopeFiles) {
    const envelopePath = path.join(dispatchEnvelopesDir, f);
    const envelope = readJson(envelopePath);
    minimalValidateEnvelope(envelope);

    appendTrace(tracePath, "task_envelope_validated", { taskId: envelope.taskId, podId: envelope.podId });

    const briefMd = renderTaskBriefMarkdown(envelope);
    const title = `${envelope.podId}: ${envelope.taskId}`;

    const createTaskRes = await tasksConnector.createTask({
      taskId: envelope.taskId,
      title,
      bodyMd: briefMd,
      payload: envelope,
      idempotencyKey: envelope.authorization?.idempotencyKey,
    });

    appendTrace(tracePath, "task_brief_rendered", { taskId: envelope.taskId, status: createTaskRes.status });

    // Write the rendered brief as an artifact for the SSOT.
    await filesConnector.writeArtifact({
      artifactId: `TASK_BRIEF__${envelope.taskId}`,
      content: briefMd,
      format: "md",
      clientSlug: envelope.context?.clientSlug,
    });

    // Notify (optional).
    await messagingConnector.postMessage({
      messageId: `MSG-${envelope.taskId}`,
      text: `New pod task authorized: ${envelope.taskId} (${envelope.podId})`,
      payload: { taskId: envelope.taskId, podId: envelope.podId },
      idempotencyKey: envelope.authorization?.idempotencyKey,
    });
  }

  process.stdout.write("SUPERVISOR_DISPATCH_DONE\n");
}

main().catch((err) => {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
});

