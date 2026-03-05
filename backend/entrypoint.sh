#!/bin/sh

echo "Running migrations..."
python manage.py migrate

echo "Seeding database..."
python manage.py seed_dogs

echo "Creating admin user..."
python manage.py create_admin

echo "Starting server..."
python manage.py runserver 0.0.0.0:8000