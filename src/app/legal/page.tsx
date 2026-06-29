import Link from "next/link";
import { RoomBackToArena } from "@/components/room-back-to-arena";
import { SiteFooter } from "@/components/site-footer";
import { legalDocuments } from "@/lib/legal-documents";

export default function LegalIndexPage() {
  return (
    <>
      <header className="border-b border-[#d7b46a]/20 bg-[#050d1d]/80 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d7b46a]">Legal Framework</p>
            <h1 className="mt-1 font-luxury-serif text-3xl text-[#f7efe0] sm:text-4xl">Caribbean Popularity Arena</h1>
          </div>
          <RoomBackToArena showHint={false} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {legalDocuments.map((document) => (
            <Link
              key={document.slug}
              href={`/legal/${document.slug}`}
              className="rounded-2xl border border-[#d7b46a]/15 bg-[#050d1d]/55 p-5 transition hover:border-[#d7b46a]/35 hover:bg-[#08172f]/80"
            >
              <h2 className="text-lg font-semibold text-[#f7efe0]">{document.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#b8c9e1]">{document.description}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#d7b46a]">
                Read document →
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#d7b46a]/15 bg-[#08172f]/50 p-5 text-sm leading-6 text-[#b8c9e1]">
          <p className="font-semibold text-[#f7e7aa]">Combined bundle</p>
          <p className="mt-2">
            A single PDF-ready markdown file is available at{" "}
            <code className="rounded bg-black/30 px-1.5 py-0.5 text-[#f7efe0]">
              deliverables/caribbean-popularity-arena-legal-framework-complete.md
            </code>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
