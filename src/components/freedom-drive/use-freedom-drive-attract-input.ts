"use client";

import { useEffect, useState } from "react";
import type { FreedomDriveInput } from "@/lib/freedom-drive/types";

const defaultAttract: FreedomDriveInput = { accelerate: true, brake: false, steer: 0 };

/** Scripted drive loop for idle preview — real physics, no player input */
export function useFreedomDriveAttractInput(enabled: boolean): FreedomDriveInput {
  const [input, setInput] = useState<FreedomDriveInput>(defaultAttract);

  useEffect(() => {
    if (!enabled) {
      setInput(defaultAttract);
      return;
    }

    let frame = 0;
    let start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const steer = Math.sin(t * 0.62) * 0.72 + Math.sin(t * 1.45 + 1.2) * 0.28;
      const burst = Math.sin(t * 0.38) > 0.82;
      const handbrake = Math.sin(t * 0.95 + 2.1) > 0.94;

      setInput({
        accelerate: !handbrake,
        brake: handbrake && !burst,
        steer: burst ? steer * 1.15 : steer
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  return input;
}
