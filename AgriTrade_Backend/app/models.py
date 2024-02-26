from typing import List
from datetime import datetime, date, timedelta
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy import or_
from werkzeug.security import generate_password_hash, check_password_hash
import hashlib
import pytz
import moment

from app import app, db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    fullname = db.Column(db.String(55))
    username = db.Column(db.String(50), )
    email = db.Column(db.String(50), )
    address = db.Column(db.String(250),)
    phone = db.Column(db.String(50), )
    password = db.Column(db.String(150),)
    timestamp = db.Column(db.DateTime, default=datetime.now())

    # reference back to the cart
    carts = db.relationship('Cart', backref='user', lazy=True)


    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password: str):
        self.password = generate_password_hash(password)

    def check_password(self, password: str):
        return check_password_hash(self.password, password)
    
    @classmethod
    def find_by_id(cls, _id: int) -> "Users":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_username(cls, username: str) -> "Users":
        return cls.query.filter_by(username=username).first()
    
    @classmethod
    def find_by_email(cls, email: str) -> "Users":
        return cls.query.filter_by(email=email).first()
    
    
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(50), nullable=False, )
    image = db.Column(db.String(255), nullable=False, )
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def save_to_db(self):
        return self.title
     

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    productname = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    image = db.Column(db.String(1000000))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, default=datetime.now())


    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id: int) -> "Products":
        return cls.query.filter_by(id = id).first()

    @classmethod
    def find_by_productname(cls, product: str) -> "Products":
        return cls.query.filter_by(productname=product).first()
    
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, default=1)
    
    # reference back to the Products
    product = db.relationship('Products', backref='cart_product', lazy=True)

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_user_id_and_product_id(cls, user_id: int, product_id: int) -> "Cart":
        return cls.query.filter_by(user_id=user_id, product_id=product_id).first()

    @classmethod
    def find_by_id(cls, id: int) -> "Cart":
        return cls.query.filter_by(id = id).first()
    
    


                   





