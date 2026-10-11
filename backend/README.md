# Shared Workspace API

This first backend release saves contacts and employee profiles. FastAPI exposes
the documented `/api/v1` endpoints, SQLAlchemy supports PostgreSQL, and authenticated
requests carry an eight-hour JWT scoped to the Nova organization.

## Local Setup

Requires Python 3.12 or newer. From the repository root:

```powershell
python -m venv backend/.venv
backend/.venv/Scripts/python.exe -m pip install -r backend/requirements.txt
```

Create `backend/.env` using the variable names in `.env.example`. Set a random
`JWT_SECRET` of at least 32 characters and a private `DEMO_PASSWORD` of at least
12 characters. Never commit the environment file. Start from the backend directory:

```powershell
cd backend
.venv/Scripts/python.exe -m uvicorn app.main:app --env-file .env --port 8000
```

Set `VITE_API_URL=http://localhost:8000` in the frontend's `.env.local`, then restart
Vite. Sign in with `DEMO_EMAIL` and `DEMO_PASSWORD`. Existing browser-only sessions
must sign out and sign in again. Contacts begin empty; the fictional employee roster
is initialized once through the service layer. Reset Demo Employees never resets
shared records. Browser-only changes are not silently copied into shared storage.

## Deploy With the Existing Vercel Frontend

1. Create a hosted PostgreSQL database. Use its private connection URL.
2. Deploy `backend/` as a Python web service on Render or Railway, or use its
   Dockerfile. Build with `pip install -r requirements.txt`; start with
   `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
3. Set backend secrets: `APP_ENV=production`, `DATABASE_URL`, `JWT_SECRET`,
   `DEMO_EMAIL`, and `DEMO_PASSWORD`. Production startup refuses SQLite.
4. Set `CORS_ORIGINS` to the client's exact Vercel origin, including `https://`.
   Add preview origins individually when testing. Wildcard access is unnecessary.
5. Confirm the backend `/api/v1/health` endpoint reports `ready`.
6. Set the frontend's `VITE_API_URL` in Vercel to the backend HTTPS origin, without
   `/api/v1`. Redeploy: Vite embeds this public URL at build time.
7. Verify the production deployment uses the intended Git branch and the client's
   existing URL. Test contact create/edit/delete/import and employee edit/pause
   from two browsers, then refresh both. Check failure feedback with the API offline.

No LLM secret belongs in a `VITE_` variable. Routerplus integration is a subsequent
release after its API contract and supported models are confirmed. This release
makes no paid model calls.

## Verification

```powershell
cd backend
.venv/Scripts/python.exe -m pytest tests -q
```

Tests cover restart persistence, duplicates, import counts, invalid input, expired
sessions, organization isolation, protected endpoints, seed idempotency, request
size limits, and sign-in throttling. Tests use disposable SQLite databases; hosted
PostgreSQL must also pass deployment smoke tests before sharing.

The reusable browser smoke script is `scripts/smoke-workspace.mjs`. It requires
Playwright (`WORKFORCE_PLAYWRIGHT_MODULE` can point to an installed package),
`WORKFORCE_TEST_URL`, and an optional `WORKFORCE_BROWSER_PATH`. For backend mode,
set `WORKFORCE_TEST_PASSWORD` in the shell environment to the private workspace
password. Run against a disposable test workspace: it creates synthetic contacts
and edits then restores Sophia's role. It leaves one imported synthetic CSV contact.
Screenshots go into ignored `test-results/`. Never commit test passwords.

## Release Boundaries

This is an authenticated single-client demonstration workspace, not a complete
identity platform. Registration, invitations, password recovery, session revocation,
team roles, audit logs, and multi-organization onboarding are not implemented in
this backend release. Rotate the signing secret to invalidate all existing tokens.
Sign-in throttling is in-process; multiple replicas require a shared limiter.
Use one backend instance for this demonstration. Manage the shared password through
the host's secret settings.

Knowledge processing, phone calls, campaigns, and performance analytics remain
sample experiences. Employee status and profile changes are saved but do not start
actual business operations. Use synthetic client demonstration data until the
remaining access controls and operational requirements are implemented. Database
tables are created on startup; versioned schema migrations are needed before
expanding the backend schema. Hosting and database charges are separate from LLM
credits and depend on the selected provider.
