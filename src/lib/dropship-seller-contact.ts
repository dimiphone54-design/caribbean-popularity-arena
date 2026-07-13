import type { DropshipProduct } from "@/lib/dropshipping";

/**
 * Build a direct seller contact link.
 * Prefers product.sellerContact / storeUrl when present; otherwise mailto placeholder.
 * TODO: wire real seller WhatsApp / store URLs from product data when available.
 */
export function getSellerContactHref(product: DropshipProduct, countryName: string): string {
  const withSeller = product as DropshipProduct & {
    sellerContact?: string;
    storeUrl?: string;
    sellerEmail?: string;
  };

  if (withSeller.storeUrl?.trim()) return withSeller.storeUrl.trim();
  if (withSeller.sellerContact?.trim()) {
    const contact = withSeller.sellerContact.trim();
    if (contact.startsWith("http") || contact.startsWith("mailto:") || contact.startsWith("https://wa.me")) {
      return contact;
    }
    if (contact.includes("@")) return `mailto:${contact}`;
  }
  if (withSeller.sellerEmail?.trim()) return `mailto:${withSeller.sellerEmail.trim()}`;

  const subject = encodeURIComponent(`Interest in ${product.name} (${countryName} lane)`);
  const body = encodeURIComponent(
    `Hi — I saw "${product.name}" on Caribbean Freedom Arena (${countryName}). I'd like to arrange purchase directly with you.\n\nProduct: ${product.name}\nShips from: ${product.shipsFrom}\n`
  );
  return `mailto:seller@example.com?subject=${subject}&body=${body}`;
}
