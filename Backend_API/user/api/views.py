from rest_framework import generics
from .models import User
from user.api import serializers

class UserListViewSet(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserListSerializer

class UserDetailViewSet(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserDetailSerializer

class UserRegisterViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserRegisterSerializer

class UserDeleteViewSet(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserDeleteSerializer