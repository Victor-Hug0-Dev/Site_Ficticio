from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from .models import Post
from .serializers import PostSerializer

class PostViewSet(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer