# __API_TITLE__

This project uses APIOps Cycles method tooling to design, review, implement, audit, publish, and improve APIs.
For a brand-new API, start with the method station checks and canvases before filling `specs/openapi/api.yaml`.

## Structure

- `specs/canvases/` = source canvas JSON files
- `specs/openapi/` = source OpenAPI contracts for later API Design and contract-first work
- `specs/audit/` = audit reviews and checklists
- `docs/api/` = rendered SVGs and human-readable outputs
- `src/` = implementation

## Install

```bash
npm install
```

## Useful commands

```bash
npm run method:start
npm run method:resources:strategy
npm run method:canvases:new-api
npm run method -- resources --station api-design --style "__API_STYLE__"
npm run method:stations
npm run method:resource:audit
```

## Notes

- Start with `npm run method:start`; in an interactive terminal it asks one criterion at a time and recommends the station to begin from.
- `npm run method:resources:strategy` now walks the station steps one by one, and lets you inspect each related resource or canvas before continuing.
- For canvas steps, the CLI can show the related canvas structure, save starter JSON, guide section-by-section note entry, or give you a CanvasCreator URL for browser-based editing and export.
- If you want to build your own helper app or automation, you can also import the shared method logic from `apiops-cycles-method-data/method-engine`.
- Continue with the generated strategy canvases before moving into API contract work.
- Treat `specs/openapi/api.yaml` as a later artifact, not the first design step for a new API.
- Keep source artifacts version controlled
- Treat `specs/` as source of truth
- Treat `docs/` as rendered review material
- Default locale: `__LOCALE__`
- Selected API style hint: `__API_STYLE__`
