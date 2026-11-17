# Lastenheft – F&R Process Studio

**Dokument-ID:** LF-FRPS-001  
**Version:** 0.9  
**Stand:** 17.11.2026  
**Status:** Arbeitsstand – UI-Prototyp

## 1. Ziel

F&R Process Studio ist eine browserbasierte Anwendung zur grafischen Modellierung, Verwaltung, verständlichen Darstellung und kontrollierten Änderung der Prozesslandschaft sowie der gelenkten dokumentierten Informationen von Friedrichs & Rath GmbH.

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

### 4.5 Dokumentenerstellung und Dokumentenlenkung

Die Anwendung muss gelenkte Dokumente direkt erstellen, bearbeiten, versionieren, prüfen, freigeben, veröffentlichen und archivieren können. Dokumentarten müssen mindestens Verfahrensanweisungen (VA), Arbeitsanweisungen (AA), Prozessbeschreibungen und Prozesssteckbriefe, Prüfanweisungen, Prüfpläne, Formblätter, Checklisten, Nachweisvorlagen und Betriebsanweisungen unterstützen. Weitere Dokumentarten müssen administrativ ergänzbar sein.

Dokumente müssen über eindeutige Dokumentenkennung, Titel, Dokumentart, Systembereich (IATF 16949 oder integrierter Umwelt-/Energie-/Arbeitsschutzbereich), Prozesse, Prozessschritte, Verantwortliche, Ersteller, Prüfer, Freigeber, Version, Status, Erstell-/Freigabedatum und nächstes Prüfdatum verwaltet werden können. Ein Dokument kann mehreren Prozessen oder Prozessschritten zugeordnet sein; ein Prozess kann mehrere Dokumente referenzieren. Zuordnungen müssen in Prozessansicht, Turtle/Steckbrief und Dokumentenübersicht sichtbar sein.

Vorlagen mit einheitlichem F&R-Layout und „© splash Syncworks“ unterstützen. Dokumente müssen als Entwurf erstellt und bearbeitet werden können; Freigabe und Veröffentlichung erfolgen ausschließlich über definierte menschliche Rollen. Alte Versionen bleiben nachvollziehbar und dürfen nicht unbemerkt überschrieben werden. Ersetzte Versionen werden als ungültig/abgelöst gekennzeichnet und bleiben gemäß Aufbewahrungsregeln historisch verfügbar. Dokumente müssen mit Anlagen, Bildern und relevanten Medien verknüpft werden können. PDF-Export mit Dokumentenmetadaten ist vorzusehen.

Die Dokumentenlenkung umfasst zusätzlich die Steuerung des gesamten gültigen Dokumentenbestands:

- Zentrales Dokumentenregister mit eindeutiger Kennung, Titel, Typ, Systembereich, Prozesseigner, Dokumentenverantwortlichem, Version, Status, Freigabe-/Gültigkeitsdatum, nächstem Prüftermin und Aufbewahrungsregel.
- Gültigkeits- und Verteilungssteuerung: Veröffentlichung der gültigen Fassung an definierte Zielgruppen, Standorte, Abteilungen und Rollen. Zugriff auf abgelöste Fassungen ist auf berechtigte Rollen (z. B. QM/Auditoren) zu begrenzen und deutlich als ungültig zu kennzeichnen.
- Vermeidung der Nutzung veralteter Fassungen: zentrale Verlinkung statt unkontrollierter Dateikopien, sichtbarer Gültigkeitsstatus, automatische Sperrung/Entzug der alten Mitarbeiteransicht bei Ablösung und nachvollziehbare Information betroffener Nutzer.
- Kenntnisnahme/Unterweisung: je Dokument oder Zielgruppe konfigurierbare Lesebestätigung und – falls erforderlich – dokumentierte Unterweisung mit Person, Dokumentversion, Datum, Ergebnis und ggf. Wirksamkeitsprüfung.
- Externe Dokumente: gelenkte Verwaltung externer Vorgaben und Referenzdokumente (Quelle, Herausgeber, Ausgabestand, Gültigkeitsprüfung, Verantwortlicher, Prüftermin, betroffene Prozesse) einschließlich Änderungsüberwachung, soweit technisch verfügbar.
- Regelmäßige und anlassbezogene Dokumentenprüfung mit Wiedervorlage, Erinnerungen, Eskalation, Prüfergebnis und dokumentierter Entscheidung „weiter gültig“, „ändern“ oder „zurückziehen“.
- Geordnete Außerkraftsetzung und Archivierung: Dokumente werden nicht spurlos gelöscht. Rückzug, Ersetzungsdokument, Grund, Datum und betroffene Prozesse/Zielgruppen bleiben nachvollziehbar.
- Massenänderungen, Dokumentenlisten und Statusberichte: Filter nach Dokumentart, Systembereich, Prozess, Standort, Verantwortlichem, Status und Fälligkeit; Export einer aktuellen gelenkten Dokumentenliste.
- Notfall-/Sofortänderungen mit gesondertem beschleunigtem Workflow, klarer Kennzeichnung, nachträglicher regulärer Prüfung und vollständiger Protokollierung.

### 4.6 Mitarbeiteransicht

Freigegebene Prozesse in einfacher, verständlicher Sprache darstellen. Prozessschritte, Rollen, relevante Arbeitsanweisungen und Dokumente sowie optionale Bilder/Videos unterstützen. Responsive Nutzung auf PC, Tablet und Smartphone.

### 4.7 Unterstützung der zwei Systembereiche

IATF 16949 bildet den normativen Rahmen des eigenständigen Qualitätsmanagementbereichs. Umwelt- und Energiemanagement werden im integrierten Bereich gemeinsam mit Arbeitsschutzprozessen angelehnt an ISO 45001 berücksichtigt. Dies darf nicht als Zertifizierung oder vollständige Normkonformität nach ISO 45001 dargestellt werden. Verantwortlichkeiten, Risiken und Chancen, Kennzahlen, Ziele, Maßnahmen und Nachweise werden dokumentiert. Zuordnungen müssen fachlich durch F&R geprüft werden.

### 4.8 Änderungsmanagement

Änderungswünsche in natürlicher Sprache erfassen. Auf Anfrage das Änderungsprotokoll mit offenen und abgeschlossenen Änderungen anzeigen. Eine KI darf betroffene Prozesse, Dokumente, Rollen, Kennzahlen, Risiken und Normzuordnungen analysieren und Änderungsvorschläge erstellen. Keine automatische Änderung oder Freigabe bereits genehmigter Inhalte. Jede Änderung benötigt menschliche Prüfung und Freigabe.

### 4.9 Revisionssicherheit, Workflow und elektronische Freigabe/Signatur

Die Dokumentenlenkung muss eine nachvollziehbare, gegen unbemerkte nachträgliche Veränderung geschützte Dokumenten- und Freigabehistorie gewährleisten. Der Begriff „revisionssicher“ ist als überprüfbares Schutzziel umzusetzen; die tatsächliche Eignung ist vor Produktivsetzung anhand der F&R-Anforderungen, Aufbewahrungsregeln und rechtlichen Vorgaben zu validieren.

Der Workflow muss konfigurierbar sein und mindestens folgende Schritte unterstützen: Entwurf/Erstellung → fachliche Prüfung → Qualitäts-/Systemprüfung (falls erforderlich) → Freigabe → Veröffentlichung → regelmäßige oder anlassbezogene Überprüfung → Änderung/Ablösung/Archivierung. Rückweisung mit Kommentar, erneute Einreichung, Stellvertretung, Eskalation und Erinnerungen bei Fristüberschreitung sind vorzusehen. Rollen und Verantwortlichkeiten müssen je Dokumentart und Systembereich konfigurierbar sein. Funktionstrennung ist sicherzustellen: Ersteller dürfen ihre eigenen Dokumente nicht allein freigeben, sofern keine ausdrücklich genehmigte Ausnahme-Regel existiert.

Jede Freigabe muss eindeutig einer authentifizierten Person, der konkreten unveränderlichen Dokumentversion und einem Zeitstempel zugeordnet sein. Vor Freigabe müssen Dokument-ID, Titel, Version und Änderungsstand sichtbar sein. Die freigebende Person muss ihre Freigabeabsicht aktiv bestätigen; für risikorelevante Freigaben ist eine erneute Authentifizierung (z. B. MFA) vorzusehen. Freigabeprotokoll und Signaturinformationen müssen zusammen mit der freigegebenen Version exportierbar und langfristig prüfbar sein.

Das Audit-Trail muss mindestens Erstellen, Anzeigen/Herunterladen soweit relevant, Bearbeiten, Einreichen, Prüfen, Kommentieren, Zurückweisen, Freigeben, Veröffentlichen, Ablösen, Archivieren, Berechtigungsänderungen und fehlgeschlagene Freigabeversuche protokollieren. Einträge enthalten handelnde Identität, Aktion, Objekt und Version, Datum/Uhrzeit mit Zeitzonenbezug, Ergebnis sowie bei Änderungen den Grund. Protokolle dürfen durch normale Benutzer und Administratoren nicht unbemerkt verändert oder gelöscht werden. Technische Maßnahmen wie append-only Speicherung, Hash-Prüfungen/Verkettung, restriktive Administration und regelmäßige Integritätsprüfungen sind vorzusehen.

Freigegebene Dokumentdateien und Metadaten müssen unveränderlich versioniert werden. Jede Änderung erzeugt eine neue Version; die alte freigegebene Fassung bleibt mit ihrem Freigabenachweis erhalten. Integritätsprüfungen, revisionsfähige Exporte, Aufbewahrungs- und Löschregeln, Backups und regelmäßig getestete Wiederherstellung sind verpflichtend zu spezifizieren. Ein Archiv muss Dokumente einschließlich Metadaten, Freigaben und Auditnachweisen auch nach Benutzerwechseln oder Systemmigration lesbar und prüfbar halten.

Die Anwendung muss mindestens eine interne elektronische Freigabe mit belastbarem Nachweis unterstützen. Zusätzlich ist eine optionale Anbindung an einen qualifizierten Vertrauensdiensteanbieter für fortgeschrittene oder qualifizierte elektronische Signaturen vorzusehen. Die Signaturstufe ist je Dokumentart/Anwendungsfall festlegbar. Eine interne Klickfreigabe darf nicht als qualifizierte elektronische Signatur bezeichnet werden. Auswahl des Signaturverfahrens und rechtliche Eignung sind vor Einsatz mit F&R zu validieren.

### 4.10 Versionierung und Freigaben

Version, Änderungsgrund, Ersteller, Prüfer, Freigeber, Zeitstempel und Status dokumentieren. Frühere freigegebene Versionen nachvollziehbar aufbewahren.

### 4.11 Export

Prozessdarstellungen und freigegebene Dokumente mindestens als PDF sowie geeignete Bild-/Vektorformate exportieren. Export mit Dokumentenkennung, Versionsstand und Status; eigene Vorlagen mit „© splash Syncworks“.

### 4.12 Benutzer- und Rechteverwaltung

Rollenbasierte Rechte. Mitarbeiter standardmäßig lesend auf freigegebene Inhalte; Bearbeitung, Prüfung und Freigabe getrennt berechtigen.

### 4.13 Themes

Light- und Dark-Modus für alle Module, je Benutzer speicherbar. Lesbarkeit und Kontrast in beiden Modi sicherstellen. Druckansicht gesondert optimieren.

### 4.14 Management-Cockpit

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
3. Dokumente der definierten Dokumentarten können erstellt, versioniert und Prozessen sowie Prozessschritten zugeordnet werden.
4. Dokumente durchlaufen einen geregelten Prüf- und Freigabeprozess; historische Versionen bleiben nachvollziehbar.
5. Jede Freigabe ist einer Person und exakt einer Dokumentversion zugeordnet und mit Zeitstempel und Auditnachweis exportierbar.
6. Normale Benutzer können freigegebene Fassungen und Auditprotokolle nicht unbemerkt verändern oder löschen.
7. Mitarbeiter können freigegebene Prozesse ohne Bearbeitungsrechte lesen.
8. Änderungen können erfasst, analysiert, geprüft und freigegeben werden.
9. Frühere Versionen bleiben nachvollziehbar.
10. Light-/Dark-Modus bleibt je Benutzer gespeichert.
11. Exporte enthalten Versionsinformationen.
12. Unberechtigte Nutzer können keine geschützten Inhalte ändern oder freigeben.

## 8. Offene Punkte

- Hosting: interner Server, Cloud oder Pilotbetrieb
- Rollen- und Freigabematrix
- Import bestehender Prozesse und Dokumente
- F&R-spezifische Normen- und Auditmatrix
- Aufbewahrungs- und Löschfristen
- KI-Komponente und Betriebsmodell

## 9. Änderungsregel

Dieses Lastenheft ist das führende Anforderungsdokument. Jede neue oder geänderte Anforderung erhält eine ID, Datum, Begründung, Priorität und Status und wird in Anforderungsliste und Änderungshistorie nachgeführt.
