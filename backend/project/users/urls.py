from django.urls import path
from .views import CompanyView, CustomerView, LoginCompanyView, LoginCustomerView, RegisterCompanyView, RegisterCustomerView, LogoutView

urlpatterns = [
    path('register/customer', RegisterCustomerView.as_view()),
    path('register/company', RegisterCompanyView.as_view()),
    path('login/customer', LoginCustomerView.as_view()),
    path('login/company', LoginCompanyView.as_view()),
    path('user/customer', CustomerView.as_view()),
    path('user/company', CompanyView.as_view()),
    path('logout', LogoutView.as_view()),
]
