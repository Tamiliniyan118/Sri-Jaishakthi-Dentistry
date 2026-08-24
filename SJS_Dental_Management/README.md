# SJS Dental Management

Internal clinic management backend for patient records, visits, billing, and document tracking.

## Scope

This project is intentionally separate from the public website and does not modify the existing website codebase.

## Local setup

1. Create a virtual environment.
2. Copy `.env.example` to `.env` and set the proper `DATABASE_URL` for the existing PostgreSQL database.
3. Install dependencies:
   `pip install -r backend/requirements.txt`
4. Run the app:
   `uvicorn backend.main:app --reload`

## Important

- This backend connects to the existing Neon PostgreSQL database using `DATABASE_URL`.
- Alembic migrations are included but not run automatically against the production database.
- Authentication is intentionally not implemented yet.
