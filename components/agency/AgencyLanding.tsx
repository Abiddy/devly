'use client';

import { useEffect, useRef, useState } from 'react';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4';

const CONTACT_EMAIL = 'hello@devly.info';

const steps = [
  {
    number: '01',
    title: 'Qualify creators',
    body: 'Every creator is scored on engagement rate, posting consistency, and audience fit — not follower count. Only those who clear the bar make the shortlist.',
  },
  {
    number: '02',
    title: 'Match to your objective',
    body: 'Awareness, lead gen, or sales each need a different creator profile. We map creators to the KPI you are actually buying, not a one-size-fits-all roster.',
  },
  {
    number: '03',
    title: 'Track against your KPIs',
    body: 'Campaigns are measured against the metrics you set before launch. You get reporting tied to outcomes — reach that converts, not vanity impressions.',
  },
];

const kpis = [
  {
    title: 'Brand Awareness',
    meaning:
      'Put your brand in front of the right audiences with creators whose followers already care about what you sell.',
    tracks: 'Reach, view-through, share of voice, brand lift proxies',
  },
  {
    title: 'Lead Generation',
    meaning:
      'Drive qualified interest — clicks, sign-ups, waitlist joins — from creators who convert attention into action.',
    tracks: 'CTR, cost per lead, form completions, attributed inquiries',
  },
  {
    title: 'Sales Conversion',
    meaning:
      'Move product with creators who influence purchase decisions, not just scroll stops.',
    tracks: 'Attributed revenue, ROAS, promo code usage, conversion rate',
  },
];

export function AgencyLanding() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [reducedMotion]);

  const scrollToContact = () => {
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="agency min-h-screen bg-cloud text-ink antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-chalk"
      >
        Skip to content
      </a>

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
          <span className="font-agency-sans text-[15px] font-semibold tracking-tight text-chalk">
            Devly
          </span>
          <button
            type="button"
            onClick={scrollToContact}
            className="rounded-md border border-chalk/25 bg-chalk/10 px-4 py-2 text-[13px] font-medium text-chalk backdrop-blur-sm transition-colors hover:bg-chalk/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chalk"
          >
            Book a call
          </button>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
          {!reducedMotion ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          ) : (
            <div className="absolute inset-0 bg-ink" aria-hidden="true" />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/85"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center sm:px-8">
            <p className="font-agency-display text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.02em] text-chalk">
              Devly
            </p>
            <h1 className="mt-6 font-agency-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] tracking-[-0.02em] text-chalk">
              We help brands meet their KPIs
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-agency-sans text-[17px] leading-relaxed text-chalk/75 sm:text-[18px]">
              Vetted creators matched to your marketing objective — measured on
              results, not follower counts.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center rounded-md bg-signal px-7 py-3.5 font-agency-sans text-[15px] font-semibold text-chalk transition-colors hover:bg-signal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chalk"
              >
                Book a call
              </button>
            </div>
          </div>
        </section>

        {/* How it works — signature scroll moment */}
        <section className="border-b border-ink/8 px-6 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <p className="font-agency-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
              How it works
            </p>
            <h2 className="mt-3 max-w-2xl font-agency-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.12] tracking-[-0.02em] text-ink">
              Three steps. Zero guesswork.
            </h2>
            <p className="mt-4 max-w-xl font-agency-sans text-[16px] leading-relaxed text-ink-muted">
              Influencer spend fails when matching starts with vanity metrics.
              We reverse that — qualify first, then place.
            </p>

            <div className="relative mt-16 lg:pl-16">
              {/* Progress rail — signature interaction */}
              <div
                className="absolute bottom-4 left-0 top-4 hidden w-px bg-ink/10 lg:block"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-x-0 top-0 w-full origin-top bg-signal transition-[height] duration-500 ease-out motion-reduce:transition-none"
                  style={{
                    height: reducedMotion
                      ? '100%'
                      : `${((activeStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              <ol className="divide-y divide-ink/10 border-y border-ink/10">
                {steps.map((step, index) => {
                  const isActive = reducedMotion || activeStep === index;
                  return (
                    <li
                      key={step.number}
                      ref={(el) => {
                        stepRefs.current[index] = el;
                      }}
                      className={`group py-8 transition-colors duration-300 sm:py-10 motion-reduce:transition-none ${
                        !reducedMotion ? 'hover:bg-chalk/80' : ''
                      }`}
                    >
                      <div className="flex flex-col gap-4 px-1 sm:flex-row sm:items-start sm:gap-8 sm:px-2">
                        <span
                          className={`font-agency-display text-[2.75rem] leading-none tracking-tight transition-colors duration-300 motion-reduce:transition-none ${
                            isActive ? 'text-signal' : 'text-ink/20'
                          }`}
                        >
                          {step.number}
                        </span>
                        <div className="pt-1">
                          <h3 className="font-agency-sans text-[1.25rem] font-semibold tracking-tight text-ink">
                            {step.title}
                          </h3>
                          <p className="mt-2 max-w-2xl font-agency-sans text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* Why Devly */}
        <section className="bg-ink px-6 py-24 text-chalk sm:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <p className="font-agency-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-light">
              Why Devly
            </p>
            <h2 className="mt-3 max-w-2xl font-agency-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.12] tracking-[-0.02em]">
              Follower count is a lazy brief.
            </h2>
            <p className="mt-4 max-w-2xl font-agency-sans text-[16px] leading-relaxed text-chalk/65">
              Most agencies sell reach. Brands buy outcomes. Those are not the
              same purchase — and treating them as one is why influencer budgets
              get cut.
            </p>

            <div className="mt-16 grid gap-12 border-t border-chalk/10 pt-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="font-agency-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-chalk/40">
                  The old way
                </p>
                <h3 className="mt-4 font-agency-sans text-[1.35rem] font-semibold tracking-tight text-chalk/55">
                  Pitch by follower count. Spray and pray.
                </h3>
                <ul className="mt-6 space-y-3 font-agency-sans text-[15px] leading-relaxed text-chalk/45">
                  <li>Rosters built on vanity metrics</li>
                  <li>Same creator list for every objective</li>
                  <li>Reporting that stops at impressions</li>
                </ul>
              </div>

              <div className="lg:border-l lg:border-signal/40 lg:pl-16">
                <p className="font-agency-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-light">
                  The Devly way
                </p>
                <h3 className="mt-4 font-agency-sans text-[1.35rem] font-semibold tracking-tight text-chalk">
                  Qualify first. Align to the KPI. Then scale.
                </h3>
                <ul className="mt-6 space-y-3 font-agency-sans text-[15px] leading-relaxed text-chalk/80">
                  <li>
                    Engagement, consistency, and audience alignment screened
                    upfront
                  </li>
                  <li>
                    Creators matched to awareness, leads, or sales —
                    specifically
                  </li>
                  <li>
                    Performance tracked against the metrics you defined
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What we optimize for */}
        <section className="px-6 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <p className="font-agency-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
              What we optimize for
            </p>
            <h2 className="mt-3 max-w-2xl font-agency-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.12] tracking-[-0.02em] text-ink">
              Three outcomes. Clear measurement.
            </h2>
            <p className="mt-4 max-w-xl font-agency-sans text-[16px] leading-relaxed text-ink-muted">
              Tell us which KPI matters. We build the creator strategy around
              that — not the other way around.
            </p>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {kpis.map((kpi) => (
                <article
                  key={kpi.title}
                  className="border-t-2 border-signal pt-8"
                >
                  <h3 className="font-agency-sans text-[1.2rem] font-semibold tracking-tight text-ink">
                    {kpi.title}
                  </h3>
                  <p className="mt-3 font-agency-sans text-[15px] leading-relaxed text-ink-muted">
                    {kpi.meaning}
                  </p>
                  <p className="mt-5 font-agency-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                    We track
                  </p>
                  <p className="mt-1.5 font-agency-sans text-[14px] leading-relaxed text-ink/80">
                    {kpi.tracks}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          id="contact"
          className="border-t border-ink/8 bg-chalk px-6 py-24 sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-agency-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1] tracking-[-0.02em] text-ink">
              We help brands meet their KPIs
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-agency-sans text-[16px] leading-relaxed text-ink-muted">
              If you are allocating influencer budget and need it tied to a real
              objective, let&apos;s talk.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Devly%20—%20Book%20a%20call`}
                className="inline-flex w-full items-center justify-center rounded-md bg-signal px-7 py-3.5 font-agency-sans text-[15px] font-semibold text-chalk transition-colors hover:bg-signal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal sm:w-auto"
              >
                Book a call
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex w-full items-center justify-center rounded-md border border-ink/15 px-7 py-3.5 font-agency-sans text-[15px] font-medium text-ink transition-colors hover:border-ink/30 hover:bg-cloud focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal sm:w-auto"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/8 px-6 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-agency-sans text-[15px] font-semibold tracking-tight text-ink">
              Devly
            </p>
            <p className="mt-1 font-agency-sans text-[13px] text-ink-soft">
              Creator partnerships measured against your KPIs.
            </p>
          </div>
          <p className="font-agency-sans text-[13px] text-ink-soft">
            © {new Date().getFullYear()} Devly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
