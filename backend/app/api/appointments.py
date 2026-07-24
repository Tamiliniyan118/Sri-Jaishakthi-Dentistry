from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentCreateResponse,
    AppointmentResponse,
    AppointmentReschedule,
    AppointmentStatusUpdate,
    AppointmentUpdate,
)
from app.services.appointment_service import AppointmentService

router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.post("", response_model=AppointmentCreateResponse, status_code=status.HTTP_201_CREATED)
def create_appointment(payload: AppointmentCreate, db: Session = Depends(get_db)):
    service = AppointmentService(db)
    appointment = service.create_appointment(payload)
    return AppointmentCreateResponse(
        success=True,
        reference_number=appointment.reference_number,
        status=appointment.status,
        message="Appointment created successfully.",
    )


@router.get("", response_model=list[AppointmentResponse])
def list_appointments(db: Session = Depends(get_db)):
    service = AppointmentService(db)
    appointments = service.list_appointments()
    return appointments


@router.get("/{appointment_id}", response_model=AppointmentResponse)
def get_appointment(appointment_id: str, db: Session = Depends(get_db)):
    service = AppointmentService(db)
    appointment = service.get_appointment(appointment_id)
    if not appointment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found")
    return appointment


@router.put("/{appointment_id}", response_model=AppointmentResponse)
def update_appointment(appointment_id: str, payload: AppointmentUpdate, db: Session = Depends(get_db)):
    service = AppointmentService(db)
    appointment = service.get_appointment(appointment_id)
    if not appointment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found")
    return service.update_appointment(appointment, payload)


@router.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(appointment_id: str, db: Session = Depends(get_db)):
    service = AppointmentService(db)
    appointment = service.get_appointment(appointment_id)
    if not appointment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found")
    service.delete_appointment(appointment)
    return None


@router.patch("/{appointment_id}/status", response_model=AppointmentResponse)
def update_status(appointment_id: str, payload: AppointmentStatusUpdate, db: Session = Depends(get_db)):
    service = AppointmentService(db)
    appointment = service.get_appointment(appointment_id)
    if not appointment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found")
    return service.update_status(appointment, payload)


@router.patch("/{appointment_id}/reschedule", response_model=AppointmentResponse)
def reschedule_appointment(appointment_id: str, payload: AppointmentReschedule, db: Session = Depends(get_db)):
    service = AppointmentService(db)
    appointment = service.get_appointment(appointment_id)
    if not appointment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found")
    return service.reschedule(appointment, payload)
