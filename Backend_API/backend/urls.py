from django.urls import include, path
from django.contrib import admin


urlpatterns = [   
   path('admin/',admin.site.urls),
   path('accounts/', include('allauth.urls')),
   path('post/', include('posts.api.urls')),
   path('user/', include('user.api.urls')),
]

