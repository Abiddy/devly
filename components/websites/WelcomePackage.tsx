'use client';

import Link from 'next/link';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';

type Section = {
  label: string;
  title: string;
  body?: string;
  steps?: string[];
  bullets?: string[];
};

const sections: Section[] = [
  {
    label: '01',
    title: 'What we actually do',
    body: 'Devly builds lead-focused websites for founders and operators who need a site that works while they work. Not a brochure. Not a vanity redesign. A clear story, a sharp layout, and a path to booked calls.',
  },
  {
    label: '02',
    title: 'Who this is for',
    body: 'You are actively investing in getting customers — not collecting Dribbble shots. You want one strong landing page (or a focused site), forms/booking wired up, and a partner who can decide fast.',
  },
  {
    label: '03',
    title: 'How a project runs',
    steps: [
      'Consult — 15 minutes. Goals, audience, timeline, constraints.',
      'Scope — We confirm package (Launch or Custom) and kickoff inputs.',
      'Build — Design + development in one pass. Three revision cycles included.',
      'Launch — Forms, booking, handoff, and 30 days of bug-fix coverage.',
    ],
  },
  {
    label: '04',
    title: 'What you walk away with',
    bullets: [
      'Custom landing page — designed and shipped',
      'Forms & booking connected (leads go somewhere useful)',
      'Consultations so your ideas shape the build',
      'Three revision cycles',
      'Launch support + 30-day bug fixes',
      'Optional: 10-year maintenance add-on ($30/yr prepaid)',
    ],
  },
  {
    label: '05',
    title: 'Clear pricing',
    body: 'Launch package starts at $699 (site) or $999 with 10-year maintenance. Need more pages or deeper product work? That’s Custom — we scope it on a call, no mystery invoices.',
  },
  {
    label: '06',
    title: 'What we need from you',
    bullets: [
      'Business name, offer, and who you sell to',
      'Any brand assets (logo, colors, fonts) — or we start clean',
      'Examples of sites you respect (and ones you hate)',
      'Decision-maker available for feedback inside revision windows',
    ],
  },
];

export function WelcomePackage() {
  return (
    <div className="websites min-h-screen bg-[#410C01] text-white">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6 sm:px-8">
        <Link
          href="/websites"
          className="font-inter text-[12px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
        >
          Devly
        </Link>
        <Link
          href="/websites/inquire"
          className="font-inter rounded-md bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90"
        >
          Start inquiry
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 sm:px-8">
        <p className="font-inter text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
          Welcome package
        </p>
        <h1 className="font-arsenica mt-4 text-4xl leading-[1.1] tracking-wide sm:text-6xl">
          We design and build websites that bring you leads.
        </h1>
        <p className="font-arsenica mt-6 text-lg text-white/80 sm:text-xl">
          Custom design. Clear process. No guessing what happens next.
        </p>
        <p className="font-inter mt-6 max-w-xl text-sm leading-relaxed text-white/55">
          Thanks for reaching out. This package explains how we work, what you
          get, and whether we&apos;re the right fit — so our first call is useful,
          not a sales monologue.
        </p>

        <div className="mt-14 space-y-14 border-t border-white/15 pt-14">
          {sections.map((section) => (
            <section key={section.label}>
              <p className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
                {section.label}
              </p>
              <h2 className="font-arsenica mt-2 text-2xl tracking-wide sm:text-3xl">
                {section.title}
              </h2>
              {section.body && (
                <p className="font-inter mt-4 text-[15px] leading-relaxed text-white/65">
                  {section.body}
                </p>
              )}
              {section.steps && (
                <ol className="mt-5 space-y-3">
                  {section.steps.map((step, i) => (
                    <li
                      key={step}
                      className="font-inter flex gap-3 text-[15px] leading-relaxed text-white/65"
                    >
                      <span className="shrink-0 text-white/40">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {section.bullets && (
                <ul className="mt-5 space-y-2.5">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="font-inter flex gap-3 text-[15px] leading-relaxed text-white/65"
                    >
                      <span className="text-white/40">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-16 border-t border-white/15 pt-14">
          <h2 className="font-arsenica text-2xl tracking-wide sm:text-3xl">
            Next step
          </h2>
          <p className="font-inter mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
            If this feels like a fit, book a short call or send an inquiry. We
            review every request and follow up within 1–2 business days with
            clear next steps.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CALENDLY_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter inline-flex items-center justify-center rounded-md bg-white px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
            >
              Book a call
            </a>
            <Link
              href="/websites/pricing"
              className="font-inter inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              See pricing
            </Link>
          </div>
        </section>

        <p className="font-inter mt-16 text-xs text-white/40">
          Devly · sales@devly.info · work.devly.info/websites
        </p>
      </main>
    </div>
  );
}
