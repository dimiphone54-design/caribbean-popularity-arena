"use client";

import { useCallback, useEffect, useState } from "react";

type MemberRow = {
  id: string;
  displayName: string;
  email: string;
  country: string;
  islandCode: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  bankCountry: string;
  accessPaid: boolean;
  amountUsd: number;
  customReference?: string;
  createdAt: string;
};

type CreatorRow = {
  id: string;
  displayName: string;
  age: number;
  country: string;
  islandCode: string;
  laneTitle: string;
  planDescription: string;
  slotRank?: number;
  status: string;
  createdAt: string;
};

export function ArenaRegistryAdminPanel() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [creators, setCreators] = useState<CreatorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [memberRes, creatorRes] = await Promise.all([
        fetch("/api/members/list"),
        fetch("/api/women-creators/list")
      ]);

      const memberPayload = (await memberRes.json()) as { ok?: boolean; members?: MemberRow[]; error?: string };
      const creatorPayload = (await creatorRes.json()) as { ok?: boolean; creators?: CreatorRow[]; error?: string };

      if (!memberRes.ok || !memberPayload.ok) {
        setError(memberPayload.error ?? "Could not load member registry");
        return;
      }
      if (!creatorRes.ok || !creatorPayload.ok) {
        setError(creatorPayload.error ?? "Could not load women creator registry");
        return;
      }

      setMembers(memberPayload.members ?? []);
      setCreators(creatorPayload.creators ?? []);
    } catch {
      setError("Network error loading registry");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <section className="command-center-room-panel mt-10 rounded-2xl border border-[#38bdf8]/25 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#38bdf8]">Arena registry</p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-3xl tracking-wider text-[#eef6ff]">
            Member + women creator database
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#9aa8c6]">
            Live reads from <code className="text-[#f7e7aa]">.data/arena-members.json</code> and{" "}
            <code className="text-[#f7e7aa]">.data/arena-women-creators.json</code>
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-xl border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#eef6ff] hover:border-white/30"
        >
          Refresh
        </button>
      </div>

      {loading ? <p className="mt-6 text-sm text-[#9aa8c6]">Loading registry…</p> : null}
      {error ? <p className="mt-6 text-sm text-[#fde68a]">{error}</p> : null}

      {!loading && !error ? (
        <div className="mt-8 space-y-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f5c842]">
              Members · {members.length}
            </p>
            {members.length === 0 ? (
              <p className="mt-3 text-sm text-[#7a82a8]">No members saved yet · test at /signup or home bank panel</p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-[0.65rem] uppercase tracking-[0.12em] text-[#7a82a8]">
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Country</th>
                      <th className="py-2 pr-4">Bank</th>
                      <th className="py-2 pr-4">Paid</th>
                      <th className="py-2">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id} className="border-b border-white/5 text-[#d9e4f2]">
                        <td className="py-3 pr-4">
                          <span className="font-bold text-[#eef6ff]">{member.displayName}</span>
                          <span className="mt-0.5 block text-xs text-[#7a82a8]">{member.email}</span>
                        </td>
                        <td className="py-3 pr-4">
                          {member.country}
                          <span className="block text-xs text-[#7a82a8]">{member.islandCode}</span>
                        </td>
                        <td className="py-3 pr-4">
                          {member.bankName}
                          <span className="block text-xs text-[#7a82a8]">
                            {member.accountHolderName} · {member.accountNumber}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          {member.accessPaid ? (
                            <span className="text-[#00c9a7]">✓ ${member.amountUsd}</span>
                          ) : (
                            <span className="text-[#f59e0b]">Pending</span>
                          )}
                        </td>
                        <td className="py-3 text-xs text-[#7a82a8]">
                          {new Date(member.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">
              Women creators · {creators.length}
            </p>
            {creators.length === 0 ? (
              <p className="mt-3 text-sm text-[#7a82a8]">No woman applications yet · test Front 12 slot sign-in</p>
            ) : (
              <div className="mt-4 space-y-3">
                {creators.map((creator) => (
                  <article
                    key={creator.id}
                    className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[#d9e4f2]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-bold text-[#eef6ff]">
                        {creator.displayName} · {creator.age} · {creator.country}
                      </p>
                      <span className="rounded-full border border-[#7dd3fc]/30 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[#7dd3fc]">
                        {creator.laneTitle}
                      </span>
                    </div>
                    <p className="mt-2 text-[#9aa8c6]">{creator.planDescription}</p>
                    <p className="mt-2 text-xs text-[#7a82a8]">
                      {creator.slotRank ? `Slot ${creator.slotRank} · ` : ""}
                      {creator.status} · {new Date(creator.createdAt).toLocaleString()}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
