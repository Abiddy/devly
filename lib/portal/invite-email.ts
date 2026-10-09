import { Resend } from 'resend';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function portalBaseUrl(request: Request) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return envUrl || new URL(request.url).origin;
}

/** Sends the portal invite. Returns false when email isn't configured or fails. */
export async function sendPortalInvite(input: { to: string; name: string; inviteUrl: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const first = escapeHtml(input.name.split(' ')[0] || input.name);
  const url = escapeHtml(input.inviteUrl);
  const html = `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;line-height:1.6;color:#15205f;max-width:520px;">
      <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#152868;">Your Devly business portal</p>
      <p style="margin:0 0 14px;">Hi ${first},</p>
      <p style="margin:0 0 14px;">Your business portal is ready. This is where you can keep your hours, contact details, services and website assistant answers up to date. Changes show up on your website automatically.</p>
      <p style="margin:0 0 22px;">Click below to set your password and sign in. This link expires in 7 days.</p>
      <p style="margin:0 0 26px;"><a href="${url}" style="display:inline-block;padding:12px 22px;border-radius:999px;background:#152868;color:#fff;text-decoration:none;font-weight:600;">Set up my account</a></p>
      <p style="margin:0;color:#667085;font-size:13px;">If the button doesn't work, paste this link into your browser:<br/>${url}</p>
    </div>`;

  try {
    const result = await new Resend(apiKey).emails.send({
      from: process.env.RESEND_FROM || 'Devly <hello@work.devly.info>',
      to: input.to,
      replyTo: 'sales@devly.info',
      subject: 'Set up your Devly business portal',
      html,
    });
    if (result.error) {
      console.error('[portal] invite email failed', result.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[portal] invite email failed', err);
    return false;
  }
}
