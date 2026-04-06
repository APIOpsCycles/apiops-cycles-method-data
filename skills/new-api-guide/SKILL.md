---
name: new-api-guide
description: guide users through the apiops cycles method to design and scope a new api from business need to publishing and improvement. use when the user needs help deciding the current station, checking whether entry or exit criteria are met, selecting the right next resource or canvas from the canonical method data, gathering answers for the selected canvas, or moving from method guidance into canvas json authoring and export without jumping too early into api design.
---

# New API Guide

Guide the user through APIOps Cycles as a strict method orchestrator.

This skill does not invent a parallel method. It uses APIOps Cycles method data as the source of truth for stations, station criteria, resources, resource mappings, localized instructions, and canvas questions.

## Preferred interface

Prefer the shared Node module export `apiops-cycles-method-data/method-engine` whenever the current workspace has access to the package source or the installed package.

Use the method engine first for:

- start-station recommendation
- station criteria evaluation
- station step and resource lookup
- canvas metadata lookup
- starter canvas generation
- CanvasCreator URL generation

Treat the engine as the canonical programmable interface for CLIs, AI agents, apps, and APIs. Prefer calling the engine rather than recreating method traversal logic from scattered repository files.

Typical engine entry points include:

- `buildStartData(locale)`
- `normalizeAnswer(value)`
- `evaluateStartRecommendation(startData, answers)`
- `buildStationResourceData(stationId, locale, style)`
- `buildResourceMetadata(resourceId, locale)`
- `buildCanvasMetadata(canvasId, locale)`
- `generateCanvasForStationResource(stationId, resourceId, locale, output)`
- `generateCanvases(options)`
- `getCanvasCreatorUrl(canvasId, locale)`

For snippet-backed resources, prefer the shared Node module export `apiops-cycles-method-data/snippet-engine` instead of reimplementing snippet path resolution or terminal rendering behavior.

When the engine is available, use it as the first choice and treat direct JSON reads as implementation detail or fallback.

## Sticky note palette

When authoring or reviewing canvas sticky notes, use the shared palette from `src/lib/method-engine.js` consistently across guidance, generated JSON, and examples.

- `benefit` for benefits, gains, new or positive things: `#C0EB6A`
- `neutral` for neutral or technical notes: `#DFDDC5`
- `negative` for cons, risks, pains, or negative notes: `#FFAFAF`
- `task` for tasks, actions, or journey steps: `#7DC9E7`
- `default` for generic uncategorized notes: `#FFF399`

Prefer section-appropriate defaults when the intent is obvious from the canvas structure.
If a note does not fit a clear intent yet, use the generic default rather than guessing.
When using the interactive CLI, explicit note tags such as `[benefit]`, `[task]`, or `[color=#7DC9E7]` are the supported way to override the section default.

## Built-in helper scripts

Use the local helper scripts in `skills/new-api-guide/scripts/` as fallback and debugging tools when the method engine is unavailable or when you need to inspect one slice of method data quickly.

- `node skills/new-api-guide/scripts/get-core-stations.cjs [locale]`
  - prints the ordered core stations with localized titles, descriptions, and linked resources
- `node skills/new-api-guide/scripts/get-station-criteria.cjs <station-id> [locale]`
  - prints the localized criteria for one station
- `node skills/new-api-guide/scripts/get-canvas-metadata.cjs <canvas-id> [locale]`
  - prints the localized canvas title, purpose, how-to-use text, and section list
- `node skills/new-api-guide/scripts/get-resource-metadata.cjs <resource-id> [locale]`
  - prints localized resource metadata, steps, tips, and snippet path when a snippet exists

These scripts are still useful because they already resolve the repository `src` paths correctly for this workspace shape, but they are no longer the preferred orchestration interface when the method engine is available.

Do not use these helper scripts for normal station, resource, or canvas lookups when the method engine can answer the same question directly.
Use them only when:

- the engine is unavailable in the current workspace
- you are debugging or validating engine output
- you need a quick one-off inspection while keeping the engine as the main workflow source

## Engine-first, repository-backed rule

In this project, prefer the shared method engine as the operational interface and the repository source data as the canonical backing data.

Use this order:

1. `src/lib/method-engine.js`
2. `src/data/`
3. `src/snippets/`
4. `node_modules/canvascreator/`

Do not prefer generated markdown pages when the same information exists in the engine or repository source.
Use generated site pages only as a last-resort fallback when both the engine and repository data are unavailable for a specific detail.

## Repository-first rule

In this project, prefer the repository source data as the canonical source of truth.

Use these repository roots first:

1. `src/data/`
2. `src/snippets/`
3. `node_modules/canvascreator/`

Do not prefer generated markdown pages when the same information exists in this repository source.
Use generated site pages only as a last-resort fallback when the repository data is unavailable for a specific detail.

## Core workflow

Follow this sequence unless a later step is impossible because the canonical data is unavailable:

1. Identify the likely current station using the method engine start-station helpers.
2. Check station entry and exit readiness using method engine criteria data and evaluation helpers.
3. Read the canonical station instructions for the active locale from engine-backed data.
4. Select the smallest valid next resource linked to that station via the method engine.
5. If the selected resource is a canvas, use the engine-backed localized canvas structure and questions.
6. Collect only the answers needed to draft that canvas.
7. Hand off to `canvas-import-json-authoring` to create valid importable JSON.
8. If the user wants reviewable artifacts, hand off to `export-cli-usage-patterns` after the content is ready.

## Canonical data rule

Use the APIOps Cycles method data repository as the source of truth.

Use these sources in this order:

1. `src/lib/method-engine.js` as the reusable access layer.
2. `src/data/method/stations.json` for the core metro stations.
3. `src/data/method/station-criteria.json` to determine readiness to enter, stay in, or leave a station.
4. The canonical method mapping files under `src/data/method/` to determine which resources belong to the station and which metro line context applies.
5. The localized method files under `src/data/method/<locale>/` for the actual station instructions, labels, and step guidance.
6. `src/data/canvas/canvasData.json` and `src/data/canvas/localizedData.json` for the exact canvas structure, sections, and question wording.
7. `node_modules/canvascreator/` for import/export behavior, canvas JSON expectations, and export tooling.

Do not duplicate or paraphrase method content unless the canonical data is unavailable. If you need a fallback, keep it minimal and clearly grounded in the method.

When the engine already exposes the needed answer, prefer the engine over manually stitching together multiple JSON files.

## Station-first behavior

Always reason from station readiness before discussing design.

- Do not treat the user's requested artifact as proof that the method is at that stage.
- Do not leave a station just because the user wants to move on.
- Use station entry and exit criteria to decide whether the user is ready to enter or leave a station.
- If the criteria show the station is not ready to exit, keep the work there.
- If the criteria show the user is not ready to enter a later station, route backward to the earliest unresolved prerequisite.

## Actor perspective rule

Always make the active actor explicit before using a canvas.

There are at least two different journey perspectives in this method:

- business customer or partner journey
- API consumer journey

Do not treat them as interchangeable.

Use this default interpretation:

- In `API Product Strategy`, `Customer Journey Canvas` refers primarily to the business or partner journey that the API-enabled capability is meant to support.
- In `API Consumer Experience`, `Customer Journey Canvas` refers to the API consumer journey of finding, evaluating, onboarding to, integrating, and using the API.

If the current actor is ambiguous, state the ambiguity and choose the earlier business-journey interpretation unless the station clearly shifts to API consumer experience.

## Canvas-first behavior

When a station's next valid resource is a canvas:

- Do not stop at recommending the canvas.
- Load the canonical canvas structure and questions.
- Surface the canonical canvas title, purpose, and how-to-use guidance briefly before asking for answers.
- Ask the canvas questions, not generic consulting questions.
- Ask only the minimum subset needed to draft a useful first-pass canvas.
- Preserve the canvas wording as closely as practical.
- Once enough information exists, hand off to `canvas-import-json-authoring`.
- After JSON is ready, hand off to `export-cli-usage-patterns` if the user wants png, svg, pdf, or json output for review.

## Stop rules

### Do not jump to API Design

Do not discuss interface patterns, endpoints, event names, contract shapes, or likely API splits unless the canonical station criteria show the user is ready to enter API Design.

### Domain-first stop rule

If the prompt contains ambiguous or overloaded business nouns, statuses, identities, or source-of-truth questions, prefer staying in API Product Strategy and selecting the earliest valid strategy resource, usually a Domain Canvas before a later canvas.

Examples of warning terms include product, availability, stock, reserved, verified, shipment, parcel, customer, order, status, location, inventory, and source of truth.

### System-to-system stop rule

If the user describes moving or checking business data between systems and the concepts, lifecycle states, identifiers, or authority rules are still unclear, keep the work in API Product Strategy. Do not frame the next step as design.

### Domain Canvas dependency rule

If the selected next resource is `Domain Canvas` and the canvas or repository guidance depends on customer journey steps:

- check whether relevant customer journey steps are already known well enough
- if they are not known, explicitly offer a choice between starting with `Customer Journey Canvas` or continuing directly with `Domain Canvas`
- recommend `Customer Journey Canvas` first when the user journey, persona, or problem context is still vague
- recommend `Domain Canvas` first when the main uncertainty is semantic consistency of business entities, states, identifiers, or source-of-truth rules
- if the user chooses `Domain Canvas` first, treat customer journey steps as a lightweight input to collect rather than a blocker

### Post-Domain decision rule

After drafting a first-pass `Domain Canvas`, explicitly revisit whether `Customer Journey Canvas` is still needed before moving on to later strategy resources.

- do not silently assume the journey work is no longer needed
- state whether the customer journey is now clear enough or still worth drafting
- if no `Customer Journey Canvas` exists yet, offer to create a lightweight preliminary version
- if a preliminary `Customer Journey Canvas` is drafted and the user wants artifacts, produce the importable JSON and exported review artifact the same way as for other canvases
- prefer creating that preliminary journey canvas when it helps preserve method continuity or makes pains, gains, and consumer tasks easier to validate
- only skip it explicitly when the actor, trigger, steps, and outcome are already stable enough from the conversation

For this post-domain decision in `API Product Strategy`, interpret `Customer Journey Canvas` as the business or partner journey unless explicitly stated otherwise.

## Resource selection rules

- Prefer the smallest resource that resolves the earliest unresolved prerequisite.
- Use the station-resource mapping from the method engine or canonical method data.
- If several resources are valid, prefer the one explicitly indicated by localized station instructions.
- If no explicit next resource is given, choose the earliest resource that clarifies the blocking criterion.
- If a canvas has already been completed well enough, do not restart it. Move to the next blocking resource.

When moving from `API Product Strategy` to `API Consumer Experience`:

- do not assume the same `Customer Journey Canvas` continues unchanged
- first ask whether the next question is about:
  - the business journey supported by the API, or
  - the API consumer's own onboarding and usage journey
- if the main gap is API consumer tasks, pains, and gains, refine or revisit `API Value Proposition Canvas` first
- then use `Customer Journey Canvas` for the API consumer experience journey if the actor is the API consumer

When using engine-backed or canonical repository data:

- use `src/lib/method-engine.js` first when it already exposes the needed method answer
- use `src/data/canvas/canvasData.json` for section ids, layout, and canvas structure
- use `src/data/canvas/localizedData.json` for exact canvas titles, purposes, section names, section descriptions, and how-to-use guidance
- use `node_modules/canvascreator/` for import/export expectations and JSON behavior
- if a detail is missing from the engine or repository data, inspect `node_modules/canvascreator/` before looking at generated site pages

When the selected resource is a guideline rather than a canvas:

- check whether the resource has a `snippet` in `resources.json`
- if it has one, load the canonical snippet asset and use it as canonical guidance
- if the resource category is `checklist`, preserve the checklist's own structure in the review output
- for snippet-backed checklists, default to row-by-row pass, partial, gap, or not-applicable judgments instead of a generic prose summary
- do not create a custom derived document by default when the method already provides a snippet
- for guideline resources without snippets, default to applying the guidance to the current API and summarizing the result
- create a scenario-specific derived document only if the user explicitly asks for one or the method clearly needs a produced artifact

When using `localizedData.json` for a canvas:

- quote or paraphrase the canvas `purpose` as the framing for why the canvas is being used
- use the canvas `howToUse` text to guide the order or style of questioning when it is available
- keep this framing brief so the conversation still moves forward

## Output structure

When responding, use this structure when relevant:

- Current situation
- Current likely station
- Station readiness check
- Recommended next station
- Selected next resource
- Why this resource now
- Information needed for this resource
- What not to do yet
- Handoff
- Suggested next step

When the selected next resource is `Domain Canvas` and customer journey steps are still unclear, add:

- Optional starting point choice

## Handoff rules

### To `canvas-import-json-authoring`

Use this when:
- the next resource is a canvas
- enough answers exist to draft a useful first-pass canvas
- the user asks for importable canvas JSON

Before handoff, state:
- the selected station
- the selected canvas
- why this is the correct next resource
- whether the canvas is a partial first pass or ready for fuller completion
- the most likely next clarification step after the first-pass canvas, if one is obvious from the current gaps

If `canvas-import-json-authoring` is not available in the current workspace:

- say so explicitly instead of implying the handoff happened
- perform the equivalent fallback yourself using canonical repository data and `node_modules/canvascreator/`
- when creating importable JSON, verify the result by running the relevant canvas export or check step if the tooling supports it
- if the exported output shows overflowing or unreadable notes, iterate on the note text instead of stopping at "JSON created"

### To `export-cli-usage-patterns`

Use this only after the artifact content is ready.

If the user wants human review material, export the finished artifact as png, svg, pdf, or json.

If `export-cli-usage-patterns` is not available in the current workspace:

- say so explicitly
- use the available `canvascreator` CLI or equivalent local tooling directly
- verify that the exported artifact is visually usable, not only technically generated

## Next-step suggestion rule

After drafting a first-pass canvas, do not stop at "canvas complete".

- briefly suggest the most likely next improvement step
- if the user wants to keep momentum, offer to do that next automatically
- if the user wants to skip the refinement and create the artifact now, support that immediately

For `Domain Canvas`, the likely next suggestion is usually one of:

- clarify the exact meaning of availability, sellable stock, reservation, or source of truth
- draft or confirm a preliminary `Customer Journey Canvas` if one does not exist yet
- move to importable canvas JSON
- export the canvas for review

When `Domain Canvas` was chosen before `Customer Journey Canvas` because of ambiguous terminology:

- after the domain draft, suggest a preliminary `Customer Journey Canvas` as a normal validation step
- frame it as "we started with domain clarity first; now we should verify the journey still makes sense"

For a preliminary `Customer Journey Canvas`:

- if the user wants to continue concretely, offer to create the importable JSON immediately
- if the user wants review material, export svg or png after the fit check passes

When preparing to enter `API Consumer Experience`:

- suggest an `API Value Proposition Canvas` refinement first if API consumer-specific needs are not yet explicit
- then suggest `Customer Journey Canvas` for the API consumer's discovery, onboarding, and integration journey
- say explicitly that this is a different actor perspective from the earlier business journey canvas

When preparing to leave `API Consumer Experience`:

- use the canonical core-station order to identify the next station
- prefer `API Platform Architecture` as the next core station after `API Consumer Experience`
- do not suggest `API Design` next unless the canonical method data explicitly supports skipping ahead or the current task is only a design-preview aside
- treat API consumer concerns as inputs to later design, but not as proof that the next station is design

When working in `API Design`:

- use canvases to choose and shape the interaction style
- then read the relevant guideline resources and snippets as design guidance
- for REST APIs, treat `Interaction Canvas` as interaction-style selection and `REST Canvas` as REST-specific refinement
- use `Contract First Design` inside `API Design` as the bridge from design guidance to contract work before implementation

## Availability check for companion skills

Before naming a handoff to another skill:

- check whether that skill is actually available in the current workspace or session
- if it is not available, do not present the handoff as if it will happen automatically
- either perform the work directly or say that the specialized skill is unavailable and continue with the best local fallback

## Locale rule

Use the user's language when the method data supports it. Read localized station and canvas content from the locale-specific files. If the locale is unclear, default to English.

## Fallback rule

If canonical method data cannot be read for a specific detail:
- keep the user in the earliest plausible station
- prefer the earliest plausible resource
- avoid design advice
- ask only enough to continue safely

If the method engine is unavailable, fall back to the repository helper scripts and direct repository data reads.

If canonical repository data is unavailable for a specific detail but generated docs are available:
- use the generated docs only as a fallback view of the same method
- treat that as lower-confidence than the repository data
- explicitly note when a step was inferred from generated docs instead of canonical repository files

Use the reference files for data-source usage, routing fallbacks, backtracking, and common entry points.
