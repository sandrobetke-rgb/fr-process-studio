# F&R Process Studio

Browserbasierter Prototyp für grafisches Prozessmanagement mit zwei Systembereichen: IATF 16949 separat sowie integriertes Umwelt-, Energie- und Arbeitsschutzmanagement (angelehnt an ISO 45001) bei Friedrichs & Rath GmbH.

> **Status:** Früher Entwicklungsprototyp – nicht für produktive Managementsystemdaten oder Auditnachweise freigegeben.

## Lokaler Start

Voraussetzung: Node.js 20 oder neuer.

```bash
npm install
npm run dev
```

Build prüfen:

```bash
npm run build
```

## Enthalten
- Grafischer Prozessdesigner auf Basis von React Flow
- Beispielprozess, Knotenbearbeitung und Verbindungen
- Turtle-Ansicht mit klar gekennzeichneten Platzhaltern
- Management-Cockpit- und Dokumenten-Prototyp
- Light-/Dark-Modus

## Noch nicht enthalten
Backend, Datenbank, Authentifizierung, Mehrbenutzerbetrieb, zentrale Speicherung, Freigaben, Audit-Trail, KI-Änderungsanalyse und Export.

## Dokumentation
- [Lastenheft](docs/01-lastenheft/Lastenheft.md)
- [Anforderungsliste](docs/01-lastenheft/Anforderungsliste.md)
- [Änderungshistorie](docs/01-lastenheft/Aenderungshistorie.md)
- [Technische Spezifikation](docs/02-pflichtenheft/Technische-Spezifikation.md)
- [Architektur](docs/02-pflichtenheft/Architektur.md)
- [Testkonzept](docs/03-testkonzept/Testkonzept.md)

© splash Syncworks
