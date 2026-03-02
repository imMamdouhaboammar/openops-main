#!/usr/bin/env node
/**
 * Minimal validator for Supervisor Task Envelopes.
 * Dependency-free (no Ajv). Focuses on operational invariants:
 * - required fields exist
 * - token expiry not passed (unless --ignore-expiry)
 * - expected outputs non-empty
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { inPath: null, ignoreExpiry: false, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") args.help = true;
    else if (token === "--in") {
      args.inPath = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--ignore-expiry") args.ignoreExpiry = true;
    else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printHelp() {
  const name = path.basename(process.argv[1]);
  process.stdout.write(
    [
      `Usage: ${name} --in <task.envelope.json> [--ignore-expiry]`,
      "",
      "Exit codes:",
      "  0 = valid",
      "  1 = invalid",
      "",
    ].join("\n"),
  );
}

function must(obj, keyPath) {
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

function parseIsoDate(value, field) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid ISO date for ${field}: ${value}`);
  return d;
}

function validateEnvelope(envelope, ignoreExpiry) {
  must(envelope, "envelopeVersion");
  const taskId = must(envelope, "taskId");
  const mode = must(envelope, "mode");
  const podId = must(envelope, "podId");
  must(envelope, "authorization.supervisorToken");
  const expiresAt = must(envelope, "authorization.expiresAt");
  must(envelope, "authorization.idempotencyKey");
  must(envelope, "objective");
  must(envelope, "constraints.deadline");
  must(envelope, "constraints.compliance");
  must(envelope, "constraints.budget.maxSpend");
  must(envelope, "constraints.budget.currency");
  must(envelope, "constraints.scope");

  const expectedOutputs = must(envelope, "expectedOutputs");
  const qualityGates = must(envelope, "qualityGates");
  if (!Array.isArray(expectedOutputs) || expectedOutputs.length === 0) {
    throw new Error("expectedOutputs must be a non-empty array");
  }
  if (!Array.isArray(qualityGates) || qualityGates.length === 0) {
    throw new Error("qualityGates must be a non-empty array");
  }

  if (!["advisor", "operator"].includes(mode)) {
    throw new Error(`Invalid mode: ${mode}`);
  }

  const allowedPods = [
    "POD-STRATEGY",
    "POD-CONTENT",
    "POD-CREATIVE",
    "POD-PAID",
    "POD-ANALYTICS",
    "POD-LIFECYCLE",
  ];
  if (!allowedPods.includes(podId)) {
    throw new Error(`Invalid podId: ${podId}`);
  }

  const now = new Date();
  const expiry = parseIsoDate(expiresAt, "authorization.expiresAt");
  if (!ignoreExpiry && expiry.getTime() < now.getTime()) {
    throw new Error(
      `Supervisor token expired for task ${taskId}: ${expiresAt} (use --ignore-expiry for examples)`,
    );
  }

  return true;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.inPath) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }
  const inPath = path.resolve(process.cwd(), args.inPath);
  const raw = fs.readFileSync(inPath, "utf8");
  const envelope = JSON.parse(raw);
  validateEnvelope(envelope, args.ignoreExpiry);
  process.stdout.write("VALID\n");
}

try {
  main();
} catch (err) {
  process.stderr.write(`INVALID: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

