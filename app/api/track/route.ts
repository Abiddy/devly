import { NextResponse } from 'next/server';

import {
  detectDevice,
  recordAnalyticsEvent,
  type AnalyticsEventType,
} from '@/lib/analytics';

type TrackBody = {
  type?: AnalyticsEventType;
  path?: string;
  referrer?: string | null;
  visitorId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TrackBody;
    const type = body.type;
    const path = body.path?.trim();
    const visitorId = body.visitorId?.trim();

    if (!type || !path || !visitorId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    if (!['pageview', 'cta_click', 'scheduling_start'].includes(type)) {
      return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
    }

    await recordAnalyticsEvent({
      type,
      path,
      referrer: body.referrer ?? null,
      visitorId,
      device: detectDevice(request.headers.get('user-agent')),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Analytics storage unavailable' },
      { status: 503 },
    );
  }
}
