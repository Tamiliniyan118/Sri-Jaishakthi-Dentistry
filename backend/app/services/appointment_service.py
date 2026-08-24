from __future__ import annotations

from datetime import date, datetime
from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentCreate, AppointmentUpdate, AppointmentReschedule, AppointmentStatusUpdate


class AppointmentService:
    def __init__(self, db: Session):
        self.db = db

    def create_appointment(self, payload: AppointmentCreate) -> Appointment:
        reference_number = self._generate_reference_number()
        appointment = Appointment(
            reference_number=reference_number,
            patient_name=payload.patient_name.strip(),
            mobile=payload.mobile.strip(),
            age=payload.age,
            treatment=payload.treatment.strip(),
            preferred_date=payload.preferred_date,
            preferred_time=payload.preferred_time.strip(),
            notes=payload.notes.strip() if payload.notes else None,
            status="Pending",
        )
        self.db.add(appointment)
        self.db.commit()
        self.db.refresh(appointment)
        return appointment

    def list_appointments(self) -> List[Appointment]:
        return self.db.query(Appointment).order_by(Appointment.created_at.desc()).all()

    def get_appointment(self, appointment_id: str) -> Optional[Appointment]:
        return self.db.query(Appointment).filter(Appointment.id == appointment_id).first()

    def update_appointment(self, appointment: Appointment, payload: AppointmentUpdate) -> Appointment:
        for key, value in payload.model_dump(exclude_unset=True).items():
            if value is not None and key != "status":
                setattr(appointment, key, value.strip() if isinstance(value, str) else value)
        self.db.commit()
        self.db.refresh(appointment)
        return appointment

    def delete_appointment(self, appointment: Appointment) -> None:
        self.db.delete(appointment)
        self.db.commit()

    def update_status(self, appointment: Appointment, payload: AppointmentStatusUpdate) -> Appointment:
        appointment.status = payload.status
        self.db.commit()
        self.db.refresh(appointment)
        return appointment

    def reschedule(self, appointment: Appointment, payload: AppointmentReschedule) -> Appointment:
        appointment.preferred_date = payload.preferred_date
        appointment.preferred_time = payload.preferred_time.strip()
        self.db.commit()
        self.db.refresh(appointment)
        return appointment

    def _generate_reference_number(self) -> str:
        today = datetime.utcnow().strftime("%Y")
        last_appointment = (
            self.db.query(Appointment)
            .filter(Appointment.reference_number.like(f"SJS-{today}-%"))
            .order_by(Appointment.created_at.desc())
            .first()
        )
        sequence = 1
        if last_appointment:
            suffix = last_appointment.reference_number.split("-")[-1]
            try:
                sequence = int(suffix) + 1
            except ValueError:
                sequence = 1
        return f"SJS-{today}-{sequence:05d}"
