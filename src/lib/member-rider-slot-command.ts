import type { MemberGender } from "@/lib/member-gender-storage";

export const MEMBER_RIDER_SLOT_TAP_EVENT = "cpa-member-rider-slot-tap";

export function memberRiderSlotSelector(gender: MemberGender) {
  return `[data-member-rider-slot="${gender}"]`;
}

export function memberRiderSlotLabel(gender: MemberGender) {
  return gender === "female" ? "THE FEMALE slot" : "The Guy slot";
}

export function dispatchMemberRiderSlotTap(gender: MemberGender) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(MEMBER_RIDER_SLOT_TAP_EVENT, {
      detail: { gender }
    })
  );
}
