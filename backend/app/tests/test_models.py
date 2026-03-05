from django.core.exceptions import ValidationError
from django.test import TestCase

from ..models.models import Breed, Description, Dog


class DogModelTests(TestCase):
    def setUp(self):
        self.breed = Breed.objects.create(name="Labrador")
        self.desc = Description.objects.create(title="Friendly")

    def test_defaults(self):
        dog = Dog.objects.create(breed=self.breed, description=self.desc)
        self.assertEqual(dog.status, Dog.Status.PENDING)
        self.assertEqual(dog.rating, 0)
        self.assertEqual(dog.note, "")
        self.assertFalse(dog.deleted)

    def test_rating_validation(self):
        dog = Dog(breed=self.breed, description=self.desc, rating=6)
        with self.assertRaises(ValidationError):
            dog.full_clean()

        dog = Dog(breed=self.breed, description=self.desc, rating=-1)
        with self.assertRaises(ValidationError):
            dog.full_clean()

    def test_soft_delete(self):
        dog = Dog.objects.create(breed=self.breed, description=self.desc)
        dog.delete()
        dog.refresh_from_db()
        self.assertTrue(dog.deleted)
        self.assertIsNotNone(dog.deleted_at)