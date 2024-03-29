"""This is for des 

Revision ID: f1cfb248432c
Revises: 842db64d06f7
Create Date: 2024-02-04 15:23:04.770616

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f1cfb248432c'
down_revision = '842db64d06f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.TEXT(),
               type_=sa.String(length=300),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.String(length=300),
               type_=sa.TEXT(),
               existing_nullable=False)

    # ### end Alembic commands ###
