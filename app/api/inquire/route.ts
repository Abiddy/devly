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
  const notifyTo = process.env.INQUIRE_NOTIFY_EMAIL || 'sales@devly.info';
  const from =
    process.env.RESEND_FROM || 'Devly <onboarding@resend.dev>';

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

  const notifyHtml = `
    <div style="font-family: Inter, Helvetica, Arial, sans-serif; line-height: 1.5;">
      <p><strong>New website inquiry</strong></p>
      <p>Name: ${escapeHtml(name)}<br/>
      Email: ${escapeHtml(email)}<br/>
      Company: ${escapeHtml(company || '—')}<br/>
      Website: ${escapeHtml(website || '—')}</p>
      <p>Goals: ${escapeHtml(goals.length ? goals.join(', ') : '—')}<br/>
      Budget: ${escapeHtml(budget || '—')}<br/>
      Size: ${escapeHtml(size || '—')}<br/>
      Timeline: ${escapeHtml(timeline || '—')}</p>
      <p>Brief:</p>
      <p>${escapeHtml(message || '—').replace(/\n/g, '<br/>')}</p>
    </div>
  `;

  try {
    const prospect = await resend.emails.send({
      from,
      to: email,
      subject: welcomeEmailSubject(name),
      html: prospectHtml,
    });

    if (prospect.error) {
      console.error('[inquire] prospect email failed', prospect.error);
      return NextResponse.json(
        { error: 'Could not send confirmation email. Try again shortly.' },
        { status: 502 },
      );
    }

    const notify = await resend.emails.send({
      from,
      to: notifyTo,
      replyTo: email,
      subject: `New inquiry: ${name}${company ? ` (${company})` : ''}`,
      html: notifyHtml,
    });

    if (notify.error) {
      console.error('[inquire] notify email failed', notify.error);
    }

    return NextResponse.json({ ok: true, emailed: true, stored, welcomeUrl });
  } catch (err) {
    console.error('[inquire] unexpected error', err);
    return NextResponse.json(
      { error: 'Something went wrong sending email.' },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
