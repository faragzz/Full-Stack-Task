# Apartment Listing Application

A full-stack application for listing apartments, built with Node.js (TypeScript) backend, Next.js frontend, and PostgreSQL database. The app supports apartment CRUD operations, search/filtering, and includes API documentation via Swagger.

---

## Features

### Backend (Node.js + TypeScript)
- REST API to:
    - List apartments (with pagination)
    - Get apartment details by ID
    - Create apartments (including bulk creation with fake data for testing)
    - Search/filter apartments by unit name, unit number, project
    - Delete single or all apartments
- Data validation using `class-validator`
- Swagger API documentation available at `/api-docs`
- Fully containerized with Docker

### Frontend (Next.js)
- Responsive apartment listing page
- Apartment details page
- Works on desktop and mobile
- Connects to backend API

### Database
- PostgreSQL for apartment data storage

---

## Live API Documentation

Swagger UI is available once the backend is running at:  
[http://localhost:3001/api-docs/](http://localhost:3001/api-docs/)

---

## Local Development & Deployment

### Prerequisites
- Docker & Docker Compose installed
- Node.js & npm (if running without Docker)

### Running with Docker Compose (Recommended)

```bash
docker-compose up --build
