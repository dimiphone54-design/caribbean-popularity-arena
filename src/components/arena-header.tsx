import { Crown, Sparkles } from "lucide-react";
import { brand } from "@/config/brand";

export function ArenaHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d7b46a]/20 bg-[#050d1d]/80 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="luxury-orb grid size-11 place-items-center rounded-2xl text-[#050d1d] shadow-lg shadow-[#d7b46a]/25 ring-1 ring-white/25">
            <Crown className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="font-luxury-serif block text-base font-black tracking-tight text-[#f7efe0] sm:text-lg">
              {brand.name}
            </span>
            <span className="hidden text-xs uppercase tracking-[0.35em] text-[#d7b46a]/85 sm:block">
              {brand.signature}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#d9e4f3] md:flex">
          {brand.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative transition hover:text-[#f7e7aa] after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-[#d7b46a] after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#plans"
          className="hidden items-center gap-2 rounded-full border border-[#f7e7aa]/30 bg-gradient-to-r from-[#f7e7aa] via-[#d7b46a] to-[#a98132] px-5 py-2.5 text-sm font-black text-[#050d1d] shadow-lg shadow-[#d7b46a]/20 transition hover:-translate-y-0.5 hover:shadow-[#d7b46a]/35 sm:inline-flex"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          Request access
        </a>
      </div>
    </header>
  );
}
