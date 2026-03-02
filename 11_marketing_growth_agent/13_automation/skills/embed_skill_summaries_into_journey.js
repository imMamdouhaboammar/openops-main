#!/usr/bin/env node
/**
 * Embeds summarized content of referenced repo skills directly into the journey JSON.
 * Goal: produce a single shareable "god-file" roadmap for agent engineers, while keeping it maintainable.
 *
 * It enriches each `recommendedRepoSkills[]` item with an `inlineSummary` object:
 * - name/title/description
 * - key headings + a few bullets per heading
 * - important links (URLs) found in the SKILL.md body
 *
 * Usage:
 *   node 11_marketing_growth_agent/13_automation/skills/embed_skill_summaries_into_journey.js \
 *     --journey 11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json \
 *     --skills ./skills \
 *     --out 11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = {
    journey: "11_marketing_growth_agent/06_workflows/agency_live_journey.v1.json",
    skills: "./skills",
    out: null,
    maxSectionsPerSkill: 8,
    maxBulletsPerSection: 6,
    maxLinksPerSkill: 10,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const k = argv[i];
    const v = argv[i + 1];
    if (!k.startsWith("--")) continue;
    if (!v || v.startsWith("--")) throw new Error(`Missing value for ${k}`);

    if (k === "--journey") args.journey = v;
    if (k === "--skills") args.skills = v;
    if (k === "--out") args.out = v;
    if (k === "--max-sections") args.maxSectionsPerSkill = Number(v);
    if (k === "--max-bullets") args.maxBulletsPerSection = Number(v);
    if (k === "--max-links") args.maxLinksPerSkill = Number(v);
    i += 1;
  }

  if (!args.out) args.out = args.journey;
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, obj) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(obj, null, 2)}\n`, "utf8");
}

function parseFrontmatter(markdown) {
  if (!markdown) return { attributes: {}, body: "" };
  const lines = markdown.split("\n");
  if (lines[0] !== "---") return { attributes: {}, body: markdown };

  let endIdx = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === "---") {
      endIdx = i;
      break;
    }
  }
  if (endIdx === -1) return { attributes: {}, body: markdown };

  const attributes = {};
  const fmLines = lines.slice(1, endIdx);
  for (const line of fmLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const m = trimmed.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let value = (m[2] || "").trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    attributes[key] = value;
  }

  return { attributes, body: lines.slice(endIdx + 1).join("\n") };
}

function firstH1(body) {
  const lines = body.split("\n");
  for (const line of lines) {
    const m = line.match(/^#\s+(.+?)\s*$/);
    if (m) return m[1].trim();
  }
  return null;
}

function extractHeadingsAndBullets(body, limits) {
  const { maxSectionsPerSkill, maxBulletsPerSection } = limits;
  const lines = body.split("\n");

  const sections = [];
  let current = null;
  let inCodeFence = false;

  function pushCurrent() {
    if (!current) return;
    if (!current.heading) return;
    if (!current.bullets.length && !current.textPreview) return;
    sections.push(current);
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const h2 = line.match(/^##\s+(.+?)\s*$/);
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    const heading = h2 ? h2[1].trim() : h3 ? h3[1].trim() : null;

    if (heading) {
      pushCurrent();
      if (sections.length >= maxSectionsPerSkill) break;
      current = {
        heading,
        level: h2 ? 2 : 3,
        bullets: [],
        textPreview: null,
      };
      continue;
    }

    if (!current) continue;
    if (current.bullets.length >= maxBulletsPerSection) continue;

    const bullet = line.match(/^\s*[-*]\s+(.+?)\s*$/);
    if (bullet) {
      const item = bullet[1].trim();
      if (item) current.bullets.push(item);
      continue;
    }

    // Provide a small fallback preview when there are no bullets in a section.
    if (!current.textPreview) {
      const t = line.trim();
      if (t && !t.startsWith("#")) current.textPreview = t.slice(0, 220);
    }
  }

  pushCurrent();
  return sections;
}

function extractLinks(markdown, maxLinksPerSkill) {
  const links = new Set();
  const urlRe = /\bhttps?:\/\/[^\s)>\]]+/g;
  const matches = markdown.match(urlRe) || [];
  for (const m of matches) {
    links.add(m.replace(/[.,;:]+$/, ""));
    if (links.size >= maxLinksPerSkill) break;
  }
  return Array.from(links);
}

function summarizeSkill(skillName, skillsRootAbs, limits) {
  const dirAbs = path.join(skillsRootAbs, skillName);
  const fileAbs = path.join(dirAbs, "SKILL.md");
  if (!fs.existsSync(fileAbs)) {
    return {
      status: "missing",
      skillName,
      error: `SKILL.md not found at ${path.relative(process.cwd(), fileAbs)}`,
    };
  }

  const raw = fs.readFileSync(fileAbs, "utf8");
  const { attributes, body } = parseFrontmatter(raw);

  const title = firstH1(body);
  const description = attributes.description || null;
  const fmName = attributes.name || skillName;

  const keySections = extractHeadingsAndBullets(body, limits);
  const links = extractLinks(raw, limits.maxLinksPerSkill);

  const oneLine =
    description ||
    (title ? `Skill guide: ${title}` : `Skill guide: ${skillName}`);

  return {
    status: "ok",
    skillName,
    name: fmName,
    title: title || null,
    oneLineSummary: oneLine,
    description,
    keySections,
    links,
  };
}

function uniqueSkillNamesFromJourney(doc) {
  const set = new Set();
  const specialties = (doc.skills && doc.skills.specialties) || [];
  for (const s of specialties) {
    for (const r of s.recommendedRepoSkills || []) {
      if (r && r.skillName) set.add(r.skillName);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = process.cwd();
  const journeyAbs = path.resolve(repoRoot, args.journey);
  const outAbs = path.resolve(repoRoot, args.out);
  const skillsRootAbs = path.resolve(repoRoot, args.skills);

  const doc = readJson(journeyAbs);
  if (!doc.skills || !Array.isArray(doc.skills.specialties)) {
    throw new Error("Journey JSON missing skills.specialties[]");
  }

  const unique = uniqueSkillNamesFromJourney(doc);
  const limits = {
    maxSectionsPerSkill: args.maxSectionsPerSkill,
    maxBulletsPerSection: args.maxBulletsPerSection,
    maxLinksPerSkill: args.maxLinksPerSkill,
  };

  const cache = new Map();
  for (const name of unique) {
    cache.set(name, summarizeSkill(name, skillsRootAbs, limits));
  }

  for (const specialty of doc.skills.specialties) {
    const enriched = [];
    for (const rec of specialty.recommendedRepoSkills || []) {
      const snap = rec && rec.skillName ? cache.get(rec.skillName) : null;
      enriched.push({
        ...rec,
        inlineSummary: snap,
      });
    }
    specialty.recommendedRepoSkills = enriched;
  }

  doc.skills.embeddedSkillSnapshots = {
    generatedAt: new Date().toISOString(),
    generatorScript: "11_marketing_growth_agent/13_automation/skills/embed_skill_summaries_into_journey.js",
    limits,
    embeddedCount: unique.length,
  };

  writeJson(outAbs, doc);
  process.stdout.write(`EMBEDDED ${unique.length} skill summaries into ${path.relative(repoRoot, outAbs)}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}

