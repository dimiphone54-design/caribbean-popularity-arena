import type { MemberGender } from "@/lib/member-gender-storage";

export type DemoMemberProfile = {
  id: "woman" | "man";
  label: string;
  username: string;
  gender: MemberGender;
  hint: string;
  emoji: string;
  fakeMemberKey: string;
  fakeWebhookSecret: string;
};

export const demoMemberProfiles = {
  woman: {
    id: "woman",
    label: "Woman · demo form",
    username: "Sabrina",
    gender: "female",
    hint: "Fake signup · THE FEMALE · She · Member",
    emoji: "👩🏽‍🦱",
    fakeMemberKey: "fake_sabrina_female_rider_key",
    fakeWebhookSecret: "fake_sabrina_member_webhook_secret"
  },
  man: {
    id: "man",
    label: "Man · demo form",
    username: "David",
    gender: "male",
    hint: "Fake signup · The Guy · He · Member",
    emoji: "👨🏽‍🦱",
    fakeMemberKey: "fake_david_male_rider_key",
    fakeWebhookSecret: "fake_david_member_webhook_secret"
  }
} satisfies Record<"woman" | "man", DemoMemberProfile>;

export const demoMemberProfileList = [demoMemberProfiles.woman, demoMemberProfiles.man];
