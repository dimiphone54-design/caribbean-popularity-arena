import { Suspense } from "react";

import { DropshipMarketPage } from "@/components/dropshipping/dropship-market-page";

export default function Page() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#040302]" />}>
      <DropshipMarketPage />
    </Suspense>
  );
}
