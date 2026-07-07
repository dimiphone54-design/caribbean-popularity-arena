"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-[#060816] text-[#eef6ff]">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">Caribbean Freedom Arena</p>
          <h1 className="mt-4 font-['Bebas_Neue',sans-serif] text-5xl tracking-wider">Something went wrong</h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[#9aa8c6]">
            The page hit an error while loading. You can try again to refresh the experience.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] px-5 py-3 text-sm font-black text-[#0a0e1f]"
          >
            Try again
          </button>
          <p className="mt-4 text-[0.7rem] text-[#7a82a8]">{error.message}</p>
        </main>
      </body>
    </html>
  );
}