const islandHubAccessKey = "cpa_island_hub_access";

export function hasIslandHubAccess() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(islandHubAccessKey) === "true";
}

export function grantIslandHubAccess() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(islandHubAccessKey, "true");
}

export const islandHubEntryUsd = 6;
