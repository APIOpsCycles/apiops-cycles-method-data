# Integration Productization Cycle

A cycle for productizing reusable integration capabilities before selecting a concrete integration pattern.

Purpose: Guide reusable integration capability design before choosing APIs, events, files, streams, data products, direct integration, or hybrid patterns.
Audience: Enterprise architects, Solution architects, Integration architects, Platform owners

## Route

Integration Capability Strategy -> Integration Consumer Requirements & Onboarding -> Integration Architecture Decision -> Integration Solution Design -> Integration Delivery & Operations -> Integration Readiness Assurance -> Capability Publishing -> Integration Monitoring & Improvement

## Question List

Expert answers are inputs to architecture and design decisions, not final design decisions. Use evidence, confidence, and open questions to keep assumptions visible.

### Integration Capability Strategy - Customer Journey Canvas

Purpose: What customer, partner, or consumer journey is the capability intended to support?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=customerJourneyCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Customer Discovers Need | How does the customer recognize their need or problem? | Business owner |  |  |  |  |
| Persona | Who is the typical customer experiencing this journey? | Business owner |  |  |  |  |
| Pains | What are the customer's pain points or challenges? | Business owner |  |  |  |  |
| Journey Steps | What are the steps the customer takes in their journey? | Business owner |  |  |  |  |
| Customer Need Is Resolved | How is the customer's need ultimately resolved? | Business owner |  |  |  |  |
| Gains | What are the customer's gains or benefits? | Business owner |  |  |  |  |
| Inputs & Outputs | What are the inputs and outputs at each step? | Business owner |  |  |  |  |
| Interaction & Processing Rules | What are the interaction and processing rules at each step? | Business owner |  |  |  |  |

### Integration Capability Strategy - Domain Canvas

Purpose: What are the core entities and business rules related to this capability or domain?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=domainCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Selected Customer Journey Steps | Which customer journey steps are relevant to this domain? | Domain expert |  |  |  |  |
| Core Entities & Business Meaning | What are the core entities and their business meaning? | Domain expert |  |  |  |  |
| Attributes & Business Importance | What are the key attributes of each entity and their business importance? | Domain expert |  |  |  |  |
| Relationships Between Entities | What are the relationships between the entities? | Domain expert |  |  |  |  |
| Business, Compliance & Integrity Rules | What are the business, compliance, and integrity rules related to the entities? | Domain expert |  |  |  |  |
| Security & Privacy Considerations | What are the security and privacy considerations related to the entities? | Domain expert |  |  |  |  |

### Integration Capability Strategy - Capability Value Proposition Canvas

Purpose: Which reusable capability would create value for consumers without deciding yet whether it should be delivered as an API, event, file, stream, data product, or another integration style?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=capabilityValuePropositionCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Consumer tasks and outcomes | What are consumers, partners, users, systems, or teams trying to achieve? | Capability owner |  |  |  |  |
| Gain-enabling capability features | What capability features would help consumers achieve better outcomes, speed, automation, insight, reach, or compliance? | Capability owner |  |  |  |  |
| Pain-relieving capability features | What capability features would remove friction, manual work, errors, delays, risk, or uncertainty for consumers? | Capability owner |  |  |  |  |
| Reusable capabilities | What reusable business or data capabilities could serve these tasks, gains, and pains across more than one consumer or use case? | Capability owner |  |  |  |  |

### Integration Capability Strategy - Capability Business Model Canvas

Purpose: How viable, reusable, funded, owned, supported, and discoverable should this integration capability be?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=capabilityBusinessModelCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Key partners | Which business, technology, data, security, legal, platform, or external partners are needed to make the capability work? | Capability owner |  |  |  |  |
| Key activities | What must the capability owner and producers do to design, deliver, govern, support, and improve the capability? | Capability owner |  |  |  |  |
| Key resources | Which systems, data assets, platforms, people, standards, funding, and operational capabilities are required? | Capability owner |  |  |  |  |
| Capability value proposition | What value does this reusable capability provide to consumers and to the organization or ecosystem? | Capability owner |  |  |  |  |
| Consumer engagement | How will consumers discover, evaluate, request, onboard, get support for, and provide feedback on the capability? | Capability owner |  |  |  |  |
| Channels | Through which catalogs, portals, marketplaces, documentation sites, support paths, or governance processes will consumers interact with the capability? | Capability owner |  |  |  |  |
| Capability consumer segments | Who are the current and potential consumers of the capability, including teams, partners, systems, products, or data users? | Capability owner |  |  |  |  |
| Costs | What are the significant costs of building, operating, governing, supporting, and evolving the capability? | Capability owner |  |  |  |  |
| Benefits | What business, operational, ecosystem, reuse, compliance, or cost benefits justify the capability? | Capability owner |  |  |  |  |

### Integration Consumer Requirements & Onboarding - Consumer Experience Requirements Canvas

Purpose: What experience and non-functional requirements do consumers need before deciding the best integration architecture?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=consumerExperienceRequirementsCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Consumer goals | What are the consumer's business goals, workflow goals, decision goals, automation goals, or data usage goals? | Consumer representative |  |  |  |  |
| Availability and timeliness | When must the capability be available, how fresh must information be, and what latency or delivery windows matter? | Consumer representative |  |  |  |  |
| Volume and performance | What request, event, record, file, batch, user, or transaction volumes must the capability support now and later? | Consumer representative |  |  |  |  |
| Data quality and consistency | What accuracy, completeness, consistency, ordering, deduplication, reconciliation, or validation expectations do consumers have? | Consumer representative |  |  |  |  |
| Security, privacy, and compliance | What identity, authorization, confidentiality, residency, consent, retention, audit, or regulatory constraints apply? | Consumer representative |  |  |  |  |
| Onboarding and access | How should consumers find, request, test, get approved for, and start using the capability? | Consumer representative |  |  |  |  |
| Change and versioning | How much change tolerance do consumers have, and what notice, compatibility, migration, or versioning expectations apply? | Consumer representative |  |  |  |  |
| Observability and support | What monitoring, status, traceability, data quality visibility, support, ownership, and incident communication do consumers need? | Consumer representative |  |  |  |  |
| Recovery and continuity | What replay, retry, reconciliation, backup, fallback, continuity, or manual recovery expectations must be supported? | Consumer representative |  |  |  |  |
| Architecture implications | What do these requirements imply for possible architecture styles, such as APIs, events, files, streams, data products, or direct integration? | Consumer representative |  |  |  |  |

### Integration Architecture Decision - Business Impact Canvas

Purpose: What are the potential business impacts if the capability, integration, or service fails?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=businessImpactCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Availability Risks | What are the potential risks to capability availability? | Integration architect |  |  |  |  |
| Security Risks | What are the potential security risks associated with the capability? | Integration architect |  |  |  |  |
| Data Risks | What are the potential risks to data integrity or confidentiality? | Integration architect |  |  |  |  |
| Mitigate Availability Risks | How can the capability owner mitigate the availability risks? | Integration architect |  |  |  |  |
| Mitigate Security Risks | How can the capability owner mitigate the security risks? | Integration architect |  |  |  |  |
| Mitigate Data Risks | How can the capability owner mitigate the data risks? | Integration architect |  |  |  |  |

### Integration Architecture Decision - Location Canvas

Purpose: What geopolitical, regulatory, network, and trust boundaries affect this capability or integration?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=locationsCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Location / Trust Groups | What are the relevant geopolitical, regulatory, network, or trust groups? | Enterprise architect |  |  |  |  |
| Group Characteristics | What are the characteristics of those groups, such as residency, trust level, or network exposure? | Enterprise architect |  |  |  |  |
| Relevant Locations / Zones | What are the relevant locations, zones, or environments within each group? | Enterprise architect |  |  |  |  |
| Location / Zone Characteristics | What are the characteristics of those locations or zones, such as ownership, region, or exposure? | Enterprise architect |  |  |  |  |
| Network / Regulatory Distances | What latency, trust, regulatory, or connectivity distances exist between the locations? | Enterprise architect |  |  |  |  |
| Distance Characteristics | What are the characteristics of those distances, such as latency sensitivity, residency constraints, or trust boundaries? | Enterprise architect |  |  |  |  |
| Connectivity Endpoints | What connectivity endpoints or interfaces are associated with the locations? | Enterprise architect |  |  |  |  |
| Endpoint Access Characteristics | What are the characteristics of those endpoints, such as exposure, protocol, security, or access restrictions? | Enterprise architect |  |  |  |  |

### Integration Architecture Decision - Capacity Canvas

Purpose: How much capacity is needed to support expected capability consumption?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=capacityCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Current Business Volumes | What are the current business volumes and transaction rates? | Platform owner |  |  |  |  |
| Future Consumption Trends | What are the anticipated future consumption trends? | Platform owner |  |  |  |  |
| Peak Load and Availability Requirements | What are the peak load and availability requirements? | Platform owner |  |  |  |  |
| Caching Strategies | What caching strategies can be used to optimize performance? | Platform owner |  |  |  |  |
| Rate Limiting Strategies | What rate limiting strategies can be used to manage consumption? | Platform owner |  |  |  |  |
| Scaling Strategies | What scaling strategies can be used to accommodate growth? | Platform owner |  |  |  |  |
