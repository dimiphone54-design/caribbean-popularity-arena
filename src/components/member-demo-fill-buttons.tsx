"use client";

import { demoMemberProfileList, type DemoMemberProfile } from "@/lib/demo-member-profiles";

type MemberDemoFillButtonsProps = {
  onFill: (profile: DemoMemberProfile) => void;
  className?: string;
};

export function MemberDemoFillButtons({ onFill, className = "" }: MemberDemoFillButtonsProps) {
  return (
    <div className={`member-demo-fill member-demo-fill-arena ${className}`.trim()}>
      <p className="member-demo-fill-label">Demo · fake info for testing</p>
      <div className="member-demo-fill-options" role="group" aria-label="Fill form with demo member">
        {demoMemberProfileList.map((profile) => (
          <button
            key={profile.id}
            type="button"
            className="member-demo-fill-btn"
            onClick={() => onFill(profile)}
          >
            <span className="member-demo-fill-btn-emoji" aria-hidden="true">
              {profile.emoji}
            </span>
            <span className="member-demo-fill-btn-body">
              <span className="member-demo-fill-btn-title">{profile.label}</span>
              <span className="member-demo-fill-btn-sub">
                {profile.username} · {profile.hint}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function applyDemoMemberProfile(profile: DemoMemberProfile) {
  return {
    username: profile.username,
    gender: profile.gender,
    confirmedAge: true,
    acceptedPolicies: true
  };
}
