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
        write_only=True,                    # A senha só pode ser escrita, nunca lida na API
        style={'input_type': 'password'},   # No navegador da API, mostra como campo de senha (****)
        trim_whitespace=False,              # Não remove espaços em branco (senhas podem começar/terminar com espaço)
        required=True,                      # Obrigatório no cadastro
        help_text="Senha do usuário (só é necessária para criação)"     # Texto de ajuda na documentação
    )

    class Meta:
        """
        Classe Meta para configurações do serializador.
        """
        model = User  # Indica qual modelo Django será serializado
        fields = ['id', 'email', 'username', 'password']   #Quais campos do modelo serão incluídos
        extra_kwargs = {
            'email': {'required': True},    # Torna email obrigatório
            'username': {'required': True}  # Torna email obrigatório
        }

    def create(self, validated_data):
        """
        Cria e retorna um novo usuário com os dados validados.
        
        Args:
            validated_data (dict): Dados já validados para criação do usuário
            
        Returns:
            User: Instância do usuário criado
        """
        # Utiliza o método create_user do UserManager personalizado
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user