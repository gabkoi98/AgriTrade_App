from app import ma
from app.models import Products

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Products
        dump_only = ("id",)
        include_fk = True
        load_instance = True

    id = ma.auto_field(required=False)  
