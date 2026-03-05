import random

from django.core.management.base import BaseCommand

from app.models.models import Breed, Description, Dog


class Command(BaseCommand):
    help = "Seed database with 560 dogs"

    def handle(self, *args, **kwargs):

        breeds = [
            "Labrador Retriever",
            "German Shepherd",
            "Golden Retriever",
            "French Bulldog",
            "Bulldog",
            "Poodle",
            "Beagle",
            "Rottweiler",
            "Dachshund",
            "Siberian Husky",
            "Doberman",
            "Boxer",
        ]

        descriptions = [
            "Friendly and good with families",
            "Very active and playful",
            "Calm and relaxed personality",
            "Needs regular exercise",
            "Loyal and protective",
            "Great companion dog",
            "Independent and curious",
            "Very intelligent breed",
        ]

        notes = [
            "Good with kids and other dogs.",
            "House-trained and crate-trained.",
            "Needs a calm home; anxious around loud noises.",
            "Loves long walks and playing fetch.",
            "Shy at first but warms up quickly.",
            "Great on a leash; knows basic commands.",
            "High energy — best for active owners.",
            "Prefers to be the only pet in the home.",
        ]

        breed_objects = []
        description_objects = []

        for b in breeds:
            obj = Breed.objects.create(name=b)
            breed_objects.append(obj)

        for d in descriptions:
            obj = Description.objects.create(title=d)
            description_objects.append(obj)

        statuses = ["PENDING", "ACCEPTED", "REJECTED"]

        for _ in range(560):
            Dog.objects.create(
                breed=random.choice(breed_objects),
                description=random.choice(description_objects),
                status=random.choice(statuses),
                rating=random.randint(0, 5),
                note=random.choice(notes),
            )

        self.stdout.write(self.style.SUCCESS("Database seeded with 560 dogs"))