import Link from "next/link";
import {
  eldersTableGiftHref,
  eldersTableGiftLabel,
  eldersTableGiftTickerItems
} from "@/lib/elders-table-gift-ticker";

export function EldersTableGiftCta() {
  const ticker = [...eldersTableGiftTickerItems, ...eldersTableGiftTickerItems];

  return (
    <Link
      href={eldersTableGiftHref}
      className="luxury-plan-elders-gift-panel relative z-[1] mt-8 block w-full overflow-hidden no-underline"
      aria-label={`${eldersTableGiftLabel} — live data ticker`}
    >
      <span className="luxury-plan-elders-gift-shine" aria-hidden="true" />
      <span className="luxury-plan-elders-gift-ticker" aria-hidden="true">
        <span className="luxury-plan-elders-gift-ticker-track">
          {ticker.map((item, index) => (
            <span key={`${item}-${index}`} className="luxury-plan-elders-gift-ticker-item">
              {item}
              <span className="luxury-plan-elders-gift-ticker-sep">✦</span>
            </span>
          ))}
        </span>
      </span>
      <span className="luxury-plan-elders-gift-label">{eldersTableGiftLabel}</span>
    </Link>
  );
}
