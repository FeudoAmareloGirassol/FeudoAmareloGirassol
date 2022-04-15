from django.contrib.auth.models import AbstractUser
from django.db import models


CATEGORY_CHOICES = [
    ('TECHNICAL_ASSISTANCE', 'Assistência Técnica'),
    ('DOMESTIC_SERVICES', 'Serviços Domésticos'),
    ('CIVIL_CONSTRUCTION', 'Construção Civil'),
    ('ADVOCACY', 'Advocacia'),
    ('EDUCATION', 'Educação'),
    ('BEAUTY', 'Beleza'),
    ('DESIGN', 'Design'),
    ('HEALTH', 'Saúde'),
]


class Company(models.Model):
    name = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=18)
    address = models.CharField(max_length=255)
    cep = models.CharField(max_length=10)
    city = models.CharField(max_length=255)
    uf = models.CharField(max_length=2)
    telephone_number = models.CharField(max_length=20)
    category = models.CharField(max_length=25, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.name


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


class Scheduling(models.Model):
    schedulingDate = models.DateField()
    schedulingTime = models.TimeField()

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )
