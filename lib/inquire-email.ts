import { CALENDLY_EVENT_URL } from '@/lib/calendly';

type WelcomeEmailInput = {
  name: string;
  budget?: string;
  size?: string;
  welcomeUrl: string;
  pricingUrl: string;
  photoUrl: string;
};

type BudgetFit = {
  heading: string;
  body: string;
};

function budgetKey(budget: string) {
  if (budget === 'Under $1,500') return 'lean';
  if (budget === '$1,500–$5,000') return 'focused';
  if (budget === '$5,000–$20,000') return 'full';
  if (budget === '$20,000+') return 'ambitious';
  return 'open';
}

function sizeLooksBig(size: string) {
  const s = size.toLowerCase();
  return s.includes('full') || s.includes('custom') || s.includes('7+');
}

export function getBudgetFit(budget = '', size = ''): BudgetFit {
  const key = budgetKey(budget);
  const bigAsk = sizeLooksBig(size);

  if (key === 'lean') {
    return {
      heading: 'What actually fits',
      body: bigAsk
        ? 'With the range you shared, a full multi-page custom site usually isn’t the right first move. The smart path is a conversion-optimized <strong>single-page landing page starting at $999</strong> — then we grow it once the site is earning its keep.'
        : 'At this range, we’re not able to take on a multi-page custom site. What we can do is a conversion-optimized <strong>single-page landing page starting at $999</strong> — one offer, one next step, built to look serious.',
    };
  }

  if (key === 'focused') {
    return {
      heading: 'What this range typically covers',
      body: 'This is the band where most of our founder and local-business sites live: a <strong>tight 3–6 page site</strong> with custom design, clean build, and forms or booking wired so leads don’t die in an empty contact box. We’ll confirm the exact scope on a short call.',
    };
  }

  if (key === 'full') {
    return {
      heading: 'What this range typically covers',
      body: 'There’s room here for a <strong>fuller custom site</strong> — more pages, a stronger brand story, and the integrations that actually matter (forms, booking, light CMS). We’ll still cut anything that doesn’t help you get leads.',
    };
  }

  if (key === 'ambitious') {
    return {
      heading: 'What this range typically covers',
      body: 'This is where we can go deeper: richer design, more pages, custom flows, and extra polish. You’ll still get options — not a padded invoice for the same deliverable. We’ll map the smartest version of the build, not the largest.',
    };
  }

  return {
    heading: 'We’ll recommend a fit',
    body: 'You weren’t sure on budget — that’s fine. After we read your brief, we’ll come back with a <strong>phase-one recommendation</strong> and a number that matches it. No pressure to pick a range before we’ve talked.',
  };
}

export function buildProspectWelcomeEmail({
  name,
  budget,
  size,
  welcomeUrl,
  pricingUrl,
  photoUrl,
}: WelcomeEmailInput) {
  const first = escapeHtml(name.split(' ')[0] || name);
  const fit = getBudgetFit(budget, size);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Let's build your website</title>
</head>
<body style="margin:0;padding:0;background:#f3f5fa;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f5fa;padding:28px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f5;">
          <tr>
            <td style="padding:28px 32px 12px;border-bottom:1px solid #eef1fb;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;letter-spacing:-0.03em;color:#152868;">Devly</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px;font-family:Inter,Helvetica,Arial,sans-serif;color:#1a1f36;font-size:16px;line-height:1.65;">
              <p style="margin:0 0 16px;">Hi ${first},</p>
              <p style="margin:0 0 16px;">Thanks for taking the time to share details about your project.</p>
              <p style="margin:0 0 8px;">Based on what you outlined, I want to set clear expectations around scope and budget — then you can decide if this feels like the right fit.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 8px;font-family:Inter,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 10px;font-size:22px;line-height:1.25;font-weight:700;color:#152868;letter-spacing:-0.03em;">How pricing works</p>
              <p style="margin:0;font-size:16px;line-height:1.65;color:#1a1f36;">
                Custom websites generally start around <strong>$2,500</strong>. If the budget is tighter, we offer focused packages — a conversion-ready <strong>one-pager starting at $999</strong>. Complex custom builds go to $25k+. You’ll still get a <strong>clear proposal with options</strong> before any work starts.
                <br /><br />
                How we think about it: <a href="${escapeHtml(pricingUrl)}" style="color:#152868;font-weight:600;text-decoration:underline;">pricing overview →</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 8px;font-family:Inter,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 10px;font-size:22px;line-height:1.25;font-weight:700;color:#152868;letter-spacing:-0.03em;">${escapeHtml(fit.heading)}</p>
              <p style="margin:0;font-size:16px;line-height:1.65;color:#1a1f36;">${fit.body}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1fb;border-radius:14px;border-left:4px solid #152868;">
                <tr>
                  <td style="padding:18px 20px;font-family:Inter,Helvetica,Arial,sans-serif;">
                    <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#152868;">Your Welcome Package</p>
                    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#3d4663;">
                      Process, who this is for, and what working together actually looks like.
                    </p>
                    <a href="${escapeHtml(welcomeUrl)}" style="display:inline-block;background:#152868;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:11px 18px;border-radius:999px;">Open the Welcome Package →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fd;border-radius:14px;border-left:4px solid #2a3fb8;">
                <tr>
                  <td style="padding:18px 20px;font-family:Inter,Helvetica,Arial,sans-serif;">
                    <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#152868;">Ready to start?</p>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#3d4663;">
                      Reply to this email, or <a href="${CALENDLY_EVENT_URL}" style="color:#152868;font-weight:600;">book a short call</a>. I’ll follow up within 1–2 business days if we’re a fit — with a custom proposal, not a generic price list.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 36px;font-family:Inter,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 18px;font-size:16px;color:#1a1f36;">Looking forward to this.</p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-left:3px solid #152868;padding-left:14px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:middle;">
                          <img src="${escapeHtml(photoUrl)}" alt="Nouman Abidi" width="48" height="48" style="width:48px;height:48px;border-radius:10px;object-fit:cover;display:block;border:1px solid #e2e8f5;" />
                        </td>
                        <td style="vertical-align:middle;">
                          <p style="margin:0;font-size:15px;font-weight:700;color:#152868;">Nouman Abidi</p>
                          <p style="margin:2px 0 0;font-size:13px;color:#667085;">Founder · Devly</p>
                          <p style="margin:2px 0 0;font-size:13px;"><a href="mailto:sales@devly.info" style="color:#667085;text-decoration:none;">sales@devly.info</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:Inter,Helvetica,Arial,sans-serif;font-size:12px;color:#98a2b3;">
          You’re only hearing from us about this project — not a newsletter.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  return html;
}

export function welcomeEmailSubject(name: string) {
  const first = name.split(' ')[0] || 'there';
  return `Let's build your website, ${first}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
