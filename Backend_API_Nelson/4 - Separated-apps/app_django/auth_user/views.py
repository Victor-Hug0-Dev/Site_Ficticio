from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from core.exceptions import ValidationError, NotFound, NotAuthenticated


# ==============================================
# VIEWS DE AUTENTICAÇÃO
# ==============================================

class CustomLoginView(ObtainAuthToken):
    """
    View personalizada para login de usuários.
    Herda de ObtainAuthToken para fornecer autenticação por token.
    Permite acesso sem autenticação (AllowAny).
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Processa a requisição POST para login.
        
        Args:
            request: Objeto de requisição HTTP
        """
        
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            raise ValidationError("Usuário e senha são obrigatórios.")
        
        user = authenticate(username=username, password=password)

        # ================= VERIFICAÇÕES DE SEGURANÇA =================
        
        # Verifica se o usuário existe
        if user is None:
            raise NotFound(
                    detail='Usuário não encontrado. Verifique o ID fornecido.')
    
        # Verifica se o usuário está ativo
        if not user.is_active:
            raise ValidationError(
                    detail='Sua conta está desativada. Contate o suporte para reativar.',
                    extra_data={'support_email': 'suporte@empresa.com'}
                )
    
        # Verifica se o usuário está autenticado
        if not user.is_authenticated:
            raise NotAuthenticated(
                    detail='Usuário não autenticado. Verifique suas credenciais.'
                )
        
        # ================= RESPOSTA DE SUCESSO =================
        
        # Obtém ou cria um token para o usuário
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,               # Chave do token
            'user_id': token.user_id,         # ID do usuário
            'email': token.user.email,        # Email do usuário
            'username': token.user.username,  # Nome de usuário
            'created_at': token.created,      # Data de criação do token
            'created': created,            # Indica se o token foi criado agora
        })


class LogoutView(APIView):
    """
    View para logout de usuários.
    Requer autenticação para acesso (IsAuthenticated).
    """
    
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Processa a requisição POST para logout.
        
        Args:
            request: Objeto de requisição HTTP
            
        Returns:
            Response: Resposta HTTP confirmando o logout
        """
        
        # Remove o token de autenticação do usuário
        request.user.auth_token.delete()
        
        return Response({'detail': 'Logout realizado com sucesso.'})