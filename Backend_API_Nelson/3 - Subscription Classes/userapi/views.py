from rest_framework import generics, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken, ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer, RegistrationSerializer
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token


@method_decorator(ensure_csrf_cookie, name='dispatch')
class CsrfTokenView(APIView):
    permission_classes = []

    def get(self, request):
        csrf_token = get_token(request)  # força criação do token
        return Response({'message': 'CSRF cookie set', 'csrfToken': csrf_token})

# ========== REGISTRO DE USUÁRIO ==========
class RegisterUserView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]  # Adicionado para permitir registro sem autenticação

# ========== CRUD DE USUÁRIOS ==========
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]  # Protege todas as ações por padrão

    # Sobrescrevemos get_permissions para permitir criação sem autenticação
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()

    # ========== ENDPOINTS ADICIONAIS ==========
    @action(detail=False, methods=['get'])
    def profile(self, request):
        """Endpoint para obter informações do usuário logado"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


# ========== AUTENTICAÇÃO ==========
class CustomAuthToken(ObtainAuthToken):
    """Endpoint personalizado para login/logout com token"""
    
    def post(self, request, *args, **kwargs):
        """Login: gera/recupera token do usuário"""
        serializer = self.serializer_class(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username': user.username
        })

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()  # Apaga o token
        return Response({'message': 'Logout realizado com sucesso.'})