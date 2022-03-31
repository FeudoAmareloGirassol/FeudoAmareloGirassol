from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import CompanySerializer, UserSerializer
from . import models, serializers

class RegisterCompanyView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        companySerializer = CompanySerializer(data=request.data['company'])
        userSerializer = UserSerializer(data=request.data['user'])
        errors = {}
        if not userSerializer.is_valid():
            errors['user'] = userSerializer.errors
        if not companySerializer.is_valid():
            errors['company'] = companySerializer.errors
        if errors:
            return Response(errors)
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
        errors = {}
        if not userSerializer.is_valid():
            errors['user'] = userSerializer.errors
        if errors:
            return Response(errors)
        userSerializer.save()
        return Response({
            "User": userSerializer.data
        })

class GetViewset(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.GetSerializer