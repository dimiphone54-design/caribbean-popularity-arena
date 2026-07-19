"use client";

import { useCallback, useEffect, useState } from "react";

type VaultSummary = {
  entryCount: number;
  pendingCount: number;
  totalPendingUsd: number;
  platformPendingUsd: number;
  counterpartPendingUsd: number;
  checkoutMode: "vault" | "paypal" | "off";
  paypalConfigured: boolean;
  realMoneyEnabled?: boolean;
  byCountry: Array<{
    countryId: string;
    countryName: string;
    flag: string;
    city: string;
    count: number;
    totalUsd: number;
    platformUsd: number;
    counterpartUsd: number;
  }>;
  byKind: Array<{ kind: string; count: number; totalUsd: number }>;
};

type VaultEntry = {
  id: string;
  kind: string;
  flag: string;
  city: string;
  countryName: string;
  itemLabel: string;
  amountUsd: number;
  platformUsd: number;
  counterpartUsd: number;
  counterpartLabel: string;
  status: string;
  createdAt: string;
  buyerEmail: string;
};

/**
 * Command Center · Platform Vault
 * Pending orders + owed amounts until real PayPal collection
 */
export function CommandCenterPlatformVault() {
  const [summary, setSummary] = useState<VaultSummary | null>(null);
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/platform-vault?limit=40", { cache: "no-store" });
      const data = (await res.json()) as {
        ok?: boolean;
        summary?: VaultSummary;
        entries?: VaultEntry[];
        error?: string;
      };
      if (!res.ok || !data.ok || !data.summary) {
        setError(data.error ?? "Could not load vault");
        return;
      }
      setSummary(data.summary);
      setEntries(data.entries ?? []);
    } catch {
      setError("Network error loading vault");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-3 text-left" aria-label="Platform vault">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#f5c842]">
            COMMAND CENTER · Platform Vault
          </p>
          <p className="mt-1 text-[11px] text-[#8fa3bf]">
            Orders + gifts + votes pile up here · pending collection · no real charge until PayPal is live
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-full border border-[#f5c842]/40 bg-[#f5c842]/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-[#fde68a]"
        >
          Refresh
        </button>
      </div>

      {loading ? <p className="text-[11px] text-[#8fa3bf]">Loading vault…</p> : null}
      {error ? (
        <p className="text-[11px] font-semibold text-red-300" role="alert">
          {error}
        </p>
      ) : null}

      {summary ? (
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Pending entries" value={String(summary.pendingCount)} />
            <Stat label="Total pending" value={`$${summary.totalPendingUsd.toFixed(2)}`} tone="text-[#fef9c3]" />
            <Stat label="Platform share" value={`$${summary.platformPendingUsd.toFixed(2)}`} tone="text-[#f5c842]" />
            <Stat
              label="Creator/supplier owed"
              value={`$${summary.counterpartPendingUsd.toFixed(2)}`}
              tone="text-[#86efac]"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="rounded-full border border-[#f5c842]/35 bg-[#f5c842]/10 px-2.5 py-1 font-black uppercase tracking-[0.08em] text-[#fde68a]">
              Mode: {summary.checkoutMode}
            </span>
            <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-bold text-[#c5d4ec]">
              PayPal keys: {summary.paypalConfigured ? "present (not used in vault mode)" : "none"}
            </span>
          </div>

          {summary.byCountry.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/30">
              <table className="w-full min-w-[28rem] border-collapse text-left text-[10px]">
                <thead>
                  <tr className="border-b border-white/10 text-[#8fa3bf]">
                    <th className="px-2.5 py-1.5 font-black uppercase">Lane</th>
                    <th className="px-2.5 py-1.5 font-black uppercase">#</th>
                    <th className="px-2.5 py-1.5 font-black uppercase">Total</th>
                    <th className="px-2.5 py-1.5 font-black uppercase">Platform</th>
                    <th className="px-2.5 py-1.5 font-black uppercase">Owed out</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.byCountry.map((c) => (
                    <tr key={c.countryId} className="border-b border-white/5 last:border-0">
                      <td className="px-2.5 py-1.5 font-semibold text-[#f7efe0]">
                        {c.flag} {c.city} · {c.countryName}
                      </td>
                      <td className="px-2.5 py-1.5 text-[#d8deef]">{c.count}</td>
                      <td className="px-2.5 py-1.5 text-[#fef9c3]">${c.totalUsd.toFixed(2)}</td>
                      <td className="px-2.5 py-1.5 text-[#f5c842]">${c.platformUsd.toFixed(2)}</td>
                      <td className="px-2.5 py-1.5 text-[#86efac]">${c.counterpartUsd.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[11px] text-[#8fa3bf]">
              Vault empty · buy dropship or send a gift/vote to pile the first entry.
            </p>
          )}

          {entries.length > 0 ? (
            <ul className="max-h-48 space-y-1 overflow-y-auto rounded-xl border border-white/10 bg-black/25 p-2" role="list">
              {entries.slice(0, 20).map((e) => (
                <li key={e.id} className="text-[10px] leading-4 text-[#c5d4ec]" role="listitem">
                  <span className="font-bold text-[#fef9c3]">
                    {e.flag} {e.city}
                  </span>{" "}
                  · {e.kind} · {e.itemLabel} · <span className="text-[#f5c842]">${e.amountUsd.toFixed(2)}</span>
                  {e.buyerEmail ? ` · ${e.buyerEmail}` : ""} · {e.status}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function Stat({ label, value, tone = "text-[#eef6ff]" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/35 px-2.5 py-2">
      <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#8fa3bf]">{label}</p>
      <p className={`mt-0.5 text-sm font-black ${tone}`}>{value}</p>
    </div>
  );
}
