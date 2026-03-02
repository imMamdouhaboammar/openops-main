#!/usr/bin/env node
/**
 * Lightweight validator for `agency_live_journey.v1.json`.
 * Purpose: catch broken references (stage IDs, role IDs, graph refs) without external deps.
 *
 * Usage:
 *   node 11_marketing_growth_agent/13_automation/validators/validate_agency_live_journey.js \
 *     --in 11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { in: "11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json" };
  for (let i = 2; i < argv.length; i += 1) {
    const k = argv[i];
    const v = argv[i + 1];
    if (!k.startsWith("--")) continue;
    if (!v || v.startsWith("--")) throw new Error(`Missing value for ${k}`);
    if (k === "--in") args.in = v;
    i += 1;
  }
  return args;
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function uniqOrThrow(values, label) {
  const set = new Set();
  const dups = new Set();
  for (const v of values) {
    if (set.has(v)) dups.add(v);
    set.add(v);
  }
  if (dups.size) throw new Error(`${label} duplicates: ${Array.from(dups).join(", ")}`);
}

function ensureAllExist(refs, universeSet, label) {
  const missing = [];
  for (const r of refs) {
    if (!universeSet.has(r)) missing.push(r);
  }
  if (missing.length) throw new Error(`${label} missing refs: ${missing.slice(0, 20).join(", ")}${missing.length > 20 ? "…" : ""}`);
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = process.cwd();
  const inAbs = path.resolve(repoRoot, args.in);
  const doc = loadJson(inAbs);

  if (!doc || typeof doc !== "object") throw new Error("Root must be an object");
  if (!doc.journey || !Array.isArray(doc.journey.stages)) throw new Error("Missing journey.stages[]");
  if (!doc.actors || !doc.actors.agencyRoles || !Array.isArray(doc.actors.agencyRoles)) throw new Error("Missing actors.agencyRoles[]");

  const stageIds = doc.journey.stages.map((s) => s.stageId);
  uniqOrThrow(stageIds, "stageId");
  const stageIdSet = new Set(stageIds);

  const roleIds = (doc.actors.agencyRoles || []).map((r) => r.roleId);
  uniqOrThrow(roleIds, "agency roleId");
  const roleIdSet = new Set(roleIds);

  // Validate stage primaryOwnerRoleId and participants.
  for (const stage of doc.journey.stages) {
    if (!roleIdSet.has(stage.primaryOwnerRoleId)) {
      throw new Error(`Stage ${stage.stageId} references unknown primaryOwnerRoleId: ${stage.primaryOwnerRoleId}`);
    }
    for (const p of stage.participants || []) {
      // participants is a mix of clientRoles and agencyRoles (by id). Only validate agency role IDs here.
      if (p.startsWith("CLIENT_")) continue;
      if (!roleIdSet.has(p)) throw new Error(`Stage ${stage.stageId} references unknown participant roleId: ${p}`);
    }
  }

  // Validate workflow graph references.
  if (doc.workflowGraph && Array.isArray(doc.workflowGraph.nodes) && Array.isArray(doc.workflowGraph.edges)) {
    const nodeIdSet = new Set(doc.workflowGraph.nodes.map((n) => n.id));
    uniqOrThrow(Array.from(nodeIdSet), "workflowGraph node id");

    for (const n of doc.workflowGraph.nodes) {
      if (n.type === "stage") {
        if (!stageIdSet.has(n.ref)) throw new Error(`workflowGraph node ${n.id} references missing stageId: ${n.ref}`);
      }
    }

    for (const e of doc.workflowGraph.edges) {
      if (!nodeIdSet.has(e.from)) throw new Error(`workflowGraph edge references missing from-node: ${e.from}`);
      if (!nodeIdSet.has(e.to)) throw new Error(`workflowGraph edge references missing to-node: ${e.to}`);
    }
  }

  // Validate repo-inspiration paths exist (best-effort).
  const missingPaths = [];
  const primaryDocs = (doc.repoInspiration && doc.repoInspiration.primaryDocs) || [];
  for (const d of primaryDocs) {
    if (!d || !d.path) continue;
    const pAbs = path.resolve(repoRoot, d.path);
    if (!fs.existsSync(pAbs)) missingPaths.push(d.path);
  }
  if (missingPaths.length) {
    throw new Error(`repoInspiration.primaryDocs contains missing paths: ${missingPaths.slice(0, 10).join(", ")}${missingPaths.length > 10 ? "…" : ""}`);
  }

  process.stdout.write("AGENCY_LIVE_JOURNEY_VALID\n");
}

try {
  main();
} catch (err) {
  process.stderr.write(`AGENCY_LIVE_JOURNEY_INVALID: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

