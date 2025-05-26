from django.urls import path
from .views import GoogleCallbackView

urlpatterns = [
    path('accounts/google/login/callback/', GoogleCallbackView.as_view(), name='google_callback'),
]
