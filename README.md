# Caribbean Popularity Arena

A complete Next.js 15 concept site for a Caribbean creator ranking, voting,
membership, and discovery platform.

## Features

- Next.js 15 App Router with TypeScript
- Tailwind CSS responsive interface
- Homepage hero with live platform stats
- Creator leaderboard cards with ranking, vote, and trend data
- Interactive voting system UI with category selection and ballot preview
- Membership plan cards for fans, super fans, and creators
- Firebase integration structure for Auth, Firestore, and Storage
- Typed Firestore document contracts for creators, votes, and memberships

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the arena.

## Placeholder-first environment setup

Copy the example environment file for local development:

```bash
cp .env.example .env.local
```

All secrets and third-party credentials are placeholders during development.
The application is designed to run without real production keys. Replace values
only when connecting production services.

Environment groups included in `.env.example`:

- Application metadata and URLs
- Feature flags for voting writes, checkout, and analytics
- Firebase web app credentials
- Stripe payment credentials and price IDs
- Cloudflare account, API, and R2 placeholders
- Google Analytics, Meta Pixel, and PostHog placeholders

The shared environment helper lives in `src/lib/env.ts`. Firebase helpers live
in `src/lib/firebase/client.ts`, and typed collection contracts live in
`src/lib/firebase/schema.ts`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
