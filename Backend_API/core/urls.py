from django.urls import include, path
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [   
   path('admin/',admin.site.urls),
   path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path('user/', include('user.urls')),
   path('auth/', include('auth_jwt.urls')),

   # URLs do allauth (necessárias para fluxo social e gerenciamento de conta)
    path('accounts/', include('allauth.urls')),
    # URLs do app auth_user (para callback do Google)
    path("", include('auth_allauth.urls')),
]

