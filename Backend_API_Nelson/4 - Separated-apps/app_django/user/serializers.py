from rest_framework import serializers
from .models import User

# ==============================================
# SERIALIZADOR DE USUÁRIO
# ==============================================

class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para o modelo User personalizado.
    Trata a serialização e desserialização dos dados do usuário.
    """

    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
    )

    class Meta:
        """
        Classe Meta para configurações do serializador.
        """
        model = User
        fields = ['id', 'email', 'username', 'password', 'is_active']
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': True},
            'is_active': {'required': False}
        }

    def create(self, validated_data):
        """
        Cria e retorna um novo usuário com os dados validados.
        
        Args:
            validated_data (dict): Dados já validados para criação do usuário
            
        Returns:
            User: Instância do usuário criado
        """
        validated_data.pop('is_active', None)
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """
        Atualiza uma instância de usuário existente.
        
        Args:
            instance (User): Instância do usuário a ser atualizada
            validated_data (dict): Dados validados para atualização
            
        Returns:
            User: Instância do usuário atualizada
        """
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