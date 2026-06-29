"use client";

import { dropshipCategoryOptions, type DropshipLaneId } from "@/lib/dropshipping";
import { getDropshipCategoryLabel, getDropshipMarketCopy } from "@/lib/dropship-market-copy";

type DropshipCategoryLanesProps = {
  compact?: boolean;
  selectedLane?: DropshipLaneId | null;
  onSelectLane?: (lane: DropshipLaneId | null) => void;
  countryId?: string;
};

/** Selectable category options · all dropship panels */
export function DropshipCategoryLanes({
  compact = false,
  selectedLane = null,
  onSelectLane,
  countryId = "colombia"
}: DropshipCategoryLanesProps) {
  const copy = getDropshipMarketCopy(countryId);

  return (
    <div
      className={`dropship-category-lanes${compact ? " dropship-category-lanes--compact" : ""}`}
      role="group"
      aria-label={copy.categoryAria}
    >
      {dropshipCategoryOptions.map((option) => {
        const isActive = selectedLane === option.id;
        const label = getDropshipCategoryLabel(countryId, option.id);

        return (
          <button
            key={option.id}
            type="button"
            className={`dropship-category-lane${isActive ? " dropship-category-lane--active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onSelectLane?.(isActive ? null : option.id)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
