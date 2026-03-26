# APIOps Project Scaffold

This package contains a draft scaffold for starting API design work with:

- `apiops-cycles-method-data`
- `canvascreator`
- the `new-api-guide` skill workflow

## What is included

- `create-apiops/`
  - a draft `npm create` style scaffolder
  - a project template with `docs/`, `specs/`, `src/`, `AGENTS.md`, and starter files
- `package-examples/`
  - example `package.json` shapes for:
    - `apiops-cycles-method-data`
    - `canvascreator`
    - a user API project

## How to use this draft

### Option 1: Review the scaffold design

Read:

- `create-apiops/bin/create-apiops-project.js`
- `create-apiops/template/package.json`
- `create-apiops/template/README.md`
- `create-apiops/template/AGENTS.md`

This is useful if you want to implement the scaffolder in a proper repo later.

### Option 2: Use the template manually

1. Copy the contents of `create-apiops/template/` into a new API project folder.
2. Edit `package.json`, `README.md`, and `specs/openapi/api.yaml` to replace placeholders.
3. Run `npm install`.
4. Add your canvases under `specs/canvases/`.
5. Add your OpenAPI files under `specs/openapi/`.
6. Export reviewable SVGs into `docs/api/...`.

## Recommended project structure

- `specs/` = version-controlled source-of-truth artifacts
- `docs/` = rendered review material
- `src/` = implementation

Suggested layout:

- `specs/canvases/`
- `specs/openapi/`
- `specs/audit/`
- `docs/api/strategy/`
- `docs/api/architecture/`
- `docs/api/design/`
- `docs/api/delivery/`
- `docs/api/audit/`
- `docs/api/publishing/`
