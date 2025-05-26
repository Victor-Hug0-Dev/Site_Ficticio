from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.adapter import DefaultAccountAdapter
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def populate_user(self, request, sociallogin, data):
        user = super().populate_user(request, sociallogin, data)
        
        # Garante que o username seja único
        if not user.username:
            email = data.get('email', '')
            user.username = email.split('@')[0]
            
            # Se o username já existir, adiciona um número
            base_username = user.username
            counter = 1
            while User.objects.filter(username=user.username).exists():
                user.username = f"{base_username}{counter}"
                counter += 1
        
        return user

    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)
        
        # Garante que o usuário tenha um perfil
        if not hasattr(user, 'profile'):
            from user.models import Profile
            Profile.objects.create(user=user)
            
        return user 