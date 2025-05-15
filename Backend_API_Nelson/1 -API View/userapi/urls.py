from django.urls import path
from .views import UserListView, ProfileListView


urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('profiles/', ProfileListView.as_view(), name='profile-list'),
]