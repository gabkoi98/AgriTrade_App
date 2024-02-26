from app import ma
from app.models import Category

class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        dump_only = ("id",)
        include_fk = True
        load_instance = True
