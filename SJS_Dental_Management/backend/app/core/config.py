from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "SJS Dental Management"
    database_url: str = "postgresql+psycopg://user:pass@localhost:5432/sjs_dental_management"
    patient_files_dir: str = "./patient_files"
    max_upload_size: int = 10 * 1024 * 1024
    allowed_file_types: str = "PDF,JPG,JPEG,PNG,WEBP"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def patient_files_path(self) -> Path:
        return Path(self.patient_files_dir).resolve()

    @property
    def allowed_extensions(self) -> set[str]:
        return {ext.strip().upper() for ext in self.allowed_file_types.split(",") if ext.strip()}


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
