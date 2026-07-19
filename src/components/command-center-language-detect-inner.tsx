"use client";

import { useArenaMemberLanguage } from "@/components/use-arena-member-language";

export function CommandCenterLanguageDetectInner() {
  const { ready, meta, saved, locale, detectKicker } = useArenaMemberLanguage();

  return (
    <div className="rounded-xl border border-[#00c9a7]/20 bg-[#00c9a7]/5 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#00c9a7] mb-2">Live Detection Status</p>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{ready ? meta.flag : "…"}</span>
        <div>
          <p className="text-sm font-bold text-white">{ready ? meta.label : "Detecting…"}</p>
          <p className="text-[10px] text-[#7a82a8]">
            {ready ? `Code: ${locale} · ${saved ? "Saved on device" : "Not yet saved"}` : "Waiting for browser…"}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-[#111830] px-3 py-2">
        <span className="inline-block h-2 w-2 rounded-full bg-[#00c9a7] animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a82a8]">{detectKicker}</span>
      </div>
    </div>
  );
}
