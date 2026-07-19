"use client";

import { useEffect, useRef } from "react";

const MATRIX_CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

export function MatrixRain({ color = "#00ff41", density = 18 }: { color?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    let columns = 0;
    let drops: number[] = [];

    function resize() {
      if (!canvas) return;
      w = canvas.parentElement?.clientWidth ?? 0;
      h = canvas.parentElement?.clientHeight ?? 0;
      canvas.width = w;
      canvas.height = h;
      columns = Math.floor(w / density);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
    }

    resize();

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = color;
      ctx.font = `${density - 4}px monospace`;

      for (let i = 0; i < columns; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * density;
        const y = drops[i] * density;

        ctx.globalAlpha = 0.3 + Math.random() * 0.5;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;

        if (y > h && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [color, density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-30"
      aria-hidden="true"
    />
  );
}
