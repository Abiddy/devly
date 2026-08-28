import { NextResponse } from 'next/server';

import {
  buildAnalyticsStats,
  isAdminAuthorized,
  readAnalyticsStore,
} from '@/lib/analytics';

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const store = await readAnalyticsStore();
    const stats = buildAnalyticsStats(store);

    return NextResponse.json({
      ...stats,
      storage: 'local-json',
      note:
        'Counts are stored in data/analytics.json on the server. Attach a Railway volume at /data and set DATA_DIR=/data so leads and stats survive restarts.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to read analytics data' },
      { status: 503 },
    );
  }
}
