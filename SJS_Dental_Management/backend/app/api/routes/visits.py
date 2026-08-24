from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.models.patient import Patient
from backend.app.models.visit import Visit
from backend.app.schemas.visit import VisitCreate, VisitRead, VisitUpdate

router = APIRouter()


@router.post("/patients/{patient_id}/visits", response_model=VisitRead, status_code=status.HTTP_201_CREATED)
def create_visit(patient_id: int, payload: VisitCreate, db: Session = Depends(get_db)) -> Visit:
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    visit = Visit(patient_id=patient_id, **payload.model_dump())
    db.add(visit)
    db.commit()
    db.refresh(visit)
    return visit


@router.get("/visits/{visit_id}", response_model=VisitRead)
def get_visit(visit_id: int, db: Session = Depends(get_db)) -> Visit:
    visit = db.query(Visit).filter(Visit.id == visit_id).first()
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")
    return visit


@router.put("/visits/{visit_id}", response_model=VisitRead)
def update_visit(visit_id: int, payload: VisitUpdate, db: Session = Depends(get_db)) -> Visit:
    visit = db.query(Visit).filter(Visit.id == visit_id).first()
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(visit, key, value)

    db.commit()
    db.refresh(visit)
    return visit


@router.delete("/visits/{visit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_visit(visit_id: int, db: Session = Depends(get_db)) -> None:
    visit = db.query(Visit).filter(Visit.id == visit_id).first()
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")

    db.delete(visit)
    db.commit()
