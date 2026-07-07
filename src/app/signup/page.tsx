"use client";

import { MemberRegistrationWizard } from "@/components/member-registration-wizard";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 py-16">
      <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-transparent bg-gradient-to-r from-[#00d4ff] via-[#14b8a6] to-[#f59e0b] bg-clip-text">
        Caribbean Freedom Arena
      </p>
      <h1 className="mt-3 text-center font-['Bebas_Neue',sans-serif] text-4xl tracking-wider text-[#eef6ff]">
        Creator sign-up
      </h1>
      <p className="mt-3 text-center text-sm leading-6 text-[#9aa8c6]">
        Terms, creator info, and form panels in the same style · no credit information
      </p>
      <MemberRegistrationWizard title="Creator" onSubmitted={() => undefined} />
    </main>
  );
}
