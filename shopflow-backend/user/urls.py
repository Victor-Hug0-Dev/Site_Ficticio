from django.urls import path
from user import views

urlpatterns = [
    path('listall/', views.UserListViewSet.as_view()),
    path('detail/<int:pk>/', views.UserDetailViewSet.as_view()),
    path('delete/<int:pk>/', views.UserDeleteViewSet.as_view()),
    path('register/', views.UserRegisterViewSet.as_view()),
    path('update/<int:pk>/', views.UserUpdateViewSet.as_view()),
]




