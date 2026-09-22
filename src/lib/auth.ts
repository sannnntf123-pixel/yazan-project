import 'server-only';

import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

/**
 * ADMIN AUTH
 * ----------
 * Single admin user. Credentials come from env vars; the defaults below are
 * the ones the site was handed over with — set ADMIN_USERNAME / ADMIN_PASSWORD
 * / ADMIN_SESSION_SECRET in .env.local (or your host) to change them.
 */
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? 'yazan';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '123QWE@';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? `${ADMIN_USERNAME}:${ADMIN_PASSWORD}:momentum-cms`;

export const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // timingSafeEqual requires equal lengths; compare against self to keep timing flat.
  return bufA.length === bufB.length ? timingSafeEqual(bufA, bufB) : (timingSafeEqual(bufA, bufA), false);
}

function sign(payload: string): string {
  return createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
}

export function verifyCredentials(username: string, password: string): boolean {
  return safeEqual(username, ADMIN_USERNAME) && safeEqual(password, ADMIN_PASSWORD);
}

/** Token = "<expiresAt>.<signature>" so it needs no server-side session storage. */
function createToken(): { token: string; expiresAt: Date } {
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const payload = String(expiresAt.getTime());
  return { token: `${payload}.${sign(payload)}`, expiresAt };
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload))) return false;
  return Number(payload) > Date.now();
}

export async function createSession(): Promise<void> {
  const { token, expiresAt } = createToken();
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/admin',
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete({ name: SESSION_COOKIE, path: '/admin' });
}

export async function isAuthenticated(): Promise<boolean> {
  return isValidToken((await cookies()).get(SESSION_COOKIE)?.value);
}

// --- Login throttling (in-memory, per process) -------------------------------

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const attempts = new Map<string, { count: number; firstAt: number }>();

export function isLockedOut(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.firstAt > LOCKOUT_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(key: string): void {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.firstAt > LOCKOUT_MS) {
    attempts.set(key, { count: 1, firstAt: Date.now() });
  } else {
    entry.count += 1;
  }
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}
