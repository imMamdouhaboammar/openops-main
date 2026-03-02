#!/usr/bin/env node
/**
 * Append a Decision Log entry to a JSONL file (one JSON object per line).
 * Dependency-free. Performs minimal structural validation and auto-fills:
 * - schemaVersion (default 1.0.0)
 * - decisionId (DEC-YYYY-MM-DD-XXXX)
 * - timestamp (now, ISO8601)
 *
 * NOTE: This does not fully validate against decision_log.schema.json (no Ajv).
 * It enforces required fields and sane structure for production safety.
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { inPath: null, outPath: null, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") args.help = true;
    else if (token === "--in") {
      args.inPath = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--out") {
      args.outPath = argv[i + 1] ?? null;
      i += 1;
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printHelp() {
  const name = path.basename(process.argv[1]);
  process.stdout.write(
    [
      `Usage: ${name} --in <decision.json> --out <decision_log.jsonl>`,
      "",
      "Behavior:",
      "- Reads a single JSON object and appends it as one line of JSONL.",
      "- Auto-fills: schemaVersion, decisionId, timestamp (if missing).",
      "",
      "Example:",
      `  ${name} --in /tmp/decision.json --out /tmp/decision_log.jsonl`,
      "",
    ].join("\n"),
  );
}

function isoNow() {
  return new Date().toISOString();
}

function pad4(n) {
  const s = String(n);
  return s.length >= 4 ? s : "0".repeat(4 - s.length) + s;
}

function generateDecisionId(nowIso) {
  const datePart = nowIso.slice(0, 10); // YYYY-MM-DD
  const random = Math.floor(Math.random() * 10000);
  return `DEC-${datePart}-${pad4(random)}`;
}

function requireString(obj, key) {
  if (!obj || typeof obj !== "object" || !(key in obj)) throw new Error(`Missing required field: ${key}`);
  if (typeof obj[key] !== "string" || obj[key].trim().length === 0) {
    throw new Error(`Field must be non-empty string: ${key}`);
  }
  return obj[key];
}

function requireObject(obj, key) {
  if (!obj || typeof obj !== "object" || !(key in obj)) throw new Error(`Missing required field: ${key}`);
  if (!obj[key] || typeof obj[key] !== "object") throw new Error(`Field must be object: ${key}`);
  return obj[key];
}

function requireArray(obj, key) {
  if (!obj || typeof obj !== "object" || !(key in obj)) throw new Error(`Missing required field: ${key}`);
  if (!Array.isArray(obj[key])) throw new Error(`Field must be array: ${key}`);
  return obj[key];
}

function validateAndNormalize(entry) {
  if (!entry || typeof entry !== "object") throw new Error("Decision entry must be an object");

  entry.schemaVersion = entry.schemaVersion ?? "1.0.0";
  entry.timestamp = entry.timestamp ?? isoNow();
  entry.decisionId = entry.decisionId ?? generateDecisionId(entry.timestamp);

  requireString(entry, "schemaVersion");
  requireString(entry, "decisionId");
  requireString(entry, "timestamp");
  requireString(entry, "mode");
  requireString(entry, "decisionType");
  requireString(entry, "summary");

  const owner = requireObject(entry, "owner");
  requireString(owner, "role");
  requireString(owner, "name");

  const evidence = requireObject(entry, "evidence");
  requireArray(evidence, "inputs");
  requireArray(evidence, "metrics");
  requireArray(evidence, "assumptions");

  const risk = requireObject(entry, "risk");
  requireString(risk, "riskLevel");
  requireArray(risk, "failureModes");
  requireString(risk, "rollbackPlan");

  const approvals = requireObject(entry, "approvals");
  if (typeof approvals.required !== "boolean") throw new Error("approvals.required must be boolean");
  requireString(approvals, "status");
  requireArray(approvals, "approvedBy");

  const related = requireObject(entry, "related");
  requireObject(related, "client");
  requireArray(related, "artifacts");
  requireArray(related, "tasks");

  return entry;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.inPath || !args.outPath) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const inPath = path.resolve(process.cwd(), args.inPath);
  const outPath = path.resolve(process.cwd(), args.outPath);

  const raw = fs.readFileSync(inPath, "utf8");
  const entry = JSON.parse(raw);
  const normalized = validateAndNormalize(entry);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.appendFileSync(outPath, JSON.stringify(normalized) + "\n", "utf8");

  process.stdout.write(`APPENDED ${normalized.decisionId}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

