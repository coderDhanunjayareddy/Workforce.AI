import os
import re
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from .database import Record, create_database
from .models import Contact, ContactImport, Employee, EmployeeSeed, Login
from .security import check_login_rate, configuration, issue_session, organization


def create_app(database_url: str | None = None):
    @asynccontextmanager
    async def lifespan(application: FastAPI):
        configuration()
        engine, factory = create_database(database_url)
        application.state.database = factory
        yield
        engine.dispose()

    app = FastAPI(title="Workforce API", lifespan=lifespan)
    origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if origin.strip()]
    app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET", "POST", "PUT", "DELETE"], allow_headers=["Authorization", "Content-Type"])

    @app.middleware("http")
    async def limit_request(request: Request, call_next):
        from starlette.responses import JSONResponse
        body = bytearray()
        async for chunk in request.stream():
            body.extend(chunk)
            if len(body) > 2_000_000:
                return JSONResponse({"detail": "Upload is too large"}, status_code=413)
        request._body = bytes(body)
        return await call_next(request)

    def database(request: Request):
        with request.app.state.database() as session:
            yield session

    def get_record(session, org, kind, record_id):
        record = session.get(Record, (org, kind, record_id))
        if not record:
            raise HTTPException(404, "Record not found")
        return record

    def save(session, org, kind, model, update=False):
        record = get_record(session, org, kind, model.id) if update else Record(organization=org, kind=kind, id=model.id)
        record.data = model.model_dump(exclude_none=True)
        if kind == "contacts":
            if model.assignedEmployeeId:
                employee = get_record(session, org, "employees", model.assignedEmployeeId)
                record.data["assignedEmployeeName"] = employee.data["name"]
            else:
                record.data.pop("assignedEmployeeName", None)
            record.email = model.email.lower()
            record.phone = re.sub(r"\D", "", model.phone)
        session.add(record)
        return record

    def commit(session):
        try:
            session.commit()
        except IntegrityError:
            session.rollback()
            raise HTTPException(409, "Duplicate record") from None

    @app.get("/api/v1/health")
    def health(session=Depends(database)):
        session.execute(select(Record.id).limit(1))
        return {"status": "ready"}

    @app.post("/api/v1/auth/login")
    def login(input: Login, request: Request):
        check_login_rate(request)
        return issue_session(input.email, input.password)

    @app.post("/api/v1/employees/initialize")
    def initialize(input: EmployeeSeed, org=Depends(organization), session=Depends(database)):
        marker = session.get(Record, (org, "system", "employee_seed"))
        if not marker:
            session.add(Record(organization=org, kind="system", id="employee_seed", data={"initialized": True}))
            for employee in input.employees:
                save(session, org, "employees", employee)
            try:
                session.commit()
            except IntegrityError:
                session.rollback()
                if not session.get(Record, (org, "system", "employee_seed")):
                    raise HTTPException(409, "Initialization failed") from None
        return {"initialized": True}

    @app.get("/api/v1/contacts", response_model=list[Contact])
    def contacts(org=Depends(organization), session=Depends(database)):
        return [record.data for record in session.scalars(select(Record).where(Record.organization == org, Record.kind == "contacts").order_by(Record.created_at.desc(), Record.id))]

    @app.post("/api/v1/contacts", response_model=Contact, status_code=201)
    def create_contact(input: Contact, org=Depends(organization), session=Depends(database)):
        record = save(session, org, "contacts", input)
        commit(session)
        return record.data

    @app.put("/api/v1/contacts/{record_id}", response_model=Contact)
    def update_contact(record_id: str, input: Contact, org=Depends(organization), session=Depends(database)):
        if input.id != record_id:
            raise HTTPException(422, "Record id mismatch")
        record = save(session, org, "contacts", input, update=True)
        commit(session)
        return record.data

    @app.delete("/api/v1/contacts/{record_id}")
    def delete_contact(record_id: str, org=Depends(organization), session=Depends(database)):
        session.delete(get_record(session, org, "contacts", record_id))
        commit(session)
        return {"id": record_id, "deleted": True}

    @app.post("/api/v1/contacts/import")
    def import_contacts(input: ContactImport, org=Depends(organization), session=Depends(database)):
        imported = duplicates = 0
        for contact in input.contacts:
            try:
                with session.begin_nested():
                    save(session, org, "contacts", contact)
                    session.flush()
                imported += 1
            except IntegrityError:
                duplicates += 1
        commit(session)
        return {"imported": imported, "duplicates": duplicates, "validationErrors": input.validationErrors, "source": "csv", "completedAt": datetime.now(timezone.utc).isoformat()}

    @app.get("/api/v1/employees", response_model=list[Employee])
    def employees(org=Depends(organization), session=Depends(database)):
        return [record.data for record in session.scalars(select(Record).where(Record.organization == org, Record.kind == "employees").order_by(Record.created_at.desc(), Record.id))]

    @app.get("/api/v1/employees/{record_id}", response_model=Employee)
    def employee(record_id: str, org=Depends(organization), session=Depends(database)):
        return get_record(session, org, "employees", record_id).data

    @app.post("/api/v1/employees", response_model=Employee, status_code=201)
    def hire(input: Employee, org=Depends(organization), session=Depends(database)):
        record = save(session, org, "employees", input)
        commit(session)
        return record.data

    @app.put("/api/v1/employees/{record_id}", response_model=Employee)
    def update_employee(record_id: str, input: Employee, org=Depends(organization), session=Depends(database)):
        if input.id != record_id:
            raise HTTPException(422, "Record id mismatch")
        record = save(session, org, "employees", input, update=True)
        commit(session)
        return record.data

    @app.delete("/api/v1/employees/{record_id}")
    def delete_employee(record_id: str, org=Depends(organization), session=Depends(database)):
        linked = session.scalars(select(Record).where(Record.organization == org, Record.kind == "contacts"))
        if any(record.data.get("assignedEmployeeId") == record_id for record in linked):
            raise HTTPException(409, "Reassign this employee's contacts before deleting")
        session.delete(get_record(session, org, "employees", record_id))
        commit(session)
        return {"id": record_id, "deleted": True}

    return app


app = create_app()
