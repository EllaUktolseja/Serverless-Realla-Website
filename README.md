# Realla Web

Static frontend portfolio website focused on professional identity, experience, skills, projects, and direct contact links.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- npm workspaces
- Vercel static deployment

## Architecture

This repository is intentionally **frontend-only**. Portfolio content is stored as typed static data in `apps/web/src/data/portfolio.ts`.

There is no backend, API server, MongoDB, Docker database, seed process, or runtime database dependency.

## Local development

```powershell
npm install
npm run dev
```

Web: http://localhost:5173

## Production build

```powershell
npm run typecheck
npm run lint
npm run build
```

## Portfolio routes

- `/` — portfolio overview
- `/experience` — experience and education
- `/tech-stack` — skills and technologies
- `/projects` — project directory
- `/projects/:slug` — project detail / case study
- `/contact` — direct contact links

## Updating portfolio content

Edit `apps/web/src/data/portfolio.ts`, commit the change, and push to GitHub. Vercel rebuilds the static frontend and the updated content is included in the deployed site.

No database migration or seed command is required.
