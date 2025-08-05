## REST API Checklist

---

### ✅ Concept is Ready When...


| Criteria                                               | OWASP API Top 10     | OpenAPI 3.1.x                       |
| ------------------------------------------------------ | -------------------- | ----------------------------------- |
| API is based on clear business needs                   | API9:2019            | ❌                                   |
| API hides raw backend data; designed for shared use    | API6:2023            | ❌                                   |
| Endpoints have business value and feature descriptions | API9:2023            | ✅ (via `description`)               |
| API design is consistent with other APIs               | API8:2023, API9:2023 | ❌                                   |
| Data/attribute naming uses descriptive English         | –                    | ❌                                   |
| Mandatory fields are specified                         | API6:2019            | ✅ (via `required`)                  |
| Dates use ISO format with timezone                     | API8:2019            | ✅ (via `format: date-time`)         |
| General data uses standard values (e.g., ISO)          | API6:2023, API8:2019 | ➖ (via `enum`, `format`, `pattern`) |
| Field names avoid acronyms, use full words             | API9:2023            | ❌                                   |
| Creating new resources returns identifiers             | API2:2023            | ✅ (via response `schema`/`example`) |

---

### 🧪 API Design Prototype is Ready When...


| Criteria                                               | OWASP API Top 10 | OpenAPI 3.1.x                       |
| ------------------------------------------------------ | ---------------- | ----------------------------------- |
| All concept checklist items are audited                | –                | ❌                                   |
| Endpoint paths contain max two resources/sub-resources | –                | ❌                                   |
| Endpoints and attributes include examples              | –                | ✅ (via `example`, `examples`)       |
| POST is used for create/update (not PUT unless full)   | –                | ❌                                   |
| DELETE is used to remove resources                     | –                | ❌                                   |
| Versioning strategy decided; supported by gateway      | API9:2023        | ❌                                   |
| GET has no request body; returns 200 OK with content   | –                | ➖ (convention; not enforced)        |
| GET returns 204 if response body is empty              | –                | ✅ (can define 204 response)         |
| POST returns 200 OK when updating                      | –                | ✅ (can define status codes)         |
| POST returns 201 Created with ID on create             | –                | ✅                                   |
| DELETE returns 204 OK on success                       | –                | ✅                                   |
| 400 errors provide specific error info                 | API6:2023        | ✅ (described in response schema)    |
| 401 Unauthorized for wrong credentials                 | API2:2023        | ✅ (standard response documentation) |
| 403 Forbidden for unauthorized ops                     | API5:2023        | ✅                                   |

---

### 🚀 API Is Maintainable in Production When...

| Criteria                                   | OWASP API Top 10      | OpenAPI 3.1.x                    |
| ------------------------------------------ | --------------------- | -------------------------------- |
| All prototype/design items audited         | –                     | ❌                                |
| Published via API management               | API10:2019, API8:2023 | ❌                                |
| Visible in developer portal                | API9:2023             | ❌                                |
| Only accessible via API gateway            | API9:2023, API8:2023  | ❌                                |
| Rate limits are enforced                   | API4:2023             | ❌                                |
| Docs auto-generated from spec/schema       | API9:2023             | ✅                                |
| Spec auto-updated to gateway/dev portal    | API9:2023             | ✅ (indirect via tooling)         |
| Spec validated on every change             | –                     | ✅ (best practice)                |
| Spec contains request/response schema      | –                     | ✅                                |
| Schema and examples pass validation        | –                     | ✅                                |
| Uses HTTPS or encrypted protocols          | API10:2023            | ❌                                |
| Published under official org domain        | API8:2023             | ❌                                |
| Endpoints protected by authentication      | API2:2023, API4:2023  | ➖ (can define `securitySchemes`) |
| Token-based authentication                 | –                     | ✅ (via `securitySchemes`)        |
| Protected against CSRF                     | API8:2023             | ❌                                |
| Inputs auto-validated by framework         | API8:2023             | ✅ (indirect via schema)          |
| Outputs auto-escaped by framework          | API8:2023             | ❌                                |
| Encryption for data in transit/storage     | API8:2023             | ❌                                |
| Message integrity implemented              | API6:2023, API7:2023  | ❌                                |
| UUIDs/pseudo-identifiers instead of DB IDs | API7:2023             | ➖ (recommended in `example`)     |
| No sensitive data in URLs                  | API7:2023             | ❌                                |
| HTTP methods only for intended resources   | API5:2023             | ✅ (defined in `paths`)           |

## ASync API Checklist

### ✅ Concept is Ready When...

| Criterion                                                                            | AsyncAPI 2.x |
| ------------------------------------------------------------------------------------ | ------------ |
| API is based on clear business needs                                                 | ❌            |
| API hides raw backend data; designed for shared use                                  | ❌            |
| API has a description that explains its business value and features                  | ✅            |
| API has a consistent design with our other APIs                                      | ❌            |
| API and data naming uses good English (or other standard language)                   | ❌            |
| Mandatory fields are specified                                                       | ✅            |
| Dates are in ISO standard date format including the timezone                         | ✅            |
| General data uses standard values (e.g., ISO)                                        | ➖            |
| Fields are described in full words avoiding acronyms                                 | ❌            |
| When publishing new messages, the relevant topics or channels are clearly identified | ✅            |

---

### 🧪 API Design Prototype is Ready When...

| Criterion                                                             | AsyncAPI 2.x |
| --------------------------------------------------------------------- | ------------ |
| All items in the concept checklist are audited                        | ❌            |
| Message design contains a clear structure (events, commands, queries) | ✅            |
| All messages and attributes include examples                          | ✅            |
| Messages follow a consistent structure across topics/channels         | ✅            |
| Message versioning strategy has been decided                          | ❌            |
| Acknowledgments for received messages are defined (if applicable)     | ✅            |
| Errors or issues with messages include specific error information     | ✅            |
| Authentication and authorization strategies are specified             | ➖            |

---

### 🚀 API Is Maintainable in Production When...

| Criterion                                                             | AsyncAPI 2.x |
| --------------------------------------------------------------------- | ------------ |
| All items in the prototype and API design checklists are audited      | ❌            |
| API is managed via a proper AsyncAPI management tool                  | ❌            |
| API is visible in a Developer portal                                  | ❌            |
| Rate limits are enforced when sending messages (if applicable)        | ❌            |
| API documentation is generated automatically from the AsyncAPI spec   | ✅            |
| Specification is auto-updated to API tools and portal                 | ✅            |
| Specification for topics/channels is validated on every change        | ✅            |
| Specification contains the schema for the messages                    | ✅            |
| Message schema and examples pass schema validation                    | ✅            |
| Message transport ensures security (e.g., MQTT/AMQP over TLS)         | ❌            |
| API is operated under the organization's official domain              | ❌            |
| All topics/channels are protected by authentication                   | ➖            |
| API has token-based authentication                                    | ✅            |
| Encryption of data in transit and in storage is implemented as needed | ❌            |
| Message integrity has been implemented as needed                      | ❌            |
| UUIDs or pseudoidentifiers are used instead of DB IDs                 | ➖            |
| Sensitive information is not exposed in topics or channels            | ❌            |
| Whitelisting is used to specify which clients can publish/subscribe   | ✅            |