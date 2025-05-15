from django.urls import path
from .views import UsersListView, ProfilesListView, UserDetailView

# URL patterns for the user API
# This file defines the URL patterns for the user API, mapping URLs to their respective views.
urlpatterns = [
    path('users/', UsersListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('profiles/', ProfilesListView.as_view(), name='profile-list'),
]