# BlackWhite Ecommerce Platform

A modern full-stack ecommerce platform with a minimal black and white UI, built using Next.js, Node.js, PostgreSQL, Stripe payments, and Docker.

## Tech Stack
- Frontend: Next.js, Tailwind CSS, TypeScript
- Backend: Node.js, Express, Prisma, PostgreSQL
- DevOps: Docker, Docker Compose

## Setup
1. Copy `.env.example` to `.env` in the root and in the backend/frontend.
2. Run `docker-compose up -d --build` to start the PostgreSQL database, backend, and frontend.
3. Access the frontend at `http://localhost:3000` and the API at `http://localhost:5000`.

## Architecture
- `/backend`: Express API server
- `/frontend`: Next.js web application
- `/docker`: Extra docker configs (if any)
- `/database`: Database setup scripts or schemas
