from app import ma
from app.models import Cart, Products

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Products

class CartSchema(ma.SQLAlchemyAutoSchema):
    product = ma.Nested(ProductSchema, only=("productname", "price", "image"))

    class Meta:
        model = Cart
        dump_only = ("id",)
        include_fk = True
        load_instance = True


# from app import ma
# from app.models import Cart

# class CartSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = Cart
#         dump_only = ("id",)
#         include_fk = True
#         load_instance = True

    # user_id = ma.auto_field(required=True)
    # product_id = ma.auto_field(required=True)
    # product_name = ma.auto_field(required=True)
    # product_price = ma.auto_field(required=True)


