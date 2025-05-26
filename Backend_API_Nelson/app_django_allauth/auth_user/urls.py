from django.urls import path
from .views import GoogleLogin

urlpatterns = [
    #path('accounts/google/login/callback/', GoogleCallbackView.as_view(), name='google_callback'),
    path("api/auth/google/", GoogleLogin.as_view(), name='google_login'),
]
