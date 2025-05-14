from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator

from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'created', 'user_name', 'email')
        

class UserRegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('user_name', 'email', 'password')
        extra_kwargs = {
                'email': {
                    'validators': [
                        UniqueValidator(
                            queryset=User.objects.all(),
                            message = ("amigo usa outro email")
                        )
                    ]
                }
            }