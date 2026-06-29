"use client";

import { useEffect } from "react";
import type { FreedomDriveInput } from "@/lib/freedom-drive/types";

export function useFreedomDriveKeyboard(setInput: (input: FreedomDriveInput) => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const keys = new Set<string>();

    const sync = () => {
      setInput({
        accelerate: keys.has("KeyW") || keys.has("ArrowUp"),
        brake: keys.has("KeyS") || keys.has("ArrowDown"),
        steer: (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) + (keys.has("KeyA") || keys.has("ArrowLeft") ? -1 : 0)
      });
    };

    const onDown = (event: KeyboardEvent) => {
      if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
        event.preventDefault();
        keys.add(event.code);
        sync();
      }
    };

    const onUp = (event: KeyboardEvent) => {
      keys.delete(event.code);
      sync();
    };

    const onBlur = () => {
      keys.clear();
      sync();
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [enabled, setInput]);
}
