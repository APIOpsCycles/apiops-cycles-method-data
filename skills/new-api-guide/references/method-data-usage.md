# Method Data Usage

Use this file to navigate the APIOps Cycles canonical data sources.

## Source of truth order

If you only need the canonical core station list or readable criteria quickly, prefer the helper scripts first (the `en`in the end refers to the locale i.e. language the user wants to interact with the method, there are also other options):

- `node skills/new-api-guide/scripts/get-core-stations.cjs en`
- `node skills/new-api-guide/scripts/get-station-criteria.cjs api-platform-architecture en`
- `node skills/new-api-guide/scripts/get-canvas-metadata.cjs interactionCanvas en`
- `node skills/new-api-guide/scripts/get-resource-metadata.cjs api-design-principles en`

1. `src/data/method/stations.json`
   - use for the core metro stations
   - use to identify the canonical station set instead of hardcoding station names

2. `src/data/method/station-criteria.json`
   - use to assess readiness to enter, remain in, or leave a station
   - use entry and exit criteria before routing forward

3. Method mapping files under `src/data/method/`
   - use to determine metro line to station relationships
   - use to determine station to resource relationships
   - prefer canonical mappings over hand-maintained mappings in the skill

4. Localized method files under `src/data/method/<locale>/`
   - use for actual labels, instructions, and station guidance
   - the human-readable content is in the localized files, not only in the base files
   - for English, use the English locale folder in the repository data

5. `src/data/canvas/canvasData.json`
   - use for canvas sections, ids, layout, and structure

6. `src/data/canvas/localizedData.json`
   - use for exact canvas wording, titles, descriptions, purpose, and how-to-use guidance

7. `node_modules/canvascreator/`
   - use for import/export behavior, expected JSON shape, export CLI usage, and canvas tooling details

8. `src/snippets/`
   - use when a method resource declares a `snippet` in `resources.json`
   - treat the snippet as canonical guidance for that resource instead of inventing a parallel local document
   - if the resource is a checklist, keep the snippet's checklist structure in the output

For guideline resources without snippets:

- apply the guideline to the current API or artifact and summarize the implications
- do not assume the method expects a new standalone document unless the user asks for one

## Repository-shape rule

Do a quick path check before assuming an installed package is the source of truth.

- Use this repository's `src/data/` and `src/snippets/` first for method content.
- If `node_modules/canvascreator/` exists, use it for tooling behavior and canvas import/export behavior.
- Only if repository data is missing for a detail should you consult generated docs or checked-in site assets.
- Say briefly which shape you are using when it affects confidence or wording fidelity.

## Usage rules

- Treat base method files as structure and relationship sources.
- Treat localized files as the source for wording, instructions, and user-facing content.
- Do not duplicate station or canvas wording unless the canonical data is unavailable.
- If the localized files and base files appear inconsistent, prefer the localized user-facing content for wording and the base files for ids and structural relationships.
- When localized canvas data includes `purpose` and `howToUse`, surface them briefly before collecting answers so the user sees why the canvas is being used and how to approach it.

## Practical sequence

When working a user request:

1. identify the likely station from the canonical stations
2. check entry and exit criteria from station criteria
3. read the localized station instructions
4. select the next valid resource using canonical mappings
5. if the resource is a canvas, read the localized canvas questions
6. collect answers for that canvas
7. hand off to canvas json authoring
8. export for review if requested

If step 5 is blocked by missing localized question text in the repository data:

5a. read `src/data/canvas/localizedData.json` if present
5b. otherwise read `src/data/canvas/canvasData.json`
5c. otherwise read the checked-in canvas JSON structure
5d. derive minimal user questions from section ids or nearby canonical repository wording
5e. state that the exact localized wording was not available in the repository snapshot

If the selected canvas is `domainCanvas`:

- check whether customer journey steps are already known
- if not, offer a brief choice:
  - start with `Customer Journey Canvas` first to clarify persona, journey, pains, and gains
  - start with `Domain Canvas` first if entity meanings, statuses, identifiers, and source-of-truth rules are the main uncertainty
- recommend one path, but let the user choose the other when both are safe

After a first-pass `domainCanvas` is drafted:

- suggest the most likely next clarification or production step
- typical next steps are:
  - clarify ambiguous business rules
  - create importable canvas JSON
  - export the canvas for review
- if the user explicitly wants to skip refinement, proceed directly to JSON authoring or export

If the workflow refers to a companion skill such as `canvas-import-json-authoring` or `export-cli-usage-patterns`:

- first verify that the skill exists in the current workspace or session
- if it does not exist, continue with local repository and package-based tooling instead of implying a missing handoff
- for canvas JSON and exports, use `node_modules/canvascreator/` as the fallback source for expected JSON behavior and validation steps
- after generating a canvas artifact, verify note fit or visual usability before considering the step complete
