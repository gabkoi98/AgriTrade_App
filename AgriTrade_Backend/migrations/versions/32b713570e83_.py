"""empty message

Revision ID: 32b713570e83
Revises: 663e4de47777
Create Date: 2024-02-01 15:28:55.799376

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '32b713570e83'
down_revision = '663e4de47777'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_products')
    with op.batch_alter_table('cart', schema=None) as batch_op:
        batch_op.drop_column('timestamp')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cart', schema=None) as batch_op:
        batch_op.add_column(sa.Column('timestamp', sa.DATETIME(), nullable=True))

    op.create_table('_alembic_tmp_products',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('productname', sa.VARCHAR(length=255), nullable=False),
    sa.Column('category', sa.INTEGER(), nullable=False),
    sa.Column('description', sa.TEXT(), nullable=False),
    sa.Column('image', sa.VARCHAR(length=1000000), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('timestamp', sa.DATETIME(), nullable=True),
    sa.Column('price_in_cents', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['category'], ['category.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###