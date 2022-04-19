from datetime import date
import datetime
from .serializers import RegisterCompanySerializer, MyTokenObtainPairSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import filters
from . import models, serializers
from rest_framework import status
import re


class RegisterCompanyView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        companySerializer = RegisterCompanySerializer(
            data=request.data['company'])
        userSerializer = UserSerializer(data=request.data['user'])
        errors = {}
        if not userSerializer.is_valid():
            errors['user'] = userSerializer.errors
        if not validate(request.data['company']['cnpj']):
            errors['company'] = 'invalid cnpj'
        if not companySerializer.is_valid():
            errors['company'] = companySerializer.errors
        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
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
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
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
        dataCompare = datetime.datetime.strptime(
            request.data['schedulingDate'], '%Y-%m-%d').date()
        user = request.user
        if serializer.is_valid():
            if dataCompare > date.today():
                serializer.create(serializer.validated_data, user)
                return Response(serializer.data)
            else:
                return Response('Schedule date is invalid!')
        else:
            return Response(serializer.errors)


class UsersViewset(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.GetUsersSerializer


# Validate CNPJ

REGRESSIVES = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]


def validate(cnpj):
    cnpj = only_numbers(cnpj)

    try:
        if its_sequence(cnpj):
            return False
    except:
        return False

    try:
        new_cnpj = calculate_digit(cnpj=cnpj, digit=1)
        new_cnpj = calculate_digit(cnpj=new_cnpj, digit=2)
    except Exception as e:
        return False

    if new_cnpj == cnpj:
        return True
    else:
        return False


def calculate_digit(cnpj, digit):
    if digit == 1:
        regressives = REGRESSIVES[1:]
        new_cnpj = cnpj[:-2]
    elif digit == 2:
        regressives = REGRESSIVES
        new_cnpj = cnpj
    else:
        return None

    total = 0
    for indice, regressive in enumerate(regressives):
        total += int(cnpj[indice]) * regressive

    digit = 11 - (total % 11)
    digit = digit if digit <= 9 else 0

    return f'{new_cnpj}{digit}'


def its_sequence(cnpj):
    sequence = cnpj[0] * len(cnpj)

    if sequence == cnpj:
        return True
    else:
        return False


def only_numbers(cnpj):
    return re.sub(r'[^0-9]', '', cnpj)
