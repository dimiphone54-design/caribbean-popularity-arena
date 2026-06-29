import { useCallback, useEffect, useRef, useState } from "react";

export function useColombiaPickFlash(durationMs = 600) {
  const [flashId, setFlashId] = useState<string | null>(null);

  const triggerFlash = useCallback(
    (id: string) => {
      setFlashId(id);
      window.setTimeout(() => setFlashId(null), durationMs);
    },
    [durationMs]
  );

  return { flashId, triggerFlash };
}

export function useColombiaSelectionFlash(selectionId: string, durationMs = 650) {
  const [flashing, setFlashing] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    setFlashing(true);
    const timer = window.setTimeout(() => setFlashing(false), durationMs);
    return () => window.clearTimeout(timer);
  }, [selectionId, durationMs]);

  return flashing;
}
