"""Thid is good

Revision ID: 842db64d06f7
Revises: 76b386d3b875
Create Date: 2024-02-04 00:49:52.998567

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '842db64d06f7'
down_revision = '76b386d3b875'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fullname', sa.String(length=55), nullable=True))
        batch_op.drop_column('firstname')
        batch_op.drop_column('lastname')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('lastname', sa.VARCHAR(length=50), nullable=True))
        batch_op.add_column(sa.Column('firstname', sa.VARCHAR(length=50), nullable=True))
        batch_op.drop_column('fullname')

    # ### end Alembic commands ###
