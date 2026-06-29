import type { MetadataRoute } from "next";
import { caribbeanFreedomArenaApp } from "@/lib/caribbean-freedom-arena-app";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: caribbeanFreedomArenaApp.id,
    name: caribbeanFreedomArenaApp.name,
    short_name: caribbeanFreedomArenaApp.shortName,
    description: caribbeanFreedomArenaApp.description,
    start_url: caribbeanFreedomArenaApp.startUrl,
    scope: caribbeanFreedomArenaApp.scope,
    display: "standalone",
    orientation: "portrait-primary",
    background_color: caribbeanFreedomArenaApp.backgroundColor,
    theme_color: caribbeanFreedomArenaApp.themeColor,
    categories: ["entertainment", "social"],
    icons: [
      {
        src: caribbeanFreedomArenaApp.icon192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: caribbeanFreedomArenaApp.icon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: caribbeanFreedomArenaApp.icon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
