from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import login
from allauth.account.auth_backends import AuthenticationBackend
from allauth.account.utils import perform_login
from allauth.account import app_settings as allauth_settings
from core.exceptions import ValidationError, AuthenticationFailed


# =============================================='
# VIEWS DE AUTENTICAÇÃO
# ==============================================

class CustomLoginView(APIView):
    """
    View personalizada para login com integração django-allauth
    """
    permission_classes = [AllowAny]

    def post(self, request):
 
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            raise ValidationError("Usuário e senha são obrigatórios.")
        
         # Usa o backend de autenticação do allauth
        auth_backend = AuthenticationBackend()
        user = auth_backend.authenticate(request, email=email, password=password)

        # ================= VERIFICAÇÕES DE SEGURANÇA =================
        
        # Verifica se o usuário existe
        if user is None:
            raise AuthenticationFailed()
    
        # Verifica se o usuário está ativo
        if not user.is_active:
            raise ValidationError()
    
        # Verifica se o usuário está autenticado
        if not user.is_authenticated:
            raise NotAuthenticated()
        
        # Verificação de e-mail (se configurado como obrigatório)
        if allauth_settings.EMAIL_VERIFICATION == 'mandatory':
            email_address = user.emailaddress_set.filter(email=user.email).first()
            if not email_address or not email_address.verified:
                raise ValidationError("E-mail não verificado")
        
        # ================= RESPOSTA DE SUCESSO =================
        
        # Realiza o login completo do allauth (para sessões)
        perform_login(request, user, email_verification='optional')
        
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