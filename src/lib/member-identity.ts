"use client";

import { useEffect, useState } from "react";
import {
  MEMBER_PROFILE_UPDATED_EVENT,
  readMemberGender,
  type MemberGender
} from "@/lib/member-gender-storage";

export type MemberIdentity = {
  gender: MemberGender;
  role: string;
  title: string;
  label: string;
  tagline: string;
  emoji: string;
  entersTag: string;
  entersLoading: string;
  entersShort: string;
  entersOnCardDescription: string;
  cardProjectionHint: string;
  modeShortV4: string;
};

export const memberRiderCardGenders: MemberGender[] = ["female", "male"];

export function memberIdentityForGender(gender: MemberGender): MemberIdentity {
  if (gender === "male") {
    return {
      gender,
      role: "The Guy",
      title: "The Guy · Arena Member",
      label: "Member · Arena",
      tagline: "Books the lounge · picks the nation · arena-linked",
      emoji: "👨🏽‍🦱",
      entersTag: "He enters · live arena",
      entersLoading: "He enters · syncing…",
      entersShort: "He enters · arena",
      entersOnCardDescription: "He enters on The Guy card · arena live.",
      cardProjectionHint: "Guy card · arena",
      modeShortV4: "Guy"
    };
  }

  return {
    gender,
    role: "THE FEMALE",
    title: "THE FEMALE · Arena Member",
    label: "Member · Arena",
    tagline: "Books the lounge · picks the nation · arena-linked",
    emoji: "👩🏽‍🦱",
    entersTag: "She enters · live arena",
    entersLoading: "She enters · syncing…",
    entersShort: "She enters · arena",
    entersOnCardDescription: "She enters on THE FEMALE card · arena live.",
    cardProjectionHint: "Female card · arena",
    modeShortV4: "Female"
  };
}

export function useMemberIdentity() {
  const [gender, setGender] = useState<MemberGender>("female");

  useEffect(() => {
    setGender(readMemberGender());

    function sync() {
      setGender(readMemberGender());
    }

    window.addEventListener(MEMBER_PROFILE_UPDATED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(MEMBER_PROFILE_UPDATED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return {
    gender,
    identity: memberIdentityForGender(gender)
  };
}
