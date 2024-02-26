from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
)
from flask_restful import Resource
from app.models import Products
from app.schemas.product import ProductSchema

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


class CreateProdct(Resource):
     @classmethod
     def post(cls):
          product = product_schema.load(request.get_json())
          product.save_to_db()

          return{"Message": "Product created sucessfully"},201
     

    
class UpdateProduct(Resource):
    @classmethod
    def put(cls, product_id: int):
         
          product_data = product_schema.load(request.get_json())
          product  = Products.find_by_id(product_id)
          
          if not product:
               return {"message": "Product not found in the database"}, 404
          
          product.productname = product_data.productname
          product.price = product_data.price
          product.category = product_data.category
          product.image = product_data.image
          product.description = product_data.description
          product.save_to_db()

          return product_schema.dump(product), 200
    
        
class GetAllProduct(Resource):
     @classmethod
     def get(cls):
          product = Products.query.all()

          results = products_schema.dump(product)
          return results, 200


class GetProductbyid(Resource):
     @classmethod
     def get(cls, user_id: int):
          product = Products.find_by_id(user_id)

          if not product:
               return{"Message": "Proddut not found in this db"}, 401
          
          else:
               return product_schema.dump(product), 201
          

class DeleteProductbyid(Resource):
     @classmethod
     def delete(cls, user_id: int ):
          product = Products.find_by_id(user_id)

          if not product:
               return{"Message": "product not found in the database"}, 401
          
          product.delete_from_db()
          return{"Messahe": "Product deleted successfully from the db"}, 201 
          
          
               



          
       