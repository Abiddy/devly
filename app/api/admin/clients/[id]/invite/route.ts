import { NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/analytics';
import { portalBaseUrl, sendPortalInvite } from '@/lib/portal/invite-email';
import { reissueInvite, toPublicUser } from '@/lib/portal/users';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { user, token } = await reissueInvite(params.id);
    const inviteUrl = `${portalBaseUrl(request)}/portal/invite/${token}`;
    const emailed = await sendPortalInvite({ to: user.email, name: user.name, inviteUrl });
    return NextResponse.json({ client: toPublicUser(user), inviteUrl, emailed });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not send invite.';
    return NextResponse.json({ error: message }, { status: 404 });
  }
}
