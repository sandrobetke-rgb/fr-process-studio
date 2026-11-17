# Architektur – F&R Process Studio

## Systemkontext

F&R Process Studio verwaltet Prozessmodelle und gelenkte dokumentierte Informationen für zwei klar unterscheidbare Managementsystembereiche. Das GitHub-Repository enthält ausschließlich Quellcode und technische Dokumentation, nicht die produktiven Managementsystemdaten.

## Fachliche Systemstruktur

Die Anwendung bildet zwei Bereiche ab:
1. IATF 16949 als eigenständiges Qualitätsmanagementsystem.
2. Integriertes Managementsystem für Umwelt (ISO 14001), Energie (ISO 50001) und Arbeitsschutzprozesse angelehnt an ISO 45001.

Gemeinsame Prozesse und Schnittstellen können verknüpft werden, ohne die Systembereiche fachlich oder in der Nachweisführung zu vermischen. Die Anlehnung an ISO 45001 ist keine Aussage über eine Zertifizierung.

## Komponenten

1. **Web-Frontend:** Prozessdesigner, Prozesslandkarte, Turtle-Ansicht, Dokumentenerstellung/-lenkung, Mitarbeiteransicht und Cockpit.
2. **API-Backend (geplant):** Validierung, Geschäftsregeln, Rechteprüfung, Versionierung und Workflow-Steuerung.
3. **PostgreSQL (geplant):** Prozesse, Prozessversionen, Dokumente, Dokumentversionen, Dokumenttypen, Vorlagen, Zuordnungen, Rollen, Änderungen, Prüfzyklen und Freigaben.
4. **Dateispeicher (geplant):** Dokumentdateien, Entwurfsstände, freigegebene Fassungen, Anlagen, Bilder und Medien. Metadaten und Verknüpfungen verbleiben relational in PostgreSQL.
5. **Workflow-/Audit-Service (geplant):** Serverseitige Statusmaschine, Aufgabenrouting, Funktionstrennung, Fristen, Erinnerungen, Eskalationen und append-only Audit-Trail.
6. **Signatur-Adapter (geplant):** Interne elektronische Freigabe plus optionale Anbindung qualifizierter Vertrauensdiensteanbieter und Zeitstempel.
7. **KI-Adapter (optional, später):** Impact-Analyse und Vorschläge. Ergebnisse sind Entwürfe und benötigen menschliche Prüfung.

## Datenfluss

Browser → API → Authentifizierung/Autorisierung → Geschäftslogik → Datenbank/Dateispeicher. Änderungen an freigegebenen Datensätzen erzeugen neue Versionen und Audit-Ereignisse. Freigaben werden an einen unveränderlichen Versionsstand gebunden. Integritätsnachweise und Audit-Protokolle werden getrennt gegen unbemerkte Manipulation geschützt.

## Sicherheitsgrenzen

- Das Frontend ist nicht vertrauenswürdig; jede Berechtigung wird serverseitig erneut geprüft.
- Produktive Unternehmensdaten und Geheimnisse werden nicht im GitHub-Repository gespeichert.
- Freigegebene Dokument- und Prozessversionen dürfen nicht überschrieben werden.
- Audit- und Freigabenachweise müssen gegen unbemerkte Veränderung und Löschung geschützt sein.
- Administrative Sonderrechte und Notfallzugriffe sind gesondert zu protokollieren.

## Prototypgrenze

Die derzeitige UI arbeitet lokal im Browser und dient der Funktions- und Bedienvalidierung. Sie ist nicht für den produktiven Einsatz mit echten Unternehmensdaten oder als Auditnachweis freigegeben.
