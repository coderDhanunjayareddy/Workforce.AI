from datetime import datetime, timedelta, timezone

import jwt
import pytest
from fastapi.testclient import TestClient

from app.main import create_app
from app.security import attempts

EMPLOYEE = {"id": "emp_sophia", "name": "Sophia", "role": "Sales Executive", "department": "Sales", "status": "active", "voice": "Sophia Premium", "language": "English", "health": 99, "knowledgeScore": 99, "performance": 90, "callsToday": 0, "appointmentsToday": 0, "csat": 0, "lastActive": "2026-10-11T00:00:00Z"}
CONTACT = {"id": "contact_test", "fullName": "Test Customer", "email": "test@example.com", "phone": "+919876543210", "assignedEmployeeId": "emp_sophia"}


@pytest.fixture
def workspace(tmp_path, monkeypatch):
    monkeypatch.setenv("JWT_SECRET", "test-secret-that-is-at-least-32-characters")
    monkeypatch.setenv("DEMO_PASSWORD", "private-test-password")
    attempts.clear()
    url = f"sqlite:///{tmp_path / 'workspace.db'}"
    with TestClient(create_app(url)) as client:
        session = client.post("/api/v1/auth/login", json={"email": "priya.reddy@nova-insurance.demo", "password": "private-test-password"}).json()
        headers = {"Authorization": f"Bearer {session['token']}"}
        assert client.post("/api/v1/employees/initialize", headers=headers, json={"employees": [EMPLOYEE]}).status_code == 200
        yield client, headers, url


def test_contacts_persist_across_restart(workspace):
    client, headers, url = workspace
    response = client.post("/api/v1/contacts", headers=headers, json=CONTACT)
    assert response.status_code == 201
    assert response.json()["assignedEmployeeName"] == "Sophia"
    updated = {**response.json(), "fullName": "Updated Customer"}
    assert client.put("/api/v1/contacts/contact_test", headers=headers, json=updated).status_code == 200
    with TestClient(create_app(url)) as restarted:
        assert restarted.get("/api/v1/contacts", headers=headers).json()[0]["fullName"] == "Updated Customer"
        assert restarted.delete("/api/v1/contacts/contact_test", headers=headers).status_code == 200
    assert client.get("/api/v1/contacts", headers=headers).json() == []


def test_import_counts_and_duplicate_constraints(workspace):
    client, headers, _ = workspace
    assert client.post("/api/v1/contacts", headers=headers, json=CONTACT).status_code == 201
    assert client.post("/api/v1/contacts", headers=headers, json={**CONTACT, "id": "other"}).status_code == 409
    result = client.post("/api/v1/contacts/import", headers=headers, json={"contacts": [{**CONTACT, "id": "duplicate"}, {**CONTACT, "id": "unique", "email": "unique@example.com", "phone": "+919000000000"}], "validationErrors": 2})
    assert result.status_code == 200
    assert result.json()["imported"] == 1
    assert result.json()["duplicates"] == 1
    assert result.json()["validationErrors"] == 2


def test_validation_and_authorization(workspace):
    client, headers, _ = workspace
    assert client.get("/api/v1/contacts").status_code == 401
    assert client.get("/api/v1/employees", headers={"Authorization": "Bearer mock.jwt.session"}).status_code == 401
    assert client.post("/api/v1/contacts", headers=headers, json={**CONTACT, "email": "invalid"}).status_code == 422
    assert client.post("/api/v1/contacts", headers=headers, json={**CONTACT, "assignedEmployeeId": "missing"}).status_code == 404
    assert client.post("/api/v1/auth/login", json={"email": "priya.reddy@nova-insurance.demo", "password": "wrong"}).status_code == 401
    expired = jwt.encode({"sub": "user_priya", "org": "org_nova", "aud": "workforce-api", "iss": "workforce-api", "exp": datetime.now(timezone.utc) - timedelta(seconds=1)}, "test-secret-that-is-at-least-32-characters", algorithm="HS256")
    assert client.get("/api/v1/contacts", headers={"Authorization": f"Bearer {expired}"}).status_code == 401


def test_tenant_isolation(workspace):
    client, headers, _ = workspace
    client.post("/api/v1/contacts", headers=headers, json=CONTACT)
    other = jwt.encode({"sub": "other", "org": "org_other", "aud": "workforce-api", "iss": "workforce-api", "exp": datetime.now(timezone.utc) + timedelta(hours=1)}, "test-secret-that-is-at-least-32-characters", algorithm="HS256")
    other_headers = {"Authorization": f"Bearer {other}"}
    assert client.get("/api/v1/contacts", headers=other_headers).json() == []
    assert client.delete("/api/v1/contacts/contact_test", headers=other_headers).status_code == 404


def test_employee_changes_survive_seed_and_restart(workspace):
    client, headers, url = workspace
    updated = {**EMPLOYEE, "status": "paused", "role": "Senior Sales Executive"}
    assert client.put("/api/v1/employees/emp_sophia", headers=headers, json=updated).status_code == 200
    client.post("/api/v1/employees/initialize", headers=headers, json={"employees": [EMPLOYEE]})
    with TestClient(create_app(url)) as restarted:
        assert restarted.get("/api/v1/employees/emp_sophia", headers=headers).json()["status"] == "paused"
        assert restarted.delete("/api/v1/employees/emp_sophia", headers=headers).status_code == 200
        restarted.post("/api/v1/employees/initialize", headers=headers, json={"employees": [EMPLOYEE]})
        assert restarted.get("/api/v1/employees", headers=headers).json() == []


def test_request_size_limit_and_login_throttle(workspace):
    client, _, _ = workspace
    assert client.post("/api/v1/contacts/import", content="x" * 2_000_001).status_code == 413
    attempts.clear()
    for _ in range(10):
        assert client.post("/api/v1/auth/login", json={"email": "a@example.com", "password": "wrong"}).status_code == 401
    assert client.post("/api/v1/auth/login", json={"email": "a@example.com", "password": "wrong"}).status_code == 429
