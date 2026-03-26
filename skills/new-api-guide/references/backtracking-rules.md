# Backtracking Rules

Use this file when the user arrives with work from a later stage.

## Core rule

Later-stage artifacts do not prove earlier-stage readiness.

Check station entry and exit criteria before accepting the user's claimed stage.

## Triggers for backtracking

Backtrack when:
- a later-stage choice depends on missing earlier assumptions
- station exit criteria are not met
- the user can name a technical artifact but cannot explain its business purpose
- localized station guidance points to an earlier required resource

## Common examples

### User arrives with draft OpenAPI
Backtrack if any of these are weak:
- consumer problem
- domain concepts
- value proposition
- business impact, capacity, or location assumptions
- interaction model

### User asks for REST, Event, or GraphQL Canvas
Backtrack if:
- API Design entry criteria are not met
- interaction model is unclear
- Product Strategy or Architecture criteria are still open

### User asks to export a canvas
Backtrack if:
- the canvas content is not yet grounded enough to review
- a prerequisite resource has not been completed well enough

## Response rule

When backtracking:
- say clearly that the current artifact is too late for the current level of clarity
- name the earlier station
- name the earlier resource
- explain which criterion or prerequisite is still unresolved
- move toward the earlier resource artifact instead of staying in abstract advice
