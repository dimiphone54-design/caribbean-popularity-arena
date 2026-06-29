/** Arena Plus only · snow dust dripping down as soft droplets. */
type SnowDrop = {
  left: string;
  duration: string;
  delay: string;
  drift: string;
  sway: string;
  width: string;
  height: string;
  opacity: number;
};

function buildArenaPlusSnowDrops(): SnowDrop[] {
  const drops: SnowDrop[] = [];

  for (let i = 0; i < 72; i++) {
    const size = i % 7;
    const width = size <= 2 ? "1.5px" : size <= 4 ? "2px" : size <= 5 ? "2.5px" : "3px";
    const height =
      size <= 2 ? "5px" : size <= 4 ? "8px" : size <= 5 ? "11px" : size === 6 ? "14px" : "17px";

    drops.push({
      left: `${1 + i * 1.38}%`,
      width,
      height,
      duration: `${2.4 + (i % 8) * 0.22}s`,
      delay: `${((i * 0.11) % 5.2).toFixed(2)}s`,
      drift: `${(i % 2 === 0 ? 1 : -1) * (3 + (i % 6))}px`,
      sway: `${(i % 3 === 0 ? 1 : -1) * (2 + (i % 5))}px`,
      opacity: 0.62 + (i % 6) * 0.06
    });
  }

  return drops;
}

const drops = buildArenaPlusSnowDrops();

export function ArenaPlusSnowSprinkles() {
  return (
    <span className="luxury-plan-snow-sprinkles" aria-hidden="true">
      <span className="luxury-plan-snow-haze" aria-hidden="true" />
      {drops.map((drop, index) => (
        <span
          key={`drop-${index}`}
          className="luxury-plan-snow-drop"
          style={{
            left: drop.left,
            animationDuration: drop.duration,
            animationDelay: drop.delay,
            ["--snow-drift" as string]: drop.drift,
            ["--snow-sway" as string]: drop.sway,
            ["--drop-w" as string]: drop.width,
            ["--drop-h" as string]: drop.height,
            ["--drop-opacity" as string]: String(drop.opacity)
          }}
        />
      ))}
    </span>
  );
}
