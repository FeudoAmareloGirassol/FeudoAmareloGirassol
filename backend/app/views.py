from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import ExampleSerializer
from .models import Example


# Create your views here.
class ExampleViewSet(viewsets.ModelViewSet):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer
    permission_classes = [AllowAny]