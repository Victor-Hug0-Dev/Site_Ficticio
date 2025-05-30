from django.db import models
from user.models import User

class Item(models.Model):
    """
    Modelo para representar itens no inventário.
    """
    ESTADO_CHOICES = [
        ('disponivel', 'Disponível'),
        ('em_uso', 'Em Uso'),
        ('manutencao', 'Em Manutenção'),
    ]

    TIPO_CHOICES = [
        ('equipamento', 'Equipamento'),
        ('ferramenta', 'Ferramenta'),
        ('material', 'Material'),
        ('outro', 'Outro'),
    ]

    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES)
    criado_por = models.ForeignKey(User, on_delete=models.CASCADE, related_name='itens_criados')
    data_criacao = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-data_criacao']
        verbose_name = 'Item'
        verbose_name_plural = 'Itens'

    def __str__(self):
        return f"{self.nome} ({self.get_estado_display()})"
