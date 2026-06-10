"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Crown, ShieldCheck, Vote } from "lucide-react";
import { featuredMatchup, votingCategories, type Creator } from "@/lib/data";

type SelectedSide = "left" | "right" | null;

function MatchupCard({
  creator,
  selected,
  onSelect
}: {
  creator: Creator;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group rounded-[2rem] border p-5 text-left transition hover:-translate-y-1 ${
        selected
          ? "border-amber-200 bg-amber-200/15 shadow-2xl shadow-amber-500/20"
          : "border-white/10 bg-white/[0.07] hover:bg-white/[0.1]"
      }`}
    >
      <div
        className={`grid aspect-square place-items-center rounded-[1.5rem] bg-gradient-to-br ${creator.accent} text-5xl font-black text-slate-950 shadow-xl`}
      >
        {creator.initials}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-100/80">
            {creator.island}
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">{creator.name}</h3>
          <p className="mt-1 text-sm text-slate-300">{creator.category}</p>
        </div>
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full ${
            selected ? "bg-amber-300 text-slate-950" : "bg-white/10 text-white"
          }`}
        >
          {selected ? (
            <CheckCircle2 className="size-5" aria-hidden="true" />
          ) : (
            <Vote className="size-5" aria-hidden="true" />
          )}
        </span>
      </div>
    </button>
  );
}

export function VotingArena() {
  const [selectedSide, setSelectedSide] = useState<SelectedSide>(null);
  const [selectedCategory, setSelectedCategory] = useState(votingCategories[0]);

  const selectedCreator = useMemo(() => {
    if (selectedSide === "left") {
      return featuredMatchup.left;
    }

    if (selectedSide === "right") {
      return featuredMatchup.right;
    }

    return null;
  }, [selectedSide]);

  return (
    <section id="vote" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-slate-950/55 p-5 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
              Voting system UI
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Pick a creator. Boost the culture.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Fans can vote by matchup, category, or island. Membership boosts
              raise vote weight while Firebase records every ballot for ranking
              calculations and abuse prevention.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {votingCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    selectedCategory === category
                      ? "bg-amber-300 text-slate-950"
                      : "bg-white/10 text-slate-200 hover:bg-white/15"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-5">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cyan-300 text-slate-950">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-black text-cyan-50">Fair vote flow</p>
                  <p className="mt-1 text-sm leading-6 text-cyan-50/75">
                    One tap records a pending vote, checks membership weight,
                    and prepares the write to Firestore&apos;s votes collection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex flex-col justify-between gap-3 rounded-3xl bg-white/[0.06] p-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-amber-200">{featuredMatchup.round}</p>
                <p className="mt-1 text-lg font-black text-white">{featuredMatchup.question}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-400/15 px-4 py-2 text-sm font-bold text-rose-100">
                <Crown className="size-4" aria-hidden="true" />
                {selectedCategory} ballot
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <MatchupCard
                creator={featuredMatchup.left}
                selected={selectedSide === "left"}
                onSelect={() => setSelectedSide("left")}
              />
              <MatchupCard
                creator={featuredMatchup.right}
                selected={selectedSide === "right"}
                onSelect={() => setSelectedSide("right")}
              />
            </div>

            <div className="mt-4 rounded-3xl bg-gradient-to-r from-amber-300 to-orange-500 p-1">
              <div className="rounded-[1.3rem] bg-slate-950 px-5 py-4">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-200">
                  Vote preview
                </p>
                <p className="mt-2 text-lg font-black text-white">
                  {selectedCreator
                    ? `Ready to cast a ${selectedCategory} vote for ${selectedCreator.name}.`
                    : "Choose a creator to preview your ballot."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
