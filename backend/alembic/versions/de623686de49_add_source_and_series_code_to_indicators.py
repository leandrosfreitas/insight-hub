"""add source and series_code to indicators

Revision ID: de623686de49
Revises: fb8374ba77f1
Create Date: 2026-03-13 09:00:17.355149

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'de623686de49'
down_revision: Union[str, Sequence[str], None] = 'fb8374ba77f1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():

    # 1️⃣ cria coluna permitindo NULL
    op.add_column(
        "indicators",
        sa.Column("series_code", sa.String(length=20), nullable=True)
    )

    # 2️⃣ opcional: preencher valor default para registros existentes
    op.execute(
        "UPDATE indicators SET series_code = '000' WHERE series_code IS NULL"
    )

    # 3️⃣ agora torna NOT NULL
    op.alter_column(
        "indicators",
        "series_code",
        nullable=False
    )


def downgrade():

    op.drop_column("indicators", "series_code")
