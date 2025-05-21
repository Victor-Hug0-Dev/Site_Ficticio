from rest_framework import generics, permissions, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from .models import User, Profile
from .serializers import UserSerializer, ProfileSerializer



# ==============================================
# VIEW DE REGISTRO DE USUÁRIOS
# ==============================================
class RegisterUserView(generics.CreateAPIView):
    """
    View para registro de novos usuários.
    Permite que qualquer pessoa (mesmo não autenticada) se registre.
    Endpoint: POST /api/register/
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Permite acesso sem autenticação

    # Nota: A classe CreateAPIView já fornece toda a lógica necessária
    # para criação de instâncias, então não precisamos sobrescrever métodos


# ==============================================
# VIEWSET DE GERENCIAMENTO DE USUÁRIOS
# ==============================================
class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento completo de usuários.
    Fornece todas as operações CRUD (Create, Read, Update, Delete).
    
    Endpoints disponíveis:
    - GET /api/users/ - Lista todos os usuários
    - GET /api/users/{id}/ - Obtém um usuário específico
    - POST /api/users/ - Cria um novo usuário
    - PUT /api/users/{id}/ - Atualiza um usuário (todos os campos)
    - PATCH /api/users/{id}/ - Atualiza um usuário (campos específicos)
    - DELETE /api/users/{id}/ - Remove um usuário
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Requer autenticação para todas as operações

    @action(detail=True, methods=['post'])
    def change_password(self, request, pk=None):
        """
        Endpoint personalizado para alteração de senha.
        URL: POST /api/users/{id}/change_password/
        
        Args:
            request: Requisição HTTP
            pk: ID do usuário
            
        Returns:
            Response: Mensagem de sucesso ou erro
        """
        user = self.get_object()
        if 'password' not in request.data:
            return Response(
                {'error': 'A senha é obrigatória'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(request.data['password'])
        user.save()
        return Response({'message': 'Senha alterada com sucesso'})


# ==============================================
# VIEW DE PERFIL DO USUÁRIO
# ==============================================
class ProfileView(APIView):
    """
    View para acesso ao perfil do usuário logado.
    Endpoint: GET /api/profile/
    """
    permission_classes = [IsAuthenticated]  # Requer autenticação

    def get(self, request):
        """
        Obtém os dados do usuário logado.
        
        Args:
            request: Requisição HTTP
            
        Returns:
            Response: Dados do usuário logado
        """
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)
    
