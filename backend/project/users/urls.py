from .views import CompanyViewset, RegisterCompanyView, RegisterCustomerView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path

urlpatterns = [
    path('auth/register/customer', RegisterCustomerView.as_view()),
    path('auth/register/company', RegisterCompanyView.as_view()),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/login', MyTokenObtainPairView.as_view(), name='my_token'),
    path('companies', CompanyViewset.as_view({'get': 'list'})),
]