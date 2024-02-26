from flask import jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
)
from flask_restful import Resource
from app.models import Cart, Products
from app.schemas.cart import CartSchema
from flask import request



cart_schema = CartSchema()
carts_schema = CartSchema(many=True)


class Create(Resource):
    @classmethod
    def post(cls, product_id: int, user_id: int):
        product_exists = Products.query.get(product_id)
        if not product_exists:
            return {"message": "Product does not exist"}, 400
        
    
        cart_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
        if cart_item:
            return {"message": "Product already exists in the cart"}, 400

        cart_item = Cart(user_id=user_id, product_id=product_id)
        cart_item.save_to_db()

        return cart_schema.dump(cart_item), 201
    



class GetCarts(Resource):
    @classmethod    
    def get(cls, user_id: int):
        user_cart = Cart.query.filter_by(user_id=user_id).all()

        cart_data = carts_schema.dump(user_cart)

        return {"cart": cart_data}, 200
        

class DeleteCart(Resource):
    @classmethod    
    def delete(cls, cart_id: int):

        cart = Cart.find_by_id(cart_id)

        if not cart:
            return{"Message": "Cart not found"}
        
        cart.delete_from_db()
        return {"message": "Cart deleted successfully"}, 200



class UpdateCartItem(Resource):
    @classmethod
    def put(cls, user_id: int, product_id: int):
        cart_data = request.get_json()
        updated_quantity = cart_data.get("quantity")
        
        cart = Cart.find_by_user_id_and_product_id(user_id, product_id)

        if not cart:
            return {"message": "Cart item not found for the user and product"}, 404
        
    
        cart.quantity = updated_quantity

        cart.save_to_db()

        return cart_schema.dump(cart), 200
