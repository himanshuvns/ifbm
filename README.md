# Indian Football Bachao Movement (IFBM)

A high-impact, mobile-first campaign website built for the **Indian Football Bachao Movement**.

## Project Architecture

- **Frontend**: Next.js 14 (App Router), Vanilla CSS Modules, custom hooks for scroll animations.
- **Backend**: Go (`net/http`), PostgreSQL storage, IP rate-limiting middleware, Instagram Graph API refresher.
- **Database**: PostgreSQL (`migrations/001_initial.sql`).

## Running Locally

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 2. Backend (Optional for live API & database persistence)
```bash
cd backend
cp .env.example .env
# Ensure PostgreSQL database 'ifbm' is running locally or update DATABASE_URL
go run ./cmd/server
```
Backend runs on [http://localhost:8080](http://localhost:8080).

> Note: If the backend API is offline, the frontend gracefully falls back to static default stats and mock form states without breaking.
