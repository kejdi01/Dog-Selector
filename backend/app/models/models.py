import uuid

from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from django.db import models

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class ArchiveQuerySet(models.QuerySet):
    def delete(self):
        return super().update(
            deleted=True,
            deleted_at=timezone.now(),
        )
    def hard_delete(self):
        return super().delete()

class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted=False)

class ArchiveModel(models.Model):
    deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = ArchiveQuerySet.as_manager()

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.deleted = True
        self.deleted_at = timezone.now()
        self.save(update_fields=["deleted", "deleted_at"])

    def soft_delete(self):
        self.delete()

    def hard_delete(self):
        return super().delete()

    def restore(self):
        self.deleted = False
        self.deleted_at = None
        self.save(update_fields=["deleted", "deleted_at"])

class Breed(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class Description(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title

class Dog(TimeStampedModel, ArchiveModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        ACCEPTED = "ACCEPTED", "Accepted"
        REJECTED = "REJECTED", "Rejected"

    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.PENDING,
        db_index=True,
    )

    breed = models.ForeignKey(
        Breed,
        on_delete=models.PROTECT,
        related_name="dogs",
    )

    description = models.ForeignKey(
        Description,
        on_delete=models.PROTECT,
        related_name="dogs",
    )

    rating = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        db_index=True,
    )

    note = models.TextField(
        blank=True,
        default="",
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.breed.name} ({self.get_status_display()})"

class ContactSubmission(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    is_processed = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.created_at.date()}"