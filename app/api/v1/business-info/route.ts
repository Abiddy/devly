import { NextResponse } from 'next/server';
import { resolveClientSite } from '@/lib/client-sites';
import { getBusinessInfo } from '@/lib/portal/business-info';

/** Client websites read their own business info with their site key. */
export async function GET(request: Request) {
  const site = resolveClientSite(request);
  if (!site) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const record = await getBusinessInfo(site.slug);
  return NextResponse.json(
    { info: record.info, updatedAt: record.updatedAt },
    { headers: { 'Cache-Control': 'private, max-age=60' } },
  );
}
