## So beginnen Sie mit der API-Bereitstellung auf der Grundlage der vorangegangenen Phasen („Stationen“)
Nutzen Sie diesen Leitfaden zu Beginn der `API Delivery` (API-Bereitstellung), nachdem der API-Vertrag (z. B. OpenAPI) und die wichtigsten Ergebnisse aus früheren Stationen geprüft und akzeptiert wurden.
Das Ziel besteht nicht darin, die Implementierung isoliert zu entwickeln. Das Ziel ist es, die vereinbarten Ergebnisse aus früheren Stationen in konkrete Codestrukturen, Validierungsregeln, Laufzeitverhalten und Entscheidungen zur API-Produktbereitstellung umzusetzen.

---

### 1. Beginnen Sie mit dem validierten Vertrag
- Behandeln Sie den validierten API-Vertrag als Hauptbezugspunkt für Implementierungsentscheidungen.
- Halten Sie den Vertrag und die Implementierung während der gesamten API-Produktbereitstellung aufeinander abgestimmt.
- Nutzen Sie den Vertrag als Grundlage für die Validierung von Anfragen, die Zuordnung von Antworten, die Dokumentation und Tests.

---

### 2. Verwenden Sie Domänen-Ergebnisse, um die geschäftliche Bedeutung zu bewahren
- Nutzen Sie die Ergebnisse des `Domain Canvas` als Leitfaden für die Namensgebung, die Aufteilung der Implementierung in klare geschäftliche Verantwortlichkeiten und die Verbindung verschiedener Backend-Systeme, ohne deren Unterschiede offenzulegen.
- Bewahren Sie die validierten Bedeutungen von Entitäten, Attributen, Status und „Source-of-Truth“-Regeln.
- Vermeiden Sie es, backend-spezifische Modelle oder Inkonsistenzen in die öffentliche API einfließen zu lassen.

---

### 3. Nutzen Sie Journey-Ergebnisse, um kritische Abläufe zu bewahren
- Nutzen Sie die Ergebnisse des `Customer Journey Canvas`, um zu ermitteln, welche Benutzerabläufe am wichtigsten sind und zuerst unterstützt werden müssen.
- Nutzen Sie die Ergebnisse des `API Consumer Experience`, um die API verständlich, vorhersehbar und einfach zu integrieren zu halten.
- Lassen Sie die vereinbarten Journey-Prioritäten entscheiden, welche Implementierungspfade die höchste Zuverlässigkeit, die geringste Latenz, die klarsten Fehlermeldungen und den stärksten operativen Fokus erfordern.

---

### 4. Nutzen Sie die Ergebnisse der Wertversprechen, um den Kundennutzen zu erhalten
- Nutzen Sie die Ergebnisse des `API Value Proposition Canvas`, um die Implementierung auf die vereinbarten Probleme, Vorteile und API-Funktionen zu fokussieren.
- Behalten Sie die Feldbedeutungen, das Verhalten und die Versprechen bei, die die API in den früheren Phasen wertvoll gemacht haben.
- Stellen Sie sicher, dass Fehlerbehandlung, Aktualität und Namensgebung sowohl die beabsichtigte Entwicklererfahrung als auch den geschäftlichen Anwendungsfall unterstützen.

---

### 5. Nutzen Sie die Ergebnisse der Architektur, um Entscheidungen zur Laufzeit zu gestalten
- Nutzen Sie die Ergebnisse des `Business Impact Canvas`, um Entscheidungen zu Ausfallsicherheit, Timeouts, Fallbacks und Leistungsminderungen zu leiten.
- Nutzen Sie die Ergebnisse des `Locations Canvas`, um Netzwerkgrenzen, Vertrauensgrenzen, Zugriffspfade und Bereitstellungsbeschränkungen zu leiten.
- Nutzen Sie die Ergebnisse des `Capacity Canvas`, um Ratenbegrenzungen, Caching, Skalierung und das Verhalten bei Spitzenlasten zu leiten.
- Nutzen Sie die Leitlinien aus `API Metrics And Analytics`, um zu entscheiden, was ab der ersten Implementierung beobachtet werden muss.

---

### 6. Nutzen Sie die Ergebnisse aus dem Interaktions- und Protokoll-Design zur Gestaltung der Codestruktur
- Nutzen Sie die Ergebnisse aus dem `Interaction Canvas`, um zu vermeiden, dass nicht unterstützte Interaktionsstile zu früh implementiert werden.
- Nutzen Sie die Design-Ergebnisse aus `REST`, `Event` oder `GraphQL`, um protokollspezifisches Verhalten bei Anfragen, Antworten und Validierungen zu gestalten.
- Spiegeln Sie den gewählten Interaktionsstil klar in der Codestruktur, den Verantwortlichkeiten und der Teststrategie wider.

---

### 7. Nutzen Sie die Ergebnisse der Überprüfung, um die Umsetzung zu verbessern, bevor die Codierung zu weit fortgeschritten ist
- Nutzen Sie die Ergebnisse der Überprüfung, um Unklarheiten zu beseitigen, bevor sich die Implementierung über den gesamten Code verteilt.
- Beheben Sie unklare Anforderungsregeln, fehlende Validierungen, schwache Fehlerverträge und operative Lücken frühzeitig.
- Betrachten Sie das Audit als einen Zyklus zur Designverbesserung vor der Produktion, nicht nur als abschließende Entscheidungsinstanz.

---

### 8. Wenden Sie die Leitlinien an und fassen Sie sie anschließend zusammen
- Wenden Sie diese Leitlinien auf die aktuelle API und den Implementierungsplan an.
- Fassen Sie die Auswirkungen auf die Codestruktur, die Anfragevalidierung, die Quellintegration, die Sicherheit, die Überwachung und Warnmeldungen sowie das Testen zusammen.
- Erstellen Sie kein separates Lieferartefakt, es sei denn, das Team oder der Benutzer benötigt ausdrücklich eines.
