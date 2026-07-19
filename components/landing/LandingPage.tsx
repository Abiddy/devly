'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useRef, useState } from 'react';
import { buildCalendlyUrl, type BookingDetails } from '@/lib/calendly';
import { trackEvent } from '@/lib/track-client';
import { CalendlyEmbed } from './CalendlyEmbed';
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
      <main
        style={{
          minHeight: '100vh',
          background: '#f5f7fa',
          padding: '48px 24px',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <button
            type="button"
            onClick={() => setStep('form')}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'rgb(100,100,105)',
              fontFamily: "'Inter',sans-serif",
              fontSize: 14,
              cursor: 'pointer',
              marginBottom: 24,
              padding: 0,
            }}
          >
            ← Back to details
          </button>
          <h1
            style={{
              margin: '0 0 8px',
              fontFamily: "'Inter',sans-serif",
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: '-0.03em',
              color: 'rgb(20,20,22)',
            }}
          >
            Pick a time
          </h1>
          <p
            style={{
              margin: '0 0 32px',
              fontFamily: "'Inter',sans-serif",
              fontSize: 16,
              color: 'rgb(100,100,105)',
            }}
          >
            Your details are saved, choose a slot that works for you.
          </p>
          <div
            style={{
              background: 'white',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <CalendlyEmbed url={calendlyUrl} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section
        ref={formRef}
        id="booking-form"
        className="bg-[#F9FAFB] px-4 py-16 sm:px-6 lg:py-24"
      >
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
              <div className="mb-8">
                <span className="text-lg font-semibold tracking-tight text-gray-900">
                  Devly
                </span>
              </div>

              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  We&apos;d love to help
                </h1>
                <p className="mt-3 max-w-md text-base leading-relaxed text-gray-600">
                  Share a few details, then pick a time. We&apos;ll get in touch
                  within 24 hours.
                </p>
              </div>

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
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone / WhatsApp{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="mb-2 text-sm leading-relaxed text-gray-500">
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
                  <p className="text-sm text-red-500">{error}</p>
                ) : null}

                <label className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-0.5 size-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-sm leading-relaxed text-gray-600">
                    You agree to our friendly{' '}
                    <span className="underline underline-offset-2">
                      privacy policy
                    </span>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Continue
                </button>
              </form>
            </div>

            <div className="relative min-h-[420px] lg:min-h-[720px]">
              <Image
                src="/contact-side.png"
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-white text-white"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white sm:text-lg">
                  I would say whoever you work with from Devly, they are going
                  to give you the results you expect to receive. They will
                  deliver in a timely manner and make sure that you are
                  completely satisfied with the outcome.
                </p>
                <p className="mt-6 text-sm font-semibold text-white">
                  BDL Labs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorkShowcase onBookCall={scrollToForm} />
    </main>
  );
}

const inputClassName =
  'w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10';

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
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}{' '}
        {required ? <span className="text-red-500">*</span> : null}
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
