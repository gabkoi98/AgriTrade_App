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
from app.models import Category
from app.schemas.category import CategorySchema    

category_schema = CategorySchema()


class CreateCategory(Resource):
     @classmethod
     def post(cls):
          category_data = category_schema.load(request.get_json())
          category_data.save_to_db()

          return{"Message": "Product created sucessfully"},201
    