from rest_framework import serializers
from .models import User, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        extra_kwargs = {
            'password': {'write_only': True},
        }
        model = User
        fields = ('id', 
                  'username', 
                  'email', 
                  'password', 
                  'is_active')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        extra_kwargs = {
            'user': {'required': False},
        }
        model = Profile
        fields = ('id', 'user', 'bio')
        read_only_fields = ('user',)
        