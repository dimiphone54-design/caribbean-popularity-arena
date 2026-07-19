"use client";

import {
  getWushuDuilianPreviewEmbedSrc,
  wushuDuilianStagePreview
} from "@/lib/china-wushu-duilian-preview";

/** Center-stage clip · real championship Wushu Duilian (对练) · Chinese captions */
export function WushuDuilianStagePreview() {
  const { youtubeId, titleZh, detailZh, durationLabel } = wushuDuilianStagePreview;

  return (
    <div className="arena-agora-duilian-preview" lang="zh-CN">
      <div className="arena-agora-duilian-preview-badge">
        <span className="arena-agora-duilian-preview-badge-dot" aria-hidden="true" />
        对练预览 · {durationLabel}
      </div>

      <div className="arena-agora-duilian-preview-frame">
        <iframe
          src={getWushuDuilianPreviewEmbedSrc(youtubeId)}
          title={titleZh}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="arena-agora-duilian-preview-caption">
        <p className="arena-agora-duilian-preview-caption-zh">{titleZh}</p>
        <p className="arena-agora-duilian-preview-caption-detail">{detailZh}</p>
      </div>
    </div>
  );
}
