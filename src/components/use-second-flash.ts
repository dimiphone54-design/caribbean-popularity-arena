"use client";

import { useEffect, useState } from "react";

export function useSecondFlash(now: Date | null) {
  const [flash, setFlash] = useState(false);
  const second = now?.getSeconds();

  useEffect(() => {
    if (second === undefined) return;
    setFlash(true);
    const id = window.setTimeout(() => setFlash(false), 220);
    return () => window.clearTimeout(id);
  }, [second]);

  return flash;
}
