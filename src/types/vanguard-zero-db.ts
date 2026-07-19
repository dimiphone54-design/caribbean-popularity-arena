export type VZSeason = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: "upcoming" | "active" | "completed";
};

export type VZTeam = {
  id: string;
  name: string;
  country_id: string;
  flag: string;
  ranking: number;
  wins: number;
  losses: number;
  points: number;
  player_count: number;
};

export type VZPlayer = {
  id: string;
  name: string;
  team_id: string;
  country_id: string;
  kills: number;
  deaths: number;
  wins: number;
  matches_played: number;
  xp: number;
  rank: string;
};

export type VZMatch = {
  id: string;
  season_id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: number;
  away_score: number;
  status: "scheduled" | "live" | "completed";
  scheduled_at: string;
  completed_at: string | null;
};

-- Run this SQL in Supabase to create the tables:
--
-- CREATE TABLE vz_seasons (
--   id TEXT PRIMARY KEY,
--   name TEXT NOT NULL,
--   start_date TEXT NOT NULL,
--   end_date TEXT NOT NULL,
--   status TEXT NOT NULL DEFAULT 'upcoming'
-- );
--
-- CREATE TABLE vz_teams (
--   id TEXT PRIMARY KEY,
--   name TEXT NOT NULL,
--   country_id TEXT NOT NULL,
--   flag TEXT NOT NULL,
--   ranking INTEGER NOT NULL DEFAULT 0,
--   wins INTEGER NOT NULL DEFAULT 0,
--   losses INTEGER NOT NULL DEFAULT 0,
--   points INTEGER NOT NULL DEFAULT 0,
--   player_count INTEGER NOT NULL DEFAULT 0
-- );
--
-- CREATE TABLE vz_players (
--   id TEXT PRIMARY KEY,
--   name TEXT NOT NULL,
--   team_id TEXT REFERENCES vz_teams(id),
--   country_id TEXT NOT NULL,
--   kills INTEGER NOT NULL DEFAULT 0,
--   deaths INTEGER NOT NULL DEFAULT 0,
--   wins INTEGER NOT NULL DEFAULT 0,
--   matches_played INTEGER NOT NULL DEFAULT 0,
--   xp INTEGER NOT NULL DEFAULT 0,
--   rank TEXT NOT NULL DEFAULT 'Recruit'
-- );
--
-- CREATE TABLE vz_matches (
--   id TEXT PRIMARY KEY,
--   season_id TEXT REFERENCES vz_seasons(id),
--   home_team_id TEXT REFERENCES vz_teams(id),
--   away_team_id TEXT REFERENCES vz_teams(id),
--   home_score INTEGER NOT NULL DEFAULT 0,
--   away_score INTEGER NOT NULL DEFAULT 0,
--   status TEXT NOT NULL DEFAULT 'scheduled',
--   scheduled_at TEXT NOT NULL,
--   completed_at TEXT
-- );
