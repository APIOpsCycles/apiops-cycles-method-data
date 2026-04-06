# APIOps Project Template

This project is a scaffolded APIOps workspace for creating a new API, producing API design artifacts, or reviewing and improving an existing API.

It uses the APIOps Cycles method through the shared `apiops-cycles-method-data` package. The generated project includes CLI commands and local wrapper scripts that help developers, AI assistants, or other tooling move from method guidance into canvases, API contracts, style guidance, and audit work.

## When to use this project

Use this project when you have any of these starting points:

- an idea for a new API but not yet a clear scope, contract, or implementation plan
- an existing API concept and a need to capture the business, domain, and interaction design more clearly
- an OpenAPI contract that you want to review, improve, or audit with more structured method guidance
- a need to create reviewable API design artifacts for a team, stakeholders, or governance process

You do not need to start with a finished API design. A rough idea, early requirements, or an existing OpenAPI file is enough.

## What you get from using it

After using this project, you should have:

- a structured set of API design artifacts in `specs/`, including canvases, style guidance, audit data, and optionally an OpenAPI contract
- reviewable documentation and audit outputs in `docs/`
- APIOps Cycles coverage results that show what is already addressed and where the current design still has gaps
- a repeatable workflow for improving the API design over time, locally and in CI

## What this project does and does not prescribe

- The project uses Node.js for the local CLI, helper scripts, linting, and CI workflow.
- It does not require your API implementation itself to use Node.js.
- You can implement the actual API in any language or platform, such as Java, C#, Go, Python, Node.js, or a gateway-based platform.
- The main requirement is that your API design artifacts, especially the OpenAPI contract and audit inputs, are kept in this project structure.

## What else you may need

This project helps you design, review, and govern an API, but it is not the full runtime or deployment solution.

To complete and publish an API, you will usually still need:

- an actual implementation or backend service
- deployment and hosting infrastructure
- an API gateway or publishing channel if your organization uses one
- developer documentation publishing and access management as needed
- organization-specific delivery, security, and operational tooling

In other words, this project gives you the design-time and review-time workspace. You may still need separate tools or platforms for implementation, deployment, publishing, and runtime operations.

## Install

```bash
npm create apiops@latest
```

## What this project contains

- `specs/canvases/` for canvas JSON source files used to explore business, domain, and API design decisions
- `specs/openapi/api.yaml` for the local project-owned API contract when the work is ready to move into OpenAPI design
- `specs/style/` for optional project-local style guide overrides when you need to replace the canonical default
- `specs/audit/` for generated audit outputs and optional local checklist overrides
- `docs/` for rendered or review-oriented artifacts
- `scripts/` for project-local helper commands that wrap shared package functionality

Treat `specs/` as the source of truth and `docs/` as generated or review material.

## Useful commands

```bash
npm run method:start
npm run method:resources:strategy
npm run method:canvases:new-api
npm run method -- resources --station api-design --style "__API_STYLE__"
npm run method:stations
npm run method:resource:audit
npm run lint:openapi
npm run validate:openapi
npm run audit:design
npm run audit:design:full-crud
```

## How to use it

- Use `npm run method:start` to find the right station to begin from. In an interactive terminal it checks criteria one by one and recommends where to start.
- Use the `method:resources:*` commands or `npm run method -- resources --station ...` to walk the method resources for a station and inspect related canvases or snippets.
- Use `npm run method:canvases:new-api` to generate starter canvas JSON files for a new API initiative.
- Use the generated canvas files to capture scope, business needs, domain understanding, and interface options before going too early into contract details.
- Use `specs/openapi/api.yaml` when you are ready to produce or review API contract details.
- The starter `specs/openapi/api.yaml` is copied during scaffolding from the canonical package example and then becomes project-specific.
- Use the canonical style and audit JSON assets from the package when reviewing design consistency, governance, and quality expectations.
- Add local override files under `specs/style/` or `specs/audit/` only when this project needs to customize those defaults.

## Linting and audit coverage

- Use `npm run lint:openapi` to lint the current OpenAPI contract with the read-only Spectral ruleset.
- Use `npm run lint:openapi:full-crud` when you want the stricter full CRUD ruleset.
- Use `npm run validate:openapi` to run both lint profiles in sequence.
- Use `npm run audit:design` to generate the APIOps Cycles coverage report for the `read-only` profile.
- Use `npm run audit:design:full-crud` to generate the same report for the `full-crud` profile.

The Spectral configuration in this project is split into a default config file and explicit profile rulesets:

- `.spectral.yaml` is the default Spectral entry point and extends `./spectral/read-only.yaml`
- `spectral/base.yaml` contains the shared OpenAPI rules used by all profiles
- `spectral/read-only.yaml` adds rules for read-only APIs, such as blocking `POST`, `PUT`, `PATCH`, and `DELETE`
- `spectral/full-crud.yaml` uses the shared base rules without the read-only restrictions

In practice:

- the npm lint scripts call the profile files in `spectral/` directly
- the GitHub Actions workflow uses those same npm scripts
- `scripts/run-design-audit.js` also selects the matching Spectral ruleset directly when generating coverage reports
- `.spectral.yaml` is still useful as the default config for editor integrations or manual commands like `spectral lint specs/openapi/api.yaml`

Note: the Spectral toolchain currently relies on some transitive dependencies that may otherwise trigger npm audit findings. The `overrides` in `package.json` are intentional and are used to keep the scaffolded dependency tree in a working and lower-risk state.

The audit command writes multiple outputs so the same result can be used by developers, docs, and CI:

- `specs/audit/design-audit.<profile>.json` as the canonical machine-readable result
- `specs/audit/design-audit.<profile>.md` as the local Markdown report
- `docs/api/audit/design-audit.<profile>.md` as the docs-side Markdown copy
- `docs/api/audit/design-audit.<profile>.html` as the rendered APIOps Cycles Coverage page
- `reports/junit/design-audit.<profile>.xml` as the CI-friendly JUnit result

## GitHub Actions

This template includes `.github/workflows/openapi-lint.yml`, which runs on pushes, pull requests, and manual dispatch.

The workflow:

- installs dependencies with `npm ci`
- runs Spectral linting for the selected audit profile
- generates the audit coverage artifacts
- publishes the JUnit XML result as a GitHub check named `APIOps Cycles coverage (<profile>)`

This makes the generated project useful both for local design work and for automated API review in CI.

## Using skills with AI assistants

This template also supports AI-assisted work through the skill instructions in `AGENTS.md`.

The main skills available in a generated project are:

- `new-api-guide` for moving through the APIOps Cycles method from strategy to design and review
- `canvas-import-json-authoring` for creating or validating CanvasCreator import JSON
- `export-cli-usage-patterns` for exporting canvas artifacts and troubleshooting export flows

In practice, this means an AI assistant can use the same project as a developer:

- start from `npm run method:start` to identify the right station
- inspect station resources and related snippets or canvases
- generate or fill canvas JSON in `specs/canvases/`
- review or improve `specs/openapi/api.yaml`
- run linting and audit coverage checks

The skill guidance is meant to keep AI work aligned with the project structure: prefer the shared method engine and local wrapper scripts, keep editable source artifacts in `specs/`, and treat `docs/` as rendered or review-oriented output.

## Working style

- Continue with the canvases before moving into detailed API contract work for a brand new API.
- This project can also be used for an existing API by reviewing the current design against the canvases, style guide, and audit checklist.
- If you are building your own helper app, agent, or automation, you can also import the shared method logic from `apiops-cycles-method-data/method-engine`.
- Default locale: `__LOCALE__`
- Selected API style hint: `__API_STYLE__`
