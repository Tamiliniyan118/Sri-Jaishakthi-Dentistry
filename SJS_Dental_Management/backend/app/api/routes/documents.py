import os
import time
from pathlib import Path

from pathlib import Path
import os
import time

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.models.document import Document
from backend.app.models.patient import Patient
from backend.app.schemas.document import DocumentRead
from backend.app.services.file_service import ensure_patient_directory, get_patient_file_path, sanitize_filename, validate_upload

router = APIRouter()


def _unique_filename(original_name: str, patient_id: int) -> str:
    clean_name = sanitize_filename(original_name)
    stem = Path(clean_name).stem
    suffix = Path(clean_name).suffix
    timestamp = int(time.time() * 1000)
    unique_name = f"{stem}_{patient_id}_{timestamp}{suffix}"
    return sanitize_filename(unique_name)


@router.post("/patients/{patient_id}/documents", response_model=DocumentRead, status_code=status.HTTP_201_CREATED)
def create_document(
    patient_id: int,
    file: UploadFile = File(...),
    category: str = "other",
    visit_id: int | None = None,
    db: Session = Depends(get_db),
) -> Document:
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    try:
        clean_name, extension = validate_upload(file, category)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    ensure_patient_directory(patient.patient_number)
    file_path = get_patient_file_path(patient.patient_number, category, clean_name)

    if Path(file_path).exists():
        clean_name = _unique_filename(clean_name, patient_id)
        file_path = get_patient_file_path(patient.patient_number, category, clean_name)

    file.file.seek(0)
    file_bytes = file.file.read()
    if file_bytes and len(file_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File exceeds maximum allowed size")

    with open(file_path, "wb") as handle:
        handle.write(file_bytes)

    document = Document(
        patient_id=patient_id,
        visit_id=visit_id,
        file_name=clean_name,
        file_type=extension,
        file_path=file_path,
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    return document


@router.delete("/documents/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(document_id: int, db: Session = Depends(get_db)) -> None:
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    if document.file_path and os.path.exists(document.file_path):
        try:
            os.remove(document.file_path)
        except OSError:
            pass

    db.delete(document)
    db.commit()
