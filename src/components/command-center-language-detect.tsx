"use client";

import dynamic from "next/dynamic";

const CommandCenterLanguageDetectInner = dynamic(
  () => import("./command-center-language-detect-inner").then((m) => m.CommandCenterLanguageDetectInner),
  { ssr: false }
);

export function CommandCenterLanguageDetect() {
  return <CommandCenterLanguageDetectInner />;
}
