from django.test import TestCase

from ..models.models import Breed, Description, Dog
from ..serializers import DogSerializer


class DogSerializerTests(TestCase):
    def setUp(self):
        self.breed = Breed.objects.create(name="Beagle")
        self.desc = Description.objects.create(title="Energetic")

    def test_create_with_breed_id_and_description_id(self):
        payload = {
            "status": "PENDING",
            "breed_id": str(self.breed.id),
            "description_id": str(self.desc.id),
            "rating": 3,
            "note": "Hi",
        }
        serializer = DogSerializer(data=payload)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        dog = serializer.save()

        self.assertEqual(dog.breed_id, self.breed.id)
        self.assertEqual(dog.description_id, self.desc.id)
        self.assertEqual(dog.rating, 3)
        self.assertEqual(dog.note, "Hi")

    def test_update_rating_inline(self):
        dog = Dog.objects.create(breed=self.breed, description=self.desc, rating=0)
        ser = DogSerializer(dog, data={"rating": 5}, partial=True)
        self.assertTrue(ser.is_valid(), ser.errors)
        updated = ser.save()
        self.assertEqual(updated.rating, 5)

    def test_invalid_rating_rejected(self):
        dog = Dog.objects.create(breed=self.breed, description=self.desc, rating=0)
        ser = DogSerializer(dog, data={"rating": 10}, partial=True)
        self.assertFalse(ser.is_valid())
        self.assertIn("rating", ser.errors)