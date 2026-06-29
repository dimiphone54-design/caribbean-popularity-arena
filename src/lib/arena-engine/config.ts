const placeholderValues = new Set(["", "placeholder", "your-value-here", "replace-me"]);

function readEnv(name: string, fallback = "") {
  return process.env[name] ?? fallback;
}

function hasUsableValue(value: string) {
  return Boolean(value && !placeholderValues.has(value.trim().toLowerCase()));
}

export const arenaEngineConfig = {
  botApiKey: readEnv("CARIBBEAN_SLOTS_BOT_API_KEY", "fake_caribbean_slots_bot_key"),
  botWebhookSecret: readEnv(
    "CARIBBEAN_SLOTS_BOT_WEBHOOK_SECRET",
    "fake_caribbean_slots_webhook_secret"
  ),
  botLegalMode: readEnv("CARIBBEAN_SLOTS_BOT_LEGAL_MODE", "true") === "true",
  botPollSeconds: Number(readEnv("CARIBBEAN_SLOTS_BOT_POLL_SECONDS", "60")),
  dataFile: readEnv("CARIBBEAN_SLOTS_ENGINE_DATA", ".data/arena-engine-state.json"),
  clientEnabled: readEnv("NEXT_PUBLIC_ENABLE_ARENA_ENGINE", "true") === "true"
} as const;

export function isArenaBotSecretValid(provided: string | null) {
  if (!provided) return false;
  return provided === arenaEngineConfig.botWebhookSecret;
}

export function isArenaBotApiKeyValid(provided: string | null) {
  if (!provided) return false;
  return provided === arenaEngineConfig.botApiKey;
}

export function isArenaEngineProductionReady() {
  return (
    hasUsableValue(arenaEngineConfig.botWebhookSecret) &&
    arenaEngineConfig.botWebhookSecret !== "fake_caribbean_slots_webhook_secret"
  );
}
