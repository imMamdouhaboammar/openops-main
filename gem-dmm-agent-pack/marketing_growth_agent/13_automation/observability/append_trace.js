#!/usr/bin/env node
/**
 * Append a trace event as JSONL.
 * Dependency-free and safe for local workflows.
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { out: null, type: null, context: null, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") args.help = true;
    else if (token === "--out") {
      args.out = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--type") {
      args.type = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--context") {
      args.context = argv[i + 1] ?? null;
      i += 1;
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printHelp() {
  const name = path.basename(process.argv[1]);
  process.stdout.write(
    [
      `Usage: ${name} --out <trace.jsonl> --type <eventType> [--context <json>]`,
      "",
      "Example:",
      `  ${name} --out /tmp/trace.jsonl --type dispatch_pack_generated --context '{\"clientSlug\":\"x\"}'`,
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

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.out || !args.type) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const outPath = path.resolve(process.cwd(), args.out);
  ensureDir(path.dirname(outPath));

  let ctx = {};
  if (args.context) ctx = JSON.parse(args.context);

  const evt = {
    schemaVersion: "1.0.0",
    timestamp: isoNow(),
    eventType: args.type,
    context: ctx,
  };

  fs.appendFileSync(outPath, JSON.stringify(evt) + "\n", "utf8");
  process.stdout.write("TRACED\n");
}

try {
  main();
} catch (err) {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

