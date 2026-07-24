'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useRef, useState } from 'react';
import { buildCalendlyUrl, type BookingDetails } from '@/lib/calendly';
import { trackEvent } from '@/lib/track-client';
import { BookCallButton } from './BookCallButton';
import { CalendlyEmbed } from './CalendlyEmbed';
import { HeroLaptop } from './HeroLaptop';
import { WorkShowcase } from './WorkShowcase';

type FormState = {
  name: string;
  email: string;
  phone: string;
  website: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  website: '',
};

const stats = [
  { value: '8+', label: 'websites launched' },
  { value: '24h', label: 'average response time' },
  { value: '5★', label: 'client satisfaction' },
];

const features = [
  {
    title: 'Lead-focused design',
    body: 'Every page is structured to turn visitors into inquiries — clear CTAs, fast load times, and copy that sells.',
  },
  {
    title: 'End-to-end delivery',
    body: 'From first call to launch, we handle design, development, and deployment so you can focus on your business.',
  },
  {
    title: 'Built to scale',
    body: 'Modern stacks, clean code, and layouts that grow with you — no bloated templates or dead-end builds.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Share your details',
    body: 'Tell us about your business, goals, and current site in a quick intake form.',
  },
  {
    step: '02',
    title: 'Pick a time',
    body: 'Book a call that fits your schedule — we review everything before we meet.',
  },
  {
    step: '03',
    title: 'Launch with confidence',
    body: 'We design, build, and ship a site that actually brings you leads.',
  },
];

export function LandingPage() {
  const formRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState<'form' | 'schedule'>('form');
  const [form, setForm] = useState<FormState>(initialForm);
  const [calendlyUrl, setCalendlyUrl] = useState('');
  const [error, setError] = useState('');

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in your name, email, and phone number.');
      return;
    }

    const details: BookingDetails = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: form.website.trim() || undefined,
    };

    setCalendlyUrl(buildCalendlyUrl(details));
    setStep('schedule');
    trackEvent('scheduling_start');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (step === 'schedule') {
    return (
      <main className="min-h-screen bg-obsidian px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-page">
          <div className="mb-10 flex items-center justify-between">
            <span className="text-[15px] font-medium text-paper-white">Devly</span>
          </div>

          <button
            type="button"
            onClick={() => setStep('form')}
            className="mb-8 text-[14px] text-fog transition-colors hover:text-paper-white"
          >
            ← Back to details
          </button>

          <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.13] text-paper-white">
            Pick a time
          </h1>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-fog">
            Your details are saved — choose a slot that works for you.
          </p>

          <div className="mt-10 overflow-hidden rounded-card border border-graphite bg-onyx p-2 sm:p-3">
            <CalendlyEmbed url={calendlyUrl} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-obsidian text-bone">
      <header className="mx-auto flex max-w-page items-center justify-between px-6 py-6 sm:px-8">
        <span className="text-[15px] font-medium text-paper-white">Devly</span>
        <BookCallButton onClick={scrollToForm} label="Get Started" />
      </header>

      <section className="mx-auto grid max-w-page gap-12 px-6 pb-24 pt-10 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-40 lg:pt-16">
        <div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[1] tracking-[0.01em] text-paper-white">
            A <em className="italic text-bone/90">higher standard</em> in
            web design.
          </h1>
          <p className="mt-6 max-w-lg text-[20px] leading-[1.38] tracking-[-0.04em] text-fog">
            Websites that actually bring you leads. Share a few details, pick a
            time, and we&apos;ll take it from there.
          </p>
          <div className="mt-10">
            <BookCallButton onClick={scrollToForm} label="Get Started" />
          </div>
        </div>
        <HeroLaptop />
      </section>

      <section className="border-t border-graphite px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-page gap-10 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none text-paper-white">
                {stat.value}
              </p>
              <p className="mt-2 text-[14px] text-fog">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:py-40">
        <div className="mx-auto max-w-page text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[-0.02em] text-copper">
            What you get
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.13] text-paper-white">
            A strong digital foundation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[18px] font-light leading-[1.5] text-fog">
            High-converting sites, fast turnaround, and a partner who cares
            about your results.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-page gap-4 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-card border border-graphite bg-onyx p-6"
            >
              <h3 className="text-[20px] font-medium tracking-[-0.02em] text-paper-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.5] text-mist">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        ref={formRef}
        id="booking-form"
        className="border-t border-graphite px-6 py-20 sm:px-8 lg:py-40"
      >
        <div className="mx-auto max-w-page">
          <p className="text-[13px] font-semibold uppercase tracking-[-0.02em] text-copper">
            Book a call
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.13] text-paper-white">
            We&apos;d love to help
          </h2>
          <p className="mt-4 max-w-xl text-[18px] leading-[1.5] text-fog">
            Share a few details, then pick a time. We&apos;ll get in touch within
            24 hours.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-card border border-graphite bg-onyx p-6 sm:p-8">
              <form onSubmit={handleContinue} className="space-y-5">
                <Field
                  label="Full Name"
                  required
                  value={form.name}
                  onChange={(v) => updateField('name', v)}
                  placeholder="Your full name"
                />
                <Field
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => updateField('email', v)}
                  placeholder="you@company.com"
                />
                <div>
                  <label className="mb-1.5 block text-[14px] font-medium text-bone">
                    Phone / WhatsApp{' '}
                    <span className="text-copper">*</span>
                  </label>
                  <p className="mb-2 text-[14px] leading-relaxed text-fog">
                    Include your country code. You&apos;ll receive a meeting
                    confirmation after you book.
                  </p>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={inputClassName}
                  />
                </div>
                <Field
                  label="Current Website"
                  value={form.website}
                  onChange={(v) => updateField('website', v)}
                  placeholder="https:// (optional)"
                />

                {error ? (
                  <p className="text-[14px] text-copper">{error}</p>
                ) : null}

                <label className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-0.5 size-4 rounded border-slate bg-transparent text-copper focus:ring-copper"
                  />
                  <span className="text-[14px] leading-relaxed text-fog">
                    You agree to our friendly privacy policy.
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-2 rounded-full bg-paper-white px-5 py-2.5 text-[14px] font-medium text-black transition-opacity hover:opacity-90"
                >
                  Continue
                </button>
              </form>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-card border border-graphite bg-onyx">
              <Image
                src="/contact-side.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-copper text-copper"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="mt-4 max-w-md text-[16px] leading-[1.5] text-bone">
                  I would say whoever you work with from Devly, they are going
                  to give you the results you expect to receive. They will
                  deliver in a timely manner and make sure that you are
                  completely satisfied with the outcome.
                </p>
                <p className="mt-5 text-[14px] font-medium text-paper-white">
                  BDL Labs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorkShowcase onBookCall={scrollToForm} />

      <section className="px-6 py-20 sm:px-8 lg:py-40">
        <div className="mx-auto max-w-page text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[-0.02em] text-copper">
            How it works
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.13] text-paper-white">
            Apply in less than 10 minutes
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-page gap-px overflow-hidden rounded-card border border-graphite bg-graphite lg:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="bg-onyx p-6 sm:p-8">
              <p className="text-[13px] font-semibold text-copper">{item.step}</p>
              <h3 className="mt-3 text-[20px] font-medium text-paper-white">
                {item.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.5] text-mist">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <BookCallButton onClick={scrollToForm} label="Get Started" />
        </div>
      </section>

      <footer className="border-t border-graphite px-6 py-12 sm:px-8">
        <div className="mx-auto flex max-w-page flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span className="text-[15px] font-medium text-paper-white">Devly</span>
          <p className="text-[14px] text-fog">
            Websites that actually bring you leads.
          </p>
        </div>
      </footer>
    </main>
  );
}

const inputClassName =
  'w-full rounded-full border border-paper-white bg-transparent px-5 py-2.5 text-[15px] text-bone outline-none transition-colors placeholder:text-steel focus:border-bone';

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
}: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[14px] font-medium text-bone">
        {label}{' '}
        {required ? <span className="text-copper">*</span> : null}
      </label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
}
