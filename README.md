# Options Enterprise — Static Scaffold

This repository is a starting scaffold for an enterprise-grade option selling platform.

- Static frontend served from `public/`.
- TypeScript Express server in `src/` exposing simple API endpoints.
- Database: Postgres (free providers available). Swap your connection string via the `DATABASE_URL` environment variable.

Quick start

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file (or set env vars). Example in `.env.example`:

```
DATABASE_URL=postgres://user:password@hostname:5432/dbname
PORT=3000
```

3. Run in development

```bash
npm run dev
```

4. Build and start

```bash
npm run build
npm start
```

Migrations

Set `DATABASE_URL` in your environment then run:

```bash
npm run migrate
```

Frontend (Vite + React)

The frontend is in `frontend/`. To run locally:

```bash
cd frontend
npm install
npm run dev
```

Docker

Build and run the container (ensure `DATABASE_URL` is provided to container at runtime):

```bash
docker build -t options-enterprise .
docker run -e DATABASE_URL="$DATABASE_URL" -p 3000:3000 options-enterprise
```

CI

A GitHub Actions workflow is included at `.github/workflows/ci.yml` which runs TypeScript build and conditionally runs migrations when `DATABASE_URL` is provided as a secret.

Free Postgres providers

- ElephantSQL — quick free instance
- Supabase — Postgres with dashboard and auth
- Railway — free tier projects

When you're ready to add persistence, replace `DATABASE_URL` with your provider's connection string. The server initializes a `pg` Pool in `src/server.ts` and is ready to use from route handlers.

Next steps (suggested)

- Add authentication (OAuth / JWT)
- Add migrations (e.g., `node-pg-migrate` or `knex`)
- Add secure config for production and secrets management
- Add CI, tests, and containerization

