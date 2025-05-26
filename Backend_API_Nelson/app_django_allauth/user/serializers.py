from rest_framework import serializers
from .models import User

# ==============================================
# SERIALIZADOR DE USUÁRIO
# ==============================================

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=False, style={'input_type': 'password'},)

    class Meta:

        model = User
        fields = ['id', 'email', 'username', 'password', 'is_active']
        extra_kwargs = {'email': {'required': True}, 'username': {'required': True}, 'is_active': {'required': False} }

    def create(self, validated_data):

        validated_data.pop('is_active', None)
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):

        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']