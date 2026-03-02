#!/usr/bin/env node
/**
 * Render a Supervisor Task Envelope (JSON) into a human-friendly Markdown brief.
 *
 * Canonical source of truth is the JSON envelope:
 * - 11_marketing_growth_agent/12_control_plane/task_envelope.schema.json
 *
 * This script is dependency-free (no npm install required).
 */

const fs = require("fs");
const path = require("path");

function printHelp() {
  const scriptName = path.basename(process.argv[1]);
  process.stdout.write(
    [
      `Usage: ${scriptName} --in <task.envelope.json> [--out <task.brief.md>]`,
      "",
      "Options:",
      "  --in     Path to task envelope JSON file (required)",
      "  --out    Path to write Markdown output (optional; defaults to stdout)",
      "  --help   Show this help",
      "",
      "Example:",
      `  ${scriptName} --in 11_marketing_growth_agent/12_control_plane/examples/clinic_brand_identity_task.envelope.json`,
      `  ${scriptName} --in ... --out /tmp/task.md`,
      "",
    ].join("\n"),
  );
}

function parseArgs(argv) {
  const args = { inPath: null, outPath: null, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") {
      args.help = true;
      continue;
    }
    if (token === "--in") {
      args.inPath = argv[i + 1] ?? null;
      i += 1;
      continue;
    }
    if (token === "--out") {
      args.outPath = argv[i + 1] ?? null;
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function requireField(obj, keyPath) {
  const parts = keyPath.split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object" || !(part in current)) {
      throw new Error(`Missing required field: ${keyPath}`);
    }
    current = current[part];
  }
  return current;
}

function safeJson(value) {
  return JSON.stringify(value ?? null, null, 2);
}

function mdEscapeInline(value) {
  const text = String(value ?? "");
  return text.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function renderList(items) {
  if (!Array.isArray(items) || items.length === 0) return "- (none)";
  return items.map((x) => `- ${x}`).join("\n");
}

function renderKeyValueObject(obj) {
  if (obj == null) return "```json\nnull\n```";
  return `\`\`\`json\n${safeJson(obj)}\n\`\`\``;
}

function renderMarkdown(envelope) {
  const taskId = requireField(envelope, "taskId");
  const mode = requireField(envelope, "mode");
  const podId = requireField(envelope, "podId");

  const expiresAt = requireField(envelope, "authorization.expiresAt");
  const idempotencyKey = requireField(envelope, "authorization.idempotencyKey");
  const objective = requireField(envelope, "objective");

  const deadline = requireField(envelope, "constraints.deadline");
  const budgetMaxSpend = requireField(envelope, "constraints.budget.maxSpend");
  const budgetCurrency = requireField(envelope, "constraints.budget.currency");

  const expectedOutputs = requireField(envelope, "expectedOutputs");
  const qualityGates = requireField(envelope, "qualityGates");

  const context = envelope.context ?? null;
  const inputs = envelope.inputs ?? null;
  const compliance = requireField(envelope, "constraints.compliance");
  const scope = requireField(envelope, "constraints.scope");
  const approvalGates = envelope.approvalGates ?? [];
  const returnFormat = envelope.returnFormat ?? "artifact_plus_decisions";

  const generatedAt = new Date().toISOString();

  return [
    `# Task Brief — ${taskId}`,
    "",
    "> Generated from canonical JSON task envelope.",
    `> Generated at: \`${generatedAt}\``,
    "",
    "## Metadata",
    "",
    "| Field | Value |",
    "|---|---|",
    `| Mode | \`${mdEscapeInline(mode)}\` |`,
    `| Pod | \`${mdEscapeInline(podId)}\` |`,
    `| Deadline | \`${mdEscapeInline(deadline)}\` |`,
    `| Token Expires | \`${mdEscapeInline(expiresAt)}\` |`,
    `| Idempotency Key | \`${mdEscapeInline(idempotencyKey)}\` |`,
    `| Budget Ceiling | \`${mdEscapeInline(budgetMaxSpend)} ${mdEscapeInline(budgetCurrency)}\` |`,
    `| Return Format | \`${mdEscapeInline(returnFormat)}\` |`,
    "",
    "## Objective",
    "",
    objective,
    "",
    "## Context",
    "",
    renderKeyValueObject(context),
    "",
    "## Inputs",
    "",
    renderKeyValueObject(inputs),
    "",
    "## Constraints",
    "",
    "### Compliance",
    "",
    renderKeyValueObject(compliance),
    "",
    "### Scope",
    "",
    renderKeyValueObject(scope),
    "",
    "## Expected Outputs",
    "",
    renderList(expectedOutputs),
    "",
    "## Quality Gates (Acceptance Criteria)",
    "",
    renderList(qualityGates),
    "",
    "## Approval Gates",
    "",
    renderList(approvalGates),
    "",
    "## Pod Return Requirements",
    "",
    "Pods must return:",
    "- At least one artifact (doc/spec/template), not only advice.",
    "- Explicit decision points requiring approval.",
    "- If an experiment: kill metric(s) and decision date.",
    "",
  ].join("\n");
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  if (!args.inPath) {
    printHelp();
    process.exit(2);
  }

  const inPath = path.resolve(process.cwd(), args.inPath);
  const raw = fs.readFileSync(inPath, "utf8");
  const envelope = JSON.parse(raw);

  requireField(envelope, "envelopeVersion");
  requireField(envelope, "authorization.supervisorToken");

  const out = renderMarkdown(envelope);

  if (args.outPath) {
    const outPath = path.resolve(process.cwd(), args.outPath);
    fs.writeFileSync(outPath, out, "utf8");
  } else {
    process.stdout.write(out);
  }
}

try {
  main();
} catch (err) {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

