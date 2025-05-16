from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate

class CustomLoginView(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        #Verifica se o usuário já está logado)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        token_key = response.data['token']
       
        #token = Token.objects.get(key=response.data['token'])
        token, created = Token.objects.get_or_create(user=user)
        #(key=token_key)
        user = token.user

        #/////////////////// VERIFICAÇÕES ///////////////////////


        # Verifica se o usuário está ativo
        if not user.is_active:
            return Response({'error': 'Usuário inativo.'}, status=403)
        # Verifica se o usuário está autenticado
        if not user.is_authenticated:
            return Response({'error': 'Usuário não autenticado.'}, status=403)
        
        return Response({
            'token': token.key,
            'user_id': token.user_id,
            'email': token.user.email,
            'username': token.user.username,
            'created_at': token.created,
            'created': created,
        })

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({'detail': 'Logout realizado com sucesso.'})
