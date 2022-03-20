from sqlite3 import IntegrityError
from rest_framework.permissions import AllowAny
from django.forms import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CompanySerializer, UserSerializer

class RegisterCompanyView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        companySerializer = CompanySerializer(data=request.data['company'])
        userSerializer = UserSerializer(data=request.data['user'])
        companySerializer.is_valid(raise_exception=True)
        userSerializer.is_valid(raise_exception=True)
        companySerializer.save()
        userSerializer.create(userSerializer.validated_data,
                              companySerializer.instance)
        return Response({
            "User": userSerializer.data,
            "Company": companySerializer.data
        })

class RegisterCustomerView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        userSerializer = UserSerializer(data=request.data['user'])
        userSerializer.is_valid(raise_exception=True)
        userSerializer.save()
        return Response({
            "User": userSerializer.data
        })

    # Gambiarra funcional.
    def perform_create(self, serializer):
        user = self.request.user
        try:
            serializer.save(user=user)
        except IntegrityError:
            raise ValidationError(
                'Product with this Name and User already exists.')
