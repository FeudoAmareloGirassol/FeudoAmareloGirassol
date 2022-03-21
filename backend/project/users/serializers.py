from rest_framework import serializers
from .models import Company, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
        }

    def create(self, validated_data, company = None):
        password = validated_data.pop('password', None)
        confirm_password = validated_data.pop('confirm_password', None)
        instance = self.Meta.model(**validated_data)
        if password == confirm_password:
            if password is not None:
                instance.set_password(password)
        else:
            raise serializers.ValidationError("password and confirm_password does not match")

        if company:
            instance.company = company
        instance.save()
        return instance

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'cnpj', 'adress', 'cep', 'city', 'uf', 'telephone_number']
