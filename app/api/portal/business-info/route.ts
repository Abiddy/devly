import { NextResponse } from 'next/server';
import { getBusinessInfo, sanitizeBusinessInfo, saveBusinessInfo } from '@/lib/portal/business-info';
import { getSessionUser } from '@/lib/portal/session';

const MAX_BODY_BYTES = 100_000;

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getBusinessInfo(user.site));
}

export async function PUT(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Too much content to save at once.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    const record = await saveBusinessInfo(user.site, sanitizeBusinessInfo(body), user.email);
    return NextResponse.json(record);
  } catch (err) {
    console.error('[portal] could not save business info', err);
    return NextResponse.json({ error: 'Could not save. Please try again.' }, { status: 503 });
  }
}
