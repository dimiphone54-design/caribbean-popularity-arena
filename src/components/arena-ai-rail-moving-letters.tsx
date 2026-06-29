/** AI rail · slight per-letter movement · words stay intact (no A / I cut) */
export function ArenaAiRailMovingLetters({ text }: { text: string }) {
  const words = text.split(/(\s+)/);

  return (
    <span className="arena-ai-rail-moving-text">
      {words.map((segment, wordIndex) => (
        <span
          key={`${wordIndex}-${segment}`}
          className={segment.trim() ? "arena-ai-rail-moving-word" : "arena-ai-rail-moving-space"}
        >
          {[...segment].map((char, index) => (
            <span
              key={`${wordIndex}-${index}-${char}`}
              className="arena-ai-rail-letter"
              style={{ animationDelay: `${(wordIndex * 4 + index) * 0.042}s` }}
            >
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
