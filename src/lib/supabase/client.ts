import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { FreedomDriveLeaderboardEntry } from "@/lib/freedom-drive/types";

let client: SupabaseClient | null = null;

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("placeholder")) return null;
  if (!client) client = createClient(url, key);
  return client;
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseClient());
}

export type FreedomDriveLeaderboardRow = {
  id?: string;
  username: string;
  country: string;
  distance_driven: number;
  top_speed: number;
  arena_points: number;
  created_at?: string;
};

export async function fetchFreedomDriveLeaderboard(limit = 20): Promise<FreedomDriveLeaderboardEntry[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("freedom_drive_leaderboard")
    .select("id, username, country, distance_driven, top_speed, arena_points, created_at")
    .order("arena_points", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as FreedomDriveLeaderboardEntry[];
}

export async function insertFreedomDriveScore(row: FreedomDriveLeaderboardRow) {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false as const, error: "Supabase not configured" };

  const { data, error } = await supabase
    .from("freedom_drive_leaderboard")
    .insert(row)
    .select("id")
    .single();

  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, id: data.id as string };
}
