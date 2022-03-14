from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import CompanySerializer, CustomerSerializer
from .models import Company, Customer
import jwt, datetime

class RegisterCustomerView(APIView):
    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class RegisterCompanyView(APIView):
    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginCompanyView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = Company.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if user.password != password:
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token
        }

        return response


class LoginCustomerView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = Customer.objects.filter(email=email).first()

        if  user is None:
            raise AuthenticationFailed('User not found!')

        if user.password != password:
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token
        }

        return response

# É SÓ PARA MOSTRAR AS INFOS DO USUARIO!!

class CompanyView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        user = isCompanyAuthenticated(token)
        serializer = CompanySerializer(user)
        return Response(serializer.data)

class CustomerView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        user = isCustomerAuthenticated(token)
        serializer = CustomerSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data={'message': 'sucess' }
        return response

def isCompanyAuthenticated(token):
    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = Company.objects.filter(id=payload['id']).first()
    return user

def isCustomerAuthenticated(token):
    if not token:
        raise AuthenticationFailed('Unauthenticated!')

    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    user = Customer.objects.filter(id=payload['id']).first()
    return user

# def validateUserType(token, isSeller):
#     user = isAuthenticated(token)
#     if user.isSeller == isSeller:
#         return user
#     raise AuthenticationFailed('Unauthorized')