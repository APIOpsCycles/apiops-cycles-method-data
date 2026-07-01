# API Productization Cycle

The API-focused APIOps Cycles journey for productizing, designing, delivering, publishing, and improving APIs.

Purpose: Preserve the current API-focused method journey for teams that already know the intended delivery style is an API product.
Audience: API product owners, API designers, API platform teams

## Route

API Product Strategy -> API Consumer Experience -> API Platform Architecture -> API Design -> API Delivery -> API Audit -> API Publishing -> Monitoring & Improving

## Question List

Expert answers are inputs to architecture and design decisions, not final design decisions. Use evidence, confidence, and open questions to keep assumptions visible.

### API Product Strategy - Customer Journey Canvas

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

### API Product Strategy - Domain Canvas

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

### API Product Strategy - API Value Proposition Canvas

Purpose: How does the customer journey map to APIs? What end-user and API consumer pains, and gains need to be addressed?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=apiValuePropositionCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Tasks | What are the customers (end-users) trying to achieve? | API product owner |  |  |  |  |
| Gain Enabling Features | What features enable end-users and API consumers to achieve gains? | API product owner |  |  |  |  |
| Pain Relieving Features | What features help end-users and  API consumers overcome pains? | API product owner |  |  |  |  |
| API Products | What API products and features address the tasks, pains, and gains? | API product owner |  |  |  |  |

### API Product Strategy - API Business Model Canvas

Purpose: How feasible and reusable will this API be? Do we have a business case from a cost - benefit point of view?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=apiBusinessModelCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Key Partners | Who are the key stakeholders involved? | API product owner |  |  |  |  |
| Key Activities | What are the most important actions the API provider must take to operate successfully? | API product owner |  |  |  |  |
| Key Resources | What unique strategic assets must the API provider acquire or build? | API product owner |  |  |  |  |
| API Value Proposition | Start with one sticky note naming the API or API family, then capture what value the API offers to API consumers. | API product owner |  |  |  |  |
| Developer Relations | How does the API provider reach and support API consumers? | API product owner |  |  |  |  |
| Channels | Through which mechanisms do API consumers interact with the API? | API product owner |  |  |  |  |
| API Consumer Segments | Who are the target audiences for the API? | API product owner |  |  |  |  |
| Costs | What are the significant costs involved in building, deploying, and operating the API? | API product owner |  |  |  |  |
| Benefits | What are the significant benefits or revenue streams generated by the API? | API product owner |  |  |  |  |

### API Platform Architecture - Business Impact Canvas

Purpose: What are the potential business impacts if the capability, integration, or service fails?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=businessImpactCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Availability Risks | What are the potential risks to capability availability? | API product owner |  |  |  |  |
| Security Risks | What are the potential security risks associated with the capability? | API product owner |  |  |  |  |
| Data Risks | What are the potential risks to data integrity or confidentiality? | API product owner |  |  |  |  |
| Mitigate Availability Risks | How can the capability owner mitigate the availability risks? | API product owner |  |  |  |  |
| Mitigate Security Risks | How can the capability owner mitigate the security risks? | API product owner |  |  |  |  |
| Mitigate Data Risks | How can the capability owner mitigate the data risks? | API product owner |  |  |  |  |

### API Platform Architecture - Location Canvas

Purpose: What geopolitical, regulatory, network, and trust boundaries affect this capability or integration?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=locationsCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Location / Trust Groups | What are the relevant geopolitical, regulatory, network, or trust groups? | API platform owner |  |  |  |  |
| Group Characteristics | What are the characteristics of those groups, such as residency, trust level, or network exposure? | API platform owner |  |  |  |  |
| Relevant Locations / Zones | What are the relevant locations, zones, or environments within each group? | API platform owner |  |  |  |  |
| Location / Zone Characteristics | What are the characteristics of those locations or zones, such as ownership, region, or exposure? | API platform owner |  |  |  |  |
| Network / Regulatory Distances | What latency, trust, regulatory, or connectivity distances exist between the locations? | API platform owner |  |  |  |  |
| Distance Characteristics | What are the characteristics of those distances, such as latency sensitivity, residency constraints, or trust boundaries? | API platform owner |  |  |  |  |
| Connectivity Endpoints | What connectivity endpoints or interfaces are associated with the locations? | API platform owner |  |  |  |  |
| Endpoint Access Characteristics | What are the characteristics of those endpoints, such as exposure, protocol, security, or access restrictions? | API platform owner |  |  |  |  |

### API Platform Architecture - Capacity Canvas

Purpose: How much capacity is needed to support expected capability consumption?
CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=capacityCanvas&locale=en

| Topic | Question | Suggested answer owner | Answer | Confidence | Evidence | Open questions |
| --- | --- | --- | --- | --- | --- | --- |
| Current Business Volumes | What are the current business volumes and transaction rates? | API platform owner |  |  |  |  |
| Future Consumption Trends | What are the anticipated future consumption trends? | API platform owner |  |  |  |  |
| Peak Load and Availability Requirements | What are the peak load and availability requirements? | API platform owner |  |  |  |  |
| Caching Strategies | What caching strategies can be used to optimize performance? | API platform owner |  |  |  |  |
| Rate Limiting Strategies | What rate limiting strategies can be used to manage consumption? | API platform owner |  |  |  |  |
| Scaling Strategies | What scaling strategies can be used to accommodate growth? | API platform owner |  |  |  |  |
