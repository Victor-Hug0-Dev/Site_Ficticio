from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, User


# ==============================================
# GERENCIADOR DE USUÁRIOS PERSONALIZADO
# ==============================================

class UserManager(BaseUserManager):
    """
    Gerenciador personalizado para o modelo User.
    Implementa métodos para criação de usuários e superusuários.
    """

    def create_user(self, email, username, password=None):
        """
        Cria e salva um usuário comum com os dados fornecidos.
            
        Raises:
            ValueError: Se o email não for fornecido
        """
        if not email:
            raise ValueError("O email é obrigatório.")
            
        # Normaliza o email (coloca a parte depois do @ em lowercase)
        email = self.normalize_email(email)
        
        # Cria a instância do usuário
        user = self.model(email=email, username=username)
        
        # Define e criptografa a senha
        user.set_password(password)
        user.save()
        
        return user

    def create_superuser(self, email, username, password):
        """
        Cria e salva um superusuário com os dados fornecidos.

        Returns:
            User: Instância do superusuário criado
        """
        # Primeiro cria um usuário normal
        user = self.create_user(email, username, password)
        
        # Define atributos de superusuário
        user.is_staff = True
        user.is_superuser = True
        user.save()
        
        return user


# ==============================================
# MODELO DE USUÁRIO PERSONALIZADO
# ==============================================

class User(AbstractBaseUser, PermissionsMixin):
    """
    Modelo de usuário personalizado que substitui o padrão do Django.
    Utiliza email como campo principal de autenticação.
    """

    # Campos do modelo
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)  # Define se o usuário está ativo
    is_staff = models.BooleanField(default=False)  # Define se é parte da equipe/admin

    # Gerenciador personalizado
    objects = UserManager()

    # Configurações para autenticação
    USERNAME_FIELD = 'email'  # Campo usado para login
    REQUIRED_FIELDS = ['username']  # Campos obrigatórios além do USERNAME_FIELD

    def __str__(self):
        """
        Representação em string do usuário (usada no admin e shell)
        
        Returns:
            str: Email do usuário
        """
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Vinculo 1:1
    #bio = models.TextField(blank=True, null=True)
    #phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"Perfil de {self.user.username}"