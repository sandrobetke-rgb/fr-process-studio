# Technische Spezifikation – F&R Process Studio

**Version:** 0.1 · **Stand:** 17.11.2026 · **Status:** Architekturvorschlag

## Zielbild
Browserbasierte, modular aufgebaute Webanwendung. Das Frontend ist ein React-/TypeScript-Projekt mit Vite. Die grafische Modellierung basiert auf @xyflow/react (React Flow). Die erste Version ist ein UI-Prototyp; zentrale Speicherung und Backend folgen.

## Vorgeschlagene Zielarchitektur
- Frontend: React, TypeScript, Vite, @xyflow/react
- Backend (geplant): Python FastAPI mit REST API
- Datenbank (geplant): PostgreSQL
- Betrieb (geplant): Docker; Zielumgebung nach Entscheidung von F&R
- CI (geplant): GitHub Actions für Build und Tests
- KI (später): austauschbare Schnittstelle; keine automatische Freigabe

## Datenmodell – erste fachliche Entitäten
Process, ProcessVersion, ProcessNode, ProcessEdge, TurtleField, Document, NormReference, Role, User, ChangeRequest, ChangeImpact, Approval, AuditEvent, KPI, Risk, Opportunity.

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
Backend, PostgreSQL, Authentifizierung, Mehrbenutzerbetrieb, zentrale Speicherung, Freigabe-Workflow, Audit-Trail, produktive Turtle-Datenpflege, KI-Änderungsanalyse, Export und automatisierte Tests.

## Architekturentscheidungen mit Prüfbedarf
- React Flow Lizenzbedingungen für den konkreten Einsatz prüfen
- Hosting und Backupkonzept mit IT/Datenschutz abstimmen
- Datenmodell und API vor produktiver Nutzung spezifizieren
- BPMN 2.0 Import/Export als spätere Interoperabilitätsoption bewerten