"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE = "!<>-_\\/[]{}—=+*^?#@&%";

function scrambleText(text: string, progress: number) {
  return text
    .split("")
    .map((char, index) => {
      if (char === " ") return " ";
      if (index < progress * text.length) return char;
      return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
    })
    .join("");
}

type ArenaLoungeGlitchLabelProps = {
  text: string;
  active: boolean;
  className?: string;
};

export function ArenaLoungeGlitchLabel({ text, active, className }: ArenaLoungeGlitchLabelProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    if (!active) {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      startRef.current = null;
      setDisplay(text);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const duration = 520;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const progress = Math.min(1, (now - startRef.current) / duration);
      setDisplay(scrambleText(text, progress));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        startRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      startRef.current = null;
    };
  }, [active, text]);

  return <span className={className}>{display}</span>;
}
