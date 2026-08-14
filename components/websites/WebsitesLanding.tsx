'use client';

import { useEffect, useRef, useState } from 'react';
import { Aperture, BarChart3, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_130946_e6793cc7-6b6f-4035-9852-44290b781ae6.mp4';

const CLOUD_TRANSITION =
  'https://soft-zoom-63098134.figma.site/_assets/v11/b4653ee7c7405b6d07f43fffdc3cbdd84d9dfc70.png';

const CLOUD_PARALLAX =
  'https://soft-zoom-63098134.figma.site/_assets/v11/c536f05c69de65726fe598137058c1e477d2badc.png';

const DOVE =
  'https://soft-zoom-63098134.figma.site/_assets/v11/779ed5f1e5b99d3fa582a54133271d32deee567e.png';

const REASON_BACKGROUNDS = [
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260616_040223_98d314e9-b8b4-4218-bcbd-18ffc38032ac.png&w=1280&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260616_042421_41f4fa0b-770c-4545-a416-73a809366e49.png&w=1280&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260616_040223_98d314e9-b8b4-4218-bcbd-18ffc38032ac.png&w=1280&q=85',
];

const reasons = [
  {
    number: '01',
    title: 'Open 24/7',
    witty: 'Lead generation that never clocks out.',
    body: 'Your site keeps taking inquiries while you sleep, travel, or pretend to check Slack. Best salesperson you never have to feed.',
  },
  {
    number: '02',
    title: 'Looks expensive',
    witty: 'Even if your budget is not.',
    body: 'People decide if you are serious in about three seconds. A sharp site does the talking before you ever get on a call.',
  },
  {
    number: '03',
    title: 'Owned real estate',
    witty: 'Social posts vanish. A good site compounds.',
    body: 'Stop renting attention from algorithms. Put the pitch, proof, and booking link somewhere that still works next month.',
  },
];

function ReasonTitle({ title }: { title: string }) {
  const parts = title.split(/(\d[\d/]*)/);
  return (
    <>
      {parts.map((part, i) =>
        /^\d/.test(part) ? (
          <span key={i} className="font-inter font-semibold tracking-tight">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function Navbar() {
  return (
    <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2 sm:top-6">
      <div className="liquid-glass flex items-center gap-4 rounded-full px-4 py-2.5 sm:gap-12 sm:px-10 sm:py-3">
        <a
          href="#reasons"
          className="font-inter text-[10px] font-medium uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-white sm:text-xs sm:tracking-[0.2em]"
        >
          Why
        </a>
        <a
          href="/websites/pricing"
          className="font-inter text-[10px] font-medium uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-white sm:text-xs sm:tracking-[0.2em]"
        >
          Pricing
        </a>
        <a
          href="#book"
          className="font-inter text-[10px] font-medium uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-white sm:text-xs sm:tracking-[0.2em]"
        >
          Book
        </a>
        <a
          href="/"
          className="font-inter text-[10px] font-medium uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-white sm:text-xs sm:tracking-[0.2em]"
        >
          Agency
        </a>
      </div>
    </nav>
  );
}

function Hero({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section
      id="top"
      className="relative h-screen w-full overflow-hidden"
    >
      {!reducedMotion ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : (
        <div className="absolute inset-0 bg-[#1a0f0c]" />
      )}
      <div className="absolute inset-0 bg-black/35" aria-hidden />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <p
          className="hero-fade-up font-inter text-xs font-medium uppercase tracking-[0.35em] text-white/90 sm:text-sm"
          style={{ animationDelay: '0.1s' }}
        >
          Devly
        </p>
        <p
          className="hero-fade-up mt-2 font-inter text-[10px] font-light uppercase tracking-[0.4em] text-white/70 sm:text-xs"
          style={{ animationDelay: '0.1s' }}
        >
          Websites
        </p>

        <h1
          className="hero-fade-up mt-8 max-w-4xl drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)]"
          style={{ animationDelay: '0.25s' }}
        >
          <span className="font-arsenica block text-4xl leading-[1.1] tracking-wide sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            What a world with a
          </span>
          <span className="font-inter mt-1 block text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            good website looks like
          </span>
        </h1>

        <p
          className="hero-fade-up font-arsenica mt-8 max-w-xl text-sm text-white/90 sm:text-lg md:text-xl"
          style={{ animationDelay: '0.4s' }}
        >
          Less brochure. More quiet confidence that converts strangers into
          booked calls.
        </p>

        <a
          href="#reasons"
          className="liquid-glass hero-fade-up font-inter mt-10 rounded-[50%] px-10 py-5 text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98] sm:px-12 sm:py-6 sm:text-xs"
          style={{ animationDelay: '0.55s' }}
        >
          See why it matters
        </a>
      </div>
    </section>
  );
}

function ReasonSection({
  reason,
  background,
  index,
}: {
  reason: (typeof reasons)[number];
  background: string;
  index: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={background}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#410C01]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-32 text-center">
        <p
          className="reveal font-inter text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 sm:text-xs"
          style={{ animationDelay: '0s' }}
        >
          Reason {reason.number}
        </p>
        <h2
          className="reveal font-arsenica mt-4 text-4xl tracking-wide drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)] sm:text-6xl md:text-7xl"
          style={{ animationDelay: '0.08s' }}
        >
          <ReasonTitle title={reason.title} />
        </h2>
        <p
          className="reveal font-arsenica mt-6 text-xl tracking-wide text-white/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.25)] sm:text-3xl md:text-4xl"
          style={{ animationDelay: '0.15s' }}
        >
          {reason.witty}
        </p>
        <p
          className="reveal font-inter mx-auto mt-8 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base"
          style={{ animationDelay: '0.25s' }}
        >
          {reason.body}
        </p>
        {index === reasons.length - 1 && (
          <a
            href="#book"
            className="reveal font-inter mt-10 inline-block rounded-[50%] border border-white/50 px-10 py-4 text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-[1.03] hover:border-white hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] sm:px-12 sm:py-5 sm:text-xs"
            style={{ animationDelay: '0.35s' }}
          >
            Book a call
          </a>
        )}
      </div>
    </section>
  );
}

function BookingSection() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);

  return (
    <section
      id="book"
      ref={ref}
      className="relative overflow-hidden bg-[#410C01] px-6 pb-32 pt-24 sm:px-12 sm:pt-32 lg:px-28"
    >
      <div className="relative z-20 mx-auto max-w-3xl text-center">
        <h2 className="reveal font-arsenica text-4xl tracking-wide sm:text-6xl md:text-7xl">
          Shall we?
        </h2>
        <p
          className="reveal font-arsenica mt-6 text-lg text-white/85 sm:text-2xl"
          style={{ animationDelay: '0.12s' }}
        >
          Fifteen minutes. One call. A clearer path to a site that actually
          works.
        </p>
        <p
          className="reveal font-inter mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/55"
          style={{ animationDelay: '0.2s' }}
        >
          No 40-slide decks. No &ldquo;synergy.&rdquo; Just what you need, what
          it costs, and when we can ship.
        </p>
        <a
          href={CALENDLY_EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass reveal font-inter mt-12 inline-block rounded-[50%] px-10 py-5 text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98] sm:px-12 sm:py-6 sm:text-xs"
          style={{ animationDelay: '0.3s' }}
        >
          Book a call
        </a>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CLOUD_PARALLAX}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full opacity-80"
      />
    </section>
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

export function WebsitesLanding() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div ref={pageRef} className="websites min-h-screen pb-14">
      <Navbar />
      <Hero reducedMotion={reducedMotion} />

      <div className="relative z-20 -mt-64 sm:-mt-72 md:-mt-80 lg:-mt-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CLOUD_TRANSITION}
          alt=""
          className="pointer-events-none w-full"
        />
      </div>

      <div
        id="reasons"
        className="relative -mt-40 sm:-mt-48 md:-mt-56 lg:-mt-64"
      >
        {reasons.map((reason, index) => (
          <ReasonSection
            key={reason.number}
            reason={reason}
            background={REASON_BACKGROUNDS[index]}
            index={index}
          />
        ))}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DOVE}
          alt=""
          className="pointer-events-none absolute -bottom-8 right-4 z-20 w-24 sm:right-10 sm:w-40 md:w-52 lg:w-64"
        />
      </div>

      <BookingSection />
      <Footer />
    </div>
  );
}
