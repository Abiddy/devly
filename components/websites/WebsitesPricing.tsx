'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';

const principles = [
  {
    title: 'Quality work beats paid ads.',
    body: 'A sharp site compounds. Referrals and inbound beat burning budget on a weak first impression.',
  },
  {
    title: 'You choose the investment.',
    body: 'We shape scope to your goals and budget — not a mystery menu of upsells mid-project.',
  },
  {
    title: 'Need help deciding?',
    body: 'That’s what the call is for. We’ll say what a smart phase-one looks like — even if it’s smaller than you expected.',
  },
  {
    title: 'We don’t win when you overspend.',
    body: 'Higher budgets buy depth and flexibility, not inflated margins for the same deliverable.',
  },
];

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f5]/70 bg-white/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-[19px] font-extrabold tracking-[-0.04em] text-[#152868]"
        >
          Devly
        </Link>
        <nav className="hidden items-center gap-0.5 rounded-full border border-[#e2e8f5] bg-[#f4f6fb]/90 p-1 md:flex">
          <Link
            href="/#work"
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-[#46548a] hover:bg-white hover:text-[#152868]"
          >
            Work
          </Link>
          <Link
            href="/pricing"
            className="rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-[#152868] shadow-sm"
          >
            Pricing
          </Link>
          <Link
            href="/inquire"
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-[#46548a] hover:bg-white hover:text-[#152868]"
          >
            Get Quote
          </Link>
        </nav>
        <a
          href={CALENDLY_EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#152868] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_28px_-10px_rgba(21,40,104,0.65)] hover:bg-[#0f1d52]"
        >
          <CalendarDays className="h-3.5 w-3.5" />
          Book a call
        </a>
      </div>
    </header>
  );
}

export function WebsitesPricing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f3f5fa] text-[#15205f]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,_rgba(21,40,104,0.1),_transparent_55%)]"
      />
      <Nav />

      <section className="relative mx-auto max-w-3xl px-5 pb-12 pt-16 text-center sm:px-8 sm:pt-20">
        <h1 className="text-[clamp(2.5rem,6vw,3.85rem)] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#152868]">
          How much does a website{' '}
          <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
            cost?
          </em>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[16px] font-medium leading-relaxed text-[#5c688f] sm:text-[18px]">
          You choose how much to invest. We provide the maximum we can within
          your budget — then put it in a clear proposal after we talk.
        </p>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="rounded-[32px] border border-[#e2e8f5] bg-white p-6 shadow-[0_28px_64px_-40px_rgba(21,40,104,0.4)] sm:p-10">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
            Pricing philosophy
          </p>
          <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.2rem)] font-extrabold tracking-[-0.035em] text-[#152868]">
            Our pricing philosophy.
          </h2>
          <p className="mt-2 max-w-xl text-[15px] text-[#5c688f]">
            No matter your budget, we aim for maximum value — not maximum invoice
            padding.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="group rounded-[22px] border border-[#eef1fb] bg-[#f6f7fc] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d2daf0] hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(21,40,104,0.35)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[13px] font-extrabold text-[#152868] shadow-sm ring-1 ring-[#e2e8f5] transition group-hover:bg-[#152868] group-hover:text-white group-hover:ring-[#152868]">
                  0{i + 1}
                </div>
                <h3 className="mt-4 text-[15px] font-bold leading-snug tracking-[-0.015em] text-[#15205f]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#667085]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#152868]">
            A website is an{' '}
            <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
              investment.
            </em>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5c688f]">
            The most expensive build is usually not the best build. The best
            build solves the right problem — traffic that turns into inquiries,
            trust in the first three seconds, a booking path that actually works.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#d2daf0] bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#152868] shadow-sm">
              No hidden fees
            </span>
            <span className="rounded-full border border-[#d2daf0] bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#152868] shadow-sm">
              Outcome-based proposals
            </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-[#e2e8f5] bg-white p-2.5 shadow-[0_28px_56px_-32px_rgba(21,40,104,0.45)]">
          <div className="overflow-hidden rounded-[22px]">
            <Image
              src="/website-assets/work-bdl.png"
              alt="Example client website"
              width={900}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#152868] px-6 py-14 text-center text-white shadow-[0_36px_80px_-32px_rgba(21,40,104,0.7)] sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          />
          <p className="relative text-[12px] font-bold uppercase tracking-[0.2em] text-white/55">
            Next step
          </p>
          <h2 className="relative mt-3 text-[clamp(1.95rem,4vw,2.85rem)] font-extrabold tracking-[-0.04em]">
            Get your custom proposal now.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
            Tell us your goals, timeline, and budget range. We’ll map the
            smartest path forward — with clear options you can actually decide
            on.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#152868] hover:bg-[#f3f5ff]"
            >
              Book a call
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/inquire"
              className="inline-flex rounded-full border border-white/30 px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-white/10"
            >
              Send an inquiry
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e8f5] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-[18px] font-extrabold tracking-[-0.04em] text-[#152868]">
            Devly
          </p>
          <div className="flex flex-wrap gap-5 text-[13px] font-semibold text-[#46548a]">
            <Link href="/#work">Work</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/inquire">Get Quote</Link>
            <a href="mailto:sales@devly.info">Contact</a>
          </div>
        </div>
        <div className="border-t border-[#e2e8f5] py-4 text-center text-[12px] text-[#98a2b3]">
          © {new Date().getFullYear()} Devly. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
