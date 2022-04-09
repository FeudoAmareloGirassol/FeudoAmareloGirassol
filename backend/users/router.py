from .views import GetCompanyViewset, GetUsersViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', GetUsersViewset)
router.register(r'company', GetCompanyViewset)
