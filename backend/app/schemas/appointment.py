from __future__ import annotations

from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


class AppointmentCreate(BaseModel):
    patient_name: str = Field(..., min_length=2, max_length=255)
    mobile: str = Field(..., min_length=8, max_length=20)
    age: int = Field(..., ge=1, le=120)
    treatment: str = Field(..., min_length=2, max_length=255)
    preferred_date: date
    preferred_time: str = Field(..., min_length=1, max_length=20)
    notes: Optional[str] = None

    @field_validator("mobile")
    @classmethod
    def validate_mobile(cls, value: str) -> str:
        cleaned = value.replace(" ", "").replace("-", "")
        if not cleaned.isdigit() or len(cleaned) < 8:
            raise ValueError("Mobile number must contain at least 8 digits")
        return value

    @field_validator("preferred_date")
    @classmethod
    def validate_date_not_past(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("Preferred date cannot be in the past")
        return value


class AppointmentUpdate(BaseModel):
    patient_name: Optional[str] = None
    mobile: Optional[str] = None
    age: Optional[int] = None
    treatment: Optional[str] = None
    preferred_date: Optional[date] = None
    preferred_time: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = None


class AppointmentStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(Pending|Confirmed|Rejected|Completed|Cancelled)$")


class AppointmentReschedule(BaseModel):
    preferred_date: date
    preferred_time: str = Field(..., min_length=1, max_length=20)

    @field_validator("preferred_date")
    @classmethod
    def validate_date_not_past(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("Preferred date cannot be in the past")
        return value


class AppointmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    reference_number: str
    patient_name: str
    mobile: str
    age: int
    treatment: str
    preferred_date: date
    preferred_time: str
    notes: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime


class AppointmentCreateResponse(BaseModel):
    success: bool
    reference_number: str
    status: str
    message: str
