"""Add controlled document master and version tables."""

from alembic import op
import sqlalchemy as sa

revision = "0002_documents"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "document_types",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("code", sa.String(length=40), nullable=False, unique=True),
        sa.Column("name", sa.String(length=160), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False, server_default=sa.true()),
    )
    op.create_table(
        "document_masters",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("document_number", sa.String(length=64), nullable=False, unique=True),
        sa.Column("title", sa.String(length=250), nullable=False),
        sa.Column("document_type_id", sa.String(length=36), sa.ForeignKey("document_types.id"), nullable=False),
        sa.Column("owner", sa.String(length=200), nullable=False, server_default=""),
        sa.Column("system_area_code", sa.String(length=64), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="DRAFT"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_table(
        "document_versions",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("document_id", sa.String(length=36), sa.ForeignKey("document_masters.id", ondelete="CASCADE"), nullable=False),
        sa.Column("version_number", sa.Integer(), nullable=False, server_default="1"),
        sa.Column("content", sa.JSON(), nullable=False),
        sa.Column("change_reason", sa.Text(), nullable=False, server_default=""),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="DRAFT"),
        sa.Column("content_hash", sa.String(length=64), nullable=False, server_default=""),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("document_id", "version_number", name="uq_document_version"),
    )


def downgrade() -> None:
    op.drop_table("document_versions")
    op.drop_table("document_masters")
    op.drop_table("document_types")
