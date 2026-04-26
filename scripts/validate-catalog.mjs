#!/usr/bin/env node
// Validate index.json + every catalog entry's SKILL.md frontmatter against schemas/.
// Run from repo root: `node scripts/validate-catalog.mjs`

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import yaml from 'js-yaml';

const root = process.cwd();
const fail = (msg) => { console.error(`✗ ${msg}`); process.exitCode = 1; };
const ok = (msg) => console.log(`✓ ${msg}`);

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const indexSchema = JSON.parse(fs.readFileSync(path.join(root, 'schemas/index.schema.json'), 'utf8'));
const skillSchema = JSON.parse(fs.readFileSync(path.join(root, 'schemas/skill.schema.json'), 'utf8'));
const actionsSchema = JSON.parse(fs.readFileSync(path.join(root, 'schemas/actions.schema.json'), 'utf8'));

const validateIndex = ajv.compile(indexSchema);
const validateSkill = ajv.compile(skillSchema);
const validateActions = ajv.compile(actionsSchema);

const indexPath = path.join(root, 'index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
if (!validateIndex(index)) {
  fail(`index.json schema errors:\n${JSON.stringify(validateIndex.errors, null, 2)}`);
} else {
  ok(`index.json schema OK (${index.entries.length} entries)`);
}

function parseFrontmatter(mdText) {
  if (!mdText.startsWith('---\n')) throw new Error('missing frontmatter');
  const end = mdText.indexOf('\n---', 4);
  if (end < 0) throw new Error('unterminated frontmatter');
  return yaml.load(mdText.slice(4, end));
}

function sha256OfDir(dir) {
  // SKILL.md + actions.json (if present), in alphabetical order, concatenated.
  const files = ['SKILL.md', 'actions.json']
    .map((f) => path.join(dir, f))
    .filter((p) => fs.existsSync(p));
  const h = crypto.createHash('sha256');
  for (const f of files) h.update(fs.readFileSync(f));
  return h.digest('hex');
}

let entryFailures = 0;
for (const e of index.entries) {
  const dir = path.join(root, e.source.path_in_repo);
  if (!fs.existsSync(dir)) {
    fail(`entry ${e.id} → directory missing: ${e.source.path_in_repo}`);
    entryFailures++;
    continue;
  }
  const skillMd = path.join(dir, 'SKILL.md');
  if (!fs.existsSync(skillMd)) {
    fail(`entry ${e.id} → SKILL.md missing in ${dir}`);
    entryFailures++;
    continue;
  }
  let fm;
  try {
    fm = parseFrontmatter(fs.readFileSync(skillMd, 'utf8'));
  } catch (err) {
    fail(`entry ${e.id} → frontmatter parse failed: ${err.message}`);
    entryFailures++;
    continue;
  }
  if (!validateSkill(fm)) {
    fail(`entry ${e.id} → SKILL.md frontmatter schema errors:\n${JSON.stringify(validateSkill.errors, null, 2)}`);
    entryFailures++;
  }
  if (fm.name !== e.skill_name) {
    fail(`entry ${e.id} → index.skill_name='${e.skill_name}' but frontmatter name='${fm.name}'`);
    entryFailures++;
  }
  const actionsPath = path.join(dir, 'actions.json');
  if (fs.existsSync(actionsPath)) {
    const a = JSON.parse(fs.readFileSync(actionsPath, 'utf8'));
    if (!validateActions(a)) {
      fail(`entry ${e.id} → actions.json schema errors:\n${JSON.stringify(validateActions.errors, null, 2)}`);
      entryFailures++;
    }
  }
  const actualSha = sha256OfDir(dir);
  if (actualSha !== e.sha256) {
    fail(`entry ${e.id} → sha256 mismatch (index=${e.sha256.slice(0, 12)}… actual=${actualSha.slice(0, 12)}…)`);
    entryFailures++;
  }
}

if (entryFailures === 0 && index.entries.length > 0) {
  ok(`all ${index.entries.length} entries validated`);
} else if (index.entries.length === 0) {
  ok(`(no entries to validate yet — empty catalog scaffold)`);
}

if (process.exitCode) {
  console.error(`\nvalidation failed (${entryFailures} entry error(s) + index errors above)`);
} else {
  console.log('\nall checks passed');
}
