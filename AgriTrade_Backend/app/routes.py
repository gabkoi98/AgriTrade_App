from flask import jsonify
from marshmallow import ValidationError

from app import app, jwt, api

# this is for the  user 
from app.resources.user import (
    UserRegister,
    UserLogin,
    UserUpdateResource,
    GetUserResources,
    UserDeleteResource,
)

from app.resources.product import(
    CreateProdct,
    UpdateProduct,
    GetAllProduct,
    GetProductbyid,
    DeleteProductbyid

)

from app.resources.cart import(
   Create,
   UpdateCartItem,
   GetCarts,
   DeleteCart,

)

from app.resources.category import(
    CreateCategory, 
)


# User Api
api.add_resource(UserRegister, "/register")
api.add_resource(UserLogin, "/login")
api.add_resource(UserUpdateResource, "/update")
api.add_resource(GetUserResources, "/user/<int:user_id>")
api.add_resource(UserDeleteResource, "/user/<int:user_id>")


# Product Api
api.add_resource(CreateProdct, "/product")
api.add_resource(UpdateProduct, "/product/<int:product_id>")
api.add_resource(GetAllProduct, "/products")
api.add_resource(GetProductbyid, "/product/<int:user_id>")
api.add_resource(DeleteProductbyid,"/product/<int:user_id>")

# category API
api.add_resource(CreateCategory, "/category" )




# Cart Api
api.add_resource(Create, "/create/<int:product_id>/<int:user_id>")
api.add_resource(GetCarts, "/getcarts/<int:user_id>")
api.add_resource(DeleteCart, "/deletecart/<int:cart_id>")
api.add_resource(UpdateCartItem,  "/updatequantity/<int:product_id>/<int:user_id>")





@app.route('/')
@app.route('/index')
def index():
    return 'This is my first flask project!!'