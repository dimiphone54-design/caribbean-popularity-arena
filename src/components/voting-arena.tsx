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
      className={`luxury-glass-card p-5 text-left ${
        selected ? "ring-1 ring-[var(--luxury-gold)]/45" : ""
      }`}
    >
      <div
        className={`relative z-[1] grid aspect-square place-items-center rounded-[1.5rem] bg-gradient-to-br ${creator.accent} text-5xl font-black text-slate-950 shadow-xl`}
      >
        {creator.initials}
      </div>
      <div className="relative z-[1] mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--luxury-gold)]/80">
            {creator.island}
          </p>
          <h3 className="mt-2 font-luxury-serif text-2xl text-[var(--luxury-champagne)]">{creator.name}</h3>
          <p className="mt-1 text-sm text-[var(--luxury-mist)]">{creator.category}</p>
        </div>
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full ${
            selected
              ? "bg-[var(--luxury-gold)] text-[#1a1208]"
              : "border border-[var(--glass-border)] bg-[var(--luxury-gold)]/10 text-[var(--luxury-gold-bright)]"
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
    <section id="vote" className="w-full py-20">
      <div className="luxury-glass-panel w-full p-5 md:p-8">
        <div className="relative z-[1] grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="luxury-section-eyebrow">Members ballot salon</p>
            <h2 className="luxury-section-title mt-3 text-4xl sm:text-5xl">
              Cast your vote. Shape the arena.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--luxury-mist)]">
              Private members vote by matchup, category, or island. Premium tiers amplify
              influence while every ballot is secured and recorded with care.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {votingCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    selectedCategory === category ? "luxury-gold-cta" : "luxury-gold-outline"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-[var(--glass-border)] bg-[var(--luxury-gold)]/8 p-5 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--luxury-gold)]/25 text-[var(--luxury-gold-bright)]">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-bold text-[var(--luxury-champagne)]">Verified fair vote flow</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--luxury-mist)]">
                    One tap records a pending vote, applies membership weight, and prepares
                    a secure write to the votes collection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex flex-col justify-between gap-3 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 backdrop-blur-xl sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-[var(--luxury-gold)]">{featuredMatchup.round}</p>
                <p className="mt-1 text-lg font-bold text-[var(--luxury-champagne)]">{featuredMatchup.question}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--luxury-gold)]/10 px-4 py-2 text-sm font-bold text-[var(--luxury-gold-bright)]">
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

            <div className="mt-4 rounded-3xl border border-[var(--luxury-gold)]/35 bg-gradient-to-r from-[var(--luxury-gold)]/20 to-[var(--luxury-amber)]/15 p-[1px]">
              <div className="rounded-[1.3rem] bg-[var(--glass-bg-deep)] px-5 py-4 backdrop-blur-xl">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--luxury-gold)]">
                  Vote preview
                </p>
                <p className="mt-2 text-lg font-bold text-[var(--luxury-champagne)]">
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
