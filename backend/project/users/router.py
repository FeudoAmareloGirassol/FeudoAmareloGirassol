from .views import GetViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', GetViewset)