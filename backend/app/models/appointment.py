from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import uuid4

from sqlalchemy import Date, String, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    reference_number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    patient_name: Mapped[str] = mapped_column(String(255), nullable=False)
    mobile: Mapped[str] = mapped_column(String(20), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    treatment: Mapped[str] = mapped_column(String(255), nullable=False)
    preferred_date: Mapped[datetime] = mapped_column(Date, nullable=False)
    preferred_time: Mapped[str] = mapped_column(String(20), nullable=False)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="Pending")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
