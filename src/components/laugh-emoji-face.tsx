type LaughEmojiFaceProps = {
  variant: "grin" | "tears";
};

export function LaughEmojiFace({ variant }: LaughEmojiFaceProps) {
  const isHysterical = variant === "tears";
  const glowId = `laughFaceGlow-${variant}`;

  return (
    <span className={`a2030-laugh-stage a2030-laugh-face-wrap a2030-laugh-face-wrap--${variant}`}>
      <svg
        className={`a2030-laugh-face a2030-laugh-face--${variant}`}
        viewBox="0 0 48 48"
        width="24"
        height="24"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="22" fill="#FFD93B" />
        <circle cx="24" cy="24" r="22" fill={`url(#${glowId})`} opacity="0.35" />

        {isHysterical ? (
          <>
            <ellipse cx="14" cy="28" rx="4.5" ry="2.4" fill="#FF8A80" opacity="0.55" />
            <ellipse cx="34" cy="28" rx="4.5" ry="2.4" fill="#FF8A80" opacity="0.55" />
          </>
        ) : null}

        <g className="a2030-laugh-eyes">
          {isHysterical ? (
            <>
              <path
                className="a2030-laugh-eye-left"
                d="M10 18 Q14 12 18 18"
                fill="none"
                stroke="#5C3D1E"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                className="a2030-laugh-eye-right"
                d="M30 17 Q34 11 38 17"
                fill="none"
                stroke="#5C3D1E"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M12 20 Q15 22 18 20"
                fill="none"
                stroke="#5C3D1E"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.55"
              />
            </>
          ) : (
            <>
              <ellipse className="a2030-laugh-eye-open" cx="16" cy="18" rx="3.2" ry="4.2" fill="#5C3D1E" />
              <ellipse className="a2030-laugh-eye-open" cx="32" cy="18" rx="3.2" ry="4.2" fill="#5C3D1E" />
              <ellipse className="a2030-laugh-eye-shine" cx="17.2" cy="16.5" rx="1.2" ry="1.5" fill="#FFF8DC" />
              <ellipse className="a2030-laugh-eye-shine" cx="33.2" cy="16.5" rx="1.2" ry="1.5" fill="#FFF8DC" />
            </>
          )}
        </g>

        {isHysterical ? (
          <g className="a2030-laugh-tear-drops">
            <path d="M12 20 C11 24 13 28 12 32 C11 28 10 24 12 20 Z" fill="#4FC3F7" />
            <path d="M14 22 C13.5 25 14.5 28 14 31 C13.5 28 13 25 14 22 Z" fill="#81D4FA" opacity="0.9" />
            <path d="M36 20 C37 24 35 28 36 32 C37 28 38 24 36 20 Z" fill="#4FC3F7" />
            <path d="M34 22 C34.5 25 33.5 28 34 31 C34.5 28 35 25 34 22 Z" fill="#81D4FA" opacity="0.9" />
            <circle className="a2030-laugh-tear-spark" cx="11" cy="34" r="1.2" fill="#E1F5FE" />
            <circle className="a2030-laugh-tear-spark" cx="37" cy="34" r="1.2" fill="#E1F5FE" />
          </g>
        ) : null}

        <g className="a2030-laugh-mouth">
          {isHysterical ? (
            <>
              <ellipse cx="23" cy="34" rx="13" ry="9.5" fill="#7A2E1A" transform="rotate(-8 23 34)" />
              <g className="a2030-laugh-teeth" transform="rotate(-8 23 34)">
                <rect x="14" y="27.5" width="18" height="4.2" rx="1.2" fill="#FFFDE7" />
                <path d="M15 31.5 H33" stroke="#E0E0E0" strokeWidth="0.8" opacity="0.8" />
              </g>
              <ellipse
                className="a2030-laugh-mouth-inner"
                cx="23"
                cy="35"
                rx="9.5"
                ry="5.5"
                fill="#C62828"
                transform="rotate(-8 23 35)"
              />
              <ellipse
                className="a2030-laugh-tongue a2030-laugh-tongue-wag"
                cx="27"
                cy="38.5"
                rx="6.5"
                ry="4.2"
                fill="#FF8A80"
                transform="rotate(18 27 38.5)"
              />
              <path
                d="M12 30 Q23 41 35 31"
                fill="none"
                stroke="#5C2618"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <ellipse cx="24" cy="33" rx="11" ry="7.5" fill="#7A2E1A" />
              <ellipse className="a2030-laugh-mouth-inner" cx="24" cy="31.5" rx="8.5" ry="4.5" fill="#C62828" />
              <ellipse className="a2030-laugh-tongue" cx="24" cy="34.5" rx="5.5" ry="3.2" fill="#FF8A80" />
              <path d="M14 29 Q24 36 34 29" fill="none" stroke="#5C2618" strokeWidth="1.4" strokeLinecap="round" />
            </>
          )}
        </g>

        <defs>
          <radialGradient id={glowId} cx="40%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="100%" stopColor="#FFD93B" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </span>
  );
}
