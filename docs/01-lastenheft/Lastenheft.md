# Lastenheft – F&R Process Studio

**Dokument-ID:** LF-FRPS-001  
**Version:** 0.6  
**Stand:** 17.11.2026  
**Status:** Arbeitsstand – UI-Entwicklung

## 1. Ziel

F&R Process Studio ist eine browserbasierte Anwendung zur grafischen Modellierung, Verwaltung, verständlichen Darstellung und kontrollierten Änderung der Prozesslandschaft des IATF-Managementsystems von Friedrichs & Rath GmbH.

## 2. Projektentscheidungen

- Produktname: F&R Process Studio
- Grafischer Prozessdesigner mit intuitiver Drag-and-drop-Bedienung
- Entwicklung und Quellcodeverwaltung über GitHub
- Zwei klar getrennte Systembereiche: (1) IATF 16949 als eigenständiges Qualitätsmanagementsystem; (2) integriertes Managementsystem für Umwelt (ISO 14001), Energie (ISO 50001) und Arbeitsschutzprozesse angelehnt an ISO 45001.
- IATF 16949 wird gesondert geführt. Umweltmanagement nach ISO 14001 und Energiemanagement nach ISO 50001 bilden gemeinsam mit Arbeitsschutzprozessen angelehnt an ISO 45001 den integrierten Managementsystembereich. Die Anlehnung an ISO 45001 ist keine Aussage über eine Zertifizierung.
- Umschaltbare Light-/Dark-Oberfläche; Einstellung je Benutzer speichern
- Dezenter Copyright-Hinweis „© splash Syncworks“ auf allen Anwendungsseiten und eigenen Exportvorlagen
- Unternehmensdaten und produktive Datenhaltung strikt vom Quellcode-Repository trennen

## 3. Nutzergruppen

Administratoren, Geschäftsführung, IATF-/Qualitätsmanagement, integriertes Umwelt-, Energie- und Arbeitsschutzmanagement, Prozessverantwortliche, Führungskräfte, Mitarbeiter mit Leserechten sowie Auditoren mit kontrolliertem Zugriff.

## 4. Funktionale Anforderungen

### 4.1 Grafische Prozessmodellierung
Prozesse per Drag-and-drop erstellen, bearbeiten, verbinden und speichern. Mindestens Aktivitäten, Start-/Endereignisse, Entscheidungen, Verbindungen, Unterprozesse und Verantwortlichkeitsbereiche unterstützen.

### 4.2 Prozesslandkarte
Führungs-, Kern- und Unterstützungsprozesse übersichtlich darstellen und untereinander verknüpfen.

### 4.3 Turtle-Diagramm
Turtle-Darstellungen aus denselben strukturierten Prozessdaten erzeugen. Die Darstellung muss als professionelles, zusammenhängendes Prozessprofil mit zentralem Prozesskern und klar zugeordneten Feldern für Input, Output, Womit (Ressourcen), Mit wem (Rollen), Wie (Methoden) und Womit messen (Kennzahlen) aufgebaut sein. Risiken und Chancen werden ergänzend ausgewiesen. Felder müssen direkt bearbeitbar sein; fehlende oder nur beispielhafte Inhalte sind eindeutig zu kennzeichnen. Darstellung responsiv, druckfähig und für PDF-Ausgabe geeignet.

### 4.4 Prozesssteckbrief und Prozessbeschreibung
Aus den Prozessdaten einen strukturierten Steckbrief und einen Entwurf der Prozessbeschreibung erzeugen. Keine fehlenden Fakten erfinden; offene Angaben markieren. Veröffentlichung nur nach Prüfung und Freigabe.

### 4.5 Mitarbeiteransicht
Freigegebene Prozesse in einfacher, verständlicher Sprache darstellen. Prozessschritte, Rollen, relevante Arbeitsanweisungen und Dokumente sowie optionale Bilder/Videos unterstützen. Responsive Nutzung auf PC, Tablet und Smartphone.

### 4.6 Unterstützung des IATF-Managementsystems und integrierter Bereiche
IATF 16949 bildet den normativen Rahmen des führenden Managementsystems. Umwelt- und Energiemanagement werden integriert berücksichtigt. Arbeitsschutzprozesse können an ISO 45001 angelehnt abgebildet werden; dies darf nicht als Zertifizierung oder vollständige Normkonformität nach ISO 45001 dargestellt werden. Verantwortlichkeiten, Risiken und Chancen, Kennzahlen, Ziele, Maßnahmen und Nachweise werden dokumentiert. Zuordnungen müssen fachlich durch F&R geprüft werden.

### 4.7 Änderungsmanagement
Änderungswünsche in natürlicher Sprache erfassen. Auf Anfrage das Änderungsprotokoll mit offenen und abgeschlossenen Änderungen anzeigen. Eine KI darf betroffene Prozesse, Dokumente, Rollen, Kennzahlen, Risiken und Normzuordnungen analysieren und Änderungsvorschläge erstellen. Keine automatische Änderung oder Freigabe bereits genehmigter Inhalte. Jede Änderung benötigt menschliche Prüfung und Freigabe.

### 4.8 Versionierung und Freigaben
Version, Änderungsgrund, Ersteller, Prüfer, Freigeber, Zeitstempel und Status dokumentieren. Frühere freigegebene Versionen nachvollziehbar aufbewahren.

### 4.9 Export
Prozessdarstellungen und freigegebene Dokumente mindestens als PDF sowie geeignete Bild-/Vektorformate exportieren. Export mit Dokumentenkennung, Versionsstand und Status; eigene Vorlagen mit „© splash Syncworks“.

### 4.10 Benutzer- und Rechteverwaltung
Rollenbasierte Rechte. Mitarbeiter standardmäßig lesend auf freigegebene Inhalte; Bearbeitung, Prüfung und Freigabe getrennt berechtigen.

### 4.11 Themes
Light- und Dark-Modus für alle Module, je Benutzer speicherbar. Lesbarkeit und Kontrast in beiden Modi sicherstellen. Druckansicht gesondert optimieren.

### 4.12 Management-Cockpit
Prozessstatus, offene Änderungen, überfällige Prüfungen, fehlende Kennzahlen, Dokumentenstatus und offene Maßnahmen darstellen.

## 5. Nichtfunktionale Anforderungen

- Browserbasiert und responsiv
- Modular, wartbar und dokumentiert
- Keine zwingenden kostenpflichtigen Kernlizenzen; Lizenzen aller Abhängigkeiten prüfen
- Sichere Authentifizierung und Autorisierung
- Änderungs- und Freigabeprotokoll
- Datensicherung und Wiederherstellbarkeit
- Trennung von Quellcode, Geheimnissen, Konfiguration und Unternehmensdaten
- Datenschutz und Informationssicherheit gemäß F&R-Vorgaben
- Datenexport und Vermeidung proprietären Lock-ins

## 6. Abgrenzung

Keine automatische Zertifizierung, keine autonome KI-Freigabe und kein Ersatz für ERP/MES oder die fachliche Verantwortung der Prozesseigner.

## 7. Übergeordnete Abnahmekriterien

1. Berechtigte Nutzer können Prozesse grafisch erstellen, speichern, erneut öffnen und bearbeiten.
2. Turtle und Prozesssteckbrief basieren auf denselben Prozessdaten.
3. Mitarbeiter können freigegebene Prozesse ohne Bearbeitungsrechte lesen.
4. Änderungen können erfasst, analysiert, geprüft und freigegeben werden.
5. Frühere Versionen bleiben nachvollziehbar.
6. Light-/Dark-Modus bleibt je Benutzer gespeichert.
7. Exporte enthalten Versionsinformationen.
8. Unberechtigte Nutzer können keine geschützten Inhalte ändern oder freigeben.

## 8. Offene Punkte

- Hosting: interner Server, Cloud oder Pilotbetrieb
- Rollen- und Freigabematrix
- Import bestehender Prozesse und Dokumente
- F&R-spezifische Normen- und Auditmatrix
- Aufbewahrungs- und Löschfristen
- KI-Komponente und Betriebsmodell

## 9. Änderungsregel

Dieses Lastenheft ist das führende Anforderungsdokument. Jede neue oder geänderte Anforderung erhält eine ID, Datum, Begründung, Priorität und Status und wird in Anforderungsliste und Änderungshistorie nachgeführt.
