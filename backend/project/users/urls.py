from django.urls import path, include
from .views import CompanyFilterView, CompanySearchView, RegisterCompanyView, RegisterCustomerView, MyTokenObtainPairView
from .router import router
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('auth/register/customer', RegisterCustomerView.as_view()),
    path('auth/register/company', RegisterCompanyView.as_view()),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/login', MyTokenObtainPairView.as_view(), name='my_token'),
    path('companies/filter', CompanyFilterView.as_view()),
    path('companies', CompanySearchView.as_view()),
    path('get/', include(router.urls)),
    path('get/', include(router.urls)) # METODO GET
]
