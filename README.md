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
```
---

**Note:**
The apartment data and images displayed in the screenshots above are **fake generated** sample data created for testing and demonstration purposes only.

---

![image](https://github.com/user-attachments/assets/88c791e4-0923-47f6-acbd-80644edfba3c)
![image](https://github.com/user-attachments/assets/4d3152fa-f1a5-4e95-b3e4-d5a4dd5423be)
![image](https://github.com/user-attachments/assets/9a83b2fc-e3c2-4717-9561-a66e4965ee26)
![image](https://github.com/user-attachments/assets/3a2b00d0-6707-4a77-b6cc-c1e9376384e7)
![image](https://github.com/user-attachments/assets/b524b126-7ce9-4bd3-a8ce-75b3f1e4ffc3)




