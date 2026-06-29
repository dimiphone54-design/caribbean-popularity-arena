# CaribbeanFreedomArena

Next.js 15 fan arena — creator lounges, live rooms, legal compliance, and membership previews. Product name **CaribbeanFreedomArena** (legal docs may reference Caribbean Popularity Arena).

**Repository:** [github.com/dimiphone54-design/caribbean-popularity-arena](https://github.com/dimiphone54-design/caribbean-popularity-arena)

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev:arena
```

Open [http://localhost:3004/#home](http://localhost:3004/#home).

If the page looks white / unstyled, use `npm run dev:arena` (clears `.next` first). Do not run `npm run build` while dev is running.

Production:

```bash
npm run build:arena
npm run start:arena
```

## Arena lounges

Fans enter from the **arena nav** (horizontal lounge scroll on the homepage). Each room is independent — only **Back to Arena** inside rooms (gold `2026 ← Back to Arena` pill).

| Lounge | Route |
|--------|-------|
| The Elders Table | `/rooms/the-elders-table` |
| Comedy Fest | `/rooms/comedy-fest` |
| Pair League | `/rooms/the-pair-room` |
| Fashion Month | `/rooms/fashion-month` |
| Squid Game Night | `/rooms/squid-games-night` |
| Island Hub | `/rooms/island-hub` |
| International SUITE | `/rooms/international-suite` |

### International SUITE (country rooms)

| Country | Room | Route |
|---------|------|-------|
| 🇬🇧 UK | United Kingdom (Cotswolds) | `/rooms/uk-flag-cotswolds` |
| 🇬🇧 UK | Football Lads | `/rooms/football-lads` |
| 🇨🇴 Colombia | Colombia Room (live) | `/rooms/colombia-room` |
| 🇪🇨 Ecuador | Ecuador Room | `/rooms/ecuador-room` |
| 🇯🇵 Japan | Japan Room | `/rooms/japan-room` |
| 🇨🇳 China | China Room · Wushu Duilian | `/rooms/china-room` |

Country rooms show only **Back to The Arena** (fixed top-left pill).

## Other routes

| Route | Purpose |
|-------|---------|
| `/legal` | Legal document index |
| `/legal/[slug]` | Terms, privacy, community, etc. |
| `/command-center` | Owner panel (env flag only) |
| `/rooms` | Redirects to Island Hub |

## Environment

Copy `.env.example` → `.env.local`. The app runs with placeholders — no real Firebase, WiPay, or analytics keys required for local preview.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_COMMAND_CENTER_ENABLED` | Set `true` in your `.env.local` only for Command Center |
| `NEXT_PUBLIC_AGORA_APP_ID` / `AGORA_APP_CERTIFICATE` | China room live video (Agora) |
| `ARENA_MASTER_KEY` | Owner bypass · Command Center · Agora host token |
| `NEXT_PUBLIC_ARENA_KEEP_ACTIVE_SLOTS_OPEN` | Dev · Front 12 slots stay open |
| `WIPAY_*` | Trinidad WiPay — Elders Room $100 unlock when live |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase when connecting auth/data |

Legal entity placeholders: update `src/config/legal-entity.ts` after Trinidad sole trader registration.

## Scripts

```bash
npm run dev:arena   # development · port 3004 (clears .next)
npm run build:arena # production build
npm run start:arena # serve production · port 3004
npm run lint        # ESLint
npm run typecheck   # TypeScript
```

## Stack

- Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS 4
- Legal markdown in `/legal` · compliance shell (age gate, cookies, report abuse)
- Mock live UI state in lounge rooms — connect Firebase / WiPay for production writes
