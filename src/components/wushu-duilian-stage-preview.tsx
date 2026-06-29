"use client";

import {
  getWushuDuilianPreviewEmbedSrc,
  wushuDuilianStagePreview
} from "@/lib/china-wushu-duilian-preview";

/** Center-stage clip · real championship Wushu Duilian (对练) */
export function WushuDuilianStagePreview() {
  const { youtubeId, titleZh, titleEn, detailZh, detailEn, durationLabel } = wushuDuilianStagePreview;

  return (
    <div className="arena-agora-duilian-preview">
      <div className="arena-agora-duilian-preview-badge">
        <span className="arena-agora-duilian-preview-badge-dot" aria-hidden="true" />
        对练预览 · {durationLabel}
      </div>

      <div className="arena-agora-duilian-preview-frame">
        <iframe
          src={getWushuDuilianPreviewEmbedSrc(youtubeId)}
          title={titleEn}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="arena-agora-duilian-preview-caption">
        <p className="arena-agora-duilian-preview-caption-zh">{titleZh}</p>
        <p className="arena-agora-duilian-preview-caption-en">{titleEn}</p>
        <p className="arena-agora-duilian-preview-caption-detail">
          {detailZh} · {detailEn}
        </p>
      </div>
    </div>
  );
}
