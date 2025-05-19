from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    descricao = models.TextField(blank=True)
    quantidade = models.PositiveIntegerField()
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='itens')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome
