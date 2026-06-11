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

export const env = {
  app: {
    name: readEnv("NEXT_PUBLIC_APP_NAME", "Caribbean Popularity Arena"),
    url: readEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
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
  payments: {
    provider: readEnv("NEXT_PUBLIC_PAYMENT_PROVIDER", "stripe"),
    stripePublishableKey: readEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
    stripeSecretKey: readEnv("STRIPE_SECRET_KEY"),
    stripeWebhookSecret: readEnv("STRIPE_WEBHOOK_SECRET"),
    fanPassPriceId: readEnv("STRIPE_FAN_PASS_PRICE_ID"),
    arenaPlusPriceId: readEnv("STRIPE_ARENA_PLUS_PRICE_ID"),
    creatorCirclePriceId: readEnv("STRIPE_CREATOR_CIRCLE_PRICE_ID"),
    wipayCheckoutUrl: readEnv("NEXT_PUBLIC_WIPAY_CHECKOUT_URL"),
    wipayAccountName: readEnv("NEXT_PUBLIC_WIPAY_ACCOUNT_NAME"),
    wipayAccountId: readEnv("WIPAY_ACCOUNT_ID"),
    wipayApiKey: readEnv("WIPAY_API_KEY"),
    wipayApiSecret: readEnv("WIPAY_API_SECRET"),
    mensEntryAmountUsd: readEnv("WIPAY_MENS_ENTRY_AMOUNT_USD", "6")
  },
  cloudflare: {
    accountId: readEnv("CLOUDFLARE_ACCOUNT_ID"),
    apiToken: readEnv("CLOUDFLARE_API_TOKEN"),
    r2AccessKeyId: readEnv("CLOUDFLARE_R2_ACCESS_KEY_ID"),
    r2SecretAccessKey: readEnv("CLOUDFLARE_R2_SECRET_ACCESS_KEY"),
    r2BucketName: readEnv("CLOUDFLARE_R2_BUCKET_NAME")
  },
  analytics: {
    gaMeasurementId: readEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
    metaPixelId: readEnv("NEXT_PUBLIC_META_PIXEL_ID"),
    posthogKey: readEnv("NEXT_PUBLIC_POSTHOG_KEY"),
    posthogHost: readEnv("NEXT_PUBLIC_POSTHOG_HOST", "https://app.posthog.com")
  },
  features: {
    enableVotingWrites: readEnv("NEXT_PUBLIC_ENABLE_VOTING_WRITES", "false") === "true",
    enableMembershipCheckout:
      readEnv("NEXT_PUBLIC_ENABLE_MEMBERSHIP_CHECKOUT", "false") === "true",
    enableAnalytics: readEnv("NEXT_PUBLIC_ENABLE_ANALYTICS", "false") === "true"
  }
} as const;

export const serviceReadiness = {
  firebase: hasUsableConfig(Object.values(env.firebase)),
  stripe: hasUsableConfig([
    env.payments.stripePublishableKey,
    env.payments.stripeSecretKey,
    env.payments.stripeWebhookSecret
  ]),
  wipay: hasUsableConfig([
    env.payments.wipayCheckoutUrl,
    env.payments.wipayAccountId,
    env.payments.wipayApiKey,
    env.payments.wipayApiSecret
  ]),
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
