export type MemberGender = "female" | "male";

const genderKey = "cpa_member_gender";
export const MEMBER_PROFILE_UPDATED_EVENT = "cpa-member-profile-updated";

export function readMemberGender(): MemberGender {
  if (typeof window === "undefined") return "female";
  return window.localStorage.getItem(genderKey) === "male" ? "male" : "female";
}

export function saveMemberGender(gender: MemberGender) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(genderKey, gender);
  window.dispatchEvent(new Event(MEMBER_PROFILE_UPDATED_EVENT));
}
