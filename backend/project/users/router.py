from .views import GetCompanyFOOViewset, GetCompanyViewset, GetUsersViewset, GetViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', GetUsersViewset)
router.register(r'company', GetCompanyViewset)
router.register(r'companyfoo', GetCompanyFOOViewset)
router.register(r'', GetViewset)
