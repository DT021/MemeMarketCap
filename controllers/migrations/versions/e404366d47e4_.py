"""empty message

Revision ID: e404366d47e4
Revises: 51c8b1fdfeed
Create Date: 2020-06-05 12:15:54.538243

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e404366d47e4'
down_revision = '51c8b1fdfeed'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('train_data', 'end_page')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('train_data', sa.Column('end_page', sa.INTEGER(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###