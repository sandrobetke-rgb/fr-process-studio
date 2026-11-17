# Technische Spezifikation – F&R Process Studio

**Version:** 0.5 · **Stand:** 17.11.2026 · **Status:** Architekturvorschlag

## Zielbild
Browserbasierte, modular aufgebaute Webanwendung. Das Frontend ist ein React-/TypeScript-Projekt mit Vite. Die grafische Modellierung basiert auf @xyflow/react (React Flow). Die erste Version ist ein UI-Prototyp; zentrale Speicherung und Backend folgen.

## Vorgeschlagene Zielarchitektur
- Frontend: React, TypeScript, Vite, @xyflow/react
- Backend (geplant): Python FastAPI mit REST API
- Datenbank (geplant): PostgreSQL
- Betrieb (geplant): Docker; Zielumgebung nach Entscheidung von F&R
- CI (geplant): GitHub Actions für Build und Tests
- KI (später): austauschbare Schnittstelle; keine automatische Freigabe

## Fachliche Systemstruktur\nZwei getrennte Systembereiche werden modelliert: IATF 16949 als eigenständiges Qualitätsmanagementsystem sowie ein integrierter Managementsystembereich für Umwelt (ISO 14001), Energie (ISO 50001) und Arbeitsschutzprozesse angelehnt an ISO 45001. Prozesse dürfen mehrere Bereiche berühren; Systemzuordnung und Nachweisführung bleiben explizit. Die ISO-45001-Anlehnung ist nicht als Zertifizierungsstatus abzubilden.\n\n## Datenmodell – erste fachliche Entitäten
Process, ProcessVersion, ProcessNode, ProcessEdge, TurtleField, Document, NormReference, Role, User, ChangeRequest, ChangeImpact, Approval, AuditEvent, KPI, Risk, Opportunity.

## Workflow, Freigabe und Revisionssicherheit
Workflow-Engine mit konfigurierbaren Statusübergängen, Aufgaben, Rollen, Stellvertretungen, Fristen, Erinnerungen, Eskalationen, Rückweisungen und Kommentaren. Server erzwingt Funktionstrennung und Berechtigungen. Jede Freigabe referenziert eine immutable DocumentVersion und speichert Benutzeridentität, Authentifizierungsstärke, Freigabeabsicht, Zeitstempel und Ergebnis.

AuditEvent wird append-only gespeichert. Ereignisse enthalten Akteur, Aktion, Objekt-ID, Versions-ID, Zeitstempel, Ergebnis, Änderungsgrund und Korrelations-ID. Manipulationserkennung durch kryptografische Hashes/Hash-Verkettung und regelmäßige Integritätsprüfung; Protokolle in getrennt geschütztem Speicher. Hash-Verkettung allein ist keine absolute Revisionssicherheitsgarantie. Freigegebene Inhalte werden als unveränderliche Versionen gespeichert; Korrekturen erzeugen Folgeverionen. Archiv- und Exportpakete enthalten Dokument, Metadaten, Freigabenachweise und zugehörige Audit-Ereignisse.

Elektronische Freigabe in der Anwendung wird als interner Freigabenachweis umgesetzt. Eine Signatur-Adapter-Schnittstelle ermöglicht bei Bedarf die Integration eines qualifizierten Vertrauensdiensteanbieters (QTSP) für fortgeschrittene oder qualifizierte elektronische Signaturen sowie Zeitstempel. Signaturvalidierung und langfristige Prüfbarkeit müssen berücksichtigt werden. Die Anwendung darf eine einfache interne Freigabe nicht als qualifizierte elektronische Signatur ausweisen.

## Gültigkeitslenkung und Verteilung
DocumentRegister/DocumentMaster verwaltet Dokumentenstamm, Klassifikation, Eigentümer, Systembereich, Gültigkeitszeitraum, Prüffrist, Aufbewahrungsregel und Status. DistributionRule ordnet gültige Versionen Zielgruppen, Rollen, Standorten und Organisationseinheiten zu. Mitarbeiterzugriffe führen grundsätzlich auf die aktuelle gültige Version; abgelöste Versionen werden aus der Standardansicht entfernt und nur mit Berechtigung im Archiv angezeigt.

Acknowledgement/TrainingRecord bindet Kenntnisnahme oder Unterweisung an Person, konkrete Dokumentversion, Zeitpunkt, Ergebnis und ggf. Wirksamkeitsnachweis. ExternalDocument verwaltet externe Quelle, Herausgeber, Ausgabestand, Abruf-/Prüfdatum, Verantwortlichen und betroffene Prozesse. ReviewTask steuert turnusmäßige und anlassbezogene Prüfungen mit Fälligkeit, Eskalation und dokumentierter Entscheidung. WithdrawalRecord protokolliert Außerkraftsetzung, Grund, Nachfolger und betroffene Verteilungskreise.

## Prozessmodell
Ein Prozess besitzt Stammdaten, Verantwortlichkeit, Beschreibung, Status und Version. Der Ablauf besteht aus Knoten und gerichteten Kanten. Knoten haben Typ, Position und fachliche Daten. Turtle-Felder referenzieren denselben Prozessdatensatz.

## Sicherheit und Governance
Produktivdaten gehören nicht in Git. Geheimnisse werden ausschließlich über sichere Umgebungsvariablen/Secret Stores verwaltet. Rollen- und Freigaberechte müssen serverseitig geprüft werden. Audit-Ereignisse sind unveränderbar zu protokollieren.

## Aktueller Implementierungsumfang
- React/Vite/TypeScript-Grundgerüst
- Visueller Editor mit Beispielprozess, Knotenbearbeitung und Verbindungen
- Prozessstammdaten in der Oberfläche
- Turtle-Ansicht mit ausdrücklich als Platzhalter markierten Feldern
- Light-/Dark-Modus (aktuell lokale Browserpräferenz)
- Navigation für Cockpit und Dokumente als Prototypseiten

## Nicht implementiert
Backend, PostgreSQL, Authentifizierung, Mehrbenutzerbetrieb, zentrale Speicherung, Freigabe-Workflow, Audit-Trail, produktive Turtle-Datenpflege, produktive Dokumentenerstellung/-lenkung, KI-Änderungsanalyse, Export und automatisierte Tests.

## Architekturentscheidungen mit Prüfbedarf
- React Flow Lizenzbedingungen für den konkreten Einsatz prüfen
- Hosting und Backupkonzept mit IT/Datenschutz abstimmen
- Datenmodell und API vor produktiver Nutzung spezifizieren
- BPMN 2.0 Import/Export als spätere Interoperabilitätsoption bewerten