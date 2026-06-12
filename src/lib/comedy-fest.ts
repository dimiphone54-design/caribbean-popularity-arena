import { arenaCreators } from "@/lib/arena-experience";

export const comedyFestGames = arenaCreators.slice(0, 10).map((creator, index) => ({
  id: creator.id,
  name: creator.name,
  country: creator.country,
  flag: creator.flag,
  portrait: creator.portrait,
  avatarIcon: creator.avatarIcon,
  avatarGradient: creator.avatarGradient,
  game: [
    "Laugh Battle",
    "Character Charades",
    "Joke Swap Circle",
    "Punchline Race",
    "Story Roast",
    "Accent Challenge",
    "Meme Reenact",
    "Family Joke Relay",
    "Bad Day Spin",
    "Character Showdown"
  ][index]
}));

export const comedyMenPrompts = [
  {
    id: "characters-laugh",
    label: "Do you want to play characters and laugh loud?"
  },
  {
    id: "funny-joke",
    label: "Let's talk our funnys joke"
  },
  {
    id: "worst-thing",
    label: "What's the worst thing ever happen in your life?"
  },
  {
    id: "embarrassing-island",
    label: "What's your most embarrassing island moment?"
  },
  {
    id: "grandma-said",
    label: "Tell us the funniest thing your grandmother ever said"
  },
  {
    id: "roast-yourself",
    label: "Can you roast yourself for 30 seconds straight?"
  },
  {
    id: "crazy-for-laugh",
    label: "What's the craziest thing you did just to make someone laugh?"
  }
] as const;

export type ComedyMenPromptId = (typeof comedyMenPrompts)[number]["id"];

export const comedyPromptResponses: Record<ComedyMenPromptId, string> = {
  "characters-laugh":
    "Pick a character — auntie, pastor, taxi man, or carnival queen — and let the room vote who had the loudest laugh.",
  "funny-joke":
    "Drop one clean joke, one wild joke, and one island joke. The women score you on timing and delivery.",
  "worst-thing":
    "Share the story, then flip it with a punchline. Comedy Fest turns pain into punchlines — keep it real, keep it respectful.",
  "embarrassing-island":
    "Beach fail, carnival fail, or family WhatsApp fail — tell it short and let the room react live.",
  "grandma-said":
    "Repeat the line in her voice. Bonus points if the whole backdrop crew cracks up.",
  "roast-yourself":
    "Thirty seconds on the clock. Roast your driving, your cooking, or your dance moves — no mercy on yourself.",
  "crazy-for-laugh":
    "Confess the stunt, the prank, or the voice note that had the whole block screaming."
};
