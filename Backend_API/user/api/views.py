
from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from .models import User
from .serializers import UserSerializer

class UserViewSet(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRegisterViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer