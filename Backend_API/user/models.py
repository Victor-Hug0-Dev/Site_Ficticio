from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager


class User(AbstractBaseUser):
    objects =  UserManager()

    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=100)
    email = models.CharField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return f"Post: User created"
        