import Link from "next/link";
import { isLegalEntityConfigured } from "@/config/legal-entity";
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
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#b8c9e1]">
              Production-ready legal documents for global users, creators, payment processors, and attorney review.
              After your Trinidad sole trader registration, update one file:{" "}
              <code className="rounded bg-black/30 px-1.5 py-0.5 text-[#f7efe0]">src/config/legal-entity.ts</code>.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-full border border-[#d7b46a]/30 px-5 py-2.5 text-sm font-semibold text-[#f7e7aa] transition hover:border-[#d7b46a]/60 hover:bg-[#d7b46a]/10"
          >
            Back to Arena
          </Link>
        </div>
      </header>

      {!isLegalEntityConfigured() ? (
        <div className="border-b border-[#f5c842]/20 bg-[#f5c842]/10 px-4 py-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-7xl text-sm leading-6 text-[#fff4c2]">
            Pending Trinidad sole trader details — placeholders will auto-fill across all legal pages once you update{" "}
            <code className="rounded bg-black/30 px-1.5 py-0.5">src/config/legal-entity.ts</code>.
          </p>
        </div>
      ) : null}

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
