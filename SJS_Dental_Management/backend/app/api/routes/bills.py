from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.models.bill import Bill
from backend.app.models.patient import Patient
from backend.app.schemas.bill import BillCreate, BillRead, BillUpdate

router = APIRouter()


@router.post("/patients/{patient_id}/bills", response_model=BillRead, status_code=status.HTTP_201_CREATED)
def create_bill(patient_id: int, payload: BillCreate, db: Session = Depends(get_db)) -> Bill:
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    if payload.bill_number:
        existing = db.query(Bill).filter(Bill.bill_number == payload.bill_number).first()
        if existing:
            raise HTTPException(status_code=400, detail="Bill number already exists")

    bill = Bill(patient_id=patient_id, **payload.model_dump())
    db.add(bill)
    db.commit()
    db.refresh(bill)
    return bill


@router.get("/bills/{bill_id}", response_model=BillRead)
def get_bill(bill_id: int, db: Session = Depends(get_db)) -> Bill:
    bill = db.query(Bill).filter(Bill.id == bill_id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    return bill


@router.put("/bills/{bill_id}", response_model=BillRead)
def update_bill(bill_id: int, payload: BillUpdate, db: Session = Depends(get_db)) -> Bill:
    bill = db.query(Bill).filter(Bill.id == bill_id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(bill, key, value)

    db.commit()
    db.refresh(bill)
    return bill


@router.delete("/bills/{bill_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bill(bill_id: int, db: Session = Depends(get_db)) -> None:
    bill = db.query(Bill).filter(Bill.id == bill_id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")

    db.delete(bill)
    db.commit()
