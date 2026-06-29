"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ARENA_MASTER_KEY_EVENT,
  isArenaMasterKeyActive,
  setArenaMasterKeyActive
} from "@/lib/arena-master-key";
import { dispatchArenaWelcomeEnter } from "@/lib/member-username-storage";

/** Command Center · owner-only master key · bypass signup + payment gates */
export function ArenaMasterKeyPanel() {
  const [active, setActive] = useState(false);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const sync = useCallback(() => {
    setActive(isArenaMasterKeyActive());
  }, []);

  useEffect(() => {
    sync();
    const onChange = () => sync();
    window.addEventListener(ARENA_MASTER_KEY_EVENT, onChange);
    return () => window.removeEventListener(ARENA_MASTER_KEY_EVENT, onChange);
  }, [sync]);

  async function unlock() {
    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch("/api/arena-master-key/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key })
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string; message?: string };

      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Master key rejected");
        return;
      }

      setArenaMasterKeyActive(true);
      window.sessionStorage.setItem("cfa_arena_master_key_value", key.trim());
      setActive(true);
      setKey("");
      dispatchArenaWelcomeEnter();
      setNotice(
        payload.message ??
          "Master key active · 1-click slots · all rooms · signup + gift panels bypassed"
      );
    } catch {
      setError("Network error — try again");
    } finally {
      setLoading(false);
    }
  }

  function lock() {
    window.sessionStorage.removeItem("cfa_arena_master_key_value");
    setArenaMasterKeyActive(false);
    setActive(false);
    setNotice("Master key locked · normal signup + payment gates restored");
  }

  return (
    <section className="command-center-room-panel mt-8 rounded-2xl border border-[#ff5c2b]/35 p-5 sm:p-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff8c42]">Owner settings</p>
      <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-4xl tracking-[0.06em] text-[#f7efe0]">
        Master Key
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#b8c0d8]">
        Touch only you. One key unlocks every room gate, skips signup forms, and bypasses credit-card checkout
        panels while you finish interface work. Front 12 slot click → straight into that country room.
      </p>

      {active ? (
        <div className="mt-5 space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
            🔑 Master key active · owner bypass on
          </p>
          {notice ? <p className="text-sm text-[#d8deef]">{notice}</p> : null}
          <button
            type="button"
            onClick={lock}
            className="rounded-xl border border-white/20 bg-black/40 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#eef6ff] hover:border-white/35"
          >
            Lock master key
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8fa3bf]">
              Enter master key
            </span>
            <input
              type="password"
              value={key}
              onChange={(event) => setKey(event.target.value)}
              placeholder="Your private owner key"
              className="mt-2 w-full max-w-md rounded-xl border border-[#ff5c2b]/30 bg-[#0b1020] px-4 py-3 text-sm text-[#f7efe0] outline-none ring-0 placeholder:text-[#5f6b88] focus:border-[#ff8c42]/60"
              autoComplete="off"
            />
          </label>
          {error ? <p className="text-sm font-semibold text-[#fda4af]">{error}</p> : null}
          {notice ? <p className="text-sm text-[#d8deef]">{notice}</p> : null}
          <button
            type="button"
            disabled={loading || key.trim().length < 4}
            onClick={() => void unlock()}
            className="rounded-xl border border-[#ff5c2b]/45 bg-gradient-to-r from-[#ff5c2b]/25 to-[#f5c842]/15 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#ffe8c8] disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "Checking…" : "🔑 Touch · unlock everywhere"}
          </button>
          <p className="text-[10px] leading-relaxed text-[#6f7d9c]">
            Set <code className="text-[#f7e7aa]">ARENA_MASTER_KEY</code> in your local{" "}
            <code className="text-[#f7e7aa]">.env.local</code> only · never commit or deploy this key.
          </p>
        </div>
      )}
    </section>
  );
}
