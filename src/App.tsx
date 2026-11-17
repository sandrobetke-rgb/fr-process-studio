import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow, Background, Controls, MiniMap, addEdge, applyEdgeChanges,
  applyNodeChanges, Handle, Position, type Node, type Edge, type Connection,
  type NodeProps, type NodeChange, type EdgeChange
} from '@xyflow/react';
import { Moon, Sun, Plus, LayoutDashboard, Workflow, Turtle, FileText, Settings, Users, ShieldCheck } from 'lucide-react';

type ProcessData = { label: string; role: string; detail: string; kind: 'start' | 'task' | 'decision' | 'end' };
function ProcessNode({ data }: NodeProps<Node<ProcessData>>) {
  return <div className={`process-node node-${data.kind}`}>
    {data.kind !== 'start' && <Handle type="target" position={Position.Left} />}
    <small>{data.kind === 'task' ? 'PROZESSSCHRITT' : data.kind.toUpperCase()}</small>
    <strong>{data.label}</strong>
    <span>{data.role || 'Rolle offen'}</span>
    {data.detail && <p>{data.detail}</p>}
    {data.kind !== 'end' && <Handle type="source" position={Position.Right} />}
  </div>;
}
const nodeTypes = { process: ProcessNode };
const initialNodes: Node<ProcessData>[] = [
  { id: 'n1', type: 'process', position: { x: 80, y: 160 }, data: { label: 'Start', role: 'Prozessauslöser', detail: '', kind: 'start' } },
  { id: 'n2', type: 'process', position: { x: 330, y: 160 }, data: { label: 'Anforderung prüfen', role: 'Prozessverantwortlicher', detail: 'Eingang und Vollständigkeit prüfen', kind: 'task' } },
  { id: 'n3', type: 'process', position: { x: 620, y: 160 }, data: { label: 'Freigabe erteilen', role: 'Führungskraft', detail: 'Entscheidung dokumentieren', kind: 'decision' } },
  { id: 'n4', type: 'process', position: { x: 910, y: 160 }, data: { label: 'Abschluss', role: 'Prozessverantwortlicher', detail: '', kind: 'end' } }
];
const initialEdges: Edge[] = [
  { id: 'e1', source: 'n1', target: 'n2', animated: true },
  { id: 'e2', source: 'n2', target: 'n3', animated: true },
  { id: 'e3', source: 'n3', target: 'n4', animated: true }
];
type Tab = 'designer' | 'turtle' | 'overview' | 'documents';
export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('frps-theme') !== 'light');
  const [tab, setTab] = useState<Tab>('designer');
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selected, setSelected] = useState('n2');
  const [processName, setProcessName] = useState('Anforderungsmanagement');
  const [owner, setOwner] = useState('Prozessverantwortlicher');
  const [description, setDescription] = useState('Anforderungen strukturiert erfassen, bewerten und bearbeiten.');
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
    { id: 'overview' as Tab, label: 'IMS-Cockpit', icon: LayoutDashboard },
    { id: 'designer' as Tab, label: 'Prozessdesigner', icon: Workflow },
    { id: 'turtle' as Tab, label: 'Turtle-Diagramm', icon: Turtle },
    { id: 'documents' as Tab, label: 'Dokumente', icon: FileText }
  ], []);
  return <div className={dark ? 'app dark' : 'app light'}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">F&amp;R</div><div><b>Process Studio</b><small>INTEGRATED MANAGEMENT</small></div></div>
      <div className="nav-caption">ARBEITSBEREICH</div>
      {nav.map(item => <button key={item.id} className={tab === item.id ? 'nav-item active' : 'nav-item'} onClick={() => setTab(item.id)}><item.icon size={18}/>{item.label}</button>)}
      <div className="nav-caption second">VERWALTUNG</div>
      <button className="nav-item"><Users size={18}/> Rollen &amp; Benutzer</button>
      <button className="nav-item"><ShieldCheck size={18}/> Freigaben</button>
      <button className="nav-item"><Settings size={18}/> Einstellungen</button>
      <div className="sidebar-bottom"><span className="status-dot"/> Prototyp · lokale Daten</div>
    </aside>
    <main className="main">
      <header className="topbar"><div><span className="eyebrow">FRIEDRICHS &amp; RATH · IMS</span><h1>{tab === 'designer' ? 'Prozessdesigner' : tab === 'turtle' ? 'Turtle-Diagramm' : tab === 'overview' ? 'IMS-Cockpit' : 'Dokumentenübersicht'}</h1></div><button className="theme-toggle" onClick={setTheme}>{dark ? <Sun size={17}/> : <Moon size={17}/>} {dark ? 'Light Mode' : 'Dark Mode'}</button></header>
      <section className="contextbar"><div><span className="crumb">Prozesslandschaft</span><span className="slash">/</span><b>{processName}</b></div><span className="draft-pill">ENTWURF</span></section>
      {tab === 'designer' && <div className="workspace">
        <div className="canvas-panel"><div className="panel-toolbar"><div><b>Prozessablauf</b><small>Elemente verbinden · Schritte auswählen</small></div><button className="primary-btn" onClick={addStep}><Plus size={16}/> Schritt hinzufügen</button></div>
          <div className="flow-canvas"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, node) => setSelected(node.id)} fitView><Background gap={20} size={1}/><MiniMap/><Controls/></ReactFlow></div>
          <div className="canvas-foot"><span>{nodes.length} Elemente</span><span>{edges.length} Verbindungen</span><span>Änderungen noch nicht serverseitig gespeichert</span></div>
        </div>
        <aside className="properties"><div className="property-head"><b>Prozesseigenschaften</b><small>Stammdaten und Auswahl</small></div>
          <label>Prozessname<input value={processName} onChange={e => setProcessName(e.target.value)}/></label>
          <label>Prozessverantwortlicher<input value={owner} onChange={e => setOwner(e.target.value)}/></label>
          <label>Prozessbeschreibung<textarea value={description} onChange={e => setDescription(e.target.value)}/></label>
          <div className="divider"/>
          <div className="property-head"><b>Ausgewähltes Element</b><small>{activeNode?.id ?? 'Kein Element gewählt'}</small></div>
          {activeNode ? <><label>Bezeichnung<input value={activeNode.data.label} onChange={e => updateSelected('label', e.target.value)}/></label><label>Rolle<input value={activeNode.data.role} onChange={e => updateSelected('role', e.target.value)}/></label><label>Hinweis<textarea value={activeNode.data.detail} onChange={e => updateSelected('detail', e.target.value)}/></label><label>Elementtyp<select value={activeNode.data.kind} onChange={e => updateSelected('kind', e.target.value)}><option value="start">Start</option><option value="task">Prozessschritt</option><option value="decision">Entscheidung</option><option value="end">Ende</option></select></label></> : <p className="muted">Wähle ein Element im Diagramm aus.</p>}
          <div className="note-box">Prototyp: Daten liegen derzeit nur im Browser-Speicher bzw. Arbeitsspeicher. Eine zentrale Datenbank und Benutzerverwaltung folgen in einer späteren Ausbaustufe.</div>
        </aside>
      </div>}
      {tab === 'turtle' && <div className="turtle-page"><div className="intro-card"><span className="eyebrow">PROZESSANALYSE</span><h2>{processName}</h2><p>{description}</p><span className="owner-chip">Verantwortlich: {owner || 'Noch offen'}</span></div><div className="turtle-grid"><div className="turtle-card"><b>Womit?</b><p>Personal, Maschinen, IT-Systeme und Infrastruktur ergänzen.</p></div><div className="turtle-card"><b>Mit wem?</b><p>{owner || 'Verantwortliche Rolle noch festlegen'}</p></div><div className="turtle-card center"><b>Prozess</b><strong>{processName}</strong><small>{nodes.length} modellierte Elemente</small></div><div className="turtle-card"><b>Wie?</b><p>Verfahrensanweisungen, Standards und Methoden ergänzen.</p></div><div className="turtle-card"><b>Womit messen?</b><p>Kennzahlen, Ziele und Wirksamkeitskriterien ergänzen.</p></div><div className="turtle-card"><b>Input</b><p>Anforderungen, Informationen und Auslöser ergänzen.</p></div><div className="turtle-card"><b>Output</b><p>Ergebnisse, Produkte und dokumentierte Nachweise ergänzen.</p></div><div className="turtle-card"><b>Risiken &amp; Chancen</b><p>Bewertung und Maßnahmen ergänzen.</p></div></div><p className="muted">Die Felder sind Platzhalter und müssen fachlich vervollständigt werden. Es werden keine Normkonformitäten automatisch bestätigt.</p></div>}
      {tab === 'overview' && <div className="dashboard"><div className="welcome"><span className="eyebrow">INTEGRIERTES MANAGEMENTSYSTEM</span><h2>Willkommen im IMS-Cockpit</h2><p>Ein zentraler Überblick über Prozesse, Dokumente und Verbesserungen.</p></div><div className="metric-grid"><div className="metric"><small>Prozessmodelle</small><strong>1</strong><span>Beispielprozess im Prototyp</span></div><div className="metric"><small>Offene Änderungen</small><strong>0</strong><span>Noch nicht angebunden</span></div><div className="metric"><small>Freigaben</small><strong>0</strong><span>Workflow folgt</span></div><div className="metric"><small>Normenbereiche</small><strong>3</strong><span>IATF · Umwelt · Energie</span></div></div><div className="standards"><h3>IMS-Normenbereiche</h3><div><b>IATF 16949</b><span>Qualitätsmanagement</span></div><div><b>ISO 14001</b><span>Umweltmanagement</span></div><div><b>ISO 50001</b><span>Energiemanagement</span></div></div></div>}
      {tab === 'documents' && <div className="documents"><div className="welcome"><span className="eyebrow">LENKUNG DOKUMENTIERTER INFORMATION</span><h2>Dokumentenübersicht</h2><p>Die Dokumentenlenkung wird in der nächsten Ausbaustufe angebunden.</p></div><div className="empty-state"><FileText size={34}/><b>Noch keine Dokumente verknüpft</b><span>Hier erscheinen später freigegebene Prozessbeschreibungen, Verfahrensanweisungen und Arbeitsanweisungen.</span></div></div>}
      <footer>© splash Syncworks <span>F&amp;R Process Studio · Entwicklungsstand 0.1.0</span></footer>
    </main>
  </div>;
}