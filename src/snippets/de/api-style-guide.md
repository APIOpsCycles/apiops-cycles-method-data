# **API-Designprinzipien**

Eine prägnante Anleitung zu API-Benutzerfreundlichkeit, Auffindbarkeit und Konsistenz, die auf bewährten Designphilosophien und Benutzeranforderungen basiert.

**Ergebnisse**

* Besseres Verständnis der API-Designprinzipien

**So funktioniert**  
**Schritte**

1. **Verbraucherorientiertes Design:** Beginnen Sie jeden APIOps-Zyklus mit der Erfassung der Benutzerziele und Fachbegriffe, damit APIs echte Probleme lösen können.  
2. **Einheitliche Benennung und Verhalten:** Wenden Sie gemeinsame Konventionen für Ressourcen, Fehler und Formate an, um APIs vorhersehbar zu machen.  
3. **Vertragsorientiert:** Erfassen Sie die Schnittstelle mit OpenAPI oder AsyncAPI vor dem Codieren, um Teams aufeinander abzustimmen und Automatisierung zu ermöglichen.  
4. **Benutzerfreundlichkeit und Auffindbarkeit:** Stellen Sie klare Dokumentationen und Beispiele bereit, damit Entwickler schnell verstehen, wie die API zu verwenden ist.  
5. **Sichere Iteration:** Entwickeln Sie Designs in kleinen, versionierten Schritten weiter, damit Änderungen keine bestehenden Verbraucher beeinträchtigen.

Tipp

* Passen Sie die API-Designprinzipien an Ihre Domäne an  
* Verwenden Sie sie gemeinsam in verschiedenen Geschäfts- und Technikbereichen.

**API-Styleguide**

Dieser Leitfaden enthält Best Practices und Standards für die Entwicklung und Implementierung von RESTful-APIs, um Sicherheit, Konsistenz, Benutzerfreundlichkeit und die Ausrichtung auf die Unternehmensziele zu gewährleisten. Er steht auch im Einklang mit der API-Audit-Checkliste.  
---

**1\. Sicherheit und Datenschutz**  
**HTTPS-Durchsetzung**

* Alle APIs müssen HTTPS erzwingen, um Daten während der Übertragung zu verschlüsseln.  
* Sensible Informationen (z. B. Tokens, Anmeldedaten, personenbezogene Daten) dürfen niemals in URLs oder Abfrageparametern übertragen werden. Verwenden Sie für solche Daten den Request Body.

**Rollenbasierte Zugriffskontrolle (RBAC)**

* Implementieren Sie RBAC mithilfe von Identitätsanbietern und setzen Sie Berechtigungen innerhalb der API-Logik durch.  
* Dokumentieren Sie rollenspezifische Zugriffskontrollen in der API-Dokumentation.  
* **Reifegrade**:  
  * **Grundlegend**: Rollen sind definiert und der Zugriff wird manuell erzwungen.  
  * **Wachstum**: Identitätsanbieter sind integriert.  
  * **Skalierung**: Dynamische Rollenprüfungen basierend auf API-Nutzern.  
  * **Innovativ**: Automatisierte, richtliniengesteuerte RBAC-Durchsetzung.

**OWASP-API-Sicherheitskonformität**

* Behebt die 10 größten Risiken der OWASP API Security, darunter:  
  * **API6:2023 – Unrestricted Access to Sensitive Business Flows**: Beschränken Sie sensible Geschäftsabläufe durch geeignete Authentifizierung und Autorisierung.  
  * **API7:2023 – Server-Side Request Forgery (SSRF)**: Validieren Sie Eingaben und bereinigen Sie Antworten, um SSRF-Schwachstellen zu verhindern.  
  * **API2:2023 – Defekte Authentifizierung**: Stellen Sie robuste Authentifizierungsmechanismen (z. B. OAuth 2.0) sicher und validieren Sie Workflows für das Ablaufen von Tokens.

**Verschlüsselung im Ruhezustand**

* Sensible Daten, die in Datenbanken gespeichert sind, müssen im Ruhezustand mit branchenüblichen Algorithmen verschlüsselt werden.  
* Stellen Sie sicher, dass keine sensiblen Daten in Protokollen oder URLs erscheinen.

---

**2\. HTTP-Methoden**  
**Standardmäßige Verwendung**

* Verwenden Sie HTTP-Methoden konsistent:  
  * GET: Daten abrufen, ohne den Serverstatus zu ändern.  
  * POST: Erstellen Sie neue Ressourcen oder lösen Sie serverseitige Vorgänge aus.  
  * PUT: Aktualisieren Sie vorhandene Ressourcen (verwenden Sie vollständige Ressourcen-Payloads).  
  * PATCH: Aktualisieren Sie eine vorhandene Ressource teilweise.  
  * DELETE: Entfernen einer Ressource.

**Idempotenz**

* Stellen Sie sicher, dass die Methoden PUT, PATCH und DELETE idempotent sind, d. h. dass mehrere identische Anfragen zum gleichen Ergebnis führen.

**Testen von HTTP-Methoden**

* Validieren Sie alle HTTP-Methoden durch Integrationstests, um die Übereinstimmung mit dem erwarteten Verhalten sicherzustellen.

---

**3\. Fehlerbehandlung und Antworten**  
**Standardisiertes Fehlerformat**

* Alle APIs müssen Fehler in einem standardisierten Format zurückgeben. Beispiel:

`{`  
 `„error”: „invalid_request”,`  
 `"message": "Der Anfrage fehlt ein erforderlicher Parameter.",`  
 `„details”: [`  
    
`„Der Parameter „user_id” ist erforderlich.”`  
 `]`  
`}`

**Ausführliche Beschreibungen**

* Fügen Sie für Menschen lesbare Fehlermeldungen hinzu, um Entwicklern bei der Fehlerbehebung zu helfen.  
* Stellen Sie sicher, dass Fehlercodes und Beschreibungen mit der OpenAPI-Spezifikation übereinstimmen.

**HTTP-Statuscodes**

* Verwenden Sie für jeden Vorgang die entsprechenden Statuscodes:  
  * 200 OK: GET-, PUT- oder PATCH-Vorgänge erfolgreich.  
  * 201 Erstellt: Erfolgreicher POST-Vorgang, der zu einer neuen Ressource führt.  
  * 204 Kein Inhalt: Erfolgreicher DELETE-Vorgang.  
  * 400 Bad Request: Ungültige Eingabe oder fehlende Parameter.  
  * 401 Unauthorized: Authentifizierung fehlgeschlagen.  
  * 403 Forbidden: Unzureichende Berechtigungen.  
  * 404 Nicht gefunden: Ressource existiert nicht.  
  * 429 Zu viele Anfragen: Ratenbegrenzung überschritten.

**Testen von Fehlerszenarien**

* Überprüfen Sie alle Fehlerszenarien, um korrekte Antworten und aussagekräftige Fehlermeldungen sicherzustellen.  
* **Reifegrade**:  
  * **Grundlegend**: Grundlegende Fehlerbehandlung für wichtige Szenarien.  
  * **Wachstum**: Detaillierte Fehlermeldungen für alle Endpunkte.  
  * **Skalierung**: Automatisierte Fehlervalidierung mithilfe von Testtools.  
  * **Innovativ**: KI-gestützte Erkenntnisse zu Fehlermustern und Vorhersagen.

---

**4\. Dokumentation und Entwicklererfahrung**  
**Interaktive Dokumentation**

* Generieren Sie API-Dokumentation mithilfe der OpenAPI-Spezifikation (neueste unterstützte Version).  
* Fügen Sie Beispiele für alle Endpunkte hinzu, um Anfrage-/Antwort-Workflows zu veranschaulichen.  
* **Reifegrade**:  
  * **Grundlegend**: Statische Dokumentation mit Beispielen.  
  * **Wachsend**: Interaktive, automatisch generierte Dokumentation.  
  * **Skalierung**: Entwicklertools für API-Tests.  
  * **Innovativ**: Integrierte Entwicklerumgebungen zum Testen.

**Abschnitt „Erste Schritte“**

* Fügen Sie einen Abschnitt „Erste Schritte“ in die Dokumentation ein, um neue Benutzer durch die Authentifizierung, gängige Arbeitsabläufe und das Testen von Endpunkten zu führen.  
* Verwenden Sie die Vorlage für die Erste-Schritte-Anleitung als Referenz.

**Sandbox-Umgebung**

* Bieten Sie eine Sandbox-Umgebung an, die Produktionsschemata und Fehlercodes für Testzwecke widerspiegelt.  
* Überprüfen Sie die Sandbox-Ausrichtung durch API-Audit-Tests.

---

**5\. Namenskonventionen und Standards**  
**Benennung von Ressourcen**

* Verwenden Sie beschreibende, branchenübliche englische Begriffe für Ressourcennamen (z. B. Bücher, Benutzer, Ausleihen).  
* Vermeiden Sie mehrdeutige Begriffe wie „Typ” oder „Status” ohne zusätzlichen Kontext.

**Benennen von Attributen**

* Verwenden Sie für Attributnamen camelCase (z. B. userId, bookTitle).  
* Vermeiden Sie Akronyme und Abkürzungen, um Klarheit zu gewährleisten.  
* Überprüfen Sie die Namenskonventionen während der OpenAPI-Validierung.

---

**6\. Lokalisierung und Internationalisierung**  
**Header akzeptieren**

* Unterstützen Sie die Lokalisierung mithilfe des Accept-Language\-Headers für API-Antworten.  
* Stellen Sie lokalisierte Zeichenfolgen bereit und stellen Sie sicher, dass alle Fehlermeldungen übersetzt werden können.

**Datums- und Zeitformate**

* Verwenden Sie das ISO 8601-Format für alle Datums- und Zeitfelder, einschließlich Zeitzonen.

**Testen der Lokalisierung**

* Validieren Sie lokalisierte Antworten und Fehlermeldungen durch Funktionstests.

---

**7\. Versionierung und Abkündigung**  
**Versionierungsstrategie**

* Verwenden Sie semantische Versionsnummern (z. B. /v1, /v2), um wesentliche Änderungen zu kennzeichnen.  
* Vermeiden Sie grundlegende Änderungen innerhalb einer Version. Kündigen Sie alte Endpunkte mit ausreichender Vorankündigung.

**Hinweise zur Abkündigung**

* Kommunizieren Sie Veraltungen über das Entwicklerportal und fügen Sie Header in API-Antworten ein:

`Veraltung: true`  
`Auslaufdatum: 01.01.2025`  
`Link: &lt;https://developer.portal.com/docs/deprecation&gt;; rel="deprecation"`  
---

**8\. Paginierung und Filterung**  
**Paginierung**

* Verwenden Sie Standardparameter für die Paginierung:  
  * page: Aktuelle Seitenzahl.  
  * limit: Anzahl der Elemente pro Seite.

**Filtern**

* Filtern nach gängigen Attributen (z. B. Titel, Autor, Genre) zulassen:

`GET /books?title=harry&amp;author=rowling`

**Paginierung und Filterung testen**

* Überprüfen Sie anhand von API-Testfällen, ob die Paginierung und Filterung wie erwartet funktionieren.  
* **Reifegrade**:  
  * **Grundlegend**: Unterstützung grundlegender Paginierung und Filterung.  
  * **Erweitert**: Sicherstellung eines konsistenten Verhaltens über alle Endpunkte hinweg.  
  * **Skalierung**: Optimieren Sie die Leistung für große Datensätze.  
  * **Innovativ**: Intelligente Filterung und Unterstützung für vorausschauende Abfragen.

---

**9\. Testen und Validieren**  
**Automatisierte Validierung**

* Verwenden Sie Tools wie Spectral, um OpenAPI-Spezifikationen auf Vollständigkeit und Konsistenz zu überprüfen.

**Fehlerprüfung**

* Testen Sie Fehlerszenarien für alle Endpunkte, um korrekte Antworten und aussagekräftige Fehlermeldungen sicherzustellen.

**OWASP-Konformitätstests**

* Testen Sie APIs anhand der OWASP API Security Top 10 Risiken:  
  * **API6:2023 – Uneingeschränkter Zugriff auf sensible Geschäftsabläufe**: Überprüfen Sie die ordnungsgemäßen Zugriffsbeschränkungen.  
  * **API7:2023 – Server-Side Request Forgery (SSRF)**: Validieren Sie Eingaben und Antworten, um SSRF-Schwachstellen zu verhindern.  
  * **API2:2023 – Fehlerhafte Authentifizierung**: Testen Sie die Ablaufzeit von Tokens, Aktualisierungsworkflows und die Fehlerbehandlung.

---

**10\. Verfeinerung und Validierung des API-Styleguides**  
**Überprüfung und Feedback**

* Führen Sie regelmäßig Überprüfungen des Style Guides mit funktionsübergreifenden Teams (Produkt, Technik, Compliance) durch.  
* Sammeln Sie Feedback von API-Nutzern, um Probleme hinsichtlich der Benutzerfreundlichkeit zu beheben.

**Versionskontrolle**

* Verwalten Sie den Styleguide in einem versionskontrollierten Repository, um Änderungen zu verfolgen und die Abstimmung im Team sicherzustellen.

**Integration in Entwicklungsworkflows**

* Integrieren Sie die Grundsätze des Styleguides in API-Linting-Tools und CI/CD-Pipelines.  
* Überprüfen Sie regelmäßig die OpenAPI-Spezifikationen anhand des Leitfadens mit automatisierten Tools wie Spectral.

