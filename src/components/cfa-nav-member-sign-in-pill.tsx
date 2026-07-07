"use client";

import { formatArenaGiftAmount } from "@/lib/arena-gifts";

type CfaNavMemberSignInPillProps = {
  onOpen: () => void;
};

/** Third nav slot · compact member sign-in · opens registration panel */
export function CfaNavMemberSignInPill({ onOpen }: CfaNavMemberSignInPillProps) {
  return (
    <button
      type="button"
      className="a2030-brand cfa-nav-quantum-pill cfa-nav-quantum-pill--signin cfa-nav-quantum-pill--action"
      aria-label="Member Sign In · arena member gift registration"
      aria-haspopup="dialog"
      onClick={onOpen}
    >
      <span className="cfa-nav-signin-pill-sheen" aria-hidden="true" />
      <span className="cfa-nav-signin-pill-core relative z-10">
        <span className="cfa-nav-signin-pill-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" className="cfa-nav-signin-pill-icon-svg">
            <path
              d="M7 11V8a5 5 0 0 1 10 0v3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2.2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
          </svg>
        </span>
        <span className="cfa-nav-signin-pill-copy">
          <span className="cfa-nav-signin-pill-label">SIGN IN</span>
          <span className="cfa-nav-signin-pill-gift">{formatArenaGiftAmount(6)}</span>
        </span>
      </span>
    </button>
  );
}