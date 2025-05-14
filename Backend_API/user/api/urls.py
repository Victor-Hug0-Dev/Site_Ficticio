from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from user.api import views

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet)

