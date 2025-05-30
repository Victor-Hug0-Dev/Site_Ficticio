from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer

# Create your views here.

class ItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de itens do inventário.
    Requer autenticação para todas as operações.
    
    Endpoints disponíveis:
    - GET /api/item/ - Lista todos os itens
    - GET /api/item//{id}/ - Obtém um item específico
    - POST /api/item// - Cria um novo item
    - PUT /api/item/{id}/ - Atualiza um item (todos os campos)
    - PATCH /api/item//{id}/ - Atualiza um item (campos específicos)
    - DELETE /api/item//{id}/ - Remove um item
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Sobrescreve o método para adicionar automaticamente o usuário atual
        como criador do item.
        """
        serializer.save(criado_por=self.request.user)
