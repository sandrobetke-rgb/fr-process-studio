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

## Backend-Grundlage (Entwicklungsstand)

Das FastAPI-Backend und die PostgreSQL-Entwicklungsumgebung sind vorbereitet. Das relationale Basisschema wird mit Alembic versioniert. Die ersten API-Endpunkte umfassen Healthcheck, Systembereiche sowie Prozessanlage und -abruf.

Lokaler Start mit Docker Compose (Docker erforderlich):

```bash
docker compose up --build
```

API-Dokumentation im lokalen Entwicklungsbetrieb: http://localhost:8000/docs

Ohne Docker kann das Backend separat gestartet werden:

```bash
cd backend
python -m venv .venv
# virtuelle Umgebung aktivieren
pip install -r requirements.txt
# DATABASE_URL und ENVIRONMENT gemäß .env.example setzen
alembic -c alembic.ini upgrade head
uvicorn app.main:app --reload
```

Die Standard-Zugangsdaten in `docker-compose.yml` sind ausschließlich für lokale Entwicklung vorgesehen und müssen vor jedem gemeinsam erreichbaren oder produktiven Betrieb ersetzt werden.

## Noch nicht produktionsreif / noch nicht implementiert
Authentifizierung, produktive Rollen- und Rechteverwaltung, Mehrbenutzer-Funktionstests, vollständige Prozessversionierung/Freigabe, Dokumentenerstellung und -lenkung, Workflow, belastbarer Audit-Schutz, Signaturintegration, Verteilung, Kenntnisnahme, KI-Änderungsanalyse und Export. Die aktuelle API ist ein Entwicklungsfundament und darf nicht ungeschützt öffentlich bereitgestellt werden.

## Dokumentation
- [Lastenheft](docs/01-lastenheft/Lastenheft.md)
- [Anforderungsliste](docs/01-lastenheft/Anforderungsliste.md)
- [Änderungshistorie](docs/01-lastenheft/Aenderungshistorie.md)
- [Technische Spezifikation](docs/02-pflichtenheft/Technische-Spezifikation.md)
- [Architektur](docs/02-pflichtenheft/Architektur.md)
- [Fachliches Datenmodell](docs/02-pflichtenheft/Datenmodell.md)
- [Testkonzept](docs/03-testkonzept/Testkonzept.md)

© splash Syncworks
