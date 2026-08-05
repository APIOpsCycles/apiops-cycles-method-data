## Skills
A skill is a set of local instructions to follow that is stored in a `SKILL.md` file. Below is the list of skills that can be used. Each entry includes a name, description, and file path so you can open the source for full instructions when using a specific skill.

### Available skills
- new-api-guide: Guide users through the APIOps Cycles method to design and scope a new API from business need to publishing and improvement. Use when the user needs help deciding the current station, checking whether entry or exit criteria are met, selecting the right next resource or canvas from the canonical method data, gathering answers for the selected canvas, or moving from method guidance into canvas JSON authoring and export without jumping too early into API design. (file: skills/new-api-guide/SKILL.md)
- localized-text-editing: Safely edit APIOps method and canvas labels containing localized or accented text without introducing mojibake, replacement characters, or Windows shell encoding damage. Use when changing `src/data/**` localized JSON, station labels, resource labels, canvas text, or any non-ASCII method content. (file: skills/localized-text-editing/SKILL.md)
- canvas-import-json-authoring: Create or review importable CanvasCreator JSON files using schema-first validation, template-specific section coverage, locale-aware section descriptions, and APIOps metadata defaults. Use when generating new filled canvas examples, converting raw notes into import JSON, or validating existing import files before import or export. (file: node_modules/canvascreator/.agents/skills/canvas-import-json-authoring/SKILL.md)
- common-contributor-workflow: Follow the standard CanvasCreator contribution flow for scoping, implementation, validation, docs hygiene, and pull request preparation. Use when working on CanvasCreator package changes or package-bundled skill maintenance. (file: node_modules/canvascreator/.agents/skills/common-contributor-workflow/SKILL.md)
- export-cli-usage-patterns: Create, review, or troubleshoot CanvasCreator export CLI usage for `scripts/export.js` and `canvascreator-export`, including argument patterns, output-file expectations, and format-specific behavior for `json`, `svg`, `pdf`, and `png` exports. (file: node_modules/canvascreator/.agents/skills/export-cli-usage-patterns/SKILL.md)

### How to use skills
- Discovery: The list above is the skills available in this workspace (name + description + file path). Skill bodies live on disk at the listed paths.
- Trigger rules: If the user names a skill with `$SkillName` or plain text, or the task clearly matches a skill's description shown above, use that skill for the turn.
- Missing or blocked: If a named skill is not in the list or the path cannot be read, say so briefly and continue with the best fallback.
- How to use a skill:
  1. Open its `SKILL.md`.
  2. Read only enough to follow the workflow.
  3. Resolve any relative paths from the skill directory first.
  4. Load only the specific reference files needed for the request.
- Coordination and sequencing:
  1. Use `new-api-guide` to select the correct station and canvas.
  2. Use `canvas-import-json-authoring` to create or validate importable canvas JSON.
  3. Use `export-cli-usage-patterns` to export or troubleshoot exported artifacts.
- Context hygiene: Keep context small and avoid loading unnecessary reference material.

## Localized text and encoding safety

- Treat all JSON files under `src/data/` as UTF-8.
- Do not rewrite localized or accented text through PowerShell heredocs or ad hoc shell text replacement. On Windows this can silently turn characters such as `ã`, `ç`, `é`, and smart punctuation into mojibake or `?`.
- Prefer `apply_patch` for small exact edits. For scripted edits, use Node with `readFileSync(file, "utf8")` and preserve existing text; when inserting non-ASCII text from a script, use Unicode escapes or another byte-safe source.
- Run `npm.cmd test` on Windows. Plain `npm test` can fail through PowerShell execution policy because it invokes `npm.ps1`.
- The content integrity test fails on known mojibake and replacement patterns including `Ã`, `Â`, `â...`, `�`, `Snum`, `snum`, and `cumprems`.
