"use client";

import Link from "next/link";
import { ukDropshipWomenHeroSlides, ukDropshipWomenPhotos } from "@/lib/uk-dropship-women-photos";

const UK_WOMEN_SLOT_FACES = ukDropshipWomenHeroSlides.filter((slide) =>
  ["holland-park-4", "london-summer-5", "london-park-girls"].includes(slide.id)
);

/** UK slideshow · bottom-right quarter cell · UK women dropship live slot only */
export function UkSlideshowDropshipCreatorsSlot() {
  return (
    <div className="uk-slideshow-dropship-slot uk-slideshow-dropship-slot--cell" aria-label="UK women dropship live slot">
      <div
        className="uk-slideshow-dropship-slot-bg"
        style={{ backgroundImage: `url('${ukDropshipWomenPhotos.hollandParkFour}')` }}
        aria-hidden="true"
      />
      <div className="uk-slideshow-dropship-slot-scrim" aria-hidden="true" />
      <div className="uk-slideshow-dropship-slot-box">
        <span className="uk-slideshow-dropship-slot-live">Live · UK women only</span>
        <p className="uk-slideshow-dropship-slot-kicker">
          <span className="uk-slideshow-dropship-slot-kicker-inner">🇬🇧 United Kingdom</span>
        </p>
        <p className="uk-slideshow-dropship-slot-title">Dropship creators</p>
        <div className="uk-slideshow-dropship-slot-faces" aria-hidden="true">
          {UK_WOMEN_SLOT_FACES.map((creator) => (
            <span
              key={creator.id}
              className="uk-slideshow-dropship-slot-face"
              style={{ backgroundImage: `url('${creator.src}')`, backgroundPosition: creator.focus }}
            />
          ))}
        </div>
        <Link href="#uk-women-dropship-shop" className="uk-slideshow-dropship-slot-link">
          UK shop →
        </Link>
      </div>
    </div>
  );
}
