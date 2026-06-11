import { arenaCreators } from "@/lib/arena-experience";

export const registeredWomen = arenaCreators.map((creator) => ({
  id: creator.id,
  name: creator.name,
  age: creator.age,
  country: creator.country,
  flag: creator.flag,
  category: creator.category,
  quote: creator.quote,
  initials: creator.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join(""),
  avatarGradient: creator.avatarGradient
}));
