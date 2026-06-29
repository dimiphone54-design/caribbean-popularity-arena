/** Micro scene · waiting queue · icon-style woman walks to bench and sits happy. */
export function WaitingGirlMicroScene() {
  return (
    <div
      className="waiting-girl-micro-scene"
      role="img"
      aria-label="Woman walking to a park bench and sitting down happily, waiting for the next rotation"
    >
      <span className="waiting-girl-micro-badge" aria-hidden="true">
        🇪🇸 18+
      </span>

      <svg
        className="waiting-woman-icon-svg"
        viewBox="0 0 168 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waitingWomanSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe8dc" />
            <stop offset="100%" stopColor="#e8b49a" />
          </linearGradient>
          <linearGradient id="waitingWomanHair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4a2c17" />
            <stop offset="100%" stopColor="#2a1608" />
          </linearGradient>
          <linearGradient id="waitingWomanTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="waitingWomanJeans" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="waitingBenchWood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a67c52" />
            <stop offset="100%" stopColor="#6b4423" />
          </linearGradient>
        </defs>

        {/* Ground */}
        <ellipse cx="84" cy="52" rx="72" ry="3" fill="rgba(0,201,167,0.12)" />

        {/* Park bench */}
        <g className="waiting-woman-icon-bench">
          <rect x="118" y="38" width="38" height="4.5" rx="1.2" fill="url(#waitingBenchWood)" />
          <rect x="120" y="28" width="34" height="3" rx="0.8" fill="url(#waitingBenchWood)" opacity="0.85" />
          <rect x="122" y="42" width="3" height="8" rx="0.6" fill="#5c3d1e" />
          <rect x="149" y="42" width="3" height="8" rx="0.6" fill="#5c3d1e" />
          <rect x="118" y="31" width="2.5" height="11" rx="0.6" fill="#5c3d1e" />
          <rect x="153.5" y="31" width="2.5" height="11" rx="0.6" fill="#5c3d1e" />
        </g>

        {/* Walking + sitting figure */}
        <g className="waiting-woman-icon-figure">
          {/* Walking pose */}
          <g className="waiting-woman-icon-walking">
            <ellipse cx="18" cy="14.5" rx="7.5" ry="8.2" fill="url(#waitingWomanHair)" />
            <circle cx="18" cy="16" r="6.2" fill="url(#waitingWomanSkin)" />
            <circle cx="20.2" cy="15.2" r="0.65" fill="#3d2314" />
            <circle cx="16.2" cy="15.2" r="0.65" fill="#3d2314" />
            <path d="M16.8 18.2 Q18 19.1 19.4 18.2" stroke="#c97b6a" strokeWidth="0.55" strokeLinecap="round" fill="none" />
            <path
              d="M14.5 22.5 Q18 20.5 21.5 22.5 L20.5 32 Q18 33.5 15.5 32 Z"
              fill="url(#waitingWomanTop)"
            />
            <path d="M15 32 L13 44 L16 44 L17.5 34 Z" fill="url(#waitingWomanJeans)" />
            <path d="M21 32 L23.5 44 L20.5 44 L18.5 34 Z" fill="url(#waitingWomanJeans)" />
            <ellipse cx="14.5" cy="44.5" rx="2.2" ry="1.2" fill="#1e293b" />
            <ellipse cx="22.5" cy="44.5" rx="2.2" ry="1.2" fill="#1e293b" />
            <path
              d="M21.5 24 Q26 26 24 30"
              stroke="url(#waitingWomanSkin)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M14.5 24 Q10 27 12 31"
              stroke="url(#waitingWomanSkin)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <g className="waiting-woman-icon-walk-legs">
              <path d="M15.5 34 L12 42" stroke="url(#waitingWomanJeans)" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M20.5 34 L24 42" stroke="url(#waitingWomanJeans)" strokeWidth="3.2" strokeLinecap="round" />
            </g>
          </g>

          {/* Sitting pose (on bench) */}
          <g className="waiting-woman-icon-sitting">
            <ellipse cx="18" cy="13.5" rx="7.5" ry="8.2" fill="url(#waitingWomanHair)" />
            <circle cx="18" cy="15" r="6.2" fill="url(#waitingWomanSkin)" />
            <path d="M14.8 14.3 Q15.5 13.3 16.2 14.3" stroke="#3d2314" strokeWidth="0.7" strokeLinecap="round" fill="none" />
            <path d="M19.8 14.3 Q20.5 13.3 21.2 14.3" stroke="#3d2314" strokeWidth="0.7" strokeLinecap="round" fill="none" />
            <path d="M15.2 18.2 Q18 19.8 20.8 18.2" stroke="#e11d48" strokeWidth="0.8" strokeLinecap="round" fill="none" />
            <path
              d="M14.5 21.5 Q18 20 21.5 21.5 L20.5 29 Q18 30 15.5 29 Z"
              fill="url(#waitingWomanTop)"
            />
            {/* Thighs on bench seat */}
            <path d="M13 29 L10 37 L16 37 L17.5 29 Z" fill="url(#waitingWomanJeans)" />
            <path d="M22.5 29 L25 37 L19 37 L17.5 29 Z" fill="url(#waitingWomanJeans)" />
            {/* Lower legs dangling */}
            <path d="M11 37 L10.5 42" stroke="url(#waitingWomanJeans)" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M24 37 L24.5 42" stroke="url(#waitingWomanJeans)" strokeWidth="2.8" strokeLinecap="round" />
            <ellipse cx="10.5" cy="42.5" rx="2" ry="1.1" fill="#1e293b" />
            <ellipse cx="24.5" cy="42.5" rx="2" ry="1.1" fill="#1e293b" />
            <path
              d="M21 23 Q26 21 25 27"
              stroke="url(#waitingWomanSkin)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M15 23 Q10 25 11.5 28"
              stroke="url(#waitingWomanSkin)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>

        {/* Happy sparkles when seated */}
        <g className="waiting-woman-icon-happy">
          <text x="108" y="18" fontSize="8" fill="#fde68a">
            ✦
          </text>
          <text x="128" y="12" fontSize="7" fill="#fb7185">
            ♡
          </text>
          <text x="142" y="20" fontSize="6" fill="#86efac">
            ☺
          </text>
        </g>
      </svg>
    </div>
  );
}
