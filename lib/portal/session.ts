import { createHmac } from 'crypto';
import { cookies } from 'next/headers';
import type { NextResponse } from 'next/server';
import { safeEqual } from '@/lib/portal/crypto';
import { findUserById, type PortalUser } from '@/lib/portal/users';

export const SESSION_COOKIE = 'devly_portal';
const SESSION_TTL_S = 30 * 24 * 60 * 60;

function secret(): string {
  const value = process.env.PORTAL_SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error('PORTAL_SESSION_SECRET must be set to at least 32 characters.');
  }
  return value;
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function setSessionCookie(response: NextResponse, user: PortalUser) {
  const payload = Buffer.from(
    JSON.stringify({ uid: user.id, v: user.sessionVersion, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_S }),
  ).toString('base64url');
  response.cookies.set(SESSION_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_S,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
}

/** Returns the signed-in portal user, or null. Works in route handlers and server components. */
export async function getSessionUser(): Promise<PortalUser | null> {
  const raw = cookies().get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const [payload, signature] = raw.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;

  try {
    const { uid, v, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      uid: string;
      v: number;
      exp: number;
    };
    if (exp * 1000 <= Date.now()) return null;
    const user = await findUserById(uid);
    return user && user.passwordHash && user.sessionVersion === v ? user : null;
  } catch {
    return null;
  }
}

export function requestIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
