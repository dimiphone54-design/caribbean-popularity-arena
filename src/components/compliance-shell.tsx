"use client";

import { AiVoiceGreetingProvider } from "@/components/ai-voice-greeting-provider";
import { AiVoiceGreetingToggle } from "@/components/ai-voice-greeting-toggle";
import { ArenaMasterKeyBadge } from "@/components/arena-master-key-badge";
import { ArenaPrimaryMasterAutoUnlock } from "@/components/arena-primary-master-auto-unlock";
import { CaribbeanFreedomArenaAppRegister } from "@/components/caribbean-freedom-arena-app-register";
import { ComplianceProvider } from "@/components/compliance-provider";
import { RoomLocaleProvider } from "@/components/room-locale-provider";
import { ReportAbuseModal } from "@/components/report-abuse-flow";
import { isCommandCenterEnabled } from "@/lib/command-center-access";

export function ComplianceShell({ children }: { children: React.ReactNode }) {
  return (
    <ComplianceProvider>
      <RoomLocaleProvider>
        <AiVoiceGreetingProvider>
          {isCommandCenterEnabled ? <ArenaPrimaryMasterAutoUnlock /> : null}
          <CaribbeanFreedomArenaAppRegister />
          {children}
          {isCommandCenterEnabled ? <ArenaMasterKeyBadge /> : null}
          <AiVoiceGreetingToggle />
          <ReportAbuseModal />
        </AiVoiceGreetingProvider>
      </RoomLocaleProvider>
    </ComplianceProvider>
  );
}
