# NestJS Device Management API

A RESTful API built with NestJS for managing IoT/smart devices. This API provides CRUD operations powered by PostgreSQL for data storage.

## Features

- Device CRUD Operations: Create, read, update, and delete devices with filtering.

- Data Validation: Request validation using class-validator and class-transformer.

- PostgreSQL Integration: Data management with TypeORM for database operations.

- Swagger Documentation: Auto-generated API docs with @nestjs/swagger.

- Unit: Jest integration for code testing.

## Quick Start (Docker Compose)

Prerequisites: Install Docker and Docker Compose.

### Clone the repo

```bash
git clone https://github.com/jonasoliveirabarbosa/device-management-api.git
```

### Configure the environment Variables

Add the variables in .env file on the root folder.

#### Base Configuration

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=test
POSTGRES_HOST=device-management-api-db-1  # Docker service hostname
POSTGRES_PORT=5432
POSTGRES_DATABASE=postgres

# Application
PORT=3000
```

### Start the stack

```bash
docker-compose up  # Runs NestJS + PostgreSQL
```

### Access resources

API: <http://localhost:3000/device>

Swagger UI: <http://localhost:3000/api>

PostgreSQL: Port 5432 (credentials in docker-compose.yml)

## Running tests

Before running the tests, ensure that all dependencies are installed and compatible with Node.js 20. You can install the dependencies using:

```bash
yarn install
```

To run the tests for this project, use the following command:

```bash
yarn run test
```
