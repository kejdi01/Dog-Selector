from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DogViewSet, BreedViewSet, DescriptionViewSet, ContactSubmissionViewSet

router = DefaultRouter()
router.register(r"dogs", DogViewSet, basename="dog")
router.register(r"breeds", BreedViewSet, basename="breed")
router.register(r"descriptions", DescriptionViewSet, basename="description")
router.register(r"contact", ContactSubmissionViewSet, basename="contact")

urlpatterns = [
    path("", include(router.urls)),
]