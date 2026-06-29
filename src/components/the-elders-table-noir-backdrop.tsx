import { TheEldersTableCompositeBackdrop } from "@/components/the-elders-table-composite-backdrop";
import { TheEldersTableHeroSlideshow } from "@/components/the-elders-table-hero-slideshow";
import type { EldersTableVersionConfig } from "@/lib/the-elders-table-versions";

type TheEldersTableNoirBackdropProps = {
  config: EldersTableVersionConfig;
};

export function TheEldersTableNoirBackdrop({ config }: TheEldersTableNoirBackdropProps) {
  if (config.backdropKind === "composite-v5") {
    return (
      <div className="elders-table-photo-backdrop pointer-events-none absolute inset-0 w-full overflow-hidden" aria-hidden="true">
        <TheEldersTableCompositeBackdrop />
      </div>
    );
  }

  return (
    <div className="elders-table-photo-backdrop pointer-events-none absolute inset-0 w-full overflow-hidden" aria-hidden="true">
      <TheEldersTableHeroSlideshow config={config} />
    </div>
  );
}
