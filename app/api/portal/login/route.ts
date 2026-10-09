import { NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/portal/crypto';
import { requestIp, setSessionCookie } from '@/lib/portal/session';
import { findUserByEmail, normalizeEmail, recordLogin } from '@/lib/portal/users';
import { allowRequest } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const email = typeof body.email === 'string' ? normalizeEmail(body.email) : '';
  const password = typeof body.password === 'string' ? body.password.slice(0, 200) : '';

  const perIp = allowRequest(`portal-login:${requestIp(request)}`, 20, 15 * 60_000);
  const perEmail = allowRequest(`portal-login:${email}`, 8, 15 * 60_000);
  if (!perIp || !perEmail) {
    return NextResponse.json({ error: 'Too many attempts. Try again in a few minutes.' }, { status: 429 });
  }

  const user = email ? await findUserByEmail(email) : null;
  const valid = await verifyPassword(password, user?.passwordHash ?? null);
  if (!user || !valid) {
    return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
  }

  await recordLogin(user.id);
  const response = NextResponse.json({ ok: true });
  setSessionCookie(response, user);
  return response;
}
