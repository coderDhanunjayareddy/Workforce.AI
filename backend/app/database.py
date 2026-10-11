import os
from datetime import datetime, timezone

from sqlalchemy import JSON, DateTime, String, UniqueConstraint, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker


class Base(DeclarativeBase):
    pass


class Record(Base):
    __tablename__ = "workspace_records"
    __table_args__ = (
        UniqueConstraint("organization", "kind", "email"),
        UniqueConstraint("organization", "kind", "phone"),
    )
    organization: Mapped[str] = mapped_column(String(100), primary_key=True)
    kind: Mapped[str] = mapped_column(String(30), primary_key=True)
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    data: Mapped[dict] = mapped_column(JSON)
    email: Mapped[str | None] = mapped_column(String(254), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(24), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


def create_database(url: str | None = None):
    url = url or os.getenv("DATABASE_URL", "sqlite:///./workforce.db")
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+psycopg://", 1)
    elif url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+psycopg://", 1)
    options = {"check_same_thread": False} if url.startswith("sqlite:") else {}
    engine = create_engine(url, connect_args=options, pool_pre_ping=True)
    Base.metadata.create_all(engine)
    return engine, sessionmaker(engine, expire_on_commit=False)
