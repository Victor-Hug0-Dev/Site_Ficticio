from django.urls import path

from rest_framework import routers
from posts.api import views


urlpatterns = [
    path('post/', views.PostViewSet.as_view()),
]

