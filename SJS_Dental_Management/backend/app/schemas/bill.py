from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class BillBase(BaseModel):
    visit_id: int | None = None
    bill_number: str = Field(..., min_length=1, max_length=100)
    amount: float = Field(..., gt=0)
    payment_status: str = "pending"
    payment_method: str | None = None
    notes: str | None = None


class BillCreate(BillBase):
    pass


class BillUpdate(BaseModel):
    visit_id: int | None = None
    bill_number: str | None = Field(default=None, min_length=1, max_length=100)
    amount: float | None = Field(default=None, gt=0)
    payment_status: str | None = None
    payment_method: str | None = None
    notes: str | None = None


class BillRead(BillBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    patient_id: int
    created_at: datetime
    updated_at: datetime
