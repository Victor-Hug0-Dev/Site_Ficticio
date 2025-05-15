from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (RegisterUserView,UserViewSet,CustomAuthToken, LogoutView)
from .views import CsrfTokenView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')  # Registra todas as rotas CRUD para User

urlpatterns = [
    path('csrf/', CsrfTokenView.as_view(), name='get-csrf'),
    path('register/', RegisterUserView.as_view(), name='user-register'),
    path('auth/login/', CustomAuthToken.as_view(), name='auth-login'),
    path('auth/logout/', LogoutView.as_view(), name='auth-logout'),
] + router.urls