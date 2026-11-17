# Testkonzept – F&R Process Studio

## Ziel
Nachweisen, dass Funktionen fachlich korrekt, nachvollziehbar und mit den festgelegten Berechtigungen arbeiten.

## Erste manuelle Tests
1. Anwendung startet mit npm install und npm run dev.
2. Prozessdesigner zeigt Beispielprozess mit Knoten und Verbindungen.
3. Nutzer kann Knoten verschieben und auswählen.
4. Nutzer kann einen Prozessschritt hinzufügen.
5. Verbindungen können zwischen passenden Handles erstellt werden.
6. Eigenschaften des ausgewählten Knotens lassen sich ändern.
7. Turtle-Ansicht zeigt Prozessstammdaten und markiert offene Platzhalter.
8. Light-/Dark-Modus lässt sich umschalten und bleibt beim Neuladen lokal erhalten.
9. Darstellung ist auf Desktop und schmalen Displays nutzbar.

## Zusätzliche Dokumentenlenkungs-Tests
1. VA, AA und weitere konfigurierte Dokumentarten lassen sich aus Vorlagen als Entwurf anlegen.
2. Ein Dokument lässt sich einem oder mehreren Prozessen und Prozessschritten zuordnen.
3. Dokumente sind aus der Prozessansicht auffindbar und umgekehrt.
4. Freigegebene Versionen können nicht direkt überschrieben werden; Änderungen erzeugen eine neue Version.
5. Nur berechtigte Rollen können prüfen, freigeben und veröffentlichen.
6. Ablösung, Prüfdatum, Änderungsgrund und Historie sind nachvollziehbar.
7. PDF-Ausgabe enthält Dokumenten-ID, Version, Status und F&R-Kennzeichnung.

## Spätere automatisierte Tests
- Unit-Tests für Prozessmodell und Validierungsregeln
- API- und Berechtigungstests
- Versionierungs- und Freigabetests
- Datenmigration und Backup-/Restore-Test
- End-to-End-Tests für zentrale Nutzerabläufe

## Abnahmeregel
Ein Prototyp-Test ist keine Freigabe für den produktiven IMS-Einsatz. Produktivsetzung erst nach Sicherheits-, Datenschutz-, Rollen-, Backup- und Fachprüfung.