from django.contrib import admin

from .models.models import Breed, Description, Dog, ContactSubmission


# Register your models here.
@admin.register(Breed)
class BreedAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at", "updated_at")
    search_fields = ("name",)
    ordering = ("name", "created_at", "updated_at")

@admin.register(Description)
class DescriptionAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "created_at", "updated_at")
    search_fields = ("title",)
    ordering = ("title", "created_at", "updated_at")

@admin.register(Dog)
class DogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "breed",
        "status",
        "rating",
        "deleted",
        "created_at",
        "updated_at",
    )

    list_filter = (
        "status",
        "breed",
        "description",
        "rating",
        "deleted",
    )

    search_fields = (
        "breed__name",
        "description__title",
        "note",
    )

    list_editable = ("rating",)
    list_select_related = ("breed", "description")

    actions = ["restore_selected", "hard_delete_selected"]

    def restore_selected(self, request, queryset):
        for obj in queryset:
            obj.restore()
        self.message_user(request, "Selected dogs restored successfully.")

    restore_selected.short_description = "Restore selected dogs"

    def hard_delete_selected(self, request, queryset):
        queryset.hard_delete()
        self.message_user(request, "Selected dogs permanently deleted.")

    hard_delete_selected.short_description = "Hard delete selected dogs"

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "email",
        "message",
        "is_processed",
        "created_at",
        "updated_at",
    )

    list_filter = ("is_processed", "created_at", "updated_at")
    search_fields = (
        "name",
        "email",
        "message",
    )
    list_editable = ("is_processed",)
    ordering = ("-created_at", "updated_at", "is_processed")