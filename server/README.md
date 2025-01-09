

### 1. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

---

## Environment Configuration

Create a `.env` file in the project root and add the following environment variables:

```env
DATABASE_URL=postgres://user:password@localhost:5432/mydb
PORT=3000
```

Update `user`, `password`, and `mydb` as per your requirements.

---

## Database Setup with Docker

### 1. Start PostgreSQL

Use Docker to set up and run a PostgreSQL instance:

```bash
docker-compose up -d
```

This will create a PostgreSQL container accessible at `localhost:5432`.

### 2. Verify PostgreSQL

To check if PostgreSQL is running:

```bash
docker ps
```

Access the PostgreSQL container (if needed):

```bash
docker exec -it <container_name> psql -U user -d mydb
```

---

## Running the Application

### 1. Start the Server

Run the application in development mode:

```bash
npm run dev
```

The server will:
1. Automatically apply any pending migrations.
2. Start the API server on `http://localhost:3000`.

### 2. Test the Endpoints

Use a tool like **Postman** or **curl** to interact with the APIs.

- **Get all users**:
  ```bash
  GET http://localhost:3000/api/users
  ```

- **Create a user**:
  ```bash
  POST http://localhost:3000/api/users
  Body: {
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ```

---

## Project Scripts

| Command         | Description                                 |
|------------------|---------------------------------------------|
| `npm run dev`    | Run the server in development mode         |
| `npm run build`  | Build the project for production           |
| `npm start`      | Start the built project                   |
| `npx drizzle-kit generate` | Generate a new migration file |
| `npx drizzle-kit up`       | Apply migrations manually     |

---


## Troubleshooting

### Error: "relation 'users' does not exist"
Ensure that migrations are applied. Run the application to automatically apply migrations or run manually:

```bash
npx drizzle-kit up:pg
```

### Error: "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
Double-check your `DATABASE_URL` in the `.env` file to ensure the password is correct and formatted as a string.

