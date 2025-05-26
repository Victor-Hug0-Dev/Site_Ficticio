from rest_framework import generics
from .models import User
from user import serializers
from rest_framework.permissions import AllowAny

class UserListViewSet(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = serializers.UserListSerializer

class UserDetailViewSet(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = serializers.UserDetailSerializer

class UserRegisterViewSet(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = serializers.UserRegisterSerializer

class UserDeleteViewSet(generics.DestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = serializers.UserDeleteSerializer