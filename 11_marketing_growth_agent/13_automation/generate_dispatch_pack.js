#!/usr/bin/env node
/**
 * Generate a Supervisor Dispatch Pack from a single Client Intake JSON.
 *
 * Outputs:
 * - DispatchPack/envelopes/*.envelope.json (pod tasks)
 * - DispatchPack/artifact_ids.json (canonical artifact IDs to be produced)
 * - DecisionLog/decision_log.jsonl (starter file)
 *
 * This uses filesystem SSOT (no external integrations required).
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { inPath: null, outPath: null, tracePath: null, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") args.help = true;
    else if (token === "--in") {
      args.inPath = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--out") {
      args.outPath = argv[i + 1] ?? null;
      i += 1;
    } else if (token === "--trace") {
      args.tracePath = argv[i + 1] ?? null;
      i += 1;
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printHelp() {
  const name = path.basename(process.argv[1]);
  process.stdout.write(
    [
      `Usage: ${name} --in <client_intake.json> --out <ssot_root/clientSlug> [--trace <trace.jsonl>]`,
      "",
      "Example:",
      `  ${name} --in 11_marketing_growth_agent/13_automation/examples/client_intake.restaurant.json --out /tmp/openops_ssot/example-restaurant --trace /tmp/openops_ssot/example-restaurant/Traces/trace.jsonl`,
      "",
    ].join("\n"),
  );
}

function isoNow() {
  return new Date().toISOString();
}

function isoDate() {
  return new Date().toISOString().slice(0, 10);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function appendTrace(tracePath, eventType, context) {
  if (!tracePath) return;
  ensureDir(path.dirname(tracePath));
  const evt = {
    schemaVersion: "1.0.0",
    timestamp: isoNow(),
    eventType,
    context: context ?? {},
  };
  fs.appendFileSync(tracePath, JSON.stringify(evt) + "\n", "utf8");
}

function taskId(prefix, clientSlug, suffix) {
  const safe = String(clientSlug).toUpperCase().replace(/[^A-Z0-9]+/g, "-");
  return `TASK-${safe}-${prefix}-${suffix}`;
}

function makeEnvelope({ taskIdValue, podId, objective, intake, deadlineDays, expectedOutputs }) {
  const now = isoNow();
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // +60min
  const deadline = new Date(Date.now() + deadlineDays * 24 * 60 * 60 * 1000).toISOString();

  return {
    envelopeVersion: "1.0.0",
    taskId: taskIdValue,
    mode: "operator",
    podId,
    authorization: {
      supervisorToken: "SUPERVISOR_TOKEN_PLACEHOLDER",
      expiresAt: expires,
      idempotencyKey: `idem-${now.slice(0, 10)}-${taskIdValue.toLowerCase()}`,
    },
    objective,
    context: {
      clientType: intake.client.type,
      clientName: intake.client.clientName,
      clientSlug: intake.client.clientSlug,
    },
    inputs: {
      clientIntake: intake,
    },
    constraints: {
      deadline,
      compliance: intake.constraints.compliance,
      budget: { maxSpend: intake.constraints.budget.monthlyPaidMedia, currency: intake.constraints.budget.currency },
      scope: {
        note: "This envelope scope is a starting point; refine per client and approval gates.",
      },
    },
    expectedOutputs,
    qualityGates: [
      "Artifacts are returned (not freeform advice)",
      "Decisions needed are explicit with deadlines",
      "Next actions are concrete and owner-tagged",
    ],
    approvalGates: ["Supervisor approval required before client-facing launch actions"],
    returnFormat: "artifact_plus_decisions",
  };
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.inPath || !args.outPath) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const intakePath = path.resolve(process.cwd(), args.inPath);
  const ssotRoot = path.resolve(process.cwd(), args.outPath);
  const tracePath = args.tracePath ? path.resolve(process.cwd(), args.tracePath) : null;
  const intake = JSON.parse(fs.readFileSync(intakePath, "utf8"));

  const clientSlug = intake.client?.clientSlug;
  if (!clientSlug) throw new Error("Invalid intake: missing client.clientSlug");

  ensureDir(ssotRoot);

  const dispatchDir = path.join(ssotRoot, "DispatchPack");
  const envelopesDir = path.join(dispatchDir, "envelopes");
  const decisionDir = path.join(ssotRoot, "DecisionLog");
  ensureDir(envelopesDir);
  ensureDir(decisionDir);

  const today = isoDate();
  const artifactIds = {
    generatedAt: isoNow(),
    clientSlug,
    artifacts: {
      brief: `BRIEF__${clientSlug}__onboarding__${today}__v1.0`,
      plan6m: `PLAN_6M__${clientSlug}__strategy__${today}__v1.0`,
      plan90d: `PLAN_90D__${clientSlug}__strategy__${today}__v1.0`,
      microplan7d: `MICROPLAN_7D__${clientSlug}__week-01__${today}__v1.0`,
      trackingPlan: `TRACKING_PLAN__${clientSlug}__measurement__${today}__v1.0`,
      paidPlan: `PAID_PLAN__${clientSlug}__paid__${today}__v1.0`,
      contentCalendar: `CONTENT_CALENDAR__${clientSlug}__month-01__${today}__v1.0`,
      brandBrief: `BRAND_BRIEF__${clientSlug}__identity__${today}__v1.0`,
    },
  };
  writeJson(path.join(dispatchDir, "artifact_ids.json"), artifactIds);

  const envelopes = [
    makeEnvelope({
      taskIdValue: taskId("STRATEGY", clientSlug, "0001"),
      podId: "POD-STRATEGY",
      objective: "Create 6-month strategy decomposed into 90/30/7-day plans with KPIs/OKRs and experiment backlog.",
      intake,
      deadlineDays: 7,
      expectedOutputs: [artifactIds.artifacts.plan6m, artifactIds.artifacts.plan90d, artifactIds.artifacts.microplan7d],
    }),
    makeEnvelope({
      taskIdValue: taskId("ANALYTICS", clientSlug, "0001"),
      podId: "POD-ANALYTICS",
      objective: "Produce minimum viable tracking plan + UTMs + QA checklist for the primary conversion surfaces.",
      intake,
      deadlineDays: 3,
      expectedOutputs: [artifactIds.artifacts.trackingPlan],
    }),
    makeEnvelope({
      taskIdValue: taskId("BRAND", clientSlug, "0001"),
      podId: "POD-CREATIVE",
      objective: intake.assets.brandKit.exists
        ? "Ingest existing brand kit and define production-ready templates and QA checklist."
        : "Create minimum viable brand brief + brand hygiene kit and template direction so production is consistent.",
      intake,
      deadlineDays: 7,
      expectedOutputs: [artifactIds.artifacts.brandBrief],
    }),
    makeEnvelope({
      taskIdValue: taskId("CONTENT", clientSlug, "0001"),
      podId: "POD-CONTENT",
      objective: "Create a 4-week content calendar aligned to the 90-day plan with scripts/captions and review engine scripts.",
      intake,
      deadlineDays: 5,
      expectedOutputs: [artifactIds.artifacts.contentCalendar],
    }),
    makeEnvelope({
      taskIdValue: taskId("PAID", clientSlug, "0001"),
      podId: "POD-PAID",
      objective: "Design a paid media launch plan with testing matrix, pacing rules, UTMs, and kill metrics for 7–14 day tests.",
      intake,
      deadlineDays: 4,
      expectedOutputs: [artifactIds.artifacts.paidPlan],
    }),
    makeEnvelope({
      taskIdValue: taskId("LIFECYCLE", clientSlug, "0001"),
      podId: "POD-LIFECYCLE",
      objective: "Design lifecycle messaging and review engine flows that work with the client’s operational constraints.",
      intake,
      deadlineDays: 6,
      expectedOutputs: [`LIFECYCLE_MAP__${clientSlug}__crm__${today}__v1.0`],
    }),
  ];

  for (const env of envelopes) {
    const p = path.join(envelopesDir, `${env.taskId}.envelope.json`);
    writeJson(p, env);
  }

  const decisionLogPath = path.join(decisionDir, "decision_log.jsonl");
  if (!fs.existsSync(decisionLogPath)) {
    fs.writeFileSync(decisionLogPath, "", "utf8");
  }

  appendTrace(tracePath, "dispatch_pack_generated", {
    clientSlug,
    ssotRoot,
    envelopeCount: envelopes.length,
    artifactIds: artifactIds.artifacts,
  });

  process.stdout.write(`GENERATED dispatch pack for ${clientSlug}\n`);
  process.stdout.write(`- envelopes: ${envelopes.length}\n`);
  process.stdout.write(`- ssot: ${ssotRoot}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}
