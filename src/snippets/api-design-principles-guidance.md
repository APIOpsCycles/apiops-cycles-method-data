## How to start the API Delivery work based on the previous "stations"

Use this guidance at the start of `API Delivery` after the contract and the key outputs from earlier stations have been reviewed and accepted.

The goal is not to invent implementation in isolation. The goal is to turn the agreed outputs from earlier stations into concrete code structure, validation rules, runtime behavior, and delivery decisions.

---

### 1. Start From The Validated Contract

- Treat the validated API contract as the main reference for implementation decisions.
- Keep the contract and implementation aligned throughout delivery.
- Use the contract to drive request validation, response mapping, documentation, and tests.

---

### 2. Use Domain Outputs To Preserve Business Meaning

- Use the `Domain Canvas` to guide naming, how the implementation is split into clear business responsibilities, and how different backend systems are connected without exposing their differences.
- Preserve the validated meanings of entities, attributes, statuses, and source-of-truth rules.
- Avoid leaking backend-specific models or inconsistencies into the public API.

---

### 3. Use Journey Outputs To Preserve Critical Flows

- Use the `Customer Journey Canvas` to identify which user flows are most important to support first.
- Use the `API Consumer Experience` outputs to keep the API understandable, predictable, and easy to integrate.
- Let the agreed journey priorities decide which implementation paths need the highest reliability, lowest latency, clearest errors, and strongest operational focus.

---

### 4. Use Value Proposition Outputs To Preserve Consumer Value

- Use the `API Value Proposition Canvas` to keep the implementation focused on the agreed pains, gains, and API features.
- Preserve the field meanings, behavior, and promises that made the API valuable in the earlier stations.
- Ensure error handling, freshness, and naming support both the intended developer experience and the business use case.

---

### 5. Use Architecture Outputs To Shape Runtime Decisions

- Use the `Business Impact Canvas` to guide resilience, timeout, fallback, and degradation decisions.
- Use the `Locations Canvas` to guide network boundaries, trust boundaries, access paths, and deployment constraints.
- Use the `Capacity Canvas` to guide rate limits, caching, scaling, and peak-load behavior.
- Use the `API Metrics And Analytics` guidance to decide what must be observed from the first implementation onward.

---

### 6. Use Interaction And Protocol Design Outputs To Shape Code Structure

- Use the `Interaction Canvas` to avoid implementing unsupported interaction styles too early.
- Use the `REST`, `Event`, or `GraphQL` design outputs to shape protocol-specific request, response, and validation behavior.
- Reflect the selected interaction style clearly in code structure, responsibilities, and testing strategy.

---

### 7. Use Audit Outputs To Improve Delivery Before Coding Goes Too Far

- Use the audit findings to remove ambiguity before implementation spreads across the codebase.
- Fix unclear request rules, missing validation, weak error contracts, and operational gaps early.
- Treat audit as a design-improvement loop before production, not only as a final gate.

---

### 8. Apply The Guidance, Then Summarize

- Apply this guidance to the current API and implementation plan.
- Summarize the implications for code structure, request validation, source integration, security, monitoring and alerts, and testing.
- Do not create a separate delivery artifact unless the team or user specifically needs one.
