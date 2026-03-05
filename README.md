# Dog Selector

Implementation of the **Dog Selector** assignment using:

- Django + Django REST Framework
- React (Vite)
- PostgreSQL
- Docker / Docker Compose
- Bootstrap 5

---

# Setup

The project runs entirely with Docker.

Start the application with:

```bash
docker compose up --build
```

This command will:

- build backend and frontend containers
- start PostgreSQL
- run database migrations
- seed the database with **560 dogs**
- create a default **admin user**
- start the backend and frontend servers

---

# Application URLs

Frontend

```
http://localhost:5173
```

Backend API

```
http://localhost:8000/api/
```

Django Admin

```
http://localhost:8000/admin
```

---

# Admin Access

Default credentials:

```
username: admin
password: admin123
```

---

# Running Tests

Run backend tests with:

```bash
docker compose exec web python manage.py test
```

---

# Database Seeding

The project includes a management command used to populate the database with sample data.

Command:

```bash
python manage.py seed_dogs
```

This generates:

- breeds
- descriptions
- **560 dog records**

The command runs automatically on container startup.
