# Fachliches Datenmodell – F&R Process Studio

**Version:** 0.1 · **Stand:** 17.11.2026 · **Status:** Entwurf zur fachlichen und technischen Prüfung

## 1. Modellierungsgrundsätze
1. Zwei getrennte Systembereiche: IATF 16949 sowie integriertes Managementsystem aus ISO 14001, ISO 50001 und Arbeitsschutzprozessen angelehnt an ISO 45001.
2. Mehrfachbezüge werden über Verknüpfungstabellen modelliert.
3. Stammdaten und freizugebende Versionen sind getrennt.
4. Freigegebene Versionen sind unveränderlich; Änderungen erzeugen neue Versionen.
5. Dokument-Prozess- und Dokument-Prozessschritt-Beziehungen sind n:m.
6. Freigaben, Kenntnisnahmen und Unterweisungen referenzieren eine konkrete Version.
7. Fachlich relevante Aktionen erzeugen Audit-Ereignisse; Sicherheitsregeln werden serverseitig erzwungen.
8. Produktivdaten, Dokumentdateien und Geheimnisse liegen nicht im GitHub-Repository.

## 2. Organisation und Berechtigungen
| Entität | Zweck | Wesentliche Attribute |
|---|---|---|
| OrganizationUnit | Abteilung/Bereich | ID, Name, übergeordnete Einheit, Status |
| Site | Standort | ID, Name, Adresse, Zeitzone, Status |
| User | Benutzerkonto | ID, externe Identität, Anzeigename, E-Mail, Status |
| Role | Fachliche Rolle | ID, Name, Beschreibung |
| Permission | Einzelberechtigung | ID, Ressource, Aktion |
| UserRole | Benutzer-Rollen-Zuordnung | User, Role, Gültigkeit |
| RolePermission | Rollenberechtigung | Role, Permission |
| UserScope | Geltungsbereich | Benutzer/Rolle, Standort, Organisationseinheit, Systembereich |

Berechtigungen gelten nach dem Prinzip „standardmäßig verweigern“ und werden serverseitig geprüft. Rollenbeispiele: Administrator, IATF-QM, IMS-Verantwortlicher, Prozessverantwortlicher, Dokumentenverantwortlicher, Fachprüfer, Systemprüfer, Freigeber, Mitarbeiter-Leser, Auditor. Die endgültige Rollen- und Freigabematrix ist durch F&R festzulegen.

## 3. Systembereiche und Normbezüge
| Entität | Zweck | Wesentliche Attribute |
|---|---|---|
| ManagementSystemArea | Eigenständiger Systembereich | ID, Code, Name, Beschreibung, Aktiv |
| StandardReference | Norm-/Regelwerksreferenz | ID, Bezeichnung, Ausgabe, Abschnitt, Quelle |
| AreaStandard | Normzuordnung | Area, Standard, Gültigkeit |
| ProcessAreaLink | Prozess-Systembereichsbezug | Process/ProcessVersion, Area |
| DocumentAreaLink | Dokument-Systembereichsbezug | Document/DocumentVersion, Area |

Initiale Bereiche:
- IATF_QM: eigenständiger Qualitätsmanagementbereich nach IATF 16949.
- IMS_ENV_ENERGY_OHS: integrierter Bereich für ISO 14001, ISO 50001 und Arbeitsschutzprozesse angelehnt an ISO 45001.

Die Anlehnung an ISO 45001 darf nicht als Zertifizierungsstatus oder bestätigte vollständige Normkonformität ausgegeben werden.

## 4. Prozessmanagement
| Entität | Zweck | Wesentliche Attribute |
|---|---|---|
| Process | Prozessstamm | ID, Prozessnummer, Status, Eigentümer |
| ProcessVersion | Unveränderlicher Prozessstand | ID, ProcessID, Versionsnummer, Name, Ziel, Beschreibung, Status, Ersteller, Freigabezeit |
| ProcessNode | Prozessschritt/Ereignis | ID, ProcessVersionID, Typ, Titel, Beschreibung, Rolle, Position |
| ProcessEdge | Verbindung | ID, ProcessVersionID, Quellknoten, Zielknoten, Bedingung |
| TurtleField | Turtle-Feld | ID, ProcessVersionID, Feldtyp, Inhalt, Vollständigkeitsstatus |
| ProcessRisk | Prozessrisiko | ID, ProcessVersionID, Beschreibung, Bewertung, Maßnahme, Verantwortlicher |
| ProcessOpportunity | Prozesschance | ID, ProcessVersionID, Beschreibung, Bewertung, Maßnahme, Verantwortlicher |
| KPI | Kennzahl | ID, Name, Definition, Einheit, Messmethode, Zielwert |
| ProcessKpiLink | Kennzahlzuordnung | ProcessVersionID, KPI, Verantwortlicher, Messintervall |
| ProcessInterface | Prozessschnittstelle | ID, Quellprozess, Zielprozess, Eingabe, Ausgabe, Verantwortlicher |

TurtleField verwendet die festen Feldtypen INPUT, OUTPUT, RESOURCES, ROLES, METHODS oder MEASUREMENT. Risiken und Chancen werden separat strukturiert. Prozessdesigner, Turtle, Prozesssteckbrief und Mitarbeiteransicht lesen denselben freigegebenen ProcessVersion-Datensatz.

## 5. Dokumentenlenkung
| Entität | Zweck | Wesentliche Attribute |
|---|---|---|
| DocumentType | Konfigurierbare Dokumentart | ID, Code, Name, Vorlage, Workflowprofil, Standardprüfintervall |
| DocumentMaster | Dokumentstamm | ID, Dokumentnummer, Titel, DocumentType, Eigentümer, Status |
| DocumentVersion | Konkrete Inhaltsfassung | ID, DocumentMasterID, Versionsnummer, Inhalt/Dateireferenz, Änderungsgrund, Ersteller, Erstellzeit, Hash, Status |
| DocumentAttachment | Anlage | ID, DocumentVersionID, Dateireferenz, Medientyp, Hash |
| DocumentProcessLink | Dokument-Prozess-Zuordnung | DocumentVersionID, ProcessVersionID, Zuordnungstyp |
| DocumentStepLink | Dokument-Prozessschritt-Zuordnung | DocumentVersionID, ProcessNodeID, Zuordnungstyp |
| DocumentExternalSource | Externe Quelle | DocumentMasterID, Herausgeber, Quelle, externe Ausgabe, Abrufdatum |
| DocumentReviewTask | Prüfauftrag | DocumentVersionID, Verantwortlicher, Fälligkeit, Ergebnis, Abschlusszeit |
| DocumentWithdrawal | Rückzug | DocumentMasterID, Version, Grund, Datum, Nachfolger |
| RetentionRule | Aufbewahrungsregel | ID, Bezeichnung, Dauer, Auslöser, Archiv-/Löschregel |

Dokumentarten initial: VA, AA, Prozessbeschreibung, Prozesssteckbrief, Prüfanweisung, Prüfplan, Formblatt, Checkliste, Nachweisvorlage, Betriebsanweisung. DocumentType ist administrativ erweiterbar. Dokumente können mehreren Prozessen und Prozessschritten zugeordnet sein.

## 6. Workflow und Freigabe
| Entität | Zweck | Wesentliche Attribute |
|---|---|---|
| WorkflowDefinition | Workflowvorlage | ID, Dokumentart, Systembereich, Version, aktiv |
| WorkflowState | Statusdefinition | WorkflowDefinitionID, Code, Name, Reihenfolge |
| WorkflowTransition | Erlaubter Statusübergang | Von, Nach, erlaubte Rolle, Bedingungen |
| WorkflowInstance | Laufender Workflow | ID, Objektversion, WorkflowDefinition, Status, Startzeit |
| WorkflowTask | Zugewiesene Aufgabe | ID, WorkflowInstanceID, Rolle/Benutzer, Frist, Status |
| WorkflowComment | Prüf-/Rückweisungskommentar | ID, Task, Benutzer, Text, Zeit |
| Approval | Freigabeentscheidung | ID, Objektversion, Benutzer, Entscheidung, Zeit, Authentifizierungsstärke |
| ApprovalEvidence | Freigabenachweis | ApprovalID, Dokumenthash, angezeigte Version, aktive Bestätigung, Signaturreferenz |
| Delegation | Stellvertretung | Vertretender, Vertretener, Umfang, Beginn, Ende, Genehmiger |
| SignatureProviderEvent | Signaturdienstereignis | Anbieter, Transaktions-ID, Signaturtyp, Validierungsstatus, Zeitstempel |

Workflowzustände sind konfigurierbar. Mindestfolge: Entwurf, Fachprüfung, Systemprüfung falls erforderlich, Freigabe, Veröffentlichung und regelmäßige/anlassbezogene Prüfung. Rückweisung und Notfallworkflow sind eigene Pfade. Jede Freigabe wird serverseitig an exakt eine unveränderliche Version gebunden.

## 7. Verteilung, Kenntnisnahme und Unterweisung
| Entität | Zweck | Wesentliche Attribute |
|---|---|---|
| DistributionRule | Verteilregel | Dokumentversion, Standort, Organisationseinheit, Rolle/Zielgruppe |
| DistributionEvent | Veröffentlichungs-/Benachrichtigungsnachweis | Regel, Empfänger, Zeitpunkt, Kanal, Ergebnis |
| Acknowledgement | Kenntnisnahme | Benutzer, DocumentVersion, Zeitpunkt, Erklärung, Ergebnis |
| TrainingRecord | Unterweisung | Benutzer, DocumentVersion, Unterweisender, Datum, Methode, Ergebnis |
| EffectivenessCheck | Wirksamkeitsprüfung | TrainingRecord, Prüfer, Termin, Ergebnis, Maßnahme |

Kenntnisnahme und Unterweisung referenzieren die konkrete Dokumentversion, nicht nur den Dokumentstamm.

## 8. Änderungen und Audit
| Entität | Zweck | Wesentliche Attribute |
|---|---|---|
| ChangeRequest | Änderungsantrag | ID, Antragsteller, Anlass, Beschreibung, Priorität, Status |
| ChangeImpact | Betroffenheitsanalyse | ChangeRequest, Objekttyp, Objektversion, Begründung, Vorschlag, Prüfergebnis |
| AuditEvent | Ereignisprotokoll | ID, Akteur, Aktion, Objekt, Version, Zeitstempel, Ergebnis, Grund, Korrelations-ID |
| IntegrityCheckpoint | Integritätsprüfpunkt | Zeitpunkt, Umfang, Hash/Signatur, Prüfergebnis |
| ArchivePackage | Archivpaket | ID, Objektversionen, Metadaten, Auditbezug, Hash, Erstellzeit |

AuditEvent ist append-only und zusätzlich organisatorisch/technisch zu schützen. Hash-Verkettung allein ist kein Nachweis rechtlicher Revisionssicherheit. Anzeige-/Download-Protokollierung ist hinsichtlich Zweck, Datenschutz und Aufbewahrung zu entscheiden.

## 9. Zentrale Beziehungen
- Process 1:n ProcessVersion.
- ProcessVersion 1:n ProcessNode, ProcessEdge, TurtleField, ProcessRisk, ProcessOpportunity und ProcessKpiLink.
- DocumentMaster 1:n DocumentVersion.
- DocumentVersion n:m ProcessVersion über DocumentProcessLink.
- DocumentVersion n:m ProcessNode über DocumentStepLink.
- DocumentVersion n:m ManagementSystemArea über DocumentAreaLink.
- DocumentVersion 1:n DocumentAttachment, WorkflowInstance, Approval, DocumentReviewTask und DistributionRule.
- DocumentVersion 1:n Acknowledgement und TrainingRecord.
- ChangeRequest 1:n ChangeImpact.
- Fachliche Aktionen und Statuswechsel erzeugen AuditEvent-Einträge.

## 10. Datenintegrität und technische Leitplanken
- UUID-Primärschlüssel; Prozess- und Dokumentnummern zusätzlich eindeutig.
- Fremdschlüssel und Unique Constraints in PostgreSQL erzwingen.
- Zeitstempel in UTC speichern und mit Benutzer-/Standortzeitzone darstellen.
- Versionsnummern pro Stammobjekt eindeutig und monoton vergeben.
- Freigegebene Versionen gegen UPDATE/DELETE schützen; Korrektur nur über neue Version.
- Dateien außerhalb des Git-Repositories speichern; Datenbank hält Metadaten, Speicherort und Hash.
- Löschung nur nach genehmigter Aufbewahrungs-/Datenschutzregel; gesetzliche Löschpflichten gesondert berücksichtigen.
- Datenbankmigrationen versionieren; produktive Migrationen mit Backup und Wiederherstellungsplan.

## 11. Noch fachlich zu entscheiden
1. Rollen- und Freigabematrix je Dokumentart und Systembereich.
2. Dokumentnummernlogik und Versionsschema.
3. Aufbewahrungs- und Löschfristen je Dokumentklasse.
4. Verbindlichkeit von Kenntnisnahme und Unterweisung je Dokumentart.
5. Standorte, Abteilungen und Zielgruppen für die Verteilung.
6. Signaturstufe und QTSP-Auswahl je Anwendungsfall.
7. Hosting, Speicherort, Backupziel und Wiederherstellungszeiten.
8. Umgang mit personenbezogenen Auditdaten und Anzeige-/Download-Protokollierung.
