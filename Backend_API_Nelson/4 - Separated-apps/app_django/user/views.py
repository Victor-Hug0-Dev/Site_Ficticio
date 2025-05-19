from rest_framework import generics, permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer



# ==============================================
# VIEWS DE GERENCIAMENTO DE USUÁRIOS
# ==============================================

class RegisterUserView(generics.CreateAPIView):
    """
    View para registro de novos usuários.
    Permite que qualquer pessoa (mesmo não autenticada) se registre.
    """
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    # Nota: A classe CreateAPIView já fornece toda a lógica necessária
    # para criação de instâncias, então não precisamos sobrescrever métodos


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para visualização de usuários (somente leitura).
    Fornece ações padrão 'list' e 'retrieve'.
    Requer autenticação para acesso.
    """
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    # Como é um ReadOnlyModelViewSet, automaticamente fornece:
    # - GET /users/ (lista todos os usuários)
    # - GET /users/{id}/ (detalhes de um usuário específico)


class ProfileView(APIView):
    """
    View para obtenção do perfil do usuário autenticado.
    Retorna informações básicas do usuário logado.
    """
    
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retorna os dados do perfil do usuário autenticado.
        
        Args:
            request: Objeto de requisição HTTP com o usuário autenticado
            
        Returns:
            Response: Dados básicos do perfil do usuário
        """
        user = request.user  # Obtém o usuário autenticado
        
        return Response({
            "email": user.email,      # Email do usuário
            "username": user.username  # Nome de usuário
            # Você pode adicionar mais campos aqui conforme necessário
        })