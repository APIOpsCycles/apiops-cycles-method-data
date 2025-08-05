## REST-API-Checkliste

---

**✅ Das Konzept ist fertig, wenn…**

| Kriterien | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| Die API basiert auf klaren Geschäftsanforderungen. | API9:2019 | ❌ |
| API verbirgt rohe Backend-Daten; für die gemeinsame Nutzung konzipiert | API6:2023 | ❌ |
| Endpunkte haben einen geschäftlichen Nutzen und verfügen über Funktionsbeschreibungen | API9:2023 | ✅ (über Beschreibung) |
| Das API-Design ist konsistent mit anderen APIs. | API8:2023, API9:2023 | ❌ |
| Daten/Attribute werden in beschreibendem Englisch benannt | – | ❌ |
| Obligatorische Felder sind angegeben | API6:2019 | ✅ (über „required”) |
| Datumsangaben verwenden das ISO-Format mit Zeitzone | API8:2019 | ✅ (über Format: Datum-Uhrzeit) |
| Allgemeine Daten verwenden Standardwerte (z. B. ISO) | API6:2023, API8:2019 | ➖ (über Aufzählung, Format, Muster) |
| Feldnamen vermeiden Akronyme, verwenden vollständige Wörter | API9:2023 | ❌ |
| Beim Erstellen neuer Ressourcen werden Identifikatoren zurückgegeben | API2:2023 | ✅ (über Antwortschema/Beispiel) |

---

**🧪 Der API-Design-Prototyp ist fertig, wenn…**

| Kriterien | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| Alle Punkte der Konzept-Checkliste wurden geprüft | – | ❌ |
| Endpunktpfade enthalten maximal zwei Ressourcen/Unterressourcen | – | ❌ |
| Endpunkte und Attribute enthalten Beispiele | – | ✅ (über Beispiel, Beispiele) |
| POST wird zum Erstellen/Aktualisieren verwendet (nicht PUT, es sei denn, vollständig) | – | ❌ |
| DELETE wird zum Entfernen von Ressourcen verwendet | – | ❌ |
| Versionierungsstrategie festgelegt; wird vom Gateway unterstützt | API9:2023 | ❌ |
| GET hat keinen Request-Body; gibt 200 OK mit Inhalt zurück | – | ➖ (Konvention; nicht erzwungen) |
| GET gibt 204 zurück, wenn der Antworttext leer ist | – | ✅ (204-Antwort kann definiert werden) |
| POST gibt 200 OK zurück, wenn eine Aktualisierung erfolgt | – | ✅ (Statuscodes können definiert werden) |
| POST gibt bei der Erstellung 201 Created with ID zurück | – | ✅ |
| DELETE gibt bei Erfolg 204 OK zurück | – | ✅ |
| 400-Fehler liefern spezifische Fehlerinformationen | API6:2023 | ✅ (im Antwortschema beschrieben) |
| 401 Nicht autorisiert aufgrund falscher Anmeldedaten | API2:2023 | ✅ (Standard-Antwortdokumentation) |
| 403 Für nicht autorisierte Vorgänge verboten | API5:2023 | ✅ |

---

**🚀 API ist in der Produktion wartbar, wenn…**

| Kriterien | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| Alle Prototyp-/Designelemente geprüft | – | ❌ |
| Veröffentlicht über API-Management | API10:2019, API8:2023 | ❌ |
| Sichtbar im Entwicklerportal | API9:2023 | ❌ |
| Nur über API-Gateway zugänglich | API9:2023, API8:2023 | ❌ |
| Ratenbeschränkungen werden durchgesetzt | API4:2023 | ❌ |
| Dokumente werden automatisch aus Spezifikationen/Schemas generiert | API9:2023 | ✅ |
| Spezifikationen werden automatisch auf Gateway/Entwicklerportal aktualisiert | API9:2023 | ✅ (indirekt über Tooling) |
| Spezifikation bei jeder Änderung validiert | – | ✅ (Best Practice) |
| Spezifikation enthält Anfrage-/Antwort-Schema | – | ✅ |
| Schema und Beispiele bestehen die Validierung | – | ✅ |
| Verwendet HTTPS oder verschlüsselte Protokolle | API10:2023 | ❌ |
| Veröffentlicht unter offizieller Organisationsdomain | API8:2023 | ❌ |
| Endpunkte durch Authentifizierung geschützt | API2:2023, API4:2023 | ➖ (Sicherheitsschemata können definiert werden) |
| Token-basierte Authentifizierung | – | ✅ (über securitySchemes) |
| Geschützt gegen CSRF | API8:2023 | ❌ |
| Eingaben werden automatisch vom Framework validiert | API8:2023 | ✅ (indirekt über Schema) |
| Ausgaben werden vom Framework automatisch maskiert | API8:2023 | ❌ |
| Verschlüsselung für Daten während der Übertragung/Speicherung | API8:2023 | ❌ |
| Nachrichtenintegrität implementiert | API6:2023, API7:2023 | ❌ |
| UUIDs/Pseudo-Identifikatoren anstelle von DB-IDs | API7:2023 | ➖ (im Beispiel empfohlen) |
| Keine sensiblen Daten in URLs | API7:2023 | ❌ |
| HTTP-Methoden nur für vorgesehene Ressourcen | API5:2023 | ✅ (in Pfaden definiert) |

**ASync-API-Checkliste**  
**✅ Konzept ist bereit, wenn…**

| Kriterium | AsyncAPI 2.x |
| ----- | ----- |
| Die API basiert auf klaren Geschäftsanforderungen | ❌ |
| Die API verbirgt rohe Backend-Daten und ist für die gemeinsame Nutzung konzipiert | ❌ |
| Die API verfügt über eine Beschreibung, die ihren geschäftlichen Nutzen und ihre Funktionen erläutert | ✅ |
| Die API hat ein einheitliches Design mit unseren anderen APIs | ❌ |
| API und Datenbenennung verwenden gutes Englisch (oder eine andere Standardsprache) | ❌ |
| Obligatorische Felder sind angegeben | ✅ |
| Datumsangaben entsprechen dem ISO-Standardformat einschließlich Zeitzone | ✅ |
| Allgemeine Daten verwenden Standardwerte (z. B. ISO). | ➖ |
| Felder werden vollständig beschrieben, Abkürzungen werden vermieden | ❌ |
| Bei der Veröffentlichung neuer Nachrichten werden die relevanten Themen oder Kanäle klar gekennzeichnet | ✅ |

---

**🧪 API-Design-Prototyp ist fertig, wenn…**

| Kriterium | AsyncAPI 2.x |
| ----- | ----- |
| Alle Punkte der Konzept-Checkliste sind geprüft | ❌ |
| Das Nachrichten-Design enthält eine klare Struktur (Ereignisse, Befehle, Abfragen) | ✅ |
| Alle Nachrichten und Attribute enthalten Beispiele | ✅ |
| Nachrichten folgen einer einheitlichen Struktur über Themen/Kanäle hinweg | ✅ |
| Die Strategie zur Versionierung von Nachrichten wurde festgelegt | ❌ |
| Bestätigungen für empfangene Nachrichten sind definiert (falls zutreffend) | ✅ |
| Fehler oder Probleme mit Nachrichten enthalten spezifische Fehlerinformationen | ✅ |
| Authentifizierungs- und Autorisierungsstrategien sind festgelegt | ➖ |

---

**🚀 Die API ist in der Produktion wartbar, wenn…**

| Kriterium | AsyncAPI 2.x |
| ----- | ----- |
| Alle Punkte in den Checklisten für Prototyp und API-Design werden geprüft | ❌ |
| Die API wird über ein geeignetes AsyncAPI-Verwaltungswerkzeug verwaltet. | ❌ |
| Die API ist in einem Entwicklerportal sichtbar | ❌ |
| Bei der Übermittlung von Nachrichten werden Ratenbegrenzungen durchgesetzt (falls zutreffend) | ❌ |
| Die API-Dokumentation wird automatisch aus der AsyncAPI-Spezifikation generiert | ✅ |
| Die Spezifikation wird automatisch in den API-Tools und im Portal aktualisiert | ✅ |
| Die Spezifikation für Themen/Kanäle wird bei jeder Änderung validiert | ✅ |
| Die Spezifikation enthält das Schema für die Nachrichten | ✅ |
| Nachrichtenschema und Beispiele bestehen die Schema-Validierung | ✅ |
| Der Nachrichtentransport gewährleistet die Sicherheit (z. B. MQTT/AMQP über TLS) | ❌ |
| Die API wird unter der offiziellen Domain der Organisation betrieben | ❌ |
| Alle Themen/Kanäle sind durch Authentifizierung geschützt | ➖ |
| Die API verfügt über eine tokenbasierte Authentifizierung | ✅ |
| Die Verschlüsselung von Daten während der Übertragung und Speicherung wird nach Bedarf implementiert | ❌ |
| Die Nachrichtenintegrität wurde nach Bedarf implementiert | ❌ |
| Anstelle von DB-IDs werden UUIDs oder Pseudokennungen verwendet | ➖ |
| Sensible Informationen werden nicht in Themen oder Kanälen offengelegt | ❌ |
| Mithilfe von Whitelists wird festgelegt, welche Clients veröffentlichen/abonnieren dürfen | ✅ |