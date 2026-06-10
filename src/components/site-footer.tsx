import { Crown, Heart } from "lucide-react";
import { brand } from "@/config/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d7b46a]/20 bg-[#050d1d]/70 px-4 py-10 shadow-2xl shadow-black/20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#b8c9e1] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl border border-[#d7b46a]/30 bg-[#d7b46a]/10 text-[#f7e7aa]">
            <Crown className="size-5" aria-hidden="true" />
          </span>
          <span className="font-luxury-serif text-[#f7efe0]">{brand.name}</span>
        </div>
        <p className="flex items-center gap-2">
          {brand.tagline}
          <Heart className="size-4 fill-[#d7b46a] text-[#d7b46a]" aria-hidden="true" />
        </p>
      </div>
    </footer>
  );
}
