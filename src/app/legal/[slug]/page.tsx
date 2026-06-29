import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LegalDocumentView } from "@/components/legal-document-view";
import { RoomBackToArena } from "@/components/room-back-to-arena";
import { SiteFooter } from "@/components/site-footer";
import { getAllLegalSlugs, getLegalDocumentContent } from "@/lib/legal-content";

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getLegalDocumentContent(slug);

  if (!result) {
    return { title: "Legal Document Not Found" };
  }

  return {
    title: `${result.document.title} | Caribbean Popularity Arena`,
    description: result.document.description
  };
}

export default async function LegalDocumentPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const result = getLegalDocumentContent(slug);

  if (!result) {
    notFound();
  }

  return (
    <>
      <header className="border-b border-[#d7b46a]/20 bg-[#050d1d]/80 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d7b46a]">Legal Document</p>
            <h1 className="mt-1 font-luxury-serif text-3xl text-[#f7efe0] sm:text-4xl">{result.document.title}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/legal"
              className="inline-flex rounded-full border border-[#d7b46a]/30 px-5 py-2.5 text-sm font-semibold text-[#f7e7aa] transition hover:border-[#d7b46a]/60 hover:bg-[#d7b46a]/10"
            >
              Legal Center
            </Link>
            <RoomBackToArena showHint={false} />
          </div>
        </div>
      </header>

      <main>
        <LegalDocumentView content={result.content} activeSlug={result.document.slug} />
      </main>

      <SiteFooter />
    </>
  );
}
