import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isLegalEntityConfigured, legalEntity } from "@/config/legal-entity";
import { legalDocuments } from "@/lib/legal-documents";

type LegalDocumentViewProps = {
  content: string;
  activeSlug: string;
};

export function LegalDocumentView({ content, activeSlug }: LegalDocumentViewProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
      <aside className="lg:w-72 lg:shrink-0">
        <div className="rounded-2xl border border-[#d7b46a]/20 bg-[#050d1d]/70 p-4 shadow-xl shadow-black/20 lg:sticky lg:top-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d7b46a]">Legal Center</p>
          <nav className="mt-4 flex flex-col gap-1">
            <Link
              href="/legal"
              className={`rounded-lg px-3 py-2 text-sm transition ${
                activeSlug === "index"
                  ? "bg-[#d7b46a]/15 text-[#f7e7aa]"
                  : "text-[#b8c9e1] hover:bg-white/5 hover:text-[#f7efe0]"
              }`}
            >
              All documents
            </Link>
            {legalDocuments.map((document) => (
              <Link
                key={document.slug}
                href={`/legal/${document.slug}`}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  activeSlug === document.slug
                    ? "bg-[#d7b46a]/15 text-[#f7e7aa]"
                    : "text-[#b8c9e1] hover:bg-white/5 hover:text-[#f7efe0]"
                }`}
              >
                {document.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <article className="min-w-0 flex-1 rounded-2xl border border-[#d7b46a]/15 bg-[#050d1d]/55 p-6 shadow-2xl shadow-black/20 sm:p-8">
        {!isLegalEntityConfigured() ? (
          <div className="mb-6 rounded-xl border border-[#f5c842]/30 bg-[#f5c842]/10 p-4 text-sm leading-6 text-[#fff4c2]">
            Legal entity details are pending your Trinidad sole trader registration. Update{" "}
            <code className="rounded bg-black/30 px-1.5 py-0.5 text-[#f7efe0]">src/config/legal-entity.ts</code>{" "}
            next week with your registered business name, address, and official emails.
          </div>
        ) : null}
        {!legalEntity.attorneyReviewComplete ? (
          <div className="mb-6 rounded-xl border border-[#ff8060]/25 bg-[#ff8060]/10 p-4 text-sm leading-6 text-[#ffd6cc]">
            Draft for attorney review. Set <code className="rounded bg-black/30 px-1.5 py-0.5">attorneyReviewComplete</code>{" "}
            to true only after Trinidad counsel approves this framework.
          </div>
        ) : null}
        <div className="legal-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
        <p className="mt-10 border-t border-[#d7b46a]/15 pt-6 text-xs leading-6 text-[#8fa3bf]">
          Governing law: {legalEntity.jurisdiction}.
          {!legalEntity.attorneyReviewComplete ? " Draft for attorney review. Not legal advice." : null}
        </p>
      </article>
    </div>
  );
}
