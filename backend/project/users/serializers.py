from rest_framework import serializers
from .models import Company, Customer, User
from rest_framework.exceptions import AuthenticationFailed

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'cnpj', 'adress', 'cep', 'city', 'uf', 'telephone_number', 'email', 'password','confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def save(self):
        company = Company(
            email = self.validated_data['email'],
        )
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']
        if password != confirm_password:
            raise AuthenticationFailed('Passwords must match')
        company.password = password
        company.save()

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'last_name', 'cpf', 'city', 'uf', 'telephone_number', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def save(self):
        costumer = Customer(
            email = self.validated_data['email'],
        )
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']
        if password != confirm_password:
            raise AuthenticationFailed('Passwords must match')
        costumer.password = password
        costumer.save()
                