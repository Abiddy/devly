import { NextResponse } from 'next/server';

import { isAdminAuthorized } from '@/lib/analytics';
import { listClientLeads, upsertClientLead, type ClientLead } from '@/lib/client-leads';
import { resolveClientSite } from '@/lib/client-sites';
import { allowRequest } from '@/lib/rate-limit';

const MAX_BODY_BYTES = 8_000;
const MAX_PAYLOAD_BYTES = 4_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCE_RE = /^[a-z0-9-]{1,32}$/;

type LeadBody = {
  email?: unknown;
  marketingOptIn?: unknown;
  source?: unknown;
  payload?: unknown;
};

export async function POST(request: Request) {
  const site = resolveClientSite(request);
  if (!site) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const clientIp = request.headers.get('x-client-ip')?.trim() || 'unknown';
  const perVisitor = allowRequest(`lead:${site.slug}:${clientIp}`, 10, 60_000);
  const perSite = allowRequest(`lead:${site.slug}`, 300, 60 * 60_000);
  if (!perVisitor || !perSite) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  let body: LeadBody;
  try {
    body = JSON.parse(raw) as LeadBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  }

  const source =
    typeof body.source === 'string' && SOURCE_RE.test(body.source) ? body.source : 'chat';

  let payload: unknown;
  if (body.payload !== undefined && body.payload !== null) {
    const serialized = JSON.stringify(body.payload);
    if (serialized.length <= MAX_PAYLOAD_BYTES) payload = body.payload;
  }

  try {
    const lead = await upsertClientLead({
      site: site.slug,
      email,
      marketingOptIn: body.marketingOptIn === true,
      source,
      payload,
    });
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error('[v1/leads] could not persist lead', err);
    return NextResponse.json({ error: 'Unable to save lead' }, { status: 503 });
  }
}

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const site = url.searchParams.get('site') || undefined;

  try {
    const leads = await listClientLeads(site);

    if (url.searchParams.get('format') === 'csv') {
      return new Response(toCsv(leads), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="leads${site ? `-${site}` : ''}.csv"`,
        },
      });
    }

    return NextResponse.json({ leads, count: leads.length, storage: 'local-json' });
  } catch {
    return NextResponse.json({ error: 'Unable to read leads' }, { status: 503 });
  }
}

function toCsv(leads: ClientLead[]) {
  const header = [
    'site',
    'email',
    'marketing_opt_in',
    'marketing_opt_in_at',
    'sources',
    'visits',
    'first_seen_at',
    'last_seen_at',
  ];
  const rows = leads.map((lead) =>
    [
      lead.site,
      lead.email,
      lead.marketingOptIn ? 'yes' : 'no',
      lead.marketingOptInAt || '',
      lead.sources.join(' '),
      String(lead.visits),
      lead.firstSeenAt,
      lead.lastSeenAt,
    ]
      .map(csvCell)
      .join(','),
  );
  return [header.join(','), ...rows].join('\n');
}

function csvCell(value: string) {
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}
