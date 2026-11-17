import pytest
from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app

Base.metadata.create_all(bind=engine)
client = TestClient(app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_system_areas_keep_two_management_system_domains():
    response = client.get("/api/system-areas")
    assert response.status_code == 200
    codes = {item["code"] for item in response.json()}
    assert codes == {"IATF_QM", "IMS_ENV_ENERGY_OHS"}


def test_create_and_read_process_with_first_version():
    payload = {
        "process_number": "TEST-001",
        "owner": "Testverantwortlicher",
        "name": "Testprozess",
        "description": "API-Test",
        "content": {"nodes": [], "edges": [], "turtle": []},
    }
    created = client.post("/api/processes", json=payload)
    assert created.status_code == 201
    body = created.json()
    assert body["process_number"] == "TEST-001"
    assert len(body["versions"]) == 1
    assert body["versions"][0]["version_number"] == 1
    fetched = client.get(f"/api/processes/{body['id']}")
    assert fetched.status_code == 200
    assert fetched.json()["versions"][0]["name"] == "Testprozess"


def test_duplicate_process_number_is_rejected():
    payload = {
        "process_number": "DUP-001",
        "name": "Erster Prozess",
    }
    assert client.post("/api/processes", json=payload).status_code == 201
    duplicate = client.post("/api/processes", json=payload)
    assert duplicate.status_code == 409


def test_document_types_and_document_creation():
    types_response = client.get("/api/document-types")
    assert types_response.status_code == 200
    assert {item["code"] for item in types_response.json()} >= {"VA", "AA", "PL", "BA"}

    payload = {
        "document_number": "VA-TEST-001",
        "title": "Test-Verfahrensanweisung",
        "document_type_code": "VA",
        "owner": "QM",
        "system_area_code": "IATF_QM",
        "content": {"sections": [{"heading": "Zweck", "text": "Test"}]},
        "change_reason": "Testanlage",
    }
    created = client.post("/api/documents", json=payload)
    assert created.status_code == 201
    body = created.json()
    assert body["document_number"] == "VA-TEST-001"
    assert len(body["versions"]) == 1
    assert body["versions"][0]["version_number"] == 1
    assert len(body["versions"][0]["content_hash"]) == 64

    listed = client.get("/api/documents")
    assert listed.status_code == 200
    assert any(item["document_number"] == "VA-TEST-001" for item in listed.json())


def test_document_duplicate_number_is_rejected():
    payload = {
        "document_number": "DOC-DUP-001",
        "title": "Erstes Dokument",
        "document_type_code": "AA",
        "system_area_code": "IMS_ENV_ENERGY_OHS",
    }
    assert client.post("/api/documents", json=payload).status_code == 201
    duplicate = client.post("/api/documents", json=payload)
    assert duplicate.status_code == 409


def test_document_revision_creates_new_version_without_overwriting_old_one():
    payload = {
        "document_number": "VA-REV-001",
        "title": "Revisionsprüfung",
        "document_type_code": "VA",
        "system_area_code": "IATF_QM",
        "content": {"text": "Version 1"},
    }
    created = client.post("/api/documents", json=payload)
    assert created.status_code == 201
    document = created.json()
    first_version = document["versions"][0]

    revised = client.post(
        f"/api/documents/{document['id']}/versions",
        json={"content": {"text": "Version 2"}, "change_reason": "Fachliche Aktualisierung"},
    )
    assert revised.status_code == 201
    assert revised.json()["version_number"] == 2
    assert revised.json()["content"]["text"] == "Version 2"

    fetched = client.get("/api/documents")
    saved = next(item for item in fetched.json() if item["id"] == document["id"])
    assert len(saved["versions"]) == 2
    versions = sorted(saved["versions"], key=lambda item: item["version_number"])
    assert versions[0]["id"] == first_version["id"]
    assert versions[0]["content"]["text"] == "Version 1"
    assert versions[1]["content"]["text"] == "Version 2"


def test_document_revision_requires_reason_and_existing_document():
    missing = client.post(
        "/api/documents/not-existing/versions",
        json={"content": {"text": "x"}, "change_reason": "Korrektur"},
    )
    assert missing.status_code == 404
    invalid = client.post(
        "/api/documents/not-existing/versions",
        json={"content": {}, "change_reason": "x"},
    )
    assert invalid.status_code == 422
