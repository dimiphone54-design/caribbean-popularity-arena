"use client";

import { MemberRegistrationWizard } from "@/components/member-registration-wizard";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 py-16">
      <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">
        Caribbean Freedom Arena
      </p>
      <h1 className="mt-3 text-center font-['Bebas_Neue',sans-serif] text-4xl tracking-wider text-[#eef6ff]">
        Member sign-in
      </h1>
      <p className="mt-3 text-center text-sm leading-6 text-[#9aa8c6]">
        One step at a time · name · country · bank · $6 USD gift · then view the arena
      </p>
      <MemberRegistrationWizard title="Arena" onSubmitted={() => undefined} />
    </main>
  );
}
