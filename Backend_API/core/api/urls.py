from django.urls import include, path


urlpatterns = [   
   path('user/', include('user.urls')),
   path('auth/', include('auth_jwt.urls')),
]

