'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Aperture, BarChart3, Check, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';

const CLOUD_PARALLAX =
  'https://soft-zoom-63098134.figma.site/_assets/v11/c536f05c69de65726fe598137058c1e477d2badc.png';

const PAYPAL_PACKAGE_URL =
  'https://www.paypal.com/ncp/payment/3GXQXENJZ99FL';

const starterFeatures = [
  'Full custom landing page — design through launch',
  'Forms & booking flows wired up (leads, contact, Calendly)',
  'Consultations included so we can hear your ideas and goals',
  '3 revision cycles baked into the build',
  'Mobile-responsive, fast, and SEO-ready basics',
  'Copy structure that pushes visitors toward a clear CTA',
  'Launch support and handoff',
  '30 days of post-launch maintenance (bug fixes & small text tweaks)',
];

const customFeatures = [
  'Multi-page sites, portals, or richer product flows',
  'Extra integrations beyond forms & booking',
  'Deeper brand / UX exploration',
  'Extended consultation and iteration time',
  'Ongoing maintenance retainers',
  'Whatever the $1,500 package cannot cover cleanly',
];

function Navbar() {
  return (
    <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2 sm:top-6">
      <div className="liquid-glass flex items-center gap-4 rounded-full px-4 py-2.5 sm:gap-10 sm:px-10 sm:py-3">
        <Link
          href="/websites"
          className="font-inter text-[10px] font-medium uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-white sm:text-xs sm:tracking-[0.2em]"
        >
          Websites
        </Link>
        <a
          href="#plans"
          className="font-inter text-[10px] font-medium uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-white sm:text-xs sm:tracking-[0.2em]"
        >
          Plans
        </a>
        <a
          href={CALENDLY_EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter text-[10px] font-medium uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-white sm:text-xs sm:tracking-[0.2em]"
        >
          Book
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/40 to-transparent">
      <div className="flex items-center justify-between px-3 py-2.5 sm:px-10 sm:py-4">
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 transition-colors hover:text-white"
            aria-label="Facebook"
          >
            <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 transition-colors hover:text-white"
            aria-label="Twitter"
          >
            <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 transition-colors hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          <span className="hidden font-inter text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 sm:inline">
            Devly
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:sales@devly.info"
            className="hidden font-inter text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 transition-colors hover:text-white sm:inline"
          >
            sales@devly.info
          </a>
          <BarChart3 className="h-3.5 w-3.5 text-white/80 sm:h-4 sm:w-4" aria-hidden />
          <Aperture className="h-3.5 w-3.5 text-white/80 sm:h-4 sm:w-4" aria-hidden />
        </div>
      </div>
    </footer>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 space-y-3.5 text-left">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 text-white/70"
            strokeWidth={2}
            aria-hidden
          />
          <span className="font-inter text-[13px] leading-relaxed text-white/70 sm:text-sm">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function WebsitesPricing() {
  const ref = useRef<HTMLDivElement | null>(null);
  useScrollReveal(ref);

  return (
    <div ref={ref} className="websites min-h-screen bg-[#410C01] pb-16">
      <Navbar />

      <section className="relative px-6 pb-10 pt-28 text-center sm:px-10 sm:pt-36 lg:px-20">
        <p className="reveal font-inter text-[10px] font-medium uppercase tracking-[0.35em] text-white/60 sm:text-xs">
          Pricing
        </p>
        <h1
          className="reveal font-arsenica mt-4 text-4xl tracking-wide sm:text-6xl md:text-7xl"
          style={{ animationDelay: '0.08s' }}
        >
          Two ways to start
        </h1>
        <p
          className="reveal font-arsenica mx-auto mt-6 max-w-xl text-base text-white/80 sm:text-xl"
          style={{ animationDelay: '0.16s' }}
        >
          A clear package for most sites — or a custom build when you need more
          than a landing page.
        </p>
      </section>

      <section
        id="plans"
        className="relative z-20 mx-auto grid max-w-5xl gap-6 px-4 pb-24 sm:px-8 lg:grid-cols-2 lg:gap-8"
      >
        {/* Starter — $1,500 */}
        <article
          className="reveal liquid-glass rounded-[28px] p-7 sm:p-10"
          style={{ animationDelay: '0.1s' }}
        >
          <p className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-white/55">
            Launch
          </p>
          <h2 className="font-arsenica mt-3 text-3xl tracking-wide sm:text-4xl">
            Website package
          </h2>
          <p className="mt-4 flex items-baseline gap-1">
            <span className="font-inter text-5xl font-semibold tracking-tight sm:text-6xl">
              $1,500
            </span>
            <span className="font-inter text-sm text-white/50">one-time</span>
          </p>
          <p className="font-inter mt-4 text-sm leading-relaxed text-white/65">
            Everything you need for a lead-generating landing page — design,
            build, forms & booking, and launch. No surprise scope creep inside
            this package.
          </p>

          <FeatureList items={starterFeatures} />

          <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5">
            <p className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              Optional
            </p>
            <p className="font-inter mt-1.5 text-sm text-white/80">
              Hosting — <span className="font-semibold">$30 / year</span> if you
              want us to handle it. Bring your own host if you prefer.
            </p>
          </div>

          <a
            href={PAYPAL_PACKAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter mt-8 inline-flex w-full items-center justify-center rounded-md bg-white px-8 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90 sm:text-xs"
          >
            Book this package
          </a>
        </article>

        {/* Custom */}
        <article
          className="reveal rounded-[28px] border border-white/20 bg-black/25 p-7 sm:p-10"
          style={{ animationDelay: '0.2s' }}
        >
          <p className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-white/55">
            Custom
          </p>
          <h2 className="font-arsenica mt-3 text-3xl tracking-wide sm:text-4xl">
            Built around you
          </h2>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="font-inter text-4xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s talk
            </span>
          </p>
          <p className="font-inter mt-4 text-sm leading-relaxed text-white/65">
            Need more pages, deeper product flows, extra integrations, or more
            consultation time? We scope it together — then quote what actually
            fits.
          </p>

          <FeatureList items={customFeatures} />

          <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5">
            <p className="font-inter text-sm text-white/80">
              Best when the $1,500 package would be a squeeze — not a fit.
            </p>
          </div>

          <a
            href={CALENDLY_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter mt-8 inline-flex w-full items-center justify-center rounded-md bg-white px-8 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90 sm:text-xs"
          >
            Book a scoping call
          </a>
        </article>
      </section>

      <section className="relative overflow-hidden px-6 pb-28 pt-4 text-center sm:px-10">
        <div className="relative z-20 mx-auto max-w-2xl">
          <h2
            className="reveal font-arsenica text-3xl tracking-wide sm:text-5xl"
            style={{ animationDelay: '0.1s' }}
          >
            Not sure which fits?
          </h2>
          <p
            className="reveal font-inter mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/60"
            style={{ animationDelay: '0.18s' }}
          >
            Most founders land on the $1,500 package. If you need more than a
            landing page with forms & booking, we&apos;ll say so on the call —
            no pressure pitch.
          </p>
          <a
            href={CALENDLY_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass reveal font-inter mt-10 inline-block rounded-[50%] px-10 py-5 text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] sm:px-12 sm:py-6 sm:text-xs"
            style={{ animationDelay: '0.26s' }}
          >
            Book a call
          </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CLOUD_PARALLAX}
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 z-10 w-full opacity-70"
        />
      </section>

      <Footer />
    </div>
  );
}
