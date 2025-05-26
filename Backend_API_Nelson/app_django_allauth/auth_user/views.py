from allauth.socialaccount.helpers import render_authentication_error
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialLogin
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.views import OAuth2CallbackView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class GoogleCallbackView(OAuth2CallbackView, APIView):
    adapter_class = GoogleOAuth2Adapter
    permission_classes = [AllowAny]

    def dispatch(self, request, *args, **kwargs):
        try:
            response = super().dispatch(request, *args, **kwargs)
            
            # Se o login foi bem sucedido, retorna o token
            if request.user.is_authenticated:
                token, created = Token.objects.get_or_create(user=request.user)
                return Response({
                    'token': token.key,
                    'user_id': request.user.id,
                    'email': request.user.email,
                    'username': request.user.username
                })
            
            return response
        except Exception as e:
            return render_authentication_error(request, 'google', exception=e)
