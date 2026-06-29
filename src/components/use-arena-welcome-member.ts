"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ARENA_MEMBER_ACCESS_EVENT } from "@/lib/arena-member-access";
import { ARENA_WELCOME_ENTER_EVENT, formatArenaWelcomeLine, readArenaWelcomeDisplayName, readMemberUsername } from "@/lib/member-username-storage";
import { ARENA_MASTER_KEY_EVENT } from "@/lib/arena-master-key";
import { isArenaPrimaryMasterRecognized } from "@/lib/arena-master-identity";

export { formatArenaWelcomeLine };

/** Welcome panel · auto name for every arena enter (member or session guest). */
export function useArenaWelcomeMember() {
  const pathname = usePathname();
  const [welcomeLine, setWelcomeLine] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return formatArenaWelcomeLine(readArenaWelcomeDisplayName());
  });
  const [ready, setReady] = useState(() => typeof window !== "undefined");
  const [enterPulse, setEnterPulse] = useState(0);
  const [isMemberWelcome, setIsMemberWelcome] = useState(() =>
    typeof window !== "undefined" ? readMemberUsername().length >= 2 : false
  );
  const [isMaster, setIsMaster] = useState(() =>
    typeof window !== "undefined" ? isArenaPrimaryMasterRecognized() : false
  );

  const sync = useCallback(() => {
    const name = readArenaWelcomeDisplayName();
    setWelcomeLine(formatArenaWelcomeLine(name));
    setIsMemberWelcome(readMemberUsername().length >= 2);
    setIsMaster(isArenaPrimaryMasterRecognized());
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    sync();
  }, [sync]);

  useEffect(() => {
    window.addEventListener(ARENA_MEMBER_ACCESS_EVENT, sync);
    window.addEventListener("cpa:member-username", sync);
    window.addEventListener(ARENA_WELCOME_ENTER_EVENT, sync);
    window.addEventListener(ARENA_MASTER_KEY_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(ARENA_MEMBER_ACCESS_EVENT, sync);
      window.removeEventListener("cpa:member-username", sync);
      window.removeEventListener(ARENA_WELCOME_ENTER_EVENT, sync);
      window.removeEventListener(ARENA_MASTER_KEY_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  useEffect(() => {
    if (pathname !== "/") return;
    sync();
    setEnterPulse((pulse) => pulse + 1);
  }, [pathname, sync]);

  return {
    ready,
    welcomeLine,
    enterPulse,
    isMemberWelcome,
    isMaster
  };
}
