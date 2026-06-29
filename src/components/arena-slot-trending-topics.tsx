import { getArenaSlotTrendingTopics, getArenaSlotViralGames } from "@/lib/arena-slot-trending-topics";

type ArenaSlotTrendingTopicsProps = {
  islandCode: string;
  country: string;
};

function TopicTrack({
  kicker,
  kickerClass,
  items,
  ariaLabel
}: {
  kicker: string;
  kickerClass?: string;
  items: ReturnType<typeof getArenaSlotTrendingTopics>;
  ariaLabel: string;
}) {
  return (
    <div className="ai-real-slot-topics-block" aria-label={ariaLabel}>
      <p className={`ai-real-slot-topics-kicker${kickerClass ? ` ${kickerClass}` : ""}`}>{kicker}</p>
      <div className="ai-real-slot-topics-track" role="list">
        {items.map((topic) => (
          <span key={topic.id} className="ai-real-slot-topic-chip" role="listitem" title={topic.hint}>
            <span className="ai-real-slot-topic-emoji" aria-hidden="true">
              {topic.emoji}
            </span>
            <span className="ai-real-slot-topic-label">{topic.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Front 12 slot · native-language culture topics + viral online games */
export function ArenaSlotTrendingTopics({ islandCode, country }: ArenaSlotTrendingTopicsProps) {
  const topics = getArenaSlotTrendingTopics(islandCode);
  const games = getArenaSlotViralGames(islandCode);

  return (
    <div className="ai-real-slot-topics" aria-label={`Trending topics and games · ${country}`}>
      <TopicTrack
        kicker="Trending · exchange"
        items={topics}
        ariaLabel={`Culture exchange · ${country}`}
      />
      <TopicTrack
        kicker="Viral games · talk-show"
        kickerClass="ai-real-slot-topics-kicker-games"
        items={games}
        ariaLabel={`Online games · ${country}`}
      />
    </div>
  );
}
