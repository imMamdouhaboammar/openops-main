#!/usr/bin/env node
/**
 * Generates a machine-readable registry of repo skills from `./skills/<skill>/SKILL.md`.
 * Goal: make "skills per specialty" composable, queryable, and automation-ready.
 *
 * Usage:
 *   node 11_marketing_growth_agent/13_automation/skills/generate_repo_skills_registry.js \
 *     --skills ./skills \
 *     --out ./11_marketing_growth_agent/14_registry/repo_skills_registry.v1.json
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { skills: "./skills", out: "./11_marketing_growth_agent/14_registry/repo_skills_registry.v1.json" };
  for (let i = 2; i < argv.length; i += 1) {
    const k = argv[i];
    const v = argv[i + 1];
    if (!k.startsWith("--")) continue;
    if (!v || v.startsWith("--")) throw new Error(`Missing value for ${k}`);
    if (k === "--skills") args.skills = v;
    if (k === "--out") args.out = v;
    i += 1;
  }
  return args;
}

function safeReadText(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function parseFrontmatter(markdown) {
  // Very small parser: supports `---` frontmatter and simple `key: value` pairs.
  // This is intentionally dependency-free.
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
    let value = m[2] || "";
    value = value.trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    attributes[key] = value;
  }

  return { attributes, body: lines.slice(endIdx + 1).join("\n") };
}

function listSkillDirectories(skillsRootAbs) {
  const entries = fs.readdirSync(skillsRootAbs, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => path.join(skillsRootAbs, e.name))
    .sort((a, b) => a.localeCompare(b));
}

function firstHeading(markdown) {
  if (!markdown) return null;
  const lines = markdown.split("\n");
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)\s*$/);
    if (m) return m[1].trim();
  }
  return null;
}

function isoOrNull(stat) {
  try {
    return stat.mtime.toISOString();
  } catch {
    return null;
  }
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = process.cwd();
  const skillsRootAbs = path.resolve(repoRoot, args.skills);
  const outAbs = path.resolve(repoRoot, args.out);

  if (!fs.existsSync(skillsRootAbs)) {
    throw new Error(`Skills root not found: ${skillsRootAbs}`);
  }

  const skillDirs = listSkillDirectories(skillsRootAbs);
  const skills = [];

  for (const dirAbs of skillDirs) {
    const dirName = path.basename(dirAbs);
    const skillMdAbs = path.join(dirAbs, "SKILL.md");
    const md = safeReadText(skillMdAbs);

    const relDir = path.relative(repoRoot, dirAbs);
    const relSkillMd = path.relative(repoRoot, skillMdAbs);

    const stat = fs.existsSync(skillMdAbs) ? fs.statSync(skillMdAbs) : null;
    const { attributes, body } = parseFrontmatter(md);

    const id = attributes.name || dirName;
    const description = attributes.description || null;
    const title = firstHeading(body) || null;

    skills.push({
      skillId: id,
      dirName,
      title,
      description,
      path: relDir,
      skillFile: fs.existsSync(skillMdAbs) ? relSkillMd : null,
      hasSkillFile: fs.existsSync(skillMdAbs),
      fileMeta: stat
        ? {
            bytes: stat.size,
            mtimeISO: isoOrNull(stat),
          }
        : null,
    });
  }

  const out = {
    $schema: "openops://11_marketing_growth_agent/14_registry/repo_skills_registry.schema.json",
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    skillsRoot: path.relative(repoRoot, skillsRootAbs),
    totalSkills: skills.length,
    skills,
  };

  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  fs.writeFileSync(outAbs, `${JSON.stringify(out, null, 2)}\n`, "utf8");
  process.stdout.write(`WROTE ${path.relative(repoRoot, outAbs)} (${skills.length} skills)\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`ERROR: ${err && err.message ? err.message : String(err)}\n`);
  process.exit(1);
}
