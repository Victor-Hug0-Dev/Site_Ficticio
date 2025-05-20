from rest_framework import serializers
from django.contrib.auth import authenticate
from user.models import User

class AuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class AuthRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class AuthLoginSerializer(serializers.Serializer):    
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):      
        email = data.get('email')
        password = data.get('password')
        print(email)
        print(password)

        # Verifique se ambos email e password foram fornecidos
        if not email or not password:
            raise serializers.ValidationError("Both email and password are required.")
        
        user = authenticate(user=email, password=password)
        
        print(user)
        if not user:
            raise serializers.ValidationError("Incorrect Credentials")
            
        if not user.is_active:
            raise serializers.ValidationError("User is not active")       
       
        return user