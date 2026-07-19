"use client";

import type { ReactNode } from "react";
import { isPublicDropshipVisible } from "@/lib/real-money";

/** Renders children only when public dropship panels are enabled. */
export function PublicDropshipGate({ children }: { children: ReactNode }) {
  if (!isPublicDropshipVisible()) return null;
  return <>{children}</>;
}
