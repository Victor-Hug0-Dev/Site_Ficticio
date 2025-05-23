from django.urls import path
from authentication import views
from rest_framework_simplejwt.views import TokenRefreshView

app_name = "authtest"

urlpatterns = [
    path("register/", views.UserRegisterationAPIView.as_view(), name="create-user"),
    path("login/", views.UserLoginAPIView.as_view(), name="login-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("logout/", views.UserLogoutAPIView.as_view(), name="logout-user"),
    path("profile/", views.UserProfileAPIView.as_view(), name="user-profile"),
]




