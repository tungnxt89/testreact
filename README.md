# MyApp - Full Stack Authentication Application

A simple full-stack application with authentication built using NestJS (server) and NextJS (client) with PostgreSQL database.

## Project Structure

```
├── server/          # NestJS backend API
├── client/          # NextJS frontend application
├── docker-compose.yml  # PostgreSQL database setup
└── README.md
```

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- PostgreSQL database
- TypeORM for database operations

## Prerequisites

- Node.js 18+
- npm
- Docker & Docker Compose (for PostgreSQL)

## Getting Started

### 1. Start the Database

```bash
docker-compose up -d
```

This will start a PostgreSQL database on port 5432.

### 2. Setup the Server

```bash
cd server
cp .env.example .env
npm install
npm run start:dev
```

The server will be available at `http://localhost:3000`

### 3. Setup the Client

```bash
cd client
cp .env.example .env.local
npm install
npm run dev
```

The client will be available at `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
  - Body: `{ "email": "string", "password": "string", "name": "string (optional)" }`
- `POST /auth/login` - Login
  - Body: `{ "email": "string", "password": "string" }`
- `GET /auth/profile` - Get current user profile (requires authentication)

## Environment Variables

### Server (.env)

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=myapp
JWT_SECRET=your-secret-key
PORT=3000
CLIENT_URL=http://localhost:3001
```

### Client (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Development

### Server Commands

```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start:prod   # Start production server
npm run test         # Run tests
```

### Client Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
```

## Tech Stack

### Server
- NestJS
- TypeORM
- PostgreSQL
- Passport.js (JWT)
- bcryptjs

### Client
- NextJS 15
- React
- Tailwind CSS
- Axios