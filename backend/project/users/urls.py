from django.urls import path, include
from .views import MyTokenObtainPairView, RegisterCompanyView, RegisterCustomerView
from .router import router
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token', MyTokenObtainPairView.as_view(), name='my_token'),
    path('register/customer', RegisterCustomerView.as_view()),
    path('register/company', RegisterCompanyView.as_view()),
    path('get/', include(router.urls)) # METODO GET
]
