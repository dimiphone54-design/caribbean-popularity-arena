import Link from "next/link";

export function RoomBackToArena() {
  return (
    <div>
      <Link href="/#home" className="text-sm font-semibold text-[#f7e7aa] underline underline-offset-2">
        ← Back to Arena
      </Link>
      <p className="mt-2 text-xs leading-5 text-[#7a82a8]">
        This room is independent. Return to the arena to choose another lounge.
      </p>
    </div>
  );
}
