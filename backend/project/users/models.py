from django.db import models
from django.contrib.auth.models import AbstractUser

# TODO Verificar max_length de todo mundo
class Company(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=255)
    adress = models.CharField(max_length=255)
    cep = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    uf = models.CharField(max_length=255)
    telephone_number = models.CharField(max_length=255)

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
