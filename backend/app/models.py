import re
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


class Contact(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    id: str = Field(min_length=1, max_length=100, pattern=r"^[\w-]+$")
    fullName: str = Field(min_length=2, max_length=160)
    company: str = Field(default="", max_length=160)
    email: str = Field(max_length=254)
    phone: str = Field(pattern=r"^\+?[\d ()-]{7,24}$")
    status: Literal["new-lead", "qualified", "customer", "renewal-due", "inactive", "blacklisted", "archived"] = "new-lead"
    leadScore: int = Field(default=0, ge=0, le=100)
    assignedEmployeeId: str = Field(default="", max_length=100)
    assignedEmployeeName: str | None = Field(default=None, max_length=160)
    currentCampaign: str | None = Field(default=None, max_length=160)
    recentActivity: str | None = Field(default=None, max_length=160)
    tags: list[str] = Field(default_factory=list, max_length=30)
    policyType: str | None = Field(default=None, max_length=160)
    industry: str | None = Field(default=None, max_length=160)
    city: str | None = Field(default=None, max_length=100)
    state: str | None = Field(default=None, max_length=100)
    country: str | None = Field(default=None, max_length=100)
    lastContact: str | None = Field(default=None, max_length=100)
    policyNumber: str | None = Field(default=None, max_length=100)

    @field_validator("email")
    @classmethod
    def valid_email(cls, value: str) -> str:
        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", value):
            raise ValueError("Invalid email address")
        return value.lower()

    @field_validator("tags")
    @classmethod
    def valid_tags(cls, value: list[str]) -> list[str]:
        if any(len(tag) > 100 for tag in value):
            raise ValueError("Tags must be at most 100 characters")
        return value


class Employee(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    id: str = Field(min_length=1, max_length=100, pattern=r"^[\w-]+$")
    name: str = Field(min_length=1, max_length=160)
    role: str = Field(min_length=1, max_length=160)
    department: str = Field(min_length=1, max_length=160)
    status: Literal["draft", "training", "active", "busy", "paused", "offline", "archived"]
    voice: str = Field(max_length=160)
    language: str = Field(max_length=100)
    avatarUrl: str | None = Field(default=None, max_length=2048)
    health: float = Field(ge=0, le=100)
    knowledgeScore: float = Field(ge=0, le=100)
    performance: float = Field(ge=0, le=100)
    callsToday: int = Field(ge=0)
    appointmentsToday: int = Field(ge=0)
    csat: float = Field(ge=0, le=100)
    currentCampaign: str | None = Field(default=None, max_length=160)
    lastActive: str = Field(max_length=100)


class ContactImport(BaseModel):
    contacts: list[Contact] = Field(max_length=1000)
    validationErrors: int = Field(default=0, ge=0, le=1000)


class Login(BaseModel):
    email: str = Field(max_length=254)
    password: str = Field(max_length=256)


class EmployeeSeed(BaseModel):
    employees: list[Employee] = Field(max_length=30)
