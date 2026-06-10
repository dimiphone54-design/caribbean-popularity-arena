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

## Firebase setup

Copy the example environment file and fill in your Firebase web app values:

```bash
cp .env.example .env.local
```

Required variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Firebase helpers live in `src/lib/firebase/client.ts`, and typed collection
contracts live in `src/lib/firebase/schema.ts`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
