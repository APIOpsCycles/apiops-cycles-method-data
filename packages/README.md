# APIOps Project Scaffold (`create-apiops`)

The `create-apiops` package is the published APIOps project initializer.

## Requirements

- Node.js 22 or newer
- npm

## Quickstart

Use the published initializer:

```bash
npm create apiops@latest
```

For unattended setup (CI/scripts), use flags:

```bash
npm create apiops@latest -- --yes --name my-api --locale en --style REST --no-install
```

Supported automation flags:

- `--yes` use defaults/non-interactive mode
- `--name <project-name>` set project folder/package name
- `--locale <locale>` set default locale (`en`, `fi`, `fr`, etc.)
- `--style <REST|Event|GraphQL|Not sure yet>` set API style scaffolding focus
- `--no-install` skip `npm install` during scaffolding

## What gets generated

A starter project with:

- `specs/canvases/` (canvas source files)
- `specs/openapi/` (OpenAPI contracts)
- `specs/audit/` (audit notes/checklists)
- `docs/api/...` (rendered artifacts)
- `src/` (implementation area)
- template `AGENTS.md` and helper npm scripts (`method:stations`, `method:resource:audit`, and style-specific canvas commands)

## Troubleshooting

- **`Target already exists`**: choose a different `--name` or remove the existing folder.
- **Install failed**: rerun inside the scaffolded directory with `npm install`.
- **No starter canvas generated**: this happens when `--no-install` is used; run `npm install` and regenerate by rerunning scaffold flow.
- **Method helper command fails**: confirm `apiops-cycles-method-data` is installed in the generated project and run `npm run method:stations` again.

## Template dependency version policy

`packages/create-apiops/template/package.json` keeps dependency ranges aligned to this policy:

- Use caret ranges (`^x.y.z`) for template runtime dependencies to receive compatible patch/minor updates.
- Do **not** add `overrides` for direct dependencies unless there is a documented compatibility issue.
- If an override is required, it must match the same major/minor strategy as the dependency declaration (for example, `dependency: ^3.2.0` pairs with override `^3.2.x` / `^3.2.0`, not a different major line).
- Any temporary override must be explained in this README with a short reason and removal plan.
