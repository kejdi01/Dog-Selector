from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create default admin user"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="admin123"
        )

        self.stdout.write(self.style.SUCCESS("Admin user created"))