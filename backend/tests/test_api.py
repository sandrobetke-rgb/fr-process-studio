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
