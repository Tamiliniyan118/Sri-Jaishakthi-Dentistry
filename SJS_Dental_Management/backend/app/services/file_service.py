import os
import re
from pathlib import Path

from fastapi import UploadFile

from backend.app.core.config import settings

ALLOWED_EXTENSIONS = {ext.upper() for ext in settings.allowed_extensions}


def sanitize_filename(filename: str) -> str:
    name = Path(filename).name
    name = name.replace(" ", "_")
    name = re.sub(r"[^A-Za-z0-9_.-]", "_", name)
    if not name or name in {".", ".."}:
        raise ValueError("Invalid file name")
    return name


def ensure_patient_directory(patient_number: str) -> Path:
    base_dir = Path(settings.patient_files_dir)
    base_dir.mkdir(parents=True, exist_ok=True)
    patient_dir = base_dir / patient_number
    patient_dir.mkdir(parents=True, exist_ok=True)

    for subfolder in ["x-rays", "prescriptions", "bills", "photos", "other"]:
        (patient_dir / subfolder).mkdir(parents=True, exist_ok=True)

    return patient_dir


def validate_upload(file: UploadFile, category: str) -> tuple[str, str]:
    if not file.filename:
        raise ValueError("File name is required")

    clean_name = sanitize_filename(file.filename)
    extension = Path(clean_name).suffix.upper().lstrip(".")
    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError(f"Unsupported file type: {extension}")

    if category not in {"x-rays", "prescriptions", "bills", "photos", "other"}:
        raise ValueError("Invalid document category")

    if file.size and file.size > settings.max_upload_size:
        raise ValueError("File exceeds maximum allowed size")

    return clean_name, extension


def get_patient_file_path(patient_number: str, category: str, filename: str) -> str:
    patient_dir = ensure_patient_directory(patient_number)
    target_dir = patient_dir / category
    final_path = (target_dir / sanitize_filename(filename)).resolve()
    base = patient_dir.resolve()

    if base not in final_path.parents and final_path != base:
        raise ValueError("Path traversal detected")

    return str(final_path)
