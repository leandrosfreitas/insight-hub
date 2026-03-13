"""add role to users

Revision ID: fb8374ba77f1
Revises: f1460b000e9d
Create Date: 2026-03-13 08:39:17.678559

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fb8374ba77f1'
down_revision: Union[str, Sequence[str], None] = 'f1460b000e9d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    # criar enum
    userrole = sa.Enum('admin', 'user', name='userrole')
    userrole.create(op.get_bind(), checkfirst=True)

    # remover default atual
    op.execute("ALTER TABLE users ALTER COLUMN role DROP DEFAULT")

    # alterar tipo da coluna
    op.alter_column(
        'users',
        'role',
        existing_type=sa.VARCHAR(length=20),
        type_=userrole,
        existing_nullable=False,
        postgresql_using="role::userrole"
    )

    # recriar default
    op.execute("ALTER TABLE users ALTER COLUMN role SET DEFAULT 'user'")


def downgrade() -> None:

    op.execute("ALTER TABLE users ALTER COLUMN role DROP DEFAULT")

    op.alter_column(
        'users',
        'role',
        existing_type=sa.Enum('admin', 'user', name='userrole'),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False
    )

    op.execute("ALTER TABLE users ALTER COLUMN role SET DEFAULT 'user'")

    sa.Enum('admin', 'user', name='userrole').drop(op.get_bind(), checkfirst=True)
    