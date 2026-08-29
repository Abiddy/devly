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
    body: 'Devly builds custom websites for founders and local businesses that need leads — clear story, sharp design, forms and booking wired. Not a template with your logo slapped on.',
  },
  {
    label: '02',
    title: 'Who this is for',
    body: 'Service businesses and founder-led brands that have outgrown DIY builders. You want something that feels as serious as your work — and a partner who can decide fast.',
  },
  {
    label: '03',
    title: 'How a project runs',
    steps: [
      'Call — goals, audience, timeline, constraints.',
      'Proposal — clear options and investment before kickoff.',
      'Build — design + development with focused revision cycles.',
      'Launch — QA, handoff, and support so you’re not left guessing.',
    ],
  },
  {
    label: '04',
    title: 'How pricing works',
    body: 'We don’t put a checkout button on the internet and hope for the best. You book a call or send an inquiry. If we’re a fit, you get a custom proposal with options you can actually choose from.',
  },
  {
    label: '05',
    title: 'What we need from you',
    bullets: [
      'What you sell and who you sell to',
      'Brand assets if you have them (or we start clean)',
      'Sites you respect — and ones you don’t',
      'A decision-maker available for feedback windows',
    ],
  },
];

export function WelcomePackage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f3f5fa] text-[#15205f]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,_rgba(21,40,104,0.1),_transparent_55%)]"
      />
      <header className="relative border-b border-[#e2e8f5]/70 bg-white/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[4.25rem] max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="text-[19px] font-bold tracking-[-0.04em] text-[#152868]"
          >
            Devly
          </Link>
          <Link
            href="/inquire"
            className="rounded-full bg-[#152868] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0f1d52]"
          >
            Get a quote
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
          Welcome package
        </p>
        <h1 className="mt-3 text-[clamp(2.1rem,5vw,3.15rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#152868]">
          We design and develop{' '}
          <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
            really good
          </em>{' '}
          websites.
        </h1>
        <p className="mt-4 text-[17px] font-medium text-[#5c688f]">
          Custom design. Custom development. Pricing discussed on a call — then
          locked in a clear proposal.
        </p>

        <div className="mt-12 space-y-5 border-t border-[#e2e8f5] pt-10">
          {sections.map((section) => (
            <section
              key={section.label}
              className="rounded-[22px] border border-[#e2e8f5] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(21,40,104,0.3)] sm:p-7"
            >
              <p className="font-[family-name:var(--font-studio-display)] text-[1.75rem] italic leading-none text-[#152868]/30">
                {section.label}
              </p>
              <h2 className="mt-3 text-[1.35rem] font-bold tracking-[-0.03em] text-[#15205f]">
                {section.title}
              </h2>
              {section.body && (
                <p className="mt-3 text-[15px] leading-relaxed text-[#667085]">
                  {section.body}
                </p>
              )}
              {section.steps && (
                <ol className="mt-4 space-y-2">
                  {section.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-[15px] text-[#667085]">
                      <span className="font-bold text-[#152868]">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {section.bullets && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] text-[#667085]">
                      <span className="text-[#152868]">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-8 overflow-hidden rounded-[28px] bg-[#152868] p-7 text-white shadow-[0_28px_64px_-32px_rgba(21,40,104,0.55)] sm:p-9">
          <h2 className="text-[1.55rem] font-bold tracking-[-0.03em]">
            Next step
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            Book a short call or send an inquiry. We’ll follow up within 1–2
            business days if we’re a fit — with a custom proposal, not a generic
            price list.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={CALENDLY_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-[#152868] hover:bg-[#f3f5ff]"
            >
              Book a call
            </a>
            <Link
              href="/inquire"
              className="inline-flex justify-center rounded-full border border-white/30 px-5 py-3 text-[13px] font-semibold text-white hover:bg-white/10"
            >
              Send an inquiry
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
