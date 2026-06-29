"use client";

import { useEffect, useState } from "react";
import {
  caribbeanFreedomArenaApp,
  isCaribbeanFreedomArenaStandalone,
  isIosInstallBrowser
} from "@/lib/caribbean-freedom-arena-app";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function CaribbeanFreedomArenaInstallApp({ variant = "nav" }: { variant?: "nav" | "hero" }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setInstalled(isCaribbeanFreedomArenaStandalone());

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const canNativeInstall = Boolean(deferredPrompt);
  const canIosInstall = isIosInstallBrowser();

  async function handleInstallClick() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
      }
      setDeferredPrompt(null);
      return;
    }

    setShowHint((value) => !value);
  }

  if (installed) {
    return variant === "hero" ? (
      <p className="cfa-app-installed-badge">App installed · {caribbeanFreedomArenaApp.name}</p>
    ) : null;
  }

  if (variant === "nav" && !canNativeInstall && !canIosInstall) {
    return null;
  }

  if (variant === "hero") {
    return (
      <div className="cfa-app-install-hero">
        <button type="button" className="cfa-app-install-btn cfa-app-install-btn-hero" onClick={handleInstallClick}>
          <span className="cfa-app-install-icon" aria-hidden="true">
            📲
          </span>
          Install {caribbeanFreedomArenaApp.name} App
        </button>
        <p className="cfa-app-install-note">Website + app · same login · full-screen home screen</p>
        {showHint ? (
          <p className="cfa-app-install-ios">
            {canIosInstall ? (
              <>
                iPhone/iPad: tap Share → <strong>Add to Home Screen</strong>
              </>
            ) : (
              <>
                Chrome/Edge: menu ⋮ → <strong>Install app</strong>
              </>
            )}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="cfa-app-install-nav-wrap">
      <button type="button" className="cfa-app-install-btn cfa-app-install-btn-nav" onClick={handleInstallClick}>
        Install App
      </button>
      {showHint ? (
        <p className="cfa-app-install-ios cfa-app-install-ios-nav">
          {canIosInstall ? "Share → Add to Home Screen" : "Menu ⋮ → Install app"}
        </p>
      ) : null}
    </div>
  );
}
