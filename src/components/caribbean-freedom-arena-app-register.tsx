"use client";

import { useEffect } from "react";
import { caribbeanFreedomArenaApp } from "@/lib/caribbean-freedom-arena-app";

/** Registers the PWA service worker · same deploy as the website */
export function CaribbeanFreedomArenaAppRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      /* Dev: drop stale SW/cache so mixed build previews never stick white */
      void navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => void registration.unregister());
      });
      if ("caches" in window) {
        void caches.keys().then((keys) => {
          keys.forEach((key) => void caches.delete(key));
        });
      }
      return;
    }

    void navigator.serviceWorker.register(caribbeanFreedomArenaApp.swPath).catch(() => {
      /* SW optional — site still works as a normal website */
    });
  }, []);

  return null;
}
