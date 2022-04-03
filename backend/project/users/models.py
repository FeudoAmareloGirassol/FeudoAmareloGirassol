from django.db import models
from django.contrib.auth.models import AbstractUser

class Company(models.Model):
    CATEGORY_CHOICES  = (
        ('ADVOCACIA', 'Advocacia'),
        ('SAUDE', 'Saúde'),
        ('ASSISTENCIA_TECNICA', 'Assistência Técnica'),
        ('CONSTRUCAO_CIVIL', 'Construção Civil'),
        ('BELEZA', 'Beleza'),
        ('EDUCACAO', 'Educação'),
        ('SERVICOS_DOMESTICOS', 'Serviços Domésticos'),
        ('DESIGN', 'Design'),
    )
    def __str__(self):
        return self.name
    name = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=18)
    address = models.CharField(max_length=255)
    cep = models.CharField(max_length=10)
    city = models.CharField(max_length=255)
    uf = models.CharField(max_length=2)
    telephone_number = models.CharField(max_length=20)
    category = models.CharField(max_length=25, choices=CATEGORY_CHOICES)

class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=255)

    company = models.OneToOneField(
        Company,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
