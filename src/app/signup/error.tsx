"use client";

export default function SignupError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">Caribbean Freedom Arena</p>
      <h1 className="mt-4 font-['Bebas_Neue',sans-serif] text-4xl tracking-wider text-[#eef6ff]">Signup error</h1>
      <p className="mt-3 text-sm leading-6 text-[#9aa8c6]">
        The signup panel failed to render. Tap try again to reload the form.
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
  );
}