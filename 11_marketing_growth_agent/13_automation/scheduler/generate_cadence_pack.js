#!/usr/bin/env node
/**
 * Generate a cadence schedule pack (weekly planning, weekly update, monthly review, experiment decision gates).
 * Outputs a machine-readable JSON schedule that can later be pushed to ClickUp/Notion/Calendar.
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { ssot: null, client: null, start: null, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") args.help = true;
    else if (token === "--ssot") {
      args.ssot = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--client") {
      args.client = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--start") {
      args.start = argv[i + 1] ?? null;
      i += 1;
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printHelp() {
  const name = path.basename(process.argv[1]);
  process.stdout.write(
    [
      `Usage: ${name} --ssot <client_ssot_root> --client <clientSlug> [--start YYYY-MM-DD]`,
      "",
      "Output:",
      "- Writes SchedulePack/cadence.json",
      "",
    ].join("\n"),
  );
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeJson(p, obj) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function parseDate(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) throw new Error(`Invalid date: ${dateStr}`);
  return new Date(`${dateStr}T09:00:00Z`);
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function iso(d) {
  return d.toISOString();
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.ssot || !args.client) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const ssotRoot = path.resolve(process.cwd(), args.ssot);
  const clientSlug = args.client;
  const start = args.start ? parseDate(args.start) : new Date();

  const schedule = {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    clientSlug,
    cadence: {
      weeklyPlanning: { dayOfWeek: "Mon", label: "Weekly Planning Call" },
      weeklyUpdate: { dayOfWeek: "Fri", label: "Weekly Performance Update" },
      monthlyReview: { day: 1, label: "Monthly Business Review (MBR)" },
      experiments: { decisionDays: [7, 14], label: "Experiment Decision Gates" },
    },
    items: [],
  };

  // Generate 4 weeks of cadence items.
  for (let week = 1; week <= 4; week += 1) {
    const weekStart = addDays(start, (week - 1) * 7);
    schedule.items.push({
      type: "weekly_planning",
      week,
      dueAt: iso(addDays(weekStart, 0)),
      title: `Weekly Planning (Week ${week})`,
      owner: "Supervisor Orchestrator",
    });
    schedule.items.push({
      type: "weekly_update",
      week,
      dueAt: iso(addDays(weekStart, 4)),
      title: `Weekly Update (Week ${week})`,
      owner: "Analytics Pod + Supervisor Orchestrator",
    });
  }

  // Decision gates relative to week 1 start
  schedule.items.push({
    type: "experiment_gate",
    gate: "day_7",
    dueAt: iso(addDays(start, 7)),
    title: "Experiment Decision Gate — Day 7",
    owner: "Supervisor Orchestrator",
  });
  schedule.items.push({
    type: "experiment_gate",
    gate: "day_14",
    dueAt: iso(addDays(start, 14)),
    title: "Experiment Decision Gate — Day 14",
    owner: "Supervisor Orchestrator",
  });

  const outPath = path.join(ssotRoot, "SchedulePack", "cadence.json");
  writeJson(outPath, schedule);

  process.stdout.write(`GENERATED cadence pack for ${clientSlug}\n`);
  process.stdout.write(`- ${outPath}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

