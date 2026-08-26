import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type InquireBody = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  message?: string;
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
  const welcomeUrl = `${baseUrl}/websites/welcome`;
  const pricingUrl = `${baseUrl}/websites/pricing`;
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.INQUIRE_NOTIFY_EMAIL || 'sales@devly.info';
  const from =
    process.env.RESEND_FROM || 'Devly <onboarding@resend.dev>';

  if (!apiKey) {
    console.warn('[inquire] RESEND_API_KEY missing — lead accepted without email');
    console.info('[inquire] lead', { name, email, company, website, message });
    return NextResponse.json({
      ok: true,
      emailed: false,
      welcomeUrl,
      warning:
        'Email provider not configured. Lead logged; share the Welcome Package link manually.',
    });
  }

  const resend = new Resend(apiKey);

  const prospectHtml = `
    <div style="font-family: Inter, Helvetica, Arial, sans-serif; color: #1a1a1a; line-height: 1.5; max-width: 560px;">
      <p>Hi ${escapeHtml(name.split(' ')[0] || name)},</p>
      <p>Thanks for taking the time to share details about your project.</p>
      <p>We're reviewing your inquiry and will follow up with next steps within <strong>1–2 business days</strong>.</p>
      <p>In the meantime, review our Welcome Package — it outlines how we approach projects, our process, and what working together typically looks like:</p>
      <p><a href="${welcomeUrl}" style="color: #0b1a24; font-weight: 600;">View the Welcome Package →</a></p>
      <p>Pricing overview: <a href="${pricingUrl}">${pricingUrl}</a></p>
      <p>This should answer most high-level questions and give you a clear sense of whether this feels like the right fit.</p>
      <p style="margin-top: 28px;">— Devly<br/><a href="mailto:sales@devly.info">sales@devly.info</a></p>
    </div>
  `;

  const notifyHtml = `
    <div style="font-family: Inter, Helvetica, Arial, sans-serif; line-height: 1.5;">
      <p><strong>New website inquiry</strong></p>
      <p>Name: ${escapeHtml(name)}<br/>
      Email: ${escapeHtml(email)}<br/>
      Company: ${escapeHtml(company || '—')}<br/>
      Website: ${escapeHtml(website || '—')}</p>
      <p>Message:</p>
      <p>${escapeHtml(message || '—').replace(/\n/g, '<br/>')}</p>
    </div>
  `;

  try {
    const prospect = await resend.emails.send({
      from,
      to: email,
      subject: 'Your website project — next steps',
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

    return NextResponse.json({ ok: true, emailed: true, welcomeUrl });
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
