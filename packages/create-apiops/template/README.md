# __API_TITLE__

This project uses APIOps Cycles method tooling to design, review, implement, audit, publish, and improve APIs.

## Structure

- `specs/canvases/` = source canvas JSON files
- `specs/openapi/` = source OpenAPI contracts
- `specs/audit/` = audit reviews and checklists
- `docs/api/` = rendered SVGs and human-readable outputs
- `src/` = implementation

## Install

```bash
npm install
```

## Useful commands

```bash
npm run method:stations
npm run method:criteria:design
npm run method:resource:audit
```

## Notes

- Keep source artifacts version controlled
- Treat `specs/` as source of truth
- Treat `docs/` as rendered review material
- Default locale: `__LOCALE__`
