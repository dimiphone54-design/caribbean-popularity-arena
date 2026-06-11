import { readFileSync } from "node:fs";
import { join } from "node:path";
import { applyLegalEntityPlaceholders } from "@/config/legal-entity";
import { getLegalDocumentBySlug, legalDocuments } from "@/lib/legal-documents";

const legalDirectory = join(process.cwd(), "legal");

export function getLegalDocumentContent(slug: string) {
  const document = getLegalDocumentBySlug(slug);

  if (!document) {
    return null;
  }

  const filePath = join(legalDirectory, document.file);
  const rawContent = readFileSync(filePath, "utf8");
  const content = applyLegalEntityPlaceholders(rawContent);

  return { document, content };
}

export function getAllLegalSlugs() {
  return legalDocuments.map((document) => document.slug);
}
