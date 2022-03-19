from django.urls import path
from .views import RegisterCompanyView, RegisterCustomerView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('register/customer', RegisterCustomerView.as_view()),
    path('register/company', RegisterCompanyView.as_view()),
    path('register/customer', RegisterCustomerView.as_view()),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    # path('login/customer', LoginCustomerView.as_view()),
    # path('login/company', LoginCompanyView.as_view()),
    # path('user/customer', CustomerView.as_view()),
    # path('user/company', CompanyView.as_view()),
    # path('logout', LogoutView.as_view()),
]
