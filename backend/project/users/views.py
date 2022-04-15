from .serializers import RegisterCompanySerializer, MyTokenObtainPairSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import filters
from . import models, serializers


class RegisterCompanyView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        companySerializer = RegisterCompanySerializer(
            data=request.data['company'])
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
        userSerializer = UserSerializer(data=request.data)
        errors = {}
        if not userSerializer.is_valid():
            errors = userSerializer.errors
        if errors:
            return Response(errors)
        userSerializer.save()
        return Response(userSerializer.data)


class CompanyViewset(viewsets.ModelViewSet):
    queryset = models.Company.objects.all()
    serializer_class = serializers.GetCompanySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'city']


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer


class SchedulingViewSet(APIView):
    def get(self, request):
        user = request.user
        scheduling = models.Scheduling.objects.order_by(
            'schedulingDate')
        if user.company:
            scheduling = scheduling.filter(company=user.company)
        else:
            scheduling = scheduling.filter(customer=user)

        serializer = serializers.SchedulingSerializerGET(scheduling, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = serializers.SchedulingSerializer(data=request.data)
        user = request.user
        if serializer.is_valid():
            serializer.create(serializer.validated_data, user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
