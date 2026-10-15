# Portfolio

Static React + Vite site. No backend — deploys free to Vercel, Netlify or Cloudflare Pages.

## Edit your details
Everything personal is in `src/content/`:

| File | What's in it |
|---|---|
| `profile.ts` | Name, email, links, availability, **experience**, **skills** (lines marked `EDIT`) |
| `tracks.ts` | The six "What are you hiring for?" services — headlines, deliverables, timelines |
| `projects.ts` | Project titles, briefs, approach, stack (shown on cards + case studies) |

Each project's full design set (brand palette, typography, 5–6 designed screens) lives in its own file in `src/projects/` — e.g. `src/projects/saltline.tsx`. To add a project: add an entry in `projects.ts`, create `src/projects/<id>.tsx` (copy an existing one), and register it in `src/projects/index.ts`. Case studies are served at `/work/<id>`.

To replace a concept with real client work, change its text and screens and remove the "Concept build" label in `src/pages/ProjectPage.tsx`.

## Tailored links
Send clients a link that opens on the right service:

- `/?for=web` · `/?for=ecommerce` · `/?for=app`
- `/?for=assistant` · `/?for=automation` · `/?for=crm`

Archived (hidden) network projects are in `archive/` — not built into the site.

## Run locally (Docker Desktop)
```
docker compose up -d --build     # http://localhost:8090
docker compose down
```

## Deploy free on Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo. Framework is detected as Vite; `vercel.json` sets the rest.
3. Every push to `main` redeploys.

Netlify / Cloudflare Pages: build command `npm run build`, output directory `dist`.
