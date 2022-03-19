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
        # userSerializer.create(userSerializer.validated_data)
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

# # É SÓ PARA MOSTRAR AS INFOS DO USUARIO!!

# class CompanyView(APIView):
#     def get(self, request):
#         token = request.COOKIES.get('jwt')
#         user = isCompanyAuthenticated(token)
#         serializer = CompanySerializer(user)
#         return Response(serializer.data)

# class CustomerView(APIView):
#     def get(self, request):
#         token = request.COOKIES.get('jwt')
#         user = isCustomerAuthenticated(token)
#         serializer = CustomerSerializer(user)
#         return Response(serializer.data)

# class LogoutView(APIView):
#     def post(self, request):
#         response = Response()
#         response.delete_cookie('jwt')
#         response.data={'message': 'sucess' }
#         return response

# def isCompanyAuthenticated(token):
#     if not token:
#         raise AuthenticationFailed('Unauthenticated!')

#     try:
#         payload = jwt.decode(token, 'secret', algorithms=['HS256'])
#     except jwt.ExpiredSignatureError:
#         raise AuthenticationFailed('Unauthenticated!')

#     user = Company.objects.filter(id=payload['id']).first()
#     return user

# def isCustomerAuthenticated(token):
#     if not token:
#         raise AuthenticationFailed('Unauthenticated!')

#     try:
#         payload = jwt.decode(token, 'secret', algorithms=['HS256'])
#     except jwt.ExpiredSignatureError:
#         raise AuthenticationFailed('Unauthenticated!')

#     user = Customer.objects.filter(id=payload['id']).first()
#     return user

# def validateUserType(token, isSeller):
#     user = isAuthenticated(token)
#     if user.isSeller == isSeller:
#         return user
#     raise AuthenticationFailed('Unauthorized')
