# CaribbeanFreedomArena · Website + App (Project 1)

**Project:** CaribbeanFreedomArena website (installable PWA)  
**Keep separate from:** Sentinel X and other projects — own branding, own deploy, own data.

## What this zip is

- Next.js 15 site: **CaribbeanFreedomArena** / Caribbean Popularity Arena
- Arena homepage `#home`:
  - CARIBBEANFREEDOMARENA elite header (red · white · black Trinidad backdrop)
  - Exact Trinidad & Tobago flag-map island + white AI strobe coast rings
  - Caribbean rotating globe (all Caribbean nations + exact TT silhouette on sphere)
  - Globe → Trinidad white join beam
  - 183-country world marquee (top + bottom bands, center clear)
  - Dubai 2030 full-page hero background
  - Front 12 slots, island bar, lounges, compliance shell
- Installable **app** (PWA): `manifest.webmanifest`, `public/sw.js`, Install App buttons
- Rooms, lounges, legal (same repo; routes are separate pages)

## Run locally

```bash
npm install
npm run dev:arena
```

Open: http://localhost:3004/#home  
Hard refresh after updates: `Cmd+Shift+R`

**If the page looks white / black / unstyled:**
1. Stop any running dev server (Ctrl+C in the terminal).
2. Run `npm run dev:arena` again (this clears `.next` and rebuilds CSS).
3. Hard refresh the browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows).
4. Do **not** run `npm run build` while `dev:arena` is already running — it deletes `.next` and breaks styles until you restart dev.
5. Do **not** double-click HTML files — Next.js must run through the dev or production server.

## Production

```bash
npm run build:arena
npm run start:arena
```

PWA install works best on **HTTPS** production.

## Rebuild this deliverable

```bash
chmod +x scripts/build-website-deliverable.sh
./scripts/build-website-deliverable.sh
```

## Not included in zip

- `node_modules/` — run `npm install`
- `.next/` — run `npm run build:arena`
- `.git/` — use your own repo remote
- `.env.local` / secrets — copy from your secure store
- `incoming/`, `preview-4k/`, `legacy/` — dev trash / old imports

## Project boundary

**CaribbeanFreedomArena website/app** ← this zip only.

Do not merge pages, HUDs, or copy from other products unless explicitly requested.
