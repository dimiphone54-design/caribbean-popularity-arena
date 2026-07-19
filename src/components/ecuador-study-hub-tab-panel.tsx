"use client";

const liveRooms = [
  {
    emoji: "🏔️",
    title: "Campus Andes · Quito",
    body: "Sesiones de estudio con estilo universitario. Ideal para trabajo profundo, tesis y alta concentración."
  },
  {
    emoji: "📚",
    title: "Círculo de ensayo y conversación en español",
    body: "Profes en vivo dan feedback de escritura y habla — talleres, notas de ensayo y práctica conversacional."
  },
  {
    emoji: "🌊",
    title: "Escritorio nocturno · Guayaquil",
    body: "Clases de noche y sesiones de productividad — perfecto para noctámbulos y estudiantes de la costa."
  },
  {
    emoji: "⚽",
    title: "Pausas de Ecuavóley",
    body: "Estudio + pausas cortas de Ecuavóley, motivación grupal y competencia amistosa con profes de la comunidad."
  }
] as const;

const teacherRoles = [
  {
    emoji: "👩‍🏫",
    title: "Profesores ecuatorianos certificados",
    body: "Preuniversitario · colegio · español como segunda lengua"
  },
  {
    emoji: "📐",
    title: "Expertos por materia",
    body: "Matemáticas · Ciencias · Historia · Inglés · Redacción"
  },
  {
    emoji: "💬",
    title: "Preguntas en vivo · tutores de la comunidad",
    body: "Únete gratis a círculos en vivo o programados con tutores de Ecuador"
  }
] as const;

/** Money catalog · Command Center FREEZE COMING SOON only (not public) */
export const ECUADOR_STUDY_HUB_FREEZE_CATALOG = {
  panelTitle: "🇪🇨 Ecuador Study Hub · paid model",
  publicStatus: "LIVE free campus · money removed from public",
  room: "/rooms/ecuador-room#ecuador-study-hub",
  freePublic: [
    "Quito Andes Campus · Guayaquil Night Desk · Essay Circle · Ecuavóley breaks",
    "Certified Ecuadorian teachers · subject experts · free live Q&A",
    "Free public sessions · free community circles",
    "Ecuador touches · snacks in chat · Andean / city ambiance · rankings"
  ],
  moneyLanes: [
    {
      label: "Premium tutoring",
      value: "Platform takes 15–20% on every paid lesson"
    },
    {
      label: "Teacher subscription",
      value: "Teachers pay a monthly fee to list and teach in the hub"
    },
    {
      label: "Premium student access",
      value: "Locked rooms · recorded classes · materials · $5–10 / month"
    },
    {
      label: "Group classes",
      value: "Commission on ticketed live classes and workshops"
    }
  ],
  payoutNotes: [
    "Exact payout splits and commission % stay owner-only",
    "Teacher subscription / listing fees: internal ops only",
    "Optional later: first-month 0% platform cut for new teachers (launch incentive)"
  ],
  reopenNote:
    "Restore premium seats + tutoring money UI when NEXT_PUBLIC_REAL_MONEY_ENABLED=true."
} as const;

const ecuadorTouches = [
  "Snacks de estudio en el chat · chifles · empanadas · quimbolitos",
  "Ambiente de fondo · música andina o sonido de ciudad de Guayaquil",
  "Retos de estudio · rankings al estilo universidad ecuatoriana"
] as const;

const STUDY_HUB_BG = "/ecuador-study-hub-bg.jpg";

/** Ecuador Study Hub · free public campus · español ecuatoriano */
export function EcuadorStudyHubTabPanel() {
  return (
    <div
      className="ecuador-study-hub-tab-panel space-y-2"
      aria-label="Centro de estudio Ecuador"
      lang="es-EC"
    >
      <section
        className="country-room-section relative overflow-hidden rounded-[1.25rem] border border-[#fcd116]/35 p-4 sm:p-5"
        style={{
          backgroundImage: `url('${STUDY_HUB_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#040a08]/72 via-[#04120e]/78 to-[#040a08]/88"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,209,22,0.12),transparent_42%)]"
          aria-hidden="true"
        />

        <header className="relative z-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fcd116]">
            🇪🇨 Sala Ecuador · campus gratis
          </p>
          <h2 className="mt-1.5 font-['Bebas_Neue',sans-serif] text-3xl tracking-[0.06em] text-[#fef9c3] sm:text-4xl">
            Centro de estudio Ecuador
          </h2>
          <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#67e8f9]">
            Quito · Guayaquil · aprendizaje en vivo con profes reales
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#e4e4e7] drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
            Un campus de estudio y aprendizaje gratis inspirado en la vida estudiantil ecuatoriana. Únete a
            sesiones en vivo con profesores, tutores y compañeros de Ecuador y la diáspora — sin asientos de pago
            en la sala pública.
          </p>
        </header>

        <div className="relative z-10 mt-5">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.16em] text-[#67e8f9]">
            Salas en vivo y programadas
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {liveRooms.map((room) => (
              <article
                key={room.title}
                className="rounded-xl border border-[#fcd116]/25 bg-[#040a08]/78 px-3.5 py-3 backdrop-blur-[2px]"
              >
                <h3 className="text-[13px] font-black text-[#fef9c3]">
                  <span className="mr-1.5" aria-hidden="true">
                    {room.emoji}
                  </span>
                  {room.title}
                </h3>
                <p className="mt-1.5 text-[11px] leading-5 text-[#c4b89a]">{room.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="rounded-[1.25rem] border border-[#86efac]/25 bg-[#04120a]/80 p-4 sm:p-5"
        aria-label="Profesores y tutores disponibles"
      >
        <header className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#86efac]">
            Profesores y tutores disponibles
          </p>
          <p className="mt-1 text-sm font-bold text-[#e6fbff]">
            Profes, tutores y expertos de Ecuador — círculos comunitarios gratis abiertos a todos.
          </p>
        </header>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {teacherRoles.map((role) => (
            <article
              key={role.title}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-3"
            >
              <p className="text-[12px] font-black text-[#fef9c3]">
                <span className="mr-1.5" aria-hidden="true">
                  {role.emoji}
                </span>
                {role.title}
              </p>
              <p className="mt-1.5 text-[11px] leading-5 text-[#c4b89a]">{role.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] leading-5 text-[#d4d4d8]">
          Los profes abren círculos y salas de estudio grupales gratis. Los estudiantes entran a las sesiones
          públicas cuando quieran.
        </p>
      </section>

      <section
        className="rounded-[1.25rem] border border-white/10 bg-[#040a08]/75 p-4 sm:p-5"
        aria-label="Toques ecuatorianos de estudio"
      >
        <p className="text-center text-[10px] font-black uppercase tracking-[0.16em] text-[#67e8f9]">
          Toques extra de Ecuador
        </p>
        <ul className="mx-auto mt-3 max-w-xl space-y-1.5 text-[12px] leading-5 text-[#d4d4d8]" role="list">
          {ecuadorTouches.map((touch) => (
            <li key={touch} role="listitem">
              • {touch}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-[#c5cfe8]">
            Sesiones públicas gratis
          </span>
          <span className="rounded-full border border-[#67e8f9]/30 bg-[#67e8f9]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-[#67e8f9]">
            Campus gratis para explorar
          </span>
          <span className="rounded-full border border-[#86efac]/30 bg-[#86efac]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-[#86efac]">
            Profes y estudiantes bienvenidos
          </span>
        </div>
      </section>
    </div>
  );
}
