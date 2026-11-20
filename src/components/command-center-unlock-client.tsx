"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CommandCenterUnlockClient() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function unlock() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/arena-master-key/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({ key })
      });

      const payload = await response.json() as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Owner key rejected");
        return;
      }

      setKey("");
      router.refresh();
    } catch {
      setError("Unable to establish owner session");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-[#050208] px-4">
      <form
        onSubmit={(event) => { event.preventDefault(); void unlock(); }}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-[#b8ff3c]/25 bg-[#0b1020] p-6"
      >
        <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-[#b8ff3c]">
          Private Owner Access
        </p>
        <h1 className="text-center text-xl font-bold text-white">
          Command Center
        </h1>
        <p className="text-center text-sm text-slate-400">
          Enter your Owner key to open the private room.
        </p>
        <input
          type="password"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          placeholder="Owner key"
          autoComplete="current-password"
          className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-3 text-sm text-white outline-none"
        />
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        <button
          type="submit"
          disabled={loading || key.trim().length < 4}
          className="w-full rounded-lg bg-[#b8ff3c] px-4 py-3 text-sm font-black text-black disabled:opacity-50"
        >
          {loading ? "VERIFYING…" : "UNLOCK PRIVATE ROOM"}
        </button>
      </form>
    </main>
  );
}
