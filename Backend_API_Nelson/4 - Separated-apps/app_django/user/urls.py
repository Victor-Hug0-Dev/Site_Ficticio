from django.urls import path
from .views import RegisterUserView
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
] + router.urls

