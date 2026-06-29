import { getCfaHeaderTrinidadStrobePaths } from "@/lib/cfa-header-trinidad-ai-strobe-paths";

/** AI · 4K white strobe · pixel-traced Trinidad & Tobago coast rings */
export function CfaHeaderTrinidadAiStrobe() {
  const { trinidad, tobago } = getCfaHeaderTrinidadStrobePaths();

  return (
    <g className="cfa-elite-ai-header-tt-strobe" aria-hidden="true">
      <defs>
        <filter id="cfaTtStrobeWhiteGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.2 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Crisp white coast ring · hugging island silhouette */}
      <circle id="cfa-trinidad-join-anchor" cx="291" cy="432" r="1.5" fill="none" stroke="none" />
      <path d={trinidad} className="cfa-elite-ai-header-tt-strobe-coast" />
      <path d={tobago} className="cfa-elite-ai-header-tt-strobe-coast cfa-elite-ai-header-tt-strobe-coast-tobago" />

      <path d={trinidad} className="cfa-elite-ai-header-tt-strobe-halo" />
      <path d={tobago} className="cfa-elite-ai-header-tt-strobe-halo cfa-elite-ai-header-tt-strobe-halo-tobago" />

      <path d={trinidad} className="cfa-elite-ai-header-tt-strobe-track" />
      <path d={tobago} className="cfa-elite-ai-header-tt-strobe-track cfa-elite-ai-header-tt-strobe-track-tobago" />

      <circle r="3.2" className="cfa-elite-ai-header-tt-strobe-node">
        <animateMotion dur="5.6s" repeatCount="indefinite" path={trinidad} />
      </circle>
      <circle r="2.4" className="cfa-elite-ai-header-tt-strobe-node cfa-elite-ai-header-tt-strobe-node-tobago">
        <animateMotion dur="2.8s" repeatCount="indefinite" path={tobago} />
      </circle>
    </g>
  );
}
