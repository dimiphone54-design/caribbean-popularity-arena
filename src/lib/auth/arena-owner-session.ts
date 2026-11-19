import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const ARENA_OWNER_COOKIE = "cfa_arena_owner_session";
export const ARENA_OWNER_SESSION_MAX_AGE = 8 * 60 * 60;

function getSessionSecret() {
  const secret = process.env.ARENA_OWNER_SESSION_SECRET?.trim();
  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("ARENA_OWNER_SESSION_SECRET must contain at least 32 bytes");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createArenaOwnerSessionCookie() {
  const payload = Buffer.from(JSON.stringify({
    role: "owner",
    exp: Math.floor(Date.now() / 1000) + ARENA_OWNER_SESSION_MAX_AGE,
    version: 1
  })).toString("base64url");

  const value = `${payload}.${sign(payload)}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ARENA_OWNER_COOKIE}=${value}; HttpOnly; Path=/; Max-Age=${ARENA_OWNER_SESSION_MAX_AGE}; SameSite=Strict${secure}`;
}

export function clearArenaOwnerSessionCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ARENA_OWNER_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${secure}`;
}

export function hasArenaOwnerSession(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const cookie = cookieHeader.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${ARENA_OWNER_COOKIE}=`));

    if (!cookie) return false;

    const value = cookie.slice(ARENA_OWNER_COOKIE.length + 1);
    const separator = value.lastIndexOf(".");
    if (separator <= 0) return false;

    const payload = value.slice(0, separator);
    const supplied = Buffer.from(value.slice(separator + 1), "base64url");
    const expected = Buffer.from(sign(payload), "base64url");

    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
      return false;
    }

    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      role?: string;
      exp?: number;
      version?: number;
    };

    return session.role === "owner"
      && session.version === 1
      && typeof session.exp === "number"
      && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
