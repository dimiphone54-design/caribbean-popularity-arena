"use client";

import { type MouseEvent } from "react";
import {
  chinaWushuOctagonArena,
  getWushuDuilianPreviewEmbedSrc,
  wushuCombatOctagonPreview,
  wushuDuilianOriginStory
} from "@/lib/china-wushu-duilian-preview";

function applyOriginPanelTilt(event: MouseEvent<HTMLDivElement>) {
  const panel = event.currentTarget;
  const rect = panel.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  panel.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-3px) scale(1.01)`;
}

function resetOriginPanelTilt(event: MouseEvent<HTMLDivElement>) {
  event.currentTarget.style.transform = "";
}

/** China room · octagon arena 4K · real Wushu Sanda combat + origin copy */
export function ChinaWushuWarfarePanel() {
  const { panelTitle, lead, sections } = wushuDuilianOriginStory;
  const embedSrc = getWushuDuilianPreviewEmbedSrc(wushuCombatOctagonPreview.youtubeId);

  return (
    <section
      className="china-wushu-octagon-panel country-room-section mx-auto w-full max-w-4xl"
      aria-label="Wushu Duilian octagon arena origin"
    >
      <div className="china-wushu-octagon-shell">
        <img
          className="china-wushu-octagon-bg"
          src={chinaWushuOctagonArena.imageSrc}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />

        <span className="china-wushu-octagon-haze" aria-hidden="true" />
        <span className="china-wushu-octagon-beam china-wushu-octagon-beam--a" aria-hidden="true" />
        <span className="china-wushu-octagon-beam china-wushu-octagon-beam--b" aria-hidden="true" />
        <span className="china-wushu-octagon-beam china-wushu-octagon-beam--c" aria-hidden="true" />

        <div className="china-wushu-octagon-cage">
          <div className="china-wushu-octagon-cage-frame" aria-hidden="true" />
          <div className="china-wushu-octagon-cage-video">
            <iframe
              src={embedSrc}
              title={wushuCombatOctagonPreview.titleEn}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <span className="china-wushu-octagon-4k-badge">
            <span className="china-wushu-octagon-live-dot" aria-hidden="true" />
            {wushuCombatOctagonPreview.badgeLabel}
          </span>
        </div>

        <div className="china-wushu-octagon-copy">
          <div
            className="china-wushu-octagon-neural-shell"
            onMouseMove={applyOriginPanelTilt}
            onMouseLeave={resetOriginPanelTilt}
          >
            <span className="china-wushu-octagon-neural-grid" aria-hidden="true" />
            <span className="china-wushu-octagon-neural-bar-trail" aria-hidden="true" />
            <span className="china-wushu-octagon-neural-bar" aria-hidden="true" />

            <div className="china-wushu-octagon-neural-inner">
              <h2 className="china-wushu-octagon-origin-title">{panelTitle}</h2>
              <p className="china-wushu-octagon-origin-lead">{lead}</p>
              {sections.map((section) => (
                <p key={section.title} className="china-wushu-octagon-origin-line">
                  <strong>{section.title}:</strong> {section.body}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
