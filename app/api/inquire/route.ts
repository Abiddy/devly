import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  buildProspectWelcomeEmail,
  welcomeEmailSubject,
} from '@/lib/inquire-email';
import { saveInquiry } from '@/lib/inquiries';

type InquireBody = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  message?: string;
  goals?: string[];
  budget?: string;
  size?: string;
  timeline?: string;
};

function getBaseUrl(request: Request) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (envUrl) return envUrl;
  const origin = request.headers.get('origin');
  if (origin) return origin;
  return 'https://work.devly.info';
}

export async function POST(request: Request) {
  let body: InquireBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const company = (body.company || '').trim();
  const website = (body.website || '').trim();
  const message = (body.message || '').trim();
  const goals = Array.isArray(body.goals)
    ? body.goals.map((g) => String(g).trim()).filter(Boolean)
    : [];
  const budget = (body.budget || '').trim();
  const size = (body.size || '').trim();
  const timeline = (body.timeline || '').trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: 'Name and email are required.' },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  }

  const baseUrl = getBaseUrl(request);
  const welcomeUrl = `${baseUrl}/welcome`;
  const pricingUrl = `${baseUrl}/pricing`;
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM || 'Devly <hello@work.devly.info>';
  const notifyTo = salesNotifyRecipients();

  const lead = {
    name,
    email,
    company,
    website,
    message,
    goals,
    budget,
    size,
    timeline,
  };

  let stored = false;
  try {
    await saveInquiry(lead);
    stored = true;
  } catch (err) {
    console.error('[inquire] could not persist lead', err);
  }

  if (!apiKey) {
    console.warn('[inquire] RESEND_API_KEY missing — lead accepted without email');
    console.info('[inquire] lead', lead);
    return NextResponse.json({
      ok: true,
      emailed: false,
      stored,
      welcomeUrl,
      warning: stored
        ? 'Email provider not configured. Lead saved in /admin.'
        : 'Email provider not configured and lead could not be saved.',
    });
  }

  const resend = new Resend(apiKey);
  const photoUrl = `${baseUrl}/website-assets/nouman-1.png`;

  const prospectHtml = buildProspectWelcomeEmail({
    name,
    budget,
    size,
    welcomeUrl,
    pricingUrl,
    photoUrl,
  });

  const notifyHtml = buildSalesNotifyEmail({
    name,
    email,
    company,
    website,
    message,
    goals,
    budget,
    size,
    timeline,
  });

  try {
    const [prospect, notify] = await Promise.all([
      resend.emails.send({
        from,
        to: email,
        replyTo: SALES_INBOX,
        subject: welcomeEmailSubject(name),
        html: prospectHtml,
      }),
      resend.emails.send({
        from,
        to: notifyTo,
        replyTo: email,
        subject: `New inquiry: ${name}${company ? ` (${company})` : ''}`,
        html: notifyHtml,
      }),
    ]);

    if (notify.error) {
      console.error('[inquire] sales notify failed', notify.error);
    }

    if (prospect.error) {
      console.error('[inquire] prospect email failed', prospect.error);
      return NextResponse.json(
        { error: 'Could not send confirmation email. Try again shortly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      emailed: true,
      notified: !notify.error,
      stored,
      welcomeUrl,
    });
  } catch (err) {
    console.error('[inquire] unexpected error', err);
    return NextResponse.json(
      { error: 'Something went wrong sending email.' },
      { status: 500 },
    );
  }
}

const SALES_INBOX = 'sales@devly.info';

function salesNotifyRecipients(): string[] {
  const extra = process.env.INQUIRE_NOTIFY_EMAIL?.trim();
  return Array.from(new Set([SALES_INBOX, extra].filter((v): v is string => Boolean(v))));
}

function buildSalesNotifyEmail(lead: {
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
  goals: string[];
  budget: string;
  size: string;
  timeline: string;
}) {
  const row = (label: string, value: string) =>
    `<p style="margin:0 0 10px;"><span style="color:#667085;">${label}:</span> ${escapeHtml(value)}</p>`;

  return `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;line-height:1.55;color:#15205f;max-width:560px;">
      <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#152868;">New website inquiry</p>
      ${row('Name', lead.name)}
      ${row('Email', lead.email)}
      ${row('Company', lead.company || '—')}
      ${row('Website', lead.website || '—')}
      ${row('Goals', lead.goals.length ? lead.goals.join(', ') : '—')}
      ${row('Budget', lead.budget || '—')}
      ${row('Size', lead.size || '—')}
      ${row('Timeline', lead.timeline || '—')}
      <p style="margin:16px 0 8px;color:#667085;">Brief</p>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(lead.message || '—').replace(/\n/g, '<br/>')}</p>
      <p style="margin:20px 0 0;">
        <a href="mailto:${escapeHtml(lead.email)}" style="color:#152868;font-weight:600;">Reply to ${escapeHtml(lead.email)}</a>
      </p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
