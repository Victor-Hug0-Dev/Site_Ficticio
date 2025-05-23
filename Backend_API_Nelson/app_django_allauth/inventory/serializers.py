from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    """
    Serializador para o modelo Item.
    """
    criado_por = serializers.ReadOnlyField(source='criado_por.username')
    #estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    #tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)

    class Meta:
        model = Item
        fields = [
            'id', 'nome', 'descricao', 'tipo',
            'estado', 'criado_por',
            'data_criacao'
        ]
        read_only_fields = ['id', 'criado_por', 'data_criacao'] 