# Routing Fallbacks

Use this file only when the canonical data does not fully resolve the next move.

## Core rule

When uncertain, choose the earliest plausible unresolved prerequisite.

This is better than giving generic advice or letting the user skip ahead.

## Safe defaults by station

### API Product Strategy
Use when any of these are unclear:
- user problem or workflow
- target consumer
- business concepts or domain language
- source of truth
- value proposition
- whether a new api is actually needed

Strong fallback resources:
- Domain Canvas
- Customer Journey Canvas
- API Value Proposition Canvas

### API Consumer Experience
Use only when Product Strategy is strong enough and the main gap is consumer validation, onboarding, or adoption.

Do not move here just because the user mentions an application, channel, or frontend.

Within this station, distinguish between:

- business customer journey
- API consumer journey

If the open question is what the API consumer needs from the API, prefer `API Value Proposition Canvas` first.
If the open question is how the API consumer discovers, evaluates, onboards, integrates, or gets support, then use `Customer Journey Canvas` for the API consumer journey.

### API Platform Architecture
Use only when the use case is clear enough and the remaining questions are criticality, scale, resilience, location, or other runtime constraints.

### API Design
Use only when station criteria show readiness.

Do not use as fallback.

## Domain-first heuristic

Prefer Domain Canvas before Customer Journey Canvas when:
- core nouns are ambiguous
- identifiers are unstable
- states such as available, verified, reserved, corrected, or final are unclear
- source-of-truth ownership is unclear
- the user is speaking in records, payloads, or endpoints before agreeing on meanings

Important follow-up:

- if Domain Canvas was chosen first for semantic clarity, revisit Customer Journey Canvas immediately after the first-pass domain draft
- use that step to verify the actor flow, trigger, and business outcome still fit the clarified domain model
- do not treat Domain-first as Journey-never
- if the user accepts the preliminary journey draft, continue through JSON authoring and export instead of stopping at prose

## Journey-first heuristic

Prefer Customer Journey Canvas before Domain Canvas when:
- the main issue is the actor flow through a service
- the domain terms are already stable enough
- the trigger, steps, and decision points are the primary unknown

In `API Consumer Experience`, apply this heuristic to the API consumer actor, not automatically to the end customer actor.

## Do not do yet list

If fallback routing is used, do not do any of these until the active station is ready to exit:
- suggest REST, Event, GraphQL, or hybrid patterns
- suggest endpoint families or event names
- split the capability into likely APIs
- draft OpenAPI or contract structure
