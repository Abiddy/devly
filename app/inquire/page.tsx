import type { Metadata } from 'next';

import { SiteFooter, SiteNav } from '@/components/anatomy/SiteChrome';
import { InquiryForm } from '@/components/websites/InquiryForm';

export const metadata: Metadata = {
  title: 'Devly — Get a quote',
  description:
    'Answer a few questions. Get the Devly Welcome Package instantly, then a custom proposal if we’re a fit.',
};

export default function InquirePage() {
  return (
    <div className="an">
      <SiteNav active="quote" />

      <main>
        <section className="an-page-hero">
          <p className="an-mono">Get a quote</p>
          <h1 className="an-page-title">
            Tell us what you&apos;re <em>building.</em>
          </h1>
          <p className="an-hero__sub">
            Answer a few questions and we&apos;ll send the Welcome Package. If
            we&apos;re a fit, you get a custom proposal — not a price on a
            checkout page.
          </p>
        </section>
        <div className="an-form-wrap">
          <InquiryForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
