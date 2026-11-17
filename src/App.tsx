import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow, Background, Controls, MiniMap, addEdge, applyEdgeChanges,
  applyNodeChanges, Handle, Position, type Node, type Edge, type Connection,
  type NodeProps, type NodeChange, type EdgeChange
} from '@xyflow/react';
import {
  Moon, Sun, Plus, LayoutDashboard, Workflow, FileText, Settings, Users,
  ShieldCheck, ArrowDownToLine, CircleHelp, ChevronRight, Gauge,
  Boxes, UserRound, ClipboardList, Target, AlertTriangle, PackageCheck
} from 'lucide-react';

type ProcessData = { label: string; role: string; detail: string; kind: 'start' | 'task' | 'decision' | 'end' };
type TurtleField = { title: string; subtitle: string; content: string; icon: string };
function ProcessNode({ data }: NodeProps<Node<ProcessData>>) {
  return <div className={`process-node node-${data.kind}`}>
    {data.kind !== 'start' && <Handle type="target" position={Position.Left} />}
    <small>{data.kind === 'task' ? 'PROZESSSCHRITT' : data.kind === 'decision' ? 'ENTSCHEIDUNG' : data.kind === 'start' ? 'START' : 'ABSCHLUSS'}</small>
    <strong>{data.label}</strong>
    <span>{data.role || 'Rolle offen'}</span>
    {data.detail && <p>{data.detail}</p>}
    {data.kind !== 'end' && <Handle type="source" position={Position.Right} />}
  </div>;
}
const nodeTypes = { process: ProcessNode };
const initialNodes: Node<ProcessData>[] = [
  { id: 'n1', type: 'process', position: { x: 80, y: 160 }, data: { label: 'Start', role: 'Anforderung liegt vor', detail: '', kind: 'start' } },
  { id: 'n2', type: 'process', position: { x: 330, y: 160 }, data: { label: 'Anforderung prüfen', role: 'Prozessverantwortlicher', detail: 'Eingang und Vollständigkeit prüfen', kind: 'task' } },
  { id: 'n3', type: 'process', position: { x: 620, y: 160 }, data: { label: 'Freigabe erteilen', role: 'Führungskraft', detail: 'Entscheidung dokumentieren', kind: 'decision' } },
  { id: 'n4', type: 'process', position: { x: 910, y: 160 }, data: { label: 'Abschluss', role: 'Prozessverantwortlicher', detail: '', kind: 'end' } }
];
const initialEdges: Edge[] = [
  { id: 'e1', source: 'n1', target: 'n2', animated: true },
  { id: 'e2', source: 'n2', target: 'n3', animated: true },
  { id: 'e3', source: 'n3', target: 'n4', animated: true }
];
const initialTurtle: TurtleField[] = [
  { title: 'Womit?', subtitle: 'Ressourcen & Infrastruktur', content: 'ERP-System und digitale Auftragsdaten\nArbeitsplätze und IT-Infrastruktur\nFreigegebene Formulare und Vorlagen', icon: 'resources' },
  { title: 'Mit wem?', subtitle: 'Rollen & Verantwortlichkeiten', content: 'Prozessverantwortlicher\nVertrieb / Kundenservice\nFachabteilungen nach Bedarf', icon: 'people' },
  { title: 'Wie?', subtitle: 'Methoden & Vorgaben', content: 'Definierter Prüf- und Freigabeablauf\nGelenkte Verfahrens- und Arbeitsanweisungen\nDokumentierte Entscheidungskriterien', icon: 'method' },
  { title: 'Womit messen?', subtitle: 'Kennzahlen & Wirksamkeit', content: 'Durchlaufzeit der Bearbeitung\nAnteil vollständiger Anforderungen\nAnzahl Rückfragen und Korrekturen', icon: 'measure' },
  { title: 'Input', subtitle: 'Eingaben & Auslöser', content: 'Kunden- oder interne Anforderung\nTechnische und kaufmännische Informationen\nTermin- und Qualitätsvorgaben', icon: 'input' },
  { title: 'Output', subtitle: 'Ergebnisse & Empfänger', content: 'Geprüfte und bewertete Anforderung\nDokumentierte Freigabeentscheidung\nInformation an nachgelagerte Prozesse', icon: 'output' }
];
type Tab = 'designer' | 'turtle' | 'overview' | 'documents';
export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('frps-theme') !== 'light');
  const [tab, setTab] = useState<Tab>('designer');
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selected, setSelected] = useState('n2');
  const [processName, setProcessName] = useState('Anforderungsmanagement');
  const [owner, setOwner] = useState('Leitung Vertrieb');
  const [description, setDescription] = useState('Kunden- und interne Anforderungen strukturiert erfassen, bewerten, freigeben und an die zuständigen Stellen übergeben.');
  const [turtleFields, setTurtleFields] = useState(initialTurtle);
  const [risks, setRisks] = useState('Unvollständige oder widersprüchliche Anforderungen\nVerzögerte Prüfung und Freigabe\nInformationsverlust an Prozessschnittstellen');
  const [opportunities, setOpportunities] = useState('Standardisierte digitale Erfassung\nWeniger Rückfragen durch Vollständigkeitsprüfung\nTransparente Übergabe an Folgeprozesse');
  const activeNode = nodes.find(n => n.id === selected);
  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes(ns => applyNodeChanges(changes, ns)), []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges(es => applyEdgeChanges(changes, es)), []);
  const onConnect = useCallback((connection: Connection) => setEdges(es => addEdge({ ...connection, animated: true }, es)), []);
  const addStep = () => {
    const id = `step-${Date.now()}`;
    setNodes(ns => [...ns, { id, type: 'process', position: { x: 300 + (ns.length % 3) * 240, y: 360 + Math.floor(ns.length / 3) * 130 }, data: { label: 'Neuer Prozessschritt', role: 'Rolle festlegen', detail: 'Beschreibung ergänzen', kind: 'task' } }]);
    setSelected(id);
  };
  const updateSelected = (field: keyof ProcessData, value: string) => setNodes(ns => ns.map(n => n.id === selected ? { ...n, data: { ...n.data, [field]: value } } : n));
  const setTheme = () => { const next = !dark; setDark(next); localStorage.setItem('frps-theme', next ? 'dark' : 'light'); };
  const nav = useMemo(() => [
    { id: 'overview' as Tab, label: 'Management-Cockpit', icon: LayoutDashboard },
    { id: 'designer' as Tab, label: 'Prozessdesigner', icon: Workflow },
    { id: 'turtle' as Tab, label: 'Turtle-Diagramm', icon: Gauge },
    { id: 'documents' as Tab, label: 'Dokumentenlenkung', icon: FileText }
  ], []);
  const updateTurtle = (index: number, content: string) => setTurtleFields(fs => fs.map((f, i) => i === index ? { ...f, content } : f));
  const title = tab === 'designer' ? 'Prozessdesigner' : tab === 'turtle' ? 'Turtle-Diagramm' : tab === 'overview' ? 'Management-Cockpit' : 'Dokumentenlenkung';
  return <div className={dark ? 'app dark' : 'app light'}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">F&amp;R</div><div><b>Process Studio</b><small>IATF + INTEGRIERTES MANAGEMENT</small></div></div>
      <div className="nav-caption">ARBEITSBEREICH</div>
      {nav.map(item => <button key={item.id} className={tab === item.id ? 'nav-item active' : 'nav-item'} onClick={() => setTab(item.id)}><item.icon size={18}/>{item.label}</button>)}
      <div className="nav-caption second">STEUERUNG</div>
      <button className="nav-item"><Users size={18}/> Rollen &amp; Benutzer</button>
      <button className="nav-item"><ShieldCheck size={18}/> Prüfungen &amp; Freigaben</button>
      <button className="nav-item"><Settings size={18}/> Einstellungen</button>
      <div className="sidebar-bottom"><span className="status-dot"/> Entwicklungsumgebung <small> · lokale Daten</small></div>
    </aside>
    <main className="main">
      <header className="topbar"><div><span className="eyebrow">FRIEDRICHS &amp; RATH · IATF-MANAGEMENTSYSTEM</span><h1>{title}</h1></div><div className="top-actions"><button className="icon-button" aria-label="Hilfe"><CircleHelp size={17}/></button><button className="theme-toggle" onClick={setTheme}>{dark ? <Sun size={17}/> : <Moon size={17}/>}<span>{dark ? 'Helles Design' : 'Dunkles Design'}</span></button></div></header>
      <section className="contextbar"><div><span className="crumb">Prozesslandschaft</span><ChevronRight size={13}/><b>{processName}</b></div><span className="draft-pill">IN BEARBEITUNG</span></section>
      {tab === 'designer' && <div className="workspace">
        <div className="canvas-panel"><div className="panel-toolbar"><div><b>Prozessablauf</b><small>Prozessschritte per Drag-and-drop anordnen und verbinden</small></div><button className="primary-btn" onClick={addStep}><Plus size={16}/> Prozessschritt</button></div>
          <div className="flow-canvas"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, node) => setSelected(node.id)} fitView><Background gap={22} size={1}/><MiniMap/><Controls/></ReactFlow></div>
          <div className="canvas-foot"><span>{nodes.length} Elemente</span><span>{edges.length} Verbindungen</span><span>Lokaler Prototyp – noch nicht zentral gespeichert</span></div>
        </div>
        <aside className="properties"><div className="property-head"><b>Prozess-Stammdaten</b><small>Grundlegende Prozessinformationen</small></div>
          <label>Prozessbezeichnung<input value={processName} onChange={e => setProcessName(e.target.value)}/></label>
          <label>Prozessverantwortung<input value={owner} onChange={e => setOwner(e.target.value)}/></label>
          <label>Prozessziel / Beschreibung<textarea value={description} onChange={e => setDescription(e.target.value)}/></label>
          <div className="divider"/>
          <div className="property-head"><b>Ausgewählter Prozessschritt</b><small>{activeNode?.id ?? 'Kein Element ausgewählt'}</small></div>
          {activeNode ? <><label>Bezeichnung<input value={activeNode.data.label} onChange={e => updateSelected('label', e.target.value)}/></label><label>Verantwortliche Rolle<input value={activeNode.data.role} onChange={e => updateSelected('role', e.target.value)}/></label><label>Beschreibung<textarea value={activeNode.data.detail} onChange={e => updateSelected('detail', e.target.value)}/></label><label>Elementtyp<select value={activeNode.data.kind} onChange={e => updateSelected('kind', e.target.value)}><option value="start">Start</option><option value="task">Prozessschritt</option><option value="decision">Entscheidung</option><option value="end">Ende</option></select></label></> : <p className="muted">Wähle ein Element im Prozessablauf aus.</p>}
          <div className="note-box">Hinweis: Diese Entwicklungsfassung speichert Änderungen noch nicht auf einem zentralen Server. Bitte keine vertraulichen Echtdaten eingeben.</div>
        </aside>
      </div>}
      {tab === 'turtle' && <div className="turtle-page">
        <div className="page-heading"><div><span className="eyebrow">PROZESSANALYSE · PROZESSSTECKBRIEF</span><h2>Prozessübersicht nach Turtle-Methode</h2><p>Zusammenhang von Eingaben, Ergebnissen, Ressourcen, Rollen, Methoden und Messgrößen.</p></div><button className="secondary-btn" onClick={() => window.print()}><ArrowDownToLine size={15}/> Drucken / PDF</button></div>
        <section className="turtle-meta"><div><span>PROZESS</span><strong>{processName}</strong></div><div><span>PROZESSVERANTWORTUNG</span><strong>{owner || 'Noch festzulegen'}</strong></div><div><span>STATUS</span><strong><i className="status-dot"/> Entwurf</strong></div><div><span>MODELLIERTE SCHRITTE</span><strong>{nodes.length}</strong></div></section>
        <div className="turtle-layout">
          <div className="turtle-field turtle-resources"><div className="field-title"><Boxes size={17}/><div><b>WOMIT?</b><small>Ressourcen &amp; Infrastruktur</small></div></div><textarea value={turtleFields[0].content} onChange={e => updateTurtle(0,e.target.value)}/></div>
          <div className="turtle-field turtle-people"><div className="field-title"><UserRound size={17}/><div><b>MIT WEM?</b><small>Rollen &amp; Verantwortlichkeiten</small></div></div><textarea value={turtleFields[1].content} onChange={e => updateTurtle(1,e.target.value)}/></div>
          <div className="turtle-field turtle-method"><div className="field-title"><ClipboardList size={17}/><div><b>WIE?</b><small>Methoden &amp; Vorgaben</small></div></div><textarea value={turtleFields[2].content} onChange={e => updateTurtle(2,e.target.value)}/></div>
          <div className="turtle-field turtle-measure"><div className="field-title"><Target size={17}/><div><b>WOMIT MESSEN?</b><small>Kennzahlen &amp; Wirksamkeit</small></div></div><textarea value={turtleFields[3].content} onChange={e => updateTurtle(3,e.target.value)}/></div>
          <div className="turtle-core"><span className="core-kicker">PROZESS</span><h3>{processName}</h3><p>{description}</p><div className="core-owner"><UserRound size={14}/>{owner || 'Verantwortung offen'}</div><div className="core-divider"/><div className="core-foot"><span>{nodes.length} Prozessschritte</span><span>{edges.length} Schnittstellen</span></div></div>
          <div className="turtle-field turtle-input"><div className="field-title"><ArrowDownToLine size={17}/><div><b>INPUT</b><small>Eingaben &amp; Auslöser</small></div></div><textarea value={turtleFields[4].content} onChange={e => updateTurtle(4,e.target.value)}/></div>
          <div className="turtle-field turtle-output"><div className="field-title"><PackageCheck size={17}/><div><b>OUTPUT</b><small>Ergebnisse &amp; Empfänger</small></div></div><textarea value={turtleFields[5].content} onChange={e => updateTurtle(5,e.target.value)}/></div>
        </div>
        <div className="risk-opportunity-grid"><section className="risk-panel"><div className="field-title"><AlertTriangle size={17}/><div><b>RISIKEN</b><small>Mögliche negative Auswirkungen</small></div></div><textarea value={risks} onChange={e => setRisks(e.target.value)}/></section><section className="opportunity-panel"><div className="field-title"><Target size={17}/><div><b>CHANCEN</b><small>Möglichkeiten zur Verbesserung</small></div></div><textarea value={opportunities} onChange={e => setOpportunities(e.target.value)}/></section></div>
        <div className="turtle-note"><CircleHelp size={15}/><span>Die Inhalte sind beispielhafte Ausgangswerte für den Prototyp. Sie müssen durch F&amp;R fachlich geprüft und prozessspezifisch bestätigt werden. Die Felder sind direkt bearbeitbar; zentrale Speicherung und Freigabe folgen.</span></div>
      </div>}
      {tab === 'overview' && <div className="dashboard"><div className="welcome"><span className="eyebrow">SYSTEMÜBERSICHT</span><h2>Management-Cockpit</h2><p>Zentrale Übersicht über Prozesslandschaft, dokumentierte Informationen und Verbesserungen.</p></div><div className="metric-grid"><div className="metric"><small>Prozessmodelle</small><strong>01</strong><span>Beispielprozess im Prototyp</span></div><div className="metric"><small>Offene Änderungen</small><strong>—</strong><span>Änderungsmanagement folgt</span></div><div className="metric"><small>Freigaben</small><strong>—</strong><span>Workflow folgt</span></div><div className="metric"><small>Systembereiche</small><strong>03</strong><span>IATF · Umwelt · Energie · Arbeitsschutz</span></div></div><div className="standards"><h3>Systembereiche</h3><div className="system-group"><b>IATF 16949</b><span>Eigenständiges Qualitätsmanagementsystem</span></div><div className="system-group"><b>Integriertes Managementsystem</b><span>Umweltmanagement · ISO 14001</span><span>Energiemanagement · ISO 50001</span><span>Arbeitsschutzprozesse angelehnt an ISO 45001</span></div></div></div>}
      {tab === 'documents' && <div className="documents"><div className="welcome"><span className="eyebrow">LENKUNG DOKUMENTIERTER INFORMATION</span><h2>Dokumentenlenkung</h2><p>Übersicht der gelenkten Prozess- und Managementsystemdokumente.</p></div><div className="empty-state"><FileText size={34}/><b>Noch keine Dokumente verknüpft</b><span>Hier werden später freigegebene Prozessbeschreibungen, Verfahrensanweisungen und Arbeitsanweisungen mit Version und Freigabestatus geführt.</span></div></div>}
      <footer>© splash Syncworks <span>F&amp;R Process Studio · Entwicklungsstand 0.2.0</span></footer>
    </main>
  </div>;
}