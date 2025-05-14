from django.urls import path
from user.api import views

urlpatterns = [
    path('listall/', views.UserViewSet.as_view()),
    path('register/', views.UserRegisterViewSet.as_view()),
]




