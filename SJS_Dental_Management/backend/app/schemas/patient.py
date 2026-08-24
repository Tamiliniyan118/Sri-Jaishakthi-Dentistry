from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class PatientBase(BaseModel):
    patient_number: str = Field(..., min_length=1, max_length=50)
    full_name: str = Field(..., min_length=1, max_length=255)
    age: int | None = None
    gender: str | None = None
    mobile: str | None = None
    email: EmailStr | None = None
    address: str | None = None
    medical_history: str | None = None
    allergies: str | None = None
    notes: str | None = None


class PatientCreate(PatientBase):
    pass


class PatientUpdate(BaseModel):
    patient_number: str | None = Field(default=None, min_length=1, max_length=50)
    full_name: str | None = Field(default=None, min_length=1, max_length=255)
    age: int | None = None
    gender: str | None = None
    mobile: str | None = None
    email: EmailStr | None = None
    address: str | None = None
    medical_history: str | None = None
    allergies: str | None = None
    notes: str | None = None


class PatientRead(PatientBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
