"use client";

import Image from "next/image";
import { SiteFooterLowerRightStack, SITE_FOOTER_MICRO_ANCHOR_ID } from "@/components/site-footer-lower-right-stack";

const matchPanelPhotos = {
  match: {
    src: "/site-footer-match-panel-bg.png",
    alt: "Find Your Perfect Match — join our community, meaningful connections, safe and secure, easy to chat, Join Now"
  },
  friends: {
    src: "/site-footer-match-panel-friends.png",
    alt: "Friends on the arena — four players connected on mobile, gaming and chat together"
  }
} as const;

export function SiteFooter() {
  return (
    <footer className="site-footer-panel-wrap">
      <div className="site-footer-panel">
        <div className="site-footer-panel-white-shell">
          <span className="site-footer-panel-white-notch" aria-hidden="true" />
          <span className="site-footer-panel-white-strobe" aria-hidden="true" />

          <div className="site-footer-panel-photo relative">
            <div className="site-footer-panel-photo-grid">
              <div className="site-footer-panel-photo-friends relative">
                <Image
                  src={matchPanelPhotos.friends.src}
                  alt={matchPanelPhotos.friends.alt}
                  fill
                  className="site-footer-panel-bg site-footer-panel-bg--friends"
                  sizes="(max-width: 640px) 50vw, 50vw"
                  priority={false}
                />
                <div className="site-footer-photo-locations" aria-hidden="true">
                  <span className="site-footer-photo-location site-footer-photo-location--japan">📍 Japan</span>
                  <span className="site-footer-photo-location site-footer-photo-location--china">📍 China</span>
                </div>
              </div>

              <div className="site-footer-panel-photo-match relative">
                <Image
                  src={matchPanelPhotos.match.src}
                  alt={matchPanelPhotos.match.alt}
                  fill
                  className="site-footer-panel-bg site-footer-panel-bg--match"
                  sizes="(max-width: 640px) 50vw, 50vw"
                  priority={false}
                />

                <div className="site-footer-photo-locations" aria-hidden="true">
                  <span className="site-footer-photo-location site-footer-photo-location--uk">📍 UK</span>
                  <span className="site-footer-photo-location site-footer-photo-location--ecuador">📍 Ecuador</span>
                </div>
              </div>
            </div>

            <div className="site-footer-panel-photo-divide" aria-hidden="true">
              <span className="site-footer-panel-photo-divide-line" />
              <span className="site-footer-panel-photo-divide-heart">💕</span>
              <span className="site-footer-panel-photo-divide-line" />
            </div>

            <div className="site-footer-panel-fade" aria-hidden="true" />

            <div className="site-footer-legal-anchor" id={SITE_FOOTER_MICRO_ANCHOR_ID}>
              <SiteFooterLowerRightStack />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
