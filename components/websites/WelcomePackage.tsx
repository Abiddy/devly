'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ShaderBackground } from '@/components/ui/kk';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';

const work = [
  {
    name: 'Lens',
    tag: 'Hardware verification',
    blurb: 'A dark, data-led product site — logos, process, and a founder voice that sells trust to serious teams.',
    image: '/welcome/lens.png',
  },
  {
    name: 'Freeland Family Farms',
    tag: 'Farm retail',
    blurb: 'A painted world and a clear shop path — local, premium, and easy to buy from.',
    image: '/welcome/freeland.png',
  },
  {
    name: 'Devly',
    tag: 'Creator partnerships',
    blurb: 'A brand-side offer: match creators to KPIs, not vanity metrics.',
    image: '/welcome/devly-kpis.png',
  },
  {
    name: 'Paradise Worldwide',
    tag: 'E-bike rentals',
    blurb: 'Quiet luxury for a coastal fleet — the bike, the ride, the booking path.',
    image: '/welcome/paradise.png',
  },
  {
    name: 'Pacific',
    tag: 'Auto body',
    blurb: 'Craft-first story that turns damage into trust — and estimate requests.',
    image: '/website-assets/work-pacific.png',
  },
];

const steps = [
  { n: '01', title: 'Call', body: 'Goals, audience, timeline, constraints.' },
  { n: '02', title: 'Proposal', body: 'Clear options and investment before kickoff.' },
  { n: '03', title: 'Build', body: 'Design and development with focused revisions.' },
  { n: '04', title: 'Launch', body: 'QA, handoff, and support — you’re not left guessing.' },
];

const needs = [
  'What you sell and who you sell to',
  'Brand assets if you have them — or we start clean',
  'Sites you respect, and ones you don’t',
  'A decision-maker available for feedback',
];

export function WelcomePackage() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (!entered) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prev || '';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [entered]);

  return (
    <div className="relative min-h-screen bg-[#070b16] text-white">
      {!entered ? (
        <Cover onEnter={() => setEntered(true)} />
      ) : (
        <PackageScroll />
      )}
    </div>
  );
}

function Cover({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <ShaderBackground className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <p className="text-[16px] font-bold tracking-[-0.04em] sm:text-[19px]">
          Devly
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 sm:text-[11px]">
          Welcome package
        </p>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-20 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 sm:text-[12px]">
          Prepared for you
        </p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2rem,8vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.045em]">
          Here&apos;s your{' '}
          <em className="font-display italic font-medium text-[#d6f4ff]">
            welcome package
          </em>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/70 sm:mt-5 sm:text-[16px]">
          A short look at the work, how a project runs, and what happens next.
          No pitch deck. No obligation.
        </p>
        <button
          type="button"
          onClick={onEnter}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[13px] font-semibold text-[#0a2433] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)] transition hover:-translate-y-0.5 hover:bg-white/90 sm:mt-10 sm:px-9 sm:py-3.5 sm:text-[14px]"
        >
          Enter
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function PackageScroll() {
  return (
    <div className="bg-[#070b16]">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-[#070b16]/75 px-4 backdrop-blur-xl sm:h-16 sm:px-8">
        <Link
          href="/"
          className="text-[16px] font-bold tracking-[-0.04em] text-white sm:text-[18px]"
        >
          Devly
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={CALENDLY_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-white/70 hover:text-white sm:text-[13px]"
          >
            Book a call
          </a>
          <Link
            href="/inquire"
            className="inline-flex rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0a2433] sm:px-4 sm:py-2 sm:text-[13px]"
          >
            Get a quote
          </Link>
        </div>
      </header>

      {work.map((item) => (
        <section
          key={item.name}
          className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority={item.name === 'Lens'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25" />
          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-10 sm:px-10 sm:pb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65 sm:text-[11px]">
              {item.tag}
            </p>
            <h2 className="mt-2 text-[clamp(1.7rem,5vw,3.1rem)] font-bold tracking-[-0.04em] text-white">
              {item.name}
            </h2>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/75 sm:text-[16px]">
              {item.blurb}
            </p>
          </div>
        </section>
      ))}

      <section className="bg-[#f3f5fa] px-4 py-16 text-[#15205f] sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7a849f] sm:text-[12px]">
            The offer
          </p>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.7rem,4.6vw,3rem)] font-bold tracking-[-0.04em] text-[#152868]">
            We design and develop{' '}
            <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
              really good
            </em>{' '}
            websites.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="rounded-[22px] border border-[#e2e8f5] bg-white p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a849f]">
                01 — What we do
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5c688f] sm:text-[16px]">
                Custom sites for founders and local businesses that need leads —
                clear story, sharp design, forms and booking wired. Not a
                template with your logo slapped on.
              </p>
            </article>
            <article className="rounded-[22px] border border-[#e2e8f5] bg-white p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a849f]">
                02 — Who this is for
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5c688f] sm:text-[16px]">
                Service businesses and founder-led brands that have outgrown DIY
                builders. You want something that feels as serious as the work
                behind it — and a partner who can decide fast.
              </p>
            </article>
          </div>

          <div className="mt-4 rounded-[22px] border border-[#e2e8f5] bg-white p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a849f]">
              03 — How a project runs
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {steps.map((step) => (
                <div
                  key={step.n}
                  className="rounded-[16px] bg-[#f6f7fc] px-3 py-4 sm:px-4 sm:py-5"
                >
                  <p className="font-[family-name:var(--font-studio-display)] text-[1.15rem] italic leading-none text-[#152868]/30 sm:text-[1.5rem]">
                    {step.n}
                  </p>
                  <p className="mt-2 text-[13px] font-bold text-[#152868] sm:text-[15px]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-[#667085] sm:text-[13px]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-[22px] border border-[#e2e8f5] bg-white p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a849f]">
                04 — How pricing works
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5c688f] sm:text-[16px]">
                No checkout button on the internet. You book a call or send an
                inquiry. If we&apos;re a fit, you get a custom proposal with
                options you can actually choose from — before any work starts.
              </p>
            </article>
            <article className="rounded-[22px] border border-[#e2e8f5] bg-white p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a849f]">
                05 — What we need from you
              </p>
              <ul className="mt-3 space-y-2">
                {needs.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[14px] leading-relaxed text-[#5c688f] sm:text-[15px]"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#152868]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 py-16 text-center sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <ShaderBackground className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="relative mx-auto max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 sm:text-[12px]">
            Next step
          </p>
          <h2 className="mt-3 text-[clamp(1.7rem,5vw,2.85rem)] font-bold tracking-[-0.04em]">
            Get a quote.{' '}
            <em className="font-display italic font-medium text-[#d6f4ff]">
              No pressure.
            </em>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-white/70 sm:text-[16px]">
            Book a short call or send an inquiry. We&apos;ll follow up within
            1–2 business days if we&apos;re a fit — with a custom proposal, not
            a generic price list.
          </p>
          <div className="mt-7 flex flex-row items-center justify-center gap-2 sm:gap-3">
            <Link
              href="/inquire"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#0a2433] sm:px-7 sm:py-3.5 sm:text-[14px]"
            >
              Send an inquiry
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={CALENDLY_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[12px] font-semibold text-white backdrop-blur-sm sm:px-7 sm:py-3.5 sm:text-[14px]"
            >
              Book a call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
