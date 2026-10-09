import { NextResponse } from 'next/server';
import { setSessionCookie, requestIp } from '@/lib/portal/session';
import { acceptInvite, MIN_PASSWORD_LENGTH } from '@/lib/portal/users';
import { allowRequest } from '@/lib/rate-limit';

export async function POST(request: Request) {
  if (!allowRequest(`portal-invite:${requestIp(request)}`, 10, 15 * 60_000)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in a few minutes.' }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const token = typeof body.token === 'string' ? body.token : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (password.length < MIN_PASSWORD_LENGTH || password.length > 200) {
    return NextResponse.json(
      { error: `Use a password with at least ${MIN_PASSWORD_LENGTH} characters.` },
      { status: 400 },
    );
  }

  const user = token ? await acceptInvite(token, password) : null;
  if (!user) {
    return NextResponse.json(
      { error: 'This invite link has expired or was already used. Ask Devly for a new one.' },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ ok: true });
  setSessionCookie(response, user);
  return response;
}
