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

## Zusätzliche Tests für die vollständige Dokumentenlenkung
1. Dokumentenregister zeigt ausschließlich aktuelle Gültigkeitsinformationen als Standardansicht.
2. Bei Ablösung wird die alte Fassung aus der Mitarbeiteransicht entfernt und als ungültig markiert.
3. Zielgruppen, Standorte und Rollen erhalten die für sie gültigen Fassungen.
4. Kenntnisnahme und Unterweisung sind an die exakte Dokumentversion gebunden und exportierbar.
5. Überfällige Prüfungen lösen Erinnerungen und definierte Eskalationen aus.
6. Externe Dokumente zeigen Quelle, Ausgabestand, Verantwortlichen und letzten Prüfstatus.
7. Außerkraftsetzung und Archivierung lassen Dokument, Grund, Nachfolger und Historie nachvollziehen.
8. Notfalländerungen durchlaufen den Sonderworkflow und werden anschließend regulär überprüft.

## Zusätzliche Workflow-, Audit- und Signaturtests
1. Workflow erzwingt die konfigurierte Reihenfolge und Zuständigkeiten.
2. Ersteller können ihre eigenen Dokumente nicht unzulässig selbst freigeben.
3. Rückweisung, Kommentar, Wiedervorlage, Vertretung und Eskalation werden korrekt protokolliert.
4. Jede Freigabe ist eindeutig einer authentifizierten Person und einer bestimmten Dokumentversion zugeordnet.
5. Nachträgliche Änderungen an freigegebenen Dateien oder Audit-Ereignissen werden erkannt bzw. verhindert.
6. Hash-/Integritätsprüfung erkennt manipulierte Archivobjekte.
7. Audit- und Freigabenachweise lassen sich vollständig exportieren und einer Dokumentversion zuordnen.
8. Signatur-Adapter validiert Signaturstatus und Zertifikatskette, sofern ein QTSP angebunden ist.
9. Backup und Wiederherstellung erhalten Dokumente, Versionen, Workflow- und Auditdaten.

## Spätere automatisierte Tests
- Unit-Tests für Prozessmodell und Validierungsregeln
- API- und Berechtigungstests
- Versionierungs- und Freigabetests
- Datenmigration und Backup-/Restore-Test
- End-to-End-Tests für zentrale Nutzerabläufe

## Abnahmeregel
Ein Prototyp-Test ist keine Freigabe für den produktiven IMS-Einsatz. Produktivsetzung erst nach Sicherheits-, Datenschutz-, Rollen-, Backup-, Workflow-, Audit- und Signaturprüfung. Revisionssicherheit ist durch dokumentierte Abnahmetests und eine fachliche/rechtliche Bewertung nachzuweisen.