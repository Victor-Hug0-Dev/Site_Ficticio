from django.urls import path
from .views import CustomLoginView, LogoutView, GoogleCallbackView

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('google/callback/', GoogleCallbackView.as_view(), name='google_callback'),
]
