from importlib.machinery import SourceFileLoader
from numpy import source
from rest_framework import serializers
from .models import Company, User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data, company=None):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if not(len(password) < 5):
            if password is not None:
                instance.set_password(password)
        else:
            raise serializers.ValidationError("insufficient password length")

        if company:
            instance.company = company
        instance.save()
        return instance


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'cnpj', 'address', 'cep',
                  'city', 'uf', 'telephone_number', 'category']


class GetSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'company')


class GetFOODisplaySerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='get_category_display')

    class Meta:
        model = Company
        fields = ['id', 'name', 'cnpj', 'address', 'cep',
                  'city', 'uf', 'telephone_number', 'category']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        try:
            token['cnpj'] = user.company.cnpj
            return token
        except:
            token['email'] = user.email
            token['company'] = user.company
            return token


class SchedulingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Scheduling
        fields = ['schedulingDate', 'company']

    def create(self, validated_data, user):
        scheduling = models.Scheduling(**validated_data)
        scheduling.customer = user
        scheduling.save()
        return scheduling
