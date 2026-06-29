import { Cloud, Database, KeyRound, LockKeyhole, Workflow } from "lucide-react";
import { firebaseCollections } from "@/lib/firebase/schema";

const integrationSteps = [
  {
    icon: KeyRound,
    title: "Auth-ready",
    description: "Client helpers expose Firebase Auth only after public config values are present."
  },
  {
    icon: Database,
    title: "Firestore collections",
    description: "Creators, votes, matchups, memberships, and users have named collection contracts."
  },
  {
    icon: Workflow,
    title: "Ranking pipeline",
    description: "Vote writes can feed scheduled score calculations and creator leaderboard updates."
  },
  {
    icon: LockKeyhole,
    title: "Rules-first shape",
    description: "Typed documents keep security rules, cloud functions, and UI code aligned."
  }
];

/** Owner Command Center · Firebase wiring · env + collections + pipeline */
export function CommandCenterFirebaseInfrastructure() {
  return (
    <section className="command-center-room-panel mt-8 rounded-[1.5rem] border border-[#f5c842]/20 p-6 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f5c842]">Firebase infrastructure</p>
      <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-3xl tracking-[0.06em] text-[#f7efe0] sm:text-4xl">
        Real-time votes · member-grade security
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#8fa3bf]">
        Firebase client initialization, environment placeholders, and shared document types — ready for Auth,
        Firestore, and Storage when credentials are added.
      </p>

      <div className="command-center-room-panel mt-6 rounded-2xl border border-white/[0.08] p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#f5c842]/15 text-[#f5c842]">
            <Cloud className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-bold text-[#f7efe0]">Environment file</p>
            <p className="text-sm text-[#8fa3bf]">Copy .env.example to .env.local</p>
          </div>
        </div>
        <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
          {Object.values(firebaseCollections).map((collection) => (
            <code
              key={collection}
              className="rounded-xl border border-white/[0.08] bg-[#050814] px-3 py-2 text-[#f5c842]"
            >
              {collection}
            </code>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {integrationSteps.map((step) => {
          const Icon = step.icon;

          return (
            <article
              key={step.title}
              className="command-center-room-panel rounded-2xl border border-white/[0.08] p-5"
            >
              <span className="grid size-12 place-items-center rounded-2xl border border-[#00c9a7]/25 bg-[#00c9a7]/10 text-[#00c9a7]">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-['Bebas_Neue',sans-serif] text-xl tracking-[0.04em] text-[#f7efe0]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#8fa3bf]">{step.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
