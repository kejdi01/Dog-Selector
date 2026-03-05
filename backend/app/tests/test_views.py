from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models.models import Breed, Description, Dog, ContactSubmission

class DogAPIViewTests(APITestCase):
    def setUp(self):
        self.b1 = Breed.objects.create(name="Akita")
        self.b2 = Breed.objects.create(name="Boxer")
        self.d1 = Description.objects.create(title="Calm")
        self.d2 = Description.objects.create(title="Playful")

        self.dog1 = Dog.objects.create(breed=self.b1, description=self.d1, rating=5, note="A")
        self.dog2 = Dog.objects.create(breed=self.b2, description=self.d2, rating=1, note="B")

    def test_list_pagination_default_10(self):
        url = reverse("dog-list")
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("results", res.data)
        self.assertIn("count", res.data)

    def test_search_by_breed_and_description(self):
        url = reverse("dog-list")
        res = self.client.get(url, {"search": "Akita"})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["count"], 1)

        res2 = self.client.get(url, {"search": "Playful"})
        self.assertEqual(res2.status_code, status.HTTP_200_OK)
        self.assertEqual(res2.data["count"], 1)

    def test_sorting_by_rating(self):
        url = reverse("dog-list")
        res = self.client.get(url, {"ordering": "rating"})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        ratings = [r["rating"] for r in res.data["results"]]
        self.assertEqual(ratings, sorted(ratings))

    def test_create_update_delete_dog(self):
        url = reverse("dog-list")

        payload = {
            "status": "PENDING",
            "breed_id": str(self.b1.id),
            "description_id": str(self.d2.id),
            "rating": 2,
            "note": "New",
        }
        res = self.client.post(url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        dog_id = res.data["id"]

        detail = reverse("dog-detail", args=[dog_id])
        res2 = self.client.patch(detail, {"rating": 4}, format="json")
        self.assertEqual(res2.status_code, status.HTTP_200_OK)
        self.assertEqual(res2.data["rating"], 4)

        res3 = self.client.delete(detail)
        self.assertEqual(res3.status_code, status.HTTP_204_NO_CONTENT)

        res4 = self.client.get(url)
        ids = [x["id"] for x in res4.data["results"]]
        self.assertNotIn(dog_id, ids)

    def test_bulk_delete(self):
        url = reverse("dog-bulk-delete")
        res = self.client.post(
            url,
            {"ids": [str(self.dog1.id), str(self.dog2.id)]},
            format="json",
        )
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        self.dog1.refresh_from_db()
        self.dog2.refresh_from_db()
        self.assertTrue(self.dog1.deleted)
        self.assertTrue(self.dog2.deleted)

    def test_bulk_delete_requires_ids(self):
        url = reverse("dog-bulk-delete")
        res = self.client.post(url, {"ids": []}, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


class ContactSubmissionAPITests(APITestCase):
    def test_contact_post_saves_to_db_and_get_not_allowed(self):
        url = reverse("contact-list")

        payload = {
            "name": "Xhulio",
            "email": "xhulio@example.com",
            "message": "Hello",
            "is_processed": False,
        }
        res = self.client.post(url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ContactSubmission.objects.filter(id=res.data["id"]).exists())

        res2 = self.client.get(url)
        self.assertEqual(res2.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)