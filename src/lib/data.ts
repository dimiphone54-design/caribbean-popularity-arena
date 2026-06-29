import { arenaGiftLegalCopy } from "@/lib/arena-gifts";
import {
  eldersTableGiftAmountLabel,
  eldersTableGiftLegal
} from "@/lib/elders-table-gift-legal";

export type Creator = {
  rank: number;
  name: string;
  island: string;
  category: string;
  score: number;
  votes: string;
  trend: string;
  initials: string;
  accent: string;
  bio: string;
  badges: string[];
};

export type VoteMatchup = {
  round: string;
  question: string;
  left: Creator;
  right: Creator;
};

export type MembershipPlan = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  comingSoon?: boolean;
  href?: string;
  legalNote?: string;
};

export const creators: Creator[] = [
  {
    rank: 1,
    name: "Mika Soleil",
    island: "Trinidad & Tobago",
    category: "Soca vocalist",
    score: 9840,
    votes: "42.8K",
    trend: "+18%",
    initials: "MS",
    accent: "from-orange-400 via-amber-300 to-rose-400",
    bio: "Carnival anthem maker with weekly studio diaries and behind-the-road clips.",
    badges: ["Road March Watch", "Verified"]
  },
  {
    rank: 2,
    name: "Jae Kingston",
    island: "Jamaica",
    category: "Dancehall creator",
    score: 9460,
    votes: "39.1K",
    trend: "+12%",
    initials: "JK",
    accent: "from-emerald-400 via-lime-300 to-yellow-300",
    bio: "Freestyle battles, choreography drops, and sound-system culture breakdowns.",
    badges: ["Fan Favorite", "Live"]
  },
  {
    rank: 3,
    name: "Anika Blue",
    island: "Barbados",
    category: "Lifestyle storyteller",
    score: 9215,
    votes: "35.7K",
    trend: "+9%",
    initials: "AB",
    accent: "from-sky-300 via-cyan-300 to-blue-500",
    bio: "Island fashion, food pop-ups, and creator interviews from Bridgetown.",
    badges: ["Rising Creator"]
  },
  {
    rank: 4,
    name: "Lucien Bay",
    island: "Saint Lucia",
    category: "Travel filmmaker",
    score: 8870,
    votes: "28.4K",
    trend: "+7%",
    initials: "LB",
    accent: "from-violet-400 via-fuchsia-400 to-pink-400",
    bio: "Drone tours, hidden beaches, and local guide collaborations across the region.",
    badges: ["Creator Pro"]
  },
  {
    rank: 5,
    name: "Nia Spice",
    island: "Grenada",
    category: "Food creator",
    score: 8545,
    votes: "24.9K",
    trend: "+5%",
    initials: "NS",
    accent: "from-red-400 via-orange-300 to-yellow-200",
    bio: "Modern Caribbean recipes, market visits, and spice blend experiments.",
    badges: ["Taste Maker"]
  }
];

export const featuredMatchup: VoteMatchup = {
  round: "Round 3 of 7",
  question: "Who brought the most island energy this week?",
  left: {
    rank: 2,
    name: "Amara Kensington",
    island: "London, UK",
    category: "Fashion",
    score: 92104,
    votes: "92.1K",
    trend: "↑9%",
    initials: "AK",
    accent: "from-red-500 via-rose-400 to-orange-400",
    bio: "London energy, global stage — we live for the lights.",
    badges: ["Platinum · Elite Creative"]
  },
  right: {
    rank: 4,
    name: "Camila Mendoza",
    island: "Ecuador",
    category: "Dance",
    score: 65820,
    votes: "65.8K",
    trend: "↑11%",
    initials: "CM",
    accent: "from-yellow-400 via-amber-300 to-orange-400",
    bio: "Desde Quito con amor — vamos con todo.",
    badges: ["Elite · Elite Creative"]
  }
};

export const votingCategories = [
  "Music",
  "Dance",
  "Comedy",
  "Fashion",
  "Food",
  "Travel"
];

export const membershipPlans: MembershipPlan[] = [
  {
    name: "The Elders Table",
    price: eldersTableGiftAmountLabel,
    cadence: "digital room access",
    highlighted: true,
    href: "/rooms/the-elders-table",
    description: eldersTableGiftLegal.membershipDescription,
    features: [...eldersTableGiftLegal.membershipFeatures],
    legalNote: arenaGiftLegalCopy.noIndividualAccess
  },
  {
    name: "Arena Plus",
    price: "$0 Gift",
    cadence: "Complimentary · coming soon",
    comingSoon: true,
    description:
      "Premium digital arena membership with priority voting, exclusive livestream rooms, and profile placement — coming soon.",
    features: [
      "100 monthly arena votes",
      "Priority vote boosts",
      "Exclusive livestream rooms",
      "Profile badge and shoutouts"
    ]
  },
  {
    name: "Creator Circle",
    price: "$0",
    cadence: "Complimentary Gift",
    description: "For creators and teams growing a loyal island audience.",
    features: [
      "Creator analytics dashboard",
      "Campaign placement requests",
      "Verified creator application",
      "Audience export tools"
    ]
  }
];

export const platformStats = [
  { label: "Creators ranked", value: "1.2K+" },
  { label: "Weekly votes", value: "280K" },
  { label: "Islands represented", value: "22" },
  { label: "Live fan rooms", value: "64" }
];
