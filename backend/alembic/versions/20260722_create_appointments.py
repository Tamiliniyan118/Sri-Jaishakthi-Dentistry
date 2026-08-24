from alembic import op
import sqlalchemy as sa


revision = "20260722_create_appointments"
down_revision = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "appointments",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("reference_number", sa.String(length=50), nullable=False),
        sa.Column("patient_name", sa.String(length=255), nullable=False),
        sa.Column("mobile", sa.String(length=20), nullable=False),
        sa.Column("age", sa.Integer(), nullable=False),
        sa.Column("treatment", sa.String(length=255), nullable=False),
        sa.Column("preferred_date", sa.Date(), nullable=False),
        sa.Column("preferred_time", sa.String(length=20), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("reference_number"),
    )
    op.create_index(op.f("ix_appointments_reference_number"), "appointments", ["reference_number"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_appointments_reference_number"), table_name="appointments")
    op.drop_table("appointments")
