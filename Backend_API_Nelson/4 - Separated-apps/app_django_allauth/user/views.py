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

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Permite acesso sem autenticação

    # Nota: A classe CreateAPIView já fornece toda a lógica necessária
    # para criação de instâncias, então não precisamos sobrescrever métodos


# ==============================================
# VIEWSET DE GERENCIAMENTO DE USUÁRIOS
# ==============================================
class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Requer autenticação para todas as operações

    @action(detail=True, methods=['post'])
    def change_password(self, request, pk=None):
        """
        Endpoint personalizado para alteração de senha.
        pk: ID do usuário
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

    permission_classes = [IsAuthenticated]  # Requer autenticação

    def get(self, request):
        """
        Returns:
            Response: Dados do usuário logado
        """
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)
    
