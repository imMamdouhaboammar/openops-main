#!/usr/bin/env node
/**
 * Validate a text output against core "Impossible Level" behavioral contracts.
 * Dependency-free. Intended for use in:
 * - manual validation
 * - CI checks
 * - prompt regression tooling assertions
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { inPath: null, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") args.help = true;
    else if (token === "--in") {
      args.inPath = argv[i + 1] ?? null;
      i += 1;
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printHelp() {
  const name = path.basename(process.argv[1]);
  process.stdout.write(
    [
      `Usage: ${name} --in <output.txt>`,
      "",
      "Checks:",
      "- Trigger → Action → Reward → Friction → Metric → Failure Mode format present",
      "- MVP (1-day), MVP++ (1-week), Not Built present",
      "- 7–14 day validation language present",
      "",
      "Exit codes:",
      "  0 = pass",
      "  1 = fail",
      "",
    ].join("\n"),
  );
}

function mustMatch(text, regex, label, failures) {
  if (!regex.test(text)) failures.push(label);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.inPath) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const inPath = path.resolve(process.cwd(), args.inPath);
  const text = fs.readFileSync(inPath, "utf8");
  const failures = [];

  mustMatch(
    text,
    /Trigger\s*→\s*Action\s*→\s*Reward\s*→\s*Friction\s*→\s*Metric\s*→\s*Failure\s*Mode/i,
    "Missing locked growth-idea format: Trigger → Action → Reward → Friction → Metric → Failure Mode",
    failures,
  );
  mustMatch(text, /MVP\s*\(1-day\)/i, "Missing MVP (1-day)", failures);
  mustMatch(text, /MVP\+\+\s*\(1-week\)/i, "Missing MVP++ (1-week)", failures);
  mustMatch(text, /\bNot\s*Built\b/i, "Missing Not Built scope", failures);

  const has7to14 =
    /7\s*[–-]\s*14\s*day/i.test(text) ||
    /within\s*14\s*days/i.test(text) ||
    /within\s*7\s*days/i.test(text);
  if (!has7to14) failures.push("Missing 7–14 day validation path language");

  if (failures.length > 0) {
    process.stderr.write("FAIL\n");
    for (const f of failures) process.stderr.write(`- ${f}\n`);
    process.exit(1);
  }

  process.stdout.write("PASS\n");
}

try {
  main();
} catch (err) {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

