import { NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/analytics';
import { portalBaseUrl, sendPortalInvite } from '@/lib/portal/invite-email';
import { createInvitedUser, listUsers, SITE_SLUG_RE, toPublicUser } from '@/lib/portal/users';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const users = await listUsers();
  return NextResponse.json({ clients: users.map(toPublicUser) });
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : '';
  const site = typeof body.site === 'string' ? body.site.trim().toLowerCase() : '';

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: 'Enter the client name.' }, { status: 400 });
  }
  if (!SITE_SLUG_RE.test(site)) {
    return NextResponse.json({ error: 'Site ID can only use lowercase letters, numbers and dashes.' }, { status: 400 });
  }

  try {
    const { user, token } = await createInvitedUser({ email, name, site });
    const inviteUrl = `${portalBaseUrl(request)}/portal/invite/${token}`;
    const emailed = await sendPortalInvite({ to: user.email, name: user.name, inviteUrl });
    return NextResponse.json({ client: toPublicUser(user), inviteUrl, emailed });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not create client.';
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
