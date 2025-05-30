from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator
from .models import User

#Serializer geral denerico
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'created', 'username', 'email', 'password')
        
class UserListSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'created', 'username', 'email')


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'created', 'username', 'email')
        
class UserRegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
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

class UserDeleteSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id')
       
class UserUpdateSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')        
    