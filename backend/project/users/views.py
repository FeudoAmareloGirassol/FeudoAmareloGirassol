from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import CompanySerializer, MyTokenObtainPairSerializer, UserSerializer
from . import models, serializers
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework_simplejwt.views import TokenObtainPairView

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

class GetUsersViewset(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.GetSerializer

class GetCompanyViewset(viewsets.ModelViewSet):
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer

class GetCompanyFOOViewset(viewsets.ModelViewSet):
    queryset = models.Company.objects.all()
    serializer_class = serializers.GetFOODisplaySerializer

class CompanyFilterView(generics.ListAPIView):
    queryset = models.Company.objects.all()
    serializer_class = CompanySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cnpj', 'address', 'category', 'uf']

class CompanySearchView(generics.ListAPIView):
    queryset = models.Company.objects.all()
    serializer_class = CompanySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['category','name']

class GetViewset(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.GetSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
