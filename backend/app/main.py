from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from .config import settings
from .database import Base, engine, get_db
from .models import AuditEvent, ManagementSystemArea, Process, ProcessVersion
from .schemas import ProcessCreate, ProcessRead

app = FastAPI(title=settings.app_name, version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.on_event("startup")
def initialize_development_database() -> None:
    # Temporary bootstrap for local development. Production must use reviewed Alembic migrations.
    if settings.environment == "development":
        Base.metadata.create_all(bind=engine)


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
    process = Process(process_number=payload.process_number, owner=payload.owner)
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
