import Link from "next/link";

type RoomBackToArenaProps = {
  fixed?: boolean;
  showHint?: boolean;
};

export function RoomBackToArena({ fixed = false, showHint = true }: RoomBackToArenaProps) {
  const nav = (
    <>
      <Link href="/#home" className="a2030-back-link a2030-micro no-underline" aria-label="Back to The Arena">
        <span className="a2030-back-year a2030-back-year-2026 relative z-10">2026</span>
        <span className="a2030-back-arrow relative z-10" aria-hidden="true">
          ←
        </span>
        <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs">
          Back to The Arena
        </span>
      </Link>
      {showHint ? (
        <p className="mt-3 text-xs leading-5 text-[#8fa3c4]">
          This room is independent. Return to the arena to choose another lounge.
        </p>
      ) : null}
    </>
  );

  if (fixed) {
    return (
      <div className="pointer-events-auto fixed left-0 top-0 z-[60] max-w-sm px-4 py-4 sm:px-6">{nav}</div>
    );
  }

  return <div>{nav}</div>;
}
