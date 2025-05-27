Explaining how to run it normally (without Docker) based on your `package.json` and dependencies:

---

````markdown
# Backend - Apartment Listing Application

This is the backend API for the Apartment Listing Application, built with Node.js, TypeScript, Express, and TypeORM with PostgreSQL as the database.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- PostgreSQL database up and running

---

## Setup & Running Locally (Without Docker)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd node-backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and set your PostgreSQL connection details and other environment variables, for example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
PORT=3001
```

Make sure to adjust these values to your local database setup.

### 4. Run the development server

This will start the server using `ts-node-dev` for live reload during development:

```bash
npm run dev
```

Your backend API will be running at `http://localhost:3001` (or the port you specified).

### 5. Build the project (optional)

If you want to compile the TypeScript code to JavaScript before running:

```bash
npm run build
```

The compiled JS files will be output to the `dist` directory.

### 6. Start the compiled server (optional)

After building, you can run the compiled server with:

```bash
npm start
```

---

## API Documentation

Once the backend is running, Swagger UI is available at:

```
http://localhost:3001/api-docs/
```

Use this to explore and test the API endpoints interactively.

---

## Notes

* Ensure your PostgreSQL database is running and accessible before starting the backend.
* The backend supports full CRUD for apartments, pagination, and search/filtering.
* For development, use `npm run dev` for fast iteration with automatic restarts on code changes.
* For production, build first (`npm run build`), then start the compiled code (`npm start`).

---

## Troubleshooting

* If you get database connection errors, verify your `.env` settings and ensure PostgreSQL is running.
* Make sure you have run any database migrations or have the necessary tables created before using the API.

---

## Dependencies

* Express
* TypeORM
* PostgreSQL (`pg`)
* Class-validator & Class-transformer
* Swagger (swagger-jsdoc, swagger-ui-express)
* Faker (for generating sample data)

---

## License

MIT License (or your license here)

---

Feel free to reach out if you need help running or developing the backend!

```

---

If you want, I can help create a matching README for the frontend or Docker usage too!
```
