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

export function FirebaseIntegration() {
  return (
    <section id="firebase" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
            Firebase structure
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Ready for real-time votes and member data.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            The project includes Firebase client initialization, environment
            placeholders, and shared document types so the UI can connect to
            Auth, Firestore, and Storage when credentials are added.
          </p>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-cyan-300 text-slate-950">
                <Cloud className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-black text-white">Environment file</p>
                <p className="text-sm text-slate-300">Copy .env.example to .env.local</p>
              </div>
            </div>
            <div className="mt-5 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              {Object.values(firebaseCollections).map((collection) => (
                <code
                  key={collection}
                  className="rounded-xl bg-slate-950/75 px-3 py-2 text-cyan-100"
                >
                  {collection}
                </code>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {integrationSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-amber-200">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
