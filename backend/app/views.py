from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend

from django.utils import timezone

from .models.models import Breed, Description, Dog, ContactSubmission
from .serializers import (
    DogSerializer, BreedSerializer,
    DescriptionSerializer, ContactSubmissionSerializer
)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class DogViewSet(viewsets.ModelViewSet):
    queryset = Dog.objects.filter(deleted=False).select_related("breed", "description")
    serializer_class = DogSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]

    search_fields = ['breed__name', 'description__title']
    ordering_fields = ['rating', 'created_at', 'status', 'breed__name', 'description__title',"note"]
    filterset_fields = ['status', 'rating']
    ordering = ['status',]

    @action(detail=False, methods=['post'], url_path='bulk-delete')
    def bulk_delete(self, request):
        dogs_ids = request.data.get('ids', [])
        if not dogs_ids:
            return Response({"error": "No IDs provided"}, status=status.HTTP_400_BAD_REQUEST)

        count = Dog.objects.filter(id__in=dogs_ids).update(
            deleted=True,
            deleted_at=timezone.now()
        )

        return Response({"message": f"Deleted {count} dogs"}, status=status.HTTP_204_NO_CONTENT)


class BreedViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer


class DescriptionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Description.objects.all()
    serializer_class = DescriptionSerializer


class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    http_method_names = ['post']