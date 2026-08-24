from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class VisitBase(BaseModel):
    visit_date: datetime
    treatment: str | None = None
    diagnosis: str | None = None
    notes: str | None = None
    doctor_notes: str | None = None


class VisitCreate(VisitBase):
    pass


class VisitUpdate(BaseModel):
    visit_date: datetime | None = None
    treatment: str | None = None
    diagnosis: str | None = None
    notes: str | None = None
    doctor_notes: str | None = None


class VisitRead(VisitBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    patient_id: int
    created_at: datetime
    updated_at: datetime
