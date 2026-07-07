"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  formatPopularityRecordDate,
  formatPopularitySaleAmount,
  getPopularityArenaRoomOptions,
  getPopularitySportsRoomHref,
  type PopularityDropshipSale,
  type PopularityMatchScore,
  type PopularitySportsRecord
} from "@/lib/popularity-arena-records";

export type PopularityRecordsTab = "sports" | "matches" | "dropship";

type PopularityArenaRecordsModalProps = {
  open: boolean;
  onClose: () => void;
  initialTab?: PopularityRecordsTab;
};

export function PopularityArenaRecordsModal({
  open,
  onClose,
  initialTab = "matches"
}: PopularityArenaRecordsModalProps) {
  const roomOptions = useMemo(() => getPopularityArenaRoomOptions(), []);
  const [tab, setTab] = useState<PopularityRecordsTab>(initialTab);
  const [roomSlug, setRoomSlug] = useState("all");
  const [matchScores, setMatchScores] = useState<PopularityMatchScore[]>([]);
  const [sportsRecords, setSportsRecords] = useState<PopularitySportsRecord[]>([]);
  const [dropshipSales, setDropshipSales] = useState<PopularityDropshipSale[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = useCallback(async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
      const query = slug === "all" ? "" : `?roomSlug=${encodeURIComponent(slug)}`;
      const res = await fetch(`/api/popularity-arena/records${query}`);
      const data = (await res.json()) as {
        ok?: boolean;
        matchScores?: PopularityMatchScore[];
        sportsRecords?: PopularitySportsRecord[];
        dropshipSales?: PopularityDropshipSale[];
        error?: string;
      };
      if (!data.ok) {
        setError(data.error ?? "Could not load popularity records.");
        return;
      }
      setMatchScores(data.matchScores ?? []);
      setSportsRecords(data.sportsRecords ?? []);
      setDropshipSales(data.dropshipSales ?? []);
    } catch {
      setError("Network error loading hall of fame records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setTab(initialTab);
    void loadRecords(roomSlug);
  }, [initialTab, loadRecords, open, roomSlug]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  const selectedRoom = roomOptions.find((room) => room.roomSlug === roomSlug);
  const footerHref =
    tab === "sports"
      ? getPopularitySportsRoomHref(roomSlug)
      : selectedRoom && roomSlug !== "all"
        ? selectedRoom.href
        : "/rooms/dropship-market";

  const footerLabel =
    tab === "sports"
      ? roomSlug === "all"
        ? "Enter Football Lads sports room"
        : `Enter ${selectedRoom?.flag ?? ""} ${selectedRoom?.roomLabel ?? "sports"} room`
      : selectedRoom && roomSlug !== "all"
        ? `Enter ${selectedRoom.flag} ${selectedRoom.roomLabel} room`
        : "Browse Dropship Market";

  return (
    <div
      className="fixed inset-0 z-[92] grid place-items-center bg-black/78 p-4 backdrop-blur-lg"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="popularity-records-modal a2030-modal relative w-full max-w-2xl overflow-hidden rounded-[1.25rem] p-0"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popularity-records-title"
      >
        <div className="popularity-records-modal-head">
          <div>
            <p className="popularity-records-kicker">Caribbean Popularity Arena</p>
            <h2 id="popularity-records-title" className="popularity-records-title">
              Hall of Fame · Room Records
            </h2>
            <p className="popularity-records-sub">
              Sports high scores, arena match records, and top dropship sales by room.
            </p>
          </div>
          <button type="button" className="popularity-records-close" onClick={onClose} aria-label="Close records">
            ×
          </button>
        </div>

        <div className="popularity-records-controls">
          <label className="popularity-records-filter">
            <span className="popularity-records-filter-label">Room</span>
            <select
              className="popularity-records-select"
              value={roomSlug}
              onChange={(event) => setRoomSlug(event.target.value)}
            >
              <option value="all">All rooms</option>
              {roomOptions.map((room) => (
                <option key={room.roomSlug} value={room.roomSlug}>
                  {room.flag} {room.roomLabel}
                </option>
              ))}
            </select>
          </label>

          <div className="popularity-records-tabs" role="tablist" aria-label="Record type">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "sports"}
              className={`popularity-records-tab popularity-records-tab--sports${tab === "sports" ? " is-active" : ""}`}
              onClick={() => setTab("sports")}
            >
              Sports
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "matches"}
              className={`popularity-records-tab${tab === "matches" ? " is-active" : ""}`}
              onClick={() => setTab("matches")}
            >
              Match scores
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "dropship"}
              className={`popularity-records-tab${tab === "dropship" ? " is-active" : ""}`}
              onClick={() => setTab("dropship")}
            >
              Dropship
            </button>
          </div>
        </div>

        <div className="popularity-records-body">
          {loading ? <p className="popularity-records-empty">Loading room records…</p> : null}
          {!loading && error ? <p className="popularity-records-empty popularity-records-empty--error">{error}</p> : null}

          {!loading && !error && tab === "sports" ? (
            sportsRecords.length === 0 ? (
              <p className="popularity-records-empty">No sports records logged for this room yet.</p>
            ) : (
              <ol className="popularity-records-list">
                {sportsRecords.map((row, index) => (
                  <li key={row.id} className="popularity-records-row popularity-records-row--sports">
                    <span className="popularity-records-rank">{String(index + 1).padStart(2, "0")}</span>
                    <div className="popularity-records-main">
                      <p className="popularity-records-line">
                        <span className="popularity-records-sport-pill">
                          <span aria-hidden="true">{row.sportEmoji}</span> {row.sport}
                        </span>
                        <span className="popularity-records-player">{row.playerOrTeam}</span>
                        <span className="popularity-records-room">· {row.roomLabel}</span>
                      </p>
                      <p className="popularity-records-meta">{row.headline}</p>
                      {row.resultLine ? <p className="popularity-records-result">{row.resultLine}</p> : null}
                      <p className="popularity-records-meta">{formatPopularityRecordDate(row.recordedAt)}</p>
                    </div>
                    <div className="popularity-records-score">
                      <span className="popularity-records-score-label">{row.scoreLabel}</span>
                      <span className="popularity-records-score-value">{row.score.toLocaleString("en-US")}</span>
                    </div>
                  </li>
                ))}
              </ol>
            )
          ) : null}

          {!loading && !error && tab === "matches" ? (
            matchScores.length === 0 ? (
              <p className="popularity-records-empty">No match high scores logged for this room yet.</p>
            ) : (
              <ol className="popularity-records-list">
                {matchScores.map((row, index) => (
                  <li key={row.id} className="popularity-records-row">
                    <span className="popularity-records-rank">{String(index + 1).padStart(2, "0")}</span>
                    <div className="popularity-records-main">
                      <p className="popularity-records-line">
                        <span className="popularity-records-flag" aria-hidden="true">
                          {row.flag}
                        </span>
                        <span className="popularity-records-player">{row.player}</span>
                        <span className="popularity-records-room">· {row.roomLabel}</span>
                      </p>
                      <p className="popularity-records-meta">
                        {row.match} · {formatPopularityRecordDate(row.recordedAt)}
                      </p>
                    </div>
                    <div className="popularity-records-score">
                      <span className="popularity-records-score-label">{row.scoreLabel}</span>
                      <span className="popularity-records-score-value">{row.score.toLocaleString("en-US")}</span>
                    </div>
                  </li>
                ))}
              </ol>
            )
          ) : null}

          {!loading && !error && tab === "dropship" ? (
            dropshipSales.length === 0 ? (
              <p className="popularity-records-empty">No dropship sales records for this room yet.</p>
            ) : (
              <ol className="popularity-records-list">
                {dropshipSales.map((row, index) => (
                  <li key={row.id} className="popularity-records-row">
                    <span className="popularity-records-rank">{String(index + 1).padStart(2, "0")}</span>
                    <div className="popularity-records-main">
                      <p className="popularity-records-line">
                        <span className="popularity-records-flag" aria-hidden="true">
                          {row.flag}
                        </span>
                        <span className="popularity-records-player">{row.productName}</span>
                      </p>
                      <p className="popularity-records-meta">
                        {row.roomLabel} · {row.units} units · {formatPopularityRecordDate(row.recordedAt)}
                      </p>
                    </div>
                    <div className="popularity-records-score">
                      <span className="popularity-records-score-label">Revenue</span>
                      <span className="popularity-records-score-value">
                        {formatPopularitySaleAmount(row.amount, row.currency)}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )
          ) : null}
        </div>

        <div className="popularity-records-footer">
          <Link href={footerHref} className="popularity-records-room-link" onClick={onClose}>
            {footerLabel} →
          </Link>
        </div>
      </div>
    </div>
  );
}