# Mahout Website

Next.js marketing site for Mahout — a personal operating system guided by Future You.

## Run locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Environment

| Variable | Purpose |
|----------|---------|
| `MONGO_URI` | MongoDB connection string for waitlist signups (optional; logs to console if missing) |
| `NEXT_PUBLIC_BASE_URL` | Base URL for sitemap, schema (default: https://mahout.app) |

## Pages

- `/` — Home (hero, 5-element story, North Star, trust, CTA)
- `/north-star` — North Star deep dive
- `/how-it-works` — Full scrollytelling
- `/privacy` — Privacy + memory control
- `/waitlist` — Waitlist signup
- `/blog` — Blog (coming soon)
- `/terms`, `/support`

## Adding assets

Place app screenshots in `public/` and reference them in `PhoneFrame` or section components. See `CURSOR_HANDOFF.md` for the content inventory.
