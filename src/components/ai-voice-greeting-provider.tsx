"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { usePathname } from "next/navigation";
import { useCompliance } from "@/components/compliance-provider";
import {
  primeAiVoice,
  speakArenaSiteWelcome,
  speakEcuadorRoomWelcome,
  speakWelcomeGreeting,
  stopAiVoice
} from "@/lib/ai-voice-greeting";
import { isArenaPrimaryMasterRecognized } from "@/lib/arena-master-identity";
import {
  clearGreetedSession,
  dispatchArenaWelcomeEnter,
  hasGreetedThisSession,
  markGreetedThisSession,
  readArenaWelcomeDisplayName,
  readMemberUsername,
  readVoiceGreetingEnabled,
  saveMemberUsername,
  saveVoiceGreetingEnabled
} from "@/lib/member-username-storage";
import {
  persistArenaAutoLanguage,
  readAiVoiceLanguage,
  type AiVoiceLanguage
} from "@/lib/ai-voice-language";
import { ARENA_AUTO_LOCALE_SAVED_EVENT } from "@/lib/room-locale";
import { ARENA_MASTER_KEY_EVENT } from "@/lib/arena-master-key";

type AiVoiceGreetingContextValue = {
  ready: boolean;
  username: string;
  voiceEnabled: boolean;
  voiceLanguage: AiVoiceLanguage;
  isSpeaking: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  setVoiceLanguage: (language: AiVoiceLanguage) => void;
  saveUsername: (username: string) => void;
  greetMember: (username?: string) => Promise<void>;
  greetArenaSite: () => Promise<void>;
  greetEcuadorRoom: () => Promise<void>;
};

const AiVoiceGreetingContext = createContext<AiVoiceGreetingContextValue | null>(null);

export function AiVoiceGreetingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { ready: complianceReady } = useCompliance();
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState("");
  const [voiceEnabled, setVoiceEnabledState] = useState(true);
  const [voiceLanguage, setVoiceLanguageState] = useState<AiVoiceLanguage>("en");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const greetingLock = useRef(false);
  const voiceQueue = useRef<Array<() => Promise<void>>>([]);
  const drainingVoiceQueue = useRef(false);
  const lastHomeWelcomeAt = useRef(0);

  useEffect(() => {
    const storedName = readMemberUsername();
    setUsername(storedName);
    setVoiceEnabledState(readVoiceGreetingEnabled());
    setVoiceLanguageState(readAiVoiceLanguage());

    setReady(true);

    const onLanguageChange = () => setVoiceLanguageState(readAiVoiceLanguage());
    const onMemberChange = () => {
      setUsername(readMemberUsername());
      setVoiceLanguageState(readAiVoiceLanguage());
    };

    window.addEventListener("languagechange", onLanguageChange);
    window.addEventListener(ARENA_AUTO_LOCALE_SAVED_EVENT, onLanguageChange);
    window.addEventListener("cpa:member-username", onMemberChange);
    window.addEventListener(ARENA_MASTER_KEY_EVENT, onMemberChange);
    window.addEventListener("storage", onLanguageChange);

    return () => {
      window.removeEventListener("languagechange", onLanguageChange);
      window.removeEventListener(ARENA_AUTO_LOCALE_SAVED_EVENT, onLanguageChange);
      window.removeEventListener("cpa:member-username", onMemberChange);
      window.removeEventListener(ARENA_MASTER_KEY_EVENT, onMemberChange);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

  const setVoiceEnabled = useCallback((enabled: boolean) => {
    saveVoiceGreetingEnabled(enabled);
    setVoiceEnabledState(enabled);
    if (!enabled) {
      voiceQueue.current = [];
      drainingVoiceQueue.current = false;
      greetingLock.current = false;
      stopAiVoice();
    }
  }, []);

  const setVoiceLanguage = useCallback((language: AiVoiceLanguage) => {
    persistArenaAutoLanguage(language);
    setVoiceLanguageState(language);
  }, []);

  const saveUsername = useCallback((value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) return;
    const previous = readMemberUsername();
    saveMemberUsername(trimmed);
    if (previous.toLowerCase() !== trimmed.toLowerCase()) {
      clearGreetedSession();
    }
    setUsername(trimmed);
  }, []);

  const drainVoiceQueue = useCallback(async () => {
    if (drainingVoiceQueue.current) return;

    drainingVoiceQueue.current = true;

    while (voiceQueue.current.length > 0) {
      const next = voiceQueue.current.shift();
      if (!next) continue;

      greetingLock.current = true;
      setIsSpeaking(true);
      stopAiVoice();

      try {
        await next();
      } finally {
        setIsSpeaking(false);
        greetingLock.current = false;
      }
    }

    drainingVoiceQueue.current = false;
  }, []);

  const runVoice = useCallback(
    (task: () => Promise<void>, options?: { force?: boolean }) => {
      if (!options?.force && !voiceEnabled) return Promise.resolve();

      return new Promise<void>((resolve, reject) => {
        voiceQueue.current.push(async () => {
          try {
            await task();
            resolve();
          } catch (error) {
            reject(error);
          }
        });

        void drainVoiceQueue();
      });
    },
    [voiceEnabled, drainVoiceQueue]
  );

  const greetMember = useCallback(
    async (nameOverride?: string) => {
      const name = (nameOverride ?? username).trim();
      if (name.length < 2) return;

      await runVoice(async () => {
        await speakWelcomeGreeting(name, voiceLanguage);
      });
    },
    [username, voiceLanguage, runVoice]
  );

  const greetArenaSite = useCallback(async () => {
    await runVoice(async () => {
      await speakArenaSiteWelcome(voiceLanguage);
    });
  }, [voiceLanguage, runVoice]);

  const greetEcuadorRoom = useCallback(async () => {
    primeAiVoice();
    if (!voiceEnabled) {
      saveVoiceGreetingEnabled(true);
      setVoiceEnabledState(true);
    }
    await runVoice(async () => {
      await speakEcuadorRoomWelcome();
    }, { force: true });
  }, [voiceEnabled, runVoice]);

  useEffect(() => {
    if (!ready || !complianceReady) return;
    if (hasGreetedThisSession()) return;

    markGreetedThisSession();
    dispatchArenaWelcomeEnter();

    const timer = window.setTimeout(() => {
      primeAiVoice();
      if (!voiceEnabled) {
        saveVoiceGreetingEnabled(true);
        setVoiceEnabledState(true);
      }

      void runVoice(async () => {
        if (isArenaPrimaryMasterRecognized()) {
          const welcomeName = readArenaWelcomeDisplayName();
          if (welcomeName.length >= 2) {
            await speakWelcomeGreeting(welcomeName, voiceLanguage);
          }
          return;
        }

        await speakArenaSiteWelcome(voiceLanguage);
      }, { force: true });
    }, 650);

    return () => window.clearTimeout(timer);
  }, [ready, complianceReady, voiceEnabled, voiceLanguage, runVoice]);

  useEffect(() => {
    if (!ready || !complianceReady) return;

    let timer: number | undefined;

    const onMasterKey = (event: Event) => {
      const detail = (event as CustomEvent<{ active?: boolean }>).detail;
      if (detail?.active === false) return;

      const welcomeName = readArenaWelcomeDisplayName();
      setUsername(readMemberUsername());
      dispatchArenaWelcomeEnter();
      clearGreetedSession();

      if (pathname !== "/" || welcomeName.length < 2) return;

      const now = Date.now();
      if (now - lastHomeWelcomeAt.current < 1200) return;
      lastHomeWelcomeAt.current = now;

      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        primeAiVoice();
        if (!voiceEnabled) {
          saveVoiceGreetingEnabled(true);
          setVoiceEnabledState(true);
        }

        void runVoice(async () => {
          await speakWelcomeGreeting(welcomeName, voiceLanguage);
        }, { force: true });
      }, 400);
    };

    window.addEventListener(ARENA_MASTER_KEY_EVENT, onMasterKey);
    return () => {
      window.removeEventListener(ARENA_MASTER_KEY_EVENT, onMasterKey);
      if (timer) window.clearTimeout(timer);
    };
  }, [ready, complianceReady, pathname, voiceEnabled, voiceLanguage, runVoice]);

  const value = useMemo(
    () => ({
      ready,
      username,
      voiceEnabled,
      voiceLanguage,
      isSpeaking,
      setVoiceEnabled,
      setVoiceLanguage,
      saveUsername,
      greetMember,
      greetArenaSite,
      greetEcuadorRoom
    }),
    [ready, username, voiceEnabled, voiceLanguage, isSpeaking, setVoiceEnabled, setVoiceLanguage, saveUsername, greetMember, greetArenaSite, greetEcuadorRoom]
  );

  return <AiVoiceGreetingContext.Provider value={value}>{children}</AiVoiceGreetingContext.Provider>;
}

export function useAiVoiceGreeting() {
  const context = useContext(AiVoiceGreetingContext);

  if (!context) {
    throw new Error("useAiVoiceGreeting must be used within AiVoiceGreetingProvider");
  }

  return context;
}
