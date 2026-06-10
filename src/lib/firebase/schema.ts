import type { Timestamp } from "firebase/firestore";

export type CreatorProfileDocument = {
  displayName: string;
  island: string;
  category: string;
  avatarUrl?: string;
  score: number;
  totalVotes: number;
  weeklyVoteDelta: number;
  badges: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type VoteDocument = {
  creatorId: string;
  voterId: string;
  matchupId?: string;
  category: string;
  weight: number;
  createdAt: Timestamp;
};

export type MembershipDocument = {
  userId: string;
  plan: "fan-pass" | "arena-plus" | "creator-circle";
  status: "active" | "trialing" | "past_due" | "canceled";
  voteAllowance: number;
  currentPeriodEnd: Timestamp;
  updatedAt: Timestamp;
};

export const firebaseCollections = {
  creators: "creators",
  votes: "votes",
  memberships: "memberships",
  matchups: "matchups",
  users: "users"
} as const;
