import Link from 'next/link';

import { BookButton, SiteFooter, SiteNav } from '@/components/anatomy/SiteChrome';
import { Specimen } from '@/components/anatomy/visuals';

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

export function WebsitesPricing() {
  return (
    <div className="an">
      <SiteNav active="pricing" />

      <main>
        <section className="an-page-hero">
          <p className="an-mono">Pricing</p>
          <h1 className="an-page-title">
            How much does a website <em>cost?</em>
          </h1>
          <p className="an-hero__sub">
            You choose how much to invest. We provide the maximum we can within
            your budget — then put it in a clear proposal after we talk.
          </p>
          <div className="an-hero__actions">
            <BookButton>Book a call</BookButton>
            <Link href="/inquire" className="an-btn an-btn--ghost">
              Get a quote
            </Link>
          </div>
        </section>

        <section className="an-block">
          <p className="an-mono">Pricing philosophy</p>
          <h2 className="an-h2">
            Maximum value, <em>not maximum invoice.</em>
          </h2>
          <p className="an-lede">
            No matter your budget, we aim for maximum value — not maximum
            invoice padding.
          </p>
          <div className="an-principles">
            {principles.map((p, i) => (
              <article key={p.title} className="an-principle">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="an-chapter">
          <div className="an-chapter__copy">
            <p className="an-chapter__part an-mono">
              <span>→</span>
              The right problem
            </p>
            <h2 className="an-chapter__title">
              A website is an <em>investment.</em>
            </h2>
            <p className="an-chapter__body">
              The most expensive build is usually not the best build. The best
              build solves the right problem — traffic that turns into
              inquiries, trust in the first three seconds, a booking path that
              actually works.
            </p>
            <div className="an-tags">
              <span className="an-tag">No hidden fees</span>
              <span className="an-tag">Outcome-based proposals</span>
            </div>
          </div>
          <div className="an-visual">
            <Specimen
              src="/website-assets/work-bdl.png"
              alt="BDL clinical lab website"
              url="bdlusa.com"
              pins={[]}
            />
          </div>
        </section>

        <section className="an-dark-cta">
          <div className="an-dark-cta__inner">
            <p className="an-mono">Next step</p>
            <h2>
              Get your <em>custom proposal.</em>
            </h2>
            <p>
              Tell us your goals, timeline, and budget range. We’ll map the
              smartest path forward — with clear options you can actually
              decide on.
            </p>
            <div className="an-dark-cta__actions">
              <BookButton className="an-btn--light an-btn--lg">Book a call</BookButton>
              <Link href="/inquire" className="an-btn an-btn--ghost-light an-btn--lg">
                Send an inquiry
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
