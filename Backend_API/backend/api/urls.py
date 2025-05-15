from django.urls import include, path


urlpatterns = [
   path('posts/', include('posts.api.urls')),
   path('user/', include('user.api.urls')),
]

