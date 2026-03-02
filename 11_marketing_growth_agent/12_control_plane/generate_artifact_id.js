#!/usr/bin/env node
/**
 * Generate canonical artifact IDs based on artifact_naming_taxonomy.md
 * Dependency-free.
 */

const path = require("path");

function parseArgs(argv) {
  const args = {
    type: null,
    client: null,
    scope: null,
    date: null,
    version: "v1.0",
    help: false,
  };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") args.help = true;
    else if (token === "--type") {
      args.type = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--client") {
      args.client = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--scope") {
      args.scope = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--date") {
      args.date = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--version") {
      args.version = argv[i + 1] ?? "v1.0";
      i += 1;
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printHelp() {
  const name = path.basename(process.argv[1]);
  process.stdout.write(
    [
      `Usage: ${name} --type <ARTIFACT_TYPE> --client <client-slug> --scope <scope> [--date YYYY-MM-DD] [--version v1.0]`,
      "",
      "Example:",
      `  ${name} --type PLAN_90D --client example-restaurant --scope strategy --date 2026-01-24 --version v1.1`,
      "",
    ].join("\n"),
  );
}

function isoDate() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeSlug(text) {
  return String(text ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function validateDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Invalid date format: ${date}`);
  return date;
}

function validateVersion(version) {
  if (!/^v\d+\.\d+$/.test(version)) throw new Error(`Invalid version format (expected vMAJOR.MINOR): ${version}`);
  return version;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.type || !args.client || !args.scope) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const date = validateDate(args.date ?? isoDate());
  const version = validateVersion(args.version ?? "v1.0");

  const artifactType = String(args.type).trim().toUpperCase();
  const clientSlug = normalizeSlug(args.client);
  const scope = normalizeSlug(args.scope);

  if (!artifactType) throw new Error("Missing --type");
  if (!clientSlug) throw new Error("Invalid --client slug");
  if (!scope) throw new Error("Invalid --scope");

  process.stdout.write(`${artifactType}__${clientSlug}__${scope}__${date}__${version}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

