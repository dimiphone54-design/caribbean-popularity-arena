-- Freedom Drive Simulator · UK Freedom Drive Arena leaderboard
-- Run in Supabase SQL editor when connecting production leaderboard.

create table if not exists public.freedom_drive_leaderboard (
  id uuid primary key default gen_random_uuid(),
  username text not null check (char_length(username) >= 2 and char_length(username) <= 48),
  country text not null default 'United Kingdom',
  distance_driven integer not null check (distance_driven >= 0),
  top_speed numeric(6, 1) not null check (top_speed >= 0),
  arena_points integer not null check (arena_points >= 0),
  created_at timestamptz not null default now()
);

create index if not exists freedom_drive_leaderboard_points_idx
  on public.freedom_drive_leaderboard (arena_points desc, created_at desc);

alter table public.freedom_drive_leaderboard enable row level security;

create policy "Public read freedom drive leaderboard"
  on public.freedom_drive_leaderboard for select
  using (true);

create policy "Public insert freedom drive scores"
  on public.freedom_drive_leaderboard for insert
  with check (true);
