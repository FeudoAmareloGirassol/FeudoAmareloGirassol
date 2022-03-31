from rest_framework import serializers
from .models import Company, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data, company = None):
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
        fields = ['id', 'name', 'cnpj', 'adress', 'cep', 'city', 'uf', 'telephone_number', 'category']

class GetSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only = True)

    class Meta:
        model = User
        fields = ('id', 'email', 'company')
