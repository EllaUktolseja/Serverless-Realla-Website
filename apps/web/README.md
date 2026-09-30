# Realla Portfolio

The frontend for Gabriella Uktolseja's personal portfolio.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- npm workspaces
- Vercel

## Development

From the repository root:

```powershell
npm install
npm run dev
```

The Vite development server runs on `http://localhost:5173`.

## Validation

```powershell
npm run typecheck
npm run lint
npm run build
```

## Portfolio data

All portfolio content is static and typed. Update `src/data/portfolio.ts`.

No API server, database, seed process, or environment variables are required for the frontend.

## Routes

- `/`
- `/experience`
- `/tech-stack`
- `/projects`
- `/projects/:slug`
- `/contact`
