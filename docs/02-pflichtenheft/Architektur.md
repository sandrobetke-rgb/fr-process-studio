# Architektur – F&R Process Studio

## Systemkontext
F&R Process Studio verwaltet Prozessmodelle des IATF-Managementsystems einschließlich integrierter Umwelt- und Energiethemen sowie arbeitsschutzbezogener Prozesse und zugehörige dokumentierte Informationen. Das GitHub-Repository enthält ausschließlich Quellcode und technische Dokumentation, nicht die produktiven Managementsystemdaten.

## Fachliche Systemstruktur\nDie Anwendung bildet zwei unterscheidbare Bereiche ab: IATF 16949 separat sowie den integrierten Bereich Umwelt (ISO 14001), Energie (ISO 50001) und Arbeitsschutzprozesse angelehnt an ISO 45001. Gemeinsame Prozesse und Schnittstellen können verknüpft werden, ohne die Systembereiche zu vermischen.\n\n## Komponenten
1. Web-Frontend: Prozessdesigner, Prozesslandkarte, Turtle-Ansicht, Dokumentenerstellung/-lenkung, Mitarbeiteransicht, Cockpit.
2. API-Backend (geplant): Validierung, Geschäftsregeln, Rechteprüfung und Versionierung.
3. PostgreSQL (geplant): Prozesse, Prozessversionen, Dokumente, Dokumentversionen, Dokumenttypen, Vorlagen, Prozess-/Schrittzuordnungen, Rollen, Änderungen, Prüfzyklen und Freigaben.
4. Dateispeicher (geplant): freigegebene Dokumentdateien, Entwurfsstände, Anlagen, Bilder und Medien; Metadaten und Verknüpfungen verbleiben relational in PostgreSQL.
5. Workflow-/Audit-Service (geplant): serverseitige Statusmaschine, Aufgabenrouting, Funktionstrennung, Fristen, Erinnerungen und append-only Audit-Trail.\n6. Signatur-Adapter (geplant): interne elektronische Freigabe plus optionale Anbindung qualifizierter Vertrauensdiensteanbieter und Zeitstempel.\n7. KI-Adapter (optional, später): Impact-Analyse und Vorschläge; Ergebnisse sind Entwürfe.

## Datenfluss
Browser → API → Authentifizierung/Autorisierung → Geschäftslogik → Datenbank/Dateispeicher. Änderungen an freigegebenen Datensätzen erzeugen neue Versionen und Audit-Ereignisse. Freigaben werden an einen unveränderlichen Versionsstand gebunden; Integritätsnachweise und Audit-Protokolle werden getrennt gegen unbemerkte Manipulation geschützt.

## Prototypgrenze
Die derzeitige UI arbeitet lokal im Browser und dient der Funktions- und Bedienvalidierung. Sie ist nicht für den produktiven Einsatz mit echten Unternehmensdaten freigegeben.