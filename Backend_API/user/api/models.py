from django.db import models

class User(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user_name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.TextField()

    def __str__(self):
        return f"Post: {self.title}"