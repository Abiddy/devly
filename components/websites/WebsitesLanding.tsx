'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  Layers3,
  Sparkles,
  User,
} from 'lucide-react';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';

const projects = [
  {
    name: 'Pacific',
    tag: 'Auto body',
    blurb: 'Craft-first story that turns damage into trust — and estimate requests.',
    image: '/website-assets/work-pacific.png',
  },
  {
    name: 'BDL',
    tag: 'Clinical',
    blurb: 'Clear testing info with a calm path for patients to get started.',
    image: '/website-assets/work-bdl.png',
  },
  {
    name: 'Freeland Family Farms',
    tag: 'Farm retail',
    blurb: 'Warm brand story with a direct shop CTA that feels local and premium.',
    image: '/website-assets/work-freeland.png',
  },
  {
    name: 'Value4Casa',
    tag: 'Real estate',
    blurb: 'Trust-led team presence and clear contact paths for serious inquiries.',
    image: '/website-assets/work-value4casa.png',
  },
];

const stats = [
  {
    value: '10+',
    label: 'Business sites shipped',
    detail: 'Real operators, not concept decks',
    icon: Layers3,
  },
  {
    value: '2–4',
    unit: 'wks',
    label: 'Typical delivery',
    detail: 'Focused scope, clear milestones',
    icon: Clock3,
  },
  {
    value: '1:1',
    label: 'Founder-led builds',
    detail: 'You work directly with the Developer',
    icon: User,
  },
  {
    value: '3×',
    label: 'Revision cycles',
    detail: 'Included so the final cut is tight',
    icon: Sparkles,
  },
];

const faqs = [
  {
    q: 'What’s your process, and how do revisions work?',
    a: 'Strategy and design, then custom build, then launch. You get focused feedback windows and three revision cycles. Bigger direction changes after approval are scoped before we continue.',
  },
  {
    q: 'What should I budget?',
    a: 'We don’t publish a one-size number because scope drives cost. On a short call we map goals, pages, and integrations, then send a clear proposal with options — before any build starts.',
  },
  {
    q: 'How long does a project take?',
    a: 'Most focused sites land in about 2–4 weeks once content and feedback are moving. Lean landing pages can be faster; multi-page or custom flows take longer.',
  },
  {
    q: 'What makes Devly different?',
    a: 'You work directly with the founder. No template farms, no handoff roulette. We optimize for leads and clarity — forms, booking, and messaging that help someone take the next step.',
  },
  {
    q: 'Why not Squarespace / Wix / Webflow?',
    a: 'Builders are fine for many people. If you want something that doesn’t look like everyone else’s site — and is wired to convert — we build it custom around your offer.',
  },
];

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f5]/70 bg-white/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/websites"
          className="text-[19px] font-extrabold tracking-[-0.04em] text-[#152868]"
        >
          Devly
        </Link>
        <nav className="hidden items-center gap-0.5 rounded-full border border-[#e2e8f5] bg-[#f4f6fb]/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:flex">
          {[
            { href: '#work', label: 'Work' },
            { href: '#process', label: 'Process' },
            { href: '/websites/pricing', label: 'Pricing', link: true },
            { href: '#faq', label: 'FAQ' },
          ].map((item) =>
            item.link ? (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-[#46548a] transition-colors hover:bg-white hover:text-[#152868]"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-[#46548a] transition-colors hover:bg-white hover:text-[#152868]"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={CALENDLY_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[13px] font-semibold text-[#46548a] transition-colors hover:text-[#152868] sm:inline"
          >
            Book a call
          </a>
          <Link
            href="/websites/inquire"
            className="inline-flex items-center rounded-full bg-[#152868] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_28px_-10px_rgba(21,40,104,0.65)] transition hover:bg-[#0f1d52]"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}

function AcceptingStamp() {
  const label = 'ACCEPTING NOW • ACCEPTING NOW • ';
  return (
    <span
      className="relative ml-1.5 inline-flex h-[4.35rem] w-[4.35rem] shrink-0 translate-y-1 items-center justify-center rounded-full bg-[#ffe566] align-middle shadow-[0_10px_24px_-12px_rgba(245,196,0,0.7)] sm:ml-2 sm:h-[5.15rem] sm:w-[5.15rem] sm:translate-y-1.5"
      aria-label="Accepting now"
    >
      <svg
        viewBox="0 0 100 100"
        className="h-[92%] w-[92%] animate-[spin_14s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path
            id="accepting-now-path"
            d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"
          />
        </defs>
        <text fill="#152868" fontSize="8.4" fontWeight="800" letterSpacing="1.6">
          <textPath href="#accepting-now-path">{label}</textPath>
        </text>
      </svg>
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[20px] border border-[#e2e8f5] bg-white/90 px-5 shadow-[0_1px_0_rgba(21,40,104,0.03)] transition-shadow hover:shadow-[0_16px_40px_-28px_rgba(21,40,104,0.28)] sm:px-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold tracking-[-0.015em] text-[#15205f] sm:text-[16px]">
          {q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e2e8f5] bg-[#f4f6fb] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <ChevronDown className="h-4 w-4 text-[#152868]" />
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[14px] leading-relaxed text-[#667085] sm:text-[15px]">
          {a}
        </p>
      )}
    </div>
  );
}

export function WebsitesLanding() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f3f5fa] text-[#15205f]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[780px] bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,_rgba(21,40,104,0.11),_transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-48 h-80 w-80 rounded-full bg-[#8fa3ff]/18 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-80 h-96 w-96 rounded-full bg-[#a8c0ff]/14 blur-3xl"
      />

      <Nav />

      {/* Hero */}
      <section className="relative mx-auto max-w-4xl px-5 pb-12 pt-16 text-center sm:px-8 sm:pb-16 sm:pt-24">
        <h1 className="text-[clamp(2.75rem,7.2vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#152868]">
          We design and develop
          <AcceptingStamp />{' '}
          <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic tracking-[-0.02em] text-[#2a3fb8]">
            really good
          </em>{' '}
          websites.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] font-medium leading-[1.7] text-[#5c688f] sm:text-[18px]">
          Custom design. Custom development. Built for founders and local
          businesses that need leads — not another template that looks like
          everyone else.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={CALENDLY_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#152868] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_16px_40px_-14px_rgba(21,40,104,0.6)] transition hover:-translate-y-0.5 hover:bg-[#0f1d52]"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/websites/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-[#d2daf0] bg-white/95 px-8 py-3.5 text-[14px] font-semibold text-[#152868] shadow-[0_8px_24px_-18px_rgba(21,40,104,0.35)] transition hover:-translate-y-0.5 hover:border-[#152868]/25"
          >
            How pricing works
          </Link>
        </div>
      </section>

      {/* Stats — premium card stage */}
      <section className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="rounded-[28px] border border-white/80 bg-gradient-to-b from-white/90 to-white/55 p-3 shadow-[0_30px_80px_-40px_rgba(21,40,104,0.45)] backdrop-blur-xl sm:rounded-[32px] sm:p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <article
                  key={stat.label}
                  className="group relative overflow-hidden rounded-[22px] border border-[#e6ebf7] bg-white p-6 shadow-[0_1px_0_rgba(21,40,104,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#c5d0f0] hover:shadow-[0_24px_48px_-28px_rgba(21,40,104,0.4)]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(42,63,184,0.07),_transparent_55%)] opacity-0 transition group-hover:opacity-100"
                  />
                  <div className="relative flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef1fb] text-[#152868] ring-1 ring-[#dce3f5] transition duration-300 group-hover:bg-[#152868] group-hover:text-white group-hover:ring-[#152868]">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#a8b6e8] transition group-hover:bg-[#152868]" />
                  </div>
                  <p className="relative mt-6 font-[family-name:var(--font-studio-display)] text-[2.65rem] leading-none tracking-[-0.02em] text-[#152868] sm:text-[2.85rem]">
                    {stat.value}
                    {stat.unit ? (
                      <span className="ml-1.5 font-[family-name:var(--font-studio)] text-[0.95rem] font-bold tracking-[-0.02em] text-[#6b7799]">
                        {stat.unit}
                      </span>
                    ) : null}
                  </p>
                  <p className="relative mt-3 text-[14px] font-bold tracking-[-0.015em] text-[#15205f]">
                    {stat.label}
                  </p>
                  <p className="relative mt-1.5 text-[12.5px] leading-relaxed text-[#7a849f]">
                    {stat.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-[28px] border border-[#e2e8f5] bg-white p-2.5 shadow-[0_32px_64px_-36px_rgba(21,40,104,0.45)]">
          <div className="overflow-hidden rounded-[22px]">
            <Image
              src="/website-assets/work-pacific.png"
              alt="Pacific website"
              width={1200}
              height={750}
              className="h-auto w-full object-cover transition duration-700 hover:scale-[1.03]"
              priority
            />
          </div>
        </div>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
            Featured
          </p>
          <h2 className="mt-3 text-[clamp(1.95rem,4vw,2.85rem)] font-extrabold tracking-[-0.04em] text-[#152868]">
            Beautiful sites that get you{' '}
            <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
              results.
            </em>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5c688f] sm:text-[16px]">
            Strategy, design, and development in one pass — so your site looks
            sharp and actually moves people to book, buy, or inquire.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-[#152868] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#0f1d52]"
            >
              View work
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/websites/inquire"
              className="inline-flex rounded-full border border-[#d2daf0] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#152868] transition hover:bg-[#eef1fb]"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
            Selected work
          </p>
          <h2 className="mt-3 text-[clamp(1.95rem,4vw,2.85rem)] font-extrabold tracking-[-0.04em] text-[#152868]">
            Our work speaks for itself.
          </h2>
          <p className="mt-3 text-[15px] text-[#5c688f]">
            Sites for real businesses — auto body, clinical, farm retail, and
            real estate services.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-[26px] border border-[#e2e8f5] bg-white shadow-[0_20px_48px_-32px_rgba(21,40,104,0.4)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_60px_-28px_rgba(21,40,104,0.45)]"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={900}
                  height={560}
                  className="h-56 w-full object-cover object-top transition duration-700 group-hover:scale-[1.04] sm:h-64"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#152868] shadow-sm backdrop-blur">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-[18px] font-bold tracking-[-0.025em] text-[#15205f]">
                  {p.name}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#667085]">
                  {p.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="rounded-[32px] border border-[#e2e8f5] bg-white p-6 shadow-[0_28px_64px_-40px_rgba(21,40,104,0.4)] sm:p-10">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
            Process
          </p>
          <h2 className="mt-2 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#152868]">
            How we work.
          </h2>
          <p className="mt-3 max-w-xl text-[15px] text-[#5c688f]">
            Every phase is custom. No generic templates handed over as “done.”
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Design',
                body: 'Custom mockups around your offer, audience, and goals — not a swapped logo on a theme.',
              },
              {
                step: '02',
                title: 'Development',
                body: 'Clean, fast pages with forms and booking wired so leads don’t die in an empty contact box.',
              },
              {
                step: '03',
                title: 'Launch',
                body: 'QA, launch support, and a clear handoff — plus revision cycles so the final cut is tight.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[22px] border border-[#eef1fb] bg-[#f6f7fc] p-6 transition duration-300 hover:border-[#d2daf0] hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(21,40,104,0.3)]"
              >
                <p className="font-[family-name:var(--font-studio-display)] text-[2.25rem] italic leading-none text-[#152868]/30">
                  {item.step}
                </p>
                <h3 className="mt-4 text-[20px] font-bold tracking-[-0.025em] text-[#15205f]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#667085]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
            About
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#152868]">
            A boutique studio founded by{' '}
            <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
              Nouman Abidi.
            </em>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5c688f]">
            You work directly with me — strategy, design, and build stay aligned
            from first call to launch. I focus on sites that earn trust quickly
            and push real action: inquire, book, buy.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5c688f]">
            Best fit: local service businesses and founder-led brands that have
            outgrown DIY builders and need a site that feels as serious as the
            work behind it.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { v: 'Founder-led', l: 'every project' },
              { v: '2–4 wks', l: 'typical timeline' },
              { v: 'Call-first', l: 'custom proposals' },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-[#e2e8f5] bg-white px-3 py-4 text-center shadow-[0_10px_28px_-22px_rgba(21,40,104,0.35)]"
              >
                <p className="text-[13px] font-bold tracking-[-0.02em] text-[#152868] sm:text-[14px]">
                  {s.v}
                </p>
                <p className="mt-1 text-[11px] text-[#7a849f]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
          <Image
            src="/website-assets/nouman-portrait.png"
            alt="Nouman Abidi"
            width={900}
            height={900}
            className="h-auto w-full object-contain"
            priority={false}
          />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
              FAQ
            </p>
            <h2 className="mt-3 text-[clamp(1.95rem,4vw,2.7rem)] font-extrabold tracking-[-0.04em] text-[#152868]">
              Questions,{' '}
              <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
                answered.
              </em>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#152868] px-6 py-16 text-center text-white shadow-[0_36px_80px_-32px_rgba(21,40,104,0.7)] sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-[#6b82e8]/35 blur-3xl"
          />
          <p className="relative text-[12px] font-bold uppercase tracking-[0.2em] text-white/55">
            Next step
          </p>
          <h2 className="relative mt-3 text-[clamp(1.95rem,4vw,2.85rem)] font-extrabold tracking-[-0.04em]">
            Get a quote. No pressure.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
            Share what you&apos;re building — or book a quick call. We&apos;ll
            send a clear number back. No pitch deck, no obligation.
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/websites/inquire"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#152868] transition hover:bg-[#f3f5ff]"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={CALENDLY_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/30 px-7 py-3.5 text-[14px] font-semibold text-white transition hover:bg-white/10"
            >
              Book a call
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e8f5] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-[18px] font-extrabold tracking-[-0.04em] text-[#152868]">
            Devly
          </p>
          <div className="flex flex-wrap gap-5 text-[13px] font-semibold text-[#46548a]">
            <a href="#work" className="hover:text-[#152868]">
              Work
            </a>
            <a href="#process" className="hover:text-[#152868]">
              Process
            </a>
            <Link href="/websites/pricing" className="hover:text-[#152868]">
              Pricing
            </Link>
            <Link href="/websites/inquire" className="hover:text-[#152868]">
              Get a quote
            </Link>
            <a href="mailto:sales@devly.info" className="hover:text-[#152868]">
              Contact
            </a>
          </div>
        </div>
        <div className="border-t border-[#e2e8f5] py-4 text-center text-[12px] text-[#98a2b3]">
          © {new Date().getFullYear()} Devly. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
