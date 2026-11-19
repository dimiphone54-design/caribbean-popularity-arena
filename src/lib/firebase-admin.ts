import "server-only";

import {
  applicationDefault,
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

function getAdminApp() {
  const existing = getApps()[0];
  if (existing) return existing;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      projectId,
    });
  }

  if (process.env.NODE_ENV !== "production") {
    const credentialsPath = resolve(
      process.cwd(),
      ".data/firebase-adminsdk.json"
    );

    if (!existsSync(credentialsPath)) {
      throw new Error("Local Firebase Admin credentials file is missing");
    }

    process.env.GOOGLE_APPLICATION_CREDENTIALS ??= credentialsPath;

    return initializeApp({
      credential: applicationDefault(),
      projectId: "caribbeanfreedomarena-29841",
    });
  }

  throw new Error("Firebase Admin credentials are not configured");
}

// Initialize Firebase only when a request accesses Firestore.
export const adminDb = new Proxy({} as Firestore, {
  get(_target, property) {
    const db = getFirestore(getAdminApp());
    const value = Reflect.get(db, property, db);
    return typeof value === "function" ? value.bind(db) : value;
  },
});
