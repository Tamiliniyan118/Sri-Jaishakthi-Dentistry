# SJS Dental Clinic Backend

## Setup

1. Create and activate a Python 3.12 virtual environment.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a PostgreSQL database named `sjs_dental`.
4. Copy `.env.example` to `.env` and adjust the database URL.
5. Run migrations:
   ```bash
   alembic upgrade head
   ```
6. Start the API server:
   ```bash
   uvicorn app.main:create_app --reload --factory
   ```
