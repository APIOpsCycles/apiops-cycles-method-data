# Common User Entry Points

Use this file to interpret messy starting points before routing with the canonical method data.

## Core rule

Do not take the user's requested artifact or preferred solution at face value.
Interpret the request, then use canonical station, criteria, and resource data.

## We need a new API

Likely reality:
- very early Product Strategy
- the need for a new api is not yet proven

Likely missing:
- problem clarity
- consumer clarity
- domain clarity
- value proposition
- reuse or buy analysis

Default next move:
- stay in API Product Strategy
- check station criteria
- select the earliest valid strategy resource

## We need data from system A to system B

Likely reality:
- a system-to-system integration request is being mistaken for an api design request

Likely missing:
- domain clarity
- source-of-truth ownership
- identifiers
- lifecycle states
- authority rules

Default next move:
- stay in API Product Strategy
- prefer Domain Canvas first when terms are unstable

## We need to check or share availability, stock, status, or measurements

Likely reality:
- the business nouns and states are overloaded

Likely missing:
- meaning of the main status term
- sellable or authoritative scope
- identity model
- source-of-truth rules

Default next move:
- stay in API Product Strategy
- prefer Domain Canvas before Customer Journey Canvas unless the canonical criteria and localized instructions clearly indicate otherwise
- after the first-pass Domain Canvas, revisit Customer Journey Canvas explicitly instead of assuming it can be skipped

## Here is our draft OpenAPI

Likely reality:
- a later-stage artifact exists, but earlier stations may have been skipped

Default next move:
- check criteria
- backtrack to the earliest unresolved prerequisite if needed

## Which style should we use: REST, GraphQL, or events?

Likely reality:
- interface style is being discussed before readiness is proven

Default next move:
- verify readiness for API Design
- if not ready, backtrack using criteria and station instructions
