"use client";

import { useCallback, useEffect, useState } from "react";
import type { FreedomDriveLeaderboardEntry } from "@/lib/freedom-drive/types";
import { useFreedomDrive } from "@/components/freedom-drive/freedom-drive-context";

export function FreedomDriveLeaderboardPanel() {
  const { stats, playerName, theme } = useFreedomDrive();
  const [entries, setEntries] = useState<FreedomDriveLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/freedom-drive/leaderboard");
      const data = (await res.json()) as { ok?: boolean; entries?: FreedomDriveLeaderboardEntry[] };
      if (data.ok && data.entries) setEntries(data.entries);
    } catch {
      setMessage(theme.leaderboardOffline);
    } finally {
      setLoading(false);
    }
  }, [theme.leaderboardOffline]);

  useEffect(() => {
    void load();
  }, [load]);

  const submitScore = useCallback(async () => {
    if (stats.distanceM < 50 && stats.topSpeedMph < 10) {
      setMessage(theme.leaderboardDriveMore);
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/freedom-drive/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: playerName,
          country: theme.country,
          distance_driven: Math.round(stats.distanceM),
          top_speed: stats.topSpeedMph,
          arena_points: stats.arenaPoints
        })
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; fallback?: boolean };
      if (data.ok) {
        setMessage(data.fallback ? theme.leaderboardPostedLocal : theme.leaderboardPosted);
        await load();
      } else {
        setMessage(data.error ?? theme.leaderboardSaveError);
      }
    } catch {
      setMessage(theme.leaderboardNetworkError);
    } finally {
      setSaving(false);
    }
  }, [
    load,
    playerName,
    stats.arenaPoints,
    stats.distanceM,
    stats.topSpeedMph,
    theme.country,
    theme.leaderboardDriveMore,
    theme.leaderboardNetworkError,
    theme.leaderboardPosted,
    theme.leaderboardPostedLocal,
    theme.leaderboardSaveError
  ]);

  return (
    <aside className="fd-leaderboard" aria-label={`${theme.title} leaderboard`}>
      <div className="fd-leaderboard-head">
        <p className="fd-leaderboard-kicker">{theme.leaderboardKicker}</p>
        <h3 className="fd-leaderboard-title">{theme.leaderboardTitle}</h3>
      </div>

      {loading ? (
        <p className="fd-leaderboard-empty">{theme.leaderboardLoading}</p>
      ) : entries.length === 0 ? (
        <p className="fd-leaderboard-empty">{theme.leaderboardEmpty}</p>
      ) : (
        <ol className="fd-leaderboard-list">
          {entries.map((entry, index) => (
            <li key={entry.id} className="fd-leaderboard-row">
              <span className="fd-leaderboard-rank">{String(index + 1).padStart(2, "0")}</span>
              <span className="fd-leaderboard-player">
                <span className="fd-leaderboard-name">{entry.username}</span>
                <span className="fd-leaderboard-meta">
                  {entry.country} · {(entry.distance_driven / 1000).toFixed(1)} km · {entry.top_speed} mph
                </span>
              </span>
              <span className="fd-leaderboard-points">{entry.arena_points.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      )}

      <button type="button" className="fd-leaderboard-submit" disabled={saving} onClick={() => void submitScore()}>
        {saving ? theme.leaderboardSubmitting : theme.leaderboardSubmit}
      </button>
      {message ? <p className="fd-leaderboard-msg">{message}</p> : null}
    </aside>
  );
}
