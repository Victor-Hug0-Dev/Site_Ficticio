from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # URLs de autenticação do dj-rest-auth
    path('api/auth/', include('dj_rest_auth.urls')),
    # URL de registro do dj-rest-auth (requer dj_rest_auth.registration)
    path('api/auth/register/', include('dj_rest_auth.registration.urls')),
    # URLs do allauth (necessárias para fluxo social e gerenciamento de conta)
    path('accounts/', include('allauth.urls')),

    # URLs do app auth_user (para callback do Google)
    path("", include('auth_user.urls')),

    # Outras URLs da API
    path('api/', include('user.urls')),
    path('api/', include('inventory.urls')),
]
