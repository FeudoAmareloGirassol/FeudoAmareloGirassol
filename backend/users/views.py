from .serializers import RegisterCompanySerializer, MyTokenObtainPairSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import filters
from . import models, serializers

class RegisterCompanyView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        companySerializer = RegisterCompanySerializer(data=request.data['company'])
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
    serializer_class = serializers.GetUserSerializer

class GetCompanyViewset(viewsets.ModelViewSet):
    queryset = models.Company.objects.all()
    serializer_class = serializers.GetCompanySerializer

class CompanyFilterView(generics.ListAPIView):
    queryset = models.Company.objects.all()
    serializer_class = serializers.GetCompanySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']

class CompanySearchView(generics.ListAPIView):
    queryset = models.Company.objects.all()
    serializer_class = serializers.GetCompanySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer

