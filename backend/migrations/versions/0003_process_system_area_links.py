"""Add system area to processes and document-process links."""

from alembic import op
import sqlalchemy as sa

revision = "0003_process_system_area_links"
down_revision = "0002_documents"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("processes", sa.Column("system_area_code", sa.String(length=64), nullable=False, server_default="IATF_QM"))
    op.create_table(
        "document_process_links",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("document_id", sa.String(length=36), sa.ForeignKey("document_masters.id", ondelete="CASCADE"), nullable=False),
        sa.Column("process_id", sa.String(length=36), sa.ForeignKey("processes.id", ondelete="CASCADE"), nullable=False),
        sa.Column("process_step_id", sa.String(length=100), nullable=False, server_default=""),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("document_id", "process_id", "process_step_id", name="uq_document_process_step"),
    )


def downgrade() -> None:
    op.drop_table("document_process_links")
    op.drop_column("processes", "system_area_code")
