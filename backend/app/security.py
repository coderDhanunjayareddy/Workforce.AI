import os
import secrets
from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone
from time import monotonic

import jwt
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

bearer = HTTPBearer(auto_error=False)
attempts: dict[str, deque[float]] = defaultdict(deque)


def configuration():
    secret = os.getenv("JWT_SECRET", "")
    password = os.getenv("DEMO_PASSWORD", "")
    if len(secret) < 32 or len(password) < 12:
        raise RuntimeError("Set JWT_SECRET (32+ characters) and DEMO_PASSWORD (12+ characters).")
    if os.getenv("APP_ENV") == "production" and (
        os.getenv("DATABASE_URL", "").startswith("sqlite:") or not os.getenv("DATABASE_URL")
    ):
        raise RuntimeError("Production requires hosted PostgreSQL persistence.")
    return secret, password


def check_login_rate(request: Request):
    address = request.client.host if request.client else "unknown"
    now = monotonic()
    # Expire idle entries to bound memory on a long-running demonstration server.
    for key in list(attempts):
        if not attempts[key] or attempts[key][-1] < now - 300:
            del attempts[key]
    recent = attempts[address]
    while recent and recent[0] < now - 300:
        recent.popleft()
    if len(recent) >= 10:
        raise HTTPException(429, "Too many sign-in attempts. Try again in five minutes.")
    recent.append(now)


def issue_session(email: str, password: str):
    secret, expected_password = configuration()
    expected_email = os.getenv("DEMO_EMAIL", "priya.reddy@nova-insurance.demo")
    if not secrets.compare_digest(email.lower().encode(), expected_email.lower().encode()) or not secrets.compare_digest(password.encode(), expected_password.encode()):
        raise HTTPException(401, "Invalid credentials")
    expiry = datetime.now(timezone.utc) + timedelta(hours=8)
    token = jwt.encode({"sub": "user_priya", "org": "org_nova", "exp": expiry, "aud": "workforce-api", "iss": "workforce-api"}, secret, algorithm="HS256")
    return {
        "user": {"id": "user_priya", "firstName": "Priya", "lastName": "Reddy", "email": expected_email, "role": "Primary Admin"},
        "token": token, "expiresAt": expiry.isoformat(), "verified": True, "organizationId": "org_nova",
    }


def organization(credentials: HTTPAuthorizationCredentials | None = Depends(bearer)) -> str:
    if not credentials:
        raise HTTPException(401, "Sign in required")
    secret, _ = configuration()
    try:
        claims = jwt.decode(credentials.credentials, secret, algorithms=["HS256"], audience="workforce-api", issuer="workforce-api", options={"require": ["exp", "sub", "org"]})
        return claims["org"]
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Session expired") from None
