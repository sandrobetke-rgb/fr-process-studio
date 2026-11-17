# Technische Spezifikation – F&R Process Studio

**Version:** 0.6 · **Stand:** 17.11.2026 · **Status:** Architektur- und Datenmodellvorschlag

## Zielbild

Browserbasierte, modular aufgebaute Webanwendung. Das bestehende Frontend ist React/TypeScript mit Vite und @xyflow/react (React Flow). Die aktuelle Anwendung ist ein lokaler UI-Prototyp. Zentrale Speicherung, Backend und produktive Benutzerverwaltung sind noch nicht implementiert.

## Vorgeschlagene Zielarchitektur

- Frontend: React, TypeScript, Vite, @xyflow/react
- Backend: Python FastAPI mit versionierter REST-API (geplant)
- Datenbank: PostgreSQL (geplant)
- Dateispeicher: S3-kompatibler Objektspeicher oder kontrollierter interner Speicher (Entscheidung offen)
- Betrieb: Docker; Hosting-Zielumgebung nach Entscheidung von F&R
- CI: GitHub Actions für reproduzierbaren Build, Linting und Tests
- KI: austauschbarer Adapter; nur Analyse und Entwurfsvorschläge, keine autonome Freigabe

## Fachliche Systemstruktur

Zwei getrennte Systembereiche werden modelliert: IATF 16949 als eigenständiges Qualitätsmanagementsystem sowie ein integrierter Managementsystembereich für Umwelt (ISO 14001), Energie (ISO 50001) und Arbeitsschutzprozesse angelehnt an ISO 45001. Prozesse dürfen mehrere Bereiche berühren; Systemzuordnung und Nachweisführung bleiben explizit. Die ISO-45001-Anlehnung ist nicht als Zertifizierungsstatus abzubilden.

## Datenmodell

Das fachliche und relationale Zielmodell ist in [Datenmodell.md](Datenmodell.md) beschrieben. Grundprinzipien:

- Stammdatensätze und versionierte Inhalte werden getrennt gespeichert.
- Freigegebene Prozess- und Dokumentversionen sind unveränderlich. Jede Änderung erzeugt eine neue Version.
- Dokumente und Prozesse sind über explizite n:m-Zuordnungen verknüpft; Dokumente können zusätzlich einzelnen Prozessschritten zugeordnet werden.
- Systembereich, Standort, Organisationseinheit und Gültigkeit sind eigenständige fachliche Attribute.
- Freigaben beziehen sich immer auf eine konkrete, unveränderliche Version.
- Audit-Ereignisse werden append-only und getrennt geschützt gespeichert.
- Benutzerrechte werden serverseitig geprüft; die Oberfläche ist keine Sicherheitsgrenze.

## Prozessmodell

Ein Prozess besitzt Stammdaten, Verantwortlichkeit, Beschreibung, Systembereichszuordnung und Status. Prozessversionen enthalten den freizugebenden fachlichen Stand. Der Ablauf besteht aus geordneten Knoten und gerichteten Kanten. Turtle-Felder, Risiken, Chancen, Kennzahlen und Dokumentverknüpfungen referenzieren dieselbe Prozessversion. Prozessdesigner, Turtle und Mitarbeiteransicht dürfen keine voneinander abweichenden Kopien der Prozessdaten führen.

## Dokumentenlenkung und Workflow

DokumentMaster verwaltet Identität, Dokumentart, Eigentümer, Systembereich und Grunddaten. DocumentVersion enthält den konkreten unveränderlichen Inhalt und dessen Metadaten. Ein konfigurierbarer Workflow steuert Entwurf, Fachprüfung, Systemprüfung, Freigabe, Veröffentlichung, Wiedervorlage, Revision, Rückzug und Archivierung. Rückweisung, Kommentare, Stellvertretung, Fristen, Erinnerungen, Eskalationen und ein gesonderter Notfallworkflow sind vorzusehen.

Die serverseitige Geschäftslogik erzwingt Funktionstrennung und Berechtigungen. Jede Freigabe referenziert eine konkrete DocumentVersion und speichert authentifizierte Identität, Authentifizierungsstärke, aktive Freigabeabsicht, Zeitstempel und Ergebnis.

## Audit, Integrität und elektronische Freigabe

AuditEvent wird append-only gespeichert. Ereignisse enthalten Akteur, Aktion, Objekt-ID, Versions-ID, Zeitstempel mit Zeitzonenbezug, Ergebnis, Änderungsgrund und Korrelations-ID. Integritätsschutz umfasst restriktive Administration, getrennte Speicherung, kryptografische Integritätsnachweise, regelmäßige Prüfungen und protokollierte Restore-Tests. Eine Hash-Verkettung allein begründet keine rechtliche oder technische Revisionssicherheit.

Freigegebene Inhalte werden als unveränderliche Versionen gespeichert; Korrekturen erzeugen Folgever­sionen. Archiv- und Exportpakete enthalten Dokument, Metadaten, Freigabenachweise und zugehörige Audit-Ereignisse.

Die elektronische Freigabe in der Anwendung ist zunächst ein interner Freigabenachweis. Eine Signatur-Adapter-Schnittstelle ermöglicht optional die Integration eines qualifizierten Vertrauensdiensteanbieters (QTSP) für fortgeschrittene oder qualifizierte elektronische Signaturen sowie Zeitstempel. Signaturvalidierung und langfristige Prüfbarkeit sind zu berücksichtigen. Eine interne Klickfreigabe darf nicht als qualifizierte elektronische Signatur bezeichnet werden.

## Gültigkeitslenkung und Verteilung

DistributionRule ordnet gültige Versionen Zielgruppen, Rollen, Standorten und Organisationseinheiten zu. Mitarbeiterzugriffe führen grundsätzlich auf die aktuelle gültige Version; abgelöste Versionen werden aus der Standardansicht entfernt und nur berechtigt im Archiv angezeigt. Kenntnisnahme und Unterweisung werden an Person und konkrete Dokumentversion gebunden. Externe Dokumente enthalten Quelle, Herausgeber, Ausgabestand, Prüfdatum, Verantwortlichen und betroffene Prozesse. ReviewTask steuert turnusmäßige und anlassbezogene Prüfungen. WithdrawalRecord protokolliert Außerkraftsetzung, Grund, Nachfolger und betroffene Verteilungskreise.

## Sicherheit und Governance

Produktivdaten gehören nicht in GitHub. Geheimnisse werden ausschließlich über Secret Stores bzw. sichere Umgebungsvariablen verwaltet. Rollen- und Freigaberechte werden serverseitig geprüft. Mandanten-/Organisationsgrenzen, Protokollzugriffe und administrative Sonderrechte sind ausdrücklich zu testen. Backup und Wiederherstellung umfassen Datenbank, Dokumentdateien, Versionen und Auditdaten.

## Aktueller Implementierungsumfang

- React/Vite/TypeScript-Grundgerüst
- Visueller Editor mit Beispielprozess, Knotenbearbeitung und Verbindungen
- Prozessstammdaten und Turtle-Beispielinhalte im lokalen UI-Zustand
- Light-/Dark-Modus (lokale Browserpräferenz)
- Cockpit- und Dokumentenlenkungs-Navigationsseiten als Prototyp

## Nicht implementiert

Backend, PostgreSQL, Authentifizierung, Mehrbenutzerbetrieb, zentrale Speicherung, produktive Prozessversionierung, produktive Turtle-Datenpflege, Dokumentenerstellung/-lenkung, Freigabe-Workflow, Audit-Trail, Signaturintegration, Verteilung, Kenntnisnahme, KI-Änderungsanalyse, Export und automatisierte Tests.

## Architekturentscheidungen mit Prüfbedarf

- React Flow Lizenzbedingungen für den konkreten Einsatz prüfen
- Hosting, Datenschutz, Informationssicherheit und Backupkonzept mit F&R abstimmen
- Dateispeicher und Schlüsselverwaltung festlegen
- Rollen- und Freigabematrix fachlich freigeben
- Aufbewahrungs- und Löschregeln definieren
- BPMN 2.0 Import/Export als spätere Interoperabilitätsoption bewerten
