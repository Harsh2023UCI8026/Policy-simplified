# Setup Guide for Policy Simplified Backend

## Prerequisites
- **Node.js** (>= 18) – check with `node -v`
- **npm** (>= 9) – check with `npm -v`
- **PostgreSQL** server (any version supported by the `pg` driver)

## Environment Variables
Create a `.env` file (or copy the provided `.env.example`) in the **backend** directory:
```
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
NODE_ENV=development
# Optional: add other environment variables as needed (e.g., JWT secrets)
```
Only `DATABASE_URL` is required for the application to start.

## Installation
```bash
cd backend
npm install
```

## Build
```bash
npm run build   # Compiles TypeScript to JavaScript
```
A successful build yields no TypeScript errors.

## Start (Development)
```bash
npm run start:dev
```
The server will listen on the port defined in the environment (default `3000`).

## Verification
- Console should display `Nest application successfully started`.
- Access `http://localhost:3000/health` (or the health endpoint defined) and expect a `200 OK` response.
- Logs should indicate a successful PostgreSQL connection.

## Troubleshooting
See the **Troubleshooting Guide** below for common issues.
