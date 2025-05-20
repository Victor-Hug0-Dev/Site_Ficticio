from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager


class User(AbstractBaseUser):
    objects =  UserManager()
    USERNAME_FIELD = 'email'
    is_active = models.BooleanField(default=True)  # Define se o usuário está ativo
    is_staff = models.BooleanField(default=False)  # Define se é parte da equipe/admin
    is_superuser = models.BooleanField(default=False)

    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=100)
    email = models.CharField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return f"Post: User created"
        