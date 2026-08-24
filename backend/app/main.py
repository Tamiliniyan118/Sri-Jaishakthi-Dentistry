from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.appointments import router as appointments_router
from app.core.config import get_settings
from app.database.base import Base
from app.database.session import engine

settings = get_settings()


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, version="1.0.0")

    app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

    Base.metadata.create_all(bind=engine)
    app.include_router(appointments_router)
    @app.get("/cors-test")
    def cors_test():
        return {
        "message": "NEW BUILD IS RUNNING",
        "origins": "*",
        "credentials": False
    }
    return app
