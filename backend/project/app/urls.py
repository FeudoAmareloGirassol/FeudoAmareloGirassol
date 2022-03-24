from django.urls import path, include
from rest_framework import routers
from .views import ExampleViewSet

router = routers.DefaultRouter()
router.register(r'examples', ExampleViewSet)

urlpatterns = [
    path('', include(router.urls))
]