from .models.models import Breed, Description, Dog, ContactSubmission

from rest_framework import serializers

class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = ("id", "name")

class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = ("id", "title")

class DogSerializer(serializers.ModelSerializer):
    breed = BreedSerializer(read_only=True)
    description = DescriptionSerializer(read_only=True)

    breed_id = serializers.PrimaryKeyRelatedField(
        queryset=Breed.objects.all(), source='breed', write_only=True
    )
    description_id = serializers.PrimaryKeyRelatedField(
        queryset=Description.objects.all(), source='description', write_only=True
    )

    class Meta:
        model = Dog
        fields = [
            "id",
            "status",
            "breed",
            "breed_id",
            "description",
            "description_id",
            "rating",
            "note",
            "created_at",
        ]

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'message', 'is_processed']