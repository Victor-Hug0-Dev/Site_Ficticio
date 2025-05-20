from rest_framework import generics, permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Profile
from .serializers import UserSerializer, ProfileSerializer



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


class UserViewSet(viewsets.ModelViewSet):
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

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  # Pegar o User diretamente
        serializer = ProfileSerializer(user)
        return Response(serializer.data)
    
