import { Crown, Sparkles } from "lucide-react";

const navItems = [
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Vote", href: "#vote" },
  { label: "Plans", href: "#plans" },
  { label: "Firebase", href: "#firebase" }
];

export function ArenaHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500 text-slate-950 shadow-lg shadow-orange-500/25">
            <Crown className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-black tracking-tight sm:text-lg">
              Caribbean Popularity Arena
            </span>
            <span className="hidden text-xs uppercase tracking-[0.35em] text-amber-200/80 sm:block">
              Rank. Rally. Reign.
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-200 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-amber-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#plans"
          className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-amber-100 sm:inline-flex"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          Join arena
        </a>
      </div>
    </header>
  );
}
