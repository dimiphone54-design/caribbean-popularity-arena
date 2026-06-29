"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const FreedomDriveSimulatorDynamic = dynamic(
  () => import("@/components/freedom-drive/freedom-drive-simulator").then((mod) => mod.FreedomDriveSimulator),
  {
    ssr: false,
    loading: () => (
      <p className="a2030-micro text-[10px] font-bold uppercase text-[#00f5ff]">Loading simulator…</p>
    )
  }
);

export function FreedomDriveSimulatorLazy(props: ComponentProps<typeof FreedomDriveSimulatorDynamic>) {
  return <FreedomDriveSimulatorDynamic {...props} />;
}
