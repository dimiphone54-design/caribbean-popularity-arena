const placeholderValues = new Set(["", "placeholder", "your-value-here", "replace-me"]);

function readEnv(name: string, fallback = "") {
  return process.env[name] ?? fallback;
}

function hasUsableValue(value: string | undefined) {
  return Boolean(value && !placeholderValues.has(value.trim().toLowerCase()));
}

function hasUsableConfig(values: Array<string | undefined>) {
  return values.every(hasUsableValue);
}

/** Platform env — payment via PayPal. */
export const env = {
  app: {
    name: readEnv("NEXT_PUBLIC_APP_NAME", "CaribbeanFreedomArena"),
    url: readEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3004"),
    environment: readEnv("NEXT_PUBLIC_APP_ENV", "development")
  },
  firebase: {
    apiKey: readEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: readEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: readEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: readEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: readEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: readEnv("NEXT_PUBLIC_FIREBASE_APP_ID")
  },
  cloudflare: {
    accountId: readEnv("CLOUDFLARE_ACCOUNT_ID"),
    apiToken: readEnv("CLOUDFLARE_API_TOKEN"),
    r2AccessKeyId: readEnv("CLOUDFLARE_R2_ACCESS_KEY_ID"),
    r2SecretAccessKey: readEnv("CLOUDFLARE_R2_SECRET_ACCESS_KEY"),
    r2BucketName: readEnv("CLOUDFLARE_R2_BUCKET_NAME")
  },
  paypal: {
    clientId: readEnv("PAYPAL_CLIENT_ID"),
    env: readEnv("PAYPAL_ENV", "sandbox")
  },
  analytics: {
    gaMeasurementId: readEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
    metaPixelId: readEnv("NEXT_PUBLIC_META_PIXEL_ID"),
    posthogKey: readEnv("NEXT_PUBLIC_POSTHOG_KEY"),
    posthogHost: readEnv("NEXT_PUBLIC_POSTHOG_HOST", "https://app.posthog.com")
  },
  features: {
    enableVotingWrites: readEnv("NEXT_PUBLIC_ENABLE_VOTING_WRITES", "false") === "true",
    /** Real charges require explicit enable — credentials alone do not unlock checkout. */
    enableRealMoney: readEnv("NEXT_PUBLIC_REAL_MONEY_ENABLED", "false") === "true",
    enableMembershipCheckout:
      readEnv("NEXT_PUBLIC_REAL_MONEY_ENABLED", "false") === "true" &&
      readEnv("NEXT_PUBLIC_ENABLE_MEMBERSHIP_CHECKOUT", "false") === "true" &&
      hasUsableValue(readEnv("PAYPAL_CLIENT_ID")) &&
      hasUsableValue(readEnv("PAYPAL_CLIENT_SECRET")),
    enableDropshipPurchases:
      readEnv("NEXT_PUBLIC_REAL_MONEY_ENABLED", "false") === "true" &&
      readEnv("NEXT_PUBLIC_ENABLE_DROPSHIP_PURCHASES", "false") === "true",
    enableAnalytics: readEnv("NEXT_PUBLIC_ENABLE_ANALYTICS", "false") === "true",
    enableArenaEngine: readEnv("NEXT_PUBLIC_ENABLE_ARENA_ENGINE", "true") === "true"
  }
} as const;

export const serviceReadiness = {
  firebase: hasUsableConfig(Object.values(env.firebase)),
  cloudflareR2: hasUsableConfig([
    env.cloudflare.accountId,
    env.cloudflare.r2AccessKeyId,
    env.cloudflare.r2SecretAccessKey,
    env.cloudflare.r2BucketName
  ]),
  analytics: hasUsableConfig([
    env.analytics.gaMeasurementId,
    env.analytics.metaPixelId,
    env.analytics.posthogKey
  ])
} as const;
