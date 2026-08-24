from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes import bills, documents, patients, visits

app = FastAPI(
    title="SJS Dental Management API",
    description="Internal clinic management system for patient records and billing.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients.router, tags=["patients"])
app.include_router(visits.router, tags=["visits"])
app.include_router(bills.router, tags=["bills"])
app.include_router(documents.router, tags=["documents"])


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "sjs-dental-management"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
