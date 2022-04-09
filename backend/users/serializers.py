from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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

class RegisterCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'cnpj', 'address', 'cep', 'city', 'uf', 'telephone_number', 'category']

class GetCompanySerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='get_category_display')
    class Meta:
        model = Company
        fields = ['id', 'name', 'cnpj', 'address', 'cep', 'city', 'uf', 'telephone_number', 'category']

class GetUserSerializer(serializers.ModelSerializer):
    company = GetCompanySerializer(read_only = True)

    class Meta:
        model = User
        fields = ('id', 'email', 'company')


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
