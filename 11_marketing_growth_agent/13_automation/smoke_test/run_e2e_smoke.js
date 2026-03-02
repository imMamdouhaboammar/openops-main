#!/usr/bin/env node
/**
 * End-to-end smoke test for the automation workflow.
 * Generates dispatch pack + cadence pack + traces, validates envelopes, and renders one brief.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function run(cmd, args) {
  return execFileSync(cmd, args, { stdio: "pipe" }).toString("utf8").trim();
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function main() {
  const repoRoot = process.cwd();
  const ssotRoot = "/tmp/openops_ssot_smoke/example-restaurant";
  const tracePath = `${ssotRoot}/Traces/trace.jsonl`;
  ensureDir(path.dirname(tracePath));

  const intake = path.join(
    repoRoot,
    "11_marketing_growth_agent/13_automation/examples/client_intake.restaurant.json",
  );
  const gen = path.join(repoRoot, "11_marketing_growth_agent/13_automation/generate_dispatch_pack.js");
  const cadence = path.join(repoRoot, "11_marketing_growth_agent/13_automation/scheduler/generate_cadence_pack.js");
  const validate = path.join(repoRoot, "11_marketing_growth_agent/12_control_plane/validate_task_envelope.js");
  const render = path.join(repoRoot, "11_marketing_growth_agent/12_control_plane/render_task_brief.js");

  run("node", [gen, "--in", intake, "--out", ssotRoot, "--trace", tracePath]);
  run("node", [cadence, "--ssot", ssotRoot, "--client", "example-restaurant", "--start", "2026-01-24"]);

  const envelopesDir = path.join(ssotRoot, "DispatchPack/envelopes");
  const envelopes = fs.readdirSync(envelopesDir).filter((f) => f.endsWith(".envelope.json"));
  if (envelopes.length !== 6) throw new Error(`Expected 6 envelopes, got ${envelopes.length}`);

  for (const f of envelopes) {
    run("node", [validate, "--in", path.join(envelopesDir, f), "--ignore-expiry"]);
  }

  const paid = envelopes.find((f) => f.includes("-PAID-"));
  const outBrief = path.join(ssotRoot, "DispatchPack", "PAID_TASK.brief.md");
  run("node", [render, "--in", path.join(envelopesDir, paid), "--out", outBrief]);

  process.stdout.write("SMOKE_TEST_PASS\n");
  process.stdout.write(`SSOT: ${ssotRoot}\n`);
  process.stdout.write(`Trace: ${tracePath}\n`);
  process.stdout.write(`Brief: ${outBrief}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`SMOKE_TEST_FAIL: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

