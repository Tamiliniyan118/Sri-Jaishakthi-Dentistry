from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.models.bill import Bill
from backend.app.models.document import Document
from backend.app.models.patient import Patient
from backend.app.models.visit import Visit
from backend.app.schemas.bill import BillRead
from backend.app.schemas.document import DocumentRead
from backend.app.schemas.patient import PatientCreate, PatientRead, PatientUpdate
from backend.app.schemas.visit import VisitRead

router = APIRouter()


@router.get("/patients", response_model=list[PatientRead])
def list_patients(db: Session = Depends(get_db)) -> list[Patient]:
    return db.query(Patient).order_by(Patient.created_at.desc()).all()


@router.post("/patients", response_model=PatientRead, status_code=status.HTTP_201_CREATED)
def create_patient(payload: PatientCreate, db: Session = Depends(get_db)) -> Patient:
    existing = db.query(Patient).filter(Patient.patient_number == payload.patient_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="Patient number already exists")

    patient = Patient(**payload.model_dump())
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


@router.get("/patients/{patient_id}", response_model=PatientRead)
def get_patient(patient_id: int, db: Session = Depends(get_db)) -> Patient:
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@router.put("/patients/{patient_id}", response_model=PatientRead)
def update_patient(patient_id: int, payload: PatientUpdate, db: Session = Depends(get_db)) -> Patient:
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(patient, key, value)

    db.commit()
    db.refresh(patient)
    return patient


@router.delete("/patients/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(patient_id: int, db: Session = Depends(get_db)) -> None:
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    db.delete(patient)
    db.commit()


@router.get("/patients/{patient_id}/visits", response_model=list[VisitRead])
def list_patient_visits(patient_id: int, db: Session = Depends(get_db)) -> list[Visit]:
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db.query(Visit).filter(Visit.patient_id == patient_id).order_by(Visit.visit_date.desc()).all()


@router.get("/patients/{patient_id}/bills", response_model=list[BillRead])
def list_patient_bills(patient_id: int, db: Session = Depends(get_db)) -> list[Bill]:
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db.query(Bill).filter(Bill.patient_id == patient_id).order_by(Bill.created_at.desc()).all()


@router.get("/patients/{patient_id}/documents", response_model=list[DocumentRead])
def list_patient_documents(patient_id: int, db: Session = Depends(get_db)) -> list[Document]:
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db.query(Document).filter(Document.patient_id == patient_id).order_by(Document.uploaded_at.desc()).all()
