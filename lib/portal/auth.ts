import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * =============================================================================
 * PORTAL SESSIONS — small signed cookies, no accounts or passwords to manage.
 * =============================================================================
 * Three session kinds:
 *   - family: a parent signed in with their 4-digit family code
 *   - staff:  Meg (or a helper) signed in with the staff code → admin area
 *   - kiosk:  a device (door tablet) unlocked by staff for self-serve check-in
 *
 * Cookies hold "<kind>:<subject>:<expiry>" plus an HMAC signature, so they
 * cannot be forged without the server secret.
 */

const FAMILY_COOKIE = "ae_family";
const STAFF_COOKIE = "ae_staff";
const KIOSK_COOKIE = "ae_kiosk";

const FAMILY_TTL = 60 * 60 * 24 * 30; // 30 days
const STAFF_TTL = 60 * 60 * 24 * 7; // 7 days
const KIOSK_TTL = 60 * 60 * 24 * 180; // kiosk device stays unlocked ~6 months

function secret(): string {
  // In demo mode a static secret is acceptable — there is no real data.
  // For production set PORTAL_SESSION_SECRET (any long random string).
  return process.env.PORTAL_SESSION_SECRET || "arrowhead-demo-secret-not-for-production";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function makeToken(kind: string, subject: string, ttlSeconds: number): string {
  const payload = `${kind}:${subject}:${Date.now() + ttlSeconds * 1000}`;
  return `${payload}.${sign(payload)}`;
}

function readToken(token: string | undefined, kind: string): string | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const [k, subject, expiry] = payload.split(":");
  if (k !== kind || !subject) return null;
  if (Number(expiry) < Date.now()) return null;
  return subject;
}

const cookieOpts = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

// ---- family ----------------------------------------------------------------

export async function setFamilySession(familyId: string) {
  (await cookies()).set(FAMILY_COOKIE, makeToken("family", familyId, FAMILY_TTL), {
    ...cookieOpts,
    maxAge: FAMILY_TTL,
  });
}

export async function getFamilySession(): Promise<string | null> {
  return readToken((await cookies()).get(FAMILY_COOKIE)?.value, "family");
}

export async function clearFamilySession() {
  (await cookies()).delete(FAMILY_COOKIE);
}

// ---- staff -----------------------------------------------------------------

export async function setStaffSession() {
  (await cookies()).set(STAFF_COOKIE, makeToken("staff", "staff", STAFF_TTL), {
    ...cookieOpts,
    maxAge: STAFF_TTL,
  });
}

export async function getStaffSession(): Promise<boolean> {
  return readToken((await cookies()).get(STAFF_COOKIE)?.value, "staff") !== null;
}

export async function clearStaffSession() {
  (await cookies()).delete(STAFF_COOKIE);
}

/**
 * The staff code that unlocks the admin area and the kiosk.
 * Set PORTAL_STAFF_CODE in production; the demo default is 9999.
 */
export function staffCode(): string {
  return process.env.PORTAL_STAFF_CODE || "9999";
}

// ---- kiosk -----------------------------------------------------------------

export async function setKioskSession() {
  (await cookies()).set(KIOSK_COOKIE, makeToken("kiosk", "kiosk", KIOSK_TTL), {
    ...cookieOpts,
    maxAge: KIOSK_TTL,
  });
}

export async function getKioskSession(): Promise<boolean> {
  return readToken((await cookies()).get(KIOSK_COOKIE)?.value, "kiosk") !== null;
}

export async function clearKioskSession() {
  (await cookies()).delete(KIOSK_COOKIE);
}

// ---- best-effort brute-force damper ---------------------------------------
// Serverless instances don't share memory, so this is a damper rather than a
// guarantee; combined with 30+ second lockouts and four-digit codes tied to
// low-sensitivity data, it is proportionate for this app.

const attempts = new Map<string, { count: number; until: number }>();

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (entry && entry.until > now && entry.count >= 8) return false;
  return true;
}

export function noteFailedAttempt(key: string) {
  const now = Date.now();
  const entry = attempts.get(key) ?? { count: 0, until: 0 };
  entry.count += 1;
  entry.until = now + 30_000 * Math.min(entry.count, 10);
  attempts.set(key, entry);
}

export function clearAttempts(key: string) {
  attempts.delete(key);
}
