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
import { ShaderBackground } from '@/components/ui/kk';
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
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:h-[4.25rem] sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-[16px] font-bold tracking-[-0.04em] text-white sm:text-[19px]"
        >
          Devly
        </Link>
        <nav className="hidden items-center gap-0.5 rounded-full border border-white/15 bg-white/10 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md md:flex">
          {[
            { href: '#work', label: 'Work' },
            { href: '#process', label: 'Process' },
            { href: '/pricing', label: 'Pricing', link: true },
            { href: '#faq', label: 'FAQ' },
          ].map((item) =>
            item.link ? (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-white/75 transition-colors hover:bg-white/15 hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-white/75 transition-colors hover:bg-white/15 hover:text-white"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={CALENDLY_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-white/75 transition-colors hover:text-white sm:text-[13px]"
          >
            Book a call
          </a>
          <Link
            href="/inquire"
            className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0a2433] shadow-[0_10px_28px_-10px_rgba(0,0,0,0.35)] transition hover:bg-white/90 sm:px-4 sm:py-2.5 sm:text-[13px]"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}

function MeshBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <ShaderBackground className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/20" />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[16px] border border-[#e2e8f5] bg-white/90 px-3.5 shadow-[0_1px_0_rgba(21,40,104,0.03)] transition-shadow hover:shadow-[0_16px_40px_-28px_rgba(21,40,104,0.28)] sm:rounded-[20px] sm:px-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 py-3.5 text-left sm:gap-4 sm:py-5"
        aria-expanded={open}
      >
        <span className="text-[13px] font-semibold tracking-[-0.015em] text-[#15205f] sm:text-[16px]">
          {q}
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#e2e8f5] bg-[#f4f6fb] transition-transform duration-300 sm:h-8 sm:w-8 ${open ? 'rotate-180' : ''}`}
        >
          <ChevronDown className="h-3.5 w-3.5 text-[#152868] sm:h-4 sm:w-4" />
        </span>
      </button>
      {open && (
        <p className="pb-3.5 text-[12.5px] leading-relaxed text-[#667085] sm:pb-5 sm:text-[15px]">
          {a}
        </p>
      )}
    </div>
  );
}

export function WebsitesLanding() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f3f5fa] text-[#15205f]">
      <Nav />
      <div className="relative isolate -mt-14 overflow-hidden pt-14 sm:-mt-[4.25rem] sm:pt-[4.25rem]">
        <MeshBackdrop />

        {/* Hero */}
        <section className="relative z-10 mx-auto max-w-4xl px-4 pb-8 pt-8 text-center sm:px-8 sm:pb-16 sm:pt-24">
          <h1 className="text-[clamp(1.7rem,7.4vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.05em] text-white">
            We make you look{' '}
            <em className="font-display italic font-medium tracking-[-0.01em] text-[#d6f4ff]">
              premium.
            </em>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-[1.55] text-white/75 sm:mt-6 sm:text-[18px] sm:leading-[1.7]">
            You work directly with the founder. No template farms, no handoff
            roulette. We optimize for leads and clarity — forms, booking, and
            messaging that help someone take the next step.
          </p>
          <div className="mt-5 flex flex-row items-center justify-center gap-2 sm:mt-10 sm:gap-3">
            <Link
              href="/inquire"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[11.5px] font-semibold text-[#0a2433] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5 hover:bg-white/90 sm:gap-2 sm:px-8 sm:py-3.5 sm:text-[14px]"
            >
              Get Quote
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[11.5px] font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/16 sm:gap-2 sm:px-8 sm:py-3.5 sm:text-[14px]"
            >
              How pricing works
            </Link>
          </div>
        </section>

        {/* Stats — premium card stage */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-8 sm:pb-28">
        <div className="rounded-[18px] border border-white/80 bg-gradient-to-b from-white/90 to-white/55 p-1.5 shadow-[0_30px_80px_-40px_rgba(21,40,104,0.45)] backdrop-blur-xl sm:rounded-[32px] sm:p-4">
          <div className="grid grid-cols-4 gap-1 sm:gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <article
                  key={stat.label}
                  className="group relative overflow-hidden rounded-[12px] border border-[#e6ebf7] bg-white px-1.5 py-2.5 shadow-[0_1px_0_rgba(21,40,104,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#c5d0f0] hover:shadow-[0_24px_48px_-28px_rgba(21,40,104,0.4)] md:rounded-[22px] md:p-6"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(42,63,184,0.07),_transparent_55%)] opacity-0 transition group-hover:opacity-100"
                  />
                  <div className="relative hidden items-start justify-between md:flex">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef1fb] text-[#152868] ring-1 ring-[#dce3f5] transition duration-300 group-hover:bg-[#152868] group-hover:text-white group-hover:ring-[#152868]">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#a8b6e8] transition group-hover:bg-[#152868]" />
                  </div>
                  <p className="relative text-center font-[family-name:var(--font-studio-display)] text-[1.15rem] leading-none tracking-[-0.02em] text-[#152868] md:mt-6 md:text-left md:text-[2.85rem]">
                    {stat.value}
                    {stat.unit ? (
                      <span className="ml-0.5 font-[family-name:var(--font-studio)] text-[0.55rem] font-bold tracking-[-0.02em] text-[#6b7799] md:ml-1.5 md:text-[0.95rem]">
                        {stat.unit}
                      </span>
                    ) : null}
                  </p>
                  <p className="relative mt-1 text-center text-[8.5px] font-bold leading-[1.2] tracking-[-0.015em] text-[#15205f] md:mt-3 md:text-left md:text-[14px] md:leading-normal">
                    {stat.label}
                  </p>
                  <p className="relative mt-1.5 hidden text-[12.5px] leading-relaxed text-[#7a849f] md:block">
                    {stat.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      </div>

      {/* Featured */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 pb-12 pt-12 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-[20px] border border-[#e2e8f5] bg-white p-1.5 shadow-[0_32px_64px_-36px_rgba(21,40,104,0.45)] sm:rounded-[28px] sm:p-2.5">
          <div className="overflow-hidden rounded-[16px] sm:rounded-[22px]">
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
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7a849f] sm:text-[12px]">
            Featured
          </p>
          <h2 className="mt-2 text-[clamp(1.35rem,5.4vw,2.85rem)] font-bold tracking-[-0.04em] text-[#152868] sm:mt-3">
            Beautiful sites that get you{' '}
            <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
              results.
            </em>
          </h2>
          <p className="mt-2.5 text-[13px] leading-relaxed text-[#5c688f] sm:mt-4 sm:text-[16px]">
            Strategy, design, and development in one pass — so your site looks
            sharp and actually moves people to book, buy, or inquire.
          </p>
          <div className="mt-5 flex flex-row flex-wrap gap-2 sm:mt-8 sm:gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#152868] px-3.5 py-1.5 text-[11.5px] font-semibold text-white transition hover:bg-[#0f1d52] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[13px]"
            >
              View work
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </a>
            <Link
              href="/inquire"
              className="inline-flex rounded-full border border-[#d2daf0] bg-white px-3.5 py-1.5 text-[11.5px] font-semibold text-[#152868] transition hover:bg-[#eef1fb] sm:px-5 sm:py-2.5 sm:text-[13px]"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7a849f] sm:text-[12px]">
            Selected work
          </p>
          <h2 className="mt-2 text-[clamp(1.35rem,5.4vw,2.85rem)] font-bold tracking-[-0.04em] text-[#152868] sm:mt-3">
            Our work speaks for itself.
          </h2>
          <p className="mt-2 text-[13px] text-[#5c688f] sm:mt-3 sm:text-[15px]">
            Sites for real businesses — auto body, clinical, farm retail, and
            real estate services.
          </p>
        </div>
        <div className="mt-7 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-[18px] border border-[#e2e8f5] bg-white shadow-[0_20px_48px_-32px_rgba(21,40,104,0.4)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_60px_-28px_rgba(21,40,104,0.45)] sm:rounded-[26px]"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={900}
                  height={560}
                  className="h-40 w-full object-cover object-top transition duration-700 group-hover:scale-[1.04] sm:h-64"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#152868] shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[11px]">
                  {p.tag}
                </span>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-[15px] font-bold tracking-[-0.025em] text-[#15205f] sm:text-[18px]">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#667085] sm:mt-2 sm:text-[14px]">
                  {p.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-8 sm:pb-24">
        <div className="rounded-[22px] border border-[#e2e8f5] bg-white p-4 shadow-[0_28px_64px_-40px_rgba(21,40,104,0.4)] sm:rounded-[32px] sm:p-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7a849f] sm:text-[12px]">
            Process
          </p>
          <h2 className="mt-1.5 text-[clamp(1.35rem,5.4vw,2.6rem)] font-bold tracking-[-0.04em] text-[#152868] sm:mt-2">
            How we work.
          </h2>
          <p className="mt-2 max-w-xl text-[13px] text-[#5c688f] sm:mt-3 sm:text-[15px]">
            Every phase is custom. No generic templates handed over as “done.”
          </p>
          <div className="mt-5 grid grid-cols-3 gap-1.5 sm:mt-10 sm:gap-4">
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
                className="rounded-[14px] border border-[#eef1fb] bg-[#f6f7fc] p-2.5 transition duration-300 hover:border-[#d2daf0] hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(21,40,104,0.3)] sm:rounded-[22px] sm:p-6"
              >
                <p className="font-[family-name:var(--font-studio-display)] text-[1.05rem] italic leading-none text-[#152868]/30 sm:text-[2.25rem]">
                  {item.step}
                </p>
                <h3 className="mt-2 text-[11px] font-bold tracking-[-0.025em] text-[#15205f] sm:mt-4 sm:text-[20px]">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-4 text-[9.5px] leading-snug text-[#667085] sm:mt-2 sm:line-clamp-none sm:text-[14px] sm:leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-12 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[320px] bg-white sm:max-w-[460px] lg:max-w-none">
            <Image
              src="/website-assets/nouman-portrait.png"
              alt="Mo"
              width={973}
              height={1024}
              className="h-auto w-full bg-white object-contain"
              priority={false}
            />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7a849f] sm:text-[12px]">
              About
            </p>
            <h2 className="mt-2 text-[clamp(1.35rem,5.4vw,2.6rem)] font-bold tracking-[-0.04em] text-[#152868] sm:mt-3">
              Meet the developer
            </h2>
            <p className="mt-2.5 text-[13px] leading-relaxed text-[#5c688f] sm:mt-4 sm:text-[15px]">
              You work directly with me,{' '}
              <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
                Mo
              </em>{' '}
              — strategy, design, and build stay aligned from first call to
              launch. I focus on sites that earn trust quickly and push real
              action: inquire, book, buy.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#5c688f] sm:mt-3 sm:text-[15px]">
              Best fit: local service businesses and founder-led brands that have
              outgrown DIY builders and need a site that feels as serious as the
              work behind it.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-1.5 sm:mt-8 sm:gap-3">
              {[
                { v: 'Founder-led', l: 'every project' },
                { v: '2–4 wks', l: 'typical timeline' },
                { v: 'Call-first', l: 'custom proposals' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-[#eef1f6] bg-[#f7f8fb] px-1.5 py-2.5 text-center sm:rounded-2xl sm:px-3 sm:py-4"
                >
                  <p className="text-[10px] font-bold tracking-[-0.02em] text-[#152868] sm:text-[14px]">
                    {s.v}
                  </p>
                  <p className="mt-0.5 text-[9px] text-[#7a849f] sm:mt-1 sm:text-[11px]">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-8 sm:pb-24 sm:pt-24">
        <div className="grid gap-5 lg:grid-cols-[260px_1fr] lg:gap-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7a849f] sm:text-[12px]">
              FAQ
            </p>
            <h2 className="mt-2 text-[clamp(1.35rem,5.4vw,2.7rem)] font-bold tracking-[-0.04em] text-[#152868] sm:mt-3">
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
      <section className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-8 sm:pb-24">
        <div className="relative isolate overflow-hidden rounded-[22px] px-4 py-10 text-center text-white shadow-[0_36px_80px_-32px_rgba(10,36,51,0.55)] sm:rounded-[32px] sm:px-12 sm:py-16">
          <MeshBackdrop />
          <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 sm:text-[12px]">
            Next step
          </p>
          <h2 className="relative mt-2 text-[clamp(1.35rem,5.4vw,2.85rem)] font-bold tracking-[-0.04em] text-white sm:mt-3">
            Get a quote.{' '}
            <em className="font-display italic font-medium text-[#d6f4ff]">
              No pressure.
            </em>
          </h2>
          <p className="relative mx-auto mt-2.5 max-w-lg text-[13px] leading-relaxed text-white/75 sm:mt-4 sm:text-[15px]">
            Share what you&apos;re building — or book a quick call. We&apos;ll
            send a clear number back. No pitch deck, no obligation.
          </p>
          <div className="relative z-10 mt-5 flex flex-row items-center justify-center gap-2 sm:mt-9 sm:gap-3">
            <Link
              href="/inquire"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[11.5px] font-semibold text-[#0a2433] transition hover:bg-white/90 sm:gap-2 sm:px-7 sm:py-3.5 sm:text-[14px]"
            >
              Get a quote
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
            <a
              href={CALENDLY_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-[11.5px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/16 sm:px-7 sm:py-3.5 sm:text-[14px]"
            >
              Book a call
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e8f5] bg-white">
        <div className="mx-auto flex max-w-6xl flex-row flex-wrap items-center justify-between gap-3 px-4 py-6 sm:gap-6 sm:px-8 sm:py-10">
          <p className="text-[15px] font-bold tracking-[-0.04em] text-[#152868] sm:text-[18px]">
            Devly
          </p>
          <div className="flex flex-wrap gap-3 text-[11px] font-semibold text-[#46548a] sm:gap-5 sm:text-[13px]">
            <a href="#work" className="hover:text-[#152868]">
              Work
            </a>
            <a href="#process" className="hover:text-[#152868]">
              Process
            </a>
            <Link href="/pricing" className="hover:text-[#152868]">
              Pricing
            </Link>
            <Link href="/reviews" className="hover:text-[#152868]">
              Reviews
            </Link>
            <Link href="/inquire" className="hover:text-[#152868]">
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
