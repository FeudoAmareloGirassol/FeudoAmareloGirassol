from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=255)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'username']

class Company(models.Model):
    name = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=255)
    adress = models.CharField(max_length=255)
    cep = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    uf = models.CharField(max_length=255)
    telephone_number = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    confirm_password = models.CharField(max_length=255)

class Customer(models.Model):
    name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    cpf = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    uf = models.CharField(max_length=255)
    telephone_number = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    confirm_password = models.CharField(max_length=255)
