import type { ReactNode } from "react";

/** Shared padding / width for built country room pages */
export function RoomCountryPageShell({
  children,
  className = "",
  topPadding = "default"
}: {
  children: ReactNode;
  className?: string;
  /** compact = quote-first hero (UK Cotswolds) · clears back nav only */
  topPadding?: "default" | "compact";
}) {
  const topClass = topPadding === "compact" ? "pt-20 sm:pt-[5.25rem]" : "pt-[11.5rem] sm:pt-28";

  return (
    <div
      className={`country-room-page-shell mx-auto w-full max-w-6xl px-4 pb-56 sm:px-6 ${topClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
