import { Heart, Waves } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-white/10 text-cyan-200">
            <Waves className="size-5" aria-hidden="true" />
          </span>
          <span>Caribbean Popularity Arena</span>
        </div>
        <p className="flex items-center gap-2">
          Built for fans, creators, and island culture
          <Heart className="size-4 fill-rose-300 text-rose-300" aria-hidden="true" />
        </p>
      </div>
    </footer>
  );
}
