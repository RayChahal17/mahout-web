# Mahout

A personal operating system that turns your meaning, emotions, and time into calm next steps—guided by Future You.

## Website (Next.js)

The marketing site lives in `web/`:

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

See [web/README.md](web/README.md) for details.

## Project structure

| Folder | Purpose |
|--------|---------|
| `web/` | Next.js marketing site (Home, North Star, How it works, Privacy, Waitlist) |
| `client/` | Legacy Vite + React app (can be deprecated) |
| `server/` | Express API (health check; waitlist API is in Next.js `web/src/app/api/`) |
| `CURSOR_HANDOFF.md` | Full implementation spec |
| `docs/design-tokens.css` | Design system reference |
