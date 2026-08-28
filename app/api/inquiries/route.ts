import { NextResponse } from 'next/server';

import { isAdminAuthorized } from '@/lib/analytics';
import { listInquiries } from '@/lib/inquiries';

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inquiries = await listInquiries();
    return NextResponse.json({
      inquiries,
      count: inquiries.length,
      storage: 'local-json',
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to read inquiries' },
      { status: 503 },
    );
  }
}
