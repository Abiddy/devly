import { InquiryForm } from '@/components/websites/InquiryForm';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';

export const metadata: Metadata = {
  title: 'Devly — Get a quote',
  description:
    'Answer a few questions. Get the Devly Welcome Package instantly, then a custom proposal if we’re a fit.',
};

export default function InquirePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f3f5fa] text-[#15205f]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,_rgba(21,40,104,0.11),_transparent_60%)]"
      />
      <header className="relative w-full bg-transparent">
        <div className="flex h-[4.25rem] w-full items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-[19px] font-bold tracking-[-0.04em] text-[#152868]"
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
              className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-[#46548a] hover:bg-white hover:text-[#152868]"
            >
              Pricing
            </Link>
            <Link
              href="/inquire"
              className="rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-[#152868] shadow-sm"
            >
              Get Quote
            </Link>
          </nav>
          <a
            href={CALENDLY_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-[#46548a] transition hover:text-[#152868]"
          >
            Or book a call
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-10 text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
            Get a quote
          </p>
          <h1 className="mt-3 text-[clamp(2.2rem,6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.045em] text-[#152868]">
            Tell us what you&apos;re{' '}
            <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
              building.
            </em>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] font-medium leading-relaxed text-[#5c688f]">
            Answer a few questions and we&apos;ll send the Welcome Package.
            If we&apos;re a fit, you get a custom proposal — not a price on a
            checkout page.
          </p>
        </div>
        <InquiryForm />
      </main>
    </div>
  );
}
