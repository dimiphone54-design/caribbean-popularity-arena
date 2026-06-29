import { readMemberUsername } from "@/lib/member-username-storage";

const userIdKey = "cpa_target_shooter_user_id";

export function readTargetShooterUserId(): string {
  if (typeof window === "undefined") return "arena-guest";
  const stored = window.localStorage.getItem(userIdKey)?.trim();
  if (stored) return stored;

  const generated = `arena-${typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
  window.localStorage.setItem(userIdKey, generated);
  return generated;
}

export function readTargetShooterUsername(): string {
  const member = readMemberUsername();
  if (member.length >= 2) return member;
  return "Arena Player";
}
