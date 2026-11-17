import hashlib
import json

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from .config import settings
from .database import get_db
from .models import AuditEvent, DocumentMaster, DocumentProcessLink, DocumentType, DocumentVersion, ManagementSystemArea, Process, ProcessVersion
from .schemas import DocumentCreate, DocumentProcessLinkCreate, DocumentProcessLinkRead, DocumentRead, DocumentVersionCreate, DocumentVersionCreateRead, ProcessCreate, ProcessRead, ProcessVersionCreate

app = FastAPI(title=settings.app_name, version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "fr-process-studio-api"}


@app.get("/api/system-areas")
def list_system_areas(db: Session = Depends(get_db)) -> list[dict[str, str]]:
    areas = db.scalars(select(ManagementSystemArea).order_by(ManagementSystemArea.code)).all()
    if not areas:
        areas = [
            ManagementSystemArea(code="IATF_QM", name="IATF 16949", description="Eigenständiges Qualitätsmanagementsystem"),
            ManagementSystemArea(code="IMS_ENV_ENERGY_OHS", name="Integriertes Managementsystem", description="ISO 14001, ISO 50001 und Arbeitsschutzprozesse angelehnt an ISO 45001"),
        ]
        db.add_all(areas)
        db.commit()
    return [{"id": a.id, "code": a.code, "name": a.name, "description": a.description} for a in areas]


@app.get("/api/processes", response_model=list[ProcessRead])
def list_processes(db: Session = Depends(get_db)) -> list[Process]:
    return list(db.scalars(select(Process).order_by(Process.process_number)).unique().all())


@app.post("/api/processes", response_model=ProcessRead, status_code=status.HTTP_201_CREATED)
def create_process(payload: ProcessCreate, db: Session = Depends(get_db)) -> Process:
    if db.scalar(select(Process).where(Process.process_number == payload.process_number)):
        raise HTTPException(status_code=409, detail="Prozessnummer ist bereits vergeben")
    process = Process(process_number=payload.process_number, owner=payload.owner, system_area_code=payload.system_area_code)
    version = ProcessVersion(
        version_number=1,
        name=payload.name,
        description=payload.description,
        content=payload.content,
        change_reason="Erstanlage",
    )
    process.versions.append(version)
    db.add(process)
    db.flush()
    db.add(AuditEvent(action="PROCESS_CREATED", object_type="Process", object_id=process.id, version_id=version.id, reason="Erstanlage"))
    db.commit()
    db.refresh(process)
    return process


@app.get("/api/processes/{process_id}", response_model=ProcessRead)
def get_process(process_id: str, db: Session = Depends(get_db)) -> Process:
    process = db.get(Process, process_id)
    if process is None:
        raise HTTPException(status_code=404, detail="Prozess nicht gefunden")
    return process


DEFAULT_DOCUMENT_TYPES = [
    ("VA", "Verfahrensanweisung"),
    ("AA", "Arbeitsanweisung"),
    ("PB", "Prozessbeschreibung"),
    ("PSB", "Prozesssteckbrief"),
    ("PA", "Prüfanweisung"),
    ("PL", "Prüfplan"),
    ("FB", "Formblatt"),
    ("CL", "Checkliste"),
    ("NV", "Nachweisvorlage"),
    ("BA", "Betriebsanweisung"),
]


@app.get("/api/document-types")
def list_document_types(db: Session = Depends(get_db)) -> list[dict[str, str]]:
    existing = {item.code for item in db.scalars(select(DocumentType)).all()}
    for code, name in DEFAULT_DOCUMENT_TYPES:
        if code not in existing:
            db.add(DocumentType(code=code, name=name))
    db.commit()
    items = db.scalars(select(DocumentType).where(DocumentType.active.is_(True)).order_by(DocumentType.code)).all()
    return [{"id": item.id, "code": item.code, "name": item.name} for item in items]


@app.get("/api/documents", response_model=list[DocumentRead])
def list_documents(db: Session = Depends(get_db)) -> list[DocumentMaster]:
    return list(db.scalars(select(DocumentMaster).order_by(DocumentMaster.document_number)).unique().all())


@app.post("/api/documents", response_model=DocumentRead, status_code=status.HTTP_201_CREATED)
def create_document(payload: DocumentCreate, db: Session = Depends(get_db)) -> DocumentMaster:
    if db.scalar(select(DocumentMaster).where(DocumentMaster.document_number == payload.document_number)):
        raise HTTPException(status_code=409, detail="Dokumentennummer ist bereits vergeben")
    document_type = db.scalar(select(DocumentType).where(DocumentType.code == payload.document_type_code, DocumentType.active.is_(True)))
    if document_type is None:
        raise HTTPException(status_code=422, detail="Unbekannte oder inaktive Dokumentart")
    canonical_content = json.dumps(payload.content, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    content_hash = hashlib.sha256(canonical_content.encode("utf-8")).hexdigest()
    document = DocumentMaster(
        document_number=payload.document_number,
        title=payload.title,
        document_type_id=document_type.id,
        owner=payload.owner,
        system_area_code=payload.system_area_code,
    )
    version = DocumentVersion(
        version_number=1,
        content=payload.content,
        change_reason=payload.change_reason,
        content_hash=content_hash,
    )
    document.versions.append(version)
    db.add(document)
    db.flush()
    db.add(AuditEvent(action="DOCUMENT_CREATED", object_type="DocumentMaster", object_id=document.id, version_id=version.id, reason=payload.change_reason))
    db.commit()
    db.refresh(document)
    return document



@app.post("/api/documents/{document_id}/versions", response_model=DocumentVersionCreateRead, status_code=status.HTTP_201_CREATED)
def create_document_version(document_id: str, payload: DocumentVersionCreate, db: Session = Depends(get_db)) -> DocumentVersion:
    document = db.get(DocumentMaster, document_id)
    if document is None:
        raise HTTPException(status_code=404, detail="Dokument nicht gefunden")
    latest = db.scalar(
        select(DocumentVersion)
        .where(DocumentVersion.document_id == document_id)
        .order_by(DocumentVersion.version_number.desc())
        .limit(1)
    )
    next_number = (latest.version_number if latest else 0) + 1
    canonical_content = json.dumps(payload.content, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    content_hash = hashlib.sha256(canonical_content.encode("utf-8")).hexdigest()
    version = DocumentVersion(
        document_id=document_id,
        version_number=next_number,
        content=payload.content,
        change_reason=payload.change_reason,
        status="DRAFT",
        content_hash=content_hash,
    )
    db.add(version)
    db.flush()
    document.status = "DRAFT"
    db.add(AuditEvent(
        action="DOCUMENT_VERSION_CREATED",
        object_type="DocumentMaster",
        object_id=document.id,
        version_id=version.id,
        reason=payload.change_reason,
    ))
    db.commit()
    db.refresh(version)
    return version



@app.get("/api/documents/{document_id}/process-links", response_model=list[DocumentProcessLinkRead])
def list_document_process_links(document_id: str, db: Session = Depends(get_db)) -> list[DocumentProcessLink]:
    if db.get(DocumentMaster, document_id) is None:
        raise HTTPException(status_code=404, detail="Dokument nicht gefunden")
    return list(db.scalars(
        select(DocumentProcessLink)
        .where(DocumentProcessLink.document_id == document_id)
        .order_by(DocumentProcessLink.created_at)
    ).all())


@app.post("/api/documents/{document_id}/process-links", response_model=DocumentProcessLinkRead, status_code=status.HTTP_201_CREATED)
def link_document_to_process(document_id: str, payload: DocumentProcessLinkCreate, db: Session = Depends(get_db)) -> DocumentProcessLink:
    if db.get(DocumentMaster, document_id) is None:
        raise HTTPException(status_code=404, detail="Dokument nicht gefunden")
    if db.get(Process, payload.process_id) is None:
        raise HTTPException(status_code=404, detail="Prozess nicht gefunden")
    existing = db.scalar(
        select(DocumentProcessLink).where(
            DocumentProcessLink.document_id == document_id,
            DocumentProcessLink.process_id == payload.process_id,
            DocumentProcessLink.process_step_id == payload.process_step_id,
        )
    )
    if existing is not None:
        raise HTTPException(status_code=409, detail="Diese Dokument-Prozess-Zuordnung besteht bereits")
    link = DocumentProcessLink(
        document_id=document_id,
        process_id=payload.process_id,
        process_step_id=payload.process_step_id,
    )
    db.add(link)
    db.flush()
    db.add(AuditEvent(
        action="DOCUMENT_LINKED_TO_PROCESS",
        object_type="DocumentProcessLink",
        object_id=link.id,
        reason=f"Dokument {document_id} mit Prozess {payload.process_id} verknüpft",
    ))
    db.commit()
    db.refresh(link)
    return link



@app.post("/api/processes/{process_id}/versions", response_model=ProcessRead, status_code=status.HTTP_201_CREATED)
def create_process_version(process_id: str, payload: ProcessVersionCreate, db: Session = Depends(get_db)) -> Process:
    process = db.get(Process, process_id)
    if process is None:
        raise HTTPException(status_code=404, detail="Prozess nicht gefunden")
    latest = db.scalar(
        select(ProcessVersion)
        .where(ProcessVersion.process_id == process_id)
        .order_by(ProcessVersion.version_number.desc())
        .limit(1)
    )
    version = ProcessVersion(
        version_number=(latest.version_number if latest else 0) + 1,
        name=payload.name,
        description=payload.description,
        content=payload.content,
        change_reason=payload.change_reason,
        status="DRAFT",
    )
    process.versions.append(version)
    process.status = "DRAFT"
    db.add(AuditEvent(
        action="PROCESS_VERSION_CREATED",
        object_type="Process",
        object_id=process.id,
        version_id=version.id,
        reason=payload.change_reason,
    ))
    db.commit()
    db.refresh(process)
    return process
