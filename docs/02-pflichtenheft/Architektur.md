# Architektur – F&R Process Studio

## Systemkontext
F&R Process Studio verwaltet IMS-Prozessmodelle und zugehörige dokumentierte Informationen. Das GitHub-Repository enthält ausschließlich Quellcode und technische Dokumentation, nicht die produktiven IMS-Daten.

## Komponenten
1. Web-Frontend: Prozessdesigner, Prozesslandkarte, Turtle-Ansicht, Mitarbeiteransicht, Cockpit.
2. API-Backend (geplant): Validierung, Geschäftsregeln, Rechteprüfung und Versionierung.
3. PostgreSQL (geplant): Prozesse, Versionen, Rollen, Änderungen, Freigaben und Verknüpfungen.
4. Dateispeicher (geplant): gelenkte Dokumente und Medien.
5. KI-Adapter (optional, später): Impact-Analyse und Vorschläge; Ergebnisse sind Entwürfe.

## Datenfluss
Browser → API → Authentifizierung/Autorisierung → Geschäftslogik → Datenbank/Dateispeicher. Änderungen an freigegebenen Datensätzen erzeugen neue Versionen und Audit-Ereignisse.

## Prototypgrenze
Die derzeitige UI arbeitet lokal im Browser und dient der Funktions- und Bedienvalidierung. Sie ist nicht für den produktiven Einsatz mit echten Unternehmensdaten freigegeben.