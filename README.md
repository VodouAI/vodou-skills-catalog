# VodouAI/vodou-skills-catalog

The public catalog of Vodou skills installable via `brain-trust4 skill install <id>`.

Each entry under `skills/` is a single skill — a `SKILL.md` (with canonical frontmatter) plus optional `actions.json`, `references/`, `templates/`, `scripts/`, `assets/`. The catalog manifest in [`index.json`](index.json) lists every published skill with its sha256 pin, MCP requirements, and source location.

## Tiers

- **curated** — reviewed by the VodouAI team. Stable schema, MCP requirements verified, listed in default search results.
- **community** — accepted by PR after `validate.yml` passes. Same schema, no curation guarantee.

The `tier` field in `index.json` distinguishes them.

## Contribute a skill

1. Fork this repo.
2. Create `skills/<skill-name>/SKILL.md` (and `actions.json` if it has stopping points). Use [`schemas/skill.schema.json`](schemas/skill.schema.json) as the canonical frontmatter spec.
3. Add an entry to [`index.json`](index.json) — see existing entries for the shape.
4. Validate locally:
   ```bash
   npm install --save-dev ajv ajv-formats
   node scripts/validate-catalog.mjs
   ```
5. Open a PR. The `validate.yml` workflow re-runs the validator on every push.

## Index format

```json
{
  "catalog_version": 1,
  "updated_at": "2026-04-26T00:00:00Z",
  "entries": [
    {
      "id": "vodou.calendar-quick-status",
      "tier": "curated",
      "version": "1.0.0",
      "sha256": "<sha256 of SKILL.md + actions.json>",
      "skill_name": "calendar-quick-status",
      "summary": "Show today's calendar at a glance",
      "source": {
        "type": "git",
        "url": "https://github.com/VodouAI/vodou-skills-catalog",
        "ref": "v1.0.0",
        "path_in_repo": "skills/calendar-quick-status"
      },
      "requires_mcp": ["google-calendar.list-events"],
      "min_oi_version": "0.5.46",
      "tags": ["productivity", "google-calendar"]
    }
  ]
}
```

## Install from the catalog

Once `brain-trust4 skill install <id>` is wired up (Phase 2 of [PLAN-SKILLS-V2](https://github.com/VodouAI/Vodou---DEV/blob/development/PLANS/0.5.46/PLAN-SKILLS-V2.md)):

```bash
brain-trust4 skill install vodou.calendar-quick-status
```

The CLI verifies the sha256, checks MCP requirements, copies into `skills/catalog/<name>/`, and registers trigger phrases in `intent_mappings`.

## License

[MIT](LICENSE) © 2026 Vodou / Linkies LLC
