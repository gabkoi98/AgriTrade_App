from app import ma
from app.models import Users

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
        load_only = ("password",)
        dumb_only = ("id",)
        load_instance = True

     
    address = ma.auto_field(required=False)
    phone = ma.auto_field(required=False)


